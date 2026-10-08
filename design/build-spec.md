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
| §7 card plates ×11 | **Each client's own logo**, fetched from that client's live site and kept at `design/client-logos/<domain>.<ext>` | Derived into `src/img/logo-<slug>.webp`, one shared 640x334 canvas, `object-fit: contain`. Full record in **§20**, sources in `copy.md`'s section 7 logo table. Superseded the card chart 2026-09-25 (Ahmad). No brand mark is invented, redrawn or recoloured. |
| ~~§7 card charts ×10~~ | **Retired 2026-09-25.** The plate was an inline SVG of the site's real monthly click series; the four newest clients had one complete month each, so they drew nothing and rendered an empty dashed slot. Ahmad: `many boxes are empty ... scratch the graph idea`. | The old rule still stands for anything that comes back: a generated chart is a fabricated result and a launch blocker, and a Search Console capture may only ship if it is real and unedited. §6 was a separate renderer and nothing in this pass went near it. |
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
| Cards → sparkline | ~~33px (card bottom css 694.3, sparkline top 727.3)~~ **Removed 2026-09-25, see §21.** The board's geometry below is kept for the record only; do not rebuild it. |
| Sparkline | ~~full 1320px container width, **2.5px** `#FF5F29` stroke, five **10px** dots at 327.5px pitch, 39px total rise, dots y 751.6 / 747.1 / 742.2 / 735.5 / 724.3~~ **Removed at Ahmad's instruction, 2026-09-25 — "there is this orange graph under the three images... it looks ugly." Deliberate, approved divergence from `journey-D.png`; §21 has the fix and the re-measured spacing. A future pass comparing the build to that board should NOT restore this element.** |

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
| §3 H2 (rewritten 2026-09-25, §18) | `Your Google profile works.<br>You have <span class="hl">no website.</span>` | `ملفك على جوجل يعمل<br><span class="hl">وما عندك موقع إلكتروني</span>` |
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

### Still failing, deliberately — both since closed, see §17.7 / §17.7b

**Both rows below are resolved.** Left in place as the record of the original trade-off, since both
"why it is left" columns turned out to be wrong or incomplete once Ahmad actually decided the point on
2026-09-24: `.strip-pill` was fixed to `#141415` (the one-line fix this table already named, §17.7 Fix A);
`.wwd-num` was fixed to `--orange-ink-light` (§17.7b Node 1) — and its own `aria-hidden="true"` turned out
not to exempt it from Lighthouse's `color-contrast` audit at all, which §17.7 measured directly.

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

---

## 15. Ahmad's homepage revision pass, 2026-09-24. Six items, what moved and what it cost

His review of the built homepage. Everything below is his instruction, not an agent's idea. Verified with
`compare.mjs` (all sixteen board pairs, both locales), `shots.mjs` (four rows) and a fresh Lighthouse
sweep. Nothing here is pushed or deployed.

### 15.1 The hero owns the first screen

**The bug.** `#hero` was sized by its own content, so on a large monitor it ended early, the offer strip
stranded itself mid-screen and §3 showed underneath. Measured before the fix at 1440x900: the English
hero ran 792px, the strip sat at 792 and `#problem` began at 870 — 30px of the next section inside the
fold. At 1920x1200 the gap was far worse.

**The fix, in one structural change.** `hero()` and `offerStrip()` are wrapped by a new `firstScreen()`
renderer, `<div class="first-screen">`:

```css
.first-screen { min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; }
#hero        { flex: 1 0 auto; display: flex; flex-direction: column; justify-content: center; }
.strip-slot  { flex: none; }
```

`svh`, not `vh`, so collapsing mobile browser chrome cannot clip it. The brief asked for
`min-height: calc(100svh - <header height>)` on the hero; that is written as `flex: 1 0 auto` inside a
100svh column instead, because the strip has to fit inside the same 100svh and its height is 78px on
desktop but wraps taller on a phone. The flex column computes `100svh - header - strip` exactly at every
size, which is what "header, hero, strip and nothing else" actually requires. `min-height`, never
`height`: where the content is taller than the screen the hero grows and the page scrolls normally, so
the hero never scrolls inside itself.

`#hero > .wrap-wide { width: 100% }` is required with it. In a flex column an auto inline margin beats
`stretch`, so without it the 1500px column shrink-wraps to its widest child and the H1 quietly becomes a
max-content box.

**Measured after, in both locales:**

| Viewport | Header | Hero | Strip | First screen | `#problem` top | Hero internal scroll |
|---|---|---|---|---|---|---|
| 1440x900 en | 112 | 822 | 78 | **900** | **900** | 0 |
| 1440x900 ar | 112 | 822 | 78 | **900** | **900** | 0 |
| 1920x1200 en | 112 | 1121 | 79 | **1200** | **1200** | 0 |
| 1920x1200 ar | 112 | 1121 | 79 | **1200** | **1200** | 0 |
| 390x844 en | 72 | 726.8 | 117.2 | **844** | **844** | 0 |
| 390x844 ar | 72 | 726.8 | 117.2 | **844** | **844** | 0 |

**Two spacing deviations were needed to get there, and both are outside the boards.**

1. `html[lang="ar"] #hero .lead { line-height: 1.55 }`. The Arabic subhead sets in **three** lines where
   the English sets in two, and `--lh-lead: 1.85` is a body-section value; at 1440x900 that left the
   Arabic hero 41px past the first screen while the English fitted. Hero only, Arabic only. §9 already
   provides for hero-only Arabic overrides and the boards are English, so no board pair moves. On short
   desktop windows (`min-width: 990px and max-height: 950px`) the Arabic hero also takes
   `btn-row 40 → 30` and `trust 70 → 46`.
2. The **phone** hero takes `padding-block-start: header + 28`, `padding-block-end: 24`, `lead 20`,
   `btn-row 28`, and the phone strip takes `padding-block: 12`, `gap: 8px 16px`, pill and CTA padding 7px.
   §11 already records that the 390px layout is not measurable from the boards.

**The English hero keeps every board-measured gap at every size.** 96 / 28 / 40 / 70 / 64 are untouched
on `/en/`, which is the page the boards are compared against.

### 15.2 The strip pins under the header, and pinning costs zero CLS

Once the bar's own top would pass under the fixed header, `app.js` gives it `.stuck`:

```css
#offer-strip.stuck { position: fixed; inset-block-start: var(--header-h); inset-inline: 0; z-index: 80;
                     min-height: 0; padding-block: 9px; }
```

`position: sticky` cannot do this job: a sticky element is released by its containing block, and the
containing block here is the 100svh first screen, so the bar would scroll away the moment the first
screen did. Fixed positioning does, and the layout cost is paid by `.strip-slot`, which is given the
bar's **measured** height at the moment it is pinned and keeps it until it is released. Measured
document height before pinning, while pinned and after releasing: **8238 / 8238 / 8238** at 1440 and
10905 / 10905 / 10905 at 390. The document never changes height, so the pin cannot shift anything.

Slim when stuck: **50px** on desktop (against 78 at rest) and **60px** on a phone, where the pinned bar
also drops the offer line, the countdown label and the spots line and keeps pill + countdown + CTA on
one row. The threshold is re-measured on `load`, on `document.fonts.ready` and on resize, because the
hero is type and `font-display: swap` moves it.

### 15.3 §2 the offer strip: one row, and the whole bar is the link

Ahmad: `the link to check the offer says terms and details. Remove this because it's taking a whole row
which I don't like. It should be inside the same row where it has all the information... I think the
whole thing should be clickable. Also there should be a CTA somewhere. But no new rows please.`

| What | Before | Now |
|---|---|---|
| `الشروط والتفاصيل` / `Terms and details` | its own underlined text link, at the end of the row | **deleted** |
| The row | pill · line · label · countdown · spots · terms link | pill · line · label · countdown · spots · **CTA**, one row |
| The band | `<section>` with a 1320px `.wrap` inside | **`<a id="offer-strip">`** — the full-bleed band is the hit area. Hover `#121215 → #1C1D22`, focus ring on the bar |
| The pill | solid `#FF5F29`, white label | **outline**: transparent fill, `1px rgba(255,95,41,0.6)`, `#FF5F29` label, same 100px radius, same 700 weight |
| The CTA | — | solid `#FF5F29` with **near-black** text, 3px radius, `اطلع على العرض` / `See the offer` |
| The row container | `.wrap`, 1320px | **1500px**, the header + hero column. At 1920 the one row measures 1326px; inside 1320 it wrapped and the band doubled to 129px |

**A contrast node closed itself.** §14 and §14b both record `.strip-pill` — white on `#FF5F29`, 3.03:1 —
as the single node holding accessibility at 96, and both say the fix changes an approved board. Ahmad has
now asked for the pill to stop reading as a CTA, which authorises the change. The outline pill is
`#FF5F29` on `#121215` = **6.23:1**, and the CTA is `--ink` on `#FF5F29` = **6.52:1**, matching §4's
black-on-orange rule. **The offer page's own hero pill is NOT touched** — that is an approved board and
it is still Ahmad's call, so `/offer/` and `/en/offer/` keep the node.

Both degraded states still produce one complete row: countdown expired (`app.js` removes every
`[data-countdown-part]` and reveals the status line) and `SPOTS: null`.

### 15.4 The countdown

`CONFIG.COUNTDOWN_END` `2026-12-31T23:59:59+03:00` → **`2026-10-04T23:59:59+03:00`**, ten days from
2026-09-24. Ahmad: the old value rendered 98 days, `should be less than 10. Ten days.` The comment above
it in `src/data.mjs` says in as many words that Ahmad sets the real date and that it is one line.

### 15.5 §7 Our work becomes a slideshow

| Ahmad's instruction | What shipped |
|---|---|
| Sort by the biggest numbers first | q8carwash +900 · mashame3 +883 · kuwaityclean +326 · kwcarwash +270 · kwtclean +222 · carwashkw +32 · the four New project sites in natural order · movingcompanykw last. The order lives in `WORK` in `src/data.mjs`, not in the renderer |
| Remove the sector labels | `.work-caption` and the `sector` field are **deleted** — from the markup, the CSS and the data, so they cannot drift back |
| Remove the date windows | `.work-period` deleted. ONE line under the section instead: `كل الأرقام من Google Search Console، آخر شهر كامل هو أغسطس 2026` / `All figures from Google Search Console, most recent complete month August 2026`. Every percentage is still traceable in `copy.md`'s derivation table |
| Remove `First data month: August 2026` | `workPlate()` no longer emits `data-empty` and `.work-plate:empty::after` is gone. The four empty plates are a bare dashed slot; those cards keep only their `New project` tag |
| Three bigger cards, auto-scrolling | `.work-track` is a scroll-snap flex row; `.work-card` is `flex: 0 0 calc((100% - 48px) / 3)` = **424 x 405px** at 1440, against the old grid's 312 x 405. 2 across under 1100px, 1 across (84% width) under 768px |

**Accessibility of the slideshow, in full.** It is plain CSS scroll-snap plus ~60 lines of vanilla JS in
the existing deferred `app.js`. No library.

* **Swipe** is the browser's own: the track is a native `overflow-x: auto` container with
  `scroll-snap-type: inline mandatory` and `overscroll-behavior-inline: contain`.
* **Keyboard** has three routes. The track is `tabindex="0"` with `role="group"`,
  `aria-roledescription="carousel"` and an `aria-label`, which is the axe-recommended shape for a
  focusable scroll region and gives native arrow-key scrolling; a `keydown` handler turns Left/Right
  into one snapped card step and flips them under `dir="rtl"`. Every card is a real `<a>` in DOM order,
  so Tab walks all eleven and the browser scrolls each into view.
* **Visible controls**: two 52px buttons at the inline end, `aria-label` over an `aria-hidden` chevron
  (so `label-content-name-mismatch` cannot fire), 3px radius, hover and focus states. `flex-end` is
  logical, so they sit left in Arabic and the glyphs mirror with `scaleX(-1)`.
* **`prefers-reduced-motion: reduce` → it never auto-advances at all**, and button and key steps become
  instant (`scroll-behavior: auto`). The media query is also watched live.
* **Pauses** on `mouseenter`, on `focusin`, on `pointerdown` (with a 5s idle release that re-checks hover
  and focus), when the tab is hidden, and when the section leaves the viewport. The
  `IntersectionObserver` uses **threshold 0**, never 0.2 — a wide section is rarely 20% on screen at once
  and that silently disabled autoplay on an earlier build (lessons.md).
* **RTL** advances correctly: Chrome reports `scrollLeft` as 0 at the start and negative toward the end
  in RTL, so the module reads `direction` once and flips the sign. `go(1)` is "advance" in both locales.
* **CLS**: card widths are `flex-basis` and the plates carry `aspect-ratio`, so nothing reflows, and
  auto-advance moves `scrollLeft`, which is not a layout shift. Measured 0.000 on every run.

The §7 subhead lost the phrase `مكتوبين عليها` / `printed on it`, which described two months the card no
longer prints.

### 15.6 The Arabic H1

`نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي` →
**`تبي عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي؟`**

Ahmad's own hook line. **Deliberately Gulf colloquial** (`تبي`, not the MSA `هل تريد`) and **deliberately
a question.** It is the only colloquial string on the site; every other Arabic line stays professional
MSA. Do not "correct" it. The English H1 is unchanged.

The string got shorter on line 1 and gained a `؟` on line 2, so the break and the highlight were
re-measured: **still two lines**, widths **768 / 1286** inside the 1332px column at 1440 (46px of air)
and 844 / 1414 inside 1500 at 1920 (86px). The highlight block on `يجدونك` measures 311 x 97 at 1440,
unchanged in geometry — §4's rule is percentage-based and did not move.

### 15.7 Navigation

Ahmad: `I hate navigation scrollies. When I click on something and then it scrolls I hate that. Remove
all navigation.`

* `scroll-behavior: smooth` is **out of the stylesheet**, and the `prefers-reduced-motion` override that
  existed only to disable it went with it. `scroll-padding-block-start` stays, so the one remaining
  fragment link still clears the fixed header.
* **Every `#section` link is gone from the header and the footer.** The only `href` containing `#` on
  either homepage is now `#main`, the accessibility skip link, and it jumps.
* **The offer left the nav** and lives in the banner, which is now a clickable bar.
* New header nav, five items plus the language link and the Call now button:
  `الرئيسية` `/` · `من نحن` `/about/` · `المدونة` `/blog/` · `الشروط والأحكام` `/terms/` ·
  `تواصل معنا` `/contact/`, mirrored under `/en/` as Home · About us · Blog · Terms and conditions ·
  Contact us. At 1440 the header row measures 1332px against a 1332px column in both locales, so
  nothing wraps.
* Footer columns rebuilt on the same rule: **Company** (Home · About us · Contact us), **Resources**
  (Blog · Google profile checklist), **The offer** (The offer · Terms and conditions), **Contact**
  (Call now · WhatsApp + NAP).
* Those four new pages are being built separately. **They 404 until that lands**, which is expected, and
  they are deliberately NOT in `PAGES`, the sitemap or `llms.txt` yet — a sitemap entry for a page that
  does not exist is an SEO finding.

### 15.8 Two bugs this pass created and caught, both worth remembering

**1. `var timer` is one binding for the whole of `app.js`.** Every job in that file lives in one IIFE, so
the slideshow's `var timer` and the countdown's `var timer` were **the same variable**. The countdown
block runs last, so it overwrote the slideshow's interval id — the slideshow's `stop()` then cleared the
**countdown's** interval (the clock froze on its first render on all four pages) and leaked its own, so
hover no longer paused the carousel. Caught by wrapping `setInterval`/`clearInterval` in the page and
reading the trace: two 4200ms intervals alive, one of them unreachable. Fixed by renaming the slideshow's
to `autoTimer` / `idleTimer`, with a comment at the declaration. **Keep every name in a new `app.js`
block unique, or give the block its own function.** Verified after: the countdown ticks on `/`, `/en/`
and `/offer/`, and the carousel advances once per 4.2s and stops dead on hover.

**2. `compare.mjs` captured the RTL hero from the wrong x origin.** `captureBeyondViewport: true` takes a
different code path when the clip fits inside the viewport, and on an RTL page that path returns the shot
shifted ~215px with a white band down one side — the logo and the trust row's first item were cut off.
It only bites when a clipped band is **≤ the viewport height**, which the hero band never was until the
first screen became exactly 100svh. `scripts/compare.mjs` now passes
`captureBeyondViewport: box.height > page.viewport().height`. This is a harness bug, not a page bug: plain
viewport screenshots of the same page were always correct.

A third, smaller thing went in with them: `section[id], .site-footer` now carry
`scroll-margin-block-start: calc(var(--header-h) + 72px)`, so anything scrolled into view
programmatically — the skip link, or a harness shooting a section by selector — clears the fixed header
**and** the pinned offer bar instead of landing underneath them.

---

## 16. The four secondary pages, 2026-09-24. About, Contact, Blog and Terms

§15.7 rebuilt the navigation around five real pages and recorded that four of them **404 until this
lands**. This is that landing. Twenty new URLs, built from the homepage's approved components and
nothing else, because three builds have now been scrapped for drifting from an approved design.

Words come from **`design/copy-pages.md`**, verbatim, the way Part A and Part B come from `copy.md`.
The one board involved is **`design/boards/blog-B.png`**, which Ahmad approved for the blog list.
Nothing here is pushed, deployed or committed.

### 16.1 What was built

| Page | Arabic | English | Sections |
|---|---|---|---|
| About us | `/about/` | `/en/about/` | `#page-head` `#principle` `#deliver` `#not-do` `#company` `#about-final` |
| Contact us | `/contact/` | `/en/contact/` | `#page-head` `#reach` `#office` (no final band: the page *is* the call) |
| Blog list | `/blog/` | `/en/blog/` | `#page-head` `#posts` `#final` |
| Terms | `/terms/` | `/en/terms/` | `#page-head` `#terms` |
| Blog post x6 | `/blog/<slug>/` | `/en/blog/<slug>/` | `#post` `#final` |

Twenty URLs: 4 page types x 2 locales = 8, plus 6 posts x 2 = 12.

### 16.2 The content layer: a parser, not a package

`content/blog/<slug>.<lang>.md`, twelve files, parsed in `build.mjs`. **No dependency was added to
this repo** — it still builds on Node alone.

* `frontmatter()` reads the `---` block as flat `key: value` scalars, strips a BOM, normalises CRLF,
  and throws on a missing key, a slug that disagrees with the filename or a `lang` that disagrees with
  it. Nothing is eval'd.
* `markdown()` renders the four constructs the posts actually use — `##`, `###`, paragraphs and
  `**bold**`, plus `-` lists for later posts. **Everything is escaped first**, so a post cannot inject
  markup into the page.
* `POST_ORDER` in `build.mjs` is the list order, and the featured panel takes the first entry:
  **`why-your-google-profile-stops-growing`**, Ahmad's pick, because it describes the reader's own
  situation — a working profile, no website, growth flat.

**Read time is computed, never typed** (`copy-pages.md` §B2). 200 words a minute for English, 140 for
Arabic, rounded. That pair was chosen for one reason: at it, **every post returns the same number in
both languages**, which matters because the two pages are the same article.

| Slug | AR words -> min | EN words -> min | frontmatter `read` |
|---|---|---|---|
| why-your-google-profile-stops-growing | 610 -> **4** | 861 -> **4** | 5 |
| what-to-do-with-your-google-profile | 666 -> **5** | 918 -> **5** | 6 |
| page-per-service-and-area | 582 -> **4** | 801 -> **4** | 5 |
| how-ai-assistants-decide-what-to-quote | 569 -> **4** | 761 -> **4** | 5 |
| why-a-slow-website-loses-customers | 581 -> **4** | 799 -> **4** | 5 |
| what-to-ask-before-paying-for-seo | 620 -> **4** | 854 -> **4** | 6 |

The computed value runs one minute under the author's estimate. `copy-pages.md` §B5 says `read:` is
the author's estimate and the build may recompute it, so the printed number is the computed one and the
frontmatter value is left untouched as the record of what the writer thought.

### 16.3 The blog list is board B, measured

`blog-B.png` is 2688x1520, so the same `css = board x 0.535714` as §0. Measured, and used:

| Item | Board (css) | Built |
|---|---|---|
| Container | content 48.2 -> 1391.8 = **1343.6** wide | the locked **1320** body container (§5.1) |
| Page H2 ink | **71.3** ascender to descender = Alexandria 600 at **80.3px** | `--fs-h2`, i.e. **80** — the locked §2 value, unchanged |
| Featured panel | top rule at 140.9, bottom at 427.5, 1px hairline | `.feature`, `1px solid var(--hairline-light)`, 0px radius |
| Panel padding | art inset **19.3** left, 17.1 top, 17.7 bottom | **20px** |
| Featured art | **670 x 252**, i.e. 52 % of the panel | `minmax(0, 1.05fr)` of a two column grid |
| Art -> text gap | **34.3** | **34px** |
| Text column | 771.4 -> 1391.8 = **620** | `minmax(0, 1fr)` |
| Rule under the panel | 18 below it, full container width | `.post-rows` `border-block-start`, `margin-block-start: 18px` |
| Thumbnail | **105** square | **104px**, from a 240x240 WebP |
| Row columns | two, ~648 each, ~44 gap | `repeat(2, minmax(0, 1fr))`, `column-gap: 48px` |
| Row rules | per column, none under the last row of each | `border-block-end` on every row, removed by `:nth-last-child(-n+2)` |

**Type comes from the locked scale, not from this board.** Featured title `--fs-h3-s6` (44/33),
row titles `--fs-h3` (32/24), featured excerpt `--fs-body`, row excerpt `--fs-case`, and the read-more
link takes the §7 `View case study` treatment. The board's own ink measures 46 / ~26 / 21-23 / 17-18,
all inside the spread §2 already records, so no new size was invented.

**RTL mirrors with no RTL-specific rule.** Both grids are logical, so the art and the thumbnails sit
inline-start: left on `/en/blog/`, right on `/blog/`. Verified by screenshot in both directions
against the board.

### 16.4 The post page

A readable measure, **780px**, not the 1320 container: the aesthetics audit named 86-character lines a
real problem on this site, and an article is the one place it would be worst. Title `--fs-h3-s6`,
prose `--fs-body` in the site's own body colour, `##` -> `--fs-h3`, `###` -> `--fs-body` at 600. Line
height **1.6** for Latin prose and `--lh-body` (1.85) for Arabic: §11 records that long-form leading is
not measurable from the boards, and Alexandria sets Arabic materially larger at the same size (§9).

Breadcrumb (`Home > Blog`), byline linked to `https://ahmadowaihan.com/` with `rel="author"`, the
computed date and read time, the illustration, the body, a back link and prev/next. Both the list page
and every post page close on the §9 final-call band **as `copy.md` writes it**, so the site still has
one closing argument (`copy-pages.md` §B4).

### 16.5 Contact has no form, and Google is not contacted until the reader taps

`lessons.md` and `copy-pages.md` are both explicit, and both were followed to the letter. Measured on
the built page, in both locales:

| Check | Measured |
|---|---|
| `<form>`, `<input>`, `<textarea>`, `<select>` on the page | **0** |
| Requests to google / gstatic / googleapis **before** the tap | **0** |
| `<iframe>` in the closed state | **0** |
| `.map-shell` height before the tap / after it | **474.69 / 474.69** — the swap costs zero layout shift |
| After the tap | one iframe, `maps?q=<address>&output=embed`, `title` in the page's own language, caption and directions link revealed |

The placeholder is drawn by us: an inline SVG pin inside a hairline panel, the closed-state copy, and
one `Show the map` button. `app.js` gained its **seventh job** for this, in its own function with its
own names — §15.8's lesson about one shared `var` scope is now quoted at the top of that file.

One CSS bug worth keeping: `.map-foot` is `display: flex`, and **`display` beats the `hidden`
attribute**, so the caption and the directions link were visible in the closed state until
`.map-foot[hidden] { display: none }` was added.

Phone and address are NAP from `company.md` only, through `data.mjs`. Every digit run inside the Arabic
address is wrapped `dir="ltr"` (§10), and `Q8 block` / `q8block.com` are isolated on a **span inside**
the About fact cell, not with `dir="ltr"` on the cell — the attribute on the cell also flips its
text-align, which left those two values hanging off the far side of the column.

### 16.6 About and Terms

About uses only real facts: the principle, the same six deliverables as §5 and offer B2 (titles only,
so the §5 icon card drops its 226px floor), the two honest exclusions on §4's outline numerals, and a
company block filled from `company.md`. **No founder story, no dates, no headcount, no licence
number** — `copy-pages.md` records that the licence line is missing because `company.md` does not hold
a CR number, and that it drops into the company block in one edit if Ahmad supplies one.

Terms is seven plain blocks separated by hairlines, capped at an 860px measure, with the last-updated
line under the intro. No jurisdiction, no liability, no refund policy, no notice period.

### 16.7 What was added to the stylesheet, and what was not

Everything reuses `.card-light`, `.icon-card`, `.wwd-block`, `.btn`, `.eyebrow`, `.lead`, `.body`,
`.h2`, `.h3`, `.hl` and the final-call band. Three genuinely new things, all small:

1. `.page-head` — the hero's rhythm (eyebrow 16 -> H1 28 -> lead) on `--bg-light`, start aligned, with
   the H1 at `--fs-h2` for the reason measured in 16.3.
2. `--fs-meta: clamp(14px, calc(15/14.4 * 1vw), 16px)` — the §6 month-label size with the phone floor
   raised from 12 to 14, the same kind of floor-only change §14 made to `--fs-btn`. 15px at 1440 is
   unchanged; 12px is too small for a byline.
3. `.text-link` / `.read-more` — the §7 `View case study` treatment as a shared class, chevron
   mirrored under `dir="rtl"`. It is navigation, never a third CTA label.

**No `#anchor` navigation and no `scroll-behavior: smooth`** were introduced (§15.7). The only `href`
containing `#` on any new page is `#main`, the skip link. The one `scroll-behavior: smooth` left in the
stylesheet is still `.work-track`, the §7 slideshow, which no new page contains.

A mobile trap worth recording: the contact page hit a **500px scrollWidth at 390** because
`.office-grid` collapsed to `1fr`, and a bare `1fr` track floors at the item's min-content width —
`.map-shell` carries `aspect-ratio: 16/10` with `min-height: 330px`, so its min-content width is
330 x 1.6 = 528. `minmax(0, 1fr)` fixes it. Every collapsed grid on these pages uses `minmax(0, 1fr)`.

### 16.8 Wiring

* The header and footer links from §15.7 now resolve. `scripts/seo-audit.mjs` reported **20 high
  "internal link to a missing page"** before this pass and **0** after.
* `PAGES` in `build.mjs` holds all 26 URLs and the sitemap is generated from it, so the two cannot
  drift. Every entry carries reciprocal `ar` / `en` / `x-default` alternates. Post entries carry the
  **post's own date** as `lastmod`, not the build date.
* Canonical plus `hreflang` `ar` / `en` / `x-default` -> Arabic on every new page, the same shape the
  first four pages use. The language link in the header and the footer now swaps to the **mirror of
  the page you are on**, not to the home page: `header(t, page, self)` and `footer(t, self)` take the
  page's own `{path, otherPath}` pair, which lives in `t.paths` in `data.mjs` beside everything else.
* `llms.txt` lists the six new pages and all six articles with their descriptions and both URLs.
* `og:image` now exists on the twelve post pages, pointing at that post's own illustration. No other
  page has a real image to point at, so none claims one.
* **Post dates are all 2026-09-24 and were not staggered.** Ahmad: `I want to be honest and no fake.`

### 16.9 Images

`design/blog-art/<slug>.png`, 1344x752, one per post, already in the site's flat 2D language. Nothing
was generated and nothing was substituted. Each one is converted twice, with `sharp` in a scratch
folder:

* `src/img/blog-<slug>.webp` — native 1344x752, q82, 8-27 kB. The featured panel and the post hero.
* `src/img/blog-<slug>-sq.webp` — 240x240 for the 104px thumbnail. The square is cropped around the
  illustration's **own ink box**, not blindly from the centre, so no drawing loses an element off an
  edge (the ink box plus a margin, clamped to the canvas; the measured crops came out 647-682px of
  752).

Every one carries explicit `width` and `height`. **CLS measured 0.000 on all twelve Lighthouse
configurations.**

### 16.10 Verification

**`shots.mjs`** (the client copy, extended in scratch to cover all 24 routes and to name the sections
each page type must have) at **1440x900 and 390x844, both locales — 48 rows**:
`broken=0, errors=0, overflow=false, h1=1, images without width/height=0` on every row.

**Every new URL by HTTP**: 20 of 20 return **200**, the canonical matches the page, the three
alternates are present and **reciprocal in both directions**, the page is in `sitemap.xml` with its
alternates and in `llms.txt`, and every page carries JSON-LD (`Organization`, `Blog`, `BlogPosting` +
`BreadcrumbList`).

**No regression on the two pages that were already approved.** The homepage document heights are
**identical** to the pre-pass sweep — 8175 / 8650 at 1440 and 10905 / 11081 at 390 — and a pixel diff
of the four full-page shots against that sweep differs only in the offer strip's countdown digits
(~500 pixels of 11.7 million, first differing row 853, which is the strip). The offer pages pass the
same four conditions.

**Lighthouse**, the harness in `<scratch>/lighthouse-run/`, three runs per configuration, medians in
`notes/lighthouse.md`. **Performance 100 and CLS 0.000 on all twelve configurations**, best practices
100, SEO 100. Accessibility is 100 on every Arabic page and on both post pages; the English blog and
contact pages read 93-96 on a **single node** — `.eyebrow`, `#FF5F29` on `#F2F3F5`, 2.73:1. That is the
orange-as-ink trade §14b made deliberately for board fidelity, and it is Ahmad's open decision, not a
new finding. It costs more here than on the homepage only because these pages have fewer applicable
audits, so the same binary failure carries more weight.

### 16.11 What `copy-pages.md` could not be built exactly as written

1. **`ابدأ بمكالمة واحدة`, About A6.** The named highlight is `مكالمة واحدة`, but Arabic joins the
   preposition ب to the word, so highlighting exactly that phrase would split `بمكالمة`. The span
   carries the prefix: `ابدأ <span class="hl">بمكالمة واحدة</span>`.
2. **The featured panel's label slot.** `blog-B.png` draws a category label (`SEO`) above the featured
   title, and §B2 forbids category chips. The slot carries the card's own meta line instead — date,
   computed read time and the author link — which is three of the six fields §B2 requires on every
   card. No category, no tag.
3. **`Read more` on the list rows.** The board draws it on the featured panel only, but §B2 requires
   all six fields on every card, so every row carries it. It doubles as the row's tap target on a
   phone.
4. **Read time.** Printed as computed, one minute under the frontmatter estimate on every post
   (16.2). §B5 permits exactly this.

### 16.12 Left open, and why

* **The `.eyebrow` contrast node**, above. One line each, and both the token and the surface are
  Ahmad's call. Unchanged from §14b.
* **`scripts/seo-audit.mjs` reports 26 high findings that are one pre-existing false positive.** The
  audit builds its page set from `index.html` files only, so the real, built, linked
  `/google-business-profile-checklist.html` reads as a missing page — 24 "internal link to a missing
  page" (one per page that links to it, so it grows with the page count) and 2 "sitemap lists a page
  that does not exist". It was 4 of the 20 highs before this pass. **The script was not edited: it is
  byte-identical to `.claude/skills/seo/scripts/seo-audit.mjs`, and a shared tool is not fixed from
  inside a client.** The launch gate needs this closed in the skill.
* **Three "thin page" mediums**: `/contact/` 114 words, `/en/contact/` 147, `/blog/` 281. The contact
  page is short *because* it has no form and no invented copy, which is the design. Nothing was added
  to reach 300 words.
* **Seven "description outside 70 to 165 characters" lows.** Every description is verbatim from
  `copy-pages.md` or from post frontmatter. Trimming them is a copy edit, not a build fix.

---

## 17. Medium-severity SEO close-out, 2026-09-24. 25 medium → 17 medium, 0 high held throughout

Audit totals: **0 high, 25 medium, 11 low → 0 high, 17 medium, 11 low.** The zero-high launch gate
never broke at any point in this pass. Nothing was committed, pushed or deployed.

### 17.1 404 page

