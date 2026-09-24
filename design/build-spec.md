# Q8Block — locked build specification

**Status:** LOCKED, 2026-09-24. This file is the build contract for the Q8Block homepage.
**Authority:** the approved boards in `design/boards/` are the spec for layout, type size, weight, colour,
spacing and imagery. `design/copy.md` is the spec for the words. `DESIGN.md` is the underlying system and
loses to the boards wherever the two disagree — every disagreement found is listed in §11.

**Why this file exists.** Three approved designs have now been rebuilt with different fonts, different type
sizes and different images, and all three were scrapped. Ahmad's instruction: if the build does not match the
boards it is discarded. Nothing below is a suggestion. Where a number is written, use that number.

---

## 0. How every number in this file was obtained

The boards are 2688 x 1520 px PNGs. The board canvas represents a **1440 px wide screen**, so:

```
scale = 1440 / 2688 = 0.535714
css_px = board_px x 0.535714
```

Type sizes were **not** eyeballed. For each text element:

1. The glyph ink box was located in board pixels by scanning pixel rows and columns for the
   background-to-ink transition (no thumbnails, no guessing).
2. The same string was rendered in **Alexandria at the same weight in real Chrome**, and its ink width read
   from `canvas.measureText().actualBoundingBoxLeft/Right`.
3. `font-size = board_ink_width_css / alexandria_ink_width_at_200px x 200`.
4. Cross-checked against cap height using Alexandria's own measured ratios
   (flat cap `H`/`I` = 0.672 em, round cap `C`/`G` = 0.7031 em, x-height = 0.4688–0.4844 em,
   ascender `d` = 0.6875 em, descender `p` = 0.20 em, digits = 0.7031 em).

Width and cap height agree within ~2 % on every display element. Where a board's own render varies
(these are generated images, so the same role is drawn a few percent differently board to board), the
measured spread is printed next to the locked value so the next agent can see it was a decision, not a guess.

**Two things the board font is not.** The boards were drawn by an image model in a geometric grotesque that
is *not* Alexandria: its x-height/cap ratio is 0.745 against Alexandria's 0.689, and its ascenders sit
higher. Matching **cap height and line width** reproduces the board; matching x-height does not. All sizes
below are cap-and-width matched.

Fluid values are written `calc(<px>/14.4 * 1vw)` so the value is exact at 1440, with a `clamp()` floor for
phones and a ceiling so type stops growing on very wide monitors.

**The H1 value was proved, not just calculated.** Alexandria 600 at `calc(86/14.4 * 1vw)` with
`line-height: 1.05` and the §4 highlight rule was rendered in Chrome at 1440 and placed beside the
`hero-C.png` crop: same two-line break, same line width to within ~2 %, same highlight block height and
position. Do the same before changing any number in this file.

---

## 1. Font

**One family, both scripts: Alexandria** (variable 100–900, Latin + Arabic), self-hosted WOFF2, two subsets
with `unicode-range` so `/en/` never downloads Arabic glyph data. `font-display: swap`. Ship weights
**300, 400, 600, 800 only**.

```css
--font: 'Alexandria', 'Noto Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif;
```

| Role | Weight | Notes |
|---|---|---|
| H1 (hero display) | **600** | Board-matched |
| H2 (section headings) | **600** | Board-matched |
| H3 (card titles, FAQ questions, journey card titles) | **600** | |
| Eyebrow / section label | **700** | uppercase + `0.06em` tracking on Latin only. Re-measured 2026-09-24: every board draws it bold, not semibold (see §14) |
| §6 month label | **600** | uppercase + `0.06em` tracking on Latin only |
| Body, subheads, card bodies, captions — **Latin** | **300** | |
| Body, subheads, card bodies, captions — **Arabic** | **400** | 300 reads thin and unfinished in Arabic |
| Buttons (both locales), offer-strip pill | **700** | Re-measured 2026-09-24 against the board at matched scale (§14). The board draws `Call now`, `WhatsApp` and `Limited offer` bold |
| Trust row, footer column headings | **600** | |
| §7 metric figure | **700** | §14 |
| Footer links, legal line, tagline | **400** | |
| Logo wordmark `block` | **800** | The board's wordmark is heavier than the headings |
| Section 4 step numerals `01 02 03` | **600**, drawn as an **outline** | `color: transparent; -webkit-text-stroke: 2.5px #FF5F29` |

No second family anywhere. No Cairo.

---

## 2. Measured type scale

Board px is the measured ink dimension the size was derived from. CSS px is at a 1440 viewport.

### 2.1 Display and headings

| Element | Board ink | CSS px | Fluid value | Clamp to write |
|---|---|---|---|---|
| **H1** hero (§1) | line ink 1363 / 1386 px wide | **86** | `calc(86/14.4 * 1vw)` | `clamp(38px, calc(86/14.4 * 1vw), 94px)` |
| **H2** sections 3,4,5,6,7,8 | see spread below | **80** | `calc(80/14.4 * 1vw)` | `clamp(30px, calc(80/14.4 * 1vw), 88px)` |
| **H2** section 9 (final call) | 2044 / 1060 px wide | **88** | `calc(88/14.4 * 1vw)` | `clamp(34px, calc(88/14.4 * 1vw), 96px)` |
| **H3** card title — s3, s5, s7 | 470 / 466 / 362 px wide | **32** | `calc(32/14.4 * 1vw)` | `clamp(22px, calc(32/14.4 * 1vw), 35px)` |
| **H3** block title — s4 | 291 px wide | **40** | `calc(40/14.4 * 1vw)` | `clamp(26px, calc(40/14.4 * 1vw), 44px)` |
| **H3** card title — s6 journey | 175 / 535 px wide | **44** | `calc(44/14.4 * 1vw)` | `clamp(28px, calc(44/14.4 * 1vw), 48px)` |
| **H3** FAQ question — s8 | 864 / 856 px wide | **30** | `calc(30/14.4 * 1vw)` | `clamp(19px, calc(30/14.4 * 1vw), 33px)` |

**H2 measured spread, board by board** (this is why 80 px is the locked value, not a guess):
s3 71.1 / 75.8 · s4 86.3 / 87.0 · s5 74.0 · s6 71.5 / 72.7 · s7 79.1 · s8 87.5 · s9 85.1 / 93.1.
Eleven readings, mean **80.3**, median 79.1. Locked at **80** for sections 3–8, **88** for section 9,
which the board draws visibly largest and the brief calls the oversized close.

### 2.2 Body, labels and UI

