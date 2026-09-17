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
    <section className="bg-background" id="showcase">
      <div className="mx-auto max-w-[85rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {showcaseImages.map((src, i) => (
            <div
              key={src}
              className="group relative aspect-square overflow-hidden rounded-xl border border-card-line bg-card"
            >
              <Image
                src={src}
                alt={`Sticker showcase ${i + 1}`}
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
