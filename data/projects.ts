import type { Project } from "./types";

/**
 * All projects in one place. To add a project, copy an entry and fill the
 * fields. `category` controls which section it appears in:
 *   ai        -> Projets IA & Automatisation
 *   data      -> Data & Analytique
 *   ecommerce -> E-commerce & Retail
 *   client    -> Sites clients & vitrines
 * Set `featured: true` to give it a larger card. `image` points to a file
 * under /public/images; until you add one, a clean placeholder is shown.
 */
export const projects: Project[] = [
  // ----- IA & Automatisation -----
  {
    slug: "tipi-en-fete",
    category: "ai",
    featured: true,
    title: { fr: "Réservation automatisée", en: "Automated booking system" },
    tagline: {
      fr: "Tipi en Fête",
      en: "Tipi en Fête",
    },
    problem: {
      fr: "Le client demandait un formulaire. Le vrai problème : 3 heures de gestion manuelle par semaine.",
      en: "The client asked for a form. The real problem was 3 hours of manual handling every week.",
    },
    solution: {
      fr: "J'ai automatisé tout le cycle réservation, paiement et confirmation, sans aucune intervention humaine.",
      en: "I automated the full booking, payment and confirmation cycle with zero human intervention.",
    },
    result: {
      fr: "Zéro saisie manuelle, confirmations instantanées, agenda toujours à jour.",
      en: "Zero manual entry, instant confirmations, an always up-to-date calendar.",
    },
    stack: ["n8n", "Claude API", "Stripe", "PostgreSQL", "Google Calendar", "Docker"],
    url: "https://n8n.seventwins.cloud",
    linkLabel: "n8n.seventwins.cloud",
    image: "/images/tipi-en-fete.webp",
  },
  {
    slug: "jobcooking",
    category: "ai",
    featured: true,
    title: { fr: "Génération de CV par IA", en: "AI resume generation" },
    tagline: { fr: "JobCooking, SaaS", en: "JobCooking, SaaS" },
    problem: {
      fr: "Produire des CV vraiment personnalisés, à grande échelle, sans repartir de zéro à chaque fois.",
      en: "Producing genuinely tailored resumes at scale without starting from scratch each time.",
    },
    solution: {
      fr: "Une plateforme qui génère des CV sur mesure via l'API Claude, du brief au document final.",
      en: "A platform that generates bespoke resumes through the Claude API, from brief to final document.",
    },
    result: {
      fr: "Des CV adaptés à chaque offre, livrés en minutes.",
      en: "Resumes tailored to each posting, delivered in minutes.",
    },
    stack: ["Claude API", "n8n", "WordPress", "PostgreSQL"],
    url: "https://jobcooking.com",
    linkLabel: "jobcooking.com",
    image: "/images/jobcooking.jpg",
  },
  {
    slug: "papii",
    category: "ai",
    featured: true,
    title: { fr: "Agent de prospection B2B", en: "Autonomous B2B prospecting agent" },
    tagline: { fr: "Papii", en: "Papii" },
    problem: {
      fr: "La prospection manuelle est lente et coûteuse pour qualifier des prospects.",
      en: "Manual prospecting is slow and expensive when qualifying leads.",
    },
    solution: {
      fr: "Un agent qui identifie et qualifie des prospects sans intervention humaine.",
      en: "An agent that finds and qualifies prospects with no human intervention.",
    },
    result: {
      fr: "Un pipeline de prospects qualifiés alimenté en continu.",
      en: "A continuously fed pipeline of qualified leads.",
    },
    stack: ["Google Maps API", "Claude API", "Brevo"],
    url: "https://seventwins.cloud",
    linkLabel: "seventwins.cloud",
    image: "/images/papii.png",
  },
  {
    slug: "seven-twins",
    category: "ai",
    title: { fr: "Ajout massif de produits", en: "Bulk product onboarding" },
    tagline: { fr: "Seven Twins", en: "Seven Twins" },
    problem: {
      fr: "Peupler un grand catalogue produit à la main est interminable.",
      en: "Populating a large product catalog by hand is endless.",
    },
    solution: {
      fr: "Un pipeline qui peuple automatiquement un catalogue WordPress à grande échelle.",
      en: "A pipeline that automatically populates a WordPress catalog at scale.",
    },
    result: {
      fr: "Des centaines de fiches produit créées sans saisie manuelle.",
      en: "Hundreds of product listings created without manual entry.",
    },
    stack: ["n8n", "WordPress", "WooCommerce API"],
    url: "https://seventwin.com",
    linkLabel: "seventwin.com",
    image: "/images/seven-twins.png",
  },
  {
    slug: "naya-chatbot",
    category: "ai",
    title: { fr: "Chatbot IA pour PME", en: "AI chatbot for SMBs" },
    tagline: { fr: "Naya · Deejitcorp", en: "Naya · Deejitcorp" },
    problem: {
      fr: "Les PME perdent des leads hors des heures d'ouverture et répondent aux mêmes questions en boucle.",
      en: "SMBs lose leads outside business hours and answer the same questions over and over.",
    },
    solution: {
      fr: "Un chatbot IA entraîné sur le contenu du site, capable de recevoir des instructions spécifiques et de capturer les infos de contact des prospects.",
      en: "An AI chatbot trained on the site's content, capable of following specific instructions and capturing prospect contact info.",
    },
    result: {
      fr: "Déployé chez plusieurs PME (dont easygraph.net). Leads qualifiés 24/7, reporting automatique des contacts.",
      en: "Deployed at multiple SMBs (including easygraph.net). Qualified leads 24/7, automatic contact reporting.",
    },
    stack: ["Claude API", "n8n", "WordPress", "REST API"],
    url: "https://easygraph.net",
    linkLabel: "easygraph.net",
    image: "/images/naya.jpg",
  },
  {
    slug: "feugjay-ecosystem",
    category: "ai",
    featured: true,
    title: { fr: "Écosystème de 4 agents IA", en: "4-agent AI ecosystem" },
    tagline: { fr: "Feugjay", en: "Feugjay" },
    problem: {
      fr: "Gérer le marketing d'une boutique e-commerce à Dakar sans équipe dédiée : contenu, SEO, analytics, stratégie.",
      en: "Running a Dakar-based e-commerce store's marketing without a dedicated team: content, SEO, analytics, strategy.",
    },
    solution: {
      fr: "4 agents IA autonomes : Pikachu (community manager Facebook), Porygon (analytics Telegram), Lugia (intelligence stratégique GA4/Search Console/WooCommerce), Celebi (optimisation SEO automatique).",
      en: "4 autonomous AI agents: Pikachu (Facebook community manager), Porygon (Telegram analytics), Lugia (strategic intelligence GA4/Search Console/WooCommerce), Celebi (automatic SEO optimization).",
    },
    result: {
      fr: "Marketing entièrement automatisé : publications quotidiennes, rapports hebdomadaires, fiches produit optimisées, intelligence stratégique continue.",
      en: "Fully automated marketing: daily posts, weekly reports, optimized product listings, continuous strategic intelligence.",
    },
    stack: ["Claude API", "n8n", "GA4", "Search Console", "WooCommerce API", "Facebook API", "Telegram"],
    url: "https://feugjay.com",
    linkLabel: "feugjay.com",
  },
  {
    slug: "troc-afrique",
    category: "ai",
    title: { fr: "Plateforme d'échange gratuit", en: "Free exchange platform" },
    tagline: { fr: "Troc-Afrique", en: "Troc-Afrique" },
    problem: {
      fr: "Donner, échanger ou trouver des objets du quotidien reste coûteux et compliqué pour beaucoup de familles.",
      en: "Giving, swapping or finding everyday goods stays costly and complicated for many families.",
    },
    solution: {
      fr: "Une plateforme d'échange gratuit dédiée à la population africaine, pour donner et trouver des objets entre particuliers.",
      en: "A free exchange platform for African communities, to give and find goods between individuals.",
    },
    result: {
      fr: "Une alternative gratuite à l'achat, qui encourage l'entraide et la réutilisation.",
      en: "A free alternative to buying that encourages mutual aid and reuse.",
    },
    stack: ["Laravel", "Blade"],
    url: "https://troc-afrique.com",
    linkLabel: "troc-afrique.com",
    image: "/images/troc-afrique.jpg",
  },

  // ----- Data & Analytique -----
  {
    slug: "mataviande-audit",
    category: "data",
    featured: true,
    title: { fr: "Audit data & SEO", en: "Data & SEO audit" },
    tagline: { fr: "mataviande.com", en: "mataviande.com" },
    problem: {
      fr: "Une mauvaise configuration GA4 faussait toutes les données de l'entreprise.",
      en: "A broken GA4 setup was distorting every data point the business relied on.",
    },
    solution: {
      fr: "J'ai récupéré les vraies données de revenus WooCommerce et reconstruit le suivi de performance.",
      en: "I recovered the real WooCommerce revenue data and rebuilt the performance tracking.",
    },
    result: {
      fr: "Des chiffres fiables, un suivi de performance enfin exploitable pour décider.",
      en: "Reliable figures and performance tracking that can finally drive decisions.",
    },
    stack: ["GA4", "WooCommerce", "Looker Studio", "SQL"],
    url: "https://mataviande.com",
    linkLabel: "mataviande.com",
  },

  // ----- E-commerce & Retail -----
  {
    slug: "feugjay",
    category: "ecommerce",
    featured: true,
    title: { fr: "Marketplace e-commerce", en: "E-commerce marketplace" },
    tagline: { fr: "Feugjay", en: "Feugjay" },
    result: {
      fr: "2 500 produits, plus de 1 500 commandes traitées.",
      en: "2,500 products, more than 1,500 orders processed.",
    },
    stack: ["WooCommerce", "WordPress"],
    url: "https://feugjay.com",
    linkLabel: "feugjay.com",
    image: "/images/feugjay.jpg",
  },
  {
    slug: "dakar-shoes",
    category: "ecommerce",
    title: { fr: "Boutique de chaussures", en: "Footwear store" },
    tagline: { fr: "dakar-shoes.com", en: "dakar-shoes.com" },
    stack: ["WooCommerce"],
    url: "https://dakar-shoes.com",
    linkLabel: "dakar-shoes.com",
    image: "/images/dakar-shoes.jpg",
  },
  {
    slug: "kanega-africa",
    category: "ecommerce",
    title: { fr: "Boutique en ligne", en: "Online store" },
    tagline: { fr: "kanega-africa.com", en: "kanega-africa.com" },
    stack: ["WooCommerce"],
    url: "https://kanega-africa.com",
    linkLabel: "kanega-africa.com",
    image: "/images/kanega-africa.jpg",
  },
  {
    slug: "toubadunya",
    category: "ecommerce",
    title: { fr: "Boutique en ligne", en: "Online store" },
    tagline: { fr: "toubadunya.com", en: "toubadunya.com" },
    stack: ["WooCommerce"],
    url: "https://toubadunya.com",
    linkLabel: "toubadunya.com",
    image: "/images/toubadunya.jpg",
  },
  {
    slug: "tasara1",
    category: "ecommerce",
    title: { fr: "Boutique en ligne", en: "Online store" },
    tagline: { fr: "tasara1.com", en: "tasara1.com" },
    stack: ["WooCommerce"],
    url: "https://tasara1.com",
    linkLabel: "tasara1.com",
    image: "/images/tasara1.jpg",
  },
  {
    slug: "dilbi",
    category: "ecommerce",
    title: { fr: "Boutique en ligne", en: "Online store" },
    tagline: { fr: "dilbi.sn", en: "dilbi.sn" },
    stack: ["WooCommerce"],
    url: "https://dilbi.sn",
    linkLabel: "dilbi.sn",
    image: "/images/dilbi.jpg",
  },
  // ----- Sites clients & vitrines -----
  {
    slug: "menolumina",
    category: "client",
    title: { fr: "Site corporate · énergie", en: "Corporate · energy site" },
    tagline: { fr: "menolumina.com", en: "menolumina.com" },
    stack: ["WordPress"],
    url: "https://menolumina.com",
    linkLabel: "menolumina.com",
    image: "/images/menolumina.jpg",
  },
  {
    slug: "steponesenegal",
    category: "client",
    title: { fr: "Spa & bien-être", en: "Spa & wellness" },
    tagline: { fr: "steponesenegal.com", en: "steponesenegal.com" },
    stack: ["WordPress"],
    url: "https://steponesenegal.com",
    linkLabel: "steponesenegal.com",
    image: "/images/steponesenegal.jpg",
  },
  {
    slug: "cfpdlinguere",
    category: "client",
    title: { fr: "Centre de formation", en: "Training center" },
    tagline: { fr: "cfpdlinguere.com", en: "cfpdlinguere.com" },
    stack: ["WordPress"],
    url: "https://cfpdlinguere.com",
    linkLabel: "cfpdlinguere.com",
    image: "/images/cfpdlinguere.jpg",
  },
  {
    slug: "aayonenne",
    category: "client",
    title: { fr: "Association aide à l'enfance", en: "Children's aid association" },
    tagline: { fr: "aayonenne.com", en: "aayonenne.com" },
    stack: ["WordPress"],
    url: "https://aayonenne.com",
    linkLabel: "aayonenne.com",
    image: "/images/aayonenne.jpg",
  },
  {
    slug: "teranga-immobilier",
    category: "client",
    title: { fr: "Immobilier", en: "Real estate" },
    tagline: { fr: "teranga-immobilier.com", en: "teranga-immobilier.com" },
    stack: ["WordPress"],
    url: "https://teranga-immobilier.com",
    linkLabel: "teranga-immobilier.com",
    image: "/images/teranga-immobilier.jpg",
  },
  {
    slug: "gameshop-dakar",
    category: "client",
    title: { fr: "Boutique de jeux", en: "Game shop" },
    tagline: { fr: "gameshop-dakar.com", en: "gameshop-dakar.com" },
    stack: ["WooCommerce"],
    url: "https://gameshop-dakar.com",
    linkLabel: "gameshop-dakar.com",
    image: "/images/gameshop-dakar.jpg",
  },
  {
    slug: "expat-afrique",
    category: "client",
    title: { fr: "Services aux expatriés", en: "Expat services" },
    tagline: { fr: "expat-afrique.com", en: "expat-afrique.com" },
    stack: ["WordPress"],
    url: "https://expat-afrique.com",
    linkLabel: "expat-afrique.com",
    image: "/images/expat-afrique.jpg",
  },
  {
    slug: "sennumeric",
    category: "client",
    title: { fr: "Agence numérique", en: "Digital agency" },
    tagline: { fr: "sennumeric.com", en: "sennumeric.com" },
    stack: ["WordPress"],
    url: "https://sennumeric.com",
    linkLabel: "sennumeric.com",
    image: "/images/sennumeric.jpg",
  },
];

export const projectsByCategory = (category: Project["category"]) =>
  projects.filter((p) => p.category === category);
