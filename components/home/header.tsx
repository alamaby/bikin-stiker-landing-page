"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/pricing`, label: t("pricing") },
    { href: `/${locale}/faq`, label: t("faq") },
  ];

  const otherLocale = locale === "en" ? "id" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">BikinStiker</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={otherLocalePath} />}
          >
            {otherLocale.toUpperCase()}
          </Button>
          <Button
            size="sm"
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
            {t("home")}
          </Button>
        </div>
      </div>
    </header>
  );
}
