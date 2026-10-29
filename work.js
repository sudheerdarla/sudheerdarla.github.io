(function () {
  var order = ['pstake', 'comdex', 'captl'];
  var host = document.getElementById('cs-host');
  var next = document.getElementById('cs-next');
  var links = document.querySelectorAll('[data-cs]');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = null;
  var ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';


  /* Eased scroll for the section menu; the scroll-spy waits until it lands */
  var gliding = false;
  function glideTo(el, done) {
    var start = window.scrollY, end = Math.max(0, el.getBoundingClientRect().top + start - 24);
    var dist = end - start;
    if (reduce || Math.abs(dist) < 2) { window.scrollTo({ top: end, behavior: 'instant' }); done(); return; }
    var dur = Math.min(900, Math.max(450, Math.abs(dist) * 0.35)), t0 = null;
    gliding = true;
    function ease(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    function stop() { gliding = false; window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); }
    window.addEventListener('wheel', stop, { passive: true }); window.addEventListener('touchstart', stop, { passive: true });
    (function step(ts) {
      if (!gliding) return;
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur);
      window.scrollTo({ top: start + dist * ease(k), behavior: 'instant' });
      if (k < 1) requestAnimationFrame(step); else { stop(); done(); }
    })(performance.now());
  }

  var spy = null;
  function buildSub(key) {
    var old = document.querySelector('.side-sub'); if (old) old.remove();
    if (spy) { spy.disconnect(); spy = null; }
    var li = document.querySelector('.side a[data-cs="' + key + '"]').parentNode;
    var ul = document.createElement('ul');
    ul.className = 'side-sub';
    ul.setAttribute('aria-label', window.CASES[key].name + ' sections');
    window.CASES[key].sections.forEach(function (s, i) {
      var n = (i < 9 ? '0' : '') + (i + 1), id = key + '-s' + (i + 1);
      var item = document.createElement('li');
      item.innerHTML = '<a href="#' + id + '" data-sec="' + id + '"><span>' + s.label + '</span></a>';
      ul.appendChild(item);
    });
    li.appendChild(ul);
    var links = ul.querySelectorAll('a');
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var t = document.getElementById(a.getAttribute('data-sec'));
        if (!t) return;
        var sec = t.closest('section');
        links.forEach(function (x) { x.classList.toggle('is-on', x === a); if (x === a) x.setAttribute('aria-current', 'location'); else x.removeAttribute('aria-current'); });
        glideTo(sec, function () { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); });
        if (history.replaceState) history.replaceState(null, '', '#' + a.getAttribute('data-sec'));
      });
    });
    if ('IntersectionObserver' in window) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('data-sec')] = a; });
      spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !gliding) {
            links.forEach(function (a) { a.classList.remove('is-on'); a.removeAttribute('aria-current'); });
            var a = map[e.target.querySelector('h2').id];
            if (a) { a.classList.add('is-on'); a.setAttribute('aria-current', 'location'); }
          }
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      document.querySelectorAll('#cs-host .cs-sec').forEach(function (s) { spy.observe(s); });
    }
  }

  function keyFromHash() { var k = (location.hash || '').slice(1).split('-')[0]; return window.CASES[k] ? k : (current || 'pstake'); }

  function paint(key) {
    host.innerHTML = window.renderCase(key);
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) host.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
    var n = order[(order.indexOf(key) + 1) % order.length];
    next.innerHTML = '<a href="index.html"><span class="cs-label">All work</span></a>' +
      '<a href="#' + n + '"><span class="cs-label">Next</span><b>' + window.CASES[n].name + '</b>' + ARROW + '</a>';
    links.forEach(function (a) {
      if (a.getAttribute('data-cs') === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = window.CASES[key].name + ' case study — Sudheer Darla';
    buildSub(key);
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
  var trigger = null;
  function close() { if (lb.open) lb.close(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.cs-zoom');
    if (!b) return;
    var src = b.querySelector('img');
    trigger = b;
    img.src = src.getAttribute('src');
    img.alt = src.alt;
    img.classList.toggle('is-framed', src.classList.contains('is-framed'));
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

/* Mobile case study menu */
(function () {
  var btn = document.getElementById('menu-btn'), menu = document.getElementById('cs-menu'), scrim = document.getElementById('menu-scrim');
  if (!btn || !menu) return;
  function set(open, focusBtn) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close case studies menu' : 'Case studies menu');
    menu.classList.toggle('is-open', open);
    if (scrim) scrim.hidden = !open;
    if (open) { var cur = menu.querySelector('[aria-current="page"]') || menu.querySelector('a'); if (cur) cur.focus({ preventScroll: true }); }
    else if (focusBtn) btn.focus();
  }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true', false); });
  if (scrim) scrim.addEventListener('click', function () { set(false, true); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a') && btn.getAttribute('aria-expanded') === 'true') set(false, false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') set(false, true); });
  window.addEventListener('resize', function () { if (window.innerWidth > 960 && btn.getAttribute('aria-expanded') === 'true') set(false, false); });
})();
