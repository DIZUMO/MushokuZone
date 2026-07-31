/**
 * CONTENT GENERATOR - Génère dynamiquement le contenu HTML depuis JSON
 * Élimine la duplication HTML/JSON
 */

class ContentGenerator {
    constructor() {
        this.cache = {};
        this.observerAnimations = null;
    }

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

    observeElements(elements) {
        if (!this.observerAnimations) this.initAnimationObserver();
        elements.forEach(el => {
            el.classList.add('hidden');
            if (this.observerAnimations) this.observerAnimations.observe(el);
            else {
                el.classList.remove('hidden');
                el.classList.add('visible');
            }
        });
    }

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

    async generateTimeline(events, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container || !events) return;
        const html = events.map(event => `
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

    async createSection(sectionConfig) {
        const section = document.createElement('section');
        section.classList.add('hidden');
        section.setAttribute('aria-labelledby', `titre-${sectionConfig.id}`);
        let content = `<h2 id="titre-${sectionConfig.id}">${sectionConfig.title}</h2>`;
        if (sectionConfig.type === 'text' && sectionConfig.content) content += `<p>${sectionConfig.content}</p>`;
        if (sectionConfig.type === 'cards' && sectionConfig.items) {
            content += '<div class="cards-grid">' + sectionConfig.items.map(item => `
                <div class="card">
                    <div class="card__icon">${item.icon}</div>
                    <h3 class="card__title">${item.name || item.title}</h3>
                    <p class="card__text">${item.description}</p>
                </div>`).join('') + '</div>';
        }
        if (sectionConfig.type === 'timeline' && sectionConfig.items) {
            content += '<div class="timeline">' + sectionConfig.items.map(item => `
                <div class="timeline__item">
                    <div class="timeline__dot"></div>
                    <div class="timeline__content">
                        <div class="timeline__date">${item.date}</div>
                        <div class="timeline__title">${item.title}</div>
                        <div class="timeline__desc">${item.description}</div>
                    </div>
                </div>`).join('') + '</div>';
        }
        if (sectionConfig.type === 'retenir' && sectionConfig.items) {
            content += '<div class="retenir"><div class="retenir__grid">' + sectionConfig.items.map(item => `
                <div class="retenir__item"><div class="retenir__label">${item.label}</div><div class="retenir__value">${item.value}</div></div>`).join('') + '</div></div>';
        }
        if (sectionConfig.type === 'list' && sectionConfig.items) content += '<ul>' + sectionConfig.items.map(item => `<li>${item}</li>`).join('') + '</ul>';
        section.innerHTML = content;
        return section;
    }

    /** Génère la page Personnages sans modifier le contenu stocké dans JSON. */
    async generatePersonnagesPage() {
        try {
            const detailed = await dataManager.load('characters-detailed.json');
            const container = document.getElementById('content-personnages');
            if (!container) return;

            container.innerHTML = '';

            const intro = document.createElement('section');
            intro.className = 'character-wiki-intro';
            intro.setAttribute('aria-labelledby', 'titre-personnages-wiki');
            intro.innerHTML = `
                <div class="character-wiki-intro__content">
                    <p class="character-wiki-intro__eyebrow">WIKI ANALYTIQUE</p>
                    <h2 id="titre-personnages-wiki">Personnages</h2>
                    <p>Cette section présente les personnages majeurs de <em>Mushoku Tensei</em> sous une forme de wiki analytique. Les fiches étudient leur évolution, leurs relations, leurs contradictions et leur fonction narrative au lieu de se limiter à une biographie.</p>
                    <p class="character-wiki-note"><strong>Attention aux spoilers :</strong> la fonctionnalité de masquage des spoilers sera implémentée ultérieurement. En attendant, les dossiers peuvent couvrir une large partie de l'histoire.</p>
                </div>`;
            container.appendChild(intro);

            const characterOrder = ['rudeus', 'roxy', 'sylphiette', 'eris'];

            characterOrder.forEach(id => {
                const character = detailed.characters?.[id];
                if (!character) return;

                const article = document.createElement('section');
                article.className = 'character-dossier';
                article.id = `personnage-${id}`;
                article.setAttribute('aria-labelledby', `titre-personnage-${id}`);

                const sections = (character.sections || []).map(section => `
                    <div class="character-dossier__section">
                        <h3>${section.title}</h3>
                        <p>${section.content}</p>
                    </div>`).join('');

                const relations = character.relations?.length ? `
                    <div class="character-dossier__relations">
                        <h3>Relations déterminantes</h3>
                        <ul>${character.relations.map(relation => `<li>${relation}</li>`).join('')}</ul>
                    </div>` : '';

                article.innerHTML = `
                    <div class="character-dossier__header">
                        <div class="character-dossier__icon" aria-hidden="true">${character.icon || '◆'}</div>
                        <div class="character-dossier__identity">
                            <p class="character-dossier__role">${character.role || 'Personnage'}</p>
                            <h2 id="titre-personnage-${id}">${character.name}</h2>
                            <p class="character-dossier__intro">${character.intro || ''}</p>
                        </div>
                    </div>
                    <div class="character-dossier__body">
                        ${sections}
                        ${relations}
                    </div>`;

                container.appendChild(article);
            });

            this.observeElements(container.querySelectorAll('.character-wiki-intro, .character-dossier'));
        } catch (error) {
            console.error('Erreur génération Personnages:', error);
            const container = document.getElementById('content-personnages');
            if (container) {
                container.innerHTML = `
                    <section class="character-wiki-error">
                        <h2>Impossible de charger les personnages</h2>
                        <p>Une erreur est survenue lors du chargement des données.</p>
                    </section>`;
            }
        }
    }

    async generateUniversPage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-univers');
            if (!container) return;
            const introSection = await this.createSection({id:'monde',title:'Le Monde des Six Faces',type:'text',content:"L'histoire de Mushoku Tensei se déroule dans un monde de fantasy possédant sa propre géographie, son histoire, ses peuples et ses traditions. Le récit ne se limite pas aux aventures du protagoniste : il met également en scène un univers vivant, dont les événements continuent d'évoluer indépendamment des personnages principaux."});
            container.appendChild(introSection);
            container.appendChild(await this.createSection({id:'continents',title:'Les principaux continents',type:'cards',items:data.univers.continents}));
            container.appendChild(await this.createSection({id:'peuples',title:'Les peuples',type:'cards',items:data.univers.peoples}));
            container.appendChild(await this.createSection({id:'magie',title:'La magie',type:'cards',items:data.univers.magic}));
            container.appendChild(await this.createSection({id:'combat',title:'Les styles de combat',type:'cards',items:data.univers.combatStyles}));
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) { console.error('Erreur génération Univers:', error); }
    }

    async generateChronologiePage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-chronologie');
            if (!container) return;
            container.appendChild(await this.createSection({id:'chrono',title:'Frise chronologique',type:'text',content:"Cette page retrace les principales étapes de la publication de Mushoku Tensei, depuis le lancement du web novel jusqu'aux adaptations officielles."}));
            container.appendChild(await this.createSection({id:'frise',title:'Événements clés',type:'timeline',items:data.chronologie.events}));
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) { console.error('Erreur génération Chronologie:', error); }
    }

    async generateSourcesContent(containerSelector) {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.querySelector(containerSelector);
            if (!container) return;
            container.appendChild(await this.createSection({id:'officielles',title:'Sources officielles',type:'cards',items:data.sources.official}));
            container.appendChild(await this.createSection({id:'documentaires',title:'Bases documentaires',type:'cards',items:data.sources.databases}));
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) { console.error('Erreur génération Sources:', error); }
    }

    async generateBiographiePage() {
        try {
            const data = await dataManager.load('pages-content.json');
            const container = document.getElementById('content-biographie-chrono');
            if (!container) return;
            container.appendChild(await this.createSection({id:'biographie',title:'Chronologie',type:'timeline',items:data.biographie.timelineEvents}));
            this.observeElements(container.querySelectorAll('section'));
        } catch (error) { console.error('Erreur génération Biographie:', error); }
    }
}

const contentGenerator = new ContentGenerator();