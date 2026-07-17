# Account Tracker

A self-contained single-file web app for tracking usage limits (Daily / Weekly / Fable)
and projects across multiple Claude accounts. No build step, no backend — all data lives
in the visitor's own browser (`localStorage`).

**Live app:** https://bjm12321.github.io/claude-tracker/

This repo is public, but it contains **zero personal data** — the app boots empty. Your
account names, percentages, and project notes only ever exist in your own browser and
(optionally) in your **private** backup repo.

## Features

- Three limit bars per account with tap-to-edit sliders and live countdowns
- Resets clear themselves; Fable refill / FINAL / ENDED phases
- Projects with notes, close/reopen/delete
- Ready accounts sort to the top; drag ⠿ to reorder
- Add / rename / delete accounts
- Export / Import (JSON) and optional one-tap **backup/restore to a private GitHub repo**
- Installable to the iPhone home screen (PWA), works offline

## Backups

Open the **☁︎ Sync & backup** panel in the app. Paste a fine-grained GitHub token
scoped to only the private `claude-tracker-backups` repo (Contents: read & write). The app
can then:

- **Backup now** — writes `backups/YYYY-MM-DD.json` to the private repo
- **Restore latest** — pulls the newest backup back onto this device
- auto-backup silently on open if the last one was more than ~20h ago

The token is stored only in this device's `localStorage`. It is never committed and never
included in exports.

## Updating

Edit `index.html`, commit, and push to `main`. GitHub Pages redeploys automatically on
every push to the source branch. (On the phone the service worker may serve the old shell
once — reopen the app a second time to get the update.)
