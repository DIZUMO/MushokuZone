// ============================================================
// SPOILER MANAGER
// ============================================================
// Système volontairement dormant : aucun contenu existant du site
// n'est marqué comme spoiler tant qu'un élément n'utilise pas
// data-spoiler. Le module peut donc être chargé dès maintenant.
//
// Utilisation future :
// <div data-spoiler data-spoiler-label="Afficher le spoiler">
//     Contenu sensible
// </div>
// ============================================================

class SpoilerManager {
    constructor(options = {}) {
        this.storageKey = options.storageKey || 'mushokuzone-spoilers';
        this.revealAllKey = `${this.storageKey}-reveal-all`;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;
        this.bindExistingSpoilers();
        this.observeNewSpoilers();
    }

    bindExistingSpoilers() {
        document.querySelectorAll('[data-spoiler]').forEach(element => {
            this.prepare(element);
        });
    }

    observeNewSpoilers() {
        if (!window.MutationObserver) return;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return;

                    if (node.matches?.('[data-spoiler]')) {
                        this.prepare(node);
                    }

                    node.querySelectorAll?.('[data-spoiler]').forEach(element => {
                        this.prepare(element);
                    });
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    prepare(element) {
        if (element.dataset.spoilerReady === 'true') return;
        element.dataset.spoilerReady = 'true';

        const id = element.dataset.spoilerId || this.generateId();
        element.dataset.spoilerId = id;

        const label = element.dataset.spoilerLabel || 'Afficher le spoiler';
        const revealedLabel = element.dataset.spoilerRevealedLabel || 'Masquer le spoiler';
        const description = element.dataset.spoilerDescription || 'Ce contenu contient un spoiler.';

        element.classList.add('spoiler');
        element.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'spoiler__content';
        content.innerHTML = element.innerHTML;
        element.replaceChildren(content);

        const overlay = document.createElement('div');
        overlay.className = 'spoiler__overlay';

        const text = document.createElement('p');
        text.className = 'spoiler__description';
        text.textContent = description;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'spoiler__button';
        button.textContent = label;
        button.setAttribute('aria-controls', id);
        button.setAttribute('aria-expanded', 'false');

        overlay.append(text, button);
        element.prepend(overlay);
        element.id = id;

        button.addEventListener('click', () => {
            this.toggle(element, button, label, revealedLabel);
        });

        if (this.isRevealed(id)) {
            this.setRevealed(element, button, label, revealedLabel, true);
        }
    }

    toggle(element, button, label, revealedLabel) {
        const revealed = element.classList.contains('spoiler--revealed');
        this.setRevealed(element, button, label, revealedLabel, !revealed);
        this.saveState(element.dataset.spoilerId, !revealed);
    }

    setRevealed(element, button, label, revealedLabel, revealed) {
        element.classList.toggle('spoiler--revealed', revealed);
        element.setAttribute('aria-hidden', String(!revealed));
        button.setAttribute('aria-expanded', String(revealed));
        button.textContent = revealed ? revealedLabel : label;
    }

    isRevealed(id) {
        if (this.getRevealAll()) return true;

        try {
            const states = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            return states[id] === true;
        } catch {
            return false;
        }
    }

    saveState(id, revealed) {
        try {
            const states = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            states[id] = revealed;
            localStorage.setItem(this.storageKey, JSON.stringify(states));
        } catch {
            // Le système reste utilisable sans localStorage.
        }
    }

    getRevealAll() {
        try {
            return localStorage.getItem(this.revealAllKey) === 'true';
        } catch {
            return false;
        }
    }

    setRevealAll(reveal) {
        try {
            localStorage.setItem(this.revealAllKey, String(Boolean(reveal)));
        } catch {
            // Le système reste utilisable sans localStorage.
        }

        document.querySelectorAll('[data-spoiler]').forEach(element => {
            const button = element.querySelector('.spoiler__button');
            if (!button) return;

            const label = element.dataset.spoilerLabel || 'Afficher le spoiler';
            const revealedLabel = element.dataset.spoilerRevealedLabel || 'Masquer le spoiler';
            this.setRevealed(element, button, label, revealedLabel, reveal);
        });
    }

    reset() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.revealAllKey);
        } catch {
            // Rien à faire si localStorage est indisponible.
        }

        document.querySelectorAll('[data-spoiler]').forEach(element => {
            const button = element.querySelector('.spoiler__button');
            if (!button) return;

            const label = element.dataset.spoilerLabel || 'Afficher le spoiler';
            const revealedLabel = element.dataset.spoilerRevealedLabel || 'Masquer le spoiler';
            this.setRevealed(element, button, label, revealedLabel, false);
        });
    }

    generateId() {
        return `spoiler-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
}

// Instance globale prête à être utilisée plus tard.
window.spoilerManager = new SpoilerManager();
