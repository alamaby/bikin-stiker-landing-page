import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Redirect /r/<token> to the Supabase share-redirect edge function.
  // This bypasses the Vercel rewrite (which depends on prebuild-generated vercel.json)
  // and works reliably regardless of how the project was deployed.
  const match = req.nextUrl.pathname.match(/^\/r\/([^/?#]+)/);
  const projectRef = process.env.SUPABASE_PROJECT_REF ?? "";
  if (match && projectRef) {
    const token = decodeURIComponent(match[1]);
    const url = new URL(
      `https://${projectRef}.supabase.co/functions/v1/share-redirect?token=${encodeURIComponent(token)}`,
    );
    return NextResponse.redirect(url, 302);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|share-claimed).*)",
  ],
};
