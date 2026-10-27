(function () {
  var order = ['pstake', 'comdex', 'captl'];
  var host = document.getElementById('cs-host');
  var next = document.getElementById('cs-next');
  var links = document.querySelectorAll('[data-cs]');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = null;
  var ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var side = document.querySelector('.side');
  var ind = document.querySelector('.side-ind');
  function moveInd() {
    if (!side || !ind) return;
    var a = side.querySelector('a[aria-current="page"]');
    if (!a || window.innerWidth <= 960) { side.classList.remove('has-ind'); return; }
    var sr = side.getBoundingClientRect(), ar = a.getBoundingClientRect();
    ind.style.transform = 'translateY(' + (ar.top - sr.top) + 'px)';
    ind.style.height = ar.height + 'px';
    side.classList.add('has-ind');
  }
  window.addEventListener('resize', moveInd);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);

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
    moveInd();
    if (!reduce) {
      host.classList.remove('enter'); void host.offsetWidth; host.classList.add('enter');
      clearTimeout(paint.t); paint.t = setTimeout(function () { host.classList.remove('enter'); }, 1000);
    }
  }

  function show(key, moveFocus) {
    if (key === current) return;
    var first = current === null;
    current = key;
    function done() {
      paint(key);
      host.classList.remove('swap');
      if (!first) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (moveFocus) { var h = document.getElementById('cs-title'); if (h) h.focus({ preventScroll: true }); }
      }
    }
    if (first || reduce) { done(); return; }
    host.classList.add('swap');
    setTimeout(done, 160);
  }

  window.addEventListener('hashchange', function () { show(keyFromHash(), true); });
  show(keyFromHash(), false);
})();

/* Lightbox */
(function () {
  var lb = document.getElementById('lb');
  if (!lb || typeof lb.showModal !== 'function') return;
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var trigger = null;
  function close() { if (lb.open) lb.close(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.cs-zoom');
    if (!b) return;
    var src = b.querySelector('img');
    trigger = b;
    img.src = b.getAttribute('data-full');
    img.alt = src.alt;
    cap.textContent = src.alt;
    lb.showModal();
    document.body.classList.add('lb-open');
    document.getElementById('lb-close').focus();
  });
  document.getElementById('lb-close').addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') close(); });
  lb.addEventListener('close', function () {
    document.body.classList.remove('lb-open');
    img.removeAttribute('src');
    if (trigger) { trigger.focus({ preventScroll: true }); trigger = null; }
  });
})();
