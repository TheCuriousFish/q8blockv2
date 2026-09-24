# Q8Block — Lighthouse

**Run:** 2026-09-24, after Ahmad's homepage revision pass (`design/build-spec.md` §15): the 100svh first
screen with the offer strip pinned under the header, the strip rebuilt as one clickable row with a CTA,
the §7 slideshow, the new Arabic H1 and the navigation rebuild.
**How:** Lighthouse via `chrome-launcher`, real Chrome, against the built `site/` on `http://localhost:8823`.
**Three runs per configuration, medians below.** Four pages x mobile and desktop = eight configurations,
twenty-four runs. Every category scored on every run.

## Medians

| Page | Preset | Performance | Accessibility | Best practices | SEO | Field metrics |
|---|---|---|---|---|---|---|
| `/` (Arabic home) | mobile | **99** | **96** | **100** | **100** | LCP 1580ms · TBT 115ms · CLS **0.000** |
| `/` (Arabic home) | desktop | **100** | **96** | **100** | **100** | LCP 404ms · TBT 0ms · CLS **0.000** |
| `/en/` (English home) | mobile | **100** | **96** | **100** | **100** | LCP 1579ms · TBT 0ms · CLS **0.000** |
| `/en/` (English home) | desktop | **100** | **96** | **100** | **100** | LCP 404ms · TBT 0ms · CLS **0.000** |
| `/offer/` (Arabic offer) | mobile | **100** | **96** | **100** | **100** | LCP 1653ms · TBT 44ms · CLS **0.000** |
| `/offer/` (Arabic offer) | desktop | **100** | **96** | **100** | **100** | LCP 404ms · TBT 0ms · CLS **0.000** |
| `/en/offer/` (English offer) | mobile | **100** | **96** | **100** | **100** | LCP 1653ms · TBT 0ms · CLS **0.000** |
| `/en/offer/` (English offer) | desktop | **100** | **96** | **100** | **100** | LCP 404ms · TBT 0ms · CLS **0.000** |

Zero spread again: all three runs of every configuration returned the identical four scores.

## What the revision pass cost, measured

**Nothing on the scoreboard.** Every score is identical to the pre-revision run of the same day, and the
two headline risks both came back clean:

| Risk | Measured |
|---|---|
| The §7 slideshow introduces CLS | **CLS 0.000 on all 24 runs.** Card widths are `flex-basis` and every plate carries `aspect-ratio`, so nothing reflows; auto-advance moves `scrollLeft`, which is not a layout shift; and under Lighthouse the reduced-motion path means it never auto-advances at all. |
| Pinning the offer strip shifts the page | **0.** `.strip-slot` is given the bar's measured height at the moment it is pinned, so the document height is identical before, during and after: 8238 / 8238 / 8238 at 1440 and 10905 / 10905 / 10905 at 390. |
| The extra JS costs TBT | Arabic home mobile TBT **78ms → 115ms**, and performance stays **99** (it was 99 before). Every other configuration is still 0–44ms. The slideshow and the pin add ~60 lines to the one existing deferred `app.js`; there is no library. |
| A carousel breaks accessibility | **No new failing audit anywhere.** `color-contrast` is still the *only* failing accessibility audit on all eight configurations. The focusable labelled scroll region, the two `aria-label`-over-`aria-hidden` buttons and the eleven real card links add nothing. |

## Accessibility is 96, and one of the two old blockers is now closed

`color-contrast` is a **binary** audit weighted 7 of 185, so it is 96 or 100 and there is no 98.

**Closed by the revision pass.** `.strip-pill` — white on `#FF5F29`, 3.03:1 — was the node both §14 and
§14b named as the one holding the score, and both said the fix would change an approved board. Ahmad has
now asked for the pill to stop reading like a CTA, which authorises it. The homepage strip pill is an
**outline** in brand orange on `#121215` = **6.23:1**, and the CTA beside it is near-black on `#FF5F29`
= **6.52:1**. Measured: `.strip-pill` no longer appears in the failing nodes on `/` or `/en/` at either
preset.

