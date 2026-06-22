import type { Service } from "./types";

/** Services offered through Deejitcorp. `icon` maps to a Phosphor icon. */
export const services: Service[] = [
  {
    id: "automation",
    title: { fr: "Automatisation de processus", en: "Process automation" },
    description: {
      fr: "Workflows et agents sur n8n, Make et l'API Claude.",
      en: "Workflows and agents on n8n, Make and the Claude API.",
    },
    icon: "FlowArrow",
  },
  {
    id: "integration",
    title: { fr: "Intégration systèmes & API", en: "Systems & API integration" },
    description: {
      fr: "Connecter vos outils pour qu'ils parlent enfin entre eux.",
      en: "Connecting your tools so they finally talk to each other.",
    },
    icon: "PlugsConnected",
  },
  {
    id: "consulting",
    title: { fr: "Conseil en IA appliquée", en: "Applied AI consulting" },
    description: {
      fr: "Identifier où l'IA crée de la valeur concrète pour une PME.",
      en: "Pinpointing where AI creates real value for an SMB.",
    },
    icon: "Lightbulb",
  },
  {
    id: "analytics",
    title: { fr: "Analytique & dashboards", en: "Analytics & dashboards" },
    description: {
      fr: "Tableau, RapidMiner et Looker Studio, de la donnée à la décision.",
      en: "Tableau, RapidMiner and Looker Studio, from data to decision.",
    },
    icon: "ChartLine",
  },
  {
    id: "ecommerce",
    title: { fr: "E-commerce", en: "E-commerce" },
    description: {
      fr: "Boutiques WooCommerce et Shopify, du catalogue à la conversion.",
      en: "WooCommerce and Shopify stores, from catalog to conversion.",
    },
    icon: "ShoppingBag",
  },
  {
    id: "seo",
    title: { fr: "SEO & marketing digital", en: "SEO & digital marketing" },
    description: {
      fr: "Visibilité, acquisition et suivi de performance.",
      en: "Visibility, acquisition and performance tracking.",
    },
    icon: "MagnifyingGlass",
  },
  {
    id: "odoo",
    title: { fr: "Configuration ERP Odoo", en: "Odoo ERP configuration" },
    description: {
      fr: "Mettre en place et adapter Odoo à vos opérations.",
      en: "Setting up and adapting Odoo to your operations.",
    },
    icon: "Stack",
  },
];
