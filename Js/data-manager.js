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
        this.defaultTimeout = 5000; // ms
    }

    /**
     * Détecte automatiquement l'URL de base (root ou Autre pages/)
     */
    detectBaseUrl() {
        const isOtherPages = window.location.pathname.includes('Autre%20pages') || 
                             window.location.pathname.includes('Autre pages');
        return isOtherPages ? '../Data/' : 'Data/';
    }

    /**
     * Charge un fichier JSON avec cache et gestion d'erreurs
     * Utilise Promise pour éviter les chargements dupliqués
     */
    async load(filename) {
        // Retourner depuis le cache si disponible
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        // Éviter les requêtes dupliqués en progress
        if (this.loadingPromises[filename]) {
            return this.loadingPromises[filename];
        }

        // Créer la promise et la stocker
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

    /**
     * Fetch réel avec gestion d'erreurs
     */
    async _fetchAndCache(filename) {
        const url = `${this.baseUrl}${filename}`;
        // Use AbortController to implement a timeout for fetch
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

            // Validate JSON structure
            if (!data || typeof data !== 'object') {
                throw new Error('JSON data is not an object');
            }

            this.cache[filename] = data;
            return data;

        } catch (error) {
            // Normalize errors
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

    /**
     * Pré-charge plusieurs fichiers en parallèle
     */
    async preload(filenames) {
        const promises = filenames.map(f => this.load(f).catch(() => null));
        await Promise.all(promises);
    }

    /**
     * Récupère les données en cache sans rechargement
     */
    getSync(filename) {
        return this.cache[filename] || null;
    }

    /**
     * Vide le cache (utile pour rafraîchir les données)
     */
    clearCache(filename = null) {
        if (filename) {
            delete this.cache[filename];
        } else {
            this.cache = {};
        }
    }

    /**
     * Récupère les erreurs de chargement
     */
    getErrors() {
        return this.errors;
    }

    /**
     * Vérifie l'état du cache
     */
    getStatus() {
        return {
            cached: Object.keys(this.cache).length,
            errors: this.errors.length,
            files: Object.keys(this.cache)
        };
    }
}

// Instance globale unique
const dataManager = new DataManager();
