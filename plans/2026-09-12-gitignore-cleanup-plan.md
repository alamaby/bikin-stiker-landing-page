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
- Fail-fast bisa memutuskan deploy lokal dev bila env belum ter-set; migrasi `prebuild` di `package.json` sudah benar urutannya sehingga error muncul sebelum `next build`.
- Template `.well-known/*.in` memerlukan `public/` tetap serve di Next.js; artefak generated muncul saat runtime lokal tapi diignore.

## Progress Log
- 2026-09-12 — Build Mode: harden `.gitignore`, template `.well-known`, fail-fast `vercel.json`, verifikasi `git check-ignore`.
