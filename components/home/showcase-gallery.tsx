import { useTranslations } from "next-intl";
import Image from "next/image";

const showcaseImages = [
  "/showcase/01.webp",
  "/showcase/02.webp",
  "/showcase/03.webp",
  "/showcase/04.webp",
  "/showcase/05.webp",
  "/showcase/06.webp",
];

export function ShowcaseGallery() {
  const t = useTranslations("showcase");

  return (
    <section className="py-20" id="showcase">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {showcaseImages.map((src) => (
            <div
              key={src}
              className="aspect-square overflow-hidden rounded-xl border bg-muted"
            >
              <Image
                src={src}
                alt={`Sticker showcase`}
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
