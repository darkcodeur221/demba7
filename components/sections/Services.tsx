import {
  FlowArrow,
  PlugsConnected,
  Lightbulb,
  ChartLine,
  ShoppingBag,
  MagnifyingGlass,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/services";
import type { Dictionary, Locale } from "@/lib/i18n";

const icons: Record<string, typeof Stack> = {
  FlowArrow,
  PlugsConnected,
  Lightbulb,
  ChartLine,
  ShoppingBag,
  MagnifyingGlass,
  Stack,
};

export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="services">
      <SectionHeader
        label={dict.sections.services.label}
        heading={dict.sections.services.heading}
        intro={dict.sections.services.intro}
      />
      <div className="grid gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const IconCmp = icons[service.icon] ?? Lightbulb;
          return (
            <Reveal
              key={service.id}
              delay={(i % 3) * 0.06}
              className="flex gap-4 border-t border-border py-7"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-brand">
                <IconCmp size={22} weight="bold" />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight">{service.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {service.description[locale]}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
