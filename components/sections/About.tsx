import { Reveal } from "@/components/motion/Reveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { ScrollWords } from "@/components/fx/ScrollWords";
import { Section, SectionHeader } from "./Section";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n";

export function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  const s = dict.hero.stats;
  const o = dict.hero.orchestration;

  const stats: { value: string; label: string; numeric?: number }[] = [
    { value: "30+", label: s.sites, numeric: 30 },
    { value: "5+", label: s.years, numeric: 5 },
    { value: "5+", label: s.ai, numeric: 5 },
    { value: a.degreeLabel, label: s.degree },
  ];

  const figure = "display text-[clamp(2.4rem,4.2vw,3.8rem)] leading-none text-foreground";

  return (
    <Section id="about">
      <SectionHeader id="about" label={a.label} heading={a.heading} intro={a.lead} />

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {/* The paragraph lights up word by word as it is read. */}
          <ScrollWords
            text={a.body}
            className="text-[clamp(1.35rem,2.3vw,2.1rem)] font-medium leading-[1.32] tracking-[-0.02em]"
          />

          <Reveal className="mt-16">
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

        {/* How the work is wired: the orchestration diagram */}
        <Reveal delay={0.1} className="flex items-start justify-center lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <HeroVisual hub={o.hub} hubDetail={o.hubDetail} nodes={o.nodes} />
        </Reveal>
      </div>
    </Section>
  );
}
