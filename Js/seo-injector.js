/**
 * SEO INJECTOR - Génère dynamiquement les métadonnées
 * Injecte description, og:*, twitter:* en fonction de la page actuelle
 */

class SEOInjector {
    constructor() {
        this.currentPageId = this.detectPageId();
    }

    /**
     * Détecte l'ID de la page actuelle
     */
    detectPageId() {
        const pathname = window.location.pathname;
        
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
     * Crée une meta tag
     */
    createMeta(name, content, property = false) {
        const meta = document.createElement('meta');
        if (property) {
            meta.setAttribute('property', name);
        } else {
            meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        return meta;
    }

    /**
     * Injecte les métadonnées SEO
     */
    async injectSEO() {
        try {
            // Charger la config générale et le site-config qui contient les métadonnées
            const legacyConfig = await dataManager.load('config.json');
            const config = await dataManager.load('site-config.json');

            if (!legacyConfig || !config) {
                console.warn('SEO: Unable to load config or site-config data');
                return;
            }

            const currentPage = config.navigation.find(p => p.id === this.currentPageId);
            const pageMetadata = config.metadata?.[this.currentPageId];
            if (!currentPage || !pageMetadata) {
                console.warn(`SEO: Page ${this.currentPageId} not found in site-config metadata`);
                return;
            }

            const head = document.head;

            // Déterminer les métadonnées à injecter
            const pageKeywords = legacyConfig.keywords.pages[this.currentPageId] || legacyConfig.keywords.global;
            const title = pageMetadata.title || legacyConfig.site.title;
            const description = pageMetadata.description || legacyConfig.site.description;
            const ogUrl = pageMetadata.canonical || legacyConfig.site.url;

            // 1. Injecter description
            const existingDesc = head.querySelector('meta[name="description"]');
            if (existingDesc) {
                existingDesc.setAttribute('content', description);
            } else {
                head.appendChild(this.createMeta('description', description));
            }

            // 2. Injecter keywords
            const existingKeywords = head.querySelector('meta[name="keywords"]');
            if (existingKeywords) {
                existingKeywords.setAttribute('content', pageKeywords);
            } else {
                head.appendChild(this.createMeta('keywords', pageKeywords));
            }

            // 3. Injecter canonical
            const existingCanonical = head.querySelector('link[rel="canonical"]');
            if (existingCanonical) {
                existingCanonical.setAttribute('href', ogUrl);
            } else {
                const canonical = document.createElement('link');
                canonical.rel = 'canonical';
                canonical.href = ogUrl;
                head.appendChild(canonical);
            }

            // 4. OpenGraph
            this.injectMetaOrCreate(head, 'og:title', pageMetadata.og?.title || title, true);
            this.injectMetaOrCreate(head, 'og:description', pageMetadata.og?.description || description, true);
            this.injectMetaOrCreate(head, 'og:url', ogUrl, true);
            this.injectMetaOrCreate(head, 'og:site_name', legacyConfig.site.name, true);
            this.injectMetaOrCreate(head, 'og:locale', legacyConfig.site.locale, true);
            this.injectMetaOrCreate(head, 'og:type', legacyConfig.socialMedia.ogType, true);
            this.injectMetaOrCreate(head, 'og:image', legacyConfig.socialMedia.ogImage, true);
            this.injectMetaOrCreate(head, 'og:image:alt', legacyConfig.socialMedia.ogImageAlt, true);

            // 5. Twitter Card
            this.injectMetaOrCreate(head, 'twitter:card', legacyConfig.socialMedia.twitterCard);
            this.injectMetaOrCreate(head, 'twitter:title', pageMetadata.twitter?.title || title);
            this.injectMetaOrCreate(head, 'twitter:description', pageMetadata.twitter?.description || description);
            this.injectMetaOrCreate(head, 'twitter:image', legacyConfig.socialMedia.ogImage);
            this.injectMetaOrCreate(head, 'twitter:image:alt', legacyConfig.socialMedia.ogImageAlt);

            console.log(`SEO: Metadata injected for page "${this.currentPageId}"`);

        } catch (error) {
            console.error('SEO: Error injecting metadata:', error);
        }
    }

    /**
     * Helper : injecte une meta ou la crée
     */
    injectMetaOrCreate(head, name, content, isProperty = false) {
        const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        const existing = head.querySelector(selector);

        if (existing) {
            existing.setAttribute('content', content);
        } else {
            head.appendChild(this.createMeta(name, content, isProperty));
        }
    }
}

// Instance globale
const seoInjector = new SEOInjector();

// Injecter les métadonnées au chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => seoInjector.injectSEO());
} else {
    seoInjector.injectSEO();
}
