/**
 * JSCRIPTS.JS REFACTORISÉ
 * Patterns : modules ES6, pas de globales polluées
 * RRe
// ============================================================
// NAVIGATION MANAGER
// ============================================================

class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.site-nav');
        this.ul = this.nav?.querySelector('.site-nav__links');
    }

    /**
     * Construit la navigation depuis JSON
     */
    async build() {
        if (!this.ul) return;

        try {
            const navigation = await dataManager.load('navigation.json');
            if (!navigation?.pages) {
                console.error('Navigation data not loaded');
                return;
            }

            const isOtherPages = this.isOtherPagesDirectory();
            const prefix = isOtherPages ? '' : 'Autre pages/';
            const rootPrefix = isOtherPages ? '../' : '';
            const currentFile = this.getCurrentFile();

            navigation.pages.forEach(page => {
                const li = document.createElement('li');
                const a = document.createElement('a');

                // Construire l'URL
                if (page.id === 'index') {
                    a.href = rootPrefix + 'index.html';
                    if (currentFile === 'index.html' || currentFile === '') {
                        a.setAttribute('aria-current', 'page');
                    }
                } else {
                    a.href = prefix + page.url;
                    if (currentFile === page.url || currentFile === page.id + '.html') {
                        a.setAttribute('aria-current', 'page');
                    }
                }

                a.textContent = page.titre;
                li.appendChild(a);
                this.ul.appendChild(li);
            });
        } catch (error) {
            console.error('Erreur navigation:', error);
        }
    }

    /**
     * Détecte si on est dans Autre pages/
     */
    isOtherPagesDirectory() {
        const pathname = new URL(window.location).pathname;
        return /Autre\s+pages|Autre%20pages/.test(pathname);
    }

    /**
     * Récupère le nom du fichier actuel
     */
    getCurrentFile() {
        const pathname = new URL(window.location).pathname;
        return pathname.split('/').pop() || 'index.html';
    }
}

// ============================================================
// BURGER MENU
// ============================================================

class BurgerMenu {
    constructor() {
        this.burger = document.querySelector('.site-nav__burger');
        this.navLinks = document.querySelector('.site-nav__links');
        if (this.burger && this.navLinks) {
            this.init();
        }
    }

    init() {
        this.burger.addEventListener('click', () => this.toggle());
        document.addEventListener('click', (e) => this.closeIfOutside(e));
    }

    toggle() {
        const expanded = this.burger.getAttribute('aria-expanded') === 'true';
        this.burger.setAttribute('aria-expanded', String(!expanded));
        this.navLinks.classList.toggle('open', !expanded);
    }

    closeIfOutside(e) {
        if (!this.burger.contains(e.target) && !this.navLinks.contains(e.target)) {
            this.burger.setAttribute('aria-expanded', 'false');
            this.navLinks.classList.remove('open');
        }
    }
}

// ============================================================
// BACK TO TOP
// ============================================================

class BackToTop {
    constructor() {
        this.btn = document.getElementById('back-to-top');
        if (this.btn) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => this.updateVisibility(), { passive: true });
        this.btn.addEventListener('click', () => this.scrollTop());
    }

    updateVisibility() {
        this.btn.classList.toggle('visible', window.scrollY > 400);
    }

    scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================================
// MEDIA LOADER (images et iframes)
// ============================================================

class MediaLoader {
    constructor() {
        this.init();
        this.observeNewMedia();
    }

    init() {
        this.wrapMediaElements(
            Array.from(document.querySelectorAll('section img')),
            Array.from(document.querySelectorAll('section iframe'))
        );
    }

    observeNewMedia() {
        const observer = new MutationObserver(() => {
            this.wrapMediaElements(
                Array.from(document.querySelectorAll('section img:not([data-loader-wrapped])')),
                Array.from(document.querySelectorAll('section iframe:not([data-loader-wrapped])'))
            );
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    wrapMediaElements(images, iframes) {
        images.forEach(img => this.wrapElement(img, 'IMG'));
        iframes.forEach(iframe => this.wrapElement(iframe, 'IFRAME'));
    }

    wrapElement(el, type) {
        if (el.dataset.loaderWrapped === 'true') return;
        el.dataset.loaderWrapped = 'true';

        const parent = el.parentElement;
        if (!parent) return;

        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.textContent = 'Loading...';
        loader.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none';
        parent.appendChild(loader);

        const start = performance.now();
        el.style.opacity = '0';
        let done = false;

        const finish = () => {
            if (done) return;
            done = true;
            const wait = Math.max(0, 500 - (performance.now() - start));
            setTimeout(() => {
                loader.remove();
                el.style.opacity = '';
                el.classList.add('media-loaded');
            }, wait);
        };

        if (type === 'IMG') {
            if (el.complete && el.naturalWidth > 0) {
                finish();
                return;
            }
            el.addEventListener('load', finish, { once: true });
            el.addEventListener('error', finish, { once: true });
        } else if (type === 'IFRAME') {
            el.addEventListener('load', finish, { once: true });
            setTimeout(finish, 15000);
        }
    }
}

// ============================================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        if (!window.IntersectionObserver) return;

        const targets = document.querySelectorAll(
            'header, section, .video-cell, table, .table-wrapper, .timeline__item, .card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (!entry.isIntersecting) return;
                entry.target.style.transitionDelay = `${i * 0.04}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.05 });

        targets.forEach(el => {
            el.classList.add('hidden');
            observer.observe(el);
        });
    }
}

// ============================================================
// ACCORDION MANAGER
// ============================================================

class AccordionManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.accordion__btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggle(btn));
        });
    }

    toggle(btn) {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panel = btn.nextElementSibling;
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.classList.toggle('open', !expanded);
    }
}

// ============================================================
// INITIALISATION
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    // Initialiser les modules
    await new NavigationManager().build();
    new BurgerMenu();
    new BackToTop();
    new MediaLoader();
    new ScrollAnimations();
    new AccordionManager();

    console.log('MushokuZone scripts initialized');
});
