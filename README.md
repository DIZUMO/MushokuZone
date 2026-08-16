# MushokuZone

> Site documentaire consacré à l'univers de **Mushoku Tensei : Isekai Ittara Honki Dasu**.

🌐 **Site :** https://dizumo.github.io/MushokuZone/  
💻 **Dépôt :** https://github.com/DIZUMO/MushokuZone

---

## Statut du projet

**Version actuelle : Bêta / développement actif**

MushokuZone est actuellement dans une phase de développement préliminaire.

Le site dispose déjà d'une **architecture technique**, d'une structure de navigation, de feuilles de style, de scripts JavaScript, de fichiers de données JSON et de ressources graphiques.

En revanche, **le contenu définitif des différentes pages n'est pas encore intégré**.

L'objectif actuel est donc de construire une base technique propre, cohérente et suffisamment flexible pour permettre l'ajout progressif du contenu sans devoir reconstruire l'ensemble du site.

> Le projet est volontairement considéré comme une base évolutive. L'architecture actuelle est susceptible d'être modifiée à mesure que le site gagne en contenu et en fonctionnalités.

---

# Objectifs

MushokuZone a pour objectif de devenir un site documentaire structuré autour de plusieurs aspects de l'univers de *Mushoku Tensei* :

- Personnages
- Univers
- Chronologie
- Épisodes
- Informations sur l'œuvre
- Sources et références
- Données détaillées
- Présentation de l'auteur et de l'œuvre
- Analyse et contexte autour de la série

Le projet cherche notamment à séparer clairement :

- la **structure de présentation** ;
- les **données** ;
- la **logique JavaScript** ;
- les **styles CSS** ;
- les **ressources graphiques**.

Cette séparation doit permettre de faire évoluer le contenu sans multiplier inutilement le code HTML.

---

# Architecture du projet

L'architecture actuelle du dépôt est organisée de la manière suivante :

```text
MushokuZone/
│
├── index.html
├── LICENSE
├── README.md
│
├── Autre pages/
│   ├── A-propos.html
│   ├── Biographie.html
│   ├── Chronologie.html
│   ├── Episode.html
│   ├── Impact.html
│   ├── Personnages.html
│   ├── Sources.html
│   ├── Sylphiette.html
│   └── Univers.html
│
├── Css/
│   ├── characters-wiki.css
│   ├── spoiler.css
│   ├── style-common.css
│   └── style-episode.css
│
├── Data/
│   ├── backgrounds.json
│   ├── characters-detailed.json
│   ├── characters.json
│   ├── chronology.json
│   ├── config.json
│   ├── episodes.json
│   ├── homepage.json
│   ├── navigation.json
│   ├── pages-content.json
│   ├── rudeus-detailed.json
│   ├── site-config.json
│   ├── site.json
│   ├── sources.json
│   ├── sylphiette-detailed.json
│   ├── trailers.json
│   └── universe.json
│
├── Image/
│   ├── Mushoku_Tensei_Logo_(japonais).png
│   ├── bebe pas bo.jpg
│   ├── mushoku-tensei1.jpg
│   ├── mushoku-tensei2.jpg
│   ├── mushoku-tensei3.jpg
│   ├── mushoku-tensei4.jpg
│   ├── mushoku-tensei5.jpg
│   ├── mushoku-tensei6.jpg
│   ├── mushoku-tensei7.jpg
│   ├── mushoku-tensei8.jpg
│   ├── mushoku-tensei9.jpg
│   ├── mushoku-tensei10.png
│   ├── mushoku-tensei11.jpg
│   ├── mushoku-tensei12.jpg
│   ├── mushoku-tensei13.jpg
│   ├── mushoku-tensei14.jpg
│   ├── mushoku-tensei15.jpg
│   │
│   └── Image trinity/
│       ├── 1321263(1).png
│       ├── 1367224.png
│       ├── 968028.png
│       ├── dgten7j-c998db0a-8880-44aa-bdff-ab9f946cb088.png
│       ├── mushoku_tensei___rudy_and_norn__minimalist_art__by_dave020626_dh8uq16-pre.jpg
│       ├── mushoku_tensei___rudy_and_sylphie__minimalist_art__by_dave020626_dgahq8a-pre.jpg
│       ├── peakpx.jpg
│       └── peakpx(1).jpg
│
└── Js/
    ├── Jscripts.js
    ├── Jscripts2.js
    ├── characters-page.js
    ├── content-generator.js
    ├── data-manager.js
    ├── seo-injector.js
    ├── spoiler-manager.js
    └── style-injector.js
```

