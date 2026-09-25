# Q8Block — aesthetics audit

**Date:** 2026-09-24 · **Scope:** `/`, `/en/`, `/offer/`, `/en/offer/` at 1440x900 and 390x844
**Method:** real headless Chrome (puppeteer-core 25.12 + sharp) in a scratch folder, `deviceScaleFactor` 1 and 2,
every section screenshotted 1:1 and measured from the live DOM (computed styles, client rects, range rects).
Boards read at full resolution (2688x1520 desktop, 1520x2688 offer) and ink boxes located by pixel scan,
not by eye. `shots.mjs` passes all four gates on all four rows (broken=0, errors=0, overflow=false).
`google-business-profile-checklist.html` excluded. **Nothing in `src/`, `site/`, `build.mjs` or `copy.md` was touched.**

Each finding is tagged:
**[AGENT]** an agent can fix it now · **[AHMAD]** it changes approved copy or approved layout, so he decides ·
**[BOARD]** the flaw is in the approved board itself, not in the build.

---

## Tier 1 — the things that make it look un-designed

### 1. §7 — the domain names break before `.com`, and that staggers the orange metric across every row  **[AGENT]**

`.work-site` is set at `var(--fs-h3)` = **32px** with `overflow-wrap: break-word`, inside a card whose
content box is **262px**. Measured: the longest domain, `alghadeerclean.com`, needs ~310px at 32px.
`carwashkw.com` needs ~268px — it overflows by **6px**. Result: **6 of the 10 site names wrap**, with
`.com` alone on line two:

> carwashkw
> **.com**

Because `.work-site` then occupies **73.6px instead of 36.8px**, everything under it drops by 36.8px —
so the orange `+222% Click growth` line, the loudest mark in the card, sits at two different heights
inside one row. Measured y-positions, row 1: **6313.8 / 6350.6 / 6350.6 / 6313.8**. Row 2 alternates the
other way: 6811.5 / 6774.7 / 6811.5 / 6774.7. The eye reads a zig-zag where the board draws four metrics
on one baseline. Card height goes to **436.9px** against the board's 405.

**The Arabic page already proves the fix.** `html[lang="ar"]` sets `--fs-h3` to 24px, so on `/` **zero**
domains wrap, every metric in a row lands on one baseline, and the cards measure **exactly 405px** — the
board number. The English page is the only one that is wrong.

**Fix:** stop borrowing the H3 size for a Latin string in a 262px column.

```css
.work-site {
  font-size: clamp(18px, calc(26/14.4 * 1vw), 28px);   /* 26px at 1440 — 18 chars fit in 262px */
  overflow-wrap: normal;
}
```

Deviation from the board: the board draws four one-line names on one baseline. This is a build flaw, not a board flaw.

---

### 2. `.lead` has no measure — four sections run 86 characters per line  **[AGENT]**

`.lead` (line 214 of `styles.css`) sets size, weight, colour and top margin and **no `max-width`**.
Only four places override it: `#hero` 720px, `#included` 860px, `.final` 820px, `#offer-hero` 860px.
So §3, §4, §6 and §7 set their subhead across the **full 1320px container**:

| Section | Lines | Widest line | Chars/line |
|---|---|---|---|
| §7 Our work | 3 | **1268px** | **87** |
| §3 The problem | 4 | **1315px** | **86** |
| §4 What we do | 3 | 1289px | 70 |
| §6 The journey | 3 | 1279px | 61 |
| §3 Arabic | 3 | 1285px | 83 |
| §4 Arabic | 2 | 1301px | 83 |

29px type at 86 characters is past every readable measure, and it is inconsistent with the same component
20px further up the page. Visually the §3 subhead is now a four-line grey slab that outweighs the H2 above
it — the H2 → subhead → body ladder inverts. The board draws §3 and §4 as **two short lines** and §7 as
**one line**.

**Fix — one line, four sections:**

```css
.lead { max-width: 860px; }   /* same value #included already uses; delete the per-section overrides that now duplicate it */
```

