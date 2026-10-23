(function () {
  var root = document.documentElement;

  /* Theme */
  var toggle = document.getElementById('theme');
  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0d1823' : '#e3eae2');
    toggle.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    document.getElementById('theme-label').textContent = t === 'dark' ? 'Light' : 'Dark';
    toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (persist) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  applyTheme(root.getAttribute('data-theme') || 'light', false);
  toggle.addEventListener('click', function () { applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true); });

  /* Work preview follows hover and focus (desktop) */
  var prev = document.querySelectorAll('.pg-prev img');
  function showPreview(key) { prev.forEach(function (im) { im.classList.toggle('on', im.getAttribute('data-p') === key); }); }
  document.querySelectorAll('.pg-row').forEach(function (r) {
    var k = r.getAttribute('data-p');
    r.addEventListener('mouseenter', function () { showPreview(k); });
    r.addEventListener('focus', function () { showPreview(k); });
  });

  /* Case studies */
  var studies = {
    pstake: { title: 'pSTAKE Finance', sub: 'Web3 staking platform', html: function () { return window.PSTAKE_CS || ''; } },
    comdex: { title: 'Comdex', sub: 'Commodity Trading platform', html: function () { return window.COMDEX_CS || ''; } },
    captl: { title: 'CAPTL', sub: 'Investor portfolio platform', html: function () { return window.CAPTL_CS || ''; } }
  };
  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var closeBtn = document.getElementById('close');
  var mainEl = document.getElementById('main');
  var body = document.getElementById('d-body');
  var lastFocus = null;

  function openStudy(key, fromUser) {
    var s = studies[key]; if (!s) return;
    document.getElementById('d-title').textContent = s.title;
    document.getElementById('d-sub').textContent = s.sub;
    body.innerHTML = s.html();
    body.style.padding = '0';
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
  var hash = (location.hash || '').replace('#', '');
  if (studies[hash]) openStudy(hash, false);
})();
