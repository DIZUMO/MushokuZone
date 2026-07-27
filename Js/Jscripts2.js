/* ====================================================== */
/* DONNÉES DES ÉPISODES + LOGIQUE DE NAVIGATION           */
/* ====================================================== */

const EPISODES = {

    s1: {
        vo: [
            { num:'01', title:'Mushoku Tensei', date:'11 jan. 2021', sibnet:'4670916', uqload:'' },
            { num:'02', title:'Isshun no Jūryoku', date:'18 jan. 2021', sibnet:'4670917', uqload:'' },
            { num:'03', title:'Doryoku no Saki ni', date:'25 jan. 2021', sibnet:'4670918', uqload:'' },
            { num:'04', title:'Ushinawareta Mono', date:'1 fév. 2021', sibnet:'4670919', uqload:'' },
            { num:'05', title:'Chīsama Hantai', date:'8 fév. 2021', sibnet:'4670920', uqload:'' },
            { num:'06', title:'Hajimete no Shigoto', date:'15 fév. 2021', sibnet:'4670922', uqload:'' },
            { num:'07', title:'Shōjo no Kokoro', date:'22 fév. 2021', sibnet:'4670923', uqload:'' },
            { num:'08', title:'Inochi no Kachi', date:'1 mar. 2021', sibnet:'4670925', uqload:'' },
            { num:'09', title:'Mirai wo Kaeru Te', date:'8 mar. 2021', sibnet:'4670926', uqload:'' },
            { num:'10', title:'Shirarezaru Otoko', date:'15 mar. 2021', sibnet:'4670927', uqload:'' },
            { num:'11', title:'Inochi no Fukami', date:'22 mar. 2021', sibnet:'4670928', uqload:'' },
            { num:'12', title:'Mamoritai Mono', date:'4 oct. 2021', sibnet:'4670929', uqload:'' },
            { num:'13', title:'Atarashii Sekai', date:'11 oct. 2021', sibnet:'4670930', uqload:'' },
            { num:'14', title:'Yakusoku', date:'18 oct. 2021', sibnet:'4670931', uqload:'' },
            { num:'15', title:'Murabito no Hazama', date:'25 oct. 2021', sibnet:'4670932', uqload:'' },
            { num:'16', title:'Oya no Yasashisa', date:'1 nov. 2021', sibnet:'4670933', uqload:'' },
            { num:'17', title:'Chichi no Isan', date:'8 nov. 2021', sibnet:'4670934', uqload:'' },
            { num:'18', title:'Eiyū no Modori', date:'15 nov. 2021', sibnet:'4670936', uqload:'' },
            { num:'19', title:'Akarui Mirai e no Ichibu', date:'22 nov. 2021', sibnet:'4670937', uqload:'' },
            { num:'20', title:'Mirai no Tatakai', date:'29 nov. 2021', sibnet:'4670938', uqload:'' },
            { num:'21', title:'Atarashii Ketsui', date:'6 déc. 2021', sibnet:'4670939', uqload:'' },
            { num:'22', title:'Chinmoku no Kusari', date:'13 déc. 2021', sibnet:'4670940', uqload:'' },
            { num:'23', title:'Eiyū no Imi', date:'20 déc. 2021', sibnet:'4670942', uqload:'' },
            { num:'24', title:'Épisode Spécial', date:'—', sibnet:'4670943', uqload:'' }
        ],
        vf: [
            { num:'01', title:'Réincarnation sans emploi', date:'—', sibnet:'4671027', uqload:'' },
            { num:'02', title:"Le Poids d'une Vie", date:'—', sibnet:'4671030', uqload:'' },
            { num:'03', title:"Au-delà de l'Effort", date:'—', sibnet:'4671032', uqload:'' },
            { num:'04', title:'Ce qui a été Perdu', date:'—', sibnet:'4671036', uqload:'' },
            { num:'05', title:'Une Petite Rébellion', date:'—', sibnet:'4671038', uqload:'' },
            { num:'06', title:'Le Premier Emploi', date:'—', sibnet:'4671041', uqload:'' },
            { num:'07', title:"Le Cœur d'une Jeune Fille", date:'—', sibnet:'4671047', uqload:'' },
            { num:'08', title:"La Valeur d'une Vie", date:'—', sibnet:'4671052', uqload:'' },
            { num:'09', title:"Les Mains qui Changeront l'Avenir", date:'—', sibnet:'4671058', uqload:'' },
            { num:'10', title:"L'Homme Inconnu", date:'—', sibnet:'4671063', uqload:'' },
            { num:'11', title:'La Profondeur de la Vie', date:'—', sibnet:'4671068', uqload:'' },
            { num:'12', title:"Ce que l'on Veut Protéger", date:'—', sibnet:'4671071', uqload:'' },
            { num:'13', title:'Un Nouveau Monde', date:'—', sibnet:'4671075', uqload:'' },
            { num:'14', title:'Une Promesse à Tenir', date:'—', sibnet:'4671078', uqload:'' },
            { num:'15', title:'Aux Marges du Village', date:'—', sibnet:'4671080', uqload:'' },
            { num:'16', title:"La Douceur d'un Parent", date:'—', sibnet:'4671081', uqload:'' },
            { num:'17', title:"L'Héritage d'un Père", date:'—', sibnet:'4671084', uqload:'' },
            { num:'18', title:'Le Retour du Héros', date:'—', sibnet:'4671086', uqload:'' },
            { num:'19', title:'Le Premier Pas vers un Avenir Radieux', date:'—', sibnet:'4671087', uqload:'' },
            { num:'20', title:"Le Combat pour l'Avenir", date:'—', sibnet:'4671088', uqload:'' },
            { num:'21', title:'Une Nouvelle Résolution', date:'—', sibnet:'4671089', uqload:'' },
            { num:'22', title:'Briser les Chaînes', date:'—', sibnet:'4671092', uqload:'' },
            { num:'23', title:"La Signification d'un Héros", date:'—', sibnet:'4671095', uqload:'' },
            { num:'24', title:'Épisode Spécial', date:'—', sibnet:'5114213', uqload:'' }
        ]
    },

    s2p1: {
        vo: [
            { num:'00', title:'Épisode Spécial', date:'2 juil. 2023', sibnet:'5186353', uqload:'' },
            { num:'01', title:'Épisode 1', date:'9 juil. 2023', sibnet:'5193243', uqload:'' },
            { num:'02', title:'Épisode 2', date:'16 juil. 2023', sibnet:'5199557', uqload:'' },
            { num:'03', title:'Épisode 3', date:'23 juil. 2023', sibnet:'5205966', uqload:'' },
            { num:'04', title:'Épisode 4', date:'30 juil. 2023', sibnet:'5212670', uqload:'' },
            { num:'05', title:'Épisode 5', date:'6 août 2023', sibnet:'5220585', uqload:'' },
            { num:'06', title:'Épisode 6', date:'13 août 2023', sibnet:'5226751', uqload:'' },
            { num:'07', title:'Épisode 7', date:'20 août 2023', sibnet:'5231211', uqload:'' },
            { num:'08', title:'Épisode 8', date:'27 août 2023', sibnet:'5235472', uqload:'' },
            { num:'09', title:'Épisode 9', date:'3 sep. 2023', sibnet:'5242251', uqload:'' },
            { num:'10', title:'Épisode 10', date:'10 sep. 2023', sibnet:'5249351', uqload:'' },
            { num:'11', title:'Épisode 11', date:'17 sep. 2023', sibnet:'5255407', uqload:'' },
            { num:'12', title:'Épisode 12', date:'24 sep. 2023', sibnet:'5260491', uqload:'' }
        ],
        vf: [
            { num:'00', title:'Épisode Spécial', date:'—', sibnet:'5243279', uqload:'' },
            { num:'01', title:'Épisode 1', date:'—', sibnet:'5243289', uqload:'' },
            { num:'02', title:'Épisode 2', date:'—', sibnet:'5249507', uqload:'' },
            { num:'03', title:'Épisode 3', date:'—', sibnet:'5249510', uqload:'' },
            { num:'04', title:'Épisode 4', date:'—', sibnet:'5255614', uqload:'' },
            { num:'05', title:'Épisode 5', date:'—', sibnet:'5255616', uqload:'' },
            { num:'06', title:'Épisode 6', date:'—', sibnet:'5277735', uqload:'' },
            { num:'07', title:'Épisode 7', date:'—', sibnet:'5260626', uqload:'' },
            { num:'08', title:'Épisode 8', date:'—', sibnet:'5277737', uqload:'' },
            { num:'09', title:'Épisode 9', date:'—', sibnet:'5277740', uqload:'' },
            { num:'10', title:'Épisode 10', date:'—', sibnet:'5277751', uqload:'' },
            { num:'11', title:'Épisode 11', date:'—', sibnet:'5277762', uqload:'' },
            { num:'12', title:'Épisode 12', date:'—', sibnet:'5282423', uqload:'' }
        ]
    },

    s2p2: {
        vo: [
            { num:'01', title:'Épisode 1', date:'7 avr. 2024', sibnet:'5496999', uqload:'' },
            { num:'02', title:'Épisode 2', date:'14 avr. 2024', sibnet:'5504610', uqload:'' },
            { num:'03', title:'Épisode 3', date:'21 avr. 2024', sibnet:'5512013', uqload:'' },
            { num:'04', title:'Épisode 4', date:'28 avr. 2024', sibnet:'5518678', uqload:'' },
            { num:'05', title:'Épisode 5', date:'5 mai 2024', sibnet:'5526402', uqload:'' },
            { num:'06', title:'Épisode 6', date:'12 mai 2024', sibnet:'5533510', uqload:'' },
            { num:'07', title:'Épisode 7', date:'19 mai 2024', sibnet:'5546187', uqload:'' },
            { num:'08', title:'Épisode 8', date:'26 mai 2024', sibnet:'5552364', uqload:'' },
            { num:'09', title:'Épisode 9', date:'2 juin 2024', sibnet:'5558087', uqload:'' },
            { num:'10', title:'Épisode 10', date:'9 juin 2024', sibnet:'5565055', uqload:'' },
            { num:'11', title:'Épisode 11', date:'16 juin 2024', sibnet:'5573405', uqload:'' },
            { num:'12', title:'Épisode 12', date:'30 juin 2024', sibnet:'5581041', uqload:'' }
        ],
        vf: [
            { num:'01', title:'Épisode 1', date:'—', sibnet:'5519873', uqload:'' },
            { num:'02', title:'Épisode 2', date:'—', sibnet:'5527541', uqload:'' },
            { num:'03', title:'Épisode 3', date:'—', sibnet:'5534589', uqload:'' },
            { num:'04', title:'Épisode 4', date:'—', sibnet:'5540510', uqload:'' },
            { num:'05', title:'Épisode 5', date:'—', sibnet:'5547436', uqload:'' },
            { num:'06', title:'Épisode 6', date:'—', sibnet:'5552697', uqload:'' },
            { num:'07', title:'Épisode 7', date:'—', sibnet:'5565322', uqload:'' },
            { num:'08', title:'Épisode 8', date:'—', sibnet:'5574499', uqload:'' },
            { num:'09', title:'Épisode 9', date:'—', sibnet:'5582205', uqload:'' },
            { num:'10', title:'Épisode 10', date:'—', sibnet:'5589753', uqload:'' },
            { num:'11', title:'Épisode 11', date:'—', sibnet:'5597254', uqload:'' },
            { num:'12', title:'Épisode 12', date:'—', sibnet:'5605561', uqload:'' }
        ]
    },

    s3: {
        vo: [
            { num:'01', title:'Épisode 1', date:'4 juil. 2026', sibnet:'6234365', uqload:'' },
            { num:'02', title:'Épisode 2', date:'4 juil. 2026', sibnet:'6234379', uqload:'' },
            { num:'03', title:'Épisode 3', date:'12 juil. 2026', sibnet:'6240509', uqload:'' },
            { num:'04', title:'Épisode 4', date:'19 juil. 2026', sibnet:'6246320', uqload:'' },
            { num:'05', title:'Épisode 5', date:'26 juil. 2026', sibnet:'', uqload:'qzlvgp9xxz8c' },
            { num:'06', title:'Épisode 6', date:'2 août. 2026', sibnet:'', uqload:'' },
            { num:'07', title:'Épisode 7', date:'9 août 2026', sibnet:'', uqload:'' },
            { num:'08', title:'Épisode 8', date:'16 août 2026', sibnet:'', uqload:'' },
            { num:'09', title:'Épisode 9', date:'23 août 2026', sibnet:'', uqload:'' },
            { num:'10', title:'Épisode 10', date:'30 août 2026', sibnet:'', uqload:'' },
            { num:'11', title:'Épisode 11', date:'6 sep. 2026', sibnet:'', uqload:'' },
            { num:'12', title:'Épisode 12', date:'13 sep. 2026', sibnet:'', uqload:'' }
        ],
        vf: [
            { num:'01', title:'Épisode 1', date:'—', sibnet:'', uqload:'' },
            { num:'02', title:'Épisode 2', date:'—', sibnet:'', uqload:'' },
            { num:'03', title:'Épisode 3', date:'—', sibnet:'', uqload:'' },
            { num:'04', title:'Épisode 4', date:'—', sibnet:'', uqload:'' },
            { num:'05', title:'Épisode 5', date:'—', sibnet:'', uqload:'' },
            { num:'06', title:'Épisode 6', date:'—', sibnet:'', uqload:'' },
            { num:'07', title:'Épisode 7', date:'—', sibnet:'', uqload:'' },
            { num:'08', title:'Épisode 8', date:'—', sibnet:'', uqload:'' },
            { num:'09', title:'Épisode 9', date:'—', sibnet:'', uqload:'' },
            { num:'10', title:'Épisode 10', date:'—', sibnet:'', uqload:'' },
            { num:'11', title:'Épisode 11', date:'—', sibnet:'', uqload:'' },
            { num:'12', title:'Épisode 12', date:'—', sibnet:'', uqload:'' }
        ]
    }
};

