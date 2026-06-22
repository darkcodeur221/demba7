import { GraduationCap, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { certifications, timeline } from "@/data/certifications";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Education({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.sections.education;

  return (
    <Section id="education">
      <SectionHeader label={e.label} heading={e.heading} />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Education timeline */}
        <Reveal>
          <ol className="relative ml-1 border-l border-border">
            {timeline.map((entry) => (
              <li key={entry.year} className="relative ml-6 pb-9 last:pb-0">
                <span className="absolute -left-[1.95rem] flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-brand">
                  <GraduationCap size={15} weight="bold" />
                </span>
                <p className="tnum text-sm font-medium text-brand">{entry.year}</p>
                <h3 className="mt-1 text-base font-semibold tracking-tight">
                  {entry.title[locale]}
                </h3>
                <p className="text-sm text-muted">{entry.org}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={0.1}>
          <p className="mb-5 text-sm font-medium text-foreground">{e.certificationsLabel}</p>
          <ul className="grid gap-x-6 gap-y-px sm:grid-cols-2">
            {certifications.map((cert) => (
              <li key={`${cert.title.fr}-${cert.year}`} className="flex gap-3 border-t border-border py-4">
                <SealCheck size={18} weight="bold" className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-medium leading-snug">{cert.title[locale]}</p>
                  <p className="tnum text-xs text-muted">
                    {cert.issuer}, {cert.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
