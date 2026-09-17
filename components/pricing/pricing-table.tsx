import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = ["free", "plus", "pro"] as const;

const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker";

export function PricingTable() {
  const t = useTranslations("pricing");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <p className="text-center text-sm text-muted-foreground md:col-span-3">
        {t("roadmapNote")}
      </p>
      {tiers.map((tier) => {
        const features = [
          t(`${tier}.feature1`),
          t(`${tier}.feature2`),
          t(`${tier}.feature3`),
          t(`${tier}.feature4`),
        ];
        const badge = tier === "free" ? t("current") : t("roadmap");
        const isPopular = tier === "plus";

        return (
          <div
            key={tier}
            className={cn(
              "flex flex-col rounded-xl border bg-card text-sm shadow-2xs",
              isPopular
                ? "border-primary shadow-lg ring-2 ring-primary/20"
                : "border-card-line",
            )}
          >
            {isPopular && (
              <div className="rounded-t-xl bg-primary px-4 py-1.5 text-center text-xs font-semibold text-primary-foreground">
                {t("plus.popular")}
              </div>
            )}
            <div className="px-6 pt-5">
              <span className="inline-flex items-center gap-x-1.5 rounded-full border border-layer-line bg-layer px-2.5 py-0.5 text-xs font-medium text-layer-foreground">
                {badge}
              </span>
            </div>
            <div className="p-6 pt-4">
              <h3 className="text-base font-medium text-foreground">
                {t(`${tier}.name`)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`${tier}.description`)}
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">
                  {t(`${tier}.price`)}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  / {t(`${tier}.period`)}
                </span>
              </div>
            </div>
            <div className="px-6 pb-6">
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex items-center rounded-b-xl border-t border-card-line bg-card-footer/50 p-6">
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex w-full items-center justify-center gap-x-2 rounded-lg border px-4 py-2.5 text-sm font-medium focus:outline-hidden disabled:pointer-events-none disabled:opacity-50",
                  isPopular
                    ? "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus"
                    : "border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus",
                )}
              >
                {t(`${tier}.cta`)}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
