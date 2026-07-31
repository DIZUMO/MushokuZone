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

            const selector = document.createElement('section');
            selector.className = 'character-selector';
            selector.setAttribute('aria-labelledby', 'titre-selecteur-personnages');
            selector.innerHTML = `
                <div class="character-selector__heading">
                    <p class="character-selector__eyebrow">SÉLECTION</p>
                    <h2 id="titre-selecteur-personnages">Choisir un personnage</h2>
                    <p>Survolez l'un des quatre panneaux du même logo Windows 7 pour afficher le dossier correspondant.</p>
                </div>
                <div class="character-selector__logo-wrap">
                    <svg class="character-selector__logo" viewBox="0 0 420 360" role="img" aria-label="Sélecteur des quatre personnages principaux">
                        <defs>
                            <linearGradient id="characterBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#52ddff"/><stop offset="1" stop-color="#0874d1"/></linearGradient>
                            <linearGradient id="characterGreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#91f25e"/><stop offset="1" stop-color="#239b46"/></linearGradient>
                            <linearGradient id="characterRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7164"/><stop offset="1" stop-color="#a91631"/></linearGradient>
                            <linearGradient id="characterGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe06a"/><stop offset="0.55" stop-color="#ed9d30"/><stop offset="1" stop-color="#8d4c27"/></linearGradient>
                        </defs>
                        <g class="character-selector__pane character-selector__pane--roxy" data-character="roxy" tabindex="0" role="button" aria-label="Afficher le dossier de Roxy">
                            <path d="M47 77 L202 45 L194 165 L39 181 Z" fill="url(#characterBlue)"/>
                            <path class="character-selector__shine" d="M61 89 L190 62 L184 151 L51 164 Z"/>
                        </g>
                        <g class="character-selector__pane character-selector__pane--sylphiette" data-character="sylphiette" tabindex="0" role="button" aria-label="Afficher le dossier de Sylphiette">
                            <path d="M215 42 L373 62 L361 174 L208 163 Z" fill="url(#characterGreen)"/>
                            <path class="character-selector__shine" d="M228 59 L355 75 L346 158 L220 150 Z"/>
                        </g>
                        <g class="character-selector__pane character-selector__pane--eris" data-character="eris" tabindex="0" role="button" aria-label="Afficher le dossier d'Eris">
                            <path d="M39 196 L194 181 L201 305 L52 333 Z" fill="url(#characterRed)"/>
                            <path class="character-selector__shine" d="M54 210 L181 198 L186 288 L67 311 Z"/>
                        </g>
                        <g class="character-selector__pane character-selector__pane--rudeus" data-character="rudeus" tabindex="0" role="button" aria-label="Afficher le dossier de Rudeus">
                            <path d="M208 178 L361 187 L373 292 L215 320 Z" fill="url(#characterGold)"/>
                            <path class="character-selector__shine" d="M221 194 L348 201 L357 278 L231 301 Z"/>
                        </g>
                        <path class="character-selector__outline" d="M47 77L202 45L194 165L39 181 M215 42L373 62L361 174L208 163 M39 196L194 181L201 305L52 333 M208 178L361 187L373 292L215 320"/>
                    </svg>
                </div>
                <div class="character-selector__names" role="list" aria-label="Personnages">
                    <button type="button" class="character-selector__name character-selector__name--roxy" data-character="roxy">ROXY</button>
                    <button type="button" class="character-selector__name character-selector__name--sylphiette" data-character="sylphiette">SYLPHIETTE</button>
                    <button type="button" class="character-selector__name character-selector__name--eris" data-character="eris">ERIS</button>
                    <button type="button" class="character-selector__name character-selector__name--rudeus" data-character="rudeus">RUDEUS</button>
                </div>
                <p class="character-selector__status" aria-live="polite">Survolez un panneau du logo.</p>`;
            container.appendChild(selector);

            characterOrder.forEach(id => {
                const character = detailed.characters?.[id];
                if (!character) return;

                const article = document.createElement('section');
                article.className = 'character-dossier';
                article.id = `personnage-${id}`;
                article.setAttribute('aria-labelledby', `titre-personnage-${id}`);
                article.dataset.character = id;
                if (id !== 'rudeus') article.hidden = true;

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

            const dossiers = Array.from(container.querySelectorAll('.character-dossier'));
            const panes = Array.from(selector.querySelectorAll('.character-selector__pane'));
            const nameButtons = Array.from(selector.querySelectorAll('.character-selector__name'));
            const status = selector.querySelector('.character-selector__status');

            const selectCharacter = (id, selected = true) => {
                const character = detailed.characters?.[id];
                if (!character) return;

                dossiers.forEach(dossier => {
                    dossier.hidden = dossier.dataset.character !== id;
                });
                panes.forEach(pane => {
                    pane.classList.toggle('is-active', pane.dataset.character === id);
                });
                nameButtons.forEach(button => {
                    button.classList.toggle('is-active', button.dataset.character === id);
                });

                status.textContent = selected ? `${character.name} sélectionné.` : `Survol : ${character.name}`;
            };

            panes.forEach(pane => {
                pane.addEventListener('mouseenter', () => selectCharacter(pane.dataset.character, false));
                pane.addEventListener('focus', () => selectCharacter(pane.dataset.character, false));
                pane.addEventListener('click', () => selectCharacter(pane.dataset.character, true));
                pane.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        selectCharacter(pane.dataset.character, true);
                    }
                });
            });

            nameButtons.forEach(button => {
                button.addEventListener('mouseenter', () => selectCharacter(button.dataset.character, false));
                button.addEventListener('focus', () => selectCharacter(button.dataset.character, false));
                button.addEventListener('click', () => selectCharacter(button.dataset.character, true));
            });

            selectCharacter('rudeus');
            this.observeElements(container.querySelectorAll('.character-wiki-intro, .character-selector, .character-dossier'));
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