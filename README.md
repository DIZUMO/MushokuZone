# MushokuZone

Site documentaire consacré à l'univers de **Mushoku Tensei : Isekai Ittara Honki Dasu**.

**MushokuZone** est un projet web personnel consacré à l'organisation et à la présentation d'informations autour de l'univers de *Mushoku Tensei*.

🌐 **Site :** https://dizumo.github.io/MushokuZone/  
💻 **Dépôt :** https://github.com/DIZUMO/MushokuZone

---

# Statut du projet

**Version actuelle : Bêta / développement actif**

MushokuZone est actuellement en phase de développement.

Le site dispose déjà d'une architecture technique comprenant :

- une structure de pages HTML ;
- un système de navigation ;
- des feuilles de style CSS ;
- des scripts JavaScript ;
- des fichiers de données JSON ;
- des ressources graphiques ;
- plusieurs systèmes dynamiques.

Le contenu documentaire n'est cependant pas encore entièrement intégré.

L'objectif actuel est de construire une base technique propre, cohérente et suffisamment flexible pour permettre l'ajout progressif du contenu sans devoir reconstruire l'ensemble du site.

L'architecture actuelle est donc susceptible d'évoluer à mesure que le projet gagne en contenu et en fonctionnalités.

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
- Biographie de l'auteur
- Impact et réception de l'œuvre
- Documentation autour de la série

Le projet cherche notamment à séparer clairement :

- la **structure des pages** ;
- les **données** ;
- la **logique JavaScript** ;
- les **styles CSS** ;
- les **ressources graphiques**.

Cette séparation permet de faire évoluer les données et le contenu sans devoir modifier systématiquement la structure HTML.

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

Cette structure correspond à l'organisation actuelle du projet.


---

Organisation des fichiers

index.html

Point d'entrée principal du site.

Cette page constitue la base de l'accueil de MushokuZone et sert de point de départ à la navigation entre les différentes sections du site.


---

Autre pages/

Ce dossier contient les différentes pages HTML secondaires du site.

A-propos.html

Page consacrée à la présentation du projet et de ses objectifs.

Biographie.html

Page consacrée à la biographie de l'auteur de Mushoku Tensei, Rifujin na Magonote.

Chronologie.html

Page consacrée à la chronologie du projet.

Les données associées à la chronologie sont stockées dans :

Data/chronology.json

Episode.html

Page consacrée aux épisodes.

Les données relatives aux épisodes sont stockées dans :

Data/episodes.json

La page possède également des ressources CSS et JavaScript spécifiques à son fonctionnement.

Impact.html

Page consacrée à l'impact et à la réception de l'œuvre.

Personnages.html

Page consacrée au système de présentation des personnages.

Le système utilise une architecture dynamique basée sur les données JSON et plusieurs scripts JavaScript.

La page utilise notamment :

Js/data-manager.js
Js/content-generator.js
Js/characters-page.js

Les données détaillées des personnages sont stockées dans les fichiers JSON correspondants, notamment :

Data/characters-detailed.json
Data/rudeus-detailed.json
Data/sylphiette-detailed.json

characters-page.js utilise ces données pour générer dynamiquement les fiches et les informations affichées sur la page.

Sources.html

Page consacrée aux sources et références utilisées par le projet.

Les données correspondantes sont stockées dans :

Data/sources.json

Univers.html

Page consacrée à l'univers de Mushoku Tensei.

Les données associées à l'univers sont stockées dans :

Data/universe.json


---

Css/

Le dossier Css regroupe les feuilles de style du site.

style-common.css

Feuille de style commune utilisée par les différentes pages du site.

Elle regroupe les styles généraux nécessaires à l'interface.

style-episode.css

Feuille de style dédiée à la page des épisodes.

characters-wiki.css

Feuille de style utilisée pour l'interface de présentation des personnages.

spoiler.css

Feuille de style associée aux éléments contenant des spoilers.


---

Data/

Le dossier Data constitue la couche de données du projet.