| Element | Board ink | CSS px | Fluid value | Clamp to write |
|---|---|---|---|---|
| Eyebrow / section label | cap 30–36 px | **22** | `calc(22/14.4 * 1vw)` | `clamp(14px, calc(22/14.4 * 1vw), 24px)` |
| Hero subhead (§1) | 1264 / 1222 px wide | **27** | `calc(27/14.4 * 1vw)` | `clamp(18px, calc(27/14.4 * 1vw), 30px)` — container max-width **720px** |
| Section subhead / lead (§3–9) | see spread below | **29** | `calc(29/14.4 * 1vw)` | `clamp(18px, calc(29/14.4 * 1vw), 32px)` |
| Card body / running body | 492 / 467 / 476 px wide | **23** | `calc(23/14.4 * 1vw)` | `clamp(16px, calc(23/14.4 * 1vw), 25px)` |
| FAQ answer | 1044 px wide | **24** | `calc(24/14.4 * 1vw)` | `clamp(16px, calc(24/14.4 * 1vw), 26px)` |
| Hero trust row item | 419 / 524 / 186 px wide | **20** | `calc(20/14.4 * 1vw)` | `clamp(15px, calc(20/14.4 * 1vw), 22px)` |
| Button label (hero + final call) | 158 / 176 / 197 px wide | **23** | `calc(23/14.4 * 1vw)` | `clamp(19px, calc(23/14.4 * 1vw), 25px)` — floor raised from 17, see §14 |
| Header nav link | 169 / 181 / 127 px wide | **18** | `calc(18/14.4 * 1vw)` | `clamp(15px, calc(18/14.4 * 1vw), 20px)` |
| Header CTA label | inside a 235 x 76 px box | **18** | `calc(18/14.4 * 1vw)` | `clamp(15px, calc(18/14.4 * 1vw), 20px)` |
| Logo wordmark `block` | 219 px wide | **44** | `calc(44/14.4 * 1vw)` | `clamp(28px, calc(44/14.4 * 1vw), 48px)` |
| Offer-strip pill label | 187 px wide | **18** | `calc(18/14.4 * 1vw)` | `clamp(14px, calc(18/14.4 * 1vw), 20px)` |
| Offer-strip line | 621 px wide | **18** | `calc(18/14.4 * 1vw)` | `clamp(14px, calc(18/14.4 * 1vw), 20px)` |
| Countdown numerals | 256 px wide | **20** | `calc(20/14.4 * 1vw)` | `clamp(16px, calc(20/14.4 * 1vw), 22px)` |
| §4 step numeral `01` | 172 x 100 px | **76** | `calc(76/14.4 * 1vw)` | `clamp(44px, calc(76/14.4 * 1vw), 84px)` |
| §6 month label `MONTH 1` | 137 px wide | **15** | `calc(15/14.4 * 1vw)` | `clamp(12px, calc(15/14.4 * 1vw), 16px)` |
| §7 card caption | 545 px wide | ~~21~~ **16** | `calc(16/14.4 * 1vw)` | `clamp(13px, calc(16/14.4 * 1vw), 17px)` — reduced 2026-09-24, see §14 |
| §7 card site name | — | **24** | `calc(24/14.4 * 1vw)` | `clamp(18px, calc(24/14.4 * 1vw), 26px)` — its own value; it used to borrow the 32px H3 and wrapped. §14 |
| §7 metric figure | 349 px wide | **20** | `calc(20/14.4 * 1vw)` | `clamp(15px, calc(20/14.4 * 1vw), 22px)` |
| §7 `View case study` link | 225 px wide (excl. arrow) | **19** | `calc(19/14.4 * 1vw)` | `clamp(15px, calc(19/14.4 * 1vw), 21px)` |
| Footer column heading | 133 px wide | **21** | `calc(21/14.4 * 1vw)` | `clamp(16px, calc(21/14.4 * 1vw), 23px)` |
| Footer link | 167 px wide | **14** | `calc(14/14.4 * 1vw)` | `clamp(13px, calc(14/14.4 * 1vw), 16px)` |
| Footer legal line | 413 px wide | **14** | `calc(14/14.4 * 1vw)` | `clamp(12px, calc(14/14.4 * 1vw), 16px)` |
| Footer tagline | 26 px cap | **18** | `calc(18/14.4 * 1vw)` | `clamp(14px, calc(18/14.4 * 1vw), 20px)` |

**Section subhead measured spread:** hero 27.2 / 26.7 · s3 31.9 / 32.7 · s4 29.8 / 28.9 · s5 29.0 / 27.6 ·
s7 31.2 · s9 28.2. Mean 29.3. Hero keeps its own **27** (measured twice, consistently); every other section
uses **29**.

### 2.3 Line height and tracking (English)

Measured from baseline-to-baseline pitch on the boards.

| Role | Measured | Locked | Note |
|---|---|---|---|
| H1 | pitch 157 board px / 86 px font = **0.98** | **1.05** | 1.05 is the smallest value that clears Alexandria's ascender+descender (0.89 em) with air. Do not use 1.1+, it breaks the two-line hero. |
| H2 | s3 1.00 · s4 0.97 | **1.05** | Same reasoning |
| H3 card titles | pitch 65 / 32 = 1.03 (s3 two-line title) | **1.15** | |
| Subhead / lead | hero 1.25 · s3 1.24 · s4 1.22 · s5 1.21 · s9 1.14 | **1.25** | |
| Body / card body | s3 1.35 · s4 1.35 · s5 1.30 · s6 1.13 · s8 1.22 | **1.35** | |
| Eyebrow, buttons, labels | — | **1.1** | |
| Footer links | pitch 32 board px | **1.9** | Generous, as drawn |

Letter-spacing: **0** everywhere except Latin eyebrows and the §6 month label, which are
`text-transform: uppercase; letter-spacing: 0.06em`. Arabic gets **neither** (no case, and tracking breaks
joined letterforms).

---

## 3. Colour — sampled out of the boards

Every value below is the modal colour of the matching pixels in the named board, not a token copied from
`DESIGN.md`. Disagreements are called out in §11.

### 3.1 Surfaces

| Token | Value | Sampled from | Used on |
|---|---|---|---|
| `--bg-white` | `#FEFEFE` | s3, s5, s7 | Sections 3, 5, 7 |
| `--bg-light` | `#F2F3F5` | hero-C, s4 (`#F4F5F6` on s8) | Sections 1, 4, 8 |
| `--bg-dark` | `#101012` | journey-D, s9 (`#121215` on the hero strip) | Sections 2, 6, 9 |
| `--bg-card-dark` | `#1A1C20` | journey-D card fill | Section 6 cards |
| `--bg-footer` | `#030303` | s9 footer band | Section 10 |
| `--bg-card-light` | `#FEFEFE` | s3, s5, s7 | Sections 3, 5, 7 cards — **identical to the page**; the card exists only because of its hairline |
| `--bg-panel` | `#FFFFFF` | s8 accordion rows | Section 8 rows, on `#F4F5F6` |

### 3.2 Ink

| Token | Value | Sampled from | Used on |
|---|---|---|---|
| `--ink` | `#0A0A0C` | hero H1 glyph core `#08080A`, s3 H2 `#000000` | All headings and display text on light surfaces |
| `--ink-invert` | `#FFFFFF` | s9, journey-D headlines | Headings on dark surfaces |
| `--muted-on-light` | **`#686F79`** (board draws `#8F97A1`) | hero subhead `#8D939B`, s3 body `#8E97A3`, s3 subhead `#959EA9` | Body copy, subheads and captions on white / `#F2F3F5` |
| `--muted-on-dark` | `#949BA6` | journey-D body `#929EAD`, s9 subhead `#9AA0A9`, footer link `#8E949E` | Body copy on the dark bands and in the footer |

> **The one deliberate departure from the board in this whole file.** The boards draw light-section body
> copy at `#8F97A1`, which is **2.92:1** on white and fails WCAG AA even at the large-text 3:1 threshold.
> The build ships `#6E757F` (**4.65:1**), the nearest value in the same cool-grey family that passes.
> It is a 20-unit shift, visible only side by side. `DESIGN.md`'s own `#6b6e72` is warmer; `#6E757F` keeps
> the board's cool cast. Ahmad-reversible in one token if he wants the board's exact grey.

### 3.3 Accent and lines

| Token | Value | Sampled from | Used on |
|---|---|---|---|
| `--orange` | `#FF5F29` | highlight blocks `#FE5F28`, CTA fill `#FD6029`, s9 block `#FE5E27`, eyebrow `#FE632B` | Button fills, the headline highlight block, eyebrows, small labels, rules, the §7 metric, the countdown, the §4 numeral stroke, the §6 sparkline |
| `--hairline-light` | `#D2D7DD` | s3 `#C8CED4`, s7 `#C9CED3`, s5 `#D8DCE1` | 1px card borders on white sections |
| `--hairline-dark` | `rgba(255,255,255,0.08)` | s9 band divider | Divider above the footer |
| `--rule-accent` | `#FF5F29`, **2px** | hero trust separators 4 board px, s4 column rules 4 board px | The vertical rules in the hero trust row and in §4 |

