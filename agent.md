# AGENTS.md

## Projet : MushokuZone

MushokuZone est un site documentaire indépendant consacré à l'univers de **Mushoku Tensei: Isekai Ittara Honki Dasu**.

Dépôt GitHub :

https://github.com/DIZUMO/MushokuZone

Site :

https://dizumo.github.io/MushokuZone/

Le projet est actuellement en **bêta / développement actif**.

Il s'agit principalement d'un site web statique utilisant :

* HTML5
* CSS3
* JavaScript natif
* JSON
* Git
* GitHub
* GitHub Pages

Il n'utilise actuellement pas de framework JavaScript majeur.

---

# 1. Règles générales pour Codex

## 1.1 Lire avant de modifier

Avant toute modification :

1. Examiner les fichiers concernés.
2. Comprendre leur rôle dans l'architecture existante.
3. Vérifier les dépendances entre HTML, CSS, JavaScript et JSON.
4. Vérifier les modifications Git déjà présentes.
5. Ne pas supposer qu'un fichier fonctionne comme un autre simplement parce que son nom est similaire.

Ne jamais modifier un fichier important sans avoir d'abord compris son fonctionnement.

---

## 1.2 Préserver l'architecture existante

L'architecture actuelle repose volontairement sur une séparation entre :

```text
HTML
 ↓
Structure des pages

CSS
 ↓
Présentation

JavaScript
 ↓
Logique et fonctionnalités

JSON
 ↓
Données

Image
 ↓
Ressources graphiques
```

Cette séparation doit être conservée autant que possible.

Ne pas déplacer arbitrairement des données JSON dans le HTML.

Ne pas déplacer arbitrairement du CSS dans le JavaScript.

Ne pas déplacer arbitrairement de la logique JavaScript dans le HTML.

Ne pas transformer le projet en framework ou ajouter une architecture complexe lorsqu'une solution native simple suffit.

---

# 2. Architecture actuelle

La structure principale du dépôt est actuellement :

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
│   └── ...
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

Cette architecture peut évoluer, mais toute modification importante doit être justifiée par un besoin réel.

---

# 3. Principes de développement

## 3.1 Simplicité

Privilégier la solution la plus simple qui répond correctement au problème.

Ne pas ajouter :

* framework ;
* bibliothèque ;
* dépendance ;
* abstraction ;
* système de build ;
* outil externe ;

si le problème peut être correctement résolu avec les technologies déjà présentes.

---

## 3.2 Modifications minimales

Lorsqu'une modification précise est demandée :

* modifier uniquement les fichiers nécessaires ;
* éviter les refactorisations globales non demandées ;
* ne pas reformater tout le projet inutilement ;
* ne pas renommer des fichiers sans nécessité ;
* ne pas supprimer du code simplement parce qu'il semble inutilisé sans vérifier ses dépendances.

Une demande de correction n'est pas une invitation à réécrire la moitié du projet.

---

## 3.3 Ne pas casser l'existant

Avant de modifier une fonctionnalité existante, identifier :

* les fichiers qui l'utilisent ;
* les fonctions appelées ;
* les données nécessaires ;
* les chemins relatifs ;
* les sélecteurs CSS ;
* les identifiants HTML ;
* les événements JavaScript ;
* les fichiers JSON associés.

Après modification, vérifier que les fonctionnalités dépendantes continuent de fonctionner.

---

# 4. HTML

Utiliser du HTML5 valide et sémantique.

Privilégier les éléments appropriés :

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Éviter les `div` inutiles lorsqu'un élément sémantique est approprié.

Les liens doivent utiliser des chemins compatibles avec GitHub Pages.

Tenir compte du fait que le site est déployé dans :

```text
/MushokuZone/
```

Les chemins absolus commençant par `/` doivent donc être utilisés avec prudence.

Privilégier les chemins relatifs lorsqu'ils sont plus adaptés à l'architecture actuelle.

---

# 5. CSS

Le CSS doit rester organisé dans le dossier :

```text
Css/
```

Respecter autant que possible la séparation existante :

```text
style-common.css
```

pour les styles communs.

```text
style-episode.css
```

pour les épisodes.

```text
characters-wiki.css
```

pour le système de personnages.

```text
spoiler.css
```

pour les spoilers.

Avant de créer une nouvelle feuille CSS, vérifier si le style peut être correctement placé dans une feuille existante.

Éviter les styles inline sauf nécessité particulière.

Éviter `!important` sauf lorsqu'il est réellement nécessaire.

Éviter les règles CSS dupliquées.

---

# 6. JavaScript

Le JavaScript doit rester principalement dans :

```text
Js/
```

Respecter la séparation des responsabilités existante.

Notamment :

```text
data-manager.js
```

Gestion et chargement des données.

```text
content-generator.js
```

