"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Sparkles, ChevronDown, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: string;
}

const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker";

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
    <header className="sticky top-0 z-50 flex w-full flex-wrap bg-navbar py-3 text-sm md:flex-nowrap md:justify-start">
      <nav className="mx-auto w-full max-w-7xl px-4 md:flex md:items-center md:justify-between md:gap-x-3">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-xl font-semibold text-foreground focus:opacity-80 focus:outline-hidden"
            aria-label="BikinStiker"
          >
            <Sparkles className="size-6 text-primary" />
            BikinStiker
          </Link>
          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle relative flex size-9 items-center justify-center gap-x-2 rounded-lg border border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
              id="hs-navbar-bikinstiker-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-bikinstiker"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-bikinstiker"
            >
              <svg
                className="hs-collapse-open:hidden size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-bikinstiker"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"
          aria-labelledby="hs-navbar-bikinstiker-collapse"
        >
          <div className="flex flex-col gap-x-0 gap-y-4 overflow-y-auto py-4 md:flex-row md:items-center md:justify-end md:gap-x-6 md:gap-y-0 md:overflow-visible md:py-0">
            {navItems.map((item) => {
              const isActive =
                item.href === `/${locale}`
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm focus:outline-hidden",
                    isActive
                      ? "font-medium text-primary-active"
                      : "text-navbar-nav-foreground hover:text-primary-hover focus:text-primary-focus",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex items-center gap-x-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-navbar-nav-foreground hover:text-primary-hover focus:text-primary-focus focus:outline-hidden"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Language"
              >
                {locale.toUpperCase()}
                <ChevronDown className="size-3.5 shrink-0" />
              </button>
              <div
                className="hs-dropdown-menu duration shadow-md hs-dropdown-open:opacity-100 hidden min-w-24 rounded-lg border border-dropdown-line bg-dropdown p-1 opacity-0 transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full"
                role="menu"
                aria-orientation="vertical"
              >
                <Link
                  href={pathname.replace(`/${locale}`, "/en")}
                  className={cn(
                    "flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm focus:bg-dropdown-item-focus focus:outline-hidden",
                    locale === "en"
                      ? "font-medium text-primary-active"
                      : "text-dropdown-item-foreground hover:bg-dropdown-item-hover",
                  )}
                  role="menuitem"
                >
                  English
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, "/id")}
                  className={cn(
                    "flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm focus:bg-dropdown-item-focus focus:outline-hidden",
                    locale === "id"
                      ? "font-medium text-primary-active"
                      : "text-dropdown-item-foreground hover:bg-dropdown-item-hover",
                  )}
                  role="menuitem"
                >
                  Indonesia
                </Link>
              </div>
            </div>

            <div className="hidden h-5 w-px bg-navbar-divider md:block" aria-hidden="true" />

            <button
              type="button"
              className="hs-dark-mode-active:hidden block rounded-full font-medium text-foreground hover:bg-surface-hover focus:bg-surface-focus focus:outline-hidden"
              data-hs-theme-click-value="dark"
              aria-label="Switch to dark mode"
            >
              <span className="group inline-flex size-9 shrink-0 items-center justify-center">
                <Moon className="size-4 shrink-0" />
              </span>
            </button>
            <button
              type="button"
              className="hs-dark-mode-active:block hidden rounded-full font-medium text-foreground hover:bg-surface-hover focus:bg-surface-focus focus:outline-hidden"
              data-hs-theme-click-value="light"
              aria-label="Switch to light mode"
            >
              <span className="group inline-flex size-9 shrink-0 items-center justify-center">
                <Sun className="size-4 shrink-0" />
              </span>
            </button>

            <a
              href={otherLocalePath}
              className="text-sm text-navbar-nav-foreground hover:text-primary-hover focus:text-primary-focus focus:outline-hidden md:hidden"
            >
              {otherLocale === "en" ? "English version" : "Versi Indonesia"}
            </a>

            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              {t("home")}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
