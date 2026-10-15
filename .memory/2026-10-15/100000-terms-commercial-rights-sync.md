# Terms Commercial-Rights Sync (option b) — 2026-10-15

## Task / Problem
Samakan halaman `/en|id/terms` landing dengan revisi ToS app v2026-10-15:
lisensi stiker terbatas upstream (Pixazo Free / Pollinations /
FLUX.1-schnell Apache-2.0), bukan kepemilikan penuh.

## Key files changed
- `app/[locale]/terms/page.tsx`: header Last Updated -> 15 Oktober 2026 /
  October 15, 2026; seksi 5 ID+EN (rantai aktif Pixazo Flux-1-Schnell +
  Pollinations fallback; SDXL/OpenRouter/Gemini disabled; dev disabled;
  metadata logged; no uniqueness/copyright; atribusi); seksi 6 ID+EN
  (limited/revocable/non-transferable/non-sublicensable/limited-commercial,
  Pixazo Free ownership, UU 28/2014, IP clearance, disclosure AI).

## Decisions
- Mirror ringkas gaya landing (tidak copy-paste penuh markdown app).
- Privacy/pricing tidak disentuh.

## Assumptions / Risks
- Landing hanya informatif; persetujuan mengikat tetap di aplikasi
  (legal consent registry). Counter: selisih kata landing vs app bisa
  dipersoalkan — mitigasi: struktur pasal 5/6 dan tanggal sinkron.
- Perlu deploy Vercel agar live sinkron dengan rilis app.

## Blockers / Unresolved
- Belum deploy Vercel (manual).

## Verification
- `npm run lint`: bersih.
- `npx tsc --noEmit`: bersih.
- `next build` TIDAK dijalankan (prebuild butuh SUPABASE_PROJECT_REF;
  issue pre-existing).

## Commit proposal
`docs(landing): sync terms to upstream-limited commercial license`