Génération dynamique du contenu.

```text
characters-page.js
```

Logique spécifique aux personnages.

```text
spoiler-manager.js
```

Gestion des spoilers.

```text
seo-injector.js
```

Gestion des métadonnées SEO dynamiques.

```text
style-injector.js
```

Gestion des styles dynamiques.

Ne pas déplacer toute la logique dans un fichier unique.

---

# 7. Données JSON

Les données documentaires doivent rester séparées de la présentation lorsque l'architecture existante le permet.

Les données sont principalement stockées dans :

```text
Data/
```

Avant de modifier un fichier JSON :

1. vérifier sa structure ;
2. vérifier les scripts qui le chargent ;
3. vérifier les propriétés attendues ;
4. conserver la cohérence avec les autres fichiers.

Ne pas modifier arbitrairement les noms de propriétés JSON.

Si une structure JSON doit changer, rechercher d'abord toutes les utilisations de cette structure dans le JavaScript.

---

# 8. Exactitude documentaire

MushokuZone est un projet documentaire.

Les informations concernant **Mushoku Tensei** doivent donc être traitées avec une exigence particulière.

Ne jamais inventer :

* personnages ;
* événements ;
* dates ;
* relations ;
* lieux ;
* pouvoirs ;
* dialogues ;
* informations biographiques ;
* informations de production ;
* informations sur les épisodes ;
* sources.

Lorsqu'une information n'est pas vérifiable :

```text
Information non vérifiée
```

ou une formulation équivalente doit être utilisée plutôt que d'inventer.

---

# 9. Faits, analyses et interprétations

Le site doit distinguer clairement :

### Fait

Information directement vérifiable dans l'œuvre ou une source fiable.

### Source officielle

Information provenant d'une source officielle ou d'un ayant droit.

### Analyse

Interprétation réalisée à partir de plusieurs éléments.

### Théorie

Hypothèse qui n'est pas confirmée.

Une théorie ne doit jamais être présentée comme un fait.

Une interprétation ne doit jamais être présentée comme une information canonique sans indication claire.

---

# 10. Sources

Les informations documentaires importantes doivent pouvoir être vérifiées.

Lorsqu'une source est disponible, conserver les informations permettant son identification.

Éviter les sources anonymes ou impossibles à vérifier.

Ne pas créer de fausses références pour rendre une information plus crédible.

Ne jamais inventer une URL.

Si une source n'est pas vérifiable, ne pas prétendre qu'elle l'est.

---

# 11. Spoilers

Le site comporte un système de gestion des spoilers.

Avant de modifier le comportement des spoilers :

```text
Css/spoiler.css
Js/spoiler-manager.js
```

doivent être examinés.

Les spoilers doivent rester clairement identifiables.

Une modification d'interface ne doit pas supprimer accidentellement la protection contre les spoilers.

---

# 12. Personnages

Le système de personnages utilise notamment :

```text
Autre pages/Personnages.html
Js/characters-page.js
Js/data-manager.js
Js/content-generator.js
Data/characters.json
Data/characters-detailed.json
Data/rudeus-detailed.json
Data/sylphiette-detailed.json
Css/characters-wiki.css
```

Avant de modifier le système de personnages, vérifier les relations entre ces fichiers.

Ne pas créer une nouvelle page HTML pour chaque personnage si le système dynamique existant permet de gérer le personnage avec les données JSON.

---

# 13. Chemins et GitHub Pages

Le site est hébergé sur :

```text
https://dizumo.github.io/MushokuZone/
```

Le dépôt utilise la branche :

```text
main
```

Tester particulièrement les chemins :

```text
CSS
JavaScript
JSON
images
pages secondaires
liens internes
```

Une fonctionnalité qui fonctionne avec :

```text
file://
```

mais pas avec HTTP n'est pas considérée comme correctement testée.

---

# 14. Développement local

Le projet peut être exécuté avec un serveur HTTP local.

Commande recommandée :

```bash
python -m http.server 8000
```

Puis :

```text
http://localhost:8000
```

L'utilisation d'un serveur HTTP local est préférable à l'ouverture directe de :

```text
file://
```

notamment pour les appels :

```javascript
fetch(...)
```

vers les fichiers JSON.

---

# 15. Vérifications après modification

Après une modification, effectuer autant que possible les vérifications pertinentes.

## HTML

Vérifier :

* structure ;
* balises ;
* attributs ;
* liens ;
* IDs ;
* chemins.

## CSS

Vérifier :

* sélecteurs ;
* conflits ;
* responsive design ;
* styles existants ;
* affichage mobile.

## JavaScript

Vérifier :

* erreurs de syntaxe ;
* références aux éléments HTML ;
* chemins JSON ;
* appels `fetch` ;
* fonctions dépendantes ;
* événements.

## JSON

