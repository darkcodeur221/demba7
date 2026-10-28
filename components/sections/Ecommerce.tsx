import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { ProjectCard, type CardLabels } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
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
    <Section id="ecommerce">
      <SectionHeader
        id="ecommerce"
        label={dict.sections.ecommerce.label}
        heading={dict.sections.ecommerce.heading}
        intro={dict.sections.ecommerce.intro}
      />

      {/* Lead project: wide image, asymmetric 7/5 split */}
      <Reveal className="mb-20">
        <article className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface lg:col-span-7">
            {featured.image && (
              <Image
                src={featured.image}
                alt={featured.title[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top"
              />
            )}
          </div>
          <div className="lg:col-span-5">
            <span className="tnum text-xs text-muted">{n}.1</span>
            <h3 className="mt-3 text-[2rem] font-medium leading-tight tracking-[-0.03em]">
              {featured.title[locale]}
            </h3>
            <p className="tnum mt-1.5 text-xs text-accent">{featured.tagline[locale]}</p>
            {featured.result?.[locale] && (
              <p className="mt-6 border-t border-border pt-6 text-xl leading-snug tracking-[-0.01em] text-foreground">
                {featured.result[locale]}
              </p>
            )}
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
          </div>
        </article>
      </Reveal>

      <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06} className="h-full">
            <ProjectCard
              project={project}
              locale={locale}
              labels={labels}
              variant="compact"
              index={`${n}.${i + 2}`}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