---

# Organisation des fichiers

## `index.html`

Point d'entrée principal du site.

Cette page constitue la base de l'accueil de MushokuZone et sert de point de départ à la navigation entre les différentes sections.

---

# `Autre pages/`

Ce dossier contient les différentes pages HTML secondaires du site.

### `A-propos.html`

Page consacrée à la présentation du projet, de ses objectifs et de son fonctionnement.

### `Biographie.html`

Page destinée aux informations biographiques concernant l'auteur de *Mushoku Tensei*, Rifujin na Magonote.

### `Chronologie.html`

Structure destinée à présenter la chronologie et les différentes étapes importantes liées à l'œuvre.

### `Episode.html`

Page dédiée aux épisodes et à leur présentation.

Cette page possède également une architecture JavaScript et CSS spécifique pour la gestion du lecteur et des éléments associés.

### `Impact.html`

Page destinée à présenter l'impact et la réception de l'œuvre.

### `Personnages.html`

Page servant de base au futur système de présentation des personnages.

Elle est associée à des données JSON et à des scripts JavaScript spécifiques.

### `Sources.html`

Page destinée à regrouper les sources utilisées pour documenter les informations présentées sur le site.

### `Univers.html`

Page destinée à présenter l'univers de *Mushoku Tensei*, notamment son monde, ses peuples, ses régions et ses systèmes.

---

# `Css/`

Le dossier `Css` regroupe les feuilles de style du site.

### `style-common.css`

Feuille de style principale contenant les éléments communs du site :

- structure générale ;
- navigation ;
- footer ;
- composants réutilisables ;
- mise en page ;
- responsive design ;
- éléments visuels communs.

### `style-episode.css`

Styles spécifiques à la page des épisodes et à son interface de lecture.

### `characters-wiki.css`

Styles destinés au système de présentation des personnages sous forme de wiki.

### `spoiler.css`

Styles associés à la gestion et à l'affichage des éléments contenant des spoilers.

---

# `Data/`

Le dossier `Data` constitue la couche de données du projet.

L'objectif est de ne pas stocker toute l'information directement dans les fichiers HTML.

Les fichiers JSON permettent ainsi de séparer :

```text
Présentation
     ↓
HTML / JavaScript
     ↓
Données
     ↓
Fichiers JSON
```

Cette architecture doit faciliter la mise à jour et l'extension du contenu.

### `backgrounds.json`

Données relatives aux arrière-plans utilisés par le site.

### `characters.json`

Données générales concernant les personnages.

### `characters-detailed.json`

Informations plus détaillées destinées au système de fiches de personnages.

### `chronology.json`

Données utilisées pour la chronologie.

### `config.json`

Configuration générale utilisée par les scripts du site.

### `episodes.json`

Données relatives aux épisodes.

### `homepage.json`

Données destinées à la page d'accueil.

### `navigation.json`

Configuration des éléments de navigation du site.

### `pages-content.json`

Structure et contenu préparatoire destiné aux différentes pages.

### `rudeus-detailed.json`

Données détaillées concernant Rudeus.

### `sylphiette-detailed.json`

Données détaillées concernant Sylphiette.

### `site-config.json`

Configuration générale et paramètres du site.

### `site.json`

Informations générales concernant le projet.

### `sources.json`

Références et sources documentaires utilisées ou prévues pour le site.

### `trailers.json`

