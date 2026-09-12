import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FaqAccordion() {
  const t = useTranslations("faq");

  return (
    <Accordion className="w-full">
      {faqKeys.map((key) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger>{t(key)}</AccordionTrigger>
          <AccordionContent>
            {t(`a${key.slice(1)}` as "a1" | "a2" | "a3" | "a4" | "a5" | "a6")}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