Built from the homepage's own `header()`/`footer()` and the one stylesheet — no new visual language.
Arabic primary (matches every other page's default), with **one English line and link** for a reader
who followed a broken `/en/` link, because Netlify serves this exact file under `/en/` too (a single
`site/404.html` at the publish root, its own convention — `netlify.toml` needed a comment, not a
redirect rule). Says the page does not exist and offers the four routes that do: home, the offer, the
blog, contact — reusing the exact nav/strip label strings already in `data.mjs` rather than writing new
copy. `robots: noindex,follow`; canonical and all three hreflang alternates self-reference `/404.html`,
since that one file is genuinely what serves both locales. `notFoundPage()` in `build.mjs`; new
`.notfound-links` rule in `styles.css` (reuses `.text-link`, `.page-note`).

It is **not** part of the ar/en page-pair system `shell()` builds for every other page, so it does not go
through `shell()` — its head is hand-rolled with the same tags. It is also not linked from anywhere
internally (a "page not found" link in the nav would be absurd) and not in the sitemap (inviting a
crawler to index an error page is worse than leaving it out). Both of those are correct SEO practice, but
the shared audit script did not know that: see §17.6.

Confirmed by curl: `/`, `/en/`, and any nonexistent path under either all return **HTTP 404** with the
built page's content (`<title>الصفحة غير موجودة | Q8 block</title>`).

### 17.2 IndexNow key

Generated once with `crypto.randomBytes(16).toString('hex')`: **`57376d59e41f6fbe081224d68d86aa8e`**
(32-char hex). Locked as `INDEXNOW_KEY` in `src/data.mjs` with a comment saying why it must never be
regenerated, and written verbatim to `site/57376d59e41f6fbe081224d68d86aa8e.txt` by `build.mjs` on every
build. **IndexNow was never pinged and no external endpoint was called** — the site is not deployed and
that stays Ahmad's decision.

### 17.3 Open Graph — 14 medium → 13 medium, and why 12 of those 13 are staying open

The audit's rule is `!og.title || !og.image`. `og:title` was already present everywhere; `og:image` was
not, on 14 pages. `shell()` now also emits the Twitter equivalents (`twitter:title`, `twitter:description`,
and `twitter:image`/`summary_large_image` when an image exists) on every page, and `og:locale` /
`og:site_name` were already correct per locale.

**Closed (2 of 14): the two checklist pages.** Each now points `og:image` and `twitter:image` at its own
first real section illustration — `gbp-setup.webp` (EN) / `gbp-reviews.png` (AR, since the EN opening
illustration doesn't exist in the Arabic copy) — a real image already on the page, not a generated one.

**Left open (12 of 14, +1 new: the 404 page = 13):** home, offer, about, contact, the blog list and terms,
in both locales, plus `/404.html`. **None of these has a real photo to point at** — the only imagery on
the site is the six blog posts' own illustrations (already used, on the post pages only), the six 60×60
deliverable icons, the three §3 problem-card crops and the three §6 journey stage illustrations, none of
which represents "the page" the way a post's own art does. Per instruction: **no artwork was generated
and no image that isn't there was pointed at.** `og:title`, `og:description`, `og:type`, `og:url`,
`og:site_name`, `og:locale` and the Twitter text tags are complete on all 13; only `og:image` (and by
extension `twitter:image`) is missing, and the medium finding is expected to stay open on these specific
URLs until Ahmad supplies or approves a shared share-card image.

### 17.4 Images without width/height (2) and no preloaded LCP image (2) — both closed, plus a bug found underneath them

Both findings were on the two inherited checklist pages. Fixing them surfaced a real, pre-existing bug:
**every image on both pages was 404ing.** The EN file pointed at a relative `img/blog/…` path never copied
into `site/`; the AR file pointed at `../img/blog/…`, which resolves *above* the publish root entirely —
a leftover from the old site's directory shape. Explicit `width="1024" height="1024"` (the images' real
size, confirmed with `sharp`) would have silenced the audit either way, but shipping it on a permanently
broken `src` wasn't the point of the fix, so the underlying path bug was closed too, within the same
"image attributes only" limit: the five real illustrations were vendored from `_old/img/blog/` into
`site/assets/img/checklist/` by `build.mjs`, and both HTML files' `src` attributes now point at that one
absolute path. No copy, heading or paragraph on either page was touched.

Each page also gets one `<link rel="preload" as="image">` for its first real content image —
`gbp-setup.webp` (EN), `gbp-reviews.png` (AR) — the same file each page's `og:image` now uses.

**Two more broken references found the same way, neither one an `<img>` tag so the audit never saw
either.** The `shots.mjs` sweep (below) reported `errors=1–2` on all four checklist rows — nothing the
SEO audit checks for. Both were the same class of bug as the five images: `.post-hero`'s CSS
`background-image` pointed at `img/blog/gbp-blueprint.webp` (EN) / `../img/blog/gbp-blueprint.webp` (AR),
404ing exactly like the five `<img>` tags did; and neither file had a `<link rel="icon">` at all, so every
browser silently probed `/favicon.ico` and got a 404. `gbp-blueprint.webp` is now in the same vendored set
at `/assets/img/checklist/`, referenced by absolute path; both pages now carry the same
`<link rel="icon" href="/assets/img/favicon.svg">` every other page on the site already has. Re-swept
after: **`errors=0` on all four checklist rows.**

Verified in the browser: all 5 EN images and all 4 AR images load (200, correct natural dimensions), one
`<main>` landmark and one `<h1>` on each page, preload tag present and pointed correctly.

### 17.5 Thin pages — five found, five judged

| Page | Words | Verdict |
|---|---|---|
| `/blog/` | 281 | **Left.** Already documented (§16.12): the list page's intro paragraph is `copy-pages.md`'s own B1 intro, verbatim; most of the page is cards and links by design (§B2 forbids padding a card with more fields). No filler added. |
| `/contact/` | 114 | **Left.** By design — no form, no invented copy (`lessons.md`). |
| `/en/contact/` | 147 | **Left.** Same. |
| `/google-business-profile-checklist.html` | 0 → real count | **Fixed, not padded.** The 0 was a measurement bug: the audit counts words inside `<main>`, and this inherited page had no `<main>` landmark at all, so a genuinely long article (37-minute read) measured as empty. Wrapping the *existing* `post-hero` + `post-wrap` content in `<main>…</main>` — no word changed — fixed the false reading and is also a real accessibility improvement (a landmark region). |
| `/en/google-business-profile-checklist.html` | 0 → real count | **Fixed, same way.** |

**A sixth thin page appeared as a side effect: `/404.html`, 35 words.** Expected and accepted — the task
brief itself named a 404 as the standing example of a page that is legitimately short. Not padded.

### 17.6 Shared audit script: 404 pages don't belong in a sitemap or a link graph

Adding `site/404.html` made the audit's own file-walker treat it as an ordinary page, which produced
three **new high findings** that would have broken the launch gate: "missing from sitemap.xml" (a 404
belongs out of the sitemap — putting it in invites indexing an error page), "orphan page" (a 404 must
never be linked to internally — that would put a "page not found" link in the nav), and "unreachable
from the home page" (Netlify serves it directly for any missing URL; there is no click path to seed a BFS
walk with). All three are false positives against correct 404 behaviour, the same class of bug the
2026-09-24 checklist-page fix closed earlier in this file. Fixed at the source — `isErrorPage(u) => u ===
'/404.html'` — in **`.claude/skills/seo/scripts/seo-audit.mjs`** (the shared skill, not the client copy,
per the standing rule two rows up), then the client's `clients/q8block/scripts/seo-audit.mjs` was
re-synced byte-identical to it. The 404 page's own tags (title, description, canonical, exactly one H1,
JSON-LD, OG) are still audited exactly like any other page — only the crawl-graph checks that don't apply
to an error page were exempted.

### 17.7 Two accessibility fixes, Ahmad's decision 2026-09-24 (relayed mid-pass, not part of the original brief)

**Fix A — the offer page's "Limited offer" pill.** `.strip-pill` (only reachable now via `#offer-hero
.strip-pill`; the homepage strip pill already got its own override in §15.3) had white text on the
`#FF5F29` fill, 3.03:1 at a board-locked 18px — under the 18.66px bold large-text floor. Text changed to
`#141415` (measured **6.07:1** on the same fill); **the fill itself did not move**. Matches the homepage
strip pill's already-fixed state (6.23:1).

**Fix B — orange as ink on light backgrounds.** New token `--orange-ink-light: #E85319`, used only for
`.eyebrow` and `.work-metric` **on light surfaces**. `#FF5F29` as text measured 2.73:1 on `#F2F3F5` and
3.03:1 on white, both under the 3:1 large-text floor even at weight 700. `#E85319` measures **3.33:1 /
3.70:1** on the same two surfaces — real numbers, checked with the WCAG relative-luminance formula, not
assumed. History that mattered here: `#CE340A` was tried for the same problem on 2026-09-24 and reverted
because it sat 16 lightness points off the brand hue and read as a second colour next to a `#FF5F29`
fill in the same viewport (§14b). `#E85319` is a hue-identical (2° off, same as `#CE340A`), 8-lightness-
point step — half that gap. **Verified by eye at 1440**, section 5 (eyebrow directly above a `#FF5F29`
highlight block) and the offer page's own pill: no visible clash in either screenshot: the eyebrow reads
as a deeper tone of the same orange, not a second colour. `.on-dark .eyebrow { color: var(--orange) }`
keeps the one dark-surface eyebrow (§6 journey) at the brand value, since `#FF5F29` on `#101012` is
6.26:1+ and never needed the fix. **Every fill is unchanged** — buttons, highlight blocks, the logo
square, illustrations, the sparklines, and the journey section's month label and figure (still `--orange`,
confirmed in the CSS and in the Lighthouse run below).

**Measured after, not claimed — this did not reach accessibility 100 everywhere:**

| Page | Preset | Accessibility | Performance | CLS |
|---|---|---|---|---|
| `/offer/` and `/en/offer/` | mobile + desktop | **100** | 100 | 0.000 |
| `/` and `/en/` | desktop | **96** | 100 | 0.000 |
| `/` and `/en/` | mobile | **96** | 99–100 | 0.000 |

The offer page reached 100 on all four combinations — Fix A closed its one node completely. The home
page did not, on either preset, for two reasons, both measured directly from the Lighthouse `color-contrast`
audit's own `node.explanation`, not inferred:

1. **`.wwd-num` (the §4 outline step numerals `01 02 03`) fails everywhere, and `aria-hidden="true"` does
   not exempt it.** `#FF5F29` on `#F2F3F5` is 2.73:1 against a 3:1 large-text requirement, at both 44px
   (mobile) and 71px (desktop) — the size clears the large-text floor easily, the colour pair simply
   doesn't reach 3:1. §14 had assumed `aria-hidden` kept this out of the audit because no screen reader
   reads it; that assumption was wrong. Lighthouse's `color-contrast` audit checks what a sighted user
   sees, and `aria-hidden` only removes an element from the accessibility tree, not from the page. Left
   unfixed here: recolouring the numeral is the most visible change on the page for a decorative element,
   and §14/§14b already record it as Ahmad's call, not an agent's.
2. **On mobile only, `.eyebrow` (five instances) and `.work-metric` fall under the large-text floor and
   need the full 4.5:1, not 3:1.** `--fs-eyebrow` and `--fs-strip` both bottom out at their clamp floors
   on a narrow viewport — 14px and 15px — under the 18.66px-bold threshold that would allow 3:1. Measured
   there: eyebrow 3.32–3.66:1, work-metric 3.66:1, both short of 4.5:1. `#E85319` was sized against the
   3:1 large-text case, which is what the desktop measurement confirms it clears (no eyebrow/work-metric
   failures on desktop, at any width ≥ roughly 1350px where the fluid clamp has grown past 18.66px) — it
   was not sized against the mobile floor, and the brief's two fixes didn't ask for a new mobile-only
   size. Not changed here without a decision: the fluid type scale's floors are measured, board-matched
   values (§2), and raising one to buy contrast is the same category of trade-off §14b already reserves
   for Ahmad.

Both remaining nodes are reported, not silently left: this is the accurate, measured result of applying
exactly the two fixes as specified, and accessibility on the home page is **96, not 100**, on every
preset.

### 17.7b Closing both remaining nodes, Ahmad's decision (second round, same day)

The two nodes §17.7 left open were relayed back with explicit fixes and the instruction not to escalate
them again. Both are now closed.

**Node 1 — `.wwd-num`, 2.73:1.** Still the brand fill `#FF5F29`, just applied as a large (44–71px) decorative
outline stroke, which only needs 3:1. Moved to `--orange-ink-light` (`#E85319`, already measured at 3.33:1
on `#F2F3F5` in §14b/§17.7) — same size, same weight, same position, only the stroke colour moved.

**Node 2 — the mobile-only `.eyebrow` / `.work-metric` shortfall.** Not a colour fix — §17.7 already showed
`#E85319` clears 3:1 everywhere it is large enough to only need 3:1; the problem was purely that the 14px /
15px mobile floors dropped both under the 18.66px-bold large-text threshold, which raises the bar to 4.5:1.
Raised `--fs-eyebrow`'s floor 14px → **19px** and `--fs-metric`'s floor 15px → **19px**, both already weight
700. 19px/700 clears 18.66px, so both re-qualify for 3:1, which `#E85319` clears. The fluid ceiling (22px /
24px) and the desktop-width values are unchanged; this only raises what the clamp floors out at on a narrow
viewport, and reads better there regardless.

**Overflow check at 390px, both locales, per the instruction** — Arabic sets larger in Alexandria at the
same nominal size, so it was checked specifically, not assumed: every `.eyebrow` (all six sections, both
`/` and `/en/`) and every visible `.work-metric` measured `scrollWidth === clientWidth` at 390×844 (no
overflow, no wrap), and `document.documentElement.scrollWidth` stayed exactly `390` on every page checked.
No layout broke. Confirmed again for all 27 pages via a full `shots.mjs` resweep: **`broken=0`, `errors=0`,
`overflow=false` on all 54 rows** (unchanged from the pre-fix sweep — this pass didn't move any of those
numbers, it only had to not break them).

**Lighthouse, re-run in full — 3 runs per configuration, medians, all four original pages:**

| Page | Preset | Accessibility | Performance | Best Practices | SEO | CLS |
|---|---|---|---|---|---|---|
| `/` | mobile | **100** | 99 | 100 | 100 | 0.000 |
| `/` | desktop | **100** | 100 | 100 | 100 | 0.000 |
| `/en/` | mobile | **100** | 100 | 100 | 100 | 0.000 |
| `/en/` | desktop | **100** | 100 | 100 | 100 | 0.000 |
| `/offer/` | mobile | **100** | 100 | 100 | 100 | 0.000 |
| `/offer/` | desktop | **100** | 100 | 100 | 100 | 0.000 |
| `/en/offer/` | mobile | **100** | 100 | 100 | 100 | 0.000 |
| `/en/offer/` | desktop | **100** | 100 | 100 | 100 | 0.000 |

**Accessibility 100 on all eight page/preset combinations. Performance held at 99–100 and CLS at 0.000
everywhere — no regression.** This is measured from `results/summary.json`, not assumed from the two fixes
matching on paper.

**Every fill re-confirmed `--orange` (`#FF5F29`), nothing else.** Grepped `src/styles.css` after the change:
every `background: var(--orange)` / `background-image: linear-gradient(var(--orange), var(--orange))` rule
— the logo square is HTML/CSS not a fill token, the buttons, the highlight blocks, the offer pill, the
trust/§4 rules, both sparklines, the FAQ `+`/`−` icon, the countdown boxes — is untouched. `--orange-ink-light`
appears in exactly three places in the whole stylesheet: `.eyebrow`, `.wwd-num`'s stroke, `.work-metric`.

One incidental finding while re-checking `/en/blog/` in §17.9: its own page-head eyebrow sits on `--bg-light`
at the same floor, so it was carrying the same mobile shortfall (§17.9 recorded 95 there before this round).
Not separately re-measured after — `--fs-eyebrow`'s floor is a shared token, so the same fix applies to
every page that uses `.eyebrow`, not just the four in the table above; the four in the table are what the
brief asked to be re-verified with Lighthouse.

### 17.8 What was deliberately not touched, and what was investigated and left off

* The 12 non-post, non-checklist pages' missing `og:image` — **investigated on request, nothing fits.**
  Checked every real, already-shipped asset on the site: the homepage hero deliberately carries no image
  at all (§7 — "the LCP element is the H1"); the `design/boards/*.png` files are internal design
  references the build measures itself against, never shipped as page content, so using a crop of one
  would be pointing at an image that "is not there" in the sense that matters — it was never approved as
  site content; the six 60×60 deliverable icons are single-service icons (512px source, shipped at
  240×240) that would misrepresent every page except a services list, and are too low-resolution for a
  1200×630 card regardless; the three journey illustrations are dark-surface artwork built for `#101012`,
  not a generic card. **Nothing on the site is both real and page-appropriate for these 12 URLs. Tag left
  off, as instructed when nothing fits.**
* The seven "description outside 70–165 characters" lows and the two "title over 62 characters" lows —
  pre-existing, copy-owned, unchanged by this pass.
* `/blog/`, `/contact/`, `/en/contact/` thin-page mediums — by design, not padded (§17.5).

### 17.9 Verification run

* `node scripts/seo-audit.mjs`: **0 high, 17 medium, 11 low** (from 0/25/11). Re-run after the
  favicon/blueprint fix in §17.4 — unchanged, as expected (neither finding is one the audit checks).
* `scripts/shots.mjs`, copied into a scratch folder and run from there against all **27 built pages** —
  every homepage/offer-page section plus about, contact, blog list, terms, the six posts × 2, the two
  checklist pages and `/404.html` — at 1440×900 and 390×844, both locales: **`broken=0`, `errors=0`,
  `overflow=false` on every one of the 54 rows.** (The checklist rows read `errors=1–2` before §17.4's
  favicon/blueprint fix, `errors=0` after, re-swept separately to confirm.) One harness note for the next
  agent: Git Bash rewrites a bare `/` inside an env var to the Git install path before `node` ever sees
  it (`MSYS_NO_PATHCONV=1` fixes it) — it silently turned the homepage URL into
  `http://localhost:8823C:/Program Files/Git/` and crashed the very first page load with no other clue.
* `curl` on `/this-page-does-not-exist-xyz` and `/en/this-page-does-not-exist-xyz`: both **HTTP 404**,
  body is the built `404.html`. Confirmed the file exists at `site/404.html`.
* Lighthouse, the harness at `<scratch>/lighthouse-run/`, 3 runs per configuration, medians. **This is the
  first-round result, immediately after Fix A/Fix B and before §17.7b's two follow-up fixes:**

  | Page | Preset | Perf | A11y | CLS |
  |---|---|---|---|---|
  | `/`, `/en/` | mobile | 99–100 | 96 | 0.000 |
  | `/`, `/en/` | desktop | 100 | 96 | 0.000 |
  | `/offer/`, `/en/offer/` | mobile | 100 | 100 | 0.000 |
  | `/offer/`, `/en/offer/` | desktop | 100 | 100 | 0.000 |
  | `/blog/` | mobile / desktop | 100 | 100 / 100 | 0.000 |
  | `/en/blog/` | mobile / desktop | 100 | **95** / 100 | 0.000 |

  No performance regression at this point either: 99–100 and CLS 0.000 on every page and preset, matching
  the pre-existing state recorded in §16.10. The 96 on the home page (both locales, both presets) and the
  95 on `/en/blog/` mobile are the two nodes §17.7 names with exact ratios — not a regression from this
  pass, since §16.10 already recorded 93–96 on English secondary pages for the same underlying reason
  under the old single-orange rule.

  **§17.7b's Node 1 / Node 2 fixes were re-verified with a second full Lighthouse pass** (own table
  there): **accessibility 100 on all four original pages, both locales, both presets — 8 of 8** — with
  performance still 99–100 and CLS still 0.000 on every one. `/en/blog/`'s 95 was not separately
  re-measured (§17.7b) but shares the exact same token and floor as the four pages that were, so the same
  fix applies to it.

---

## 18. Ahmad's second revision pass, 2026-09-25. Five fixes: §3's headline, the dead slideshow, "service companies", "per city", and the blog's missing orange

His review of the built site. Everything below is his instruction. Verified with `compare.mjs` (now
extended past the homepage — §18.5.3), `shots.mjs` across all 27 routes at both viewports,
`scripts/seo-audit.mjs` and a fresh Lighthouse sweep. Nothing here is committed, pushed or deployed.

### 18.1 §3's headline was the SOLUTION sitting in the problem section

**The bug.** The section is called `المشكلة` / `The problem` and its headline read
`ملفك على جوجل يعمل. والموقع يضاعف أثره` / `Your profile works. A website multiplies it.` That is the
answer, not the problem. Ahmad: the problem is that the reader has a working Google profile **and no
website behind it**, and his own line for it was `ملفك على جوجل يعمل وما عندك موقع إلكتروني`.

| | Arabic | English |
|---|---|---|
| Was | ملفك على جوجل يعمل. والموقع **يضاعف أثره** | Your profile works. A website **multiplies it.** |
| Now | ملفك على جوجل يعمل **وما عندك موقع إلكتروني** | Your Google profile works. You have **no website.** |

Eight words in each language, the limit. The orange highlight sits on the half that carries the point —
the **absence** of a website — never on the profile, which is the half that already works.

**The Arabic is deliberately Gulf colloquial** (`وما عندك`, not the MSA `وليس لديك`). It is Ahmad's own
line and it pairs with the hero H1 he also wrote colloquially, `تبي عملاءك يجدونك...` (§15.6). Those two
display lines are in his voice and **every other Arabic string on the site stays professional MSA**. Do
not "correct" either of them, and do not treat this as licence to write colloquially anywhere else.

The English gains `Google` so it says which profile works, matching what his Arabic says outright.

**The subhead was re-read against the new headline and did not have to move.** It says the profile reaches
a narrow radius and that is all it can do, that a website widens the same demand, and it closes on
`الفارق بين الاثنين هو عمل قائم لا يصلك اليوم` / `The gap between the two is real work that is not reaching
you yet` — the cost of exactly the absence the headline now names. **The three cards are untouched** and
still read as consequences of it; card 3 already says `بلا موقع` / `With no website` in as many words.

§12's planned-break row moved with the headline. `copy.md` §3 records the change and keeps both retired
headlines listed as retired, so nobody reinstates one.

### 18.2 The slideshow was not auto-advancing, and the cause was `mouseenter`

Ahmad: `the slideshow should be automatically sliding. That is not happening. It's like a showcase.`

**Everything §15.5 built was working.** The timer starts, the `IntersectionObserver` is on threshold 0 and
reports correctly, nothing is stuck paused on load, and the `autoTimer` / `idleTimer` rename left no
dangling reference — all four checked directly by instrumenting `setInterval` / `clearInterval` and the
observer in the page. With no pointer near the section the carousel advanced fine.

**The cause is a real-world condition no code read would have found.** Chrome re-evaluates the hover target
after a scroll, so when a section scrolls under a **stationary** cursor it dispatches
`pointerenter` + `mouseover` + `mouseenter` — and **no `mousemove`**. That is exactly how a desktop reader
arrives at §7: the pointer rests mid-screen, the 1320 x 483 band scrolls under it, `mouseenter` fires, and
`hold` stayed true for the whole time the section was on screen.

Measured, cursor parked at 720,450 and the section wheel-scrolled under it, `/en/` at 1440x900:

| | scrollLeft at 0..12s |
|---|---|
| Before | `0 0 0 0 0 0 0 0 0 0 0 0 0` — dead for the full 12 seconds |
| After `/en/` | `0 0 0 0 448 448 448 448 896 896 896 896 1312` |
| After `/` (RTL) | `0 0 0 0 -448 -448 -448 -448 -896 -896 -896 -896 -1302` |

RTL advances negative, which is Chrome's `scrollLeft` convention and what `sign` in `app.js` exists for:
`go(1)` is "advance" in both locales. Instrumented event counts during that scroll:
`{pointerenter: 1, mouseover: 1, mouseenter: 1}`, zero `mousemove`.

**The fix, and it is not a rewrite.** Hover-pause now fires on a real `mousemove` over the slider instead
of on `mouseenter`. A pointer the page scrolls under produces no `mousemove`, so autoplay keeps running;
the moment the reader actually moves the mouse over the cards it pauses, which is the hover the pause was
for. One flag per reason to pause — `hovering`, `focused`, `pressing` — replaces the single `hold`,
because `focusout` used to set `hold = false` while the pointer was still on the cards, so releasing one
hold cancelled another. The 5s idle release now clears only `pressing`.

**Every accessibility behaviour §15.5 lists is intact and was re-verified**: no auto-advance under
`prefers-reduced-motion` (measured: scrollLeft still `0` after 10s with the media feature emulated, both
locales), pause on hover, on focus, on touch and when the tab is hidden, keyboard operable, all eleven
cards in tab order, visible prev/next buttons.

### 18.3 The offer has to say it is for SERVICE COMPANIES

Ahmad: `I noticed an issue in our messaging. We're not mentioning service companies. That should be clear
because we don't work with anyone, only service companies. Even in the offer, it doesn't mention service
companies.`

**1. Eligibility condition 1, ahead of the commercial registration.** The eligibility list is the part a
reader actually reads and it is where he self-qualifies, so it is condition 1, not a phrase in the intro.
The old three keep their wording exactly and renumber to 2, 3 and 4. The intro's `ثلاثة شروط` /
`Three conditions` becomes `أربعة` / `Four`.

| # | Arabic | English |
|---|---|---|
| **1 (new)** | نشاط خدمي. نعمل مع شركات الخدمات فقط. | A service business. We work with service companies only. |
| 2 | سجل تجاري أو وثيقة عمل حر. أي منهما يكفي. | A commercial registration or a freelance certificate. Either one is enough. |
| 3 | ملف نشاط تجاري على جوجل بعنوان مطابق للوثيقة. | A Google Business Profile with an address matching that certificate. |
| 4 | لا يوجد موقع إلكتروني قائم. | No existing website. |

**2. The homepage strip line.** `ستة أشهر مجانية، بدون عقد` / `Six months free, no contract` →
`ستة أشهر مجانية لشركات الخدمات` / `Six months free for service companies`. `بدون عقد` / `no contract` is
not lost: it keeps its own full-width band in B4, the offer page H1, the page title and offer FAQ Q2.

**3. The offer hero subhead states it in the first sentence** instead of the last. It opened on
`ستة أشهر من العمل الكامل` and buried `العرض متاح لشركات الخدمات في السعودية` at the end of a five-line
paragraph. It now opens `هذا العرض مخصص لشركات الخدمات في السعودية.` / `This offer is for service companies
in Saudi Arabia.` and closes on `دون التزام.` / `No commitment.` **The lead got shorter, not longer** —
one fewer clause overall, which helps §14b.4 item 4 (the seven-line lead crowding the 390x844 fold).

**Every other offer term is exactly as it was. No prices anywhere.**

### 18.4 "per city" is off the spots line

Ahmad: `don't mention each city. It says just nine seats left. That's it.`

`[SPOTS] مقاعد لكل مدينة` / `[SPOTS] spots per city` → **`[SPOTS] مقاعد متبقية` / `[SPOTS] seats left`**,
in all three places it renders: the homepage strip, offer hero B1 and offer eligibility B3. One function
per locale in `src/data.mjs`, so the three follow each other.

**The number is still `CONFIG.SPOTS` and is never hardcoded.** `9` does not appear in body copy, a
headline or a meta description anywhere, and both degraded states still render a complete band
(`SPOTS: null` drops the line; an expired countdown reveals `التسجيل مفتوح الآن` / `Registration is open
now`). `copy.md`'s slot register, its `[SPOTS]` note, the `src/data.mjs` config comments and `build.mjs`'s
header comment all lost "per city" with it, so the phrase does not survive anywhere to be copied forward.

### 18.5 The blog list did not look like the board it was approved from

Ahmad looked at the blog list and said it does not look like the design he approved: **there is no orange
on the page.** He was right, and the root cause is a process gap, not a one-off slip.

#### 18.5.1 Why nobody caught it: `compare.mjs` only ever covered the homepage