**Still failing, and all of it is one outstanding decision of Ahmad's:** `#FF5F29` used as **ink** on a
light surface. This is the §14b revert, recorded there as deliberate.

| Element | Where | Contrast | Pages |
|---|---|---|---|
| `.eyebrow` §4, §8 | on `#F2F3F5` / `#F4F5F6` | **2.73 / 2.77** | both homes, both presets |
| `.wwd-num` ×3 | §4 outline numerals, `aria-hidden` but axe reads the stroke | **2.73** | both homes, both presets |
| `.eyebrow` §3, §5, §7 | on `#FEFEFE` | **3.00** | both homes, mobile only (20px bold clears the 3.0 large-text bar at desktop size; the 14px mobile floor needs 4.5) |
| `.work-metric` ×6 + `.num` | §7 cards on `#FEFEFE` | **3.00** | both homes, mobile only |
| `.strip-pill` | **offer pages only**, `#offer-hero` | **3.03** | `/offer/`, `/en/offer/`. Deliberately untouched: that is an approved board and it is Ahmad's call |

**So the honest summary:** the homepage now fails on nothing but orange-as-ink, which is exactly the
trade §14b made on purpose for board fidelity. Reaching 100 means taking `#FF5F29` out of ink entirely
(fills only) on the light sections, plus the offer hero pill. Both are Ahmad's calls, both are one line
each, and neither is worth doing halfway — the score does not move until every one of them moves.

## Reproducing

Harness: `<scratch>/lighthouse-run/run.mjs`, deps installed in that folder, raw LHRs in `results/`,
console log in `run3.log`, medians in `results/summary.json`, per-node contrast dump via `nodes.mjs`.

```bash
npx --yes serve -l 8823 clients/q8block/site   # or any static server on the built site/
cd <scratch>/lighthouse-run && node run.mjs
```

## Open, and not from this pass

`scripts/seo-audit.mjs` previously reported 5 high findings, all one root cause: the footer and the
sitemap pointed at `/google-business-profile-checklist.html`, which had been moved into `_old/`. Both
checklist pages are back in `src/static/` and the build copies them, so re-run the audit to confirm it
is closed before anything goes live.

**New and expected:** the header and footer now link to `/about/`, `/blog/`, `/terms/` and `/contact/`
(plus their `/en/` mirrors), which are being built separately and **404 until that lands**. They are
deliberately not in `PAGES`, the sitemap or `llms.txt` yet. The SEO audit will flag them as broken
internal links until the pages exist; that is the expected state, not a regression.

---

# Run 2 — the four secondary pages, 2026-09-24

**Run:** after the About, Contact, Blog and Terms build (`design/build-spec.md` §16): twenty new URLs,
the blog list on board B, twelve post pages from `content/blog/`, and the contact page's tap-to-load
map.
**How:** the same harness, `<scratch>/lighthouse-run/`, real Chrome via `chrome-launcher`, against the
built `site/` on `http://localhost:8823`. Six pages x mobile and desktop = twelve configurations,
**three runs each, 36 runs**, medians below. Raw LHRs in `results-pages/`, log in `run-pages.log`,
medians in `results-pages/summary-pages.json`.

## Medians