`DESIGN.md`'s `#FF5F29` is confirmed exactly by every board. It is the only accent, and since the
2026-09-24 revert (§14) it is the only orange **value** as well: fills and ink alike. A second, darker
`--orange-text` was tried for one day and removed. Three jobs plus the
structural rules listed above; if you reach for orange a fifth way, use `--ink`, white or a hairline instead.

---

## 4. The headline highlight — measured, and it is NOT DESIGN.md's 9px bar

Every board draws the highlighted words as a **solid orange block the full height of the type, with
near-black text sitting on it** — including on the dark bands, where the text goes black, not white.
`DESIGN.md` §4 specifies a 9px-tall highlighter bar at 80 % down. That is NP Digital's move and it is
**not what was approved here.**

Measured block height against the font size of its own line:
hero 0.90 em · s3 1.03 · s4 0.95 · s5 1.04 · s6 1.09 · s7 0.99 · s9 0.99. Mean **1.00 em**.
Measured vertical position inside the inline box: 59 %–92 %, mean **78 %**.
Measured horizontal overhang past the glyphs: 27 board px left, 21 right at an 86 px font ≈ **0.14 em**.

```css
.hl {
  background-image: linear-gradient(#FF5F29, #FF5F29);
  background-size: 100% 1em;        /* full block, NOT 9px */
  background-position: 0% 80%;
  background-repeat: no-repeat;
  padding-inline: 0.14em;
  color: #0A0A0C;                   /* black on orange on EVERY surface, light and dark */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
```

Percentage-based, so it needs **no** RTL adjustment — apply the identical rule to the Arabic word span.
The highlighted word per section is named in `copy.md`; never invent one.

---

## 5. Layout — containers, padding, gaps

### 5.1 Containers

| Container | Max width | Side padding @1440 | Content @1440 | Evidence |
|---|---|---|---|---|
| **Header + hero only** | **1500px** | **54px** | 1332px | hero-C content spans css 54.1 → 1386.4, symmetric. Matches the standing lesson exactly. |
| **All body sections (3–10)** | **1320px** | **60px** | 1320px | s3 card grid 1313.6 · journey-D card grid 1316.8 · journey-D sparkline 1321.6 · s7 card grid 1341.9 · footer divider 1293.8. Mean **1317.5**, locked at 1320 (on the 8px grid). |
| §5 icon grid (inside the body container) | **1248px**, centred | — | 1248px | s5 measured 1247.6 across both rows and all three columns, symmetric. Deliberate inset, not noise. |
| §8 FAQ accordion (inside the body container) | **785px**, centred | — | 785px | s8 panel measured 785.4, margins 327.9 both sides |

**The 1500px column is header and hero ONLY.** Applying it site-wide changed sections Ahmad had already
approved on a previous project. Do not.

Side padding steps: `clamp(20px, 4.17vw, 60px)` for body sections, `clamp(20px, 3.75vw, 54px)` for header + hero.

### 5.2 Section vertical padding

Measured as the gap from the board edge to the first/last ink, per board.

| Section | Top | Bottom | Measured (top / bottom) |
|---|---|---|---|
| Default (3, 4, 5, 6, 8) | **72px** | **72px** | s3 66.4/63.2 · s4 75.5/69.6 · s5 56.3/48.2 · s6 68.6/57.3 · s8 60.0/72.3 — median 68.6/69.6 |
| 1 Hero | **96px** (below the header block) | **64px** | 96.4 / 62.7 |
| 7 Our work | **100px** | **100px** | 98.6 / 102.3 |
| 9 Final call | **116px** | **76px** | 116.8 / 75.0 |
| 10 Footer | **48px** | **40px** | 47.6 / 40.2 |

Write as `clamp(40px, calc(72/14.4 * 1vw), 80px)` and scale the overrides the same way.

### 5.3 Internal rhythm (measured medians)

| Gap | CSS px |
|---|---|
| Eyebrow → H2 | **16** (s3 17.7 · s4 15.0 · s5 24.6 · s7 10.7 · s8 16.6 · s6 7.5) |
| H2 → subhead | **28** (s3 30.0 · s4 33.2 · s5 24.6 · s7 28.9 · s9 19.8) |
| Subhead → grid / cards | **40** (s3 37.0 · s4 61.6 · s5 37.0 · s7 45.0 · s6 33.8) |
| Hero H1 → subhead | **28** (27.3) |
| Hero subhead → CTA row | **40** (39.1) |
| Hero CTA row → trust row | **70** (70.2) |
| Hero trust row → offer strip | **64** (62.7) |

### 5.4 Grids and cards

| Section | Columns @desktop | Gap | Card width @1440 | Card padding | Card height |
|---|---|---|---|---|---|
| 3 Problem | 3 | **18px** (18.2 / 18.75) | **426px** (425.9) | **36px** (34.8–37.0) | 374px (373.9) |
| 5 Included | 3 (2 tablet, 1 phone) | **24px** (24.1 / 24.6 col, 25.7 row) | **400px** (399.1–400.0) | **32px** (31.6–32.1) | 226px (226.1) |
| 6 Journey | 3 | **20px** (19.8 / 20.4) | **425px** (425.4–425.9) | **32px** (33.8–34.8) | 494px (493.9) |
| 7 Our work | **4** (2 tablet, 1 phone) | **24px** (24.6 / 26.8) | **312px** — board drew 316.1–317.1 at a 1342px grid; at the locked 1320px container 4 cols with 24px gaps = 312 | **24px** (23.0–24.6) | 405px (405.0) |
| 8 FAQ | 1 (785px column) | **17px** between rows (32 board px) | 785px | **29px** inline, **21px** block | closed row **72px**, open row 176px |

Card borders: **1px solid `#D2D7DD`** on light sections (measured 3 board px ≈ 1.6 css, i.e. a 1px CSS line
plus antialiasing). Section 6 cards have **no border** — they are told apart by `#1A1C20` on `#101012`.
**Radius: `0px` on every card, panel, image and input.** The only radii that exist on this site are
`3px` (buttons) and `100px` (pills). Nothing in between.

### 5.5 Buttons

| Button | Box @1440 | Font | Padding | Radius |
|---|---|---|---|---|
| Header CTA (dark fill) | 126 x 41px (235 x 76 board) | 18px / 400 | `11px 30px` | 3px |
| Hero primary (orange fill) | 186 x 51px (347 x 96 board) | 23px / 400 | `14px 50px` | 3px |
| Hero secondary (outline) | 186 x 51px, **2px** border | 23px / 400 | `12px 48px` | 3px |
| Final-call primary | 201 x 54px (375 x 100 board) | 23px / 400 | `15px 56px` | 3px |
| Final-call secondary (outline) | 200 x 54px, **2px** border | 23px / 400 | `13px 54px` | 3px |
| Offer-strip pill | 136 x 39px (254 x 73 board) | 18px / 600 | `10px 18px` | **100px** |

Gap between the two CTAs: **20px** (hero 19.8, final call 20.4).
Hover: `opacity: 0.9`, `transition: 0.4s ease-in-out` — an opacity dim, never a different hex.
Focus ring: `0 0 0 3px rgba(255,95,41,0.45)`. Shadow: `none` at rest, everywhere.

---

## 6. Section order, background and structure

