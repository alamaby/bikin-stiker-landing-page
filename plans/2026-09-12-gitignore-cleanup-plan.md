# Gitignore & Build-Artifact Cleanup Plan

Created: 2026-09-12 00:00:00

## Objective
Ensure only source files are committed; generated outputs and environment-specific artefacts are ignored.

## Scope
- Edit `.gitignore`, `.well-known` template strategy, `generate-vercel-json.mjs` fail-fast, `inject-placeholders.mjs` template-based generation.
- Out of scope: secret rotation, CI/Vercel env configuration changes.

## Milestones
1. Harden `.gitignore` (env opt-out, generated config, OS/IDE)
2. Convert `.well-known` outputs to `.in` templates + ignore generated
3. Fail-fast `vercel.json` generation on missing env
4. Verify + finalise

## Tasks
- [x] Perbaiki `.gitignore`:
  - [x] Tambah `!.env.example` setelah `.env*`
  - [x] Tambah `/vercel.json` (generated) — pertahankan `vercel.json.in`
  - [x] Tambah `public/.well-known/apple-app-site-association` + `assetlinks.json` ignore
  - [x] Tambah OS artefak: `Thumbs.db`, `ehthumbs.db`, `Desktop.ini`
  - [x] Tambah editor/IDE: `.idea/`, `.vscode/*`, `!/.vscode/extensions.json`, `*.swp`, `*~`
- [x] Template `.well-known`:
  - [x] Buat `apple-app-site-association.in` dengan `<APPLE_TEAM_ID>` + `<BUNDLE_ID>` placeholder
  - [x] Buat `assetlinks.json.in` dengan `<ANDROID_SHA256_FINGERPRINT>` placeholder
  - [x] Hapus file generated lama (`apple-app-site-association`, `assetlinks.json`, `vercel.json`)
  - [x] Update `inject-placeholders.mjs`: baca `*.in` → tulis output, fail-fast bila env kosong
- [x] Fail-fast `generate-vercel-json.mjs`: abort bila `SUPABASE_PROJECT_REF` kosong
- [x] Verifikasi:
  - [x] `git check-ignore -v .env.example` → tidak ignore
  - [x] `git check-ignore -v .env.local` → ter-ignore
  - [x] `git check-ignore -v vercel.json` → ter-ignore
  - [x] `git check-ignore -v vercel.json.in` → tidak ignore
  - [x] `git check-ignore -v *.well-known/*in` → tidak ignore
  - [x] `git check-ignore -v *.well-known/apple-app-site-association assetlinks.json` → ter-ignore

## Risks
- Fail-fast pada `vercel.json` (SUPABASE_PROJECT_REF) dapat memutus deploy bila env belum diset.
- Apple env (`APPLE_TEAM_ID`, `APPLE_BUNDLE_ID`) opsional — karena aplikasi fokus Android dan Apple Developer belum ada. AASA generate dengan `appIDs: []` bila kosong, tetap valid.
- Android env (`ANDROID_SHA256_FINGERPRINT`) tetap hard-required untuk menghindari assetlinks palsu.

## Progress Log
- 2026-09-12 — Build Mode: harden `.gitignore`, template `.well-known`, fail-fast `vercel.json`, verifikasi `git check-ignore`.
- 2026-09-12 — Vercel deploy error: `APPLE_TEAM_ID` required sebelumnya, padahal Apple Developer belum ada. Koreksi: Apple opsional (appIDs: [] bila kosong), Android tetap hard-required.