L'objectif est de séparer autant que possible les informations du site de leur présentation HTML.

L'architecture générale peut être représentée ainsi :
```text
Présentation
     ↓
HTML / JavaScript
     ↓
Data Manager
     ↓
Fichiers JSON
```
Cette organisation facilite la mise à jour et l'enrichissement progressif du contenu.


---

backgrounds.json

Contient les données relatives aux arrière-plans utilisés par le site.

characters.json

Contient les données générales relatives aux personnages.

characters-detailed.json

Contient les données détaillées utilisées par le système de présentation des personnages.

chronology.json

Contient les données utilisées pour la chronologie.

config.json

Contient des éléments de configuration utilisés par le projet.

episodes.json

Contient les données relatives aux épisodes.

Les informations concernant les épisodes sont centralisées dans ce fichier afin de permettre leur utilisation par les fonctionnalités associées aux épisodes.

homepage.json

Contient des données associées à la page d'accueil.

navigation.json

Contient la configuration des éléments de navigation du site.

La navigation permet notamment d'accéder aux différentes sections du projet :
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
pages-content.json

Contient des données destinées au contenu des différentes pages.

rudeus-detailed.json

Contient les données détaillées relatives à Rudeus.

site-config.json

Contient des paramètres de configuration du site.

site.json

Contient des informations générales concernant le projet.

sources.json

Contient les données relatives aux sources et références documentaires.

sylphiette-detailed.json

Contient les données détaillées relatives à Sylphiette.

Ces données peuvent être utilisées par le système dynamique de présentation des personnages.

trailers.json

Contient les données relatives aux bandes-annonces.

universe.json

Contient les données relatives à l'univers de Mushoku Tensei.


---

Js/

Le dossier Js contient la logique JavaScript du site.

Les différents scripts sont séparés afin de répartir les responsabilités et de faciliter la maintenance du projet.


---

Jscripts.js

Contient des fonctionnalités JavaScript générales utilisées par le site.

Jscripts2.js

Contient des fonctionnalités JavaScript supplémentaires utilisées par le projet.

characters-page.js

Script associé au système de présentation des personnages.

Il gère notamment les fonctionnalités dynamiques de la page Personnages.html et l'utilisation des données détaillées des personnages.

content-generator.js

Contient des fonctions permettant de générer dynamiquement certains contenus à partir des données disponibles.

data-manager.js

Gestionnaire des données JSON du site.

Il permet notamment de charger les données nécessaires au fonctionnement des différentes pages et fonctionnalités.

Le principe général est :

```text
Page HTML
    ↓
JavaScript
    ↓
data-manager.js
    ↓
Data/*.json
    ↓
Données utilisées par la page
```

seo-injector.js

Script consacré à l'injection dynamique de certaines métadonnées liées au référencement du site.

spoiler-manager.js

Script consacré à la gestion des éléments contenant des spoilers.

style-injector.js

Script permettant la gestion dynamique de certains styles utilisés par le site.


---

Image/

Le dossier Image contient les ressources graphiques du projet.

Il comprend notamment :

logos ;

illustrations ;

images liées à Mushoku Tensei ;

images utilisées par les différentes pages ;

ressources graphiques destinées à l'interface du site.


Le sous-dossier Image trinity/ contient également plusieurs ressources graphiques utilisées dans le projet.


---

Architecture fonctionnelle

L'organisation générale du projet peut être représentée ainsi :
```text


                         ┌───────────────────┐
                         │      index.html       │
                         │       Accueil         │
                         └──────────┬────────┘
                                      │
                    ┌──────────────┼───────────────┐
                    │                │               │
                    ▼               ▼               ▼
              Pages HTML       JavaScript          CSS
             Autre pages/          │             Css/
                    │              │
                    │              ▼
                    │        data-manager.js
                    │              │
                    │              ▼
                    │          Data/*.json
                    │              │
                    └──────────────┼───────────────┐
                                   │               │
                                   ▼               ▼
                              Contenu          Image/*
                              affiché
```

