/* pSTAKE prototype — all data is simulated, state lives in memory + localStorage. */
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
    bolt: '<svg class="bolt" viewBox="0 0 24 24" style="width:15px;height:15px;fill:currentColor;stroke:none"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>'
  };

  /* ---------- data ---------- */
  var NETS = {
    persistence: {
      name: 'Persistence', dot: 'P', cls: '', addr: 'persis…tc7zag', full: 'persistence1q9x8w7v6u5t4s3r2p0tc7zag',
      days: '21–25 days', fee: 0.0025, gas: 'OSMO', apy: 14.15, tvu: '45.38 ATOM',
      tokens: {
        OSMO: { stk: 'stkOSMO', price: 0.765, r: 0.999664, cls: 'v', apy: 12.4 },
        ATOM: { stk: 'stkATOM', price: 8.4, r: 1 / 1.046228, cls: 'b', apy: 14.15 }
      }
    },
    bnb: {
      name: 'BNB Smart Chain', dot: 'B', cls: 'y', addr: '0x7a3f…c91f', full: '0x7a3f1d2e9b4c58a60e7f3b21d9c4a8e5f6b7c91f',
      days: '7–10 days', fee: 0.0004, gas: 'BNB', apy: 5.8, tvu: '1,204.5 BNB',
      tokens: { BNB: { stk: 'stkBNB', price: 612, r: 0.9615, cls: 'y', apy: 5.8 } }
    }
  };
  var POOLS = {
    persistence: [
      { id: 'osmo', a: 'stkOSMO', b: 'OSMO', apr: 18.4, tvl: '$2.1M', base: 'OSMO' },
      { id: 'atom', a: 'stkATOM', b: 'ATOM', apr: 22.1, tvl: '$3.4M', base: 'ATOM' }
    ],
    bnb: [{ id: 'bnb', a: 'stkBNB', b: 'BNB', apr: 9.8, tvl: '$5.6M', base: 'BNB' }]
  };
  var WALLETS = [
    ['Metamask', '#f6851b', 1, 'Popular'], ['Binance Wallet', '#f3ba2f', 0, 'Popular'], ['Keplr Wallet', '#3b82c4', 0, 'Popular'],
    ['Math Wallet', '#2b2b33', 0, 'More wallets'], ['Coin98 Wallet', '#d9b92f', 0, 'More wallets'], ['Wallet Connect', '#3b99fc', 0, 'More wallets']
  ];

  function fresh() {
    return {
      net: 'persistence', connected: false, view: 'staking', tab: 'stake', tok: { stake: 'OSMO', unstake: 'OSMO' }, method: 'regular',
      bal: {
        persistence: { OSMO: 4.734655, stkOSMO: 12.330099, ATOM: 10, stkATOM: 0 },
        bnb: { BNB: 2.5, stkBNB: 0 }
      },
      unbonding: [], lp: {}, rewards: { persistence: { stkOSMO: 0.184, stkATOM: 0 }, bnb: { stkBNB: 0 } }, activity: []
    };
  }
  var S = fresh();
  try { var saved = JSON.parse(localStorage.getItem('pstake01')); if (saved && saved.bal) S = saved; } catch (e) {}
  function save() { try { localStorage.setItem('pstake01', JSON.stringify(S)); } catch (e) {} }

  /* ---------- helpers ---------- */
  var net = function () { return NETS[S.net]; };
  function f(n, d) { d = d == null ? 6 : d; return Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
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
  function ago(ms) { var s = (Date.now() - ms) / 1000; return s < 60 ? 'just now' : s < 3600 ? Math.floor(s / 60) + 'm ago' : Math.floor(s / 3600) + 'h ago'; }

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
    $('#netName').textContent = n.name; $('#netDot').textContent = n.dot; $('#netDot').className = 'dot ' + n.cls;
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
      if (a.dataset.a === 'copy') { try { navigator.clipboard.writeText(n.full); } catch (x) {} toast('Address copied', n.full.slice(0, 22) + '…'); }
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
      h += '<button class="wal" data-i="' + i + '"><span class="dot" style="background:' + w[1] + '">' + w[0][0] + '</span>' + w[0] + (w[2] ? '<span class="tag">Detected</span>' : '<span class="go">›</span>') + '</button>';
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
    ({ staking: renderStaking, defi: renderDefi, dashboard: renderDashboard })[S.view]();
  }
  $('#nav').addEventListener('click', function (e) {
    var b = e.target.closest('[data-view]'), a = e.target.closest('[data-ext]');
    if (a) { e.preventDefault(); toast('Prototype', 'External links are disabled in this demo'); return; }
    if (b) { S.view = b.dataset.view; $('#side').classList.remove('open'); save(); render(); window.scrollTo(0, 0); }
  });
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
      '<div class="info"><div class="row"><span>Exchange rate</span><b id="rate"></b></div>' +
      (isS ? '<div class="row"><span>Network fee</span><b>~' + n.fee + ' ' + n.gas + '</b></div>' : '') + '</div>' +
      (isS ? '' : '<p class="lbl">Unstaking method</p><button class="method" data-m="flash"><span class="radio"></span><div><strong>Flash Unstake ' + ICON.bolt + '</strong><small>Instantly · 0.5% fee</small></div><div class="r"><strong id="mFlash">0 ' + sel + '</strong><small>You receive</small></div></button>' +
        '<button class="method" data-m="regular"><span class="radio"></span><div><strong>Regular Unstake</strong><small>' + n.days + ' · 0% fee</small></div><div class="r"><strong id="mReg">~0 ' + sel + '</strong><small>You receive</small></div></button>') +
      '<p class="err" id="err" hidden></p><button class="btn" id="go"></button></div>' +
      '<div class="stats"><div class="stat"><small>APY</small><strong class="g">' + T.apy.toFixed(2) + '%</strong></div><div class="stat"><small>Total Value Unlocked (TVU)</small><strong>' + n.tvu + '</strong></div></div>' +
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
          if (!isS && !flash) { S.unbonding.push({ net: S.net, sym: sel, amt: out, total: 21, left: 21 }); log('Started unstake of ' + f(a, 4) + ' ' + from); toast('Unstake started', f(out, 4) + ' ' + sel + ' unlocks in ' + n.days); }
          else { B[to] += out; log((isS ? 'Staked ' : 'Flash unstaked ') + f(a, 4) + ' ' + from); toast(isS ? 'Stake confirmed' : 'Unstake complete', f(out) + ' ' + to + ' added to your balance'); }
          amount = ''; save(); closeModal(); renderStaking();
        }, 1400);
      };
    }
  }
  document.addEventListener('click', function (e) { if (!e.target.closest('.tok')) { var d = $('.dd'); if (d) d.remove(); } });

  /* dashboard */
  function renderDashboard() {
    var n = net(), B = S.bal[S.net], avail = 0, staked = 0, unb = 0, pool = 0, rew = 0, rows = '';
    Object.keys(n.tokens).forEach(function (k) {
      var T = n.tokens[k]; avail += B[k] * T.price; staked += B[T.stk] * T.price / T.r;
      rows += pos(k, B[k], 'Available', 'g', T.cls) + pos(T.stk, B[T.stk], 'Staked', '', 'g');
    });
    var ub = S.unbonding.filter(function (u) { return u.net === S.net; }); ub.forEach(function (u) { unb += u.amt * n.tokens[u.sym].price; });
    var lpRows = '';
    (POOLS[S.net]).forEach(function (p) { var v = (S.lp[S.net + p.id] || 0); if (v > 0) { var T = n.tokens[p.base]; pool += v * T.price / T.r; lpRows += '<div class="li"><span class="dot v">' + p.a[0] + '</span><div class="m"><b>' + p.a + ' / ' + p.b + '</b><small>' + p.apr + '% APR</small></div><div class="r"><b>' + f(v, 4) + ' ' + p.a + '</b><small>' + usd(v * T.price / T.r) + '</small></div><span class="pill">Pool</span></div>'; } });
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
        if (b.dataset.r === 'claim') { S.bal[S.net][base] += v * (1 / n.tokens[base].r); log('Claimed ' + f(v, 4) + ' ' + k + ' rewards'); }
        else { S.bal[S.net][k] += v; log('Restaked ' + f(v, 4) + ' ' + k); }
        S.rewards[S.net][k] = 0; save(); toast(b.dataset.r === 'claim' ? 'Rewards claimed' : 'Rewards restaked', f(v, 4) + ' ' + k); renderDashboard();
      };
    });
    $$('[data-skip]').forEach(function (b) {
      b.onclick = function () {
        var u = S.unbonding[b.dataset.skip]; u.left = Math.max(0, u.left - 7);
        if (!u.left) { S.bal[u.net][u.sym] += u.amt; S.unbonding.splice(b.dataset.skip, 1); log('Unstaked ' + f(u.amt, 4) + ' ' + u.sym + ' unlocked'); toast('Unstake complete', f(u.amt, 4) + ' ' + u.sym + ' is now available'); }
        save(); renderDashboard();
      };
    });
  }

  /* defi */
  function renderDefi() {
    var n = net();
    view.innerHTML = '<div class="wrap wide"><h1>DeFi</h1><p class="sub">Put your staked tokens to work in pools on ' + n.name + '.</p>' +
      '<p class="note">Pools are not staking. Returns vary with trading volume, and pool tokens can lose value relative to holding (impermanent loss).</p><div class="pools">' +
      POOLS[S.net].map(function (p) {
        var v = S.lp[S.net + p.id] || 0, T = n.tokens[p.base];
        return '<div class="pool"><div class="pair"><span class="dot v">' + p.a[0] + '</span><span class="dot ' + T.cls + '">' + p.b[0] + '</span></div><div class="m"><b>' + p.a + ' / ' + p.b + '</b><small>' + (v ? 'You have ' + f(v, 4) + ' ' + p.a + ' in pool' : 'Not in pool') + '</small></div>' +
          '<div class="c"><small>APR</small><b style="color:var(--grn)">' + p.apr + '%</b></div><div class="c"><small>TVL</small><b>' + p.tvl + '</b></div>' +
          '<button class="btn sm" data-add="' + p.id + '">Add</button>' + (v ? '<button class="btn ghost sm" data-rm="' + p.id + '">Remove</button>' : '') + '</div>';
      }).join('') + '</div></div>';
    $$('[data-add]').forEach(function (b) { b.onclick = function () { addModal(b.dataset.add); }; });
    $$('[data-rm]').forEach(function (b) {
      b.onclick = function () {
        var p = POOLS[S.net].filter(function (x) { return x.id === b.dataset.rm; })[0], v = S.lp[S.net + p.id];
        S.bal[S.net][p.a] += v; S.lp[S.net + p.id] = 0; log('Removed ' + f(v, 4) + ' ' + p.a + ' from pool'); save(); toast('Removed from pool', f(v, 4) + ' ' + p.a + ' returned'); renderDefi();
      };
    });
  }
  function addModal(id) {
    if (!S.connected) return connectModal();
    var p = POOLS[S.net].filter(function (x) { return x.id === id; })[0], bal = S.bal[S.net][p.a];
    openModal('<button class="x" aria-label="Close">×</button><h2>Add to ' + p.a + ' / ' + p.b + '</h2><p class="sub">Deposit ' + p.a + ' into the pool. ' + p.apr + '% APR.</p>' +
      '<div class="row"><span>Amount</span><span>Available <b>' + f(bal) + ' ' + p.a + '</b> <button class="max" id="m2">MAX</button></span></div><input class="mini" id="a2" inputmode="decimal" placeholder="0.00" autofocus>' +
      '<p class="err" id="e2" hidden></p>' +
      (bal <= 0 ? '<p class="note" style="margin-top:12px">You have no ' + p.a + '. Stake ' + p.b + ' first.</p><button class="btn" id="g2">Go to Staking</button>' : '<button class="btn" id="g2" disabled>Enter an amount</button>'));
    var inp = $('#a2'), g = $('#g2');
    if (bal <= 0) { g.onclick = function () { closeModal(); S.view = 'staking'; S.tab = 'stake'; save(); render(); }; return; }
    $('#m2').onclick = function () { inp.value = +bal.toFixed(6); upd(); };
    inp.oninput = upd;
    function upd() { var a = parseFloat(inp.value) || 0, e = $('#e2'); e.hidden = true; g.disabled = false;
      if (!a) { g.disabled = true; g.textContent = 'Enter an amount'; } else if (a > bal) { g.disabled = true; g.textContent = 'Insufficient balance'; e.hidden = false; e.textContent = 'You only have ' + f(bal) + ' ' + p.a + '.'; } else g.textContent = 'Add to pool'; }
    g.onclick = function () {
      var a = parseFloat(inp.value); openModal('<div class="center"><div class="spinner"></div><h2>Waiting for signature</h2><p>Confirm the transaction in your wallet…</p></div>');
      setTimeout(function () { S.bal[S.net][p.a] -= a; S.lp[S.net + p.id] = (S.lp[S.net + p.id] || 0) + a; log('Added ' + f(a, 4) + ' ' + p.a + ' to pool'); save(); closeModal(); toast('Added to pool', f(a, 4) + ' ' + p.a + ' now earning ' + p.apr + '% APR'); renderDefi(); }, 1300);
    };
  }

  renderHeader(); render();
})();