Deviation from the board (the board's subheads are short and narrow).

---

### 3. The two oranges do clash, and §7 is where it shows worst  **[AHMAD]**

Measured: `--orange` `#FF5F29` is H 15.1°, S 100%, **L 58%**. `--orange-text` `#CE340A` is H 12.9°,
S 91%, **L 42%**. Same hue to within 2°, but **16 lightness points apart**. That is a tone difference on
paper and a colour difference on screen: at 22px bold against a 528x88px saturated field, simultaneous
contrast pushes the darker value toward red. Checked at 1:1 at 1440, not at a downscale.

Where they share a viewport:

| Section | Distance apart | Reads as |
|---|---|---|
| §5 (centred) | eyebrow **32px** directly above the highlight block | worst pairing — vertically stacked on the same axis, and the eyebrow reads brick, the block reads tangerine |
| §3, §4, §7 | eyebrow ~50px above the highlight block | clearly two oranges, though the black H2 between them softens it |
| **§7 card interior** | sparkline `#FF5F29` **100px** above metric `#CE340A`, inside one 312px card | **the worst instance on the site** — one card, two oranges, nothing between them |
| §4 | rust eyebrow, then bright block, bright numeral strokes, bright column rules | the eyebrow is the odd one out among four orange marks |

There is a third symptom nobody has flagged: **the eyebrow is not one colour down the page.**
`.eyebrow` is `--orange-text` on light and `.on-dark .eyebrow` is `--orange`. Scrolling
§5 (rust) → §6 (bright) → §7 (rust) changes the same component's colour three times.

**Why it is hard.** `#FF5F29` as ink is 3.00:1 on `#FEFEFE` and 2.73:1 on `#F2F3F5` — it fails AA.
There is no value that both clears 4.5:1 on white and matches `#FF5F29` by eye; clearing 4.5:1 puts you
at roughly L\*45 and `#FF5F29` is L\*62. That gap is physics, not taste.

**Three real options, Ahmad's call:**

- **(a) Take orange out of ink on light surfaces entirely.** `.eyebrow { color: var(--ink); }` and
  `.work-metric { color: var(--ink); }`. The orange then does only what DESIGN.md §7 Do #1 says it should —
  fills, the highlight block, rules, numerals, sparklines — and the eyebrow keeps its authority through
  700 weight + uppercase + 0.06em tracking. 18.9:1, Lighthouse 100, one orange on the whole site, and
  the `#FF5F29` fills get louder because nothing competes. **This is the recommendation.** It is a
  deviation from the board, which draws orange eyebrows, which is why it is his call.
- **(b) Leave `#CE340A`.** Passes AA, scores 100, and the clash stays.
- **(c) Revert `--orange-text` to `#FF5F29`.** Matches the board exactly, and reopens a real
  contrast failure plus Lighthouse 96.

**Whatever he picks, one piece is agent-fixable now:** `.work-metric` must not be a second orange
sitting 100px under a `#FF5F29` sparkline in the same card. Set it to `var(--ink)` and let the card's
orange be the chart alone.

---

### 4. §7 — ten cards in a four-column grid, and four blank plates  **[AGENT]** + **[AHMAD]**

Two problems compounding. Measured: `.work-grid` is `repeat(4, minmax(0,1fr))`, ten children,
so the rows are **4 / 4 / 2** and the last row leaves **672px of empty white** (two full columns)
beside the section's 100px bottom padding. It reads as a grid that ran out of content.

And the four "New project" cards render `.work-plate` as a **flat `#F2F3F5` rectangle with nothing in it**,
262 x 150px, sitting in a row beside cards with live orange sparklines. At a glance it reads as four
failed image loads, not as a deliberate "no data yet" state. In Arabic it is identical.

**Fix for the empty plate [AGENT]** — make the empty state look chosen:

```css
.work-plate:empty {
  background: transparent;
  border: 1px dashed var(--hairline-light);
  display: grid; place-items: center;
}
.work-plate:empty::after {
  content: attr(data-empty);           /* "First data month: August 2026" */
  font-size: var(--fs-foot-l); color: var(--muted-on-light); padding: 0 16px; text-align: center;
}
```

**Fix for the half row [AHMAD]** — this is a count decision, not a CSS one. Either ship **8** or **12**
cards (a clean 2 or 3 rows), or accept the 4/4/2. Build-spec §7 says card 11 is waiting on him and
"the four New project cards stay in natural order; do not herd them into the last row" — that instruction
is being followed, and it is what produces the ragged tail. Worth re-asking now that it is visible.

The task brief said eleven cards; the live build serves **ten**.

---

### 5. §4 — the orange column rules are hard-coded to 312px inside 440px blocks  **[AGENT]**

```css
.wwd-block + .wwd-block::before { ... height: 312px; }   /* line 370 */
```

Measured at 1440 EN, `.wwd-block` is **440.3px** tall. So each rule stops **128px short** of the row, and
column 3's body — 7 lines where columns 1 and 2 run 4 and 6 — finishes roughly **80px below the end of both
rules**. The rules look truncated and the last column looks unsupported. On the board the rule runs the full
height of the tallest column.

Same cause as §7 and §5: ragged copy inside a stretched grid. The three bodies start at three different
heights (y 2857 / 2826 / 2888), against the board's 22px spread.

**Fix:**

```css
.wwd-block + .wwd-block::before { inset-block: 0; height: auto; }   /* the block is already position: relative */
```

The rule then tracks whatever the tallest column is, at every width and in both languages.
Build flaw, not a board flaw (the board's rule matches its content exactly).

---

## Tier 2 — visible, worth fixing before he looks

### 6. Hero — one-word orphan under the headline  **[AGENT]**

`#hero .lead` is capped at 720px and the shipping string sets in **three lines with `cite.` alone on line
three**, dead centre, directly above the CTA row. The board draws two balanced lines. Measured line widths
704 / 700 / 46.

**Fix:** `#hero .lead { max-width: 790px; text-wrap: pretty; }` — 790px takes it to two lines at 1440 and
`text-wrap: pretty` prevents a single-word last line at every other width.

### 7. Ragged card content inside stretched grids — §3 and §5  **[AGENT]** + **[AHMAD]**

| Grid | Card size (EN) | Board | What is ragged |
|---|---|---|---|
| §3 problem | 428 x **499.9** | 426 x **374** | bodies run **6 / 5 / 4** lines; cards 2 and 3 carry **68px and 99px of dead space** above their 36px padding, card 1 is full |
| §5 included | 400 x **396.6** (row 1) / **359.8** (row 2) | 400 x **226** | titles run **1–3** lines, so bodies start at four different heights; **the two rows are 37px different in height** |

The Arabic page is clean in both: §3 cards 427.8 (all three), §5 cards **343.3 — all six identical**.
So the rag is English copy length, not the grid.

**[AGENT]** fix for the §5 title rag — give the title a two-line slot so the bodies share a baseline:

```css
.icon-card .h3 { min-height: calc(2 * 1.15em); }   /* --lh-h3 is 1.15 */
```

**[AHMAD]** the underlying cause is that three §3 bodies and six §5 titles are different lengths where the
board drew them equal. Trimming card 1's §3 body from 6 lines to 4, and §5's two three-line titles to two
lines, would bring both grids to the board's proportions. That is copy, so it is his.

### 8. Offer page — white icon tiles, an uncapped FAQ, and orange in eight jobs  **[AGENT]**

`/offer/` and `/en/offer/` are `#101012` top to bottom with one `#FF5F29` band. Three things:

- **White icon plates.** `.offer-row img { background: #FEFEFE }` (line 531) puts a hard-edged white square
  behind each 60x60 icon so the black strokes survive on the dark row. The artwork is trimmed to its
  bounding box and `object-fit: contain`, so it **touches all four plate edges** and reads as a cropped
  sticker. It is also the only white-on-dark tile on the whole site — and build-spec §7 records that a
  near-white plate behind these exact icons was a bug already fixed on the homepage.
  **Fix:** `.offer-row img { width: 76px; height: 76px; padding: 8px; }` — the mark then sits inside the
  plate instead of bleeding off it. If he would rather have no plate at all, use `.offer-row .n`
  (the orange outline numeral the eligibility rows already use) and drop the icons.
- **The FAQ runs the full 1320px.** `#offer-faq .faq-list { max-width: none; margin-inline: 0 }` (line 547)
  overrides the homepage's 785px. Measured: the open answer sets **103-character lines**, the worst measure
  on the site, and the `+` icon is marooned 1260px from the question.
  **Fix:** `#offer-faq .faq-list { max-width: 900px; }` — keeps the page's left alignment, fixes the measure.
- **The orange is doing eight jobs here**, against DESIGN.md §7's "three, and if you reach for a fourth use
  `--ink`, white or a hairline": pill fill, countdown box 2px outline **and** numeral, eligibility row 2px
  outline **and** numeral, a 367px full-bleed `#FF5F29` section, FAQ icon, icon accents, CTA fill, highlight
  block. The full-orange band is the page's one pattern break and it is the best thing on it — keep it.
  The two that pushed it over are the 2px outlines.
  **Fix:** `.offer-row.ruled { border: 1px solid rgba(255,255,255,0.12); }` — the orange numeral inside
  already carries the accent, and the countdown boxes stay orange as the urgency device.

### 9. Footer  **[AGENT]**

- **The footer sits 13px inboard of every section above it.** `.site-footer .wrap { max-width: 1294px }`
  (line 475) against `.wrap { max-width: 1320px }` everywhere else. Measured: the footer logo starts at
  **x=73**, every section's content at **x=60**, the header logo at **x=54**. Three left edges down one page.
  Build-spec §6 derived 1294 from the board's *divider*, which is not a content edge.
  **Fix:** delete line 475 and let the footer use the 1320px `.wrap`.
- **Phone tap targets.** Measured at 390: every footer link is **350 x 24.7px** with **zero** vertical gap
  between them — eleven stacked links, all under the 44px minimum DESIGN.md §8 specifies, all touching.
  The bottom-row links (`q8block.com`, `العربية`) are **16px** tall.
  **Fix:** `@media (max-width: 767px) { .footer-col a, .footer-mini a { padding-block: 11px; line-height: 1.4; } }`
- **`line-height: 1.9` on the address.** Line 479 applies the board-measured link leading to
  `.footer-col p` as well. The address wraps to **five lines** in a 218px column and the lines float apart.
  **Fix:** `.footer-col p { line-height: 1.5; }` — leave the links at 1.9.
- **Column lengths.** Three columns carry 3 links each, the Contact column carries 10 lines, so the grid is
  258px tall and three quarters of it is empty under columns 1–3. Not a bug, but the footer is **899px tall
  on a phone** — taller than the final call (462px) and nearly the FAQ (848px), which is a lot of page to
  close on.

### 10. §6 — the section ends twice  **[AGENT]** for treatment, **[AHMAD]** for the copy

The three journey cards are the strongest thing on the page (see "what is good" below). But after the
sparkline the section carries **400px of undesigned tail**: three note paragraphs at `--fs-caption` (21px)
running to 940px and 8 lines, a 14px source line, and a lone outline WhatsApp button hanging off the
bottom-left. The board ends §6 on the sparkline — that is its closing gesture — and here it is buried
mid-section. One Arabic note line measures **87 characters**.

It is also a hierarchy inversion: 8 lines of running prose set *smaller* (21px) than the two-line card
bodies above it (23px).

**Fix for the treatment:** cap the notes at the same measure as the source line and separate them from the
sparkline properly.

```css
.journey-notes { max-width: 780px; }                       /* was 960px */
.journey-notes p { font-size: var(--fs-foot-l); line-height: 1.6; }   /* 14px — these are footnotes, set them as footnotes */
.journey-notes { margin-block-start: 56px; }
```

Then put the WhatsApp button on the same block as the source line rather than below it.

### 11. Paired CTAs are never equal width  **[AGENT]**

| Row | Primary | Outline | Board |
|---|---|---|---|
| Hero | 202.2px | **226.3px** | 186 / 186, equal |
| Final call | 214.2px | **238.3px** | 201 / 200, equal |

Both rows are off by the same 24px, in both languages. The board draws a matched pair; the build draws a
short button beside a long one, centred, so the mismatch is on the page's centre axis twice.

**Fix:** `.btn-row .btn { min-width: 226px; justify-content: center; }` on desktop — or set the pair to
`flex: 0 0 226px`. (The phone rule at line 586 already makes them both full width, which is right.)

### 12. §7 — caption, metric and link are three roles inside 2px of each other  **[AGENT]** / **[BOARD]**

Inside one 312px card the ladder is **21 → 32 → 20 → 14 → 19**: `.work-caption` 21px, `.work-site` 32px,
`.work-metric` 20px, `.work-period` 14px, `.work-link` 19px. Caption (21), metric (20) and link (19) are
three different jobs distinguished only by colour and weight. **On a phone caption and metric are both 15px** —
identical. And the build **inverts the board**, which draws the category caption clearly smaller than the
metric; here the caption is the larger of the two.

The 21px comes from build-spec §2.2, measured off the board. The measurement is defensible; the *relationship*
it produces is not.

**Fix:** `.work-caption { font-size: clamp(13px, calc(16/14.4 * 1vw), 17px); }` — the ladder becomes
16 → 26 (after finding 1) → 20 → 14 → 19, which reads. Flagged as a board-carried flaw because it means
departing from a measured board value.

---

## Tier 3 — measured, reported, do not act without Ahmad

### 13. The H1 is ~16% wider than the board at the same cap height  **[AHMAD]** / **[BOARD]**

Pixel-scanned from `hero-C.png` at full resolution and from a 1:1 build capture:

| | Board (css px) | Build (css px) | Ratio |
|---|---|---|---|
| Highlight block `find you` | 309.6 x 77.1 | **381 x 86** | 1.23 w / 1.12 h |
| Line 2 ink, `on Google and in AI.` | 743 | **869** | **1.17** |
| Line 1 ink, `Customers` | 403 | **464** | **1.15** |
| `Customers` ink height | 84.1 | 88 | 1.05 |

So the build matched **cap height** (within 5%) but the board's typeface sets ~16% narrower at that cap
height — exactly the "the board font is not Alexandria" problem build-spec §0 documents. Build-spec claims
"width and cap height agree within ~2%"; on this element they do not.

The knock-on effects are real: the H1 nearly reaches both gutters, the subhead is pushed to three lines
with a one-word orphan (finding 6), and all four trust-row items wrap to two lines (finding 16).

**Do not let an agent shrink this.** Three builds were scrapped for being *too small*, build-spec §2.1 calls
the 86px value proved and locked, and a 16% cut would be the most visible change on the page. Ahmad should
see the board and the build side by side and say whether the difference bothers him.

### 14. The offer hero is 27% taller than its board and pushes the CTAs below the fold  **[AHMAD]**

The offer boards are 1520 x 2688, aspect 0.565, i.e. a **390 x 690** phone frame. The board fits the whole
hero — logo, pill, H1, a **three-line** lead, countdown, spots line, both CTAs — inside that frame.
The build's `#offer-hero` measures **877.6px** at 390, because the shipping lead sets in **seven lines**.
Measured: the `Call now` button's top is at y≈760 on a 390x844 screen — it clears, barely, and any browser
chrome puts it under. This page is the WhatsApp landing page and is close to 100% mobile.

Approved copy, so his call. If he wants it above the fold, the lead needs to come down to three or four lines.

### 15. The offer H1 highlights a different phrase than the board  **[AHMAD]**

Board `offer-1.png` draws the orange block on the **whole of line two — `no contract.`** — the offer's
punchline. The build highlights the single word **`free`** mid-line-one and leaves line two plain.
The board's version is markedly stronger. build-spec §4 says the highlighted word per section comes from
`copy.md` and is never invented, so this is copy-vs-board, not a build error — but it is a visible
deviation from an approved board and he should confirm it.

### 16. Hero trust row wraps 4/4 where the board wraps 1/4  **[AHMAD]**

`ul.trust` is 1260px for four items at ~315px each with `padding-inline: 34px`, leaving 247px of text width.
All four shipping strings wrap to two lines in both languages; the board wraps one of four. The row reads as
a two-line block rather than a clean single line, and the 2px orange separators stretch to 50px to cover it.
Copy length is the cause. A no-copy partial fix: `.trust { max-width: none; }` (currently inset 36px inside
the 1332px hero column) buys 18px per item — not enough on its own.

### 17. Arabic — the sparkline and the §7 charts stay LTR  **[AHMAD]**

`/`'s §6 sparkline still rises **left to right**. To an Arabic eye scanning right to left it reads as
falling. But the §7 chart plates are real Google Search Console captures and cannot be mirrored, so
mirroring §6 alone would make the two charts on one page disagree. **Consistency argues for leaving it,
and I would leave it** — flagging it only because the task asked. Everything else mirrors correctly
(see below).

---

## What is genuinely good — do not "fix" these

1. **§6 The journey.** The cut from nine lines to two landed. Measured: card body is exactly **2 lines /
   62.1px**, and the content bottom sits **exactly 32px** above the card bottom — no dead space, the cards
   are full. At 587px against the board's 494px the gap is entirely the figure row that build-spec §8
   requires and the board does not carry; take the figure out and you get 581px, so the board's own 494
   is not reachable with a 343x296 illustration, a 44px title and 32px padding. **The cards do not look
   empty. Leave them alone.**
2. **§8 FAQ.** The closest match on the site. Question and answer share a left edge at x=357.5 (both carry
   the 29px inline padding), 785px column centred at x=327.5, 17px between rows, 78.5px closed rows against
   the board's 72, `+`/`−` both `var(--orange)`. The one quiet section on a loud page, sitting exactly where
   a rest belongs — between §7 and §9. It is not dead, it is a breath.
3. **The dark-band pattern.** Backgrounds in order: `#F2F3F5` → `#121215` strip → `#FEFEFE` → `#F2F3F5` →
   `#FEFEFE` → **`#101012`** → `#FEFEFE` → `#F4F5F6` → **`#101012`** → `#030303`. **Two full dark breaks**
   (§6, §9) plus a 78px strip and the footer. That is the rule followed exactly — not alternating. The
   `#FEFEFE`/`#F2F3F5` alternation on the light half is board-faithful and reads as texture, not as a
   mechanical stripe.
4. **Section vertical rhythm.** Measured padding is consistent and deliberate: **72/72** on §3, §4, §5, §6,
   §8; **100/100** on §7 (the proof section, given room); **116/76** on §9 (the oversized close);
   **48/40** on the footer; **19.5/19.5** on the strip. Identical in both languages. On a phone everything
   collapses to a uniform 40/40. The larger `inkBot` numbers (§3 109, §5 105, §7 125) are card padding
   inside the last row, not a padding error. **Nothing floats and nothing cramps.**
5. **Optical alignment of the heads.** In every left-aligned section the eyebrow, H2 and lead share
   **x=60** to the pixel, and every card's inner content starts at exactly `card + border + padding`
   (§3 97, §5 129, §7 85). Centred sections (§5, §8, §9) are centred, not approximately centred.
   The only misalignment on the page is the footer (finding 9).
6. **Radii and hairlines.** Every `border-radius` in the stylesheet is **0, 3px or 100px** — the whole
   vocabulary, nothing in between, no stray 8px card. Card borders are a uniform `1px solid #D2D7DD` on
   every light card (§3, §5, §7, §8); §6 cards correctly have none and are told apart by `#1A1C20` on
   `#101012`. `box-shadow` appears nowhere at rest.
7. **The Arabic page holds its rhythm — in several places better than the English.** The §9 override
   (headings x0.75, body x0.9, `--lh-body` 1.85, weight 400) works. Arabic §3 cards are 427.8px all three;
   Arabic §5 cards are **343.3px all six**; Arabic §7 cards are **exactly 405px**, the board number, with
   zero domain wraps and every metric on one baseline. It does **not** feel heavier or more crowded than
   the English — the one exception is the hero, which keeps the English 86px per build-spec §9 and does
   crowd both gutters on line two.
8. **RTL mirroring is correct everywhere it matters.** Logo lockup moves to the right and the `Q8` box does
   **not** mirror internally; nav order, card order (§3 map card is rightmost, §6 البناء is rightmost),
   trust items, footer columns, the `←` in `افتح الموقع`, and the last §7 row starting from the right
   column all mirror. The §3 and §6 illustrations mirror — correct, they are UI scenes with a reading
   direction. Digits stay Western and stay LTR-isolated. The highlight block ports with zero change
   because it is percentage-based.
9. **The phone type scale holds.** At 390: 38 → 30 → 22 → 18 → 16 → 15 → 14 → 12. A clean eight-step ladder
   with no two levels competing (except caption/metric, finding 12). Buttons are 350 x 48.9px, the burger is
   44 x 44px, the side gutter is a consistent 20px, no horizontal overflow on any of the four page/viewport
   combinations.
10. **The offer page's orange band.** 367px of full-bleed `#FF5F29` with black type is the single pattern
    break on an otherwise monotone dark page, and it is the right move in the right place. Keep it.

---

## Summary of the one-line fixes an agent can apply without asking

```css
.work-site   { font-size: clamp(18px, calc(26/14.4 * 1vw), 28px); overflow-wrap: normal; }
.lead        { max-width: 860px; }
.wwd-block + .wwd-block::before { inset-block: 0; height: auto; }
#hero .lead  { max-width: 790px; text-wrap: pretty; }
.icon-card .h3 { min-height: calc(2 * 1.15em); }
.work-caption { font-size: clamp(13px, calc(16/14.4 * 1vw), 17px); }
.work-metric { color: var(--ink); }
.btn-row .btn { min-width: 226px; justify-content: center; }
.site-footer .wrap { max-width: 1320px; }   /* delete the 1294 override */
.footer-col p { line-height: 1.5; }
.journey-notes { max-width: 780px; margin-block-start: 56px; }
.journey-notes p { font-size: var(--fs-foot-l); line-height: 1.6; }
.offer-row img { width: 76px; height: 76px; padding: 8px; }
.offer-row.ruled { border: 1px solid rgba(255, 255, 255, 0.12); }
#offer-faq .faq-list { max-width: 900px; }
@media (max-width: 767px) { .footer-col a, .footer-mini a { padding-block: 11px; line-height: 1.4; } }
/* plus the .work-plate:empty block in finding 4 */
```

## Waiting on Ahmad

1. **The two oranges** — (a) drop orange ink on light entirely, (b) keep `#CE340A`, or (c) revert to
   `#FF5F29` and accept the contrast failure. Recommendation: (a).
2. **§7 card count** — 10 cards leaves a half-empty last row. Ship 8, ship 12, or accept it.
3. **The H1 is 16% wider than the board** at matched cap height. Show him the pair; do not touch it otherwise.
4. **The offer hero's seven-line lead** pushes the CTAs under a 390x844 fold. Copy decision.
5. **The offer H1 highlights `free`** where the approved board highlights `no contract.`
6. **§3 and §5 card copy lengths** — trimming §3 card 1 from 6 lines to 4, and the two three-line §5 titles
   to two, brings both grids back to the board's proportions.
