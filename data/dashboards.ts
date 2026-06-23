import type { Localized } from "./types";

/**
 * Real analytics visuals shown in the Data & Analytics section. To add one,
 * drop the image in /public/images and add an entry. `featured: true` makes it
 * the large lead visual; the rest form the gallery. `tool` is a short badge.
 */
export interface Dashboard {
  src: string;
  tool: string;
  caption: Localized;
  featured?: boolean;
}

export const dashboards: Dashboard[] = [
  {
    src: "/images/tableau-4.jpg",
    tool: "Tableau Desktop",
    featured: true,
    caption: {
      fr: "Avis négatifs par vendeur",
      en: "Negative reviews by seller",
    },
  },
  {
    src: "/images/rapidminer-3.png",
    tool: "RapidMiner",
    caption: {
      fr: "Processus de modélisation de bout en bout",
      en: "End-to-end modeling process",
    },
  },
  {
    src: "/images/rapidminer-4.jpg",
    tool: "RapidMiner",
    caption: {
      fr: "Arbre de décision, segmentation client",
      en: "Decision tree, customer segmentation",
    },
  },
  {
    src: "/images/tableau-1.jpg",
    tool: "Tableau Desktop",
    caption: {
      fr: "Note moyenne par catégorie de produit",
      en: "Average score by product category",
    },
  },
  {
    src: "/images/tableau-prep.jpg",
    tool: "Tableau Prep",
    caption: {
      fr: "Préparation et nettoyage des données",
      en: "Data preparation and cleaning",
    },
  },
  {
    src: "/images/rapidminer-1.jpg",
    tool: "RapidMiner",
    caption: {
      fr: "Matrice de corrélation des variables",
      en: "Variable correlation matrix",
    },
  },
  {
    src: "/images/rapidminer-2.png",
    tool: "RapidMiner",
    caption: {
      fr: "Pipeline d'opérateurs, vue d'ensemble",
      en: "Operator pipeline, overview",
    },
  },
];
