import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Kicker } from "./Kicker";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * The sign-off, on a full lime band: the address as a big link, then the name
 * in hollow poster type running the full width and bleeding off the bottom.
 */
export function Footer({
  locale,
  cta,
  tagline,
  rights,
  built,
  backToTop,
}: {
  locale: Locale;
  cta: string;
  tagline: string;
  rights: string;
  built: string;
  backToTop: string;
}) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;
  const socials = [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "GitHub", href: site.socials.github },
  ];

  return (
    <footer className="relative overflow-hidden bg-brand text-on-brand">
      <div className="container-x pb-10 pt-24 md:pt-32">
        <Kicker label={cta} className="text-on-brand/70" />
        <a
          href={`mailto:${site.email}`}
          className="group mt-6 flex w-fit max-w-full items-center gap-4 break-all text-[clamp(1.7rem,5vw,4.6rem)] font-bold leading-none tracking-[-0.04em] sm:[font-stretch:115%]"
        >
          <span className="link-draw">{site.email}</span>
          <ArrowUpRight
            size="0.8em"
            className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>

        <div className="mt-20 grid gap-8 border-t border-on-brand/15 pt-8 text-sm sm:grid-cols-3">
          <p className="max-w-[34ch] leading-relaxed text-on-brand/75">{tagline}</p>
          <div className="tnum flex flex-col gap-1.5 text-xs text-on-brand/75">
            <a href={site.phoneHref} className="w-fit transition-colors hover:text-on-brand">
              {site.phone}
            </a>
            <span>{site.location[locale]}</span>
          </div>
          <div className="tnum flex flex-col gap-1.5 text-xs sm:items-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw w-fit"
              >
                {s.label} ↗
              </a>
            ))}
            <Link
              href={`${base}#top-sentinel`}
              className="mt-2 inline-flex w-fit items-center gap-1 text-on-brand/70 transition-colors hover:text-on-brand"
            >
              <ArrowUp size={12} />
              {backToTop}
            </Link>
          </div>
        </div>
      </div>

      {/* Signature, decorative: the name is already in the page and the nav. */}
      <p
        aria-hidden
        className="display text-outline pointer-events-none select-none whitespace-nowrap text-center text-[11.5vw] uppercase leading-[0.78] [--outline:rgba(12,13,16,0.28)]"
      >
        Demba Beye
      </p>

      <div className="border-t border-on-brand/15">
        {/* Extra bottom room on phones so the chat launcher never sits on the text. */}
        <div className="tnum container-x flex flex-col gap-1 pb-24 pt-5 text-[11px] text-on-brand/70 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <span>
            © {year} {site.name}. {rights}
          </span>
          <span>{built}</span>
        </div>
      </div>
    </footer>
  );
}