Le principe général du projet est de séparer les différentes responsabilités :

HTML
 ↓
Structure des pages

CSS
 ↓
Présentation et mise en page

JavaScript
 ↓
Logique et fonctionnalités dynamiques

JSON
 ↓
Données

Image
 ↓
Ressources graphiques

Cette séparation permet de faire évoluer le contenu sans devoir modifier systématiquement la structure HTML.


---

Architecture du système de personnages

Le système de personnages repose sur une génération dynamique à partir des données JSON.
```text

Autre pages/Personnages.html
              │
              ▼
       characters-page.js
               │
        ┌─────┴─────────────┐
        │                      │
        ▼                      ▼
characters-detailed.json   Données détaillées
        │                       │
        └────────┬──────────┘
                   ▼
           Génération dynamique
                   │
                   ▼
            Personnages.html
```

Les informations détaillées sont donc séparées de la structure HTML de la page.

Cette architecture permet d'ajouter ou de modifier des informations sans devoir créer une nouvelle page HTML pour chaque personnage.


---

Architecture des données

Le projet utilise les fichiers JSON comme couche de données.

Le principe est notamment de pouvoir faire évoluer :

Données
  ↓
JSON
  ↓
JavaScript
  ↓
HTML
  ↓
Interface utilisateur

Cette approche permet de centraliser les informations et d'éviter autant que possible leur duplication dans plusieurs fichiers HTML.


---

Technologies utilisées

MushokuZone utilise principalement des technologies web standards.

Technologie	Utilisation

HTML5	Structure des pages
CSS3	Présentation et mise en page
JavaScript	Fonctionnalités dynamiques
JSON	Stockage et organisation des données
Git	Gestion des versions
GitHub	Hébergement du dépôt
GitHub Pages	Hébergement du site


Aucun framework JavaScript majeur n'est nécessaire au fonctionnement de l'architecture principale actuelle.

Le projet repose principalement sur du JavaScript natif, du HTML, du CSS et des fichiers JSON.


---

Fonctionnalités actuelles et en développement

Le projet étant encore en bêta, les fonctionnalités présentes dans l'architecture ne constituent pas nécessairement une version définitive.

Les principaux systèmes présents ou en développement comprennent notamment :

système de navigation ;

chargement de données JSON ;

gestion des données ;

système de personnages ;

génération dynamique de contenu ;

gestion des spoilers ;

gestion des arrière-plans ;

données structurées pour les épisodes ;

données structurées pour l'univers ;

données structurées pour la chronologie ;

système de sources ;

gestion de certaines métadonnées SEO ;

styles responsive ;

ressources graphiques.


Certaines fonctionnalités sont déjà implémentées tandis que d'autres continuent d'être développées.


---

Développement futur

Le projet étant encore en développement, plusieurs aspects sont amenés à évoluer.

Les développements futurs peuvent notamment concerner :

enrichissement des fiches personnages ;

enrichissement des données de l'univers ;

développement de la chronologie ;

enrichissement des informations sur les épisodes ;

ajout et vérification des sources ;

développement du contenu documentaire ;

amélioration du responsive design ;

amélioration de l'accessibilité ;

optimisation du référencement ;

optimisation des performances ;

amélioration de l'organisation du code ;

enrichissement progressif des fichiers JSON.


Ces éléments constituent des axes de développement et ne doivent pas être interprétés comme des fonctionnalités déjà entièrement terminées.


---

Développement

Lancer le site en local

MushokuZone est un site web statique.

Aucun serveur backend spécifique n'est nécessaire pour l'architecture actuelle.

Après avoir cloné le dépôt :

git clone https://github.com/DIZUMO/MushokuZone.git
cd MushokuZone

Un serveur HTTP local peut ensuite être lancé avec Python :

python -m http.server 8000

Puis ouvrir :

http://localhost:8000

L'utilisation d'un serveur HTTP local est recommandée plutôt que l'ouverture directe des fichiers avec file://, notamment pour les fonctionnalités JavaScript qui utilisent fetch afin de charger les fichiers JSON.


