import { ChartBar } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { projectsByCategory } from "@/data/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

export function DataAnalytics({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const d = dict.sections.data;
  const audit = projectsByCategory("data")[0];

  const facts = [
    { label: dict.common.problem, value: audit.problem?.[locale] },
    { label: dict.common.solution, value: audit.solution?.[locale] },
    { label: dict.common.result, value: audit.result?.[locale] },
  ].filter((f) => f.value);

  return (
    <Section id="data" surface>
      <SectionHeader label={d.label} heading={d.heading} intro={d.intro} />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{audit.title[locale]}</h3>
            <a
              href={audit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand hover:text-brand-strong"
            >
              {audit.linkLabel}
            </a>
          </div>
          <dl className="flex flex-col">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col gap-1.5 border-l-2 border-brand/40 py-4 pl-5 ${
                  i === 0 ? "" : "border-t border-t-border"
                }`}
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-brand">
                  {f.label}
                </dt>
                <dd className="text-base leading-relaxed text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-5">
          {/* Clearly-labelled placeholder for a Tableau dashboard to be provided. */}
          <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-border-strong bg-card text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-brand">
              <ChartBar size={24} weight="bold" />
            </span>
            <span className="px-6 text-sm text-muted">{d.dashboardPlaceholder}</span>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">{d.toolsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {d.tools.map((tool) => (
                <Badge key={tool} accent>
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
