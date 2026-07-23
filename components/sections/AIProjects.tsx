import { Section, SectionHeader } from "./Section";
import { ProjectCard, type CardLabels } from "@/components/ProjectCard";
import { BpmnCompare } from "@/components/BpmnCompare";
import { FeugjayEcosystem } from "@/components/FeugjayEcosystem";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AIProjects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  // Feugjay gets its own rich ecosystem showcase, so keep it out of the grid.
  const projects = projectsByCategory("ai").filter((p) => p.slug !== "feugjay-ecosystem");
  const p = dict.sections.ai.process;
  const e = dict.sections.ai.ecosystem;
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

      {/* Feugjay multi-agent ecosystem */}
      <Reveal className="mt-6">
        <FeugjayEcosystem
          label={e.label}
          heading={e.heading}
          body={e.body}
          proofLabel={e.proofLabel}
          zoomHint={e.zoomHint}
          openLabel={e.openFull}
          architectureCaption={e.architectureCaption}
          lugiaCaption={e.lugiaCaption}
          celebiCaption={e.celebiCaption}
        />
      </Reveal>

      {/* Design deep-dive: AS-IS / TO-BE BPMN comparison for Tipi en Fête */}
      <Reveal className="mt-6">
        <BpmnCompare
          label={p.label}
          heading={p.heading}
          body={p.body}
          caption={p.caption}
          zoomHint={p.zoomHint}
          openLabel={p.openFull}
          asIs={{ tag: p.asIsTag, desc: p.asIsDesc }}
          toBe={{ tag: p.toBeTag, desc: p.toBeDesc }}
        />
      </Reveal>
    </Section>
  );
}
