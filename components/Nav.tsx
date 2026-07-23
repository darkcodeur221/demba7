"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DownloadSimple, List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locales";
import { site } from "@/lib/site";

type NavDict = {
  projects: string;
  data: string;
  ecommerce: string;
  services: string;
  skills: string;
  about: string;
  contact: string;
  cv: string;
  menu: string;
};

export function Nav({
  locale,
  nav,
  switchLabel,
  themeLabel,
}: {
  locale: Locale;
  nav: NavDict;
  switchLabel: string;
  themeLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  const base = `/${locale}`;
  const links = [
    { href: `${base}#projects`, label: nav.projects },
    { href: `${base}#data`, label: nav.data },
    { href: `${base}#ecommerce`, label: nav.ecommerce },
    { href: `${base}#services`, label: nav.services },
    { href: `${base}#skills`, label: nav.skills },
    { href: `${base}#about`, label: nav.about },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border glass shadow-[0_4px_30px_-10px_rgba(0,0,0,0.08)]"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={base} className="group flex items-center gap-2.5" aria-label={site.name}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-on-brand shadow-[0_2px_12px_-3px_rgba(31,78,121,0.5)] transition-shadow group-hover:shadow-[0_2px_16px_-2px_rgba(31,78,121,0.6)]">
            N
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Ngagne Demba Beye
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-accent-soft/50 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`${base}/cv`}
            className="hidden items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground sm:inline-flex"
          >
            <DownloadSimple size={16} weight="bold" />
            {nav.cv}
          </Link>
          <LocaleSwitcher locale={locale} label={switchLabel} />
          <ThemeToggle label={themeLabel} />
          <Link
            href={`${base}#contact`}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden sm:inline-flex")}
          >
            {nav.contact}
          </Link>
          <button
            type="button"
            aria-label={nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base text-foreground transition-colors hover:bg-accent-soft/50"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`${base}#contact`}
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-2")}
            >
              {nav.contact}
            </Link>
            <Link
              href={`${base}/cv`}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-foreground"
            >
              <DownloadSimple size={16} weight="bold" />
              {nav.cv}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
