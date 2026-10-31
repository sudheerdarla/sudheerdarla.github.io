(function () {
  // Scale the fixed-size activity stage to fit narrower viewports.
  var fit = document.querySelector('[data-stage]');
  if (fit) {
    var stage = fit.firstElementChild;
    var resize = function () {
      stage.style.setProperty('--stage-scale', Math.min(1, fit.clientWidth / 1120));
    };
    resize();
    window.addEventListener('resize', resize);
  }

  // Step the highlight through the activity feed, skipping placeholder cards.
  var feed = document.querySelector('[data-feed]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (feed && !reduceMotion) {
    var cards = Array.prototype.filter.call(feed.children, function (el) {
      return !el.hasAttribute('aria-hidden');
    });
    var i = 0;
    setInterval(function () {
      cards[i].classList.remove('is-active');
      i = (i + 1) % cards.length;
      cards[i].classList.add('is-active');
    }, 2200);
  }

  // Fade cards (and section headings) up from below as they scroll into view.
  // Siblings in the same grid get a short stagger so a row cascades in.
  if ('IntersectionObserver' in window && !reduceMotion) {
    var targets = document.querySelectorAll(
      '.card, .split-head, .collage__title, .duo__copy, .section .display, .eyebrow + .display'
    );
    var groups = new Map();
    targets.forEach(function (el) {
      if (el.closest('.hero') || el.parentElement.closest('[data-reveal]')) return;
      el.setAttribute('data-reveal', '');
      var n = groups.get(el.parentElement) || 0;
      el.style.setProperty('--reveal-delay', Math.min(n, 4) * 90 + 'ms');
      groups.set(el.parentElement, n + 1);
    });
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  }

  // Segmented controls and tabs: single selection.
  document.querySelectorAll('[data-seg]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      group.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      });
    });
  });

  // Leverage slider: the scale marks 1×, 5×, 10×, 15×, 20× are evenly spaced.
  var lev = document.querySelector('[data-lev]');
  if (lev) {
    var stops = [1, 5, 10, 15, 20];
    var out = document.querySelector('[data-lev-out]');
    var fill = document.querySelector('[data-lev-fill]');
    var knob = document.querySelector('[data-lev-knob]');
    var liq = document.querySelector('[data-lev-liq]');
    var margin = document.querySelector('[data-lev-margin]');
    var entry = 198, amount = 10000;
    var position = function (v) {
      for (var s = 1; s < stops.length; s++) {
        if (v <= stops[s]) {
          var t = (v - stops[s - 1]) / (stops[s] - stops[s - 1]);
          return ((s - 1) + t) / (stops.length - 1);
        }
      }
      return 1;
    };
    var fmt = function (n, d) {
      return n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
    };
    var update = function () {
      var v = Number(lev.value);
      var pct = position(v) * 100;
      out.textContent = v;
      fill.style.width = pct + '%';
      knob.style.left = 'calc(' + pct + '% - 10px)';
      liq.textContent = '$' + (entry * (1 - 1 / v) + 4).toFixed(2);
      margin.textContent = '₹' + fmt(amount / v, 2);
    };
    lev.addEventListener('input', update);
    update();
  }

  // Waitlist form (no backend yet): validate and confirm.
  var form = document.querySelector('[data-signup]');
  if (form) {
    var msg = document.querySelector('[data-signup-msg]');
    var input = form.querySelector('input');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = input.checkValidity() && input.value.trim() !== '';
      form.classList.toggle('is-invalid', !ok);
      msg.classList.toggle('is-error', !ok);
      msg.classList.toggle('is-success', ok);
      msg.textContent = ok
        ? 'Thanks, you’re on the list. We’ll email you when early access opens.'
        : 'Enter a valid email address.';
      if (ok) form.reset();
    });
  }
})();
