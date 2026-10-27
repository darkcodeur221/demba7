import { Sparkle, FlowArrow, ChartBar, Code, Buildings, Compass } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
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

/** Skills as a spec sheet: one ruled row per discipline, tools inline. */
export function Skills({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const n = sectionIndex("skills");

  return (
    <Section id="skills" surface>
      <SectionHeader id="skills" label={dict.sections.skills.label} heading={dict.sections.skills.heading} />
      <div className="border-t border-border-strong">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon] ?? Code;
          return (
            <Reveal
              key={group.id}
              delay={(i % 3) * 0.04}
              className="grid gap-4 border-b border-border py-7 md:grid-cols-12 md:gap-8"
            >
              <div className="flex items-center gap-4 md:col-span-4">
                <span className="tnum text-xs text-brand">
                  {n}.{i + 1}
                </span>
                <Icon size={20} weight="light" className="text-muted" />
                <h3 className="text-lg font-medium tracking-tight">{group.title[locale]}</h3>
              </div>
              <ul className="flex flex-wrap items-center gap-y-2 md:col-span-8">
                {group.skills.map((skill, j) => (
                  <li key={skill} className="text-[15px] text-foreground">
                    {skill}
                    {/* A middle dot, since some tool names already carry a slash. */}
                    {j < group.skills.length - 1 && (
                      <span className="mx-3 text-brand/60" aria-hidden>
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
