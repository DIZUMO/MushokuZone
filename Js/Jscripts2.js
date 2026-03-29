/* ===================================================== */
/* DONNÉES DES ÉPISODES + LOGIQUE DE NAVIGATION          */
/* ===================================================== */

const EPISODES = {

    s1: {
        vo: [
            { num:'01', title:'Mushoku Tensei', date:'11 jan. 2021', videoId:'4670916' },
            { num:'02', title:'Isshun no Jūryoku', date:'18 jan. 2021', videoId:'4670917' },
            { num:'03', title:'Doryoku no Saki ni', date:'25 jan. 2021', videoId:'4670918' },
            { num:'04', title:'Ushinawareta Mono', date:'1 fév. 2021', videoId:'4670919' },
            { num:'05', title:'Chīsana Hantai', date:'8 fév. 2021', videoId:'4670920' },
            { num:'06', title:'Hajimete no Shigoto', date:'15 fév. 2021', videoId:'4670922' },
            { num:'07', title:'Shōjo no Kokoro', date:'22 fév. 2021', videoId:'4670923' },
            { num:'08', title:'Inochi no Kachi', date:'1 mar. 2021', videoId:'4670925' },
            { num:'09', title:'Mirai wo Kaeru Te', date:'8 mar. 2021', videoId:'4670926' },
            { num:'10', title:'Shirarezaru Otoko', date:'15 mar. 2021', videoId:'4670927' },
            { num:'11', title:'Inochi no Fukami', date:'22 mar. 2021', videoId:'4670928' },
            { num:'12', title:'Mamoritai Mono', date:'29 mar. 2021', videoId:'4670929' },
            { num:'13', title:'Atarashii Sekai', date:'5 avr. 2021', videoId:'4670930' },
            { num:'14', title:'Yakusoku', date:'12 avr. 2021', videoId:'4670931' },
            { num:'15', title:'Murabito no Hazama', date:'19 avr. 2021', videoId:'4670932' },
            { num:'16', title:'Oya no Yasashisa', date:'26 avr. 2021', videoId:'4670933' },
            { num:'17', title:'Chichi no Isan', date:'3 mai 2021', videoId:'4670934' },
            { num:'18', title:'Eiyū no Modori', date:'10 mai 2021', videoId:'4670936' },
            { num:'19', title:'Akarui Mirai e no Ichibu', date:'17 mai 2021', videoId:'4670937' },
            { num:'20', title:'Mirai no Tatakai', date:'24 mai 2021', videoId:'4670938' },
            { num:'21', title:'Atarashii Ketsui', date:'31 mai 2021', videoId:'4670939' },
            { num:'22', title:'Chinmoku no Kusari', date:'7 juin 2021', videoId:'4670940' },
            { num:'23', title:'Eiyū no Imi', date:'14 juin 2021', videoId:'4670942' },
            { num:'24', title:'Épisode Spécial', date:'—', videoId:'4670943' }
        ],
        vf: [
            { num:'01', title:'Réincarnation sans emploi', date:'11 jan. 2021', videoId:'4671027' },
            { num:'02', title:"Le Poids d'une Vie", date:'18 jan. 2021', videoId:'4671030' },
            { num:'03', title:"Au-delà de l'Effort", date:'25 jan. 2021', videoId:'4671032' },
            { num:'04', title:'Ce qui a été Perdu', date:'1 fév. 2021', videoId:'4671036' },
            { num:'05', title:'Une Petite Rébellion', date:'8 fév. 2021', videoId:'4671038' },
            { num:'06', title:'Le Premier Emploi', date:'15 fév. 2021', videoId:'4671041' },
            { num:'07', title:"Le Cœur d'une Jeune Fille", date:'22 fév. 2021', videoId:'4671047' },
            { num:'08', title:"La Valeur d'une Vie", date:'1 mar. 2021', videoId:'4671052' },
            { num:'09', title:"Les Mains qui Changeront l'Avenir", date:'8 mar. 2021', videoId:'4671058' },
            { num:'10', title:"L'Homme Inconnu", date:'15 mar. 2021', videoId:'4671063' },
            { num:'11', title:'La Profondeur de la Vie', date:'22 mar. 2021', videoId:'4671068' },
            { num:'12', title:"Ce que l'on Veut Protéger", date:'29 mar. 2021', videoId:'4671071' },
            { num:'13', title:'Un Nouveau Monde', date:'5 avr. 2021', videoId:'4671075' },
            { num:'14', title:'Une Promesse à Tenir', date:'12 avr. 2021', videoId:'4671078' },
            { num:'15', title:'Aux Marges du Village', date:'19 avr. 2021', videoId:'4671080' },
            { num:'16', title:"La Douceur d'un Parent", date:'26 avr. 2021', videoId:'4671081' },
            { num:'17', title:"L'Héritage d'un Père", date:'3 mai 2021', videoId:'4671084' },
            { num:'18', title:'Le Retour du Héros', date:'10 mai 2021', videoId:'4671086' },
            { num:'19', title:'Le Premier Pas vers un Avenir Radieux', date:'17 mai 2021', videoId:'4671087' },
            { num:'20', title:"Le Combat pour l'Avenir", date:'24 mai 2021', videoId:'4671088' },
            { num:'21', title:'Une Nouvelle Résolution', date:'31 mai 2021', videoId:'4671089' },
            { num:'22', title:'Briser les Chaînes', date:'7 juin 2021', videoId:'4671092' },
            { num:'23', title:"La Signification d'un Héros", date:'14 juin 2021', videoId:'4671095' },
            { num:'24', title:'Épisode Spécial', date:'—', videoId:'5114213' }
        ]
    },

    s2p1: {
    vo: [
        { num:'01', title:'Épisode 1', date:'—', videoId:'5186353' },
        { num:'02', title:'Épisode 2', date:'—', videoId:'5193243' },
        { num:'03', title:'Épisode 3', date:'—', videoId:'5199557' },
        { num:'04', title:'Épisode 4', date:'—', videoId:'5205966' },
        { num:'05', title:'Épisode 5', date:'—', videoId:'5212670' },
        { num:'06', title:'Épisode 6', date:'—', videoId:'5220585' },
        { num:'07', title:'Épisode 7', date:'—', videoId:'5226751' },
        { num:'08', title:'Épisode 8', date:'—', videoId:'5231211' },
        { num:'09', title:'Épisode 9', date:'—', videoId:'5235472' },
        { num:'10', title:'Épisode 10', date:'—', videoId:'5242251' },
        { num:'11', title:'Épisode 11', date:'—', videoId:'5249351' },
        { num:'12', title:'Épisode 12', date:'—', videoId:'5255407' },
        { num:'13', title:'Épisode 13', date:'—', videoId:'5260491' }
    ],
    vf: [
        { num:'01', title:'Épisode 1', date:'—', videoId:'5243279' },
        { num:'02', title:'Épisode 2', date:'—', videoId:'5243289' },
        { num:'03', title:'Épisode 3', date:'—', videoId:'5249507' },
        { num:'04', title:'Épisode 4', date:'—', videoId:'5249510' },
        { num:'05', title:'Épisode 5', date:'—', videoId:'5255614' },
        { num:'06', title:'Épisode 6', date:'—', videoId:'5255616' },
        { num:'07', title:'Épisode 7', date:'—', videoId:'5277735' },
        { num:'08', title:'Épisode 8', date:'—', videoId:'5260626' },
        { num:'09', title:'Épisode 9', date:'—', videoId:'5277737' },
        { num:'10', title:'Épisode 10', date:'—', videoId:'5277740' },
        { num:'11', title:'Épisode 11', date:'—', videoId:'5277751' },
        { num:'12', title:'Épisode 12', date:'—', videoId:'5277762' },
        { num:'13', title:'Épisode 13', date:'—', videoId:'5282423' }
    ]
},
s2p2: {
    vo: [
        { num:'01', title:'Épisode 1', date:'—', videoId:'5496999' },
        { num:'02', title:'Épisode 2', date:'—', videoId:'5504610' },
        { num:'03', title:'Épisode 3', date:'—', videoId:'5512013' },
        { num:'04', title:'Épisode 4', date:'—', videoId:'5518678' },
        { num:'05', title:'Épisode 5', date:'—', videoId:'5526402' },
        { num:'06', title:'Épisode 6', date:'—', videoId:'5533510' },
        { num:'07', title:'Épisode 7', date:'—', videoId:'5546187' },
        { num:'08', title:'Épisode 8', date:'—', videoId:'5552364' },
        { num:'09', title:'Épisode 9', date:'—', videoId:'5558087' },
        { num:'10', title:'Épisode 10', date:'—', videoId:'5565055' },
        { num:'11', title:'Épisode 11', date:'—', videoId:'5573405' },
        { num:'12', title:'Épisode 12', date:'—', videoId:'5581041' }
    ],
    vf: [
        { num:'01', title:'Épisode 1', date:'—', videoId:'5519873' },
        { num:'02', title:'Épisode 2', date:'—', videoId:'5527541' },
        { num:'03', title:'Épisode 3', date:'—', videoId:'5534589' },
        { num:'04', title:'Épisode 4', date:'—', videoId:'5540510' },
        { num:'05', title:'Épisode 5', date:'—', videoId:'5547436' },
        { num:'06', title:'Épisode 6', date:'—', videoId:'5552697' },
        { num:'07', title:'Épisode 7', date:'—', videoId:'5565322' },
        { num:'08', title:'Épisode 8', date:'—', videoId:'5574499' },
        { num:'09', title:'Épisode 9', date:'—', videoId:'5582205' },
        { num:'10', title:'Épisode 10', date:'—', videoId:'5589753' },
        { num:'11', title:'Épisode 11', date:'—', videoId:'5597254' },
        { num:'12', title:'Épisode 12', date:'—', videoId:'5605561' }
    ]
}
};

