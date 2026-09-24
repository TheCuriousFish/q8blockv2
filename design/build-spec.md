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
