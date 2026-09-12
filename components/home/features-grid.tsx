import { useTranslations } from "next-intl";
import { Zap, Share2, Gift, FolderOpen, Image, Wifi } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const icons = {
  aiGeneration: Zap,
  instantShare: Share2,
  rewards: Gift,
  collections: FolderOpen,
  highQuality: Image,
  offlineAccess: Wifi,
};

export function FeaturesGrid() {
  const t = useTranslations("features");

  const features = [
    { key: "aiGeneration", icon: "aiGeneration" },
    { key: "instantShare", icon: "instantShare" },
    { key: "rewards", icon: "rewards" },
    { key: "collections", icon: "collections" },
    { key: "highQuality", icon: "highQuality" },
    { key: "offlineAccess", icon: "offlineAccess" },
  ];

  return (
    <section className="py-20" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ key, icon }) => {
            const Icon = icons[icon as keyof typeof icons];
            return (
              <Card key={key} className="border-primary/10 transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{t(`${key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(`${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
