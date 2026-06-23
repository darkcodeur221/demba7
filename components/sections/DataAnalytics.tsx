import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import { dashboards } from "@/data/dashboards";
import type { Dictionary, Locale } from "@/lib/i18n";

export function DataAnalytics({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const d = dict.sections.data;
  const audit = projectsByCategory("data")[0];
  const featured = dashboards.find((x) => x.featured) ?? dashboards[0];
  const gallery = dashboards.filter((x) => x !== featured);

  const facts = [
    { label: dict.common.problem, value: audit.problem?.[locale] },
    { label: dict.common.solution, value: audit.solution?.[locale] },
    { label: dict.common.result, value: audit.result?.[locale] },
  ].filter((f) => f.value);

  return (
    <Section id="data" surface>
      <SectionHeader label={d.label} heading={d.heading} intro={d.intro} />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Audit narrative */}
        <Reveal className="flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{audit.title[locale]}</h3>
            <a
              href={audit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand hover:text-brand-strong"
            >
              {audit.linkLabel}
            </a>
          </div>
          <dl className="flex flex-col">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col gap-1.5 border-l-2 border-brand/40 py-4 pl-5 ${
                  i === 0 ? "" : "border-t border-t-border"
                }`}
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-brand">
                  {f.label}
                </dt>
                <dd className="text-base leading-relaxed text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Featured dashboard + tools */}
        <Reveal delay={0.1} className="flex flex-col gap-6">
          <a
            href={featured.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-[var(--radius-card)] border border-border bg-card"
          >
            <div className="relative aspect-[16/10] bg-surface">
              <Image
                src={featured.src}
                alt={featured.caption[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Badge accent>{featured.tool}</Badge>
                <span className="text-sm text-foreground">{featured.caption[locale]}</span>
              </div>
              <ArrowUpRight
                size={16}
                weight="bold"
                className="shrink-0 text-muted transition-colors group-hover:text-brand"
              />
            </div>
          </a>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">{d.toolsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {d.tools.map((tool) => (
                <Badge key={tool} accent>
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Proof gallery */}
      <div className="mt-14">
        <Reveal className="mb-5">
          <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
            <span className="h-px w-6 bg-brand" aria-hidden />
            {d.galleryLabel}
          </span>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((viz, i) => (
            <Reveal key={viz.src} delay={(i % 3) * 0.05} className="h-full">
              <a
                href={viz.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card transition-colors hover:border-border-strong"
              >
                <div className="relative aspect-[16/10] bg-surface">
                  <Image
                    src={viz.src}
                    alt={viz.caption[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 border-t border-border px-3 py-2.5">
                  <p className="text-xs font-medium text-brand">{viz.tool}</p>
                  <p className="text-xs leading-snug text-muted">{viz.caption[locale]}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
