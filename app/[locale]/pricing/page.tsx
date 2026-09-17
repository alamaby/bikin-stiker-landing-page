import { setRequestLocale } from "next-intl/server";
import { PricingTable } from "@/components/pricing/pricing-table";

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isId = locale === "id";

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {isId ? "Harga" : "Pricing"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isId
              ? "Harga sederhana & transparan. Mulai gratis, upgrade kapan saja."
              : "Simple, transparent pricing. Start free, upgrade anytime."}
          </p>
        </div>
        <div className="mt-16">
          <PricingTable />
        </div>
      </div>
    </div>
  );
}