| # | Section | Selector (used by `scripts/compare.mjs` — build these exact ids) | Background | Structure |
|---|---|---|---|---|
| 0 | Header | `header.site-header` | `#F2F3F5` transparent over the hero, solid `#FFFFFF` on scroll | 1500px column. Logo lockup inline-start; five nav links + language link; CTA button inline-end. Header block height **112px** (logo lockup vertically centred at css y 55.8; `DESIGN.md` says 102 — see §11). Mobile 72px, full-screen `#000000` overlay menu below 990px. |
| 1 | Hero | `#hero` | `#F2F3F5` | 1500px column, **centred**. H1 on two lines with one highlighted phrase → subhead (two lines, max-width ~700px) → two CTAs side by side → a four-item trust row separated by 2px orange vertical rules. **The `Kuwait Block` line above the H1 on the board is DELETED.** |
| 2 | Offer strip | `#offer-strip` | `#121215` | Full-bleed dark band, **78px** tall (content 39px + 19.5px padding each side). One row, centred: pill → line → countdown label → countdown → spots line → underlined text link to `/offer`. Must render complete with `[COUNTDOWN]` removed and `[SPOTS]` empty. |
| 3 | The problem | `#problem` | `#FEFEFE` | 1320px. Eyebrow → two-line H2 (highlight on line 2) → two-line subhead → **3 cards**, 18px gaps. Each card: illustration 106 x 111px at 44px inset → two-line title → three-line body. |
| 4 | What we do | `#what-we-do` | `#F2F3F5` | 1320px. Eyebrow → two-line H2 (highlight on line 2) → two-line subhead → **3 blocks** separated by **2px orange vertical rules, 312px tall**. Each block: outline numeral `01`/`02`/`03` (76px, 2.5px orange stroke) → title → four-line body. Column pitch 463px. |
| 5 | What is included | `#included` | `#FEFEFE` | **Centred** eyebrow, H2 and subhead. Then a **1248px** grid, 3 x 2, 24px gaps, card 400 x 226px, padding 32px. Each card: **60 x 60px icon** → 20px gap → title → 16px gap → two-line body. |
| 6 | The journey | `#journey` | `#101012`, full bleed | 1320px. Eyebrow → one-line H2 (highlight on the last two words) → **3 cards** `#1A1C20`, 425 x 494px, 20px gaps, padding 32px, no border. Each card: illustration → orange month label → title (44px) → two-line body. Then a **full-width orange sparkline** across the whole 1320px container. |
| 7 | Our work | `#work` | `#FEFEFE` | 1320px. Eyebrow → one-line H2 → one-line subhead → **4-across** card grid, 24px gaps, card 312 x 405px, padding 24px, 1px hairline. Each card: chart plate 270 x 155px → caption → site name → orange metric → underlined `View case study →` link. Ships with **11 cards** — every SEO client — since Ahmad resolved card 11 on 2026-09-24 (`copy.md` §7). 4 columns gives 4 / 4 / 3, one empty slot in the last row instead of the two that ten cards left. The four `New project` cards stay in natural order; do not herd them into the last row. A card with fewer than three complete months gets a **dashed empty plate** carrying its first data month instead of a flat grey rectangle. |
| 8 | FAQ | `#faq` | `#F4F5F6` | **Centred** eyebrow and H2. Then a **785px** accordion, 17px between rows. Closed row 72px tall, `#FFFFFF`, 29px inline padding, question inline-start, orange `+` icon 23 x 23px inline-end. Open row shows a `−` and the answer at 24px. |
| 9 | Final call | `#final` | `#101012`, full bleed | **Centred.** Two-line H2 at 88px (highlight on line 2) → two-line subhead → two CTAs. Button row 201px + 20px + 200px. |
| 10 | Footer | `footer.site-footer` | `#030303` | 1294px inner. Divider `rgba(255,255,255,0.08)` above. Row 1: logo lockup + tagline inline-start, **four link columns**. Row 2, under a 1px divider: legal line inline-start, small links inline-end. |

**Layout families, in order:** centred hero · strip · 3-up cards · 3-up ruled blocks · 6-up icon grid ·
3-up illustrated stage cards + sparkline · 4-up client card grid · accordion · centred poster · footer grid.
No family repeats adjacent. Do not add, merge or reorder sections.

---

## 7. Where every image comes from

Nothing on this page is generated fresh. Nothing is substituted.

| Slot | Source | Notes |
|---|---|---|
| Logo lockup (header + footer) | **HTML and CSS**, built from `brand/logo/index.html` | Orange square `#FF5F29`, **67 x 56px**, hard 0px corners, white `Q8` inside; wordmark `block` beside it at 44px / weight 800 in `--ink` (header) or `#FFFFFF` (footer). **The board reads `Q8 digital`. That was a model slip. The mark reads `Q8 block`.** Never generate it as an image, and never mirror the `Q8` box in RTL. |
| §1 hero | No image. The hero is type on `#F2F3F5`; the LCP element is the H1. Preload the font subset, not a picture. |
| §3 card illustrations ×3 | Cropped from **`design/boards/s3.png`**, card interiors at board `x199,y761 197x207` (card 1) and the matching boxes in cards 2 and 3 | Render at **106 x 111px**. If Ahmad later wants standalone flat-2D illustrations instead, that is a separate 15-credit decision and needs his word first. |
| §4 step numerals | **Type**, not images | `01 02 03`, Alexandria 600 at 76px, `color: transparent; -webkit-text-stroke: 2.5px #FF5F29` |
| §5 deliverable icons ×6 | **`design/icons/v2/*-sq.png`** — 512 x 512 transparent PNGs, heavy near-black strokes with bright orange accents, trimmed and squared. Use these files directly. | Order follows `copy.md` §5 items 1–6: `website-build-sq.png`, `service-area-pages-sq.png`, `google-visibility-sq.png`, `ai-visibility-sq.png`, `backlinks-authority-sq.png`, `hosting-security-sq.png`. Converted to WebP at **240 x 240** (4x the slot, alpha preserved) into `src/img/icon-<name>.webp`. Render at **60 x 60px**. Do not regenerate, do not substitute, do not reorder. **Re-cut 2026-09-24 (fix pass):** `*-sq.png` had been squared onto an **opaque near-white canvas**, so at the 60 x 60 slot every mark sat on a faint grey tile that `s5.png` does not draw — the board puts the marks straight on the card. Every low-saturation pixel at or above 200 is now knocked out to transparent before the 240 x 240 WebP is written; the near-black strokes and the orange accents are untouched (orange averages ~120 with a wide channel spread). Re-run it with the snippet in §14. **Superseded 2026-09-24:** the first set, `design/icons/*.png`, was 240 x 179 **landscape and opaque** — at the 60 x 60 slot it letterboxed and read as a faint grey smudge, nothing like the bold marks `s5.png` draws. Those files stay on disk for reference and are no longer referenced by the build. `contact-sheet.png`, `sheet.png` and `icon-1..6.png` are untrimmed originals — do not ship them. |
| §6 stage illustrations ×3 | **`design/icons/journey/*.png`** — cropped from `journey-D.png` as part of this spec | `s6-month1-build.png` (board crop `x194,y403 640x552`), `s6-month2-discovered.png` (`x1024,y424`), `s6-month6-traction.png` (`x1891,y404`). All three are 640 x 552px transparent PNGs on one shared canvas; render at **343 x 296px**, `object-fit: contain`. Do not regenerate and do not swap in different drawings. |
| §6 sparkline | **Inline SVG**, drawn from the five real monthly rows in `copy.md` §6 | Full container width (1320px), 5 dots of **10px diameter** at 327.5px pitch, **2.5px** `#FF5F29` stroke, rising left → right over a **39px** band. Dot y-centres measured: 751.6, 747.1, 742.2, 735.5, 724.3 (board css). |
| §7 card charts ×10 | **Real Google Search Console captures** from the named client accounts | WebP, never upscaled past native width. A generated chart is a fabricated result and a launch blocker. |
| §7 card links | Real live client sites, `rel="nofollow noopener" target="_blank"` | Never a generated mockup |
| §2 / §8 / §9 / §10 | No images | |

All below-the-fold images: WebP, `loading="lazy"`, explicit `width`/`height`. CLS target 0.

---

## 8. Section 6 — the board is the layout, `copy.md` is the words

**The approved board is `design/boards/journey-D.png`.** `journey-A/B/C/E/F` and the two
`journey-options*.png` sheets are rejected explorations. Nothing is measured from them and nothing in the
build references them.

