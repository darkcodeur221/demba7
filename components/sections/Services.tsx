import {
  FlowArrow,
  PlugsConnected,
  Lightbulb,
  ChartLine,
  ShoppingBag,
  MagnifyingGlass,
  Stack,
  ArrowUpRight,
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

/**
 * Services as full-width rows. On hover a lime panel wipes up from the bottom
 * edge and the row's type flips to ink, so the list reads like a menu of
 * practices rather than a grid of feature cards.
 */
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
      <div className="border-t border-border-strong">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Lightbulb;
          return (
            <Reveal key={service.id} delay={(i % 4) * 0.04}>
              <div className="group relative overflow-hidden border-b border-border">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <div className="relative grid grid-cols-12 items-center gap-x-4 gap-y-2 px-1 py-7 transition-colors duration-500 group-hover:text-on-brand md:px-4 md:py-9">
                  <span className="tnum col-span-2 text-xs text-muted transition-colors duration-500 group-hover:text-on-brand/70 md:col-span-1">
                    {n}.{i + 1}
                  </span>
                  <h3 className="col-span-10 text-[clamp(1.45rem,2.9vw,2.6rem)] font-bold leading-none tracking-[-0.035em] md:col-span-5 sm:[font-stretch:112%]">
                    {service.title[locale]}
                  </h3>
                  <p className="col-span-10 col-start-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-on-brand/80 md:col-span-5 md:col-start-auto">
                    {service.description[locale]}
                  </p>
                  <span className="col-span-1 hidden justify-self-end md:flex">
                    <Icon
                      size={26}
                      weight="light"
                      className="transition-transform duration-500 group-hover:hidden"
                    />
                    <ArrowUpRight size={26} className="hidden group-hover:block" />
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