| Page | Preset | Performance | Accessibility | Best practices | SEO | Field metrics |
|---|---|---|---|---|---|---|
| `/blog/` (Arabic list) | mobile | **100** | **100** | **100** | **100** | LCP 1655ms · TBT 41ms · CLS **0.000** |
| `/blog/` (Arabic list) | desktop | **100** | **100** | **100** | **100** | LCP 384ms · TBT 0ms · CLS **0.000** |
| `/en/blog/` (English list) | mobile | **100** | 95 | **100** | **100** | LCP 1653ms · TBT 0ms · CLS **0.000** |
| `/en/blog/` (English list) | desktop | **100** | 93 | **100** | **100** | LCP 383ms · TBT 0ms · CLS **0.000** |
| `/blog/why-your-google-profile-stops-growing/` | mobile | **100** | **100** | **100** | **100** | LCP 1503ms · TBT 31ms · CLS **0.000** |
| `/blog/why-your-google-profile-stops-growing/` | desktop | **100** | **100** | **100** | **100** | LCP 362ms · TBT 0ms · CLS **0.000** |
| `/en/blog/why-your-google-profile-stops-growing/` | mobile | **100** | **100** | **100** | **100** | LCP 1502ms · TBT 0ms · CLS **0.000** |
| `/en/blog/why-your-google-profile-stops-growing/` | desktop | **100** | **100** | **100** | **100** | LCP 363ms · TBT 0ms · CLS **0.000** |
| `/contact/` (Arabic) | mobile | **100** | **100** | **100** | **100** | LCP 1503ms · TBT 19ms · CLS **0.000** |
| `/contact/` (Arabic) | desktop | **100** | **100** | **100** | **100** | LCP 362ms · TBT 0ms · CLS **0.000** |
| `/en/contact/` (English) | mobile | **100** | 96 | **100** | **100** | LCP 1502ms · TBT 0ms · CLS **0.000** |
| `/en/contact/` (English) | desktop | **100** | 94 | **100** | **100** | LCP 363ms · TBT 0ms · CLS **0.000** |

Zero spread on performance: all three runs of every configuration returned 100.

## The two things that were at risk, measured

| Risk | Measured |
|---|---|
| Twelve new illustrations cost CLS | **CLS 0.000 on all 36 runs.** Every blog image carries explicit `width` and `height` — 1344x752 for the featured panel and the post hero, 240x240 for the 104px thumbnails — so the box is reserved before the bytes arrive. |
| The tap-to-load map shifts the contact page | **0.** The map shell's height is set in CSS and is identical before and after the swap (474.69 / 474.69), and the iframe replaces the placeholder inside it. Nothing from Google is requested until the tap: **0** google / gstatic / googleapis requests on first paint, in both locales. |
| The post pages are the heaviest new page | LCP is the illustration, 8-27 kB of WebP, `fetchpriority="high"`. Mobile LCP 1502-1503ms, desktop 362-363ms, performance **100** on all four post configurations. |

## Accessibility: 100 on Arabic, 93-96 on English, and it is one node

`color-contrast` is still binary and still the only failing audit anywhere.

| Page | Failing nodes |
|---|---|
| `/blog/`, `/contact/` (Arabic) | **none** — accessibility 100 |
| both post pages | **none** — accessibility 100. A post page has no eyebrow; the breadcrumb takes that slot |
| `/en/blog/`, `/en/contact/` | **one**: `main#main > section#page-head > div.wrap > p.eyebrow`, `#FF5F29` on `#F2F3F5`, **2.73:1** at 20.6px bold, needs 3:1 |

That is the **same deliberate trade recorded in `build-spec.md` §14b**: one orange on the site,
`#FF5F29` as fill and as ink, because every approved board draws one orange. It is Ahmad's open
decision and nothing new was introduced here.

Why it costs 93-96 rather than the homepage's 96: the accessibility score is a weighted average over
the audits that *apply* to a page, and these pages have fewer applicable audits than the homepage
(no carousel, no accordion, fewer landmarks), so the same single binary failure carries more weight.
Reaching 100 on them is the same one-line decision as everywhere else: take `#FF5F29` out of ink on
light surfaces, or put the page-head eyebrow on a surface where it clears 3:1.

## Reproducing

```bash
npx --yes serve -l 8823 clients/q8block/site
cd <scratch>/lighthouse-run && node run-pages.mjs     # the six new pages
cd <scratch>/lighthouse-run && node run.mjs           # the original four
```
