// ============================================================
// NAVIGATION MANAGER
// ============================================================

class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.site-nav');
        this.ul = this.nav?.querySelector('.site-nav__links');
    }

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

    isOtherPagesDirectory() {
        const pathname = new URL(window.location).pathname;
        return /Autre\s+pages|Autre%20pages/.test(pathname);
    }

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
        if (this.burger && this.navLinks) this.init();
    }

    init() {
        this.burger.addEventListener('click', () => this.toggle());
        document.addEventListener('click', e => this.closeIfOutside(e));
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
// UPDATE MANAGER
// ============================================================

class UpdateManager {
    constructor() {
        this.data = null;
        this.storageKey = 'mushokuzone-site-update';
        this.cacheDuration = 15 * 60 * 1000;
    }

    getDataUrl() {
        const pathname = decodeURIComponent(window.location.pathname);
        return pathname.includes('/Autre pages/') ? '../Data/site.json' : 'Data/site.json';
    }

    async load() {
        const cached = this.getCachedData();
        if (cached) {
            this.data = cached;
            this.render();
            return;
        }

        try {
            const response = await fetch(this.getDataUrl(), { cache: 'no-cache' });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data || typeof data !== 'object' || !data.version || !data.lastUpdated) {
                throw new Error('Métadonnées de mise à jour invalides');
            }

            this.data = data;
            this.saveCachedData(data);
            this.render();
        } catch (error) {
            console.warn('UpdateManager: impossible de charger les métadonnées ->', error);
            this.renderFallback();
        }
    }

    getCachedData() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return null;
            const cached = JSON.parse(raw);
            if (!cached.timestamp || Date.now() - cached.timestamp > this.cacheDuration) {
                localStorage.removeItem(this.storageKey);
                return null;
            }
            return cached.data || null;
        } catch {
            return null;
        }
    }

    saveCachedData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({ timestamp: Date.now(), data }));
        } catch {}
    }

    formatDate(dateString) {
        const date = new Date(`${dateString}T00:00:00`);
        if (Number.isNaN(date.getTime())) return dateString;
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        }).format(date);
    }

    render() {
        if (!this.data) return;
        const lastUpdate = this.formatDate(this.data.lastUpdated);
        const version = this.data.version;
        const lastUpdateElement = document.getElementById('last-update');
        const versionElement = document.getElementById('version');

        if (lastUpdateElement) lastUpdateElement.textContent = lastUpdate;
        if (versionElement) versionElement.textContent = version;
        document.querySelectorAll('[data-site-last-update]').forEach(el => el.textContent = lastUpdate);
        document.querySelectorAll('[data-site-version]').forEach(el => el.textContent = version);
        this.renderFooterMeta(lastUpdate, version);
    }

    renderFooterMeta(lastUpdate, version) {
        document.querySelectorAll('.site-footer__meta').forEach(meta => {
            if (meta.querySelector('[data-update-manager]')) return;

            const container = document.createElement('div');
            container.setAttribute('data-update-manager', 'true');
            container.style.cssText = 'margin-top:16px;padding-top:12px;border-top:1px solid var(--color-border, rgba(255,215,0,.22));font-size:.85rem;line-height:1.6';

            const title = document.createElement('strong');
            title.textContent = 'Mise à jour du site';
            title.style.color = 'var(--color-gold, #ffd700)';

            const date = document.createElement('span');
            date.textContent = `Dernière mise à jour : ${lastUpdate}`;
            const release = document.createElement('span');
            release.textContent = `Version : ${version}`;

            container.append(title, document.createElement('br'), date, document.createElement('br'), release);

            if (this.data.verified) {
                const verified = document.createElement('span');
                verified.textContent = ` ✓ ${this.data.verifiedLabel || 'Données vérifiées'}`;
                verified.style.color = 'var(--color-gold, #ffd700)';
                container.appendChild(verified);
            }
            meta.appendChild(container);
        });
    }

    renderFallback() {
        const lastUpdateElement = document.getElementById('last-update');
        const versionElement = document.getElementById('version');
        if (lastUpdateElement && !lastUpdateElement.textContent.trim()) lastUpdateElement.textContent = 'Indisponible';
        if (versionElement && !versionElement.textContent.trim()) versionElement.textContent = 'Indisponible';
    }
}

// ============================================================
// SPOILER SYSTEM LOADER
// ============================================================
// Le système est installé mais volontairement dormant.
// Aucun élément existant n'utilise data-spoiler.

class SpoilerSystemLoader {
    constructor() {
        this.basePath = this.isOtherPagesDirectory() ? '../' : '';
    }

    isOtherPagesDirectory() {
        const pathname = decodeURIComponent(window.location.pathname);
        return pathname.includes('/Autre pages/');
    }

    async load() {
        this.loadStylesheet();

        if (window.spoilerManager) {
            window.spoilerManager.init();
            return;
        }

        try {
            await this.loadScript(`${this.basePath}Js/spoiler-manager.js`);
            if (window.spoilerManager) window.spoilerManager.init();
        } catch (error) {
            console.warn('SpoilerSystemLoader: impossible de charger le système de spoilers ->', error);
        }
    }

    loadStylesheet() {
        const href = `${this.basePath}Css/spoiler.css`;
        if (document.querySelector(`link[href="${href}"]`)) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Échec du chargement : ${src}`));
            document.body.appendChild(script);
        });
    }
}

// ============================================================
// BACK TO TOP
// ============================================================

class BackToTop {
    constructor() {
        this.btn = document.getElementById('back-to-top');
        if (this.btn) this.init();
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
// MEDIA LOADER
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
        if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

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
            if (el.complete && el.naturalWidth > 0) return finish();
            el.addEventListener('load', finish, { once: true });
            el.addEventListener('error', finish, { once: true });
        } else if (type === 'IFRAME') {
            el.addEventListener('load', finish, { once: true });
            setTimeout(finish, 15000);
        }
    }
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================

class ScrollAnimations {
    constructor() { this.init(); }

    init() {
        if (!window.IntersectionObserver) return;
        const targets = document.querySelectorAll('header, section, .video-cell, table, .table-wrapper, .timeline__item, .card');
        const observer = new IntersectionObserver(entries => {
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
    constructor() { this.init(); }

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
    await new NavigationManager().build();
    new BurgerMenu();
    new BackToTop();
    new MediaLoader();
    new ScrollAnimations();
    new AccordionManager();
    new UpdateManager().load();

    // Prépare le système de spoilers sans l'activer sur le contenu actuel.
    new SpoilerSystemLoader().load();

    console.log('MushokuZone scripts initialized');
});
