import { SectionHeader } from "./Section";
import { BpmnCompare } from "@/components/BpmnCompare";
import { FeugjayEcosystem } from "@/components/FeugjayEcosystem";
import { HorizontalProjects, type ProjectPanel } from "@/components/fx/HorizontalProjects";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import { sectionIndex } from "@/lib/sections";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AIProjects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  // Feugjay gets its own rich ecosystem showcase, so keep it out of the track.
  const projects = projectsByCategory("ai").filter((p) => p.slug !== "feugjay-ecosystem");
  const p = dict.sections.ai.process;
  const e = dict.sections.ai.ecosystem;
  const n = sectionIndex("projects");

  const panels: ProjectPanel[] = projects.map((project, i) => ({
    slug: project.slug,
    index: `${n}.${i + 1}`,
    title: project.title[locale],
    tagline: project.tagline[locale],
    problem: project.problem?.[locale],
    result: project.result?.[locale],
    stack: project.stack,
    url: project.url,
    linkLabel: project.linkLabel ?? dict.common.viewLive,
    image: project.image,
  }));

  return (
    // Built by hand rather than with <Section>: the track has to bleed past
    // the page container to travel sideways.
    <section id="projects" className="relative scroll-mt-20 pt-24 md:pt-36">
      <div className="container-x">
        <SectionHeader
          id="projects"
          label={dict.sections.ai.label}
          heading={dict.sections.ai.heading}
          intro={dict.sections.ai.intro}
        />
      </div>

      <HorizontalProjects panels={panels} cursorLabel={dict.common.view} hint={dict.sections.ai.scrollHint} />

      <div className="container-x pb-28 pt-24 md:pb-40 md:pt-32">
        <Reveal>
          <FeugjayEcosystem
            index={`${n}.${projects.length + 1}`}
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

        <Reveal className="mt-8">
          <BpmnCompare
            index={`${n}.${projects.length + 2}`}
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
      </div>
    </section>
  );
}