**Every word printed on `journey-D.png` is model-invented and it says "ranking".** The board reads
`Your content starts ranking`, `Higher rankings bring more traffic`, and titles `Build` / `Get discovered` /
`Get traction`. **None of that goes on the page.** `rank`, `ranking`, `يتصدر`, `نتصدر` and `ترتيب` have been
deliberately removed as selling words across the whole site (Ahmad, 2026-09-24). The real §6 copy —
eyebrow `كيف نعمل` / `How it works`, headline `هكذا يبدأ موقع جديد في الظهور` /
`How a new website starts getting found.`, the three stage labels, titles and bodies, the three figures
`7` / `165` / `531`, the precision note, the two baseline lines, the source caption and the closing WhatsApp
strip — is in **`copy.md` §6** and only there. Read layout off the board. Read words off `copy.md`. Never
transcribe text out of a board.

Measured layout, locked:

| Item | Value |
|---|---|
| Band background | `#101012`, full bleed |
| Section padding | 72px top, 72px bottom (measured 68.6 / 57.3) |
| Eyebrow | `x` at container start, 22px / 600, `#FF5F29`, uppercase + 0.06em |
| Eyebrow → H2 | 16px (measured 7.5) |
| H2 | 80px / 600, `#FFFFFF`, one line, last two words on the highlight block |
| Highlight block | 366px wide x 78px tall on the board = `background-size: 100% 1em; background-position: 0% 80%`, black text |
| H2 → cards | 40px (measured 33.8) |
| Card grid | 3 columns, **20px** gaps, card **425 x 494px**, `#1A1C20`, **no border**, 0px radius |
| Card padding | **32px** (measured 33.8–34.8) |
| Illustration slot | **343 x 296px**, top of the card content box |
| Illustration → month label | 24px (board: art bottoms 928 / 965 / 908, label top 1002) |
| Month label | **15px / 600**, `#FF5F29`, uppercase + 0.06em tracking. Cap height measured 11.8px |
| Month label → title | **13px** (measured 12.9) |
| Card title | **44px / 600**, `#FFFFFF`, line-height 1.15 |
| Title → body | **24px** (measured 24.1) |
| Card body | **23px / 300** Latin, `#949BA6`, line-height 1.15 on the board (pitch 26.3px); use **1.35** in the build so Latin descenders clear |
| Card titles | The board draws **`Build` / `Get discovered` / `Get traction`** and those are the shipping titles, in `copy.md` §6. Arabic is the MSA equivalent triad `البناء` / `الظهور` / `النمو`. The **month labels above them keep their real months** (`MONTH ONE, APRIL 2026`), which is deliberately more precise than the board's plain `MONTH 1` |
| Card body length | **Two lines**, as the board draws. The build had drifted to six and nine lines, which tripled the card height and cost the section its punch. At 1440 the cards now measure **587px** (en) / **605px** (ar) against the board's 494px; the difference is the figure row, which the board does not carry and §8 below requires |
| Cards → sparkline | 33px (card bottom css 694.3, sparkline top 727.3) |
| Sparkline | full 1320px container width, **2.5px** `#FF5F29` stroke, five **10px** dots at 327.5px pitch, 39px total rise, dots y 751.6 / 747.1 / 742.2 / 735.5 / 724.3 |

The three figures (`7`, `165`, `531`) are not on the board. Place each inside its card between the title and
the body, at the **card body size (23px) in weight 600, `#FF5F29`**, matching how §7 prints its metric.
Every digit run is wrapped `dir="ltr"`.

---

## 9. Arabic type scale — explicit per-locale overrides

Alexandria draws Arabic materially larger than Latin at the same nominal size. The boards are English. If
the Arabic page reuses the English numbers unchanged, from the body sections down it reads oversized and
crowded. This is not a warning; these are the values to write.

**Rule: from Section 3 downward, Arabic headings run 0.75x and Arabic body 0.9x the English board values.**
Header, hero and the offer strip (Sections 0, 1, 2) keep the English values — they were tuned on their own
board and the hero is locked.

```css
/* English is the base scale (§2). Arabic overrides apply to sections 3-10 only. */
:root {
  --fs-h2:        clamp(30px, calc(80/14.4 * 1vw), 88px);
  --fs-h2-final:  clamp(34px, calc(88/14.4 * 1vw), 96px);
  --fs-h3:        clamp(22px, calc(32/14.4 * 1vw), 35px);
  --fs-h3-s4:     clamp(26px, calc(40/14.4 * 1vw), 44px);
  --fs-h3-s6:     clamp(28px, calc(44/14.4 * 1vw), 48px);
  --fs-faq-q:     clamp(19px, calc(30/14.4 * 1vw), 33px);
  --fs-lead:      clamp(18px, calc(29/14.4 * 1vw), 32px);
  --fs-body:      clamp(16px, calc(23/14.4 * 1vw), 25px);
  --fs-faq-a:     clamp(16px, calc(24/14.4 * 1vw), 26px);
  --fs-caption:   clamp(15px, calc(21/14.4 * 1vw), 23px);
  --lh-display: 1.05;
  --lh-h3:      1.15;
  --lh-lead:    1.25;
  --lh-body:    1.35;
  --w-body:     300;          /* Latin */
}

html[lang="ar"] {
  /* headings x 0.75 */
  --fs-h2:        clamp(23px, calc(60/14.4 * 1vw), 66px);      /* 80 -> 60 */
  --fs-h2-final:  clamp(26px, calc(66/14.4 * 1vw), 72px);      /* 88 -> 66 */
  --fs-h3:        clamp(17px, calc(24/14.4 * 1vw), 26px);      /* 32 -> 24 */
  --fs-h3-s4:     clamp(20px, calc(30/14.4 * 1vw), 33px);      /* 40 -> 30 */
  --fs-h3-s6:     clamp(21px, calc(33/14.4 * 1vw), 36px);      /* 44 -> 33 */
  --fs-faq-q:     clamp(15px, calc(23/14.4 * 1vw), 25px);      /* 30 -> 23 */
  /* body x 0.9 */
  --fs-lead:      clamp(17px, calc(26/14.4 * 1vw), 29px);      /* 29 -> 26 */
  --fs-body:      clamp(15px, calc(21/14.4 * 1vw), 23px);      /* 23 -> 21 */
  --fs-faq-a:     clamp(15px, calc(22/14.4 * 1vw), 24px);      /* 24 -> 22 */
  --fs-caption:   clamp(14px, calc(19/14.4 * 1vw), 21px);      /* 21 -> 19 */
  /* Arabic needs air, never NP's tight ratios */
  --lh-display: 1.25;
  --lh-h3:      1.35;
  --lh-lead:    1.85;
  --lh-body:    1.85;
  --w-body:     400;          /* 300 reads thin and unfinished in Arabic */
}
```

Not scaled in Arabic, at any size: the eyebrow (22px), the month label (15px), button labels (23px / 18px),
nav links (18px), the countdown (20px), the §4 step numerals (76px — they are Latin digits), the §7 metric
(20px) and every footer size. Short labels and digit runs do not hit the descender/diacritic problem.

Arabic eyebrows and the month label drop **both** `text-transform: uppercase` (Arabic has no case) and the
`0.06em` tracking (it breaks joined letterforms). Latin keeps both.

**Sections 0–2 in Arabic.** The hero keeps the English 86px H1 and 27px subhead. Check the Arabic hero
against `hero-C.png` at 1440 first, before anything else. If the Arabic H1 will not hold its two planned
lines at 86px, the fix is a hero-only `--fs-h1-ar` override; it is never a change to the English value.

---

## 10. RTL rules

- Arabic ships at `/` with `<html lang="ar" dir="rtl">`. English ships at `/en/` with `<html lang="en" dir="ltr">`.
  One stylesheet serves both.
