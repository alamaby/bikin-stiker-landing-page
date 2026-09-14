# Remove ANDROID_SHA256_FINGERPRINT Requirement

Created: 2026-09-14 11:38:22

## Objective

Build dan deploy (`npm run build` + Vercel) harus sukses **tanpa** environment variable
`ANDROID_SHA256_FINGERPRINT`. Tidak ada lagi file `assetlinks.json` yang di-generate
saat prebuild. Alur share mission (`/r/:token` → edge function `share-redirect` →
`/share-claimed/:id` → deep link `bikinstiker://` + fallback Play Store) **tidak diubah
sama sekali**.

Latar belakang: env ini dipakai di `public/.well-known/assetlinks.json.in:7` sebagai
`sha256_cert_fingerprints` untuk verifikasi Android App Links, dan script
`scripts/inject-placeholders.mjs:58-62` me-hard-require env tersebut (build gagal bila
kosong). Keputusan: App Links dicabut, cukup arahkan pengguna ke halaman Play Store
melalui flow yang sudah ada (tombol fallback di halaman `/share-claimed`).

## Scope

In scope:
- Hapus template `assetlinks.json.in` + logika generasinya
- Hapus env `ANDROID_SHA256_FINGERPRINT` dari `.env.example` dan `README.md`
- Bersihkan `.gitignore` dan dokumentasi terkait `assetlinks.json`
- Verifikasi build sukses tanpa env tersebut

Out of scope (JANGAN disentuh):
- Edge function `share-redirect` (di repo/proyek Supabase lain, bukan repo ini)
- `app/share-claimed/[id]/page.tsx` dan seluruh logika deep link `bikinstiker://`
- `components/share-claimed/open-app-button.tsx` (dead code, biarkan — cleanup terpisah)
- `middleware.ts`, `vercel.json.in`, `scripts/generate-vercel-json.mjs`
  (`SUPABASE_PROJECT_REF` tetap hard-required, itu untuk redirect `/r/:token`)
- Apple AASA (`public/.well-known/apple-app-site-association.in`,
  `APPLE_TEAM_ID`, `APPLE_BUNDLE_ID`) — sudah opsional (`appIDs: []` bila kosong)
- `plans/2026-09-12-gitignore-cleanup-plan.md` — arsip historis, jangan diubah

## Milestones

1. Hapus file template assetlinks + logika generate-nya
2. Bersihkan env example, gitignore, dan dokumentasi
3. Verifikasi build hijau tanpa env tersebut

## Tasks

- [ ] 1. Hapus file `public/.well-known/assetlinks.json.in` (delete file).
  Isi file saat ini (untuk konfirmasi kamu menghapus file yang benar):
  ```json
  [
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.alamaby.bikin_stiker",
        "sha256_cert_fingerprints": ["<ANDROID_SHA256_FINGERPRINT>"]
      }
    }
  ]
  ```
- [ ] 2. Edit `scripts/inject-placeholders.mjs`:
  - Hapus blok berikut (baris 55–62):
    ```js
    const assetlinksSrc = resolve(ROOT, "public/.well-known/assetlinks.json.in");
    const assetlinksDst = resolve(ROOT, "public/.well-known/assetlinks.json");
    substitute(assetlinksSrc, assetlinksDst, {
      "<ANDROID_SHA256_FINGERPRINT>": {
        value: process.env.ANDROID_SHA256_FINGERPRINT ?? "",
        required: true,
      },
    });
    ```
  - Perbarui komentar header (baris 2–8). Sebelum:
    ```
     * inject-placeholders.mjs
     * Prebuild script: fills .well-known templates (*.in) with real env values.
     * Hard-fail only for Android (production app). Apple placeholders are optional
     * until an Apple Developer account is provisioned — empty appIDs array keeps
     * the AASA valid for iOS apps that are not yet published.
    ```
    Sesudah:
    ```
     * inject-placeholders.mjs
     * Prebuild script: fills .well-known templates (*.in) with real env values.
     * Apple placeholders are optional until an Apple Developer account is
     * provisioned — empty appIDs array keeps the AASA valid for iOS apps that
     * are not yet published.
    ```
  - `package.json` TIDAK diubah (prebuild tetap jalan untuk AASA + vercel.json).
- [ ] 3. Edit `.gitignore` (baris 54–57). Sebelum:
    ```
    # generated .well-known files (built from *.in templates via prebuild)
    # keep *.in templates tracked, never commit generated output
    public/.well-known/apple-app-site-association
    public/.well-known/assetlinks.json
    ```
    Sesudah:
    ```
    # generated .well-known file (built from *.in template via prebuild)
    # keep *.in template tracked, never commit generated output
    public/.well-known/apple-app-site-association
    ```
- [ ] 4. Edit `.env.example`: hapus baris 7
    `ANDROID_SHA256_FINGERPRINT=   # Release key SHA-256 (Android app signing)`.
    Baris lain (`SUPABASE_PROJECT_REF`, `APPLE_TEAM_ID`, `APPLE_BUNDLE_ID`,
    `NEXT_PUBLIC_IOS_APP_URL`, `NEXT_PUBLIC_SITE_URL`,
    `NEXT_PUBLIC_APP_DOWNLOAD_URL`) tetap.
