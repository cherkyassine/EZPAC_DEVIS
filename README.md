# EZpac — Site de devis en ligne

Un seul fichier autonome (`index.html`) : type de sac, format, grammage,
couleur, quantité, impression, upload de logo → envoi par WhatsApp, email
ou PDF. Aucune dépendance à Claude ou à un serveur : tout tourne dans le
navigateur du client.

## Mettre le site en ligne sur GitHub Pages (gratuit)

1. Allez sur [github.com](https://github.com) et connectez-vous (ou créez un compte).
2. Cliquez sur **New repository**. Nommez-le par exemple `ezpac-devis`.
   Cochez "Public", puis **Create repository**.
3. Sur la page du repo, cliquez **Add file > Upload files**.
4. Glissez `index.html` (et `apps-script.gs`, `README.md` si vous voulez les garder).
5. Cliquez **Commit changes**.
6. Allez dans **Settings > Pages** (menu de gauche).
7. Sous "Build and deployment" → Source : **Deploy from a branch**.
   Branch : **main**, dossier : **/ (root)**. Cliquez **Save**.
8. Au bout d'1-2 minutes, votre site est en ligne à l'adresse :
   `https://VOTRE-NOM-UTILISATEUR.github.io/ezpac-devis/`

### Relier un nom de domaine perso (ex. devis.ezpac.ma)

Dans **Settings > Pages > Custom domain**, entrez `devis.ezpac.ma`, puis
chez votre fournisseur de domaine (là où vous avez acheté ezpac.ma),
ajoutez un enregistrement DNS de type **CNAME** :
- Nom : `devis`
- Valeur : `VOTRE-NOM-UTILISATEUR.github.io`

## Activer les options avancées

Ouvrez `index.html`, cherchez le bloc `const CONFIG = {` (tout en haut du
`<script>`), et remplissez les valeurs souhaitées :

```js
const CONFIG = {
  GA_MEASUREMENT_ID: "",     // Google Analytics 4
  SHEETS_WEBHOOK_URL: "",    // Google Apps Script (voir apps-script.gs)
  FORMSPREE_ENDPOINT: ""     // Formspree (envoi réel des fichiers joints)
};
```

### 1. Google Analytics (statistiques de visite)

1. Créez un compte sur [analytics.google.com](https://analytics.google.com).
2. Créez une propriété "Web" pour votre site.
3. Copiez l'ID de mesure (format `G-XXXXXXXXXX`).
4. Collez-le dans `GA_MEASUREMENT_ID`.

### 2. Historique des devis dans Google Sheets

Suivez les instructions en haut du fichier `apps-script.gs` fourni à côté
de `index.html`. Une fois déployé, collez l'URL obtenue dans
`SHEETS_WEBHOOK_URL`. Chaque devis envoyé (WhatsApp, email ou PDF) sera
alors aussi enregistré automatiquement dans votre Google Sheet.

### 3. Envoi réel des fichiers joints (Formspree)

1. Créez un compte gratuit sur [formspree.io](https://formspree.io).
2. Créez un formulaire, copiez son ID (ex. `xaybzwkd`).
3. Collez `https://formspree.io/f/xaybzwkd` dans `FORMSPREE_ENDPOINT`.
4. Un bouton vert supplémentaire "Envoyer avec les fichiers joints"
   apparaîtra automatiquement dès qu'un article du devis contient un
   fichier — le logo partira alors vraiment en pièce jointe par email.

## Support

Les prix ne sont pas encore affichés (à intégrer une fois vos tarifs
communiqués). Toute modification ultérieure du site peut être redemandée
à Claude en fournissant à nouveau `index.html`.

## Référencement Google (SEO)

Le fichier `index.html` contient déjà : titre et description optimisés,
données structurées (JSON-LD "entreprise locale"), un titre H1 visible.
Les fichiers `robots.txt` et `sitemap.xml` sont fournis à côté — à
uploader avec `index.html` à la racine de votre site.

Une fois le site en ligne sur `ezpac.ma` :

1. Allez sur [Google Search Console](https://search.google.com/search-console).
2. Ajoutez la propriété `ezpac.ma`, validez-la (Search Console vous
   donnera une méthode — souvent un enregistrement DNS TXT à ajouter
   chez IAM, comme pour le CNAME).
3. Une fois validé, allez dans "Sitemaps" et soumettez
   `https://ezpac.ma/sitemap.xml`.
4. Créez ou revendiquez votre fiche
   [Google Business Profile](https://business.google.com) au nom d'EZpac
   (Rabat) — c'est ce qui a le plus d'impact pour être trouvé localement.
