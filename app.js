(function () {
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var toggle = document.getElementById('theme');
  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0b0b0c' : '#ffffff');
    toggle.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    /* The label names the mode you will switch to. */
    document.getElementById('theme-label').textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (persist) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  applyTheme(root.getAttribute('data-theme') || 'light', false);
  /* Follow the device setting until the visitor picks a theme themselves. */
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) {}
      if (!saved) applyTheme(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }
  toggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- Case studies ---------- */
  function slices(prefix, n, alts, dims) {
    var out = '';
    for (var i = 0; i < n; i++) {
      out += '<img width="' + dims[i][0] + '" height="' + dims[i][1] + '" alt="' + alts[i] + '" decoding="async"' +
        (i ? ' loading="lazy"' : '') + ' src="img/' + prefix + (i + 1) + '.jpg">';
    }
    return out;
  }
  var studies = {
    pstake: {
      title: 'pSTAKE Finance', sub: 'Web3 staking platform',
      bleed: true,
      html: window.PSTAKE_CS || ''
    },
    comdex: {
      title: 'Comdex', sub: 'Commodity Trading platform',
      bleed: true,
      html: window.COMDEX_CS || ''
    },
    captl: {
      title: 'CAPTL', sub: 'Investor portfolio platform',
      bleed: true,
      html: window.CAPTL_CS || ''
    }
  };

  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var closeBtn = document.getElementById('close');
  var mainEl = document.getElementById('main');
  var lastFocus = null;

  function openStudy(key, fromUser) {
    var s = studies[key];
    if (!s) return;
    document.getElementById('d-title').textContent = s.title;
    document.getElementById('d-sub').textContent = s.sub;
    var body = document.getElementById('d-body');
    body.innerHTML = s.html;
    body.classList.toggle('bleed', !!s.bleed);
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    scrim.classList.add('on');
    document.body.classList.add('panel-open');
    drawer.scrollTop = 0;
    mainEl.setAttribute('inert', '');
    if (history.replaceState) history.replaceState(null, '', '#' + key);
    if (fromUser !== false) { lastFocus = document.activeElement; closeBtn.focus({ preventScroll: true }); }
  }
  function closeStudy() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('on');
    document.body.classList.remove('panel-open');
    mainEl.removeAttribute('inert');
    if (history.replaceState) history.replaceState(null, '', location.pathname);
    if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
  }
  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { openStudy(b.getAttribute('data-open')); });
  });
  closeBtn.addEventListener('click', closeStudy);
  scrim.addEventListener('click', closeStudy);
  document.addEventListener('keydown', function (e) {
    if (!drawer.classList.contains('open')) return;
    if (e.key === 'Escape') { closeStudy(); return; }
    if (e.key === 'Tab') {
      var f = drawer.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Accordions ---------- */
  document.querySelectorAll('[data-acc]').forEach(function (acc) {
    var head = acc.querySelector('.sec-head');
    head.addEventListener('click', function () {
      var open = acc.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  var hash = (location.hash || '').replace('#', '');
  if (studies[hash]) openStudy(hash, false);
})();
