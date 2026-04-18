'use strict';

const CARS = [
  { id:1,  code:'23008218', url:'https://www.hasznaltauto.hu/szemelyauto/alfa_romeo/giulietta/alfa_romeo_giulietta_1.4_tb_progression_gyonyoru_garantalt_kilometerti_amo_alfa_romeo_gulietta-23008218', marka:'Alfa Romeo',    modell:'Giulietta',         valtozat:'1.4 TB Progression',                  ev:2010, km:111740,  ar:2390000,  cm3:1368, le:120, uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:2,  code:'22988129', url:'https://www.hasznaltauto.hu/szemelyauto/audi/a1/audi_a1_1.2_tfsi_attraction_friss_muszaki_uj_vezerles_uj_fekek_szep_allapot-22988129', marka:'Audi',           modell:'A1',                valtozat:'1.2 TFSI Attraction',                 ev:2011, km:199760,  ar:2249000,  cm3:1197, le:86,  uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:3,  code:'23001312', url:'https://www.hasznaltauto.hu/szemelyauto/audi/a4/audi_a4_avant_2.0_tdi_sport_edition_s-tronic-23001312', marka:'Audi',           modell:'A4 Avant',          valtozat:'2.0 TDI Sport Edition S-tronic',      ev:2016, km:270000,  ar:4490000,  cm3:1968, le:150, uzemanyag:'Dízel',  valto:'Automata',  tipus:'Kombi',          hibrid:false },
  { id:4,  code:'23004105', url:'https://www.hasznaltauto.hu/szemelyauto/audi/a4/audi_a4_avant_2.0_tdi-23004105', marka:'Audi',           modell:'A4 Avant',          valtozat:'2.0 TDI',                             ev:2012, km:272000,  ar:3499000,  cm3:1968, le:143, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Kombi',          hibrid:false },
  { id:5,  code:'22853694', url:'https://www.hasznaltauto.hu/szemelyauto/audi/a5/audi_a5_sportback_2.0_tdi_5_szemely_s-line-22853694', marka:'Audi',           modell:'A5 Sportback',      valtozat:'2.0 TDI S-Line',                      ev:2015, km:246000,  ar:4999000,  cm3:1968, le:150, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:6,  code:'22604903', url:'https://www.hasznaltauto.hu/szemelyauto/audi/a6/audi_a6_avant_2.0_tdi_ultra_s-tronic-22604903', marka:'Audi',           modell:'A6 Avant',          valtozat:'2.0 TDI ultra S-tronic',              ev:2015, km:248000,  ar:5490000,  cm3:1968, le:190, uzemanyag:'Dízel',  valto:'Automata',  tipus:'Kombi',          hibrid:false },
  { id:7,  code:'22980551', url:'https://www.hasznaltauto.hu/szemelyauto/audi/a6/audi_a6_avant_2.0_tdi_dpf-22980551', marka:'Audi',           modell:'A6 Avant',          valtozat:'2.0 TDI DPF',                         ev:2013, km:274000,  ar:3990000,  cm3:1968, le:177, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Kombi',          hibrid:false },
  { id:8,  code:'22853478', url:'https://www.hasznaltauto.hu/szemelyauto/bmw/320/bmw_320i_original_181e_km_ot_vizsga_vezetett_szervizkonyv_gyonyoru_allapot_kaschmirbeige-22853478', marka:'BMW',            modell:'320i',              valtozat:'Coupé · Múzeumi · 189 831 km',        ev:1991, km:189831,  ar:8890000,  cm3:1991, le:129, uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:9,  code:'22928496', url:'https://www.hasznaltauto.hu/motor/bmw/c_400_x/bmw_c_400_x_9e_km_magyarorszagi_led_markolatfutes_ulesfutes_friss_muszaki-22928496', marka:'BMW',            modell:'C 400 X',           valtozat:'Motor · 9 286 km · Friss műszaki',    ev:2019, km:9286,    ar:2349000,  cm3:350,  le:0,   uzemanyag:'Benzin', valto:'Automata',  tipus:'Motor',          hibrid:false },
  { id:10, code:'22995532', url:'https://www.hasznaltauto.hu/szemelyauto/dacia/duster/dacia_duster_1.6_access_4x4_garantalt_km_teli-nyari_kerekszett-22995532', marka:'Dacia',          modell:'Duster',            valtozat:'1.6 Access 4×4',                      ev:2011, km:204000,  ar:2980000,  cm3:1598, le:105, uzemanyag:'Benzin', valto:'Manuális',  tipus:'SUV',            hibrid:false },
  { id:11, code:'22921579', url:'https://www.hasznaltauto.hu/szemelyauto/fiat/500/fiat_500c_1.2_8v_lounge_eu6_friss_muszakikeveset_futott_cabrio_indul_a_nyar_irany_a_napsugar-22921579', marka:'Fiat',           modell:'500C',              valtozat:'1.2 8V Lounge EU6 · Cabrio',          ev:2014, km:151275,  ar:2890000,  cm3:1242, le:69,  uzemanyag:'Benzin', valto:'Manuális',  tipus:'Cabrio',         hibrid:false },
  { id:12, code:'22979904', url:'https://www.hasznaltauto.hu/szemelyauto/fiat/500/fiat_500_1.2_8v_lounge_eu6_121e_km_panoramateto_blueme_pdc_multikormany_8_alu-22979904', marka:'Fiat',           modell:'500',               valtozat:'1.2 8V Lounge EU6',                   ev:2015, km:121036,  ar:2789000,  cm3:1242, le:69,  uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:13, code:'22968907', url:'https://www.hasznaltauto.hu/kishaszonjarmu/fiat/ducato/fiat_ducato_2.3_mjet_lwb_3.3_t_euro_6_friss_nagy_szervizvezerles_uj_akkumlatoruj_elso_fekek_komlett-22968907', marka:'Fiat',           modell:'Ducato',            valtozat:'2.3 Mjet LWB 3.3t Euro 6',            ev:2016, km:230332,  ar:6850000,  cm3:2287, le:131, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Haszongépjármű', hibrid:false },
  { id:14, code:'22755585', url:'https://www.hasznaltauto.hu/kishaszonjarmu/ford/f_150/ford_f_150_f150_3.5_4x4_raptor_automata_full_extra_friss_szerviz_uj_vezerles_olajak_szurok_uj_akkumulator-22755585', marka:'Ford',           modell:'F-150 Raptor',      valtozat:'3.5 4×4 · 450 LE · Full extra',       ev:2018, km:138000,  ar:19990000, cm3:3490, le:450, uzemanyag:'Benzin', valto:'Automata',  tipus:'Haszongépjármű', hibrid:false },
  { id:15, code:'22971296', url:'https://www.hasznaltauto.hu/szemelyauto/ford/fiesta/ford_fiesta_1.25_ambiente-22971296', marka:'Ford',           modell:'Fiesta',            valtozat:'1.25 Ambiente',                       ev:2012, km:179000,  ar:1849000,  cm3:1242, le:60,  uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:16, code:'22747518', url:'https://www.hasznaltauto.hu/szemelyauto/ford/focus/ford_focus_1.0_ecoboost_trend_friss_muszaki-garantalt_51847_km-22747518', marka:'Ford',           modell:'Focus',             valtozat:'1.0 EcoBoost Trend · 51 847 km!',     ev:2017, km:51847,   ar:3490000,  cm3:999,  le:101, uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:17, code:'22989547', url:'https://www.hasznaltauto.hu/szemelyauto/honda/civic/honda_civic_1.4_sport_garantalt_km_friss_muszaki-22989547', marka:'Honda',          modell:'Civic',             valtozat:'1.4 Sport',                           ev:2007, km:104000,  ar:1849000,  cm3:1339, le:83,  uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:18, code:'22971213', url:'https://www.hasznaltauto.hu/szemelyauto/honda/cr-v/honda_cr-v_2.0i_executive_garantalt_km_friss_muszaki-22971213', marka:'Honda',          modell:'CR-V',              valtozat:'2.0i Executive',                      ev:2007, km:229000,  ar:2990000,  cm3:1997, le:150, uzemanyag:'Benzin', valto:'Manuális',  tipus:'SUV',            hibrid:false },
  { id:19, code:'22971257', url:'https://www.hasznaltauto.hu/szemelyauto/honda/cr-v/honda_cr-v_2.0i_elegance_automata_garantalt_km_friss_muszaki-22971257', marka:'Honda',          modell:'CR-V',              valtozat:'2.0i Elegance · Automata',            ev:2009, km:101000,  ar:3780000,  cm3:1997, le:150, uzemanyag:'Benzin', valto:'Automata',  tipus:'SUV',            hibrid:false },
  { id:20, code:'22988133', url:'https://www.hasznaltauto.hu/szemelyauto/honda/hr-v/honda_hr-v_1.5_i-mmd_hybrid_advance_ecvt-22988133', marka:'Honda',          modell:'HR-V',              valtozat:'1.5 i-MMD Hybrid Advance eCVT',       ev:2022, km:134000,  ar:8349000,  cm3:1498, le:107, uzemanyag:'Benzin', valto:'Automata',  tipus:'SUV',            hibrid:true  },
  { id:21, code:'22988136', url:'https://www.hasznaltauto.hu/szemelyauto/honda/jazz/honda_jazz_1.3_elegance_cvt_garantalt_km_ulesfutes_kamera_navi-22988136', marka:'Honda',          modell:'Jazz',              valtozat:'1.3 Elegance CVT',                    ev:2016, km:99700,   ar:4490000,  cm3:1318, le:102, uzemanyag:'Benzin', valto:'Automata',  tipus:'Személyautó',    hibrid:false },
  { id:22, code:'22952458', url:'https://www.hasznaltauto.hu/szemelyauto/hyundai/i30/hyundai_i30_cw_1.4i_comfort_friss_muszaki_garantalt_km_multifunkcios_kormanydigitalis_ketzonas_klima-22952458', marka:'Hyundai',        modell:'i30 CW',            valtozat:'1.4i Comfort · Kétzónás klíma',       ev:2015, km:114789,  ar:3490000,  cm3:1396, le:101, uzemanyag:'Benzin', valto:'Manuális',  tipus:'Kombi',          hibrid:false },
  { id:23, code:'22958617', url:'https://www.hasznaltauto.hu/szemelyauto/kia/rio/kia_rio_1.1_crdi_ex_garantalt_84000km-22958617', marka:'Kia',            modell:'Rio',               valtozat:'1.1 CRDi EX · 84 000 km!',            ev:2012, km:84000,   ar:2190000,  cm3:1120, le:75,  uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:24, code:'22926930', url:'https://www.hasznaltauto.hu/szemelyauto/land_rover/discovery_sport/land_rover_discovery_sport_2.0_td4_hse_automata_7_szemelyes-22926930', marka:'Land Rover',     modell:'Discovery Sport',   valtozat:'2.0 TD4 HSE · Automata · 7 személyes',ev:2017, km:153000,  ar:5990000,  cm3:1999, le:179, uzemanyag:'Dízel',  valto:'Automata',  tipus:'SUV',            hibrid:false },
  { id:25, code:'22988108', url:'https://www.hasznaltauto.hu/szemelyauto/land_rover/range_rover_sport/land_rover_range_rover_sport_rangesport_4.4_sdv8_hse_dynamic_automata_garantalt_km-22988108', marka:'Land Rover',     modell:'Range Rover Sport', valtozat:'4.4 SDV8 HSE Dynamic · 340 LE',       ev:2015, km:198700,  ar:9490000,  cm3:4367, le:340, uzemanyag:'Dízel',  valto:'Automata',  tipus:'SUV',            hibrid:false },
  { id:26, code:'22921323', url:'https://www.hasznaltauto.hu/szemelyauto/mazda/cx-5/mazda_cx-5_2.2_cd_takumi_friss_muszaki-garantalt_kmulesfutes_kameranavi-22921323', marka:'Mazda',          modell:'CX-5',              valtozat:'2.2 CD Takumi · Navi · Kamera',       ev:2017, km:238164,  ar:4890000,  cm3:2184, le:150, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'SUV',            hibrid:false },
  { id:27, code:'22978176', url:'https://www.hasznaltauto.hu/szemelyauto/mercedes-benz/b_180/mercedes-benz_b_180_cdi_blueefficiency_garantalt_km_rendszeresen_szervizelt-22978176', marka:'Mercedes-Benz',  modell:'B 180 CDI',         valtozat:'BlueEFFICIENCY · Garantált km',       ev:2012, km:211994,  ar:3090000,  cm3:1796, le:109, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:28, code:'22874004', url:'https://www.hasznaltauto.hu/szemelyauto/mercedes-benz/s_400/mercedes-benz_s_400_4matic_automata-22874004', marka:'Mercedes-Benz',  modell:'S 400',             valtozat:'4Matic Automata · 333 LE',            ev:2017, km:192963,  ar:11950000, cm3:2996, le:333, uzemanyag:'Benzin', valto:'Automata',  tipus:'Személyautó',    hibrid:false },
  { id:29, code:'22994157', url:'https://www.hasznaltauto.hu/szemelyauto/mitsubishi/lancer/mitsubishi_lancer_1.6_invite_final_edition_garantalt_km_kamera_led-22994157', marka:'Mitsubishi',     modell:'Lancer',            valtozat:'1.6 Invite Final Edition',            ev:2017, km:116000,  ar:3389000,  cm3:1590, le:117, uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:30, code:'22979931', url:'https://www.hasznaltauto.hu/szemelyauto/nissan/juke/nissan_juke_1.6_tekna_99e_km_tolkam_navi_digitklima_tempomat_multikor_8_alufel-22979931', marka:'Nissan',         modell:'Juke',              valtozat:'1.6 Tekna · Navi · Kamera',           ev:2013, km:99802,   ar:3429000,  cm3:1598, le:117, uzemanyag:'Benzin', valto:'Manuális',  tipus:'SUV',            hibrid:false },
  { id:31, code:'22941115', url:'https://www.hasznaltauto.hu/szemelyauto/opel/zafira_tourer/opel_zafira_tourer_1.4_t_active_friss_muszaki-garantalt_kmulesfutes_elso-hatso_parkoloradarfutheto_kormany-22941115', marka:'Opel',           modell:'Zafira Tourer',     valtozat:'1.4 T Active · 7 személyes',          ev:2014, km:167000,  ar:3190000,  cm3:1364, le:120, uzemanyag:'Benzin', valto:'Manuális',  tipus:'MPV',            hibrid:false },
  { id:32, code:'22957526', url:'https://www.hasznaltauto.hu/szemelyauto/renault/megane/renault_megane_1.5_dci_advantage-22957526', marka:'Renault',        modell:'Megane',            valtozat:'1.5 dCi Advantage',                   ev:2012, km:243000,  ar:1549000,  cm3:1461, le:110, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:33, code:'22982625', url:'https://www.hasznaltauto.hu/szemelyauto/renault/scenic/renault_scenic_scenic_1.4_tce_dynamique_keveset_futott_eros_dinamikus_megbizhato_motor-22982625', marka:'Renault',        modell:'Scénic',            valtozat:'1.4 TCe Dynamique',                   ev:2011, km:136600,  ar:1549000,  cm3:1397, le:131, uzemanyag:'Benzin', valto:'Manuális',  tipus:'MPV',            hibrid:false },
  { id:34, code:'22988121', url:'https://www.hasznaltauto.hu/szemelyauto/seat/leon/seat_leon_1.6_cr_tdi_reference-22988121', marka:'Seat',           modell:'Leon',              valtozat:'1.6 CR TDI Reference',                ev:2011, km:217000,  ar:1790000,  cm3:1598, le:105, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:35, code:'22980588', url:'https://www.hasznaltauto.hu/szemelyauto/skoda/octavia/skoda_octavia_combi_2.0_cr_tdi_scr_limited_edition_dsg7-22980588', marka:'Skoda',          modell:'Octavia Combi',     valtozat:'2.0 CR TDI SCR Limited DSG7',         ev:2020, km:240000,  ar:4499000,  cm3:1968, le:150, uzemanyag:'Dízel',  valto:'Automata',  tipus:'Kombi',          hibrid:false },
  { id:36, code:'23001361', url:'https://www.hasznaltauto.hu/szemelyauto/skoda/octavia/skoda_octavia_combi_1.5_tsi_act_sportline-23001361', marka:'Skoda',          modell:'Octavia Combi',     valtozat:'1.5 TSI ACT SportLine',               ev:2021, km:204000,  ar:5499000,  cm3:1498, le:150, uzemanyag:'Benzin', valto:'Manuális',  tipus:'Kombi',          hibrid:false },
  { id:37, code:'22986009', url:'https://www.hasznaltauto.hu/szemelyauto/smart/forfour/smart_forfour_1.1_passion_softouch_garantalt_km_35071_ujszeru_teli_90_gumi_szett_lemezfelnin_disztarcsa-22986009', marka:'Smart',          modell:'Forfour',           valtozat:'1.1 Passion Softouch · 35 071 km!',   ev:2005, km:35071,   ar:1290000,  cm3:1124, le:75,  uzemanyag:'Benzin', valto:'Automata',  tipus:'Személyautó',    hibrid:false },
  { id:38, code:'22940919', url:'https://www.hasznaltauto.hu/potkocsi/tirsan/tirsan_holland_titan_jelsum_nyereg_kamras_friss_muszaki-22940919', marka:'Tirsan',         modell:'Holland Titan',     valtozat:'Nyereg kamrás · Friss műszaki',       ev:2009, km:-1,      ar:1380000,  cm3:0,    le:0,   uzemanyag:'Dízel',  valto:'Manuális',  tipus:'Egyéb',          hibrid:false },
  { id:39, code:'22953185', url:'https://www.hasznaltauto.hu/szemelyauto/toyota/auris/toyota_auris_1.8_hsd_active_my17_trend_automata_keveset_futott_garantalt_kmautomatanavifutheto_elso_ulestempomat-22953185', marka:'Toyota',         modell:'Auris',             valtozat:'1.8 HSD Hybrid · Automata · Navi',    ev:2018, km:114834,  ar:5995000,  cm3:1798, le:99,  uzemanyag:'Benzin', valto:'Automata',  tipus:'Kombi',          hibrid:true  },
  { id:40, code:'23002697', url:'https://www.hasznaltauto.hu/szemelyauto/toyota/aygo/toyota_aygo_1.0_blue_ac_garantalt_km49460-23002697', marka:'Toyota',         modell:'Aygo',              valtozat:'1.0 Blue AC · 49 460 km!',            ev:2008, km:49460,   ar:1250000,  cm3:998,  le:68,  uzemanyag:'Benzin', valto:'Manuális',  tipus:'Személyautó',    hibrid:false },
  { id:41, code:'22945917', url:'https://www.hasznaltauto.hu/szemelyauto/volkswagen/golf_sportsvan/volkswagen_golf_sportsvan_1.4_tsi_bmt_allstar_dsg_friss_muszaki-garantalt_kmulesfutes_elso-hatso_parkoloradar-kormanyfutes-22945917', marka:'Volkswagen',     modell:'Golf Sportsvan',    valtozat:'1.4 TSI BMT Allstar DSG',             ev:2017, km:148963,  ar:4990000,  cm3:1395, le:125, uzemanyag:'Benzin', valto:'Automata',  tipus:'MPV',            hibrid:false },
  { id:42, code:'23002417', url:'https://www.hasznaltauto.hu/szemelyauto/volkswagen/passat/volkswagen_passat_2.0_tdi_scr_business_dsg_garantalt_kmulesfuteskeveset_futott_173440km_2db_gyari_kulcs-23002417', marka:'Volkswagen',     modell:'Passat',            valtozat:'2.0 TDI SCR Business DSG · 190 LE',   ev:2019, km:173440,  ar:5790000,  cm3:1968, le:190, uzemanyag:'Dízel',  valto:'Automata',  tipus:'Személyautó',    hibrid:false },
  { id:43, code:'22911839', url:'https://www.hasznaltauto.hu/szemelyauto/volkswagen/sharan/volkswagen_sharan_2.0_tdi_bmt_scr_comfortline_4motion_dsg_friss_muszaki-garantalt_kmulesfutes_elso-hatso_parkoloradar_navi-22911839', marka:'Volkswagen',     modell:'Sharan',            valtozat:'2.0 TDI 4Motion DSG · 7 személyes',   ev:2017, km:254125,  ar:5990000,  cm3:1968, le:184, uzemanyag:'Dízel',  valto:'Automata',  tipus:'MPV',            hibrid:false },
  { id:44, code:'22984184', url:'https://www.hasznaltauto.hu/szemelyauto/volkswagen/tiguan/volkswagen_tiguan_2.0_cr_tdi_bmt_trendfun_garantalt_km-22984184', marka:'Volkswagen',     modell:'Tiguan',            valtozat:'2.0 CR TDi BMT Trend&Fun',            ev:2012, km:132000,  ar:3979000,  cm3:1968, le:110, uzemanyag:'Dízel',  valto:'Manuális',  tipus:'SUV',            hibrid:false },
  { id:45, code:'22988127', url:'https://www.hasznaltauto.hu/szemelyauto/volkswagen/tiguan/volkswagen_tiguan_1.4_tsi_trendfun_bmt_friss_muszaki-garantalt_km-22988127', marka:'Volkswagen',     modell:'Tiguan',            valtozat:'1.4 TSi Trend&Fun BMT',               ev:2012, km:188207,  ar:3349000,  cm3:1390, le:122, uzemanyag:'Benzin', valto:'Manuális',  tipus:'SUV',            hibrid:false },
  { id:46, code:'22988097', url:'https://www.hasznaltauto.hu/szemelyauto/volkswagen/touareg/volkswagen_touareg_3.0_v6_tdi_bmt_tiptronic_ic_friss_nagy_szerviz-22988097', marka:'Volkswagen',     modell:'Touareg',           valtozat:'3.0 V6 TDI BMT Tiptronic',            ev:2011, km:249300,  ar:4890000,  cm3:2967, le:245, uzemanyag:'Dízel',  valto:'Automata',  tipus:'SUV',            hibrid:false },
];

// ── Brand accent colors ────────────────────────
const BRAND_COLOR = {
  'Alfa Romeo':   '#8B0000',
  'Audi':         '#BB2222',
  'BMW':          '#0F5FA8',
  'Dacia':        '#1E6EC8',
  'Fiat':         '#AA0000',
  'Ford':         '#003499',
  'Honda':        '#CC0000',
  'Hyundai':      '#00287A',
  'Kia':          '#C4172C',
  'Land Rover':   '#1E5C2E',
  'Mazda':        '#900025',
  'Mercedes-Benz':'#1A1A1A',
  'Mitsubishi':   '#BB0000',
  'Nissan':       '#C3002F',
  'Opel':         '#D05A00',
  'Renault':      '#FFCC00',
  'Seat':         '#333333',
  'Skoda':        '#3A8A25',
  'Smart':        '#1A1A1A',
  'Tirsan':       '#555500',
  'Toyota':       '#EB0A1E',
  'Volkswagen':   '#003C88',
};

// ── Formatters ─────────────────────────────────
function fAr(n)  { return n.toLocaleString('hu-HU') + ' Ft'; }
function fKm(n)  { return n < 0 ? '—' : n.toLocaleString('hu-HU') + ' km'; }

// ── hasznaltauto.hu URL — use c.url if set, else disabled ──
function hahuUrl(c) {
  return c.url || null;
}

// ── Car icon SVG ───────────────────────────────
function carSvg(tipus) {
  if (tipus === 'Motor') return `
    <svg viewBox="0 0 100 42" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5">
      <ellipse cx="25" cy="34" rx="8" ry="8"/>
      <ellipse cx="75" cy="34" rx="8" ry="8"/>
      <path d="M17 34 L10 34 L10 18 L20 10 L55 8 L72 14 L83 26 L83 34 L33 34"/>
      <path d="M20 10 L18 26 L55 26 L55 8"/>
    </svg>`;
  if (tipus === 'Kombi' || tipus === 'MPV') return `
    <svg viewBox="0 0 100 42" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5">
      <path d="M8 30 L8 18 L15 10 L80 10 L92 18 L92 30 L8 30Z"/>
      <circle cx="24" cy="33" r="6"/><circle cx="76" cy="33" r="6"/>
      <line x1="15" y1="10" x2="15" y2="28"/><line x1="50" y1="10" x2="50" y2="28"/>
    </svg>`;
  if (tipus === 'SUV') return `
    <svg viewBox="0 0 100 42" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5">
      <path d="M6 30 L6 16 L16 8 L82 8 L94 16 L94 30 L6 30Z"/>
      <circle cx="24" cy="33" r="6"/><circle cx="76" cy="33" r="6"/>
      <line x1="16" y1="8" x2="16" y2="28"/><line x1="52" y1="8" x2="52" y2="28"/>
    </svg>`;
  return `
    <svg viewBox="0 0 100 42" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5">
      <path d="M8 30 L8 20 L18 8 L38 6 L62 6 L80 12 L92 22 L92 30 L8 30Z"/>
      <circle cx="24" cy="33" r="6"/><circle cx="76" cy="33" r="6"/>
      <path d="M18 8 L14 26 M38 6 L36 26 M62 6 L64 26 M80 12 L82 26"/>
    </svg>`;
}

// ── Card HTML (shared, index.html featured grid) ──
function cardHTML(c) {
  const color   = BRAND_COLOR[c.marka] || '#2A7A8C';
  const fuelLbl = c.hibrid ? 'Hibrid' : c.uzemanyag;
  const fuelCls = c.hibrid ? 'badge-hibrid' : (c.uzemanyag === 'Dízel' ? 'badge-dizel' : 'badge-benzin');
  const url     = hahuUrl(c);
  const img     = `img/${c.id}..jpg`;

  return `
<article class="cc" data-id="${c.id}">
  <div class="cc-head">
    <img src="${img}" alt="${c.marka} ${c.modell}" loading="lazy" />
    <div class="cc-head-overlay"></div>
    <div class="cc-head-top">
      <span class="cc-brand-pill" style="background:${color}">${c.marka}</span>
      ${c.hibrid ? `<span class="cc-hibrid">♻ Hibrid</span>` : ''}
    </div>
    <div class="cc-head-bottom">
      <span class="cc-price-top">${fAr(c.ar)}</span>
    </div>
  </div>
  <div class="cc-body">
    <div class="cc-title">
      <h3>${c.modell}</h3>
      <p class="cc-var">${c.valtozat}</p>
    </div>
    <div class="cc-row">
      <span class="cc-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${c.ev}</span>
      <span class="cc-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${fKm(c.km)}</span>
      ${c.le > 0 ? `<span class="cc-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>${c.le} LE</span>` : ''}
    </div>
    <div class="cc-badges">
      <span class="cc-badge ${fuelCls}">${fuelLbl}</span>
      <span class="cc-badge badge-valto">${c.valto}</span>
      ${c.tipus !== 'Személyautó' ? `<span class="cc-badge badge-tipus">${c.tipus}</span>` : ''}
    </div>
    ${url ? `<a href="${url}" target="_blank" rel="noopener" class="cc-btn">
      Megtekintés
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>` : `<a href="tel:+36306684406" class="cc-btn cc-btn-call">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
      Érdeklődöm
    </a>`}
  </div>
</article>`;
}


// ── Sort helper ────────────────────────────────
function sortCars(arr, s) {
  const r = [...arr];
  if      (s === 'ar_asc')  r.sort((a,b) => a.ar - b.ar);
  else if (s === 'ar_desc') r.sort((a,b) => b.ar - a.ar);
  else if (s === 'ev_desc') r.sort((a,b) => b.ev - a.ev);
  else if (s === 'ev_asc')  r.sort((a,b) => a.ev - b.ev);
  else if (s === 'km_asc')  r.sort((a,b) => (a.km < 0 ? 9e9 : a.km) - (b.km < 0 ? 9e9 : b.km));
  else if (s === 'le_desc') r.sort((a,b) => b.le - a.le);
  return r;
}

// ── Featured 8 on index.html ───────────────────
const FEATURED_IDS = [14, 28, 25, 20, 39, 3, 36, 16];

document.addEventListener('DOMContentLoaded', () => {
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = FEATURED_IDS.map(id => CARS.find(c => c.id === id)).filter(Boolean);
    featuredGrid.innerHTML = featured.map(c => cardHTML(c)).join('');
  }
});