Vérifier que les fichiers restent du JSON valide.

Une erreur de syntaxe JSON peut empêcher une fonctionnalité entière de fonctionner.

---

# 16. Git

Avant toute modification importante :

```bash
git status
```

Vérifier les modifications existantes.

Ne jamais écraser silencieusement des modifications locales réalisées par l'utilisateur.

Ne pas utiliser :

```bash
git reset --hard
```

ou une commande équivalente destructive sans instruction explicite de l'utilisateur.

Ne pas supprimer des modifications utilisateur simplement pour obtenir un dépôt propre.

---

# 17. Commits

Ne pas créer automatiquement un commit après chaque modification sauf si cela est explicitement demandé.

Lorsque l'utilisateur demande un commit, utiliser un message clair et descriptif.

Exemple :

```text
fix: correct character data loading
```

ou :

```text
feat: add chronology filtering
```

Éviter les messages vagues tels que :

```text
update
fix
changes
stuff
```

---

# 18. Pull Requests

Lorsqu'une Pull Request est demandée :

* expliquer clairement les changements ;
* indiquer les fichiers principaux concernés ;
* mentionner les vérifications effectuées ;
* signaler les limitations éventuelles.

Ne pas présenter comme testé quelque chose qui ne l'a pas réellement été.

---

# 19. Accessibilité

L'accessibilité doit être prise en compte lors des modifications d'interface.

Vérifier notamment :

* textes alternatifs des images ;
* contraste ;
* navigation clavier ;
* structure des titres ;
* labels des contrôles ;
* éléments interactifs accessibles ;
* focus visible ;
* taille des zones interactives.

Ne pas sacrifier l'accessibilité pour une modification esthétique mineure.

---

# 20. Responsive design

MushokuZone doit rester utilisable sur :

* ordinateur ;
* tablette ;
* téléphone.

Toute modification importante de l'interface doit être vérifiée sur différentes tailles d'écran.

Éviter les dimensions fixes inutiles.

Privilégier lorsque pertinent :

```css
max-width
min()
max()
clamp()
flex
grid
media queries
```

---

# 21. Performance

Éviter les traitements JavaScript inutiles.

Éviter de charger des ressources inutilisées.

Ne pas charger plusieurs fois les mêmes données lorsqu'un système de cache ou de centralisation est approprié.

Les images doivent être utilisées avec des dimensions raisonnables.

Ne pas ajouter de bibliothèque externe simplement pour résoudre un problème qui peut être traité avec JavaScript natif.

---

# 22. SEO

Le projet comporte un système :

```text
Js/seo-injector.js
```

Avant de modifier les métadonnées SEO, vérifier le fonctionnement de ce système.

Préserver notamment :

* `title`
* `description`
* données structurées lorsqu'elles existent ;
* liens canoniques lorsqu'ils existent ;
* structure des titres ;
* informations Open Graph lorsqu'elles existent.

Ne pas générer artificiellement du contenu SEO sans rapport avec le contenu réel de la page.

---

# 23. Images et ressources

Les ressources graphiques se trouvent principalement dans :

```text
Image/
```

Avant d'ajouter une image :

* vérifier qu'elle est réellement nécessaire ;
* vérifier son emplacement ;
* vérifier son format ;
* vérifier son utilisation ;
* vérifier ses droits ou sa provenance lorsque pertinent.

Ne pas remplacer massivement les images existantes sans raison.

Ne pas inventer la provenance d'une image.

---

# 24. Propriété intellectuelle

MushokuZone est un projet indépendant et non officiel.

Les éléments appartenant à **Mushoku Tensei** restent la propriété de leurs ayants droit respectifs.

Ne jamais présenter MushokuZone comme un projet officiel.

La licence MIT du dépôt concerne le code couvert par cette licence.

Elle ne transforme pas les éléments appartenant à des tiers en contenu libre de droits.

---

# 25. Sécurité

Ne jamais ajouter dans le dépôt :

* mots de passe ;
* clés API ;
* tokens ;
* cookies ;
* identifiants privés ;
* informations personnelles sensibles.

Ne jamais publier volontairement un secret dans :

```text
HTML
CSS
JavaScript
JSON
README
```

Un secret exposé dans du JavaScript côté client doit être considéré comme public.

---

# 26. Dépendances externes

Avant d'ajouter une dépendance :

1. vérifier si elle est réellement nécessaire ;
2. vérifier si une solution native existe ;
3. vérifier sa licence ;
4. vérifier sa maintenance ;
5. vérifier son impact sur le projet.

Ne pas introduire de framework uniquement pour simplifier quelques lignes de code.

---

# 27. Règles pour les modifications importantes

Pour toute modification importante :

```text
1. Inspecter
2. Comprendre
3. Modifier
4. Vérifier
5. Tester
6. Résumer
```

