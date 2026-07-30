/* ====================================================== */
/* CONFIG.JS — Configuration globale de MushokuZone       */
/* ====================================================== */

const SITE_CONFIG = {
    nom: 'MushokuZone',
    version: '2.0.0',
    dateMAJ: '2026-07-29',
    description: 'Site documentaire non officiel consacré à Mushoku Tensei.',
    github: 'https://github.com/DIZUMO/MushokuZone',
    url: 'https://dizumo.github.io/MushokuZone/',

    liens: {
        syosetu:    'https://ncode.syosetu.com/n9669bk/',
        animeOffi:  'https://mushokutensei.jp/',
        staffCast:  'https://mushokutensei.jp/staff-cast/',
        mfbooks:    'https://mfbunkoj.jp/',
        kadokawa:   'https://www.kadokawa.co.jp/',
        ann:        'https://www.animenewsnetwork.com/',
        mal:        'https://myanimelist.net/anime/39535/',
        wikipedia:  'https://fr.wikipedia.org/wiki/Mushoku_Tensei:_Isekai_Ittara_Honki_Dasu'
    },

    sources: [
        { nom: "Shōsetsuka ni Narō", url: 'https://ncode.syosetu.com/n9669bk/', type: 'officielle', desc: 'Publication originale du web novel.' },
        { nom: 'MF Books', url: 'https://mfbunkoj.jp/', type: 'officielle', desc: 'Éditeur japonais des light novels.' },
        { nom: 'KADOKAWA', url: 'https://www.kadokawa.co.jp/', type: 'officielle', desc: 'Groupe éditorial responsable de la publication.' },
        { nom: "Site officiel de l'anime", url: 'https://mushokutensei.jp/', type: 'officielle', desc: "Informations concernant l'adaptation animée." },
        { nom: 'Anime News Network', url: 'https://www.animenewsnetwork.com/', type: 'documentaire', desc: 'Utilisé principalement pour les annonces éditoriales et les récompenses.' },
        { nom: 'MyAnimeList', url: 'https://myanimelist.net/anime/39535/', type: 'documentaire', desc: "Utilisé uniquement comme base d'indexation." },
        { nom: 'AniDB', url: 'https://anidb.net/', type: 'documentaire', desc: 'Utilisé pour certaines informations techniques.' }
    ],

    pages: [
        { titre: 'Accueil',      url: '../index.html',               icone: '🏠' },
        { titre: 'Biographie',   url: 'Biographie.html',             icone: '📖' },
        { titre: 'Impact',       url: 'Impact.html',                 icone: '🌟' },
        { titre: 'Univers',      url: 'Univers.html',                icone: '🗺️' },
        { titre: 'Personnages',  url: 'Personnages.html',            icone: '👥' },
        { titre: 'Chronologie',  url: 'Chronologie.html',            icone: '📅' },
        { titre: 'Épisodes',     url: 'Episode.html',                icone: '▶️' },
        { titre: 'Sources',      url: 'Sources.html',                icone: '📚' },
        { titre: 'À propos',     url: 'A-propos.html',               icone: 'ℹ️' }
    ]
};

if (typeof module !== 'undefined') module.exports = SITE_CONFIG;
