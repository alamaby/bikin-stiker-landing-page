import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-[85rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-primary-foreground/90">{t("subtitle")}</p>
          <div className="mt-8">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-background-1 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
            >
              {t("button")}
              <ArrowRight className="size-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
