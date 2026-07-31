/**
 * DATA MANAGER - Système centralisé de gestion des données
 * Charge tous les JSONs depuis Data/ avec cache, fallback et gestion d'erreurs
 */

class DataManager {
    constructor() {
        this.baseUrl = this.detectBaseUrl();
        this.cache = {};
        this.errors = [];
        this.loadingPromises = {};
        this.defaultTimeout = 5000;

        // Le gestionnaire est chargé sur toutes les pages du site.
        // Le fond est donc appliqué ici, sans dépendre d'un script supplémentaire.
        this.applyBackground();
    }

    detectBaseUrl() {
        const isOtherPages = this.isOtherPages();
        return isOtherPages ? '../Data/' : 'Data/';
    }

    isOtherPages() {
        const pathname = decodeURIComponent(window.location.pathname);
        return pathname.includes('/Autre pages/');
    }

    detectPageId() {
        const pathname = decodeURIComponent(window.location.pathname);
        const filename = pathname.split('/').pop().toLowerCase();

        if (!filename || filename === 'index.html') return 'index';

        const mapping = {
            'biographie.html': 'biographie',
            'impact.html': 'impact',
            'univers.html': 'univers',
            'personnages.html': 'personnages',
            'chronologie.html': 'chronologie',
            'episode.html': 'episode',
            'sources.html': 'sources',
            'a-propos.html': 'apropos'
        };

        return mapping[filename] || 'index';
    }

    async applyBackground() {
        try {
            const response = await fetch(`${this.baseUrl}backgrounds.json`, {
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const backgrounds = await response.json();
            const pageId = this.detectPageId();
            const image = backgrounds?.pages?.[pageId] || backgrounds?.fallback;

            if (!image) {
                console.warn(`Aucun fond configuré pour la page : ${pageId}`);
                return;
            }

            const normalizedImage = String(image).replace(/^\.\//, '');
            const assetPath = this.isOtherPages()
                ? `../${normalizedImage}`
                : normalizedImage;

            const html = document.documentElement;
            const body = document.body;

            const apply = (element) => {
                if (!element) return;
                element.style.backgroundImage = `url("${assetPath}")`;
                element.style.backgroundSize = 'cover';
                element.style.backgroundRepeat = 'no-repeat';
                element.style.backgroundPosition = 'top center';
                element.style.backgroundAttachment = 'fixed';
            };

            apply(html);
            apply(body);

            if (body) {
                body.style.backgroundColor = 'transparent';
                body.style.minHeight = '100vh';
            }

            // Précharge l'image afin d'éviter un écran noir pendant son apparition.
            const preload = new Image();
            preload.src = assetPath;
        } catch (error) {
            console.error('DataManager: impossible de charger le fond ->', error);
        }
    }

    async load(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        if (this.loadingPromises[filename]) {
            return this.loadingPromises[filename];
        }

        const promise = this._fetchAndCache(filename);
        this.loadingPromises[filename] = promise;

        try {
            const data = await promise;
            delete this.loadingPromises[filename];
            return data;
        } catch (error) {
            delete this.loadingPromises[filename];
            throw error;
        }
    }

    async _fetchAndCache(filename) {
        const url = `${this.baseUrl}${filename}`;
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const signal = controller ? controller.signal : undefined;
        const timeoutMs = this.defaultTimeout;
        let timeoutId;

        if (controller) {
            timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        }

        try {
            const response = await fetch(url, { signal });

            if (!response.ok) {
                const msg = `HTTP ${response.status}: ${response.statusText}`;
                throw new Error(msg);
            }

            let data;
            try {
                data = await response.json();
            } catch (parseErr) {
                throw new Error(`Invalid JSON in ${filename}: ${parseErr.message}`);
            }

            if (!data || typeof data !== 'object') {
                throw new Error('JSON data is not an object');
            }

            this.cache[filename] = data;
            return data;
        } catch (error) {
            let message = error && error.message ? error.message : String(error);
            if (error && error.name === 'AbortError') {
                message = `Request timed out after ${timeoutMs}ms`;
            }

            const errorRecord = {
                file: filename,
                message,
                time: new Date().toISOString()
            };

            console.error(`DataManager: ${errorRecord.file} -> ${errorRecord.message}`);
            this.errors.push(errorRecord);
            throw new Error(errorRecord.message);
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }
    }

    async preload(filenames) {
        const promises = filenames.map(f => this.load(f).catch(() => null));
        await Promise.all(promises);
    }

    getSync(filename) {
        return this.cache[filename] || null;
    }

    clearCache(filename = null) {
        if (filename) {
            delete this.cache[filename];
        } else {
            this.cache = {};
        }
    }

    getErrors() {
        return this.errors;
    }

    getStatus() {
        return {
            cached: Object.keys(this.cache).length,
            errors: this.errors.length,
            files: Object.keys(this.cache)
        };
    }
}

const dataManager = new DataManager();
