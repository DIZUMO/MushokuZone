/**
 * STYLE INJECTOR - Injecte dynamiquement les styles selon la page
 * Centralise la gestion des images de fond et supprime la duplication CSS
 */

class StyleInjector {
    constructor() {
        this.pageId = this.detectPageId();
    }

    /**
     * Détecte l'ID de la page actuelle
     */
    detectPageId() {
        const pathname = new URL(window.location).pathname;

        if (pathname.includes('index') || pathname.endsWith('/') || pathname.endsWith('MushokuZone/')) {
            return 'index';
        }

        const mapping = {
            'Biographie': 'biographie',
            'Impact': 'impact',
            'Univers': 'univers',
            'Personnages': 'personnages',
            'Chronologie': 'chronologie',
            'Episode': 'episode',
            'Sources': 'sources',
            'A-propos': 'apropos'
        };

        for (const [name, id] of Object.entries(mapping)) {
            if (pathname.includes(name)) {
                return id;
            }
        }

        return 'index';
    }

    /**
     * Détermine le chemin vers une ressource depuis la page courante.
     * Les pages à la racine utilisent directement Image/..., tandis que
     * les pages de Autre pages/ doivent remonter d'un niveau.
     */
    getAssetPath(path) {
        if (!path) return null;

        const isOtherPages = window.location.pathname.includes('Autre%20pages') ||
                             window.location.pathname.includes('Autre pages');
        const normalizedPath = path.replace(/^\.\//, '');

        return isOtherPages ? `../${normalizedPath}` : normalizedPath;
    }

    /**
     * Injecte l'image de fond appropriée
     */
    async injectBackgroundImage() {
        try {
            const backgrounds = await dataManager.load('backgrounds.json');
            if (!backgrounds) return;

            const bgImage = backgrounds.pages[this.pageId] || backgrounds.fallback;
            const assetPath = this.getAssetPath(bgImage);

            if (assetPath) {
                document.documentElement.style.backgroundImage = `url("${assetPath}")`;
                document.documentElement.style.backgroundSize = 'cover';
                document.documentElement.style.backgroundRepeat = 'no-repeat';
                document.documentElement.style.backgroundPosition = 'top center';
                document.documentElement.style.backgroundAttachment = 'fixed';
            }
        } catch (error) {
            console.error('Erreur injection background:', error);
        }
    }

    /**
     * Injecte les styles spécifiques à la page (si nécessaire)
     */
    async injectPageSpecificStyles() {
        try {
            const config = await dataManager.load('site-config.json');
            if (!config) return;

            const style = document.createElement('style');
            style.textContent = `
                :root {
                    --site-name: "${config.site.name}";
                }
            `;
            document.head.appendChild(style);
        } catch (error) {
            console.error('Erreur injection styles page:', error);
        }
    }

    /**
     * Initialise l'injection de styles
     */
    async init() {
        await this.injectBackgroundImage();
        await this.injectPageSpecificStyles();
    }
}

// Instance globale
const styleInjector = new StyleInjector();

// Initialiser au chargement du DOM ou immédiatement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => styleInjector.init());
} else {
    styleInjector.init();
}
