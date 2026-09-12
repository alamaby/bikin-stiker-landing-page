import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tiers = ["free", "plus", "pro"] as const;

export function PricingTable() {
  const t = useTranslations("pricing");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => {
        const features = [
          t(`${tier}.feature1`),
          t(`${tier}.feature2`),
          t(`${tier}.feature3`),
          t(`${tier}.feature4`),
        ];

        return (
          <Card
            key={tier}
            className={
              tier === "plus"
                ? "border-primary shadow-lg ring-2 ring-primary/20"
                : ""
            }
          >
            {tier === "plus" && (
              <div className="rounded-t-lg bg-primary px-4 py-1.5 text-center text-xs font-semibold text-primary-foreground">
                {t("plus.popular")}
              </div>
            )}
            <CardHeader>
              <CardTitle>{t(`${tier}.name`)}</CardTitle>
              <CardDescription>{t(`${tier}.description`)}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{t(`${tier}.price`)}</span>
                <span className="text-muted-foreground"> / {t(`${tier}.period`)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={tier === "plus" ? "default" : "outline"}
                render={
                  <a
                    href={
                      process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
                      "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {t(`${tier}.cta`)}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
