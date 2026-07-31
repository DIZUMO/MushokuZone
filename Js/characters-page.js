/**
 * CHARACTERS PAGE
 * Génère la page Personnages depuis les dossiers JSON.
 * Sylphiette utilise exclusivement son dossier analytique dédié.
 */

class CharactersPageGenerator {
    async loadData() {
        const [base, sylphiette] = await Promise.all([
            dataManager.load('characters-detailed.json'),
            dataManager.load('sylphiette-detailed.json')
        ]);

        const characters = { ...(base.characters || {}) };
        if (sylphiette.character) {
            characters.sylphiette = sylphiette.character;
        }

        return { characters };
    }

    escapeHTML(value) {
        const div = document.createElement('div');
        div.textContent = value ?? '';
        return div.innerHTML;
    }

    renderCharacter(character, id) {
        const article = document.createElement('section');
        article.className = 'character-dossier';
        article.id = `personnage-${id}`;
        article.setAttribute('aria-labelledby', `titre-personnage-${id}`);
        article.dataset.character = id;
        article.hidden = true;

        const sections = (character.sections || []).map(section => `
            <div class="character-dossier__section">
                <h3>${this.escapeHTML(section.title)}</h3>
                <p>${section.content || ''}</p>
            </div>
        `).join('');

        const relations = character.relations?.length ? `
            <div class="character-dossier__relations">
                <h3>Relations déterminantes</h3>
                <ul>${character.relations.map(relation => `<li>${this.escapeHTML(relation)}</li>`).join('')}</ul>
            </div>
        ` : '';

        const spoiler = character.spoilerWarning ? `
            <div class="character-dossier__spoiler" role="note">
                <strong>Attention aux spoilers :</strong> ${this.escapeHTML(character.spoilerWarning)}
            </div>
        ` : '';

        article.innerHTML = `
            <div class="character-dossier__header">
                <div class="character-dossier__icon" aria-hidden="true">${character.icon || '◆'}</div>
                <div class="character-dossier__identity">
                    <p class="character-dossier__role">${this.escapeHTML(character.role || 'Personnage')}</p>
                    <h2 id="titre-personnage-${id}">${this.escapeHTML(character.name || id)}</h2>
                    <p class="character-dossier__intro">${character.intro || ''}</p>
                </div>
            </div>
            <div class="character-dossier__body">
                ${spoiler}
                ${sections}
                ${relations}
            </div>
        `;

        return article;
    }

    createSelector() {
        const selector = document.createElement('section');
        selector.className = 'character-selector';
        selector.setAttribute('aria-labelledby', 'titre-selecteur-personnages');
        selector.innerHTML = `
            <div class="character-selector__heading">
                <p class="character-selector__eyebrow">SÉLECTION</p>
                <h2 id="titre-selecteur-personnages">Choisir un personnage</h2>
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
                        <path d="M30 175 L45 85 L205 35 L205 175 Z" fill="url(#characterBlue)"/>
                        <path class="character-selector__shine" d="M39 163 L52 94 L193 50 L193 163 Z"/>
                    </g>
                    <g class="character-selector__pane character-selector__pane--sylphiette" data-character="sylphiette" tabindex="0" role="button" aria-label="Afficher le dossier de Sylphiette">
                        <path d="M215 35 L375 85 L390 175 L215 175 Z" fill="url(#characterGreen)"/>
                        <path class="character-selector__shine" d="M227 50 L368 94 L381 163 L227 163 Z"/>
                    </g>
                    <g class="character-selector__pane character-selector__pane--eris" data-character="eris" tabindex="0" role="button" aria-label="Afficher le dossier d'Eris">
                        <path d="M30 185 L205 185 L205 325 L45 275 Z" fill="url(#characterRed)"/>
                        <path class="character-selector__shine" d="M39 197 L193 197 L193 309 L52 267 Z"/>
                    </g>
                    <g class="character-selector__pane character-selector__pane--rudeus" data-character="rudeus" tabindex="0" role="button" aria-label="Afficher le dossier de Rudeus">
                        <path d="M215 185 L390 185 L375 275 L215 325 Z" fill="url(#characterGold)"/>
                        <path class="character-selector__shine" d="M227 197 L381 197 L368 267 L227 309 Z"/>
                    </g>
                    <path class="character-selector__outline" d="M30 175L45 85L205 35L205 175Z M215 35L375 85L390 175L215 175Z M30 185L205 185L205 325L45 275Z M215 185L390 185L375 275L215 325Z"/>
                </svg>
            </div>
            <div class="character-selector__names" role="list" aria-label="Personnages">
                <button type="button" class="character-selector__name character-selector__name--roxy" data-character="roxy">ROXY</button>
                <button type="button" class="character-selector__name character-selector__name--sylphiette" data-character="sylphiette">SYLPHIETTE</button>
                <button type="button" class="character-selector__name character-selector__name--eris" data-character="eris">ERIS</button>
                <button type="button" class="character-selector__name character-selector__name--rudeus" data-character="rudeus">RUDEUS</button>
            </div>
            <p class="character-selector__status" aria-live="polite">Survolez un panneau du logo.</p>
        `;
        return selector;
    }

    async generate() {
        const container = document.getElementById('content-personnages');
        if (!container) return;

        try {
            const detailed = await this.loadData();
            const characterOrder = ['rudeus', 'roxy', 'sylphiette', 'eris'];

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

            const selector = this.createSelector();
            container.appendChild(selector);

            characterOrder.forEach(id => {
                const character = detailed.characters[id];
                if (!character) return;
                container.appendChild(this.renderCharacter(character, id));
            });

            const dossiers = [...container.querySelectorAll('.character-dossier')];
            const panes = [...selector.querySelectorAll('.character-selector__pane')];
            const nameButtons = [...selector.querySelectorAll('.character-selector__name')];
            const status = selector.querySelector('.character-selector__status');

            const deselectCharacter = () => {
                dossiers.forEach(dossier => { dossier.hidden = true; });
                panes.forEach(pane => pane.classList.remove('is-active'));
                nameButtons.forEach(button => button.classList.remove('is-active'));
                if (selector.contains(document.activeElement)) document.activeElement.blur();
                status.textContent = 'Aucun personnage sélectionné.';
            };

            const selectCharacter = (id, selected = true) => {
                const character = detailed.characters[id];
                if (!character) return;

                dossiers.forEach(dossier => {
                    dossier.hidden = dossier.dataset.character !== id;
                });
                panes.forEach(pane => pane.classList.toggle('is-active', pane.dataset.character === id));
                nameButtons.forEach(button => button.classList.toggle('is-active', button.dataset.character === id));
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

            document.addEventListener('click', event => {
                if (!selector.contains(event.target)) deselectCharacter();
            });

            deselectCharacter();
            if (window.contentGenerator?.observeElements) {
                contentGenerator.observeElements(container.querySelectorAll('.character-wiki-intro, .character-selector, .character-dossier'));
            }
        } catch (error) {
            console.error('Erreur génération Personnages:', error);
            container.innerHTML = `
                <section class="character-wiki-error">
                    <h2>Impossible de charger les personnages</h2>
                    <p>Une erreur est survenue lors du chargement des données.</p>
                </section>`;
        }
    }
}

const charactersPageGenerator = new CharactersPageGenerator();
