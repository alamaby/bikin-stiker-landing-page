import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, Rocket } from "lucide-react";

const steps = ["step1", "step2", "step3"];
const icons = [Search, SlidersHorizontal, Rocket];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="bg-background-1">
      <div className="mx-auto max-w-[85rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12">
          {steps.map((step, i) => {
            const Icon = icons[i];
            const isLast = i === steps.length - 1;
            return (
              <div key={step} className="group relative flex gap-x-5">
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="absolute start-8 top-16 bottom-0 w-px bg-border"
                  />
                )}
                <div className="relative shrink-0">
                  <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <Icon className="size-7 shrink-0" />
                  </span>
                  <span className="absolute -top-1 -end-1 flex size-6 items-center justify-center rounded-full border border-card-line bg-card text-xs font-bold text-foreground shadow-2xs">
                    {i + 1}
                  </span>
                </div>
                <div className="grow pb-10">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`${step}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`${step}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