- Use logical properties throughout: `margin-inline-start/end`, `padding-inline-start/end`,
  `text-align: start/end`, `border-inline-start/end`, `inset-inline-start/end`. Do not hardcode
  `left`/`right` for margin, padding, positioning, icon offsets or header layout.
- **Exception, and it is a real one:** logical properties resolve in the **element's own writing mode**, not
  the page's. On anything with `writing-mode: vertical-rl` or `vertical-lr`, `inset-inline-start` means
  *top*, not *start*. Wherever a vertical writing mode is involved, use physical `left`/`right` selected per
  `dir` (`[dir="rtl"] .x { right: … }` / `[dir="ltr"] .x { left: … }`). This bit an earlier build.
- **What mirrors:** page direction, header (logo moves to the inline-start = right in Arabic, CTA to the
  inline-end), nav order, text alignment, footer column order, chevrons, arrows, carousel controls,
  breadcrumb separators, and the §7 `View case study →` arrow.
- **What does NOT mirror:** the `Q8` logo mark and its orange box (a brand mark, fixed LTR internal order in
  every layout); all numerals; checkmarks; the play triangle; star ratings; social icons; the headline
  highlight block (it is `%`-based, so it ports with zero change).
- **Digits.** Western Arabic numerals (0–9) everywhere, never Eastern Arabic-Indic (٠–٩). **Wrap every digit
  run in `dir="ltr"`** (or `unicode-bidi: isolate` on a span): the phone number, the countdown, the spots
  count, `7` / `165` / `531` in §6, every §7 percentage and its two month labels, `199 إلى 440`, the
  thirteen-months line, dates, and the footer legal year.
- Countdown numerals sit in a **fixed-width container with tabular figures** so ticking never shifts layout.

---

## 11. Where the boards disagree with `DESIGN.md`

The board wins in every row below. `DESIGN.md` stays the system of record for everything not listed here.

| # | Thing | `DESIGN.md` says | Boards measure | Build |
|---|---|---|---|---|
| 1 | **Headline highlight** | 9px bar, `background-size: 100% 9px`, `color: inherit` | A **full 1em solid block** with **black** text, on light and dark surfaces alike, on all seven boards | Board (§4). This is the single biggest visual difference. |
| 2 | **Type scale** | H1 60px, H2 60px, Body Large 18px, Body 16px | H1 **86**, H2 **80–88**, lead **27–29**, body **23** | Board. The whole scale runs ~1.4x `DESIGN.md`. Building to `DESIGN.md`'s numbers reproduces the exact failure that got the last two builds scrapped. |
| 3 | **Heading colour on light** | `#26282C` | `#000000`–`#08080A` | Board: `#0A0A0C` |
| 4 | **Muted text on light** | `#6b6e72` | `#8F97A1` | **Neither** — `#6E757F`, the only deliberate departure in this file. See §3.2. |
| 5 | **Muted text on dark** | `#85898D` | `#949BA6` | Board |
| 6 | **Card fill on dark** | `#26282C` | `#1A1C20` (journey-D) | Board. `#26282C` is visibly lighter and breaks the band's flatness. |
| 7 | **Light section bg** | `#F5F6F7` | `#F2F3F5` (hero, s4), `#F4F5F6` (s8) | Board: `#F2F3F5`, `#F4F5F6` on §8 |
| 8 | **Dark band bg** | `#141415` | `#101012` (s6, s9), `#121215` (strip) | Board |
| 9 | **White section bg** | `#FFFFFF` | `#FEFEFE` | Board |
| 10 | **Footer bg** | `#000000` | `#030303` | Board |
| 11 | **Card hairline on light** | `#EBEBEB` | `#C8CED4`–`#D8DCE1` | Board: `#D2D7DD`. `#EBEBEB` is close to invisible at the board's card sizes. |
| 12 | **Card padding** | 32px everywhere | §3 36 · §5 32 · §6 32 · §7 24 | Board, per section (§5.4) |
| 13 | **Header height** | 102px | Logo lockup vertically centred at css y 55.8 → a **112px** block | Board: 112px |
| 14 | **Button horizontal padding** | `15px 30px 13px` | 186px box around an 85px label → ~50px inline | Board (§5.5) |
| 15 | **Section spacing** | 128px between major sections | 72px per side, i.e. ~144px between two sections | Board: 72px per side |
| 16 | **Container** | one 1500px container | 1500 for header + hero, **1320** for body sections | Board + the standing lesson (§5.1) |
| 17 | **Accent `#FF5F29`** | `#FF5F29` | `#FE5F28`–`#FD6029` | **Agree.** Keep `#FF5F29`. |

**Not measurable from the boards, and therefore not specified here:** hover, focus and active states; the
mobile (390px) layout; the scroll-solidified header; the open/closed FAQ transition; the countdown's live
behaviour; and the §7 card hover. Take those from `DESIGN.md` §4 and §6 unchanged — an opacity dim of
0.85–0.95, `box-shadow: none` at rest, and the `0 0 0 3px rgba(255,95,41,0.45)` focus ring. The phone
layout follows `DESIGN.md` §8's collapsing strategy at the clamp floors in §2.

---

## 12. Planned line breaks

Any display line that must break the same way at every width gets an explicit `<br>` **per language** plus
`white-space: nowrap` on the segments, so it cannot rewrap on a narrow desktop or a wide phone. Remove the
`<br>` below the mobile breakpoint and let it wrap naturally.

| Where | English (`/en/`) | Arabic (`/`) |
|---|---|---|
| §1 H1 | `Customers <span class="hl">find you</span><br>on Google and in AI.` | `نجعل عملاءك <span class="hl">يجدونك</span><br>في جوجل وفي الذكاء الاصطناعي` |
| §1 subhead | Natural wrap, container max-width **720px**. The board draws two lines of 677 / 655px, but the board's string is not the shipping string (`copy.md` §1 replaced `then we rank it on the first page` with the discoverability wording), so the break will land differently. Let it wrap; do **not** force a `<br>` to imitate a sentence that is no longer on the page. | Natural wrap, same container |
| §3 H2 | `Your profile works.<br>A website <span class="hl">multiplies it.</span>` | `ملفك على جوجل يعمل.<br>والموقع <span class="hl">يضاعف أثره</span>` |
| §4 H2 | `We build the site.<br>We <span class="hl">get it found.</span>` | `نبني الموقع،<br>ثم نجعل عملاءك <span class="hl">يجدونه</span>` |
| §9 H2 | `<span class="nb">Your customers are searching.</span><br class="brk"> <span class="hl nb">Be the answer.</span>` | `<span class="nb">عملاؤك يبحثون الآن.</span><br class="brk"> <span class="hl nb">كن أنت الإجابة</span>` |

**§9 needs the `nb` spans, not just the `<br>` (2026-09-24).** Line 1 measures **1319px inside the
1320px container** — 99.9 % of the width — so the `<br>` alone does not hold it: any sub-pixel rounding
rewrapped it to three lines. Each line therefore carries `white-space: nowrap`. This is a layout
instruction and the type size does not move; shrinking `--fs-h2-final` is the failure that scrapped two
earlier builds.
| §5 H2, §6 H2, §7 H2, §8 H2 | One line, no `<br>`. Board draws each on a single line. | One line, no `<br>` |
| §3 card 1 title | `The map stops at<br>your district` | Natural wrap |

```css
.nb { white-space: nowrap; }
@media (max-width: 767px) {
  .brk { display: none; }     /* drop the planned break on phones */
  .nb  { white-space: normal; }  /* and release nowrap with it, or the line overflows */
}
```

Every `<br>` above is a **layout instruction**, not copy. The words themselves come from `copy.md` and the
§3/§4 headlines have an open alternative in `copy.md` §3 — if Ahmad picks the alternative, the break moves
with it.

---

## 13. Build discipline, in one list

