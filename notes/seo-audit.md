# Q8Block — pre-launch SEO audit (2026-09-24)

Site under audit: `clients/q8block/site/` (built output), served locally at http://localhost:8823.
Pages: `/` (ar, primary), `/en/`, `/offer/` (ar), `/en/offer/`, plus the preserved
`google-business-profile-checklist.html`. Deploy target: **Netlify**, branch `production`
(`netlify.toml`: `publish = "site"`, `command = "node build.mjs"`).

**Correction — 2026-09-24:** this audit originally said the deploy target was GitHub Pages and
reasoned H1, H2 and finding #8 from that. It was wrong: `q8block.com` is served by Netlify
(verified — the live response carries `Server: Netlify`), and a `netlify.toml` exists in this repo
with `publish = "site"` and 9 `[[redirects]]` rules already written. H1, H2 and #8 are corrected
in place below rather than silently rewritten, so the mistake and the fix are both on record.

**Raw `node scripts/seo-audit.mjs` run: 5 high, 6 medium, 0 low.** All 5 "high" findings are
false positives — see "Audit-tool blind spot" below. After manually verifying those and hand-checking
everything the script structurally can't see (the flat-file checklist page, the CNAME/domain, the
deploy scope, the old site), the real count is:

## Totals (post manual verification; updated 2026-09-24 — see the Netlify correction above)
- **High: 4 found — 2 resolved (H1 domain, H2 deploy scope), 2 still open (H3 checklist canonical, H4 dead ar-link)**
- **Medium: 5 found — 1 resolved (#8 old-site redirects), 4 still open**
- **Low: 4**

## Audit-tool blind spot (explains the script's raw 5 high / read this first)
`scripts/seo-audit.mjs` only discovers pages by walking for files named `index.html`. The preserved
`google-business-profile-checklist.html` is a flat file, not a directory index, so the script never
adds it to its known-pages set. Every link to it (from all 4 built pages' footers) and its sitemap
entry then get reported as "internal link to a missing page" / "sitemap lists a page that does not
exist" — 5 high findings, all false. Confirmed by hand: the file exists on disk at the exact linked
path and the sitemap `<loc>` matches it exactly. **Do not fix this by deleting the links or the
sitemap entry** — the page is real. If anyone wants the script itself to stop flagging this, the fix
belongs in `.claude/skills/seo/scripts/seo-audit.mjs`'s page-discovery (out of scope for this audit —
not touched here).

Manually reading that same flat file, however, turned up two real high findings the script can't
catch at all (H3, H4 below), because it never parses non-`index.html` files.

## HIGH — fix before launch

1. ~~No GitHub Pages custom domain configured anywhere in the repo.~~ **RESOLVED — 2026-09-24, false
   alarm.** This finding assumed a GitHub Pages deploy and reasoned that a missing `CNAME` file left
   every `https://q8block.com/...` canonical/hreflang/OG/sitemap tag pointing at an unbound host.
   The deploy target isn't GitHub Pages — it's **Netlify** (verified: the live `q8block.com`
   response carries `Server: Netlify`). Netlify binds the custom domain in its own dashboard, not
   via a `CNAME` file in the repo, so there is nothing to add here. **The canonical URLs asserting
   `q8block.com` are correct as written.** No fix needed.

2. ~~Deploy-scope risk: nothing restricts the `production` branch to the built `site/` output.~~
   **CLOSED — 2026-09-24.** This assumed GitHub Pages, which serves a whole branch tree verbatim.
   The actual deploy target is Netlify, and a `netlify.toml` now exists with `publish = "site"` and
   `command = "node build.mjs"` — Netlify builds from the branch but publishes only the contents of
   `site/`, regardless of what else sits in the repo. `design/` (93 MB of boards), `brand/`, `_old/`,
   `scripts/`, `src/` and `notes/` are never served. No further action needed.

3. **`google-business-profile-checklist.html` has no `<link rel="canonical">` at all.** It's listed
   in `sitemap.xml` (`https://q8block.com/google-business-profile-checklist.html`) and linked from
   the footer of all 4 built pages, so it's a real indexable page with no self-reference — the same
   rule the script enforces as high on the other 4 pages. It also has no Open Graph or Twitter tags
   (see M1). **Fix:** add a canonical tag pointing at its own absolute URL.

4. **The checklist page's own language switch is a dead link.** Line 357:
   `<a href="ar/google-business-profile-checklist.html" class="lang-switch">العربية</a>` — this
   file does not exist anywhere in the new build (an Arabic version of the checklist existed only on
   the old `production` branch, at a different path). Clicking "العربية" on this page 404s.
   **Fix:** remove the link (no Arabic checklist exists in the new build) or build the Arabic version.

## MEDIUM

5. **Open Graph image missing on every page.** All 4 built pages carry `og:title`, `og:description`,
   `og:url`, `og:type`, and even `og:image:alt` — but never an actual `og:image`. Q8Block's own CTAs
   are `tel:` and `wa.me` links; WhatsApp link previews are exactly what `og:image` drives, so this
   is a real gap on the agency's own sales tool, not cosmetic. The checklist page has *no* OG or
   Twitter tags at all. **Fix:** add `og:image` (absolute URL, real dimensions) to all 5 pages.

6. **No branded 404 page.** Neither `site/404.html` nor `site/en/404.html` exists. `skyscraper`
   (the reference client) has both. Without one, GitHub Pages shows its generic Not Found page with
   no way back into the site. Listed explicitly in the seo skill's site-checklist (#4).

7. **No IndexNow key file at the site root.** `skyscraper` has `data/indexnow-key.txt` feeding one
   in; q8block has none. Needed before `scripts/indexnow.mjs`-style pinging can work post-launch.

8. ~~Old-site URLs with link/ranking value have no redirect plan, and GitHub Pages can't do
   server-side redirects.~~ **RESOLVED — 2026-09-24.** The "no server-side mechanism" conclusion
   assumed GitHub Pages; the actual target is Netlify, which supports true 301s via `netlify.toml`,
   and they are already written — 9 `[[redirects]]` rules covering every path this finding listed:
   - `/` and `/ar/` (old English/Arabic homepage flip) — not a redirect problem, both already
     resolve to real content in the new build, as noted originally.
   - `/blog.html`, `/blog-2.html`, `/blog-3.html` → `/` (301). `/ar/blog*.html`, `/ar/terms.html`
     land on `/` too, via the catch-all `/ar/*` → `/` rule.
   - `/about.html`, `/terms.html` → `/` (301).
   - `/ar/google-business-profile-checklist.html` → `/google-business-profile-checklist.html` (301,
     `force = true`) — and that target is now correctly the **Arabic** checklist page (fixed
     2026-09-24; see the site's own notes), so this redirect lands old visitors on the right locale.
   - `/landscaping/onboarding.html` → `/` (301).
   Ahmad's decision on where old URLs should land (homepage, not stub pages) is already reflected in
   `netlify.toml`. No further action needed.

9. **Unverified legal name / email on the checklist page footer.** It reads "Q8Block LLC" and
   `info@q8block.com`. Neither appears in `company.md` (the NAP source of truth), which has no
   corporate suffix and no email at all — everywhere else on the new site the name is "Q8 block" /
   "شركة كويت بلوك". Flagging per the no-invented-facts rule; needs verification against the real
   commercial licence, not a guess.

## LOW

10. Twitter Card is minimal (`twitter:card=summary` only — no `twitter:title/description/image`).
    Lower priority than #5 since Q8Block's actual channels (WhatsApp, calls) read Open Graph, not
    Twitter Cards.
11. Organization JSON-LD's `PostalAddress` has `streetAddress` + `addressCountry` only — no
    `addressLocality`/`addressRegion`. Not required for schema validity, but splitting it out would
    strengthen local rich-result eligibility if Q8Block ever wants a Maps presence for itself.
12. `robots.txt` has no explicit `Disallow` for `design/`, `brand/`, `_old/`, `scripts/`, `src/`,
    `notes/`. The real fix is deploy scope (H2) — this is belt-and-suspenders only, and useless on
    its own since `robots.txt` doesn't stop direct fetches, only compliant crawlers.
13. The checklist page's own logo links use relative `href="index.html"` (works correctly today
    since the file sits at the site root, but it's the only place on the site using relative paths
    instead of absolute `/` — fragile if the file ever moves, inconsistent style).

## Already correct — do not "fix" these
- Exactly one `<h1>` per page, clean heading order (h1 → h2 → h3, no skipped levels, no stray h4+),
  on all 4 built pages.
- No duplicate titles, descriptions, or H1s across the site; all within length budget (titles ≤62
  chars, descriptions 70–165) in both languages.
- Canonical tags present, absolute, self-referencing, no double slashes, on all 4 built pages.
- hreflang cluster (ar, en, x-default) present and correctly reciprocal on all 4 built pages, and it
  matches `sitemap.xml`'s per-URL hreflang alternates exactly.
- `lang`/`dir` correct per locale everywhere (`ar`/`rtl` on the two Arabic pages, `en`/`ltr` on the
  two English ones).
- JSON-LD present and parses cleanly on all 4 built pages: `Organization` (NAP matches `company.md`
  exactly, in both languages) + `FAQPage` (mirrors the visible accordion exactly — no invented
  questions, no orphaned schema answers).
- No invented facts found in the FAQ/body copy of the 4 built pages — growth figures and the
  "journey" timeline are sourced and dated ("المصدر: Google Search Console، بيانات حتى 24 سبتمبر
  2026"), not asserted blind.
- The homepage names no country; the offer page names Saudi Arabia only where it's the actual
  eligibility condition. Both intentional, confirmed against the design brief — not a gap.
- Internal linking between the four pages is complete (header nav, footer, lang-switch, offer strip
  CTA) — 0 orphans and 0 excess click-depth reported for the 4 built pages.
- Every image referenced on the 4 built pages exists on disk; no broken image paths.
- Images use `width`/`height` + `loading="lazy"`; empty `alt=""` is correct throughout because every
  icon/photo sits beside a heading or caption that already states its meaning in text.
- `sitemap.xml` covers all 4 built pages with correct `lastmod` (2026-09-24) and hreflang alternates
  that match each page's own `<head>` exactly.
- `robots.txt` allows crawling and points at the sitemap.
- `llms.txt` facts (phone, address) match `company.md` exactly and it lists all 5 live pages
  correctly.
- The 478-link / 478-link healing: `q8block.com/` and `q8block.com/en/` both now resolve to real,
  distinct content (200, not 404) — the old site 404'd on `/en/`. Both old backlink targets are
  satisfied structurally; nothing here is broken by the new build.

## Launch gate: NO, not clean yet
The automated `scripts/seo-audit.mjs` script itself is effectively clean (its 5 "high" results are
a confirmed tool blind spot, not real defects). This audit surfaced 4 real high-severity issues the
script structurally cannot see. **Update, 2026-09-24: 2 of those 4 are now closed.** #1 (missing
GitHub Pages custom domain) was a false alarm from a wrong deploy-target assumption — the site is on
Netlify, confirmed live, and the `q8block.com` canonicals are correct as written. #2 (deploy-scope
risk) is closed by `netlify.toml`'s `publish = "site"`. Finding #8 (medium — old-site redirects) is
resolved the same way: Netlify's redirects are already written in `netlify.toml`. What's still open
per this audit: the checklist page's canonical (#3) and dead ar-link (#4).
