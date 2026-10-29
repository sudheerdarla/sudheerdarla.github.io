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
    document.querySelectorAll('img[data-dark]').forEach(function (el) { el.setAttribute('src', el.getAttribute(t === 'dark' ? 'data-dark' : 'data-light')); });
  }
  applyTheme(root.getAttribute('data-theme') || 'light', false);
  if (toggle) toggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- Tabs ---------- */
  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  function select(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t, false); });
    t.addEventListener('keydown', function (e) {
      var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
      if (j === null) return;
      e.preventDefault();
      select(tabs[(j + tabs.length) % tabs.length], true);
    });
  });
  /* Open a tab from the URL, e.g. #writing */
  var fromHash = document.getElementById('t-' + location.hash.slice(1));
  if (fromHash && tabs.indexOf(fromHash) > -1) select(fromHash, false);

})();