- [ ] 5. Edit `README.md`:
  - Tabel Environment Variables: hapus baris
    `` | `ANDROID_SHA256_FINGERPRINT` | Android release signing SHA-256 | `AA:BB:CC:...` | ``
  - Tabel Routes: hapus baris
    `` | `/.well-known/assetlinks.json` | Android App Link association | ``
    (baris AASA tetap).
  - Bagian Validation (post-deploy): hapus baris Android
    `- Android: https://developers.google.com/digital-asset-links/tools/test-apk-asset-association`
    (baris iOS tetap).
  - Production Checklist: langkah 2 saat ini
    `2. Replace all `<PLACEHOLDER>` values in `.well-known` files`
    → ubah menjadi
    `2. Set Apple env vars in Vercel dashboard if an Apple Developer account exists (optional; AASA generates with empty appIDs otherwise)`
    Langkah 3 (`Verify App / Universal Links with validators above`) → ubah menjadi
    `3. Verify Universal Links with the validator above (if Apple env is set)`.
- [ ] 6. Verifikasi (WAJIB, berurutan):
  1. `git status --porcelain` → hanya file yang diubah di atas (+ plan file ini)
     yang muncul; pastikan tidak ada file generated
     (`public/.well-known/assetlinks.json`, `apple-app-site-association`,
     `vercel.json`) yang ke-commit.
  2. Pastikan `ANDROID_SHA256_FINGERPRINT` tidak ter-set di environment lokal
     (`$env:ANDROID_SHA256_FINGERPRINT` kosong / tidak ada).
  3. `npm run build` → harus sukses tanpa error `[inject-placeholders]`.
  4. `rg -l "ANDROID_SHA256_FINGERPRINT|assetlinks" --glob '!plans/**' --glob '!node_modules/**' --glob '!.next/**'`
     → tidak ada hasil (tidak ada referensi tersisa kecuali arsip plan lama).

## Risks

- **Trade-off utama (diterima user):** tanpa `assetlinks.json`, Android tidak bisa
  memverifikasi App Links. Link `https://bikinstiker.com/...` akan terbuka di browser
  dulu, bukan langsung di aplikasi. Tombol "Open BikinStiker" di halaman
  `/share-claimed` tetap berfungsi via custom scheme `bikinstiker://` (tidak butuh
  signing) dengan fallback ke Play Store — flow ini tidak diubah.
- **Reversible:** jika suatu hari butuh App Links lagi, tinggal tambah ulang
  `assetlinks.json(.in)` + env fingerprint.
- `NEXT_PUBLIC_IOS_APP_URL` dan env `APPLE_*` sengaja dipertahankan walau iOS belum
  rilis — tidak dipakai halaman share manapun setelah ini? Catatan: setelah task di
  atas, `NEXT_PUBLIC_IOS_APP_URL` hanya dipakai `app/share-claimed/[id]/page.tsx`
  (tidak dihapus dalam scope ini). Jangan hapus env iOS dalam task ini.
- Opsional, tidak blocking (lakukan manual di dashboard, bukan di repo): hapus
  `ANDROID_SHA256_FINGERPRINT` dari Vercel environment variables agar tidak
  membingungkan. Build tidak akan gagal baik var itu ada maupun tidak.

## Progress Log

- 2026-09-14 11:38:22 — Plan dibuat (detail-only, implementasi dilanjut model lain).
  Scope dipersempit atas permintaan user: alur share mission tidak diubah, hanya
  mencabut kebutuhan env `ANDROID_SHA256_FINGERPRINT`.   Keputusan Q&A sebelumnya: hapus App Links Android + Apple sekaligus, UX
  langsung redirect Play Store, hapus deep link. Kemudian user mempersempit
  scope final: alur share JANGAN diubah, cukup cabut kebutuhan env
  `ANDROID_SHA256_FINGERPRINT`. Konsekuensi scope final: AASA dipertahankan
  apa adanya (tidak butuh env apa pun bila kosong, jadi tidak melanggar
  tujuan plan); halaman `/share-claimed`, edge function, dan deep link
  `bikinstiker://` tidak disentuh.
  Referensi: mission `share_app_daily` ("Share BikinStiker", reward 2 credits,
  `validation_type: share_app`, aktif) terverifikasi di DB production beserta
  flow `/r/:token` → `share-redirect` → `/share-claimed/:id`.
- 2026-09-14 11:40:xx — IMPLEMENTASI SELESAI. Semua task checkbox di atas
  ditandai selesai. Verifikasi:
  - `git status --porcelain`: hanya file sumber diedit + `plans/...md` baru;
    file generated (`apple-app-site-association`, `vercel.json`) ter-gitignore
    (`!!`), tidak akan ter-commit; tidak ada `assetlinks.json`.
  - `npm run build` sukses (EXIT_CODE=0) dengan `ANDROID_SHA256_FINGERPRINT`
    dan `APPLE_*` diset kosong — prebuild hanya generate AASA + vercel.json,
    tidak error `[inject-placeholders]`.
  - `rg` / grep audit: tidak ada referensi `ANDROID_SHA256_FINGERPRINT` atau
    `assetlinks` di file sumber (hanya tersisa di arsip plan 2026-09-12 dan
    file plan ini).
  - Alur share tidak disentuh: edge function `share-redirect` v2 + halaman
    `/share-claimed/[id]` (ƒ Dynamic di build) tetap ada, `bikinstiker://`
    tetap dipakai.

## Notes

- Konteks tambahan: deskripsi mission `share_app_daily` di DB berbunyi "earn
  5 credits" sedangkan `reward_credits`-nya 2 — inkonsistensi teks, kandidat
  perbaikan terpisah di luar scope plan ini.
- `components/share-claimed/open-app-button.tsx` adalah dead code (tidak di-import
  di mana pun) — kandidat cleanup terpisah, jangan campur ke task ini.
- Usulan commit setelah implementasi: `chore: drop ANDROID_SHA256_FINGERPRINT requirement`
