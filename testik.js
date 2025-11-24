(function () {
    'use strict';
    
    console.log('[BR SCRIPT] v15 Loaded (Original Design + Fixes)');

    // ========================================================================
    // МОДУЛЬ 1: НАВИГАЦИОННАЯ ПАНЕЛЬ (v15)
    // ========================================================================
    try {
        (function() {
            const STORAGE_PREFIX = 'br_panel_v3_';
            
            // --- 1. Технический раздел (Фиолетовый) ---
            const DATA_TECH = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-red.226/', color: '#8B008B' },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-green.227/', color: '#8B008B' },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-blue.228/', color: '#8B008B' },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yellow.229/', color: '#8B008B' },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orange.245/', color: '#8B008B' },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-purple.325/', color: '#8B008B' },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-lime.365/', color: '#8B008B' },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-pink.396/', color: '#8B008B' },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cherry.408/', color: '#8B008B' },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-black.488/', color: '#8B008B' },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-indigo.493/', color: '#8B008B' },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-white.554/', color: '#8B008B' },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-magenta.613/', color: '#8B008B' },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-crimson.653/', color: '#8B008B' },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-gold.660/', color: '#8B008B' },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-azure.701/', color: '#8B008B' },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-platinum.757/', color: '#8B008B' },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-aqua.815/', color: '#8B008B' },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-gray.857/', color: '#8B008B' },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ice.925/', color: '#8B008B' },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chilli.1007/', color: '#8B008B' },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-choco.1048/', color: '#8B008B' },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-moscow.1052/', color: '#8B008B' },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-spb.1095/', color: '#8B008B' },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ufa.1138/', color: '#8B008B' },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-sochi.1248/', color: '#8B008B' },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kazan.1290/', color: '#8B008B' },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-samara.1292/', color: '#8B008B' },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-rostov.1334/', color: '#8B008B' },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-anapa.1416/', color: '#8B008B' },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ekb.1458/', color: '#8B008B' },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnodar.1460/', color: '#8B008B' },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arzamas.1502/', color: '#8B008B' },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novosibirsk.1544/', color: '#8B008B' },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-grozny.1586/', color: '#8B008B' },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-saratov.1628/', color: '#8B008B' },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-omsk.1670/', color: '#8B008B' },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-irkutsk.1712/', color: '#8B008B' },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-volgograd.1758/', color: '#8B008B' },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-voronezh.1800/', color: '#8B008B' },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-belgorod.1840/', color: '#8B008B' },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-makhachkala.1884/', color: '#8B008B' },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladikavkaz.1926/', color: '#8B008B' },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladivostok.1968/', color: '#8B008B' },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kaliningrad.2010/', color: '#8B008B' },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chelyabinsk.2052/', color: '#8B008B' },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnoyarsk.2094/', color: '#8B008B' },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cheboksary.2136/', color: '#8B008B' },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-khabarovsk.2178/', color: '#8B008B' },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-perm.2220/', color: '#8B008B' },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tula.2262/', color: '#8B008B' },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ryazan.2304/', color: '#8B008B' },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-murmansk.2346/', color: '#8B008B' },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-penza.2388/', color: '#8B008B' },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kursk.2430/', color: '#8B008B' },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arkhangelsk.2472/', color: '#8B008B' },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orenburg.2514/', color: '#8B008B' },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kirov.2516/', color: '#8B008B' },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kemerovo.2598/', color: '#8B008B' },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tyumen.2639/', color: '#8B008B' },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tolyatti.2682/', color: '#8B008B' },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ivanovo.2714/', color: '#8B008B' },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-stavropol.2747/', color: '#8B008B' },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-smolensk.2779/', color: '#8B008B' },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-pskov.2811/', color: '#8B008B' },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-bryansk.2843/', color: '#8B008B' },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orel.2875/', color: '#8B008B' },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yaroslavl.2907/', color: '#8B008B' },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-barnaul.2939/', color: '#8B008B' },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-lipetsk.2971/', color: '#8B008B' },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ulyanovsk.3003/', color: '#8B008B' },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yakutsk.3035/', color: '#8B008B' },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tambov.3289/', color: '#8B008B' },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-bratsk.3324/', color: '#8B008B' },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-astrakhan.3359/', color: '#8B008B' },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chita.3394/', color: '#8B008B' },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kostroma.3429/', color: '#8B008B' },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladimir.3464/', color: '#8B008B' },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kaluga.3499/', color: '#8B008B' },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novgorod.3535/', color: '#8B008B' },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-taganrog.3570/', color: '#8B008B' },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vologda.3605/', color: '#8B008B' },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tver.3643/', color: '#8B008B' },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tomsk.3740/', color: '#8B008B' },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-izhevsk.3747/', color: '#8B008B' },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-surgut.3812/', color: '#8B008B' },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-podolsk.3817/', color: '#8B008B' },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-magadan.3912/', color: '#8B008B' },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cherepovets.3978/', color: '#8B008B' },
            ];

            // --- 2. Жалобы на тех (Синий) -> (Сервер-№) ---
            const DATA_TECH_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Сервер-№1-red.1182/', color: '#0000CD' },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Сервер-№2-green.1183/', color: '#0000CD' },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Сервер-№3-blue.1184/', color: '#0000CD' },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Сервер-№4-yellow.1185/', color: '#0000CD' },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Сервер-№5-orange.1186/', color: '#0000CD' },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Сервер-№6-purple.1187/', color: '#0000CD' },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Сервер-№7-lime.1188/', color: '#0000CD' },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Сервер-№8-pink.1189/', color: '#0000CD' },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Сервер-№9-cherry.1190/', color: '#0000CD' },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Сервер-№10-black.1191/', color: '#0000CD' },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Сервер-№11-indigo.1192/', color: '#0000CD' },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Сервер-№12-white.1193/', color: '#0000CD' },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Сервер-№13-magenta.1194/', color: '#0000CD' },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Сервер-№14-crimson.1195/', color: '#0000CD' },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Сервер-№15-gold.1196/', color: '#0000CD' },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Сервер-№16-azure.1197/', color: '#0000CD' },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Сервер-№17-platinum.1198/', color: '#0000CD' },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Сервер-№18-aqua.1199/', color: '#0000CD' },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Сервер-№19-gray.1200/', color: '#0000CD' },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Сервер-№20-ice.1201/', color: '#0000CD' },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Сервер-№21-chilli.1202/', color: '#0000CD' },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Сервер-№22-choco.1203/', color: '#0000CD' },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Сервер-№23-moscow.1204/', color: '#0000CD' },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Сервер-№24-spb.1205/', color: '#0000CD' },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Сервер-№25-ufa.1206/', color: '#0000CD' },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Сервер-№26-sochi.1247/', color: '#0000CD' },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Сервер-№27-kazan.1289/', color: '#0000CD' },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Сервер-№28-samara.1291/', color: '#0000CD' },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Сервер-№29-rostov.1333/', color: '#0000CD' },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Сервер-№30-anapa.1415/', color: '#0000CD' },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Сервер-№31-ekb.1457/', color: '#0000CD' },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Сервер-№32-krasnodar.1459/', color: '#0000CD' },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Сервер-№33-arzamas.1501/', color: '#0000CD' },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Сервер-№34-novosibirsk.1543/', color: '#0000CD' },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Сервер-№35-grozny.1585/', color: '#0000CD' },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Сервер-№36-grozny.1585/', color: '#0000CD' },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Сервер-№37-omsk.1669/', color: '#0000CD' },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Сервер-№38-irkutsk.1711/', color: '#0000CD' },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Сервер-№39-volgograd.1757/', color: '#0000CD' },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Сервер-№40-voronezh.1801/', color: '#0000CD' },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Сервер-№41-belgorod.1841/', color: '#0000CD' },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Сервер-№42-makhachkala.1883/', color: '#0000CD' },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Сервер-№43-vladikavkaz.1925/', color: '#0000CD' },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Сервер-№44-vladivostok.1967/', color: '#0000CD' },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Сервер-№45-kaliningrad.2009/', color: '#0000CD' },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Сервер-№46-chelyabinsk.2051/', color: '#0000CD' },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Сервер-№47-krasnoyarsk.2093/', color: '#0000CD' },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Сервер-№48-cheboksary.2135/', color: '#0000CD' },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Сервер-№49-khabarovsk.2177/', color: '#0000CD' },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Сервер-№50-perm.2219/', color: '#0000CD' },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Сервер-№51-tula.2261/', color: '#0000CD' },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Сервер-№52-ryazan.2303/', color: '#0000CD' },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Сервер-№53-murmansk.2345/', color: '#0000CD' },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Сервер-№54-penza.2387/', color: '#0000CD' },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Сервер-№55-kursk.2429/', color: '#0000CD' },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Сервер-№56-arkhangelsk.2471/', color: '#0000CD' },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Сервер-№57-orenburg.2513/', color: '#0000CD' },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Сервер-№58-kirov.2515/', color: '#0000CD' },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Сервер-№59-kemerovo.2597/', color: '#0000CD' },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Сервер-№60-tuymen.2640/', color: '#0000CD' },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Сервер-№61-tolyatti.2681/', color: '#0000CD' },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Сервер-№62-ivanovo.2713/', color: '#0000CD' },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Сервер-№63-stavropol.2746/', color: '#0000CD' },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Сервер-№64-smolensk.2778/', color: '#0000CD' },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Сервер-№65-pskov.2810/', color: '#0000CD' },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Сервер-№66-bryansk.2842/', color: '#0000CD' },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Сервер-№67-orel.2874/', color: '#0000CD' },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Сервер-№68-yaroslavl.2906/', color: '#0000CD' },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Сервер-№69-barnaul.2938/', color: '#0000CD' },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Сервер-№70-lipetsk.2970/', color: '#0000CD' },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Сервер-№71-ulyanovsk.3002/', color: '#0000CD' },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Сервер-№72-yakutsk.3034/', color: '#0000CD' },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Сервер-№73-tambov.3288/', color: '#0000CD' },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Сервер-№74-bratsk.3323/', color: '#0000CD' },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Сервер-№75-astrakhan.3358/', color: '#0000CD' },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Сервер-№76-chita.3393/', color: '#0000CD' },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Сервер-№77-kostroma.3428/', color: '#0000CD' },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Сервер-№78-vladimir.3463/', color: '#0000CD' },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Сервер-№79-kaluga.3498/', color: '#0000CD' },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Сервер-№80-novgorod.3533/', color: '#0000CD' },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Сервер-№81-taganrog.3569/', color: '#0000CD' },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Сервер-№82-vologda.3604/', color: '#0000CD' },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Сервер-№83-tver.3642/', color: '#0000CD' },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Сервер-№84-tomsk.3739/', color: '#0000CD' },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Сервер-№85-izhevsk.3746/', color: '#0000CD' },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Сервер-№86-surgut.3811/', color: '#0000CD' },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Сервер-№87-podolsk.3816/', color: '#0000CD' },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Сервер-№88-magadan.3911/', color: '#0000CD' },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Сервер-№89-cherepovets.3946/', color: '#0000CD' },
            ];

            // --- 3. Жалобы на игроков (Красный) ---
            const DATA_PLAYER_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.88/', color: '#DC143C' },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.119/', color: '#DC143C' },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.156/', color: '#DC143C' },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.194/', color: '#DC143C' },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.273/', color: '#DC143C' },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.312/', color: '#DC143C' },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.352/', color: '#DC143C' },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.394/', color: '#DC143C' },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.435/', color: '#DC143C' },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.470/', color: '#DC143C' },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.519/', color: '#DC143C' },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.560/', color: '#DC143C' },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.599/', color: '#DC143C' },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.640/', color: '#DC143C' },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.682/', color: '#DC143C' },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.723/', color: '#DC143C' },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.785/', color: '#DC143C' },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.844/', color: '#DC143C' },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.885/', color: '#DC143C' },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.954/', color: '#DC143C' },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.994/', color: '#DC143C' },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1036/', color: '#DC143C' },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1082/', color: '#DC143C' },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1124/', color: '#DC143C' },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1167/', color: '#DC143C' },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1234/', color: '#DC143C' },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1276/', color: '#DC143C' },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1320/', color: '#DC143C' },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1362/', color: '#DC143C' },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1402/', color: '#DC143C' },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1444/', color: '#DC143C' },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1488/', color: '#DC143C' },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1531/', color: '#DC143C' },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1572/', color: '#DC143C' },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1614/', color: '#DC143C' },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1656/', color: '#DC143C' },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1698/', color: '#DC143C' },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1740/', color: '#DC143C' },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1786/', color: '#DC143C' },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1828/', color: '#DC143C' },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1870/', color: '#DC143C' },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1912/', color: '#DC143C' },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1954/', color: '#DC143C' },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1996/', color: '#DC143C' },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2038/', color: '#DC143C' },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2080/', color: '#DC143C' },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2122/', color: '#DC143C' },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2164/', color: '#DC143C' },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2206/', color: '#DC143C' },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2248/', color: '#DC143C' },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2290/', color: '#DC143C' },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2332/', color: '#DC143C' },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2374/', color: '#DC143C' },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2416/', color: '#DC143C' },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2458/', color: '#DC143C' },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2500/', color: '#DC143C' },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2545/', color: '#DC143C' },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2584/', color: '#DC143C' },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2626/', color: '#DC143C' },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2663/', color: '#DC143C' },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2702/', color: '#DC143C' },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2735/', color: '#DC143C' },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2767/', color: '#DC143C' },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2799/', color: '#DC143C' },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2831/', color: '#DC143C' },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2863/', color: '#DC143C' },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2895/', color: '#DC143C' },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2927/', color: '#DC143C' },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2959/', color: '#DC143C' },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2991/', color: '#DC143C' },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3023/', color: '#DC143C' },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3055/', color: '#DC143C' },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3309/', color: '#DC143C' },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3344/', color: '#DC143C' },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3379/', color: '#DC143C' },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3414/', color: '#DC143C' },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3449/', color: '#DC143C' },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3484/', color: '#DC143C' },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3519/', color: '#DC143C' },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3555/', color: '#DC143C' },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3590/', color: '#DC143C' },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3625/', color: '#DC143C' },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3666/', color: '#DC143C' },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3728/', color: '#DC143C' },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3767/', color: '#DC143C' },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3800/', color: '#DC143C' },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3837/', color: '#DC143C' },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3932/', color: '#DC143C' },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3967/', color: '#DC143C' },
            ];

            const OPS_LINK = { text: 'ОПС', href: 'https://forum.blackrussia.online/threads/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2.312571/', color: '#f59e0b', glow: true };

            const SERVER_LIST = DATA_TECH.map((item, index) => {
                const match = item.text.match(/(.*?) \((\d+)\)/);
                return {
                    id: index + 1,
                    name: match ? match[1] : `Server ${index+1}`,
                    fullName: item.text
                };
            });

            function getSelected() {
                const saved = localStorage.getItem(STORAGE_PREFIX + 'servers');
                return saved ? JSON.parse(saved) : [76, 77, 78, 79, 80];
            }

            function renderMenu() {
                const menu = document.querySelector('.fnp-menu');
                if(!menu) return;
                
                menu.innerHTML = '';
                const selectedIds = getSelected();

                if (selectedIds.length === 0) {
                    const emptyMsg = document.createElement('div');
                    emptyMsg.style.cssText = 'color:#888; text-align:center; padding:10px; font-size:12px;';
                    emptyMsg.textContent = 'Серверы не выбраны. Нажмите настройки.';
                    menu.appendChild(emptyMsg);
                } else {
                    const createBtn = (dataArray, serverId, label) => {
                        const item = dataArray[serverId - 1];
                        if (!item) return null;
                        const a = document.createElement('a');
                        a.className = 'fnp-link';
                        if (window.location.href.includes(item.link)) a.classList.add('active-page');
                        a.href = item.link; a.textContent = label; a.target = '_blank';
                        a.style.borderBottom = `2px solid ${item.color}`;
                        a.addEventListener('pointerdown', e => e.stopPropagation());
                        return a;
                    };

                    const addGroup = (data, labelPrefix) => {
                        const group = document.createElement('div');
                        group.className = 'fnp-grid';
                        selectedIds.forEach(id => {
                            const btn = createBtn(data, id, labelPrefix + id);
                            if(btn) group.appendChild(btn);
                        });
                        menu.appendChild(group);
                    };

                    // ПОРЯДОК: ЖАЛОБЫ НА ТЕХ (Синие) | ТЕХ РАЗДЕЛ (Фиол) | ЖАЛОБЫ НА ИГРОКОВ (Красн)
                    addGroup(DATA_TECH_COMPLAINT, 'тЖБ');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));
                    addGroup(DATA_TECH, 'Тех');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));
                    addGroup(DATA_PLAYER_COMPLAINT, 'Ж');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));

                    const ops = document.createElement('a');
                    ops.className = 'fnp-link glow';
                    ops.href = OPS_LINK.href; ops.textContent = OPS_LINK.text; ops.target = '_blank';
                    ops.style.borderBottom = `2px solid ${OPS_LINK.color}`;
                    ops.addEventListener('pointerdown', e => e.stopPropagation());
                    menu.appendChild(ops);
                }

                const settingsBtn = document.createElement('div');
                settingsBtn.className = 'fnp-settings-btn';
                settingsBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
                settingsBtn.addEventListener('click', (e) => { e.stopPropagation(); openSettings(); });
                menu.appendChild(settingsBtn);
            }

            function openSettings() {
                const menu = document.querySelector('.fnp-menu');
                const toggleBtn = document.querySelector('.fnp-toggle');
                if(menu) menu.classList.remove('show');
                if(toggleBtn) toggleBtn.classList.remove('active');
                localStorage.setItem(STORAGE_PREFIX + 'state', 'false');

                let overlay = document.querySelector('.fnp-modal-overlay');
                if(!overlay) {
                    overlay = document.createElement('div'); overlay.className = 'fnp-modal-overlay';
                    overlay.innerHTML = `
                        <div class="fnp-modal">
                            <div class="fnp-modal-header">Выбор серверов</div>
                            <div class="fnp-modal-body"></div>
                            <div class="fnp-modal-footer">
                                <button class="fnp-btn fnp-btn-secondary" id="fnp-cancel">Отмена</button>
                                <button class="fnp-btn fnp-btn-primary" id="fnp-save">Сохранить</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(overlay);

                    overlay.querySelector('#fnp-cancel').onclick = () => overlay.classList.remove('open');
                    overlay.querySelector('#fnp-save').onclick = () => {
                        const checked = Array.from(overlay.querySelectorAll('input:checked')).map(el => +el.value).sort((a,b)=>a-b);
                        localStorage.setItem(STORAGE_PREFIX + 'servers', JSON.stringify(checked));
                        renderMenu();
                        overlay.classList.remove('open');
                    };
                }

                const body = overlay.querySelector('.fnp-modal-body');
                body.innerHTML = '';
                const current = getSelected();
                SERVER_LIST.forEach(srv => {
                    const lbl = document.createElement('label');
                    lbl.className = 'fnp-checkbox-label ' + (current.includes(srv.id) ? 'checked' : '');
                    lbl.innerHTML = `<input type="checkbox" value="${srv.id}" ${current.includes(srv.id)?'checked':''}> ${srv.name}`;
                    lbl.querySelector('input').onchange = function() {
                        this.parentElement.classList.toggle('checked', this.checked);
                    };
                    body.appendChild(lbl);
                });

                setTimeout(() => overlay.classList.add('open'), 10);
            }

            // UI SETUP
            const style = document.createElement('style');
            style.textContent = `
                :root { --fnp-btn: 48px; }
                .fnp-wrapper { position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; }
                .fnp-toggle { position: fixed; width: var(--fnp-btn); height: var(--fnp-btn); background: #151515; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; box-shadow: 0 6px 25px rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; color: #fff; cursor: grab; touch-action: none; user-select: none; transition: transform 0.2s; }
                .fnp-toggle:active { transform: scale(0.9); cursor: grabbing; }
                .fnp-toggle.active { background: #2563eb; border-color: #3b82f6; }
                .fnp-toggle.active svg { transform: rotate(45deg); }
                .fnp-menu { position: fixed; background: rgba(20, 20, 20, 0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 10px; display: flex; flex-direction: column; gap: 5px; width: 300px; max-height: 70vh; overflow-y: auto; opacity: 0; visibility: hidden; transform: scale(0.9); transition: opacity 0.2s, transform 0.2s, visibility 0.2s; pointer-events: none; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
                .fnp-menu.show { opacity: 1; visibility: visible; transform: scale(1); pointer-events: auto; }
                .fnp-menu::-webkit-scrollbar { width: 4px; }
                .fnp-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
                .fnp-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
                .fnp-link { display: flex; align-items: center; justify-content: center; padding: 6px 2px; font-family: system-ui, -apple-system, sans-serif; font-size: 10px; font-weight: 700; color: #e5e5e5; text-decoration: none; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid transparent; transition: background 0.1s; white-space: nowrap; }
                .fnp-link:active { background: rgba(255,255,255,0.2); transform: translateY(1px); }
                .fnp-link.active-page { background: rgba(255,255,255,0.2); color: #fff; border-color: rgba(255,255,255,0.3); }
                .fnp-link.glow { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3); }
                .fnp-divider { height: 1px; background: rgba(255,255,255,0.15); margin: 4px 0; width: 100%; }
                .fnp-settings-btn { width: 100%; padding: 8px; margin-top: 5px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #aaa; cursor: pointer; display: flex; justify-content: center; align-items: center; }
                .fnp-settings-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .fnp-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2147483648; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: 0.3s; }
                .fnp-modal-overlay.open { opacity: 1; visibility: visible; }
                .fnp-modal { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; width: 90%; max-width: 500px; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
                .fnp-modal-header { padding: 15px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; color: #fff; font-weight: bold; }
                .fnp-modal-body { padding: 15px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
                .fnp-modal-footer { padding: 15px; border-top: 1px solid #333; display: flex; justify-content: flex-end; gap: 10px; }
                .fnp-checkbox-label { display: flex; align-items: center; gap: 8px; background: #222; padding: 6px; border-radius: 6px; cursor: pointer; user-select: none; color: #ccc; font-size: 12px; border: 1px solid #333; }
                .fnp-checkbox-label:hover { background: #2a2a2a; }
                .fnp-checkbox-label input { accent-color: #2563eb; }
                .fnp-checkbox-label.checked { border-color: #2563eb; background: rgba(37, 99, 235, 0.1); color: #fff; }
                .fnp-btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold; transition: 0.2s; }
                .fnp-btn-primary { background: #2563eb; color: #fff; }
                .fnp-btn-primary:hover { background: #1d4ed8; }
                .fnp-btn-secondary { background: #333; color: #ccc; }
                .fnp-btn-secondary:hover { background: #444; color: #fff; }
            `;
            document.head.appendChild(style);

            const wrapper = document.createElement('div');
            wrapper.className = 'fnp-wrapper';
            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'fnp-toggle';
            toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
            const menu = document.createElement('div');
            menu.className = 'fnp-menu';
            wrapper.appendChild(menu);
            wrapper.appendChild(toggleBtn);
            document.body.appendChild(wrapper);

            // DRAG
            let savedPos = localStorage.getItem(STORAGE_PREFIX + 'pos');
            let pos = savedPos ? JSON.parse(savedPos) : {x: window.innerWidth - 60, y: window.innerHeight * 0.6};
            let isDragging = false;

            const updatePos = (x, y) => {
                pos.x = Math.min(Math.max(0, x), window.innerWidth - 50);
                pos.y = Math.min(Math.max(0, y), window.innerHeight - 50);
                toggleBtn.style.left = pos.x + 'px';
                toggleBtn.style.top = pos.y + 'px';
                
                const rect = toggleBtn.getBoundingClientRect();
                menu.style.left = (rect.right + 310 > window.innerWidth ? rect.left - 310 : rect.right + 10) + 'px';
                menu.style.top = (rect.bottom + 300 > window.innerHeight ? rect.top - 300 : rect.top) + 'px';
            };

            toggleBtn.addEventListener('pointerdown', (e) => {
                isDragging = true;
                toggleBtn.setPointerCapture(e.pointerId);
                toggleBtn.style.transition = 'none';
            });

            toggleBtn.addEventListener('pointermove', (e) => {
                if(!isDragging) return;
                updatePos(e.clientX - 24, e.clientY - 24);
            });

            toggleBtn.addEventListener('pointerup', (e) => {
                isDragging = false;
                toggleBtn.releasePointerCapture(e.pointerId);
                toggleBtn.style.transition = 'all 0.3s';
                pos.x = pos.x < window.innerWidth/2 ? 10 : window.innerWidth - 60;
                updatePos(pos.x, pos.y);
                localStorage.setItem(STORAGE_PREFIX + 'pos', JSON.stringify(pos));
                
                if(Math.abs(e.clientX - 24 - pos.x) < 10) {
                    const show = menu.classList.toggle('show');
                    toggleBtn.classList.toggle('active', show);
                    localStorage.setItem(STORAGE_PREFIX + 'state', show);
                    if(show) updatePos(pos.x, pos.y);
                }
            });

            // INIT
            updatePos(pos.x, pos.y);
            renderMenu();
            if(localStorage.getItem(STORAGE_PREFIX + 'state') === 'true') {
                menu.classList.add('show');
                toggleBtn.classList.add('active');
            }
            
        })();
    } catch (e) { console.error('[BR Script] Panel Error:', e); }

    // ========================================================================
    // МОДУЛЬ 2: КНОПКИ ОТВЕТА (ЧИСТЫЙ JS + HANDLEBARS)
    // ========================================================================
    try {
        (function () {
            if (document.body.dataset.buttonsLoaded) return;
            document.body.dataset.buttonsLoaded = 'true';

            const buttons = [
                {
                    title: 'Приветствие',
                    content: "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" + '[CENTER] текст [/CENTER][/FONT]',
                },
                {
                    title: 'Дубликат',
                    content: "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
                    "[CENTER]Данная тема является дубликатом вашей предыдущей темы, ссылка на тему - <br>Пожалуйста, <b>прекратите создавать идентичные или похожие темы - иначе Ваш форумный аккаунт может быть заблокирован</b>.<br><br>" +
                    '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
                },
                {
                    title: 'Покупка ИВ у бота',
                    content: "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
                    '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                    '[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]Внимательно изучив вашу систему логирования, было выявлено, что бот через (какую систему была передача) передал Вам игровую валюту в размере (размер), данная совокупность действий в полной мере противоречит правилам проекта пункта 2.28, прошу вас настоятельно с ним ознакомиться и впредь не нарушать.[/COLOR][/FONT][/B][/CENTER]<br><br>' +
                    '[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR][/FONT][FONT=verdana]<br>[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][/FONT][B][FONT=verdana]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/FONT][/CENTER]<br>' +
                    '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                    "[CENTER][FONT=Verdana][B]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.<br><br>[/FONT][/B]" +
                    '[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
                },
                {
                    title: 'Покупка ИВ у игрока',
                    content: "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
                    '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                    '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Внимательно изучив вашу систему логирования, было выявлено, что продавец игровой валюты с никнеймом (ник продавца) через (какую систему была передача) передал Вам игровую валюту в размере (размер), данная совокупность действий в полной мере противоречит правилам проекта пункта 2.28, прошу вас настоятельно с ним ознакомиться и впредь не нарушать.[/FONT][/COLOR][/B][/CENTER]<br><br>' +
                    '[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR][/FONT][FONT=verdana]<br>[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][/FONT][B][FONT=verdana]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/FONT][/CENTER]<br>' +
                    '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                    "[CENTER][FONT=Verdana][B]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.<br><br>[/FONT][/B]" +
                    '[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
                },
                {
                    title: 'Игрок не будет заблокирован',
                    content: "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
                    '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                    "[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>Доказательств недостаточно для блокировки игрока[/CENTER]<br><br>" +
                    '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                    "[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Отказано[/COLOR][/FONT][/I][/B][/CENTER]",
                    prefix: 4,
                    status: false
                },
            ];

            const initButtons = () => {
                // Load Handlebars
                const script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js";
                document.head.appendChild(script);
                
                const addBtn = (name, id, style) => {
                    if(document.getElementById(id)) return;
                    const btn = document.createElement('button');
                    btn.className = 'button--primary button rippleButton';
                    btn.id = id;
                    btn.style.cssText = style;
                    btn.textContent = name;
                    
                    const replyBtn = document.querySelector('.button--icon--reply');
                    if(replyBtn) replyBtn.before(btn);
                };

                // Вернул оригинальные стили
                addBtn('На рассмотрение', 'pin', 'border-radius: 20px; margin-right: 11px; border: 2px solid; border-color: rgb(255, 165, 0);');
                addBtn('КП', 'teamProject', 'border-radius: 20px; margin-right: 10px; border: 2px solid; border-color: rgb(255, 255, 0);');
                addBtn('Рассмотрено', 'watched', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 0);');
                addBtn('Отказано', 'unaccept', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0);');
                addBtn('Решено', 'decided', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 0);');
                addBtn('Закрыто', 'closed', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0);');
                addBtn('Тех. спецу', 'techspec', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 0, 255);');
                addBtn('Одобрено', 'odobreno', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(128, 255, 128);');
                
                // Select Answers
                if(!document.getElementById('selectAnswers')) {
                   const ansBtn = document.createElement('button');
                   ansBtn.className = 'button--cta uix_quickReply--button button button--icon button--icon--write rippleButton';
                   ansBtn.id = 'selectAnswers';
                   ansBtn.style.cssText = 'oswald: 3px; margin-left: 5px; margin-top: 1px; border-radius: 13px; background-color: #FF4500; border-color: #E6E6FA';
                   ansBtn.textContent = 'Ответы';
                   const replyBtn = document.querySelector('.button--icon--reply');
                   if(replyBtn) replyBtn.after(ansBtn);
                }

                // LISTENERS (Native JS)
                const click = (id, fn) => {
                    const el = document.getElementById(id);
                    if(el) el.onclick = fn;
                };

                click('unaccept', () => editThreadData(4, false));
                click('pin', () => editThreadData(2, true));
                click('teamProject', () => editThreadData(10, true));
                click('watched', () => editThreadData(9, false));
                click('decided', () => editThreadData(6, false));
                click('closed', () => editThreadData(7, false));
                click('odobreno', () => editThreadData(8, false));
                click('techspec', () => editThreadData(13, true));

                click('selectAnswers', () => {
                    XF.alert(`<div class="select_answer">${buttons.map((btn, i) => 
                        `<button id="answers-${i}" class="button--primary button rippleButton" style="margin:4px; border-radius: 13px;"><span class="button-text">${btn.title}</span></button>`
                    ).join('')}</div>`, null, 'Выберите ответ:');
                    
                    // Wait for modal
                    setTimeout(() => {
                        buttons.forEach((btn, id) => {
                            click(`answers-${id}`, () => pasteContent(id, id > 6));
                        });
                    }, 200);
                });
            };

            const waitButtons = setInterval(() => {
                if(document.querySelector('.button--icon--reply')) {
                    clearInterval(waitButtons);
                    initButtons();
                }
            }, 500);

            function pasteContent(id, send = false) {
                const threadData = getThreadData();
                const template = Handlebars.compile(buttons[id].content);
                const content = template(threadData);
                
                const editor = document.querySelector('.fr-element.fr-view p');
                if(editor) {
                    editor.textContent = '';
                    editor.innerHTML = content;
                }
                
                const closer = document.querySelector('a.overlay-titleCloser');
                if(closer) closer.click();

                if(send) {
                    editThreadData(buttons[id].prefix, buttons[id].status);
                    const reply = document.querySelector('.button--icon.button--icon--reply.rippleButton');
                    if(reply) reply.click();
                }
            }

            function getThreadData() {
                const authorEl = document.querySelector('a.username');
                const authorID = authorEl ? authorEl.getAttribute('data-user-id') : 0;
                const authorName = authorEl ? authorEl.innerText : 'Player';
                const hours = new Date().getHours();
                return {
                    user: { id: authorID, name: authorName, mention: `[USER=${authorID}]${authorName}[/USER]` },
                    greeting: () => 4 < hours && hours <= 11 ? 'Доброе утро' : 11 < hours && hours <= 15 ? 'Добрый день' : 15 < hours && hours <= 21 ? 'Добрый вечер' : 'Доброй ночи',
                };
            }

            function editThreadData(prefix, pin = false) {
                const titleEl = document.querySelector('.p-title-value');
                const threadTitle = titleEl ? titleEl.lastChild.textContent : 'Thread';
                
                const fd = new FormData();
                fd.append('prefix_id', prefix);
                fd.append('title', threadTitle);
                fd.append('_xfToken', XF.config.csrf);
                fd.append('_xfRequestUri', document.URL.split(XF.config.url.fullBase)[1]);
                fd.append('_xfWithData', 1);
                fd.append('_xfResponseType', 'json');
                if(pin) {
                    fd.append('discussion_open', 1);
                    fd.append('sticky', 1);
                }
                fetch(`${document.URL}edit`, { method: 'POST', body: fd }).then(() => location.reload());

                if([9, 7, 6].includes(prefix)) moveThread(prefix, 230);
                if(prefix == 14) moveThread(prefix, 917);
            }

            function moveThread(prefix, type) {
                const titleEl = document.querySelector('.p-title-value');
                const threadTitle = titleEl ? titleEl.lastChild.textContent : 'Thread';
                const fd = new FormData();
                fd.append('prefix_id', prefix);
                fd.append('title', threadTitle);
                fd.append('target_node_id', type);
                fd.append('redirect_type', 'none');
                fd.append('notify_watchers', 1);
                fd.append('starter_alert', 1);
                fd.append('starter_alert_reason', "");
                fd.append('_xfToken', XF.config.csrf);
                fd.append('_xfRequestUri', document.URL.split(XF.config.url.fullBase)[1]);
                fd.append('_xfWithData', 1);
                fd.append('_xfResponseType', 'json');
                fetch(`${document.URL}move`, { method: 'POST', body: fd }).then(() => location.reload());
            }

        })();
    } catch(e) { console.error('[BR Script] Buttons Error:', e); }
})();