`scripts/compare.mjs` shipped with eight entries, all of them homepage sections. The blog, offer, about,
contact, terms and post pages were **never in it**, so the board-over-build loop that §13.5 makes mandatory
— the loop whose entire job is catching this class of drift — never ran on any of them. §16.10 verified
those pages with `shots.mjs`, HTTP checks and Lighthouse, and every one of those gates passes on a page
that looks nothing like its board. This is the alamana lesson (`lessons.md`, "The landing page IS the
template") in a smaller form: every other gate was green because none of them asks whether the page looks
like the approved design.

#### 18.5.2 What was wrong, and what it measures now

`design/boards/blog-B.png` draws the featured panel's illustration as a **full-bleed solid orange block**
and each list thumbnail as a **solid orange tile** with the artwork knocked out on top. The build rendered
both as pale grey plates with a small illustration floating inside, and dropped the orange from the
read-more links.

**A. New artwork.** The six sources at `design/blog-art/<slug>.png` were replaced with versions drawn on a
solid `#FF5F29`-family field with near-black and white line art over it — same six slugs, same 1344x752.
The build does **not** derive the WebP from those PNGs (it only copies `src/img/`), so §16.9's two-output
conversion was re-run explicitly; the derivatives were stale by an hour otherwise and nothing would have
changed on the page. The `-sq` crop still works unchanged: it finds the ink box by difference from the
corner pixel, which is now the orange field rather than white, so it still squares around the drawing.

| | Orange pixels, six featured illustrations | Orange pixels, six thumbnails |
|---|---|---|
| Before | **1.2 %** | **2.5 %** |
| After | **83.3 %** | **65.9 %** |

**B. The read-more link is orange, as the board draws it.** `#FF5F29` as ink on `#FEFEFE` is 3.00:1 and
fails at any size, and `--orange-ink-light` (`#E85319`) is 3.67:1 — the **large-text** allowance only. So
`.read-more` takes the identical shape §17.7b gave `.eyebrow` and `.work-metric`: weight 700 with a 19px
floor, which clears the 18.66px bold threshold and therefore qualifies at 3:1. The board already draws the
link semibold, so this is the board being matched, not bent. `.text-link` elsewhere on the site is **not**
touched, and no third orange value was introduced.

**C. The list rows were two and a half times the board's.** Board thumbnail tops measure css y 465.5 /
579.6 / 690.0 at 1440, a row pitch of **114.1 and 110.4**. The build was running **283.8px** rows, because
`.row-text .h3` borrowed the 32px `--fs-h3` where the board draws the row title at ~21px, and every gap
around it was a body-section value. Same failure and same fix as `.work-site` in §14b.1: the row title gets
its own size, `clamp(17px, calc(21/14.4 * 1vw), 23px)`. With the gaps and padding tightened
(`padding-block` 26 → 16, column gap 28 → 24, thumbnail 104 → 96) rows now measure **198.3px**.

**The residual 198.3 against the board's 112 is copy, not CSS, and it is deliberate.** The board's rows
carry a bare date, a one-line title and a two-line excerpt. The build's rows carry all six fields
`copy-pages.md` B2 requires — date, read time, byline, title, excerpt **and a read-more link** — and its
excerpts run to three lines at the site's own body scale. The read-more alone is ~36px per row. Trimming
either is a copy decision and belongs to Ahmad, exactly as §14b.4 item 6 left the §3 and §5 card lengths.

**D. Deliberately NOT done: the featured panel's small label.** `blog-B.png` draws an orange `SEO` label
above the featured title. That is a **category chip**, and `copy-pages.md` B2 says in as many words:
`Every card carries the same six fields and nothing else. No category chips, no tags.` The board's own
label text is model-invented like `Q8 digital` and `178 spots per city` before it (§13.2 — never read copy
off a board), and the site has no category taxonomy to fill it from. The slot above the featured title is
already occupied by the approved card-meta line. **Adding a label is new copy and it is Ahmad's call**, one
line in `data.mjs` and one in `copy-pages.md` if he wants it.

**Orange elements on `/en/blog/`, counted by a computed-style sweep (colour, background, border, fill,
stroke, highlight gradient): 7 → 13.** The six read-more links are the difference. That count cannot see
images, which is where the real change is: the seven artwork blocks it does not count went from 1.2 % and
2.5 % orange to 83.3 % and 65.9 %.

#### 18.5.3 `compare.mjs` now covers every page that has a board

Rewritten from one page x one viewport to a `PAGES` list, each with its **own viewport**:

| Page | Viewport | Boards |
|---|---|---|
| `/` and `/en/` | 1440x900 | `hero-C`, `s3`, `s4`, `s5`, `journey-D`, `s7`, `s8`, `s9` (unchanged) |
| `/blog/` and `/en/blog/` | 1440x900 | `blog-B` over `#page-head`..`#posts` |
| `/offer/` and `/en/offer/` | **390x844** | `offer-1` over header..`#offer-hero`, `offer-2` over `#offer-included`..`#offer-eligibility`, `offer-3` over `#offer-nocontract`..`#offer-final` |

**The offer boards are PHONE boards.** `offer-1/2/3.png` are 1520x2688 **portrait** — a 390px screen — while
every homepage board is 2688x1520 landscape at 1440. Shooting a phone board against a desktop build compares
nothing, which is why the offer page is shot at 390x844. This matches `lessons.md` ("Board canvas = a 390px
PHONE screen"); the homepage boards predate that rule.

The run writes 24 pairs and reports `MISSING selectors: 0`, and exits non-zero if any selector is missing so
a renamed section cannot pass silently.

**About, contact, terms and the post pages are exempt from a board diff, and the exemption is checked, not
assumed.** They have no board because §16 built them deliberately out of the homepage's already-approved
components. A board pair would compare them against nothing. Instead `compare.mjs` loads the homepage class
vocabulary and reports, per page, which classes are not in it — so a page growing its own one-off components
shows up. Current state: about 8, terms 6, contact 14, post 15, and every one of them is a component §16.7
names (`page-head`, `about-card`, `reach-grid`, `map-shell`, `prose`, `post-nav`…). None is a colour or a
type token of its own.

**Known, recorded board/build differences the offer pairs will always show**, so the next agent does not
"fix" them back: `offer-1` draws the wordmark `Q8 digital` (model slip, `copy.md` §0), a spots figure the
model invented, and the highlight on `no contract` where Ahmad moved it to `free`; `offer-2` draws three
eligibility rows where the build now ships four (§18.3); `offer-3`'s heading
`What happens after six months and three` is a truncated model sentence (`copy.md` B5).

### 18.6 The one place something got taller: the phone offer strip

`§6` calls the strip "one line tall on desktop" and the phone CSS said it "packs into three".

**Desktop is unaffected and still exactly one row**, with room to spare, in both locales:

| | 1440 | 1920 |
|---|---|---|
| Before | 78px, 1 row, content 1205 (ar) / 1219 (en) of 1320 | 79px, 1 row, content 1311 / 1327 of 1500 |
| After | **78px, 1 row**, content 1233 / 1270 of 1320 | **79px, 1 row**, content 1342 / 1383 of 1500 |

**At 390 the band went from three rows (117.2px) to four (142px)**, because Ahmad's longer strip line stops
the line sharing row 1 with the pill: the inner box is 350px and pill + line now measure 410 (en) and 358
(ar) against 333 and 341 before. Flex wrap follows DOM order, so the only routes back to three rows are to
drop an element the page needs (the countdown label, or the seats line FIX 4 exists to show) or to reorder
the phone strip so `Registration closes in` lands on a different row from its own clock. Both are worse than
the extra row, and the English line cannot fit beside the pill at any font size the band can legibly use.

**Nothing broke: §15.1's first-screen budget still balances exactly.** At 390x844 the hero absorbed the
25px and the fold is still the fold, in both locales:

| Viewport | Header | Hero | Strip | First screen | `#problem` top | Hero internal scroll |
|---|---|---|---|---|---|---|
| 1440x900, both | 112 | 822 | 78 | **900** | **900** | 0 |
| 1920x1200, both | 112 | 1121 | 79 | **1200** | **1200** | 0 |
| 390x844, both | 72 | 702 (was 726.8) | 142 | **844** | **844** | 0 |

### 18.7 Verification run

Scripts copied into a scratch folder and run from there, as always — imports do not resolve inside the
client repo, and `puppeteer-core` and `sharp` live in scratch only. Real Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`, `BASE=http://localhost:8823`.

**`shots.mjs` across all 27 routes at 1440x900 and 390x844, both locales — 52 rows:**
**`brokenImages = 0`, `errors = 0`, `horizontalOverflow = false` on every row.** Every row also carries an
`h1`, and `scrollWidth === innerWidth` on all 52 (1440 and 390 exactly), so nothing overflows in either
locale. The four homepage rows report `missingSections: 0` — all eight sections present.

**`node scripts/seo-audit.mjs`: 0 high, 17 medium, 11 low** — byte-identical to §17.9's totals. No
finding was introduced and none was resolved; this pass did not touch anything the audit checks.

**`compare.mjs`, extended (§18.5.3): 24 pairs written, `MISSING selectors: 0`**, both locales, homepage at
1440 and the offer page at 390. Every pair was looked at. The boardless component check reports no page
inventing tokens or colours of its own.

**Lighthouse**, the harness at `<scratch>/lighthouse-run/`, **3 runs per configuration, medians**:

| Page | Preset | Perf | A11y | Best practices | SEO | CLS |
|---|---|---|---|---|---|---|
| `/` | mobile | 99 | **100** | 100 | 100 | **0.000** |
| `/` | desktop | 100 | **100** | 100 | 100 | **0.000** |
| `/en/` | mobile | 100 | **100** | 100 | 100 | **0.000** |
| `/en/` | desktop | 100 | **100** | 100 | 100 | **0.000** |
| `/offer/` | mobile | 99 | **100** | 100 | 100 | **0.000** |
| `/offer/` | desktop | 100 | **100** | 100 | 100 | **0.000** |
| `/en/offer/` | mobile | 100 | **100** | 100 | 100 | **0.000** |
| `/en/offer/` | desktop | 100 | **100** | 100 | 100 | **0.000** |

**Accessibility 100 on all eight, performance 99–100, CLS 0.000 everywhere** — no regression against
§17.7b's table, which is the same eight rows at the same numbers.

**The blog pages were measured too, because §18.5's read-more is a new orange text colour and that is
exactly where a contrast regression would land.** All four rows, 3 runs each:

| Page | Preset | Perf | A11y | CLS |
|---|---|---|---|---|
| `/blog/` | mobile / desktop | 100 / 100 | **100 / 100** | 0.000 / 0.000 |
| `/en/blog/` | mobile / desktop | 100 / 100 | **100 / 100** | 0.000 / 0.000 |

`/en/blog/` mobile was **95** in §17.9 and is now **100**, which is §17.7b's shared `--fs-eyebrow` floor
landing on the page it predicted it would (§17.7b's closing paragraph) — confirmed rather than assumed.
The new orange `.read-more` cost nothing, which is what the weight-700 / 19px-floor shape was for.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

---

## 19. The blog list as an exact replica of `blog-B.png`, 2026-09-25. Measured, not eyeballed

§18.5 tightened the blog list and Ahmad looked at it again and said it was **ugly**, and that he wanted
a replica:

> "I want you to make it exactly like the image in Higgsfield. Even the blog titles. Because what you
> did looks ugly. I want it to be exactly like the image you showed me, which is B. Everything in it.
> Even the titles and everything. Which means we're going to edit even the blog posts themselves. I
> want a replica."

So this pass took the board as the spec for the **words as well as the layout**: all six posts were
retitled and rewritten to the board's titles, and every layout number below was measured off the PNG.
§18.5 had already been told the rows were too tall and had fixed half of it by eye; this is the
measured version.

### 19.1 How the board was measured, and the two conversion factors

`blog-B.png` is 2688x1520 for a 1440 screen, so `css = board x 0.535714` (§0). A script in the scratch
folder scans it for horizontal hairlines, flood-fills the orange blocks for their exact rects, and
splits each text column into ink bands with their colour, height, width and baseline pitch. Nothing
below is read off the image by eye.

**Board ink cannot be turned into a font size without a conversion factor, and the factor has to come
from inside the board**, because the board's face is not Alexandria. Two were derived, each anchoring
on a size §2 already locked from this same board family:

| For | Anchor | Factor |
|---|---|---|
| ascender-to-descender strings | board H1 ink **70.7** <-> the locked **80px** H2 | **x 1.1315** |
| cap-height-only strings (all caps, no descender) | board eyebrow cap **17.1** <-> the locked **22px** eyebrow | **x 1.2865** |

And Alexandria's own metrics, measured with canvas `TextMetrics` on the shipped subset rather than
assumed: **cap 0.72 em, ascender+descender 0.98 em.** §2.3 worked from 0.89. The real 0.98 is why the
board's display leading is not reachable — see 19.4.

One thing the board simply cannot give: **Alexandria is ~29 % wider per character than the board's
face.** `The Complete Guide to` measures **517.1px** at 44px/700 in Alexandria against the board's
**418.9**. Matching the board's ink WIDTH would mean setting the title at 35px, three quarters of the
board's apparent size. **Cap height is the quantity matched; width is not matchable and is not chased.**

### 19.2 The measured table

CSS column is at a 1440 viewport. The board's own container is 1344.1; this site's is the locked
**1320** (§5.1), so proportions are carried across, not absolute x positions.

| Item | Board (css) | Built | Δ |
|---|---|---|---|
| Page surface | **#FEFEFE top to bottom** — sampled at nine points, there is no `--bg-light` band behind the heading | `.blog-page .page-head` opts out of the band; about, contact, terms and 404 keep it | — |
| Eyebrow `BLOG` | cap **17.1**, orange, uppercase | `--fs-eyebrow` 22px | 17.1 x 1.2865 = 22.0 ✓ |
| H1 ink | **70.7** tall, 835.2 wide | `--fs-h2` **80px** | unchanged, and this is the anchor |
| H1 ink -> panel rule | **19.8** | 32 + the B1 lead | see 19.5 |
| Panel top / bottom rule | y **140.9** / **428.0**, 1px `#DEE1E4` | `1px solid var(--hairline-light)`, radius 0 | ✓ |
| Panel height | **287.1** | **330.3** | **+43.2** |
| Panel padding | l 19.3 / t 17.1 / b 18.2 | **18px** (measures 19) | ✓ |
| Featured art | **670.2 x 252.3 = 2.657:1** | 657.3 x 247.5 | ✓ exact at 1320 |
| Art -> text gap | **45.0** | **44** | ✓ |
| Text column | 782 -> 1373 = **591.0** | **580.7** | ✓ |
| Art : text split | **1.132 : 1** | `minmax(0,1.132fr) minmax(0,1fr)` | ✓ |
| Drawing inside the art block | **71 % wide, 78 % tall** | the `-wide` derivative scales the drawing by height to 78 % | ✓ |
| Category label | cap ~13 -> **16.7px**, orange, uppercase, bold | **19px / 700**, `--orange-ink-light` | **+2.3**, the §17.7b floor |
| label -> title | 8.6 ink | 8 | ✓ |
| Featured title | cap **33.2** -> **42.7px**; pitch **39.1**; 3 lines | **44px** (`--fs-h3-s6`) / **46.2** | +1.3 size, **+7.1 leading** |
| Title block | **117** | **138.6** | **+21.6** |
| title -> excerpt | 19.3 ink | 14 | ✓ |
| Featured excerpt | ink **19.5** -> **22.1px**; pitch **24.4** = 1.11; 3 lines | **22px / 1.15**; 3 lines | ✓ size, +1 leading |
| excerpt -> read more | 13.3 ink | 12 | ✓ |
| Read more | orange, underlined, bold, **`→`** | 19px / 700 + an inline SVG arrow | see 19.3 |
| Rule under the panel | **18** below, full container | **18**, 1320 wide | ✓ |
| Columns | 652.5 and 645.0, gutter **46.6** | 637 each, gutter **46** | ✓ |
| Thumbnail | **100.2-103.9 wide x 85.2-92.7 tall** — the board's five are not square and not consistent | **100 x 88**, `object-fit: cover` off the 240² crop | ✓ |
| Thumb -> text | **30.0**, both columns | **30** | ✓ |
| Row pitch | **114.1 / 111.9** | **126** | **+11.9** |
| Row padding-block | ~13 | 14 | ✓ |
| Row date | cap **11.8** -> **15.2px**, grey, UPPERCASE | `--fs-meta` **15px** / 500 | ✓ |
| date -> title | 5.9 ink | 4 | ✓ |
| Row title | ink **20.4-20.9** -> **23.1px**, black | **23px / 700 / 1.1** | ✓ |
| title -> excerpt | 7.5 ink | 5 | ✓ |
| Row excerpt | ink **16.1** -> **18.2px**; pitch **20.4** = 1.13; **2 lines** | **18px / 1.2**; 2 lines | ✓ size, +1 leading |
| Row rules | per column, none under the last row of each | `:nth-last-child(-n+2)` | ✓ |

**The type scale came out right.** Every size the board gives — 22 eyebrow, 80 H1, 42.7 title, 22.1
featured excerpt, 15.2 date, 23.1 row title, 18.2 row excerpt — lands within 0.2px of a value already
in §2 or derived here. §18.5's 21px row title was the one real miss: the board says 23.

### 19.3 Three things the board draws that the build did not

1. **The category label.** `blog-B.png` draws an orange `SEO` above the featured title. §18.5.2 D
   deliberately left the slot empty because `copy-pages.md` §B2 said *"no category chips"*. Ahmad
   overruled it. Every post now carries a `category` in frontmatter and the featured panel renders it.
   It takes the §17.7b shape (700 weight, 19px floor) because `--orange-ink-light` is 3.67:1 and only
   qualifies as large text — same trade `.eyebrow`, `.work-metric` and `.read-more` already make. **No
   third orange was introduced.**
2. **The rows lost their byline, read time and read-more.** The board draws a bare uppercase date, the
   title and a two-line excerpt, and nothing else. §16.11 item 3 had put a read-more on every row to
   satisfy §B2's six fields; §B2 is now overridden for this page. With the byline gone **each row holds
   exactly one link**, so the title link stretches over the whole row — the tap target the read-more
   used to be, with one link instead of two. There is now no outbound link on the list page; the author
   link to `ahmadowaihan.com` still sits on every post page.
3. **`Read more →`, with a drawn arrow.** The board's arrow is U+2192, which is in **neither**
   Alexandria subset's `unicode-range` — the Latin face carries U+2191 and U+2193 and stops. Typing the
   character would have dropped the one line Ahmad singled out into a fallback font. It is an inline
   SVG in `currentColor`, mirrored under `dir="rtl"` by CSS.

**The board's dates are not used.** It draws `APR 12, 2025`, `MAR 28, 2025` and so on; those are model
inventions and the posts are all 2026-09-24. Only the TREATMENT is the board's — uppercase and tracked
on Latin, neither on Arabic (§2.3). Ahmad: `I want to be honest and no fake.`

### 19.4 What still differs, and why it is not fixable by turning a dial

**The featured title block is 138.6 against the board's 117, and it is leading, not size.** The board
draws three lines at a **39.1** pitch on a cap of 33.2 — a line-height of about **0.85 em**. Alexandria's
ascender+descender measures **0.98 em**, so anything under 1.0 clips and 1.05 (§2.3's floor, now
confirmed by measurement rather than the 0.89 it assumed) leaves 3.1px of air at 44px. The board's face
is both narrower and shorter-bodied than Alexandria. Dropping the size to reach the height would make
the title visibly smaller than the board's, which is the opposite of the ask.

That 21.6 is most of the panel's +43.2. The rest is the category label's accessibility floor (+4) and
the excerpt's +1 leading (+3).

**Rows are 126 against 114.1.** 28 of that is padding, 97 is content: date 19.5, title 25.3, excerpt
43.2 and the two gaps. The board fits the same three elements in 88 by running ~1.13 leading on all
three. The excerpts were rewritten to the board's **two lines** — that was the big win, worth 23px a row
— and pushing the leading below 1.2 to find the last 12px would set Arabic unreadably tight for nothing
Ahmad asked for.

**The B1 intro paragraph is on the page and is not on the board.** It is approved copy in
`copy-pages.md` §B1 and deleting site copy is a copy decision, not a layout one, so it stayed and the
rhythm around it was tightened instead: the grey band is gone, `.page-head` closes at 32 and `#posts`
opens at 0 where the pair used to be 72 + 72. **This is the one remaining difference Ahmad can close in
one word**, and it is the largest single reason the board and the build do not register line for line.

### 19.5 The content: six posts retitled and rewritten

Titles are `blog-B.png`'s, character for character, with Arabic mirrors; the table is `copy-pages.md`
§B5a. Slugs follow the titles. **They knowingly break this site's no-jargon rule** — `rank` is banned as
a selling word everywhere else and the reader is an owner with no website — and that is Ahmad's call,
stated twice for this page. The bodies are not exempt: each one explains the term in its own title in
plain words the first time it appears and then writes plainly.

The six are real rewrites, not re-headed drafts. Material that still fitted was carried over (the three
ceilings, the service/area page logic, the NAP-consistency passages, the AI-quotability criteria);
keyword research, measurement and citations had no predecessor and were written fresh. Two sonnet
writers took three articles each, Arabic first and English as its mirror, section for section, under the
standing no-invented-facts rules.

| Slug | AR words | EN words | `##` |
|---|---|---|---|
| complete-guide-to-local-seo | 643 | 874 | 6 |
| keyword-research-for-local-seo | 720 | 965 | 6 |
| on-page-seo-basics-for-local-sites | 688 | 893 | 7 |
| google-business-profile-optimization | 677 | 999 | 6 |
| measuring-local-seo-success | 625 | 851 | 6 |
| building-local-citations-that-matter | 616 | 850 | 6 |

**Excerpt length is now a build constraint, not a style preference.** Two lines on a row, three on the
featured panel. The first draft's excerpts ran 122-136 characters and every row went to three lines and
154.5px; cut to 98-108 they fit two and the rows came down to 126.

### 19.6 The featured slot is pinned, and the code says so

Ahmad, looking at the board:

> "it is amazing how the featured one, the big one, says The Complete Guide to Local SEO for Small
> Businesses, which is perfect for our business. And that will remain there no matter how many blog
> posts we have."

`build.mjs` has **`FEATURED_SLUG`**, a single named constant, resolved **by slug and not by position**
in `blogPage()` — so reordering `LIST_ORDER` cannot move the panel, and a missing slug throws at build
time rather than silently featuring something else. The comment above it says in as many words not to
rewrite it as `LIST_ORDER[0]`, a date sort or a `featured: true` flag the newest post could also set.
Adding post seven means adding one line to `LIST_ORDER`.

### 19.7 Artwork: re-mapped, not regenerated

> **SUPERSEDED the same day by §19.9.** Everything below is what the pass did and why, and it was
> still the wrong answer: re-mapping a separately generated illustration set is not cropping the
> board. The artwork the site ships now is cut out of `blog-B.png` itself and `design/blog-art/` is
> referenced by nothing. Read §19.9 before touching any of this.

**Nothing was generated.** The six existing drawings were re-mapped to the new slugs by subject, and
the source PNGs were then **renamed on disk** so `design/blog-art/<slug>.png` is true again (§16.9).
The table is the record of which drawing moved where:

| New slug (and new filename) | Was | Why it fits |
|---|---|---|
| complete-guide-to-local-seo | `why-your-google-profile-stops-growing` | pin, radius, buildings — a business in its own area |
| keyword-research-for-local-seo | `what-to-ask-before-paying-for-seo` | a clipboard of ticks and **question marks** — the questions people type |
| on-page-seo-basics-for-local-sites | `how-ai-assistants-decide-what-to-quote` | a page and the sentence quoted out of it |
| google-business-profile-optimization | `what-to-do-with-your-google-profile` | storefront, stars, checklist |
| measuring-local-seo-success | `why-a-slow-website-loses-customers` | a stopwatch and a rising arrow |
| building-local-citations-that-matter | `page-per-service-and-area` | a web of listings and pins joined by lines |

**Every new title found a drawing; none was invented and none was substituted with a stand-in.**

Three changes to how they are cut (§16.9 cut two outputs; there are now three):

1. **A `-wide` derivative, 1344x506.** The board draws the featured art at **2.657:1** and the sources
   are 1.787:1. The drawing is scaled by HEIGHT to the board's 78 % and the flat field extends around
   it. **Contained, never cropped**: five of the six drawings are taller than a 2.657:1 frame and four
   are wider than a square, so a crop clips them — the first attempt lost part of every illustration.
2. **The field is flattened first.** The generated PNGs are not perfectly flat orange, so filling the
   extend margin with one sampled colour left a visible rectangular seam around each drawing. The modal
   field colour is taken and every pixel within tolerance is written to exactly that value.
3. **A sharp trap worth recording: one resize per pipeline.** `.resize(a).extend(…).resize(b)` does not
   do two resizes — the second **replaces** the first, so the wide files came out 2163x617 instead of
   1344x506 and the panel rendered a 1:3.5 strip with the art 60px short. Scale, write to a buffer,
   extend in a second pipeline.

### 19.8 Verification

The loop that was skipped last round was run: **the board-over-build pair was looked at, in both
locales, and the build was changed until it matched** — four passes. The pairs are in the scratch
folder.

| Gate | Result |
|---|---|
| `compare.mjs`, `/blog/` and `/en/blog/` over `blog-B.png` | pairs inspected by eye, both locales; `MISSING selectors: 0` |
| `shots.mjs`, 24 routes x 1440x900 and 390x844, both locales | `broken=0`, `errors=0`, `overflow=false` on every row |
| `scripts/seo-audit.mjs` | **0 high** |
| Lighthouse, `/blog/`, `/en/blog/` and one post page | accessibility **100**, performance **99+**, CLS **0.000** |
| Sitemap and `llms.txt` | both generated from `PAGES`/`POSTS`, so both followed the rename; **0** references to an old slug anywhere in `site/` |

`scripts/compare.mjs`'s `BOARDLESS` list held `/blog/why-your-google-profile-stops-growing/` and was
repointed at `/blog/complete-guide-to-local-seo/`; it would otherwise have checked a 404.

**Nothing in this pass was committed, pushed or deployed.**


### 19.9 The artwork is cut out of the board, the heading is the board's, 2026-09-25

Ahmad, looking at the replica:

> "you keep using the same images that we generated and you're holding on to them when I'm asking you
> to completely get rid of them and copy exactly what we have in the board."

He is right and §19.7 is the mistake he is describing. `references/lessons.md` says it in as many
words — *"Photographs in the build are cropped out of the approved boards ... Never substitute a
different photo."* — and §19.7 substituted six, then congratulated itself for not inventing any.

**The rule for this page from now on: blog artwork comes out of the board and is never regenerated.**

#### a. Where the six drawings come from

`design/blog-art-board/` holds six crops taken off `design/boards/blog-B.png` at its native
2688x1520 by colour-component detection, one per post. They are the board's own tiles, orange field
included, because on the board the orange IS the artwork — which is also why nothing in the CSS paints
an orange plate behind them.

| File | Board crop | Drawing | Slot |
|---|---|---|---|
| `complete-guide-to-local-seo.png` | 1249x470 | browser, bar chart, circled arrow | the featured panel |
| `keyword-research-for-local-seo.png` | 184x164 | document with a magnifier | left column, row 1 |
| `on-page-seo-basics-for-local-sites.png` | 185x167 | document with a pencil | right column, row 1 |
| `google-business-profile-optimization.png` | 183x157 | map pin on a road web | left column, row 2 |
| `measuring-local-seo-success.png` | 183x161 | bar chart with a rising arrow | right column, row 2 |
| `building-local-citations-that-matter.png` | 183x158 | browser with a link glyph | left column, row 3 |

The mapping was checked against the board by eye before anything was wired, in both directions.

`design/blog-art/` — the generated set — is **left on disk and referenced by nothing**. A grep for it
across `build.mjs`, `src/` and `scripts/` returns only this file and the comment at the top of
`scripts/blog-art.mjs` saying it is dead.

#### b. How the three derivatives are cut now

`scripts/blog-art.mjs` reads `design/blog-art-board/` and writes, per post:

| Output | Size | How |
|---|---|---|
| `blog-<slug>-sq.webp` | the crop's own, ~234x20x | **the board tile as the board drew it**, re-encoded and nothing else |
| `blog-<slug>-wide.webp` | 1440x542 | the featured crop resized; the five tiles composed on their own flat field at 78% height |

**Two frames, not three.** The first cut kept the old 1344x752 post hero as well, and filling a frame
that tall meant scaling a 194px drawing past 2.5x — the post pages came out soft with the drawing
stranded in orange. **2.657:1 is the only art ratio `blog-B.png` gives**, so the wide derivative is now
the featured panel, the post hero and the og:image alike, and the same drawing renders at 229 css on a
780 column, a 1.2x scale.

**Every crop is inset 3px on each side first.** The crops end exactly at the board's tile edge, so
their outermost rows carried a pixel of the white panel behind them; those rows sit outside the field
flattening's tolerance, survived it, and drew a hairline across the top and bottom of every composed
frame. Inset, they are gone — and the ink boxes came out smaller and truer for it (the keyword tile's
went 202x194 -> 186x156).

**Flattening is used only where a margin is added.** Its tolerance also nibbles the edge of the darker
red circle the board draws behind the featured artwork and left speckle across the bottom-left of the
post hero. The tile and the featured panel need no margin, so both take the crop untouched; only the
five composed wide frames take the flattened one.

It also writes **`src/blog-art.json`**, every file's intrinsic size, which `build.mjs` reads so each
`<img>` carries its own true width and height. The board's five tiles are five different shapes, so a
single hard-coded pair would have been wrong for four of them and CLS would not have stayed 0. The
manifest lives in `src/` and not `src/img/` because the build copies all of `src/img/` into the public
output.

**`.row-art` now has `height: auto`, and that is the board being matched rather than a shortcut.** The
board's five tiles are 88.4 / 90.0 / 84.1 / 86.3 / 84.6 css tall on a ~99.5 width because they are five
different crops. At a fixed 88 with `object-fit: cover`, the on-page tile — whose ink reaches its own
top and bottom edge — lost 5.7px of drawing. At `auto` the five render 89.2 / 90.4 / 85.8 / 87.1 / 86.3,
which is the board's own set of heights, with nothing cropped and no ink touching an edge.

#### c. The heading is the board's

| | Was | Now |
|---|---|---|
| English | Articles for local **service owners** | **Insights for** better growth. |
| Arabic | مقالات لأصحاب **الأنشطة الخدمية** | **رؤى من أجل** نمو أفضل. |
| Highlight | on the END of the line, 99% of the container | on the START of the line, as the board draws it |
| Size | `--fs-h2`, 80px / 600 | **67px / 700**, blog list only |

**Where 67px comes from, measured not guessed.** The cap of the `I` in `Insights` is 88 board px, i.e.
47.1 css at 1440. Alexandria's cap is 0.70 em on the shipped subset (canvas `TextMetrics`), so the
board's size is 47.1 / 0.70 = 67px. The built page now renders that same `I` at **88 raster px against
the board's 88** — the cap heights are identical, which is the quantity §19.1 already says is the one
to match. The weight comes from the same measurement: the board's stem is 23 px on an 88 cap, 0.261,
and Alexandria's stem/cap is 0.229 at 600 and 0.257 at 700. Arabic takes 50px, the 60/80 ratio the two
`--fs-h2` tokens already carry, because Alexandria draws Arabic materially larger at the same px.

#### d. Closing the density gap

The board's canvas is 814.3 css tall at 1440 (735 at a matched 1300). Every number below is the board
measured at native resolution against the built page shot at a 1440 viewport with `deviceScaleFactor
2688/1440`, so one raster pixel is one board pixel and the two are compared without any conversion.

| | Board | Build, before | Build, after |
|---|---|---|---|
| Content region at 1300 | **735** | 840 | **741** |
| Eyebrow ink -> panel top rule | 110.9 | 125.9 | 113.0 |
| Featured panel | 287.1 | 330.3 | 291.0 |
| Featured text column | ~256 | 292.3 | 255.0 |
| Row pitch | 111-120 | 126 | 115.3-117.4 |
| List block | 330 | 378 | 350 |

What moved, and the board number behind each:

1. **H1 67px/700** (cap 47.1) and **the eyebrow's 16px margin to 0** — the board puts `BLOG`'s baseline
   15.5 above the H1's cap, and the shared §5.3 rhythm plus Alexandria's half-leading made it 32.7.
2. **`.page-head` closes at 19** — the board puts the panel's rule 20.4 under the H1's descender.
3. **Featured title 40px** (board cap 28.4 -> 40.6) and, Latin only, **`line-height: 1`**. §19.4 called
   1.05 the floor on an assumed 0.89 em body; measured, Alexandria's ink for these three lines is
   **0.99 em**, so a 1.00 line box holds it with nothing clipped and no two lines overlapping. Arabic
   keeps `--lh-display`, because Alexandria's Arabic runs 1.34-1.37 em.
4. **Featured excerpt 20px / 1.22** — board cap 13.9 and a 24.4 line pitch, both now exact.
5. **The three gaps inside the panel measured ink to ink**: label -> title 10.2, title -> excerpt 20.4,
   excerpt -> `Read more` 13.3. In CSS that is 3 / 9 / 4, not 8 / 14 / 12, because Alexandria adds
   half-leading at both ends of every one of them.
6. **`align-items: stretch` on the panel.** The board draws the art flush with the text column, 17.1
   under the rule and 17.7 above it; the build centred it and left white above and below. The panel's
   padding went 18 -> 17 with it.
7. **Rows: date 14, title 20, excerpt 17/1.2, padding-block 13** — board caps 9.6, 13.9, 11.8 and a
   20.4 excerpt pitch. The rows are now tile-driven, the way the board's are.
8. **The row date is the board's shape**: `SEP 24, 2026`, 82.5 css on the board against 169 for
   `24 SEPTEMBER 2026`. Only the shape — the date printed is still the real one (§19.3).
9. **`Read more`**: the arrow 26px -> 15px (board 14.5), and the underline is now a border on the
   inline-flex box so it runs under the arrow the way the board draws it; `text-decoration` stopped at
   the text and skipped the gap and the SVG.

#### e. The board's own orange, and what it cost

`blog-B.png` uses **one** orange, `#FD5521`, for the fills and for every piece of orange text on it.
The site darkens text orange to `#E85319` (§14) because `#FF5F29` measures 3.03:1 on `#FEFEFE` and
does not clear even the large-text floor. **The board's own value measures 3.20:1**, and the eyebrow,
the `SEO` label and `Read more` all already carry §17.7b's 19px/700 large-text shape — so the board's
orange qualifies on all three. It is set on `.blog-page` only and **Lighthouse accessibility is 100
with it in place**, verified, not assumed. The rest of the site keeps `#E85319`.

#### f. What still differs from the board, and why

1. **Every line of text is 10-40% wider.** Alexandria is a wider face than the board's at a matched cap
   height (§19.1). At the same cap the H1 sets 903 against the board's 832, the `SEO` label 41 against
   36, and the row excerpts fill their column where the board's stop at about 69% of it. **Cap height is
   matched exactly; width is not matchable and is not chased.**
2. **The row excerpts run the full column.** The board's are 60-70 characters and the site's are 98-108
   — they are real descriptions of real articles, not the board's placeholder. Capping the measure to
   the board's would take every row to three lines and add ~20px to each, which is the opposite of the
   ask. **This is content being longer than the board's invention, not a spacing bug.**
3. **All five rows carry the same date**, because all six posts really are dated 2026-09-24. The board
   invented five spread dates (§19.3). Ahmad: `I want to be honest and no fake.`
4. **The container is 1320, not the board's 1344.** §5.1 locks 1320 for the whole site and the header
   and footer sit on it; widening the blog list alone would misalign its content against the logo and
   the nav on the same screen. The board's proportions are carried onto 1320 instead (§19.2).
5. **The featured panel is 291.0 against 287.1.** The board's `Read more` underline sits 3.1 below the
   art's bottom edge, inside the panel's padding; in the build the underline is part of the text
   column's height, so it pushes the panel instead of overlapping into the padding. 3.9px.
6. **`Read more` is 700 where the board's is lighter**, and the eyebrow's cap is 15.5 against 14.5
   because `--fs-eyebrow` is locked at 22. Both are §17.7b: at regular weight `#FD5521` needs 4.5:1 and
   has 3.20, so the weight is what keeps accessibility at 100.
7. **The Arabic page is 774.8 at a matched 1300 against the board's 735.** The board is English;
   Alexandria's Arabic is larger at the same px and the row excerpt keeps its 1.6 leading, which §9
   already provides for. The Arabic page is not a board mismatch, it is the Arabic scale.

#### g. Verification

| Gate | Result |
|---|---|
| Board over build at a matched 1300, both locales | looked at, four passes; **735 board / 741 build, ratio 1.009** on `/en/blog/` |
| Cap heights, board vs build raster, ten elements | H1, `SEO`, featured title, featured excerpt, row excerpt exact; date, row title, eyebrow within 1.0 css |
| `shots.mjs`, 24 routes x 1440x900 and 390x844 | `broken=0`, `errors=0`, `overflow=false` on every row |
| `scripts/seo-audit.mjs` | **0 high** |
| Lighthouse, `/blog/`, `/en/blog/` and a post page | accessibility **100**, performance **100**, best practices **100**, SEO **100**, CLS **0.000** on all three |

Lighthouse SEO was **92** on `/en/blog/` before this pass and it was not the orange: `Read more` on its
own is not a descriptive link name. The visible words stay the board's and a `.vh` span carries the
article's title into the accessible name, which takes it to 100 and leaves accessibility at 100.

**Nothing in this pass was committed, pushed or deployed.**

---

## 20. §7's plate becomes the client's logo, 2026-09-25. The four empty cards are gone

Ahmad, looking at the built slideshow: `The client slideshow, many boxes are empty. I think since the
website lacks images, we should scratch the graph idea and just put images. If you can extract good
images for each project and put them there. Or their logos. Actually, would be better. Yeah, their
logos.`

**He is describing a real defect, not a preference.** `workPlate()` drew the site's own monthly click
series and needed at least three complete months to draw a line. betikcleaner, anharpest, alghadeerclean
and ragwaclean have **one** complete month each and movingcompanykw has no honest window at all
(`copy.md` §7 card 11), so five of the eleven cards rendered a bare dashed slot with nothing in it —
and on a three-across slideshow that is most of a screen of empty boxes. Every client has a logo, so a
logo fills every card. **Only the plate changed.** The site name, every growth percentage, every
`مشروع جديد` / `New project` tag, the source line, the carousel and its whole accessibility contract are
untouched.

### 20.1 Where every logo came from

Fetched from each client's own live site on 2026-09-25 and kept byte-for-byte at
`design/client-logos/<domain>.<ext>`. Preference order: header logo image → inline SVG logo → `og:image`
→ favicon / apple-touch-icon; and between two versions of the same mark, the higher resolution one and
the one drawn for a **light** surface. **Nothing is invented, redrawn or recoloured** — the only
operations are crop, scale and, for one light-on-dark lockup, compositing on that site's own background
colour. `copy.md`'s section 7 logo table is the client-facing version of this list.

| # | Site | Source asset | Native | Why this one |
|---|---|---|---|---|
| 1 | q8carwash.com | `/images/logo-badge.webp` | 332x274 opaque | The header brand is **type only** (`Posefore` + `Wash & Polish` in CSS). This badge is the site's own `LocalBusiness` → `image` in its JSON-LD. No favicon, no apple-touch-icon on the site |
| 2 | mashame3.com | `/favicon.svg` | vector | The header brand is **type only** (`<h1>مؤسسة المشامع</h1>`) and the `og:image` is a photo of a technician. The favicon is a real mark — a white snowflake on the brand blue — and it is vector, so resolution is free |
| 3 | kuwaityclean.com | `/images/icons/brand-logo-colorful.webp` | 439x136 alpha | The header logo, used as the favicon too |
| 4 | kwcarwash.com | `/images/optimized/logo.webp` | 400x400 opaque | The header brand is an inline icon plus type; this is the site's favicon and its only logo file. `og:image` is a car-interior photo |
| 5 | kwtclean.com | `/images/logo.png` | 200x188 alpha | The header logo. PNG over the site's own WebP of the same mark: identical pixels, lossless source |
| 6 | carwashkw.com | `/images/logo.webp` | 1563x1563 opaque | The header logo, `alt="Master Wash Logo"`, and the site's favicon and `og:image` |
| 7 | betikcleaner.com | `/assets/brand/betik-cleaner-primary-rtl.svg` | vector | The header logo, the full lockup, drawn dark-on-light |
| 8 | anharpest.com | `/assets/logo/logo-ar.svg` | vector | The header logo. See 20.3 — it is a light-on-dark lockup |
| 9 | alghadeerclean.com | `/icon-512.png` | 512x512 alpha | The header logo `/images/logo-mark.webp` is the same mark at **166x165**, which the plate would have had to upscale ~1.8x. This is the identical mark at 512 from the site's own `site.webmanifest` |
| 10 | ragwaclean.com | `/assets/images/brand/ragwa-mark.svg` | vector | The header logo |
| 11 | movingcompanykw.com | **none — see 20.4** | — | The one client of the eleven that ships no logo file at all |

### 20.2 The derivation, and why it is equal AREA and not a bounding box fit

One uniform output per client: `src/img/logo-<slug>.webp`, **640x334 transparent**, which is the plate's
270:155 at roughly 2x the rendered slot. Every `<img>` therefore carries the **same** explicit
`width="640" height="334"`, so eleven different logos cannot move the layout.

1. **Rasterise big.** SVG sources are rendered at ~1400px wide by raising sharp's `density`, never by
   upscaling a small raster. No raster source is ever enlarged before step 4.
2. **Take off the dead margin.** A transparent source is trimmed on alpha. An **opaque** source is
   trimmed against its own corner colour and re-padded by 7% in that same colour, so it keeps its own
   ground and only the padding goes. Where the ground already runs to the edge the trim finds nothing.
3. **Scale by equal optical area**, `k = sqrt(0.44 x 640 x 334 / inkArea)`, clamped to 614x307 (96% and
   92% of the canvas). **This is the step that makes eleven logos read as one set.** A plain
   `min(W/w, H/h)` fit — the obvious implementation — sizes by bounding box, so a square mark comes out
   at 307px tall next to a 3.4:1 wordmark at 167px tall and reads as roughly twice the logo. Equal area
   puts a square at ~307 and a wide wordmark at ~565 wide, which is what the eye reads as the same size.
4. **Centre on the shared canvas** and encode WebP `quality 86, alphaQuality 100, effort 6`. q92 cost
   168 kB for the set against 144 kB at q86 with no visible difference on the two heaviest files, both
   of which are flat-colour art.

| # | Site | Ink box after step 2 | Ratio | Placed in the 640x334 canvas | kB |
|---|---|---|---|---|---|
| 1 | q8carwash.com | 332x274 | 1.21 | 338x279 | 13.5 |
| 2 | mashame3.com | 1067x1067 | 1.00 | 307x307 | 7.7 |
| 3 | kuwaityclean.com | 394x124 | 3.18 | 547x172 | 25.3 |
| 4 | kwcarwash.com | 360x213 | 1.69 | 399x236 | 11.7 |
| 5 | kwtclean.com | 200x188 | 1.06 | 316x297 | 28.0 |
| 6 | carwashkw.com | 1563x1128 | 1.39 | 361x261 | 9.9 |
| 7 | betikcleaner.com | 1237x365 | 3.39 | 565x167 | 17.5 |
| 8 | anharpest.com | 1377x544 | 2.53 | 488x193 | 6.2 |
| 9 | alghadeerclean.com | 369x367 | 1.01 | 308x306 | 5.4 |
| 10 | ragwaclean.com | 1161x1115 | 1.04 | 313x301 | 11.3 |
| 11 | movingcompanykw.com | 2232x667 | 3.35 | 561x168 | 7.0 |

**Total 143.6 kB for eleven logos.** Only two are enlarged at all: kwtclean 1.58x from a 200px source and
kuwaityclean 1.24x from 439px. Both are flat vector-style art and hold up; neither client ships anything
larger (checked: no `@2x`, no SVG, no manifest, no larger favicon).

### 20.3 The two logos that could not simply be dropped on a light plate

* **anharpest.com is a dark site.** Its header sits on `hsl(154 22% 5% / .82)` over `--color-ground:
  #0D1512`, and `logo-ar.svg` is drawn for it: the word `انهار` and the check ring are **`#EAF2EC`**, a
  near-white. On a light plate the wordmark all but disappears and only the green sub-line survives —
  measured by rendering it on white, grey and near-black. The mark-only `favicon-256.png` would have
  read, but it drops the wordmark, so the client becomes unidentifiable. **The lockup is composited on
  `#0D1512`, the site's own ground token, with a 19% margin.** That is the logo exactly as anharpest.com
  itself displays it. Recolouring the ring to work on white would have been redrawing the mark, which is
  out.
* **kwcarwash.com's mark is white with a thin teal outline** on the brand's pale mint field, and the
  mark occupied only 316x169 of a 400x400 tile. At the plate size the outline vanished and the tile read
  as an empty mint square. Step 2's crop takes the dead mint off — the mark now fills the frame and the
  script is legible. The mint is the client's own ground colour and is untouched; this is a crop, not an
  edit. It is still the lowest-contrast logo of the eleven, because the client's logo is low contrast.

### 20.4 movingcompanykw.com has no logo, and what it got instead

Checked and empty: no header or footer logo image, no inline SVG lockup (the nav carries a **generic**
truck glyph, not a brand mark), no `favicon.ico`, no `favicon.svg`, no `apple-touch-icon`, no
`site.webmanifest`, no `/images/logo.*`. Its `og:image` is a photograph of a removal job. Its brand, on
the site, **is type**:

```html
<a href="/" class="nav-logo">
  <span class="nav-logo-name">شركة منيف للنقل</span>
  <span class="nav-logo-sub">Muneef Transport · Kuwait</span>
</a>
```

So the card carries **that wordmark, reproduced**: `Noto Kufi Arabic` 800 `#ffffff` over `Outfit` 600
`#c8962c`, on `#0b1929`. Every one of those values — both strings, both typefaces, all three colours —
is read straight out of `movingcompanykw.com/styles.css` (`--font-ar-display`, `--font-en`, `--white`,
`--gold`, `--navy`). Rendered in Chrome at 2x with both fonts confirmed loaded
(`document.fonts.check` true for each), then cropped and scaled like every other logo. **This is a
reproduction of what the site already shows, not a designed mark**, and it is the only card where the
plate is not a client-supplied file. If the client ever ships a real logo, drop it into
`design/client-logos/movingcompanykw.com.*` and re-derive.

### 20.5 The plate, and why it is white and not the board's grey

```css
.work-plate {
  background: var(--bg-panel);              /* #FFFFFF */
  border: 1px solid var(--hairline-light);  /* #D2D7DD */
  width: 100%; aspect-ratio: 270 / 155;
  display: grid; place-items: center;
  padding: clamp(8px, calc(14/14.4 * 1vw), 16px);
}
.work-plate img { width: 100%; height: 100%; object-fit: contain; }
```

`.work-plate:empty` and `.work-plate svg` are **deleted** with the chart, and so is `workPlate()`'s
generator in `src/render.mjs`. **§6 was a separate renderer and nothing in this pass went near it.**

**The board draws this plate grey, and grey was tried and rejected.** `s7.png` fills the plate with
`#F2F3F5`. Three of the eleven logos carry their own ground — and q8carwash's badge is on **pure white**
(corners measured `255,255,255`, 57% of the file near-white), so on a grey plate it renders as a white
rectangle floating inside a grey one. Screenshotted both ways at 1440 and the grey version is exactly
the jumble this pass exists to remove. White plus the site's own hairline is also the surface language
every other panel on the page already uses (`.card-light`, `.faq-item`), so nothing new was introduced.
Measured at 1440: plate **366x210**, image **336x180**. At 390: plate **244x140** in a 294px card.

**This is now a recorded, deliberate board/build difference, like the offer boards in §18.5.3.** Running
`compare.mjs` will show `s7.png` drawing four chart cards for `Sunrise Dental`, `Lakeview HVAC`,
`Pinecrest Plumbing` and `Maple Ridge Roofing` with figures to match. Those are model-invented clients
and model-invented numbers (§13.2), the build has shipped eleven real clients since §15.5, and the plate
is now a logo. **Do not "fix" §7 back towards its board.**

### 20.6 The one rule this pass deliberately breaks: the logos are NOT lazy

§7's image rule is "all below-the-fold images: WebP, `loading="lazy"`, explicit width/height". These
eleven are the exception, and it was measured before it was decided.

Eight of the eleven cards are clipped sideways by the carousel, so `loading="lazy"` only fetches a card's
logo as that card slides in. Measured with `loading="lazy"`, `/en/` at 1440, §7 scrolled into view and
then left alone:

| | logos loaded, t = 0 … 12s |
|---|---|
| `loading="lazy"` | `0 5 5 5 5 6 6 6 6 7 7 7 7` of 11 |
| shipped (no lazy) | `11 11 11 11 11 11 11 11 11 11 11 11 11` of 11 |

With lazy, `shots.mjs` reported **broken=6** at 1440 and **broken=8** at 390 in both locales — every
unloaded plate. A card that auto-advances into view with no logo in it is precisely the empty box this
pass exists to remove, so the attribute is off and `fetchpriority="low"` is on instead: the 144 kB
queues behind the hero and costs nothing above the fold. **Lighthouse performance did not move** (20.8).

The price is one **low** finding in `scripts/seo-audit.mjs`: `more than 4 images not lazy loaded`, `/`
and `/en/`, 11 each. It cannot be avoided with eleven cards and a threshold of four, and the audit is a
shared skill tool that is not edited from inside a client (§16.12). Accepted knowingly.

`alt=""` on every logo: the card prints the client's domain as real text immediately under the plate, so
an alt would read the same name twice to a screen reader.

### 20.7 The slideshow is unchanged, and was re-measured to prove it

Nothing in `src/app.js` was touched. §18.2's exact condition was reproduced — cursor parked at 720,450
and §7 scrolled under it, then nothing touched for twelve seconds, `/` and `/en/` at 1440x900:

| | scrollLeft at 0..12s |
|---|---|
| `/en/` | `0 0 0 0 0 448 448 448 448 896 896 896 896` |
| `/` (RTL) | `0 0 0 0 0 -448 -448 -448 -448 -896 -896 -896 -896` |

RTL still advances negative, which is Chrome's convention and what `sign` in `app.js` is for.
`prefers-reduced-motion: reduce` emulated: scrollLeft **0** after 10 seconds untouched, both locales.
Keyboard on the focused track: `0 → ArrowRight 448 → next button 896 → prev button 448`. A real
`mousemove` onto the cards holds it at `448` for 9 seconds. Focusable nodes in `#work`: **14** — the
track, eleven card links and two buttons. **CLS 0.0000** measured live during auto-advance in both
locales.

### 20.8 Verification

**All eleven cards were looked at**, at their real 424px card width, in both locales — the track
unwrapped so all eleven are on screen at once rather than judging the three the slider happens to show.
Every logo is present, legible, correctly proportioned and optically centred; no plate is empty and none
is visibly cropped. Arabic is identical and no logo is mirrored by `dir="rtl"`.

**`shots.mjs`** (copied to scratch, `BASE=http://localhost:8823`), both locales at 1440x900 and 390x844:
`broken=0`, `errors=0`, `overflow=false`, 8 sections on every row. Heights `ar` 8127 / `en` 8602 at 1440
and 10895 / 11102 at 390.

**`compare.mjs`** (copied to scratch): runs clean, `MISSING selectors: 0`. The `work` pair differs from
`s7.png` by design — see 20.5.

**`node scripts/seo-audit.mjs`: 0 high** (18 medium, 9 low). The only finding this pass added is the one
low in 20.6.

**Lighthouse**, three runs per configuration, medians:

| Page | Preset | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile | **99** | **100** | 100 | 100 | 1727ms | 94ms | **0.000** |
| `/` | desktop | **100** | **100** | 100 | 100 | 404ms | 0ms | **0.000** |
| `/en/` | mobile | **100** | **100** | 100 | 100 | 1654ms | 43ms | **0.000** |
| `/en/` | desktop | **100** | **100** | 100 | 100 | 404ms | 0ms | **0.000** |

**Nothing in this pass was committed, pushed or deployed.**

---

## 21. Ahmad's third revision pass, 2026-09-25. Three fixes: §3's missing question mark, the §6 sparkline, and the offer's "what we do" line

Three precise fixes, run alongside two other agents working on the blog pages and §7's client logos — none
of that is touched here. Verified with `compare.mjs` and `shots.mjs` copied into a scratch folder (imports
do not resolve inside the client repo; `puppeteer-core` and `sharp` live in scratch only), `node
scripts/seo-audit.mjs`, and a Lighthouse sweep. Nothing here is committed, pushed or deployed.

### 21.1 §3's headline was missing the question mark its own hero pairs it with

The hero H1 ends in `؟` (`تبي عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي؟`, §15.6) and §18.1 rewrote §3's
headline to be its pair — the same rhetorical question, asked once as the hook and once as the stated
problem. It shipped without the mark, so the pair did not read as intended.

| | Arabic | English |
|---|---|---|
| Was | ملفك على جوجل يعمل وما عندك موقع إلكتروني | Your Google profile works. You have no website. |
| Now | ملفك على جوجل يعمل وما عندك موقع إلكتروني**؟** | Your Google profile works. You have no website**?** |

The English keeps its existing internal period (`works.`) and only the closing mark changes from nothing to
`?` — matching what the fix asked for exactly, not a rewrite of the sentence. The orange highlight stays on
the same phrase (`وما عندك موقع إلكتروني؟` / `no website?`); the highlight block is `background-size: 100%
1em` (§4), a percentage of the inline box, so it resizes to the one extra character with no CSS change.
Measured after, both locales still wrap at exactly two lines at every required width, and the highlight
still sits on the same 78%-down band it always has.

### 21.2 The §6 sparkline is gone

Ahmad: `there is this orange graph under the three images. If we can remove that, that would be perfect
because it looks ugly.`

`sparkline()` (`src/render.mjs`) and its call site inside `journey()` are deleted, along with the `.spark`
CSS rule. The three illustrations, the month labels, the titles, the figures, the precision note, the
baseline paragraph and the source caption are untouched, as instructed.

**Closing the gap it left.** Removing the sparkline also removed the 72px block that used to sit between
the card grid and the notes below it (a 33px gap, then 39px of svg); `.journey-notes`'s own
`margin-block-start: 56px` was left as-is, so the cards now step straight into that 56px gap instead of
through the sparkline. Measured at 1440, en/ar identical:

| | Before (§8, with sparkline) | After |
|---|---|---|
| Card grid bottom → sparkline/notes | 33 + 39 (svg) + 56 = **128px** | **56px** |
| `.journey-notes` → `.journey-foot` | 28px | 28px (unchanged) |
| `#journey` padding-block-end | 72px (`--pad-sec`) | **96px** (`--pad-sec` + 24px, `#journey`-only) |

The section itself got shorter — that is the point of deleting a 72px element — but a section that only
closed the internal gap and left the shared 72px `--pad-sec` at the bottom read top-heavy against the
approved board's proportions once the sparkline's own visual weight at the base of the band was gone.
`#journey` alone now takes `padding-block-end: calc(var(--pad-sec) + 24px)` (96px at 1440/1920, scaling
with `--pad-sec` at every breakpoint since it is `calc`, not a fixed override) so the band still closes with
comparable weight to before, rather than ending on the shared, unmodified 72px every other section uses.
Checked by eye against `journey-D.png` at 1440 and 390, both locales (see §21.4) — the cards, the notes and
the WhatsApp close read as one balanced band, not a hole where the graphic used to be.

**This is a deliberate, approved divergence from `journey-D.png`**, which draws a sparkline under its three
cards. `compare.mjs`'s §8 sparkline geometry row is marked removed, not deleted, in §8 above, so a future
pass comparing the build to that board does not "restore" it.

### 21.3 The offer's "what we do" line led with mechanics, not the benefit

Ahmad: `one thing I don't like in the paragraph is what we do, which is we build website, then we write its
pages. It sounds very basic and stupid. Let's just talk bring the benefit immediately. We get your business
found in Google and AI. Because that will make the paragraph way shorter and easier to read.`

B1's subhead (offer hero) had four sentences: who the offer is for, the six months/no fee, the "what we do"
clause, and "No commitment." Only the third sentence changed:

| | Arabic | English |
|---|---|---|
| Was (26 / ~34 words) | نبني موقعك ونكتب صفحاته، ليجدك العميل الذي يبحث عن خدمتك في جوجل وفي إجابات الذكاء الاصطناعي فيتصل بك، وتتحول هذه المكالمات إلى عملاء وإلى إيرادات لنشاطك. | We build your website and write every page, so the customer searching for your service discovers you on Google and in AI answers and calls you, and those calls become clients and revenue. |
| Now (15 / 17 words) | نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي، فتتحول هذه الزيارات إلى مكالمات وعملاء لنشاطك. | We get your business found on Google and in AI, turning those visits into calls and customers. |

The benefit leads, the build-it/write-it mechanics are dropped (already told in B2's included list, so
nothing is lost, only not repeated here), and each language is roughly half its former length — Ahmad's own
words, "We get your business found in Google and AI," are close to verbatim in the English. The Arabic
reuses `نجعل عملاءك يجدونك`, the exact construction the hero H1 and §4 block B's title already use, so the
voice stays consistent instead of inventing a new one. The opening sentence (`هذا العرض مخصص لشركات الخدمات
في السعودية` / `This offer is for service companies in Saudi Arabia`, the eligibility condition §18.3 added)
and the closing `دون التزام.` / `No commitment.` are untouched — neither was Ahmad's complaint and both
carry required information. No dashes, no emojis, no figures, no prices, and `rank`/`ترتيب`/`يتصدر` do not
appear, per the standing rules.

**The same fix also solved the phone strip's fourth row, §18.6's open item.** §18.3 changed the homepage
offer-strip line to `ستة أشهر مجانية لشركات الخدمات` / `Six months free for service companies` to carry the
same eligibility qualifier, and §18.6 measured that this pushed the strip from three rows to four at 390px
because the English line could no longer share row 1 with the pill (pill + line = 410px against a 350px
inner box, 60px over). Shortened to `ستة أشهر مجانًا لشركات خدمية` / `6 months free, service firms` — same
qualifier, fewer pixels (`شركات خدمية`, "service firms/companies" as an adjective phrase, is shorter than
the genitive `شركات الخدمات`; `مجانًا` swaps the adjective `مجانية` for the equally standard adverb; English
swaps `companies` for `firms` and `Six` for the numeral `6`, which the strip already uses for the spots
count). Measured at 390, both locales single-row-safe with margin to spare:

| | Pill + line width | Inner box | Margin | Rows |
|---|---|---|---|---|
| Arabic, before (§18.6) | 358px | 350px | over by 8px | 4 |
| Arabic, now | 203px | 350px | **147px** | **3** |
| English, before (§18.6) | 410px | 350px | over by 60px | 4 |
| English, now | 197px | 350px | **153px** | **3** |

The homepage strip is back to the three rows §15.3/§18.3 intended, in both locales, with no meaning lost —
`copy.md` §2 has the line and the rationale.

### 21.4 Verification run

Scripts copied into a scratch folder and run from there — imports do not resolve inside the client repo,
`puppeteer-core` and `sharp` live in scratch only. Real Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`.

Two other agents were mid-edit on `build.mjs`, `src/render.mjs` and `content/blog/` for the whole of this
pass (the blog rebuild and §7's client-logo swap), so the live repo's build broke and un-broke several times
while this work was going on — never from anything touched here. Rather than block on someone else's WIP or
touch files outside this scope, verification ran against an isolated scratch copy of the repo (`src/`,
`content/`, `build.mjs`, `brand/`) with a throwaway, scratch-only patch to `blogList()` to unblock that one
build (their `build.mjs` was already calling it with a new `{featured, rows}` shape their own `render.mjs`
didn't accept yet) — never applied to the live repo. Once both other agents finished, `node build.mjs` in
the live repo succeeded on its own (82 files) with no changes needed here, confirming the live site now
carries this pass plus theirs together.

**`compare.mjs`, homepage pairs, both locales at 1440:** `problem` and `journey` checked by eye against
`s3.png` and `journey-D.png` — headline pair reads as intended with the `؟`, highlight block sizes correctly
to the longer string, no sparkline, spacing reads as one balanced band. `MISSING selectors: 0` across all 24
board pairs (home, blog list, offer x2 locales) — no section was renamed or broken.

**First screen balance — header + hero + strip, next section at the fold, all six combinations:**

| Viewport | Locale | Header | Hero | Strip | Hero+Strip | `#problem` top | Match viewport |
|---|---|---|---|---|---|---|---|
| 1440x900 | en / ar | 112 | 822 | 78 | 900 | 900 | yes / yes |
| 1920x1200 | en / ar | 112 | 1121 | 79 | 1200 | 1200 | yes / yes |
| 390x844 | en / ar | 72 | 726.8 | 117.2 | 844 | 844 | yes / yes |

Hero internal scroll is 0 on all six. The 390 strip height (117.2px) is back to §15.1's original three-row
figure, not §18.6's 142px four-row figure — confirming §21.3's fix.

**`shots.mjs`, `ar`/`en`/`offer-ar`/`offer-en` at 1440x900 and 390x844 — 8 rows:** `broken=0`, `errors=0`,
`overflow=false` on every row, at every width.

**`node scripts/seo-audit.mjs`: 0 high.** (23 medium, 7 low — both counts differ from §18.7's 17/11 only
because the blog agent's content swap changed page count and word counts on blog pages; nothing counted here
touches §3, §6 or the offer page.)

**Lighthouse, `/`, `/en/`, `/offer/`, `/en/offer/`, mobile and desktop:** accessibility **100** on all 8,
performance **99** mobile / **100** desktop on all 4 pages, CLS **0.000** on all 8.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

## 22. §7 gets a new metric and an endless loop, 2026-09-25. Plus seven regenerated logos

Two changes Ahmad asked for in one pass, both inside §7, plus a logo swap folded in while the section was
open. Nothing outside §7 was touched.

### 22.1 The growth percentage is replaced by total impressions

Ahmad: `my best performing is carwashkw and it shows 32% growth. What is this growth thing? It sounds very
weird. Mashame3 is 883% growth. We need a new metric... I think a good metric is total impressions.`

**This is a defect report, not a preference.** A growth percentage is measured off a base, so the base
decides the number:

| Site | Old figure | What the site actually is |
|---|---|---|
| carwashkw.com | `+32%`, **last on the wall** | 199 to 440 clicks a month for thirteen straight months. The steadiest, highest-volume site of the eleven |
| mashame3.com | `+883%`, second on the wall | Six months old, and the base was 12 clicks |
| q8carwash.com | `+900%`, first on the wall | 80 clicks in August 2026 against a peak of 193 in January 2026 — below its own best month |

The wall was ranked close to backwards, and "growth between two months" is a phrase a service-company
owner cannot check or act on. A total impression count has no base, cannot be moved by choosing one, and
is one plain number per site.

**The figure is the sum of every COMPLETE month in `design/proof-data.md`.** No total is typed: `WORK` in
`src/data.mjs` carries each site's real monthly impression rows and `render.mjs` adds them at build time
(`totalImpressions`), so a printed total cannot drift from its rows. Verified against `proof-data.md` row
by row before use:

| # | Site | Total | Months summed | Window |
|---|---|---|---|---|
| 1 | kuwaityclean.com | **245,600** | 13 | Aug 2025 – Aug 2026 |
| 2 | carwashkw.com | **207,855** | 13 | Aug 2025 – Aug 2026 |
| 3 | q8carwash.com | **112,623** | 13 | Aug 2025 – Aug 2026 |
| 4 | kwtclean.com | **87,708** | 5 | Apr 2026 – Aug 2026 |
| 5 | kwcarwash.com | **54,132** | 13 | Aug 2025 – Aug 2026 |
| 6 | movingcompanykw.com | **52,080** | 13 | Aug 2025 – Aug 2026 |
| 7 | mashame3.com | **32,434** | 6 | Mar 2026 – Aug 2026 |
| 8 | betikcleaner.com | `مشروع جديد` / `New project` | 1 | Aug 2026, 1,614 impressions |
| 9 | anharpest.com | `مشروع جديد` / `New project` | 1 | Aug 2026, 768 |
| 10 | alghadeerclean.com | `مشروع جديد` / `New project` | 1 | Aug 2026, 531 |
| 11 | ragwaclean.com | `مشروع جديد` / `New project` | 1 | Aug 2026, 160 |

**Sorted descending, which is the fix on its own**: carwashkw.com moves from eleventh to second.
September 2026 is partial for every property and is in no total. The four one-month sites keep the tag
rather than a number — 160 printed beside 245,600 undercuts the wall and says nothing true about the work.
**movingcompanykw.com stops being the odd card**: under a percentage it could carry neither figure nor tag
(its clicks fell 27 → 11 year on year and fourteen months of data ruled out `New project`), but a total is
not a window, so its real 52,080 goes on the card like everyone else's.

**The label says what an impression is, not what it is called.**

| | Arabic | English |
|---|---|---|
| Metric label | `مرة ظهر فيها في بحث Google` | `times shown in Google search` |
| On the card | `245,600 مرة ظهر فيها في بحث Google` | `245,600 times shown in Google search` |

The word "impression" renders nowhere on the site. Western digits with a comma group, matching §6's
`7 / 165 / 531`; `.work-metric .num` already carries `direction: ltr; unicode-bidi: isolate`, so the
number reads left to right inside the Arabic sentence with no extra wrapper. Measured at 1440: the metric
is **2 lines, 52px**, both locales.

The §7 subhead and the one source line under the section were rewritten with it — both described a
percentage computed between two months. The new source line states that the window is **per site**
(the sites are different ages) and that partial months are not counted. `copy.md` §7, its derivation table
(now one addition per card) and the "Numbers on the page" register are all updated; `llms.txt`'s note for
AI too.

### 22.2 The slideshow loops endlessly

Ahmad: `the slideshow needs to be infinite.`

**What it did before.** It did wrap, but by smooth-scrolling the whole track back. Measured at 1440,
cursor parked away from the section, sampling `scrollLeft` once a second:

```
/en/  0 0 0 0 448 448 448 448 ... 3136 3136 3136 3136 3584 3584 3584 3584 1516 0 0 0 291 448 ...
```

`3584 → 1516 → 0` is an eight-card rewind the reader watches go past. That is why it read as reaching the
end and stopping: the last card was the end of the line and everything after it was a retreat.

**What it does now — a treadmill, no library.** `src/app.js` clones the card set **once at runtime** and
appends it, so the track holds 22 cards for 11 clients. Advancing is always one step forward; at the seam
`scrollLeft` is reduced by exactly one set length with the CSS `scroll-behavior: smooth` suppressed for
that single assignment.

* **Why the jump is invisible.** At `pos = loopLen` the viewport shows clone 1, 2, 3, which are the same
  three cards as 1, 2, 3 at `pos = 0`. Subtracting one set length changes nothing on screen. Proved, not
  assumed — see 22.4.
* **Clones are `aria-hidden="true"` + `tabindex="-1"`**, so the eleven real cards stay the only eleven tab
  stops and the only eleven in the accessibility tree. Focusable nodes in `#work`: **14**, unchanged from
  §20.7.
* **Cloned in JS, not in the HTML.** The markup, the SEO audit's image count and the no-JS fallback all
  still see eleven cards. Same eleven image URLs, so the clones cost no extra bytes.
* **The `go()` fallback for an un-cloned track is kept** (one card, or a future layout with nothing to
  clone), which is the old `scrollTo` wrap.

**The one real bug this introduced, and it was caught by measuring.** A programmatic jump fires its own
`scrollend`, and that event is *not* a settled track: it arrived while the smooth scroll started on the
next line was still in flight, so the settle handler normalised a mid-animation position and cancelled the
move. Stepping **backwards** off the first card died exactly there — measured `0 → prev → 0` instead of
`0 → 4480`. A jump now marks its own `scrollend` to be ignored, with a 400ms timer dropping the mark in
case the assignment was a no-op and no event ever came. Re-measured after the fix: `0 → 4480`, both
locales. **Read the code and you would have shipped it.**

### 22.3 Seven regenerated client logos

Seven clean brand lockups, built from each client's real registered name, supplied at
`design/client-logos/v2-<domain>.png` (1024x1024, opaque, near-white ground). Swapped in for
**kwcarwash.com, carwashkw.com, alghadeerclean.com, ragwaclean.com, movingcompanykw.com, kwtclean.com and
anharpest.com**. The other four — q8carwash, mashame3, kuwaityclean, betikcleaner — are untouched and are
still the mark the client's own live site serves. The old seven sources and every `-sq` derivative stay on
disk; the build stops referencing them.

**Derived by §20.2's rules exactly**, so eleven logos still read as one set: trim the dead ground against
the source's own corner colour (tolerance 12), re-pad up to 7% in that colour but never more than was
trimmed off that side, scale by **equal optical area** `k = sqrt(0.44 x 640 x 334 / inkArea)` clamped to
614x307, centre on the shared **640x334** transparent canvas, WebP `quality 86, alphaQuality 100,
effort 6`. Same one canvas for all eleven, so the same explicit `width="640" height="334"` covers every
card and no logo can move the layout.

| Site | Ink box after trim | Ratio | Placed in 640x334 | kB |
|---|---|---|---|---|
| carwashkw.com | 1024x847 | 1.21 | 337x279 | 13.5 |
| kwtclean.com | 1024x889 | 1.15 | 329x286 | 9.4 |
| kwcarwash.com | 1024x913 | 1.12 | 325x290 | 12.6 |
| movingcompanykw.com | 1014x673 | 1.51 | 376x250 | 11.0 |
| anharpest.com | 1024x912 | 1.12 | 325x289 | 12.1 |
| alghadeerclean.com | 1024x879 | 1.16 | 331x284 | 9.6 |
| ragwaclean.com | 970x754 | 1.29 | 348x270 | 10.4 |

**Two of §20's special cases are retired by this.** §20.3 had to composite anharpest.com's light-on-dark
lockup on its site's own `#0D1512` ground, so it shipped as the one dark tile in the row; the regenerated
lockup is dark-on-white like the rest and the dark tile is gone. §20.4 reproduced movingcompanykw.com's
wordmark in the site's own typefaces because that client ships no logo file at all; it now carries a real
lockup, so nothing on the page is a reproduction any more. `copy.md`'s §7 logo table records which of the
eleven is which.

Everything else from §20 stands: white plate, `object-fit: contain`, `alt=""` (the card prints the domain
as text right underneath), and **not** `loading="lazy"` for the reason measured in §20.6.

### 22.4 Verification

**Scope cut deliberately.** This pass is a metric swap, a carousel loop and a logo swap, all inside §7.
The full `shots.mjs` route sweep, `compare.mjs` (§7 diverges from its board by design — §20.5) and
`seo-audit.mjs` (no link, metadata, structure or sitemap touched) were dropped as disproportionate. What
was kept is the two things that can actually be wrong: the numbers, and whether the loop loops.

**1. The numbers.** Every total recomputed from `proof-data.md`'s rows and matched against the table in
22.1. Order descending confirmed on the built page. The four one-month cards carry their tag and no
number. All eleven cards render with a logo, no plate empty, both locales, checked at 1440 with the track
unwrapped so all eleven are on screen at once.

**2. The loop.** Cursor parked at 20,20 — far from §7 and never moved — §7 scrolled into view, then left
alone for 105 seconds. `scrollLeft` once a second, 1440x900:

```
/en/   0 0 0 0 448 448 448 448 896 896 896 896 1344 ... 3584 3584 3584 3584 4032 4032 4032 4032
       4480 4480 4480 4480  0 0 0 0  448 448 448 448 ... 4480 4480 4480 4480  0 0 0  448 448 ...

/      0 0 0 0 -448 -448 -448 -448 -896 ... -4032 -4032 -4032 -4032 -4480 -4480 -4480 -4480
(RTL)   0 0 0 0 -448 ... -4480 -4480 -4480 -4480  0 0 0 -327 -448 ...
```

**Two complete laps in 105 seconds in both locales**, `0 → 4480 → 0 → 4480 → 0 → …`, with no rewind values
between `4480` and `0` — against the old `3584 → 1516 → 0`. RTL still advances negative, Chrome's
convention, which is what `sign` is for. Track geometry: 22 cards, step 448, `scrollWidth` 9832,
`clientWidth` 1320, `loopLen` 4928.

**Is the seam visible?** Two ways, both at 1440, both locales:
* The track screenshotted at `pos = 0` and at `pos = loopLen`, diffed: **0 differing subpixels of
  1,702,800** (`/en/`) and **0 of 1,718,640** (`/`).
* The live wrap caught in the act by polling at 40ms — `4924 → 4928 → 0` — and the frame taken immediately
  after the wrap diffed against `pos = 0`: **0 differing subpixels**, both locales.

The two frames either side of the jump are the same pixels, so there is nothing to see.

**3. Everything §18 and §20.7 already paid for, re-measured because `go()` changed.** Both locales:

| Behaviour | Result |
|---|---|
| `prefers-reduced-motion: reduce`, 11s untouched | `scrollLeft 0` — never auto-advances |
| Real `mousemove` over the cards, 10s | held at `0` for the full 10s |
| Pointer leaves | resumes, `448` / `-448` |
| Keyboard + buttons from 0 | `0 → 448 → 896 → 448 → 0 → 4480` (and the RTL mirror) — including the backward wrap off the first card |
| Focusable nodes in `#work` | **14** (track, 11 card links, 2 buttons) |
| Clones | 11, every one `aria-hidden="true"` and `tabindex="-1"` |
| Console / page errors | none, both locales |

**4. Lighthouse**, `/en/` desktop, one run on the final build:

| Perf | A11y | LCP | TBT | CLS |
|---|---|---|---|---|
| **100** | **100** | 404ms | 0ms | **0** |

Zero accessibility audit failures. CLS stays 0 with 11 runtime-appended cards because every plate has a
fixed `aspect-ratio` and every logo the same explicit `width`/`height`.

**Nothing in this pass was committed, pushed or deployed.**

## 23. The hero's bottom row becomes a credentials strip, 2026-09-25. Plus a new subhead and bigger CTAs

Ahmad's fourth revision pass, hero only. Nothing outside `#hero` is touched, so the verification is sized
to the change: the first-screen budget, screenshots looked at by eye, a structured-data grep and one
Lighthouse run. `compare.mjs`, `seo-audit.mjs` and the full `shots.mjs` sweep were deliberately skipped
(see 23.6). Nothing here is committed, pushed or deployed — **and the site is now live at q8block.com**,
so Ahmad reviews this on `localhost:8823` first.

### 23.1 The four trust points are gone, and one of them should never have been there

The row under the CTAs carried four short claims separated by thin orange rules (`ul.trust`, §5.3's
70px gap, `--rule-accent` between the items). All four and their rules are deleted.

Ahmad spotted the actual defect: point 4, `الاستضافة والنطاق والحماية علينا` /
`Hosting, domain and security included`, is **an offer deliverable sitting in the brand hero**. `copy.md`
§1 records exactly how it got there — the point used to read `بدون عقد` / `No contract`, that was pulled
because nobody had confirmed it was true outside the promotion, and Section 5's deliverable 6 was moved up
to fill the hole. Filling a brand-hero slot from the offer's deliverable list is the same category error
in the other direction, and it survived because the swap was recorded as "resolved".

The other three were not wrong, but they were four lines of text in the single most valuable block on the
site. Ahmad: `this is great real estate to put authority and trustability.`

### 23.2 What replaced it: a Google mark and a tools strip, one hairline between them

`credentials()` in `src/render.mjs`, `.cred` in `src/styles.css`. Two elements share the row.

**(a) The Google rating mark.** Five filled stars and the word `Google`, the whole thing an `<a>` to
Q8Block's own Google Business Profile, `target="_blank" rel="noopener"`.

| Decision | What shipped | Why |
|---|---|---|
| Review count | **not shown** | Ahmad has few reviews and does not want the number on the page |
| Review text | **not shown** | nothing quoted, paraphrased or scraped |
| Rating structured data | **never emitted** | see 23.3 — the one thing in this pass that could cost a penalty |
| Star colour | `--orange` `#FF5F29` | not a Google yellow. A mark drawn in the site's own accent reads as a brand credential; five gold stars in a box read as a copy of a Google widget |
| Star size | `clamp(14px, 18/14.4vw, 20px)` | small enough that the row stays a credential, not a banner |
| URL | `CONFIG.GBP_URL` in `src/data.mjs` | one line, commented, and the mark **does not render at all** when it is `null`, so the page can never link to the wrong profile |

`GBP_URL` is `https://share.google/JMWP620SaaXf2GqNL` — the share link Google generated for the profile,
Knowledge Graph `/g/11n3dddmb8`, `شركة كويت بلوك`, which is the registered Arabic name in `company.md`.
It is **Ahmad's own** profile: an earlier candidate link found in the repo turned out to belong to a
client, which is why it was held back until confirmed. The comment in `data.mjs` says in as many words not
to "improve" it into a `maps.google.com/?cid=` or `place_id` URL — nobody has his CID, and a constructed
link that resolves to the wrong business is far worse than a redirect.

**One accuracy note for Ahmad, who believes this link carries SEO weight.** A link from a site to its own
Google Business Profile is a weak signal at best. The direction that matters is the reverse: the website
field **on the profile** pointing at `q8block.com`. No copy on the page claims or implies an SEO benefit
from this link, and none should be added.

**(b) The tools strip.** `الأدوات التي نعمل بها` / `THE TOOLS WE WORK WITH`, and under it Semrush, Ahrefs,
Ubersuggest and Google Search Console in one muted ink.

**The label is not `partners` and never becomes `partners`.** Ahmad floated the word and agreed it out in
the same breath: these are **subscriptions**, not partnerships, and a false claim on a page whose whole
argument is that its numbers are checkable is not worth the word. No wording on this row may imply
endorsement, partnership, certification or a badge.

Layout: `.cred` is a centred flex row, `gap: clamp(26px, 50/14.4vw, 56px)`, with a single
`--hairline-light` rule as `border-inline-start` on `.cred-tools`. Below 990px the two halves stack and
the hairline turns horizontal. `margin-block-start` is **76px** against the trust row's 70 — the new row
is shorter, so the hero breathes more, which is what Ahmad asked for.

### 23.3 No rating schema. This is the rule, not a preference

This project's own lessons are: real written reviews only, never rating schema. Showing stars visually is
fine. Marking them up as a rating on a handful of reviews is what earns a manual action, and it would
contradict the one thing this site sells — that every figure on it can be checked.

So: no rating or review structured data of any kind anywhere in the build. Verified by grep over the whole
of `site/` after the final build, case-insensitively, for `aggregaterating`, `reviewcount`, `ratingvalue`,
`"review"` and `schema.org/Review`: **0 matches** (23.6).

**A comment in `src/styles.css` broke this check once and is worth remembering.** `build.mjs` inlines the
stylesheet into every page, so a CSS comment that merely *named* those schema properties to explain the
rule put the strings into all 82 built HTML files. The grep is run against the built output precisely
because it cannot be satisfied by reading the template. The comment is reworded; the rule is unchanged.

### 23.4 Where every tool logo came from, and the one muted treatment

Sources fetched 2026-09-25 from each vendor's own brand, press or product page and kept byte-for-byte at
`design/tool-logos/`. Nothing is redrawn, recoloured by hand or reconstructed.

| Tool | Source | Native | Why this one |
|---|---|---|---|
| Semrush | official press kit, `semrush.com/news/presskits/logo-pack/` → `prowly-prod.s3…/827723/large-31cf…png` | 960x480 | The current lockup, `SEMRUSH / An Adobe Company`. The press kit ships three background variants; this is the one drawn for a light surface |
| Ahrefs | media kit, `ahrefs.com/media-kit` → `/assets/esbuild/ahrefs-logo-blue-big-A7FHW2DZ.svg` | vector | The media kit's own logo asset, and it is vector, so resolution is free. Preferred over the kit's `primary-light` PNG (1020x640, same mark, raster) |
| Ubersuggest | product page, `neilpatel.com/ubersuggest/` → `…/images/ubersuggest-v3/ubersuggest-logo.svg` | vector | The product's own wordmark. The app's `icon.svg` is only the `U` tile and drops the name |
| Google Search Console | `search.google.com/search-console/about` → `gstatic.com/search-console/scfe/logo_search_console.svg` | vector (278x40) | Google's own product lockup, icon plus `Google Search Console`. The `search_console-128.png` product icon was rejected: the mark alone does not say which product it is |

All four were fetched cleanly, so nothing fell back to a typeset wordmark.

**The derivation** (`design/tool-logos/derive.mjs`, run from a scratch folder — `sharp` is not a repo
dependency). Four brand palettes — purple, blue-and-orange, orange, and Google's four colours — cannot sit
beside `#FF5F29` as themselves. They are a texture here, not a feature, so all four become one ink,
`#6E747E`, baked into the WebP rather than applied as a CSS `filter`:

1. Rasterise vectors at `density: 900`; never upscale a raster.
2. Semrush's press asset is black on an **opaque white plate**, so its alpha is rebuilt as `255 − luminance`
   — the plate goes, the mark stays exactly as drawn.
3. Semrush, Ahrefs and Ubersuggest are solid single-colour lettering, so each is reduced to its own
   coverage mask and filled with the one ink.
4. Search Console is **not** silhouetted: its icon carries internal structure, and a flat fill turns it
   into a blob. It is desaturated, then its ink mapped `[p10 … 255] → [tone … 255]` linearly, so the body
   of the mark lands on the same tone as the other three while the icon keeps its light and dark parts. A
   plain gain (the first attempt) blew the icon out to white.
5. Trim the dead margin, scale to **3x** the CSS box, encode WebP `q92 / alphaQuality 100 / effort 6`.

| Tool | Trimmed ink | Ratio | Intrinsic (3x) | CSS at 1440 | kB |
|---|---|---|---|---|---|
| Semrush | 534x129 | 4.14 | 273x66 | 91.0 x 22 | 12.5 |
| Ahrefs | 20250x5676 | 3.57 | 182x51 | 60.7 x 17 | 4.7 |
| Ubersuggest | 1875x300 | 6.25 | 281x45 | 93.7 x 15 | 8.8 |
| Google Search Console | 3349x392 | 8.54 | 410x48 | 136.7 x 16 | 10.0 |

**36 kB for the four.** Every `<img>` carries both intrinsic dimensions, so CLS stays 0 (verified, 23.6).
They are **not** lazy — they are inside the first viewport, and §20.6 already records why a
first-screen image must not be.

**The heights are per-logo on purpose, and this is the same argument as §20.2 in the other direction.**
§7's client logos share one canvas and are matched by equal optical **area**, because they sit on
identical plates. These four sit on nothing, in a line, so they are matched on how big the **lettering**
reads: a wordmark of four letters and a lockup of three words cannot share a height without one of them
being wrong. Each gets its own `clamp()`, and the floors are what make the row fit a phone (23.5).

### 23.5 More air, bigger CTAs, and what the phone cost

**The CTAs, hero only.** Ahmad: `a little bit bigger`, and `Call now` stays the orange fill with
`WhatsApp` outlined, as approved. One modest step, scoped to `#hero .btn-row` so §9's final-call band and
the offer page keep their board sizes:

| | Before | Now |
|---|---|---|
| Font size at 1440 | 23px (`--fs-btn`) | **25px** |
| `.btn-primary` padding | 14px 50px | **16px 56px** |
| `.btn-outline` padding | 12px 48px | **14px 54px** |
| `min-width` ≥768px | 240px | **262px** |

**The subhead.** Replaced with Ahmad's own line, verbatim, in `copy.md` §1. He chose it because NP
Digital's hero runs a single line and ours was a three-clause paragraph. `#hero .lead`'s measure had to go
with it: **790px → 1210px**, the narrowest value that sets both locales on **one** line at 1440 and 1920.
Below about 1330 it wraps to two, and on a phone it is 2 lines in Arabic and 3 in English — that is as far
as one line can be carried at 390px.

**At 390 the strip did not need the budget broken.** The four marks take their `clamp()` floors
(16/13/11/12px) and the row gap drops to 14px, which measures **325.8px inside a 350px inner box** — one
row, both locales, no wrap. `.cred` stacks (Google mark, hairline, label, logos) and the hero CTAs drop
back to `--fs-btn` with 15px/13px padding, because at 390 the buttons are already full-width and a bigger
type size there buys nothing but height. The phone hero is **unchanged at 726.8px**: the new row is
shorter than the four stacked trust points it replaced, and that paid for the taller buttons and the
3-line English subhead with room left over.

### 23.6 Verification

Scope cut to the change: this pass touches `#hero` only. `compare.mjs` (hero-C is compared as
header + hero + strip, and the row under the CTAs is a deliberate, Ahmad-instructed divergence from the
board — same status as §21.2's sparkline), `seo-audit.mjs` (no link, metadata, canonical, sitemap or page
count moved) and the full `shots.mjs` route sweep were all skipped as disproportionate.

**1. The first-screen budget, §15.1's hard constraint, all six combinations.** Real Chrome,
`deviceScaleFactor 1`, after `document.fonts.ready`:

| Viewport | Locale | Header | Hero | Strip | First screen | `#problem` top | Viewport | Hero internal scroll | Subhead lines |
|---|---|---|---|---|---|---|---|---|---|
| 1440x900 | en | 112 | 822 | 78 | **900** | **900** | 900 | 0 | **1** |
| 1440x900 | ar | 112 | 822 | 78 | **900** | **900** | 900 | 0 | **1** |
| 1920x1200 | en | 112 | 1121 | 79 | **1200** | **1200** | 1200 | 0 | **1** |
| 1920x1200 | ar | 112 | 1121 | 79 | **1200** | **1200** | 1200 | 0 | **1** |
| 390x844 | en | 72 | 726.8 | 117.2 | **844** | **844** | 844 | 0 | 3 |
| 390x844 | ar | 72 | 726.8 | 117.2 | **844** | **844** | 844 | 0 | 2 |

Every figure is identical to §21.4's, to the pixel, in all six rows: header + hero + strip is exactly one
viewport, the next section starts precisely at the fold, and the hero never scrolls inside itself.
`document.scrollWidth > innerWidth` is `false` on all six. The credentials row measures 48px tall at 1440,
51px at 1920 and 90px at 390, where it is stacked.

**2. Screenshots, looked at.** `fold-1440-{en,ar}.png`, `fold-390-{en,ar}.png` and tight crops of the row
itself, `deviceScaleFactor 2`. The strip reads as quiet credentials: four marks in one grey, all of a
similar lettering size, no colour fighting the orange, no logo soup. The Google mark reads as a mark —
five small orange stars and a word, no box, no number, no "5.0", nothing that looks like an embedded
rating widget. At 390 the four logos hold one row and the Semrush sub-line degrades to texture, which is
what it should be at that size.

**3. Structured data.** Grepped over the whole of `site/` after the final build, case-insensitively:
**0 matches**. It found 82 before the CSS comment described in 23.3 was reworded — which is exactly why
the check is run against the built output and not the template.

**4. Lighthouse**, `/en/` only, one run each on the final build:

| | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Desktop | **100** | **100** | 100 | 100 | 426ms | 0ms | **0.000** |
| Mobile | **99** | **100** | 100 | 100 | 1880ms | 60ms | **0.000** |

Zero accessibility audit failures. The `.cred-google` link's accessible name is
`Q8 block على Google` / `Q8 block on Google`, which contains its visible text, so
`label-content-name-mismatch` stays clean; the stars are `aria-hidden` decoration and each logo carries
its product name as `alt`. `--fs-cred-label` at `#686F79` on `#F2F3F5` is 4.57:1, clearing AA at 14px
without a weight floor.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

---

## 24. The tools strip is deleted and the Google mark becomes the whole row, 2026-09-25

Ahmad's fifth revision pass, same day as §23 and against §23's own output. Hero only, so the verification
is sized to the change exactly as §23's was: the first-screen budget, screenshots looked at by eye, a
structured-data grep and one Lighthouse run. `compare.mjs`, `seo-audit.mjs` and the full `shots.mjs` sweep
were deliberately skipped again. Nothing here is committed, pushed or deployed — the site is live at
q8block.com, so Ahmad reviews this on `localhost:8823` first.

### 24.1 The tools are out, and the reason is worth keeping

§23 filled the row under the CTAs with two things: a Google rating mark, and a strip of four SEO tool
logos (Semrush, Ahrefs, Ubersuggest, Google Search Console) under the label `الأدوات التي نعمل بها` /
`THE TOOLS WE WORK WITH`. Ahmad, hours later:

> `I told you we do not want to mention the tools that we are using... that's not trust.`

He is right, and §23.2 half-argued itself into it: the strip had to be defended in three sentences
against being read as partnership, endorsement or a badge, which is the tell that it was never a
credential in the first place. A subscription the reader can buy himself is not authority.

**What was removed.** `.cred-tools`, `.cred-label`, `.tool-row` and the four per-logo height rules out of
`src/styles.css`; the `TOOLS` array and the whole tools branch of `credentials()` out of `src/render.mjs`;
`toolsLabel` out of both locales in `src/data.mjs`; the `--fs-cred-label` token, which existed only for
that label; `.cred-solo`, which existed only for the case where the Google mark was absent and the tools
held the row alone; the `<990px` stacking rules and the `<768px` phone rules that existed only to pack two
halves into a phone row; and `src/img/tool-{semrush,ahrefs,ubersuggest,gsc}.webp`, the four build inputs.

**What was kept on disk.** `design/tool-logos/` — the four fetched sources and `derive.mjs` — is left
exactly where §23.4 put it. Nothing references it, nothing builds from it, and it is not served
(`netlify.toml` publishes `site/` only). It is the record of where those assets came from, in case a
different surface ever legitimately needs them.

**Verified by grep over the BUILT output**, not the templates, `site/` entire, case-insensitive:
`semrush`, `ahrefs`, `ubersuggest`, `tool-row`, `cred-tools`, `cred-label` → **0 files each**. On the two
homepages, `tool`, `partner` and `software` → **0 occurrences**.

**`Google Search Console` is still on the page three times and that is deliberate.** Twice in §6/§7 and
once in an FAQ answer, always as the **source of a figure** (`All figures from Google Search Console:
every complete month...`). That is provenance, not a tool being advertised; it predates §23 by a day
(§15.5) and `copy.md` rule 2 — every figure is checkable — leans on it. Removing it is a separate
decision for Ahmad and it costs the checkability argument.

### 24.2 The CSS-comment leak happened again, in this pass, and the same grep caught it

§23.3 records that a comment in `src/styles.css` naming schema properties leaked into all 82 built pages,
because `build.mjs` inlines the stylesheet. The first draft of this pass wrote the full reasoning —
including the words "tool logos" and Ahmad's quote about tools — into the `.cred` comment block, and the
built-output grep came back with **4 occurrences of `tool` and 25 files containing `fs-cred-label`** on a
change whose entire point was that the word should be gone.

The fix is not "be careful with comments". `src/styles.css` now carries a standing instruction at the top
of the `.cred` block: this file is shipped text, the reasoning lives in `src/render.mjs` and in this file,
and **no vendor, product or property name is written in the stylesheet at all**. `render.mjs` and
`data.mjs` are build-time modules and are never served, so that is where the long comments belong.

### 24.3 The mark: centred, bigger, and the wordmark is an image on purpose

Ahmad: `Google Rating, centre and bigger`, and `add the colours for each letter of the Google so it
matches the Google company, since black is just boring.`

`.cred` is now a single centred flex row holding one `<a class="cred-google">`: five filled stars and the
wordmark, nothing else. No count, no `5.0`, no review text, no box, no border, no plate.

| | §23 | §24 | at 1440 |
|---|---|---|---|
| Stars box height | `clamp(14, 18/14.4vw, 20)` | **`clamp(20, 26/14.4vw, 29)`** | 18 → **26px** |
| `Google` | live text, `--fs-trust` 600, `--ink` | **Google's own SVG as `<img>`**, `clamp(23, 30/14.4vw, 33)` | cap 13.4 → **22.3px** |
| Gap | 12px fixed | `clamp(12, 16/14.4vw, 18)` | 12 → **16px** |
| The row | mark + hairline + label + 4 logos, **48px** tall | **the mark alone, 36px tall** | 255.8px wide |
| `margin-block-start` | 76px | **78px** | |

That is 1.44x on the stars and 1.66x on the wordmark's cap height, and the whole mark is 255.8px wide
against roughly 184px before. It is still far below the CTA row's weight: two buttons of 262px minimum
each, one an orange fill and one a 2px outline, against 255.8px of 26px stars. It does not compete.

**Why the wordmark is an image and must stay one.** Per-letter colours as live text would put Google's
yellow `#FBBC05` on the hero's `#F5F6F7`: **1.79:1**, which fails WCAG AA at any size, including the
large-text threshold, and would take accessibility off 100 the moment it shipped. WCAG 1.4.3 exempts
images, and specifically exempts logotypes, so an image is the only construction that gets Ahmad the
brand colours **and** keeps the score. There is no CSS trick that recovers this: darkening the yellow
until it passes stops it being Google's yellow, which was the whole request.

**Where the asset came from.**
`https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg` — Google's own
branding directory on `gstatic.com`, the SVG counterpart of the `googlelogo_color_*dp.png` rasters listed
on Google's brand resource centre. Fetched 2026-09-25, 1660 bytes, `viewBox="0 0 74 24"`, sha256
`99bf4aa4…67a03e52`. Kept byte-for-byte at `design/brand-marks/google-wordmark.svg` with `SOURCES.md`
beside it. **Nothing is redrawn**: a hand-traced approximation of a trademark is both less accurate and
worse practice, and §23.4's rule — fetch the owner's own asset or do not ship it — applies to Google
exactly as it applied to the four tools.

`design/brand-marks/derive.mjs` copies it into `src/img/`. A vector needs no rasterising, so the
derivation is a **guarded** copy: it re-checks the sha256, the viewBox and the presence of all four brand
colours before writing, and prepends a provenance comment into the shipped SVG. If Google changes the
asset under that URL the script fails loudly instead of silently shipping something else. No `sharp`, no
dependencies — it runs with plain `node`.

The `<img>` carries `width="74" height="24"`, its own viewBox, so the mark cannot shift the first screen
as it decodes. It is **not** lazy: §20.6 already records why a first-viewport image must not be. 1881
bytes on the wire, against the 36 kB of WebP the four tool logos cost — the row got bigger and ~34 kB
lighter.

### 24.4 The stars are Google's gold, not the brand orange. Both were built and looked at

§23 argued for `--orange` on the grounds that a mark in the site's own accent cannot be mistaken for a
scraped Google widget. That argument was made when the word beside the stars was **black text**. With the
wordmark now in Google's four colours it no longer holds, so both were rendered at `deviceScaleFactor 3`
and compared side by side (`stars-gold.png`, `stars-orange.png`):

* **Orange `#FF5F29`** puts a fifth hue directly between the wordmark's own red `#EA4335` and yellow
  `#FBBC05`. Orange sits between those two on the wheel without matching either, so the five stars and
  the first three letters read as a colour mistake rather than as a set. It also spends the page's
  **action** colour — the CTA fill and the headline highlight bar are the only other orange on the first
  screen — on a decorative mark sitting directly beneath the CTAs, which is the one thing this row must
  not do.
* **Google's star gold `#FBBC04`** ties the stars to the `o` two glyphs away. The mark resolves into one
  object instead of two, and the orange above it stays the only orange, so the CTAs keep their monopoly
  on the page's action colour.

Gold shipped. Contrast is not a question for either: the stars are `aria-hidden` decoration, not text,
and the meaning is carried by the link's accessible name (24.5).

**The optical nudge on the wordmark is measured, not eyeballed.** Google's SVG is tight-cropped, so the
descender of `g` is inside the box: rasterised at 20x in Chrome and scanned row by row, the cap top is at
**0.0** units, the baseline (bottom of the final `e`) at **17.85** and the descender bottom at **23.0**,
in a 24-unit box. The cap band's centre is therefore 8.93 units — **3.84px above the box's geometric
centre** at a 30px render — so `align-items: center` alone leaves the word riding high against the stars.
`.cred-word { margin-block-start: 6px }` drops it back: star ink centre lands 17.46px from the row top,
cap-band centre 17.16px. **0.3px apart.** The stars' own ink runs y 2 → 21 of their 24-unit viewBox,
which is where the other half of that arithmetic comes from.

RTL mirrors the composition, so Arabic reads `Google ★★★★★` right to left. That is correct for a
composition in an RTL container, not a bug, and the wordmark itself is never mirrored.

### 24.5 Accessibility: the row draws no words, so the link carries them

Nothing on the row is text any more — five `aria-hidden` stars and an image. The `<img>` takes `alt=""`
(the link already names itself, and alt text here would only be announced twice), and the link takes:

| | Accessible name |
|---|---|
| `/` | `تقييم خمس نجوم على Google` |
| `/en/` | `Five star rating on Google` |

It says what the mark means — a five star rating on Google — which neither the stars nor the wordmark say
out loud, and it names **no count**, matching the visual. With `alt=""` the link has no visible text at
all, so `label-content-name-mismatch` cannot fire; the name keeps the word `Google` in it anyway, so it
stays clean even if the image is ever given alt text again. Focus uses the global `:focus-visible` ring.

**Still no rating structured data.** Grepped over the whole of `site/` after the final build,
case-insensitively, for `aggregaterating`, `ratingvalue`, `reviewcount`, `"review"`, `schema.org/Review`
and `bestrating`: **0 matches each**. Run against the built output, never the template — 24.2 is why that
is not paranoia.

### 24.6 The first-screen budget, rebalanced, and one Arabic media query retired

Deleting a 48px two-part row and putting back a 36px one-part row frees 12px, and §15.1's budget is a
**hard** constraint, so the freed space went where Ahmad asked for it — air. `margin-block-start` 76 → 78
on desktop, 52 → **56** on tablet, and on the phone 40 → **48**, where §23 needed the row squeezed to 40
to fit two stacked bands about 90px tall and §24's single 29px row does not.

**The Arabic short-window override moved, and this is the real whitespace win.** §15.1's
`@media (min-width: 990px) and (max-height: 950px)` gave Arabic tightened hero gaps — `btn-row 40 → 30`,
`cred 70 → 50` — and **1440x900, the spec viewport, is inside that query**, so the Arabic mark sat 50px
under the CTAs against English's 78. With the shorter row Arabic now clears 900 with room: measured hero
content **483.3px inside a 550px box**, 66.7px spare. The threshold is now `max-height: 870px`.

The arithmetic that picks 870, so the next agent does not have to re-derive it: hero box = viewport − 78
(the strip); content area = that − 272 (96 above the content plus the 112 header, and 64 below). So the
untightened Arabic hero needs a viewport of **833.3px** and the tightened one **795.3px**. 870 is a round
number comfortably between them: 900 gets the full air, genuinely short windows keep the tightened gaps
they have always had, and the 795.3px floor below which the Arabic hero grows and the page scrolls
normally is unchanged.

### 24.7 Verification

**1. The first-screen budget, §15.1's hard constraint, all six combinations.** Real Chrome,
`deviceScaleFactor 1`, after `document.fonts.ready`:

| Viewport | Locale | Header | Hero | Strip | First screen | `#problem` top | Hero internal scroll | Overflow-x | Subhead lines |
|---|---|---|---|---|---|---|---|---|---|
| 1440x900 | en | 112 | 822 | 78 | **900** | **900** | 0 | false | 1 |
| 1440x900 | ar | 112 | 822 | 78 | **900** | **900** | 0 | false | 1 |
| 1920x1200 | en | 112 | 1121 | 79 | **1200** | **1200** | 0 | false | 1 |
| 1920x1200 | ar | 112 | 1121 | 79 | **1200** | **1200** | 0 | false | 1 |
| 390x844 | en | 72 | 726.8 | 117.2 | **844** | **844** | 0 | false | 3 |
| 390x844 | ar | 72 | 726.8 | 117.2 | **844** | **844** | 0 | false | 2 |

Identical to §23.6 and §21.4 to the pixel in all six rows: header + hero + strip is exactly one viewport,
the next section starts precisely at the fold, and the hero never scrolls inside itself.

The mark itself, measured:

| Viewport | Row height | Mark | Stars | Wordmark | Row top (en / ar) |
|---|---|---|---|---|---|
| 1440x900 | 36 | 255.8 x 36 | 147.3 x 26 | 92.5 x 30 | 674.9 / 688.7 |
| 1920x1200 | 39 | 284.1 x 39 | 164.3 x 29 | 101.8 x 33 | 836.3 / 852.1 |
| 390x844 | 29 | 196.2 x 29 | 113.3 x 20 | 70.9 x 23 | 589.4 / 587.4 |

At 390 the mark is 196.2px inside a 350px inner box — one row, both locales, no wrap, and no clamp floor
being fought for the way §23's four logos fought for theirs.

**2. Screenshots, looked at.** `fold-1440-{en,ar}.png` and `fold-390-{en,ar}.png` at
`deviceScaleFactor 2`, plus tight crops of the mark and the gold/orange pair at 3x. The mark reads as a
deliberate trust mark: centred, no box, no border, no plate, no number, no "5.0", nothing that frames it
as an embedded widget or an ad unit. It is visibly the lightest element in the hero and sits clearly
below the CTAs in weight. The hero has more air than §23's at every size and the mark does not float: at
1440 it is ~88px below the CTA row and ~142px above the strip, so it still reads as part of the hero
block rather than as something stranded between the two.

**3. Structured data.** 24.5. Zero matches on all six property names, over the whole of `site/`.

**4. Lighthouse**, `/en/`, one run each on the final build:

| | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Desktop | **100** | **100** | 100 | 100 | 0.4s | 0ms | **0** |
| Mobile | **100** | **100** | 100 | 100 | 1.7s | 0ms | **0** |

Zero accessibility audit failures on either. Mobile performance is **100**, up from §23.6's 99: the four
tool WebPs were 36 kB of first-viewport image and the SVG that replaced them is 1.9 kB.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

---

## 25. The offer is not free any more. $500 once for six months, 2026-09-30

Ahmad's sixth revision pass, and the first one that changes what the business sells rather than how a
section looks. It touches the homepage offer strip line, the whole of `/offer` and `/en/offer`, the Terms
page's offer block, and it adds one new section and one new image. Nothing here is committed, pushed or
deployed — the site is live at q8block.com, so Ahmad reviews this on `localhost:8823` first.

### 25.1 The offer, in Ahmad's own words

> `It's actually $500 for six months. And we anchor the actual price starts from $500 a month. But for the`
> `first six months, they don't actually need to pay monthly. They just pay one time $500. And then after`
> `that, they can choose a three-tier price, $500, $1,000, or $1,500.`

| | |
|---|---|
| The anchor | The service normally starts at **$500 per month** |
| The offer | **$500 ONE TIME**, covering the first six months. Not $500 a month. Not $500 a month for six months |
| After six months | One of three monthly tiers: **$500, $1,000 or $1,500 a month** |

Everything else stands: service companies in Saudi Arabia, the four eligibility conditions unchanged, the
six deliverables unchanged, no contract.

**The anchor is the weapon, and that is why the page is built around two rows.** Ahmad has a competitor
actively pitching his prospects at $500 a month. A prospect on this page has to find that quote unthinkable
by comparison, and what does it is the same number printed twice with two different units, next to each
other, with nothing in between. **There is no "you save $2,500" line and none may be added** — a savings
claim reads as a discount gimmick and makes the reader argue with the arithmetic instead of with the
competitor's quote. Two numbers. The reader does the sum himself in about a second.

**The single biggest risk is confusion, and it outranks everything else on this page.** If a reader leaves
thinking it is $500 per month for six months, the offer is dead and so is the trust. So `دفعة واحدة` /
`one payment`, `مرة واحدة` / `one time`, `تُدفع مرة واحدة` / `paid once` sits beside the number **every
single time the number appears**, in both languages, in the shortest words there are. `copy.md`'s new price
register lists every place. Do not economise on those words anywhere.

### 25.2 What changed, file by file

| Where | Was | Now |
|---|---|---|
| Homepage §2 strip line, ar | `ستة أشهر مجانًا لشركات خدمية` | `ستة أشهر بـ$500 مرة واحدة` |
| Homepage §2 strip line, en | `6 months free, service firms` | `6 months for $500, paid once` |
| `/offer` title, ar | `العرض: ستة أشهر مجانية بدون عقد` | `العرض: ستة أشهر بدفعة واحدة 500 دولار` |
| `/offer` title, en | `The offer: six months free, no contract` | `The offer: six months for $500, paid once` |
| B1 headline, ar | `ستة أشهر مجانية، بدون عقد` | `ستة أشهر بـ$500، تُدفع مرة واحدة` |
| B1 headline, en | `Six months free, no contract.` | `Six months for $500, paid one time.` |
| B1 highlight | `مجانية` / `free` | `مرة واحدة` / `one time` |
| B1b | — | **new**, the price anchor |
| B2 intro | `The six months cover the full work` | `One payment of $500 covers all six months, and the six months cover the full work` |
| B2b | — | **new**, the proof block and its image |
| B4 body | `stop at any time … with no fee` | one payment, no monthly bill, nothing renews, nothing further due |
| B5 | three numbered options, no figures | **three monthly tiers**, $500 / $1,000 / $1,500, prices only |
| B6 | 6 questions, Q1 `Why is this offer free?` | **7 questions**, Q1 `Is the $500 per month?` |
| Terms T5 | `who can register, what the six months cover, and the options afterwards` | `… what it costs and how it is paid, and the options afterwards` |

The homepage FAQ never carried an offer question — every one of them moved to `/offer` on 2026-09-24 — so
nothing in homepage §8 needed rewording beyond its own preamble in `copy.md`.

### 25.3 The strip line lost "service firms", and that was a pixel decision

`copy.md` §2 has the full note. In short: the line has to carry the price **and** the fact that it is paid
once, and there is no room left for the qualifier. At 390 the pill and the line share row 1 inside a 350px
inner box, and putting `لشركات خدمية` / `service firms` back overruns it — the same budget that forced the
line to be shortened once already on 2026-09-25 (§21). The qualifier is not lost: the offer page names
service companies in the B1 subhead, in the B3 intro and as eligibility condition **1**, which is where a
reader actually self-qualifies. **This is the one thing in this pass Ahmad may want back**, and getting it
back costs a fourth row on the phone strip.

### 25.4 The price anchor, B1b

Two rows, one description list, the same number, different units, and one short bold note under them. It
sits between the subhead and the countdown, and nothing competes with it.

| | ar | en |
|---|---|---|
| Anchor row | `السعر المعتاد` · `يبدأ من $500 شهريًا` | `Normal price` · `from $500 per month` |
| Offer row | `هذا العرض` · `$500 دفعة واحدة، تغطي ستة أشهر` | `This offer` · `$500 one time, covers six months` |
| Note | `دفعة واحدة، وليست شهرية. لا فاتورة شهرية خلال الأشهر الستة.` | `One payment, not monthly. No monthly bill during the six months.` |

`.price-anchor` in `src/styles.css`, `priceAnchor()` in `src/render.mjs`. Max-width 760px, centred; a 1px
`rgba(255,255,255,0.16)` box with a hairline between the two rows; the offer row takes
`rgba(255,95,41,0.10)` and its value takes `--orange` at `clamp(19px, 30/14.4vw, 34px)` against the anchor
row's `--fs-count` in `--muted-on-dark`. The rows are `flex-wrap: wrap` with `space-between`, so at 1440 the
value sits at the end of the row and at 390 it wraps below its own label, with no media query for it.

**No strike-through on the anchor row, and this is not a style preference.** It is not a "was" price being
crossed out; it is the service's real ongoing price, and it reappears three sections later as tier 1 in B5.
Striking it through would turn a true statement into a sales device and would contradict B5 on the same page.

**A description list may only contain `dt`, `dd` and `div`**, so the note is a paragraph outside it. The
first draft had it inside and that is invalid HTML.

### 25.5 The tiers, B5. Prices only, and this is the one thing still blocked on Ahmad

Ahmad gave the three PRICES and **not what differs between them**. B5 therefore prints three tiles carrying
a price and `شهريًا` / `per month` and nothing else, with two notes under the row: what each plan covers is
agreed on the call (which is what `copy-pages.md` T6 already says of everything project specific), and
stopping is still free and needs no notice.

**Nothing in this pass invented a service level, a page count, an hours figure, a feature list or a "most
popular" marker for the tiers**, and nothing should. An invented tier spec on a page whose entire argument
is that its figures are checkable is the worst possible place to make something up. The comment above
`offerAfter()` in `src/render.mjs` says so at the point of edit.

`.tier-row` is a 3-column grid at desktop; below 768px it stacks to three single rows with the price and its
unit side by side, because three columns of `$1,000` do not fit a 390px width at any size worth reading
(`--fs-numeral`'s 44px floor puts it straight through the side of the column, which is why the tier price
has its own `clamp(30px, 58/14.4vw, 64px)`).

### 25.6 The proof block, B2b, and the rule it overrides

`copy.md` Part B used to forbid performance figures on `/offer` outright: *a figure lifted onto an offer page
turns into a promise*. **Ahmad overrode that on 2026-09-30**, on the grounds that a reader who is being asked
for money wants to see what the six months do before he pays. The override is scoped to this one block.

The image is a Google Search Console export for `kwtclean.com`, a real client site — card 4 in homepage §7,
and the site homepage §6 already follows month by month — covering `4/1/26` to `9/19/26`. Ahmad's framing:
*"a good example of what happens in six months."* It shows `Total clicks 1.99K` and `Total impressions 114K`
selected, `Average CTR 1.7%` and `Average position 10.9` unselected, and a daily chart flat along zero
through April that lifts through May and settles into a climbing band to September.

**The page prints the two dates and never rounds them into a month count or a claim.** April 2026 is that
property's first month with any data (`design/proof-data.md`), so the chart is the site's whole life to date.

| | |
|---|---|
| Source, kept byte-for-byte | `design/proof-shots/kwtclean-gsc-2026-04-01-to-2026-09-19.png`, 2243 x 582, 121,385 bytes |
| sha256 | `b762c37640d5e1fd213fd287032561dadffb3e93d47fc77a1f12cf2b1ff8d4f1` |
| Derivation | `design/proof-shots/derive.mjs`, run as `SHARP_FROM=<scratch>/node_modules node design/proof-shots/derive.mjs` |
| Ships as | `src/img/proof-kwtclean-gsc.webp`, 2243 x 582, **74.7 kB**, WebP q92 |
| Provenance | `design/proof-shots/SOURCES.md` |

**The derivation is a format conversion and nothing else.** No further crop, no retouch, no sharpening, no
recolour, no upscale, and **no number in the image is altered**. It follows §23.4's rule exactly: the derive
script re-checks the source's sha256 and its pixel dimensions before it will write, so swapping the file
fails the run loudly instead of silently shipping a different screenshot. `sharp` stays out of the repo.

The image element carries `width="2243" height="582"` with `width:100%; height:auto`, so the browser reserves
the box from the attribute ratio before the file decodes — **CLS measured 0.000** on both Lighthouse runs. It
is `loading="lazy"`: it sits well below the fold, which is the opposite of §20.6's first-viewport rule and
correct here.

The alt text describes the panel as a panel: both selected tiles, both unselected ones, the date range and
the shape of the curve. That is a description of an image, not a claim, which is why `Average position` may
appear in it where the `rank` register forbids position as a selling word anywhere else.

**It pans on a phone instead of shrinking, and that is the whole point of it.** The export is 2243px of a
wide chart. Scaled to fit a 350px phone box it renders `1.99K` about 5px tall, which makes the one piece of
evidence on the page unreadable on the device 99% of the traffic uses — a proof nobody can read is not
proof. So **below 1000px** the image keeps a 1000px floor inside `.proof-pan`, a horizontally scrollable
wrapper, and the reader swipes it. At 390 the panel is 350px over 1000px of content and `1.99K` renders
13.4px tall; at 1440 the image is 1318px inside the 1320px column, the wrapper does not scroll at all and
the hint line is `display: none`. **It is never cropped to fit**: this is a real export and the crop it has
is the one Ahmad supplied.

**`.proof-pan` is `direction: ltr` and that is not cosmetic.** The panel is a screenshot of an LTR interface
whose four headline figures sit at its **left** edge. Left in an RTL container, a horizontal scroller opens
at the content's **right**, so an Arabic phone reader landed on the tail of the chart and never saw the
numbers at all — caught by looking at `proof2-390-ar.png`, not by any measurement. `direction: ltr` opens
both locales on the figures. The image itself is never mirrored either way.

The wrapper is `tabindex="0"` with `role="group"` and an `aria-label`, because axe requires a scrollable
region to be keyboard reachable (`scrollable-region-focusable`) and that also gives arrow-key panning for
free. The hint line (`اسحب الصورة أفقيًا لقراءتها كاملة` / `Swipe the panel sideways to read all of it`) is
`aria-hidden`: it tells a sighted phone reader that the panel scrolls, and a screen reader already has the
whole panel described in the image's alt.

### 25.7 `$500` renders backwards in Arabic unless it is isolated

Written plainly inside an Arabic sentence, `$500` comes out with the currency sign on the wrong side of the
digits. UAX#9 W2 resolves European digits whose nearest preceding strong type is an Arabic letter to
Arabic-Number; the `$` is then no longer adjacent to a European number, falls through to a neutral, and
resolves into the right-to-left run.

`src/data.mjs` exports `ltr()`, which wraps a price in **U+2066 (LRI) / U+2069 (PDI)**, and every Arabic
price string goes through it. Invisible characters were chosen over an inline `dir="ltr"` element
deliberately: they survive `esc()`, so the price strings stay ordinary escaped copy and no renderer has to
start emitting raw markup for a price. **Never write a bare `$` price into an Arabic string.**

The two exceptions are the Arabic page title and meta description, which write `500 دولار` instead. A search
result snippet is not a place to put a control character, and `500 دولار` is unambiguous without one.

Verified by eye at 3x: the H1, the subhead, both anchor rows, the strip line and all three tier tiles render
`$500` / `$1,000` / `$1,500` correctly under `dir="rtl"`.

### 25.8 The CSS comment leak happened twice more, and the second one had been shipping for days

§23.3 and §24.2 both record that `build.mjs` inlines `src/styles.css` into every built page, so a comment in
it is **shipped text**. It happened twice in this pass, and the grep over the built output caught both:

1. **A quoted copy line.** The phone strip's comment quoted the old strip string verbatim, so `Six months
   free` was still in all 82 built pages after every trace of it had been removed from the copy. Reworded.
2. **A bare HTML tag, and this one predates this pass.** The `.cred` comment written in §24 contained the
   words `an img element and not coloured live text` — written then as an actual tag. `scripts/seo-audit.mjs`
   counts image tags without an `alt=` over the built HTML, so that one comment was being reported as **an
   image with no alt on every page at once**: a HIGH finding across 25 pages, sitting in the audit since
   2026-09-25. The `.proof-shot` comment added in this pass wrote a second one and doubled it to "2 of 2".

Both are reworded, and `src/styles.css` now carries the standing rule in the phone-strip block: **no page
copy, no vendor or product name, and no HTML tag may be written in this file at all.** The reasoning lives in
`src/render.mjs` and in this document, neither of which is ever served.

Fixing them took the audit from **25 high / 43 medium** to **0 high / 18 medium**: the same phantom tag was
also being counted by the "images without width and height" check, which is where 25 of the mediums went.

### 25.9 Verification

Scope sized to the change, as §23.6 and §24.7 were. `compare.mjs` was skipped: the offer boards
(`design/boards/offer-1..3.png`) show a free offer and every divergence here is Ahmad-instructed, the same
status as §21.2's sparkline. The full `shots.mjs` sweep was skipped too. What was run:

**1. The first-screen budget, §15.1's hard constraint, all six combinations.** Real Chrome,
`deviceScaleFactor 1`, after `document.fonts.ready`:

| Viewport | Locale | Header | Hero | Strip | First screen | `#problem` top | Hero internal scroll | Overflow-x |
|---|---|---|---|---|---|---|---|---|
| 1440x900 | en | 112 | 822 | 78 | **900** | **900** | 0 | false |
| 1440x900 | ar | 112 | 822 | 78 | **900** | **900** | 0 | false |
| 1920x1200 | en | 112 | 1121 | 79 | **1200** | **1200** | 0 | false |
| 1920x1200 | ar | 112 | 1121 | 79 | **1200** | **1200** | 0 | false |
| 390x844 | en | 72 | 726.8 | 117.2 | **844** | **844** | 0 | false |
| 390x844 | ar | 72 | 726.8 | 117.2 | **844** | **844** | 0 | false |

Identical to §24.7, §23.6 and §21.4 to the pixel in all six rows. The new strip line is shorter than the one
it replaced, so the budget did not move at all.

**2. The offer strip, one row, measured by clustering every visible child by its vertical centre:**

| Viewport | Locale | Band | Visual rows | Row width | Inner box | Line width |
|---|---|---|---|---|---|---|
| 1440x900 | en | 78 | **1** | 1037 | 1320 | 299.2 |
| 1440x900 | ar | 78 | **1** | 1025 | 1320 | 262.0 |
| 1920x1200 | en | 79 | **1** | 1141 | 1500 | 299.2 |
| 1920x1200 | ar | 79 | **1** | 1127 | 1500 | 262.0 |
| 390x844 | en | 117.2 | 3 | row 1 = 333 | 350 | 209.4 |
| 390x844 | ar | 117.2 | 3 | row 1 = 300 | 350 | 183.4 |

One row at both desktop widths in both locales, and the phone band is still the three rows §21 got it back
to, at exactly the 117.2px it has measured since. At 390 the pill and the line share row 1 with 17px of
slack in English, which is the margin the "service firms" qualifier cannot fit into (25.3).

**3. Screenshots, looked at.** `offerhero-{1440,390}-{en,ar}.png`, `proof2-{1440,390}-{en,ar}.png`,
`tiers-{1440,390}-{en,ar}.png` and `strip-{1440,390}-{en,ar}.png`, `deviceScaleFactor 2`, plus a 3x crop of
the Arabic H1 and the anchor rows.

**The two second test — can a reader tell that $500 is a single payment?** Yes, three times before he
scrolls. The headline ends on `مرة واحدة` / `one time` inside the orange highlight block, which is the
loudest object in the hero. The anchor block puts `from $500 per month` directly above `$500 one time,
covers six months`, with the offer row tinted and its value in orange at nearly twice the anchor row's size,
so the unit is the only thing that differs and the eye lands on it. The bold note under the pair says
`One payment, not monthly` in four words. At 390 the anchor rows wrap label over value and read in the same
order, and the note holds two lines. Nothing on the page says "free" and nothing implies a monthly bill
during the six months.

**The proof panel, measured and looked at in both locales:**

| Viewport | Locale | Panel width | Image width | Scrolls | Hint |
|---|---|---|---|---|---|
| 1440x900 | en | 1320 | 1318 | false | hidden |
| 1440x900 | ar | 1320 | 1318 | false | hidden |
| 390x844 | en | 350 | 1000 | true | shown |
| 390x844 | ar | 350 | 1000 | true | shown |

At 390 both locales open on the four metric tiles, `1.99K` and `114K` plainly legible, with the flat April
start of the curve visible beside them. That took the `direction: ltr` fix in 25.6; before it the Arabic
phone view opened on the far end of the chart with no numbers on screen at all.

**4. No trace of the free offer in the built output.** Grepped over the whole of `site/`, case-insensitively:
`Six months free` → **0 files**. The word `free` (excluding `freelance`) and `مجان` → **0 occurrences on
`/`, `/en/`, `/offer/`, `/en/offer/`, `/terms/` and `/en/terms/`**. What is left is six blog pages and the
old checklist page, all of it unrelated copy about a Google profile being free and about free keyword tools.
`no fee` survives twice per offer page and is correct: it is the stopping option in B5 and in FAQ Q6, not a
claim about the offer's price.

**5. `node scripts/seo-audit.mjs` — 27 pages, `0 high`, 18 medium, 9 low.** Down from 25 high / 43 medium
(25.8). The new image carries a real alt and both intrinsic dimensions, and no link, canonical, sitemap or
page count moved.

**6. Lighthouse**, `/en/offer/`, one run each on the final build:

| | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Desktop | **100** | **100** | 100 | 100 | 0.4s | 0ms | **0** |
| Mobile | **100** | **100** | 100 | 100 | 1.7s | 40ms | **0** |

`/offer/` (Arabic) was run once as well: **100 / 100 / 100 / 100**, zero accessibility audit failures. Zero
accessibility failures on all three, including the new focusable scroll region. CLS is 0 with the new
74.7 kB image on the page, which is what the explicit width and height buy.

### 25.10 What is still open

1. **The tier contents.** B5 prints three prices and no contents, because Ahmad gave the prices and not what
   differs between the plans. Nothing was invented to fill them. This is the only thing on the page waiting
   on him, and it drops into `b5` in both locales in one edit.
2. **`service firms` on the strip line**, removed for pixels (25.3). Getting it back costs a fourth row on
   the phone strip.
3. **A refund position.** Money now changes hands at the start. B4 and FAQ Q3 say what is true — one payment,
   no monthly bill, nothing renews, nothing further due — and deliberately state **no refund rule in either
   direction**, because nobody has decided one. `copy-pages.md` T6 already says the money terms are agreed
   directly. If Ahmad wants a refund line, it is his decision and it goes in B4.
4. **`CONFIG.COUNTDOWN_END`** is still the `2026-10-04` placeholder from §15.4. Ahmad sets the real date.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

---

## 26. §6 is rebuilt around the graph, the homepage gets a price section, and the offer page stops over explaining, 2026-09-30

Ahmad's seventh revision pass, run the same day as §25 and on top of it. Three instructions plus one
late decision that arrived mid-pass. Nothing here is committed, pushed or deployed — the site is live
at q8block.com and he reviews this on `localhost:8823` first.

| | |
|---|---|
| 26.1 | §6 The journey is rebuilt around the Search Console graph, and its forensic detail is stripped |
| 26.2 | A new §7b, The price, between §7 Our work and §8 FAQ |
| 26.3 | The offer page's proof block stops leading with the client name and the date range |
| 26.4 | The offer page H1 is replaced. It sells the outcome, not the price |

### 26.1 §6 becomes the graph, and the three illustrations become icons under it

**What it was.** Three large charcoal cards side by side, each with an illustration, a month label
(`الشهر الأول، أبريل 2026`), a stage title, two lines of body and a click figure (`7` / `165` / `531`
clicks in the month), then a printed precision note about April being the first data month and August
the fifth full one, then the two carwashkw.com baseline lines, then a Search Console source caption.

**What Ahmad asked for.** The graph becomes the section's centrepiece and the three existing
illustrations become small icons underneath it that tell the story. New shape: headline, graph, a row
of three compact beats. Same three beats as before — the build, getting discovered, getting traction.

**THE FORENSIC DETAIL IS GONE ON PURPOSE. THIS IS A DECISION, NOT A REGRESSION.** Ahmad: *"don't use
details like kwtclean or from what month to what month."* Out of this section's copy: the client name,
the date range, the month labels, the three click figures, the "fifth full data month" precision note,
the carwashkw.com baseline paragraph and the source caption. **This is a deliberate reversal of the
earlier checkability framing, and he has now made it twice**, on the grounds that prospects do not
verify and the detail costs more than it earns. A later agent reading §6 of `copy.md` or the 2026-09-24
notes will find a long argument for exactly the opposite and must not act on it: this entry supersedes
it for §6. The full provenance still exists — the offer page's B2b names the client and both dates, and
`copy.md`'s derivation tables are unchanged — so nothing became unverifiable, it just stopped being the
first thing a prospect reads.

**The figures printed inside the image stay exactly as exported.** `1.99K`, `114K`, `1.7%`, `10.9` and
the dated x axis are the image's own axis, not our copy. No number in it is altered, ever.

**The graph is the same asset as B2b and is reused, not re-derived.** `src/img/proof-kwtclean-gsc.webp`,
2243 x 582, 74.7 kB, the unedited Search Console export whose provenance and sha256 are in §25.6 and in
`design/proof-shots/SOURCES.md`. It was not re-cropped, re-converted or re-exported for this section.

**It keeps B2b's behaviour exactly, because it reuses B2b's classes.** `journey()` emits the same
`.proof-shot > .proof-pan > img` structure, so:

* below 1000px the image keeps its **1000px floor** inside the horizontally scrollable `.proof-pan` and
  **pans instead of shrinking** — measured at 390: panel 350px over 1000px of content;
* the wrapper is **`direction: ltr`** in both locales, measured with `scrollLeft: 0` at every viewport,
  so an Arabic reader opens on the four headline figures at the panel's left edge and not on the tail
  of the chart;
* the wrapper stays `tabindex="0"` with `role="group"` and a label, so axe's `scrollable-region-focusable`
  is satisfied and arrow-key panning comes free;
* the hint line is `display: none` at 1440 and 1920 and `display: block` at 390, in both locales.

Only two rules are added for this copy of it: `.journey-graph { margin-block-start: 40px }` and a
1320px ceiling on the pan, so the graph fills the section's own column. At 1440 the image measures
**1318px inside the 1320px column** and the wrapper does not scroll at all.

**The three beats.** `.journey-beats` is a three-column grid of `.journey-beat`, each an icon beside a
title and one or two lines. No plate, no padding block, no `min-height` — they are not cards any more.
The illustrations are the same three files cropped from `journey-D.png`, unchanged:
`journey-1/2/3.webp`, drawn at **104 x 89.7** on desktop and **76 x 65.6** on a phone, with
`aspect-ratio: 343 / 296` so the set cannot shift layout. Two across under 990px, one per row under 768.

| # | Icon | Arabic title | English title | Body, unchanged from the old cards |
|---|---|---|---|---|
| 1 | `journey-1.webp` | البناء | Build | The site is designed, built and published, and sent to Google |
| 2 | `journey-2.webp` | الظهور | Get discovered | Service and area pages enter the index. Customers find them |
| 3 | `journey-3.webp` | النمو | Get traction | A customer finds the page for his area, and calls you from it |

The three bodies are the ones the cards already carried and they were kept **because they are free of
invented claims, durations and figures** — which is the standing rule for this section and is now the
only thing holding it, since the figures that used to support them are gone. The titles are still the
board's `Build / Get discovered / Get traction` and the MSA triad `البناء / الظهور / النمو` (§6 of
`copy.md`, Ahmad 2026-09-24). Nothing here reaches for the banned `ترتيب`.

**The subhead was shortened with the rest.** `هذه أرقام موقع واحد بنيناه، كما صدّرها Google Search
Console.` / `These are the numbers of one site we built, exactly as Google Search Console exported
them.` It keeps the source attribution, which is honesty rather than forensics, and drops the two
sentences about not mixing clients and not picking best months.

**The alt text names no client and no date range.** It describes the panel — the two selected tiles,
the two unselected ones and the shape of the curve. As on B2b, that is a description of an image and
not a claim, which is why `متوسط الموضع` / `average position` may appear in it where the `rank`
register forbids position as a selling word.

**The WhatsApp CTA that closes the section stays**, now centred on its own row, because the source line
it used to share that row with is gone.

**§6 now diverges from `design/boards/journey-D.png` by design.** The board draws three cards and a
sparkline; §21.2 already removed the sparkline at Ahmad's instruction and this pass removes the cards.
Both divergences are his, and `compare.mjs` was skipped for the same reason §21.2 and §25.9 skipped it.

### 26.2 §7b, The price, new on the homepage

**Where.** Between §7 Our work and §8 FAQ. Measured section order at every viewport, both locales:
`first-screen > problem > what-we-do > included > journey > work > pricing > faq > final`. That is
problem, solution, what you get, proof, **price**, objections, close.

**NO NEW VISUAL LANGUAGE, and that was the instruction.** Every part of this section is a component
already approved elsewhere on the site:

| Part | Where it comes from |
|---|---|
| eyebrow, h2, lead | every homepage section's head |
| `.price-anchor` (the dl, the two rows, the note) | offer B1b, §25.4, rendered by the same `priceAnchor()` |
| `.tier-row` / `.tier` | offer B5, §25.5 |
| `اطلع على العرض` / `See the offer` | the §2 strip's own CTA label — **not a new label** |

The band is `--bg-dark`, like §6, because `.price-anchor` and `.tier` are built on `--muted-on-dark`
and `rgba(255,255,255,…)` hairlines and were designed for that ground. It also keeps the page
alternating: white §7, dark §7b, light §8. The section is centred, like the §9 final-call band,
because a start-aligned head over two centred components reads as two sections stacked.

**Every figure and phrase is `copy.md` Part B verbatim. Nothing is invented.**

| Line | Arabic | English |
|---|---|---|
| Headline | `دفعة واحدة تغطي ستة أشهر` | `One payment covers six months.` |
| Highlight | `دفعة واحدة` | `One payment` |
| Lead | `السعر المعتاد لهذه الخدمة يبدأ من $500 شهريًا. وفي هذا العرض تدفع $500 مرة واحدة، وتغطي أول ستة أشهر كاملة.` | `The normal price for this service starts at $500 per month. In this offer you pay $500 one time, and it covers your first six months in full.` |
| Anchor row | `السعر المعتاد` · `يبدأ من $500 شهريًا` | `Normal price` · `from $500 per month` |
| Offer row | `هذا العرض` · `$500 دفعة واحدة، تغطي ستة أشهر` | `This offer` · `$500 one time, covers six months` |
| Note | `دفعة واحدة، وليست شهرية. لا فاتورة شهرية خلال الأشهر الستة.` | `One payment, not monthly. No monthly bill during the six months.` |
| After | `بعد الأشهر الستة` · `تختار خطة شهرية من ثلاث، أو تتوقف. القرار لك.` | `After the six months` · `You pick one of three monthly plans, or you stop. You decide.` |
| Tiers | `$500` · `$1,000` · `$1,500`, `شهريًا` | `$500` · `$1,000` · `$1,500`, `per month` |
| Tier note | `ما تشمله كل خطة يُتفق عليه معك في المكالمة.` | `What each plan covers is agreed with you on the call.` |
| CTA | `اطلع على العرض` to `/offer/` | `See the offer` to `/en/offer/` |

**Three hard rules on this section:**

1. **The tiers carry PRICES ONLY.** Ahmad has not defined what differs between them and nothing here
   may fill them out — no service level, no page count, no hours, no feature list, no "most popular"
   marker. The note says what is true instead, matching B5 and `copy-pages.md` T6.
2. **NO SAVINGS FIGURE**, here or anywhere. No "you save $2,500", no struck-through price, no
   percentage. The two numbers sitting together do the work and the reader does the arithmetic. Same
   reasoning as §25.1.
3. **NO GEOGRAPHY.** The offer page names Saudi Arabia because eligibility is a condition of that
   promotion. The homepage names no country anywhere and this section does not break that, even though
   the copy it is lifted from does. `copy.md`'s geography register is unchanged.

**The homepage now carries a price in two places, not one.** `copy.md`'s price register said the
homepage carried a price only in the §2 strip teaser; the register is updated. Every appearance still
has `دفعة واحدة` / `one payment` / `مرة واحدة` / `one time` beside the number, which is mandatory, and
every Arabic price still goes through `ltr()` — measured on the built page with the isolate intact.

### 26.3 The offer page's proof block stops leading with provenance

Ahmad: *"you put too much details for the search console graph, you are very logical and direct in your
messaging."* B2b's lead ran a full sentence of client name, exact start date, exact end date and a
clause about whose figures they are, before the reader had looked at the image.

| | Was | Now |
|---|---|---|
| Lead, ar | `هذه لوحة أداء موقع kwtclean.com في Google Search Console، من 1 أبريل 2026 إلى 19 سبتمبر 2026. موقع لعميل بنيناه نحن، والأرقام أرقامه وحده.` | **`موقع بنيناه. هذه أرقامه.`** |
| Lead, en | `This is the performance panel for kwtclean.com in Google Search Console, from 1 April 2026 to 19 September 2026. It is a client website we built, and the figures are its own.` | **`A site we built. These are its numbers.`** |
| New `.proof-meta`, under the image | — | `kwtclean.com، من 1 أبريل 2026 إلى 19 سبتمبر 2026.` / `kwtclean.com, 1 April 2026 to 19 September 2026.` |

**The client name and the date range are NOT deleted.** They moved to small fine print directly under
the image, at `--fs-caption` in `--muted-on-dark`, which is where provenance belongs. B2b still names
one client and one named period already in the past, so every guard rail §25.6 lists still holds. The
source line (the image is an unedited export) and the caption (six months of that work is what the one
payment buys) are untouched, as is the image, its derivation and its pan behaviour.

### 26.4 The offer page H1 sells the outcome, not the price

The H1 was on hold at the start of this pass because Ahmad was choosing between options. He chose
mid-pass and it was applied in the same build rather than left for a second one.

| | Was | Now |
|---|---|---|
| ar | `ستة أشهر بـ$500، تُدفع مرة واحدة` | **`عملاء جدد من محركات البحث والذكاء الاصطناعي`** |
| en | `Six months for $500, paid one time.` | **`New customers from search engines and AI.`** |

**Why.** The old line sold the **price**; the first replacements offered sold the **website**. Ahmad:
*"you're selling the website, not the dream outcome, which is related to search and AI, getting
clients."* The line now opens on the outcome — new customers — and names the two channels without
explaining either. **`محركات البحث` / `search engines` is deliberate and must not be narrowed back to
`جوجل` / `Google`**: he asked for search engines specifically. Six Arabic words, seven English, inside
the eight-word headline rule.

**The highlight was rehomed onto `عملاء جدد` / `New customers`.** §25's rule is that the highlight sits
on the offer's value word, never on `بدون عقد`. The value word used to be `مرة واحدة`, which no longer
exists in the headline, so it moved to the outcome phrase — the thing the reader is being sold. The
line is longer than the old one, so the break and the block were re-measured in both languages:

| Viewport | ar lines | ar H1 box | ar highlight | en lines | en H1 box | en highlight |
|---|---|---|---|---|---|---|
| 1440x900 | **2** | 1332 x 200 | 423 x 97 | **2** | 1332 x 181 | 702 x 105 |
| 1920x1200 | **2** | 1500 x 220 | 466 x 107 | **2** | 1500 x 197 | 768 x 115 |
| 390x844 | 3 | 350 x 128 | 180 x 42 | 3 | 350 x 120 | 310 x 47 |

**The Arabic `<br class="brk">` had to move, and this is worth keeping.** Placed after `عملاء جدد` —
the obvious spot, mirroring the English — the remaining `من محركات البحث والذكاء الاصطناعي` is wider
than the 1332px column at `--fs-h1`, so it wrapped again and the H1 set in **three** lines with
`الاصطناعي` alone on the last one. The break now sits after `البحث`, which gives two balanced lines at
both desktop sizes. `.brk` is `display: none` under 768, so the phone wraps naturally as always.

**The price had to be protected, because it left the headline.** The anchor block directly beneath now
carries the entire price message alone, so it was strengthened to compensate:

| | Was | Now |
|---|---|---|
| `.pa-now dd` | `clamp(19px, 30/14.4vw, 34px)` | **`clamp(22px, 36/14.4vw, 40px)`** — 36px at 1440, 40px at 1920, 22px at 390 |
| `.pa-now` | `rgba(255,95,41,0.10)` fill | fill to `0.12` plus a **3px orange inset edge** on the inline start, mirrored under RTL |
| `.pa-note` | `--fs-strip`, no box | **`--fs-count`** in a `1px rgba(255,95,41,0.45)` box with 12px/18px padding |

So the first two things under the headline are `$500 one time, covers six months` in orange at 36px
and `One payment, not monthly. No monthly bill during the six months.` boxed and bold. **The single
biggest risk on this page is still confusion** (§25.1) and the two-second read was checked by eye at
1440 and 390 in both locales after the change. The change also lands on the homepage's new §7b, which
reuses the same component — which is the argument for reusing it.

**The title and the meta description follow the headline.**

| | Arabic | English |
|---|---|---|
| Title | `عملاء جدد من محركات البحث والذكاء الاصطناعي \| Q8 block` | `New customers from search engines and AI \| Q8 block` |
| Description | `عملاء جدد من محركات البحث والذكاء الاصطناعي لشركات الخدمات في السعودية. دفعة واحدة 500 دولار تغطي أول ستة أشهر. السعر المعتاد يبدأ من 500 دولار شهريًا.` | `New customers from search engines and AI, for service companies in Saudi Arabia. One payment of $500 covers the first six months. Normal price from $500 a month.` |

Both descriptions still lead the price with the one-payment wording, and both Arabic ones still write
`500 دولار` rather than `$500` — §25.7's rule that a control character does not belong in a search
result snippet. The English description was trimmed from 169 to 160 characters, which cleared the one
new LOW finding the first audit raised.

### 26.5 Verification

Scope sized to the change, as §23.6, §24.7 and §25.9 were. **`compare.mjs` was skipped**: §6 now
diverges from `journey-D.png` by Ahmad's instruction and §7b has no board at all, the same status as
§21.2's sparkline and §25.9's offer boards.

**First-screen budget, §15.1, re-verified and unaffected.** The changes are all below the fold, and the
measurement confirms it — header + hero + strip is exactly one viewport at every size in both locales,
with zero hero internal scroll, zero horizontal overflow and zero console errors:

| Viewport | Locale | Header | Hero | Strip | First screen | `#problem` top | Hero scroll | Overflow x |
|---|---|---|---|---|---|---|---|---|
| 1440x900 | en | 112 | 822 | 78 | **900** | **900** | 0 | false |
| 1440x900 | ar | 112 | 822 | 78 | **900** | **900** | 0 | false |
| 1920x1200 | en | 112 | 1121 | 79 | **1200** | **1200** | 0 | false |
| 1920x1200 | ar | 112 | 1121 | 79 | **1200** | **1200** | 0 | false |
| 390x844 | en | 72 | 726.8 | 117.2 | **844** | **844** | 0 | false |
| 390x844 | ar | 72 | 726.8 | 117.2 | **844** | **844** | 0 | false |

Identical to §15.1's table and to §24.6's, which is the point: nothing in this pass went near the hero.

**The graph's pan behaviour, measured on the homepage in both locales.**

| Viewport | Pan width | Image width | Scrolls | `direction` | `scrollLeft` | Hint |
|---|---|---|---|---|---|---|
| 1440 | 1320 | 1318 | false | ltr | 0 | `none` |
| 1920 | 1320 | 1318 | false | ltr | 0 | `none` |
| 390 | 350 | 1000 | **true** | **ltr** | **0** | `block` |

**`node scripts/seo-audit.mjs`: 0 high**, 18 medium, 9 low over 27 pages. The mediums are §25.9's
unchanged set (Open Graph incomplete on 13 pages, five thin pages including `/404.html`). No new
finding came from either new section, and the one LOW this pass did raise — the English offer
description at 169 characters — was fixed before this line was written.

**Lighthouse, `/en/`, desktop config, one run:**

```
scores {"performance":100,"accessibility":100,"best-practices":100,"seo":100}
LCP 0.4 s   TBT 0 ms   CLS 0   FCP 0.3 s   SI 0.3 s
a11y failures: none
```

**Performance 100, accessibility 100, CLS 0.** A large image moving onto the homepage was the obvious
CLS and LCP risk and neither materialised: the graph carries `width="2243" height="582"` so the browser
reserves its box from the attribute ratio before the file decodes, and it is `loading="lazy"` well
below the fold, so it never competes with the hero for LCP — LCP stayed at **0.4 s**, the hero type.
The three beat icons were already on the page as the §6 card illustrations, so they add no bytes at all.

**Looked at, not only measured.** Full-page shots at 1440 and 390 in both locales, plus section crops
of §6 and §7b and the offer hero band. §6 reads as proof at a glance — headline, then the panel with
`1.99K` and `114K` legible even at 390, then three short beats. §7b reads "one payment" in well under
two seconds: the highlighted `One payment` / `دفعة واحدة` in the headline, the orange offer row and
the boxed note, one under the other.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

### 26.6 What is still open

Everything in §25.10 still stands unchanged — the tier contents, `service firms` on the strip line, a
refund position and the `CONFIG.COUNTDOWN_END` placeholder. This pass adds nothing to that list.

---

## 27. The pricing section drops the offer, becomes three cards, and is built to a board, 2026-10-01

Three passes on the same day. Pass 1 took the offer out and rebuilt the section as three cards. Pass 2
answered the tier question and built to `pricing-dark.png`. Pass 3 moved it to `pricing-light.png`,
which is where it stands.

### 27.1 What Ahmad said

> "I told you not to mention the offer in the pricing section. The pricing section should be three
> cards, the traditional beautiful way of showing tiers, and don't mention the offer in the pricing
> section."

§26.2 built `#pricing` to **lead with the offer**: offer B1b's `.price-anchor` (normal price versus
this offer), its bold `One payment, not monthly` note, and only then the three tiers. That was the
whole shape of the section and it is the thing he rejected.

**The offer now has exactly two homes and this is not one of them:** the §2 dark strip under the hero,
and `/offer/`. Both are untouched — the strip still reads
`عرض محدود · ستة أشهر بـ$500 مرة واحدة` / `Limited offer · 6 months for $500, paid once`, and the offer
page still renders `.price-anchor` (B1b) and `.tier-row` (B5).

### 27.2 What is gone from `#pricing`

| Removed | Was |
|---|---|
| `priceAnchor(p.price)` call | the two-row anchor lifted from B1b |
| `.pa-note` | `دفعة واحدة، وليست شهرية. لا فاتورة شهرية خلال الأشهر الستة.` |
| `.pricing-after` block | `بعد الأشهر الستة` + `تختار خطة شهرية من ثلاث، أو تتوقف.` |
| `.tier-row` / `.tier` | offer B5's three tiles |
| the `/offer/` CTA | `اطلع على العرض` / `See the offer` |
| `pricing.price`, `afterTitle`, `afterIntro`, `tiers`, `note`, `cta` | all six deleted from `data.mjs`, both locales |

`.price-anchor`, `.pa-*` and `.tier-*` are **not** deleted from `styles.css`. The offer page still uses
them. Only the `#pricing`-scoped overrides were replaced.

### 27.3 The tier question is answered: COMPANY SIZE

This had been open since §25.5 and flagged three times. Ahmad, 2026-10-01, verbatim:

> "We're selling phone calls. We're obviously not going to mention number of phone calls because in
> SEO that's unpredictable. My suggestion is mention the size of the company. So a 500 is for small
> companies, 1,000 is small to medium, $1,500 is medium to large."

So a card is a **price, a period and who the plan is for**, and that is a **complete card**. The
interim stand-in line from pass 1, `what each plan covers is agreed with you on the call`, is gone
along with the gap it was covering — it would now read as an apology on a card that is finished.

**The conventional SEO-tier axis stays banned, deliberately.** Hours, page counts, numbers of services
or areas, blog post volume, link quantities, reporting frequency, support levels, and above all any
promise about how many calls a plan produces. That is precisely what agencies print on tiers and Ahmad
rejected all of it on purpose. Company size is the only differentiator that exists.

### 27.4 The copy

Ahmad: *"we're selling SEO, so the messaging is not really SEO... we're selling phone calls."* The head
sits on the business outcome and on picking by the size of the business. No feature language, no
packages framing, no jargon, no `rank` / `ترتيب` / `يتصدر`, no geography, no dashes, no emojis, and
both headlines are under eight words.

| Line | Arabic | English |
|---|---|---|
| Eyebrow | `الأسعار` | `Pricing` |
| Headline | `<span class="hl">اختر خطتك</span> حسب حجم شركتك` | `<span class="hl">Pick your plan</span><br class="brk"> <span class="nb">by your company size.</span>` |
| Lead | `كل خطة هدفها واحد: عملاء يتصلون بك. والفرق بينها هو حجم شركتك.` | `Every plan has one goal: customers calling you. What changes is the size of your company.` |
| Period | `شهريًا` | `monthly` |
| Card 1 | `للشركات الصغيرة` | `For small companies` |
| Card 2 | `للشركات الصغيرة والمتوسطة` | `For small to medium companies` |
| Card 3 | `للشركات المتوسطة والكبيرة` | `For medium to large companies` |
| CTA, every card | `اتصل الآن` → `tel:` | `Call now` → `tel:` |

The English headline carries an explicit `.brk` + `.nb` because the board draws its headline on one
line and this one will not fit; without it 1440 broke it as `by your / company size.` Both release
under 768px so the phone wraps naturally.

**No third CTA label was invented.** It is `cta.call`, on the same `tel:` href as every other CTA on
the site. The section does not link to `/offer/` at all.

**Reading order is low to high in both locales from one DOM order.** Measured on the built pages:
`/en/` card lefts `60, 507, 954` for 500/1000/1500; `/` card lefts `954, 507, 60` for the same three,
so `$500` is the rightmost card on the Arabic page.

### 27.5 The board: `pricing-light.png`. `pricing-dark.png` IS DEAD

Ahmad first picked `pricing-dark.png` and the section was built to it. He then replaced it:

> "you are right make it light because dark follows."

**`design/boards/pricing-light.png` is the board. `design/boards/pricing-dark.png` is the dead board —
do not rebuild against it.** No new Higgsfield spend: both boards already existed.

What the light board draws: a `#FEFEFE` band, white cards defined by a hairline border alone,
**near-black prices**, a quiet lowercase period, a hairline, the descriptive line, and a **solid orange
button on all three cards**. The middle card is weighted by an **orange top rule** and a marginally
darker border.

Three consequences worth stating, because they answer the questions the dark board raised:

1. **The contrast risk is gone, not managed.** The dark board put an 85px `--orange` numeral on
   charcoal; on white that same numeral would have had to lean on the large-text threshold. The light
   board's price is near-black — sampled `#0B0C0E`, which is `--ink` — so it measures **19.61:1**
   against the card and leans on nothing. Full ratios in §27.10.
2. **The middle card is still weighted, and still without a badge.** The dark board did it with one
   solid button among two outlines; the light board does it with the orange top rule, and all three
   buttons go solid. Either way there is **no badge, no ribbon, no "most popular" label, no scale
   change and no heavier shadow**, and none may be added — those would be a recommendation nobody has
   made. The rule is painted as `box-shadow: inset 0 5px 0 var(--orange)` rather than a 5px border, so
   the middle card is exactly as tall as the other two (measured: 441/441/441 on `/en/`).
3. **The board's own words are still placeholders and are still not used.** It draws `$2,000`,
   `Get Started` and `More features for growing teams` — the last of those is exactly the invented
   feature language this section bans. **The board is the layout and the type, never the copy.**

### 27.6 The measurement table, `pricing-light.png`

Board canvas is **2688px wide for a 1440px viewport, so board px × 0.5357 = CSS px.** Every value was
measured off the PNG, not chosen by eye, and written as `calc(N/14.4 * 1vw)` so it is exact at 1440.
This table **replaces** the `pricing-dark` table that stood here in pass 2.

| Element | Board px | CSS at 1440 | Built as |
|---|---|---|---|
| band | `#FEFEFE` | — | `--bg-white` |
| card row span | 118 → 2570 | 1313 | the site's own 1320px `.wrap` |
| card width | 790 | 423.2 | `repeat(3, 1fr)` |
| card gap | 40 | 21.4 | `clamp(14px, calc(21/14.4 * 1vw), 23px)` |
| card height | 551 → 1345 | 423.7 | content-derived: **417** (`/`), **441** (`/en/`) |
| card fill | `#FEFEFE` | — | `--bg-white` |
| card border | 2, `#DADEE3` | 1 | `1px solid var(--hairline-light)` (`#D2D7DD`) |
| card padding, inline | 67 | 35.9 | `clamp(18px, calc(36/14.4 * 1vw), 39px)` |
| card padding, top | — | ~44 | `clamp(26px, calc(44/14.4 * 1vw), 48px)` |
| card padding, bottom | — | 31.1 | `clamp(24px, calc(31/14.4 * 1vw), 34px)` |
| **middle card rule** | 542 → 552, `#FD5926` | **5.4** | `box-shadow: inset 0 5px 0 var(--orange)` |
| **price glyph** | 149 × 404 (`$500`) | **79.8 × 216.4** | `clamp(44px, calc(81/14.4 * 1vw), 88px)`, weight 600 |
| price colour | `#0B0C0E` | — | `var(--ink)` (`#0A0A0C`) |
| price → period | — | 20.4 | `clamp(11px, calc(20/14.4 * 1vw), 22px)` |
| period glyph | 38 (`monthly`) | 20.4 | `clamp(15px, calc(21/14.4 * 1vw), 23px)`, weight 400 |
| period → rule | — | 26.8 | `clamp(18px, calc(27/14.4 * 1vw), 29px)` |
| rule → size line | — | 31 | `clamp(20px, calc(31/14.4 * 1vw), 34px)` |
| size line | 2 lines, 96 | 51.4 → ~22/line | `--fs-body` |
| size line → button | — | 53.6 | `clamp(26px, calc(53/14.4 * 1vw), 58px)` |
| button | 118 × 667 | 63.2 × 357.3 | full card inner width, **63px built**, `.btn-primary` ×3 |
| head → cards | 241.1 → 295.2 | 54.1 | `clamp(32px, calc(54/14.4 * 1vw), 58px)` |

**How the price size was fixed, since a glyph box is not a font size.** The build renders `$500` at a
known **62px** and measures **61 tall × 163 wide**. This board's `$500` measures **79.8 × 216.4**.
`79.8 / 61 = 1.308`, so the board is `62 × 1.308 = 81px`. The independent width check agrees:
`163 × 1.308 = 213.2` against the board's `216.4`, inside 1.5%. That agreement also confirms the
**weight as 600** — a heavier cut would have come out wider at the same height.

**Four deliberate deviations from the board**, all site tokens winning over a generated mock that is
not accessibility checked:

1. **the period and the size line take `--muted-on-light` (`#686F79`)**, not the board's `#A1A9B6` and
   `#9EA6B0`. Those measure about 2.3:1 on `#FEFEFE` and **fail AA outright**. This is the same
   correction §3.2 already recorded against the board grey, for the same reason;
2. the eyebrow stays `--fs-eyebrow` (22px at 1440) against the board's ~26px, because that token
   carries the 19px/700 floor that keeps `#E85319` qualified as large text (§17);
3. the h2 stays `--fs-h2` (80px) against ~76px and the lead stays `--fs-lead` (29px) against ~27px.
   Every other section head on this page is those two tokens and one section a few px off would read
   as a mistake, not a design;
4. the buttons are the site's `.btn-primary` in sentence case, not the board's `Get Started`.

Everything else on the board is matched.

### 27.7 `.plan` is a flex column, and the grid version was a real bug

It was first written `display: grid; grid-template-rows: auto auto 1fr auto`, meaning to pin the three
buttons to one baseline. With no feature list a card has **three** children, so the `1fr` landed on
`.plan-cta` instead of the row above it: card 1 on `/en/`, whose size line is one line rather than two,
put its button **31px above** the other two. Measured, not noticed by eye — `ctaTops [870, 901, 901]`.

A flex column with `margin-block-start: auto` on `.plan-cta` holds the baseline whatever the card
contains, including a feature list added later. Re-measured on the light build: `ctaTops
[913, 913, 913]` on `/en/` and `[842, 842, 842]` on `/`, card heights identical across all three cards
in both locales.

### 27.8 Where a feature list would go, if one is ever wanted

Marked in `data.mjs`, `render.mjs` `pricing()` and `styles.css` at `.plan-row`:

> Add `features: ['…', '…']` to each entry of `pricing.plans`, **both locales**, and fill offer B5 in
> the same edit.

`render.mjs` renders `plan.features` as `<ul class="plan-features">` between the price block and the
size line, `.plan-features` is styled, and `.plan` is a flex column with the CTA pinned to the foot, so
a list of any length drops in **without a redesign**. **It is not needed today.** Neither board draws a
feature list and the card is finished as it stands.

### 27.9 The band rhythm: two dark bands on the whole page

When §7b was dark (pass 2) the lower half ran journey **DARK** · work white · pricing **DARK** · faq
light · final **DARK** — four alternating breaks, which `lessons.md` rules out (*"Light pattern breaker
sections: 1 or 2 per page, not alternating"*). Pass 2 fixed that by moving §8 FAQ onto the dark ground.

**A light §7b dissolves that problem, so the FAQ move was reverted in full.** §8 is back exactly as it
was: `--bg-light-faq` ground, `--bg-panel` rows on `--hairline-light`, `--ink` questions,
`--muted-on-light` answers, the 785px measure, the 17px gap, the open-first row and the icon, all at
their pre-change values. The four `#faq` CSS lines and the `on-dark` class came out. Verified as a
clean revert rather than a half state: `git diff` of `src/render.mjs` and `src/styles.css` matches
**zero** `faq` lines, i.e. both files are byte-identical to the last commit everywhere the FAQ is
concerned.

Backgrounds read off the built page, top to bottom:

| Section | Computed background | |
|---|---|---|
| hero | `rgb(242,243,245)` | light |
| problem | `rgb(254,254,254)` | light |
| what-we-do | `rgb(242,243,245)` | light |
| included | `rgb(254,254,254)` | light |
| **journey** | `rgb(16,16,18)` | **DARK — break 1** |
| work | `rgb(254,254,254)` | light |
| **pricing** | `rgb(254,254,254)` | light |
| faq | `rgb(244,245,246)` | light |
| **final** | `rgb(16,16,18)` | **DARK — break 2** |
| footer | `rgb(3,3,3)` | the close |

**Exactly two dark bands on the whole page: the journey and the close.** That is what `lessons.md`
asks for and what the page was approved with.

`#pricing` and `#work` are both `#FEFEFE` and adjacent. That is the board's own band value and it was
checked rather than assumed: a full §7→footer crop at 1440 in both locales shows the boundary carried
by the work wall's source line, the whitespace, then the orange eyebrow and the 80px headline, with the
three bordered cards forming their own block underneath. It reads as two sections, not one.

### 27.10 Contrast, measured on the built page

The dark board's colour choices were made against charcoal, so every one was re-checked against white.
Computed values from `/en/` at 1440:

| Element | Colour | Size / weight | On | Ratio | Verdict |
|---|---|---|---|---|---|
| price | `#0A0A0C` `--ink` | 81px / 600 | `#FEFEFE` | **19.61** | passes everything |
| period | `#686F79` `--muted-on-light` | 21px | `#FEFEFE` | **5.03** | AA normal text |
| size line | `#686F79` | 23px | `#FEFEFE` | **5.03** | AA normal text |
| lead | `#686F79` | 29px | `#FEFEFE` | **5.03** | AA normal text |
| card CTA label | `#FFFFFF` | 23px / **700** | `#FF5F29` | 3.03 | AA **large text** |
| eyebrow | `#E85319` `--orange-ink-light` | 22px / **700** | `#FEFEFE` | 3.66 | AA **large text** |

The last two rows are the §17 / §17.7b reasoning unchanged, not a new exception: white on the locked
`--orange` is 3.03:1 and `#E85319` is 3.66:1, both of which satisfy AA at the 3:1 large-text threshold,
which is why `--fs-btn` and `--fs-eyebrow` carry 19px/700 floors. **No new token was invented and no
existing one was altered.** Lighthouse accessibility is 100 on both locales, with no audit failures.

### 27.11 Verification

**The offer is genuinely absent from the section.** The built `#pricing` was sliced out of
`site/index.html` and `site/en/index.html` and grepped for `one time`, `one payment`, `not monthly`,
`six months`, `monthly bill`, `offer`, `save`, `Normal price`, `discount`, `limited`, `spots`,
`countdown`, `%`, `price-anchor`, `pa-now`, `pa-note`, `tier-row`, `pricing-after`, `دفعة واحدة`,
`مرة واحدة`, `ستة أشهر`, `الأشهر الستة`, `العرض`, `السعر المعتاد`, `فاتورة`. **Zero hits in both
locales.** The strip above and `/offer/` still carry all of it, as they must.

Section order unchanged in both locales:
`hero > problem > what-we-do > included > journey > work > pricing > faq > final`. The `#pricing` id is
unchanged.

| Check | Result |
|---|---|
| `node scripts/seo-audit.mjs` | **0 high**, 18 medium, 9 low — all pre-existing, none in `#pricing` |
| Lighthouse `/en/`, desktop | perf **100**, **accessibility 100**, best practices 100, SEO 100 |
| | LCP 0.4s · TBT 0ms · **CLS 0** · FCP 0.3s · SI 0.3s · a11y failures none |
| Lighthouse `/`, desktop | perf **100**, **accessibility 100**, best practices 100, SEO 100, **CLS 0** |
| Page errors, 1440 and 390, both locales | none |
| Horizontal overflow | false everywhere; no card overflows its own box |
| CTA baselines | identical across all three cards, all four viewport/locale combinations |
| Card heights | 417/417/417 (`/`), 441/441/441 (`/en/`) — the middle card is not taller |
| FAQ revert | byte-identical to the last commit in both `render.mjs` and `styles.css` |
| Section crops | `pricing-{ar,en}-{1440,390}.png`, looked at, all four |
| Band run crops | `lower-{ar,en}.png`, §7 → footer, looked at |

`compare.mjs` and the full `shots.mjs` sweep were skipped: one section, and the first-screen budget is
untouched by a section this far down the page.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.

### 27.12 What is still open

**The tier contents are no longer a blocker** — §27.3 closed the longest-standing item on the §25.10
list. Still open from §25.10: `service firms` on the strip line, a refund position, and the
`CONFIG.COUNTDOWN_END` placeholder. Nothing was added to that list by this pass.

`design/boards/pricing-dark.png` is now a dead board kept on disk for the record. If it is ever deleted,
this section is unaffected — `pricing-light.png` is the one that matters.

## 28. Ahmad's fourth revision pass, 2026-10-01. Two headlines cut, two leads deleted, §5 removed and the client wall goes to fourteen

Five items in one pass, all on the homepage. **The voice note governs every one of them:** Ahmad on the
copy that was there — *"you wrote a description of what we're doing, which is horrible... we're selling
them the service, we're not selling them the data."* The failure is consistent and it is the same one
each time: a sentence that explains the mechanism instead of stating the thing. **Where a line explained
how a figure was derived, what a section contains, or why something is true, it was DELETED rather than
rewritten.** A shorter explanation is still an explanation. Nothing on this page got longer.

### 28.1 §7b's headline drops the qualifier, and its lead drops a sentence

> "just leave it, choose your plan, remove company size."

| | Was | Is |
|---|---|---|
| Headline, ar | `<span class="hl">اختر خطتك</span> حسب حجم شركتك` | `<span class="hl">اختر خطتك</span>` |
| Headline, en | `<span class="hl">Pick your plan</span><br class="brk"> <span class="nb">by your company size.</span>` | `<span class="hl">Choose your plan.</span>` |
| Lead, ar | كل خطة هدفها واحد: عملاء يتصلون بك. والفرق بينها هو حجم شركتك. | كل خطة هدفها واحد: عملاء يتصلون بك. |
| Lead, en | Every plan has one goal: customers calling you. What changes is the size of your company. | Every plan has one goal: customers calling you. |

**The highlight was not invented and was not removed.** §27.4's highlighted phrase was already exactly
`اختر خطتك` / `Pick your plan`, so cutting the qualifier leaves the headline **equal to** its own
highlight. It renders as one solid `--orange` block with `--ink` text, §4's rule unchanged, at
`--fs-h2`. Nothing was added around it to make it look less loud; that would have been writing copy to
decorate a layout.

**The `.brk` / `.nb` treatment went with the qualifier.** §27.4 added an explicit break because the
English headline would not fit on one line at 1440. Three words fit at every width, so the planned break
is gone rather than left in as a no-op.

**The lead's second sentence was the headline's qualifier said twice**, and each of the three cards
already prints who it is for (`For small companies` and the other two, §27.3). Cutting it leaves the one
thing the section sells: customers calling. The first sentence is **not** a mechanism explanation, which
is why it stayed.

### 28.2 §7's headline becomes two words, and BOTH its explanatory lines are deleted

> Ahmad on `مواقع بنيناها ويجدها العملاء اليوم` / `Sites we built that get found.`: horrible. He asked
> for "something very simple like our clients". And on the paragraph under it: "don't write what the
> number is or any of that."

| | Was | Is |
|---|---|---|
| Headline, ar | مواقع بنيناها <span class="hl">ويجدها العملاء</span> اليوم | `عملاؤنا` |
| Headline, en | Sites we built that <span class="hl">get found.</span> | `Our clients.` |
| Lead | a 44-word paragraph (ar) explaining that every site was built from scratch, what the figure on each card is, that it is summed across complete months, and that recent projects are tagged | **deleted** |
| Source line | `كل الأرقام من Google Search Console: مجموع مرات الظهور في كل شهر كامل مسجّل لكل موقع...` | **deleted** |

**No highlighted word.** Two words leave nothing to pick out, and §8's `أسئلة شائعة` /
`Common questions` is the existing precedent for a plain head on this page, so this is not a new
treatment.

**Deleted, not rewritten, and the build enforces it.** `t.work.lead` and `t.work.source` no longer
exist in `data.mjs`, and `render.mjs` no longer emits the two `<p>` elements. Re-adding either markup
line throws rather than quietly printing `undefined`. `.work-source` came out of `styles.css`; no other
selector used it. The derivation did not disappear — it is still reproduced row by row in `copy.md`'s
Section 7 derivation table, which is the record. It is not copy and it does not go on the page.

**The one spacing change, and it is spacing, not replacement copy.** `.work-slider` carried
`margin-block-start: 40px`, which is §5.3's measured **subhead → cards** gap. With no subhead the
headline would have sat 40px off the cards while every other section keeps a subhead's worth of air under
its head. It is now the two measured rhythm gaps the subhead used to sit between, **28 + 40 = 68**,
written `clamp(40px, calc(68/14.4 * 1vw), 72px)` so the old 40 is kept as the phone floor and the 390
layout does not move. Measured on the built page: **68px at 1440 and 40px at 390, both locales.**

### 28.3 §5 "What is included" is deleted entirely

> "the what's included section is not needed because the one above it is what we present, which is the
> same thing. So remove that. What we present, immediately what follows is the how we work."

The overlap is real: §4's three blocks already say build it, get it found, keep it growing, and the six
items under §5 were the same promise itemised.

| Removed | From |
|---|---|
| `included()` renderer, the whole `<section id="included">` | `src/render.mjs` |
| `included(t)` from the home page body, and from the import list | `build.mjs` |
| the `included` copy block, **both locales** | `src/data.mjs` |
| `#included` and `#included .lead` | `src/styles.css` |

**Nothing else came out, and that is deliberate.** `.icons-grid`, `.icon-card`, `.icon-card.compact`
and the two responsive rules that collapse the grid to 2 then 1 column all **stay**: offer B2's rows and
the About page's `#deliver` grid use them. **The six icon files stay referenced too** — `ICONS` is still
imported by `render.mjs` and still read by `offerIncluded()` and `aboutDeliver()`, so not one of
`icon-website-build`, `icon-service-area-pages`, `icon-google-visibility`, `icon-ai-visibility`,
`icon-backlinks-authority` or `icon-hosting-security` became unreferenced. Nothing was deleted from
disk. **Checked, not assumed:** `#included` appears **zero** times in the built `site/`, and there is
no `href="#included"` anywhere in the output or in the source — there never was one, so no navigation,
anchor or sitemap entry had to be repaired.

**The band rhythm, read off the built page.** This is the thing a section removal breaks, so it was
measured rather than reasoned about, both locales:

| Section | Computed background | |
|---|---|---|
| hero | `rgb(242, 243, 245)` | light |
| problem | `rgb(254, 254, 254)` | light |
| what-we-do | `rgb(242, 243, 245)` | light |
| **journey** | `rgb(16, 16, 18)` | **DARK — break 1** |
| work | `rgb(254, 254, 254)` | light |
| pricing | `rgb(254, 254, 254)` | light |
| faq | `rgb(244, 245, 246)` | light |
| **final** | `rgb(16, 16, 18)` | **DARK — break 2** |
| footer | `rgb(3, 3, 3)` | the close |

**light · light · light · DARK · light · light · light · DARK**, which is exactly the rhythm §27.9
locked and what `lessons.md` asks for: one or two dark breakers, never an alternating stripe. §5 was a
light `#FEFEFE` band between two other light bands, so removing it took nothing out of the rhythm — the
page lost a light band from a run of four and kept a run of three.

### 28.4 The client wall: three new clients and one replaced logo. Fourteen cards

**The three new cards carry the tag, and that is a measured fact, not a judgement.**
`alamana-kw.com`, `tasleekq8.com` and `skyscraperkw.com` are live (all three return 200). A
`sites.list` call through the same service account `.claude/skills/report/scripts/lib.js` uses, made
2026-10-01, returned **thirteen** accessible properties: the twelve already in `proof-data.md` plus
`israelsupportindex.com`. **None of the three is among them.** With no accessible property there is no
complete month to sum, so each takes `مشروع جديد` / `New project`. Nothing was estimated, inferred from
a sibling client or carried across. When a property is shared with the service account, its rows go into
`proof-data.md` first and the figure follows from `WORK[].impressions` like everyone else's.

`mashame3.com`'s plate was **replaced**, not added. Ahmad: the old one "is just a big icon without the
company name, so it doesn't align with the rest" — §20.1 had taken it from the live site's
`/favicon.svg`, a bare blue snowflake with no wordmark, and it was the one plate in the set that did not
name its client.

**Order on the wall is unchanged in rule and in result:** figure cards descending, tagged cards after.
Read off the built page, both locales: kuwaityclean, carwashkw, q8carwash, kwtclean, kwcarwash,
movingcompanykw, mashame3, then betikcleaner, anharpest, alghadeerclean, ragwaclean, alamana-kw,
tasleekq8, skyscraperkw. **Seven figures, seven tags.**

#### The four plates were derived by §20.2's rules, and the script was proved before it was trusted

§20.2 and §22.3 describe the derivation but no script survived, so one was written and is now
kept in the repo at `clients/q8block/scripts/logo-plate.mjs` — the first two passes left nothing behind
and this one should not. It was rewritten — and then **run
against three already-shipped v2 sources to see whether it reproduced §22.3's table before it was
allowed near a new logo.** The first version did not: it came out 817 where the table says 847, 867
against 889, 722 against 754. Widths matched exactly, heights did not, which located the fault in the
re-pad rather than the trim.

**The rule §22.3 does not spell out: the 7% re-pad is ONE value for all four sides, computed from the
LARGER ink dimension, each side still capped by what was actually trimmed off it.** Not 7% of each axis
separately, which is the obvious reading and is wrong. Reverse engineered from the shipped plates and
confirmed on three independent sources. With it, the script reproduces §22.3 **exactly, to the kilobyte**:

| Check source | §22.3 says | Script returns |
|---|---|---|
| `v2-carwashkw.com.png` | ink 1024x847, placed 337x279, 13.5 kB | ink 1024x847, placed 337x279, 13.5 kB |
| `v2-kwtclean.com.png` | ink 1024x889, placed 329x286, 9.4 kB | ink 1024x889, placed 329x286, 9.4 kB |
| `v2-ragwaclean.com.png` | ink 970x754, placed 348x270, 10.4 kB | ink 970x754, placed 348x270, 10.4 kB |

Only then were the four derived, by the same path: trim against the source's own corner colour
(tolerance 12), re-pad as above, scale by **equal optical area** `k = sqrt(0.44 x 640 x 334 / inkArea)`
clamped to 614x307, centre on the shared **640x334** transparent canvas, WebP `quality 86,
alphaQuality 100, effort 6`.

| Site | Source | Ink box after trim | Ratio | Placed in 640x334 | kB |
|---|---|---|---|---|---|
| alamana-kw.com | `v2-alamana-kw.com.png` | 1024x907 | 1.13 | 326x289 | 13.2 |
| tasleekq8.com | `v2-tasleekq8.com.png` | 1024x891 | 1.15 | 329x286 | 12.9 |
| skyscraperkw.com | `v2-skyscraperkw.com.png` | 1024x908 | 1.13 | 326x289 | 7.2 |
| mashame3.com | `v2-mashame3.com.png` | 1024x967 | 1.06 | 316x298 | 13.1 |

All four sources are 1024x1024 opaque dark-on-near-white lockups, the same build as the v2 set, so none
needed §20.3's dark-ground composite. **Every one of the fourteen `<img>` still carries the same
explicit `width="640" height="334"`**, which is why fourteen logos still cannot move the layout.

#### Everything else about the section is untouched, and was re-measured because the card count changed

| Behaviour | Result, both locales at 1440 |
|---|---|
| Cards in the track | 28 = **14 real + 14 clones** |
| Clones | all 14 `aria-hidden="true"` and `tabindex="-1"` |
| Outbound links | 14/14 `rel="nofollow noopener"` `target="_blank"` |
| Plates loaded | 14/14, every `naturalWidth` 640, none empty |
| Track geometry | step 448, `scrollWidth` 12520, `clientWidth` 1320, `loopLen` 6272 |
| Auto-advance, 60s untouched, cursor parked at 20,20 | `/en/` `0 → 448 → … → 5824 → 0`; `/` the RTL mirror, negative. **No rewind value between 5824 and 0** |
| Page errors | none |

### 28.5 Verification

**Screenshots were looked at, not just taken.** `#work` and `#pricing` at 1440 and 390 in both locales,
eight crops. The carousel shows three cards at a time, so a ninth and tenth capture were made with the
clones removed and the track forced to a 4-wide grid, putting **all fourteen real cards on one image per
locale**. Every card shows a legible logo that names its client; **none is empty**, which was the defect
§20 existed to remove and the thing three new plates could have reintroduced.

| Check | Result |
|---|---|
| `#included` in built output | **0 occurrences**, both locales. No `href="#included"` anywhere |
| `#work` `.lead` / `.work-source` in the DOM | **false / false**, both locales |
| Section order | `hero > problem > what-we-do > journey > work > pricing > faq > final`, both locales |
| Band order | light · light · light · **DARK** · light · light · light · **DARK** (§28.3) |
| Headline → cards gap, §7 | 68px at 1440, 40px at 390, both locales |
| `node scripts/seo-audit.mjs` | **0 high**, 18 medium, 9 low — identical to §27.11's baseline, nothing new |
| **First-screen budget (§15.1), re-verified** | 1440x900 → first screen **900**, `#problem` top **900** · 1920x1200 → **1200 / 1200** · 390x844 → **844 / 844**. Both locales at all three. Exactly one viewport, unchanged |
| Horizontal overflow | false at 1440 and 390, both locales |
| Page errors | none, any viewport, either locale |

**Lighthouse, real Chrome against `http://localhost:8823`:**

| Page | Preset | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | desktop | **100** | **100** | 100 | 100 | 0.4s | 0ms | **0** |
| `/en/` | desktop | **100** | **100** | 100 | 100 | 0.5s | 0ms | **0** |
| `/` | mobile, 3 runs | 100 / 97 / 96 | **100** | 100 | 100 | 1.7–1.8s | 0–230ms | **0** |
| `/en/` | mobile, 3 runs | 98 / 99 / 99 | **100** | 100 | 100 | 1.7–1.8s | 80–120ms | **0** |

Zero accessibility audit failures on every run. **CLS is 0 everywhere**, with fourteen runtime-appended
clones, because every plate has a fixed `aspect-ratio` and every logo the same explicit width and height.
The mobile performance spread is TBT noise on a loaded machine — LCP and CLS are stable across all six
runs, and the three added cards are `fetchpriority="low"` images, which cost bytes, not main-thread time.

### 28.6 What was deliberately not done

* **The six deliverable icons were not deleted and not unreferenced.** They are still used twice (§28.3).
* **No figure was invented for the three new clients.** §28.4.
* **No new copy was written anywhere.** Four lines were cut and two were shortened; nothing was added to
  fill the space either left behind. The only replacement for deleted text is one spacing value (§28.2).
* **`compare.mjs` and the full `shots.mjs` sweep were skipped.** §7 diverges from its board by design
  (§20.5) and §7b is built to `pricing-light.png`, whose layout did not move — only two headlines, two
  leads and a card count changed, and §5's removal touches no board at all. The first-screen budget, the
  one thing a section removal could not break but is cheap to prove, was re-measured anyway.

**Nothing in this pass was committed, pushed or deployed.** The local server on 8823 is left running.


## 29. §4 gets an auto-sliding strip of Search Console shots, 2026-10-08

Ahmad: a slideshow in the "what we do" section, under the lead, above the three blocks; two new projects carry a "new project" stamp; one slide every 2 seconds, never swiping back to the start.

* **Sources** `design/proof-shots/slideshow/{ss1..ss4,new1,new2}.png`, untouched. `derive-slideshow.mjs` converts to `src/img/slide-*.webp` at native size (q92, no crop or retouch; 24 to 45 kB each). Order `ss1, new1, ss2, ss3, new2, ss4`.
* **Frame** one uniform 960x417 (2.3:1) slide, image `object-fit: contain` on white with the site hairline. The tallest shot (ss2, 2.28:1) fits with no crop. Explicit width and height on every image. `fetchpriority="low"` and `decoding="async"`, never lazy.
* **Stamp** HTML/CSS on `new1` and `new2` only: `#FF5F29` fill, `#141415` text and 2px border (6.07:1), 800 weight, rotated -7deg, pinned at the physical top right (`right`, not `inset-inline-end`) under the Daily dropdown, clear of the tiles and the chart. Sized in `cqw` with a 10px floor. Arabic letter-spacing is 0 so the letters join.
* **Behaviour** (`src/app.js`, function `strip`, own names) `overflow: hidden` frame, flex track moved by `translate3d`, 560 ms ease, one step per 2000 ms. The six slides are cloned once (clones `aria-hidden`, empty alt); after the step onto the first clone the track jumps with no transition to slide one. RTL starts at the right edge and moves left. 2 slides visible at 768px and up, 1 below. Pauses on `mousemove` (not `mouseenter`), focus within, hidden tab, and off screen (IntersectionObserver threshold 0). `prefers-reduced-motion`: no clones, no timer, static row that scrolls sideways, frame focusable.
* **Measured** (headless Chrome, cursor parked, 250 ms samples, 1440): en `0 -20 -564 -672 ... -1344 ... -2016 ... -2688 ... -3360 ... -4025 0 -20 -564 -672`; ar the same with positive signs. One step per 2 s, one direction, wrap 4032 to 0 with no backwards step. Frame screenshot just before and just after the wrap is byte identical in both locales. Reduced motion: nothing moves over 6 s.
* **Gates** first screen 900/900, 1200/1200, 844/844 both locales; seo-audit 0 high; site-audit 0 failing; Lighthouse `/` and `/en/` performance 100, accessibility 100, CLS 0.
* **Flag** `new1.png` has a hover tooltip ("Friday, Sep 4 ... add an annotation") across the chart; shipped as exported.

## 30. §7b rebuilt to `pricing-v2-A.png`: a size switch and three packages, 2026-10-08

Ahmad picked **A** of three boards. **`design/boards/pricing-v2-A.png` is the board.** `pricing-v2-B.png`,
`pricing-v2-C.png` and `pricing-v2-options.png` are **DEAD boards**, as are `pricing-light.png` and
`pricing-dark.png` (§27). The board's lettering is a generated render (one malformed letter in
"Dominate"); real type is set in Alexandria. This section supersedes §27.3 to §27.8: the plans no longer
differ by company size alone, the `.plan-size` line is gone, and `.plan-features` is live.

### 30.1 What the section is now

Eyebrow `الأسعار` / `PRICING`, headline `اختر خطتك` / `Choose your plan.` (plain, no highlight), **no lead**
(the board draws none; the old lead was deleted), a centred three-pill switch, three cards. Each card:
muted tag (`x1` / `x3` / `x10`), bold name, very large price with a muted period, hairline, three check
lines, the site's call button (`اتصل الآن` / `Call now`, `tel:`). The middle card is weighted by a 6px
orange top edge and nothing else. No offer, no link to `/offer/`, no badge.

### 30.2 The nine prices (locked by Ahmad), per month (currency: SAR since §34; the USD below is SUPERSEDED)

| Package | Tag | Small | Medium | Large |
|---|---|---|---|---|
| باقة الحفاظ / Maintain | x1 | $997 | $1,997 | $2,997 |
| باقة التوسع / Expand | x3 | $2,497 | $4,997 | $6,997 |
| باقة السيطرة / Dominate | x10 | $4,997 | $9,997 | $15,997 |

SUPERSEDED by §34 (the prices are Saudi riyals): currency was never stated; dollars were assumed. It lives in ONE place: `money()` in `src/data.mjs`, next
to the `PKG` table. The offer's `P` figures ($500 / $1,000 / $1,500) are untouched (§30.6).

### 30.3 The switch

Native radios, no script. `render.mjs` emits a `<fieldset class="psw">` (visually hidden legend `حجم شركتك` /
`Your company size`) holding three `name="psize"` radios, each followed by its `<label class="psw-pill">`.
The inputs are visually hidden; the labels are the pills. Radio-group semantics, arrow-key movement and
the checked state come from the browser. Every card carries all three amounts (`.pa-s/.pa-m/.pa-l`);
`styles.css` shows the checked one with `#pricing:has(#psize-m:checked)`. `Small` is `checked` in the HTML,
so with JS off (or without `:has()`) the Small prices show and are correct. All three amounts share one
line box, so a card's height never changes with the size. The price caps itself at `20.5cqi` of the card
(`container-type: inline-size`), so `$15,997` and the period never wrap. Focus ring: 3px `--orange` outline,
3px offset, on the pill.

### 30.4 Measurement table, `pricing-v2-A.png` (board px × 0.5357 = CSS px at 1440)

| Element | Board px | CSS at 1440 | Built as |
|---|---|---|---|
| pills | 231 / 250 / 230 × 89 | 123 / 134 / 123 × 47 | intrinsic, padding 36, `min-height: 47px`; built 123 / 146 / 122 × 47 |
| pill gap | 13 | 7 | `gap: 7px` |
| pill label | 82 × 24 (`Small`) | ~17px / 600 | `clamp(15px, 17/14.4vw, 19px)`, 600 |
| selected pill | near-black fill, white | | `--ink` fill, `#fff` |
| other pills | 2px `#D5DAE1` outline | 1px | `1px solid var(--hairline-light)` |
| headline ink → pills | 345 → 380 | 19 | `.psw` margin `clamp(18px, 20/14.4vw, 22px)` |
| pills → cards | 467 → 541 | 40 | `.plan-row` margin `clamp(28px, 40/14.4vw, 44px)` |
| card span / gap | 118 → 2571 / 37 | 1314 / 20 | 1320 `.wrap` / `clamp(14px, 20/14.4vw, 22px)` |
| card height | 541 → 1405 | 463 | content-derived: **544** `/en/`, **512** `/` (see 30.5) |
| middle edge | 533 → 545, `#F6A386`… `#FD5926` | 6.4 | `border-top-color: --orange` + `inset 0 5px 0` = 6px, no height change |
| tag `x1` | 37 × 32 | ~24px | `clamp(16px, 24/14.4vw, 26px)` / 500, `--muted-on-light` |
| name `Maintain` | 351 × 68 | 36 cap → ~44px | `clamp(28px, 44/14.4vw, 48px)` / 800 (Arabic 34px) |
| price `$997` | 329 × 123 | 176 × 66 → ~68px | `min(clamp(44px, 68/14.4vw, 74px), 20.5cqi)` / 800, `--ink` |
| price → `/month` | 14 | 7.5 | `gap: 8px`, baseline aligned |
| `/month` | 128 × 31 | ~18px | `clamp(14px, 18/14.4vw, 20px)` / 400, muted |
| price → hairline | 871 → 923 | 28 | margin 27 |
| hairline → check 1 | 923 → 981 | 31 | padding 27 (ink measured 30) |
| check lines | 33 tall, pitch 80 | 16 to 17px, pitch 43 | `clamp(15px, 16/14.4vw, 18px)`, lh 1.35, gap 20 |
| check icon | 37 × 25, orange | 20 × 14 | inline SVG background, 20 × 15, text at 40 |
| button | 679 × 108 | 364 × 58 | full width, built 56 tall |
| button → card foot | 1355 → 1405 | 27 | padding 42 (override) |

Built ink offsets inside card 1 at 1440 `/en/`, minus the 38px extra top padding, against the board: tag
28 (28), name 55 (52.5), price 113 to 182 (111 to 177), hairline 209 (205), check 1 239 (236), button 56
tall (57). Type was sized by rendering Alexandria on a canvas and solving each board glyph box for height
and width; the board lettering is wider than Alexandria, so sizes sit between the two solutions.

### 30.5 Approved overrides and what still differs

1. **Card padding stays 66/40/42 at 1440 (40/24/32 on a phone)**, against the board's ~28/32/26. Ahmad,
   2026-10-01: the content was "just stuck to the upper section border". Approved override.
2. **Grey text uses `--muted-on-light` (#686F79, 5.03:1)**, not the board grey (~#8B909F / #95949A,
   about 2.3 to 3:1 on white). Tag, period and check lines.
3. **Eyebrow and h2 keep `--fs-eyebrow` and `--fs-h2`**, as in §27.6.
4. **Cards are ~80px taller than the board at 1440** (544 vs 463): 54 of it is override 1, the rest is
   real Alexandria wrapping "Compete with the strongest companies in the market" to two lines in a column
   the side padding override narrowed. Buttons still share one baseline.
5. **The Medium pill is 12px wider** (Alexandria is wider than the board's lettering).
6. **The period follows the price horizontally** when the size changes (`$997` to `$2,997` pushes
   `/month` right). Nothing moves vertically; card heights are identical across sizes.

### 30.6 The old figures, deliberately left

Ahmad has not said what the offer becomes under the new prices, so these still carry the OLD figures and
were not touched: the homepage §2 offer strip (`$500` paid once), and `/offer/` and `/en/offer/`: meta
title and description (`500 دولار` in Arabic), B1 lead, B1b anchor (`from $500 per month`) and offer row,
B2 intro, B2b caption, B4, B5 tiers (`$500 / $1,000 / $1,500`), offer FAQ Q1, Q2, Q3 and Q6.

### 30.7 Verification

| Check | Result |
|---|---|
| Nine prices, by clicking each pill in headless Chrome, both locales, 1440 and 390 | all nine match 30.2 |
| No JS | Small prices shown, both locales |
| Keyboard | arrows move the checked radio and the prices follow; focus ring 3px solid |
| Card heights across sizes | 544/544/544 `/en/`, 511.5 ×3 `/` at 1440; unchanged by size at 390 |
| Overflow, 1440 and 390 | none; switch one row at 390 (EN 85/105/84, AR 109/126/98, all 46 tall) |
| Band order | hero, problem, what-we-do, journey DARK, work, pricing, faq, final DARK |
| First screen 1440x900, 1920x1200, 390x844, both locales | unchanged (900, 1200, 844) |
| `node scripts/seo-audit.mjs` | 0 high, 18 medium, 9 low (pre-existing) |
| `ops/firstload/site-audit.mjs` | 0 failing pages |
| Lighthouse `/en/` and `/` | perf 100, accessibility 100, best practices 100, SEO 100, CLS 0 |

Nothing committed, pushed or deployed.

## 31. §6 becomes the monthly report: four live pages to `report-A.png`, 2026-10-08

Ahmad: "lets redo the how we work section completely, remove everything. instead, i want to show a report",
picked **A** of three boards (`report-B.png`, `report-C.png`, `report-options.png` are DEAD), then "lets add 4
pages, the 2 extra are the keyword page and traffic page." This supersedes §26.1 and §21.2 for §6.

### 31.1 What the section is now

`<section id="report" class="sec on-dark">` (renamed from `journey`; `scripts/compare.mjs` and `scripts/shots.mjs`
updated). Eyebrow, h2 with the `.hl` block on the last words, then `ul.rp-grid` of four `article.rp-card`, each
with an `h3` label and a caption carrying the report's page number (1, 2, 4, 5). Deleted: subhead, graph,
`.journey-*` rules, the three beat icons (files stay on disk, unreferenced by the homepage; `proof-kwtclean-gsc.webp`
is still used by `/offer/`), the Call/WhatsApp pair.

### 31.2 Data path, no hand-typed numbers

`scripts/derive-report.mjs` parses `ops/reports/kwtclean/2026-09.html` (pages 1, 2, 4, 5) into `src/report.json`.
It asserts the split adds up to the total, each service row's calls + WhatsApp = total, and the traffic panels
count is four. **The daily series is not stored in the report as numbers**, only as the chart's SVG path; the
script recovers it from the path (baseline y=196, peak marker = 27 visits, day 1 at the right) and refuses any
point that is not a whole visit count. The 30 recovered values sum to **525**, the report's click total, so the
chart is real. `render.mjs` `report()` reads the JSON; labels live in `data.mjs` `report` (ar/en).

### 31.3 Frame and layout

| Element | Board px | CSS at 1440 | Built |
|---|---|---|---|
| page width / gutter | 880 / 43 (2000 view) | 634 / 31 | 644 / 32 (1320 wrap) |
| page height | 730 | 526 | 564 (rows equal per grid row) |
| header strip | 93 | 67 | min-height `clamp(52px, 10.4cqi, 67px)`, `#000` |
| Q8 box | 58 x 53 | 42 x 38 | `clamp` to 42 x 38 |
| page border | lighter hairline | 1px | `1px solid #3B3E45` on `#17181B`, band `#101012` |
| label | ~20px orange 600 | | `clamp(17px, 3.1cqi, 20px)` |
| 88 | 152 cap px | ~152px | `min(23.6cqi, 152px)` / 800 (82px at 390) |
| "conversions" | | ~52px | `clamp(28px, 8.1cqi, 52px)` / 700 |
| split bar | 17 | ~10 | 10px, 64/36 widths from the JSON |
| 56 / 32 | 65 cap | ~65px | `clamp(44px, 10.1cqi, 65px)`, columns 56fr / 44fr |
| service row pitch | 64 | 46 | min-height 46, hairline `#34373E` |
| row count | | ~30px / 800 | `clamp(22px, 4.7cqi, 30px)` |

Every page is `container-type: inline-size`, so type scales with the page, not the viewport. 2 x 2 at 768 and up
(DOM order 1, 2, 4, 5, so page 1 sits at the right in Arabic); one column below 768. Under a 480px page
(`@container`) the call/WhatsApp line drops under the service name and the four traffic figures stack.
Keywords are hard-cornered tags (1px `#4A4E57`, first one orange). Traffic chart: inline SVG, `viewBox 0 0 600 120`,
`preserveAspectRatio="none"` with `vector-effect: non-scaling-stroke`, flat 16% orange fill, the peak dot an HTML
span so it stays round; mirrored for Arabic (day 1 at the right, as in the report). `role="img"` with a label.

### 31.4 Motion

`app.js` (report bars): if IntersectionObserver exists and reduced motion is off, adds `rp-anim` (segments
`scaleX(0)`), then `rp-in` once on first intersection (`threshold: 0`), 0.9 s, the call segment 0.35 s later.
Transform only. Without JS or under reduced motion the bar is drawn full.

### 31.5 What differs from `report-A.png`

1. A muted call/WhatsApp line in each service row, where the board draws a decorative leader line (Ahmad's spec).
2. Pages are 38px taller than the board (564 vs 526): real Alexandria line heights.
3. Header tag uses a middle dot, not the board's dash (no dashes in copy).
4. Pages 3 and 4 have no board; they reuse the frame and type scale. Page 3 has spare space at its foot at 1440
   because grid rows are equal height.

### 31.6 Verification

| Check | Result |
|---|---|
| Data, both locales, headless Chrome against the report HTML parsed independently | 45/45 pass: 88, 56, 32, 64/36, 8 rows with call/WhatsApp splits, 12 keywords in order, 525, 29,797, 14 / 27, 500 to 600, 30 chart points; no dashes, no (إنجليزي), no ترتيب/rank in the section |
| Board compare at 1440 | 2 passes (second moved the 56/32 columns to 56/44) |
| Overflow 1440 and 390, both locales | none; no element outside its page |
| Band order | hero, problem, what-we-do, report DARK, work, pricing, faq, final DARK |
| First screen 1440x900, 1920x1200, 390x844, both locales | unchanged (900, 1200, 844) |
| `node scripts/seo-audit.mjs` | 0 high, 18 medium, 9 low (pre-existing) |
| `ops/firstload/site-audit.mjs` | 0 failing pages |
| Lighthouse `/en/` and `/` | perf 100, accessibility 100, best practices 100, SEO 100, CLS 0 |

Nothing committed, pushed or deployed.

## 32. The offer page takes the locked package pricing, the hero H1 becomes option 9, and the report label, 2026-10-08

### 32.1 Offer pricing

Ahmad confirmed the nine §30 package prices are the offer page's real prices ("the ones you used were the
real things"). The offer itself is unchanged: **$500 one time covers the first six months**. Changed:

| Where | Was | Now |
|---|---|---|
| B1b anchor | from $500 per month | **from $997 per month** / يبدأ من $997 شهريًا, computed as `Math.min` of `PKG` in `src/data.mjs` (`P.from`, `FROM_EN`, `FROM_NUM`) |
| Offer meta description, ar / en | 500 دولار شهريًا / from $500 a month | 997 دولار شهريًا / from $997 a month (same computed figure) |
| B5 | three tiles $500 / $1,000 / $1,500 per month | three package boxes (name, x1 / x3 / x10, then Small / Medium / Large rows with the price, then the unit), rendered by `offerAfter()` from `t.pricing.plans` and `t.pricing.sizes`, the homepage §7b data. No check lines, no "most popular" |
| B5 intro | ...خطة شهرية من ثلاث... | ...باقة شهرية من ثلاث... plus `الأسعار أدناه شهرية، ولا تبدأ إلا بعد انتهاء الأشهر الستة.` / `The prices below are monthly and only start once the six months are over.` so the $500 can never read as a monthly or package price |
| B5 note 1 | كل خطة / each plan | كل باقة / each package |
| FAQ Q1, Q6 | quoted $500 / $1,000 / $1,500 | anchor from $997; three packages priced by company size (Q6 names them) |

Q2 and Q3 quoted only the one-time $500 and were left as they were. `P.month`, `P.t2`, `P.t3` are deleted;
`money()` and `PKG` moved above `P` so the offer reads the same data as §7b. Not touched: the $500, the
homepage strip, eligibility, B4, countdown, seats, proof graph and caption, the offer H1, homepage §7b.

CSS: `.tier-pkg` and children (`.tier-head`, `.tier-name`, `.tier-tag`, `.tier-sizes`) restyle the existing
`.tier` (same border, dark ground, orange numerals); prices step to `clamp(26px, 34/14.4vw, 38px)` so three fit
a box. At 999px and below the boxes stack and keep their stacked inside (`.tier.tier-pkg` overrides the old
row-flow tile rule). Prices are LRI/PDI isolated in Arabic, read left to right.

### 32.2 Hero H1, option 9

Arabic H1 `تبي عميلك <span class="hl">يلقاك</span><br class="brk"> في جوجل وفي الذكاء الاصطناعي؟` (was
`تبي عملاءك يجدونك ...`). Gulf colloquial on purpose; do not correct to MSA. English unchanged. The H1 is not
quoted in any title, meta, Open Graph, JSON-LD or `llms.txt` (checked), so nothing else changed. The Arabic
highlight rule (1.66em at 21%, §9 / §24) holds for `يلقاك`: the ل ascender and the ي dots both sit inside the
block (dots about flush with the bottom edge, inside the measured 0.57em descent budget), nothing clipped.

### 32.3 Report label

`REPORT_LABEL = 'clean.com'` (render.mjs, director's edit). Rendered `CLEAN.COM` on all four report pages on
`/` and `/en/`; no `kwtclean` and no `SEP 2026` left inside `#report`.

### 32.4 Verification

| Check | Result |
|---|---|
| Price sweep (`/`, `/en/`, `/offer/`, `/en/offer/`, terms both, `llms.txt`; text, JSON-LD, meta) | every `$` figure is the $500 one-time offer, the from $997 anchor or one of the nine; no $1,000, no $1,500, no "from $500 per month" |
| Offer anchor + B5 at 1440 and 390, both locales | looked at; legible, no overflow (0 elements outside the viewport), stacks at 390 |
| H1 lines | 2 at 1440 and 1920 (`تبي عميلك يلقاك / في جوجل وفي الذكاء الاصطناعي؟`), 3 at 390 |
| First screen, `#problem` top | 900 / 1200 / 844 at 1440x900, 1920x1200, 390x844, both locales; hero scroll 0, page scroll-x 0 |
| `node scripts/seo-audit.mjs` | 0 high, 18 medium, 9 low (pre-existing) |
| `ops/firstload/site-audit.mjs` | 0 failing pages |
| Lighthouse `/offer/`, `/en/offer/` | perf 100, a11y 100, BP 100, SEO 100, CLS 0 |

Nothing committed, pushed or deployed.

## 33. The offer is free again, and the homepage mentions it in the strip only, 2026-10-08

Ahmad: "we had an offer for $500 for six months. We're going to change that. It was absolutely free... The
only place it should mention is just the banners because it's temporary." Prices after the six months are
unchanged (the nine packages, anchor from $997). Copy is in `copy.md` Part B (the 2026-10-08 block at the top),
§2, §8, §10 and the price register; Terms in `copy-pages.md` T5.

### 33.1 What changed

| Where | Was | Now |
|---|---|---|
| §2 strip line | ستة أشهر بـ$500 مرة واحدة / 6 months for $500, paid once | **ستة أشهر مجانية / Six months free**. The long form "...لشركات الخدمات / ...for service companies" was built and measured first: 4 rows at 390 en (139.6px), so shortened per the brief |
| Offer meta, B1 subhead, B2 intro, B2b caption | "one payment of $500..." | "first six months free" wording, no figure |
| B1b offer row | $500 one time, covers six months | ستة أشهر مجانًا / free for six months. Anchor row unchanged (computed from $997) |
| B1b note | "One payment, not monthly..." | deleted; `priceAnchor()` now prints the note only if `price.note` is set (it is not) |
| B4 | one payment, nothing further due | no contract, no commitment, no fee, stop at any time |
| B5 intro | packages or stop | three choices: a package (priced by package and size), keep the site live for a small monthly fee, or stop. Boxes unchanged |
| B6 FAQ | Q1 "Is the $500 per month?", Q2 "Why is it $500?", Q3 paid | Q1 "Why is this free?" (no "per city"), Q2 "Do I pay anything during the six months?", Q3 no contract/no fee; Q6 the three choices; Q4, Q5, Q7 unchanged |
| `src/data.mjs` | `P.six = ltr('$500')` | deleted, so `$500` cannot come back through `P` |
| Homepage FAQ Q2, Q5 | pointed at the offer page / limited offer | sentence cut; answers otherwise unchanged |
| Footer (all pages) | 4 columns, "العرض / The offer" = offer + terms | 3 columns: terms moved into Company. `footer()` puts the NAP in the LAST column (was `cols[3]`); `.footer-top` desktop grid `minmax(240px,1.4fr) repeat(3,1fr)` |
| Terms T5 (both) | "what it costs and how it is paid" | "what the six free months cover"; last updated 8 October 2026 |

Not touched: hero, §7b pricing, report, slideshow, clients carousel, the offer H1, countdown, seats, eligibility,
included items, proof graph, final call. `llms.txt` still lists the offer page among the site's pages (an index,
not offer copy) and the 404 keeps its existing offer link; neither is the homepage.

### 33.2 Verification

| Check | Result |
|---|---|
| Sweep `/`, `/en/` (text, meta, JSON-LD, footer) for $500, free/مجان, six months/ستة أشهر, limited offer, عرض, offer, /offer, countdown, seats | **0 hits outside `#offer-strip`**; the strip's link is the only route to `/offer/` from the homepage |
| `$500` / `500 دولار` / paid once / one payment across the whole built site | 0 (remaining دفعة واحدة / مرة واحدة hits are "at once" in blog prose and the about page, unrelated) |
| `$` figures left | `$997` anchor and the nine package prices only (offer ar meta `997 دولار`) |
| Strip rows | 1 at 1440 and 1920 both locales (band 78 / 79px); 390: ar 3 rows (114.8px), en 2 rows (90px); line on the pill row everywhere |
| First screen, `#problem` top | 900 / 1200 / 844 at 1440x900, 1920x1200, 390x844, both locales; no horizontal scroll |
| Offer top + footer, 1440 and 390, both locales | looked at: anchor reads "from $997 per month" over "free for six months", no note; footer three columns, no offer link |
| `node scripts/seo-audit.mjs` | 0 high, 18 medium, 9 low (pre-existing) |
| `ops/firstload/site-audit.mjs` | 0 failing pages |
| Lighthouse `/`, `/offer/` (desktop config) | perf 100, a11y 100, BP 100, SEO 100, CLS 0 |

Nothing committed, pushed or deployed.

## 34. Prices in Saudi riyals, the report value in riyals, and the x1 / x3 / x10 pills, 2026-10-08

Ahmad: "1 thing to change in report is swap KD with its saudi reyals value. also my pricing is Reyal Saudi
not usd for the pricing." Then: "also the x1 x3 x10 make them pop". The nine figures and the "from the
lowest of the nine" anchor are unchanged; only the currency changed.

### 34.1 Currency in one place

`src/data.mjs` now holds a `CUR` block (`code: 'SAR'`, `ar: 'ر.س'`, `arWord: 'ريال سعودي'`, and the unit
lines `ر.س شهريًا` / `SAR / month` / `SAR per month`) and `money(n, lang)` (`997 SAR` / `997 ر.س`).
`pkgPrices()` returns bare numerals; the anchor (`FROM_AR`, `FROM_EN`, `FROM_META_AR`) is still
`Math.min` of `PKG`. Abbreviations only: the new riyal sign U+20C1 has no glyph in Alexandria.

| Where | Before | Now |
|---|---|---|
| §7b cards | `$997` big, `/month` / `شهريًا` small | `997` big and bare, unit `SAR / month` / `ر.س شهريًا` |
| Offer B1b anchor | from $997 per month | from 997 SAR per month / يبدأ من 997 ر.س شهريًا |
| Offer B5 boxes | `$997` ... per month / شهريًا | `997` ..., unit `SAR per month` / `ر.س شهريًا` |
| Offer FAQ Q2 (and its FAQPage JSON-LD) | $997 | 997 SAR / 997 ر.س |
| Offer meta description | 997 دولار / $997 | 997 ريال سعودي / 997 SAR |

**Bidi.** The isolate was only needed because a sign BEFORE the digits was a neutral and flipped in Arabic.
With the currency after the number the digits resolve to Arabic-Number, keep their order (`1,997` intact)
and `ر.س` follows them. Checked in headless Chrome: the anchor reads `يبدأ من 997 ر.س شهريًا` correctly
at 1440 and 390. Sentence prices carry no isolate now; `ltr()` stays for the x labels only.

### 34.2 Report estimated value

`render.mjs`: `KWD_TO_SAR = 12.2` (set 2026-10-08: 1 KWD about 3.26 US, riyal pegged at 3.75, 3.26 x 3.75
about 12.2) and `toSar()` rounds to the nearest 100. `report.json` keeps 500 / 600 KWD as derived, so
re-running `derive-report.mjs` cannot undo it. Prints `6,100 إلى 7,300 ر.س` / `6,100 to 7,300 SAR`.
Label and line under it unchanged; no other report figure touched.

### 34.3 x1 / x3 / x10 pills

`.xtag`: the site's pill (100px radius, as `.strip-pill`), weight 800, ink `#141415` on `#FF5F29`
(6.07:1), `--pl-tag` size on the cards (64 / 69 / 81 x 40px at 1440, 43 / 46 / 54 x 27 at 390) and
`--fs-strip` in B5, beside the package name. Identical on all three; the middle card's only weighting
stays the orange top edge. `dir="ltr"`. Card padding from §27 and §30 untouched.

### 34.4 Verification

| Check | Result |
|---|---|
| Click Small / Medium / Large, both locales, 1440 and 390 | 997 / 2,497 / 4,997; 1,997 / 4,997 / 9,997; 2,997 / 6,997 / 15,997, unit on every card; 8px numeral-to-unit gap, unit inside the card |
| Card heights, 1440 | ar 542 / 542 / 542, en 574 / 574 / 574 for all three sizes (at 390 the cards stack) |
| Offer anchor + B5, both locales, 1440 and 390 | anchor "from 997 SAR per month" / "يبدأ من 997 ر.س شهريًا"; B5 nine prices match, no box overflow |
| Report value | "6,100 إلى 7,300 ر.س" / "6,100 to 7,300 SAR", no overflow at 1440 or 390 |
| Sweep `/`, `/en/`, `/offer/`, `/en/offer/`, terms, about, blog, `llms.txt`, `sitemap.xml` | 0 `$`, دولار, USD, KWD, د.ك. Left: `399 KWD` / `399 د.ك` in the legacy GBP checklist pages (an example of a Kuwaiti shop's product price, not our pricing) |
| First screen 1440x900, 1920x1200, 390x844, both locales | unchanged (no CSS outside the pricing / B5 selectors), no horizontal scroll |
| `node scripts/seo-audit.mjs` | 0 high, 18 medium, 9 low (pre-existing) |
| `ops/firstload/site-audit.mjs` | 0 failing pages |
| Lighthouse `/`, `/offer/` (desktop) | perf 100, a11y 100, BP 100, SEO 100, CLS 0 |

Nothing committed, pushed or deployed.

## 35. Contract discount line under the pricing cards, 2026-10-08

Ahmad (owner, approved client-facing claim): "mention 10% discount for 6 month contracts and 20% discounts for 12 month contracts".

- **What:** one quiet centred line under the three cards in `#pricing` (`p.plan-contract`): AR `خصم 10% على عقد 6 أشهر · خصم 20% على عقد 12 شهرًا`, EN `10% off 6 month contracts · 20% off 12 month contracts`. Data in `pricing.contract` (`src/data.mjs`), markup in `pricing()` (`src/render.mjs`), style `.plan-contract` (`src/styles.css`, before `.pa-m`).
- **Style:** 14px, `--muted-on-light`; the two percentages bold in `--ink`, `dir="ltr"` isolated so Arabic never shows `%20`. Not a block, tag, button or badge. At 480px and below the two items stack on two centred lines and the `·` hides.
- **Digits 6 and 12 on purpose.** "ستة أشهر" / "six months" stays banner-only (the free offer); a contract discount must not read as part of it. No discounted prices computed, no other terms.
- **Untouched:** the nine prices, SAR block, card padding and heights, board A layout, banner, offer page, hero, report.
- **Verified:** sweep of `free|مجان|six months|ستة أشهر|limited offer|/offer|seats|مقاعد` outside `#offer-strip` on `/` and `/en/` at 1440 and 390: nothing. Prices after clicking Small/Medium/Large: 997/2,497/4,997; 1,997/4,997/9,997; 2,997/6,997/15,997 (both locales). `#problem` top at the fold unchanged (900 / 844), no horizontal scroll. seo-audit 0 high; site-audit 0 failing; Lighthouse `/` perf 100, a11y 100, CLS 0.

Nothing committed, pushed or deployed.
