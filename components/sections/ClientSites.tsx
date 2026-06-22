import { Section, SectionHeader } from "./Section";
import { ProjectCard, type CardLabels } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ClientSites({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const projects = projectsByCategory("client");
  const labels: CardLabels = {
    problem: dict.common.problem,
    solution: dict.common.solution,
    result: dict.common.result,
    viewLive: dict.common.viewLive,
  };

  return (
    <Section id="clients" surface>
      <SectionHeader
        label={dict.sections.client.label}
        heading={dict.sections.client.heading}
        intro={dict.sections.client.intro}
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 4) * 0.05} className="h-full">
            <ProjectCard project={project} locale={locale} labels={labels} variant="logo" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
