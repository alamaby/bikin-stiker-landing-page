import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesGrid } from "@/components/home/features-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { ShowcaseGallery } from "@/components/home/showcase-gallery";
import { CtaBanner } from "@/components/home/cta-banner";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <ShowcaseGallery />
      <CtaBanner />
    </>
  );
}
