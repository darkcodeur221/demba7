import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Badge } from "@/components/ui/badge";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import { dashboards } from "@/data/dashboards";
import { sectionIndex } from "@/lib/sections";
import type { Dictionary, Locale } from "@/lib/i18n";

export function DataAnalytics({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const d = dict.sections.data;
  const n = sectionIndex("data");
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
      <SectionHeader id="data" label={d.label} heading={d.heading} intro={d.intro} />

      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Audit narrative */}
        <Reveal className="flex flex-col lg:col-span-5">
          <span className="tnum text-xs text-muted">{n}.1</span>
          <h3 className="mt-3 text-[2rem] font-medium leading-tight tracking-[-0.03em]">
            {audit.title[locale]}
          </h3>
          <a
            href={audit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link tnum mt-2 inline-flex w-fit items-center gap-1 text-xs text-accent"
          >
            <span className="link-draw">{audit.linkLabel}</span>
            <ArrowUpRight size={13} />
          </a>

          <dl className="mt-8 border-t border-border-strong">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-5">
                <dt className="tnum pt-0.5 text-[11px] text-muted">{f.label}</dt>
                <dd className="text-[15px] leading-relaxed text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Kicker label={d.toolsLabel} className="mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {d.tools.map((tool) => (
                <Badge key={tool} accent>
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Featured dashboard */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <a
            href={featured.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-[var(--radius-media)] border border-border bg-card"
          >
            <div className="img-zoom relative aspect-[16/10] bg-white">
              <Image
                src={featured.src}
                alt={featured.caption[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Badge accent>{featured.tool}</Badge>
                <span className="text-sm text-foreground">{featured.caption[locale]}</span>
              </div>
              <ArrowUpRight
                size={15}
                className="shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>
          </a>
        </Reveal>
      </div>

      {/* Proof gallery */}
      <div className="mt-20">
        <Reveal className="mb-6">
          <Kicker index={`${n}.2`} label={d.galleryLabel} />
        </Reveal>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((viz, i) => (
            <Reveal key={viz.src} delay={(i % 3) * 0.05} className="h-full">
              <a href={viz.src} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
                <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] border border-border bg-white">
                  <Image
                    src={viz.src}
                    alt={viz.caption[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 pt-3">
                  <div>
                    <p className="tnum text-[11px] text-accent">{viz.tool}</p>
                    <p className="mt-0.5 text-sm leading-snug text-foreground">{viz.caption[locale]}</p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="mt-1 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
