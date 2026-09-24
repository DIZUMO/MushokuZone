/* ====================================================== */
/* PLAYER VIDEO + MENU PERSONNAGES                        */
/* ====================================================== */

let EPISODES = {};
const SEASON_LABELS = { s1: 'Saison 1', s2p1: 'Saison 2 — Cour 1', s2p2: 'Saison 2 — Cour 2', s3: 'Saison 3' };
const VIDZY_SEASON_MAP = { s1: 1, s2p1: 2, s2p2: 2, s3: 3 };
const VIDZY_LANGUAGE_MAP = { vo: 'vostfr', vf: 'vf' };
let state = { season: 's1', version: 'vo', player: 'vidzy', epIndex: 0 };

async function loadEpisodesData() {
    try {
        const data = await dataManager.load('episodes.json');
        if (!data || !data.seasons) return false;
        EPISODES = data.seasons;
        return true;
    } catch (error) {
        console.error('Failed to load episodes:', error);
        return false;
    }
}

function currentList() { return EPISODES[state.season]?.[state.version] || []; }
function sibnetSrc(id) { return 'https://video.sibnet.ru/shell.php?videoid=' + id + '&share=0'; }
function uqloadSrc(id) { return 'https://uqload.is/e/' + id; }
const VIDZY_PREFERENCES_KEY = 'mushokuzone-vidzy-preferences';
let vidzyPreferences = loadVidzyPreferences();

function loadVidzyPreferences() {
    try {
        const saved = JSON.parse(localStorage.getItem(VIDZY_PREFERENCES_KEY));
        return { autoplay: Boolean(saved?.autoplay), autonext: Boolean(saved?.autonext) };
    } catch (error) {
        return { autoplay: false, autonext: false };
    }
}
function saveVidzyPreferences() {
    try { localStorage.setItem(VIDZY_PREFERENCES_KEY, JSON.stringify(vidzyPreferences)); } catch (error) { /* stockage indisponible */ }
}
function vidzySrc(season, episode, language) {
    const params = new URLSearchParams();
    if (vidzyPreferences.autoplay) params.set('autoplay', '1');
    if (vidzyPreferences.autonext) params.set('autonext', '1');
    params.set('info', 'title,year,rating,genres,duration,synopsis');
    return `https://vidzy.org/serie/94664/${season}/${episode}/${language}?${params.toString()}`;
}
function vidzyAvailable(ep) { return ep.vidzy !== false; }
function firstAvailableIndex(list) { const i = list.findIndex(ep => state.player === 'vidzy' ? vidzyAvailable(ep) : ep.sibnet || ep.uqload); return i === -1 ? 0 : i; }
function lastAvailableIndex(list) { for (let i = list.length - 1; i >= 0; i--) if (state.player === 'vidzy' ? vidzyAvailable(list[i]) : list[i].sibnet || list[i].uqload) return i; return list.length - 1; }

function setSeason(season) { state.season = season; activateCtrlBtn('[data-season]', '[data-season="' + season + '"]'); state.epIndex = firstAvailableIndex(currentList()); refresh(); }
function setVersion(version) { state.version = version; activateCtrlBtn('[data-version]', '[data-version="' + version + '"]'); state.epIndex = firstAvailableIndex(currentList()); refresh(); }
function setPlayer(player) { state.player = player; activateCtrlBtn('[data-player]', '[data-player="' + player + '"]'); refresh(); }

function activateCtrlBtn(groupSel, targetSel) {
    document.querySelectorAll(groupSel).forEach(btn => {
        const active = btn.matches(targetSel);
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-checked', active ? 'true' : 'false');
    });
}

function refresh() { renderPlayer(); }

function toggleVidzyOption(option) {
    vidzyPreferences[option] = !vidzyPreferences[option];
    saveVidzyPreferences();
    updateVidzyOptions();
    if (state.player === 'vidzy') renderPlayer();
}

function updateVidzyOptions() {
    const panel = document.getElementById('vidzy-options');
    if (!panel) return;
    panel.hidden = state.player !== 'vidzy';
    ['autoplay', 'autonext'].forEach(option => {
        const toggle = document.getElementById('vidzy-' + option + '-toggle');
        if (!toggle) return;
        const enabled = vidzyPreferences[option];
        toggle.classList.toggle('is-on', enabled);
        toggle.setAttribute('aria-checked', String(enabled));
        toggle.querySelector('.vidzy-toggle__state').textContent = enabled ? 'ON' : 'OFF';
    });
}



/* ---- Rendu du lecteur ---- */

