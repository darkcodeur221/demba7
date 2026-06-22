import {
  Sparkle,
  FlowArrow,
  ChartBar,
  Code,
  Buildings,
  Compass,
} from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { skillGroups } from "@/data/skills";
import type { Dictionary, Locale } from "@/lib/i18n";

const icons: Record<string, typeof Code> = {
  Sparkle,
  FlowArrow,
  ChartBar,
  Code,
  Buildings,
  Compass,
};

export function Skills({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="skills" surface>
      <SectionHeader label={dict.sections.skills.label} heading={dict.sections.skills.heading} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const IconCmp = icons[group.icon] ?? Code;
          return (
            <Reveal
              key={group.id}
              delay={(i % 3) * 0.06}
              className="rounded-[var(--radius-card)] border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-brand">
                  <IconCmp size={20} weight="bold" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">{group.title[locale]}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {skill}
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
