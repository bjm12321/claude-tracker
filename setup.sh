#!/usr/bin/env bash
# One-shot setup: creates both repos, pushes the app + backups, enables GitHub Pages.
# Run this from the folder that contains the unzipped `claude-tracker/` and
# `claude-tracker-backups/` directories. Requires the `gh` CLI, logged in (`gh auth status`).
set -euo pipefail

OWNER="$(gh api user --jq .login)"
echo "GitHub user: $OWNER"

# --- App repo (public) ------------------------------------------------------
cd claude-tracker
git init -q
git branch -M main
git add -A
git commit -q -m "Account tracker: empty-boot app + PWA + GitHub sync"
gh repo create "$OWNER/claude-tracker" --public --source=. --remote=origin --push \
  --description "Track usage limits and projects across multiple Claude accounts."
cd ..

# --- Backups repo (private) -------------------------------------------------
cd claude-tracker-backups
git init -q
git branch -M main
git add -A
git commit -q -m "Backups repo: workflow docs + backups/ folder"
gh repo create "$OWNER/claude-tracker-backups" --private --source=. --remote=origin --push \
  --description "Private, versioned backups of my Account Tracker data."
cd ..

# --- Enable GitHub Pages on the public app (deploy from main / root) --------
gh api -X POST "repos/$OWNER/claude-tracker/pages" \
  -f "build_type=legacy" \
  -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || \
  echo "(Pages may already be enabled — continuing.)"

echo
echo "Done. Your app will be live in ~1-2 minutes at:"
echo "  https://$OWNER.github.io/claude-tracker/"
echo
echo "Check build status any time with:  gh api repos/$OWNER/claude-tracker/pages --jq .status"