Données relatives aux bandes-annonces.

### `universe.json`

Données relatives à l'univers de *Mushoku Tensei*.

---

# `Js/`

Le dossier `Js` contient la logique JavaScript du site.

L'objectif est de garder les responsabilités séparées afin d'éviter qu'un seul fichier JavaScript devienne progressivement un monstre de 4 000 lignes que personne n'ose toucher.

### `Jscripts.js`

Scripts généraux du site.

Il regroupe notamment les fonctionnalités communes utilisées par plusieurs pages.

### `Jscripts2.js`

Scripts associés à la logique du lecteur et aux fonctionnalités spécifiques existantes.

### `characters-page.js`

Logique spécifique à la page et au système de présentation des personnages.

### `content-generator.js`

Système destiné à générer dynamiquement certains contenus à partir des données disponibles.

### `data-manager.js`

Gestion du chargement et de l'utilisation des données JSON.

### `seo-injector.js`

Gestion et injection dynamique de certaines métadonnées liées au référencement.

### `spoiler-manager.js`

Gestion des éléments contenant des spoilers.

### `style-injector.js`

Gestion dynamique de certains styles utilisés par le site.

---

# `Image/`

Le dossier `Image` contient les ressources graphiques du site.

Il comprend notamment :

- logos ;
- illustrations ;
- images liées à *Mushoku Tensei* ;
- images utilisées pour les arrière-plans ;
- ressources graphiques destinées aux différentes pages.

Le sous-dossier `Image trinity/` regroupe une partie des ressources graphiques utilisées pour la conception visuelle du site.

---

# Architecture fonctionnelle

L'organisation générale du projet peut être représentée ainsi :

```text
                    ┌─────────────────────┐
                    │      index.html     │
                    │       Accueil       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Pages HTML         JavaScript          CSS
      Autre pages/             │           Css/
              │                │
              │                ▼
              │          Data Manager
              │                │
              │                ▼
              │            Data/*.json
              │
              ▼
        Contenu affiché
              │
              ▼
         Image/*.*
```

Le principe est de faire évoluer progressivement le site vers une architecture où :

**HTML**  
→ définit principalement la structure des pages.

**CSS**  
→ définit l'apparence et la mise en page.

**JavaScript**  
→ gère le comportement et les fonctionnalités dynamiques.

**JSON**  
→ contient les données utilisées par le site.

**Images**  
→ contient les ressources visuelles.

Cette séparation rend le projet plus facile à maintenir et permet notamment d'ajouter du contenu sans devoir modifier systématiquement la structure HTML.

---

# Technologies utilisées

MushokuZone est actuellement développé avec des technologies web standards :

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure des pages |
| CSS3 | Design, responsive design et animations |
| JavaScript | Fonctionnalités dynamiques |
| JSON | Stockage et organisation des données |
| Git | Gestion des versions |
| GitHub | Hébergement du code |
| GitHub Pages | Hébergement du site |

Aucun framework JavaScript majeur n'est actuellement nécessaire au fonctionnement de la structure principale du projet.

---

# Fonctionnalités prévues

Le projet étant encore en bêta, certaines fonctionnalités sont actuellement préparées dans l'architecture mais ne constituent pas encore une version finale du site.

Les principaux objectifs sont notamment :

- système complet de fiches personnages ;
- présentation détaillée de l'univers ;
- chronologie interactive ;
- informations détaillées sur les épisodes ;
- gestion structurée des sources ;
- système de spoilers ;
- génération dynamique de contenu ;
- navigation centralisée ;
- amélioration progressive du responsive design ;
- amélioration de l'accessibilité ;
- optimisation SEO ;
- amélioration des performances ;
- enrichissement progressif des données JSON.

---

# Développement

## Lancer le site en local

Le projet étant un site statique, aucun serveur backend spécifique n'est nécessaire.

Après avoir cloné le dépôt :

```bash
git clone https://github.com/DIZUMO/MushokuZone.git
cd MushokuZone
```

