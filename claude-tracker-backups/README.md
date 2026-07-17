# claude-tracker-backups

Private, versioned backups of my [Account Tracker](https://bjm12321.github.io/claude-tracker/) data.

This repo is **private on purpose** — the files under `backups/` contain personal data
(account names, usage percentages, project notes). The tracker app itself is public and
holds no personal data; everything personal lives here and in my browser.

## Two ways to back up

### 1. One-tap from the app (the easy way)

1. In the tracker, open **☁︎ Sync & backup**.
2. Paste a fine-grained GitHub token (see below), tap **Save**.
3. Tap **Backup now**. The app writes `backups/YYYY-MM-DD.json` here.
   - It also auto-backs-up silently when you open the app if the last backup was
     more than ~20 hours ago.
4. To move data to a new device: install the app, add the token, tap **Restore latest**.

**Token setup (one time):** GitHub → Settings → Developer settings →
Fine-grained tokens → Generate new token → Repository access: *Only select repositories* →
`claude-tracker-backups` → Permissions → Repository permissions → **Contents: Read and write** →
Generate. Paste it into the app's Sync panel. The token is stored only on that device.

### 2. Manual (no token needed)

In the app open **☁︎ Sync & backup → Export** (copies your data to the clipboard), then
create a file here named `backups/YYYY-MM-DD.json`, paste, and commit. To restore, open a
backup file, copy its contents, and use **Import** in the app.

## Restoring

- **App:** Sync panel → *Restore latest* (pulls the newest dated file automatically).
- **Manual:** open any `backups/*.json`, copy it, and use *Import* in the app.

Backups are plain JSON in the shape `{ "accounts": [...], "order": [...] }`.
