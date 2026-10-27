/**
 * Display order of the numbered sections. The index each section prints
 * ("01", "02"...) is derived from this list, so reordering happens here only.
 */
const order = [
  "about",
  "projects",
  "data",
  "ecommerce",
  "clients",
  "services",
  "skills",
  "education",
  "contact",
] as const;

export type SectionId = (typeof order)[number];

export const sectionIndex = (id: SectionId) => String(order.indexOf(id) + 1).padStart(2, "0");
