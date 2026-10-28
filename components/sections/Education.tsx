import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Kicker } from "@/components/Kicker";
import { FillText } from "@/components/fx/FillText";
import { Spotlight } from "@/components/fx/Spotlight";
import { StepList } from "@/components/fx/StepList";
import { SectionObject } from "@/components/three/SectionObject";
import { certifications, timeline } from "@/data/certifications";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Education({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.sections.education;

  return (
    <Section id="education" className="isolate">
      <SectionObject
        kind="cap"
        className="right-0 top-14 size-40 sm:size-56 md:right-[2vw] md:top-20 lg:size-[24rem]"
      />
      <SectionHeader id="education" label={e.label} heading={e.heading} />

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Degrees on a rail: each year pours in as the line reaches it */}
        <div className="lg:col-span-5">
          <StepList
            items={timeline.map((entry) => ({
              id: entry.year,
              head: (
                <FillText
                  text={entry.year}
                  className="display text-[clamp(2.6rem,5vw,4.2rem)] leading-none tracking-[-0.03em]"
                />
              ),
              body: (
                <div className="mt-3">
                  <h3 className="text-lg font-medium leading-snug tracking-tight">{entry.title[locale]}</h3>
                  <p className="tnum mt-1.5 text-xs text-muted">{entry.org}</p>
                </div>
              ),
            }))}
          />
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <Kicker label={e.certificationsLabel} className="mb-5" />
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <li key={`${cert.title.fr}-${cert.year}`}>
                <Reveal delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.05} className="h-full">
                  <Spotlight className="h-full p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-brand/40 text-accent transition-[background-color,transform] duration-500 group-hover:rotate-[-12deg] group-hover:bg-brand">
                        <SealCheck size={18} weight="duotone" />
                      </span>
                      <span className="tnum text-xs text-muted">{cert.year}</span>
                    </div>
                    <p className="mt-4 text-[15px] font-medium leading-snug">{cert.title[locale]}</p>
                    <p className="tnum mt-1 text-xs text-muted">{cert.issuer}</p>
                  </Spotlight>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
