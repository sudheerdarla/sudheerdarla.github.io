(function () {
  var order = ['pstake', 'comdex', 'captl'];
  var studies = {
    pstake: { title: 'pSTAKE Finance', html: function () { return window.PSTAKE_CS || ''; } },
    comdex: { title: 'Comdex', html: function () { return window.COMDEX_CS || ''; } },
    captl: { title: 'CAPTL', html: function () { return window.CAPTL_CS || ''; } }
  };
  var host = document.getElementById('cs-host');
  var next = document.getElementById('cs-next');
  var box = document.getElementById('cs-main');
  var links = document.querySelectorAll('[data-cs]');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = null;
  var arrow = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function keyFromHash() { var k = (location.hash || '').replace('#', ''); return studies[k] ? k : 'pstake'; }

  function paint(key) {
    host.innerHTML = studies[key].html();
    var n = order[(order.indexOf(key) + 1) % order.length];
    next.innerHTML = '<a href="index.html" class="eyebrow">All work</a><a href="#' + n + '" data-next><span class="eyebrow">Next</span><b>' + studies[n].title + '</b>' + arrow + '</a>';
    links.forEach(function (a) {
      if (a.getAttribute('data-cs') === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = studies[key].title + ' case study — Sudheer Darla';
  }

  function show(key, fromUser) {
    if (key === current) return;
    var first = current === null;
    current = key;
    var done = function () {
      paint(key);
      host.classList.remove('swap');
      if (!first) {
        var top = box.getBoundingClientRect().top + window.scrollY - 16;
        if (window.scrollY > top || window.innerWidth <= 900) window.scrollTo({ top: Math.max(0, top - (window.innerWidth <= 900 ? 60 : 0)), behavior: 'auto' });
        if (fromUser) box.focus({ preventScroll: true });
      }
    };
    if (first || reduce) { done(); return; }
    host.classList.add('swap');
    setTimeout(done, 180);
  }

  window.addEventListener('hashchange', function () { show(keyFromHash(), true); });
  show(keyFromHash(), false);
})();
