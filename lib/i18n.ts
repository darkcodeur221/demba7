import "server-only";
import { type Locale } from "./locales";

export { locales, defaultLocale, isLocale, type Locale } from "./locales";

const dictionaries = {
  fr: () => import("@/data/content/fr.json").then((m) => m.default),
  en: () => import("@/data/content/en.json").then((m) => m.default),
};

/** Shape of a UI dictionary, inferred from the French source of truth. */
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["fr"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (await dictionaries[locale]()) as Dictionary;
