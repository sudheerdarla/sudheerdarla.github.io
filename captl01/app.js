/* CAPTL prototype. Simulated data only; state persists in localStorage. Metrics are computed from the fund's own numbers. */
(function () {
  'use strict';

  /* ---------- icons ---------- */
  var P = {
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
    net: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2h12v2"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    chart: '<path d="M3 3v18h18"/><path d="M8 17v-5M12 17V8M16 17v-8M20 17v-3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    life: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    dollar: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', chevd: '<path d="m6 9 6 6 6-6"/>', chevr: '<path d="m9 18 6-6-6-6"/>', chevl: '<path d="m15 18-6-6 6-6"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>', up: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    pen: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>', wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v3h-4a2 2 0 0 0 0 4h4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/>',
    pie: '<path d="M21.2 15.9A10 10 0 1 1 8 2.8"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>', arrup: '<path d="M12 19V5M5 12l7-7 7 7"/>', arrdn: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    stack: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>', plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>', doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    uplus: '<path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>', sort: '<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>', lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', tiles: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>', key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    out: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9"/>', bld: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    flag: '<path d="M4 22V4M4 4h12l-2 4 2 4H4"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/>', bell2: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>',
    water: '<path d="M3 6h18M3 12h12M3 18h6"/>'
  };
  function ic(n, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + P[n] + '</svg>'; }
  var LOGO = '';

  /* ---------- utils ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var CCY = { USD: ['$', 1], EUR: ['€', 0.92], SGD: ['S$', 1.34] };
  function m(n, d) { var c = CCY[S.ccy], v = n * c[1]; d = d == null ? 0 : d; return (v < 0 ? '−' : '') + c[0] + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function x2(n) { return isFinite(n) ? n.toFixed(2) + 'x' : '—'; }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function dF(t) { var d = new Date(t); return MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }
  function ago(t) { var s = (Date.now() - t) / 1000; if (s < 45) return 'just now'; if (s < 3600) return Math.round(s / 60) + 'm ago'; if (s < 86400) return Math.round(s / 3600) + 'h ago'; var d = Math.round(s / 86400); return d < 30 ? (d === 1 ? 'yesterday' : d + ' days ago') : dF(t); }
  function uid() { return Math.random().toString(36).slice(2, 10); }
  function ini(n) { return String(n).split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function avc(n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) | 0; return 'a' + (1 + Math.abs(h) % 5); }
  function av(n, cls) { return '<span class="av ' + avc(n) + (cls ? ' ' + cls : '') + '">' + esc(ini(n)) + '</span>'; }
  function num(v) { var n = parseFloat(String(v).replace(/[^0-9.\-]/g, '')); return isFinite(n) ? n : 0; }
  function sum(a, f) { return a.reduce(function (s, x) { return s + (f ? f(x) : x); }, 0); }
  function day(y, mo, d) { return new Date(y, mo, d, 10).getTime(); }
  var NOW = Date.now(), DAY = 864e5, T = new Date(); var TY = T.getFullYear(), TM = T.getMonth(), TD = T.getDate();
  function rel(d) { return day(TY, TM, TD + d); }

  /* ---------- seed ---------- */
  function seed() {
    var team1 = { Partners: [['Debbie Lewis', 'debbie@abcfirm.com'], ['Marcus Chen', 'marcus@abcfirm.com']], Principals: [['Priya Raman', 'priya@abcfirm.com'], ['Tom Okafor', 'tom@abcfirm.com']], Associates: [['Sara Lindqvist', 'sara@abcfirm.com'], ['Diego Alvarez', 'diego@abcfirm.com']], Analysts: [['Hana Kim', 'hana@abcfirm.com'], ['Leo Martin', 'leo@abcfirm.com']] };
    var prov1 = { 'Fund administrator': [['Meridian Fund Admin', 'ops@meridianfa.com']], 'Legal counsel': [['Harlow & Pike LLP', 'funds@harlowpike.com']], Auditor: [['Northgate Audit', 'engage@northgateaudit.com']], Custodian: [['Bayline Trust Co.', 'custody@baylinetrust.com']] };
    function grp(g) { var o = {}; Object.keys(g).forEach(function (k) { o[k] = g[k].map(function (p) { return { id: uid(), name: p[0], email: p[1] }; }); }); return o; }
    var f1 = {
      id: 'f1', no: '411457', name: 'ABC Firm Seed - 01', short: 'A1', company: 'Leslee Moss', round: 'Seed 1', vintage: 2020, created: day(2020, 4, 10), size: 5000000, type: 'Unit trust', mgmtPct: 3, hurdle: 8, carry: 20,
      alloc: { fees: 90000, opex: 31500, estab: 45000 },
      lps: [
        { id: 'l1', name: 'Brooklyn Simmons', email: 'brooklyns@hotmail.com', kind: 'Individual', commit: 1000000, called: 333334, dist: 1667, st: 'Active', lpac: true },
        { id: 'l2', name: 'Northwind Family Office', email: 'ir@northwindfo.com', kind: 'Family office', commit: 1250000, called: 416666, dist: 2083, st: 'Active', lpac: true },
        { id: 'l3', name: 'Cedar Endowment', email: 'pe@cedarendow.org', kind: 'Endowment', commit: 750000, called: 250000, dist: 1250, st: 'Active', lpac: false }
      ],
      portfolio: [{ id: 'p1', name: 'Lumen Health', sector: 'HealthTech', invested: 250000, value: 310000, at: day(2020, 9, 2) }, { id: 'p2', name: 'Kite Logistics', sector: 'Logistics', invested: 220000, value: 236000, at: day(2021, 1, 18) }, { id: 'p3', name: 'Orbit Pay', sector: 'Fintech', invested: 180000, value: 171000, at: day(2021, 6, 9) }],
      docs: [
        { id: 'd1', name: 'Trust Deed', st: 'uploaded', file: 'ABC_Seed01_Trust_Deed.pdf', at: day(2020, 4, 10) },
        { id: 'd2', name: 'Investment Management Agreement', st: 'uploaded', file: 'ABC_Seed01_IMA_signed.pdf', at: day(2020, 4, 14) },
        { id: 'd3', name: 'Regulatory Approval', st: 'delegated', to: 'Harlow & Pike LLP', at: rel(-6) },
        { id: 'd4', name: 'Q2 2026 LP Report', st: 'uploaded', file: 'Q2_2026_LP_Report.pdf', at: rel(-60) },
        { id: 'd5', name: 'Audited Financials FY2025', st: 'pending', at: rel(-20) }
      ],
      tasks: [
        { id: 't1', title: 'Upload Q3 portfolio valuations', to: 'Priya Raman', due: rel(5), st: 'open' },
        { id: 't2', title: 'Review Lumen Health board pack', to: 'Marcus Chen', due: rel(1), st: 'open' },
        { id: 't3', title: 'Countersign Cedar Endowment side letter', to: 'Debbie Lewis', due: rel(-2), st: 'open' },
        { id: 't4', title: 'Collect regulatory approval', to: 'Harlow & Pike LLP', due: rel(10), st: 'open', doc: 'd3' },
        { id: 't5', title: 'Send capital call 2 notices', to: 'Sara Lindqvist', due: day(2021, 2, 1), st: 'done' }
      ],
      units: [], capStep: 1, issued: null,
      calls: [{ id: 'c1', no: 1, pct: 15, amount: 450000, due: day(2020, 7, 20), st: 'Paid', purpose: 'Investment' }, { id: 'c2', no: 2, pct: 18.33, amount: 550000, due: day(2021, 2, 15), st: 'Paid', purpose: 'Investment' }],
      team: grp(team1), prov: grp(prov1),
      life: [['Fund formed', day(2020, 4, 10)], ['First close', day(2020, 7, 1)], ['Investment period ends', day(2025, 7, 1)], ['Harvest', day(2028, 7, 1)], ['Term ends', day(2030, 7, 1)]]
    };
    var f2 = {
      id: 'f2', no: '415678', name: 'XYZ Firm Seed - 01', short: 'XY', company: 'Clarke Gilbert', round: 'Round 2', vintage: 2020, created: day(2020, 5, 15), size: 12000000, type: 'Limited partnership', mgmtPct: 2, hurdle: 8, carry: 20,
      alloc: { fees: 160000, opex: 60000, estab: 80000 },
      lps: [
        { id: 'm1', name: 'Halcyon Pension Fund', email: 'alts@halcyonpf.com', kind: 'Pension', commit: 3000000, called: 900000, dist: 45000, st: 'Active', lpac: true },
        { id: 'm2', name: 'Ostara Capital', email: 'lp@ostaracap.com', kind: 'Fund of funds', commit: 2500000, called: 750000, dist: 37500, st: 'Active', lpac: true },
        { id: 'm3', name: 'Ravi & Anika Shah', email: 'shahfamily@outlook.com', kind: 'Individual', commit: 1500000, called: 450000, dist: 22500, st: 'Active', lpac: false },
        { id: 'm4', name: 'Pinecrest Foundation', email: 'grants@pinecrest.org', kind: 'Foundation', commit: 1000000, called: 300000, dist: 15000, st: 'Active', lpac: false }
      ],
      portfolio: [{ id: 'q1', name: 'Fernway Robotics', sector: 'Industrial', invested: 600000, value: 820000, at: day(2020, 10, 3) }, { id: 'q2', name: 'Tidepool AI', sector: 'AI', invested: 500000, value: 690000, at: day(2021, 3, 9) }, { id: 'q3', name: 'Copperline Energy', sector: 'Climate', invested: 450000, value: 470000, at: day(2021, 8, 1) }, { id: 'q4', name: 'Nimbus Retail', sector: 'Commerce', invested: 350000, value: 370000, at: day(2022, 1, 12) }],
      docs: [{ id: 'e1', name: 'LP Agreement', st: 'uploaded', file: 'XYZ_Seed01_LPA.pdf', at: day(2020, 5, 15) }, { id: 'e2', name: 'Investment Management Agreement', st: 'uploaded', file: 'XYZ_IMA.pdf', at: day(2020, 5, 20) }, { id: 'e3', name: 'Regulatory Approval', st: 'uploaded', file: 'MAS_approval.pdf', at: day(2020, 6, 2) }],
      tasks: [{ id: 'u1', title: 'Prepare Q3 LP report', to: 'Debbie Lewis', due: rel(12), st: 'open' }],
      units: [{ name: 'Class A', count: 7000, value: 1000, hurdle: 8 }, { name: 'Class B (GP)', count: 100, value: 1000, hurdle: 0 }], capStep: 3,
      issued: { m1: { 'Class A': 3000 }, m2: { 'Class A': 2500 }, m3: { 'Class A': 1500 }, m4: { 'Class A': 0 } },
      calls: [{ id: 'k1', no: 1, pct: 20, amount: 1600000, due: day(2020, 8, 30), st: 'Paid', purpose: 'Investment' }, { id: 'k2', no: 2, pct: 10, amount: 800000, due: day(2022, 0, 31), st: 'Paid', purpose: 'Investment' }],
      team: grp({ Partners: [['Debbie Lewis', 'debbie@abcfirm.com'], ['Clarke Gilbert', 'clarke@xyzfirm.com']], Principals: [['Nora Haddad', 'nora@xyzfirm.com']], Associates: [['Ben Ortiz', 'ben@xyzfirm.com']], Analysts: [] }),
      prov: grp({ 'Fund administrator': [['Meridian Fund Admin', 'ops@meridianfa.com']], 'Legal counsel': [['Harlow & Pike LLP', 'funds@harlowpike.com']], Auditor: [['Northgate Audit', 'engage@northgateaudit.com']], Custodian: [] }),
      life: [['Fund formed', day(2020, 5, 15)], ['First close', day(2020, 8, 1)], ['Investment period ends', day(2025, 8, 1)], ['Harvest', day(2028, 8, 1)], ['Term ends', day(2030, 8, 1)]]
    };
    f2.issued.m4['Class A'] = 1000;
    return {
      v: 2, ccy: 'USD', cur: 'f1', user: { name: 'Debbie Lewis', role: 'General Partner', email: 'debbie@abcfirm.com' },
      funds: [f1, f2],
      act: [
        { f: 'f1', who: 'Harlow & Pike LLP', t: 'opened the delegated Regulatory Approval request', at: NOW - 3 * 3600e3, ic: 'doc' },
        { f: 'f1', who: 'Priya Raman', t: 'updated the Lumen Health valuation to $310,000', at: NOW - 26 * 3600e3, ic: 'chart' },
        { f: 'f2', who: 'Clarke Gilbert', t: 'shared the Q3 board minutes for Fernway Robotics', at: NOW - 2 * DAY, ic: 'doc' },
        { f: 'f1', who: 'Brooklyn Simmons', t: 'signed the updated subscription agreement', at: NOW - 4 * DAY, ic: 'pen' },
        { f: 'f1', who: 'Debbie Lewis', t: 'published “Q2 2026 portfolio update” to all LPs', at: NOW - 60 * DAY, ic: 'send' }
      ],
      posts: [{ id: 'po1', f: 'f1', title: 'Q2 2026 portfolio update', body: 'Lumen Health closed its Series A extension at a 24% step-up. Kite Logistics is on track for break-even in Q4. Orbit Pay is extending runway while it renegotiates its sponsor-bank agreement.\n\nThe full Q2 report is in the document room.', by: 'Debbie Lewis', at: NOW - 60 * DAY, aud: 'All LPs' }],
      events: [{ id: 'ev1', f: 'f1', t: 'LPAC meeting', d: rel(8), k: 'b' }, { id: 'ev2', f: 'f1', t: 'Q3 LP report due', d: rel(16), k: 'r' }, { id: 'ev3', f: 'f2', t: 'Fernway board meeting', d: rel(3), k: 'g' }, { id: 'ev4', f: 'f1', t: 'Annual audit fieldwork', d: rel(22), k: '' }],
      notifs: [{ t: 'Task overdue', sub: 'Countersign Cedar Endowment side letter', at: NOW - 2 * DAY, href: '#/management', read: false }, { t: 'Delegation opened', sub: 'Harlow & Pike LLP opened Regulatory Approval', at: NOW - 3 * 3600e3, href: '#/management', read: false }],
      ui: { fmSort: 'created', fmQ: '', fmRound: '', fmVint: '', netTab: 'team', netView: 'grid', aTab: 'cap', mTab: 'docs', cTab: 'lps', calM: TM, calY: TY, actF: 'all' }
    };
  }
  var KEY = 'captl01', S;
  try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
  if (!S || S.v !== 2) S = seed();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var authed = false; try { authed = sessionStorage.getItem('captl01-auth') === '1'; } catch (e) {}

  /* ---------- derived ---------- */
  function F(id) { return S.funds.filter(function (f) { return f.id === (id || S.cur); })[0] || S.funds[0]; }
  function calc(f) {
    var commit = sum(f.lps, function (l) { return l.commit; }), paid = sum(f.lps, function (l) { return l.called; }), dist = sum(f.lps, function (l) { return l.dist; });
    var inv = sum(f.portfolio, function (p) { return p.invested; }), val = sum(f.portfolio, function (p) { return p.value; });
    var spent = inv + f.alloc.fees + f.alloc.opex + f.alloc.estab, cash = Math.max(0, paid - spent - dist), nav = val + cash;
    var yrs = Math.max(0.5, (Date.now() - f.life[1][1]) / (365.25 * DAY)), tvpi = paid ? (dist + nav) / paid : NaN;
    return { commit: commit, paid: paid, dist: dist, undrawn: commit - paid, inv: inv, val: val, nav: nav, cash: cash, allocated: spent,
      dpi: paid ? dist / paid : NaN, rvpi: paid ? nav / paid : NaN, tvpi: tvpi, moic: inv ? val / inv : NaN, irr: paid ? (Math.pow(tvpi, 1 / yrs) - 1) * 100 : NaN, early: !paid };
  }
  function people(f) { var o = []; Object.keys(f.team).forEach(function (g) { f.team[g].forEach(function (p) { o.push({ name: p.name, email: p.email, g: g }); }); }); Object.keys(f.prov).forEach(function (g) { f.prov[g].forEach(function (p) { o.push({ name: p.name, email: p.email, g: g }); }); }); return o; }
  function openTasks(f) { return f.tasks.filter(function (t) { return t.st === 'open'; }); }

  /* ---------- toasts, modal ---------- */
  function toast(title, msg, opt) {
    opt = opt || {}; var el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status');
    el.innerHTML = '<span class="ti">' + ic(opt.icon || 'check') + '</span><div><b>' + esc(title) + '</b><span>' + esc(msg || '') + '</span></div>' + (opt.href ? '<button type="button">View</button>' : '');
    if (opt.href) el.querySelector('button').onclick = function () { location.hash = opt.href; el.remove(); };
    $('#toasts').appendChild(el); setTimeout(function () { el.remove(); }, 4500);
  }
  function log(t, icn, fid) { S.act.unshift({ f: fid || S.cur, who: S.user.name, t: t, at: Date.now(), ic: icn || 'pulse' }); S.act = S.act.slice(0, 60); }
  var lastFocus;
  function modal(html, cls, onKey) {
    lastFocus = document.activeElement;
    $('#layer').innerHTML = '<div class="scrim" data-scrim><div class="modal ' + (cls || '') + '" role="dialog" aria-modal="true" tabindex="-1">' + html + '</div></div>';
    var f = $('#layer [autofocus]'); (f || $('#layer .modal')).focus(); $('#layer').onkey = onKey || null;
  }
  function closeModal() { if (!$('#layer').innerHTML) return; $('#layer').innerHTML = ''; if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus(); }
  function mhead(icn, title, sub) { return '<div class="m-head">' + (icn ? '<span class="hic">' + ic(icn) + '</span>' : '') + '<div class="t"><h2>' + esc(title) + '</h2>' + (sub ? '<p>' + esc(sub) + '</p>' : '') + '</div><button class="x" data-a="close" aria-label="Close">' + ic('x') + '</button></div>'; }
  function confirmBox(title, text, ok, fn, danger) {
    modal(mhead(null, title, text) + '<div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn ' + (danger ? 'danger' : 'pri') + '" id="cfOk">' + esc(ok) + '</button></div>');
    $('#cfOk').onclick = function () { closeModal(); fn(); };
  }
  function download(name, text, type) { var b = new Blob([text], { type: type || 'text/plain' }), a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000); }
  function fld(id, label, val, o) {
    o = o || {};
    var ctl = o.opts ? '<select id="' + id + '">' + o.opts.map(function (x) { return '<option' + (String(x) === String(val) ? ' selected' : '') + '>' + esc(x) + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm')
      : '<input id="' + id + '" value="' + esc(val == null ? '' : val) + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.type ? ' type="' + o.type + '"' : '') + (o.mode ? ' inputmode="' + o.mode + '"' : '') + (o.af ? ' autofocus' : '') + ' autocomplete="off">';
    return '<div class="f' + (o.cls ? ' ' + o.cls : '') + '"><label for="' + id + '">' + label + (o.req ? ' <span class="req">*</span>' : '') + '</label><div class="inp">' + (o.pre ? '<span class="u">' + o.pre + '</span>' : '') + (o.icon ? '<span class="ic">' + ic(o.icon, 'sm') + '</span>' : '') + ctl + (o.suf ? '<span class="u">' + o.suf + '</span>' : '') + '</div>' + (o.help ? '<span class="help">' + o.help + '</span>' : '') + '<span class="msg" data-msg="' + id + '" hidden></span></div>';
  }
  function err(id, msg) { var e = $('[data-msg="' + id + '"]'), i = document.getElementById(id); if (e) { e.hidden = false; e.textContent = msg; } if (i && i.closest('.inp')) i.closest('.inp').classList.add('err'); if (i) i.focus(); return false; }
  function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }

  /* ---------- routing ---------- */
  function route() { return (location.hash.replace(/^#\/?/, '') || 'overview').split('/'); }
  window.addEventListener('hashchange', function () { closeModal(); render(); window.scrollTo(0, 0); });
  var app = $('#app');
  var VIEWS = {};
  function render() {
    var r = route(), p = r[0];
    if (!authed && p !== 'login' && p !== '2fa') { location.replace('#/login'); return; }
    if (authed && (p === 'login' || p === '2fa')) { location.replace('#/overview'); return; }
    if (p === 'login') return vLogin(); if (p === '2fa') return v2fa();
    var key = p === 'funds' && r[1] === 'new' ? 'addfund' : p, v = VIEWS[key] || VIEWS.overview;
    var out = v();
    app.innerHTML = shell(key, out.crumbs, out.html);
    if (out.after) out.after();
  }

  /* ---------- shell ---------- */
  var FUND_PAGES = ['overview', 'management', 'constituents', 'analytics'];
  function shell(p, crumbs, body) {
    var f = F(), unread = S.notifs.filter(function (n) { return !n.read; }).length, ot = openTasks(f).length;
    function nl(k, label, icn, extra) { return '<a href="#/' + k + '" class="' + (p === k || (p === 'addfund' && k === 'funds') ? 'on' : '') + '"' + (p === k ? ' aria-current="page"' : '') + '>' + ic(icn) + label + (extra || '') + '</a>'; }
    var others = S.funds.filter(function (x) { return x.id !== f.id; });
    return '<div class="shell"><aside class="side" id="side" aria-label="Main">' +
      '<div class="logo">' + LOGO + '<span>CAPTL</span></div>' +
      '<div class="menu-wrap"><button class="fund-sw" data-a="fundMenu" aria-haspopup="true"><span class="fbadge' + fcls(f) + '">' + esc(f.short) + '</span><span><b>' + esc(f.name) + '</b><small>Fund ' + fundIdx(f) + ' · Vintage ' + f.vintage + '</small></span>' + ic('chevd', 'sm') + '</button></div>' +
      '<p class="nav-h">Workspace</p><nav class="nav">' + nl('activities', 'Activities', 'pulse') + nl('updates', 'Updates', 'clock') + nl('calendar', 'Calendar', 'cal') + '</nav>' +
      '<p class="nav-h">Funds</p><nav class="nav">' + nl('funds', 'Fund Management', 'brief') + nl('network', 'Fund Network', 'net') + '</nav>' +
      '<p class="nav-h">Fund ' + fundIdx(f) + '</p><nav class="nav">' + nl('overview', 'Overview', 'grid') + nl('management', 'Management', 'layers', ot ? '<span class="ct" aria-label="' + ot + ' open tasks">' + ot + '</span>' : '') + nl('constituents', 'Constituents', 'users') + nl('analytics', 'Analytics', 'chart') + '</nav>' +
      (others.length ? '<nav class="nav" style="margin-top:14px">' + others.map(function (o) { return '<button data-a="switch" data-id="' + o.id + '" title="' + esc(o.name) + '"><span style="flex:none">Fund ' + fundIdx(o) + '</span><span style="color:var(--side-dim);font-size:12.5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">· ' + esc(o.name) + '</span>' + ic('chevr', 'sm chev') + '</button>'; }).join('') + '</nav>' : '') +
      '<div class="side-foot"><nav class="nav"><button data-a="docs">' + ic('book') + 'Docs</button><button data-a="support">' + ic('life') + 'Support</button></nav>' +
      '<div class="me">' + av(S.user.name) + '<div><b>' + esc(S.user.name) + '</b><small>' + esc(S.user.role) + '</small></div><div class="menu-wrap" style="margin-left:auto"><button class="gear" data-a="userMenu" aria-label="Account settings">' + ic('gear', 'sm') + '</button></div></div></div></aside>' +
      '<div class="main"><header class="top"><button class="icon-btn burger" data-a="burger" aria-label="Open menu">' + ic('menu') + '</button>' +
      '<nav class="crumbs" aria-label="Breadcrumb">' + crumbs.map(function (c, i) { return i === crumbs.length - 1 ? '<b>' + esc(c[0]) + '</b>' : '<a href="' + c[1] + '">' + esc(c[0]) + '</a><span aria-hidden="true">/</span>'; }).join('') + '</nav><span class="spacer"></span>' +
      '<button class="search" data-a="cmd" aria-label="Search">' + ic('search') + '<span>Search anything…</span><kbd>⌘K</kbd></button>' +
      '<div class="menu-wrap"><button class="chip" data-a="ccyMenu" aria-haspopup="true" aria-label="Display currency ' + S.ccy + '"><span class="sym">' + CCY[S.ccy][0] + '</span><span class="lbl">' + S.ccy + '</span>' + ic('chevd', 'sm') + '</button></div>' +
      '<div class="menu-wrap"><button class="icon-btn" data-a="notifs" aria-label="Notifications' + (unread ? ', ' + unread + ' unread' : '') + '">' + ic('bell') + (unread ? '<span class="pip"></span>' : '') + '</button></div>' +
      '<div class="menu-wrap avbtn"><button data-a="userMenu" aria-label="Account menu">' + av(S.user.name) + '</button></div></header>' +
      '<main class="content" id="main">' + body + '</main></div></div>';
  }
  function fundIdx(f) { return S.funds.indexOf(f) + 1; }
  function fcls(f) { var i = S.funds.indexOf(f) % 3; return i === 1 ? ' alt' : i === 2 ? ' alt2' : ''; }
  function crumbsFund(page) { var f = F(); return [['Funds', '#/funds'], ['Fund ' + fundIdx(f), '#/overview'], [page]]; }

  /* ---------- auth ---------- */
  function authShell(inner) {
    return '<div class="auth"><section class="auth-brand"><div class="rings"></div><div class="logo">' + LOGO + '<span>CAPTL</span></div>' +
      '<h1>Your funds, your network, your paper — <em>in one workspace.</em></h1><p>CAPTL gives general partners one place to stand up a fund, attach LPs and portfolio companies, collect documents and hand work to the people who owe it.</p>' +
      '<ul><li><span>' + ic('shield', 'sm') + '</span>Two-factor sign-in before any fund data</li><li><span>' + ic('net', 'sm') + '</span>LPs and portfolio companies as first-class records</li><li><span>' + ic('send', 'sm') + '</span>Delegations that keep legal and ops inside the product</li></ul></section>' +
      '<section class="auth-main"><div class="auth-card"><div class="logo m-logo">' + LOGO + '<span>CAPTL</span></div>' + inner + '</div></section></div>';
  }
  function vLogin() {
    app.innerHTML = authShell('<h2>Welcome back</h2><p>Sign in to your CAPTL workspace.</p><form id="lf" novalidate>' +
      fld('le', 'Work email', S.user.email, { type: 'email', icon: 'mail' }) + fld('lp', 'Password', 'prototype-demo', { type: 'password', icon: 'lock' }) +
      '<button class="btn pri block" type="submit">Continue</button></form><div class="demo">' + ic('info', 'sm') + '<span>Prototype: the sign-in details are filled in. Any password works.</span></div><p class="auth-foot">New to CAPTL? Ask your fund administrator for an invite.</p>');
    $('#lf').onsubmit = function (e) {
      e.preventDefault(); var em = val('le');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return err('le', 'Enter a valid work email.');
      if (!val('lp')) return err('lp', 'Enter your password.');
      location.hash = '#/2fa';
    };
  }
  function v2fa() {
    app.innerHTML = authShell('<h2>Two-factor check</h2><p>Enter the 6-digit code from your authenticator app for ' + esc(S.user.email) + '.</p><form id="tf" novalidate><div class="otp" id="otp">' +
      [0, 1, 2, 3, 4, 5].map(function (i) { return '<input inputmode="numeric" maxlength="1" aria-label="Digit ' + (i + 1) + '"' + (i === 0 ? ' autofocus' : '') + ' autocomplete="' + (i === 0 ? 'one-time-code' : 'off') + '">'; }).join('') +
      '</div><span class="msg" id="otpE" hidden></span><button class="btn pri block" type="submit">Verify and sign in</button><a href="#/login" class="link" style="justify-self:center">Use a different account</a></form><div class="demo">' + ic('info', 'sm') + '<span>Prototype: any 6 digits work.</span></div>');
    var ins = $$('#otp input'); ins[0].focus();
    ins.forEach(function (inp, i) {
      inp.addEventListener('input', function () { inp.value = inp.value.replace(/\D/g, '').slice(-1); $('#otp').classList.remove('err'); if (inp.value && ins[i + 1]) ins[i + 1].focus(); if (ins.every(function (x) { return x.value; })) $('#tf').requestSubmit ? $('#tf').requestSubmit() : $('#tf').onsubmit(new Event('submit')); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); });
      inp.addEventListener('paste', function (e) { var t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (!t) return; e.preventDefault(); t.split('').forEach(function (c, j) { if (ins[j]) ins[j].value = c; }); (ins[t.length] || ins[5]).focus(); });
    });
    $('#tf').onsubmit = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      if (!ins.every(function (x) { return x.value; })) { $('#otp').classList.add('err'); var m = $('#otpE'); m.hidden = false; m.textContent = 'Enter all 6 digits.'; (ins.filter(function (x) { return !x.value; })[0]).focus(); return; }
      authed = true; try { sessionStorage.setItem('captl01-auth', '1'); } catch (x) {}
      location.hash = '#/overview'; setTimeout(function () { toast('Signed in', 'Welcome back, ' + S.user.name.split(' ')[0]); }, 50);
    };
  }

  /* ---------- overview ---------- */
  var DONUT = [['Portfolio investments', '#a8842b'], ['Management fees', '#f2b75b'], ['Operating expenses', '#8aabd6'], ['Establishment expenses', '#1c2c40']];
  VIEWS.overview = function () {
    var f = F(), c = calc(f), segs = [c.inv, f.alloc.fees, f.alloc.opex, f.alloc.estab], tot = sum(segs);
    var R = 88, C = 2 * Math.PI * R, off = 0, gap = tot ? 4 : 0;
    var circles = tot ? segs.map(function (v, i) { var len = Math.max(0, v / tot * C - gap); var s = '<circle data-seg="' + i + '" cx="115" cy="115" r="' + R + '" stroke="' + DONUT[i][1] + '" stroke-dasharray="' + len + ' ' + (C - len) + '" stroke-dashoffset="' + (-off) + '"><title>' + DONUT[i][0] + ': ' + m(v) + '</title></circle>'; off += v / tot * C; return s; }).join('') : '<circle cx="115" cy="115" r="' + R + '" stroke="#eef1f5"/>';
    function kpi(l, v, s, icn) { return '<div class="card kpi"><div class="kpi-h"><span>' + l + '</span><span class="ic">' + ic(icn) + '</span></div><strong class="num">' + v + '</strong><small>' + s + '</small></div>'; }
    function met(l, v, s, tip) { return '<div><small>' + l + (tip ? ' <span class="tipq" tabindex="0" data-tip="' + esc(tip) + '">?</span>' : '') + '</small><b class="num">' + v + '</b><span>' + s + '</span></div>'; }
    var early = c.early ? 'Early-fund state' : null;
    var now = Date.now(), lf = f.life, pct = Math.min(1, Math.max(0, (now - lf[0][1]) / (lf[4][1] - lf[0][1])));
    var curIdx = lf.reduce(function (a, s, i) { return s[1] <= now ? i : a; }, 0);
    var tv = (c.dist + c.nav) || 1;
    var units = f.units.length ? '<div class="tbl-wrap"><table><thead><tr><th>Unit class</th><th class="r">Units</th><th class="r">Value / unit</th><th class="r">Hurdle</th><th class="r">Total value</th></tr></thead><tbody>' + f.units.map(function (u) { return '<tr><td><b>' + esc(u.name) + '</b></td><td class="r num">' + u.count.toLocaleString() + '</td><td class="r num">' + m(u.value) + '</td><td class="r num">' + u.hurdle + '%</td><td class="r num"><b>' + m(u.count * u.value) + '</b></td></tr>'; }).join('') + '</tbody></table></div>'
      : '<div class="empty"><b>No unit classes yet</b>Define the classes investors hold before you issue units or run the waterfall.<br><a class="btn soft" href="#/analytics">' + ic('plus', 'sm') + 'Set up the cap table</a></div>';
    return {
      crumbs: crumbsFund('Overview'),
      html: '<div class="ph"><div class="t"><h1>Overview</h1><div class="tags"><span>' + esc(f.name) + '</span><span class="tag">' + esc(f.round) + '</span><span class="tag b">Vintage ' + f.vintage + '</span></div></div><button class="btn sec" data-a="export">' + ic('down', 'sm') + 'Export</button><a class="btn pri" href="#/management">' + ic('pen', 'sm') + 'Manage fund</a></div>' +
        '<div class="kpis">' + kpi('Fund corpus', m(f.size), 'Total fund size', 'wallet') + kpi('Capital commitment', c.commit ? m(c.commit) : 'N/A', c.commit ? Math.round(c.commit / f.size * 100) + '% of corpus from ' + f.lps.length + ' LP' + (f.lps.length === 1 ? '' : 's') : 'Not yet set', 'pie') +
          kpi('Distribution', m(c.dist), 'Paid to partners', 'arrup') + kpi('Drawdown', m(c.paid), 'Capital called to date', 'arrdn') + kpi('Undrawn commitment', m(c.undrawn), 'Remaining to be called', 'stack') + '</div>' +
        '<div class="g-over"><section class="card"><div class="card-h"><h2>Fund ' + fundIdx(f) + ' allocation</h2></div><div class="donut-wrap"><div class="donut"><svg viewBox="0 0 230 230" role="img" aria-label="Allocation of called capital">' + circles + '</svg><div class="c"><small>Total allocated</small><b class="num" id="dTot">' + m(tot) + '</b><small id="dSub">' + (c.paid ? Math.round(tot / c.paid * 100) + '% of called capital' : 'Before the first capital call') + '</small></div></div></div>' +
          '<div class="legend">' + DONUT.map(function (d, i) { return '<button data-seg="' + i + '"><i style="background:' + d[1] + '"></i>' + d[0] + (i === 1 ? ' · ' + f.mgmtPct + '%' : '') + '<b class="num">' + m(segs[i]) + '</b></button>'; }).join('') + '</div></section>' +
          '<section class="card"><div class="card-h"><h2>Metrics</h2><p>Net of fees · as of today</p></div><div class="metrics">' +
            met('NAV', early ? '—' : m(c.nav), early || 'Net asset value', 'Portfolio at current valuation plus uninvested cash.') + met('DPI', early ? '—' : x2(c.dpi), early || 'Distributions to paid-in', 'Cash returned to LPs divided by capital they have paid in.') + met('IRR', early ? '—' : (c.irr >= 0 ? '' : '−') + Math.abs(c.irr).toFixed(1) + '%', early || 'Annualised, since first close', 'Simplified annualised return from TVPI and years since first close.') +
            met('RVPI', early ? '—' : x2(c.rvpi), early || 'Residual value to paid-in', 'NAV divided by paid-in capital.') + met('MOIC', c.inv ? x2(c.moic) : '—', c.inv ? 'Gross, on ' + m(c.inv) + ' invested' : 'No investments yet', 'Current portfolio value divided by the amount invested.') + met('TVPI', early ? '—' : x2(c.tvpi), early || 'Total value to paid-in', 'DPI plus RVPI.') + '</div>' +
            (early ? '<div class="early">' + ic('info', 'sm') + '<span>Multiples appear after the first capital call. Zeros early in a fund’s life are expected, not missing data.</span></div>' :
            '<div class="cmp"><h3>TVPI composition</h3><div class="bar"><i style="width:' + (c.dist / tv * 100) + '%;background:#a8842b;min-width:' + (c.dist ? 4 : 0) + 'px"></i><i style="width:' + (c.nav / tv * 100) + '%;background:#8aabd6"></i></div><div class="cmp-l"><span><i style="background:#a8842b"></i>DPI <b>' + x2(c.dpi) + '</b></span><span><i style="background:#8aabd6"></i>RVPI <b>' + x2(c.rvpi) + '</b></span><span>= TVPI <b>' + x2(c.tvpi) + '</b></span></div></div>') + '</section></div>' +
        '<div class="g2" style="margin-top:20px"><section class="card"><div class="card-h"><h2>Fund life-cycle</h2><p>' + Math.round(pct * 100) + '% through the fund term</p></div><div class="life"><div class="life-track"><span class="prog" style="width:calc(' + (pct * 100) + '% - 16px)"></span>' + lf.map(function (s, i) { return '<div class="life-step ' + (i < curIdx ? 'done' : i === curIdx ? 'cur' : '') + '"><b>' + s[0] + '</b><small>' + MON[new Date(s[1]).getMonth()] + ' ' + new Date(s[1]).getFullYear() + '</small></div>'; }).join('') + '</div></div></section>' +
        '<section class="card"><div class="card-h"><h2>Unit classes</h2>' + (f.units.length ? '<a class="link" href="#/analytics">Cap table ' + ic('chevr', 'sm') + '</a>' : '') + '</div>' + units + '</section></div>',
      after: function () {
        $$('[data-seg]').forEach(function (el) {
          el.addEventListener('mouseenter', function () { var i = +el.dataset.seg; $$('[data-seg]').forEach(function (x) { x.classList.toggle('on', +x.dataset.seg === i); }); $('#dTot').textContent = m(segs[i]); $('#dSub').textContent = DONUT[i][0]; });
          el.addEventListener('mouseleave', function () { $$('[data-seg]').forEach(function (x) { x.classList.remove('on'); }); $('#dTot').textContent = m(tot); $('#dSub').textContent = c.paid ? Math.round(tot / c.paid * 100) + '% of called capital' : 'Before the first capital call'; });
        });
      }
    };
  };

  /* ---------- fund management ---------- */
  VIEWS.funds = function () {
    var u = S.ui, list = S.funds.filter(function (f) {
      var q = u.fmQ.toLowerCase();
      return (!q || (f.name + ' ' + f.company + ' ' + f.no).toLowerCase().indexOf(q) > -1) && (!u.fmRound || f.round === u.fmRound) && (!u.fmVint || String(f.vintage) === u.fmVint);
    }).sort(function (a, b) { return u.fmSort === 'name' ? a.name.localeCompare(b.name) : u.fmSort === 'size' ? b.size - a.size : b.created - a.created; });
    var rounds = S.funds.map(function (f) { return f.round; }).filter(function (v, i, a) { return a.indexOf(v) === i; }), vints = S.funds.map(function (f) { return String(f.vintage); }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    var last = S.funds.slice().sort(function (a, b) { return b.created - a.created; })[0], latestV = Math.max.apply(null, S.funds.map(function (f) { return f.vintage; }));
    function sel(k, label, opts) { return '<label class="sel"><span class="sr">' + label + '</span><select data-fm="' + k + '"><option value="">' + label + '</option>' + opts.map(function (o) { return '<option' + (u[k] === o ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm') + '</label>'; }
    return {
      crumbs: [['Funds', '#/funds'], ['Fund Management']],
      html: '<div class="ph"><div class="t"><h1>Fund Management</h1><p>Operations home for every vehicle — listed funds, vintage and created date.</p></div><a class="btn pri" href="#/funds/new">' + ic('plus', 'sm') + 'Add Fund</a></div>' +
        '<div class="g3" style="margin-bottom:20px"><div class="card stat"><span class="ic">' + ic('brief') + '</span><div><small>Listed funds</small><b class="num">' + S.funds.length + '</b><em>Active vehicles</em></div></div><div class="card stat"><span class="ic">' + ic('cal') + '</span><div><small>Latest vintage</small><b>' + latestV + '</b><em>Across all funds</em></div></div><div class="card stat"><span class="ic">' + ic('clock') + '</span><div><small>Last created</small><b>' + dF(last.created) + '</b><em>' + esc(last.name) + '</em></div></div></div>' +
        '<section class="card"><div class="toolbar"><h2>Listed Funds (' + list.length + ')</h2><label class="fs">' + ic('search', 'sm') + '<input id="fmQ" placeholder="Search funds" value="' + esc(u.fmQ) + '" aria-label="Search funds"></label>' + sel('fmRound', 'Seed round', rounds) + sel('fmVint', 'Vintage', vints) +
          '<div class="menu-wrap" style="margin-left:auto"><button class="btn sec small" data-a="sortMenu" style="height:40px">' + ic('sort', 'sm') + 'Sort: ' + { created: 'Newest', name: 'Name', size: 'Fund size' }[u.fmSort] + '</button></div></div>' +
        '<div class="tbl-wrap"><table><thead><tr><th>Fund number #</th><th>Fund name</th><th>Company name</th><th>Seed round</th><th class="r">Fund size</th><th>Vintage</th><th>Created</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' +
        (list.length ? list.map(function (f) { return '<tr class="click" data-a="openFund" data-id="' + f.id + '" tabindex="0"><td><b>#' + f.no + '</b></td><td><div class="who"><span class="mono">' + esc(ini(f.name)) + '</span><b>' + esc(f.name) + '</b>' + (f.id === S.cur ? '<span class="tag n">Current</span>' : '') + '</div></td><td><div class="who">' + av(f.company, 'mini-av') + esc(f.company) + '</div></td><td><span class="tag' + (/Seed/.test(f.round) ? '' : ' b') + '">' + esc(f.round) + '</span></td><td class="r num">' + m(f.size) + '</td><td>' + f.vintage + '</td><td>' + dF(f.created) + '</td><td class="r"><div class="menu-wrap"><button class="row-menu" data-a="fundRow" data-id="' + f.id + '" aria-label="Actions for ' + esc(f.name) + '">' + ic('dots', 'sm') + '</button></div></td></tr>'; }).join('')
          : '<tr><td colspan="8"><div class="empty"><b>No funds match</b>Clear the search or filters to see every vehicle.<br><button class="btn sec" data-a="fmClear">Clear filters</button></div></td></tr>') +
        '</tbody></table></div><div class="tbl-foot"><span>Showing ' + (list.length ? '1–' + list.length : 0) + ' of ' + S.funds.length + ' funds</span><div class="pager"><button disabled aria-label="Previous page">' + ic('chevl', 'sm') + '</button><button disabled aria-label="Next page">' + ic('chevr', 'sm') + '</button></div></div></section>' +
        '<div class="callout"><span class="ic">' + ic('plus') + '</span><div><b>Stand up another vehicle</b><p>Attach the trust deed and IMA, invite limited partners, add portfolio companies, then submit.</p></div><a class="btn pri" href="#/funds/new">' + ic('plus', 'sm') + 'Add Fund</a></div>',
      after: function () {
        var q = $('#fmQ'); q.oninput = function () { S.ui.fmQ = q.value; save(); var pos = q.selectionStart; render(); var n = $('#fmQ'); n.focus(); n.setSelectionRange(pos, pos); };
        $$('[data-fm]').forEach(function (s) { s.onchange = function () { S.ui[s.dataset.fm] = s.value; save(); render(); }; });
      }
    };
  };

  /* ---------- add fund wizard ---------- */
  var AF = null;
  function newAF() { return { step: 1, name: '', company: '', round: 'Seed 1', vintage: String(TY), size: '', type: 'Unit trust', mgmt: '2', docs: { trust: { st: 'none' }, ima: { st: 'none' }, reg: { st: 'none' } }, lps: [], lpac: true, port: [] }; }
  var AF_DOCS = [['trust', 'Trust Deed'], ['ima', 'Investment Management Agreement'], ['reg', 'Regulatory Approval']];
  VIEWS.addfund = function () {
    if (!AF) AF = newAF();
    var a = AF, s1 = a.step === 1;
    var wiz = '<div class="card wiz"><div class="st ' + (s1 ? 'on' : 'done') + '"><i>' + (s1 ? '1' : ic('check', 'sm')) + '</i><div><b>Fund details</b><small>Name, vintage and round</small></div></div><hr><div class="st ' + (s1 ? 'lock' : 'on') + '"><i>2</i><div><b>Documents &amp; partners</b><small>Papers, LPs and portfolio</small></div></div></div>';
    var body = s1 ? step1() : step2();
    return {
      crumbs: [['Funds', '#/funds'], ['Listed Funds (' + S.funds.length + ')', '#/funds'], ['Add Fund']],
      html: '<div class="ph"><div class="t"><h1>Add new fund</h1><div class="tags"><span>' + esc(a.name || 'Untitled fund') + '</span><span class="tag">Step ' + a.step + ' of 2</span></div></div>' + (s1 ? '<a class="btn sec" href="#/funds">Cancel</a><button class="btn pri" data-a="afNext">Continue' + ic('chevr', 'sm') + '</button>' : '<button class="btn sec" data-a="afBack">Back</button><button class="btn pri" data-a="afSubmit"' + (afReady() ? '' : ' disabled') + '>' + ic('check', 'sm') + 'Submit</button>') + '</div>' + wiz + body,
      after: bindAF
    };
  };
  function step1() {
    var a = AF;
    return '<div class="split"><section class="card"><div class="card-h"><h2>Fund details</h2><p>This is the vehicle LPs commit to.</p></div><div class="card-b"><div class="form-g">' +
      fld('af_name', 'Fund name', a.name, { req: true, ph: 'e.g. ABC Firm Growth - 02', af: true, cls: 'full' }) + fld('af_company', 'Company name', a.company, { req: true, ph: 'Manager or sponsoring company' }) +
      fld('af_type', 'Vehicle type', a.type, { opts: ['Unit trust', 'Limited partnership', 'Variable capital company'] }) + fld('af_round', 'Seed round', a.round, { opts: ['Seed 1', 'Seed 2', 'Round 2', 'Round 3'] }) + fld('af_vintage', 'Vintage', a.vintage, { opts: [TY - 1, TY, TY + 1] }) +
      fld('af_size', 'Fund size (corpus)', a.size, { req: true, pre: CCY[S.ccy][0], mode: 'decimal', ph: '0', help: 'Target total commitments' }) + fld('af_mgmt', 'Management fee', a.mgmt, { suf: '% / yr', mode: 'decimal' }) + '</div></div></section>' +
      '<aside class="stack"><section class="card side-note"><h3><span class="ic">' + ic('info', 'sm') + '</span>What happens next</h3><ul><li>Step 2 attaches the trust deed, IMA and regulatory approval — upload now or delegate.</li><li>Invite limited partners and add any portfolio companies you already hold.</li><li>The fund lands on Fund Management as soon as you submit.</li></ul></section></aside></div>';
  }
  function afDone(k) { var d = AF.docs[k]; return d.st === 'uploaded' || d.st === 'delegated'; }
  function afReady() { return AF_DOCS.every(function (d) { return afDone(d[0]); }) && AF.lps.length > 0; }
  function step2() {
    var a = AF, doneN = AF_DOCS.filter(function (d) { return afDone(d[0]); }).length + (a.lps.length ? 1 : 0) + (a.port.length ? 1 : 0);
    var docs = AF_DOCS.map(function (d) {
      var s = a.docs[d[0]], right = '';
      if (s.st === 'uploading') right = '<button class="x-sm" data-a="afCancelUp" data-k="' + d[0] + '" aria-label="Cancel upload">' + ic('x', 'sm') + '</button>';
      else if (s.st === 'none') right = '<div class="menu-wrap"><button class="btn sec small" data-a="afDelegate" data-k="' + d[0] + '">' + ic('uplus', 'sm') + 'Delegate</button></div><label class="btn soft small" style="cursor:pointer">' + ic('up', 'sm') + 'Upload<input type="file" class="sr" data-afup="' + d[0] + '" accept=".pdf,.doc,.docx"></label>';
      else right = '<button class="btn sec small" data-a="afReset" data-k="' + d[0] + '">' + (s.st === 'uploaded' ? 'Replace' : 'Undo') + '</button>';
      var sub = s.st === 'uploading' ? '<small class="up">Uploading… ' + s.p + '%</small><div class="prog-b"><i style="width:' + s.p + '%"></i></div>' : s.st === 'uploaded' ? '<small class="ok">' + esc(s.file) + ' · uploaded</small>' : s.st === 'delegated' ? '<small class="up">Delegated to ' + esc(s.to) + ' · a task is created on submit</small>' : '<small>PDF or DOCX · up to 25 MB</small>';
      return '<div class="docrow"><span class="ic">' + ic('doc') + '</span><div class="m"><b>' + d[1] + '</b>' + sub + '</div>' + right + '</div>';
    }).join('');
    var lps = a.lps.map(function (l, i) { return '<div class="person">' + av(l.name) + '<div class="m"><b>' + esc(l.name) + '</b><small>' + esc(l.email) + (l.commit ? ' · ' + m(l.commit) + ' commitment' : '') + '</small></div><button class="x-sm" data-a="afRmLp" data-i="' + i + '" aria-label="Remove ' + esc(l.name) + '">' + ic('x', 'sm') + '</button></div>'; }).join('');
    var port = a.port.map(function (p, i) { return '<div class="person"><span class="mono">' + esc(ini(p.name)) + '</span><div class="m"><b>' + esc(p.name) + '</b><small>' + esc(p.sector) + (p.invested ? ' · ' + m(p.invested) + ' invested' : '') + '</small></div><button class="x-sm" data-a="afRmPort" data-i="' + i + '" aria-label="Remove ' + esc(p.name) + '">' + ic('x', 'sm') + '</button></div>'; }).join('');
    function ck(label, ok, pend, txt) { return '<div><span class="d ' + (ok ? 'y' : pend ? 'p' : '') + '">' + (ok ? ic('check') : pend ? ic('clock') : '') + '</span><span>' + label + '</span><em class="' + (ok ? 'ok' : pend ? 'p' : '') + '">' + txt + '</em></div>'; }
    function dck(k, label) { var s = a.docs[k]; return ck(label, afDone(k), s.st === 'uploading', s.st === 'uploaded' ? 'Uploaded' : s.st === 'delegated' ? 'Delegated' : s.st === 'uploading' ? 'Uploading' : 'Pending'); }
    return '<div class="split"><div class="stack"><section class="card"><div class="card-h"><h2>Fund creation documents</h2><p>Upload now or delegate — documents never stall the create flow.</p></div>' + docs + '</section>' +
      '<section class="card"><div class="card-h"><h2>Limited partners</h2></div><div class="lp-block"><div><b>Limited Partners of ' + esc(a.name) + '</b><p>Invited LPs get the subscription pack and can see this fund’s documents.</p><label class="chk"><input type="checkbox" id="af_lpac"' + (a.lpac ? ' checked' : '') + '>LPAC enabled</label></div>' +
        '<div><div class="form-g">' + fld('lp_name', 'Full name', '', { ph: 'Full name' }) + fld('lp_commit', 'Commitment', '', { pre: CCY[S.ccy][0], mode: 'decimal', ph: 'Optional' }) + '<div class="f full"><label for="lp_email">Invite by email</label><div style="display:flex;gap:8px"><div class="inp" style="flex:1"><span class="ic">' + ic('mail', 'sm') + '</span><input id="lp_email" type="email" placeholder="Invite by email address" autocomplete="off"></div><button class="btn pri" data-a="afAddLp" style="height:44px">' + ic('send', 'sm') + 'Send</button></div><span class="msg" data-msg="lp_email" hidden></span></div></div>' +
        (lps ? '<p class="inv-h">INVITED (' + a.lps.length + ')</p>' + lps : '') + '</div></div></section>' +
      '<section class="card"><div class="card-h"><h2>Portfolio companies</h2><p>Optional — add holdings you already own.</p></div><div class="lp-block"><div><b>Portfolio of ' + esc(a.name) + '</b><p>Companies become first-class records with their own documents and valuations.</p></div><div><div class="form-g">' + fld('pc_name', 'Company name', '', { ph: 'e.g. Lumen Health' }) + fld('pc_sector', 'Sector', 'Fintech', { opts: ['Fintech', 'HealthTech', 'Logistics', 'AI', 'Climate', 'Industrial', 'Commerce'] }) + fld('pc_inv', 'Amount invested', '', { pre: CCY[S.ccy][0], mode: 'decimal', ph: 'Optional' }) + '<div class="f" style="align-self:end"><button class="btn soft" data-a="afAddPort">' + ic('plus', 'sm') + 'Add company</button></div></div>' + port + '</div></div></section></div>' +
      '<aside class="stack" style="position:sticky;top:96px"><section class="card"><div class="sum-h"><h3>Submission checklist</h3><small>' + doneN + ' of 5 complete</small><div class="bar"><i style="width:' + doneN / 5 * 100 + '%;background:var(--gold)"></i></div></div><div class="check-list">' +
        dck('trust', 'Trust deed') + dck('ima', 'Investment Management Agreement') + dck('reg', 'Regulatory approval') + ck('Limited partners', a.lps.length > 0, false, a.lps.length ? a.lps.length + ' invited' : 'Required') + ck('Portfolio', a.port.length > 0, false, a.port.length ? a.port.length + ' added' : 'Optional') + '</div></section>' +
        '<section class="card"><div class="sum-h"><h3>Fund summary</h3></div><div class="kv"><div><span>Fund</span><b>' + esc(a.name) + '</b></div><div><span>Company</span><b>' + esc(a.company) + '</b></div><div><span>Seed round</span><b>' + esc(a.round) + '</b></div><div><span>Vintage</span><b>' + a.vintage + '</b></div><div><span>Corpus</span><b class="num">' + m(num(a.size)) + '</b></div><div><span>Commitments so far</span><b class="num">' + m(sum(a.lps, function (l) { return l.commit; })) + '</b></div></div></section></aside></div>';
  }
  var upTimers = {};
  function bindAF() {
    if (AF.step === 1) {
      ['name', 'company', 'type', 'round', 'vintage', 'size', 'mgmt'].forEach(function (k) { var e = $('#af_' + k); if (!e) return; e.addEventListener(e.tagName === 'SELECT' ? 'change' : 'input', function () { AF[k] = e.value; var m2 = $('[data-msg="af_' + k + '"]'); if (m2) m2.hidden = true; e.closest('.inp').classList.remove('err'); }); });
      return;
    }
    $('#af_lpac').onchange = function () { AF.lpac = this.checked; };
    $$('[data-afup]').forEach(function (inp) { inp.onchange = function () { var f = inp.files[0]; if (f) startUpload(inp.dataset.afup, f.name); }; });
    var em = $('#lp_email'); if (em) em.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); A.afAddLp(); } };
  }
  function startUpload(k, name) {
    var d = AF.docs[k]; d.st = 'uploading'; d.p = 0; d.file = name; render();
    clearInterval(upTimers[k]);
    upTimers[k] = setInterval(function () {
      d.p = Math.min(100, d.p + 9 + Math.round(Math.random() * 12));
      if (d.p >= 100) { clearInterval(upTimers[k]); d.st = 'uploaded'; render(); return; }
      var row = $('[data-a="afCancelUp"][data-k="' + k + '"]'); if (!row) return clearInterval(upTimers[k]);
      var r = row.closest('.docrow'); r.querySelector('.up').textContent = 'Uploading… ' + d.p + '%'; r.querySelector('.prog-b i').style.width = d.p + '%';
    }, 180);
  }

  /* ---------- fund network ---------- */
  var netSel = {}, netAdd = null, netQ = '';
  VIEWS.network = function () {
    var f = F(), tab = S.ui.netTab, groups;
    if (tab === 'team') groups = f.team; else if (tab === 'prov') groups = f.prov;
    else if (tab === 'lps') { groups = {}; f.lps.forEach(function (l) { (groups[l.kind] = groups[l.kind] || []).push({ id: l.id, name: l.name, email: l.email, ro: true, meta: l.st }); }); }
    else { groups = {}; f.portfolio.forEach(function (p) { (groups[p.sector] = groups[p.sector] || []).push({ id: p.id, name: p.name, email: m(p.invested) + ' invested', ro: true, meta: x2(p.value / p.invested) }); }); }
    var all = []; Object.keys(groups).forEach(function (g) { all = all.concat(groups[g]); });
    var selN = all.filter(function (p) { return netSel[p.id]; }).length, q = netQ.toLowerCase();
    var counts = { team: cnt(f.team), prov: cnt(f.prov), lps: f.lps.length, port: f.portfolio.length };
    function cnt(g) { return sum(Object.keys(g), function (k) { return g[k].length; }); }
    var single = { Partners: 'partner', Principals: 'principal', Associates: 'associate', Analysts: 'analyst' };
    var html = Object.keys(groups).map(function (g) {
      var list = groups[g].filter(function (p) { return !q || (p.name + ' ' + p.email).toLowerCase().indexOf(q) > -1; }), allSel = list.length && list.every(function (p) { return netSel[p.id]; });
      if (q && !list.length) return '';
      var ro = tab === 'lps' || tab === 'port';
      return '<section class="card"><div class="grp-h"><h3>' + esc(g) + '</h3><span class="n">' + groups[g].length + '</span>' + (list.length && !ro ? '<label class="chk"><input type="checkbox" data-selall="' + esc(g) + '"' + (allSel ? ' checked' : '') + '>Select all</label>' : '') + '</div>' +
        (list.length ? list.map(function (p) { return '<div class="mem' + (netSel[p.id] ? ' sel' : '') + '">' + (ro ? '' : '<input type="checkbox" style="width:18px;height:18px;accent-color:var(--gold);flex:none" data-sel="' + p.id + '" aria-label="Select ' + esc(p.name) + '"' + (netSel[p.id] ? ' checked' : '') + '>') + (tab === 'port' ? '<span class="mono">' + esc(ini(p.name)) + '</span>' : av(p.name)) + '<div class="m"><b>' + esc(p.name) + '</b><small>' + esc(p.email) + '</small></div>' + (p.meta ? '<span class="tag n role">' + esc(p.meta) + '</span>' : '') + (ro ? '' : '<div class="menu-wrap"><button class="row-menu" data-a="memMenu" data-g="' + esc(g) + '" data-id="' + p.id + '" aria-label="Actions for ' + esc(p.name) + '">' + ic('dots', 'sm') + '</button></div>') + '</div>'; }).join('') : '<div class="empty" style="padding:22px">No ' + (single[g] || 'member') + 's yet.</div>') +
        (ro ? '' : netAdd === g ? '<form class="add-inline" data-addf="' + esc(g) + '"><div class="inp"><input name="n" placeholder="Full name" aria-label="Full name" autofocus></div><div class="inp"><input name="e" type="email" placeholder="Email" aria-label="Email"></div><div style="display:flex;gap:6px"><button class="btn pri small" type="submit" style="height:38px">Add</button><button class="btn sec small" type="button" data-a="netAddCancel" style="height:38px">Cancel</button></div></form>' : '<button class="grp-add" data-a="netAdd" data-g="' + esc(g) + '">' + ic('plus', 'sm') + 'Add ' + (single[g] || g.toLowerCase()) + '</button>') + '</section>';
    }).join('');
    return {
      crumbs: crumbsFund('Fund Network'),
      html: '<div class="ph"><div class="t"><h1>Fund Network</h1><p>Everyone around this fund: team, service providers, limited partners and portfolio.</p></div>' + (selN ? '<button class="btn sec" data-a="netClear">Cancel</button>' : '') + '<button class="btn pri" data-a="configure"' + (tab === 'lps' || tab === 'port' ? ' disabled' : '') + '>' + ic('gear', 'sm') + (selN ? 'Configure ' + selN : 'Configure All') + '</button></div>' +
        '<div class="tabs" role="tablist">' + [['team', 'Team Members'], ['prov', 'Service Providers'], ['lps', 'LPs'], ['port', 'Portfolio']].map(function (t) { return '<button role="tab" aria-selected="' + (tab === t[0]) + '" data-a="netTab" data-v="' + t[0] + '" class="' + (tab === t[0] ? 'on' : '') + '">' + t[1] + ' <span class="ct">' + counts[t[0]] + '</span></button>'; }).join('') + '</div>' +
        '<div class="net-tools"><label class="fs">' + ic('search', 'sm') + '<input id="netQ" placeholder="Search by name or email" value="' + esc(netQ) + '" aria-label="Search network"></label>' + (selN ? '<span class="selpill">' + selN + ' of ' + all.length + ' selected</span><button class="link" data-a="netClear">Clear</button>' : '') + (tab === 'lps' || tab === 'port' ? '<a class="link" href="#/constituents">Manage in Constituents ' + ic('chevr', 'sm') + '</a>' : '') +
        '<div class="view-t" role="group" aria-label="Layout"><button data-a="netView" data-v="grid" class="' + (S.ui.netView === 'grid' ? 'on' : '') + '" aria-label="Grid view" aria-pressed="' + (S.ui.netView === 'grid') + '">' + ic('tiles', 'sm') + '</button><button data-a="netView" data-v="list" class="' + (S.ui.netView === 'list' ? 'on' : '') + '" aria-label="List view" aria-pressed="' + (S.ui.netView === 'list') + '">' + ic('list', 'sm') + '</button></div></div>' +
        '<div class="groups ' + S.ui.netView + '">' + (html || '<div class="card empty" style="grid-column:1/-1"><b>No one matches “' + esc(netQ) + '”</b>Try a different name or email.</div>') + '</div>',
      after: function () {
        var q = $('#netQ'); q.oninput = function () { netQ = q.value; var pos = q.selectionStart; render(); var n = $('#netQ'); n.focus(); n.setSelectionRange(pos, pos); };
        $$('[data-sel]').forEach(function (c) { c.onchange = function () { netSel[c.dataset.sel] = c.checked; render(); var n = $('[data-sel="' + c.dataset.sel + '"]'); if (n) n.focus(); }; });
        $$('[data-selall]').forEach(function (c) { c.onchange = function () { groups[c.dataset.selall].forEach(function (p) { netSel[p.id] = c.checked; }); render(); }; });
        $$('[data-addf]').forEach(function (fm) {
          fm.querySelector('input').focus();
          fm.onsubmit = function (e) { e.preventDefault(); var n = fm.n.value.trim(), em = fm.e.value.trim(); if (!n) { fm.n.closest('.inp').classList.add('err'); fm.n.focus(); return; } if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { fm.e.closest('.inp').classList.add('err'); fm.e.focus(); return; } groups[fm.dataset.addf].push({ id: uid(), name: n, email: em }); netAdd = null; log('added ' + n + ' to ' + fm.dataset.addf, 'uplus'); save(); render(); toast('Added to ' + fm.dataset.addf, n + ' gets an invite to this fund'); };
        });
      }
    };
  };

  /* ---------- management ---------- */
  var taskF = 'open';
  VIEWS.management = function () {
    var f = F(), tab = S.ui.mTab, ot = openTasks(f), dl = f.docs.filter(function (d) { return d.st === 'delegated'; });
    var docs = '<section class="card"><div class="toolbar"><h2>Documents</h2><span style="color:var(--mut)">' + f.docs.filter(function (d) { return d.st === 'uploaded'; }).length + ' of ' + f.docs.length + ' in the room</span><span style="margin-left:auto"></span><label class="btn soft small" style="cursor:pointer;height:38px">' + ic('up', 'sm') + 'Upload document<input type="file" class="sr" id="docNew"></label></div>' +
      f.docs.map(function (d) {
        var badge = d.st === 'uploaded' ? '<span class="tag g dot">Uploaded</span>' : d.st === 'delegated' ? '<span class="tag dot">Delegated</span>' : '<span class="tag r dot">Missing</span>';
        var sub = d.st === 'uploaded' ? esc(d.file) + ' · ' + dF(d.at) : d.st === 'delegated' ? 'With ' + esc(d.to) + ' since ' + dF(d.at) : 'Requested ' + ago(d.at);
        var act = d.st === 'uploaded' ? '<button class="btn sec small" data-a="dlDoc" data-v="' + esc(d.file) + '">' + ic('down', 'sm') + 'Download</button>' : '<div class="menu-wrap"><button class="btn sec small" data-a="docDelegate" data-id="' + d.id + '">' + ic('uplus', 'sm') + (d.st === 'delegated' ? 'Reassign' : 'Delegate') + '</button></div><label class="btn soft small" style="cursor:pointer">' + ic('up', 'sm') + 'Upload<input type="file" class="sr" data-docup="' + d.id + '"></label>';
        return '<div class="docrow"><span class="ic">' + ic('doc') + '</span><div class="m"><b>' + esc(d.name) + '</b><small>' + sub + '</small></div>' + badge + act + '</div>';
      }).join('') + '</section>';
    var tl = f.tasks.filter(function (t) { return taskF === 'all' || t.st === taskF; }).sort(function (a, b) { return (a.st === 'done') - (b.st === 'done') || a.due - b.due; });
    var tasks = '<section class="card"><div class="toolbar"><h2>Tasks</h2><div class="view-t" role="group" aria-label="Filter tasks" style="margin-left:0">' + [['open', 'Open'], ['done', 'Done'], ['all', 'All']].map(function (x) { return '<button data-a="taskF" data-v="' + x[0] + '" class="' + (taskF === x[0] ? 'on' : '') + '" style="width:auto;padding:0 12px">' + x[1] + '</button>'; }).join('') + '</div><span style="margin-left:auto"></span><button class="btn pri small" style="height:38px" data-a="assign">' + ic('uplus', 'sm') + 'Assign task</button></div>' +
      (tl.length ? tl.map(function (t) { var late = t.st === 'open' && t.due < day(TY, TM, TD); return '<div class="task' + (t.st === 'done' ? ' done' : '') + '"><button class="cb" data-a="toggleTask" data-id="' + t.id + '" aria-label="' + (t.st === 'done' ? 'Reopen' : 'Mark done') + ': ' + esc(t.title) + '">' + (t.st === 'done' ? ic('check') : '') + '</button><div class="m"><b>' + esc(t.title) + '</b><small>' + av(t.to, 'mini-av').replace('class="av', 'style="display:inline-grid;vertical-align:middle;margin-right:6px;width:20px;height:20px;font-size:9px" class="av') + esc(t.to) + '</small></div><span class="due' + (late ? ' late' : '') + '">' + (t.st === 'done' ? 'Done' : late ? 'Overdue · ' + dF(t.due) : 'Due ' + dF(t.due)) + '</span>' + (t.st === 'open' && !/LLP|Admin|Audit|Trust Co/.test(t.to) ? '' : '') + '</div>'; }).join('') : '<div class="empty"><b>' + (taskF === 'open' ? 'Nothing open' : 'No tasks') + '</b>' + (taskF === 'open' ? 'Every task on this fund is done.' : 'Assign one to someone in the fund network.') + '</div>') + '</section>';
    var deleg = '<section class="card"><div class="toolbar"><h2>Delegations</h2><span style="color:var(--mut)">Documents and reviews handed to someone in the network</span></div>' +
      (dl.length ? '<div class="tbl-wrap"><table><thead><tr><th>Document</th><th>Delegated to</th><th>Since</th><th>Status</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' + dl.map(function (d) { return '<tr><td><b>' + esc(d.name) + '</b></td><td><div class="who">' + av(d.to, 'mini-av') + esc(d.to) + '</div></td><td>' + dF(d.at) + '</td><td><span class="tag dot">' + (d.reminded ? 'Reminded ' + ago(d.reminded) : 'Waiting') + '</span></td><td class="r"><button class="btn sec small" data-a="remind" data-id="' + d.id + '">' + ic('bell2', 'sm') + 'Send reminder</button></td></tr>'; }).join('') + '</tbody></table></div>' : '<div class="empty"><b>No open delegations</b>Delegate a missing document from the Documents tab.</div>') + '</section>';
    var details = '<section class="card"><div class="card-h"><h2>Fund details</h2><button class="btn sec small" data-a="editFund">' + ic('pen', 'sm') + 'Edit</button></div><div class="kv" style="padding-top:8px"><div><span>Fund number</span><b>#' + f.no + '</b></div><div><span>Vehicle</span><b>' + esc(f.type) + '</b></div><div><span>Company</span><b>' + esc(f.company) + '</b></div><div><span>Seed round</span><b>' + esc(f.round) + '</b></div><div><span>Vintage</span><b>' + f.vintage + '</b></div><div><span>Corpus</span><b class="num">' + m(f.size) + '</b></div><div><span>Management fee</span><b>' + f.mgmtPct + '% / yr</b></div><div><span>Hurdle · carry</span><b>' + f.hurdle + '% · ' + f.carry + '%</b></div><div><span>Created</span><b>' + dF(f.created) + '</b></div></div></section>';
    return {
      crumbs: crumbsFund('Management'),
      html: '<div class="ph"><div class="t"><h1>Management</h1><p>Documents in, tasks out. Everything that keeps ' + esc(f.name) + ' running.</p></div><button class="btn pri" data-a="assign">' + ic('uplus', 'sm') + 'Assign task</button></div>' +
        '<div class="tabs" role="tablist">' + [['docs', 'Documents', f.docs.filter(function (d) { return d.st !== 'uploaded'; }).length], ['tasks', 'Tasks', ot.length], ['deleg', 'Delegations', dl.length]].map(function (t) { return '<button role="tab" aria-selected="' + (tab === t[0]) + '" data-a="mTab" data-v="' + t[0] + '" class="' + (tab === t[0] ? 'on' : '') + '">' + t[1] + (t[2] ? ' <span class="ct">' + t[2] + '</span>' : '') + '</button>'; }).join('') + '</div>' +
        '<div class="split"><div class="stack">' + (tab === 'docs' ? docs : tab === 'tasks' ? tasks : deleg) + '</div><aside class="stack">' + details + '</aside></div>',
      after: function () {
        var dn = $('#docNew'); if (dn) dn.onchange = function () { var fl = dn.files[0]; if (!fl) return; f.docs.push({ id: uid(), name: fl.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), st: 'uploaded', file: fl.name, at: Date.now() }); log('uploaded ' + fl.name, 'up'); save(); render(); toast('Document uploaded', fl.name + ' is in the document room'); };
        $$('[data-docup]').forEach(function (i) { i.onchange = function () { var fl = i.files[0]; if (!fl) return; var d = f.docs.filter(function (x) { return x.id === i.dataset.docup; })[0]; d.st = 'uploaded'; d.file = fl.name; d.at = Date.now(); f.tasks.forEach(function (t) { if (t.doc === d.id) t.st = 'done'; }); log('uploaded ' + d.name, 'up'); save(); render(); toast(d.name + ' uploaded', 'Linked tasks were closed'); }; });
      }
    };
  };

  /* ---------- constituents ---------- */
  VIEWS.constituents = function () {
    var f = F(), c = calc(f), tab = S.ui.cTab;
    var lps = '<section class="card"><div class="toolbar"><h2>Limited partners</h2><span style="color:var(--mut)">' + m(c.commit) + ' committed of ' + m(f.size) + '</span><span style="margin-left:auto"></span><button class="btn sec small" style="height:38px" data-a="exportLps">' + ic('down', 'sm') + 'Export</button><button class="btn pri small" style="height:38px" data-a="addLp">' + ic('uplus', 'sm') + 'Invite LP</button></div>' +
      (f.lps.length ? '<div class="tbl-wrap"><table><thead><tr><th>Investor</th><th>Type</th><th class="r">Commitment</th><th class="r">Called</th><th class="r">Distributed</th><th class="r">Share</th><th>Status</th></tr></thead><tbody>' + f.lps.map(function (l) { return '<tr class="click" data-a="lpDetail" data-id="' + l.id + '" tabindex="0"><td><div class="who">' + av(l.name) + '<div><b>' + esc(l.name) + (l.lpac ? ' <span class="tag b" style="height:20px;font-size:11px;margin-left:4px">LPAC</span>' : '') + '</b><small>' + esc(l.email) + '</small></div></div></td><td>' + esc(l.kind) + '</td><td class="r num">' + m(l.commit) + '</td><td class="r num">' + m(l.called) + '</td><td class="r num">' + m(l.dist) + '</td><td class="r num">' + (c.commit ? (l.commit / c.commit * 100).toFixed(1) + '%' : '—') + '</td><td>' + (l.st === 'Active' ? '<span class="tag g dot">Active</span>' : '<span class="tag dot">Invited</span>') + '</td></tr>'; }).join('') + '</tbody></table></div>' : '<div class="empty"><b>No limited partners yet</b>Invite your first LP to start taking commitments.<br><button class="btn pri" data-a="addLp">' + ic('uplus', 'sm') + 'Invite LP</button></div>') + '</section>';
    var port = '<section class="card"><div class="toolbar"><h2>Portfolio companies</h2><span style="color:var(--mut)">' + m(c.inv) + ' invested · ' + m(c.val) + ' current value</span><span style="margin-left:auto"></span><button class="btn pri small" style="height:38px" data-a="addPort">' + ic('plus', 'sm') + 'Add company</button></div>' +
      (f.portfolio.length ? '<div class="tbl-wrap"><table><thead><tr><th>Company</th><th>Sector</th><th>Invested on</th><th class="r">Invested</th><th class="r">Current value</th><th class="r">MOIC</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' + f.portfolio.map(function (p) { var mo = p.value / p.invested; return '<tr><td><div class="who"><span class="mono">' + esc(ini(p.name)) + '</span><b>' + esc(p.name) + '</b></div></td><td>' + esc(p.sector) + '</td><td>' + dF(p.at) + '</td><td class="r num">' + m(p.invested) + '</td><td class="r num"><b>' + m(p.value) + '</b></td><td class="r num" style="color:' + (mo >= 1 ? 'var(--green)' : 'var(--red)') + ';font-weight:600">' + x2(mo) + '</td><td class="r"><button class="btn sec small" data-a="valuation" data-id="' + p.id + '">' + ic('pen', 'sm') + 'Update valuation</button></td></tr>'; }).join('') + '</tbody></table></div>' : '<div class="empty"><b>No portfolio companies yet</b>Add a company when the fund makes its first investment.<br><button class="btn pri" data-a="addPort">' + ic('plus', 'sm') + 'Add company</button></div>') + '</section>';
    return {
      crumbs: crumbsFund('Constituents'),
      html: '<div class="ph"><div class="t"><h1>Constituents</h1><p>Both sides of the fund: the investors who commit capital and the companies it backs.</p></div></div>' +
        '<div class="tabs" role="tablist">' + [['lps', 'Limited partners', f.lps.length], ['port', 'Portfolio companies', f.portfolio.length]].map(function (t) { return '<button role="tab" aria-selected="' + (tab === t[0]) + '" data-a="cTab" data-v="' + t[0] + '" class="' + (tab === t[0] ? 'on' : '') + '">' + t[1] + ' <span class="ct">' + t[2] + '</span></button>'; }).join('') + '</div>' + (tab === 'lps' ? lps : port)
    };
  };

  /* ---------- analytics ---------- */
  var capDraft = null, issueDraft = null;
  VIEWS.analytics = function () {
    var f = F(), tab = S.ui.aTab;
    var body = tab === 'cap' ? capTable(f) : tab === 'calls' ? capCalls(f) : waterfall(f);
    return {
      crumbs: crumbsFund('Analytics'),
      html: '<div class="ph"><div class="t"><h1>Analytics</h1><p>Cap table, capital calls and distribution waterfall for Fund ' + fundIdx(f) + '</p></div><button class="btn sec" data-a="assign">' + ic('uplus', 'sm') + 'Assign task</button></div>' +
        '<div class="tabs" role="tablist">' + [['cap', 'Cap table'], ['calls', 'Capital calls'], ['wf', 'Dist. waterfall']].map(function (t) { return '<button role="tab" aria-selected="' + (tab === t[0]) + '" data-a="aTab" data-v="' + t[0] + '" class="' + (tab === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div>' + body,
      after: function () { if (tab === 'cap') bindCap(f); if (tab === 'wf') bindWf(f); }
    };
  };
  function capTable(f) {
    if (!capDraft || capDraft.fid !== f.id) capDraft = { fid: f.id, rows: f.units.length ? JSON.parse(JSON.stringify(f.units)) : [{ name: '', count: '', value: '', hurdle: '' }, { name: '', count: '', value: '', hurdle: '' }] };
    var rows = capDraft.rows, valid = rows.filter(function (r) { return r.name && num(r.count) > 0 && num(r.value) > 0; });
    var totU = sum(valid, function (r) { return num(r.count); }), totV = sum(valid, function (r) { return num(r.count) * num(r.value); });
    var step = f.capStep, s1on = step === 1, s2on = step === 2;
    var head = '<div class="card wiz" style="margin-bottom:14px"><div class="st ' + (step > 1 ? 'done' : 'on') + '"><i>' + (step > 1 ? ic('check', 'sm') : '1') + '</i><div><b>Create fund units</b><small>Define unit classes</small></div></div><hr><div class="st ' + (step === 3 ? 'done' : step === 2 ? 'on' : 'lock') + '"><i>' + (step === 3 ? ic('check', 'sm') : step === 2 ? '2' : ic('lock', 'sm')) + '</i><div><b>Issue fund units</b><small>Allocate to partners</small></div></div></div>';
    var s1 = '<div class="step-card ' + (s1on ? 'on' : '') + '"><div class="sc-h"><span class="n' + (step > 1 ? ' done' : '') + '">' + (step > 1 ? ic('check') : '1') + '</span><div><b>Step 1: Create Fund unit</b><small>Define the unit classes investors can hold in this fund.</small></div>' + (step > 1 ? '<button class="btn sec small" data-a="capEdit">' + ic('pen', 'sm') + 'Edit</button>' : '') + '</div>' +
      (s1on ? '<div class="sc-b"><p class="units-h">Fund units</p>' + rows.map(function (r, i) { return '<div class="unit-row">' + cf(i, 'name', 'Name units', r.name, 'Type name here') + cf(i, 'count', 'Number of units', r.count, 'e.g. 10', 'numeric') + cf(i, 'value', 'Value', r.value, CCY[S.ccy][0] + '100', 'decimal') + cf(i, 'hurdle', 'Hurdle rate', r.hurdle, 'e.g. 8%', 'decimal') + '<button class="x-sm del" data-a="capDel" data-i="' + i + '" aria-label="Remove unit class ' + (i + 1) + '"' + (rows.length < 2 ? ' disabled' : '') + '>' + ic('trash', 'sm') + '</button></div>'; }).join('') + '<button class="add-row" data-a="capAdd">' + ic('plus', 'sm') + 'Add unit class</button></div>'
        : '<div class="sc-b"><div class="tbl-wrap"><table><tbody>' + f.units.map(function (u) { return '<tr><td><b>' + esc(u.name) + '</b></td><td class="r num">' + u.count.toLocaleString() + ' units</td><td class="r num">' + m(u.value) + ' each</td><td class="r">' + u.hurdle + '% hurdle</td></tr>'; }).join('') + '</tbody></table></div></div>') + '</div>';
    var s2 = '';
    if (step === 1) s2 = '<div class="step-card locked"><div class="sc-h"><span class="n lock">' + ic('lock', 'sm') + '</span><div><b>Step 2: Issue Fund unit</b><small>Unlocks once fund units are defined — you cannot issue what you have not defined.</small></div>' + ic('chevr', 'sm') + '</div></div>';
    else {
      var cls = f.units[0];
      if (!issueDraft || issueDraft.fid !== f.id) { issueDraft = { fid: f.id, cls: cls.name, alloc: {} }; var c = calc(f); f.lps.forEach(function (l) { issueDraft.alloc[l.id] = f.issued && f.issued[l.id] ? (f.issued[l.id][cls.name] || 0) : (c.commit ? Math.floor(cls.count * l.commit / c.commit) : 0); }); }
      var U = f.units.filter(function (u) { return u.name === issueDraft.cls; })[0] || cls, used = sum(Object.keys(issueDraft.alloc), function (k) { return num(issueDraft.alloc[k]); }), left = U.count - used;
      s2 = '<div class="step-card ' + (s2on ? 'on' : '') + '"><div class="sc-h"><span class="n' + (step === 3 ? ' done' : '') + '">' + (step === 3 ? ic('check') : '2') + '</span><div><b>Step 2: Issue Fund unit</b><small>' + (step === 3 ? 'Units issued to ' + Object.keys(f.issued || {}).length + ' partners.' : 'Allocate ' + esc(U.name) + ' units to limited partners. Pro-rata to commitment by default.') + '</small></div>' + (step === 3 ? '<button class="btn sec small" data-a="capReissue">' + ic('pen', 'sm') + 'Re-allocate</button>' : '') + '</div>' +
        (s2on ? '<div class="sc-b"><div style="display:flex;gap:12px;align-items:end;margin:14px 0;flex-wrap:wrap"><div class="f" style="min-width:220px"><label for="isCls">Unit class</label><div class="inp"><select id="isCls">' + f.units.map(function (u) { return '<option' + (u.name === issueDraft.cls ? ' selected' : '') + '>' + esc(u.name) + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm') + '</div></div><span class="tag ' + (left < 0 ? 'r' : left === 0 ? 'g' : '') + '" style="height:32px">' + (left < 0 ? Math.abs(left).toLocaleString() + ' over' : left.toLocaleString() + ' of ' + U.count.toLocaleString() + ' left') + '</span></div>' +
          f.lps.map(function (l) { return '<div class="alloc-row"><div class="who">' + av(l.name) + '<div><b>' + esc(l.name) + '</b><small>' + m(l.commit) + ' committed</small></div></div><div class="inp" style="height:40px"><input inputmode="numeric" data-alloc="' + l.id + '" value="' + num(issueDraft.alloc[l.id]) + '" aria-label="Units for ' + esc(l.name) + '"><span class="u">units</span></div><b class="num" style="text-align:right">' + m(num(issueDraft.alloc[l.id]) * U.value) + '</b></div>'; }).join('') + '</div>'
          : step === 3 ? '<div class="sc-b"><div class="tbl-wrap"><table><thead><tr><th>Partner</th>' + f.units.map(function (u) { return '<th class="r">' + esc(u.name) + '</th>'; }).join('') + '<th class="r">Ownership</th></tr></thead><tbody>' + capRows(f) + '</tbody></table></div></div>' : '') + '</div>';
    }
    var foot = step === 1 ? '<div class="card foot-bar"><button class="btn sec" data-a="assign">' + ic('uplus', 'sm') + 'Assign task</button><span class="l" id="capHint">' + (valid.length ? valid.length + ' unit class' + (valid.length > 1 ? 'es' : '') + ' ready' : 'Add at least one unit class to continue') + '</span><button class="btn pri" data-a="capNext" id="capNext"' + (valid.length ? '' : ' disabled') + '>Next' + ic('chevr', 'sm') + '</button></div>'
      : step === 2 ? '<div class="card foot-bar"><button class="btn sec" data-a="capEdit">Back</button><span class="l">Issuing records units on each partner’s statement</span><button class="btn pri" data-a="capIssue">Issue units' + ic('check', 'sm') + '</button></div>' : '';
    var side = '<aside class="stack"><section class="card side-note"><h3><span class="ic">' + ic('info', 'sm') + '</span>Before you start</h3><ul><li>Define unit classes first, then issue units to partners.</li><li>The hurdle rate is the preferred return before carry applies.</li><li>The cap table must exist before capital calls or the distribution waterfall can run.</li></ul></section>' +
      '<section class="card"><div class="sum-h"><h3>Cap table summary</h3></div><div class="kv" id="capSum"><div><span>Unit classes</span><b class="num">' + (step === 1 ? valid.length : f.units.length) + '</b></div><div><span>Total units</span><b class="num">' + (step === 1 ? totU : sum(f.units, function (u) { return u.count; })).toLocaleString() + '</b></div><div><span>Total value</span><b class="num">' + m(step === 1 ? totV : sum(f.units, function (u) { return u.count * u.value; })) + '</b></div></div><p class="help" style="padding:0 22px 16px">Updates live as you add unit classes.</p></section>' +
      '<section class="card side-note gold"><h3>Need legal or ops to finish this?</h3><p>Assign this step to a teammate and keep the work inside the product.</p><button class="btn sec block" data-a="assign" data-title="Set up cap table for ' + esc(f.name) + '">' + ic('uplus', 'sm') + 'Assign task</button></section></aside>';
    return '<div class="split"><div>' + head + s1 + '<div style="height:14px"></div>' + s2 + foot + '</div>' + side + '</div>';
  }
  function cf(i, k, label, v, ph, mode) { return '<div class="f"><label for="u' + i + k + '">' + label + '</label><div class="inp"><input id="u' + i + k + '" data-u="' + i + '" data-k="' + k + '" value="' + esc(v) + '" placeholder="' + esc(ph) + '"' + (mode ? ' inputmode="' + mode + '"' : '') + ' autocomplete="off"></div></div>'; }
  function capRows(f) {
    var tot = 0; Object.keys(f.issued || {}).forEach(function (k) { Object.keys(f.issued[k]).forEach(function (c) { var u = f.units.filter(function (x) { return x.name === c; })[0]; if (u) tot += f.issued[k][c] * u.value; }); });
    return f.lps.map(function (l) { var row = (f.issued || {})[l.id] || {}, v = sum(Object.keys(row), function (c) { var u = f.units.filter(function (x) { return x.name === c; })[0]; return u ? row[c] * u.value : 0; }); return '<tr><td><div class="who">' + av(l.name, 'mini-av') + '<b>' + esc(l.name) + '</b></div></td>' + f.units.map(function (u) { return '<td class="r num">' + (row[u.name] || 0).toLocaleString() + '</td>'; }).join('') + '<td class="r num"><b>' + (tot ? (v / tot * 100).toFixed(1) : '0.0') + '%</b></td></tr>'; }).join('');
  }
  function bindCap(f) {
    $$('[data-u]').forEach(function (inp) {
      inp.oninput = function () {
        capDraft.rows[+inp.dataset.u][inp.dataset.k] = inp.value;
        var v = capDraft.rows.filter(function (r) { return r.name && num(r.count) > 0 && num(r.value) > 0; });
        $('#capSum').innerHTML = '<div><span>Unit classes</span><b class="num">' + v.length + '</b></div><div><span>Total units</span><b class="num">' + sum(v, function (r) { return num(r.count); }).toLocaleString() + '</b></div><div><span>Total value</span><b class="num">' + m(sum(v, function (r) { return num(r.count) * num(r.value); })) + '</b></div>';
        $('#capNext').disabled = !v.length; $('#capHint').textContent = v.length ? v.length + ' unit class' + (v.length > 1 ? 'es' : '') + ' ready' : 'Add at least one unit class to continue';
      };
    });
    var cs = $('#isCls'); if (cs) cs.onchange = function () { issueDraft.cls = cs.value; var U = f.units.filter(function (u) { return u.name === cs.value; })[0], c = calc(f); f.lps.forEach(function (l) { issueDraft.alloc[l.id] = f.issued && f.issued[l.id] && f.issued[l.id][U.name] != null ? f.issued[l.id][U.name] : (c.commit ? Math.floor(U.count * l.commit / c.commit) : 0); }); render(); };
    $$('[data-alloc]').forEach(function (i) { i.onchange = function () { issueDraft.alloc[i.dataset.alloc] = Math.max(0, Math.round(num(i.value))); render(); var n = $('[data-alloc="' + i.dataset.alloc + '"]'); if (n) n.focus(); }; });
  }
  function capCalls(f) {
    var c = calc(f), calledPct = c.commit ? c.paid / c.commit * 100 : 0;
    return '<div class="split"><section class="card"><div class="toolbar"><h2>Capital calls</h2><span style="color:var(--mut)">' + calledPct.toFixed(1) + '% of commitments called</span><span style="margin-left:auto"></span><button class="btn pri small" style="height:38px" data-a="newCall"' + (c.commit ? '' : ' disabled') + '>' + ic('plus', 'sm') + 'New capital call</button></div>' +
      (f.calls.length ? '<div class="tbl-wrap"><table><thead><tr><th>Call</th><th>Purpose</th><th class="r">% of commitment</th><th class="r">Amount</th><th>Due</th><th>Status</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' + f.calls.slice().reverse().map(function (k) { return '<tr><td><b>Call ' + k.no + '</b></td><td>' + esc(k.purpose) + '</td><td class="r num">' + (+k.pct).toFixed(2) + '%</td><td class="r num"><b>' + m(k.amount) + '</b></td><td>' + dF(k.due) + '</td><td>' + (k.st === 'Paid' ? '<span class="tag g dot">Paid</span>' : '<span class="tag dot">Open</span>') + '</td><td class="r">' + (k.st === 'Open' ? '<button class="btn sec small" data-a="callPaid" data-id="' + k.id + '">' + ic('check', 'sm') + 'Mark received</button>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div>'
        : '<div class="empty"><b>No capital calls yet</b>' + (c.commit ? 'Issue the first call when the fund needs capital.' : 'Invite LPs with commitments before you call capital.') + '</div>') + '</section>' +
      '<aside class="stack"><section class="card"><div class="sum-h"><h3>Commitment drawdown</h3><small>' + m(c.paid) + ' called of ' + m(c.commit) + '</small><div class="bar"><i style="width:' + calledPct + '%;background:var(--gold)"></i></div></div><div class="kv"><div><span>Undrawn</span><b class="num">' + m(c.undrawn) + '</b></div><div><span>Calls issued</span><b class="num">' + f.calls.length + '</b></div><div><span>Open calls</span><b class="num">' + f.calls.filter(function (k) { return k.st === 'Open'; }).length + '</b></div></div></section></aside></div>';
  }
  var wfIn = null;
  function waterfall(f) {
    var c = calc(f);
    if (!wfIn || wfIn.fid !== f.id) wfIn = { fid: f.id, proceeds: Math.round((c.paid || f.size * .3) * 1.8), years: 5 };
    var paid = c.paid || f.size * .3, P = wfIn.proceeds, h = f.hurdle / 100, cr = f.carry / 100;
    var t1 = Math.min(P, paid), rem = P - t1, pref = paid * (Math.pow(1 + h, wfIn.years) - 1), t2 = Math.min(rem, pref); rem -= t2;
    var cuNeed = t2 * cr / (1 - cr), t3 = Math.min(rem, cuNeed); rem -= t3;
    var t4lp = rem * (1 - cr), t4gp = rem * cr, lp = t1 + t2 + t4lp, gp = t3 + t4gp, mx = Math.max(P, 1), acc = 0;
    function row(name, sub, lpv, gpv) { var s = acc / mx * 100, w1 = lpv / mx * 100, w2 = gpv / mx * 100; acc += lpv + gpv; return '<div class="wf-row"><div><b>' + name + '</b><small>' + sub + '</small></div><div class="wf-bar"><i style="left:' + s + '%;width:' + w1 + '%;background:#8aabd6"></i><i style="left:' + (s + w1) + '%;width:' + w2 + '%;background:var(--gold)"></i></div><b class="num" style="text-align:right">' + m(lpv + gpv) + '</b></div>'; }
    return '<div class="split"><section class="card"><div class="card-h"><h2>European waterfall</h2><p>' + f.hurdle + '% hurdle · ' + f.carry + '% carry · full GP catch-up</p></div><div class="card-b"><div class="form-g" style="margin-bottom:22px">' + fld('wfP', 'Distributable proceeds', wfIn.proceeds.toLocaleString(), { pre: CCY[S.ccy][0], mode: 'decimal' }) + fld('wfY', 'Years held', wfIn.years, { opts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }) + '</div>' +
      '<div class="wf">' + row('1 · Return of capital', 'LPs get paid-in capital back first', t1, 0) + row('2 · Preferred return', f.hurdle + '% compounding on ' + m(paid), t2, 0) + row('3 · GP catch-up', '100% to GP until it has ' + f.carry + '% of profit', 0, t3) + row('4 · Carried interest', (100 - f.carry) + ' / ' + f.carry + ' split of the rest', t4lp, t4gp) + '</div>' +
      '<div class="cmp" style="margin:22px 0 0;padding-bottom:0"><h3>Who gets what</h3><div class="bar" style="height:14px"><i style="width:' + lp / mx * 100 + '%;background:#8aabd6"></i><i style="width:' + gp / mx * 100 + '%;background:var(--gold)"></i></div><div class="wf-split" style="margin-top:12px"><span>Limited partners <b class="num">' + m(lp) + '</b> (' + (lp / mx * 100).toFixed(1) + '%)</span><span>General partner <b class="num">' + m(gp) + '</b> (' + (gp / mx * 100).toFixed(1) + '%)</span><span>LP multiple <b>' + x2(lp / paid) + '</b></span></div></div></div></section>' +
      '<aside class="stack"><section class="card side-note"><h3><span class="ic">' + ic('water', 'sm') + '</span>How to read this</h3><ul><li>Each tier fills before the next one starts.</li><li>Blue goes to limited partners, gold to the general partner.</li><li>Paid-in capital is ' + m(paid) + (c.paid ? ' from capital calls to date.' : ', an assumed 30% of corpus because nothing is called yet.') + '</li></ul></section></aside></div>';
  }
  function bindWf() {
    var p = $('#wfP'), y = $('#wfY');
    p.onchange = function () { wfIn.proceeds = Math.max(0, Math.round(num(p.value))); render(); $('#wfP').focus(); };
    p.onkeydown = function (e) { if (e.key === 'Enter') p.onchange(); };
    y.onchange = function () { wfIn.years = +y.value; render(); $('#wfY').focus(); };
  }

  /* ---------- workspace: activities, updates, calendar ---------- */
  VIEWS.activities = function () {
    var list = S.act.filter(function (a) { return S.ui.actF === 'all' || a.f === S.ui.actF; });
    return {
      crumbs: [['Workspace', '#/activities'], ['Activities']],
      html: '<div class="ph"><div class="t"><h1>Activities</h1><p>Everything that happened across your funds, newest first.</p></div><label class="sel"><span class="sr">Filter by fund</span><select id="actF"><option value="all">All funds</option>' + S.funds.map(function (f) { return '<option value="' + f.id + '"' + (S.ui.actF === f.id ? ' selected' : '') + '>' + esc(f.name) + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm') + '</label></div>' +
        '<section class="card feed">' + (list.length ? list.map(function (a) { return '<div class="ev"><span class="ic">' + ic(P[a.ic] ? a.ic : 'pulse', 'sm') + '</span><div><p><b>' + esc(a.who) + '</b> ' + esc(a.t) + '</p><small>' + esc(F(a.f).name) + '</small></div><time>' + ago(a.at) + '</time></div>'; }).join('') : '<div class="empty"><b>No activity yet</b>Actions on this fund will show here.</div>') + '</section>',
      after: function () { $('#actF').onchange = function () { S.ui.actF = this.value; save(); render(); }; }
    };
  };
  VIEWS.updates = function () {
    var f = F(), posts = S.posts.filter(function (p) { return p.f === f.id; }).sort(function (a, b) { return b.at - a.at; });
    return {
      crumbs: [['Workspace', '#/activities'], ['Updates']],
      html: '<div class="ph"><div class="t"><h1>Updates</h1><p>Letters and announcements to the LPs of ' + esc(f.name) + '.</p></div></div>' +
        '<div class="split"><div class="stack"><section class="card"><div class="card-h"><h2>New update</h2></div><form class="card-b" id="postF" style="display:grid;gap:14px" novalidate>' + fld('poT', 'Title', '', { ph: 'e.g. Q3 2026 portfolio update' }) + '<div class="f"><label for="poB">Message</label><textarea class="ta" id="poB" placeholder="What should LPs know?"></textarea><span class="msg" data-msg="poB" hidden></span></div>' +
          '<div style="display:flex;gap:12px;align-items:end;flex-wrap:wrap">' + fld('poA', 'Audience', 'All LPs', { opts: ['All LPs', 'LPAC only', 'Team only'] }) + '<button class="btn pri" type="submit" style="margin-left:auto">' + ic('send', 'sm') + 'Publish update</button></div></form></section>' +
        '<section class="card">' + (posts.length ? posts.map(function (p) { return '<article class="post"><div class="meta">' + av(p.by, 'mini-av') + esc(p.by) + ' · ' + ago(p.at) + '<span class="tag b" style="margin-left:auto">' + esc(p.aud) + '</span></div><h3>' + esc(p.title) + '</h3><p>' + esc(p.body) + '</p></article>'; }).join('') : '<div class="empty"><b>No updates yet</b>Your first letter to LPs will appear here.</div>') + '</section></div>' +
        '<aside class="stack"><section class="card side-note"><h3><span class="ic">' + ic('users', 'sm') + '</span>Who receives this</h3><ul><li>All LPs: ' + f.lps.length + ' investors</li><li>LPAC only: ' + f.lps.filter(function (l) { return l.lpac; }).length + ' members</li><li>Team only: ' + cntTeam(f) + ' people</li></ul></section></aside></div>',
      after: function () {
        $('#postF').onsubmit = function (e) {
          e.preventDefault(); var t = val('poT'), b = val('poB');
          if (!t) return err('poT', 'Give the update a title.'); if (!b) return err('poB', 'Write the message.');
          S.posts.push({ id: uid(), f: f.id, title: t, body: b, by: S.user.name, at: Date.now(), aud: val('poA') }); log('published “' + t + '” to ' + val('poA'), 'send'); save(); render(); toast('Update published', 'Sent to ' + val('poA') + ' of ' + f.name);
        };
      }
    };
  };
  function cntTeam(f) { return sum(Object.keys(f.team), function (k) { return f.team[k].length; }); }
  function allEvents() {
    var ev = S.events.map(function (e) { return { t: e.t, d: e.d, k: e.k, f: e.f }; });
    S.funds.forEach(function (f) { f.calls.forEach(function (c) { ev.push({ t: 'Call ' + c.no + ' due · ' + f.short, d: c.due, k: c.st === 'Open' ? 'r' : 'g', f: f.id }); }); f.tasks.forEach(function (t) { if (t.st === 'open') ev.push({ t: t.title, d: t.due, k: 'b', f: f.id }); }); });
    return ev;
  }
  VIEWS.calendar = function () {
    var y = S.ui.calY, mo = S.ui.calM, first = new Date(y, mo, 1), start = new Date(y, mo, 1 - ((first.getDay() + 6) % 7)), ev = allEvents(), cells = '';
    for (var i = 0; i < 42; i++) {
      var d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i), out = d.getMonth() !== mo, today = d.getFullYear() === TY && d.getMonth() === TM && d.getDate() === TD;
      var es = ev.filter(function (e) { var x = new Date(e.d); return x.getFullYear() === d.getFullYear() && x.getMonth() === d.getMonth() && x.getDate() === d.getDate(); });
      cells += '<div class="day' + (out ? ' out' : '') + (today ? ' today' : '') + '"><span class="d">' + d.getDate() + '</span>' + es.slice(0, 3).map(function (e) { return '<span class="e ' + e.k + '" title="' + esc(e.t) + '">' + esc(e.t) + '</span>'; }).join('') + (es.length > 3 ? '<span class="e">+' + (es.length - 3) + ' more</span>' : '') + '</div>';
      if (i === 34 && new Date(start.getFullYear(), start.getMonth(), start.getDate() + 35).getMonth() !== mo) break;
    }
    var upcoming = ev.filter(function (e) { return e.d >= day(TY, TM, TD); }).sort(function (a, b) { return a.d - b.d; }).slice(0, 6);
    return {
      crumbs: [['Workspace', '#/activities'], ['Calendar']],
      html: '<div class="ph"><div class="t"><h1>Calendar</h1><p>Capital call deadlines, task due dates and fund events.</p></div><button class="btn pri" data-a="addEvent">' + ic('plus', 'sm') + 'Add event</button></div>' +
        '<div class="split"><section class="card"><div class="cal-h"><h2>' + MONL[mo] + ' ' + y + '</h2><button class="row-menu" data-a="calNav" data-v="-1" aria-label="Previous month">' + ic('chevl', 'sm') + '</button><button class="row-menu" data-a="calNav" data-v="1" aria-label="Next month">' + ic('chevr', 'sm') + '</button><button class="btn sec small" data-a="calToday" style="margin-left:auto">Today</button></div>' +
          '<div class="cal">' + ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(function (d) { return '<div class="dow">' + d + '</div>'; }).join('') + cells + '</div></section>' +
        '<aside class="stack"><section class="card"><div class="sum-h"><h3>Coming up</h3></div><div class="agenda">' + (upcoming.length ? upcoming.map(function (e) { var d = new Date(e.d); return '<div><span class="dt"><small>' + MON[d.getMonth()] + '</small><b>' + d.getDate() + '</b></span><span class="m"><b>' + esc(e.t) + '</b><small>' + esc(F(e.f).name) + '</small></span></div>'; }).join('') : '<div class="empty">Nothing scheduled.</div>') + '</div></section></aside></div>'
    };
  };

  /* ---------- modals ---------- */
  function assignTask(title) {
    var f = F(), ppl = people(f);
    modal(mhead('uplus', 'Assign task', 'Hand work to someone in ' + f.name + '’s network. They’re notified by email.') + '<form class="m-body" id="atF" novalidate>' + fld('atT', 'Task', title || '', { ph: 'e.g. Upload signed side letter', af: !title }) +
      '<div class="form-g">' + '<div class="f"><label for="atTo">Assign to</label><div class="inp"><select id="atTo">' + ppl.map(function (p) { return '<option value="' + esc(p.name) + '">' + esc(p.name) + ' · ' + esc(p.g) + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm') + '</div></div>' + fld('atD', 'Due date', new Date(rel(7)).toISOString().slice(0, 10), { type: 'date' }) + '</div></form>' +
      '<div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="atGo">' + ic('send', 'sm') + 'Assign</button></div>');
    function go(e) { if (e) e.preventDefault(); var t = val('atT'); if (!t) return err('atT', 'Describe the task.'); var to = val('atTo'), d = $('#atD').value ? new Date($('#atD').value + 'T10:00').getTime() : rel(7); f.tasks.push({ id: uid(), title: t, to: to, due: d, st: 'open' }); log('assigned “' + t + '” to ' + to, 'uplus'); save(); closeModal(); render(); toast('Task assigned', to + ' · due ' + dF(d), { href: '#/management' }); }
    $('#atGo').onclick = go; $('#atF').onsubmit = go;
  }
  function delegateMenu(anchor, onPick) {
    var f = F(), ppl = people(f);
    var d = pop(anchor, '<p class="ph">Delegate to</p>' + ppl.map(function (p, i) { return '<button class="mi" data-pick="' + i + '">' + av(p.name, 'mini-av') + '<span>' + esc(p.name) + '<small>' + esc(p.g) + '</small></span></button>'; }).join(''), '', true);
    if (!d) return; d.style.maxHeight = '320px'; d.style.overflow = 'auto';
    $$('[data-pick]', d).forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); closePops(); onPick(ppl[+b.dataset.pick]); }; });
  }
  function lpModal(lp) {
    var f = F(), c = calc(f), share = c.commit ? lp.commit / c.commit : 0;
    modal(mhead(null, lp.name, lp.kind + ' · ' + lp.email) + '<div class="m-body"><div class="g3">' + [['Commitment', m(lp.commit)], ['Called', m(lp.called)], ['Distributed', m(lp.dist)]].map(function (k) { return '<div class="card stat" style="padding:14px"><div><small>' + k[0] + '</small><b class="num" style="font-size:19px">' + k[1] + '</b></div></div>'; }).join('') + '</div>' +
      '<div><p class="lab" style="margin-bottom:8px">Capital call history</p><div class="card"><div class="tbl-wrap"><table><thead><tr><th>Call</th><th>Due</th><th class="r">Share</th><th>Status</th></tr></thead><tbody>' + (f.calls.length ? f.calls.map(function (k) { return '<tr><td>Call ' + k.no + '</td><td>' + dF(k.due) + '</td><td class="r num">' + m(k.amount * share) + '</td><td>' + (k.st === 'Paid' ? '<span class="tag g dot">Paid</span>' : '<span class="tag dot">Open</span>') + '</td></tr>'; }).join('') : '<tr><td colspan="4" class="empty">No calls yet.</td></tr>') + '</tbody></table></div></div></div>' +
      '<label class="chk"><input type="checkbox" id="lpLpac"' + (lp.lpac ? ' checked' : '') + '>Member of the LP advisory committee (LPAC)</label></div>' +
      '<div class="m-foot"><span class="l">' + (share * 100).toFixed(1) + '% of commitments</span>' + (lp.st === 'Invited' ? '<button class="btn sec" id="lpAct">' + ic('check', 'sm') + 'Mark subscription signed</button>' : '') + '<button class="btn pri" data-a="close">Done</button></div>', 'wide');
    $('#lpLpac').onchange = function () { lp.lpac = this.checked; save(); render(); toast('LPAC updated', lp.name + (lp.lpac ? ' joined' : ' left') + ' the LPAC'); };
    var a = $('#lpAct'); if (a) a.onclick = function () { lp.st = 'Active'; log('recorded ' + lp.name + '’s signed subscription', 'pen'); save(); closeModal(); render(); toast('Subscription signed', lp.name + ' is now an active LP'); };
  }
  function cmd() {
    var f = F(), items = [
      { g: 'Actions', t: 'Add fund', s: 'Stand up a new vehicle', ic: 'plus', run: function () { location.hash = '#/funds/new'; } },
      { g: 'Actions', t: 'Assign task', s: 'Hand work to someone in the network', ic: 'uplus', run: function () { assignTask(); } },
      { g: 'Actions', t: 'New capital call', s: 'Analytics · Capital calls', ic: 'arrdn', run: function () { S.ui.aTab = 'calls'; location.hash = '#/analytics'; } }
    ].concat(S.funds.map(function (x) { return { g: 'Funds', t: x.name, s: 'Fund ' + fundIdx(x) + ' · ' + x.round + ' · ' + m(x.size), ic: 'brief', run: function () { switchFund(x.id); location.hash = '#/overview'; } }; }))
      .concat(f.lps.map(function (l) { return { g: 'Limited partners', t: l.name, s: l.kind + ' · ' + m(l.commit), ic: 'users', run: function () { S.ui.cTab = 'lps'; location.hash = '#/constituents'; setTimeout(function () { lpModal(l); }, 30); } }; }))
      .concat(f.portfolio.map(function (p) { return { g: 'Portfolio', t: p.name, s: p.sector + ' · ' + x2(p.value / p.invested), ic: 'bld', run: function () { S.ui.cTab = 'port'; location.hash = '#/constituents'; } }; }))
      .concat(people(f).map(function (p) { return { g: 'People', t: p.name, s: p.g + ' · ' + p.email, ic: 'net', run: function () { location.hash = '#/network'; } }; }));
    var sel = 0, shown = items;
    modal('<div class="cmd-in">' + ic('search') + '<input id="cq" placeholder="Search funds, LPs, companies, people…" autocomplete="off" autofocus aria-label="Search"><kbd>Esc</kbd></div><div class="cmd-list" id="cl" role="listbox"></div>', 'cmd', function (e) {
      if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
      if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); var it = shown[sel]; closeModal(); it.run(); }
    });
    function draw() {
      var q = $('#cq').value.toLowerCase().trim(), g = '';
      shown = items.filter(function (i) { return !q || (i.t + ' ' + i.s).toLowerCase().indexOf(q) > -1; }); if (sel >= shown.length) sel = 0;
      $('#cl').innerHTML = shown.length ? shown.slice(0, 40).map(function (i, n) { var h = i.g !== g ? '<h4>' + i.g + '</h4>' : ''; g = i.g; return h + '<button role="option" aria-selected="' + (n === sel) + '" class="' + (n === sel ? 'on' : '') + '" data-n="' + n + '"><span class="ic">' + ic(i.ic, 'sm') + '</span><span><b>' + esc(i.t) + '</b><small>' + esc(i.s) + '</small></span></button>'; }).join('') : '<div class="empty"><b>No matches</b>Try a fund, LP, company or teammate.</div>';
      var on = $('#cl .on'); if (on) on.scrollIntoView({ block: 'nearest' });
      $$('#cl button').forEach(function (b) { b.onclick = function () { var it = shown[+b.dataset.n]; closeModal(); it.run(); }; });
    }
    $('#cq').oninput = function () { sel = 0; draw(); }; draw();
  }
  function switchFund(id) { S.cur = id; capDraft = issueDraft = wfIn = null; netSel = {}; save(); }

  /* ---------- popovers ---------- */
  function closePops() { $$('.pop').forEach(function (p) { p.remove(); }); }
  function pop(anchor, html, cls, left) { var open = anchor.parentNode.querySelector('.pop'); closePops(); if (open) return null; var d = document.createElement('div'); d.className = 'pop ' + (cls || '') + (left ? ' left' : ''); d.innerHTML = html; anchor.parentNode.appendChild(d); return d; }

  /* ---------- actions ---------- */
  var A = {
    close: closeModal,
    burger: function () { $('#side').classList.toggle('open'); },
    cmd: cmd,
    fundMenu: function (el) {
      pop(el, '<p class="ph" style="color:var(--side-dim)">Switch fund</p>' + S.funds.map(function (f) { return '<button class="mi" data-a="switch" data-id="' + f.id + '"><span class="fbadge' + fcls(f) + '" style="width:30px;height:30px;font-size:11px">' + esc(f.short) + '</span><span>' + esc(f.name) + '<small>Fund ' + fundIdx(f) + ' · ' + esc(f.round) + '</small></span>' + (f.id === S.cur ? '<span class="tick">' + ic('check', 'sm') + '</span>' : '') + '</button>'; }).join('') + '<hr><button class="mi" data-a="goAdd">' + ic('plus', 'sm') + 'Add fund</button>', 'dark', true);
    },
    switch: function (el) { closePops(); var id = el.dataset.id; switchFund(id); var p = route()[0]; if (FUND_PAGES.indexOf(p) < 0 && p !== 'network') location.hash = '#/overview'; else render(); toast('Switched fund', F().name); },
    goAdd: function () { closePops(); location.hash = '#/funds/new'; },
    ccyMenu: function (el) { pop(el, '<p class="ph">Display currency</p>' + Object.keys(CCY).map(function (k) { return '<button class="mi' + (S.ccy === k ? ' on' : '') + '" data-a="setCcy" data-v="' + k + '"><b style="width:26px;color:var(--gold)">' + CCY[k][0] + '</b>' + k + (S.ccy === k ? '<span class="tick">' + ic('check', 'sm') + '</span>' : '') + '</button>'; }).join('') + '<p class="help" style="padding:6px 10px 8px">Converted at fixed rates for display. Funds report in USD.</p>'); },
    setCcy: function (el) { S.ccy = el.dataset.v; save(); closePops(); render(); },
    notifs: function (el) { var d = pop(el, '<p class="ph">Notifications</p>' + (S.notifs.length ? S.notifs.map(function (n, i) { return '<button class="mi" data-a="goNotif" data-i="' + i + '"><span class="av' + (n.read ? ' a5' : '') + '" style="width:32px;height:32px">' + ic('bell', 'sm') + '</span><span><b style="font-weight:' + (n.read ? 500 : 600) + '">' + esc(n.t) + '</b><small>' + esc(n.sub) + ' · ' + ago(n.at) + '</small></span></button>'; }).join('') : '<div class="empty">You’re all caught up.</div>'), 'notif'); if (d) { S.notifs.forEach(function (n) { n.read = true; }); save(); var p = el.querySelector('.pip'); if (p) p.remove(); } },
    goNotif: function (el) { var n = S.notifs[+el.dataset.i]; closePops(); if (n.href) location.hash = n.href; },
    userMenu: function (el) { pop(el, '<div style="display:flex;gap:10px;align-items:center;padding:10px">' + av(S.user.name) + '<span><b>' + esc(S.user.name) + '</b><small style="display:block;color:var(--mut)">' + esc(S.user.email) + '</small></span></div><hr><button class="mi" data-a="sec">' + ic('shield', 'sm') + '<span>Two-factor authentication<small>On · authenticator app</small></span></button><button class="mi" data-a="reset">' + ic('refresh', 'sm') + 'Reset prototype data</button><hr><button class="mi danger" data-a="signout">' + ic('out', 'sm') + 'Sign out</button>', el.closest('.side') ? 'left' : ''); var p = el.parentNode.querySelector('.pop'); if (p && el.closest('.side')) { p.style.top = 'auto'; p.style.bottom = 'calc(100% + 8px)'; p.style.right = '0'; p.style.left = 'auto'; } },
    sec: function () { closePops(); toast('Two-factor is on', 'Codes are required at every sign-in and for approving delegations', { icon: 'shield' }); },
    signout: function () { closePops(); authed = false; try { sessionStorage.removeItem('captl01-auth'); } catch (e) {} location.hash = '#/login'; },
    reset: function () { closePops(); confirmBox('Reset prototype data?', 'Funds, LPs, tasks and settings go back to the starting demo state.', 'Reset', function () { S = seed(); AF = capDraft = issueDraft = wfIn = null; save(); render(); toast('Prototype reset', 'Starting data restored', { icon: 'refresh' }); }, true); },
    docs: function () {
      modal(mhead('book', 'CAPTL guides', 'Short how-tos for the work partners do most.') + '<div class="m-body">' + [['Stand up a new fund', 'Fund Management → Add Fund. Step 1 names the vehicle; step 2 attaches the trust deed, IMA and regulatory approval. Each one can be uploaded or delegated, so a missing paper never blocks you.'], ['Issue units to LPs', 'Analytics → Cap table. Define unit classes, then issue them. Allocations default to each LP’s share of commitments.'], ['Call capital', 'Analytics → Capital calls → New capital call. Pick a percentage of commitments; CAPTL splits it across LPs and adds the due date to the calendar.'], ['Delegate a document', 'Management → Documents → Delegate. The person gets a task and a reminder button appears under Delegations.']].map(function (g, i) { return '<details class="card" style="padding:14px 16px"' + (i === 0 ? ' open' : '') + '><summary style="font-weight:600;cursor:pointer">' + g[0] + '</summary><p style="color:var(--ink2);margin-top:8px">' + g[1] + '</p></details>'; }).join('') + '</div>', 'wide');
    },
    support: function () {
      modal(mhead('life', 'Contact support', 'Our fund operations team replies within one business day.') + '<div class="m-body">' + fld('suT', 'Topic', 'Fund setup', { opts: ['Fund setup', 'LP onboarding', 'Capital calls', 'Something else'] }) + '<div class="f"><label for="suM">Message</label><textarea class="ta" id="suM" placeholder="Tell us what you need help with" autofocus></textarea><span class="msg" data-msg="suM" hidden></span></div></div><div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="suGo">' + ic('send', 'sm') + 'Send</button></div>');
      $('#suGo').onclick = function () { if (!val('suM')) return err('suM', 'Write a message first.'); closeModal(); toast('Message sent', 'We’ll reply to ' + S.user.email, { icon: 'mail' }); };
    },
    export: function () {
      var f = F(), c = calc(f), rows = [['Metric', 'Value'], ['Fund', f.name], ['Fund corpus', f.size], ['Capital commitment', c.commit], ['Drawdown', c.paid], ['Undrawn', c.undrawn], ['Distribution', c.dist], ['NAV', Math.round(c.nav)], ['DPI', c.early ? '' : c.dpi.toFixed(3)], ['RVPI', c.early ? '' : c.rvpi.toFixed(3)], ['TVPI', c.early ? '' : c.tvpi.toFixed(3)], ['MOIC (gross)', c.inv ? c.moic.toFixed(3) : '']].concat([[''], ['LP', 'Commitment', 'Called', 'Distributed']]).concat(f.lps.map(function (l) { return [l.name, l.commit, l.called, l.dist]; }));
      download(f.name.replace(/\W+/g, '_') + '_overview.csv', rows.map(function (r) { return r.map(function (v) { return /,/.test(v) ? '"' + v + '"' : v; }).join(','); }).join('\n'), 'text/csv'); toast('Export ready', 'Overview and LP balances as CSV', { icon: 'down' });
    },
    openFund: function (el, e) { if (e.target.closest('.row-menu')) return; switchFund(el.dataset.id); location.hash = '#/overview'; },
    fundRow: function (el, e) { e.stopPropagation(); var id = el.dataset.id; var d = pop(el, '<button class="mi" data-a="rowOpen" data-id="' + id + '">' + ic('grid', 'sm') + 'Open overview</button><button class="mi" data-a="rowManage" data-id="' + id + '">' + ic('layers', 'sm') + 'Documents &amp; tasks</button><button class="mi" data-a="rowNet" data-id="' + id + '">' + ic('net', 'sm') + 'Fund network</button>'); },
    rowOpen: function (el, e) { e.stopPropagation(); closePops(); switchFund(el.dataset.id); location.hash = '#/overview'; },
    rowManage: function (el, e) { e.stopPropagation(); closePops(); switchFund(el.dataset.id); location.hash = '#/management'; },
    rowNet: function (el, e) { e.stopPropagation(); closePops(); switchFund(el.dataset.id); location.hash = '#/network'; },
    sortMenu: function (el) { pop(el, [['created', 'Newest first'], ['name', 'Name A–Z'], ['size', 'Fund size']].map(function (s) { return '<button class="mi' + (S.ui.fmSort === s[0] ? ' on' : '') + '" data-a="setSort" data-v="' + s[0] + '">' + s[1] + (S.ui.fmSort === s[0] ? '<span class="tick">' + ic('check', 'sm') + '</span>' : '') + '</button>'; }).join('')); },
    setSort: function (el) { S.ui.fmSort = el.dataset.v; save(); closePops(); render(); },
    fmClear: function () { S.ui.fmQ = S.ui.fmRound = S.ui.fmVint = ''; save(); render(); },
    // add fund
    afNext: function () {
      var a = AF; ['name', 'company', 'type', 'round', 'vintage', 'size', 'mgmt'].forEach(function (k) { var e = $('#af_' + k); if (e) a[k] = e.value.trim(); });
      if (!a.name) return err('af_name', 'Name the fund.');
      if (S.funds.some(function (f) { return f.name.toLowerCase() === a.name.toLowerCase(); })) return err('af_name', 'A fund with this name already exists.');
      if (!a.company) return err('af_company', 'Enter the company name.');
      if (!(num(a.size) > 0)) return err('af_size', 'Enter the fund size.');
      a.step = 2; render(); window.scrollTo(0, 0);
    },
    afBack: function () { AF.step = 1; render(); },
    afDelegate: function (el) { var k = el.dataset.k; delegateMenu(el, function (p) { AF.docs[k] = { st: 'delegated', to: p.name }; render(); toast('Delegated', AF_DOCS.filter(function (d) { return d[0] === k; })[0][1] + ' → ' + p.name, { icon: 'uplus' }); }); },
    afCancelUp: function (el) { clearInterval(upTimers[el.dataset.k]); AF.docs[el.dataset.k] = { st: 'none' }; render(); },
    afReset: function (el) { AF.docs[el.dataset.k] = { st: 'none' }; render(); },
    afAddLp: function () {
      var n = val('lp_name'), e = val('lp_email'), c = num(val('lp_commit'));
      if (!n) return err('lp_name', 'Enter the LP’s name.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return err('lp_email', 'Enter a valid email address.');
      if (AF.lps.some(function (l) { return l.email.toLowerCase() === e.toLowerCase(); })) return err('lp_email', 'This LP is already invited.');
      AF.lps.push({ name: n, email: e, commit: c / CCY[S.ccy][1] }); render(); var f = $('#lp_name'); if (f) f.focus();
    },
    afRmLp: function (el) { AF.lps.splice(+el.dataset.i, 1); render(); },
    afAddPort: function () { var n = val('pc_name'); if (!n) return err('pc_name', 'Enter the company name.'); AF.port.push({ name: n, sector: val('pc_sector'), invested: num(val('pc_inv')) / CCY[S.ccy][1] }); render(); var f = $('#pc_name'); if (f) f.focus(); },
    afRmPort: function (el) { AF.port.splice(+el.dataset.i, 1); render(); },
    afSubmit: function () {
      if (!afReady()) return;
      var a = AF, id = 'f' + uid(), cur = F(), lead = { id: uid(), name: S.user.name, email: S.user.email };
      var f = {
        id: id, no: String(415679 + S.funds.length * 37), name: a.name, short: ini(a.name).slice(0, 2) || 'FN', company: a.company, round: a.round, vintage: +a.vintage, created: Date.now(), size: num(a.size) / CCY[S.ccy][1], type: a.type, mgmtPct: num(a.mgmt) || 2, hurdle: 8, carry: 20,
        alloc: { fees: 0, opex: 0, estab: 0 },
        lps: a.lps.map(function (l) { return { id: uid(), name: l.name, email: l.email, kind: 'Individual', commit: l.commit || 0, called: 0, dist: 0, st: 'Invited', lpac: a.lpac }; }),
        portfolio: a.port.map(function (p) { return { id: uid(), name: p.name, sector: p.sector, invested: p.invested || 0, value: p.invested || 0, at: Date.now() }; }).filter(function (p) { return p.invested > 0; }),
        docs: AF_DOCS.map(function (d) { var s = a.docs[d[0]]; return { id: uid(), name: d[1], st: s.st, file: s.file, to: s.to, at: Date.now() }; }),
        tasks: [], units: [], capStep: 1, issued: null, calls: [],
        team: { Partners: [lead], Principals: [], Associates: [], Analysts: [] }, prov: JSON.parse(JSON.stringify(cur.prov)),
        life: [['Fund formed', Date.now()], ['First close', rel(90)], ['Investment period ends', day(TY + 5, TM, 1)], ['Harvest', day(TY + 8, TM, 1)], ['Term ends', day(TY + 10, TM, 1)]]
      };
      f.docs.forEach(function (d) { if (d.st === 'delegated') f.tasks.push({ id: uid(), title: 'Provide ' + d.name, to: d.to, due: rel(14), st: 'open', doc: d.id }); });
      S.funds.push(f); log('created ' + f.name + ' with ' + f.lps.length + ' LP invite' + (f.lps.length === 1 ? '' : 's'), 'plus', id); switchFund(id); AF = null; save();
      location.hash = '#/overview'; setTimeout(function () { toast('Fund created', f.name + ' is live on Fund Management', { href: '#/funds' }); }, 50);
    },
    // network
    netTab: function (el) { S.ui.netTab = el.dataset.v; netSel = {}; netAdd = null; save(); render(); },
    netView: function (el) { S.ui.netView = el.dataset.v; save(); render(); },
    netClear: function () { netSel = {}; render(); },
    netAdd: function (el) { netAdd = el.dataset.g; render(); },
    netAddCancel: function () { netAdd = null; render(); },
    memMenu: function (el) { var g = el.dataset.g, id = el.dataset.id; pop(el, '<button class="mi" data-a="memTask" data-g="' + esc(g) + '" data-id="' + id + '">' + ic('uplus', 'sm') + 'Assign task</button><button class="mi" data-a="memMail" data-id="' + id + '">' + ic('mail', 'sm') + 'Copy email</button><hr><button class="mi danger" data-a="memRm" data-g="' + esc(g) + '" data-id="' + id + '">' + ic('trash', 'sm') + 'Remove from fund</button>'); },
    memTask: function (el) { closePops(); assignTask(); var g = groupOf(el.dataset.g), p = g.filter(function (x) { return x.id === el.dataset.id; })[0]; if (p) $('#atTo').value = p.name; },
    memMail: function (el) { closePops(); var p = findMem(el.dataset.id); try { navigator.clipboard.writeText(p.email).catch(function () {}); } catch (e) {} toast('Email copied', p.email, { icon: 'mail' }); },
    memRm: function (el) { closePops(); var g = groupOf(el.dataset.g), p = g.filter(function (x) { return x.id === el.dataset.id; })[0]; confirmBox('Remove ' + p.name + '?', 'They lose access to ' + F().name + '. Their past activity stays in the log.', 'Remove', function () { g.splice(g.indexOf(p), 1); delete netSel[p.id]; log('removed ' + p.name + ' from ' + el.dataset.g, 'trash'); save(); render(); toast('Removed', p.name + ' no longer has access', { icon: 'trash' }); }, true); },
    configure: function () {
      var f = F(), src = S.ui.netTab === 'team' ? f.team : f.prov, list = []; Object.keys(src).forEach(function (g) { src[g].forEach(function (p) { if (!Object.keys(netSel).some(function (k) { return netSel[k]; }) || netSel[p.id]) list.push(p); }); });
      modal(mhead('gear', 'Configure access', list.length + ' ' + (list.length === 1 ? 'person' : 'people') + ' in ' + f.name) + '<div class="m-body"><div><div class="perm h"><span>Person</span><span>View docs</span><span>Upload</span><span>Approve</span></div>' +
        list.map(function (p) { p.perm = p.perm || { v: true, u: true, a: false }; return '<div class="perm"><div class="who">' + av(p.name, 'mini-av') + '<b style="font-weight:500">' + esc(p.name) + '</b></div>' + ['v', 'u', 'a'].map(function (k) { return '<span><label class="sw"><input type="checkbox" data-perm="' + p.id + '" data-k="' + k + '"' + (p.perm[k] ? ' checked' : '') + ' aria-label="' + { v: 'View documents', u: 'Upload documents', a: 'Approve' }[k] + ' for ' + esc(p.name) + '"><span></span></label></span>'; }).join('') + '</div>'; }).join('') + '</div></div><div class="m-foot"><span class="l">Approvers can sign off delegated documents.</span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="pmGo">Save access</button></div>', 'wide');
      var draft = {}; $$('[data-perm]').forEach(function (c) { c.onchange = function () { (draft[c.dataset.perm] = draft[c.dataset.perm] || {})[c.dataset.k] = c.checked; }; });
      $('#pmGo').onclick = function () { list.forEach(function (p) { if (draft[p.id]) Object.assign(p.perm, draft[p.id]); }); save(); closeModal(); netSel = {}; render(); toast('Access saved', 'Permissions updated for ' + list.length + ' ' + (list.length === 1 ? 'person' : 'people')); };
    },
    // management
    mTab: function (el) { S.ui.mTab = el.dataset.v; save(); render(); },
    taskF: function (el) { taskF = el.dataset.v; render(); },
    assign: function (el) { assignTask(el && el.dataset && el.dataset.title); },
    toggleTask: function (el) { var f = F(), t = f.tasks.filter(function (x) { return x.id === el.dataset.id; })[0]; t.st = t.st === 'done' ? 'open' : 'done'; if (t.st === 'done') log('completed “' + t.title + '”', 'check'); save(); render(); var n = $('[data-a="toggleTask"][data-id="' + t.id + '"]'); if (n) n.focus(); else toast(t.st === 'done' ? 'Task done' : 'Task reopened', t.title); },
    docDelegate: function (el) { var f = F(), d = f.docs.filter(function (x) { return x.id === el.dataset.id; })[0]; delegateMenu(el, function (p) { d.st = 'delegated'; d.to = p.name; d.at = Date.now(); f.tasks.push({ id: uid(), title: 'Provide ' + d.name, to: p.name, due: rel(10), st: 'open', doc: d.id }); log('delegated ' + d.name + ' to ' + p.name, 'uplus'); save(); render(); toast('Delegated', d.name + ' → ' + p.name + '. A task was created.', { icon: 'uplus' }); }); },
    remind: function (el) { var d = F().docs.filter(function (x) { return x.id === el.dataset.id; })[0]; d.reminded = Date.now(); save(); render(); toast('Reminder sent', d.to + ' was reminded about ' + d.name, { icon: 'mail' }); },
    dlDoc: function (el) { download(el.dataset.v.replace(/\.\w+$/, '') + '.txt', el.dataset.v + '\n\nPlaceholder for the document stored in the CAPTL document room.'); toast('Downloading', el.dataset.v + ' (prototype file)', { icon: 'down' }); },
    editFund: function () {
      var f = F();
      modal(mhead('pen', 'Edit fund details', f.name) + '<div class="m-body"><div class="form-g">' + fld('ef_name', 'Fund name', f.name, { cls: 'full' }) + fld('ef_company', 'Company', f.company) + fld('ef_round', 'Seed round', f.round, { opts: ['Seed 1', 'Seed 2', 'Round 2', 'Round 3'] }) + fld('ef_size', 'Corpus', Math.round(f.size * CCY[S.ccy][1]).toLocaleString(), { pre: CCY[S.ccy][0], mode: 'decimal' }) + fld('ef_mgmt', 'Management fee', f.mgmtPct, { suf: '% / yr', mode: 'decimal' }) + fld('ef_hurdle', 'Hurdle rate', f.hurdle, { suf: '%', mode: 'decimal' }) + fld('ef_carry', 'Carried interest', f.carry, { suf: '%', mode: 'decimal' }) + '</div></div><div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="efGo">Save changes</button></div>', 'wide');
      $('#efGo').onclick = function () { if (!val('ef_name')) return err('ef_name', 'Name the fund.'); if (!(num(val('ef_size')) > 0)) return err('ef_size', 'Enter the corpus.'); var c = num(val('ef_carry')); if (c >= 100) return err('ef_carry', 'Carry must be under 100%.'); f.name = val('ef_name'); f.company = val('ef_company'); f.round = val('ef_round'); f.size = num(val('ef_size')) / CCY[S.ccy][1]; f.mgmtPct = num(val('ef_mgmt')); f.hurdle = num(val('ef_hurdle')); f.carry = c; wfIn = null; log('edited the fund details', 'pen'); save(); closeModal(); render(); toast('Fund details saved', f.name); };
    },
    // constituents
    cTab: function (el) { S.ui.cTab = el.dataset.v; save(); render(); },
    lpDetail: function (el) { var lp = F().lps.filter(function (l) { return l.id === el.dataset.id; })[0]; lpModal(lp); },
    exportLps: function () { var f = F(); download(f.name.replace(/\W+/g, '_') + '_LPs.csv', 'Investor,Type,Email,Commitment,Called,Distributed,Status,LPAC\n' + f.lps.map(function (l) { return ['"' + l.name + '"', l.kind, l.email, l.commit, l.called, l.dist, l.st, l.lpac ? 'Yes' : 'No'].join(','); }).join('\n'), 'text/csv'); toast('Export ready', f.lps.length + ' LPs as CSV', { icon: 'down' }); },
    addLp: function () {
      var f = F(), c = calc(f);
      modal(mhead('uplus', 'Invite a limited partner', 'They receive the subscription pack for ' + f.name + '.') + '<form class="m-body" id="alF" novalidate><div class="form-g">' + fld('al_n', 'Investor name', '', { af: true, cls: 'full' }) + fld('al_e', 'Email', '', { type: 'email' }) + fld('al_k', 'Investor type', 'Family office', { opts: ['Individual', 'Family office', 'Endowment', 'Foundation', 'Pension', 'Fund of funds'] }) + fld('al_c', 'Commitment', '', { pre: CCY[S.ccy][0], mode: 'decimal', help: m(Math.max(0, f.size - c.commit)) + ' left before the corpus is full' }) + '<div class="f" style="align-self:center"><label class="chk"><input type="checkbox" id="al_l">LPAC member</label></div></div></form><div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="alGo">' + ic('send', 'sm') + 'Send invite</button></div>');
      function go(e) { if (e) e.preventDefault(); var n = val('al_n'), em = val('al_e'), cm = num(val('al_c')) / CCY[S.ccy][1]; if (!n) return err('al_n', 'Enter the investor’s name.'); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return err('al_e', 'Enter a valid email.'); if (!(cm > 0)) return err('al_c', 'Enter the commitment amount.'); f.lps.push({ id: uid(), name: n, email: em, kind: val('al_k'), commit: cm, called: 0, dist: 0, st: 'Invited', lpac: $('#al_l').checked }); log('invited ' + n + ' as an LP (' + m(cm) + ')', 'uplus'); save(); closeModal(); render(); toast('LP invited', n + ' · ' + m(cm) + ' commitment'); }
      $('#alGo').onclick = go; $('#alF').onsubmit = go;
    },
    addPort: function () {
      var f = F();
      modal(mhead('bld', 'Add portfolio company', 'Record an investment by ' + f.name + '.') + '<form class="m-body" id="apF" novalidate><div class="form-g">' + fld('ap_n', 'Company name', '', { af: true, cls: 'full' }) + fld('ap_s', 'Sector', 'Fintech', { opts: ['Fintech', 'HealthTech', 'Logistics', 'AI', 'Climate', 'Industrial', 'Commerce'] }) + fld('ap_i', 'Amount invested', '', { pre: CCY[S.ccy][0], mode: 'decimal' }) + '</div></form><div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="apGo">' + ic('plus', 'sm') + 'Add company</button></div>');
      function go(e) { if (e) e.preventDefault(); var n = val('ap_n'), i = num(val('ap_i')) / CCY[S.ccy][1]; if (!n) return err('ap_n', 'Enter the company name.'); if (!(i > 0)) return err('ap_i', 'Enter the amount invested.'); f.portfolio.push({ id: uid(), name: n, sector: val('ap_s'), invested: i, value: i, at: Date.now() }); log('recorded an investment in ' + n + ' (' + m(i) + ')', 'bld'); save(); closeModal(); render(); toast('Company added', n + ' · metrics updated'); }
      $('#apGo').onclick = go; $('#apF').onsubmit = go;
    },
    valuation: function (el) {
      var f = F(), p = f.portfolio.filter(function (x) { return x.id === el.dataset.id; })[0];
      modal(mhead('chart', 'Update valuation', p.name + ' · ' + m(p.invested) + ' invested') + '<form class="m-body" id="vaF" novalidate>' + fld('va_v', 'Current fair value', Math.round(p.value * CCY[S.ccy][1]).toLocaleString(), { pre: CCY[S.ccy][0], mode: 'decimal', af: true, help: 'NAV, RVPI and TVPI on the overview update immediately.' }) + '</form><div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="vaGo">Save valuation</button></div>');
      var i = $('#va_v'); i.select();
      function go(e) { if (e) e.preventDefault(); var v = num(val('va_v')) / CCY[S.ccy][1]; if (!(v >= 0) || val('va_v') === '') return err('va_v', 'Enter a value.'); p.value = v; log('updated the ' + p.name + ' valuation to ' + m(v), 'chart'); save(); closeModal(); render(); toast('Valuation saved', p.name + ' · ' + x2(v / p.invested) + ' MOIC'); }
      $('#vaGo').onclick = go; $('#vaF').onsubmit = go;
    },
    // analytics
    aTab: function (el) { S.ui.aTab = el.dataset.v; save(); render(); },
    capAdd: function () { capDraft.rows.push({ name: '', count: '', value: '', hurdle: '' }); render(); var n = $('#u' + (capDraft.rows.length - 1) + 'name'); if (n) n.focus(); },
    capDel: function (el) { capDraft.rows.splice(+el.dataset.i, 1); render(); },
    capNext: function () {
      var f = F(), v = capDraft.rows.filter(function (r) { return r.name && num(r.count) > 0 && num(r.value) > 0; });
      if (!v.length) return; var names = v.map(function (r) { return r.name.trim().toLowerCase(); }); if (names.some(function (n, i) { return names.indexOf(n) !== i; })) { toast('Unit class names must be unique', 'Rename the duplicate class', { icon: 'info' }); return; }
      f.units = v.map(function (r) { return { name: r.name.trim(), count: Math.round(num(r.count)), value: num(r.value) / CCY[S.ccy][1], hurdle: num(r.hurdle) }; }); f.capStep = 2; issueDraft = null; capDraft = null; log('defined ' + f.units.length + ' unit class' + (f.units.length > 1 ? 'es' : ''), 'chart'); save(); render();
    },
    capEdit: function () { var f = F(); f.capStep = 1; capDraft = null; save(); render(); },
    capReissue: function () { var f = F(); f.capStep = 2; issueDraft = null; save(); render(); },
    capIssue: function () {
      var f = F(), U = f.units.filter(function (u) { return u.name === issueDraft.cls; })[0], used = sum(Object.keys(issueDraft.alloc), function (k) { return num(issueDraft.alloc[k]); });
      if (used > U.count) { toast('Too many units allocated', 'Reduce allocations by ' + (used - U.count).toLocaleString() + ' units', { icon: 'info' }); return; }
      if (!used) { toast('Allocate some units first', 'Every partner is at zero', { icon: 'info' }); return; }
      f.issued = f.issued || {}; f.lps.forEach(function (l) { (f.issued[l.id] = f.issued[l.id] || {})[U.name] = num(issueDraft.alloc[l.id]); }); f.capStep = 3; log('issued ' + used.toLocaleString() + ' ' + U.name + ' units to LPs', 'check'); save(); render(); toast('Units issued', used.toLocaleString() + ' ' + U.name + ' units across ' + f.lps.length + ' partners');
    },
    newCall: function () {
      var f = F(), c = calc(f), leftPct = c.commit ? (c.undrawn / c.commit * 100) : 0;
      modal(mhead('arrdn', 'New capital call', 'Call ' + (f.calls.length + 1) + ' for ' + f.name + ' · ' + leftPct.toFixed(1) + '% of commitments undrawn') + '<form class="m-body" id="ncF" novalidate><div class="form-g">' + fld('nc_p', 'Percent of commitments', '10', { suf: '%', mode: 'decimal', af: true }) + fld('nc_d', 'Due date', new Date(rel(21)).toISOString().slice(0, 10), { type: 'date' }) + fld('nc_u', 'Purpose', 'Investment', { opts: ['Investment', 'Management fees', 'Fund expenses'], cls: 'full' }) + '</div><div class="card"><div class="tbl-wrap"><table><thead><tr><th>LP</th><th class="r">Amount</th></tr></thead><tbody id="ncP"></tbody></table></div></div></form><div class="m-foot"><span class="l" id="ncT"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="ncGo">' + ic('send', 'sm') + 'Issue call notices</button></div>', 'wide');
      function prev() { var p = num(val('nc_p')); $('#ncP').innerHTML = f.lps.map(function (l) { return '<tr><td>' + esc(l.name) + '</td><td class="r num">' + m(l.commit * p / 100) + '</td></tr>'; }).join(''); $('#ncT').textContent = 'Total ' + m(c.commit * p / 100); }
      $('#nc_p').oninput = prev; prev();
      function go(e) { if (e) e.preventDefault(); var p = num(val('nc_p')); if (!(p > 0)) return err('nc_p', 'Enter a percentage above 0.'); if (p > leftPct + 1e-6) return err('nc_p', 'Only ' + leftPct.toFixed(2) + '% is left to call.'); var due = new Date($('#nc_d').value + 'T10:00').getTime() || rel(21), amt = c.commit * p / 100; f.lps.forEach(function (l) { l.called += l.commit * p / 100; }); f.calls.push({ id: uid(), no: f.calls.length + 1, pct: p, amount: amt, due: due, st: 'Open', purpose: val('nc_u') }); if (val('nc_u') === 'Management fees') f.alloc.fees += amt; else if (val('nc_u') === 'Fund expenses') f.alloc.opex += amt; f.tasks.push({ id: uid(), title: 'Collect capital call ' + f.calls.length, to: S.user.name, due: due, st: 'open' }); log('issued capital call ' + f.calls.length + ' for ' + m(amt), 'arrdn'); save(); closeModal(); render(); toast('Capital call issued', m(amt) + ' due ' + dF(due) + '. Added to the calendar.', { href: '#/calendar' }); }
      $('#ncGo').onclick = go; $('#ncF').onsubmit = go;
    },
    callPaid: function (el) { var f = F(), k = f.calls.filter(function (x) { return x.id === el.dataset.id; })[0]; k.st = 'Paid'; f.tasks.forEach(function (t) { if (t.title === 'Collect capital call ' + k.no) t.st = 'done'; }); log('received capital call ' + k.no, 'check'); save(); render(); toast('Call ' + k.no + ' received', m(k.amount) + ' from ' + f.lps.length + ' LPs'); },
    // calendar
    calNav: function (el) { var d = new Date(S.ui.calY, S.ui.calM + +el.dataset.v, 1); S.ui.calY = d.getFullYear(); S.ui.calM = d.getMonth(); save(); render(); },
    calToday: function () { S.ui.calY = TY; S.ui.calM = TM; save(); render(); },
    addEvent: function () {
      modal(mhead('cal', 'Add event', 'Shows on the calendar for ' + F().name + '.') + '<form class="m-body" id="aeF" novalidate>' + fld('ae_t', 'Title', '', { af: true, ph: 'e.g. LPAC meeting' }) + '<div class="form-g">' + fld('ae_d', 'Date', new Date(rel(7)).toISOString().slice(0, 10), { type: 'date' }) + fld('ae_k', 'Type', 'Meeting', { opts: ['Meeting', 'Deadline', 'Portfolio', 'Other'] }) + '</div></form><div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="aeGo">Add event</button></div>');
      function go(e) { if (e) e.preventDefault(); var t = val('ae_t'); if (!t) return err('ae_t', 'Give the event a title.'); var d = new Date($('#ae_d').value + 'T10:00').getTime(); if (!d) return err('ae_d', 'Pick a date.'); S.events.push({ id: uid(), f: S.cur, t: t, d: d, k: { Meeting: 'b', Deadline: 'r', Portfolio: 'g', Other: '' }[val('ae_k')] }); var dd = new Date(d); S.ui.calY = dd.getFullYear(); S.ui.calM = dd.getMonth(); save(); closeModal(); render(); toast('Event added', t + ' · ' + dF(d)); }
      $('#aeGo').onclick = go; $('#aeF').onsubmit = go;
    }
  };
  function groupOf(g) { var f = F(); return f.team[g] || f.prov[g]; }
  function findMem(id) { var f = F(), out; [f.team, f.prov].forEach(function (src) { Object.keys(src).forEach(function (g) { src[g].forEach(function (p) { if (p.id === id) out = p; }); }); }); return out; }

  document.addEventListener('click', function (e) {
    if (e.target.matches('[data-scrim]')) { closeModal(); return; }
    var el = e.target.closest('[data-a]');
    if (!e.target.closest('.menu-wrap')) closePops();
    if (!e.target.closest('#side') && !e.target.closest('[data-a="burger"]')) { var s = $('#side'); if (s) s.classList.remove('open'); }
    if (el && A[el.dataset.a]) { if (el.tagName === 'A' && el.getAttribute('href') === '#') e.preventDefault(); A[el.dataset.a](el, e); }
  });
  document.addEventListener('keydown', function (e) {
    if (authed && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if ($('#layer .cmd')) closeModal(); else cmd(); return; }
    if (e.key === 'Escape') { if ($('.pop')) closePops(); else closeModal(); return; }
    if ($('#layer').onkey && $('#layer').innerHTML) $('#layer').onkey(e);
    if (e.key === 'Enter' && e.target.matches('tr[data-a]')) A[e.target.dataset.a](e.target, e);
    if (e.key === 'Tab' && $('#layer .modal')) {
      var f = $$('#layer .modal button:not([disabled]), #layer .modal input, #layer .modal select, #layer .modal textarea, #layer .modal summary').filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return; var a = f[0], b = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === $('#layer .modal'))) { b.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === b) { a.focus(); e.preventDefault(); }
    }
  });
  /* prototype menu (bottom left): jump to any screen or flow */
  if (window.protoMenu) protoMenu(function () {
    function nav(h) { if (location.hash === h) render(); else location.hash = h; }
    function go(h, ui) {
      return function () {
        closeModal(); closePops();
        if (!authed) { authed = true; try { sessionStorage.setItem('captl01-auth', '1'); } catch (e) {} }
        if (ui) { Object.keys(ui).forEach(function (k) { S.ui[k] = ui[k]; }); save(); }
        nav(h);
      };
    }
    return [
      { title: 'Sign in', items: [
        { label: 'Log in with two-factor', run: function () { closeModal(); closePops(); authed = false; try { sessionStorage.removeItem('captl01-auth'); } catch (e) {} nav('#/login'); } }] },
      { title: 'Fund', items: [
        { label: 'Fund overview', run: go('#/overview') },
        { label: 'Documents', run: go('#/management', { mTab: 'docs' }) },
        { label: 'Tasks', run: go('#/management', { mTab: 'tasks' }) },
        { label: 'Delegations', run: go('#/management', { mTab: 'deleg' }) },
        { label: 'Limited partners', run: go('#/constituents', { cTab: 'lps' }) },
        { label: 'Portfolio companies', run: go('#/constituents', { cTab: 'port' }) },
        { label: 'Cap table', run: go('#/analytics', { aTab: 'cap' }) },
        { label: 'Capital calls', run: go('#/analytics', { aTab: 'calls' }) },
        { label: 'Distribution waterfall', run: go('#/analytics', { aTab: 'wf' }) }] },
      { title: 'Workspace', items: [
        { label: 'All funds', run: go('#/funds') },
        { label: 'Fund network', run: go('#/network') },
        { label: 'Calendar', run: go('#/calendar') },
        { label: 'Updates', run: go('#/updates') },
        { label: 'Activities', run: go('#/activities') }] },
      { title: 'Try a flow', items: [
        { label: 'Add a fund', run: go('#/funds/new') },
        { label: 'Assign a task', run: function () { go('#/management', { mTab: 'tasks' })(); setTimeout(function () { assignTask(); }, 30); } },
        { label: 'Search and commands', hint: 'Ctrl K', run: function () { go(location.hash && authed ? location.hash : '#/overview')(); setTimeout(cmd, 30); } }] },
      { title: 'Demo data', items: [
        { label: 'Reset demo data', run: function () { closeModal(); S = seed(); save(); render(); toast('Demo reset', 'Funds, LPs and tasks are back to the start'); } }] }
    ];
  });

  render();
})();
