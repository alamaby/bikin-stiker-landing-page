# Preline Revamp Plan

Created: 2026-09-16 09:00:00

## Objective
Romabak landing page BikinStiker agar menggunakan Preline UI secara penuh (Opsi B): markup + `theme.css` + HS plugins via `preline/non-auto`, hapus shadcn/Base UI, tambah mobile menu + dark-mode toggle, tanpa merusak i18n en/id dan routing App Router.

## Scope
- In: `package.json`, `app/globals.css`, `app/layout.tsx`, `app/[locale]/layout.tsx`, komponen baru `components/PrelineClient.tsx` + `components/ThemeScript.tsx`, rewrite header/hero/features/how-it-works/showcase/cta/footer/pricing-table/faq-accordion/privacy/terms/share-claimed, hapus `components/ui/*` + `components.json` + dep `@base-ui/react`/`class-variance-authority`/`shadcn`/`tw-animate-css` (bila tak terpakai)
- Out: isi konten privacy/terms, logika deep-link/kredit share-claimed, deps berat `jquery/lodash/nouislider/dropzone/datatables/vanilla-calendar-pro/@tailwindcss/forms` (tidak dibutuhkan)

## Milestones
1. Fondasi Preline (install + CSS + loader + theme script + layout)
2. Navigasi + theming (header mobile collapse + locale dropdown + dark toggle)
3. Blok statis (hero/features/how/showcase/cta/footer/pricing/legal/share-claimed)
4. Blok interaktif + hapus shadcn + QA build

## Tasks
- [x] Tulis plan file ini + cek memory & baseline
- [x] Fondasi: `npm i preline`; `app/globals.css` (variants.css + @source + theme.css, hapus shadcn import + token oklch, pertahankan typography, `@custom-variant dark (&:where(.dark, .dark *))`); `components/PrelineClient.tsx` (non-auto + cleanCollection/autoInit per pathname); `components/ThemeScript.tsx` (snippet `hs_theme` anti-FOUC di `<head>`); mount di `app/layout.tsx`
- [x] Header: Preline collapsible navbar (`hs-collapse-toggle` + `data-hs-collapse`), locale jadi `hs-dropdown`, tambah `data-hs-theme-click-value` dark/light toggle, CTA jadi `<a>` Preline
- [x] Blok statis: hero (Center-Aligned Hero), features (Icon Blocks), how-it-works (Timeline), showcase (Gallery Grids + next/image), cta + footer Preline, pricing (Pricing Cards, plus highlighted), privacy/terms/share-claimed ganti Button/Card shadcn ke markup Preline
- [x] Interaktif + cleanup: faq-accordion ke `hs-accordion-group`; hapus `components/ui/*`; ganti semua import `@/components/ui/...` di 10 file; `npm uninstall @base-ui/react class-variance-authority shadcn tw-animate-css`; verifikasi `npm run lint`, `tsc --noEmit`, `npm run build`, QA en/id + mobile + dark persist + navigasi client-side

## Risks
- Token warna bergeser total (oklch neutral shadcn hilang diganti Preline Default theme) — mitigasi: screenshot sebelum/sesudah hero/pricing/CTA
- Lupa `cleanCollection()` per pathname — accordion/navbar mati setelah navigasi App Router; jangan pakai bare `import "preline"`
- Hapus Base UI menurunkan sebagian handling fokus/keyboard bawaan — QA keyboard Tab/Enter/Esc di navbar/accordion/dropdown
- Dark toggle berisiko FOUC — mitigasi: `ThemeScript` di `<head>`

## Progress Log
- 2026-09-16 09:00:00 — plan ditulis; keputusan: Opsi B full, hapus shadcn, tambah mobile menu + dark toggle, visual ikut rekomendasi
- 2026-09-17 08:45:00 — SEMUA TUGAS SELESAI. Temuan saat eksekusi: docs Preline kedaluwarsa — `preline/theme.css` tidak ada di paket 4.2.0, path benar `preline/css/themes/theme.css`. Hapus juga `tw-animate-css` + dead code `open-app-button.tsx`. Verifikasi: `npm run lint` bersih, `tsc --noEmit` exit 0, `npx next build` sukses 14 halaman static, `next start` semua route 200 (en/id/faq/pricing/privacy/share-claimed). Catatan: `npm run build` penuh gagal di prebuild karena `SUPABASE_PROJECT_REF` tidak ada di env lokal (pre-existing, tidak terkait perubahan ini). QA visual live tidak dilakukan (proses tidak persist antar shell); sebagai ganti verifikasi via prerendered HTML (hs-collapse/dropdown/accordion/theme-script ada) + CSS build (token :root light/dark + varian hs-* ada) + bundle JS (HSStaticMethods/cleanCollection terbundel).

## Notes
- Referensi: `preline.co/docs/frameworks-nextjs.html`, `preline.co/docs/guides/nextjs.html`, `preline.co/docs/dark-mode.html`, `preline.co/docs/components/navbar.html`, `preline.co/blocks`.
- `lucide-react`, `clsx`, `tailwind-merge` (`cn()`) dipertahankan sebagai util/ikon di dalam wrapper Preline.
- Konvensi commit yang diusulkan: `feat!: migrate landing page to preline ui`
