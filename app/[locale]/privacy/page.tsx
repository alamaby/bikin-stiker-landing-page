import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" size="sm" render={<Link href={`/${locale}`} />}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <article className="prose prose-stone dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: July 2026</p>

          <h2>1. Information We Collect</h2>
          <p>
            BikinStiker collects information you provide directly, including:
            prompts you enter to generate stickers, feedback ratings, and basic
            account information. We also collect usage data to improve our
            service.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use collected information to: generate AI-powered stickers,
            improve our models and user experience, process rewards and
            missions, and communicate with you about the service.
          </p>

          <h2>3. Data Storage</h2>
          <p>
            Sticker generations are processed and may be stored temporarily for
            quality purposes. Your sticker packs are stored locally on your
            device. Account data is stored securely in Supabase.
          </p>

          <h2>4. Sharing Data</h2>
          <p>
            We do not sell your personal information. Data may be shared with
            service providers who help us operate (e.g., Supabase for backend,
            AI generation services), and when required by law.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You can delete your account and associated data at any time by
            contacting us. You have the right to access, correct, or delete
            your personal information.
          </p>

          <h2>6. Contact</h2>
          <p>
            For privacy concerns, contact us at: privacy@bikinstiker.com
          </p>
        </article>
      </div>
    </div>
  );
}
