# MushokuZone

> Site documentaire non officiel consacré à l'univers de **Mushoku Tensei : Isekai Ittara Honki Dasu**.

🌐 **Site :** https://dizumo.github.io/MushokuZone/  
💻 **Dépôt :** https://github.com/DIZUMO/MushokuZone

## Statut

**Bêta / développement actif**

MushokuZone est encore en développement. Le dépôt contient une structure HTML, des feuilles CSS, des scripts JavaScript, des fichiers JSON et des ressources graphiques. Plusieurs pages contiennent déjà du contenu, tandis que d'autres parties du site sont encore en développement.

L'architecture peut encore évoluer.

---

## Architecture du dépôt

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
│   └── ressources graphiques
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

`Sylphiette.html` ne fait plus partie du dépôt. La page des personnages n'utilise pas de page HTML séparée pour Sylphiette. Sa fiche est chargée depuis `Data/sylphiette-detailed.json` par `Js/characters-page.js`.

---

## Pages HTML

### `index.html`

Page d'accueil. Elle charge notamment `Css/style-common.css` et `Js/data-manager.js` et contient les différentes sections de présentation actuellement présentes sur l'accueil.

### `Autre pages/`

Le dossier contient actuellement :

| Fichier | Fonction |
|---|---|
| `A-propos.html` | Page « À propos » |
| `Biographie.html` | Page « Biographie » |
| `Chronologie.html` | Page « Chronologie » |
| `Episode.html` | Page « Épisodes » |
| `Impact.html` | Page « Impact » |
| `Personnages.html` | Interface de génération dynamique des dossiers de personnages |
| `Sources.html` | Page « Sources » |
| `Univers.html` | Page « Univers » |

`Data/navigation.json` référence ces pages dans la navigation du site.

---

## CSS

Le dossier `Css/` contient les feuilles de style suivantes :

### `style-common.css`

Feuille de style commune du site.

### `characters-wiki.css`

Feuille de style utilisée par `Personnages.html` pour l'interface des personnages.

### `style-episode.css`

Feuille de style dédiée à la page des épisodes.

### `spoiler.css`

Feuille de style liée aux éléments de spoilers.

---

## JavaScript

### `data-manager.js`

Gestionnaire centralisé des données JSON.

Il détermine le chemin vers `Data/` selon l'emplacement de la page, charge les fichiers JSON avec `fetch`, utilise un cache et gère les erreurs de chargement.

Il charge également `Data/backgrounds.json` pour appliquer l'arrière-plan correspondant à la page courante. Lors du chargement de `characters-detailed.json`, il tente aussi de charger `rudeus-detailed.json` afin de remplacer les données de Rudeus par son dossier séparé.

### `characters-page.js`

Génère le contenu de `Personnages.html`.

Il charge directement :

```text
Data/characters-detailed.json
Data/sylphiette-detailed.json
```

Les données de Sylphiette sont ensuite ajoutées aux personnages chargés. Le script génère les dossiers de Rudeus, Roxy, Sylphiette et Eris ainsi que le sélecteur de personnages.

### `content-generator.js`

Contient des fonctions de génération de contenu à partir des données JSON, dont une fonction de génération de la page des personnages.

### `Jscripts.js`

Script général utilisé par les pages du site.

### `Jscripts2.js`

Second fichier de scripts JavaScript présent dans le projet.

### `seo-injector.js`

Script chargé par `Personnages.html` pour la gestion d'éléments SEO.

### `spoiler-manager.js`

Script consacré à la gestion des spoilers.

### `style-injector.js`

Script d'injection dynamique de styles.

---

## Données JSON

Le dossier `Data/` regroupe les données et configurations JSON du projet.

### Données directement utilisées dans le fonctionnement vérifié

`navigation.json` définit la navigation du site.

`backgrounds.json` définit les images de fond par identifiant de page ainsi qu'une image de secours.

`characters-detailed.json` contient les dossiers détaillés des personnages principaux.

`sylphiette-detailed.json` contient le dossier détaillé de Sylphiette et est directement chargé par `characters-page.js`.

`rudeus-detailed.json` contient le dossier séparé de Rudeus et est chargé par `data-manager.js` lorsque `characters-detailed.json` est demandé.

Les autres fichiers JSON présents dans le dossier constituent les données et configurations du projet. Leur utilisation peut évoluer pendant le développement.

---

## Fonctionnement de `Personnages.html`

La page des personnages utilise une génération dynamique :

```text
Personnages.html
       │
       ├── data-manager.js
       ├── content-generator.js
       └── characters-page.js
                    │
                    ├── characters-detailed.json
                    │       └── rudeus-detailed.json
                    │
                    └── sylphiette-detailed.json
                    │
                    ▼
          #content-personnages
```

`Personnages.html` fournit le conteneur `#content-personnages`. `characters-page.js` génère ensuite les dossiers de personnages dans ce conteneur.

---

## Navigation

`Data/navigation.json` définit actuellement les entrées suivantes :

```text
Accueil
Univers
Personnages
Chronologie
Épisodes
Biographie
Impact
Sources
À propos
```

Les pages secondaires correspondantes se trouvent dans `Autre pages/`.

---

## Arrière-plans

`Data/backgrounds.json` associe actuellement des images aux identifiants :

```text
index
biographie
impact
univers
personnages
chronologie
episode
sources
apropos
```

`data-manager.js` charge ces données et applique l'image correspondante au document et au `body`.

---

## Technologies

Le dépôt utilise actuellement :

- HTML
- CSS
- JavaScript
- JSON
- Git
- GitHub Pages pour l'hébergement du site

Aucune dépendance à un framework JavaScript n'est déclarée dans l'architecture actuelle du dépôt vérifiée ici.

---

## Développement local

Le projet peut être servi localement avec un serveur HTTP.

```bash
git clone https://github.com/DIZUMO/MushokuZone.git
cd MushokuZone
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

Un serveur HTTP local est notamment utile pour permettre aux scripts JavaScript de charger les fichiers JSON avec `fetch`.

---

## Évolution du projet

MushokuZone est encore en bêta. Le contenu, les données, l'architecture et les fonctionnalités peuvent donc évoluer.

Les futures évolutions ne sont pas présentées ici comme des fonctionnalités déjà disponibles.

---

## Licence

Le dépôt contient une **licence MIT**. Voir [`LICENSE`](LICENSE) pour le texte complet.

Cette licence concerne le code et le logiciel du projet. Elle ne transfère pas les droits de propriété intellectuelle liés à *Mushoku Tensei* ou à ses éléments appartenant à leurs ayants droit.

---

## Projet

**DIZUMO/MushokuZone**  
Site : https://dizumo.github.io/MushokuZone/  
Dépôt : https://github.com/DIZUMO/MushokuZone