function renderPlayer() {
    const list = currentList();
    const ep = list[state.epIndex];
    if (!ep) return;

    document.getElementById('player-season-label').textContent = SEASON_LABELS[state.season];
    document.getElementById('player-ep-title').textContent = ep.title;
    document.getElementById('player-ep-date').textContent = ep.date;
    const special = document.getElementById('player-ep-special');
    special.hidden = !ep.special;
    special.textContent = ep.special ? `Épisode spécial` : '';

    let activeSource = state.player;
    if (activeSource !== 'vidzy' && !ep[activeSource]) {
        const other = activeSource === 'sibnet' ? 'uqload' : 'sibnet';
        if (ep[other]) activeSource = other;
    }

    const container = document.getElementById('player-video-active');
    const sourceLabel = document.getElementById('player-source-label');
    if (activeSource && (activeSource === 'vidzy' ? vidzyAvailable(ep) : ep[activeSource])) {
        const src = activeSource === 'sibnet' ? sibnetSrc(ep.sibnet) : activeSource === 'uqload' ? uqloadSrc(ep.uqload) : vidzySrc(VIDZY_SEASON_MAP[state.season], ep.vidzyEpisode || Number(ep.num), VIDZY_LANGUAGE_MAP[state.version]);
        const attrs = activeSource === 'vidzy' ? 'width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; encrypted-media" allowfullscreen title="Vidzy — Mushoku Tensei"' : 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen';
        container.innerHTML = `<iframe src="${src}" ${attrs}></iframe>`;
        sourceLabel.textContent = activeSource === 'sibnet' ? 'Sibnet' : activeSource === 'uqload' ? 'Uqload' : 'Vidzy';
    } else {
        const message = state.player === 'vidzy' && ep.vidzy === false ? 'Épisode spécial — Indisponible sur Vidzy' : 'Vidéo à venir';
        container.innerHTML = `<div class="player-placeholder"><span>${message}</span></div>`;
        sourceLabel.textContent = state.player === 'vidzy' ? 'Vidzy' : '';
    }

    updatePlayerButtons(ep);
    updateVidzyOptions();
    renderEpisodeSelect(list);
    updateNavButtons(list);
    setTimeout(wrapDynamicIframes, 0);
}

function updatePlayerButtons(ep) {
    const sibnetBtn = document.querySelector('[data-player="sibnet"]');
    const uqloadBtn = document.querySelector('[data-player="uqload"]');
    const vidzyBtn = document.querySelector('[data-player="vidzy"]');
    if (sibnetBtn) sibnetBtn.disabled = !ep.sibnet;
    if (uqloadBtn) uqloadBtn.disabled = !ep.uqload;
    if (vidzyBtn) vidzyBtn.disabled = !vidzyAvailable(ep);
}

function renderEpisodeSelect(list) {
    const select = document.getElementById('ep-select');
    if (!select) return;
    const options = list.map((ep, index) => ({ ep, index })).filter(item => item.ep.sibnet || item.ep.uqload);
    if (!options.length) { select.innerHTML = '<option value="">Aucun épisode disponible</option>'; return; }
    select.innerHTML = options.map(({ ep, index }) => `<option value="${index}"${index === state.epIndex ? ' selected' : ''}>Épisode ${ep.num} — ${ep.title}</option>`).join('');
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
    if (next >= 0 && next < list.length) { state.epIndex = next; renderPlayer(); }
}

function goToEp(index) {
    const parsed = parseInt(index, 10);
    if (isNaN(parsed)) return;
    state.epIndex = parsed;
    renderPlayer();
}

function goToLastAvailable() { goToEp(lastAvailableIndex(currentList())); }

/* ---- Trailers ---- */

function loadBilibili(el) {
    el.innerHTML = `<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1" allowfullscreen></iframe>`;
    setTimeout(wrapDynamicIframes, 0);
}

function loadTwitterEmbed(el) {
    el.innerHTML = `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="de" dir="ltr">Mushoku Tensei Fan animation OP Full Ver <a href="https://t.co/OJVxI5ptUT">pic.twitter.com/OJVxI5ptUT</a></p>&mdash; Lanwen Tuzi Studio (@LanwenTuzStudio) <a href="https://twitter.com/LanwenTuzStudio/status/1758375753543266369">February 16, 2024</a></blockquote>`;
    if (window.twttr && window.twttr.widgets) window.twttr.widgets.load(el);
}

/* ---- Initialisation ---- */

document.addEventListener('DOMContentLoaded', async function () {
    const episodesLoaded = await loadEpisodesData();

    if (episodesLoaded) {
        state.epIndex = firstAvailableIndex(currentList());
        refresh();
    } else {
        console.error('Failed to initialize player: episodes data could not be loaded');
    }
});
