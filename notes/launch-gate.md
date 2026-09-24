# Q8Block rebuild — what is waiting on Ahmad

Written 2026-09-24, overnight, after the design, build, three audits and the fix passes.
Everything below is either a decision only Ahmad can make, or a fact he needs before launch.

---

## 1. Decisions that are his, not an agent's

### 1.1 The offer strip pill — accessibility 96 vs 100
The "Limited offer" pill is white text on `#FF5F29`, which measures **3.03:1**. WCAG AA wants 4.5,
or 3.0 if the text qualifies as large. The board locks that label at 18px, just under the 18.66px
bold threshold, so it does not qualify.

Lighthouse weights `color-contrast` at 7 of 185 binary points, so one failing node costs what fifty
would. **The score is 96 or 100. There is no 98.**

| Option | Result | Cost |
|---|---|---|
| Leave it (current) | Accessibility **96** | None. Matches the approved board exactly. |
| `.strip-pill { color: var(--ink) }` | Accessibility **100** | Black text on the orange pill, 6.52:1. Deviates from the board. |

Not changed, because Ahmad approved that board with white text and asked for the build to match it.
One token, one rebuild, either way.

### 1.2 Orange as ink on light backgrounds
The eyebrows and the section 7 metrics are `#FF5F29` on light, measuring 2.73 to 3.00:1. A second,
darker orange was tried and reverted: the aesthetics audit found it read brick against the tangerine
brand orange, and made the eyebrow change colour three times down the page.

Three ways forward, all his call: keep as is and accept the contrast, use a darker orange for ink
only and accept the clash, or take orange out of ink entirely and set eyebrows in `--ink`. The last
one fixes contrast and the clash together but deviates from every board.

### 1.3 Section 9 headline width
"Your customers are searching. Be the answer." renders its first line at 1343px inside the locked
1320px container, so it sits about 11px into the section padding each side. Viewport safe, no
overflow. The type scale was NOT shrunk, because that is the failure that scrapped two earlier
builds. The real remedy is a slightly shorter line, and that is approved copy.

### 1.4 The countdown and the spots number
`CONFIG` at the top of `src/data.mjs` holds both. Currently the end date is a placeholder and spots
is 9. Ahmad sets the real values. Both pages render correctly with the countdown expired or the
spots line absent — that was built and tested deliberately.

---

## 2. Facts he should know

### 2.1 The site is on Netlify, not GitHub Pages
`q8block.com` responds with `Server: Netlify`. The client CLAUDE.md said GitHub Pages; it was stale,
the SEO audit believed it, and drew three wrong conclusions from it. CLAUDE.md is now corrected.

This matters because Netlify has a publish directory and supports redirects, which GitHub Pages
does not.

### 2.2 Nothing deploys from `development`
Netlify builds the `production` branch only; branch and preview deploys are off account-wide. The
push made tonight deploys nothing. **Going live is a separate, explicit decision.**

### 2.3 `netlify.toml` now exists, and it is load bearing
No `netlify.toml` had ever existed, so Netlify published the **repo root**. With the rebuild that
would have served `design/` (93 MB of design boards), `brand/` (rejected logo explorations),
`_old/` (the entire previous site), `src/` and `scripts/` at `q8block.com/...` — publicly fetchable.

`publish = "site"` closes that. It also carries eleven 301s for the URL flip: `/ar/` to `/`, plus
about, terms, the three blog pages and the landscaping onboarding page.

### 2.4 The URL flip heals 478 broken links
The old site served English at `/` and 404'd `/en/`. Ahmad's client sites contain 478 links to each.
The new site is Arabic at `/` and English at `/en/`, so both resolve.

### 2.5 `seo-audit.mjs` reports 5 high findings that are all false
The script only discovers pages named `index.html`, so it cannot see the flat-file
`google-business-profile-checklist.html` and flags every link and sitemap entry to it as missing.
Verified three times: the page is built, served, linked from all four pages, in the sitemap and in
`llms.txt`, in both languages. Worth fixing in the script itself so the gate stays trustworthy.

---

## 3. Deliberately not done

- About, contact and blog pages — Ahmad said later.
- The logo. Parked at his instruction. The header currently sets `Q8 block` as type, using the
  filled-orange box treatment from the approved boards.
- Deploy to production.
- Tier pricing anywhere on either page. Not decided, and inventing one is a launch blocker.

---

## 4. One proof figure you should look at yourself

**q8carwash.com shows `+900% Click growth, August 2025 to August 2026`.** True, and the card prints
its window so anyone can check it. But the full monthly series is:

| Aug 2025 | Peak, Jan 2026 | Aug 2026 |
|---|---|---|
| 8 clicks | **193 clicks** | 80 clicks |

The year-on-year figure is real because the window starts at the site's launch month. What it does
not say is that the site peaked in January and has since fallen 59% from that peak.

Nothing on the page is false. But this is the one card where a prospect with access to the data
could feel the number was chosen. Three options, all yours:

1. **Leave it.** True, windowed, checkable. Current state.
2. **Drop the figure**, as movingcompanykw.com does — name, sector and link only.
3. **Show the peak instead**: "193 clicks at its peak, January 2026." Also true, and it does not
   imply the trend continued.

Worth knowing separately: movingcompanykw.com is down 59% year on year (27 to 11 clicks), which is
why it carries no figure. q8carwash is the only other site below its own peak.
