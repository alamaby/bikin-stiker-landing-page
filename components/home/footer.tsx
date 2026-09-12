import Link from "next/link";
import { useTranslations } from "next-intl";

interface FooterProps {
  locale?: string;
}

export function Footer({ locale = "en" }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold tracking-tight">BikinStiker</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Platforms</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Android
                </a>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_IOS_APP_URL ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  iOS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
