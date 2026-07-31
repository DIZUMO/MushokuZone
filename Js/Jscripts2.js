/* ====================================================== */
/* PLAYER VIDEO - Données chargées depuis episodes.json   */
/* ====================================================== */

let EPISODES = {}; // Chargé dynamiquement
const SEASON_LABELS = {
    s1:   'Saison 1',
    s2p1: 'Saison 2 — Cour 1',
    s2p2: 'Saison 2 — Cour 2',
    s3:   'Saison 3'
};

let state = {
    season:  's1',
    version: 'vo',
    player:  'sibnet',
    epIndex: 0
};

async function loadEpisodesData() {
    try {
        const episodesData = await dataManager.load('episodes.json');
        if (!episodesData || !episodesData.seasons) {
            console.error('Episodes data not loaded');
            return false;
        }
        EPISODES = episodesData.seasons;
        return true;
    } catch (error) {
        console.error('Failed to load episodes:', error);
        return false;
    }
}

function currentList() {
    return EPISODES[state.season]?.[state.version] || [];
}

function sibnetSrc(videoId) {
    return 'https://video.sibnet.ru/shell.php?videoid=' + videoId + '&share=0';
}

function uqloadSrc(videoId) {
    return 'https://uqload.is/e/' + videoId;
}

/* ---- Helpers de disponibilité ---- */

function firstAvailableIndex(list) {
    const idx = list.findIndex(ep => ep.sibnet || ep.uqload);
    return idx === -1 ? 0 : idx;
}

function lastAvailableIndex(list) {
    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].sibnet || list[i].uqload) return i;
    }
    return list.length - 1;
}

/* ---- Contrôles : saison / version / lecteur ---- */

function setSeason(season) {
    state.season  = season;
    activateCtrlBtn('[data-season]', '[data-season="' + season + '"]');
    state.epIndex = firstAvailableIndex(currentList());
    refresh();
}

function setVersion(version) {
    state.version = version;
    activateCtrlBtn('[data-version]', '[data-version="' + version + '"]');
    state.epIndex = firstAvailableIndex(currentList());
    refresh();
}

function setPlayer(player) {
    state.player = player;
    activateCtrlBtn('[data-player]', '[data-player="' + player + '"]');
    refresh();
}

function activateCtrlBtn(groupSel, targetSel) {
    document.querySelectorAll(groupSel).forEach(btn => {
        const isTarget = btn.matches(targetSel);
        btn.classList.toggle('active', isTarget);
        btn.setAttribute('aria-checked', isTarget ? 'true' : 'false');
    });
}

function refresh() {
    renderPlayer();
}

/* ---- Rendu du lecteur ---- */

function renderPlayer() {
    const list = currentList();
    const ep = list[state.epIndex];

    if (!ep) {
        console.warn('No episode at index', state.epIndex);
        return;
    }

    document.getElementById('player-season-label').textContent = SEASON_LABELS[state.season];
    document.getElementById('player-ep-title').textContent = ep.title;
    document.getElementById('player-ep-date').textContent = ep.date;

    // Choix de la source active
    let activeSource = state.player;
    if (!ep[activeSource]) {
        const other = activeSource === 'sibnet' ? 'uqload' : 'sibnet';
        if (ep[other]) activeSource = other;
    }

    const container   = document.getElementById('player-video-active');
    const sourceLabel = document.getElementById('player-source-label');

    if (activeSource && ep[activeSource]) {
        const src = activeSource === 'sibnet' ? sibnetSrc(ep.sibnet) : uqloadSrc(ep.uqload);
        container.innerHTML = `<iframe src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
        sourceLabel.textContent = activeSource === 'sibnet' ? 'Sibnet' : 'Uqload';
    } else {
        container.innerHTML = '<div class="player-placeholder"><span>Vidéo à venir</span></div>';
        sourceLabel.textContent = '';
    }

    updatePlayerButtons(ep);
    renderEpisodeSelect(list);
    updateNavButtons(list);
    setTimeout(wrapDynamicIframes, 0);
}

function updatePlayerButtons(ep) {
    const sibnetBtn = document.querySelector('[data-player="sibnet"]');
    const uqloadBtn = document.querySelector('[data-player="uqload"]');
    if (sibnetBtn) sibnetBtn.disabled = !ep.sibnet;
    if (uqloadBtn) uqloadBtn.disabled = !ep.uqload;
}

function renderEpisodeSelect(list) {
    const select = document.getElementById('ep-select');
    if (!select) return;

    const options = list
        .map((ep, index) => ({ ep, index }))
        .filter(item => item.ep.sibnet || item.ep.uqload);

    if (options.length === 0) {
        select.innerHTML = '<option value="">Aucun épisode disponible</option>';
        return;
    }

    select.innerHTML = options.map(({ ep, index }) => {
        const label = `Épisode ${ep.num} — ${ep.title}`;
        return `<option value="${index}"${index === state.epIndex ? ' selected' : ''}>${label}</option>`;
    }).join('');
}

function updateNavButtons(list) {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (btnPrev) btnPrev.disabled = state.epIndex === 0;
    if (btnNext) btnNext.disabled = state.epIndex === list.length - 1;
}

function navigateEp(delta) {
    const list = currentList();
    const next = state.epIndex + delta;
    if (next >= 0 && next < list.length) {
        state.epIndex = next;
        renderPlayer();
    }
}

function goToEp(index) {
    const parsed = parseInt(index, 10);
    if (isNaN(parsed)) return;
    state.epIndex = parsed;
    renderPlayer();
}

function goToLastAvailable() {
    const list = currentList();
    goToEp(lastAvailableIndex(list));
}

/* ---- Trailers (Bilibili / Twitter) ---- */

function loadBilibili(el) {
    el.innerHTML = `
        <iframe
            src="//player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1"
            allowfullscreen>
        </iframe>
    `;
    setTimeout(wrapDynamicIframes, 0);
}

function loadTwitterEmbed(el) {
    el.innerHTML = `
        <blockquote class="twitter-tweet" data-media-max-width="560">
            <p lang="de" dir="ltr">
                Mushoku Tensei Fan animation OP Full Ver
                <a href="https://t.co/OJVxI5ptUT">pic.twitter.com/OJVxI5ptUT</a>
            </p>
            &mdash; Lanwen Tuzi Studio (@LanwenTuzStudio)
            <a href="https://twitter.com/LanwenTuzStudio/status/1758375753543266369">February 16, 2024</a>
        </blockquote>
    `;
    if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(el);
    }
}

/* ---- Initialisation ---- */

document.addEventListener('DOMContentLoaded', async function () {
    const success = await loadEpisodesData();
    if (success) {
        state.epIndex = firstAvailableIndex(currentList());
        refresh();
    } else {
        console.error('Failed to initialize player: episodes data could not be loaded');
    }
});
