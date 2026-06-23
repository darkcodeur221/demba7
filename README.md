# Portfolio · Ngagne Demba Beye

Portfolio professionnel bilingue (français / anglais) pour `demba7.seventwin.com`.
Spécialiste IA appliquée, automatisation, analytique et e-commerce.

**Stack :** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · next-themes · Resend.

---

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis remplis les clés (voir « Formulaire de contact »)
npm run dev
```

Ouvre http://localhost:3000 — tu es redirigé vers `/fr` (langue par défaut).
La version anglaise est sur `/en`.

Scripts utiles :

```bash
npm run dev     # serveur de développement
npm run build   # build de production
npm run start   # sert le build
npm run lint    # ESLint
```

---

## Structure

```
app/
  [locale]/            # fr (défaut) | en
    layout.tsx         # fonts, thème, métadonnées SEO, JSON-LD Person + ProfilePage
    page.tsx           # assemble les sections
    opengraph-image.tsx
  api/contact/route.ts # envoi du formulaire via Resend
  sitemap.ts · robots.ts · globals.css
components/
  sections/            # Hero, About, AIProjects, DataAnalytics, Ecommerce,
                       #  ClientSites, Services, Skills, Education, Contact
  ui/                  # button, badge (customisés à la marque)
  ProjectCard.tsx      # carte projet réutilisable (3 variantes)
  Nav · Footer · ThemeToggle · LocaleSwitcher · ContactForm
  motion/              # Reveal (apparition au scroll), FlowPipeline (visuel hero)
data/
  projects.ts · skills.ts · certifications.ts · services.ts
  content/{fr,en}.json # tous les textes d'interface
lib/
  i18n.ts · site.ts · utils.ts
public/                # CV, images, logos (voir public/README.md)
```

---

## Ajouter ou modifier un projet

Tout le contenu vit dans `data/` — aucun besoin de toucher aux composants.

1. Ouvre `data/projects.ts`.
2. Copie une entrée existante et adapte les champs. La `category` détermine la section :
   - `ai` → Projets IA & Automatisation
   - `data` → Data & Analytique
   - `ecommerce` → E-commerce & Retail
   - `client` → Sites clients & vitrines
3. Les textes (`title`, `tagline`, `problem`, `solution`, `result`) sont bilingues : remplis `fr` et `en`.
4. `featured: true` donne une carte plus grande. `stack` apparaît en badges.
5. Champ `image` : `images/<slug>.jpg` sous `/public`. Voir `public/README.md`
   pour activer les vraies captures (placeholders propres en attendant).

Compétences → `data/skills.ts` · Certifications et formation → `data/certifications.ts`
· Services → `data/services.ts` · Textes d'interface → `data/content/fr.json` et `en.json`.

Coordonnées, réseaux et URL du site se modifient en un seul endroit : `lib/site.ts`.

---

## Formulaire de contact (Resend)

Le formulaire poste vers `app/api/contact/route.ts`, qui envoie un email via [Resend](https://resend.com).

1. Crée une clé sur https://resend.com/api-keys.
2. Vérifie le domaine `deejitcorp.com` dans Resend (DNS) pour pouvoir envoyer
   depuis une adresse `@deejitcorp.com`.
3. Dans `.env.local` :
   ```
   RESEND_API_KEY=...
   CONTACT_FROM="Portfolio <contact@deejitcorp.com>"
   CONTACT_TO=demba@deejitcorp.com
   ```

Sans clé configurée, l'API répond une erreur explicite et le formulaire affiche
un message invitant à écrire directement par email.

---

## Déploiement

### Vercel (recommandé)
1. Pousse le dépôt sur GitHub.
2. Importe le projet sur Vercel.
3. Ajoute les variables d'environnement (`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`).
4. Associe le sous-domaine `demba7.seventwin.com`.

### VPS
```bash
npm run build
npm run start   # sert sur le port 3000 derrière un reverse proxy (Nginx, Caddy)
```

---

## SEO & accessibilité

- Métadonnées complètes + Open Graph + Twitter, par langue, avec `hreflang`.
- Données structurées JSON-LD (`Person` + `ProfilePage`).
- `sitemap.xml` et `robots.txt` générés automatiquement.
- Image OG générée à la volée (`opengraph-image.tsx`).
- Contraste AA, navigation clavier, attributs aria, `prefers-reduced-motion` respecté.
- Mode clair / sombre avec bascule, respect de `prefers-color-scheme`.

> Pense à mettre à jour `site.url` dans `lib/site.ts` si le domaine change.
