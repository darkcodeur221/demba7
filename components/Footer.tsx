import Link from "next/link";
import { LinkedinLogo, GithubLogo, EnvelopeSimple, ArrowUp } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({
  locale,
  tagline,
  rights,
  built,
  backToTop,
}: {
  locale: Locale;
  tagline: string;
  rights: string;
  built: string;
  backToTop: string;
}) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href={base} className="flex items-center gap-2.5" aria-label={site.name}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-on-brand">
              N
            </span>
            <span className="text-sm font-semibold tracking-tight">Ngagne Demba Beye</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{tagline}</p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-brand"
            >
              <LinkedinLogo size={18} weight="bold" />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-brand"
            >
              <GithubLogo size={18} weight="bold" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label={site.email}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-brand"
            >
              <EnvelopeSimple size={18} weight="bold" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 text-sm md:items-end">
          <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-foreground">
            {site.email}
          </a>
          <a href={site.phoneHref} className="tnum text-muted transition-colors hover:text-foreground">
            {site.phone}
          </a>
          <span className="text-muted">{site.location[locale]}</span>
          <Link
            href={`${base}#top-sentinel`}
            className="mt-2 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
          >
            <ArrowUp size={15} weight="bold" />
            {backToTop}
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {year} Ngagne Demba Beye. {rights}
          </span>
          <span>{built}</span>
        </div>
      </div>
    </footer>
  );
}