Ne pas commencer par réécrire le projet.

---

# 28. Gestion des erreurs

Les erreurs doivent être traitées explicitement lorsque cela est pertinent.

Pour les chargements JSON avec `fetch`, prévoir une gestion raisonnable des erreurs.

Exemple :

```javascript
try {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
} catch (error) {
    console.error("Erreur lors du chargement des données :", error);
}
```

Adapter cependant le traitement au système existant plutôt que de copier aveuglément cet exemple.

---

# 29. Compatibilité avec l'existant

Avant de remplacer une fonction existante :

1. rechercher toutes ses utilisations ;
2. comprendre ses entrées ;
3. comprendre ses sorties ;
4. vérifier les dépendances ;
5. vérifier les événements associés ;
6. vérifier les pages qui l'utilisent.

Une fonction peut être utilisée indirectement.

Ne pas considérer une fonction comme inutilisée simplement parce qu'elle n'est pas appelée dans le fichier actuellement ouvert.

---

# 30. Recherche dans le projet

Avant de modifier un nom de :

* fonction ;
* variable ;
* classe CSS ;
* ID HTML ;
* propriété JSON ;
* fichier ;

rechercher toutes ses occurrences dans le projet.

Exemples :

```bash
grep -R "nomRecherche" .
```

ou utiliser la recherche globale de VS Code.

---

# 31. Instructions spécifiques à Codex

Lorsque Codex reçoit une tâche :

### Étape 1

Comprendre précisément la demande.

### Étape 2

Identifier les fichiers concernés.

### Étape 3

Lire le code concerné avant modification.

### Étape 4

Identifier les dépendances.

### Étape 5

Effectuer la modification la plus ciblée possible.

### Étape 6

Vérifier le résultat.

### Étape 7

Signaler clairement :

* ce qui a été modifié ;
* pourquoi ;
* les tests effectués ;
* les problèmes restant éventuels.

---

# 32. Ce que Codex ne doit pas faire

Codex ne doit pas :

* inventer des informations documentaires ;
* inventer des sources ;
* supprimer des fonctionnalités sans justification ;
* réécrire toute l'architecture pour une petite correction ;
* ajouter inutilement des dépendances ;
* remplacer JavaScript natif par un framework sans demande ;
* supprimer les protections contre les spoilers ;
* écraser les modifications locales de l'utilisateur ;
* supprimer des fichiers sans nécessité ;
* modifier le contenu documentaire sans vérifier les informations ;
* créer de faux tests ;
* prétendre avoir testé une fonctionnalité qui ne l'a pas été ;
* prétendre avoir vérifié une information qui ne l'a pas été ;
* publier de secrets ;
* utiliser des commandes Git destructives sans autorisation explicite.

---

# 33. Priorités

En cas de conflit entre plusieurs objectifs, respecter cet ordre :

```text
1. Exactitude
2. Sécurité
3. Fonctionnement
4. Préservation de l'existant
5. Accessibilité
6. Maintenabilité
7. Performance
8. Esthétique
```

Une interface jolie mais cassée reste cassée. L'informatique a déjà suffisamment de cérémonies autour des pixels pour qu'on évite d'en rajouter.

---

# 34. Philosophie générale

MushokuZone doit rester :

* indépendant ;
* documentaire ;
* vérifiable ;
* maintenable ;
* accessible ;
* responsive ;
* modulaire ;
* évolutif.

Le code doit être compréhensible par un développeur qui découvre le projet.

La complexité doit être justifiée par un besoin réel.

Toute modification doit chercher à améliorer le projet sans détruire inutilement ce qui fonctionne déjà.

---

# 35. Résumé opérationnel

Avant toute tâche :

```text
Lire → Comprendre → Rechercher les dépendances → Modifier
```

Après toute tâche :

```text
Vérifier → Tester → Contrôler Git → Résumer
```

Pour le contenu documentaire :

```text
Source → Vérification → Donnée → Affichage
```

Pour l'architecture :

```text
HTML → structure
CSS → présentation
JS → logique
JSON → données
Image → ressources
```

Pour Git :

```text
Ne jamais écraser les modifications utilisateur.
```

Pour les informations inconnues :

```text
Ne pas inventer.
```

Pour les fonctionnalités non testées :

```text
Ne pas prétendre qu'elles fonctionnent.
```

---

# 36. Source de vérité

Le dépôt GitHub constitue la référence technique du projet :

https://github.com/DIZUMO/MushokuZone

Le fichier `README.md` décrit l'architecture générale actuelle.

Cependant, le **code présent dans le dépôt fait autorité sur le README lorsqu'ils divergent**, car le README peut devenir obsolète au cours du développement.

Avant toute modification structurelle importante, inspecter directement les fichiers concernés.

---

# Fin des instructions