1. Build from this file and the boards. Never from `brief.md` alone — writing the build from the brief is
   the exact failure mode that scrapped the last three designs.
2. Never read copy off a board. Two model slips are already on record: the hero wordmark drew
   `Q8 digital`, and the §5 board drew a stock SEO list that Q8Block does not sell. §6's board says
   "ranking", which is banned site-wide. `copy.md` is the only copy source.
3. Two fixes against `hero-C.png` and nothing else: the wordmark reads **`Q8 block`**, and the small
   **`Kuwait Block` line above the H1 is deleted**. The headline, the highlight, the CTAs and the layout
   do not move.
4. One stylesheet for `/`, `/en/`, `/offer` and `/en/offer`, inlined in `<head>`, logical properties
   throughout. One small deferred vanilla JS file, three jobs only: countdown, FAQ accordion, mobile nav.
5. Run `scripts/compare.mjs` and fix until every section pair matches, **before** Ahmad sees anything.
6. Run `scripts/shots.mjs` and clear it. Then run `scripts/seo-audit.mjs` and clear every high finding
   before anything is pushed or goes live.
7. Push `development` only. Production auto-deploys and the Netlify build cap is already tight.

---

## 14. Accessibility fix pass, 2026-09-24. What moved, what did not, and what is still failing

Lighthouse reported **accessibility 96** on all eight page/preset combinations, on two audits:
`color-contrast` (weight 7 of 185) and `label-content-name-mismatch` (weight **0**). The score is
therefore binary on this page: clear every contrast node and it is 100, leave one and it is 96. There is
no 98.

### Type weight — a build bug, not a compromise

Four board crops (`hero-C` CTA and pill, `s5` eyebrow, `journey-D` title) were rescaled so one CSS px
equals four device px and placed beside an Alexandria 400/500/600/700/800 ladder rendered in Chrome at the
locked sizes. The board draws the **eyebrow, both button labels and the offer pill bold**, around 700 — not
the 400 and 600 this file used to specify. Those values are corrected in §1. This is the board being
matched, not the design being bent, and it is also what lets white on `#FF5F29` (3.03:1) satisfy AA's
large-text 3:1 threshold, which needs 700+ at 18.66px or more.

### Two colour tokens moved, and the brand fill did not

| Token | Was | Now | Why |
|---|---|---|---|
| `--muted-on-light` | `#6E757F` | `#686F79` | `#6E757F` clears 4.5 on `#FEFEFE` but only reaches **4.19** on `#F2F3F5` and `#F4F5F6`, where most of this grey actually sits (§4 bodies, the §4 and hero leads, the header language link). `#686F79` reads 5.03 / 4.65 / 4.57 on the three light surfaces. Six units, same cool family, invisible except side by side. |
| `--orange-text` | — | `#CE340A` | New. `#FF5F29` as **ink on a light surface** is 3.00:1 on `#FEFEFE` and 2.73:1 on `#F2F3F5`, which fails at every size the page uses. `#CE340A` is 5.03 / 4.65 / 4.57 on the same three surfaces. |

**`--orange-text` is for text only and only on light.** It is used on `.eyebrow` in sections 3, 4, 5, 7 and
8, and on `.work-metric`. On the dark bands the eyebrow keeps `--orange`, which reads 6.26:1 there.
**Every fill keeps `#FF5F29`:** the buttons, the highlight blocks, the logo square, the offer pill, the
trust and §4 rules, the sparkline, the FAQ icon, the §4 numerals and the illustrations. Checked by eye at
1440 in sections 3, 5 and 7, where the darker eyebrow sits directly above a `#FF5F29` highlight block: it
reads as a deeper tone of the same brand colour, not a second colour.

### The mobile button floor

`--fs-btn` floor raised **17px → 19px**. 23px at 1440 is the board value and does not move; the clamp floor
is a phone number this file has always said the boards do not specify (§11, last paragraph). Below 18.66px
bold white on `#FF5F29` drops out of the large-text allowance and fails.

### Still failing, deliberately

| Element | Measured | Why it is left |
|---|---|---|
| `.strip-pill` | white on `#FF5F29`, **3.03:1** at 18px | 18px is the board-measured size (§2.2) and Lighthouse renders it at 16.875px, under the 18.66px large-text threshold even at weight 700. The only ways out are a bigger label or near-black text on the pill, and both change an approved board. **`#FF5F29` is locked and white on it cannot reach 4.5:1 at this size.** One-line fix if Ahmad wants the point: `.strip-pill { color: var(--ink); }`, which is 6.52:1 and matches the §4 black-on-orange highlight rule. |
| `.wwd-num` | `#FF5F29` on `#F2F3F5`, **2.73:1** at 71.25px | Decorative and already `aria-hidden="true"`. It is a 76px outline numeral; recolouring it would be the most visible change on the page for an element no screen reader reads. |

Everything else in the audit is cleared. `label-content-name-mismatch` is fixed at the source: the logo
anchor carried `aria-label="Q8 block"` while `aria-hidden="true"` on the `Q8` box hid half the visible text
from the accessible name. Both attributes are gone; the two spans compute to the accessible name
`Q8 block` on their own, verified from Chrome's accessibility tree.

---

## 14b. Aesthetics fix pass, 2026-09-24. The second orange reverted, card 11 shipped, sixteen fixes applied

Source: `notes/aesthetics-audit.md` — every finding it tagged **[AGENT]**, and nothing it tagged
**[AHMAD]** or filed under "Waiting on Ahmad". Verified with `compare.mjs` (all sixteen board pairs, both
locales), `shots.mjs` (four rows, broken=0 errors=0 overflow=false) and a fresh 24-run Lighthouse sweep.

### 1. `--orange-text` is gone. One orange again, `#FF5F29`, fill and ink alike

The token added earlier the same day (see §14 above) is **reverted**. The audit measured the two values at
the same hue within 2° but **16 lightness points apart**, which is a colour difference on screen, not a tone
difference: `#CE340A` read brick against `#FF5F29`'s tangerine wherever they shared a viewport — worst in
§5, where the eyebrow sits 32px above a highlight block, and inside a single §7 card, where the metric sat
100px under a `#FF5F29` sparkline. It also made `.eyebrow` change colour three times down one page
(§5 rust → §6 bright → §7 rust), because the rule was per-surface.

**It bought nothing.** Accessibility on this page is binary — `color-contrast` is one weighted audit, so it
is 96 or 100 and there is no 98 — and reaching 100 *also* requires black text on the offer-strip pill, which
changes an approved board and is Ahmad's decision. While that decision is outstanding the second orange
cannot move the score at all, so it was visible design damage for zero points. Board fidelity is Ahmad's
stated priority; every approved board draws one orange.

| What | Now |
|---|---|
| `--orange-text` token | **deleted** |
| `.eyebrow` on light | `var(--orange)` |
| `.on-dark .eyebrow` override | **deleted** — redundant once there is one value |
| `.work-metric` | `var(--orange)` |

**Deliberately NOT applied:** the audit's `.work-metric { color: var(--ink); }`. Its stated reason was that
the metric must not be "a **second** orange sitting 100px under a `#FF5F29` sparkline in the same card".
After the revert it is not a second orange, it is the same one, so the condition the fix addressed no longer
exists — and §3.3 above records the board drawing the §7 metric orange. Flagged for Ahmad rather than done.

**The bold weights from the earlier pass stay.** Eyebrow, both button labels and the offer pill remain 700.
Those were measured off the boards at matched scale and were a build bug, not a contrast compromise.

### 2. §7 ships eleven cards. Card 11 is movingcompanykw.com

Ahmad, 2026-09-24: `Moving company is a valid company. You can put that in, no problem.` The card carries
**no percentage and no New project tag** — 27 clicks in August 2025 to 11 in August 2026 is −59%, every
positive window starts from one of the site's own troughs, and fourteen months of history makes the tag
false. It shows the sector, the name and the link. `copy.md` §7 and its derivation table are updated.

