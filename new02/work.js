(function () {
  var order = ['pstake', 'comdex', 'captl'];
  var host = document.getElementById('cs-host');
  var next = document.getElementById('cs-next');
  var links = document.querySelectorAll('[data-cs]');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = null;
  var ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function keyFromHash() { var k = (location.hash || '').slice(1); return window.CASES[k] ? k : 'pstake'; }

  function paint(key) {
    host.innerHTML = window.renderCase(key);
    var n = order[(order.indexOf(key) + 1) % order.length];
    next.innerHTML = '<a href="index.html"><span class="cs-label">All work</span></a>' +
      '<a href="#' + n + '"><span class="cs-label">Next</span><b>' + window.CASES[n].name + '</b>' + ARROW + '</a>';
    links.forEach(function (a) {
      if (a.getAttribute('data-cs') === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = window.CASES[key].name + ' case study — Sudheer Darla';
  }

  function show(key, moveFocus) {
    if (key === current) return;
    var first = current === null;
    current = key;
    function done() {
      paint(key);
      host.classList.remove('swap');
      if (!first) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (moveFocus) { var h = document.getElementById('cs-title'); if (h) h.focus({ preventScroll: true }); }
      }
    }
    if (first || reduce) { done(); return; }
    host.classList.add('swap');
    setTimeout(done, 180);
  }

  window.addEventListener('hashchange', function () { show(keyFromHash(), true); });
  show(keyFromHash(), false);
})();
