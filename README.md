Site documentaire consacré à l'univers de **Mushoku Tensei : Isekai Ittara Honki Dasu**.

**Accès au site :** https://dizumo.github.io/MushokuZone/

---

## À propos

MushokuZone est un projet personnel visant à regrouper des informations vérifiables et bien organisées sur l'univers de Mushoku Tensei. Le site privilégie :

- **L'exactitude des informations** - Toutes les sources sont vérifiées
- **La distinction entre faits et analyses** - Clarté documentaire
- **L'accessibilité** - Design responsive, lisibilité optimale
- **La transparence** - Chaque information peut être reliée à une source

---

## Caractéristiques principales

### Pages documentaires

- **Accueil** : Présentation générale et thèmes principaux
- **Biographie** : Parcours public de Rifujin na Magonote
- **Impact** : Réception critique et place dans l'isekai moderne
- **Univers** : Continents, peuples, magie et systèmes du Monde des Six Faces
- **Personnages** : Descriptions des protagonistes principaux
- **Chronologie** : Étapes éditoriales depuis 2012
- **Épisodes** : Lecteur vidéo avec navigation (fichiers existants)
- **Sources** : Toutes les références utilisées
- **À propos** : Mission et objectifs du projet

### Fonctionnalités techniques

- **Navigation fluide** avec menu sticky et bouton "Retour en haut"
- **Design responsive** adapté à tous les appareils (320px - 1440px+)
- **Accessibilité** WCAG 2.2 AA (skip link, ARIA, contraste suffisant)
- **Performance optimisée** avec lazy loading des images et iframes
- **Animations discrètes** au scroll avec IntersectionObserver
- **Métadonnées complètes** (Open Graph, Twitter Card, JSON-LD)
- **SEO amélioré** avec titres, descriptions et canonical tags

---

## Structure du projet

```
MushokuZone/
├── index.html                    # Page d'accueil
├── Autre pages/
│   ├── Biographie.html          # Parcours de l'auteur
│   ├── Impact.html              # Analyse de l'impact
│   ├── Univers.html             # Présentation du monde
│   ├── Personnages.html         # Fiches personnages
│   ├── Chronologie.html         # Frise éditoriale
│   ├── Episode.html             # Lecteur vidéo (existant)
│   ├── Sources.html             # Références documentaires
│   └── A-propos.html            # Informations du site
├── Css/
│   ├── style-common.css         # Styles globaux (menu, footer, composants)
│   ├── style-index.css          # Spécifique accueil
│   ├── style-biographie.css     # Spécifique biographie
│   ├── style-impact.css         # Spécifique impact
│   └── style-episode.css        # Spécifique lecteur (existant)
├── Js/
│   ├── config.js                # Configuration globale du site
│   ├── Jscripts.js              # Scripts communs (menu, animations)
│   └── Jscripts2.js             # Logique du lecteur (existant)
└── Image/
    └── [images du site]
```

---

## Améliorations apportées (v2.0)

### Interface utilisateur

✅ Menu de navigation global (sticky)  
✅ Footer cohérent sur toutes les pages  
✅ Bouton "Retour en haut" de page  
✅ Fil d'Ariane (breadcrumb) intégré  
✅ Animations fluides au scroll  
✅ Mobile burger menu responsive  

### Architecture technique

✅ Configuration centralisée (config.js)  
✅ CSS modulaire et réutilisable  
✅ Composants cohérents (cartes, accordéons, frise chrono)  
✅ JavaScript maintenable et DRY  
✅ Lazy loading des médias  

### Accessibilité & SEO

✅ Skip link pour clavier  
✅ Attributs ARIA complets  
✅ Métadonnées OpenGraph et Twitter Card  
✅ JSON-LD structuré (WebSite, Article, Organization)  
✅ Contraste WCAG AA  
✅ Support du mode "Réduire les animations"  

### Contenu documentaire

✅ 9 pages avec contenu riche et sourcé  
✅ Distinction claire faits/analyses  
✅ Références officielles vérifiées  
✅ Informations structurées et pédagogiques  

---

## Installation et déploiement

### En local

```bash
git clone https://github.com/DIZUMO/MushokuZone.git
cd MushokuZone
# Servir avec n'importe quel serveur local
python -m http.server 8000
# Puis visiter http://localhost:8000
```

### Sur GitHub Pages

Le site est automatiquement déployé sur :  
https://dizumo.github.io/MushokuZone/

Chaque push sur la branche `main` met à jour le site en direct.

---

## Maintenance

### Ajouter une nouvelle page

1. Créer le fichier HTML dans `Autre pages/`
2. Copier la structure HTML existante
3. Ajouter un lien dans le menu (navigateur met à jour automatiquement)
4. Si besoin, créer un CSS spécifique dans `Css/`

### Mettre à jour les informations

- Configuration globale : `Js/config.js`
- Styles communs : `Css/style-common.css`
- Footer & menu : automatiquement générés par `Jscripts.js`

### Vérifier la qualité

- **Accessibilité** : https://www.axe-devtools.com/
- **Performance** : https://pagespeed.web.dev/
- **SEO** : https://www.seobility.net/

---

## Aspets légaux

**MushokuZone est un site non officiel.**

Les droits sur Mushoku Tensei appartiennent à :
- Rifujin na Magonote (auteur)
- KADOKAWA / MF Books (éditeur)
- Studio Bind (producteur anime)

Le site est à titre documentaire et passionnel, sans vocation commerciale.

---

## Licence du code

MIT License - Voir LICENSE pour détails.

---

## Auteur

**DIZUMO**  
GitHub : https://github.com/DIZUMO  
Projet : https://github.com/DIZUMO/MushokuZone

---

## Support

Pour signaler un bug ou une erreur dans l'information :
1. Vérifier les sources sur la page dédiée
2. Ouvrir une issue sur GitHub
3. Proposer une correction avec sources

**Engagement** : Toute erreur signalée et vérifiée sera corrigée rapidement.

---

Site développé avec ❤️ pour Mushoku Tensei