**Grid: still 4 columns**, which is the board value. Eleven cards give **4 / 4 / 3** — one empty slot in the
last row where ten cards left two (672px of white, which the audit called a grid that ran out of content).
Eleven is prime, so no column count divides it; three-of-four is the best available tail and it lands the
three no-percentage cards together, which reads as a deliberate newer-work group rather than a hole.

### 3. The sixteen CSS fixes, with the two that were tuned past the audit's numbers

| Audit | Selector | Change |
|---|---|---|
| 1 | `.work-site` | `clamp(18px, calc(24/14.4 * 1vw), 26px)`; `overflow-wrap: normal`. **Tuned:** the audit proposed 26px, measured before card 11 existed. At 26px `alghadeerclean.com` needs 268.1px in a 262px box and `movingcompanykw.com` 325.3px, so two names still wrapped and one still staggered a metric. At 24px — the value the Arabic page already proved — only `movingcompanykw.com` wraps, and that card carries no metric and no period, so nothing staggers. Result: **every card exactly 405px, the board number, in both locales**, and every metric in every row on one baseline (EN 6347.5 / 6776.5 / 7205.5). |
| 2 | `.lead` | `max-width: 860px`. §3, §4, §6 and §7 were setting 86 characters per line across the full 1320px container. `#included .lead` keeps only its centring; `.final` 820 and `#offer-hero` 860 are unchanged. |
| 4 | `.work-plate:empty` | transparent, `1px dashed var(--hairline-light)`, grid-centred, `::after { content: attr(data-empty) }` at `--fs-foot-l`. The four New project cards now carry their own first data month inside the slot; it is no longer repeated as a `.work-period` line underneath. Card 11's plate is the same dashed slot with no label. A flat `#F2F3F5` rectangle beside live sparklines read as a failed image load. |
| 5 | `.wwd-block + .wwd-block::before` | `inset-block: 0; height: auto` — 312px hard-coded inside a 440.3px block left the rules 128px short and column 3 unsupported. Measured after: rule 440.281px against block 440.3px, both locales. |
| 6 | `#hero .lead` | `max-width: 790px; text-wrap: pretty` — EN hero subhead is 2 lines, no one-word orphan. |
| 7 | `.icon-card .h3` | `min-height: calc(2em * var(--lh-h3))` — locale-correct (EN 1.15, AR 1.35). All three §5 row-2 bodies now share a baseline. Row 1 still rags, which is copy length and is Ahmad's. |
| 8 | `.offer-row img` | `76 x 76px` with `padding: 8px` — the mark sits inside the white plate instead of bleeding off all four edges. |
| 8 | `.offer-row.ruled` | `1px solid rgba(255,255,255,0.12)` — the orange numeral inside already carries the accent. |
| 8 | `#offer-faq .faq-list` | `max-width: 900px` (was `none`, i.e. 1320px and 103-character lines). |
| 9 | `.site-footer .wrap` | override **deleted** — the footer now starts at x=60 like every section above it. The board's 1294 was its divider, not a content edge. |
| 9 | `.footer-col p` | `line-height: 1.5` — 1.9 is the board's link leading and it floated the five-line address apart. |
| 9 | phone footer links | `padding-block: 13px; line-height: 1.4` → **44.2px** tap targets, clearing DESIGN.md §8's 44px minimum. **Tuned:** the audit's 11px gives 40.2px, still short. |
| 10 | `.journey-notes` | `max-width: 780px`, `margin-block-start: 56px`, notes at `--fs-foot-l` / 1.6 — they are footnotes and were set larger than the card bodies above them. |
| 10 | `.journey-foot` | new: the source line and the WhatsApp button share one row, so §6 stops ending a second time on a button hanging off the bottom-left corner. |
| 11 | `.btn-row .btn` | `min-width: 240px` at ≥768px. **Tuned:** the audit's 226px left the final-call outline at 238.3px, still 12px wider than its partner. At 240 both pairs measure **240 / 240** in both locales. |
| 12 | `.work-caption` | `clamp(13px, calc(16/14.4 * 1vw), 17px)` — caption 21 / metric 20 / link 19 were three roles inside 2px of each other, and the build inverted the board, which draws the caption clearly smaller. The ladder is now 16 → 24 → 20 → 14 → 19. |

### 4. What was left for Ahmad, and why

Everything the audit filed under "Waiting on Ahmad", plus one item it listed as agent-fixable that the
revert made wrong:

1. **The offer-strip pill.** `.strip-pill { color: var(--ink); }` is the only line between 96 and 100 on
   accessibility. It changes an approved board.
2. **`.work-metric { color: var(--ink); }`** — see §14b.1 above. Now a board deviation with no benefit.
3. **The H1 is ~16% wider than the board** at matched cap height. Not touched; three builds were scrapped
   for being too small.
4. **The offer hero's seven-line lead** pushes the CTAs to the edge of a 390x844 fold. Approved copy.
5. **The offer H1 highlights `free`** where the approved board highlights `no contract.`
6. **§3 and §5 card copy lengths.** §3 EN bodies run 6 / 5 / 4 lines and §5 EN has two three-line titles;
   both grids reach the board's proportions only if that copy is trimmed. The CSS is doing all it can.
7. **The §7 subhead could now print `Eleven sites`** — true since card 11 shipped. Approved copy, his edit.
8. **The Arabic §6 sparkline still rises left to right.** The audit recommends leaving it, because the §7
   plates are real Search Console shapes and cannot be mirrored.

### Re-cutting the §5 icons

```js
// in a scratch folder with sharp; writes src/img/icon-<name>.webp
const { data, info } = await sharp(SRC + name + '-sq.png').ensureAlpha().raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < info.width * info.height; i++) {
  const o = i * 4;
  if (data[o + 3] < 8) continue;
  const min = Math.min(data[o], data[o+1], data[o+2]);
  const max = Math.max(data[o], data[o+1], data[o+2]);
  if (min >= 200 && max - min <= 20) data[o + 3] = 0;   // knock out the plate
}
```

---

## How to verify

Both scripts need `puppeteer-core` and `sharp` **in a scratch folder, never in the client repo**, and use
the real Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`.

```bash
# one-time, in the scratch folder
cd "$SCRATCH" && npm init -y && npm i puppeteer-core sharp

# serve the build locally (production branch deploys are the only deploys; develop locally)
npx --yes serve -l 4188 clients/q8block/site
```

**1. Board over build, section by section, both locales:**

```bash
cd "$SCRATCH"
BASE=http://localhost:4188 \
OUT="$SCRATCH/pairs" \
node "C:/Users/Ahmad/projects/Orcha/clients/q8block/scripts/compare.mjs"
```

Writes `pairs/en/<section>.png` and `pairs/ar/<section>.png` — board on the left, build on the right at the
same width — plus a stacked `pairs/en/all.png` and `pairs/ar/all.png`.

**2. Full sweep, both locales, both viewports:**

```bash
cd "$SCRATCH"
BASE=http://localhost:4188 \
OUT="$SCRATCH/shots" \
node "C:/Users/Ahmad/projects/Orcha/clients/q8block/scripts/shots.mjs"
```

Shoots `/` and `/en/` at **1440x900** and **390x844**, writes `shots/report.json` and downscaled contact
strips.

**Pass condition — all four must hold:**

1. `compare.mjs` prints no `MISSING selector`, and **every** section pair visually matches its board:
   same type sizes, same weights, same line breaks, same colours, same images, same spacing. Check the
   Arabic pairs against the boards too, not only English.
2. `shots.mjs` reports **`broken=0`** on every row.
3. `shots.mjs` reports **`errors=0`** on every row.
4. `shots.mjs` reports **`overflow=false`** on every row.

Anything short of all four is not ready to show Ahmad.
