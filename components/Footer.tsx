import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Kicker } from "./Kicker";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * The sign-off: the address set large in the serif italic, so the last thing
 * a visitor sees is how to reach Demba.
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
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-20 sm:px-8 md:pt-28">
        <Kicker label={cta} />
        <a
          href={`mailto:${site.email}`}
          className="group mt-6 inline-flex max-w-full items-baseline gap-3 break-words font-serif text-[clamp(2.1rem,8.6vw,6.75rem)] italic leading-[0.95] tracking-[-0.02em] text-foreground"
        >
          <span className="link-draw">{site.email}</span>
          <ArrowUpRight
            size="0.42em"
            className="shrink-0 text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>

        <div className="mt-20 grid gap-8 border-t border-border pt-8 text-sm sm:grid-cols-3">
          <p className="max-w-[34ch] leading-relaxed text-muted">{tagline}</p>
          <div className="tnum flex flex-col gap-1.5 text-xs text-muted">
            <a href={site.phoneHref} className="w-fit transition-colors hover:text-foreground">
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
                className="w-fit text-foreground transition-colors hover:text-brand"
              >
                {s.label} ↗
              </a>
            ))}
            <Link
              href={`${base}#top-sentinel`}
              className="mt-2 inline-flex w-fit items-center gap-1 text-muted transition-colors hover:text-foreground"
            >
              <ArrowUp size={12} />
              {backToTop}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        {/* Extra bottom room on phones so the chat launcher never sits on the text. */}
        <div className="tnum mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-24 pt-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-5">
          <span>
            © {year} {site.name}. {rights}
          </span>
          <span>{built}</span>
        </div>
      </div>
    </footer>
  );
}
