/* ====================================================== */
/* PLAYER VIDEO + MENU PERSONNAGES                        */
/* ====================================================== */

let EPISODES = {};
let CHARACTERS = {};
const SEASON_LABELS = { s1: 'Saison 1', s2p1: 'Saison 2 — Cour 1', s2p2: 'Saison 2 — Cour 2', s3: 'Saison 3' };
let state = { season: 's1', version: 'vo', player: 'sibnet', epIndex: 0 };

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

async function loadCharactersData() {
    try {
        const data = await dataManager.load('characters-detailed.json');
        if (!data || !data.characters) return false;
        CHARACTERS = data.characters;
        return true;
    } catch (error) {
        console.error('Failed to load characters:', error);
        return false;
    }
}

function currentList() { return EPISODES[state.season]?.[state.version] || []; }
function sibnetSrc(id) { return 'https://video.sibnet.ru/shell.php?videoid=' + id + '&share=0'; }
function uqloadSrc(id) { return 'https://uqload.is/e/' + id; }
function firstAvailableIndex(list) { const i = list.findIndex(ep => ep.sibnet || ep.uqload); return i === -1 ? 0 : i; }
function lastAvailableIndex(list) { for (let i = list.length - 1; i >= 0; i--) if (list[i].sibnet || list[i].uqload) return i; return list.length - 1; }

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

/* ======================================================
   MENU INTERACTIF DES PERSONNAGES
   ====================================================== */

function createCharacterMenu() {
    const controls = document.querySelector('.controls-bar');
    if (!controls || document.getElementById('episode-character-menu')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'character-menu-wrapper';
    wrapper.id = 'episode-character-menu';
    wrapper.innerHTML = `
        <div class="ctrl-group character-menu-group">
            <span class="ctrl-label">Personnages</span>
            <button type="button" class="ctrl-btn character-menu-toggle" id="character-menu-toggle" aria-expanded="false" aria-controls="episode-character-panel">
                Personnages <span aria-hidden="true">⌄</span>
            </button>
        </div>
        <div class="character-menu-panel" id="episode-character-panel" hidden aria-label="Liste interactive des personnages">
            <div class="character-menu-panel__header">
                <div><strong>Personnages principaux</strong><p>Accédez directement à leur fiche analytique.</p></div>
                <button type="button" class="character-menu-close" aria-label="Fermer le menu">×</button>
            </div>
            <div class="character-menu-grid" id="character-menu-grid"></div>
        </div>`;

    controls.appendChild(wrapper);
    const toggle = wrapper.querySelector('#character-menu-toggle');
    const panel = wrapper.querySelector('#episode-character-panel');
    const close = wrapper.querySelector('.character-menu-close');

    toggle.addEventListener('click', event => {
        event.stopPropagation();
        const open = !panel.hidden;
        panel.hidden = open;
        toggle.setAttribute('aria-expanded', String(!open));
        toggle.classList.toggle('active', !open);
    });

    close.addEventListener('click', () => {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        toggle.focus();
    });

    document.addEventListener('click', event => {
        if (!wrapper.contains(event.target)) {
            panel.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
        }
    });

    renderCharacterMenu();
}

function renderCharacterMenu() {
    const grid = document.getElementById('character-menu-grid');
    if (!grid) return;

    const order = ['rudeus', 'roxy', 'sylphiette', 'eris'];
    const ids = order.filter(id => CHARACTERS[id]);
    if (!ids.length) {
        grid.innerHTML = '<p class="character-menu-empty">Aucun personnage disponible.</p>';
        return;
    }

    grid.innerHTML = ids.map(id => {
        const character = CHARACTERS[id];
        return `<a class="character-menu-card" href="Personnages.html#personnage-${id}">
            <span class="character-menu-card__icon" aria-hidden="true">${character.icon || '◆'}</span>
            <span class="character-menu-card__info"><strong>${escapeCharacterText(character.name || 'Personnage')}</strong><small>${escapeCharacterText(character.role || 'Personnage')}</small></span>
            <span class="character-menu-card__arrow" aria-hidden="true">›</span>
        </a>`;
    }).join('');
}

function escapeCharacterText(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/* ---- Rendu du lecteur ---- */

function renderPlayer() {
    const list = currentList();
    const ep = list[state.epIndex];
    if (!ep) return;

    document.getElementById('player-season-label').textContent = SEASON_LABELS[state.season];
    document.getElementById('player-ep-title').textContent = ep.title;
    document.getElementById('player-ep-date').textContent = ep.date;

    let activeSource = state.player;
    if (!ep[activeSource]) {
        const other = activeSource === 'sibnet' ? 'uqload' : 'sibnet';
        if (ep[other]) activeSource = other;
    }

    const container = document.getElementById('player-video-active');
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
    const [episodesLoaded] = await Promise.all([loadEpisodesData(), loadCharactersData()]);
    createCharacterMenu();
    if (episodesLoaded) {
        state.epIndex = firstAvailableIndex(currentList());
        refresh();
    } else {
        console.error('Failed to initialize player: episodes data could not be loaded');
    }
});
