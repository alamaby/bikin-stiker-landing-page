import Link from "next/link";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

interface FooterProps {
  locale?: string;
}

export function Footer({ locale = "en" }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-footer-line bg-footer">
      <div className="mx-auto w-full max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground focus:outline-hidden"
              aria-label="BikinStiker"
            >
              <Sparkles className="size-5 shrink-0 text-primary" />
              BikinStiker
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-hidden"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-hidden"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-hidden"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Platforms</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-hidden"
                >
                  Android
                </a>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_IOS_APP_URL ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-hidden"
                >
                  iOS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-footer-line pt-8 text-center text-sm text-muted-foreground">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
