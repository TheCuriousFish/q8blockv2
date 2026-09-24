# Q8Block — Lighthouse

**Run:** 2026-09-24, re-run after the aesthetics fix pass (`notes/aesthetics-audit.md`), which reverted
`--orange-text` to the single brand orange, shipped §7's eleventh card and applied sixteen CSS fixes.
Previous run, before that pass, returned the identical eight rows — see "What the orange revert cost" below.
**How:** Lighthouse via `chrome-launcher`, real Chrome, against the built `site/` on `http://localhost:8823`.
**Three runs per configuration, medians below.** Four pages x mobile and desktop = eight configurations,
twenty-four runs. Every category scored on every run.

## Medians

| Page | Preset | Performance | Accessibility | Best practices | SEO | Field metrics |
|---|---|---|---|---|---|---|
| `/` (Arabic home) | mobile | **99** | **96** | **100** | **100** | LCP 1578ms · TBT 78ms · CLS 0.000 |
| `/` (Arabic home) | desktop | **100** | **96** | **100** | **100** | LCP 404ms · TBT 0ms · CLS 0.000 |
| `/en/` (English home) | mobile | **100** | **96** | **100** | **100** | LCP 1503ms · TBT 0ms · CLS 0.000 |
| `/en/` (English home) | desktop | **100** | **96** | **100** | **100** | LCP 404ms · TBT 0ms · CLS 0.000 |
| `/offer/` (Arabic offer) | mobile | **100** | **96** | **100** | **100** | LCP 1504ms · TBT 44ms · CLS 0.000 |
| `/offer/` (Arabic offer) | desktop | **100** | **96** | **100** | **100** | LCP 364ms · TBT 0ms · CLS 0.000 |
| `/en/offer/` (English offer) | mobile | **100** | **96** | **100** | **100** | LCP 1505ms · TBT 0ms · CLS 0.000 |
| `/en/offer/` (English offer) | desktop | **100** | **96** | **100** | **100** | LCP 363ms · TBT 0ms · CLS 0.000 |

Zero spread: all three runs of every configuration returned the identical four scores. The only score that
is not 100 anywhere is the Arabic home page's mobile performance, 99, and it is 99 on all three runs.

## What the orange revert cost: nothing on the scoreboard, and this is the honest reading

`--orange-text: #CE340A` was removed on 2026-09-24 and every orange on the site is `#FF5F29` again, ink
included (`build-spec.md` §14b). **No score moved. All eight rows are identical to the run before it**, to
the point and to the millisecond of LCP: accessibility was 96 then and is 96 now.

That is not luck, it is the shape of the audit. `color-contrast` is **one binary audit** weighted 7 of 185,
so it costs the same 4 points whether one node fails or thirty. `.strip-pill` was already failing and is
still failing, so the audit was already lost; putting the eyebrows and the §7 metric back to `#FF5F29`
added **failing nodes, not failing audits**. The four points were never available while the pill stands.

**What is now failing, exactly, measured per node:**

| Element | Where | Contrast | Threshold it misses |
|---|---|---|---|
| `.strip-pill` | homepage strip, offer hero | white on `#FF5F29`, **3.03** | needs 4.5 (14px mobile / 16.9px desktop, under the 18.66px large-text line). **Unchanged by the revert — this is the one that holds the score at 96.** |
| `.wwd-num` ×3 | §4 outline numerals | `#FF5F29` on `#F2F3F5`, **2.73** | needs 3.0. Decorative, `aria-hidden="true"`; axe reads the `-webkit-text-stroke` anyway. **Unchanged by the revert.** |
| `.eyebrow` §4, §8 | on `#F2F3F5` / `#F4F5F6` | **2.73 / 2.77** | needs 3.0 at desktop size, 4.5 at the 14px mobile floor. Back since the revert. |
| `.eyebrow` §3, §5, §7 | on `#FEFEFE` | **3.00** | passes at desktop size (20px bold clears the 3.0 large-text bar exactly); fails at the 14px mobile floor, which needs 4.5. Back since the revert. |
| `.work-metric` ×6 | §7 cards | `#FF5F29` on `#FEFEFE`, **3.00** | passes desktop (20px bold), fails mobile (15px floor needs 4.5). Back since the revert. |

**So the honest summary:** the revert added contrast-failing nodes and changed no score. Desktop adds
5 nodes (two eyebrows, three numerals) beside the pill; mobile adds roughly two dozen, almost all of them
the same three roles repeated per card. If Ahmad ever takes the pill to `var(--ink)`, **the score still
will not reach 100** while the brand orange is ink anywhere on a light surface — that would then be the
real decision, and it is option (a) in the aesthetics audit: orange out of ink entirely, fills only.

## Accessibility is 96, and this is the honest number

Lighthouse's accessibility score is a weighted average of **binary** audits. `color-contrast` carries
weight **7 of 185** on the homepage and 7 of 164 on the offer page, so one failing node costs the same as
fifty: **it is 96 or it is 100, there is no 98.** Two nodes are left failing, both deliberately.

| Element | Measured | Why it is still failing |
|---|---|---|
| `.strip-pill` (`Limited offer`) | white on `#FF5F29`, **3.03:1** | This is the one the brand colour cannot carry. `#FF5F29` is Ahmad's locked fill and white on it is 3.03:1, which only satisfies AA as *large text* at 18.66px or more. The pill label is **18px**, measured off `hero-C.png` and locked in `build-spec.md` §2.2, and Lighthouse renders it at 16.875px desktop and 14px mobile. Weight 700 (now board-matched) is not enough on its own. The only ways out are a bigger label or near-black text on the pill, and both change an approved board. **One line if Ahmad wants the four points:** `.strip-pill { color: var(--ink); }` — 6.52:1, and it matches the black-on-orange highlight rule the rest of the site already uses. |
| `.wwd-num` (`01` `02` `03`) | `#FF5F29` on `#F2F3F5`, **2.73:1** | Decorative and already `aria-hidden="true"`; axe reads its `-webkit-text-stroke` colour anyway. It is a 76px outline numeral and recolouring it would be the most visible change on the page for something no screen reader announces. It needs only 3.0:1, so a barely perceptible darkening would clear it — but with the pill failing it buys nothing, so the design is left alone. |

**Superseded in part, 2026-09-24.** The two rows above are still the reason the score is 96, and they are
still left deliberately. What has changed is that the eyebrows and the §7 metrics are **no longer passing**:
`--orange-text` was reverted, so they are `#FF5F29` again. The full per-node picture is in "What the orange
revert cost" above. `label-content-name-mismatch` is still gone (the logo anchor no longer carries a
redundant `aria-label` over an `aria-hidden` half of its own visible text) and `--muted-on-light` is still
`#686F79`, so every grey on the light sections and the primary button still pass. See
`design/build-spec.md` §14 and §14b for what moved and what did not.

## Reproducing

Harness: `<scratch>/lighthouse-run/run.mjs`, deps installed in that folder, raw LHRs in `results/`,
console log in `run.log`, medians in `results/summary.json`.

```bash
npx --yes serve -l 8823 clients/q8block/site   # or any static server on the built site/
cd <scratch>/lighthouse-run && node run.mjs
```

## Open, and not from this pass

`scripts/seo-audit.mjs` still reports **5 high** findings, all one root cause and all pre-existing: the
footer and the sitemap point at `/google-business-profile-checklist.html`, which was moved into `_old/`
during the rebuild. It is a launch blocker under the `seo` skill's gate and it needs a decision — rebuild
the page or drop the link from `src/data.mjs` (lines 248 and 460) and the sitemap.
