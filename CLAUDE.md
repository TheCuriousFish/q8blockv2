# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment

Credentials are stored in `.env` (gitignored). Always read from there — never hardcode tokens in commands.

```bash
# Load token before any GitHub API call
source .env
curl -H "Authorization: token $GITHUB_TOKEN" ...
```