---

GitHub Pages

Le projet est hébergé avec GitHub Pages.

🌐 Site :

https://dizumo.github.io/MushokuZone/

💻 Dépôt :

https://github.com/DIZUMO/MushokuZone

La branche principale du dépôt est :

main


---

Évolution du projet

Le développement de MushokuZone suit une approche progressive.

Phase actuelle : Architecture et développement

Les éléments actuellement développés comprennent notamment :

structure des pages ;

système de navigation ;

organisation CSS ;

organisation JavaScript ;

système de données JSON ;

ressources graphiques ;

fonctionnalités dynamiques ;

système de personnages ;

système de gestion des épisodes ;

système de gestion des arrière-plans.


Phase suivante : Contenu

Les prochaines étapes peuvent notamment inclure :

rédaction et enrichissement des pages ;

intégration de nouvelles données ;

développement des fiches personnages ;

développement de la chronologie ;

enrichissement de l'univers ;

ajout et vérification des sources ;

enrichissement du contenu des épisodes.


Phase ultérieure : Optimisation

Une phase d'optimisation pourra notamment concerner :

performances ;

accessibilité ;

responsive design ;

SEO ;

organisation du code ;

optimisation des ressources ;

expérience utilisateur.


L'architecture n'est donc pas considérée comme définitive.


---

Philosophie du projet

MushokuZone est conçu comme un projet documentaire et évolutif.

Les principes recherchés sont :

Exactitude

Les informations destinées au site doivent être vérifiées avant leur publication.

Séparation des données et de la présentation

Les données doivent autant que possible être séparées du HTML afin de faciliter leur maintenance.

Modularité

Les différentes fonctionnalités doivent être réparties entre des scripts ayant des responsabilités distinctes.

Évolutivité

L'architecture doit pouvoir accueillir progressivement de nouvelles pages, données et fonctionnalités.

Lisibilité

Le code doit rester compréhensible et maintenable à mesure que le projet prend de l'ampleur.


---

État actuel

Élément	État

Structure HTML	🟡 En développement
Navigation	🟡 En développement
CSS	🟡 En développement
JavaScript	🟡 En développement
Architecture JSON	🟡 En développement
Système de personnages	🟡 En développement
Système de chronologie	🟡 En développement
Système d'épisodes	🟡 En développement
Contenu documentaire	🔴 Non finalisé
Documentation	🟡 En développement


MushokuZone n'est donc pas encore une version finale.

Les fichiers et fonctionnalités présents dans le dépôt constituent principalement la base technique destinée à accueillir et organiser le contenu futur.


---

Aspects légaux

MushokuZone est un projet non officiel et indépendant.

Mushoku Tensei: Isekai Ittara Honki Dasu et les éléments appartenant à l'œuvre originale restent la propriété de leurs ayants droit respectifs.

Le projet n'a pas pour objectif de revendiquer la propriété intellectuelle de l'œuvre originale.

Les ressources externes utilisées dans le projet restent soumises aux droits de leurs auteurs et ayants droit respectifs.


---

Licence

Le code source du projet est distribué sous licence MIT.

Voir LICENSE pour les détails.

La licence MIT du dépôt concerne le code couvert par cette licence et ne signifie pas que les éléments appartenant à la propriété intellectuelle de Mushoku Tensei sont placés sous licence MIT.


---

Auteur

DIZUMO

GitHub :

https://github.com/DIZUMO

Projet :

https://github.com/DIZUMO/MushokuZone


---

Contribution

Le projet étant encore en phase de développement, son architecture peut évoluer de manière importante.

Les corrections, suggestions et contributions peuvent être proposées via les Issues et Pull Requests du dépôt GitHub.

Pour signaler une erreur concernant une information documentaire, il est recommandé de fournir une source permettant de vérifier la correction.


---

MushokuZone

Un projet personnel consacré à l'univers de Mushoku Tensei.

Statut : Bêta · Architecture en développement · Contenu en cours d'intégration
