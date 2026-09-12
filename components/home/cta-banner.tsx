import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  locale: string;
}

export function CtaBanner({ locale }: CtaBannerProps) {
  const t = useTranslations("cta");

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 opacity-90">{t("subtitle")}</p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary"
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
              {t("button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
