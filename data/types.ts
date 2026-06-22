import type { Locale } from "@/lib/i18n";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export type ProjectCategory = "ai" | "data" | "ecommerce" | "client";

export interface Project {
  /** Stable slug, also used as React key and image seed. */
  slug: string;
  category: ProjectCategory;
  /** Featured projects render larger in the AI / e-commerce grids. */
  featured?: boolean;
  title: Localized;
  /** One-line tagline shown under the title. */
  tagline: Localized;
  /** The real business problem behind the request. */
  problem?: Localized;
  /** What was actually built. */
  solution?: Localized;
  /** Measurable outcome. */
  result?: Localized;
  /** Technologies, shown as badges. Not translated. */
  stack: string[];
  /** Optional live URL. */
  url?: string;
  /** Label shown for the link (defaults to the bare domain). */
  linkLabel?: string;
  /** Screenshot path under /public/images. A placeholder is used until provided. */
  image?: string;
}

export interface SkillGroup {
  id: string;
  title: Localized;
  /** Tabler-style icon name handled by the Skills section. */
  icon: string;
  skills: string[];
}

export interface Certification {
  title: Localized;
  issuer: string;
  year: string;
}

export interface TimelineEntry {
  year: string;
  title: Localized;
  org: string;
  kind: "education" | "milestone";
}

export interface Service {
  id: string;
  title: Localized;
  description: Localized;
  icon: string;
}
