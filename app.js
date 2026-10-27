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
  if (toggle) toggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- Accordions ---------- */
  document.querySelectorAll('[data-acc]').forEach(function (acc) {
    var head = acc.querySelector('.sec-head');
    head.addEventListener('click', function () {
      var open = acc.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

})();
