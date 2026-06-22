import { Section, SectionHeader } from "./Section";
import { ProjectCard, type CardLabels } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AIProjects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const projects = projectsByCategory("ai");
  const labels: CardLabels = {
    problem: dict.common.problem,
    solution: dict.common.solution,
    result: dict.common.result,
    viewLive: dict.common.viewLive,
  };

  return (
    <Section id="projects">
      <SectionHeader
        label={dict.sections.ai.label}
        heading={dict.sections.ai.heading}
        intro={dict.sections.ai.intro}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08} className="h-full">
            <ProjectCard project={project} locale={locale} labels={labels} variant="detailed" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
