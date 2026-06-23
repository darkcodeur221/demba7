# Déploiement sur VPS Hostinger — demba7.seventwins.com

Le portfolio est une app **Next.js avec serveur** (formulaire de contact, image OG
dynamique, redirection `/` → `/fr`). On la lance avec **PM2** derrière **Nginx**,
comme tes autres projets Node sur le VPS.

Prérequis sur le VPS : Node.js **20+**, `npm`, `pm2`, `nginx`, et `git`.
Vérifie : `node -v` (doit afficher v20 ou plus).

---

## 1. DNS chez Hostinger

Dans Hostinger → domaine **seventwins.com** → **Zone DNS**, ajoute un enregistrement :

| Type | Nom (Host) | Valeur (Pointe vers) | TTL |
|------|------------|----------------------|-----|
| `A`  | `demba7`   | **IP publique de ton VPS** | 14400 |

> C'est un sous-domaine auto-hébergé sur ton VPS → enregistrement **A** vers l'IP
> du VPS (pas un CNAME). Propagation : quelques minutes à 1 h.
> Trouve l'IP du VPS avec `curl -4 ifconfig.me` sur le serveur.

---

## 2. Récupérer le code sur le VPS

```bash
# Place-le à côté de tes autres projets, ex. /var/www
cd /var/www
git clone https://github.com/darkcodeur221/demba7.git demba7-portfolio
cd demba7-portfolio
```

Mises à jour futures : `git pull` puis refais l'étape 4 (build + reload).

---

## 3. Variables d'environnement (secrets)

Crée `.env.local` à la racine du projet (il est gitignoré, ne sera jamais commité) :

```bash
cat > .env.local <<'EOF'
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_FROM="Portfolio <contact@deejitcorp.com>"
CONTACT_TO=demba@deejitcorp.com
EOF
```

- Crée la clé sur https://resend.com/api-keys.
- `CONTACT_FROM` doit être sur un domaine **vérifié dans Resend** (ex.
  `deejitcorp.com`, ou `seventwins.com` si tu le vérifies).
- Sans clé, le site marche mais le formulaire renvoie une erreur invitant à
  écrire directement par email.

---

## 4. Installer, builder, démarrer

```bash
npm ci
npm run build

# Démarrer avec PM2 (port 3007 par défaut, voir ecosystem.config.cjs)
pm2 start ecosystem.config.cjs
pm2 save                 # persiste la liste des process
pm2 startup              # (une seule fois) génère le service systemd au reboot
```

Vérifie en local sur le VPS : `curl -I http://127.0.0.1:3007/fr` → `200 OK`.

> Si le port 3007 est déjà pris par un autre projet, change `PORT` dans
> `ecosystem.config.cjs` **et** le `proxy_pass` du fichier Nginx, puis
> `pm2 reload demba7-portfolio`.

Pour les mises à jour : `git pull && npm ci && npm run build && pm2 reload demba7-portfolio`.

---

## 5. Nginx + HTTPS

```bash
sudo cp deploy/nginx-demba7.seventwins.com.conf \
        /etc/nginx/sites-available/demba7.seventwins.com
sudo ln -s /etc/nginx/sites-available/demba7.seventwins.com \
           /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Puis le certificat SSL gratuit (Let's Encrypt) :

```bash
sudo certbot --nginx -d demba7.seventwins.com
```

Certbot ajoute automatiquement le bloc HTTPS (443) et la redirection HTTP → HTTPS.

---

## 6. Vérifier

- https://demba7.seventwins.com → redirige vers `/fr`
- https://demba7.seventwins.com/en → version anglaise
- https://demba7.seventwins.com/fr/cv → le CV
- Teste le formulaire de contact (un email doit arriver à `CONTACT_TO`).

## Dépannage rapide

| Symptôme | Piste |
|----------|-------|
| 502 Bad Gateway | l'app PM2 ne tourne pas → `pm2 logs demba7-portfolio` |
| Port déjà utilisé | change `PORT` (ecosystem) + `proxy_pass` (nginx) |
| Formulaire en erreur | `.env.local` manquant/clé Resend invalide ou domaine non vérifié |
| 404 après build | as-tu bien fait `npm run build` avant `pm2 start` ? |
| Le site ne répond pas du tout | DNS pas encore propagé, ou port 80/443 fermé au pare-feu |
