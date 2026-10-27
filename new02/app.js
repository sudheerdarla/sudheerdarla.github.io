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


  /* ---------- Home rail navigation ---------- */
  var navLinks = document.querySelectorAll('.side-link[data-sec]');
  if (navLinks.length) {
    var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function setActive(id) {
      navLinks.forEach(function (a) {
        if (a.getAttribute('data-sec') === id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    }
    navLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('data-sec');
        var sec = document.getElementById(id);
        if (!sec) return;
        e.preventDefault();
        var head = sec.querySelector('.sec-head');
        if (!sec.classList.contains('open')) { sec.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
        setActive(id);
        sec.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        head.focus({ preventScroll: true });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      });
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: '-25% 0px -65% 0px' });
      document.querySelectorAll('.sec[id]').forEach(function (s) { io.observe(s); });
    }
    var start = (location.hash || '').slice(1);
    var target = start && document.getElementById(start);
    if (target && target.classList.contains('sec')) {
      if (!target.classList.contains('open')) { target.classList.add('open'); target.querySelector('.sec-head').setAttribute('aria-expanded', 'true'); }
      setActive(start);
    } else { setActive('projects'); }
  }
})();
