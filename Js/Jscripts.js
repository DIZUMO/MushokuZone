document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    //  ANIMATION LOADER pour images et iframes
    // =====================================================

    /**
     * Crée un wrapper avec le loader animé autour d'un élément média.
     * Le loader disparaît dès que le média est prêt.
     */
    function wrapWithLoader(el) {
        // Évite de double-wrapper
        if (el.dataset.loaderWrapped) return;
        el.dataset.loaderWrapped = 'true';

        // S'assurer que le parent est positionné
        const parent = el.parentNode;
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        const loaderEl = document.createElement('div');
        loaderEl.className = 'loader';
        loaderEl.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;pointer-events:none;';

        // Ajouter le loader directement au parent (pas de wrapper supplémentaire)
        parent.appendChild(loaderEl);

        // Cache le média pendant son chargement
        el.style.opacity = '0';
        el.style.position = 'relative';
        el.style.zIndex   = '1';

        function onLoaded() {
            loaderEl.remove();
            el.style.opacity = '';
            el.style.position = '';
            el.style.zIndex   = '';
            el.classList.add('media-loaded');
        }

        if (el.tagName === 'IMG') {
            if (el.complete && el.naturalWidth > 0) {
                // Déjà chargé (cache navigateur)
                onLoaded();
            } else {
                el.addEventListener('load',  onLoaded, { once: true });
                el.addEventListener('error', onLoaded, { once: true }); // évite le loader bloqué
            }
        } else if (el.tagName === 'IFRAME') {
            el.addEventListener('load', onLoaded, { once: true });
        }
    }

    // ---- Images dans les sections (exclut le logo du header) ----
    document.querySelectorAll('section img').forEach(img => {
        wrapWithLoader(img);
    });

    // ---- Iframes dans les sections ----
    document.querySelectorAll('section iframe').forEach(iframe => {
        wrapWithLoader(iframe);
    });

    // ---- Iframes dans .video-cell (grille trailers) ----
    document.querySelectorAll('.video-cell iframe').forEach(iframe => {
        wrapWithLoader(iframe);
    });


    // =====================================================
    //  ANIMATION SCROLL (IntersectionObserver)
    // =====================================================

    const elements = document.querySelectorAll(
        "header, section, .video-cell, table, .table-wrapper"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = entry.target.dataset.delay || "0s";
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05
    });

    elements.forEach((el, index) => {
        el.classList.add("hidden");
        el.dataset.delay = `${index * 0.05}s`;
        observer.observe(el);
    });

});


// =====================================================
//  HELPER : wrapping des iframes injectées dynamiquement
//  (appelé depuis Jscripts2.js après renderTable/renderPlayer)
// =====================================================
function wrapDynamicIframes() {
    document.querySelectorAll('td iframe:not([data-loader-wrapped]), #player-video-container iframe:not([data-loader-wrapped])').forEach(iframe => {
        if (iframe.dataset.loaderWrapped) return;
        iframe.dataset.loaderWrapped = 'true';

        const parent = iframe.closest('td, .video-container, #player-video-container') || iframe.parentNode;
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        const loaderEl = document.createElement('div');
        loaderEl.className = 'loader';
        loaderEl.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;pointer-events:none;';

        parent.appendChild(loaderEl);

        iframe.style.opacity = '0';
        iframe.addEventListener('load', () => {
            loaderEl.remove();
            iframe.style.opacity = '';
            iframe.classList.add('media-loaded');
        }, { once: true });
    });
}

function loadBilibili(el) {
    el.innerHTML = `
        <iframe
            src="//player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1"
            allowfullscreen>
        </iframe>
    `;
    // Lance le loader sur l'iframe Bilibili fraîchement injectée
    setTimeout(wrapDynamicIframes, 0);
}