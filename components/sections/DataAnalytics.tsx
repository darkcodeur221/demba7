import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Badge } from "@/components/ui/badge";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/fx/ClipReveal";
import { StepList } from "@/components/fx/StepList";
import { TiltCard } from "@/components/fx/TiltCard";
import { SectionObject } from "@/components/three/SectionObject";
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
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <Section id="data" surface className="isolate">
      <SectionObject
        kind="chart"
        surface
        className="right-0 top-14 size-40 sm:size-56 md:right-[2vw] md:top-16 lg:size-[24rem]"
      />
      <SectionHeader id="data" label={d.label} heading={d.heading} intro={d.intro} />

      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Audit narrative: problem, solution, result on a rail that fills as you read */}
        <div className="flex flex-col lg:col-span-5">
          <Reveal>
            <span className="tnum text-xs text-muted">{n}.1</span>
            <h3 className="mt-3 text-[clamp(1.7rem,2.4vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em] [font-stretch:110%]">
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
          </Reveal>

          <StepList
            className="mt-10"
            items={facts.map((f, i) => ({
              id: f.label,
              head: (
                <p className="tnum text-[11px] text-muted">
                  {String(i + 1).padStart(2, "0")} · {f.label}
                </p>
              ),
              body: <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">{f.value}</p>,
            }))}
          />

          <Reveal className="mt-10">
            <Kicker label={d.toolsLabel} className="mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {d.tools.map((tool) => (
                <Badge key={tool} accent>
                  {tool}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Featured dashboard: wipes in, then tilts under the pointer */}
        <div className="lg:col-span-7 lg:pt-10">
          <TiltCard max={5}>
            <a
              href={featured.src}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={dict.common.open}
              className="group block overflow-hidden rounded-[var(--radius-media)] border border-border bg-card shadow-[0_40px_80px_-48px_rgba(12,13,16,0.45)]"
            >
              <ClipReveal from="left" className="img-zoom relative aspect-[16/10] bg-white">
                <Image
                  src={featured.src}
                  alt={featured.caption[locale]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              </ClipReveal>
              <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                <span className="text-sm text-foreground">{featured.caption[locale]}</span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </a>
            {/* Floats off the card as it tilts */}
            <span className="tnum absolute -top-3 left-5 rounded-full bg-brand px-3 py-1 text-xs font-medium text-on-brand shadow-[0_10px_24px_-10px_rgba(12,13,16,0.5)] [transform:translateZ(48px)]">
              {featured.tool}
            </span>
          </TiltCard>
        </div>
      </div>

      {/* Proof gallery */}
      <div className="mt-24">
        <Reveal className="mb-6">
          <Kicker index={`${n}.2`} label={d.galleryLabel} />
        </Reveal>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((viz, i) => (
            <TiltCard key={viz.src} max={6} className="h-full">
              <a href={viz.src} target="_blank" rel="noopener noreferrer" data-cursor={dict.common.open} className="group flex h-full flex-col">
                <ClipReveal
                  delay={(i % 3) * 0.12}
                  className="img-zoom relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] border border-border bg-white"
                >
                  <Image
                    src={viz.src}
                    alt={viz.caption[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                </ClipReveal>
                <Reveal delay={0.2 + (i % 3) * 0.12} className="flex items-start justify-between gap-3 pt-3">
                  <div>
                    <p className="tnum text-[11px] text-accent">{viz.tool}</p>
                    <p className="mt-0.5 text-sm leading-snug text-foreground">{viz.caption[locale]}</p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="mt-1 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Reveal>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
