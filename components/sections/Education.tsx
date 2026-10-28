import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Kicker } from "@/components/Kicker";
import { certifications, timeline } from "@/data/certifications";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Education({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.sections.education;

  return (
    <Section id="education">
      <SectionHeader id="education" label={e.label} heading={e.heading} />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Education, ruled like a CV table */}
        <Reveal className="lg:col-span-6">
          <ol className="border-t border-border-strong">
            {timeline.map((entry) => (
              <li key={entry.year} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-border py-6">
                <span className="tnum pt-1 text-xs text-accent">{entry.year}</span>
                <div>
                  <h3 className="text-lg font-medium leading-snug tracking-tight">{entry.title[locale]}</h3>
                  <p className="tnum mt-1.5 text-xs text-muted">{entry.org}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <Kicker label={e.certificationsLabel} className="mb-4" />
          <ul className="grid border-t border-border-strong sm:grid-cols-2 sm:gap-x-8">
            {certifications.map((cert) => (
              <li key={`${cert.title.fr}-${cert.year}`} className="flex gap-3 border-b border-border py-4">
                <SealCheck size={18} weight="light" className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-[15px] font-medium leading-snug">{cert.title[locale]}</p>
                  <p className="tnum mt-1 text-xs text-muted">
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
