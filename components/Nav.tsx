"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
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
  const [active, setActive] = useState<string | null>(null);

  const base = `/${locale}`;
  const links = [
    { id: "projects", label: nav.projects },
    { id: "data", label: nav.data },
    { id: "ecommerce", label: nav.ecommerce },
    { id: "services", label: nav.services },
    { id: "skills", label: nav.skills },
    { id: "about", label: nav.about },
  ];

  useEffect(() => {
    // A 1px sentinel at the top: the bar gains its background once it leaves.
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Scroll-spy: a section counts as current while it crosses the middle band
    // of the viewport, which avoids flicker between two short sections. Every
    // section is watched, linked or not, so the highlight clears while reading
    // one that has no nav entry (hero, clients, education, contact).
    const targets = document.querySelectorAll<HTMLElement>("main section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        // An open menu needs an opaque bar, or the headline bleeds through the links.
        open
          ? "border-b border-border bg-background"
          : scrolled
            ? "glass border-b border-border"
            : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={base} className="group flex items-center gap-3" aria-label={site.name}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-ink font-serif text-xl italic leading-none text-on-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand">
            D
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-medium tracking-tight">Ngagne Demba Beye</span>
            <span className="tnum text-[10px] text-muted">IA · Data · E-commerce</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`${base}#${l.id}`}
              aria-current={active === l.id ? "location" : undefined}
              className={cn(
                "relative text-sm transition-colors duration-300",
                active === l.id ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {l.label}
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand transition-opacity duration-300",
                  active === l.id ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`${base}/cv`}
            className="tnum hidden px-2 text-xs text-muted transition-colors hover:text-foreground sm:inline"
          >
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground lg:hidden"
          >
            {open ? <X size={17} /> : <List size={17} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background shadow-[0_24px_40px_-24px_rgba(22,23,26,0.25)] lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {links.map((l, i) => (
              <Link
                key={l.id}
                href={`${base}#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-border py-3.5 text-lg tracking-tight text-foreground last:border-b-0"
              >
                <span className="tnum text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <Link
                href={`${base}#contact`}
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary", size: "md" }), "flex-1")}
              >
                {nav.contact}
              </Link>
              <Link
                href={`${base}/cv`}
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline", size: "md" }))}
              >
                {nav.cv}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
