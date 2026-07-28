document.addEventListener("DOMContentLoaded", () => {

// =====================================================
//  ANIMATION LOADER POUR IMAGES ET IFRAMES
// =====================================================

/**
 * Ajoute un loader à un média pendant son chargement.
 */
function wrapWithLoader(el) {
    // Évite d'ajouter plusieurs loaders au même média
    if (el.dataset.loaderWrapped) return;

    el.dataset.loaderWrapped = "true";

    const parent = el.parentNode;

    // Le loader est positionné relativement au parent
    if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
    }

    const loaderEl = document.createElement("div");

    loaderEl.className = "loader";

    loaderEl.style.cssText =
        "position:absolute;" +
        "top:50%;" +
        "left:50%;" +
        "transform:translate(-50%,-50%);" +
        "z-index:2;" +
        "pointer-events:none;";

    parent.appendChild(loaderEl);

    // Cache le média tant que son chargement n'est pas terminé
    el.style.opacity = "0";
    el.style.position = "relative";
    el.style.zIndex = "1";

    function onLoaded() {
        loaderEl.remove();

        el.style.opacity = "";
        el.style.position = "";
        el.style.zIndex = "";

        el.classList.add("media-loaded");
    }

    if (el.tagName === "IMG") {

        // Image déjà présente dans le cache du navigateur
        if (el.complete && el.naturalWidth > 0) {
            onLoaded();
        } else {
            el.addEventListener("load", onLoaded, {
                once: true
            });

            el.addEventListener("error", onLoaded, {
                once: true
            });
        }

    } else if (el.tagName === "IFRAME") {

        el.addEventListener("load", onLoaded, {
            once: true
        });
    }
}


// =====================================================
//  MÉDIAS PRÉSENTS AU CHARGEMENT DE LA PAGE
// =====================================================

// Images présentes dans les sections
document.querySelectorAll("section img").forEach(img => {
    wrapWithLoader(img);
});

// Iframes présentes dans les sections
document.querySelectorAll("section iframe").forEach(iframe => {
    wrapWithLoader(iframe);
});

// Iframes des cellules vidéo
document.querySelectorAll(".video-cell iframe").forEach(iframe => {
    wrapWithLoader(iframe);
});


// =====================================================
//  ANIMATION DES ÉLÉMENTS AU SCROLL
// =====================================================

const elements = document.querySelectorAll(
    "header, section, .video-cell, table, .table-wrapper"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.transitionDelay =
                    entry.target.dataset.delay || "0s";

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.05
    }
);

elements.forEach((el, index) => {

    el.classList.add("hidden");

    el.dataset.delay = `${index * 0.05}s`;

    observer.observe(el);
});

});

// =====================================================
//  LOADER DES IFRAMES AJOUTÉES DYNAMIQUEMENT
// =====================================================

function wrapDynamicIframes() {

const selector = [
    "td iframe:not([data-loader-wrapped])",
    "#player-video-active iframe:not([data-loader-wrapped])"
].join(", ");

document.querySelectorAll(selector).forEach(iframe => {

    if (iframe.dataset.loaderWrapped) return;

    iframe.dataset.loaderWrapped = "true";

    const parent =
        iframe.closest(
            "td, .video-container, #player-video-active"
        ) || iframe.parentNode;

    if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
    }

    const loaderEl = document.createElement("div");

    loaderEl.className = "loader";

    loaderEl.style.cssText =
        "position:absolute;" +
        "top:50%;" +
        "left:50%;" +
        "transform:translate(-50%,-50%);" +
        "z-index:2;" +
        "pointer-events:none;";

    parent.appendChild(loaderEl);

    iframe.style.opacity = "0";

    function onLoaded() {

        loaderEl.remove();

        iframe.style.opacity = "";

        iframe.classList.add("media-loaded");
    }

    iframe.addEventListener(
        "load",
        onLoaded,
        {
            once: true
        }
    );
});

}

// =====================================================
//  CHARGEMENT DU LECTEUR BILIBILI
// =====================================================

function loadBilibili(el) {

el.innerHTML = `
    <iframe
        src="https://player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1"
        allow="autoplay; fullscreen"
        allowfullscreen
        loading="lazy">
    </iframe>
`;

// L'iframe vient d'être créée : le loader doit être ajouté
requestAnimationFrame(wrapDynamicIframes);

}
