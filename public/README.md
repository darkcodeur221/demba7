# Assets à fournir

Dépose ici les fichiers suivants pour remplacer les placeholders :

- `cv-ngagne-demba-beye.pdf` (racine de `/public`) — ton CV téléchargeable, lié depuis le hero et la nav.
- `images/<slug>.jpg` — une capture par projet. Le `slug` correspond au champ du même nom dans `data/projects.ts` (ex. `images/feugjay.jpg`).

Une fois les captures ajoutées, ouvre `components/ProjectCard.tsx` et passe la
constante `placeholderOnly` à `false` dans le composant `Cover` pour afficher
les vraies images au lieu des couvertures de marque.
