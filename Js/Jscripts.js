document.addEventListener("DOMContentLoaded", () => {

// =====================================================
//  LOADER POUR LES IMAGES ET LES IFRAMES
// =====================================================

function wrapWithLoader(el) {

    if (el.dataset.loaderWrapped === "true") {
        return;
    }

    el.dataset.loaderWrapped = "true";

    const parent = el.parentElement;

    if (!parent) {
        return;
    }

    if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
    }

    const loaderEl = document.createElement("div");

    loaderEl.className = "loader";

    /*
       Le texte est directement ajouté dans le DOM.

       Il ne dépend donc plus uniquement du pseudo-élément
       CSS .loader::before.
    */
    loaderEl.textContent = "Loading...";

    loaderEl.style.cssText = [
        "position:absolute",
        "top:50%",
        "left:50%",
        "transform:translate(-50%,-50%)",
        "z-index:10",
        "pointer-events:none"
    ].join(";");

    parent.appendChild(loaderEl);

    const loaderStartTime = performance.now();

    el.style.opacity = "0";

    /*
       Ces propriétés sont nécessaires uniquement pour
       empêcher l'iframe de passer devant le loader.
    */
    el.style.position = "relative";
    el.style.zIndex = "1";

    let hasFinishedLoading = false;

    function finishLoading() {

        if (hasFinishedLoading) {
            return;
        }

        hasFinishedLoading = true;

        const minimumDisplayTime = 500;

        const elapsedTime =
            performance.now() - loaderStartTime;

        const remainingTime = Math.max(
            0,
            minimumDisplayTime - elapsedTime
        );

        window.setTimeout(() => {

            loaderEl.remove();

            el.style.opacity = "";
            el.style.position = "";
            el.style.zIndex = "";

            el.classList.add("media-loaded");

        }, remainingTime);
    }

    if (el.tagName === "IMG") {

        /*
           Une image déjà chargée depuis le cache ne
           déclenche pas nécessairement un nouvel événement.
        */
        if (
            el.complete &&
            el.naturalWidth > 0
        ) {
            finishLoading();
            return;
        }

        el.addEventListener(
            "load",
            finishLoading,
            { once: true }
        );

        /*
           En cas d'erreur, le loader est également retiré.
           Il ne reste donc jamais bloqué indéfiniment.
        */
        el.addEventListener(
            "error",
            finishLoading,
            { once: true }
        );

        return;
    }

    if (el.tagName === "IFRAME") {

        el.addEventListener(
            "load",
            finishLoading,
            { once: true }
        );

        /*
           Certains lecteurs externes peuvent ne jamais
           déclencher load en cas de blocage réseau.

           Le délai de sécurité évite un loader permanent.
        */
        window.setTimeout(
            finishLoading,
            15000
        );
    }
}


// =====================================================
//  MÉDIAS PRÉSENTS AU CHARGEMENT DE LA PAGE
// =====================================================

document
    .querySelectorAll("section img")
    .forEach(wrapWithLoader);

document
    .querySelectorAll("section iframe")
    .forEach(wrapWithLoader);


// =====================================================
//  ANIMATIONS AU SCROLL
// =====================================================

const elements = document.querySelectorAll(
    [
        "header",
        "section",
        ".video-cell",
        "table",
        ".table-wrapper"
    ].join(", ")
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.transitionDelay =
                entry.target.dataset.delay || "0s";

            entry.target.classList.add(
                "visible"
            );

            observer.unobserve(
                entry.target
            );
        });
    },

    {
        threshold: 0.05
    }
);

elements.forEach((el, index) => {

    el.classList.add("hidden");

    el.dataset.delay =
        `${index * 0.05}s`;

    observer.observe(el);
});

});

// =====================================================
//  LOADER DES IFRAMES AJOUTÉES DYNAMIQUEMENT
// =====================================================

function wrapDynamicIframes() {

const selector = [

    "td iframe:not([data-loader-wrapped])",

    "#player-video-active " +
    "iframe:not([data-loader-wrapped])",

    ".video-preview " +
    "iframe:not([data-loader-wrapped])"

].join(", ");

document
    .querySelectorAll(selector)
    .forEach(iframe => {

        if (
            iframe.dataset.loaderWrapped ===
            "true"
        ) {
            return;
        }

        iframe.dataset.loaderWrapped =
            "true";

        const parent =

            iframe.closest(
                [
                    "td",
                    ".video-container",
                    ".video-preview"
                ].join(", ")
            )

            ||

            iframe.parentElement;

        if (!parent) {
            return;
        }

        if (
            getComputedStyle(parent).position ===
            "static"
        ) {
            parent.style.position =
                "relative";
        }

        const loaderEl =
            document.createElement("div");

        loaderEl.className =
            "loader";

        /*
           Texte réel dans l'élément.

           Le CSS ne sert plus qu'à le styliser.
        */
        loaderEl.textContent =
            "Loading...";

        loaderEl.style.cssText = [

            "position:absolute",

            "top:50%",

            "left:50%",

            "transform:" +
            "translate(-50%,-50%)",

            "z-index:10",

            "pointer-events:none"

        ].join(";");

        parent.appendChild(loaderEl);

        const loaderStartTime =
            performance.now();

        iframe.style.opacity = "0";

        let hasFinishedLoading =
            false;

        function finishLoading() {

            if (hasFinishedLoading) {
                return;
            }

            hasFinishedLoading =
                true;

            const minimumDisplayTime =
                500;

            const elapsedTime =

                performance.now()

                -

                loaderStartTime;

            const remainingTime =

                Math.max(

                    0,

                    minimumDisplayTime

                    -

                    elapsedTime
                );

            window.setTimeout(() => {

                loaderEl.remove();

                iframe.style.opacity =
                    "";

                iframe.classList.add(
                    "media-loaded"
                );

            }, remainingTime);
        }

        iframe.addEventListener(

            "load",

            finishLoading,

            {
                once: true
            }
        );

        /*
           Sécurité en cas d'échec ou de blocage
           du lecteur externe.
        */
        window.setTimeout(

            finishLoading,

            15000
        );
    });

}
