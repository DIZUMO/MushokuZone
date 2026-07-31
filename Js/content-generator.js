/**
 * CONTENT GENERATOR - Génère dynamiquement le contenu HTML depuis JSON
 * Élimine la duplication HTML/JSON
 * 
 * Usage:
 *   const generator = new ContentGenerator();
 *   await generator.generatePersonnagesPage();
 */

class ContentGenerator {
    constructor() {
        this.cache = {};
        this.observerAnimations = null;
    }

    /**
     * Initialise l'observer pour les animations scroll
     */
    initAnimationObserver() {
        if (!window.IntersectionObserver) return;
        
        this.observerAnimations = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (!entry.isIntersecting) return;
                entry.target.style.transitionDelay = `${i * 0.04}s`;
                entry.target.classList.add('visible');
                this.observerAnimations.unobserve(entry.target);
            });
        }, { threshold: 0.05 });
    }

    /**
     * Observe les éléments nouvellement créés
     */
    observeElements(elements) {
        if (!this.observerAnimations) {
            this.initAnimationObserver();
        }
        elements.forEach(el => {
            el.classList.add('hidden');
            this.observerAnimations.observe(el);
        });
    }

    /**
     * Génère une grille de cartes
     * @param {Array} items - Items à afficher
     * @param {String} containerSelector - Sélecteur du conteneur
     */
    async generateCardGrid(items, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container || !items) return;

        const html = items.map(item => `
            <div class="card">
                <div class="card__icon">${item.icon}</div>
                <h3 class="card__title">${item.name || item.title}</h3>
                <p class="card__text">${item.description}</p>
            </div>
        `).join('');

        container.innerHTML = `<div class="cards-grid">${html}</div>`;
        this.observeElements(container.querySelectorAll('.card'));
    }

    /**
     * Génère une frise chronologique
     * @param {Array} events - Events à afficher
     * @param {String} containerSelector - Sélecteur du conteneur
     */
    async generateTimeline(events, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container || !events) return;

        const html = events.map((event, i) => `
            <div class="timeline__item">
                <div class="timeline__dot"></div>
                <div class="timeline__content">
                    <div class="timeline__date">${event.date}</div>
                    <div class="timeline__title">${event.title}</div>
                    <div class="timeline__desc">${event.description}</div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `<div class="timeline">${html}</div>`;
        this.observeElements(container.querySelectorAll('.timeline__item'));
    }

    /**
     * Crée une section HTML
     * @param {Object} sectionConfig - Configuration de la section
     * @returns {HTMLElement} Élément section
     */
    async createSection(sectionConfig) {
        const section = document.createElement('section');
        section.classList.add('hidden');
        section.setAttribute('aria-labelledby', `titre-${sectionConfig.id}`);

        let content = `<h2 id="titre-${sectionConfig.id}">${sectionConfig.title}</h2>`;

        // Contenu texte simple
        if (sectionConfig.type === 'text' && sectionConfig.content) {
            content += `<p>${sectionConfig.content}</p>`;
        }

        // Grille de cartes
        if (sectionConfig.type === 'cards' && sectionConfig.items) {
            content += '<div class="cards-grid">' +
                sectionConfig.items.map(item => `
                    <div class="card">
                        <div class="card__icon">${item.icon}</div>
                        <h3 class="card__title">${item.name || item.title}</h3>
                        <p class="card__text">${item.description}</p>
                    </div>
                `).join('') +
                '</div>';
        }

        // Frise chronologique
        if (sectionConfig.type === 'timeline' && sectionConfig.items) {
            content += '<div class="timeline">' +
                sectionConfig.items.map(item => `
                    <div class="timeline__item">
                        <div class="timeline__dot"></div>
                        <div class="timeline__content">
                            <div class="timeline__date">${item.date}</div>
                            <div class="timeline__title">${item.title}</div>
                            <div class="timeline__desc">${item.description}</div>
                        </div>
                    </div>
                `).join('') +
                '</div>';
        }

        // Boîte "À retenir"
        if (sectionConfig.type === 'retenir' && sectionConfig.items) {
            content += '<div class="retenir"><div class="retenir__grid">' +
                sectionConfig.items.map(item => `
                    <div class="retenir__item">
                        <div class="retenir__label">${item.label}</div>
                        <div class="retenir__value">${item.value}</div>
                    </div>
                `).join('') +
                '</div></div>';
        }

        // Listes à puces
        if (sectionConfig.type === 'list' && sectionConfig.items) {
            content += '<ul>' +
                sectionConfig.items.map(item => `<li>${item}</li>`).join('') +
                '</ul>';
        }

        section.innerHTML = content;
        return section;
    }

    /**
     * Génère la page Personnages
     */
    async generatePersonnagesPage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-personnages');
            if (!container) return;

            // Section présentation
            const introSection = await this.createSection({
                id: 'presentation',
                title: 'Présentation',
                type: 'text',
                content: 'Les personnages occupent une place centrale dans la progression du récit. Les principaux personnages disposent de motivations, de relations et d\'objectifs qui influencent leur évolution au fil de l\'histoire. Les descriptions ci-dessous présentent uniquement le rôle général de chaque personnage au début de l\'œuvre ou lors de sa première apparition importante. Elles évitent volontairement les révélations majeures.'
            });
            container.appendChild(introSection);

            // Section personnages principaux
            const mainCharSection = await this.createSection({
                id: 'protagonistes',
                title: 'Personnages principaux',
                type: 'cards',
                items: data.personnages.mainCharacters
            });
            container.appendChild(mainCharSection);

            // Section autres personnages
            const otherCharSection = await this.createSection({
                id: 'autres',
                title: 'Autres personnages importants',
                type: 'cards',
                items: data.personnages.importantCharacters
            });
            container.appendChild(otherCharSection);

            // Appliquer animations
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) {
            console.error('Erreur génération Personnages:', error);
        }
    }

    /**
     * Génère la page Univers
     */
    async generateUniversPage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-univers');
            if (!container) return;

            // Section présentation
            const introSection = await this.createSection({
                id: 'monde',
                title: 'Le Monde des Six Faces',
                type: 'text',
                content: 'L\'histoire de Mushoku Tensei se déroule dans un monde de fantasy possédant sa propre géographie, son histoire, ses peuples et ses traditions. Le récit ne se limite pas aux aventures du protagoniste : il met également en scène un univers vivant, dont les événements continuent d\'évoluer indépendamment des personnages principaux. L\'univers est communément appelé le Monde des Six Faces. Au fil du récit, le lecteur découvre progressivement ses différentes régions, leurs habitants, leurs croyances et leurs cultures.'
            });
            container.appendChild(introSection);

            // Section continents
            const continentsSection = await this.createSection({
                id: 'continents',
                title: 'Les principaux continents',
                type: 'cards',
                items: data.univers.continents
            });
            container.appendChild(continentsSection);

            // Section peuples
            const peoplesSection = await this.createSection({
                id: 'peuples',
                title: 'Les peuples',
                type: 'cards',
                items: data.univers.peoples
            });
            container.appendChild(peoplesSection);

            // Section magie
            const magicSection = await this.createSection({
                id: 'magie',
                title: 'La magie',
                type: 'cards',
                items: data.univers.magic
            });
            container.appendChild(magicSection);

            // Section combat
            const combatSection = await this.createSection({
                id: 'combat',
                title: 'Les styles de combat',
                type: 'cards',
                items: data.univers.combatStyles
            });
            container.appendChild(combatSection);

            // Appliquer animations
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) {
            console.error('Erreur génération Univers:', error);
        }
    }

    /**
     * Génère la page Chronologie
     */
    async generateChronologiePage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-chronologie');
            if (!container) return;

            // Section présentation
            const introSection = await this.createSection({
                id: 'chrono',
                title: 'Frise chronologique',
                type: 'text',
                content: 'Cette page retrace les principales étapes de la publication de Mushoku Tensei, depuis le lancement du web novel jusqu\'aux adaptations officielles. Elle présente uniquement des événements éditoriaux vérifiables.'
            });
            container.appendChild(introSection);

            // Frise
            const timelineSection = await this.createSection({
                id: 'frise',
                title: 'Événements clés',
                type: 'timeline',
                items: data.chronologie.events
            });
            container.appendChild(timelineSection);

            // Appliquer animations
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) {
            console.error('Erreur génération Chronologie:', error);
        }
    }

    /**
     * Génère la section Sources (pour Sources.html et autres pages)
     */
    async generateSourcesContent(containerSelector) {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.querySelector(containerSelector);
            if (!container) return;

            // Section officielles
            const officialSection = await this.createSection({
                id: 'officielles',
                title: 'Sources officielles',
                type: 'cards',
                items: data.sources.official
            });
            container.appendChild(officialSection);

            // Section documentaires
            const dbSection = await this.createSection({
                id: 'documentaires',
                title: 'Bases documentaires',
                type: 'cards',
                items: data.sources.databases
            });
            container.appendChild(dbSection);

            // Appliquer animations
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) {
            console.error('Erreur génération Sources:', error);
        }
    }

    /**
     * Génère la page Biographie (frise)
     */
    async generateBiographiePage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-biographie-chrono');
            if (!container) return;

            // Frise chronologique
            const timelineSection = await this.createSection({
                id: 'biographie',
                title: 'Chronologie',
                type: 'timeline',
                items: data.biographie.timelineEvents
            });
            container.appendChild(timelineSection);

            // Appliquer animations
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) {
            console.error('Erreur génération Biographie:', error);
        }
    }
}

// Instance globale
const contentGenerator = new ContentGenerator();
