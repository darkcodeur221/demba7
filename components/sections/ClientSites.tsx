import { Section, SectionHeader } from "./Section";
import { HoverPreviewList, type PreviewItem } from "@/components/fx/HoverPreviewList";
import { projectsByCategory } from "@/data/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Client sites as a big-type index; hovering a row floats its screenshot. */
export function ClientSites({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const projects = projectsByCategory("client");
  const items: PreviewItem[] = projects.map((p) => ({
    slug: p.slug,
    name: p.tagline[locale],
    kind: p.title[locale],
    url: p.url,
    image: p.image,
  }));

  return (
    <Section id="clients" surface>
      <SectionHeader
        id="clients"
        label={dict.sections.client.label}
        heading={dict.sections.client.heading}
        intro={dict.sections.client.intro}
        aside={String(projects.length).padStart(2, "0")}
      />
      <HoverPreviewList items={items} cursorLabel={dict.common.open} />
    </Section>
  );
}
