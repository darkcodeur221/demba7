import { Sparkle, FlowArrow, ChartBar, Code, Buildings, Compass } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/fx/Spotlight";
import { skillGroups } from "@/data/skills";
import { sectionIndex } from "@/lib/sections";
import type { Dictionary, Locale } from "@/lib/i18n";

const icons: Record<string, typeof Code> = {
  Sparkle,
  FlowArrow,
  ChartBar,
  Code,
  Buildings,
  Compass,
};

/** Skill groups as panels lit from under the pointer. */
export function Skills({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const n = sectionIndex("skills");

  return (
    <Section id="skills" surface>
      <SectionHeader id="skills" label={dict.sections.skills.label} heading={dict.sections.skills.heading} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon] ?? Code;
          return (
            <Reveal key={group.id} delay={(i % 3) * 0.06} className="h-full">
              <Spotlight className="h-full p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-brand">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <span className="tnum text-xs text-muted">
                    {n}.{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] sm:[font-stretch:110%]">
                  {group.title[locale]}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-[var(--radius-tag)] border border-border bg-background/60 px-2.5 py-1 text-[13px] text-foreground/85"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
