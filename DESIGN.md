# Q8Block — DESIGN.md

**Status:** Active source of truth for the Q8Block rebuild (2026-09-24). Derived by direct inspection of npdigital.com (homepage + `/about/`, computed styles pulled live via browser devtools). Ahmad's instruction: copy NP Digital's visual system exactly — no invented direction, no softened palette.

**Supersedes:** `clients/q8block/company.md` lists old brand colors `#BCE1EC` / `#ABD9E7` (light blue). Those are retired. This file's palette (orange/black/white, Section 2) is the only color source for the new build. `company.md` remains the source for NAP/contact text only.

**Site structure:** Arabic-first. `/` = Arabic (RTL, primary), `/en/` = English (LTR, secondary). Every rule in this file has an RTL counterpart specified in Section 10 — that section is not optional for this build.

**Existing asset:** `clients/q8block/brand/logo/index.html` is a prior logo-lockup exploration (Q8 mark in a box + "block" wordmark, copying NP's "NP digital" lockup). It already uses Alexandria and the exact color tokens below. This DESIGN.md treats that file's typeface conclusion and lockup logic as decided precedent, not a new proposal.

---

## 1. Visual Theme & Atmosphere

NP Digital's site is a black-first, performance-marketing-agency aesthetic: near-black backgrounds throughout (not pure black except header/footer chrome), stark white type, and a single hot-orange accent used with real restraint — underline highlights on two or three words per headline, solid-fill CTA buttons, and small uppercase eyebrow labels. There is no gradient, no drop shadow on primary surfaces, no rounded-corner softness. Corners are hard (0px) everywhere except buttons (3px) and pill-shaped badges/labels (100px) — the contrast between "everything else is a sharp rectangle" and "buttons and badges are the two exceptions" is itself a deliberate signal: buttons look tappable, everything else looks structural.

Typography carries almost all of the visual weight. Headlines are large, set at 600 weight with tight, near-1.1 line-height at desktop sizes, loosening at mobile sizes. Body copy is light (300 weight) and comfortably spaced (1.6+ line-height), creating a deliberate contrast between bold structural headlines and quiet, readable paragraph text. The orange never floods a surface — it appears as a 9px-tall highlighter bar sitting low behind 1-2 words in a headline, as a button fill, or as a tiny label. This is a brand that communicates confidence through restraint and precision, not decoration.

Q8Block is a Kuwaiti local-SEO/web agency selling primarily into Saudi Arabia — a B2B, credibility-first buyer. The instruction is to port this exact system, not adapt its tone. Section 10 flags the one place this genuinely creates friction for an Arabic-first RTL build; everything else here is a direct, faithful port.

**Key Characteristics:**
- Near-black surface (`#141415`) as the default background, pure black (`#000000`) reserved for header/footer chrome only
- Orange (`#FF5F29`) used sparingly: headline word-highlights, button fills, small labels/links — never as a flood background
- Hard 0px corners everywhere except buttons (3px) and pills/badges (100px) — this exception list is the entire radius vocabulary
- Headlines: 600 weight, tight line-height (~1.1 desktop), zero letter-spacing tracking (not negative — verified, not assumed)
- Body copy: light weight (300 on Latin), generously spaced (1.6+), quiet next to bold headlines
- No drop shadows on resting UI (verified: header and buttons both compute to `box-shadow: none`); shadows appear only on true floating layers (dropdowns, modals)
- Flat color-block separation instead of elevation — surfaces are told apart by background color (`#141415` vs `#26282C` vs white), not by shadow
- One accent, used as a highlighter bar (not a full underline), a button fill, and a label color — three jobs, one color

---

## 2. Color Palette & Roles

All values below were read directly from npdigital.com's computed styles (`getComputedStyle`), cross-checked against the ground-truth hexes supplied. Where my extraction differed from the supplied value by a couple of RGB units (anti-aliasing/rendering noise), the supplied value is kept as the token.

### Primary
| Role | Hex | Usage |
|------|-----|-------|
| Primary (Orange) | `#FF5F29` | CTA button fills, headline word-highlights, eyebrow labels, active/accent links, focus accents |
| Primary Hover | `#FF5F29` @ `opacity: 0.9` | **Not a different hex.** Verified from NP's own stylesheet: `.avia-button:hover { opacity: 0.9; transition: 0.4s ease-in-out; }`. Do not substitute a darker/lighter hex — the hover effect is an opacity dim on the same fill, 0.4s ease-in-out. |
| Primary Active | `#FF5F29` @ `opacity: 0.95`, no transform | Brief press-state dim, lighter than hover so the click registers as "letting go," not "leaving" |

### Neutrals — Surfaces
| Role | Hex | Usage |
|------|-----|-------|
| Surface Black (default bg) | `#141415` | The site's dominant background — hero, most sections. Verified: most common background color on npdigital.com (54 hits in a full-page scan). |
| Surface Black Deep (chrome) | `#000000` | Header and footer only — pure black, one shade deeper than the body background, so chrome reads as a distinct band |
| Surface Dark Secondary | `#26282C` | Cards/panels sitting on the black background; also NP's H2 text color when H2 sits on a light section |
| Surface Light (light-section bg) | `#F5F6F7` | Alternate light sections (verified, 19 hits) — not pure white, a hair off-white |
| Surface Light Alt | `#F0F2F3` | Secondary light-section variant (verified, 8 hits) — interchangeable with Surface Light |
| Off-White / Divider | `#EBEBEB` | Hairline borders, dividers, muted chips — ground-truth value; matches the observed card border `#E5E6E7` within a few RGB units |
| White | `#FFFFFF` | Headline text on dark surfaces, card backgrounds on light sections, button text |

### Text
| Role | Hex | Usage |
|------|-----|-------|
| Text on Dark (primary) | `#FFFFFF` | Headlines and primary copy on black surfaces |
| Text on Dark (muted) | `#85898D` | Secondary/footer text on black — verified exact (footer color) |
| Text on Light (primary) | `#26282C` | Headings on white/light-surface sections — verified exact (H2 color) |
| Text on Light (muted) | `#6b6e72` | Secondary/caption text on white — already committed in `brand/logo/index.html`; reuse it rather than introducing a fourth grey |
| Text Secondary (alt) | `#858B98` | Ground-truth secondary grey; use where `#6b6e72` is already spoken for by the logo asset and a second, slightly cooler muted tone is needed (e.g. metadata, timestamps) |

### Interactive States
| Role | Hex | Usage |
|------|-----|-------|
| Link Default (on dark) | `#FFFFFF` with orange underline-highlight on hover | Body/nav links on black surfaces |
| Link Default (on light) | `#26282C` | Body links on light sections |
| Link Hover | `#FF5F29` | Universal hover color for text links, both surfaces |
| Focus Ring | `0 0 0 3px rgba(255, 95, 41, 0.45)` | Keyboard focus indicator — orange at reduced opacity, 3px ring |
| Error | `#D64545` | Not present on NP's marketing site; derived — a red that sits at comparable saturation/lightness to the orange so it doesn't clash |
| Success | `#4CAF6D` | Derived, same logic as Error |
| Warning | `#FF5F29` | Reuse Primary — NP has no separate warning color, and a second orange-family tone would blur the accent's meaning |

### Borders & Shadows
| Role | Value | Usage |
|------|-------|-------|
| Border Default (on dark) | `1px solid rgba(255,255,255,0.08)` | Card dividers on `#26282C` surfaces (verified in the logo asset's own `.card .caption` rule) |
| Border Default (on light) | `1px solid #EBEBEB` | Card/section borders on white or light-surface — verified (`1px solid rgb(229,230,231)`, 19 hits, the most common border on the site) |
| Border Strong | `1px solid #020203` | Rare, verified once — a near-black hairline used where a border needs to read against a light fill |
| Shadow — Subtle | `0 2px 15px rgba(0,0,0,0.10)` | Verified value; minor floating chips |
| Shadow — Raised | `0 4px 8px rgba(0,0,0,0.24)` | Verified value; dropdowns, raised cards |
| Shadow — Floating | `0 32px 60px rgba(0,0,0,0.10)` | Verified value; modals, the newsletter popover |
| Shadow — None (default) | `none` | The default state for buttons, header, resting cards — verified on both the fixed header and the primary button. **NP does not use shadow for everyday elevation; use flat color-blocking instead.** |

### Contrast Verification (WCAG AA)
Computed via relative-luminance formula; ratios below the 4.5:1 (body) / 3:1 (large-text) thresholds are called out explicitly rather than silently used.

| Combination | Ratio | Verdict |
|---|---|---|
| White `#FFFFFF` on Surface Black `#141415` | 18.4:1 | Pass (AAA) |
| White `#FFFFFF` on Surface Dark Secondary `#26282C` | 14.8:1 | Pass (AAA) |
| Muted `#85898D` on Surface Black `#141415` | 5.2:1 | Pass (AA body) |
| Primary Orange `#FF5F29` on Surface Black `#141415` (labels/links) | 6.1:1 | Pass (AA body) |
| Text on Light `#26282C` on white/`#EBEBEB` | >14:1 | Pass (AAA) |
| Muted `#6b6e72` on white | 5.1:1 | Pass (AA body) |
| **White `#FFFFFF` button text on Primary Orange `#FF5F29` (17px/400)** | **3.03:1** | **Fails AA body (4.5:1).** Passes AA-large only at ≥18.66px regular or ≥14px bold — NP's real button (17px/400) sits just under that cutoff. This is NP's own live combination, verified, not a build error. Kept for fidelity per Ahmad's exact-copy instruction. If stricter AA compliance is ever required, the fix is to bump button text to 600 weight or ≥18.7px, not to change the color pair. |

---

## 3. Typography Rules

**Primary Font:** Alexandria (Google Fonts, variable 100–900, Arabic + Latin)
**Fallback stack:** `'Alexandria', 'Noto Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif`
**Mono Font:** none needed — the site has no code/data display context

### Typeface decision
NP's real font is `geo-wf`, a proprietary in-house geometric grotesque (fallback `Helvetica, Arial` — confirmed via computed `font-family`). It doesn't exist outside NP and has no Arabic glyphs, so a substitute is mandatory for an Arabic-first build. Four candidates were evaluated, all already staged side-by-side in `clients/q8block/brand/logo/index.html`:

| Font | Verdict |
|---|---|
| **Alexandria** — chosen | Purpose-built as a geometric Arabic/Latin sister-family in the Futura/geo-grotesque tradition — the same design lineage `geo-wf` sits in. Full 100–900 variable axis, so NP's exact weight usage (600 headlines, 400 buttons, 300 body) maps 1:1 without hunting for the nearest static cut. Already the working choice in the logo-lockup asset and in this project's own internal font-comparison notes (`combo/website-starter/markets/gulf-ar.md`), which independently flags it as the pick when "pairing with geometric Latin brand marks." |
| Cairo | Explicitly the most overused Arabic web face in the region — the internal `gulf-ar.md` reference calls it "the reason so many sites look identical" and recommends against it as a display face. Wrong choice for a brand whose whole point is copying a distinctive, uncommon system. |
| Readex Pro | Rounder, softer terminals — reads friendly/consumer, not the blunt, structural, ad-agency edge NP projects. |
| Zain | More of a display/decorative face with a narrower practical weight range; weaker for long-form Arabic body copy, which this build needs (service pages, blog). |

**Weight scale (Alexandria variable axis → discrete weights used in build):**

| Role | Weight | Notes |
|---|---|---|
| Display Hero / Section Heading (H1/H2) | 600 (SemiBold) | Matches NP's verified H1 and H2 weight exactly on both pages inspected |
| Sub-heading (H3) | 600 | Same family weight, smaller size |
| Eyebrow / Label | 600 | Matches NP's small uppercase-tracked label (`h3.tag`, 16px/600/1px tracking, verified) |
| Body Large (Latin) | 300 (Light) | Matches NP's verified running paragraph weight exactly |
| Body Large (Arabic) | 400 (Regular) | **Deliberate deviation — see Section 10, flag #1.** 300-weight Arabic strokes read as too thin at body sizes; do not port 300 to Arabic body text. |
| Body (Latin) | 300 | Same as Body Large, smaller size |
| Body (Arabic) | 400 | Same reasoning as Body Large |
| Button | 400 | Matches NP exactly (17px/400, verified) |
| Small / Caption | 400 | Default reading weight |

### Type scale — Latin (`/en/`)

| Role | Size (desktop) | Size (mobile) | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display Hero (H1, homepage) | 60px / 3.75rem | 36px / 2.25rem | 600 | 1.1 desktop / 1.22 mobile | 0 (normal — verified, not negative) | Homepage-style hero H1. Line-height tightens at large sizes, loosens at small — both ratios independently verified on NP (60px→1.1 on the about page, 36px→1.22 on the homepage) |
| Display Large (editorial H1) | 70px / 4.375rem | 40px / 2.5rem | 600 | 1.1 | 0 | Verified exact on `/about/` (70px/77px line-height). Used for standalone big statements, not the homepage hero |
| Section Heading (H2) | 60px / 3.75rem | 28px / 1.75rem | 600 | 1.1 | 0 | Verified exact at both ends (60px/66px on `/about/`, 28px/30.8px on homepage) |
| Sub-heading (H3, content) | 32px / 2rem | 22px / 1.375rem | 600 | 1.25 | 0 | Derived — NP's own H3 tag is reused as a small UI label (see Eyebrow row) rather than a true content sub-heading, so this row extends the scale's rhythm rather than copying a directly observed value |
| Eyebrow / Label | 16px / 1rem | 14px / 0.875rem | 600 | 1.1 | 0.06em, uppercase | Verified exact (NP's nav-adjacent "Global" label: 16px/600/1px tracking/17.6px line-height = 1.1 ratio) |
| Body Large | 18px / 1.125rem | 17px / 1.0625rem | 300 | 1.6 | 0 | Lead paragraphs, intro copy |
| Body | 16px / 1rem | 16px / 1rem | 300 | 1.625 | 0 | Verified exact (26px line-height / 16px font on NP's running copy) |
| Button | 17px / 1.0625rem | 16px / 1rem | 400 | 1 | 0 | Verified exact (17px/400, NP) |
| Small | 14px / 0.875rem | 14px / 0.875rem | 400 | 1.5 | 0 | Captions, metadata, fine print |
| Caption | 12px / 0.75rem | 12px / 0.75rem | 400 | 1.4 | 0.01em | Timestamps, legal fine print |

### Type scale — Arabic (`/`)
Sizes and line-heights follow this project's own established Arabic-typesetting rule (`combo/website-starter/markets/gulf-ar.md`: Arabic body needs more size and more air than Latin at the same nominal role) rather than a naive 1:1 port.

| Role | Size (desktop) | Size (mobile) | Weight | Line Height | Notes |
|---|---|---|---|---|---|
| Display Hero (H1) | 60px / 3.75rem | 36px / 2.25rem | 600 | 1.25 desktop / 1.35 mobile | Same px as Latin (Alexandria's Arabic/Latin are metrically matched), but looser line-height — see Section 10 flag #1 for why NP's tight 1.1 is unsafe for Arabic descenders |
| Display Large | 70px / 4.375rem | 40px / 2.5rem | 600 | 1.25 | Same reasoning |
| Section Heading (H2) | 60px / 3.75rem | 28px / 1.75rem | 600 | 1.25 | Same reasoning |
| Sub-heading (H3) | 32px / 2rem | 22px / 1.375rem | 600 | 1.35 | |
| Eyebrow / Label | 16px / 1rem | 14px / 0.875rem | 600 | 1.3 | No letter-spacing tracking on Arabic — tracking distorts joined letterforms; drop the 0.06em used on Latin |
| Body Large | 19.4px / 1.215rem (18px × 1.08) | 18.4px / 1.148rem | 400 | 1.85 | Size and line-height per the project's Arabic body rule |
| Body | 17.3px / 1.08rem (16px × 1.08) | 17.3px / 1.08rem | 400 | 1.85 | Rounds cleanly to 1.08rem base — matches the existing `--font-size-body: 1.08rem; --line-height-body: 1.85` custom-property convention already defined in `gulf-ar.md` |
| Button | 17px / 1.0625rem | 16px / 1rem | 400 | 1 | Unchanged from Latin — short button labels don't hit the descender/diacritic problem |
| Small | 15.1px / 0.945rem | 15.1px / 0.945rem | 400 | 1.7 | |
| Caption | 13px / 0.8125rem | 13px / 0.8125rem | 400 | 1.5 | |

---

## 4. Component Stylings

### Buttons

**Primary Button:**
| Property | Value |
|---|---|
| Background | `#FF5F29` |
| Text Color | `#FFFFFF` |
| Font | Alexandria, 17px/1.0625rem, weight 400 |
| Padding | `15px 30px 13px` (verified exact — asymmetric top/bottom, equal left/right so it needs no RTL mirroring) |
| Border Radius | `3px` (verified exact) |
| Border | none |
| Shadow | none (verified) |
| Hover | same background, `opacity: 0.9`, `transition: 0.4s ease-in-out` (verified — not a hex change) |
| Focus Ring | `0 0 0 3px rgba(255, 95, 41, 0.45)` |
| Active | `opacity: 0.95`, no transform |
| Disabled Background | `#26282C` |
| Disabled Text | `#85898D` |
| Transition | `opacity 0.4s ease-in-out` |

**Secondary Button (outline):**
| Property | Value |
|---|---|
| Background | transparent |
| Text Color | `#FFFFFF` on dark surfaces / `#26282C` on light |
| Border | `2px solid #FF5F29` |
| Border Radius | `3px` |
| Padding | `13px 28px 11px` (2px less than primary, to compensate for the added border so overall button height matches) |
| Hover | `background: #FF5F29`, `color: #FFFFFF` — border-to-fill swap |
| Focus Ring | `0 0 0 3px rgba(255, 95, 41, 0.45)` |
| Transition | `background 0.4s ease-in-out, color 0.4s ease-in-out` |

**Dark/Inverse Button (on white sections):**
| Property | Value |
|---|---|
| Background | `#141415` |
| Text Color | `#FFFFFF` |
| Border Radius | `3px` |
| Padding | `15px 30px 13px` |
| Hover | `opacity: 0.85` |
| Focus Ring | `0 0 0 3px rgba(20, 20, 21, 0.35)` |

### Cards
| Property | Value |
|---|---|
| Background (on black) | `#26282C` |
| Background (on light section) | `#FFFFFF` |
| Border (on black) | `1px solid rgba(255,255,255,0.08)` |
| Border (on light) | `1px solid #EBEBEB` |
| Border Radius | `0px` — hard corner, no exception for cards |
| Padding | `32px` desktop / `24px` mobile |
| Shadow | none at rest |
| Hover Shadow | `0 4px 8px rgba(0,0,0,0.24)` (verified value) |
| Transition | `box-shadow 200ms ease` |

### Badges / Pills
| Property | Value |
|---|---|
| Background | `#FF5F29` or transparent with `1px solid #FF5F29` |
| Border Radius | `100px` (verified — the one other radius exception besides buttons) |
| Padding | `4px 14px` |
| Font | Alexandria, 12px, weight 600, 0.06em tracking (Latin) / no tracking (Arabic), uppercase (Latin only — see Section 10) |

### Inputs
| Property | Value |
|---|---|
| Background | `#FFFFFF` on light sections / `#1E1F21` on dark sections |
| Border | `1px solid #EBEBEB` (light) / `1px solid rgba(255,255,255,0.15)` (dark) |
| Border Radius | `0px` |
| Padding | `13px 16px` |
| Font | Alexandria, 16px |
| Placeholder Color | `#85898D` |
| Focus Border | `#FF5F29` |
| Focus Ring | `0 0 0 3px rgba(255,95,41,0.25)` |
| Error Border | `#D64545` |
| Disabled Background | `#F5F6F7` |

### Navigation
| Property | Value |
|---|---|
| Background | transparent over hero, solidifies to `#000000` on scroll |
| Height | `102px` desktop (verified exact), `72px` mobile |
| Position | `fixed` (verified) |
| Link Color | `#FFFFFF` |
| Link Hover Color | `#FF5F29` |
| Active Link Color | `#FF5F29` |
| Active Indicator | underline-highlight bar (same 9px-tall technique as headline highlights, see Section 7) |
| CTA in Nav | Primary Button styling, smaller: `10px 20px` padding, `3px` radius |
| Mobile Menu Background | `#000000`, full-screen overlay |

### Underline / Highlight Text Treatment (verified technique — reuse exactly)
This is NP's signature move and must be implemented exactly this way, not approximated with `text-decoration`:
```css
.highlight {
  background-image: linear-gradient(#FF5F29, #FF5F29);
  background-size: 100% 9px;
  background-position: 0% 80%;
  background-repeat: no-repeat;
  color: inherit; /* text stays white/inherited, the bar sits BEHIND the lower 20% of the glyphs */
}
```
Verified via computed styles on `npdigital.com`'s H1 (`span.underline`). This is a relative (`%`-based) background, not a fixed-pixel offset, so it needs no directional adjustment for RTL — apply the identical rule to the Arabic highlighted word's wrapping `<span>`.

---

## 5. Layout Principles

**Base Spacing Unit:** 8px
**Spacing Scale:** 8, 16, 24, 32, 48, 64, 96, 128, 160px

**Grid:**
| Property | Value |
|---|---|
| Max Container Width | `1500px` (verified exact — NP's own `.container` computed `max-width: 1500px`) |
| Grid Columns | 12 (build-pipeline convention layered over NP's flexbox blocks — NP itself has no strict grid framework) |
| Column Gap | 24px desktop / 16px mobile |
| Row Gap | 32px |

**Container side padding (verified: NP uses `0px 50px` at desktop; Q8Block's own logo-asset already uses `20px` mobile gutter):**
| Breakpoint | Side Padding |
|---|---|
| Mobile | 20px |
| Tablet | 32px |
| Desktop+ | 50px (verified exact) |

**Section Spacing (derived — not directly extractable from NP's block-based markup, sized to match the site's dense, large-type rhythm):**
| Context | Value |
|---|---|
| Between major sections | 128px desktop / 64px mobile |
| Between sub-sections | 64px desktop / 40px mobile |
| Between content blocks | 32px desktop / 24px mobile |

**Border Radius Scale (verified — this is the whole vocabulary, do not add sizes):**
| Size | Value | Usage |
|---|---|---|
| None (default) | `0px` | Everything: sections, cards, images, inputs, containers |
| Button | `3px` | Buttons only — verified exact |
| Pill | `100px` | Badges, labels, tag chips — verified |
| Circle | `100%` | Avatars, icon dots |

---

## 6. Depth & Elevation

NP's resting UI is flat — verified `box-shadow: none` on both the fixed header and the primary button. Elevation is communicated by background-color contrast (`#141415` → `#26282C` → `#000000`), not by shadow. Shadows appear only on genuinely floating layers, using these verified values:

| Level | Name | CSS box-shadow | Usage |
|---|---|---|---|
| 0 | Flat (default) | `none` | Default state for buttons, cards, header, nearly everything at rest — this is NP's dominant treatment |
| 1 | Subtle | `0 2px 15px rgba(0,0,0,0.10)` | Verified value; minor floating chips, tooltips |
| 2 | Raised | `0 4px 8px rgba(0,0,0,0.24)` | Verified value; dropdown menus, hovered cards |
| 3 | Floating | `0 32px 60px rgba(0,0,0,0.10)` | Verified value; modals (this is NP's real newsletter-popup shadow) |
| — | Hairline outline | `0 0 1px rgb(136,136,136)` | Not an elevation level — a border-via-shadow reset the Enfold framework applies to nearly every image (980 instances observed). Reproduce it directly as a `1px solid` border instead; don't carry the shadow-based hack into a fresh build. |

---

## 7. Do's and Don'ts

### Do's
1. Keep the orange to three jobs only: button fills, headline word-highlights, small labels/links. If you reach for orange a fourth way, stop and use white, `#26282C`, or a border instead.
2. Use `opacity: 0.9` for button hover, not a darker hex — that is what NP's own stylesheet does, verified.
3. Keep corners hard (`0px`) by default. The only radii that exist are `3px` (buttons) and `100px` (pills/badges) — no in-between "friendly" 8px/12px card radius.
4. Build the headline highlight as a `background-image` bar behind the glyphs (`background-size: 100% 9px; background-position: 0% 80%`), not `text-decoration: underline`. The look is a highlighter mark, not an underline.
5. Let body copy stay light and quiet (300 weight Latin / 400 Arabic) so bold 600-weight headlines keep their contrast and authority.
6. Tell surfaces apart with background color (`#141415` / `#26282C` / `#000000`), not with shadow. Default to `box-shadow: none`.
7. Use Alexandria's variable weight axis directly — 600 for anything structural (headings, labels), 400 for buttons, 300/400 for body (Latin/Arabic respectively).
8. Wrap phone numbers, prices (KWD), and any digit run in `dir="ltr"` — see Section 10.
9. When a component needs a hover/active state and NP didn't expose one in the stylesheet, default to an opacity dim (0.85–0.95) before inventing a new color — that's the pattern this whole system uses.

### Don'ts
1. Don't invent a softer, warmer, or more "regional" palette. Ahmad's instruction is an exact copy, not an adaptation.
2. Don't give cards or panels rounded corners "for friendliness." NP's hard edges are the point.
3. Don't use `text-decoration: underline` for headline highlights — it's visually a different mark (a thin line under the baseline vs. a 9px bar sitting low behind the glyphs).
4. Don't port Latin's 300-weight body text to Arabic — see Section 3 and Section 10, flag #1.
5. Don't apply NP's tight 1.1 line-height to Arabic headings — see Section 10, flag #1.
6. Don't mirror the Q8 logo mark, box, or any Latin numeral in RTL layouts — see Section 10.
7. Don't add drop shadows to resting cards/buttons "for depth." Use background-color contrast instead.
8. Don't use Cairo. It's not banned by the general rules, but it's this project's own explicitly-flagged "everything looks the same" font — see the typeface table in Section 3.
9. Don't uppercase-transform Arabic text (it has no case) — the Latin eyebrow-label's `uppercase` + `0.06em` tracking treatment is Latin-only.
10. Don't hardcode `left`/`right` for anything — margin, padding, `background-position`, icon placement, header layout. Use logical properties (Section 10) so the Arabic (`/`) and English (`/en/`) builds share one stylesheet correctly.

### The AI Slop Test
> If someone saw this and was told AI made it, would they believe it? If yes, redesign.

For this system specifically, the tells to watch for are: a rounded-corner card creeping in anywhere but a button or a pill; a second accent color appearing "for variety"; a drop shadow added to a resting card because it "felt flat"; a headline highlight built as a plain underline instead of the low, thick bar; and — most likely on this project — Arabic body copy set at the same feather-light 300 weight as the English, which will look thin and unfinished rather than "sleek."

---

## 8. Responsive Behavior

### Breakpoints
Matched to NP's own verified Enfold/Avia media queries (`max-width: 479px`, `max-width: 767px` / `min-width: 768px`, `max-width: 989px` / `min-width: 990px`) rather than a generic scale, with the container's own verified `1500px` cap as the XL tier.

| Name | Width | Columns | Container Padding |
|---|---|---|---|
| Mobile | 0–479px | 4 | 20px |
| Tablet | 480–767px | 8 | 32px |
| Desktop | 768–989px | 12 | 32px |
| Large | 990–1499px | 12 | 50px |
| XL | 1500px+ | 12 | 50px, content capped at 1500px and centered |

### Touch Targets
- Minimum touch target size: 44px × 44px
- Minimum spacing between touch targets: 8px

### Typography Scaling
| Role | Mobile | Tablet | Desktop |
|---|---|---|---|
| Display Hero | 2.25rem | 2.8rem | 3.75rem |
| Display Large | 2.5rem | 3.2rem | 4.375rem |
| Section Heading | 1.75rem | 2.6rem | 3.75rem |
| Body | 1rem | 1rem | 1rem |

### Collapsing Strategy
- **Navigation:** Full-screen black overlay menu below 990px (matches NP's own `min-width: 990px` nav breakpoint, verified). Full horizontal nav at 990px and above.
- **Grid layouts:** Single column on mobile, 2 columns on tablet, full grid (3–4 col) on desktop.
- **Hero sections:** Stack vertically on mobile (headline, then CTA, then any embedded form). Side-by-side on desktop where NP runs a hero form beside the headline.
- **Cards:** Full-width stack on mobile. 2-column grid on tablet. 3–4 column grid on desktop.
- **Container side padding:** Steps from 20px (mobile) → 32px (tablet) → 50px (desktop+), per Section 5.

---

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary: `#FF5F29`
- Surface Black (default bg): `#141415`
- Surface Black Deep (chrome): `#000000`
- Surface Dark Secondary: `#26282C`
- Text on Dark: `#FFFFFF`
- Text on Dark (muted): `#85898D`
- Text on Light: `#26282C`
- Text on Light (muted): `#6b6e72`
- Border on light: `#EBEBEB`

### Example Component Prompts

**Hero Section (Arabic, `/`):**
"Create a hero section on `#141415`, `dir=\"rtl\"`. Headline in Alexandria 600, 3.75rem desktop / 2.25rem mobile, line-height 1.25, color `#FFFFFF`, right-aligned. Highlight one key word with a `background-image: linear-gradient(#FF5F29,#FF5F29)` bar, `background-size: 100% 9px`, `background-position: 0% 80%`, `no-repeat`. Subheadline in Alexandria 400, 1.08rem, color `#FFFFFF`, line-height 1.85. CTA button: background `#FF5F29`, text `#FFFFFF`, padding `15px 30px 13px`, border-radius `3px`, font 17px/400, hover `opacity: 0.9`."

**Service Card:**
"Build a service card with background `#26282C` (on the dark page) or `#FFFFFF` (on a light section), border `1px solid rgba(255,255,255,0.08)` or `1px solid #EBEBEB`, border-radius `0px`, padding `32px`. Title in Alexandria 600, 2rem, color `#FFFFFF`/`#26282C`. Description in Alexandria 400, 1.08rem (Arabic) or 300/1rem (Latin), color `#85898D`/`#6b6e72`. On hover: `box-shadow: 0 4px 8px rgba(0,0,0,0.24)`, no border-radius change."

**Contact Form:**
"Create a contact form, `dir=\"rtl\"` for the Arabic page. Labels in Alexandria 600, 1rem, color `#FFFFFF`. Inputs: background `#1E1F21`, border `1px solid rgba(255,255,255,0.15)`, border-radius `0px`, padding `13px 16px`, focus border `#FF5F29`, focus ring `0 0 0 3px rgba(255,95,41,0.25)`. Phone number field forced `dir=\"ltr\"` inside the RTL form (digits must not reverse). Submit button uses Primary Button styling."

**Footer:**
"Build a footer on `#000000`. Heading text in Alexandria 600, 1rem, color `#FFFFFF`. Body text in Alexandria 400, 0.875rem, color `#85898D`. Links in `#85898D`, hover `#FF5F29`. Grid: 4 columns desktop, single column mobile, RTL column order mirrored (first column starts on the right on `/`)."

---

## 10. RTL / Arabic-English Considerations

**This section is mandatory reading before implementation — Ahmad flagged it as the priority check.**

### Flag #1 — NP's tight line-height does not translate cleanly to Arabic (the one to worry about)
NP's verified H1/H2 line-height is ~1.1 at desktop sizes. That ratio is tuned for Latin capital-height geometric type with minimal descenders. Arabic script routinely drops well below the baseline (ج ح خ ع غ ص ض) and carries diacritics/dots that need vertical air; a 1.1 ratio at 60–70px will clip descender loops and crowd dot-clusters, which reads as broken rendering, not as "tight editorial confidence." **Fix applied in this file:** Arabic headings use 1.25 (desktop) / 1.35 (mobile) instead of 1.1 — see the Arabic type-scale table in Section 3. This is a deliberate, documented deviation from strict 1:1 fidelity, made because the alternative is visibly broken Arabic type, not a stylistic preference.

The same logic applies to the 300-weight Latin body text (also flagged in Section 3 / Do's-Don'ts #4): Arabic at 300 weight reads thin/unfinished at 16px on a screen. Arabic body is set at 400 instead.

### Mirroring — what flips
- Layout direction: full page mirrors (`dir="rtl"` on `<html>` for `/`, `dir="ltr"` for `/en/`)
- Header: logo moves from left (NP/English) to right (Arabic); nav CTA moves from right to left
- Icons that imply directional motion: chevrons, arrows, "next/prev" carousel controls, breadcrumb separators
- Text alignment: headlines/body switch from left-aligned to right-aligned
- Footer column order

### What must NOT mirror
- **The Q8 logo mark itself.** Per the existing `brand/logo/index.html` exploration, the Latin "Q8" glyph inside its box stays in fixed LTR internal order in every layout — it is a brand mark, not running text. The Arabic wordmark (`كويت بلوك`) sits beside it, laid out RTL, but the box + "Q8" never flips or reverses.
- **All numerals.** Use Western Arabic numerals (0–9), not Eastern Arabic-Indic (٠–٩), matching Kuwait/Gulf digital convention. Wrap every digit run — phone numbers, prices in KWD, stat counters, dates — in `dir="ltr"` (or `unicode-bidi: isolate` on a `<span>`) so digits don't visually reverse inside an RTL sentence.
- **Icons with no inherent direction:** checkmarks, the play-button triangle (media convention, not text), star ratings, social icons.
- **The headline highlight bar technique.** Already direction-agnostic (verified: it's a `%`-based background, not a fixed-pixel offset) — apply identically to the Arabic word span, no changes needed. This is one place NP's system ports over with zero adjustment.
- **Uppercase + letter-spacing on labels.** Arabic has no case; drop `text-transform: uppercase` and the `0.06em` tracking for Arabic eyebrow labels (Latin keeps both).

### Logical properties — required, not optional
Because `/` and `/en/` share one build pipeline, every physical left/right value must be written as a logical property so the same rule serves both directions automatically:
- `margin-left/right` → `margin-inline-start/end`
- `padding-left/right` → `padding-inline-start/end`
- `text-align: left/right` → `text-align: start/end`
- `border-left/right` → `border-inline-start/end`
- `left/right` (positioning) → `inset-inline-start/end`
- Button icon offsets (NP: `.avia_button_icon { left: -0.3em }`, `_right { right: 0.3em }`) → rewrite as inline-start/end offsets so an icon-leading button in English becomes icon-trailing in Arabic automatically, not manually re-authored per locale
- `background-position` for anything NOT using the `%`-based highlight technique above should also prefer logical/percentage values over fixed `px` from a physical edge

### Font note
Alexandria covers both scripts from one variable file — this avoids the two-heading-faces problem the project's own `gulf-ar.md` reference warns about ("setting Arabic in a Latin-only family... falls back per glyph, inconsistently"). Self-host WOFF2, subset per script, declare `unicode-range` so `/en/` visitors never download Arabic glyph data and vice versa — this is the existing project convention, reuse it rather than re-deriving a font-loading strategy.

### Per-Locale Content Tone
| Language | Tone | Formality |
|---|---|---|
| Arabic (`/`) | Direct, credibility-first — B2B buyers in Saudi Arabia are the primary audience | Formal |
| English (`/en/`) | Secondary/supporting — same claims, plainer register | Professional, direct |

### Noted but not acted on
Ahmad's instruction was to copy NP's system exactly, not to soften it, so nothing below changed anything in this file — flagging it only because it's a real tension worth having on record. NP's all-black, high-contrast, blunt-CTA aesthetic reads as "aggressive Western performance-marketing agency." Q8Block's actual buyers are Gulf B2B decision-makers, a market that often expects more warmth/ornament or earlier trust signals (certifications, client logos) than this genre typically leads with. That's a positioning question for Ahmad, not a design-system defect — the system above ports NP faithfully regardless.
