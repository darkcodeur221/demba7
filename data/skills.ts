import type { SkillGroup } from "./types";

/** Skill groups, rendered as labelled columns. `icon` maps to a Phosphor icon. */
export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: { fr: "IA & LLMs", en: "AI & LLMs" },
    icon: "Sparkle",
    skills: [
      "Claude API",
      "ChatGPT / OpenAI",
      "Copilot",
      "Prompt engineering",
      "RAG",
      "Agents autonomes",
    ],
  },
  {
    id: "automation",
    title: { fr: "Automatisation", en: "Automation" },
    icon: "FlowArrow",
    skills: ["n8n", "Make", "Power Automate"],
  },
  {
    id: "data",
    title: { fr: "Data & Analytique", en: "Data & Analytics" },
    icon: "ChartBar",
    skills: [
      "Tableau Desktop (avancé)",
      "Tableau Prep",
      "RapidMiner",
      "Looker Studio",
      "SQL / PostgreSQL",
      "GA4",
    ],
  },
  {
    id: "web",
    title: { fr: "Web", en: "Web" },
    icon: "Code",
    skills: ["WordPress", "WooCommerce", "Next.js", "PHP", "JavaScript", "Python"],
  },
  {
    id: "erp",
    title: { fr: "ERP / CRM", en: "ERP / CRM" },
    icon: "Buildings",
    skills: ["Odoo", "Salesforce", "HubSpot"],
  },
  {
    id: "methods",
    title: { fr: "Méthodes", en: "Methods" },
    icon: "Compass",
    skills: ["BPMN 2.0", "Agile / Scrum", "Azure DevOps"],
  },
];
