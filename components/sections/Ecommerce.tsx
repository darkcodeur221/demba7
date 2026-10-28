import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { ProjectCard, type CardLabels } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ClipReveal } from "@/components/fx/ClipReveal";
import { ParallaxMedia } from "@/components/fx/ParallaxMedia";
import { TiltCard } from "@/components/fx/TiltCard";
import { SectionObject } from "@/components/three/SectionObject";
import { projectsByCategory } from "@/data/projects";
import { sectionIndex } from "@/lib/sections";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Ecommerce({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const all = projectsByCategory("ecommerce");
  const featured = all.find((p) => p.featured) ?? all[0];
  const rest = all.filter((p) => p.slug !== featured.slug);
  const n = sectionIndex("ecommerce");

  const labels: CardLabels = {
    problem: dict.common.problem,
    solution: dict.common.solution,
    result: dict.common.result,
    viewLive: dict.common.viewLive,
  };

  return (
    <Section id="ecommerce" className="isolate">
      <SectionObject
        kind="bag"
        className="right-0 top-14 size-40 sm:size-56 md:right-[2vw] md:top-24 lg:size-[24rem]"
      />
      <SectionHeader
        id="ecommerce"
        label={dict.sections.ecommerce.label}
        heading={dict.sections.ecommerce.heading}
        intro={dict.sections.ecommerce.intro}
      />

      {/* Lead project: the store wipes in and drifts behind its frame; the numbers count up */}
      <article className="group mb-24 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-7">
          <TiltCard max={4}>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={dict.common.view}
              aria-label={`${featured.title[locale]} — ${featured.linkLabel ?? labels.viewLive}`}
              className="block"
            >
              <ClipReveal className="overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface shadow-[0_40px_80px_-48px_rgba(12,13,16,0.45)]">
                <ParallaxMedia range={70} className="img-zoom aspect-[16/10]">
                  {featured.image && (
                    <Image
                      src={featured.image}
                      alt={featured.title[locale]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top"
                    />
                  )}
                </ParallaxMedia>
              </ClipReveal>
            </a>
            <span className="tnum absolute -bottom-3 right-5 rounded-full bg-ink px-3 py-1 text-xs text-on-ink shadow-[0_10px_24px_-10px_rgba(12,13,16,0.5)] [transform:translateZ(48px)]">
              {featured.tagline[locale]}
            </span>
          </TiltCard>
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            <span className="tnum text-xs text-muted">{n}.1</span>
            <h3 className="mt-3 text-[clamp(1.7rem,2.4vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em] [font-stretch:110%]">
              {featured.title[locale]}
            </h3>
            <p className="tnum mt-1.5 text-xs text-accent">{featured.tagline[locale]}</p>
          </Reveal>

          {featured.metrics && (
            <div className="mt-8 border-t border-border-strong">
              {featured.metrics.map((m, i) => (
                <Reveal key={m.label.en} delay={i * 0.1}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-border py-4">
                    <AnimatedCounter
                      target={m.value}
                      locale={locale}
                      duration={1800 + i * 250}
                      suffix={m.suffix && <span className="text-brand-2">{m.suffix[locale]}</span>}
                      className="tnum text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.04em] [font-stretch:115%]"
                    />
                    <p className="max-w-[16ch] text-right text-sm leading-snug text-muted">{m.label[locale]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {featured.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            {featured.url && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link tnum mt-6 inline-flex items-center gap-1 text-xs text-foreground"
              >
                <span className="link-draw">{featured.linkLabel ?? labels.viewLive}</span>
                <ArrowUpRight
                  size={13}
                  className="text-accent transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            )}
          </Reveal>
        </div>
      </article>

      <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.1} className="h-full">
            <TiltCard max={6} className="h-full">
              <ProjectCard
                project={project}
                locale={locale}
                labels={labels}
                variant="compact"
                index={`${n}.${i + 2}`}
              />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