Un serveur HTTP local peut ensuite être utilisé.

Par exemple avec Python :

```bash
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

L'utilisation d'un serveur local est recommandée plutôt que l'ouverture directe des fichiers HTML avec `file://`, notamment pour les fonctionnalités JavaScript utilisant des fichiers JSON.

---

# GitHub Pages

Le projet est destiné à être publié avec **GitHub Pages**.

Site actuellement accessible à l'adresse :

https://dizumo.github.io/MushokuZone/

Le dépôt utilise la branche `main` comme branche principale.

---

# Évolution du projet

Le développement de MushokuZone suit une approche progressive.

### Phase actuelle : Architecture

- structure des pages ;
- système de navigation ;
- organisation CSS ;
- organisation JavaScript ;
- système de données JSON ;
- ressources graphiques ;
- premières fonctionnalités dynamiques.

### Phase suivante : Contenu

- rédaction des pages ;
- intégration des données ;
- création des fiches personnages ;
- développement de la chronologie ;
- enrichissement de l'univers ;
- ajout des sources ;
- développement du contenu des épisodes.

### Phase ultérieure : Optimisation

- performances ;
- accessibilité ;
- responsive design ;
- SEO ;
- organisation du code ;
- optimisation des ressources ;
- amélioration de l'expérience utilisateur.

L'architecture n'est donc **pas considérée comme définitive**.

---

# Philosophie du projet

MushokuZone est conçu comme un projet documentaire et évolutif.

Les principes recherchés sont :

### Exactitude

Les informations destinées au site doivent être vérifiées avant leur publication.

### Séparation des données et de la présentation

Les données doivent autant que possible être séparées du HTML afin de faciliter leur maintenance.

### Modularité

Chaque fonctionnalité doit avoir une responsabilité clairement définie.

### Évolutivité

L'architecture doit pouvoir accueillir progressivement de nouvelles pages, données et fonctionnalités.

### Lisibilité

Le code doit rester compréhensible et maintenable, y compris lorsque le projet prendra de l'ampleur.

---

# État actuel

| Élément | État |
|---|---|
| Structure HTML | 🟡 En développement |
| Navigation | 🟡 En développement |
| CSS | 🟡 En développement |
| JavaScript | 🟡 En développement |
| Architecture JSON | 🟡 En développement |
| Système de personnages | 🟡 En développement |
| Système de chronologie | 🟡 En développement |
| Système d'épisodes | 🟡 En développement |
| Contenu documentaire | 🔴 Pas encore finalisé |
| Documentation | 🟡 En développement |

**MushokuZone n'est donc pas encore une version finale.**

Les fichiers et fonctionnalités présents dans le dépôt constituent principalement la **base technique destinée à accueillir le contenu futur**.

---

# Aspects légaux

MushokuZone est un projet **non officiel et indépendant**.

*Mushoku Tensei: Isekai Ittara Honki Dasu* et ses éléments associés appartiennent à leurs ayants droit respectifs.

Le projet n'a pas pour objectif de revendiquer la propriété intellectuelle de l'œuvre originale.

Les ressources externes utilisées dans le projet restent soumises aux droits de leurs auteurs et ayants droit respectifs.

---

# Licence

Le code source du projet est distribué sous licence **MIT**.

Voir [`LICENSE`](LICENSE) pour les détails.

La licence du code du projet ne signifie pas que les éléments appartenant à la propriété intellectuelle de *Mushoku Tensei* sont placés sous licence MIT.

---

# Auteur

**DIZUMO**

GitHub : https://github.com/DIZUMO  
Projet : https://github.com/DIZUMO/MushokuZone

---

# Contribution

Le projet étant encore en phase de développement, l'architecture peut évoluer de manière importante.

Les corrections, suggestions et contributions peuvent être proposées via les **Issues** et **Pull Requests** du dépôt GitHub.

Pour signaler une erreur concernant une information documentaire, il est recommandé de fournir une source permettant de vérifier la correction proposée.
