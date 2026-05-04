# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

- **GitHub:** https://github.com/TheCuriousFish/q8blockv2
- **Branches:** `development` (active work) → `production` (deploy target)
- **Live site:** https://thecuriousfish.github.io/q8blockv2/

## Company

Full NAP, brand colors, and service description are in [company.md](company.md). Always use that file as the source of truth for any copy, contact details, or address — in both English and Arabic.

## Environment

Credentials are stored in `.env` (gitignored). Always read from there — never hardcode tokens in commands.

```bash
# Load token before any GitHub API call
source .env
curl -H "Authorization: token $GITHUB_TOKEN" ...
```
