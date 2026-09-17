import { useTranslations } from "next-intl";
import { Zap, Share2, Gift, FolderOpen, Image, Wifi } from "lucide-react";

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
    <section className="bg-background" id="features">
      <div className="mx-auto max-w-[85rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ key, icon }) => {
            const Icon = icons[icon as keyof typeof icons];
            return (
              <div
                key={key}
                className="flex flex-col rounded-xl border border-card-line bg-card p-6 shadow-2xs transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 shrink-0 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
