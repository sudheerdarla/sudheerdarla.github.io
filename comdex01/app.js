/* Comdex prototype. Simulated data only; state persists in localStorage so a demo survives reloads. */
(function () {
  'use strict';

  /* ---------- icons ---------- */
  var P = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    swap: '<path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/>',
    dollar: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 7v10M14.5 9.6c0-1-1.1-1.7-2.5-1.7s-2.5.7-2.5 1.7 1.1 1.5 2.5 1.8 2.5.8 2.5 1.8-1.1 1.7-2.5 1.7-2.5-.7-2.5-1.7"/>',
    user: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.6 18.6a6 6 0 0 1 10.8 0"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7M12 17h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v3h-4a2 2 0 0 0 0 4h4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/>',
    dl: '<path d="M17 7 7 17M17 17H7V7"/>', ur: '<path d="M7 17 17 7M7 7h10v10"/>',
    dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', checks: '<path d="M17 6 7 16l-4-4M22 10l-6.5 6.5L14 15"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    up: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    ship: '<path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19 17.5 21 12l-9-3.5L3 12l2 5.5"/><path d="M12 8.5V3M8 5.5V3h8v2.5"/>',
    bank: '<path d="M3 21h18M5 21V11M19 21V11M9.5 21V11M14.5 21V11M2 10l10-6 10 6z"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>', left: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    chevd: '<path d="m6 9 6 6 6-6"/>', chevr: '<path d="m9 18 6-6-6-6"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    hand: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    uplus: '<path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>',
    bld: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    pen: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z"/><path d="m9.5 14 2 2 3.5-3.5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    id: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 17a4 4 0 0 1 7 0M15 9h3M15 13h3"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    sign: '<path d="M3 17c3 0 4-8 7-8s1 8 4 8 3-4 5-4 2 2 2 2"/><path d="M3 21h18"/>',
    out: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9"/>'
  };
  function ic(n, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + P[n] + '</svg>'; }
  var LOGO = '<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M23 5H8.5L4 9.5v9L8.5 23H23v-4H10.2L8 16.8v-5.6L10.2 9H23z" fill="#e0322f"/><path d="M23 11h-9.5L12 12.5v3l1.5 1.5H23z" fill="#e0322f" opacity=".55"/></svg>';

  /* ---------- utils ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n, d) { d = d == null ? 0 : d; return (n < 0 ? '−$' : '$') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function compact(n) { var a = Math.abs(n); return a >= 1e9 ? '$' + (n / 1e9).toFixed(1) + 'B' : a >= 1e6 ? '$' + (n / 1e6).toFixed(1) + 'M' : a >= 1e3 ? '$' + (n / 1e3).toFixed(0) + 'K' : '$' + n; }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function dFmt(t) { var d = new Date(t); return d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(); }
  function tFmt(t) { var d = new Date(t), h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + ':' + (m < 10 ? '0' : '') + m + ' ' + (h < 12 ? 'AM' : 'PM'); }
  function dtFmt(t) { return dFmt(t) + ' · ' + tFmt(t); }
  function ago(t) { var s = (Date.now() - t) / 1000; if (s < 45) return 'just now'; if (s < 3600) return Math.round(s / 60) + 'm ago'; if (s < 86400) return Math.round(s / 3600) + 'h ago'; var dd = Math.round(s / 86400); return dd === 1 ? '1 day ago' : dd + ' days ago'; }
  function uid(n) { var c = 'abcdefghjkmnpqrstuvwxyz23456789', s = ''; for (var i = 0; i < (n || 20); i++) s += c[Math.floor(Math.random() * c.length)]; return s; }
  function initials(n) { return String(n).split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function avc(n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) | 0; return 'a' + (1 + Math.abs(h) % 5); }
  function av(n, size) { return '<span class="av ' + avc(n) + '"' + (size ? ' style="width:' + size + 'px;height:' + size + 'px"' : '') + '>' + esc(initials(n)) + '</span>'; }
  function num(v) { var n = parseFloat(String(v).replace(/[^0-9.]/g, '')); return isFinite(n) ? n : 0; }
  var DAY = 864e5, MIN = 6e4, NOW = Date.now();

  /* ---------- seed ---------- */
  function seed() {
    var t0 = NOW - 18 * DAY;
    return {
      v: 3, org: 'ABC Traders', user: { name: 'Arjun Rao', role: 'Admin', city: 'Singapore', id: 'COM12340' },
      wallet: 150000000, base: { rec: 25000000, pay: 3000000 },
      trades: [
        {
          id: '7dh437thgd7gh4e335t4', status: 'completed', created: t0, listing: 'discovery', visibility: 'private',
          commodity: 'Palm oil', blName: 'RBD palm olein, CP10', quality: 'IV 56 min', term: 'FOB', qty: 100, price: 920, agreed: 900,
          from: { port: 'Port Klang', country: 'Malaysia' }, to: { port: 'Hong Kong', country: 'Hong Kong' }, shipFrom: '2026-10-12', shipBy: '2026-10-18',
          contract: 'SMY31929', obl: { no: 'MYPKG2610073', carrier: 'Evergreen Line', vessel: 'Ever Lunar', issued: '2026-10-12', file: 'OBL_MYPKG2610073.pdf' },
          buyer: { name: 'Harbour Commodities Ltd.', id: 'COM24410', email: 'trading@harbourcommod.hk' }, receipt: true,
          offers: [{ at: t0 + 3.6 * DAY, by: 'you', amount: 920, doc: 'Contract_v1.pdf', st: 'Withdrawn' }, { at: t0 + 3.9 * DAY, by: 'buyer', amount: 900, doc: 'Buyer_Contract.pdf', st: 'Accepted' }],
          fb: { mine: { stars: 5, text: 'Smooth negotiation and quick confirmation from the buyer.' }, theirs: { stars: 5, text: 'Documents were clear and the seller responded fast.' } },
          act: [
            { at: t0, ic: 'doc', t: 'You placed the order', sub: 'Palm oil · 100 MT · FOB Port Klang' },
            { at: t0 + 2 * MIN, ic: 'globe', t: 'Order listed for trade', sub: 'Private listing, visible to invited counterparties' },
            { at: t0 + 3.6 * DAY, ic: 'swap', t: 'Buyer sent a counter-offer', sub: 'Harbour Commodities offered $900.00 / MT.' },
            { at: t0 + 3.9 * DAY, ic: 'check', t: 'You accepted the counter-offer', sub: 'Your earlier offer was withdrawn.', file: 'Buyer_Contract.pdf' },
            { at: t0 + 4.2 * DAY, ic: 'doc', t: 'Buyer uploaded the transaction receipt', sub: 'Proof of payment for $90,000.00 into escrow.', file: 'Transaction_Receipt.pdf' },
            { at: t0 + 4.3 * DAY, ic: 'checks', t: 'You confirmed the buyer’s payment', sub: 'Title transferred on-chain. Escrow released to your wallet.' }
          ],
          docs: [{ name: 'Updated_Contract.pdf', sub: 'Your active offer' }, { name: 'Buyer_Contract.pdf', sub: 'Signed by buyer' }, { name: 'Transaction_Receipt.pdf', sub: 'Uploaded by buyer' }]
        },
        {
          id: 'k29fm4ra8cw7xe5ht3qn', status: 'negotiating', created: NOW - 3 * DAY, listing: 'settlement', visibility: 'private',
          commodity: 'Copper cathodes', blName: 'Copper cathodes, Grade A', quality: '99.99% Cu', term: 'CIF', qty: 500, price: 8450,
          from: { port: 'Singapore', country: 'Singapore' }, to: { port: 'Rotterdam', country: 'Netherlands' }, shipFrom: '2026-11-20', shipBy: '2026-11-28',
          contract: 'C45783DRE', obl: { no: 'SGSIN2611208', carrier: 'Maersk', vessel: 'Maersk Kensington', issued: '2026-10-24', file: 'OBL_SGSIN2611208.pdf' },
          buyer: { name: 'Van Dijk Metals B.V.', id: 'COM30872', email: 'desk@vandijkmetals.nl' },
          offers: [{ at: NOW - 3 * DAY, by: 'you', amount: 8450, doc: 'Contract_v1.pdf', st: 'Active' }, { at: NOW - 2 * 3600e3, by: 'buyer', amount: 8320, doc: 'Buyer_Counter.pdf', st: 'Pending' }],
          act: [
            { at: NOW - 3 * DAY, ic: 'doc', t: 'You placed the order', sub: 'Copper cathodes · 500 MT · CIF Rotterdam' },
            { at: NOW - 2.9 * DAY, ic: 'shield', t: 'Comdex verified your documents', sub: 'Bill of lading and contract approved for settlement.' },
            { at: NOW - 2.9 * DAY + MIN, ic: 'globe', t: 'Order listed for trade', sub: 'Private listing, invite sent to desk@vandijkmetals.nl' },
            { at: NOW - 2 * 3600e3, ic: 'swap', t: 'Buyer sent a counter-offer', sub: 'Van Dijk Metals offered $8,320.00 / MT.', file: 'Buyer_Counter.pdf' }
          ],
          docs: [{ name: 'Contract_v1.pdf', sub: 'Your active offer' }, { name: 'OBL_SGSIN2611208.pdf', sub: 'Original bill of lading' }, { name: 'Buyer_Counter.pdf', sub: 'Counter-offer from buyer' }]
        },
        {
          id: 'w8bq3nz6kd2pr7vt4ymc', status: 'listed', created: NOW - 1.2 * DAY, listing: 'discovery', visibility: 'public',
          commodity: 'Aluminium ingots', blName: 'Primary aluminium ingots P1020A', quality: '99.7% Al', term: 'CFR', qty: 250, price: 2410,
          from: { port: 'Jebel Ali', country: 'United Arab Emirates' }, to: { port: 'Nhava Sheva', country: 'India' }, shipFrom: '2026-11-08', shipBy: '2026-11-15',
          contract: 'C46021JBA', obl: { no: 'AEJEA2611034', carrier: 'CMA CGM', vessel: 'CMA CGM Tage', issued: '2026-10-27', file: 'OBL_AEJEA2611034.pdf' },
          act: [{ at: NOW - 1.2 * DAY, ic: 'doc', t: 'You placed the order', sub: 'Aluminium ingots · 250 MT · CFR Nhava Sheva' }, { at: NOW - 1.2 * DAY + MIN, ic: 'globe', t: 'Order listed for trade', sub: 'Public listing, open to all verified traders' }],
          docs: [{ name: 'Contract_v1.pdf', sub: 'Your active offer' }, { name: 'OBL_AEJEA2611034.pdf', sub: 'Original bill of lading' }]
        },
        {
          id: 'r5tc9gx2mh8kw3ad6pqe', status: 'draft', created: NOW - 5 * 3600e3, listing: 'discovery', visibility: 'private',
          commodity: 'Thermal coal', blName: 'Steam coal, GAR 5500', quality: 'GAR 5,500 kcal/kg', term: 'FOB', qty: 20000, price: 98,
          from: { port: 'Samarinda', country: 'Indonesia' }, to: { port: 'Qingdao', country: 'China' }, shipFrom: '', shipBy: '', contract: 'C46107SMD', obl: {},
          act: [{ at: NOW - 5 * 3600e3, ic: 'pen', t: 'Draft saved', sub: 'Shipment dates and bill of lading still missing.' }], docs: []
        }
      ],
      txns: [
        { id: 'TX-90412', type: 'Settlement', ref: 'Palm oil · 7dh437th', amount: 90000, st: 'Settled', at: t0 + 4.3 * DAY },
        { id: 'TX-90377', type: 'Deposit', ref: 'DBS2610090114', amount: 2500000, st: 'Credited', at: NOW - 6 * DAY },
        { id: 'TX-90311', type: 'Escrow fee', ref: 'Copper cathodes · k29fm4ra', amount: -4225, st: 'Settled', at: NOW - 2.9 * DAY },
        { id: 'TX-90298', type: 'Withdrawal', ref: 'To DBS ••••9283', amount: -400000, st: 'Completed', at: NOW - 9 * DAY }
      ],
      traders: [
        { name: 'Jorge Warren', id: 'COM12344', email: 'jorge@abctraders.sg', trades: 2, rec: 15700000, pay: 2000000, last: NOW - DAY, st: 'active' },
        { name: 'Soham Fisher', id: 'COM12345', email: 'soham@abctraders.sg', trades: 2, rec: 9300000, pay: 1000000, last: NOW - 3 * DAY, st: 'active' },
        { name: 'Mei Lin Tan', id: 'COM12352', email: 'meilin@abctraders.sg', trades: 0, rec: 0, pay: 0, last: 0, st: 'pending' }
      ],
      team: [
        { who: 'Jorge Warren', t: 'created a sales quote', obj: '', at: NOW - 40 * MIN, ic: 'doc' },
        { who: 'Soham Fisher', t: 'settled a trade with', obj: 'XYZ Pvt. Ltd.', at: NOW - 2.2 * 3600e3, ic: 'check' },
        { who: 'Jorge Warren', t: 'invited a counterparty to', obj: 'Copper cathodes', at: NOW - 3.5 * 3600e3, ic: 'mail' },
        { who: 'Soham Fisher', t: 'settled a trade with', obj: 'Orient Grains Co.', at: NOW - 5 * 3600e3, ic: 'check' }
      ],
      notifs: [
        { t: 'New counter-offer', sub: 'Van Dijk Metals offered $8,320 / MT on Copper cathodes', at: NOW - 2 * 3600e3, href: '#/trades/k29fm4ra8cw7xe5ht3qn', read: false },
        { t: 'Deposit credited', sub: '$2,500,000.00 added to your wallet', at: NOW - 6 * DAY, href: '#/transactions', read: true }
      ],
      kyc: {
        cur: 3, done: { 1: true, 2: true }, status: 'progress',
        d: { zone: 'SG', legal: 'ABC Traders Pte. Ltd.', short: 'ABC', address: '', postal: '', inc: '' },
        owners: [{ name: 'Rahul Mehta', nat: 'Singaporean', role: 'Director', pct: 60 }, { name: 'Lin Wei', nat: 'Malaysian', role: 'Shareholder', pct: 40 }],
        files: {}, savedAt: NOW - 3 * MIN
      },
      prefs: { email: true, offers: true, digest: false, twofa: true, ccy: 'USD' },
      ui: { range: 'M', chart: 'fin', tTab: 'active', tradeFilter: 'all' },
      jobs: []
    };
  }
  var KEY = 'comdex01';
  var S;
  try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
  if (!S || S.v !== 3) S = seed();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---------- derived ---------- */
  var STAGES = ['Order placed', 'Listed for trade', 'Buyer accepted', 'Seller confirmed', 'Trade completed'];
  var ST = {
    draft: { l: 'Draft', c: 'n', done: 0 }, review: { l: 'In verification', c: 'a', done: 1 }, listed: { l: 'Listed', c: 'b', done: 2 },
    negotiating: { l: 'Counter-offer', c: 'a', done: 2 }, awaiting: { l: 'Awaiting buyer', c: 'b', done: 2 },
    payment: { l: 'Awaiting payment', c: 'b', done: 3 }, completed: { l: 'Trade completed', c: 'g', done: 5 }
  };
  function trade(id) { return S.trades.filter(function (t) { return t.id === id; })[0]; }
  function unit(t) { return t.agreed || t.price; }
  function total(t) { return (t.qty || 0) * unit(t); }
  function needsMe(t) { return t.status === 'negotiating' || (t.status === 'payment' && t.receipt) || t.status === 'draft'; }
  function receivables() { return S.base.rec + S.trades.filter(function (t) { return t.status === 'payment'; }).reduce(function (a, t) { return a + total(t); }, 0); }
  function stageDate(t, i) {
    var map = { 0: 'You placed the order', 1: 'Order listed for trade', 2: /accepted|confirmed your/, 3: 'You confirmed the buyer’s payment', 4: 'You confirmed the buyer’s payment' };
    var m = map[i], e = t.act.filter(function (a) { return m instanceof RegExp ? m.test(a.t) : a.t === m; })[0];
    return e ? dFmt(e.at) : '';
  }

  /* ---------- toasts ---------- */
  function toast(title, msg, opt) {
    opt = opt || {};
    var el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status');
    el.innerHTML = '<span class="ti' + (opt.blue ? ' b' : '') + '">' + ic(opt.icon || 'check') + '</span><div><b>' + esc(title) + '</b><span>' + esc(msg || '') + '</span></div>' + (opt.href ? '<button type="button">View</button>' : '');
    if (opt.href) el.querySelector('button').onclick = function () { location.hash = opt.href; el.remove(); };
    $('#toasts').appendChild(el); setTimeout(function () { el.remove(); }, opt.long ? 7000 : 4200);
  }
  function notify(t, sub, href) { S.notifs.unshift({ t: t, sub: sub, at: Date.now(), href: href, read: false }); S.notifs = S.notifs.slice(0, 25); }

  /* ---------- background jobs (buyer responses, verification) ---------- */
  function job(type, data, delay) { S.jobs.push({ type: type, data: data, at: Date.now() + delay }); save(); }
  var JOBS = {
    counter: function (d) { // buyer counters a fresh listing
      var t = trade(d.id); if (!t || t.status !== 'listed') return;
      var amt = Math.round(t.price * 0.985 * 100) / 100;
      if (!t.buyer || !t.buyer.name) t.buyer = { name: 'Orient Grains Co.', id: 'COM28817', email: (t.buyer && t.buyer.email) || 'buy@orientgrains.cn' };
      t.offers = (t.offers || []).concat([{ at: Date.now(), by: 'buyer', amount: amt, doc: 'Buyer_Counter.pdf', st: 'Pending' }]);
      if (!t.offers.some(function (o) { return o.by === 'you'; })) t.offers.unshift({ at: t.created, by: 'you', amount: t.price, doc: 'Contract_v1.pdf', st: 'Active' });
      t.status = 'negotiating';
      t.act.push({ at: Date.now(), ic: 'swap', t: 'Buyer sent a counter-offer', sub: t.buyer.name + ' offered ' + money(amt, 2) + ' / MT.', file: 'Buyer_Counter.pdf' });
      t.docs.push({ name: 'Buyer_Counter.pdf', sub: 'Counter-offer from buyer' });
      notify('New counter-offer', t.buyer.name + ' offered ' + money(amt, 2) + ' / MT on ' + t.commodity, '#/trades/' + t.id);
      toast('New counter-offer on ' + t.commodity, t.buyer.name + ' offered ' + money(amt, 2) + ' / MT', { href: '#/trades/' + t.id, blue: true, icon: 'swap', long: true });
    },
    buyerAccepts: function (d) {
      var t = trade(d.id); if (!t || t.status !== 'awaiting') return;
      t.status = 'payment'; t.agreed = d.amount;
      t.offers.forEach(function (o) { if (o.st === 'Pending' && o.by === 'you') o.st = 'Accepted'; });
      t.act.push({ at: Date.now(), ic: 'check', t: 'Buyer confirmed your offer', sub: t.buyer.name + ' accepted ' + money(d.amount, 2) + ' / MT.', file: 'Buyer_Contract.pdf' });
      t.docs.push({ name: 'Buyer_Contract.pdf', sub: 'Signed by buyer' });
      notify('Offer accepted', t.buyer.name + ' accepted your counter on ' + t.commodity, '#/trades/' + t.id);
      toast('Your counter-offer was accepted', t.buyer.name + ' signed at ' + money(d.amount, 2) + ' / MT', { href: '#/trades/' + t.id, long: true });
      job('receipt', { id: t.id }, 5000);
    },
    receipt: function (d) {
      var t = trade(d.id); if (!t || t.status !== 'payment' || t.receipt) return;
      t.receipt = true;
      t.act.push({ at: Date.now(), ic: 'doc', t: 'Buyer uploaded the transaction receipt', sub: 'Proof of payment for ' + money(total(t), 2) + ' into escrow.', file: 'Transaction_Receipt.pdf' });
      t.docs.push({ name: 'Transaction_Receipt.pdf', sub: 'Uploaded by buyer' });
      notify('Payment receipt uploaded', 'Confirm the buyer’s payment on ' + t.commodity, '#/trades/' + t.id);
      toast('Buyer uploaded proof of payment', 'Review and confirm to release title', { href: '#/trades/' + t.id, blue: true, icon: 'doc', long: true });
    },
    verified: function (d) {
      var t = trade(d.id); if (!t || t.status !== 'review') return;
      t.status = 'listed';
      t.act.push({ at: Date.now(), ic: 'shield', t: 'Comdex verified your documents', sub: 'Bill of lading and contract approved for settlement.' });
      t.act.push({ at: Date.now() + 1, ic: 'globe', t: 'Order listed for trade', sub: t.visibility === 'public' ? 'Public listing, open to all verified traders' : 'Private listing, visible to invited counterparties' });
      notify('Order verified and listed', t.commodity + ' is now live', '#/trades/' + t.id);
      toast('Documents verified', t.commodity + ' is now listed', { href: '#/trades/' + t.id });
      job('counter', { id: t.id }, 9000);
    },
    deposit: function (d) {
      var x = S.txns.filter(function (z) { return z.id === d.id; })[0]; if (!x || x.st !== 'Pending verification') return;
      x.st = 'Credited'; S.wallet += x.amount;
      notify('Deposit credited', money(x.amount, 2) + ' added to your wallet', '#/transactions');
      toast('Deposit credited', money(x.amount, 2) + ' is now available as dUSD', { href: '#/transactions' });
    },
    kycReview: function () {
      if (S.kyc.status !== 'review') return;
      S.kyc.status = 'verified';
      notify('Organization verified', 'Your Comdex ID is active for trading', '#/account');
      toast('Organization verified', 'ABC Traders Pte. Ltd. can now trade on Comdex', { href: '#/account', long: true });
    }
  };
  setInterval(function () {
    var due = S.jobs.filter(function (j) { return j.at <= Date.now(); }); if (!due.length) return;
    S.jobs = S.jobs.filter(function (j) { return j.at > Date.now(); });
    due.forEach(function (j) { if (JOBS[j.type]) JOBS[j.type](j.data); });
    save(); render(true);
  }, 1000);

  /* ---------- modal layer ---------- */
  var lastFocus = null;
  function modal(html, cls, onKey) {
    lastFocus = document.activeElement;
    $('#layer').innerHTML = '<div class="scrim" data-scrim><div class="modal ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + '</div></div>';
    var m = $('#layer .modal'); m.tabIndex = -1;
    var f = $('#layer [autofocus]'); (f || m).focus();
    $('#layer').onkey = onKey || null;
  }
  function closeModal() {
    if (!$('#layer').innerHTML) return;
    $('#layer').innerHTML = '';
    if (/^#\/trades\/./.test(location.hash)) { history.replaceState(null, '', '#/trades'); }
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
  }
  function confirmBox(title, text, okLabel, onOk, danger) {
    var prev = $('#layer').innerHTML, prevFocus = document.activeElement;
    modal('<div class="m-head"><div class="t"><h2>' + esc(title) + '</h2><p>' + esc(text) + '</p></div><button class="x" data-a="close" aria-label="Close">' + ic('x') + '</button></div>' +
      '<div class="m-foot"><span class="l"></span><button class="btn sec" id="cfNo">Cancel</button><button class="btn ' + (danger ? 'danger' : 'pri') + '" id="cfOk">' + esc(okLabel) + '</button></div>');
    $('#layer .m-head .x').removeAttribute('data-a');
    function cancel() { if (prev) { $('#layer').innerHTML = prev; if (prevFocus && prevFocus.id) { var f = document.getElementById(prevFocus.id); if (f) f.focus(); } } else closeModal(); }
    $('#cfNo').onclick = cancel; $('#layer .m-head .x').onclick = cancel;
    $('#cfOk').onclick = function () { $('#layer').innerHTML = ''; onOk(); };
  }
  function download(name, text, type) {
    var b = new Blob([text], { type: type || 'text/plain' }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function copy(text, btn) {
    try { navigator.clipboard.writeText(text).catch(function () {}); } catch (e) {}
    if (btn) { btn.classList.add('done'); btn.innerHTML = ic('check', 'sm'); btn.setAttribute('aria-label', 'Copied'); setTimeout(function () { if (btn.isConnected) { btn.classList.remove('done'); btn.innerHTML = ic('copy', 'sm'); btn.setAttribute('aria-label', 'Copy'); } }, 1600); }
  }

  /* ---------- router ---------- */
  function route() { var h = location.hash.replace(/^#\/?/, '') || 'dashboard'; return h.split('/'); }
  window.addEventListener('hashchange', function () { closeModal(); orderForm = null; render(); window.scrollTo(0, 0); });

  var app = $('#app');
  function render(soft) {
    var r = route(), p = r[0];
    if (soft) { // background update: refresh without losing focus in forms
      if (p === 'order' || p === 'onboarding') return;
      if (document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && $('#layer').innerHTML) return;
    }
    if (p === 'order') return renderOrder(r[1]);
    if (p === 'onboarding') return renderOnboarding();
    var views = { dashboard: vDashboard, trades: vTrades, transactions: vTxns, account: vAccount, settings: vSettings };
    var v = views[p] || vDashboard;
    var y = window.scrollY;
    app.innerHTML = shell(p, v());
    if (soft) window.scrollTo(0, y);
    after[p] && after[p]();
    if (p === 'trades' && r[1]) { if ($('#layer .td') && soft) refreshTrade(r[1]); else if (!$('#layer .td')) openTrade(r[1]); }
  }
  var after = {};

  function shell(p, body) {
    var badge = S.trades.filter(needsMe).length, unread = S.notifs.filter(function (n) { return !n.read; }).length;
    function nl(k, label, icon, extra) { return '<a href="#/' + k + '" class="' + (p === k ? 'on' : '') + '"' + (p === k ? ' aria-current="page"' : '') + '>' + ic(icon) + label + (extra || '') + '</a>'; }
    var titles = {
      dashboard: [greet() + ', ' + S.org, 'Here’s what’s happening with your trades today.'],
      trades: ['Trades', 'Every order from draft to settlement, with the next step on each.'],
      transactions: ['Transactions', 'Deposits, escrow settlements and withdrawals in your Comdex wallet.'],
      account: ['Account', 'Your organization, Comdex ID and verification status.'],
      settings: ['Settings', 'Notifications, security and display preferences.']
    }[p] || ['', ''];
    return '<div class="shell"><aside class="side" id="side" aria-label="Main">' +
      '<a class="logo" href="#/dashboard" aria-label="Comdex home">' + LOGO + 'COMDEX</a>' +
      '<p class="nav-h">Main menu</p><nav class="nav">' + nl('dashboard', 'Dashboard', 'grid') + nl('trades', 'Trades', 'swap', badge ? '<span class="badge" aria-label="' + badge + ' need action">' + badge + '</span>' : '') + nl('transactions', 'Transactions', 'dollar') + nl('account', 'Account', 'user') + '</nav>' +
      '<div class="side-foot"><nav class="nav">' + nl('settings', 'Settings', 'gear') + '<a href="#" data-a="help">' + ic('help') + 'Help &amp; support</a></nav>' +
      '<div class="me">' + av(S.user.name) + '<div><b>' + esc(S.org) + '</b><span>' + esc(S.user.role + ' · ' + S.user.city) + '</span></div></div></div></aside>' +
      '<main class="main" id="main"><header class="top"><button class="icon-btn burger" data-a="burger" aria-label="Open menu">' + ic('menu') + '</button>' +
      '<div class="t"><h1>' + esc(titles[0]) + '</h1><p>' + esc(titles[1]) + '</p></div>' +
      '<button class="search" data-a="cmd" aria-label="Search trades, traders and actions">' + ic('search') + '<span>Search</span><kbd>⌘K</kbd></button>' +
      '<div class="menu-wrap"><button class="icon-btn" data-a="notifs" aria-label="Notifications' + (unread ? ', ' + unread + ' unread' : '') + '" aria-haspopup="true">' + ic('bell') + (unread ? '<span class="pip"></span>' : '') + '</button></div>' +
      '<div class="menu-wrap"><button class="btn pri quick" data-a="quick" aria-haspopup="true">' + ic('plus') + '<span>Quick add</span></button></div></header>' + body + '</main></div>';
  }
  function greet() { var h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }

  /* ---------- dashboard ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var RANGES = {
    D: { label: 'Today', n: 12, lab: function (i) { return (8 + i) + ':00'; }, tip: function (i) { return 'Today, ' + (8 + i) + ':00'; }, scale: 2.2e6, every: 2, seed: 11 },
    W: { label: 'This week', n: 7, lab: function (i) { return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]; }, tip: function (i) { return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]; }, scale: 19e6, every: 1, seed: 7 },
    M: { label: '1 – 15 Oct 2026', n: 17, lab: function (i) { var d = new Date(2026, 8, 28 + i); return d.getDate() + ' ' + MON[d.getMonth()]; }, tip: function (i) { var d = new Date(2026, 8, 28 + i); return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] + ', ' + d.getDate() + ' ' + MON[d.getMonth()]; }, scale: 19e6, every: 2, seed: 3 },
    Y: { label: '2026', n: 12, lab: function (i) { return MON[i]; }, tip: function (i) { return MON[i] + ' 2026'; }, scale: 320e6, every: 1, seed: 5 }
  };
  function series(k) {
    var R = RANGES[k], r = rng(R.seed), out = [];
    for (var i = 0; i < R.n; i++) out.push({ s: Math.round(R.scale * (0.25 + r() * 0.75) / 1e5) * 1e5, b: Math.round(R.scale * (0.15 + r() * 0.8) / 1e5) * 1e5 });
    if (k === 'M') { out[12] = { s: 12.7e6, b: 11.2e6 }; }
    return out;
  }
  function chartSvg(k, W) {
    W = W || 1000; var R = RANGES[k], d = series(k), H = 290, padL = 48, padB = 30, top = 10, mid = (H - padB - top) / 2 + top;
    var max = Math.max.apply(null, d.map(function (x) { return Math.max(x.s, x.b); })), step = niceStep(max), lim = step * 2;
    var bw = (W - padL) / d.length, bar = Math.min(18, bw * .42), g = '';
    [-2, -1, 0, 1, 2].forEach(function (m) { var y = mid - m * (mid - top) / 2; g += '<line class="gl" x1="' + padL + '" x2="' + W + '" y1="' + y + '" y2="' + y + '"/><text class="ax" x="' + (padL - 10) + '" y="' + (y + 4) + '" text-anchor="end">' + (m === 0 ? '0' : (m < 0 ? '−' : '') + compact(Math.abs(m) * step).replace('$', '')) + '</text>'; });
    d.forEach(function (x, i) {
      var cx = padL + bw * i + bw / 2, hs = x.s / lim * (mid - top), hb = x.b / lim * (mid - top);
      g += '<g class="b' + (k === 'M' && i === 12 ? ' on' : '') + '" data-i="' + i + '"><rect class="hl" x="' + (cx - bw * .32) + '" y="' + top + '" width="' + bw * .64 + '" height="' + (H - padB - top) + '" rx="10"/>' +
        '<rect x="' + (cx - bar / 2) + '" y="' + (mid - hs) + '" width="' + bar + '" height="' + hs + '" rx="4" fill="#1f5ae8"/>' +
        '<rect x="' + (cx - bar / 2) + '" y="' + mid + '" width="' + bar + '" height="' + hb + '" rx="4" fill="#c9d3e6"/>' +
        '<rect class="hit" x="' + (cx - bw / 2) + '" y="0" width="' + bw + '" height="' + H + '"/></g>';
      if (i % (W < 560 ? R.every * 2 : R.every) === 0) g += '<text class="ax" x="' + cx + '" y="' + (H - 6) + '" text-anchor="middle">' + R.lab(i) + '</text>';
    });
    return { svg: '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Buy versus sell volume, ' + R.label + '">' + g + '</svg>', data: d, total: d.reduce(function (a, x) { return a + x.s + x.b; }, 0) };
  }
  function niceStep(max) { var raw = max / 2, p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; }
  function priceSvg(k, W) {
    W = W || 1000; var R = RANGES[k], r = rng(R.seed + 40), H = 290, padL = 56, padB = 30, top = 14, pts = [], v = 9120;
    for (var i = 0; i < R.n; i++) { v += (r() - .45) * 140; pts.push(v); }
    var mn = Math.min.apply(null, pts) - 60, mx = Math.max.apply(null, pts) + 60, bw = (W - padL) / (R.n - 1), g = '';
    for (var j = 0; j <= 4; j++) { var y = top + (H - padB - top) * j / 4, val = mx - (mx - mn) * j / 4; g += '<line class="gl" x1="' + padL + '" x2="' + W + '" y1="' + y + '" y2="' + y + '"/><text class="ax" x="' + (padL - 10) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(val).toLocaleString() + '</text>'; }
    var path = pts.map(function (p, i) { return (i ? 'L' : 'M') + (padL + bw * i) + ' ' + (top + (mx - p) / (mx - mn) * (H - padB - top)); }).join(' ');
    g += '<path d="' + path + ' L' + W + ' ' + (H - padB) + ' L' + padL + ' ' + (H - padB) + 'Z" fill="#1f5ae8" opacity=".07"/><path d="' + path + '" fill="none" stroke="#1f5ae8" stroke-width="2.2"/>';
    pts.forEach(function (p, i) { if (i % R.every === 0) g += '<text class="ax" x="' + (padL + bw * i) + '" y="' + (H - 6) + '" text-anchor="middle">' + R.lab(i) + '</text>'; });
    return { svg: '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Copper LME cash price trend">' + g + '</svg>', last: pts[pts.length - 1], first: pts[0] };
  }

  function vDashboard() {
    var k = S.ui.range, fin = S.ui.chart === 'fin', c = fin ? chartSvg(k) : priceSvg(k);
    var tr = S.trades.filter(function (t) { return t.status !== 'draft'; }), buys = 12, sells = 13 + Math.max(0, tr.length - 3);
    var traders = S.traders.filter(function (t) { return t.st === S.ui.tTab; });
    var actC = S.traders.filter(function (t) { return t.st === 'active'; }).length, penC = S.traders.length - actC;
    var head = fin ? '<h2>Buy vs sell volume</h2><div class="big num">' + compact(c.total) + '<small>traded ' + ({ D: 'today', W: 'this week', M: 'this month', Y: 'this year' })[k] + '</small></div>'
      : '<h2>Copper · LME cash</h2><div class="big num">$' + Math.round(c.last).toLocaleString() + '<small>per MT · ' + ((c.last - c.first) >= 0 ? '+' : '') + ((c.last - c.first) / c.first * 100).toFixed(1) + '% over period</small></div>';
    return '<div class="grid-dash"><div class="col">' +
      '<div class="kpis">' +
        '<div class="card kpi wallet"><div class="kpi-h"><span class="ic">' + ic('wallet', 'sm') + '</span>Wallet balance<button class="refresh" data-a="refreshWallet" aria-label="Refresh balance">' + ic('refresh', 'sm') + '</button></div><strong class="num">' + money(S.wallet) + '</strong><span class="delta">' + ic('ur', 'sm') + '4.2%</span><span>vs last month</span><div class="fund"><button class="btn" data-a="addFunds">' + ic('plus', 'sm') + 'Add funds</button></div></div>' +
        '<div class="card kpi"><div class="kpi-h"><span class="ic" style="background:var(--green-s);color:var(--green)">' + ic('dl', 'sm') + '</span>Total receivables</div><strong class="num">' + money(receivables()) + '</strong><span class="delta">' + ic('ur', 'sm') + '12.5%</span><span>vs last month</span></div>' +
        '<div class="card kpi"><div class="kpi-h"><span class="ic" style="background:var(--red-s);color:var(--red)">' + ic('ur', 'sm') + '</span>Total payables</div><strong class="num">' + money(S.base.pay) + '</strong><span class="delta">' + ic('dl', 'sm') + '2.1%</span><span>vs last month</span></div>' +
      '</div>' +
      '<section class="card chart-card" aria-label="Volume chart"><div class="chart-top"><div style="margin-right:auto">' + head + '</div>' +
        '<div class="seg" role="group" aria-label="Chart type"><button data-a="chart" data-v="fin" class="' + (fin ? 'on' : '') + '" aria-pressed="' + fin + '">Financials</button><button data-a="chart" data-v="mkt" class="' + (!fin ? 'on' : '') + '" aria-pressed="' + !fin + '">Market stats</button></div>' +
        '<div class="seg" role="group" aria-label="Period">' + ['D', 'W', 'M', 'Y'].map(function (x) { return '<button data-a="range" data-v="' + x + '" class="' + (k === x ? 'on' : '') + '" aria-pressed="' + (k === x) + '" title="' + RANGES[x].label + '">' + x + '</button>'; }).join('') + '</div></div>' +
        (fin ? '<div class="legend"><span><i style="background:#1f5ae8"></i>Sell</span><span><i style="background:#c9d3e6"></i>Buy</span></div>' : '<div class="legend"><span><i style="background:#1f5ae8"></i>USD per metric ton</span></div>') +
        '<div class="chart" id="chart">' + c.svg + '</div></section>' +
      '<section class="card"><div class="tabs" style="align-items:center"><h2 style="font-size:16px;font-weight:600;margin-right:6px">Traders</h2>' +
        '<button data-a="tTab" data-v="active" class="' + (S.ui.tTab === 'active' ? 'on' : '') + '">Active <span class="ct">' + actC + '</span></button>' +
        '<button data-a="tTab" data-v="pending" class="' + (S.ui.tTab === 'pending' ? 'on' : '') + '">Pending approval <span class="ct">' + penC + '</span></button>' +
        '<span style="margin-left:auto;display:flex;gap:8px;padding:10px 0"><button class="btn sec small" data-a="exportTraders">' + ic('down', 'sm') + 'Export</button><button class="btn soft small" data-a="invite">' + ic('uplus', 'sm') + 'Invite trader</button></span></div>' +
        '<div class="tbl-wrap"><table><thead><tr><th>Trader</th><th>Trades</th><th class="r">Receivables</th><th class="r">Payables</th><th>Last trade</th><th>Status</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' +
        (traders.length ? traders.map(function (t) {
          return '<tr><td><div class="who">' + av(t.name) + '<div><b>' + esc(t.name) + '</b><small>' + esc(t.id) + '</small></div></div></td><td class="num">' + t.trades + '</td><td class="r num pos">' + money(t.rec) + '</td><td class="r num">' + money(t.pay) + '</td><td>' + (t.last ? ago(t.last) : '<span style="color:var(--dim)">No trades yet</span>') + '</td>' +
            '<td>' + (t.st === 'active' ? '<span class="pill g">Active</span>' : '<span class="pill a">Pending</span>') + '</td><td class="r">' + (t.st === 'pending' ? '<button class="btn ok small" data-a="approve" data-id="' + t.id + '">Approve</button>' : '<span class="chev-c">' + ic('chevr', 'sm') + '</span>') + '</td></tr>';
        }).join('') : '<tr><td colspan="7"><div class="empty"><b>No traders waiting</b>Invite a teammate and they’ll appear here until you approve them.</div></td></tr>') +
        '</tbody></table></div><div class="tbl-foot"><span>Showing ' + traders.length + ' of ' + traders.length + ' traders</span></div></section>' +
      '</div><div class="col">' +
      '<section class="card stats-card"><div style="display:flex;align-items:center"><h2 style="font-size:16px;font-weight:600">Trade statistics</h2></div>' +
        '<div class="tot"><small>Total trades</small><strong class="num">' + (buys + sells) + '</strong><div class="bs" style="--b:' + buys + 'fr;--s:' + sells + 'fr"><span>Buy ' + buys + '</span><span>Sell ' + sells + '</span><i></i><i></i></div></div>' +
        '<div class="split3"><div><small>This month</small><b class="num">' + (14 + Math.max(0, tr.length - 3)) + '</b></div><div><small>This week</small><b class="num">' + (6 + Math.max(0, tr.length - 3)) + '</b></div><div><small>Needs you</small><b class="num" style="color:' + (S.trades.filter(needsMe).length ? 'var(--amber)' : 'inherit') + '">' + S.trades.filter(needsMe).length + '</b></div></div></section>' +
      '<section class="card"><div class="card-h"><h2>Team activity</h2></div><div class="feed">' + S.team.slice(0, 4).map(function (a) {
        return '<div class="ev"><span class="ic' + (a.ic === 'check' ? ' g' : '') + '">' + ic(a.ic, 'sm') + '</span><div><p><b>' + esc(a.who) + '</b> ' + esc(a.t) + (a.obj ? ' <b>' + esc(a.obj) + '</b>' : '') + '</p><small>' + ago(a.at) + '</small></div></div>';
      }).join('') + '</div></section>' +
      '<section class="card"><div class="card-h"><h2>Market news</h2></div><div class="news">' +
        [['en', 'Energy', '34m', 'Brent edges higher as Libyan output stays offline'], ['me', 'Metals', '52m', 'Copper premiums in Rotterdam firm on tight cathode supply'], ['me', 'Metals', '58m', 'Palladium holds gains after UBS lifts forecast'], ['ag', 'Agri', '1h', 'Malaysian palm oil exports rise 6% in first half of October']].map(function (n) {
          return '<a href="#" data-a="news"><span class="tag ' + n[0] + '">' + n[1] + '</span><small>' + n[2] + ' ago</small><b>' + n[3] + '</b></a>';
        }).join('') + '</div></section></div></div>';
  }
  function drawChart() {
    var ch = $('#chart'); if (!ch) return;
    var w = Math.max(320, Math.round(ch.clientWidth)), k = S.ui.range;
    ch.innerHTML = S.ui.chart === 'fin' ? chartSvg(k, w).svg : priceSvg(k, w).svg;
    return ch;
  }
  var rsT; window.addEventListener('resize', function () { clearTimeout(rsT); rsT = setTimeout(function () { if (route()[0] === 'dashboard' && $('#chart')) after.dashboard(); }, 120); });
  after.dashboard = function () {
    var ch = drawChart(); if (!ch || S.ui.chart !== 'fin') return;
    var d = series(S.ui.range), R = RANGES[S.ui.range], tip = document.createElement('div'); tip.className = 'tip'; tip.hidden = true; ch.appendChild(tip);
    function show(g) {
      var i = +g.dataset.i, x = d[i], bb = g.querySelector('.hl').getBoundingClientRect(), cb = ch.getBoundingClientRect();
      $$('g.b', ch).forEach(function (n) { n.classList.toggle('on', n === g); });
      tip.innerHTML = '<b>' + R.tip(i) + '</b><div><span><i style="background:#1f5ae8"></i>Sell</span><span class="num">' + compact(x.s) + '</span></div><div><span><i style="background:#c9d3e6"></i>Buy</span><span class="num">' + compact(x.b) + '</span></div>';
      tip.hidden = false; tip.style.left = Math.min(Math.max(bb.left - cb.left + bb.width / 2, 80), cb.width - 80) + 'px'; tip.style.top = (bb.top - cb.top + 30) + 'px';
    }
    $$('g.b', ch).forEach(function (g) { g.addEventListener('mouseenter', function () { show(g); }); });
    var on = $('g.b.on', ch); if (on) show(on);
  };

  /* ---------- trades list ---------- */
  function vTrades() {
    var f = S.ui.tradeFilter, groups = { all: function () { return true; }, action: needsMe, live: function (t) { return /listed|negotiating|awaiting|payment|review/.test(t.status); }, completed: function (t) { return t.status === 'completed'; }, draft: function (t) { return t.status === 'draft'; } };
    var list = S.trades.filter(groups[f]).sort(function (a, b) { return (needsMe(b) - needsMe(a)) || (b.created - a.created); });
    var live = S.trades.filter(groups.live), liveVal = live.reduce(function (a, t) { return a + total(t); }, 0);
    function cnt(k) { return S.trades.filter(groups[k]).length; }
    return '<div class="page-h"><div class="sum3">' +
      '<div class="card mini"><small>Live orders</small><b class="num">' + live.length + '</b><em>' + money(liveVal) + ' in shipment value</em></div>' +
      '<div class="card mini"><small>Needs your action</small><b class="num" style="color:' + (cnt('action') ? 'var(--amber)' : 'inherit') + '">' + cnt('action') + '</b><em>Counter-offers, payments and drafts</em></div>' +
      '<div class="card mini"><small>Completed</small><b class="num">' + cnt('completed') + '</b><em>Settled through escrow</em></div></div></div>' +
      '<section class="card"><div class="tabs">' + [['all', 'All'], ['action', 'Needs action'], ['live', 'Live'], ['completed', 'Completed'], ['draft', 'Drafts']].map(function (x) {
        return '<button data-a="tf" data-v="' + x[0] + '" class="' + (f === x[0] ? 'on' : '') + '">' + x[1] + ' <span class="ct">' + cnt(x[0]) + '</span></button>';
      }).join('') + '<span style="margin-left:auto;padding:7px 0"><a class="btn pri small" href="#/order/new">' + ic('plus', 'sm') + 'New sell order</a></span></div>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Route</th><th>Commodity</th><th class="r">Quantity</th><th class="r">Value</th><th>Counterparty</th><th>Status</th><th>Updated</th></tr></thead><tbody>' +
      (list.length ? list.map(function (t) {
        var s = ST[t.status], last = t.act[t.act.length - 1];
        return '<tr class="click" data-a="openTrade" data-id="' + t.id + '" tabindex="0"><td><b>' + esc(t.from.country || '—') + '</b> <span style="color:var(--dim)">→</span> <b>' + esc(t.to.country || '—') + '</b><br><small style="color:var(--mut)">' + esc((t.from.port || '') + ' to ' + (t.to.port || '')) + '</small></td>' +
          '<td>' + esc(t.commodity) + '<br><small style="color:var(--mut)">' + esc(t.term + ' · ' + t.listing.replace('discovery', 'Trade discovery').replace('settlement', 'Trade settlement')) + '</small></td>' +
          '<td class="r num">' + (t.qty || 0).toLocaleString() + ' MT</td><td class="r num"><b>' + money(total(t)) + '</b><br><small style="color:var(--mut)">' + money(unit(t), 2) + ' / MT</small></td>' +
          '<td>' + (t.buyer && t.buyer.name ? esc(t.buyer.name) : '<span style="color:var(--dim)">' + (t.status === 'draft' ? 'Not listed' : 'Waiting for buyers') + '</span>') + '</td>' +
          '<td><span class="pill ' + s.c + '">' + s.l + '</span></td><td style="color:var(--mut)">' + ago(last.at) + '</td></tr>';
      }).join('') : '<tr><td colspan="7"><div class="empty"><b>Nothing here</b>' + (f === 'action' ? 'You’re all caught up. New counter-offers and payments will show here.' : 'Create a sell order to start a trade.') + '<br><a class="btn pri" href="#/order/new">' + ic('plus', 'sm') + 'New sell order</a></div></td></tr>') +
      '</tbody></table></div></section>';
  }

  /* ---------- trade detail (deal room) ---------- */
  var tdTab = 'summary';
  function openTrade(id) {
    var t = trade(id); if (!t) { location.hash = '#/trades'; return; }
    if (location.hash !== '#/trades/' + id) history.replaceState(null, '', '#/trades/' + id);
    tdTab = 'summary';
    modal('<div class="td" style="display:contents">' + tradeHtml(t) + '</div>', 'xl');
    $('#layer .modal').style.height = 'min(900px, calc(100vh - 48px))';
  }
  function refreshTrade(id) {
    var t = trade(id), box = $('#layer .td'); if (!t || !box) return;
    var sc = $('.td-main', box), st = sc ? sc.scrollTop : 0;
    box.innerHTML = tradeHtml(t); var n = $('.td-main', box); if (n) n.scrollTop = st;
  }
  function tradeHtml(t) {
    var s = ST[t.status], done = s.done;
    var prog = STAGES.map(function (l, i) {
      var cls = i < done ? 'done' : i === done ? 'cur' : '';
      var d = i < done ? stageDate(t, i) : i === done ? (t.status === 'review' ? 'Verifying documents' : t.status === 'draft' ? 'Not placed yet' : 'In progress') : '';
      return '<div class="' + cls + '"><i>' + (i < done ? ic('check') : '') + '</i><b>' + l + '</b><small>' + (d || '&nbsp;') + '</small></div>';
    }).join('');
    return '<div class="td-head"><div class="t"><div class="oid">Order ' + t.id + '<button class="cp" data-a="copy" data-v="' + t.id + '" aria-label="Copy order ID">' + ic('copy', 'sm') + '</button></div>' +
      '<div class="route"><span>' + esc(t.from.country) + '</span>' + ic('right') + '<span>' + esc(t.to.country) + '</span><span class="pill ' + s.c + '" style="font-size:13px">' + s.l + '</span></div></div>' +
      '<button class="btn sec" data-a="dlSummary" data-id="' + t.id + '">' + ic('down', 'sm') + '<span>Download summary</span></button><button class="x" data-a="close" aria-label="Close">' + ic('x') + '</button></div>' +
      '<div class="prog" aria-label="Trade progress">' + prog + '</div>' +
      '<div class="td-body"><div class="td-main"><div class="tabs" role="tablist">' + [['summary', 'Trade summary'], ['obl', 'OBL details'], ['commodity', 'Commodity details']].map(function (x) {
        return '<button role="tab" aria-selected="' + (tdTab === x[0]) + '" data-a="tdTab" data-v="' + x[0] + '" class="' + (tdTab === x[0] ? 'on' : '') + '">' + x[1] + '</button>';
      }).join('') + '</div><div class="td-pane">' + (tdTab === 'summary' ? tdSummary(t) : tdTab === 'obl' ? tdObl(t) : tdCommodity(t)) + '</div></div>' +
      '<aside class="td-side">' + tdAside(t) + '</aside></div>';
  }
  function banner(t) {
    var tot = money(total(t), 2);
    switch (t.status) {
      case 'draft': return '<div class="banner a"><div class="bh"><span class="bi">' + ic('pen') + '</span><div><h3>This order is still a draft</h3><p>Add shipment dates and the original bill of lading, then publish it to start receiving offers.</p></div></div><div class="acts"><a class="btn pri" href="#/order/' + t.id + '">Continue editing</a><button class="btn danger" data-a="delDraft" data-id="' + t.id + '">' + ic('trash', 'sm') + 'Delete draft</button></div></div>';
      case 'review': return '<div class="banner a"><div class="bh"><span class="bi">' + ic('shield') + '</span><div><h3>Comdex is verifying your documents</h3><p>You chose Trade settlement, so we check the bill of lading and contract before the order goes live. This usually takes under a business day.</p></div></div></div>';
      case 'listed': return '<div class="banner b"><div class="bh"><span class="bi">' + ic('globe') + '</span><div><h3>Listed — waiting for a buyer</h3><p>' + (t.visibility === 'public' ? 'Visible to every verified trader on Comdex.' : 'Visible only to the counterparties you invited.') + ' Offers will appear here and you’ll be notified.</p></div></div><div class="acts"><button class="btn sec" data-a="simOffer" data-id="' + t.id + '">Simulate a buyer offer</button><span style="color:var(--mut);align-self:center;font-size:13px">Prototype shortcut</span></div></div>';
      case 'negotiating':
        var o = t.offers.filter(function (x) { return x.by === 'buyer' && x.st === 'Pending'; })[0];
        var diff = (o.amount - t.price) / t.price * 100;
        return '<div class="banner a"><div class="bh"><span class="bi">' + ic('swap') + '</span><div><h3>' + esc(t.buyer.name) + ' sent a counter-offer</h3><p><b class="num">' + money(o.amount, 2) + ' / MT</b> against your ' + money(t.price, 2) + ' (' + diff.toFixed(1) + '%). That’s <b class="num">' + money(o.amount * t.qty, 2) + '</b> for ' + t.qty.toLocaleString() + ' MT.</p></div></div>' +
          '<div class="acts" id="negActs"><button class="btn ok" data-a="acceptOffer" data-id="' + t.id + '">' + ic('check', 'sm') + 'Accept ' + money(o.amount, 2) + '</button><button class="btn sec" data-a="counterForm" data-id="' + t.id + '">Counter</button><button class="btn danger" data-a="declineOffer" data-id="' + t.id + '">Decline</button></div></div>';
      case 'awaiting':
        var mine = t.offers.filter(function (x) { return x.by === 'you' && x.st === 'Pending'; })[0];
        return '<div class="banner b"><div class="bh"><span class="bi">' + ic('mail') + '</span><div><h3>Counter sent — waiting for ' + esc(t.buyer.name) + '</h3><p>You offered <b class="num">' + money(mine.amount, 2) + ' / MT</b>. Buyers usually respond within a few hours; we’ll notify you.</p></div></div></div>';
      case 'payment':
        if (!t.receipt) return '<div class="banner b"><div class="bh"><span class="bi">' + ic('bank') + '</span><div><h3>Waiting for the buyer’s payment</h3><p>' + esc(t.buyer.name) + ' pays <b class="num">' + tot + '</b> into Comdex escrow in dUSD. Title stays with you until you confirm.</p></div></div></div>';
        return '<div class="banner a"><div class="bh"><span class="bi">' + ic('doc') + '</span><div><h3>Buyer uploaded proof of payment</h3><p>Escrow holds <b class="num">' + tot + '</b>. Confirming releases it to your wallet and transfers title on-chain. This can’t be undone.</p></div></div>' +
          '<div class="acts"><button class="btn ok" data-a="confirmPay" data-id="' + t.id + '">' + ic('checks', 'sm') + 'Confirm payment & release title</button><button class="btn sec" data-a="fakeDoc" data-v="Transaction_Receipt.pdf">' + ic('doc', 'sm') + 'View receipt</button></div></div>';
      case 'completed':
        var fb = t.fb || {};
        return '<div class="banner g"><div class="bh"><span class="bi">' + ic('checks') + '</span><div><h3>This trade is complete</h3><p>Payment confirmed and title transferred on ' + stageDate(t, 3) + '. ' + tot + ' was released to your wallet.</p></div></div>' +
          '<div class="fb"><div><div class="h">Your feedback' + (fb.mine ? '<span class="stars" aria-label="' + fb.mine.stars + ' of 5">' + '★★★★★'.slice(0, fb.mine.stars) + '</span>' : '') + '</div>' +
          (fb.mine ? '<q>' + esc(fb.mine.text) + '</q><small>' + dtFmt(t.act[t.act.length - 1].at) + '</small>' : '<div class="stars" role="group" aria-label="Rate this buyer" style="font-size:22px;display:flex;gap:2px">' + [1, 2, 3, 4, 5].map(function (n) { return '<button data-a="rate" data-id="' + t.id + '" data-v="' + n + '" aria-label="' + n + ' star' + (n > 1 ? 's' : '') + '" style="color:#d6dbe5">★</button>'; }).join('') + '</div><small>Rate ' + esc(t.buyer.name) + ' to build their reputation.</small>') + '</div>' +
          '<div><div class="h">Buyer’s feedback' + (fb.theirs ? '<span class="stars">' + '★★★★★'.slice(0, fb.theirs.stars) + '</span>' : '') + '</div>' + (fb.theirs ? '<q>' + esc(fb.theirs.text) + '</q><small>' + dtFmt(t.act[t.act.length - 1].at) + '</small>' : '<small style="margin:0">Not left yet.</small>') + '</div></div></div>';
    }
    return '';
  }
  function tdSummary(t) {
    var acts = t.act.slice().reverse();
    var tl = acts.map(function (a) {
      var g = /check/.test(a.ic);
      return '<div class="ev"><span class="ic' + (g ? ' g' : a.ic === 'swap' || a.ic === 'pen' ? ' a' : '') + '">' + ic(a.ic, 'sm') + '</span><div><p>' + esc(a.t) + '</p>' + (a.sub ? '<div class="sub">' + esc(a.sub) + '</div>' : '') +
        (a.file ? '<button class="chipfile" data-a="fakeDoc" data-v="' + esc(a.file) + '">' + ic('file', 'sm') + esc(a.file) + ic('down', 'sm') + '</button>' : '') + '</div><time>' + dtFmt(a.at) + '</time></div>';
    }).join('');
    var offers = '';
    if (t.offers && t.offers.length) {
      var acc = t.offers.filter(function (o) { return o.st === 'Accepted'; })[0];
      offers = '<div class="act-h"><h3>Offers</h3><span>' + t.offers.length + ' in this deal</span></div><div class="offers"' + (acc ? '' : ' style="border-color:var(--line)"') + '>' +
        (acc ? '<div class="oh"><span>Agreed price</span><b class="num">' + money(acc.amount, 2) + ' / MT</b><span class="pill g">Accepted</span></div>' : '') +
        '<div class="tbl-wrap"><table><thead><tr><th>From</th><th>Date</th><th class="r">Price / MT</th><th>Contract</th><th>Status</th></tr></thead><tbody>' +
        t.offers.slice().reverse().map(function (o) {
          var c = { Accepted: 'g', Pending: 'a', Active: 'b', Withdrawn: 'n', Declined: 'r' }[o.st];
          return '<tr><td style="color:var(--ink)">' + (o.by === 'you' ? 'You' : esc(t.buyer.name)) + '</td><td>' + dtFmt(o.at) + '</td><td class="r num" style="color:var(--ink);font-weight:600">' + money(o.amount, 2) + '</td><td><a href="#" data-a="fakeDoc" data-v="' + esc(o.doc) + '">' + esc(o.doc) + '</a></td><td><span class="pill ' + c + '">' + o.st + '</span></td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }
    return banner(t) + offers + '<div class="act-h"><h3>Activity</h3><span>Newest first</span></div><div class="tl">' + tl + '</div>';
  }
  function kvl(rows) { return '<dl class="kvl">' + rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + (r[1] ? esc(r[1]) : '<span style="color:var(--dim)">Not provided</span>') + '</dd>'; }).join('') + '</dl>'; }
  function tdObl(t) {
    var o = t.obl || {};
    return '<p style="color:var(--mut);margin-bottom:14px">The original bill of lading is the title document. On Comdex it’s recorded on-chain, so ownership moves with the trade.</p>' +
      kvl([['OBL number', o.no], ['Carrier', o.carrier], ['Vessel', o.vessel], ['Date of issue', o.issued ? dFmt(o.issued) : ''], ['Port of loading', t.from.port + ', ' + t.from.country], ['Port of discharge', t.to.port + ', ' + t.to.country], ['Consignee', 'To order'], ['Title holder', t.status === 'completed' ? t.buyer.name : S.org + ' Pte. Ltd.']]) +
      (o.file ? '<div class="file" style="margin-top:16px"><span class="pdf">PDF</span><div class="m"><b>' + esc(o.file) + '</b><small>Original bill of lading</small></div><button class="act" data-a="fakeDoc" data-v="' + esc(o.file) + '" aria-label="Download">' + ic('down', 'sm') + '</button></div>' : '');
  }
  function tdCommodity(t) {
    return kvl([['Commodity', t.commodity], ['Name on bill of lading', t.blName], ['Quality', t.quality], ['Quantity', (t.qty || 0).toLocaleString() + ' MT'], ['Delivery term', t.term], ['Listing type', t.listing === 'settlement' ? 'Trade settlement · Comdex verifies' : 'Trade discovery · parties verify'], ['Visibility', t.visibility === 'public' ? 'Public' : 'Private'], ['Asking price', money(t.price, 2) + ' / MT'], ['Shipment window', t.shipFrom ? dFmt(t.shipFrom) + ' – ' + dFmt(t.shipBy) : '']]);
  }
  function tdAside(t) {
    var final = t.status === 'completed' || t.agreed;
    return '<div class="price-card"><div class="pc-route"><div><small>FROM</small><b>' + esc(t.from.country) + '</b></div><div class="mid"><hr><span>' + ic('ship', 'sm') + '</span><hr></div><div class="r"><small>TO</small><b>' + esc(t.to.country) + '</b></div></div>' +
      '<div class="lbl">' + (t.status === 'completed' ? 'Final sale price' : final ? 'Agreed value' : 'Asking value') + '</div><div class="v num">' + money(total(t), 2) + '<small>' + t.qty.toLocaleString() + ' MT × ' + money(unit(t), 2) + '</small></div></div>' +
      '<div class="info"><div><small>Seller</small><b>' + esc(S.org) + ' · ' + esc(S.user.id) + '</b></div><div><small>Buyer</small><b>' + (t.buyer && t.buyer.name ? esc(t.buyer.name) + ' · ' + esc(t.buyer.id) : '—') + '</b></div>' +
      '<div><small>Contract ID</small><b>' + esc(t.contract) + '</b></div><div><small>Order date</small><b>' + dtFmt(t.created) + '</b></div>' + (t.buyer && t.buyer.email ? '<div><small>Buyer email</small><b>' + esc(t.buyer.email) + '</b></div>' : '') + '</div>' +
      '<h3 class="side-h">Documents</h3><div class="docs">' + (t.docs.length ? t.docs.slice().reverse().map(function (d) {
        return '<div class="file"><span class="pdf">PDF</span><div class="m"><b>' + esc(d.name) + '</b><small>' + esc(d.sub) + '</small></div><button class="act" data-a="fakeDoc" data-v="' + esc(d.name) + '" aria-label="Download ' + esc(d.name) + '">' + ic('down', 'sm') + '</button></div>';
      }).join('') : '<p style="color:var(--mut)">No documents yet.</p>') + '</div>';
  }

  /* ---------- transactions ---------- */
  function vTxns() {
    var pend = S.txns.filter(function (x) { return x.st === 'Pending verification'; });
    return '<div class="page-h"><div class="sum3"><div class="card mini"><small>Available balance</small><b class="num">' + money(S.wallet, 2) + '</b><em>dUSD, ready to trade</em></div>' +
      '<div class="card mini"><small>Pending deposits</small><b class="num">' + money(pend.reduce(function (a, x) { return a + x.amount; }, 0), 2) + '</b><em>' + (pend.length ? pend.length + ' waiting for verification' : 'Nothing pending') + '</em></div>' +
      '<div class="card mini" style="display:flex;align-items:center;gap:14px"><div style="flex:1"><small>Fund your wallet</small><em style="display:block;margin-top:4px">Bank transfer, credited as dUSD</em></div><button class="btn pri" data-a="addFunds">' + ic('plus', 'sm') + 'Add funds</button></div></div></div>' +
      '<section class="card"><div class="tbl-wrap"><table><thead><tr><th>Transaction</th><th>Type</th><th>Reference</th><th>Date</th><th>Status</th><th class="r">Amount</th></tr></thead><tbody>' +
      S.txns.slice().sort(function (a, b) { return b.at - a.at; }).map(function (x) {
        var c = { 'Pending verification': 'a', Credited: 'g', Settled: 'g', Completed: 'n' }[x.st];
        return '<tr><td><b>' + x.id + '</b></td><td>' + x.type + '</td><td style="color:var(--mut)">' + esc(x.ref) + '</td><td>' + dtFmt(x.at) + '</td><td><span class="pill ' + c + '">' + x.st + '</span></td><td class="r num ' + (x.amount > 0 ? 'pos' : '') + '" style="font-weight:600">' + (x.amount > 0 ? '+' : '') + money(x.amount, 2) + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';
  }

  /* ---------- account & settings ---------- */
  function kycPct() { var n = 0; for (var i = 1; i <= 9; i++) if (S.kyc.done[i]) n++; return Math.round(n / 9 * 100); }
  function vAccount() {
    var k = S.kyc, p = kycPct(), st = k.status;
    var stc = st === 'verified' ? '<span class="pill g">Verified</span>' : st === 'review' ? '<span class="pill a">Under review</span>' : '<span class="pill b">' + p + '% complete</span>';
    return '<div class="acct"><div class="col">' +
      '<section class="card sec"><h2>Organization</h2>' + kvl([['Legal name', k.d.legal], ['Short name', k.d.short], ['Registration zone', ZONES[k.d.zone][1] + ' · ' + ZONES[k.d.zone][2]], ['Registered address', k.d.address ? k.d.address + (k.d.postal ? ', ' + k.d.postal : '') : ''], ['Beneficial owners', k.owners.map(function (o) { return o.name + ' (' + o.pct + '%)'; }).join(', ')]]) + '</section>' +
      '<section class="card sec"><h2>Comdex ID</h2><p style="color:var(--mut);margin-bottom:12px">One verified identity that follows you into every deal, counterparty check and settlement.</p>' +
      (k.chain ? '<div class="addr">' + ic('key', 'sm') + '<span style="flex:1">' + k.chain + '</span><button class="cp" data-a="copy" data-v="' + k.chain + '" aria-label="Copy address">' + ic('copy', 'sm') + '</button></div>' : '<div class="note a">' + ic('info', 'sm') + '<span>Your blockchain account is created in step 7 of onboarding.</span></div>') + '</section>' +
      '<section class="card sec"><h2>Team</h2>' + S.traders.map(function (t) { return '<div class="toggle-r"><div class="who" style="flex:1">' + av(t.name) + '<div><b>' + esc(t.name) + '</b><small>' + esc(t.email) + '</small></div></div>' + (t.st === 'active' ? '<span class="pill g">Active</span>' : '<span class="pill a">Pending</span>') + '</div>'; }).join('') + '<button class="btn soft" style="margin-top:12px" data-a="invite">' + ic('uplus', 'sm') + 'Invite trader</button></section>' +
      '</div><div class="col"><section class="card kyc-card"><div style="display:flex;gap:16px;align-items:center"><div class="ring" style="--p:' + (st === 'progress' ? p : 100) + '"><span>' + (st === 'progress' ? p + '%' : ic('check')) + '</span></div><div><b style="font-size:16px">Trader verification</b><div style="margin-top:6px">' + stc + '</div></div></div>' +
      '<p style="color:var(--mut);margin:16px 0">' + (st === 'verified' ? 'Your organization is verified. Counterparties see a verified badge on every order.' : st === 'review' ? 'Our onboarding team is checking your documents. Most reviews finish within one business day.' : 'Finish verification once and reuse it on every trade. About ' + Math.max(2, (9 - Object.keys(k.done).length) * 2) + ' minutes left.') + '</p>' +
      (st === 'progress' ? '<a class="btn pri block" href="#/onboarding">Continue setup' + ic('right', 'sm') + '</a>' : '<a class="btn sec block" href="#/onboarding">View submission</a>') + '</section>' +
      '<section class="card kyc-card"><b style="font-size:15px">Wallet</b><div style="font-size:24px;font-weight:700;margin:8px 0 2px" class="num">' + money(S.wallet, 2) + '</div><p style="color:var(--mut);margin-bottom:14px">Held as dUSD on Comdex.</p><button class="btn sec block" data-a="addFunds">' + ic('plus', 'sm') + 'Add funds</button></section>' +
      '<button class="btn danger" data-a="reset">' + ic('refresh', 'sm') + 'Reset prototype data</button></div></div>';
  }
  function sw(k, label, sub) { return '<div class="toggle-r"><div><b>' + label + '</b><small>' + sub + '</small></div><label class="sw"><input type="checkbox" data-pref="' + k + '"' + (S.prefs[k] ? ' checked' : '') + ' aria-label="' + label + '"><span></span></label></div>'; }
  function vSettings() {
    return '<div class="acct"><div class="col"><section class="card sec"><h2>Notifications</h2>' + sw('offers', 'Offers and counter-offers', 'Get notified the moment a buyer responds.') + sw('email', 'Email me about payments', 'Receipts, escrow releases and deposits.') + sw('digest', 'Weekly digest', 'A Monday summary of volume and open trades.') + '</section>' +
      '<section class="card sec"><h2>Security</h2>' + sw('twofa', 'Two-factor authentication', 'Required to confirm payments and release title.') + '</section>' +
      '<section class="card sec"><h2>Display</h2><div class="f" style="max-width:280px"><label for="ccy">Reporting currency</label><div class="inp"><select id="ccy" data-pref-sel="ccy">' + ['USD', 'SGD', 'EUR', 'AED'].map(function (c) { return '<option' + (S.prefs.ccy === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm') + '</div><span class="help">Trades still settle in dUSD.</span></div></section></div><div></div></div>';
  }

  /* ---------- popovers ---------- */
  function closePops() { $$('.pop').forEach(function (p) { p.remove(); }); }
  function pop(anchor, html, cls) {
    var open = anchor.parentNode.querySelector('.pop'); closePops(); if (open) return null;
    var d = document.createElement('div'); d.className = 'pop ' + (cls || ''); d.innerHTML = html; anchor.parentNode.appendChild(d); return d;
  }

  /* ---------- add funds ---------- */
  function addFunds() {
    var st = { copied: false, txid: '', amt: '', file: null };
    var bank = [['Account holder', 'Comdex Company PTE Limited'], ['Account number', '09238409283'], ['SWIFT code', 'DBSSGSGSG'], ['Bank', 'DBS Bank Ltd., Singapore']];
    function done() { return (st.copied ? 1 : 0) + (st.txid.length >= 6 && num(st.amt) > 0 ? 1 : 0) + (st.file ? 1 : 0); }
    modal('<div class="m-head"><span class="hic">' + ic('wallet') + '</span><div class="t"><h2>Add funds to your wallet</h2><p>Make a bank transfer to Comdex, then share the details below so we can match and credit it.</p></div><button class="x" data-a="close" aria-label="Close">' + ic('x') + '</button></div>' +
      '<div class="m-body"><div class="steps-v">' +
      '<div class="sv on" id="s1"><span class="n">1</span><div><h3>Transfer to Comdex’s bank account</h3><div class="kv"><div class="kv-h">' + ic('bank', 'sm') + 'Bank transfer details<button class="link" id="cpAll">' + ic('copy', 'sm') + 'Copy all</button></div>' +
        bank.map(function (b) { return '<div class="kv-r"><span>' + b[0] + '</span><b>' + b[1] + '</b><button class="cp" data-cp="' + b[1] + '" aria-label="Copy ' + b[0] + '">' + ic('copy', 'sm') + '</button></div>'; }).join('') + '</div>' +
        '<div class="memo">' + ic('alert') + '<div><b>Add this reference to the transfer memo</b><p>Your Trader ID, or a contract number for an advance payment.</p></div><span class="code">' + S.user.id + '<button class="cp" data-cp="' + S.user.id + '" aria-label="Copy reference">' + ic('copy', 'sm') + '</button></span></div></div></div>' +
      '<div class="sv" id="s2"><span class="n">2</span><div><h3>Enter the transaction details</h3><div class="g2"><div class="f"><label for="txid">Transaction ID</label><div class="inp"><span class="ic">' + ic('hash', 'sm') + '</span><input id="txid" placeholder="e.g. DBS2610150042" autocomplete="off"></div></div>' +
        '<div class="f"><label for="amt">Amount sent</label><div class="inp"><span style="color:var(--mut)">$</span><input id="amt" inputmode="decimal" placeholder="0.00"><span class="unit">USD</span></div></div></div><p class="help" style="margin-top:8px;color:var(--mut);font-size:12.5px;display:flex;gap:6px;align-items:center">' + ic('info', 'sm') + 'You’ll find these on your bank’s transfer confirmation.</p></div></div>' +
      '<div class="sv" id="s3"><span class="n">3</span><div><h3>Upload the transfer receipt</h3><div id="rcpt"></div></div></div>' +
      '</div></div><div class="m-foot"><span class="l" id="prog">0 of 3 complete</span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="subF" disabled>Submit for verification</button></div>');
    function upd() {
      var n = done(); $('#prog').textContent = n + ' of 3 complete'; $('#subF').disabled = n < 3;
      $('#s1').className = 'sv ' + (st.copied ? 'done' : 'on'); $('#s2').className = 'sv ' + (st.txid.length >= 6 && num(st.amt) > 0 ? 'done' : st.copied ? 'on' : '');
      $('#s3').className = 'sv ' + (st.file ? 'done' : '');
      $$('#layer .sv.done .n').forEach(function (e) { e.innerHTML = ic('check', 'sm'); });
      $$('#layer .sv:not(.done) .n').forEach(function (e, i) { e.textContent = e.parentNode.id.slice(1); });
    }
    function rc() {
      $('#rcpt').innerHTML = st.file ? '<div class="file"><span class="pdf">PDF</span><div class="m"><b>' + esc(st.file.name) + '</b><small>' + Math.max(1, Math.round(st.file.size / 1024)) + ' KB · ready to submit</small></div><button class="act" id="rmF" aria-label="Remove file">' + ic('x', 'sm') + '</button></div>'
        : '<label class="drop" id="drop"><span class="ic">' + ic('up') + '</span><span><b>Drop your receipt here, or <span>browse</span></b><small>PDF only · Comdex must be named as the beneficiary</small></span><input type="file" accept="application/pdf,.pdf" class="sr" id="fileIn"></label><p class="msg" id="fErr" style="color:var(--red);font-size:12.5px;margin-top:6px" hidden></p>';
      if (st.file) $('#rmF').onclick = function () { st.file = null; rc(); upd(); };
      else {
        var drop = $('#drop'), inp = $('#fileIn');
        function take(f) { if (!f) return; if (!/\.pdf$/i.test(f.name) && f.type !== 'application/pdf') { $('#fErr').hidden = false; $('#fErr').textContent = '“' + f.name + '” isn’t a PDF. Export the receipt as PDF and try again.'; return; } st.file = { name: f.name, size: f.size }; rc(); upd(); }
        inp.onchange = function () { take(inp.files[0]); };
        drop.ondragover = function (e) { e.preventDefault(); drop.classList.add('over'); }; drop.ondragleave = function () { drop.classList.remove('over'); };
        drop.ondrop = function (e) { e.preventDefault(); drop.classList.remove('over'); take(e.dataTransfer.files[0]); };
      }
    }
    rc();
    $$('#layer [data-cp]').forEach(function (b) { b.onclick = function () { copy(b.dataset.cp, b); st.copied = true; upd(); }; });
    $('#cpAll').onclick = function () { copy(bank.map(function (b) { return b[0] + ': ' + b[1]; }).join('\n') + '\nReference: ' + S.user.id); st.copied = true; this.innerHTML = ic('check', 'sm') + 'Copied'; upd(); };
    $('#txid').oninput = function () { st.txid = this.value.trim(); upd(); };
    $('#amt').oninput = function () { st.amt = this.value; upd(); };
    $('#amt').onblur = function () { var n = num(this.value); if (n) this.value = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
    $('#subF').onclick = function () {
      var id = 'TX-' + (90413 + S.txns.length), a = num(st.amt);
      S.txns.push({ id: id, type: 'Deposit', ref: st.txid.toUpperCase(), amount: a, st: 'Pending verification', at: Date.now() });
      job('deposit', { id: id }, 8000); save();
      $('#layer .modal').innerHTML = '<div class="m-body" style="text-align:center;padding:40px 32px"><span class="hic" style="width:56px;height:56px;border-radius:50%;background:var(--green-s);color:var(--green);display:grid;place-items:center;margin:0 auto 16px">' + ic('check') + '</span><h2 style="font-size:19px">Submitted for verification</h2><p style="color:var(--mut);margin:6px auto 20px;max-width:380px">We’ll match ' + money(a, 2) + ' to reference ' + S.user.id + ' and credit it as dUSD. You’ll get a notification when it lands.</p><button class="btn pri" data-a="close">Done</button></div>';
      render(true);
    };
    upd();
  }

  /* ---------- invite / help / command palette ---------- */
  function invite() {
    modal('<div class="m-head"><span class="hic">' + ic('uplus') + '</span><div class="t"><h2>Invite a trader</h2><p>They’ll join ABC Traders and appear under Pending approval until you approve them.</p></div><button class="x" data-a="close" aria-label="Close">' + ic('x') + '</button></div>' +
      '<form class="m-body" id="invF" novalidate><div class="g2"><div class="f"><label for="iN">Full name <span class="req">*</span></label><div class="inp"><input id="iN" autocomplete="off" autofocus></div></div><div class="f"><label for="iE">Work email <span class="req">*</span></label><div class="inp"><input id="iE" type="email" autocomplete="off" placeholder="name@abctraders.sg"></div></div></div><p class="msg" id="iErr" style="color:var(--red);font-size:12.5px;margin-top:8px" hidden></p></form>' +
      '<div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="iGo">' + ic('mail', 'sm') + 'Send invite</button></div>');
    function go(e) {
      if (e) e.preventDefault();
      var n = $('#iN').value.trim(), m = $('#iE').value.trim(), err = $('#iErr');
      if (!n || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)) { err.hidden = false; err.textContent = !n ? 'Enter the trader’s name.' : 'Enter a valid email address.'; (!n ? $('#iN') : $('#iE')).closest('.inp').classList.add('err'); return; }
      S.traders.push({ name: n, id: 'COM' + (12353 + S.traders.length), email: m, trades: 0, rec: 0, pay: 0, last: 0, st: 'pending' });
      S.team.unshift({ who: S.user.name, t: 'invited', obj: n, at: Date.now(), ic: 'mail' }); S.ui.tTab = 'pending'; save(); closeModal(); render();
      toast('Invite sent', n + ' will appear under Pending approval', { icon: 'mail', blue: true });
    }
    $('#iGo').onclick = go; $('#invF').onsubmit = go;
  }
  function help() {
    modal('<div class="m-head"><span class="hic">' + ic('chat') + '</span><div class="t"><h2>Help &amp; support</h2><p>Our trade desk replies within one business day. Urgent settlement issues are handled first.</p></div><button class="x" data-a="close" aria-label="Close">' + ic('x') + '</button></div>' +
      '<div class="m-body" style="display:grid;gap:14px"><div class="f"><label for="hT">Topic</label><div class="inp"><select id="hT"><option>A trade or settlement</option><option>Wallet and deposits</option><option>Verification (KYC)</option><option>Something else</option></select>' + ic('chevd', 'sm') + '</div></div><div class="f"><label for="hM">Message</label><textarea class="ta" id="hM" placeholder="Include the order ID if it’s about a trade"></textarea></div></div>' +
      '<div class="m-foot"><span class="l"></span><button class="btn sec" data-a="close">Cancel</button><button class="btn pri" id="hGo">Send message</button></div>');
    $('#hGo').onclick = function () { if (!$('#hM').value.trim()) { $('#hM').focus(); $('#hM').style.borderColor = 'var(--red)'; return; } closeModal(); toast('Message sent', 'We’ll reply by email within one business day', { icon: 'mail', blue: true }); };
  }
  function cmd() {
    var items = [
      { g: 'Actions', t: 'New sell order', s: 'List a commodity for trade', ic: 'plus', run: function () { location.hash = '#/order/new'; } },
      { g: 'Actions', t: 'Add funds', s: 'Bank transfer into your wallet', ic: 'wallet', run: addFunds },
      { g: 'Actions', t: 'Invite trader', s: 'Add a teammate to ABC Traders', ic: 'uplus', run: invite },
      { g: 'Actions', t: 'Continue onboarding', s: kycPct() + '% complete', ic: 'id', run: function () { location.hash = '#/onboarding'; } }
    ].concat(S.trades.map(function (t) { return { g: 'Trades', t: t.commodity + ' · ' + t.from.country + ' → ' + t.to.country, s: t.id.slice(0, 8) + ' · ' + money(total(t)), ic: 'swap', pill: ST[t.status], run: function () { location.hash = '#/trades/' + t.id; } }; }))
      .concat(S.traders.map(function (t) { return { g: 'Traders', t: t.name, s: t.id + ' · ' + t.email, ic: 'user', run: function () { location.hash = '#/dashboard'; } }; }))
      .concat([['Dashboard', 'grid'], ['Transactions', 'dollar'], ['Account', 'user'], ['Settings', 'gear']].map(function (p) { return { g: 'Go to', t: p[0], s: '', ic: p[1], run: function () { location.hash = '#/' + p[0].toLowerCase(); } }; }));
    var sel = 0, shown = items;
    modal('<div class="cmd-in">' + ic('search') + '<input id="cq" placeholder="Search trades, traders, actions…" autocomplete="off" autofocus aria-label="Search"><kbd>Esc</kbd></div><div class="cmd-list" id="cl" role="listbox"></div>', 'cmd', function (e) {
      if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
      if (e.key === 'Enter' && shown[sel]) { var it = shown[sel]; closeModal(); it.run(); }
    });
    function draw() {
      var q = $('#cq').value.toLowerCase().trim(), g = '';
      shown = items.filter(function (i) { return !q || (i.t + ' ' + i.s).toLowerCase().indexOf(q) > -1; });
      if (sel >= shown.length) sel = 0;
      $('#cl').innerHTML = shown.length ? shown.map(function (i, n) {
        var h = i.g !== g ? '<h4>' + i.g + '</h4>' : ''; g = i.g;
        return h + '<button role="option" aria-selected="' + (n === sel) + '" class="' + (n === sel ? 'on' : '') + '" data-n="' + n + '"><span class="ic">' + ic(i.ic, 'sm') + '</span><span><b>' + esc(i.t) + '</b>' + (i.s ? '<small>' + esc(i.s) + '</small>' : '') + '</span>' + (i.pill ? '<span class="pill ' + i.pill.c + '">' + i.pill.l + '</span>' : '') + '</button>';
      }).join('') : '<div class="empty"><b>No matches</b>Try a commodity, country, trader or order ID.</div>';
      var on = $('#cl .on'); if (on) on.scrollIntoView({ block: 'nearest' });
      $$('#cl button').forEach(function (b) { b.onclick = function () { var it = shown[+b.dataset.n]; closeModal(); it.run(); }; });
    }
    $('#cq').oninput = function () { sel = 0; draw(); }; draw();
  }

  /* ---------- new sell order ---------- */
  var orderForm = null, oStep = 1;
  var COMMODITIES = ['Copper cathodes', 'Aluminium ingots', 'Palm oil', 'Thermal coal', 'Iron ore fines', 'Urea', 'Soybeans'];
  var TERMS = [['CIF', 'Cost, insurance & freight'], ['CFR', 'Cost & freight'], ['FOB', 'Free on board'], ['DAP', 'Delivered at place']];
  var COUNTRIES = ['Singapore', 'Netherlands', 'Malaysia', 'Hong Kong', 'United Arab Emirates', 'India', 'China', 'Indonesia', 'Belgium', 'Chile'];
  function newForm(src) {
    if (src) return JSON.parse(JSON.stringify({ id: src.id, listing: src.listing, visibility: src.visibility, invite: src.invite || '', commodity: src.commodity, blName: src.blName, quality: src.quality, term: src.term, qty: String(src.qty), price: String(src.price), fromPort: src.from.port, fromC: src.from.country, toPort: src.to.port, toC: src.to.country, shipFrom: src.shipFrom, shipBy: src.shipBy, contract: src.contract, obl: src.obl || {}, invited: src.invited || [], agree: false }));
    return { id: null, listing: 'discovery', visibility: 'private', invite: '', invited: [], commodity: 'Copper cathodes', blName: 'Copper cathodes, Grade A', quality: '99.99% Cu', term: 'CIF', qty: '500', price: '8450', fromPort: 'Singapore', fromC: 'Singapore', toPort: 'Rotterdam', toC: 'Netherlands', shipFrom: '2026-11-20', shipBy: '2026-11-28', contract: 'C' + (46200 + S.trades.length) + uid(3).toUpperCase(), obl: {}, agree: false };
  }
  function renderOrder(id) {
    if (!orderForm) { var src = id && id !== 'new' ? trade(id) : null; if (id && id !== 'new' && (!src || src.status !== 'draft')) { location.hash = '#/trades'; return; } orderForm = newForm(src); oStep = 1; }
    var F = orderForm;
    var steps = ['Commodity details', 'OBL details', 'Confirm'];
    app.innerHTML = '<div class="flow"><header class="flow-top"><button class="back" data-a="oBack" aria-label="Back">' + ic('left') + '</button><div class="crumb"><small>Orders / New</small><b>New sell order</b></div>' +
      '<nav class="wiz" aria-label="Steps">' + steps.map(function (s, i) { var n = i + 1; return (i ? '<hr>' : '') + '<span class="' + (n === oStep ? 'on' : n < oStep ? 'done' : '') + '"' + (n === oStep ? ' aria-current="step"' : '') + '><i>' + (n < oStep ? ic('check') : n) + '</i><b>' + s + '</b></span>'; }).join('') + '</nav>' +
      '<button class="btn sec" data-a="oDraft">Save draft</button><button class="x" data-a="oClose" aria-label="Close">' + ic('x') + '</button></header>' +
      '<div class="flow-body"><div class="col" id="oMain">' + (oStep === 1 ? oStep1(F) : oStep === 2 ? oStep2(F) : oStep3(F)) + '</div><aside class="sum" id="oSum">' + oSummary(F) + '</aside></div></div>';
    bindOrder();
  }
  function fld(k, label, val, o) {
    o = o || {};
    var input = o.opts ? '<select id="f_' + k + '" data-f="' + k + '">' + o.opts.map(function (x) { var v = Array.isArray(x) ? x[0] : x, l = Array.isArray(x) ? x[0] + ' · ' + x[1] : x; return '<option value="' + esc(v) + '"' + (v === val ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm')
      : '<input id="f_' + k + '" data-f="' + k + '" value="' + esc(val || '') + '"' + (o.type ? ' type="' + o.type + '"' : '') + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.mode ? ' inputmode="' + o.mode + '"' : '') + (o.locked ? ' readonly' : '') + ' autocomplete="off">';
    return '<div class="f' + (o.cls ? ' ' + o.cls : '') + '"><label for="f_' + k + '">' + label + (o.req ? ' <span class="req">*</span>' : '') + '</label><div class="inp' + (o.locked ? ' locked' : '') + '">' + (o.pre || '') + input + (o.unit ? '<span class="unit">' + o.unit + '</span>' : '') + (o.locked ? ic('lock', 'sm') : '') + '</div>' + (o.help ? '<span class="help">' + o.help + '</span>' : '') + '<span class="msg" data-msg="' + k + '" hidden></span></div>';
  }
  function oStep1(F) {
    return '<section class="card sec"><div class="sec-h"><span class="hic">' + ic('hand') + '</span><div><h2>Listing type</h2><p>How do you want Comdex to handle this trade? This can’t be changed after you publish.</p></div></div>' +
      '<div class="lt" role="radiogroup" aria-label="Listing type">' +
        '<button role="radio" aria-checked="' + (F.listing === 'settlement') + '" data-a="oSet" data-k="listing" data-v="settlement" class="' + (F.listing === 'settlement' ? 'on' : '') + '"><span class="ic">' + ic('shield') + '</span><span><b>Trade settlement</b><small>Comdex handles all verifications related to the trade.</small></span><span class="rd"></span></button>' +
        '<button role="radio" aria-checked="' + (F.listing === 'discovery') + '" data-a="oSet" data-k="listing" data-v="discovery" class="' + (F.listing === 'discovery' ? 'on' : '') + '"><span class="ic">' + ic('globe') + '</span><span><b>Trade discovery</b><small>Both parties handle verifications themselves. Faster to list.</small></span><span class="rd"></span></button></div>' +
      '<div class="vis-row"><div class="f"><span class="lab" id="visL">Visibility</span><div class="seg lg" role="radiogroup" aria-labelledby="visL"><button role="radio" aria-checked="' + (F.visibility === 'private') + '" data-a="oSet" data-k="visibility" data-v="private" class="' + (F.visibility === 'private' ? 'on' : '') + '">' + ic('lock', 'sm') + 'Private</button><button role="radio" aria-checked="' + (F.visibility === 'public') + '" data-a="oSet" data-k="visibility" data-v="public" class="' + (F.visibility === 'public' ? 'on' : '') + '">' + ic('globe', 'sm') + 'Public</button></div></div>' +
      (F.visibility === 'private' ? '<div class="f"><label for="f_invite">Invite counterparty</label><div style="display:flex;gap:10px"><div class="inp" style="flex:1"><span class="ic">' + ic('mail', 'sm') + '</span><input id="f_invite" data-f="invite" type="email" value="' + esc(F.invite) + '" placeholder="buyer@company.com" autocomplete="off"></div><button class="btn sec" data-a="oInvite" style="height:46px;color:var(--blue);border-color:#bcd0f8">Send invite</button></div><span class="msg" data-msg="invite" hidden></span></div>'
        : '<p style="color:var(--mut);align-self:center">Every verified trader on Comdex can see and respond to this order.</p>') + '</div>' +
      (F.invited.length ? '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">' + F.invited.map(function (m, i) { return '<span class="pill b" style="height:30px">' + esc(m) + '<button data-a="oUninvite" data-i="' + i + '" aria-label="Remove ' + esc(m) + '" style="display:grid;color:inherit">' + ic('x', 'sm') + '</button></span>'; }).join('') + '</div>' : '') + '</section>' +
      '<section class="card sec"><div class="sec-h"><span class="hic">' + ic('box') + '</span><div><h2>Commodity details</h2><p>As listed on the bill of lading.</p></div></div><div class="g3">' +
        fld('contract', 'Contract ID', F.contract, { locked: true }) + fld('commodity', 'Commodity', F.commodity, { req: true, opts: COMMODITIES }) + fld('blName', 'Name on bill of lading', F.blName, { req: true }) +
        fld('quality', 'Quality', F.quality, { req: true, ph: 'e.g. 99.99% Cu' }) + fld('term', 'Delivery term', F.term, { req: true, opts: TERMS }) + fld('qty', 'Quantity', F.qty, { req: true, unit: 'MT', mode: 'decimal', ph: '0' }) + '</div></section>' +
      '<section class="card sec"><div class="sec-h"><span class="hic">' + ic('ship') + '</span><div><h2>Shipment details</h2><p>Route, dates and price for this shipment.</p></div></div>' +
        '<div class="port"><div class="pb"><h4>PORT OF LOADING</h4><div class="g2">' + fld('fromPort', 'Port', F.fromPort, { req: true }) + fld('fromC', 'Country', F.fromC, { req: true, opts: COUNTRIES }) + '</div></div><div class="mid" aria-hidden="true"><span>' + ic('ship') + '</span>' + ic('right', 'sm') + '</div>' +
        '<div class="pb"><h4>PORT OF DISCHARGE</h4><div class="g2">' + fld('toPort', 'Port', F.toPort, { req: true }) + fld('toC', 'Country', F.toC, { req: true, opts: COUNTRIES }) + '</div></div></div>' +
        '<div class="g3" style="margin-top:20px">' + fld('shipFrom', 'Shipping date', F.shipFrom, { req: true, type: 'date' }) + fld('shipBy', 'Ship by', F.shipBy, { req: true, type: 'date' }) + fld('price', 'Price per metric ton', F.price, { req: true, pre: '<span style="color:var(--mut)">$</span>', unit: 'USD', mode: 'decimal', ph: '0.00' }) + '</div></section>';
  }
  function oStep2(F) {
    var o = F.obl;
    return '<section class="card sec"><div class="sec-h"><span class="hic">' + ic('doc') + '</span><div><h2>Original bill of lading</h2><p>The OBL is the title document. Comdex records it on-chain so ownership moves with the trade.</p></div></div>' +
      '<div class="g2">' + fld('obl.no', 'OBL number', o.no, { req: true, ph: 'e.g. SGSIN2611208' }) + fld('obl.carrier', 'Carrier', o.carrier, { req: true, ph: 'e.g. Maersk' }) + fld('obl.vessel', 'Vessel name', o.vessel, { req: true, ph: 'e.g. Maersk Kensington' }) + fld('obl.issued', 'Date of issue', o.issued, { req: true, type: 'date' }) + '</div>' +
      '<div class="f" style="margin-top:20px"><span class="lab">Upload OBL <span style="color:var(--red)">*</span></span>' + (o.file ? '<div class="file"><span class="pdf">PDF</span><div class="m"><b>' + esc(o.file) + '</b><small>' + (o.size || 240) + ' KB · uploaded</small></div><button class="act" data-a="oRmFile" aria-label="Remove file">' + ic('x', 'sm') + '</button></div>'
        : '<label class="drop" id="oDrop"><span class="ic">' + ic('up') + '</span><span><b>Drop the scanned OBL here, or <span>browse</span></b><small>PDF only · all pages, including endorsements</small></span><input type="file" accept="application/pdf,.pdf" class="sr" id="oFile"></label>') + '<span class="msg" data-msg="obl.file" hidden></span></div></section>' +
      '<section class="card sec"><div class="note">' + ic('info', 'sm') + '<span>' + (F.listing === 'settlement' ? 'You chose <b>Trade settlement</b>: Comdex checks this OBL against the carrier before your order goes live.' : 'You chose <b>Trade discovery</b>: buyers verify this OBL themselves, so make sure the scan is complete and legible.') + '</span></div></section>';
  }
  function oStep3(F) {
    var tot = num(F.qty) * num(F.price);
    return '<section class="card sec"><div class="sec-h"><span class="hic">' + ic('checks') + '</span><div><h2>Review and publish</h2><p>Check everything against your documents. Buyers see exactly this.</p></div></div><div class="review">' +
      '<div><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>Listing</b><button class="link" data-a="oGo" data-v="1">Edit</button></div>' + kvl([['Listing type', F.listing === 'settlement' ? 'Trade settlement · Comdex verifies' : 'Trade discovery · parties verify'], ['Visibility', F.visibility === 'public' ? 'Public' : 'Private' + (F.invited.length ? ' · ' + F.invited.join(', ') : ' · no invites yet')]]) + '</div>' +
      '<div><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>Commodity &amp; shipment</b><button class="link" data-a="oGo" data-v="1">Edit</button></div>' + kvl([['Commodity', F.commodity + ' · ' + F.blName], ['Quality', F.quality], ['Quantity', num(F.qty).toLocaleString() + ' MT'], ['Delivery term', F.term], ['Route', F.fromPort + ', ' + F.fromC + ' → ' + F.toPort + ', ' + F.toC], ['Shipment window', F.shipFrom && F.shipBy ? dFmt(F.shipFrom) + ' – ' + dFmt(F.shipBy) : ''], ['Price', money(num(F.price), 2) + ' / MT']]) + '</div>' +
      '<div><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>Bill of lading</b><button class="link" data-a="oGo" data-v="2">Edit</button></div>' + kvl([['OBL number', F.obl.no], ['Carrier · vessel', (F.obl.carrier || '') + ' · ' + (F.obl.vessel || '')], ['Date of issue', F.obl.issued ? dFmt(F.obl.issued) : ''], ['File', F.obl.file]]) + '</div>' +
      '<label class="chk"><input type="checkbox" data-f="agree"' + (F.agree ? ' checked' : '') + '><span>I confirm these details match the original bill of lading and that ' + esc(S.org) + ' holds title to this cargo worth <b class="num">' + money(tot, 2) + '</b>.</span></label><span class="msg" data-msg="agree" style="color:var(--red);font-size:12.5px" hidden></span></div></section>';
  }
  function oSummary(F) {
    var q = num(F.qty), p = num(F.price), tot = q * p;
    function r(l, v) { return '<div class="sum-row"><span>' + l + '</span><b class="' + (v ? '' : 'ph') + '">' + (v ? esc(v) : '—') + '</b></div>'; }
    var cta = ['Continue to OBL details', 'Continue to confirm', F.listing === 'settlement' ? 'Submit for verification' : 'Publish order'][oStep - 1];
    var next = [[2, 'OBL details', 'Upload the original bill of lading'], [3, 'Confirm', 'Review and publish your order']].filter(function (n) { return n[0] > oStep; });
    return '<section class="card sum-card"><h3>Order summary <span class="draft">Draft</span></h3>' +
      r('Listing', (F.listing === 'settlement' ? 'Trade settlement' : 'Trade discovery') + ' · ' + (F.visibility === 'public' ? 'Public' : 'Private')) + r('Commodity', F.commodity) + r('Quality', F.quality) + r('Quantity', q ? q.toLocaleString() + ' MT' : '') + r('Delivery term', F.term) +
      r('Route', F.fromPort && F.toPort ? F.fromPort + ' → ' + F.toPort : '') + r('Shipment window', F.shipFrom && F.shipBy ? shortRange(F.shipFrom, F.shipBy) : '') + r('Price', p ? money(p, 2) + ' / MT' : '') +
      '<div class="sum-tot"><small>Total shipment value</small><strong class="num">' + money(tot, 2) + '<span>USD</span></strong><em class="num">' + (q ? q.toLocaleString() : 0) + ' MT × ' + money(p, 2) + '</em></div>' +
      '<button class="btn pri block" data-a="oNext">' + cta + (oStep < 3 ? ic('right', 'sm') : '') + '</button><p class="hint">' + ic('info', 'sm') + (oStep < 3 ? 'You can review everything before confirming.' : F.listing === 'settlement' ? 'Comdex verifies before it goes live.' : 'Goes live immediately.') + '</p></section>' +
      (next.length ? '<section class="card sum-card"><h3 style="font-size:15px;color:var(--mut);font-weight:500">Up next</h3><div class="next-list">' + next.map(function (n) { return '<div><i>' + n[0] + '</i><span><b>' + n[1] + '</b><small>' + n[2] + '</small></span></div>'; }).join('') + '</div></section>' : '');
  }
  function shortRange(a, b) { var x = new Date(a), y = new Date(b); return x.getMonth() === y.getMonth() ? x.getDate() + ' – ' + y.getDate() + ' ' + MON[y.getMonth()] + ' ' + y.getFullYear() : dFmt(a) + ' – ' + dFmt(b); }
  function setF(k, v) { var F = orderForm; if (k.indexOf('obl.') === 0) F.obl[k.slice(4)] = v; else F[k] = v; }
  function getF(k) { var F = orderForm; return k.indexOf('obl.') === 0 ? F.obl[k.slice(4)] : F[k]; }
  function bindOrder() {
    $$('#oMain [data-f]').forEach(function (el) {
      var ev = el.tagName === 'SELECT' || el.type === 'checkbox' || el.type === 'date' ? 'change' : 'input';
      el.addEventListener(ev, function () {
        var k = el.dataset.f, v = el.type === 'checkbox' ? el.checked : el.value;
        if ((k === 'qty' || k === 'price') && v) v = v.replace(/[^0-9.]/g, '');
        setF(k, v);
        if (k === 'commodity') { var defs = { 'Copper cathodes': ['Copper cathodes, Grade A', '99.99% Cu'], 'Aluminium ingots': ['Primary aluminium ingots P1020A', '99.7% Al'], 'Palm oil': ['RBD palm olein, CP10', 'IV 56 min'], 'Thermal coal': ['Steam coal, GAR 5500', 'GAR 5,500 kcal/kg'], 'Iron ore fines': ['Iron ore fines, 62% Fe', '62% Fe'], Urea: ['Granular urea, 46% N', '46% N min'], Soybeans: ['Soybeans, US No. 2 yellow', 'Moisture 13% max'] }[v]; if (defs) { orderForm.blName = defs[0]; orderForm.quality = defs[1]; $('#f_blName').value = defs[0]; $('#f_quality').value = defs[1]; } }
        clearErr(k); $('#oSum').innerHTML = oSummary(orderForm);
      });
    });
    var fileIn = $('#oFile'), drop = $('#oDrop');
    if (fileIn) {
      function take(f) { if (!f) return; if (!/\.pdf$/i.test(f.name)) { showErr('obl.file', 'Upload the OBL as a PDF.'); return; } orderForm.obl.file = f.name; orderForm.obl.size = Math.max(1, Math.round(f.size / 1024)); renderOrder(); }
      fileIn.onchange = function () { take(fileIn.files[0]); };
      drop.ondragover = function (e) { e.preventDefault(); drop.classList.add('over'); }; drop.ondragleave = function () { drop.classList.remove('over'); };
      drop.ondrop = function (e) { e.preventDefault(); drop.classList.remove('over'); take(e.dataTransfer.files[0]); };
    }
  }
  function showErr(k, m) { var el = $('[data-msg="' + k + '"]'); if (el) { el.hidden = false; el.textContent = m; } var i = $('[data-f="' + k + '"]'); if (i && i.closest('.inp')) { i.closest('.inp').classList.add('err'); i.setAttribute('aria-invalid', 'true'); } }
  function clearErr(k) { var el = $('[data-msg="' + k + '"]'); if (el) el.hidden = true; var i = $('[data-f="' + k + '"]'); if (i && i.closest('.inp')) { i.closest('.inp').classList.remove('err'); i.removeAttribute('aria-invalid'); } }
  function validate(step) {
    var F = orderForm, errs = [];
    function need(k, m) { var v = getF(k); if (!v || !String(v).trim()) errs.push([k, m]); }
    if (step === 1) {
      need('blName', 'Enter the name exactly as on the bill of lading.'); need('quality', 'Enter the grade or quality.'); need('fromPort', 'Enter the port of loading.'); need('toPort', 'Enter the port of discharge.');
      if (!(num(F.qty) > 0)) errs.push(['qty', 'Enter a quantity above 0.']);
      if (!(num(F.price) > 0)) errs.push(['price', 'Enter a price per metric ton.']);
      if (!F.shipFrom) errs.push(['shipFrom', 'Pick the shipping date.']);
      if (!F.shipBy) errs.push(['shipBy', 'Pick the latest ship-by date.']);
      else if (F.shipFrom && F.shipBy < F.shipFrom) errs.push(['shipBy', 'Ship-by must be on or after the shipping date.']);
      if (F.fromPort && F.toPort && F.fromPort.trim().toLowerCase() === F.toPort.trim().toLowerCase()) errs.push(['toPort', 'Discharge port must differ from the loading port.']);
    }
    if (step === 2) { need('obl.no', 'Enter the OBL number.'); need('obl.carrier', 'Enter the carrier.'); need('obl.vessel', 'Enter the vessel name.'); need('obl.issued', 'Pick the date of issue.'); if (!F.obl.file) errs.push(['obl.file', 'Upload the scanned OBL to continue.']); }
    if (step === 3 && !F.agree) errs.push(['agree', 'Confirm the details to publish.']);
    errs.forEach(function (e) { showErr(e[0], e[1]); });
    if (errs.length) { var first = $('[data-f="' + errs[0][0] + '"]') || $('[data-msg="' + errs[0][0] + '"]'); if (first) { first.scrollIntoView({ block: 'center', behavior: 'smooth' }); if (first.focus) first.focus({ preventScroll: true }); } }
    return !errs.length;
  }
  function saveOrder(status) {
    var F = orderForm, t = F.id ? trade(F.id) : null, isNew = !t;
    if (!t) { t = { id: uid(20), created: Date.now(), act: [], docs: [], offers: [] }; S.trades.unshift(t); }
    Object.assign(t, { status: status, listing: F.listing, visibility: F.visibility, invite: F.invite, invited: F.invited, commodity: F.commodity, blName: F.blName, quality: F.quality, term: F.term, qty: num(F.qty), price: num(F.price), from: { port: F.fromPort, country: F.fromC }, to: { port: F.toPort, country: F.toC }, shipFrom: F.shipFrom, shipBy: F.shipBy, contract: F.contract, obl: F.obl });
    if (F.invited.length) t.buyer = { name: '', email: F.invited[0] };
    if (status === 'draft') t.act.push({ at: Date.now(), ic: 'pen', t: isNew ? 'Draft saved' : 'Draft updated', sub: 'Not visible to buyers yet.' });
    else {
      t.created = Date.now();
      t.act.push({ at: Date.now(), ic: 'doc', t: 'You placed the order', sub: t.commodity + ' · ' + t.qty.toLocaleString() + ' MT · ' + t.term + ' ' + (t.term === 'FOB' ? t.from.port : t.to.port) });
      t.docs = [{ name: 'Contract_v1.pdf', sub: 'Your active offer' }].concat(F.obl.file ? [{ name: F.obl.file, sub: 'Original bill of lading' }] : []);
      if (status === 'listed') { t.act.push({ at: Date.now() + 1, ic: 'globe', t: 'Order listed for trade', sub: t.visibility === 'public' ? 'Public listing, open to all verified traders' : 'Private listing' + (F.invited.length ? ', invite sent to ' + F.invited.join(', ') : '') }); job('counter', { id: t.id }, 10000); }
      else job('verified', { id: t.id }, 7000);
      S.team.unshift({ who: S.user.name, t: 'listed', obj: t.commodity, at: Date.now(), ic: 'doc' });
    }
    save(); return t;
  }

  /* ---------- onboarding ---------- */
  var ZONES = { SG: ['SG', 'Singapore', 'SGD'], AE: ['AE', 'Dubai', 'AED'], HK: ['HK', 'Hong Kong', 'HKD'], MY: ['MY', 'Malaysia', 'MYR'] };
  var OB = [
    { t: 'Verify OTP', s: 'Phone verified', ic: 'key' }, { t: 'Create admin password', s: 'Password set', ic: 'lock' },
    { t: 'Organization profile', s: 'Name, address, owners', ic: 'bld' }, { t: 'Organization KYC', s: 'Registration documents', ic: 'doc' },
    { t: 'Bank account details', s: 'For withdrawals', ic: 'bank' }, { t: 'Admin profile & KYC', s: 'Your identity', ic: 'id' },
    { t: 'Blockchain account', s: 'Your Comdex ID', ic: 'key' }, { t: 'Service agreement', s: 'Sign the terms', ic: 'sign' }, { t: 'Final review', s: 'Submit for approval', ic: 'checks' }
  ];
  var ownerEdit = -1, ownerAdd = false;
  function obField(k, label, o) { o = o || {}; var v = S.kyc.d[k] || ''; return '<div class="f"><label for="k_' + k + '">' + label + (o.req ? ' <span class="req">*</span>' : '') + '</label><div class="inp">' + (o.pre ? '<span class="ic">' + ic(o.pre, 'sm') + '</span>' : '') + (o.opts ? '<select id="k_' + k + '" data-k="' + k + '">' + o.opts.map(function (x) { return '<option' + (x === v ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' + ic('chevd', 'sm') : '<input id="k_' + k + '" data-k="' + k + '" value="' + esc(v) + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.type ? ' type="' + o.type + '"' : '') + (o.max ? ' maxlength="' + o.max + '"' : '') + ' autocomplete="off">' + (o.max ? '<span style="color:var(--dim);font-size:13px" data-count="' + k + '">' + v.length + '/' + o.max + '</span>' : '')) + '</div>' + (o.help ? '<span class="help">' + o.help + '</span>' : '') + '<span class="msg" data-kmsg="' + k + '" hidden></span></div>'; }
  function obUpload(k, label, sub) { var f = S.kyc.files[k]; return '<div class="f"><span class="lab">' + label + ' <span style="color:var(--red)">*</span></span>' + (f ? '<div class="file"><span class="pdf">PDF</span><div class="m"><b>' + esc(f) + '</b><small>Uploaded · ' + sub + '</small></div><button class="act" data-a="kRm" data-k="' + k + '" aria-label="Remove ' + esc(f) + '">' + ic('x', 'sm') + '</button></div>' : '<label class="drop"><span class="ic">' + ic('up') + '</span><span><b>Upload ' + label.toLowerCase() + ', or <span>browse</span></b><small>' + sub + '</small></span><input type="file" class="sr" accept=".pdf,.png,.jpg,.jpeg" data-kf="' + k + '"></label>') + '<span class="msg" data-kmsg="file_' + k + '" hidden></span></div>'; }
  function obBody(n) {
    var k = S.kyc;
    if (n === 3) {
      var tot = k.owners.reduce(function (a, o) { return a + (+o.pct || 0); }, 0);
      return '<div class="ob-row"><div><b>Registration zone</b><p>Where your organization is legally registered. This sets your currency and compliance rules.</p></div><div class="zones" role="radiogroup" aria-label="Registration zone">' + Object.keys(ZONES).map(function (z) { var Z = ZONES[z]; return '<button role="radio" aria-checked="' + (k.d.zone === z) + '" data-a="kZone" data-v="' + z + '" class="' + (k.d.zone === z ? 'on' : '') + '"><span class="cc">' + Z[0] + '</span><span class="rd"></span><b>' + Z[1] + '</b><small>' + Z[2] + '</small></button>'; }).join('') + '</div></div>' +
        '<div class="ob-row"><div><b>Organization details</b><p>Use the legal details exactly as shown on your registration documents.</p></div><div style="display:grid;gap:16px"><div style="display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:16px">' + obField('legal', 'Legal name', { req: true, help: 'As on your certificate of incorporation' }) + obField('short', 'Short name', { req: true, max: 10, help: 'Shown on trade documents' }) + '</div>' +
        obField('address', 'Registered address', { req: true, pre: 'pin', ph: 'Street, building, unit number' }) + '<div class="g2">' + obField('postal', 'Postal code', { req: true, ph: 'e.g. 018956' }) + obField('inc', 'Date of incorporation', { req: true, type: 'date' }) + '</div></div></div>' +
        '<div class="ob-row"><div><b>Beneficial owners</b><p>Individuals who ultimately own or control the organization. Ownership must add up to 100%.</p></div><div class="owners"><div class="tbl-wrap"><table><thead><tr><th>Name</th><th>Nationality</th><th>Role</th><th>Ownership</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' +
        k.owners.map(function (o, i) {
          if (i === ownerEdit) return '<tr><td colspan="5" style="padding:0">' + ownerForm(o) + '</td></tr>';
          return '<tr><td><div class="who">' + av(o.name, 32) + '<b>' + esc(o.name) + '</b></div></td><td>' + esc(o.nat) + '</td><td>' + esc(o.role) + '</td><td><span class="own-bar"><i style="width:' + o.pct + '%"></i></span><b class="num">' + o.pct + '%</b></td><td><div class="acts"><button data-a="oEdit" data-i="' + i + '" aria-label="Edit ' + esc(o.name) + '">' + ic('pen', 'sm') + '</button><button data-a="oDel" data-i="' + i + '" aria-label="Remove ' + esc(o.name) + '">' + ic('trash', 'sm') + '</button></div></td></tr>';
        }).join('') + '</tbody></table></div>' + (ownerAdd ? ownerForm({ name: '', nat: '', role: 'Shareholder', pct: Math.max(0, 100 - tot) }) : '') +
        '<div class="own-foot">' + (ownerAdd || ownerEdit > -1 ? '<span></span>' : '<button class="link" data-a="oAdd">' + ic('plus', 'sm') + 'Add another owner</button>') + '<span class="alloc ' + (tot === 100 ? 'ok' : 'bad') + '">' + (tot === 100 ? ic('check', 'sm') + '100% allocated' : tot + '% allocated · ' + (tot < 100 ? (100 - tot) + '% left' : (tot - 100) + '% over')) + '</span></div><span class="msg" data-kmsg="owners" style="color:var(--red);font-size:12.5px;padding:0 16px 12px;display:block" hidden></span></div></div>';
    }
    if (n === 4) return '<div class="ob-row"><div><b>Registration documents</b><p>Clear scans or exports. We check them against ' + ZONES[k.d.zone][1] + ' registry records.</p></div><div style="display:grid;gap:16px">' + obUpload('coi', 'Certificate of incorporation', 'PDF, PNG or JPG') + obUpload('moa', 'Memorandum & articles', 'Latest version, PDF') + obUpload('poa', 'Proof of address', 'Utility bill or bank letter, last 3 months') + '</div></div>';
    if (n === 5) return '<div class="ob-row"><div><b>Withdrawal account</b><p>Settlements in dUSD can be withdrawn to this account. It must be in the organization’s name.</p></div><div style="display:grid;gap:16px">' + obField('bank', 'Bank name', { req: true, ph: 'e.g. DBS Bank Ltd.' }) + obField('holder', 'Account holder', { req: true, ph: k.d.legal }) + '<div class="g2">' + obField('acct', 'Account number', { req: true, ph: '0000000000' }) + obField('swift', 'SWIFT / BIC', { req: true, ph: 'e.g. DBSSSGSG' }) + '</div>' + obField('bccy', 'Account currency', { req: true, opts: ['USD', ZONES[k.d.zone][2]] }) + '</div></div>';
    if (n === 6) return '<div class="ob-row"><div><b>About you</b><p>You’re the admin for ' + esc(k.d.short || 'your organization') + '. We verify your identity once.</p></div><div style="display:grid;gap:16px"><div class="g2">' + obField('aname', 'Full name', { req: true, ph: 'As on your passport' }) + obField('anat', 'Nationality', { req: true, ph: 'e.g. Singaporean' }) + '</div>' + obField('arole', 'Role in organization', { req: true, opts: ['Director', 'Chief Financial Officer', 'Head of Trading', 'Compliance Officer'] }) + obUpload('passport', 'Passport', 'Photo page, PDF or image') + '</div></div>';
    if (n === 7) return '<div class="ob-row"><div><b>Comdex ID</b><p>Your organization’s blockchain account. It signs title transfers and records every settlement.</p></div><div style="display:grid;gap:14px">' + (k.chain ? '<div class="addr">' + ic('key', 'sm') + '<span style="flex:1">' + k.chain + '</span><button class="cp" data-a="copy" data-v="' + k.chain + '" aria-label="Copy address">' + ic('copy', 'sm') + '</button></div><div class="note">' + ic('shield', 'sm') + '<span>Keys are held in Comdex custody and require two-factor confirmation for every transfer.</span></div>' : '<div class="note a">' + ic('info', 'sm') + '<span>Creating the account is free and takes a few seconds. You only do this once.</span></div><div><button class="btn pri" data-a="kChain">' + ic('key', 'sm') + 'Create blockchain account</button></div>') + '<span class="msg" data-kmsg="chain" style="color:var(--red);font-size:12.5px" hidden></span></div></div>';
    if (n === 8) return '<div class="ob-row"><div><b>Comdex service agreement</b><p>Read and sign on behalf of ' + esc(k.d.legal || 'your organization') + '.</p></div><div style="display:grid;gap:16px"><div class="terms" tabindex="0"><h4>1. Scope</h4><p>Comdex provides a platform for discovery, negotiation and settlement of physical commodity trades between verified members.</p><h4>2. Escrow</h4><p>Buyer funds are held in escrow as dUSD and released to the seller only after the seller confirms payment and title transfer.</p><h4>3. Documents</h4><p>Members are responsible for the accuracy of bills of lading, contracts and certificates they upload. Under Trade settlement, Comdex performs additional verification.</p><h4>4. Fees</h4><p>An escrow fee of 0.1% of shipment value applies to each completed settlement.</p><h4>5. Governing law</h4><p>This agreement is governed by the laws of the member’s registration zone.</p></div>' +
      '<label class="chk"><input type="checkbox" data-k="agree"' + (k.d.agree ? ' checked' : '') + '><span>I have authority to sign for ' + esc(k.d.legal || 'this organization') + ' and agree to the service agreement.</span></label><span class="msg" data-kmsg="agree" style="color:var(--red);font-size:12.5px" hidden></span>' + obField('signer', 'Type your full name to sign', { req: true, ph: k.d.aname || 'Full name' }) + '</div></div>';
    if (n === 9) return '<div class="ob-row" style="grid-template-columns:1fr"><div class="rv">' + OB.slice(0, 8).map(function (s, i) { var d = k.done[i + 1]; return '<div class="rv-i"><span class="' + (d ? 'ok' : 'no') + '">' + ic(d ? 'check' : 'alert', 'sm') + '</span><div class="m"><b>' + s.t + '</b><small>' + (d ? 'Complete' : 'Needs attention') + '</small></div>' + (i > 1 ? '<button class="link" data-a="kGo" data-v="' + (i + 1) + '">' + (d ? 'Edit' : 'Finish') + '</button>' : '') + '</div>'; }).join('') + '</div>' +
      (k.status === 'review' ? '<div class="note" style="margin-top:16px">' + ic('info', 'sm') + '<span>Submitted ' + ago(k.submittedAt) + '. Our onboarding team is reviewing it.</span></div>' : k.status === 'verified' ? '<div class="note" style="margin-top:16px;background:var(--green-s);color:var(--green)">' + ic('check', 'sm') + '<span>Verified. You’re ready to trade.</span></div>' : '') + '</div>';
    return '';
  }
  function ownerForm(o) {
    return '<div class="own-form" id="ownF"><div class="f"><label for="ow_n">Name</label><div class="inp"><input id="ow_n" value="' + esc(o.name) + '" autofocus></div></div><div class="f"><label for="ow_a">Nationality</label><div class="inp"><input id="ow_a" value="' + esc(o.nat) + '"></div></div>' +
      '<div class="f"><label for="ow_r">Role</label><div class="inp"><select id="ow_r">' + ['Director', 'Shareholder', 'Director & shareholder'].map(function (r) { return '<option' + (r === o.role ? ' selected' : '') + '>' + r + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="f"><label for="ow_p">Ownership</label><div class="inp"><input id="ow_p" inputmode="numeric" value="' + o.pct + '"><span style="color:var(--mut)">%</span></div></div><div style="display:flex;gap:6px"><button class="btn pri small" data-a="oSave">Save</button><button class="btn sec small" data-a="oCancel">Cancel</button></div></div>';
  }
  function obValid(n, show) {
    var k = S.kyc, errs = [];
    function need(f, m) { if (!k.d[f] || !String(k.d[f]).trim()) errs.push([f, m]); }
    if (n === 3) { need('legal', 'Enter the legal name.'); need('short', 'Enter a short name.'); need('address', 'Enter the registered address.'); need('postal', 'Enter the postal code.'); need('inc', 'Pick the date of incorporation.'); var tot = k.owners.reduce(function (a, o) { return a + (+o.pct || 0); }, 0); if (tot !== 100) errs.push(['owners', 'Ownership must add up to 100% (currently ' + tot + '%).']); }
    if (n === 4) ['coi', 'moa', 'poa'].forEach(function (f) { if (!k.files[f]) errs.push(['file_' + f, 'Upload this document.']); });
    if (n === 5) { need('bank', 'Enter the bank name.'); need('holder', 'Enter the account holder.'); need('acct', 'Enter the account number.'); need('swift', 'Enter the SWIFT code.'); if (k.d.swift && !/^[A-Za-z0-9]{8}([A-Za-z0-9]{3})?$/.test(k.d.swift.trim())) errs.push(['swift', 'SWIFT codes are 8 or 11 letters and numbers.']); }
    if (n === 6) { need('aname', 'Enter your full name.'); need('anat', 'Enter your nationality.'); if (!k.files.passport) errs.push(['file_passport', 'Upload your passport photo page.']); }
    if (n === 7 && !k.chain) errs.push(['chain', 'Create the account to continue.']);
    if (n === 8) { if (!k.d.agree) errs.push(['agree', 'Agree to the service agreement to continue.']); need('signer', 'Type your name to sign.'); }
    if (n === 9) for (var i = 3; i <= 8; i++) if (!k.done[i]) errs.push(['x', 'Finish step ' + i + ' first.']);
    if (show) {
      errs.forEach(function (e) { var m = $('[data-kmsg="' + e[0] + '"]'); if (m) { m.hidden = false; m.textContent = e[1]; } var i = $('[data-k="' + e[0] + '"]'); if (i && i.closest('.inp')) i.closest('.inp').classList.add('err'); });
      if (errs.length) { var f = $('[data-k="' + errs[0][0] + '"]') || $('[data-kmsg="' + errs[0][0] + '"]'); if (f) { f.scrollIntoView({ block: 'center', behavior: 'smooth' }); if (f.focus) f.focus({ preventScroll: true }); } if (n === 9) toast('A few steps still need you', errs.map(function (e) { return e[1]; }).join(' '), { icon: 'alert', blue: true }); }
    }
    return !errs.length;
  }
  function renderOnboarding() {
    var k = S.kyc, n = k.cur, p = kycPct(), left = OB.length - Object.keys(k.done).length, s = OB[n - 1];
    var locked = k.status !== 'progress';
    app.innerHTML = '<div class="flow"><header class="flow-top"><a class="logo" href="#/dashboard" style="padding:0" aria-label="Comdex home">' + LOGO + 'COMDEX</a><span style="width:1px;height:28px;background:var(--line)"></span><b style="font-weight:500">Trader onboarding</b>' +
      '<span style="margin-left:auto"></span><button class="btn sec" data-a="help" style="border:0">' + ic('help', 'sm') + 'Help</button><a class="btn sec" href="#/account">Save &amp; exit</a></header>' +
      '<div class="ob"><aside class="card ob-side"><div class="ob-prog"><small>Setup progress</small><div class="row"><strong>' + p + '% complete</strong><span>' + (left ? '~' + left * 2 + ' min left' : k.status === 'verified' ? 'Verified' : 'Ready') + '</span></div></div>' +
      '<div class="segbar" aria-hidden="true">' + OB.map(function (x, i) { return '<i class="' + (k.done[i + 1] ? 'd' : i + 1 === n ? 'c' : '') + '"></i>'; }).join('') + '</div>' +
      '<nav class="ob-steps" aria-label="Onboarding steps">' + OB.map(function (x, i) {
        var id = i + 1, d = k.done[id], on = id === n, reach = id <= 2 ? false : (d || id === n || k.done[id - 1]);
        return '<button class="' + (d ? 'd ' : '') + (on ? 'on' : '') + '" data-a="kGo" data-v="' + id + '"' + (reach ? '' : ' disabled') + (on ? ' aria-current="step"' : '') + '><i>' + (d ? ic('check') : id) + '</i><span><b>' + x.t + '</b>' + (d || on ? '<small>' + x.s + '</small>' : '') + '</span>' + (d ? '<em>Done</em>' : '') + '</button>';
      }).join('') + '</nav>' +
      '<div class="ob-help"><span class="ic">' + ic('chat', 'sm') + '</span><div><b>Questions about KYC?</b><a href="#" data-a="help">Talk to our onboarding team</a></div></div></aside>' +
      '<section class="card ob-main"><div class="ob-head"><span class="hic">' + ic(s.ic) + '</span><div><small>STEP ' + n + ' OF 9</small><h2>' + s.t + '</h2></div><span class="req">* Required</span></div>' +
      '<div class="ob-body"' + (locked && n !== 9 ? ' style="pointer-events:none;opacity:.6"' : '') + '>' + obBody(n) + '</div>' +
      '<div class="ob-foot"><button class="btn sec" data-a="kBack"' + (n <= 3 ? ' disabled' : '') + '>' + ic('left', 'sm') + 'Back</button><span class="saved">' + ic('cloud', 'sm') + 'Saved · ' + ago(k.savedAt) + '</span>' +
      (n < 9 ? '<span class="nx">Next: ' + OB[n].t + '</span><button class="btn pri" data-a="kNext"' + (locked ? ' disabled' : '') + '>Continue' + ic('right', 'sm') + '</button>' : k.status === 'progress' ? '<span class="nx"></span><button class="btn pri" data-a="kSubmit">Submit for review' + ic('right', 'sm') + '</button>' : '<span class="nx"></span><a class="btn pri" href="#/dashboard">Go to dashboard</a>') + '</div></section></div></div>';
    $$('[data-k]', app).forEach(function (el) {
      el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' || el.type === 'date' ? 'change' : 'input', function () {
        var f = el.dataset.k; k.d[f] = el.type === 'checkbox' ? el.checked : el.value; k.savedAt = Date.now();
        var c = $('[data-count="' + f + '"]'); if (c) c.textContent = el.value.length + '/' + el.maxLength;
        var m = $('[data-kmsg="' + f + '"]'); if (m) m.hidden = true; if (el.closest('.inp')) el.closest('.inp').classList.remove('err');
        $('.saved', app).innerHTML = ic('cloud', 'sm') + 'Saved · just now'; save();
      });
    });
    $$('[data-kf]', app).forEach(function (el) { el.onchange = function () { var f = el.files[0]; if (!f) return; k.files[el.dataset.kf] = f.name; k.savedAt = Date.now(); save(); renderOnboarding(); }; });
  }

  /* ---------- actions ---------- */
  var A = {
    close: closeModal,
    burger: function () { $('#side').classList.toggle('open'); },
    cmd: cmd, help: help, invite: invite, addFunds: addFunds,
    notifs: function (el) {
      var d = pop(el, '<div class="ph"><span>Notifications</span>' + (S.notifs.length ? '<span>' + S.notifs.length + '</span>' : '') + '</div>' + (S.notifs.length ? S.notifs.map(function (n, i) { return '<button class="mi" data-a="goNotif" data-i="' + i + '">' + '<span class="av ' + (n.read ? '' : 'a1') + '" style="width:32px;height:32px">' + ic(n.t.indexOf('offer') > -1 ? 'swap' : n.t.indexOf('Deposit') > -1 ? 'wallet' : 'bell', 'sm') + '</span><span><b style="font-weight:' + (n.read ? 500 : 600) + '">' + esc(n.t) + '</b><small>' + esc(n.sub) + ' · ' + ago(n.at) + '</small></span></button>'; }).join('') : '<div class="empty">You’re all caught up.</div>'), 'notif');
      if (d) { S.notifs.forEach(function (n) { n.read = true; }); save(); var pip = el.querySelector('.pip'); if (pip) pip.remove(); }
    },
    goNotif: function (el) { var n = S.notifs[+el.dataset.i]; closePops(); if (n && n.href) location.hash = n.href; },
    quick: function (el) {
      pop(el, '<button class="mi" data-a="qNew">' + ic('doc') + '<span><b>New sell order</b><small>List a commodity for trade</small></span></button><button class="mi" data-a="qFunds">' + ic('wallet') + '<span><b>Add funds</b><small>Bank transfer into your wallet</small></span></button><button class="mi" data-a="qInvite">' + ic('uplus') + '<span><b>Invite trader</b><small>Add a teammate</small></span></button>');
    },
    qNew: function () { closePops(); location.hash = '#/order/new'; }, qFunds: function () { closePops(); addFunds(); }, qInvite: function () { closePops(); invite(); },
    refreshWallet: function (el) { el.classList.add('spin'); setTimeout(function () { el.classList.remove('spin'); toast('Balance up to date', money(S.wallet, 2) + ' available', { icon: 'refresh', blue: true }); }, 700); },
    chart: function (el) { S.ui.chart = el.dataset.v; save(); render(); },
    range: function (el) { S.ui.range = el.dataset.v; save(); render(); },
    tTab: function (el) { S.ui.tTab = el.dataset.v; save(); render(); },
    tf: function (el) { S.ui.tradeFilter = el.dataset.v; save(); render(); },
    approve: function (el) { var t = S.traders.filter(function (x) { return x.id === el.dataset.id; })[0]; t.st = 'active'; S.team.unshift({ who: S.user.name, t: 'approved', obj: t.name, at: Date.now(), ic: 'check' }); if (!S.traders.some(function (x) { return x.st === 'pending'; })) S.ui.tTab = 'active'; save(); render(); toast('Trader approved', t.name + ' can now create and respond to orders'); },
    exportTraders: function () { download('comdex-traders.csv', 'Name,Trader ID,Email,Trades,Receivables,Payables,Status\n' + S.traders.map(function (t) { return [t.name, t.id, t.email, t.trades, t.rec, t.pay, t.st].join(','); }).join('\n'), 'text/csv'); toast('Export ready', 'comdex-traders.csv downloaded', { icon: 'down', blue: true }); },
    news: function () { toast('Market news', 'Full articles open in the Comdex news reader, which isn’t part of this prototype.', { icon: 'info', blue: true }); },
    openTrade: function (el) { location.hash = '#/trades/' + el.dataset.id; },
    tdTab: function (el) { tdTab = el.dataset.v; refreshTrade(route()[1]); var b = $('#layer [data-a="tdTab"][data-v="' + tdTab + '"]'); if (b) b.focus(); },
    copy: function (el) { copy(el.dataset.v, el); },
    fakeDoc: function (el, e) { e.preventDefault(); var n = el.dataset.v; download(n.replace(/\.pdf$/, '') + '.txt', n + '\n\nPlaceholder for the document stored with this trade on Comdex. In the product this opens the signed PDF.'); toast('Downloading ' + n, 'Prototype file, standing in for the real PDF', { icon: 'down', blue: true }); },
    dlSummary: function (el) {
      var t = trade(el.dataset.id), lines = ['COMDEX TRADE SUMMARY', '', 'Order: ' + t.id, 'Status: ' + ST[t.status].l, 'Route: ' + t.from.port + ', ' + t.from.country + ' -> ' + t.to.port + ', ' + t.to.country, 'Commodity: ' + t.commodity + ' (' + t.blName + ')', 'Quality: ' + t.quality, 'Quantity: ' + t.qty + ' MT', 'Term: ' + t.term, 'Price: ' + money(unit(t), 2) + ' / MT', 'Value: ' + money(total(t), 2), 'Contract ID: ' + t.contract, 'Buyer: ' + (t.buyer && t.buyer.name || '-'), '', 'ACTIVITY'].concat(t.act.map(function (a) { return dtFmt(a.at) + '  ' + a.t + (a.sub ? ' - ' + a.sub : ''); }));
      download('Comdex_' + t.id.slice(0, 8) + '_summary.txt', lines.join('\n')); toast('Summary downloaded', 'Comdex_' + t.id.slice(0, 8) + '_summary.txt', { icon: 'down', blue: true });
    },
    simOffer: function (el) { JOBS.counter({ id: el.dataset.id }); save(); render(true); },
    acceptOffer: function (el) {
      var t = trade(el.dataset.id), o = t.offers.filter(function (x) { return x.by === 'buyer' && x.st === 'Pending'; })[0];
      confirmBox('Accept ' + money(o.amount, 2) + ' / MT?', 'This signs the contract at ' + money(o.amount * t.qty, 2) + ' for ' + t.qty.toLocaleString() + ' MT. Your earlier offers are withdrawn.', 'Accept and sign', function () {
        o.st = 'Accepted'; t.offers.forEach(function (x) { if (x.by === 'you' && x.st !== 'Accepted') x.st = 'Withdrawn'; });
        t.agreed = o.amount; t.status = 'payment';
        t.act.push({ at: Date.now(), ic: 'check', t: 'You accepted the buyer’s counter-offer', sub: 'Contract signed at ' + money(o.amount, 2) + ' / MT. Your earlier offers were withdrawn.', file: 'Signed_Contract.pdf' });
        t.docs.push({ name: 'Signed_Contract.pdf', sub: 'Signed by both parties' });
        job('receipt', { id: t.id }, 6000); save(); render(); openTrade(t.id);
        toast('Counter-offer accepted', 'Waiting for ' + t.buyer.name + ' to pay into escrow');
      });
    },
    counterForm: function (el) {
      var t = trade(el.dataset.id), o = t.offers.filter(function (x) { return x.by === 'buyer' && x.st === 'Pending'; })[0], sug = Math.round((o.amount + t.price) / 2);
      $('#negActs').innerHTML = '<div class="f" style="flex:1;min-width:220px"><label for="ctr">Your counter, per MT</label><div class="inp"><span style="color:var(--mut)">$</span><input id="ctr" inputmode="decimal" value="' + sug + '" autofocus><span class="unit">USD</span></div><span class="help" id="ctrH">' + money(sug * t.qty, 2) + ' total</span></div><div style="display:flex;gap:10px;align-self:center;margin-top:8px"><button class="btn pri" data-a="sendCounter" data-id="' + t.id + '">Send counter</button><button class="btn sec" data-a="cancelCounter" data-id="' + t.id + '">Cancel</button></div>';
      var inp = $('#ctr'); inp.focus(); inp.select();
      inp.oninput = function () { $('#ctrH').textContent = money(num(inp.value) * t.qty, 2) + ' total'; };
      inp.onkeydown = function (e) { if (e.key === 'Enter') A.sendCounter($('[data-a="sendCounter"]')); };
    },
    cancelCounter: function (el) { refreshTrade(el.dataset.id); },
    sendCounter: function (el) {
      var t = trade(el.dataset.id), v = num($('#ctr').value), o = t.offers.filter(function (x) { return x.by === 'buyer' && x.st === 'Pending'; })[0];
      if (!(v > 0)) { $('#ctr').closest('.inp').classList.add('err'); return; }
      if (v <= o.amount) { $('#ctrH').textContent = 'That’s at or below the buyer’s offer — accept it instead.'; $('#ctrH').style.color = 'var(--red)'; return; }
      o.st = 'Declined'; t.offers.forEach(function (x) { if (x.by === 'you' && x.st === 'Active') x.st = 'Withdrawn'; });
      t.offers.push({ at: Date.now(), by: 'you', amount: v, doc: 'Contract_v' + (t.offers.filter(function (x) { return x.by === 'you'; }).length + 1) + '.pdf', st: 'Pending' });
      t.status = 'awaiting'; t.act.push({ at: Date.now(), ic: 'swap', t: 'You sent a counter-offer', sub: money(v, 2) + ' / MT, ' + money(v * t.qty, 2) + ' total.' });
      job('buyerAccepts', { id: t.id, amount: v }, 5000); save(); render(); openTrade(t.id);
      toast('Counter sent', t.buyer.name + ' will be notified', { icon: 'mail', blue: true });
    },
    declineOffer: function (el) {
      var t = trade(el.dataset.id);
      confirmBox('Decline this counter-offer?', 'The order goes back to listed, and ' + t.buyer.name + ' can make a new offer.', 'Decline offer', function () {
        t.offers.forEach(function (x) { if (x.by === 'buyer' && x.st === 'Pending') x.st = 'Declined'; }); t.status = 'listed';
        t.act.push({ at: Date.now(), ic: 'x', t: 'You declined the counter-offer', sub: 'Order is listed again at ' + money(t.price, 2) + ' / MT.' });
        save(); render(); openTrade(t.id); toast('Counter-offer declined', 'Your order is listed again', { icon: 'x', blue: true });
      }, true);
    },
    confirmPay: function (el) {
      var t = trade(el.dataset.id);
      confirmBox('Confirm payment and release title?', money(total(t), 2) + ' moves from escrow to your wallet and the bill of lading transfers to ' + t.buyer.name + '. This can’t be undone.', 'Confirm and release', function () {
        t.status = 'completed'; S.wallet += total(t);
        t.act.push({ at: Date.now(), ic: 'checks', t: 'You confirmed the buyer’s payment', sub: 'Title transferred on-chain. Escrow released to your wallet.' });
        t.fb = { theirs: { stars: 5, text: 'Clear documents and a fast confirmation. Would trade again.' } };
        S.txns.push({ id: 'TX-' + (90413 + S.txns.length), type: 'Settlement', ref: t.commodity + ' · ' + t.id.slice(0, 8), amount: total(t), st: 'Settled', at: Date.now() });
        S.team.unshift({ who: S.user.name, t: 'settled a trade with', obj: t.buyer.name, at: Date.now(), ic: 'check' });
        save(); render(); openTrade(t.id); toast('Trade completed', money(total(t), 2) + ' released to your wallet');
      });
    },
    rate: function (el) { var t = trade(el.dataset.id), n = +el.dataset.v; t.fb = t.fb || {}; t.fb.mine = { stars: n, text: n >= 4 ? 'Smooth negotiation and quick payment.' : n === 3 ? 'Fine overall, a little slow on documents.' : 'Delays on payment and documents.' }; save(); refreshTrade(t.id); toast('Thanks for the feedback', 'It’s added to ' + t.buyer.name + '’s reputation'); },
    delDraft: function (el) { var id = el.dataset.id; confirmBox('Delete this draft?', 'It hasn’t been shared with anyone. This can’t be undone.', 'Delete draft', function () { S.trades = S.trades.filter(function (t) { return t.id !== id; }); save(); location.hash = '#/trades'; toast('Draft deleted', '', { icon: 'trash', blue: true }); }, true); },
    reset: function () { confirmBox('Reset prototype data?', 'Trades, wallet, onboarding and settings go back to the starting demo state.', 'Reset', function () { S = seed(); save(); render(); toast('Prototype reset', 'Starting data restored', { icon: 'refresh', blue: true }); }, true); },
    // order
    oSet: function (el) { orderForm[el.dataset.k] = el.dataset.v; renderOrder(); var b = $('[data-a="oSet"][data-k="' + el.dataset.k + '"][data-v="' + el.dataset.v + '"]'); if (b) b.focus(); },
    oInvite: function () { var m = (orderForm.invite || '').trim(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)) { showErr('invite', 'Enter a valid email address.'); return; } if (orderForm.invited.indexOf(m) < 0) orderForm.invited.push(m); orderForm.invite = ''; renderOrder(); toast('Invite queued', m + ' gets access when you publish', { icon: 'mail', blue: true }); },
    oUninvite: function (el) { orderForm.invited.splice(+el.dataset.i, 1); renderOrder(); },
    oRmFile: function () { delete orderForm.obl.file; renderOrder(); },
    oGo: function (el) { oStep = +el.dataset.v; renderOrder(); window.scrollTo(0, 0); },
    oNext: function () {
      if (!validate(oStep)) return;
      if (oStep < 3) { oStep++; renderOrder(); window.scrollTo(0, 0); return; }
      var t = saveOrder(orderForm.listing === 'settlement' ? 'review' : 'listed'); orderForm = null;
      location.hash = '#/trades/' + t.id;
      toast(t.status === 'review' ? 'Submitted for verification' : 'Order published', t.status === 'review' ? 'Comdex is checking your documents' : t.commodity + ' is live. Offers will appear in the deal room.');
    },
    oBack: function () { if (oStep > 1) { oStep--; renderOrder(); window.scrollTo(0, 0); } else A.oClose(); },
    oDraft: function () { var t = saveOrder('draft'); orderForm = null; location.hash = '#/trades'; toast('Draft saved', t.commodity + ' · find it under Drafts', { icon: 'pen', blue: true }); },
    oClose: function () { confirmBox('Leave without saving?', 'Save it as a draft to come back to it later.', 'Save draft', function () { A.oDraft(); }); var foot = $('#layer .m-foot'); var b = document.createElement('button'); b.className = 'btn danger'; b.textContent = 'Discard'; b.onclick = function () { closeModal(); orderForm = null; location.hash = '#/trades'; }; foot.insertBefore(b, foot.children[1]); },
    // onboarding
    kGo: function (el) { var v = +el.dataset.v; if (v < 3) return; S.kyc.cur = v; ownerEdit = -1; ownerAdd = false; save(); renderOnboarding(); window.scrollTo(0, 0); },
    kBack: function () { if (S.kyc.cur > 3) { S.kyc.cur--; save(); renderOnboarding(); window.scrollTo(0, 0); } },
    kNext: function () { var k = S.kyc; if (ownerEdit > -1 || ownerAdd) { toast('Save the owner first', 'Finish editing the beneficial owner row.', { icon: 'alert', blue: true }); return; } if (!obValid(k.cur, true)) return; k.done[k.cur] = true; k.cur = Math.min(9, k.cur + 1); k.savedAt = Date.now(); save(); renderOnboarding(); window.scrollTo(0, 0); },
    kSubmit: function () { if (!obValid(9, true)) return; S.kyc.done[9] = true; S.kyc.status = 'review'; S.kyc.submittedAt = Date.now(); job('kycReview', {}, 9000); save(); renderOnboarding(); toast('Submitted for review', 'We’ll notify you when your organization is verified', { long: true }); },
    kZone: function (el) { S.kyc.d.zone = el.dataset.v; S.kyc.savedAt = Date.now(); save(); renderOnboarding(); $('[data-a="kZone"][data-v="' + el.dataset.v + '"]').focus(); },
    kRm: function (el) { delete S.kyc.files[el.dataset.k]; save(); renderOnboarding(); },
    kChain: function (el) { el.disabled = true; el.innerHTML = '<span class="i" style="width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite"></span>Creating…'; setTimeout(function () { S.kyc.chain = 'comdex1' + uid(32).toLowerCase(); S.kyc.savedAt = Date.now(); save(); renderOnboarding(); toast('Blockchain account created', 'Your Comdex ID is ready'); }, 1200); },
    oAdd: function () { ownerAdd = true; ownerEdit = -1; renderOnboarding(); var n = $('#ow_n'); if (n) n.focus(); },
    oEdit: function (el) { ownerEdit = +el.dataset.i; ownerAdd = false; renderOnboarding(); var n = $('#ow_n'); if (n) n.focus(); },
    oDel: function (el) { S.kyc.owners.splice(+el.dataset.i, 1); save(); renderOnboarding(); },
    oCancel: function () { ownerEdit = -1; ownerAdd = false; renderOnboarding(); },
    oSave: function () {
      var o = { name: $('#ow_n').value.trim(), nat: $('#ow_a').value.trim(), role: $('#ow_r').value, pct: Math.max(0, Math.min(100, Math.round(num($('#ow_p').value)))) };
      if (!o.name) { $('#ow_n').closest('.inp').classList.add('err'); $('#ow_n').focus(); return; }
      if (!o.nat) { $('#ow_a').closest('.inp').classList.add('err'); $('#ow_a').focus(); return; }
      if (ownerEdit > -1) S.kyc.owners[ownerEdit] = o; else S.kyc.owners.push(o);
      ownerEdit = -1; ownerAdd = false; S.kyc.savedAt = Date.now(); save(); renderOnboarding();
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-a]');
    if (e.target.matches('[data-scrim]')) { closeModal(); return; }
    if (!e.target.closest('.menu-wrap')) closePops();
    if (!e.target.closest('#side') && !e.target.closest('[data-a="burger"]')) { var s = $('#side'); if (s) s.classList.remove('open'); }
    if (el && A[el.dataset.a]) { if (el.tagName === 'A' && el.getAttribute('href') === '#') e.preventDefault(); A[el.dataset.a](el, e); }
  });
  document.addEventListener('change', function (e) {
    var p = e.target.dataset.pref, ps = e.target.dataset.prefSel;
    if (p) { S.prefs[p] = e.target.checked; save(); toast('Saved', e.target.getAttribute('aria-label') + (e.target.checked ? ' on' : ' off'), { icon: 'check' }); }
    if (ps) { S.prefs[ps] = e.target.value; save(); toast('Saved', 'Reporting currency set to ' + e.target.value); }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if ($('#layer .cmd')) closeModal(); else cmd(); return; }
    if (e.key === 'Escape') { if ($('.pop')) closePops(); else closeModal(); return; }
    if ($('#layer').onkey && $('#layer').innerHTML) $('#layer').onkey(e);
    if (e.key === 'Enter' && e.target.matches('tr[data-a]')) A.openTrade(e.target);
    if (e.key === 'Tab' && $('#layer .modal')) { // keep focus inside the dialog
      var f = $$('#layer .modal button:not([disabled]), #layer .modal input, #layer .modal select, #layer .modal textarea, #layer .modal a[href], #layer .modal [tabindex="0"]').filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return; var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  render();
})();
