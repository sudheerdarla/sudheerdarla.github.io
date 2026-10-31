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

  // Markets strip: clone the list to fill the width and scroll it left, seamlessly.
  var marquee = document.querySelector('[data-marquee]');
  if (marquee && !reduceMotion) {
    var inner = marquee.querySelector('.marquee__inner');
    var group = inner.querySelector('.marquee__group');
    var build = function () {
      inner.querySelectorAll('.marquee__group[data-clone]').forEach(function (c) { c.remove(); });
      marquee.classList.add('is-live');
      var gw = group.offsetWidth;
      if (!gw) return;
      var copies = Math.ceil(marquee.clientWidth / gw) + 1;
      for (var n = 0; n < copies; n++) {
        var c = group.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.setAttribute('data-clone', '');
        inner.appendChild(c);
      }
      marquee.style.setProperty('--gw', gw + 'px');
      marquee.style.setProperty('--dur', (gw / 45).toFixed(1) + 's'); // ~45px per second
    };
    var settle = function () { document.fonts && document.fonts.ready ? document.fonts.ready.then(build) : build(); };
    settle();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 200); });
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

  // "A trade you can check": the asset tabs swap the receipt card.
  // BTC is a real recorded trade. ETH and SOL are labelled illustrations until
  // real recorded trades are added here.
  var receipt = document.querySelector('[data-receipt]');
  var assetTabs = document.querySelector('[data-assets]');
  if (receipt && assetTabs) {
    var DATA = {
      btc: { sample: false, title: 'Bitcoin · public trade', chip: 'Recorded example', logo: 'bitcoin.svg', name: 'Bitcoin', type: 'BTC perpetual',
        desc: 'A BTC perpetual buy recorded on Hyperliquid. Check the price, size and time yourself.',
        price: '$78,630.00', size: '0.0141 BTC', notional: '≈ $1,108.68', time: '09 Sep 2026, 20:38:52 IST', hash: '0x1449d17524…e39abd42',
        note: 'Trade price from the public feed. The explorer shows the submitted order, including its limit price.' },
      eth: { sample: true, title: 'Ethereum · illustrative trade', chip: 'Illustrative example', logo: 'ethereum.png', name: 'Ethereum', type: 'ETH perpetual',
        desc: 'An ETH perpetual buy, shown as an illustration of the receipt. A recorded public trade will replace it.',
        price: '$3,412.00', size: '0.325 ETH', notional: '≈ $1,108.90', time: 'Sample, not a real fill', hash: 'Sample, not a real transaction',
        note: 'Illustrative values for layout only. They are not a recorded trade.' },
      sol: { sample: true, title: 'Solana · illustrative trade', chip: 'Illustrative example', logo: 'solana.svg', name: 'Solana', type: 'SOL perpetual',
        desc: 'A SOL perpetual buy, shown as an illustration of the receipt. A recorded public trade will replace it.',
        price: '$178.50', size: '6.2 SOL', notional: '≈ $1,106.70', time: 'Sample, not a real fill', hash: 'Sample, not a real transaction',
        note: 'Illustrative values for layout only. They are not a recorded trade.' }
    };
    var fields = {};
    receipt.querySelectorAll('[data-r]').forEach(function (el) { fields[el.getAttribute('data-r')] = el; });
    var chipEl = receipt.querySelector('[data-r-chip]');
    var iconEl = receipt.querySelector('[data-r-icon]');
    var linkEl = receipt.querySelector('[data-r-link]');
    var current = 'btc';
    var paint = function (key) {
      var d = DATA[key];
      Object.keys(fields).forEach(function (k) { fields[k].textContent = d[k]; });
      iconEl.src = 'assets/logos/' + d.logo;
      iconEl.classList.toggle('is-tall', d.logo.slice(-4) === '.png');
      chipEl.classList.toggle('chip-recorded--sample', d.sample);
      linkEl.hidden = d.sample;
    };
    assetTabs.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-asset]');
      if (!btn || btn.getAttribute('data-asset') === current) return;
      current = btn.getAttribute('data-asset');
      if (reduceMotion) { paint(current); return; }
      receipt.classList.add('is-swapping');
      setTimeout(function () { paint(current); receipt.classList.remove('is-swapping'); }, 180);
    });
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
