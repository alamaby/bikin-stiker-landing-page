# BikinStiker Landing Page

Marketing site + share-mission infrastructure for [BikinStiker](https://bikinstiker.alamaby.com).

## Stack

- Next.js 16 App Router (React Server Components)
- Tailwind CSS + Shadcn/ui
- `next-intl` for EN + ID
- Vercel deployment

## Setup

```bash
npm install
```

Copy `.env.example` to `.env.local` and fill in the required values.

## Development

```bash
npm run dev
# Opens at http://localhost:3000 → redirects to /en or /id
```

## Build

Prebuild scripts run automatically via `prebuild` npm lifecycle:

```bash
npm run build
```

## Environment Variables (Vercel Dashboard)

| Variable | Description | Example |
|---|---|---|
| `SUPABASE_PROJECT_REF` | Supabase project reference | `abcdefghij` |
| `APPLE_TEAM_ID` | Apple Developer Team ID | `ABCDE12345` |
| `APPLE_BUNDLE_ID` | iOS app bundle ID | `com.alamaby.bikin_stiker` |
| `NEXT_PUBLIC_IOS_APP_URL` | App Store URL | `https://apps.apple.com/...` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | `https://bikinstiker.alamaby.com` |
| `NEXT_PUBLIC_APP_DOWNLOAD_URL` | Play Store URL | `https://play.google.com/...` |

## Routes

| Path | Description |
|---|---|
| `/en`, `/id` | Home (locale-scoped) |
| `/en/pricing`, `/id/pricing` | Pricing page |
| `/en/faq`, `/id/faq` | FAQ |
| `/en/privacy`, `/id/privacy` | Privacy Policy |
| `/en/terms`, `/id/terms` | Terms of Service |
| `/.well-known/apple-app-site-association` | Apple App Link association |
| `/r/:token` | Short link → Supabase Edge Function |
| `/share-claimed/:id` | Share claim callback |

## Validation (post-deploy)

- iOS: https://branch.io/resources/aasa-validator/

## Production Checklist

1. Set all environment variables in Vercel dashboard before first deploy
2. Set Apple env vars (`APPLE_TEAM_ID`, `APPLE_BUNDLE_ID`) if an Apple Developer account exists (optional; AASA generates with empty appIDs otherwise)
3. Verify Universal Links with the validator above (if Apple env is set)
4. Test share flow: app → share link → recipient opens → app claims reward
