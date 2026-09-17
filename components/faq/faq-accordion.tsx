import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FaqAccordion() {
  const t = useTranslations("faq");

  return (
    <div className="hs-accordion-group flex flex-col gap-3">
      {faqKeys.map((key, i) => {
        const isOpen = i === 0;
        return (
          <div
            key={key}
            className={cn(
              "hs-accordion rounded-xl border border-card-line bg-card",
              isOpen
                ? "active border-primary bg-primary/5"
                : "hs-accordion-active:border-primary hs-accordion-active:bg-primary/5",
            )}
            id={`hs-faq-accordion-${key}`}
          >
            <button
              type="button"
              className="hs-accordion-toggle inline-flex w-full items-center gap-x-3 rounded-xl px-5 py-4 text-start text-sm font-semibold text-foreground hover:text-primary-hover focus:text-primary-focus focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls={`hs-faq-accordion-collapse-${key}`}
            >
              {t(key)}
              <Plus className="hs-accordion-active:hidden ms-auto size-4 shrink-0" />
              <Minus className="hs-accordion-active:block ms-auto hidden size-4 shrink-0" />
            </button>
            <div
              id={`hs-faq-accordion-collapse-${key}`}
              className={cn(
                "hs-accordion-content w-full overflow-hidden transition-[height] duration-300",
                !isOpen && "hidden",
              )}
              role="region"
              aria-labelledby={`hs-faq-accordion-${key}`}
            >
              <div className="px-5 pb-5 text-sm text-muted-foreground">
                {t(
                  `a${key.slice(1)}` as "a1" | "a2" | "a3" | "a4" | "a5" | "a6",
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
