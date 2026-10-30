/* PSTAKE prototype — all data is simulated, state lives in memory + localStorage. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ICON = {
    tick: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14-4l-2 2M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>',
    out: '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>',
    exit: '<svg viewBox="0 0 24 24"><path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9"/></svg>',
    stake: '<svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    unstake: '<svg viewBox="0 0 24 24"><path d="M12 20V9M7 14l5-5 5 5M5 4h14"/></svg>',
    flash: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    unlock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></svg>',
    pool: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
    poolNew: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="M3 13l9 5 3-1.7M19 15v6M16 18h6"/></svg>',
    poolOut: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M12 22v-4"/></svg>',
    gift: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3 8 4s-.5 4 4 4zm0 0s1.5-5 4-4 .5 4-4 4z"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    swap: '<svg viewBox="0 0 24 24"><path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    dl: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    bolt: '<svg class="bolt" viewBox="0 0 24 24" style="width:15px;height:15px;fill:currentColor;stroke:none"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>'
  };

  /* ---------- data ---------- */
  var NETS = {
    persistence: {
      name: 'Persistence', dot: 'P', cls: '', addr: 'persis…tc7zag', full: 'persistence1q9x8w7v6u5t4s3r2p0tc7zag',
      days: '21–25 days', fee: 0.0025, gas: 'OSMO', apy: 14.15, tvu: '45.38 ATOM',
      tokens: {
        OSMO: { stk: 'stkOSMO', price: 0.765, r: 0.999664, cls: 'v', apy: 12.4, tvu: 4812560 },
        ATOM: { stk: 'stkATOM', price: 8.4, r: 1 / 1.046228, cls: 'b', apy: 14.15, tvu: 1204380 }
      }
    },
    bnb: {
      name: 'BNB Smart Chain', dot: 'B', cls: 'y', addr: '0x7a3f…c91f', full: '0x7a3f1d2e9b4c58a60e7f3b21d9c4a8e5f6b7c91f',
      days: '7–10 days', fee: 0.0004, gas: 'BNB', apy: 5.8, tvu: '1,204.5 BNB',
      tokens: { BNB: { stk: 'stkBNB', price: 612, r: 0.9615, cls: 'y', apy: 5.8, tvu: 9150 } }
    }
  };
  var POOLS = {
    persistence: [
      { id: 'osmo', a: 'stkOSMO', b: 'OSMO', w: [50, 50], apr: 18.4, tvl: 2100000, base: 'OSMO' },
      { id: 'atom', a: 'stkATOM', b: 'ATOM', w: [50, 50], apr: 22.1, tvl: 3400000, base: 'ATOM' },
      { id: 'mix', a: 'stkATOM', b: 'stkOSMO', w: [80, 20], apr: 26.3, tvl: 640000, base: 'ATOM' }
    ],
    bnb: [{ id: 'bnb', a: 'stkBNB', b: 'BNB', w: [50, 50], apr: 9.8, tvl: 5600000, base: 'BNB' }]
  };
  var WALLETS = [
    ['MetaMask', 'metamask', 1, 'Popular'], ['Binance Wallet', 'binance', 0, 'Popular'], ['Keplr Wallet', 'keplr', 0, 'Popular'],
    ['Math Wallet', 'math', 0, 'More wallets'], ['Coin98 Wallet', 'coin98', 0, 'More wallets'], ['WalletConnect', 'walletconnect', 0, 'More wallets']
  ];

  function fresh() {
    return {
      net: 'persistence', connected: false, view: 'staking', tab: 'stake', tok: { stake: 'OSMO', unstake: 'OSMO' }, method: 'regular',
      bal: {
        persistence: { OSMO: 4.734655, stkOSMO: 12.330099, ATOM: 10, stkATOM: 0 },
        bnb: { BNB: 2.5, stkBNB: 0 }
      },
      unbonding: [], lp: { persistenceosmo: 2 }, lpB: { persistenceosmo: 2.000672 }, lpR: { persistenceosmo: { a: 0.0213, b: 0.0204, t: Date.now() } }, customPools: { persistence: [], bnb: [] }, defi: { tab: 'all', view: 'list' }, dv: 2, rewards: { persistence: { stkOSMO: 0.184, stkATOM: 0 }, bnb: { stkBNB: 0 } }, activity: [], txs: seedTxs()
    };
  }
  // History that explains the starting balances (12.330099 stkOSMO came from two stakes; the BNB stake was flash-unstaked).
  function seedTxs() {
    var D = 864e5, now = Date.now();
    function t(type, net, ago, give, get, extra) { return Object.assign({ id: 'seed' + ago + type, type: type, net: net, at: now - ago * D, give: give, get: get, hash: mkHash(net, type + ago), st: 'Confirmed', fee: NETS[net].fee + ' ' + NETS[net].gas }, extra || {}); }
    return [
      t('poolAdd', 'persistence', 7.4, [[2, 'stkOSMO'], [2.000672, 'OSMO']], null, { pool: 'stkOSMO / OSMO', note: 'Deposited at 50 / 50' }),
      t('restake', 'persistence', 2.1, [0.0418, 'stkOSMO'], [0.0418, 'stkOSMO']),
      t('claim', 'persistence', 5.4, [0.0612, 'stkOSMO'], [0.061221, 'OSMO']),
      t('stake', 'persistence', 9.2, [4.334243, 'OSMO'], [4.332787, 'stkOSMO']),
      t('stake', 'persistence', 12.6, [8, 'OSMO'], [7.997312, 'stkOSMO']),
      t('flash', 'bnb', 15.3, [0.48075, 'stkBNB'], [0.497497, 'BNB'], { note: 'Flash unstake · 0.5% fee' }),
      t('stake', 'bnb', 20.8, [0.5, 'BNB'], [0.48075, 'stkBNB'])
    ];
  }
  function mkHash(net, seedStr) {
    var h = 2166136261, out = '', c = '0123456789ABCDEF';
    for (var i = 0; i < 64; i++) { h ^= (seedStr || '').charCodeAt(i % Math.max(1, (seedStr || '').length)) + i; h = Math.imul(h, 16777619) >>> 0; out += c[(seedStr ? h : Math.random() * 4294967296 >>> 0) % 16]; }
    return net === 'bnb' ? '0x' + out.toLowerCase() : out;
  }
  var S = fresh();
  try { var saved = JSON.parse(localStorage.getItem('pstake01')); if (saved && saved.bal) S = saved; } catch (e) {}
  if (!S.txs) S.txs = seedTxs(); if (!S.customPools) S.customPools = { persistence: [], bnb: [] }; if (!S.lpB) S.lpB = {};
  if (!S.txf) S.txf = { g: 'all', net: 'all', q: '' };
  if (S.dv !== 2) { // older saved demos: pools now carry weights and rewards
    S.lpR = S.lpR || {}; S.defi = { tab: 'all', view: 'list' };
    Object.keys(S.customPools).forEach(function (k) { S.customPools[k].forEach(function (p) { p.w = p.w || [50, 50]; p.tvl = 0; delete p.fee; }); });
    S.dv = 2;
  }
  function save() { try { localStorage.setItem('pstake01', JSON.stringify(S)); } catch (e) {} }

  /* ---------- helpers ---------- */
  var net = function () { return NETS[S.net]; };
  function f(n, d) { d = d == null ? 6 : d; return Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function compactNum(v) { return v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : f(v, 2); }
  function usd(n) { return '≈ $' + f(n, 2); }
  function baseOf(sym) { var t = net().tokens; for (var k in t) if (t[k].stk === sym) return k; return sym; }
  function priceOf(sym) { var t = net().tokens, b = baseOf(sym); return t[b].price * (t[b].stk === sym ? 1 / t[b].r : 1); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function toast(title, msg) {
    var el = document.createElement('div'); el.className = 'toast';
    el.innerHTML = '<div class="okc">' + ICON.tick + '</div><div><b>' + esc(title) + '</b><span>' + esc(msg) + '</span></div>';
    $('#toasts').appendChild(el); setTimeout(function () { el.remove(); }, 4500);
  }
  function log(t) { S.activity.unshift({ t: t, at: Date.now(), net: S.net }); S.activity = S.activity.slice(0, 20); }
  var TX = {
    stake: { l: 'Stake', g: 'staking', ic: 'stake', c: 's' }, unstake: { l: 'Unstake', g: 'unstaking', ic: 'unstake', c: 'u' },
    flash: { l: 'Flash unstake', g: 'unstaking', ic: 'flash', c: 'u' }, unlock: { l: 'Unstake completed', g: 'unstaking', ic: 'unlock', c: 'u' },
    poolCreate: { l: 'Create pool', g: 'pools', ic: 'poolNew', c: 'p' }, poolAdd: { l: 'Add to pool', g: 'pools', ic: 'pool', c: 'p' }, poolRemove: { l: 'Remove from pool', g: 'pools', ic: 'poolOut', c: 'p' },
    swap: { l: 'Swap', g: 'trades', ic: 'swap', c: 'p' },
    claim: { l: 'Claim rewards', g: 'rewards', ic: 'gift', c: 'r' }, restake: { l: 'Restake rewards', g: 'rewards', ic: 'refresh', c: 'r' }
  };
  function recordTx(type, give, get, extra) {
    var t = Object.assign({ id: 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), type: type, net: S.net, at: Date.now(), give: give, get: get, hash: mkHash(S.net), st: 'Confirmed', fee: net().fee + ' ' + net().gas }, extra || {});
    S.txs.unshift(t); S.txs = S.txs.slice(0, 200); return t;
  }
  function aprLabel(p) { return p.apr == null ? 'New pool · APR after first trades' : p.apr + '% APR'; }
  function pools(nk) { return POOLS[nk || S.net].concat((S.customPools && S.customPools[nk || S.net]) || []); }
  function dateFmt(ms) { var d = new Date(ms); return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }
  function ago(ms) { var s = (Date.now() - ms) / 1000; return s < 60 ? 'just now' : s < 3600 ? Math.floor(s / 60) + 'm ago' : s < 86400 ? Math.floor(s / 3600) + 'h ago' : Math.floor(s / 86400) === 1 ? 'yesterday' : Math.floor(s / 86400) + ' days ago'; }

  /* ---------- modal ---------- */
  function openModal(html, onclose) {
    $('#modal').innerHTML = html; $('#scrim').hidden = false; $('#modal').onclose = onclose;
    var x = $('#modal .x'); if (x) x.onclick = closeModal;
    var fi = $('#modal [autofocus],#modal button:not(.x)'); if (fi) fi.focus();
  }
  function closeModal() { $('#scrim').hidden = true; $('#modal').innerHTML = ''; }
  $('#scrim').addEventListener('mousedown', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closePops(); } });

  /* ---------- header ---------- */
  function closePops() { $$('.pop').forEach(function (p) { p.hidden = true; }); $('#netBtn').setAttribute('aria-expanded', 'false'); }
  function renderHeader() {
    var n = net();
    $('#netName').textContent = n.name; $('#netLogo').src = 'chains/' + S.net + '.svg';
    $$('.net-opt').forEach(function (b) { b.classList.toggle('on', b.dataset.net === S.net); });
    var w = $('#walletArea');
    if (!S.connected) { w.innerHTML = '<button class="chip cta" id="connectBtn">Connect wallet</button>'; $('#connectBtn').onclick = connectModal; return; }
    var gas = n.gas;
    w.innerHTML = '<button class="chip" id="walBtn" aria-haspopup="true"><span class="av" style="width:24px;height:24px"></span>' + n.addr + '<svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>' +
      '<div class="pop" id="walMenu" hidden><div class="acct-h"><span class="av"></span><div><b>' + n.addr + '</b><span>' + n.name + ' · Connected</span></div></div>' +
      '<div class="bal"><small>Balance</small><strong>' + f(S.bal[S.net][gas]) + '<span>' + gas + '</span></strong><em>' + usd(S.bal[S.net][gas] * n.tokens[gas].price) + '</em></div>' +
      '<button class="pop-act" data-a="copy">' + ICON.copy + 'Copy address</button><button class="pop-act" data-a="exp">' + ICON.out + 'View on explorer</button>' +
      '<button class="pop-act danger" data-a="dis">' + ICON.exit + 'Disconnect</button></div>';
    $('#walBtn').onclick = function (e) { e.stopPropagation(); var m = $('#walMenu'), h = m.hidden; closePops(); m.hidden = !h; };
    $('#walMenu').onclick = function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return; closePops();
      if (a.dataset.a === 'copy') { try { navigator.clipboard.writeText(n.full).catch(function () {}); } catch (x) {} toast('Address copied', n.full.slice(0, 22) + '…'); }
      if (a.dataset.a === 'exp') toast('Prototype', 'Explorer link is disabled in this demo');
      if (a.dataset.a === 'dis') { S.connected = false; save(); renderHeader(); render(); toast('Disconnected', 'Wallet removed from this session'); }
    };
  }
  $('#netBtn').onclick = function (e) { e.stopPropagation(); var m = $('#netMenu'), h = m.hidden; closePops(); m.hidden = !h; $('#netBtn').setAttribute('aria-expanded', String(h)); };
  $('#netMenu').onclick = function (e) {
    var b = e.target.closest('.net-opt'); if (!b) return; closePops();
    if (b.dataset.net === S.net) return;
    S.net = b.dataset.net; S.tok = { stake: Object.keys(net().tokens)[0], unstake: Object.keys(net().tokens)[0] }; S.method = 'regular'; save();
    renderHeader(); render(); toast('Network switched', 'Now on ' + net().name + ' — balances are per network');
  };
  document.addEventListener('click', function (e) { if (!e.target.closest('.menu-wrap')) closePops(); });

  /* connect wallet */
  function connectModal() {
    var h = '<button class="x" aria-label="Close">×</button><h2>Connect wallet</h2><p class="sub">Choose a wallet to start staking on ' + net().name + '.</p>', cur = '';
    WALLETS.forEach(function (w, i) {
      if (w[3] !== cur) { cur = w[3]; h += '<p class="sec-h">' + cur + '</p>'; }
      h += '<button class="wal" data-i="' + i + '"><span class="wlogo w-' + w[1] + '"><img src="wallets/' + w[1] + '.svg" alt="" width="22" height="22"></span>' + w[0] + '<span class="go">›</span>' + '</button>';
    });
    h += '<p class="legal">By connecting, you agree to the Terms of Use and Privacy Policy.</p>';
    openModal(h);
    $$('.wal').forEach(function (b) {
      b.onclick = function () {
        var w = WALLETS[b.dataset.i];
        openModal('<div class="center"><div class="spinner"></div><h2>Connecting to ' + w[0] + '</h2><p>Approve the request in your wallet…</p></div>');
        setTimeout(function () { S.connected = true; save(); closeModal(); renderHeader(); render(); toast('Wallet connected', n2() + ' · ' + net().name); }, 1100);
      };
    });
  }
  function n2() { return net().addr; }

  /* ---------- views ---------- */
  var view = $('#view');
  function render() {
    $$('#nav [data-view]').forEach(function (b) { b.classList.toggle('on', b.dataset.view === S.view); });
    ({ staking: renderStaking, defi: renderDefi, dashboard: renderDashboard, transactions: renderTransactions }[S.view] || renderStaking)();
  }
  $('#nav').addEventListener('click', function (e) {
    var b = e.target.closest('[data-view]'), a = e.target.closest('[data-ext]');
    if (a) { e.preventDefault(); toast('Prototype', 'External links are disabled in this demo'); return; }
    if (b) { S.view = b.dataset.view; $('#side').classList.remove('open'); save(); render(); window.scrollTo(0, 0); }
  });
  $('.side-foot').addEventListener('click', function (e) { var b = e.target.closest('[data-soc]'); if (!b) return; e.preventDefault(); toast(b.dataset.soc, 'External links are disabled in this prototype'); });
  $('#burger').onclick = function (e) { e.stopPropagation(); $('#side').classList.toggle('open'); };
  document.addEventListener('click', function (e) { if (!e.target.closest('#side')) $('#side').classList.remove('open'); });

  /* staking */
  var amount = '';
  function renderStaking() {
    var isS = S.tab === 'stake', n = net(), keys = Object.keys(n.tokens), sel = S.tok[S.tab], T = n.tokens[sel];
    var from = isS ? sel : T.stk, to = isS ? T.stk : sel;
    view.innerHTML = '<div class="wrap"><div class="tabs" role="tablist"><button role="tab" data-t="stake" class="' + (isS ? 'on' : '') + '">Stake</button><button role="tab" data-t="unstake" class="' + (!isS ? 'on' : '') + '">Unstake</button></div>' +
      '<div class="card"><div class="box"><div class="row"><span>' + (isS ? 'You stake' : 'You unstake') + '</span><span>Available <b id="avail"></b> <button class="max" id="max">MAX</button></span></div>' +
      '<div class="amt-row"><div style="position:relative"><button class="tok" id="tokBtn"><span class="dot ' + T.cls + '">' + from[0] + '</span>' + from + (keys.length > 1 ? '<svg class="chev" style="width:14px" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>' : '') + '</button></div>' +
      '<input class="amt" id="amt" inputmode="decimal" placeholder="0.00" autocomplete="off" aria-label="Amount"></div><div class="row"><span></span><span id="usdIn">≈ $0.00</span></div></div>' +
      '<div class="arrow">' + ICON.down + '</div>' +
      '<div class="box"><div class="row"><span>You receive</span><span>Balance <b id="rbal"></b></span></div>' +
      '<div class="amt-row"><span class="tok"><span class="dot ' + (isS ? 'g' : T.cls) + '">' + to[0] + '</span>' + to + '</span><input class="amt out" id="out" readonly placeholder="0.00" aria-label="You receive" tabindex="-1"></div><div class="row"><span></span><span id="usdOut">≈ $0.00</span></div></div>' +
      '<div class="info"><div class="row"><span>Exchange rate</span><b class="rate-v"><span id="rate"></span></b></div>' +
      (isS ? '<div class="row"><span>Network fee</span><b>~' + n.fee + ' ' + n.gas + '</b></div>' : '') + '</div>' +
      (isS ? '' : '<p class="lbl">Unstaking method</p><button class="method" data-m="flash"><span class="radio"></span><div><strong>Flash Unstake ' + ICON.bolt + '</strong><small>Instantly · 0.5% fee</small></div><div class="r"><strong id="mFlash">0 ' + sel + '</strong><small>You receive</small></div></button>' +
        '<button class="method" data-m="regular"><span class="radio"></span><div><strong>Regular Unstake</strong><small>' + n.days + ' · 0% fee</small></div><div class="r"><strong id="mReg">~0 ' + sel + '</strong><small>You receive</small></div></button>') +
      '<p class="err" id="err" hidden></p><button class="btn" id="go"></button></div>' +
      '<div class="stats"><div class="stat"><small>' + sel + ' staking APY</small><strong class="g">' + T.apy.toFixed(2) + '%</strong><em>Earned on staked ' + sel + '</em></div><div class="stat"><small>Total Value Unlocked (TVU)</small><strong>' + compactNum(T.tvu) + ' ' + sel + '</strong><em>≈ $' + compactNum(T.tvu * T.price) + ' staked by all PSTAKE users</em></div></div>' +
      '<div id="nextStep"></div></div>';

    $$('.tabs button').forEach(function (b) { b.onclick = function () { S.tab = b.dataset.t; amount = ''; save(); renderStaking(); }; });
    $('#amt').oninput = function () {
      var v = this.value.replace(/[^0-9.]/g, ''); var p = v.split('.'); if (p.length > 2) v = p[0] + '.' + p.slice(1).join('');
      if (p[1] && p[1].length > 6) v = p[0] + '.' + p[1].slice(0, 6); this.value = amount = v; calc();
    };
    $('#max').onclick = function () {
      var bal = S.bal[S.net][from]; if (isS && from === n.gas) bal = Math.max(0, bal - n.fee);
      amount = bal ? String(+bal.toFixed(6)) : ''; $('#amt').value = amount; calc();
    };
    $('#tokBtn').onclick = function (e) {
      if (keys.length < 2) return; e.stopPropagation(); var ex = $('.dd'); if (ex) return ex.remove();
      var d = document.createElement('div'); d.className = 'dd';
      d.innerHTML = keys.map(function (k) { var lab = isS ? k : n.tokens[k].stk; return '<button data-k="' + k + '"><span class="dot ' + n.tokens[k].cls + '">' + lab[0] + '</span>' + lab + '</button>'; }).join('');
      this.parentNode.appendChild(d);
      d.onclick = function (ev) { var b = ev.target.closest('button'); if (b) { S.tok[S.tab] = b.dataset.k; amount = ''; save(); renderStaking(); } };
    };
    $$('.method').forEach(function (b) { b.onclick = function () { S.method = b.dataset.m; calc(); }; });
    $('#rate').insertAdjacentHTML('afterend', '<button class="ico" id="refresh" aria-label="Refresh rate">' + ICON.refresh + '</button>');
    $('#refresh').onclick = function () { var b = this; b.classList.add('spin'); setTimeout(function () { b.classList.remove('spin'); }, 650); };
    $('#amt').value = amount;
    $('#go').onclick = go;
    calc();

    function calc() {
      var a = parseFloat(amount) || 0, bal = S.bal[S.net][from], rate = isS ? T.r : 1 / T.r;
      var recv = a * rate, flash = recv * 0.995, outAmt = isS ? recv : (S.method === 'flash' ? flash : recv);
      $('#avail').textContent = f(bal) + ' ' + from; $('#rbal').textContent = f(S.bal[S.net][to]) + ' ' + to;
      $('#usdIn').textContent = usd(a * priceOf(from)); $('#usdOut').textContent = usd(outAmt * priceOf(to));
      $('#out').value = a ? f(outAmt) : '';
      $('#rate').textContent = isS ? '1 ' + sel + ' = ' + f(T.r) + ' ' + T.stk : '1 ' + T.stk + ' = ' + f(1 / T.r) + ' ' + sel;
      if (!isS) {
        $('#mFlash').textContent = f(flash, 4) + ' ' + sel; $('#mReg').textContent = (a ? '~' : '~') + f(recv, 4) + ' ' + sel;
        $$('.method').forEach(function (b) { b.classList.toggle('on', b.dataset.m === S.method); b.setAttribute('aria-pressed', b.dataset.m === S.method); });
      }
      var avail = isS && from === n.gas ? bal - n.fee : bal, err = $('#err'), go = $('#go'); err.hidden = true; go.disabled = false;
      if (!S.connected) go.textContent = 'Connect wallet';
      else if (!a) { go.textContent = 'Enter an amount'; go.disabled = true; }
      else if (a > avail + 1e-9) { go.textContent = 'Insufficient balance'; go.disabled = true; err.hidden = false; err.textContent = 'You only have ' + f(Math.max(avail, 0)) + ' ' + from + ' available.'; }
      else go.textContent = isS ? 'Liquid Stake' : (S.method === 'flash' ? 'Flash Unstake' : 'Start Unstake');
      var ns = $('#nextStep'), st = S.bal[S.net][T.stk];
      ns.innerHTML = isS && S.connected && st > 0 ? '<div class="next"><span class="dot g">' + T.stk[0] + '</span><p>You hold <b>' + f(st, 4) + ' ' + T.stk + '</b><small>Put it to work in a DeFi pool.</small></p><button class="btn ghost sm" id="toDefi">Open DeFi</button></div>' : '';
      var td = $('#toDefi'); if (td) td.onclick = function () { S.view = 'defi'; save(); render(); };
    }
    function go() {
      if (!S.connected) return connectModal();
      var a = parseFloat(amount), rate = isS ? T.r : 1 / T.r, recv = a * rate, flash = !isS && S.method === 'flash', out = flash ? recv * 0.995 : recv;
      var rows = '<div class="info sum"><div class="row"><span>You ' + (isS ? 'stake' : 'unstake') + '</span><b>' + f(a) + ' ' + from + '</b></div><div class="row"><span>You receive' + (!isS && !flash ? ' (est.)' : '') + '</span><b>' + f(out) + ' ' + to + '</b></div>' +
        (isS ? '<div class="row"><span>Network fee</span><b>~' + n.fee + ' ' + n.gas + '</b></div>' : '<div class="row"><span>Method</span><b>' + (flash ? 'Flash · 0.5% fee · instant' : 'Regular · ' + n.days + ' · 0% fee') + '</b></div>') + '</div>' +
        (!isS && !flash ? '<p class="note">Your ' + sel + ' will be unlocked after the unbonding period. You can track it in the Dashboard.</p>' : '');
      openModal('<button class="x" aria-label="Close">×</button><h2>Confirm ' + (isS ? 'stake' : 'unstake') + '</h2>' + rows + '<button class="btn" id="ok">Confirm in wallet</button>');
      $('#ok').onclick = function () {
        openModal('<div class="center"><div class="spinner"></div><h2>Waiting for signature</h2><p>Confirm the transaction in your wallet…</p></div>');
        setTimeout(function () {
          var B = S.bal[S.net]; B[from] -= a; if (isS && from === n.gas) B[from] -= n.fee;
          if (!isS && !flash) { var ubId = 'u' + Date.now().toString(36); S.unbonding.push({ id: ubId, net: S.net, sym: sel, amt: out, total: 21, left: 21 }); recordTx('unstake', [a, from], [out, sel], { ub: ubId, note: 'Regular unstake · ' + n.days }); log('Started unstake of ' + f(a, 4) + ' ' + from); toast('Unstake started', f(out, 4) + ' ' + sel + ' unlocks in ' + n.days); }
          else { B[to] += out; recordTx(isS ? 'stake' : 'flash', [a, from], [out, to], isS ? null : { note: 'Flash unstake · 0.5% fee' }); log((isS ? 'Staked ' : 'Flash unstaked ') + f(a, 4) + ' ' + from); toast(isS ? 'Stake confirmed' : 'Unstake complete', f(out) + ' ' + to + ' added to your balance'); }
          amount = ''; save(); closeModal(); renderStaking();
        }, 1400);
      };
    }
  }
  document.addEventListener('click', function (e) { if (!e.target.closest('.tok')) { var d = $('.dd'); if (d) d.remove(); } });

  /* dashboard */
  function renderDashboard() {
    if (!S.connected) {
      var nn = net();
      function et(l, c) { return '<div class="tile"><small><i style="background:' + c + '"></i>' + l + '</small><strong class="mutd">—</strong><em>Connect to see</em></div>'; }
      function es(h, t) { return '<h2 class="sect">' + h + '</h2><div class="list"><p class="empty">' + t + '</p></div>'; }
      view.innerHTML = '<div class="wrap wide"><h1>Dashboard</h1><p class="sub">Every balance by state, on ' + nn.name + '.</p>' +
        '<div class="connect-card"><div><b>Connect a wallet to see your dashboard</b><p>Your available, staked, unstaking, pooled and reward balances will show here.</p></div><button class="btn sm" id="cwD">Connect wallet</button></div>' +
        '<div class="tiles">' + et('Available', '#3ecf8e') + et('Staked', '#e8546a') + et('Unstaking', '#f5b73b') + et('In pools', '#7a5af8') + et('Rewards', '#5b8def') + '</div>' +
        es('Balances', 'No wallet connected. Balances for each asset appear once you connect.') + es('Unstaking', 'Regular unstakes show here with a countdown.') + es('Pool positions', 'Pools you provide liquidity to show here.') + es('Rewards', 'Staking rewards you can claim or restake show here.') + es('Activity', 'Your recent actions show here.') + '</div>';
      $('#cwD').onclick = connectModal; return;
    }
    var n = net(), B = S.bal[S.net], avail = 0, staked = 0, unb = 0, pool = 0, rew = 0, rows = '';
    Object.keys(n.tokens).forEach(function (k) {
      var T = n.tokens[k]; avail += B[k] * T.price; staked += B[T.stk] * T.price / T.r;
      rows += pos(k, B[k], 'Available', 'g', T.cls) + pos(T.stk, B[T.stk], 'Staked', '', 'g');
    });
    var ub = S.unbonding.filter(function (u) { return u.net === S.net; }); ub.forEach(function (u) { unb += u.amt * n.tokens[u.sym].price; });
    var lpRows = '';
    pools().forEach(function (p) { var v = (S.lp[S.net + p.id] || 0), vb = S.lpB[S.net + p.id] || 0; if (v > 0 || vb > 0) { pool += v * priceOf(p.a) + vb * priceOf(p.b); lpRows += '<div class="li"><span class="dot v">' + p.a[0] + '</span><div class="m"><b>' + p.a + ' / ' + p.b + '</b><small>' + aprLabel(p) + ' · ' + wLabel(p) + '</small></div><div class="r"><b>' + f(v, 4) + ' ' + p.a + (vb ? ' + ' + f(vb, 4) + ' ' + p.b : '') + '</b><small>' + usd(v * priceOf(p.a) + vb * priceOf(p.b)) + '</small></div><span class="pill">' + (p.mine ? 'Your pool' : 'Pool') + '</span></div>'; } });
    var rw = S.rewards[S.net], rwRows = '';
    Object.keys(rw).forEach(function (k) { if (rw[k] > 0) { var T = n.tokens[baseOf(k)]; rew += rw[k] * T.price / T.r; rwRows += '<div class="li"><span class="dot g">' + k[0] + '</span><div class="m"><b>' + f(rw[k], 4) + ' ' + k + '</b><small>' + usd(rw[k] * T.price / T.r) + '</small></div><button class="btn ghost sm" data-r="claim" data-k="' + k + '">Claim</button><button class="btn sm" data-r="restake" data-k="' + k + '">Restake</button></div>'; } });
    var ubRows = ub.map(function (u) { var i = S.unbonding.indexOf(u), pct = (u.total - u.left) / u.total * 100; return '<div class="li"><span class="dot ' + n.tokens[u.sym].cls + '">' + u.sym[0] + '</span><div class="m"><b>' + f(u.amt, 4) + ' ' + u.sym + '</b><small>' + u.left + ' days left of ' + u.total + '</small><div class="bar"><i style="width:' + pct + '%"></i></div></div><span class="pill y">Unstaking</span><button class="btn ghost sm" data-skip="' + i + '" title="Prototype shortcut">Skip 7d</button></div>'; }).join('');
    function tile(l, c, v) { return '<div class="tile"><small><i style="background:' + c + '"></i>' + l + '</small><strong>' + usd(v).replace('≈ ', '') + '</strong><em>on ' + n.name + '</em></div>'; }
    view.innerHTML = '<div class="wrap wide"><h1>Dashboard</h1><p class="sub">Every balance by state, on ' + n.name + '. Switch network to see the others.</p>' +
      (S.connected ? '' : '<p class="note">Connect a wallet to see your positions. <button class="btn ghost sm" id="cw" style="display:inline-block;margin-left:8px">Connect</button></p>') +
      '<div class="tiles">' + tile('Available', '#3ecf8e', avail) + tile('Staked', '#e8546a', staked) + tile('Unstaking', '#f5b73b', unb) + tile('In pools', '#7a5af8', pool) + tile('Rewards', '#5b8def', rew) + '</div>' +
      '<h2 class="sect">Balances</h2><div class="list">' + rows + '</div>' +
      '<h2 class="sect">Unstaking</h2><div class="list">' + (ubRows || '<p class="empty">Nothing unbonding. Regular unstakes show up here with a countdown.</p>') + '</div>' +
      '<h2 class="sect">Pool positions</h2><div class="list">' + (lpRows || '<p class="empty">No pool positions yet.</p>') + '</div>' +
      '<h2 class="sect">Rewards</h2><div class="list">' + (rwRows || '<p class="empty">No rewards to claim.</p>') + '</div>' +
      '<h2 class="sect">Activity <button class="btn ghost sm" id="reset">Reset demo</button></h2><div class="list">' + (S.activity.length ? S.activity.map(function (a) { return '<div class="li"><div class="m"><b>' + esc(a.t) + '</b><small>' + NETS[a.net].name + '</small></div><small style="color:var(--dim)">' + ago(a.at) + '</small></div>'; }).join('') : '<p class="empty">No activity yet. Stake something!</p>') + '</div></div>';
    function pos(sym, v, st, pc, cls) { return '<div class="li"><span class="dot ' + cls + '">' + sym[0] + '</span><div class="m"><b>' + sym + '</b><small>' + usd(v * priceOf(sym)).replace('≈ ', '') + '</small></div><div class="r"><b>' + f(v, 4) + '</b></div><span class="pill ' + pc + '">' + st + '</span></div>'; }
    var cw = $('#cw'); if (cw) cw.onclick = connectModal;
    $('#reset').onclick = function () { S = fresh(); S.connected = true; amount = ''; save(); renderHeader(); render(); toast('Demo reset', 'Balances restored'); };
    $$('[data-r]').forEach(function (b) {
      b.onclick = function () {
        var k = b.dataset.k, v = S.rewards[S.net][k], base = baseOf(k);
        if (b.dataset.r === 'claim') { S.bal[S.net][base] += v * (1 / n.tokens[base].r); recordTx('claim', [v, k], [v / n.tokens[base].r, base]); log('Claimed ' + f(v, 4) + ' ' + k + ' rewards'); }
        else { S.bal[S.net][k] += v; recordTx('restake', [v, k], [v, k]); log('Restaked ' + f(v, 4) + ' ' + k); }
        S.rewards[S.net][k] = 0; save(); toast(b.dataset.r === 'claim' ? 'Rewards claimed' : 'Rewards restaked', f(v, 4) + ' ' + k); renderDashboard();
      };
    });
    $$('[data-skip]').forEach(function (b) {
      b.onclick = function () {
        var u = S.unbonding[b.dataset.skip]; u.left = Math.max(0, u.left - 7);
        if (!u.left) { S.bal[u.net][u.sym] += u.amt; S.unbonding.splice(b.dataset.skip, 1); recordTx('unlock', null, [u.amt, u.sym], { note: 'Unbonding period finished', ub: u.id }); log('Unstaked ' + f(u.amt, 4) + ' ' + u.sym + ' unlocked'); toast('Unstake complete', f(u.amt, 4) + ' ' + u.sym + ' is now available'); }
        save(); renderDashboard();
      };
    });
  }

  /* defi */
  var MIN_CLAIM = 0.01; // dollars
  var DEMO_SPEED = 1440; // pool rewards accrue a day's worth every minute so the demo shows movement
  function pkey(p) { return S.net + p.id; }
  function wOf(p) { return p.w || [50, 50]; }
  function wLabel(p) { return wOf(p)[0] + ' / ' + wOf(p)[1]; }
  function dotCls(sym) { var n = net(), b = baseOf(sym); return n.tokens[b] && n.tokens[b].stk === sym ? 'g' : (n.tokens[sym] ? n.tokens[sym].cls : ''); }
  function pairDots(p, big) { var st = big ? ' style="width:40px;height:40px"' : ''; return '<span class="pair"><span class="dot ' + dotCls(p.a) + '"' + st + '>' + p.a[0] + '</span><span class="dot ' + dotCls(p.b) + '"' + st + '>' + p.b[0] + '</span></span>'; }
  function posOf(p) { var k = pkey(p); return { a: S.lp[k] || 0, b: S.lpB[k] || 0 }; }
  function posVal(p) { var x = posOf(p); return x.a * priceOf(p.a) + x.b * priceOf(p.b); }
  function tvlOf(p) { return (p.tvl || 0) + posVal(p); }
  function shareOf(p) { var t = tvlOf(p); return t ? posVal(p) / t : 0; }
  function rewOf(p) { var k = pkey(p); return S.lpR[k] || (S.lpR[k] = { a: 0, b: 0, t: Date.now() }); }
  function rewVal(p) { var r = rewOf(p); return r.a * priceOf(p.a) + r.b * priceOf(p.b); }
  function accrue(p) {
    var r = rewOf(p), now = Date.now(), dt = Math.max(0, (now - (r.t || now)) / 1000); r.t = now;
    if (!p.apr || posVal(p) <= 0) return;
    var dv = posVal(p) * p.apr / 100 / 31536000 * dt * DEMO_SPEED, w = wOf(p);
    r.a += dv * w[0] / 100 / priceOf(p.a); r.b += dv * w[1] / 100 / priceOf(p.b);
  }
  function accrueAll() { pools().forEach(accrue); }
  // amounts that keep the pool's weights at the current price, given one side
  function pairFor(p, side, amt) {
    var w = wOf(p), pa = priceOf(p.a), pb = priceOf(p.b);
    if (side === 'a') { var total = amt * pa / (w[0] / 100); return { a: amt, b: total * w[1] / 100 / pb }; }
    var tot = amt * pb / (w[1] / 100); return { a: tot * w[0] / 100 / pa, b: amt };
  }
  function money(v) { return v >= 1e6 ? '$' + (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? '$' + (v / 1e3).toFixed(1) + 'K' : '$' + f(v, 2); }

  function renderDefi() {
    accrueAll(); save();
    var n = net(), D = S.defi, all = pools(), mine = S.connected ? all.filter(function (p) { return posVal(p) > 0 || rewVal(p) > 0; }) : [], list = D.tab === 'mine' ? mine : all;
    var myV = mine.reduce(function (s, p) { return s + posVal(p); }, 0), myR = mine.reduce(function (s, p) { return s + rewVal(p); }, 0);
    function row(p) {
      var v = S.connected ? posVal(p) : 0, r = S.connected ? rewVal(p) : 0, w = wOf(p);
      return '<button class="pl-row" data-pool="' + p.id + '"><span class="pl-pool">' + pairDots(p) + '<span><b>' + p.a + ' / ' + p.b + '</b><small>' + (p.mine ? 'Created by you' : n.name) + '</small></span></span>' +
        '<span class="pl-w"><span class="wbar"><i style="width:' + w[0] + '%"></i></span><small>' + w[0] + '% · ' + w[1] + '%</small></span>' +
        '<span class="num ' + (p.apr ? 'apr' : 'mutd') + '">' + (p.apr ? p.apr.toFixed(1) + '%' : 'New') + '</span>' +
        '<span class="num">' + money(tvlOf(p)) + '</span>' +
        '<span class="num">' + (v ? money(v) : '<span class="mutd">—</span>') + '</span>' +
        '<span class="num">' + (r ? '<span class="apr">' + money(r) + '</span>' : '<span class="mutd">—</span>') + '</span>' +
        '<span class="pl-chev" aria-hidden="true">›</span></button>';
    }
    function card(p) {
      var v = S.connected ? posVal(p) : 0, r = S.connected ? rewVal(p) : 0, w = wOf(p);
      return '<div class="pl-card"><button class="pl-card-main" data-pool="' + p.id + '"><span class="pl-pool">' + pairDots(p, true) + '<span><b>' + p.a + ' / ' + p.b + '</b><small>' + w[0] + '% ' + p.a + ' · ' + w[1] + '% ' + p.b + '</small></span></span>' +
        '<span class="wbar"><i style="width:' + w[0] + '%"></i></span>' +
        '<span class="pl-kv"><span><small>APR</small><b class="' + (p.apr ? 'apr' : 'mutd') + '">' + (p.apr ? p.apr.toFixed(1) + '%' : 'New') + '</b></span><span><small>TVL</small><b>' + money(tvlOf(p)) + '</b></span>' +
        '<span><small>My liquidity</small><b>' + (v ? money(v) : '—') + '</b></span><span><small>Rewards</small><b class="' + (r ? 'apr' : '') + '">' + (r ? money(r) : '—') + '</b></span></span></button>' +
        '<div class="pl-card-acts"><button class="btn sm" data-addp="' + p.id + '">Add liquidity</button><button class="btn ghost sm" data-trade="' + p.id + '">Trade pair</button></div></div>';
    }
    view.innerHTML = '<div class="wrap wide"><div class="dh"><div><h1>DeFi</h1><p class="sub">Provide two assets to a pool at its set weights and earn trading rewards on ' + n.name + '.</p></div><button class="btn sm" id="newPool">+ Create pool</button></div>' +
      (S.connected && mine.length ? '<div class="tiles"><div class="tile"><small><i style="background:#7a5af8"></i>My liquidity</small><strong>' + money(myV) + '</strong><em>' + mine.length + ' pool' + (mine.length > 1 ? 's' : '') + ' on ' + n.name + '</em></div><div class="tile"><small><i style="background:#3ecf8e"></i>Unclaimed rewards</small><strong id="myRew">' + money(myR) + '</strong><em>Claim or restake from a pool</em></div></div>' : '') +
      '<p class="note">Pools are not staking. Returns come from trading fees, and a pool’s mix can drift from holding the tokens yourself (impermanent loss).</p>' +
      '<div class="pl-tools"><div class="seg" role="tablist"><button role="tab" data-ptab="all" class="' + (D.tab === 'all' ? 'on' : '') + '" aria-selected="' + (D.tab === 'all') + '">All pools<span class="n">' + all.length + '</span></button><button role="tab" data-ptab="mine" class="' + (D.tab === 'mine' ? 'on' : '') + '" aria-selected="' + (D.tab === 'mine') + '">My pools<span class="n">' + mine.length + '</span></button></div>' +
      '<div class="seg vt" role="group" aria-label="Layout"><button data-pview="list" class="' + (D.view === 'list' ? 'on' : '') + '" aria-pressed="' + (D.view === 'list') + '" aria-label="List view">' + ICON.list + '</button><button data-pview="card" class="' + (D.view === 'card' ? 'on' : '') + '" aria-pressed="' + (D.view === 'card') + '" aria-label="Card view">' + ICON.grid + '</button></div></div>' +
      (!list.length ? '<div class="list"><div class="empty" style="padding:40px 20px">' + (S.connected ? 'You’re not providing liquidity to any pool yet.' : 'Connect a wallet to see your pools.') + '<br><button class="btn sm" id="seeAll" style="margin-top:14px;display:inline-block">' + (S.connected ? 'Browse all pools' : 'Connect wallet') + '</button></div></div>'
        : D.view === 'list' ? '<div class="list pl-list"><div class="pl-row pl-head"><span>Pool</span><span>Weights</span><span class="num">APR</span><span class="num">TVL</span><span class="num">My liquidity</span><span class="num">Rewards</span><span></span></div>' + list.map(row).join('') + '</div>'
        : '<div class="pl-cards">' + list.map(card).join('') + '</div>') + '</div>';
    $('#newPool').onclick = createPoolModal;
    $$('[data-ptab]').forEach(function (b) { b.onclick = function () { S.defi.tab = b.dataset.ptab; save(); renderDefi(); }; });
    $$('[data-pview]').forEach(function (b) { b.onclick = function () { S.defi.view = b.dataset.pview; save(); renderDefi(); }; });
    $$('[data-pool]').forEach(function (b) { b.onclick = function () { poolDetail(b.dataset.pool); }; });
    $$('[data-addp]').forEach(function (b) { b.onclick = function () { addModal(b.dataset.addp); }; });
    $$('[data-trade]').forEach(function (b) { b.onclick = function () { tradeModal(b.dataset.trade); }; });
    var sa = $('#seeAll'); if (sa) sa.onclick = function () { if (!S.connected) return connectModal(); S.defi.tab = 'all'; save(); renderDefi(); };
  }
  function poolById(id) { return pools().filter(function (x) { return x.id === id; })[0]; }

  var detailTimer = null;
  function poolDetail(id) {
    var p = poolById(id); if (!p) return; accrue(p); save();
    var x = posOf(p), v = posVal(p), r = rewOf(p), rv = S.connected ? rewVal(p) : 0, w = wOf(p), has = S.connected && v > 0;
    openModal('<button class="x" aria-label="Close">×</button><div class="pd-h">' + pairDots(p, true) + '<div><h2 style="margin:0">' + p.a + ' / ' + p.b + '</h2><p class="sub" style="margin:2px 0 0">' + (p.mine ? 'Created by you · ' : '') + net().name + '</p></div></div>' +
      '<div class="wbar lg"><i style="width:' + w[0] + '%"></i></div><div class="row" style="margin-top:6px"><span>' + w[0] + '% ' + p.a + '</span><span>' + w[1] + '% ' + p.b + '</span></div>' +
      '<div class="pd-stats"><div><small>APR</small><b class="' + (p.apr ? 'apr' : '') + '">' + (p.apr ? p.apr.toFixed(1) + '%' : 'New') + '</b></div><div><small>TVL</small><b>' + money(tvlOf(p)) + '</b></div><div><small>Your share</small><b>' + (has ? (shareOf(p) * 100).toFixed(shareOf(p) > .1 ? 1 : 4) + '%' : '—') + '</b></div></div>' +
      (S.connected ? '<div class="pd-box"><div class="row"><span>Your liquidity</span><b>' + (has ? usd(v).replace('≈ ', '') : '—') + '</b></div>' + (has ? '<div class="pd-amts"><span><span class="dot ' + dotCls(p.a) + '">' + p.a[0] + '</span>' + f(x.a, 4) + ' ' + p.a + '</span><span><span class="dot ' + dotCls(p.b) + '">' + p.b[0] + '</span>' + f(x.b, 4) + ' ' + p.b + '</span></div>' : '<p class="pd-empty">You don’t have liquidity in this pool yet. Add both assets to start earning.</p>') + '</div>' +
      '<div class="pd-box"><div class="row"><span>Unclaimed rewards</span><b id="pdRv" class="apr">' + usd(rv).replace('≈ ', '') + '</b></div><div class="pd-amts"><span id="pdRa">' + f(r.a, 6) + ' ' + p.a + '</span><span id="pdRb">' + f(r.b, 6) + ' ' + p.b + '</span></div>' +
        '<div class="pd-acts"><button class="btn ghost sm" id="pdClaim"' + (rv >= MIN_CLAIM ? '' : ' disabled') + '>Claim</button><button class="btn sm" id="pdRestake"' + (rv >= MIN_CLAIM && has ? '' : ' disabled') + '>Restake into pool</button></div>' +
        (rv < MIN_CLAIM ? '<p class="pd-empty" id="pdMin" style="margin-top:8px">You can claim once rewards reach $0.01.</p>' : '') +
        (p.apr ? '' : '<p class="pd-empty" style="margin-top:8px">New pools earn from trading fees once people trade the pair.</p>') + '</div>' : '<div class="pd-box pd-connect"><p>Connect a wallet to see your liquidity and rewards in this pool.</p><button class="btn sm" id="pdConnect">Connect wallet</button></div>') +
      '<div class="pd-main"><button class="btn" id="pdAdd">Add liquidity</button><button class="btn ghost" id="pdTrade">Trade pair</button>' + (has ? '<button class="btn ghost" id="pdRemove">Remove</button>' : '') + '</div>');
    $('#pdAdd').onclick = function () { addModal(p.id); };
    var pc = $('#pdConnect'); if (pc) pc.onclick = connectModal;
    $('#pdTrade').onclick = function () { tradeModal(p.id); };
    var rm = $('#pdRemove'); if (rm) rm.onclick = function () { removeModal(p.id); };
    if ($('#pdClaim')) { $('#pdClaim').onclick = function () { claimPool(p, false); }; $('#pdRestake').onclick = function () { claimPool(p, true); }; }
    clearInterval(detailTimer);
    detailTimer = setInterval(function () {
      var el = $('#pdRv'); if (!el) return clearInterval(detailTimer);
      accrue(p); var rr = rewOf(p); el.textContent = usd(rewVal(p)).replace('≈ ', ''); $('#pdRa').textContent = f(rr.a, 6) + ' ' + p.a; $('#pdRb').textContent = f(rr.b, 6) + ' ' + p.b;
      if (rewVal(p) >= MIN_CLAIM) { $('#pdClaim').disabled = false; if (posVal(p) > 0) $('#pdRestake').disabled = false; var mm = $('#pdMin'); if (mm) mm.remove(); }
    }, 1000);
  }
  function claimPool(p, restake) {
    accrue(p); var r = rewOf(p), a = r.a, b = r.b, k = pkey(p); if (rewVal(p) < MIN_CLAIM) return;
    if (restake) { S.lp[k] = (S.lp[k] || 0) + a; S.lpB[k] = (S.lpB[k] || 0) + b; recordTx('restake', [[a, p.a], [b, p.b]], [[a, p.a], [b, p.b]], { pool: p.a + ' / ' + p.b, note: 'Pool rewards added back at ' + wLabel(p) }); }
    else { S.bal[S.net][p.a] += a; S.bal[S.net][p.b] += b; recordTx('claim', null, [[a, p.a], [b, p.b]], { pool: p.a + ' / ' + p.b, note: 'Pool rewards' }); }
    r.a = 0; r.b = 0; r.t = Date.now(); log((restake ? 'Restaked ' : 'Claimed ') + p.a + ' / ' + p.b + ' rewards'); save();
    toast(restake ? 'Rewards restaked' : 'Rewards claimed', f(a, 4) + ' ' + p.a + ' + ' + f(b, 4) + ' ' + p.b + (restake ? ' added to the pool' : ' sent to your wallet'));
    poolDetail(p.id); render();
  }

  // two-asset deposit at the pool's weights (used by Add liquidity and Create pool)
  function depositFields(p, st, onChange) {
    var A = S.bal[S.net][p.a] || 0, B = S.bal[S.net][p.b] || 0;
    return '<div class="dep"><div class="row"><span>' + wOf(p)[0] + '% · ' + p.a + '</span><span>Available <b>' + f(A, 4) + '</b> <button class="max" data-max="a">MAX</button></span></div><div class="dep-in"><span class="dot ' + dotCls(p.a) + '">' + p.a[0] + '</span><input class="amt" id="depA" inputmode="decimal" placeholder="0.00" aria-label="' + p.a + ' amount" value="' + (st.a ? +st.a.toFixed(6) : '') + '"><span class="u">' + p.a + '</span></div></div>' +
      '<div class="dep-plus" aria-hidden="true">+</div>' +
      '<div class="dep"><div class="row"><span>' + wOf(p)[1] + '% · ' + p.b + '</span><span>Available <b>' + f(B, 4) + '</b> <button class="max" data-max="b">MAX</button></span></div><div class="dep-in"><span class="dot ' + dotCls(p.b) + '">' + p.b[0] + '</span><input class="amt" id="depB" inputmode="decimal" placeholder="0.00" aria-label="' + p.b + ' amount" value="' + (st.b ? +st.b.toFixed(6) : '') + '"><span class="u">' + p.b + '</span></div></div>';
  }
  function bindDeposit(p, st, upd) {
    function set(side, v) { var x = pairFor(p, side, v); st.a = x.a; st.b = x.b; if (side === 'a') $('#depB').value = v ? +x.b.toFixed(6) : ''; else $('#depA').value = v ? +x.a.toFixed(6) : ''; upd(); }
    $('#depA').oninput = function () { this.value = this.value.replace(/[^0-9.]/g, ''); set('a', parseFloat(this.value) || 0); };
    $('#depB').oninput = function () { this.value = this.value.replace(/[^0-9.]/g, ''); set('b', parseFloat(this.value) || 0); };
    $$('[data-max]').forEach(function (b) { b.onclick = function () {
      var A = S.bal[S.net][p.a] || 0, B = S.bal[S.net][p.b] || 0, fromA = pairFor(p, 'a', A), x = fromA.b <= B ? fromA : pairFor(p, 'b', B);
      st.a = +x.a.toFixed(6); st.b = +x.b.toFixed(6); $('#depA').value = st.a || ''; $('#depB').value = st.b || ''; upd();
    }; });
  }
  function depositCheck(p, st) {
    var A = S.bal[S.net][p.a] || 0, B = S.bal[S.net][p.b] || 0;
    if (!st.a || !st.b) return ['Enter an amount', ''];
    if (st.a > A + 1e-9) return ['Insufficient ' + p.a, 'You have ' + f(A, 4) + ' ' + p.a + '. This pool needs both assets at ' + wLabel(p) + '.'];
    if (st.b > B + 1e-9) return ['Insufficient ' + p.b, 'You have ' + f(B, 4) + ' ' + p.b + '. This pool needs both assets at ' + wLabel(p) + '.'];
    return null;
  }
  function addModal(id) {
    if (!S.connected) return connectModal();
    var p = poolById(id), st = { a: 0, b: 0 };
    openModal('<button class="x" aria-label="Close">×</button><h2>Add liquidity</h2><p class="sub">' + p.a + ' / ' + p.b + ' takes both assets at ' + wOf(p)[0] + '% / ' + wOf(p)[1] + '% by value. Enter either amount and the other fills in.</p>' +
      depositFields(p, st) + '<div class="kv"><div class="row"><span>Deposit value</span><b id="depV">$0.00</b></div><div class="row"><span>Pool APR</span><b>' + aprLabel(p) + '</b></div><div class="row"><span>Network fee</span><b>~' + net().fee + ' ' + net().gas + '</b></div></div>' +
      '<p class="err" id="depErr" hidden></p><button class="btn" id="depGo" disabled>Enter an amount</button>');
    function upd() {
      var c = depositCheck(p, st), g = $('#depGo'), e = $('#depErr');
      $('#depV').textContent = usd(st.a * priceOf(p.a) + st.b * priceOf(p.b)).replace('≈ ', '');
      g.disabled = !!c; g.textContent = c ? c[0] : 'Add ' + f(st.a, 4) + ' ' + p.a + ' + ' + f(st.b, 4) + ' ' + p.b; e.hidden = !(c && c[1]); if (c) e.textContent = c[1];
    }
    bindDeposit(p, st, upd); $('#depA').focus();
    $('#depGo').onclick = function () {
      var a = st.a, b = st.b;
      openModal('<div class="center"><div class="spinner"></div><h2>Waiting for signature</h2><p>Confirm the transaction in your wallet…</p></div>');
      setTimeout(function () {
        var k = pkey(p); accrue(p); S.bal[S.net][p.a] -= a; S.bal[S.net][p.b] -= b; S.lp[k] = (S.lp[k] || 0) + a; S.lpB[k] = (S.lpB[k] || 0) + b;
        recordTx('poolAdd', [[a, p.a], [b, p.b]], null, { pool: p.a + ' / ' + p.b, note: 'Deposited at ' + wLabel(p) });
        log('Added liquidity to ' + p.a + ' / ' + p.b); save(); closeModal(); render(); toast('Liquidity added', f(a, 4) + ' ' + p.a + ' + ' + f(b, 4) + ' ' + p.b + ' in ' + p.a + ' / ' + p.b);
      }, 1300);
    };
  }
  function removeModal(id) {
    var p = poolById(id), x = posOf(p), pct = 50;
    function draw() {
      openModal('<button class="x" aria-label="Close">×</button><h2>Remove liquidity</h2><p class="sub">You get both assets back in the pool’s current mix.</p>' +
        '<div class="tiers four" role="radiogroup" aria-label="Amount to remove">' + [25, 50, 75, 100].map(function (v) { return '<button role="radio" aria-checked="' + (pct === v) + '" data-pct="' + v + '" class="' + (pct === v ? 'on' : '') + '"><b>' + v + '%</b></button>'; }).join('') + '</div>' +
        '<div class="kv"><div class="row"><span>You receive</span><b>' + f(x.a * pct / 100, 4) + ' ' + p.a + '</b></div><div class="row"><span></span><b>' + f(x.b * pct / 100, 4) + ' ' + p.b + '</b></div><div class="row"><span>Value</span><b>' + usd(posVal(p) * pct / 100).replace('≈ ', '') + '</b></div></div>' +
        (pct === 100 && rewVal(p) > 0 ? '<p class="note" style="margin-top:12px">Unclaimed rewards stay claimable after you remove liquidity.</p>' : '') + '<button class="btn" id="rmGo">Remove ' + pct + '%</button>');
      $$('[data-pct]').forEach(function (b) { b.onclick = function () { pct = +b.dataset.pct; draw(); }; });
      $('#rmGo').onclick = function () {
        var k = pkey(p), a = x.a * pct / 100, b = x.b * pct / 100; accrue(p);
        S.lp[k] -= a; S.lpB[k] -= b; if (S.lp[k] < 1e-9) S.lp[k] = 0; if (S.lpB[k] < 1e-9) S.lpB[k] = 0; S.bal[S.net][p.a] += a; S.bal[S.net][p.b] += b;
        recordTx('poolRemove', null, [[a, p.a], [b, p.b]], { pool: p.a + ' / ' + p.b, note: 'Removed ' + pct + '%' });
        log('Removed ' + pct + '% from ' + p.a + ' / ' + p.b); save(); closeModal(); render(); toast('Liquidity removed', f(a, 4) + ' ' + p.a + ' + ' + f(b, 4) + ' ' + p.b + ' returned');
      };
    }
    draw();
  }
  function tradeModal(id) {
    if (!S.connected) return connectModal();
    var p = poolById(id), st = { from: p.a, to: p.b, amt: '' }, FEE = 0.003;
    function draw(caret) {
      var a = parseFloat(st.amt) || 0, bal = S.bal[S.net][st.from] || 0, liq = tvlOf(p), val = a * priceOf(st.from), impact = liq ? val / liq * 100 : 100;
      var out = a * priceOf(st.from) / priceOf(st.to) * (1 - FEE) * (1 - Math.min(impact, 50) / 100);
      var err = !a ? '' : a > bal + 1e-9 ? 'You only have ' + f(bal, 4) + ' ' + st.from + '.' : impact > 30 ? 'Not enough liquidity in this pool for a trade this size.' : '';
      openModal('<button class="x" aria-label="Close">×</button><h2>Trade ' + p.a + ' / ' + p.b + '</h2><p class="sub">Swap against this pool at its current price.</p>' +
        '<div class="box"><div class="row"><span>You pay</span><span>Available <b>' + f(bal, 4) + ' ' + st.from + '</b> <button class="max" id="trMax">MAX</button></span></div><div class="amt-row"><span class="tok"><span class="dot ' + dotCls(st.from) + '">' + st.from[0] + '</span>' + st.from + '</span><input class="amt" id="trIn" inputmode="decimal" placeholder="0.00" aria-label="Amount to pay" value="' + esc(st.amt) + '"></div><div class="row"><span></span><span>' + usd(val) + '</span></div></div>' +
        '<button class="arrow flip" id="trFlip" aria-label="Switch direction">' + ICON.swap + '</button>' +
        '<div class="box"><div class="row"><span>You receive</span><span>Balance <b>' + f(S.bal[S.net][st.to] || 0, 4) + ' ' + st.to + '</b></span></div><div class="amt-row"><span class="tok"><span class="dot ' + dotCls(st.to) + '">' + st.to[0] + '</span>' + st.to + '</span><input class="amt out" readonly tabindex="-1" aria-label="You receive" value="' + (a ? f(out, 6) : '') + '" placeholder="0.00"></div><div class="row"><span></span><span>' + usd(out * priceOf(st.to)) + '</span></div></div>' +
        '<div class="kv"><div class="row"><span>Price</span><b>1 ' + st.from + ' = ' + f(priceOf(st.from) / priceOf(st.to), 6) + ' ' + st.to + '</b></div><div class="row"><span>Price impact</span><b class="' + (impact > 5 ? 'warn' : '') + '">' + (a ? (impact < 0.01 ? '<0.01' : impact.toFixed(2)) + '%' : '—') + '</b></div><div class="row"><span>Trading fee</span><b>0.3% · paid to liquidity providers</b></div></div>' +
        '<p class="err"' + (err ? '' : ' hidden') + '>' + err + '</p><button class="btn" id="trGo"' + (!a || err ? ' disabled' : '') + '>' + (!a ? 'Enter an amount' : err ? 'Can’t trade' : 'Swap ' + st.from + ' for ' + st.to) + '</button>');
      var inp = $('#trIn'); if (caret != null) { inp.focus(); inp.setSelectionRange(caret, caret); }
      inp.oninput = function () { var c = inp.selectionStart; st.amt = inp.value.replace(/[^0-9.]/g, ''); draw(c); };
      $('#trMax').onclick = function () { st.amt = String(+bal.toFixed(6)); draw(); };
      $('#trFlip').onclick = function () { var t = st.from; st.from = st.to; st.to = t; st.amt = ''; draw(); };
      $('#trGo').onclick = function () {
        openModal('<div class="center"><div class="spinner"></div><h2>Waiting for signature</h2><p>Confirm the swap in your wallet…</p></div>');
        setTimeout(function () {
          S.bal[S.net][st.from] -= a; S.bal[S.net][st.to] = (S.bal[S.net][st.to] || 0) + out;
          var sh = shareOf(p); if (sh > 0) { var r = rewOf(p), fv = val * FEE * sh, w = wOf(p); r.a += fv * w[0] / 100 / priceOf(p.a); r.b += fv * w[1] / 100 / priceOf(p.b); }
          recordTx('swap', [a, st.from], [out, st.to], { pool: p.a + ' / ' + p.b, note: 'Pool fee 0.3%' });
          log('Swapped ' + f(a, 4) + ' ' + st.from + ' for ' + st.to); save(); closeModal(); render(); toast('Swap complete', f(a, 4) + ' ' + st.from + ' → ' + f(out, 4) + ' ' + st.to);
        }, 1300);
      };
    }
    draw();
  }

  /* create pool */
  function createPoolModal() {
    if (!S.connected) return connectModal();
    var n = net(), syms = [];
    Object.keys(n.tokens).forEach(function (k) { syms.push(n.tokens[k].stk); syms.push(k); });
    var WEIGHTS = [[50, 50, 'Balanced'], [80, 20, 'Weighted']];
    var st = { a: syms[0], b: syms[1], w: 0 }, dep = { a: 0, b: 0 };
    function taken() { var w = WEIGHTS[st.w]; return pools().some(function (p) { var pw = wOf(p); return (p.a === st.a && p.b === st.b && pw[0] === w[0]) || (p.a === st.b && p.b === st.a && pw[0] === w[1]); }); }
    function draw() {
      var w = WEIGHTS[st.w], p = { id: '_new', a: st.a, b: st.b, w: [w[0], w[1]] }, same = st.a === st.b, ex = !same && taken();
      openModal('<button class="x" aria-label="Close">×</button><h2>Create a pool</h2><p class="sub">Pick a pair and its weights, then seed both assets at the current price.</p>' +
        '<div class="two"><label><span class="lbl2">Token A</span><select class="pair-sel" id="cpA">' + syms.map(function (x) { return '<option' + (x === st.a ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></label>' +
        '<label><span class="lbl2">Token B</span><select class="pair-sel" id="cpB">' + syms.map(function (x) { return '<option' + (x === st.b ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></label></div>' +
        '<span class="lbl2">Pool weights</span><div class="tiers two-up" role="radiogroup" aria-label="Pool weights">' + WEIGHTS.map(function (x, i) { return '<button role="radio" aria-checked="' + (st.w === i) + '" data-w="' + i + '" class="' + (st.w === i ? 'on' : '') + '"><b>' + x[0] + ' / ' + x[1] + '</b><small>' + x[2] + ' · ' + x[0] + '% ' + st.a + ', ' + x[1] + '% ' + st.b + '</small></button>'; }).join('') + '</div>' +
        (same || ex ? '<p class="err">' + (same ? 'Pick two different tokens.' : 'A ' + st.a + ' / ' + st.b + ' pool at ' + w[0] + ' / ' + w[1] + ' already exists. Add liquidity to it in DeFi instead.') + '</p><button class="btn" disabled>' + (same ? 'Pick two tokens' : 'Pool exists') + '</button>'
          : '<span class="lbl2">Initial liquidity</span>' + depositFields(p, dep) + '<div class="kv"><div class="row"><span>Starting price</span><b>1 ' + st.a + ' = ' + f(priceOf(st.a) / priceOf(st.b), 6) + ' ' + st.b + '</b></div><div class="row"><span>Pool value</span><b id="depV">$0.00</b></div><div class="row"><span>Network fee</span><b>~' + n.fee + ' ' + n.gas + '</b></div></div><p class="err" id="depErr" hidden></p><button class="btn" id="depGo" disabled>Enter an amount</button>'));
      $('#cpA').onchange = function () { st.a = this.value; dep = { a: 0, b: 0 }; draw(); };
      $('#cpB').onchange = function () { st.b = this.value; dep = { a: 0, b: 0 }; draw(); };
      $$('[data-w]').forEach(function (b) { b.onclick = function () { st.w = +b.dataset.w; dep = { a: 0, b: 0 }; draw(); }; });
      if (same || ex) return;
      function upd() { var c = depositCheck(p, dep), g = $('#depGo'), e = $('#depErr'); $('#depV').textContent = usd(dep.a * priceOf(p.a) + dep.b * priceOf(p.b)).replace('≈ ', ''); g.disabled = !!c; g.textContent = c ? c[0] : 'Create pool'; e.hidden = !(c && c[1]); if (c) e.textContent = c[1]; }
      bindDeposit(p, dep, upd);
      $('#depGo').onclick = function () {
        var a = dep.a, b = dep.b;
        openModal('<div class="center"><div class="spinner"></div><h2>Creating pool</h2><p>Confirm the transaction in your wallet…</p></div>');
        setTimeout(function () {
          var id = 'c' + Date.now().toString(36), np = { id: id, a: st.a, b: st.b, w: [w[0], w[1]], apr: null, tvl: 0, base: baseOf(st.a), mine: true };
          S.customPools[S.net].push(np); S.bal[S.net][st.a] -= a; S.bal[S.net][st.b] -= b; S.lp[S.net + id] = a; S.lpB[S.net + id] = b;
          recordTx('poolCreate', [[a, st.a], [b, st.b]], null, { pool: st.a + ' / ' + st.b, note: 'Weights ' + w[0] + ' / ' + w[1] });
          log('Created ' + st.a + ' / ' + st.b + ' pool'); S.defi.tab = 'mine'; save(); closeModal(); render(); toast('Pool created', st.a + ' / ' + st.b + ' at ' + w[0] + ' / ' + w[1] + ' is live');
        }, 1400);
      };
    }
    draw();
  }

  /* transactions */
  function amtList(x) { if (!x) return []; return Array.isArray(x[0]) ? x : [x]; }
  function amtTxt(x) { return amtList(x).map(function (a) { return f(a[0], 4) + ' ' + a[1]; }).join(' + '); }
  function priceOn(nk, sym) { var saved = S.net; S.net = nk; var p = priceOf(sym); S.net = saved; return p; }
  function txStatus(t) {
    if (t.type === 'unstake') { var u = S.unbonding.filter(function (x) { return x.id === t.ub; })[0]; return u ? ['Unbonding · ' + u.left + 'd left', 'y'] : ['Completed', 'g']; }
    return ['Confirmed', 'g'];
  }
  function txMatches(t) {
    var F = S.txf, q = F.q.trim().toLowerCase();
    if (F.g !== 'all' && TX[t.type].g !== F.g) return false;
    if (F.net !== 'all' && t.net !== F.net) return false;
    if (q && (TX[t.type].l + ' ' + amtTxt(t.give) + ' ' + amtTxt(t.get) + ' ' + (t.pool || '') + ' ' + t.hash + ' ' + NETS[t.net].name).toLowerCase().indexOf(q) < 0) return false;
    return true;
  }
  function txAmounts(t) {
    if (t.type === 'restake') return amtList(t.get).map(function (a) { return '<span class="pos">+' + f(a[0], 4) + ' ' + a[1] + '</span>'; }).join(' ') + '<i>restaked</i>';
    var out = amtList(t.give).map(function (a) { return '<span class="neg">−' + f(a[0], 4) + ' ' + a[1] + '</span>'; }), inn = amtList(t.get).map(function (a) { return '<span class="pos">+' + f(a[0], 4) + ' ' + a[1] + '</span>'; });
    return out.concat(out.length && inn.length ? ['<i>→</i>'] : []).concat(inn).join(' ');
  }
  function renderTransactions() {
    var F = S.txf, all = S.txs, list = all.filter(txMatches);
    if (!S.connected) {
      view.innerHTML = '<div class="wrap wide"><h1>Transactions</h1><p class="sub">Every stake, unstake, pool and reward action from your wallet.</p><div class="list"><div class="empty" style="padding:40px 20px">Connect a wallet to see its transaction history.<br><button class="btn sm" id="cwT" style="margin-top:14px;display:inline-block">Connect wallet</button></div></div></div>';
      $('#cwT').onclick = connectModal; return;
    }
    function cnt(g) { return all.filter(function (t) { return (g === 'all' || TX[t.type].g === g) && (F.net === 'all' || t.net === F.net); }).length; }
    var staked = 0, rewards = 0;
    all.forEach(function (t) { if (t.type === 'stake') staked += t.give[0] * priceOn(t.net, t.give[1]); if (t.type === 'claim' || t.type === 'restake') amtList(t.get).forEach(function (x) { rewards += x[0] * priceOn(t.net, x[1]); }); });
    view.innerHTML = '<div class="wrap wide"><div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap"><div style="flex:1;min-width:220px"><h1>Transactions</h1><p class="sub">Every stake, unstake, pool and reward action from this wallet, on every network.</p></div><button class="btn ghost sm" id="txCsv" style="margin-top:4px;display:inline-flex;align-items:center;gap:8px">' + ICON.dl + 'Export CSV</button></div>' +
      '<div class="tiles"><div class="tile"><small><i style="background:#e8546a"></i>Transactions</small><strong>' + all.length + '</strong><em>Across ' + Object.keys(NETS).length + ' networks</em></div>' +
      '<div class="tile"><small><i style="background:#3ecf8e"></i>Total staked</small><strong>' + usd(staked).replace('≈ ', '') + '</strong><em>At today’s prices</em></div>' +
      '<div class="tile"><small><i style="background:#5b8def"></i>Rewards used</small><strong>' + usd(rewards).replace('≈ ', '') + '</strong><em>Claimed or restaked</em></div>' +
      '<div class="tile"><small><i style="background:#f5b73b"></i>Unbonding now</small><strong>' + S.unbonding.length + '</strong><em>Regular unstakes in progress</em></div></div>' +
      '<div class="tx-tools"><div class="seg" role="group" aria-label="Filter by type">' + [['all', 'All'], ['staking', 'Staking'], ['unstaking', 'Unstaking'], ['pools', 'Pools'], ['trades', 'Swaps'], ['rewards', 'Rewards']].map(function (x) { return '<button data-g="' + x[0] + '" class="' + (F.g === x[0] ? 'on' : '') + '" aria-pressed="' + (F.g === x[0]) + '">' + x[1] + '<span class="n">' + cnt(x[0]) + '</span></button>'; }).join('') + '</div>' +
      '<label class="sel"><select id="txNet" aria-label="Network"><option value="all">All networks</option>' + Object.keys(NETS).map(function (k) { return '<option value="' + k + '"' + (F.net === k ? ' selected' : '') + '>' + NETS[k].name + '</option>'; }).join('') + '</select>' + ICON.chev + '</label>' +
      '<label class="tx-search">' + ICON.search + '<input id="txQ" placeholder="Search token, pool or hash" value="' + esc(F.q) + '" aria-label="Search transactions"></label></div>' +
      '<div class="list"><div class="tx-head"><span></span><span>Type</span><span>Amount</span><span>Network</span><span>Status</span><span>Time</span></div>' +
      (list.length ? list.map(function (t) {
        var M = TX[t.type], s2 = txStatus(t), N = NETS[t.net];
        return '<button class="tx" data-tx="' + t.id + '"><span class="tx-ic ' + M.c + '">' + ICON[M.ic] + '</span><span><b>' + M.l + '</b><small>' + (t.pool ? esc(t.pool) + ' · ' : '') + '<span class="hash">' + t.hash.slice(0, 6) + '…' + t.hash.slice(-4) + '</span></small></span>' +
          '<span class="amts">' + txAmounts(t) + '</span><span class="tx-net"><img class="chain" src="chains/' + t.net + '.svg" alt="" width="20" height="20">' + N.name + '</span><span><span class="pill ' + s2[1] + '">' + s2[0] + '</span></span><span><small style="color:var(--fg);font-size:13.5px">' + ago(t.at) + '</small><small>' + new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '</small></span></button>';
      }).join('') : '<div class="empty" style="padding:36px 20px">No transactions match these filters.<br><button class="btn ghost sm" id="txClear" style="margin-top:12px;display:inline-block">Clear filters</button></div>') +
      '<div class="tx-foot"><span>Showing ' + list.length + ' of ' + all.length + '</span><span>Newest first</span></div></div></div>';
    $$('[data-g]').forEach(function (b) { b.onclick = function () { S.txf.g = b.dataset.g; save(); renderTransactions(); }; });
    $('#txNet').onchange = function () { S.txf.net = this.value; save(); renderTransactions(); };
    var q = $('#txQ'); q.oninput = function () { var pos = q.selectionStart; S.txf.q = q.value; save(); renderTransactions(); var n2 = $('#txQ'); n2.focus(); n2.setSelectionRange(pos, pos); };
    var c = $('#txClear'); if (c) c.onclick = function () { S.txf = { g: 'all', net: 'all', q: '' }; save(); renderTransactions(); };
    $$('[data-tx]').forEach(function (b) { b.onclick = function () { txDetail(S.txs.filter(function (t) { return t.id === b.dataset.tx; })[0]); }; });
    $('#txCsv').onclick = function () {
      var rows = [['Date', 'Type', 'Network', 'Sent', 'Received', 'Pool', 'Status', 'Fee', 'Hash']].concat(list.map(function (t) { return [new Date(t.at).toISOString(), TX[t.type].l, NETS[t.net].name, amtTxt(t.give), amtTxt(t.get), t.pool || '', txStatus(t)[0], t.fee, t.hash]; }));
      var blob = new Blob([rows.map(function (r) { return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(','); }).join('\n')], { type: 'text/csv' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'pstake-transactions.csv'; document.body.appendChild(a); a.click(); a.remove();
      toast('Export ready', list.length + ' transactions saved as CSV');
    };
  }
  function txDetail(t) {
    var M = TX[t.type], s2 = txStatus(t), N = NETS[t.net];
    function row(l, v) { return v ? '<div class="row"><span>' + l + '</span><b>' + v + '</b></div>' : ''; }
    openModal('<button class="x" aria-label="Close">×</button><div style="display:flex;gap:12px;align-items:center"><span class="tx-ic ' + M.c + '" style="width:44px;height:44px">' + ICON[M.ic] + '</span><div><h2 style="margin:0">' + M.l + '</h2><p class="sub" style="margin:2px 0 0">' + dateFmt(t.at) + '</p></div></div>' +
      '<div class="kv">' + row('Status', '<span class="pill ' + s2[1] + '">' + s2[0] + '</span>') + row('Network', N.name) + (t.type === 'restake' ? row('Restaked', amtTxt(t.get)) : row('Sent', amtTxt(t.give)) + row('Received', amtTxt(t.get))) + row('Pool', t.pool && esc(t.pool)) + row('Details', t.note && esc(t.note)) + row('Network fee', t.fee) + row('Wallet', N.addr) + '</div>' +
      '<span class="lbl2">Transaction hash</span><div class="hash-full"><span>' + t.hash + '</span><button id="cpHash" aria-label="Copy hash">' + ICON.copy + '</button></div>' +
      '<button class="btn ghost" id="txExp" style="width:100%;margin-top:14px;display:flex;align-items:center;justify-content:center;gap:8px">' + ICON.out + 'View on explorer</button>');
    $('#cpHash').onclick = function () { try { navigator.clipboard.writeText(t.hash).catch(function () {}); } catch (e) {} toast('Hash copied', t.hash.slice(0, 18) + '…'); };
    $('#txExp').onclick = function () { toast('Prototype', 'Explorer link is disabled in this demo'); };
  }

  /* prototype menu (bottom left): jump to any screen or flow */
  if (window.protoMenu) protoMenu(function () {
    function go(v, tab) { closeModal(); closePops(); S.view = v; if (tab) { S.tab = tab; amount = ''; } save(); render(); }
    var other = S.net === 'bnb' ? 'persistence' : 'bnb';
    return [
      { title: 'Jump to a screen', items: [
        { label: 'Stake', run: function () { go('staking', 'stake'); } },
        { label: 'Unstake', hint: 'Flash or regular', run: function () { go('staking', 'unstake'); } },
        { label: 'DeFi pools', run: function () { go('defi'); } },
        { label: 'Dashboard', run: function () { go('dashboard'); } },
        { label: 'Transactions', hint: 'Full history', run: function () { go('transactions'); } }] },
      { title: 'Try a flow', items: [
        { label: S.connected ? 'Connect a different wallet' : 'Connect a wallet', run: function () { closeModal(); S.connected = false; save(); renderHeader(); render(); connectModal(); } },
        { label: 'Switch to ' + NETS[other].name, run: function () { closeModal(); $('.net-opt[data-net="' + other + '"]').click(); } },
        { label: 'Add to a pool', run: function () { go('defi'); addModal(POOLS[S.net][0].id); } },
        { label: 'Create a pool', run: function () { go('defi'); createPoolModal(); } },
        { label: 'Trade a pair', run: function () { go('defi'); tradeModal(POOLS[S.net][0].id); } }] },
      { title: 'Demo data', items: [
        { label: 'Reset demo data', run: function () { closeModal(); S = fresh(); amount = ''; save(); renderHeader(); render(); toast('Demo reset', 'Balances and activity are back to the start'); } }] }
    ];
  });

  renderHeader(); render();
})();
