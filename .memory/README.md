# Project Memory

Last updated: 2026-10-15 10:00:00 +07:00
Format version: 1

## Current State
- Landing page BikinStiker (Next.js 16 App Router + Tailwind v4 + next-intl en/id) sudah dimigrasi penuh ke Preline UI 4.2.0 (Opsi B). shadcn/Base UI dihapus.
- Verifikasi: lint bersih, `tsc --noEmit` OK, `next build` OK (14 halaman static), `next start` semua route 200.
- **Current work (10:00):** `/en|id/terms` disinkron ke ToS app v2026-10-15
  (lisensi terbatas upstream, atribusi Pixazo Free, IP clearance,
  disclosure AI). Lint + tsc bersih; BELUM deploy Vercel.
- **Current work (10:40):** `/en|id/privacy` disinkron ke Privacy app
  v2026-10-15 (Gemini unpaid disclosure + training-use). Lint + tsc
  bersih; BELUM deploy Vercel.

## Active Decisions
- Opsi B full Preline; `shadcn`, `@base-ui/react`, `class-variance-authority`, `tw-animate-css` di-uninstall; `components/ui/*` + `components.json` dihapus.
- `lucide-react`, `clsx` + `tailwind-merge` (`cn()`) dipertahankan sebagai ikon/util di dalam wrapper Preline.
- Import theme Preline memakai path paket 4.2.0 yang benar: `preline/css/themes/theme.css` (docs `preline/theme.css` kedaluwarsa).
- Dark mode class-based `.dark` + `ThemeScript` anti-FOUC di `<head>` (key `hs_theme`).
- Deps berat Preline (jquery/lodash/datatables/dll) TIDAK diinstall — tidak dibutuhkan landing page.

## Open Items / Blockers
- `npm run build` penuh gagal di prebuild lokal karena `SUPABASE_PROJECT_REF` tidak ada di env (pre-existing, hanya berpengaruh saat generate `vercel.json`; di Vercel env tersedia).
- QA visual live (klik mobile menu/accordion/dark toggle di browser) belum dilakukan — proses dev server tidak persist di environment ini; perlu cek manual via `npm run dev`.

## Legacy Archive
- Tidak ada (`PROJECT_MEMORY.md` tidak pernah ada).

## Recent Entries
- [2026-10-15 — privacy gemini-unpaid sync](./2026-10-15/104000-privacy-gemini-unpaid-sync.md)
- [2026-10-15 — terms commercial-rights sync](./2026-10-15/100000-terms-commercial-rights-sync.md)
- [2026-09-17 — full revamp ke Preline UI](./2026-09-17/084500-preline-revamp.md)