const SEASON_LABELS = {
    s1:   'Saison 1',
    s2p1: 'Saison 2 — Cour 1',
    s2p2: 'Saison 2 — Cour 2'
};

let state = {
    season:  's1',
    version: 'vo',
    mode:    'table',
    epIndex: 0
};

function currentList() {
    return EPISODES[state.season][state.version];
}

function sibnetSrc(videoId) {
    return 'https://video.sibnet.ru/shell.php?videoid=' + videoId + '&share=0';
}

function setSeason(season) {
    state.season  = season;
    state.epIndex = 0;
    activateCtrlBtn('[data-season]', '[data-season="' + season + '"]');
    refresh();
}

function setVersion(version) {
    state.version = version;
    state.epIndex = 0;
    activateCtrlBtn('[data-version]', '[data-version="' + version + '"]');
    refresh();
}

function setMode(mode) {
    state.mode = mode;
    activateCtrlBtn('[data-mode]', '[data-mode="' + mode + '"]');
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
    if (state.mode === 'table') {
        showTableView();
    } else {
        showPlayerView();
    }
}

function showTableView() {
    document.getElementById('view-table').removeAttribute('hidden');
    document.getElementById('view-player').setAttribute('hidden', '');

    const list = currentList();
    const wrapper = document.getElementById('active-table-wrapper');

    let rows = '';
    list.forEach(ep => {
        rows += `<tr>
            <td>${ep.num}</td>
            <td>${ep.title}</td>
            <td>${ep.date}</td>
            <td>${ep.videoId ? `<iframe src="${sibnetSrc(ep.videoId)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>` : 'Vidéo à venir'}</td>
        </tr>`;
    });

    wrapper.innerHTML = `<table><tbody>${rows}</tbody></table>`;
    setTimeout(wrapDynamicIframes, 0);
}

function showPlayerView() {
    document.getElementById('view-player').removeAttribute('hidden');
    document.getElementById('view-table').setAttribute('hidden', '');
    renderPlayer();
}

function renderPlayer() {
    const list = currentList();
    const ep = list[state.epIndex];

    document.getElementById('player-season-label').textContent = SEASON_LABELS[state.season];
    document.getElementById('player-ep-title').textContent = ep.title;
    document.getElementById('player-ep-date').textContent = ep.date;

    const container = document.getElementById('player-video-container');
    container.innerHTML = ep.videoId
        ? `<iframe src="${sibnetSrc(ep.videoId)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`
        : 'Vidéo à venir';

    renderEpisodeSelect(list);
    setTimeout(wrapDynamicIframes, 0);
}

function renderEpisodeSelect(list) {
    const select = document.getElementById('ep-select');
    if (!select) return;

    select.innerHTML = list.map((ep, index) => {
        const label = `Épisode ${ep.num} — ${ep.title}`;
        return `<option value="${index}"${index === state.epIndex ? ' selected' : ''}>${label}</option>`;
    }).join('');
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
    state.epIndex = index;
    renderPlayer();
}

function loadBilibili(el) {
    el.innerHTML = '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1" allowfullscreen></iframe>';
}

function switchTab(version) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
        if (panel.id === 'panel-' + version) {
            panel.removeAttribute('hidden');
            panel.classList.add('active');
        } else {
            panel.setAttribute('hidden', '');
            panel.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.id === 'tab-' + version;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
}

function loadBilibili(el) {
    el.innerHTML = '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1" allowfullscreen></iframe>';
}

document.addEventListener('DOMContentLoaded', function () {
    refresh();
});