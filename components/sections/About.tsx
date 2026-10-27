import { Reveal } from "@/components/motion/Reveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Section, SectionHeader } from "./Section";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n";

export function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  const s = dict.hero.stats;

  const stats: { value: string; label: string; numeric?: number }[] = [
    { value: "30+", label: s.sites, numeric: 30 },
    { value: "5+", label: s.years, numeric: 5 },
    { value: "5+", label: s.ai, numeric: 5 },
    { value: a.degreeLabel, label: s.degree },
  ];

  const figure = "font-serif text-5xl leading-none tracking-[-0.02em] text-foreground sm:text-[3.4rem]";

  return (
    <Section id="about" surface>
      <SectionHeader id="about" label={a.label} heading={a.heading} intro={a.lead} />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <p className="max-w-[58ch] text-xl leading-[1.6] tracking-[-0.005em] text-foreground">
            {a.body}
          </p>
        </Reveal>

        {/* Key figures, ruled like a spec table rather than boxed as cards */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="grid grid-cols-2 border-t border-border-strong">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn("border-b border-border py-7", i % 2 === 0 ? "border-r pr-6" : "pl-6")}
              >
                {stat.numeric != null ? (
                  <AnimatedCounter target={stat.numeric} suffix="+" className={figure} />
                ) : (
                  <p className={figure}>{stat.value}</p>
                )}
                <p className="tnum mt-3 text-xs leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
