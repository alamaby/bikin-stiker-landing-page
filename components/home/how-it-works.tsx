import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, Rocket } from "lucide-react";

const steps = ["step1", "step2", "step3"];
const icons = [Search, SlidersHorizontal, Rocket];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={step} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2rem)] top-8 hidden w-[calc(100%-4rem)] border-t border-dashed border-border md:block" />
                )}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">{t(`${step}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
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
