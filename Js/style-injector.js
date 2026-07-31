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
     * Injecte l'image de fond appropriée
     */
    async injectBackgroundImage() {
        try {
            const backgrounds = await dataManager.load('backgrounds.json');
            if (!backgrounds) return;

            const bgImage = backgrounds.pages[this.pageId] || backgrounds.fallback;

            if (bgImage) {
                // Injecter via CSS inline sur <html>
                document.documentElement.style.backgroundImage = `url("../${bgImage}")`;
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
        // Exemple : ajouter des règles CSS spécifiques par page
        // On peut aussi charger des variables CSS dynamiques ici
        try {
            const config = await dataManager.load('site-config.json');
            if (!config) return;

            // Exemple : injecter des variables CSS
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
