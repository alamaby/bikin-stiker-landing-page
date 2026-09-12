import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            {t("subheadline")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              render={
                <a
                  href={
                    process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
                    "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#showcase" />}
            >
              {t("ctaSecondary")}
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
