import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { ProjectCard, type CardLabels } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Ecommerce({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const all = projectsByCategory("ecommerce");
  const featured = all.find((p) => p.featured) ?? all[0];
  const rest = all.filter((p) => p.slug !== featured.slug);

  const labels: CardLabels = {
    problem: dict.common.problem,
    solution: dict.common.solution,
    result: dict.common.result,
    viewLive: dict.common.viewLive,
  };

  return (
    <Section id="ecommerce">
      <SectionHeader
        label={dict.sections.ecommerce.label}
        heading={dict.sections.ecommerce.heading}
        intro={dict.sections.ecommerce.intro}
      />

      <Reveal className="mb-6">
        <article className="grid overflow-hidden rounded-[var(--radius-card)] border border-border bg-card md:grid-cols-2">
          <div className="relative flex min-h-[12rem] items-end overflow-hidden bg-accent-soft">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.title[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            ) : (
              <>
                <span
                  className="pointer-events-none absolute -right-6 -top-10 select-none text-[12rem] font-semibold leading-none text-brand/15"
                  aria-hidden
                >
                  {featured.tagline.fr.charAt(0).toUpperCase()}
                </span>
                <span className="relative m-5 rounded-md bg-background/70 px-3 py-1.5 text-sm font-medium text-brand backdrop-blur-sm">
                  {featured.linkLabel}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col justify-center gap-4 p-7">
            <h3 className="text-2xl font-semibold tracking-tight">{featured.title[locale]}</h3>
            <p className="text-base leading-relaxed text-foreground">{featured.result?.[locale]}</p>
            <div className="flex flex-wrap gap-1.5">
              {featured.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            {featured.url && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand-strong"
              >
                {featured.linkLabel ?? labels.viewLive}
                <ArrowUpRight size={15} weight="bold" />
              </a>
            )}
          </div>
        </article>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06} className="h-full">
            <ProjectCard project={project} locale={locale} labels={labels} variant="compact" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
