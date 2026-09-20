import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF ?? "";
const SHARE_REDIRECT_URL = SUPABASE_PROJECT_REF
  ? `https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/share-redirect`
  : "";

export default function middleware(req: Request) {
  // Redirect /r/<token> to the Supabase share-redirect edge function.
  // This bypasses the Vercel rewrite (which depends on prebuild-generated vercel.json)
  // and works reliably regardless of how the project was deployed.
  const match = req.nextUrl.pathname.match(/^\/r\/([^/?#]+)/);
  if (match && SHARE_REDIRECT_URL) {
    const token = decodeURIComponent(match[1]);
    const url = new URL(`${SHARE_REDIRECT_URL}?token=${encodeURIComponent(token)}`);
    return Response.redirect(url, 302);
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|share-claimed).*)",
  ],
};
