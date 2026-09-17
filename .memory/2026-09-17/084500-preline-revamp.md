# Full Revamp ke Preline UI (Opsi B)

## Task
Romabak landing page agar memakai Preline UI secara penuh: hapus shadcn/Base UI, tambah mobile menu + dark-mode toggle, visual ikut rekomendasi Preline blocks.

## Key Files Changed
- Baru: `components/PrelineClient.tsx` (loader `preline/non-auto`, `cleanCollection()` + `autoInit()` per pathname), `components/ThemeScript.tsx` (bootstrap `hs_theme` anti-FOUC), `plans/2026-09-16-preline-revamp-plan.md`.
- Rewrite: `app/globals.css`, `app/layout.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/pricing/page.tsx`, `app/[locale]/faq/page.tsx`, `app/[locale]/privacy/page.tsx`, `app/[locale]/terms/page.tsx`, `app/share-claimed/[id]/page.tsx`, `components/home/*` (header, hero-section, features-grid, how-it-works, showcase-gallery, cta-banner, footer), `components/pricing/pricing-table.tsx`, `components/faq/faq-accordion.tsx`.
- Hapus: `components/ui/*`, `components.json`, dead code `components/share-claimed/open-app-button.tsx`; uninstall `@base-ui/react`, `class-variance-authority`, `shadcn`, `tw-animate-css`; install `preline@4.2.0`.

## Decisions
- Opsi B full (bukan hybrid): satu design system, markup 1:1 dengan docs Preline.
- HeroSection/CtaBanner dilepas dari prop `locale` (tak terpakai setelah rewrite) — caller `app/[locale]/page.tsx` disesuaikan.
- How-it-works memakai Timeline statis (tanpa `hs-stepper` JS); showcase tetap grid + hover overlay (tanpa `hs-carousel` agar tanpa layout shift).

## Assumptions / Risks
- Token warna berganti total (oklch neutral shadcn → Preline Default blue/gray) — diterima sebagai konsekuensi Opsi B; disarankan screenshot sebelum/sesudah.
- Base UI focus/keyboard handling hilang — Preline HS plugins sudah accessible, tapi perlu QA keyboard manual.
- `npm run build` lokal gagal di prebuild (`SUPABASE_PROJECT_REF` unset) — pre-existing, bukan regresi.

## Blockers / Unresolved
- QA klik manual (mobile collapse, accordion, dropdown locale, dark persist + navigasi client-side) belum dilakukan — butuh `npm run dev` + browser sungguhan.

## Verification
- `npm run lint` bersih; `npx tsc --noEmit` exit 0; `npx next build` sukses (14 halaman static, TS OK).
- `next start`: `/en`, `/id`, `/en/faq`, `/id/pricing`, `/en/privacy`, `/share-claimed/abc?status=ok&credits=5` semua 200.
- Prerendered HTML memuat `hs-collapse`, `hs-dropdown`, `data-hs-theme-click-value`, `hs-accordion-group`, `hs-theme-script`; CSS build memuat token `:root`/`.dark` + varian `hs-*`; bundle JS memuat `HSStaticMethods`/`cleanCollection`.

## Commit Proposal
`feat!: migrate landing page to preline ui`

## Related
- Plan: `plans/2026-09-16-preline-revamp-plan.md`
- Docs: `preline.co/docs/frameworks-nextjs.html`, `preline.co/docs/guides/nextjs.html`, `preline.co/docs/dark-mode.html`
