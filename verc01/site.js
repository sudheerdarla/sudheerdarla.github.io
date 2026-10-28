/* Theme switcher (light by default) */
(function () {
  var root = document.documentElement;
  var btns = document.querySelectorAll('[data-theme-set]');
  function apply(t, persist) {
    root.setAttribute('data-theme', t);
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-theme-set') === t ? 'true' : 'false'); });
    if (persist) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  apply(root.getAttribute('data-theme') || 'light', false);
  btns.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-theme-set'), true); }); });
})();