const SEASON_LABELS = {
    s1:   'Saison 1',
    s2p1: 'Saison 2 — Cour 1',
    s2p2: 'Saison 2 — Cour 2',
    s3:   'Saison 3'
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

function uqloadSrc(videoId) {
    return 'https://uqload.is/e/' + videoId;
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
        let videoCell = '<div class="video-placeholder">Vidéo à venir</div>';
        
        if (ep.sibnet) {
            videoCell = `<div class="video-sources">
                <iframe src="${sibnetSrc(ep.sibnet)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                <span class="source-label">Sibnet</span>
            </div>`;
        } else if (ep.uqload) {
            videoCell = `<div class="video-sources">
                <iframe src="${uqloadSrc(ep.uqload)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                <span class="source-label">Uqload</span>
            </div>`;
        }

        rows += `<tr>
            <td class="ep-num">${ep.num}</td>
            <td class="ep-title">${ep.title}</td>
            <td class="ep-date">${ep.date}</td>
            <td class="ep-video">${videoCell}</td>
        </tr>`;
    });

    wrapper.innerHTML = `<table><thead><tr><th scope="col">N°</th><th scope="col">Titre</th><th scope="col">Date</th><th scope="col">Vidéo</th></tr></thead><tbody>${rows}</tbody></table>`;
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

    // Lecteur Sibnet (primaire)
    const sibnetContainer = document.getElementById('player-video-sibnet');
    if (ep.sibnet) {
        sibnetContainer.innerHTML = `<iframe src="${sibnetSrc(ep.sibnet)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
        sibnetContainer.parentElement.style.display = 'block';
    } else {
        sibnetContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--color-text-muted);">Vidéo Sibnet à venir</div>';
        sibnetContainer.parentElement.style.display = 'block';
    }

    // Lecteur Uqload (secondaire)
    const uqloadContainer = document.getElementById('player-video-uqload');
    if (ep.uqload) {
        uqloadContainer.innerHTML = `<iframe src="${uqloadSrc(ep.uqload)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
        uqloadContainer.parentElement.style.display = 'block';
    } else {
        uqloadContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--color-text-muted);">Vidéo Uqload à venir</div>';
        uqloadContainer.parentElement.style.display = 'none';
    }

    renderEpisodeSelect(list);
    updateNavButtons(list);
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
    state.epIndex = parseInt(index);
    renderPlayer();
}

function loadBilibili(el) {
    el.innerHTML = '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115200954998720&bvid=BV1miHfzEET2&cid=25861363351&p=1&autoplay=1" allowfullscreen></iframe>';
    setTimeout(wrapDynamicIframes, 0);
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

document.addEventListener('DOMContentLoaded', function () {
    refresh();
});
