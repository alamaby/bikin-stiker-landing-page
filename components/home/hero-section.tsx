import { useTranslations } from "next-intl";
import { ArrowRight, Play } from "lucide-react";

const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-gradient-to-b from-primary/10 via-transparent to-transparent"
      />
      <div className="mx-auto max-w-[85rem] px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("subheadline")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
            >
              {t("cta")}
              <ArrowRight className="size-4 shrink-0" />
            </a>
            <a
              href="#showcase"
              className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-layer-line bg-layer px-4 py-3 text-sm font-medium text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
            >
              {t("ctaSecondary")}
              <Play className="size-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
