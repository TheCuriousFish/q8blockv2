# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

- **GitHub:** https://github.com/TheCuriousFish/q8blockv2
- **Branches:** `development` (active work) → `production` (deploy target)
- **Live site:** https://q8block.com/ — served by **Netlify**, not GitHub Pages.
  (The old `thecuriousfish.github.io/q8blockv2` line was stale; an SEO audit reasoned from it
  and reached the wrong conclusion about canonicals and redirects. Corrected 2026-09-24.)
- **Deploy:** Netlify builds the `production` branch only; branch and preview deploys are off.
  A push to `development` deploys nothing. `netlify.toml` sets `publish = "site"`, so only the
  built output is public — `design/`, `brand/`, `_old/`, `src/` and `scripts/` are never served.
- **URLs:** Arabic is primary at `/`, English mirrors at `/en/`. The old site was the other way
  round and 404'd `/en/`, while 478 links from client sites point at each. `netlify.toml` holds
  the 301s from the old shape.

## Company

Full NAP, brand colors, and service description are in [company.md](company.md). Always use that file as the source of truth for any copy, contact details, or address — in both English and Arabic.

## Environment

Credentials are stored in `.env` (gitignored). Always read from there — never hardcode tokens in commands.

```bash
# Load token before any GitHub API call
source .env
curl -H "Authorization: token $GITHUB_TOKEN" ...
```
