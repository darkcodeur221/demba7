"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
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
}: {
  locale: Locale;
  nav: NavDict;
  switchLabel: string;
  /** Kept for call-site compatibility; the site is dark-only now. */
  themeLabel?: string;
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
    // Scroll-spy over every section, linked or not, so the highlight clears
    // while reading one that has no nav entry (hero, clients, contact...).
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
        open
          ? "border-b border-border bg-background"
          : scrolled
            ? "glass border-b border-border"
            : "border-b border-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={base} className="group flex items-center gap-3" aria-label={site.name}>
          <span className="display flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand text-lg text-on-brand transition-transform duration-500 group-hover:rotate-[-8deg]">
            D
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight">Ngagne Demba Beye</span>
            <span className="tnum text-[10px] text-muted">IA · Data · E-commerce</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
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
          <Link
            href={`${base}#contact`}
            className={cn(buttonVariants({ variant: "accent", size: "sm" }), "hidden sm:inline-flex")}
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
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col py-4">
            {links.map((l, i) => (
              <Link
                key={l.id}
                href={`${base}#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-border py-4 text-2xl font-bold tracking-[-0.03em] text-foreground last:border-b-0"
              >
                <span className="tnum text-xs font-normal text-accent">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </Link>
            ))}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href={`${base}#contact`}
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "accent", size: "md" }), "flex-1")}
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
