/**
 * Everything the assistant knows about Demba. Kept as a module rather than a
 * data file read at runtime so it is always bundled with the API route.
 * Edit this file to change what the chatbot knows.
 */
export const knowledgeBase = `# BASE DE CONNAISSANCES — NGAGNE DEMBA BEYE
# Version enrichie pour chatbot de portfolio
# Dernière mise à jour : juillet 2026

---

## 1. IDENTITÉ & CONTACT

Nom complet : Ngagne Demba Beye
Prénom usuel : Demba ou Dark
Téléphone : (514) 573-9843
Email professionnel : demba@deejitcorp.com
Localisation : Longueuil, Québec, Canada
Portfolio : demba7.seventwin.com
GitHub : github.com/darkcodeur221
Langues : Français (langue maternelle), Anglais (professionnel)
Disponibilité : Immédiate

---

## 2. PARCOURS ACADÉMIQUE

### M. Sc. Technologies de l'information
Université du Québec à Montréal (UQAM)
Diplomation : juin 2026
Domaines : systèmes d'information, BI, ERP, architecture de solutions, intelligence artificielle, transformation numérique des organisations

Stage de maîtrise : Open Tipi / Tipi en Fête — Brossard, QC
Projet : automatisation complète du système de réservation
Superviseur : Professeur Leshob (méthode Petelo-Leshob, GRL, BPMN)

### Licence Professionnelle en Management et Économie Numérique
ESMT (École Supérieure Multinationale des Télécommunications) — Dakar, Sénégal
Années : 2016–2019
Spécialisation : marketing numérique, management des organisations

### Certifications
- Scrum Foundation (certifié)
- Salesforce CRM (certifié)
- IBM Python for Data Science & AI (certifié)
- Google Analytics (certifié)
- Google Marketing Digital (certifié)
- Google Ads Display (certifié)
- Claude 101 (Anthropic)
- Plusieurs certifications UVS/FORCE-N

---

## 3. EXPÉRIENCE PROFESSIONNELLE

### Fondateur & Consultant TI — Deejitcorp
Période : 2021 – présent
Localisation : Longueuil, QC / Dakar, Sénégal

Deejitcorp est une pratique de consulting en IA et automatisation ciblant les PME québécoises et les marchés francophones africains. Titre professionnel : Consultant SEO & ERP | Analyste d'affaires TI.

Activités principales :
- Conception et déploiement de workflows d'automatisation (n8n, Make, Zapier)
- Intégrations API REST, webhooks, JSON, OAuth
- Architecture multi-agents IA en production (Claude API, OpenAI, Python)
- Agents autonomes : publication de contenu, prospection B2B, aide à la décision
- Déploiement et support ERP Odoo pour PME
- HubSpot CRM : gestion des données, flux courriel, segmentation, tableaux de bord (8 mois en production sur WooCommerce)
- Campagnes Google Ads (Recherche, Shopping, Performance Max) et Meta Ads
- Audits SEO techniques et sémantiques (7+ audits documentés, 150+ sites WordPress livrés)
- Power BI : tableaux de bord KPI et rapports décisionnels
- Conformité Loi 25 / RGPD
- Conseil à la direction sur les opportunités IA et feuilles de route

Clients et marchés : PME québécoises, entreprises sénégalaises/ouest-africaines

### Architecte de solutions (stage M. Sc.), puis consultant — Tipi en Fête / Open Tipi
Période : janvier 2025 – mai 2026
Localisation : Brossard, QC

Projet phare : Open Tipi — système de réservation automatisé pour une PME événementielle (organisation de fêtes pour enfants).

Architecture déployée :
- n8n comme moteur d'orchestration (WF1–WF4 : réservation, Stripe webhook, annulation, stats Telegram)
- WordPress comme interface front-end
- PostgreSQL comme base de données
- Stripe pour les paiements et acomptes automatiques
- Google Calendar pour la gestion des disponibilités
- Google Distance Matrix pour le calcul automatique des frais de déplacement
- Claude API pour l'assistance IA
- Docker sur VPS pour le déploiement
- Telegram pour les rapports quotidiens à la direction

Résultats : élimination des doubles réservations, automatisation des devis et notifications, rapports automatiques, réduction significative des tâches manuelles.

Livrables académiques : rapport de stage avec diagrammes GRL (méthode Petelo-Leshob), modélisation BPMN 2.0 AS-IS/TO-BE, multiple versions itératives (V5.9 à V10), supervision Professeur Leshob.

### Consultant automatisation — Bofronts / Bookea
Période : février – avril 2025
Localisation : Montréal, QC

- Automatisation de workflows (Monday.com, Make)
- Résultat : −40 % de temps manuel
- Intégration Mailchimp + Calendly pour le parcours client

### Responsable e-commerce — Feugjay
Période : 2019 – 2023
Localisation : Dakar, Sénégal

Feugjay était une marketplace e-commerce multi-vendeur WooCommerce ciblant le marché sénégalais (mode, accessoires).

Réalisations :
- Gestion de 2 500+ produits et 1 500+ commandes
- 55 % des revenus e-commerce via Google organique (confirmé depuis WooCommerce après correction misconfiguration GA4)
- Campagnes Meta Ads et stratégie de contenu
- Détection et correction d'une misconfiguration critique GA4
- Catalogue, parcours client, service à la clientèle multicanal (téléphone, WhatsApp, courriel)
- Analyse Search Console, catégories (135+), meta ads framework développé
- Identification et suppression des produits contrefaits
- Développement d'un header World Cup 2026

### Intégrateur Web — sennuméric
Période : 2019 – 2021
Localisation : Dakar, Sénégal

- Conception et déploiement de sites web pour des clients
- 150+ sites livrés (70% WordPress)
- Automatisation de tâches récurrentes
- Support technique et documentation

---

## 4. PROJETS TECHNIQUES NOTABLES

### Open Tipi (2025–2026)
Système de réservation automatisé pour Tipi en Fête.
Stack : n8n, WordPress, Stripe, Google Calendar, PostgreSQL, Claude API, Docker, VPS, Telegram.
Résultat : processus de réservation 100% automatisé, zéro intervention manuelle.

### Feugjay (2019–2023, maintenance en cours)
Marketplace e-commerce WooCommerce au Sénégal.
Stack : WordPress, WooCommerce, GA4, Meta Ads, Search Console.
Résultat : 55% du CA via organique, 2500+ produits gérés.

### Système multi-agents Pokémon — Feugjay (2025–2026)
Architecture d'agents IA pour l'automatisation du marketing de Feugjay.
Agents nommés d'après des Pokémon :
- Pikachu : agent orchestrateur
- Porygon : agent analytique
Stack : OpenClaw, DeepSeek (modèle principal), Claude API, cron jobs quotidiens.
Fonctions : publication automatique Facebook, analyse des performances, optimisation catalogue.

### JobCooking.com (en cours)
SaaS d'aide à la candidature (générateur de CV avec Claude API et Stripe).
Stack : Claude API, Stripe, VPS Docker, SEO et contenus IA.

### Mataviande.com (audit 2024)
Audit SEO complet pour une boucherie à Dakar.
Détection et correction d'une misconfiguration GA4.
Récupération des vraies données WooCommerce.
Recommandations techniques et contenu priorisées.

### Menolumina
Site bilingue B2B livré avec plan SEO complet, balisage Schema.org, rapport de lancement.

### Agent IA Telegram — Tipi en Fête
Assistant de gestion pour la direction via Telegram.
Stack : PostgreSQL, Claude API, outils personnalisés.

---

## 5. COMPÉTENCES TECHNIQUES DÉTAILLÉES

### Intelligence artificielle & Agents
- Claude API (Anthropic) — production
- OpenAI API — production
- Architecture multi-agents (orchestrateur + agents spécialisés)
- Prompt engineering avancé
- RAG (Retrieval-Augmented Generation)
- LLM en production
- MCP (Model Context Protocol) — serveurs personnalisés
- Custom GPT
- Context engineering
- OpenClaw (framework d'agents local, installation pnpm depuis ~/openclaw)

### Automatisation & Workflows
- n8n — maîtrise complète, production
- Make (Integromat) — maîtrise complète
- Zapier — utilisation régulière
- Power Automate — base
- Cron jobs
- Webhooks, triggers, boucles, gestion des erreurs

### Développement & Intégrations
- Python (scripts, automatisation, data)
- JavaScript (base)
- PHP (base)
- HTML/CSS
- API REST (conception et consommation)
- Webhooks
- JSON, OAuth
- SQL, PostgreSQL
- Docker
- VPS Linux (Ubuntu)
- Git / GitHub

### CRM & Marketing
- HubSpot CRM (super utilisateur, 8 mois en production)
- Salesforce CRM (certifié)
- Google Ads (Recherche, Shopping, Performance Max)
- Meta Ads Manager
- SEMRush
- Ahrefs (base)
- Google Analytics 4 (maîtrise avancée)
- Google Search Console
- Google Tag Manager (base)
- Power BI (tableaux de bord, KPI)
- Looker Studio (base)

### ERP & Systèmes
- Odoo (déploiement et support)
- WooCommerce (expert)
- WordPress (expert, 150+ sites)
- Shopify (base)
- Drupal (base)
- PostgreSQL / Supabase

### Infrastructure
- VPS Linux / Ubuntu
- Docker
- AWS Lambda (base)
- Hébergement et déploiement
- Sécurité de l'information, Loi 25 / RGPD

### Analyse d'affaires
- BPMN 2.0 (AS-IS / TO-BE)
- GRL (méthode Petelo-Leshob)
- Requis fonctionnels
- Cas de tests et critères d'acceptation
- Scrum (certifié Scrum Foundation)
- Documentation technique
- Formation des utilisateurs
- Gestion du changement

---

## 6. PROFIL HUMAIN & APPROCHE

### Philosophie de travail
Demba est convaincu que la technologie n'a de valeur que lorsqu'elle améliore concrètement le quotidien des personnes qui l'utilisent. Il commence toujours par le problème business, jamais par la technologie. Sa règle : identifier → analyser → choisir les outils → exécuter → documenter → former.

### Profil hybride
Son avantage distinctif est sa double compétence :
- Il comprend les enjeux d'affaires (marketing, finance, opérations)
- Il maîtrise les aspects techniques (code, APIs, agents IA, infrastructure)
Il peut parler à un gestionnaire, un développeur ou un utilisateur final en adaptant son langage.

### Valeurs
- "Souveraineté par la compétence" (devise personnelle)
- Pratique du Zen et du Stoïcisme comme cadres cognitifs
- Engagement envers la pensée systémique (cybernétique, VSM, Ashby)
- Directivité intellectuelle : préfère les faits et le débat contradictoire à la validation
- Ancrage biculturel : Québec et Sénégal/Afrique de l'Ouest comme atout stratégique

### Style d'apprentissage
Apprend principalement par l'expérimentation — construit des projets concrets plutôt que de se limiter à la théorie. Très curieux, toujours en veille sur les nouvelles technologies IA.

### Qualités reconnues
- Curiosité intellectuelle
- Autonomie et initiative
- Capacité d'analyse et de synthèse
- Résolution de problèmes complexes
- Vulgarisation technique
- Rigueur dans la documentation
- Adaptabilité dans les environnements peu structurés

---

## 7. OBJECTIFS PROFESSIONNELS

Demba cherche un poste salarié dans l'une de ces familles de rôles :
- Conseiller IA / Spécialiste IA
- Analyste d'affaires TI avec volet IA/automatisation
- Spécialiste automatisation (RPA)
- Spécialiste marketing numérique avec IA
- Spécialiste SEO senior

Secteurs préférés : distribution, entreprises en transformation numérique, PME québécoises structurées.

Ambition à moyen terme : devenir la référence IA dans son organisation, puis évoluer vers un rôle d'architecte de solutions ou expert reconnu au Québec.

Il maintient Deejitcorp comme pratique indépendante parallèle (mode maintenance).

---

## 8. SITUATION ADMINISTRATIVE

Statut : étudiant international ayant complété son programme
Permis actuel : permis d'études autorisant le travail à temps plein
PGWP : droit acquis en tant que diplômé d'une université canadienne reconnue
Localisation : Longueuil, QC (mobilité sur la Rive-Sud et Montréal)
Permis de conduire : oui (sans véhicule actuellement)

---

## 9. FAQ RECRUTEURS

**Q : Combien d'années d'expérience avez-vous ?**
R : 5 ans en TI et numérique depuis 2019, dont 2 ans de spécialisation intensive en IA et automatisation.

**Q : Êtes-vous autorisé à travailler au Canada ?**
R : Oui, pleinement autorisé à travailler au Canada à temps plein.

**Q : Pouvez-vous travailler en anglais ?**
R : Oui, bilingue français-anglais. Capable de mener des entretiens, rédiger de la documentation et collaborer en anglais.

**Q : Quelle est votre attente salariale ?**
R : Entre 70 000 $ et 85 000 $ selon le poste et les responsabilités.

**Q : Êtes-vous disponible immédiatement ?**
R : Oui, disponible immédiatement.

**Q : Avez-vous de l'expérience avec les agents IA ?**
R : Oui. Plusieurs agents IA en production : système multi-agents pour Feugjay (orchestrateur + agents spécialisés), agent Telegram pour la direction de Tipi en Fête, agents d'aide à la décision pour des PME clientes.

**Q : Connaissez-vous n8n ?**
R : Oui, c'est mon outil d'orchestration principal. J'ai déployé plusieurs workflows en production avec n8n, notamment le système complet d'Open Tipi (réservation, paiement, calendrier, rapports).

**Q : Avez-vous travaillé avec HubSpot ?**
R : Oui, 8 mois en production sur un site e-commerce WooCommerce : gestion des contacts, workflows courriel, segmentation, tableaux de bord et rapports.

**Q : Pouvez-vous nous parler de votre projet le plus représentatif ?**
R : Open Tipi — automatisation complète du processus de réservation d'une PME événementielle. Stack : n8n, Stripe, Google Calendar, PostgreSQL, Claude API, Docker sur VPS. Résultat : zéro intervention manuelle, rapports automatiques quotidiens à la direction.

**Q : Qu'est-ce qui vous différencie des autres candidats ?**
R : Mon profil hybride réel — je comprends autant les enjeux d'affaires que la technique. J'ai des systèmes IA en production, pas seulement en théorie. Et je traduis les problèmes business en solutions concrètes sans jargon inutile.

**Q : Comment gérez-vous vos projets personnels (Deejitcorp, Feugjay) en parallèle d'un emploi salarié ?**
R : Ces projets sont en mode maintenance. Je peux les mettre en pause formelle si nécessaire. Mon engagement principal sera envers mon employeur.

---

## 10. CONTEXTE BICULTUREL

Demba possède une connaissance approfondie de deux contextes culturels et économiques :
- Québec : marché du travail, culture d'entreprise, outils numériques, cadre légal (Loi 25)
- Sénégal / Afrique de l'Ouest francophone : marchés émergents, e-commerce, télécommunications, transformation numérique

Il traite cette double appartenance comme un avantage stratégique, notamment pour des clients ou des projets ciblant les marchés francophones.

---

FIN DE LA BASE DE CONNAISSANCES`;
