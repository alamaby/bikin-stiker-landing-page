import { setRequestLocale } from "next-intl/server";
import { FaqAccordion } from "@/components/faq/faq-accordion";

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            FAQ
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about BikinStiker
          </p>
        </div>
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
