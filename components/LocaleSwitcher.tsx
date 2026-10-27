"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/locales";

/**
 * Swaps the locale segment of the current path while keeping the rest.
 * Shows the target language as a short code; the full name stays in the label.
 */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "fr" ? "en" : "fr";

  const segments = pathname.split("/");
  if (locales.includes(segments[1] as Locale)) {
    segments[1] = other;
  } else {
    segments.splice(1, 0, other);
  }
  const href = segments.join("/") || `/${other}`;

  return (
    <Link
      href={href}
      hrefLang={other}
      aria-label={label}
      title={label}
      className="tnum inline-flex h-9 items-center rounded-full border border-border px-3 text-xs uppercase text-muted transition-colors hover:border-foreground hover:text-foreground"
    >
      {other}
    </Link>
  );
}
