document.addEventListener("DOMContentLoaded", async () => {

/* ====================================================== */
/*  MENU NAVIGATION - Chargé depuis Data/navigation.json  */
/* ====================================================== */

async function buildNav() {
    try {
        const navigation = await dataManager.load('navigation.json');
        if (!navigation || !navigation.pages) {
            console.error('Navigation data not loaded');
            return;
        }

        const nav = document.querySelector('.site-nav');
        if (!nav) return;

        const isRoot = !window.location.pathname.includes('Autre%20pages') &&
                       !window.location.pathname.includes('Autre pages');
        const prefix = isRoot ? 'Autre pages/' : '';
        const rootPrefix = isRoot ? '' : '../';
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';

        const ul = nav.querySelector('.site-nav__links');
        if (!ul) return;

        navigation.pages.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            if (page.id === 'index') {
                a.href = rootPrefix + 'index.html';
                const isActive = currentFile === 'index.html' || currentFile === '';
                if (isActive) a.setAttribute('aria-current', 'page');
            } else {
                a.href = prefix + page.url;
                if (currentFile === page.url) a.setAttribute('aria-current', 'page');
            }

            a.textContent = page.titre;
            li.appendChild(a);
            ul.appendChild(li);
        });

    } catch (error) {
        console.error('Failed to build navigation:', error);
    }
}

buildNav();

/* ====================================================== */
/*  BURGER MENU MOBILE                                     */
/* ====================================================== */

const burger = document.querySelector('.site-nav__burger');
const navLinks = document.querySelector('.site-nav__links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('open', !expanded);
    });

    document.addEventListener('click', e => {
        if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
            burger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        }
    });
}

/* ====================================================== */
/*  BACK TO TOP                                            */
/* ====================================================== */

const btt = document.getElementById('back-to-top');
if (btt) {
    window.addEventListener('scroll', () => {
        btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ====================================================== */
/*  LOADER POUR LES IMAGES ET LES IFRAMES                 */
/* ====================================================== */

function wrapWithLoader(el) {
    if (el.dataset.loaderWrapped === "true") return;
    el.dataset.loaderWrapped = "true";

    const parent = el.parentElement;
    if (!parent) return;

    if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
    }

    const loaderEl = document.createElement("div");
    loaderEl.className = "loader";
    loaderEl.textContent = "Loading...";
    loaderEl.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none";
    parent.appendChild(loaderEl);

    const loaderStartTime = performance.now();
    el.style.opacity = "0";
    el.style.position = "relative";
    el.style.zIndex = "1";

    let done = false;

    function finish() {
        if (done) return;
        done = true;
        const elapsed = performance.now() - loaderStartTime;
        const wait = Math.max(0, 500 - elapsed);
        setTimeout(() => {
            loaderEl.remove();
            el.style.opacity = "";
            el.style.position = "";
            el.style.zIndex = "";
            el.classList.add("media-loaded");
        }, wait);
    }

    if (el.tagName === "IMG") {
        if (el.complete && el.naturalWidth > 0) { finish(); return; }
        el.addEventListener("load", finish, { once: true });
        el.addEventListener("error", finish, { once: true });
        return;
    }

    if (el.tagName === "IFRAME") {
        el.addEventListener("load", finish, { once: true });
        setTimeout(finish, 15000);
    }
}

document.querySelectorAll("section img").forEach(wrapWithLoader);
document.querySelectorAll("section iframe").forEach(wrapWithLoader);

/* ====================================================== */
/*  ANIMATIONS AU SCROLL                                   */
/* ====================================================== */

const animTargets = document.querySelectorAll(
    "header, section, .video-cell, table, .table-wrapper, .timeline__item, .card"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = entry.target.dataset.delay || "0s";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.05 });

animTargets.forEach((el, i) => {
    el.classList.add("hidden");
    el.dataset.delay = `${i * 0.04}s`;
    observer.observe(el);
});

/* ====================================================== */
/*  ACCORDEONS                                             */
/* ====================================================== */

document.querySelectorAll('.accordion__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panel = btn.nextElementSibling;
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.classList.toggle('open', !expanded);
    });
});

});

/* ====================================================== */
/*  LOADER DES IFRAMES DYNAMIQUES                         */
/* ====================================================== */

function wrapDynamicIframes() {
    const selector = [
        "td iframe:not([data-loader-wrapped])",
        "#player-video-active iframe:not([data-loader-wrapped])",
        ".video-preview iframe:not([data-loader-wrapped])"
    ].join(", ");

    document.querySelectorAll(selector).forEach(iframe => {
        if (iframe.dataset.loaderWrapped === "true") return;
        iframe.dataset.loaderWrapped = "true";

        const parent = iframe.closest("td, .video-container, .video-preview") || iframe.parentElement;
        if (!parent) return;

        if (getComputedStyle(parent).position === "static") parent.style.position = "relative";

        const loaderEl = document.createElement("div");
        loaderEl.className = "loader";
        loaderEl.textContent = "Loading...";
        loaderEl.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none";
        parent.appendChild(loaderEl);

        const start = performance.now();
        iframe.style.opacity = "0";
        let done = false;

        function finish() {
            if (done) return;
            done = true;
            const wait = Math.max(0, 500 - (performance.now() - start));
            setTimeout(() => {
                loaderEl.remove();
                iframe.style.opacity = "";
                iframe.classList.add("media-loaded");
            }, wait);
        }

        iframe.addEventListener("load", finish, { once: true });
        setTimeout(finish, 15000);
    });
}