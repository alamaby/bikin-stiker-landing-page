import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
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
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: July 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using BikinStiker, you agree to these Terms of Service. If you
            do not agree, please do not use the service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            BikinStiker provides AI-powered sticker generation. You can create
            stickers from text prompts, save them to packs, and share them.
            Credits are used to generate stickers.
          </p>

          <h2>3. User Content</h2>
          <p>
            You retain ownership of content you create. By using our AI
            generation, you confirm you have the right to use any prompts you
            submit. Generated stickers are for personal use unless otherwise
            noted.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>
            You agree not to: generate illegal, harmful, or offensive content;
            use the service to spam or harass others; attempt to circumvent
            credit systems; or reverse engineer the service.
          </p>

          <h2>5. Subscriptions &amp; Billing</h2>
          <p>
            Paid subscriptions renew automatically. You can cancel anytime
            through your app store account. Refunds are handled per the
            respective app store policies.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            BikinStiker is provided "as is" without warranties. We do not
            guarantee uninterrupted or error-free service.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, BikinStiker is not liable
            for indirect, incidental, or consequential damages.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use after changes
            constitutes acceptance of the new terms.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these terms: legal@bikinstiker.com
          </p>
        </article>
      </div>
    </div>
  );
}
