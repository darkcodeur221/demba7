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
import { sectionIndex } from "@/lib/sections";
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

/** Services as a numbered index, the way a studio lists its practice. */
export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const n = sectionIndex("services");

  return (
    <Section id="services">
      <SectionHeader
        id="services"
        label={dict.sections.services.label}
        heading={dict.sections.services.heading}
        intro={dict.sections.services.intro}
      />
      <div className="grid border-t border-border-strong md:grid-cols-2 md:gap-x-16">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Lightbulb;
          return (
            <Reveal
              key={service.id}
              delay={(i % 2) * 0.06}
              className="group flex gap-5 border-b border-border py-7"
            >
              <span className="tnum pt-1.5 text-xs text-brand">
                {n}.{i + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-medium tracking-[-0.015em]">{service.title[locale]}</h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-muted">
                  {service.description[locale]}
                </p>
              </div>
              <Icon
                size={22}
                weight="light"
                className="mt-1 shrink-0 text-muted transition-colors duration-300 group-hover:text-brand"
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
