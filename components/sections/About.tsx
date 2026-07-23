import { Reveal } from "@/components/motion/Reveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Section } from "./Section";
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

  return (
    <Section id="about" surface>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
              <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" aria-hidden />
              {a.label}
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-[2.5rem] md:leading-[1.08]">
              {a.heading}
            </h2>
            <p className="text-lg font-medium text-foreground">{a.lead}</p>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{a.body}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1} className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-glow rounded-[var(--radius-card)] border border-border bg-card p-5"
              >
                {stat.numeric != null ? (
                  <AnimatedCounter target={stat.numeric} suffix="+" className="tnum text-3xl font-bold text-gradient" />
                ) : (
                  <p className="tnum text-3xl font-bold text-gradient">{stat.value}</p>
                )}
                <p className="mt-1.5 text-sm leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
