(function () {
  // Nav: switch to the inset bar once the page has scrolled
  var nav = document.querySelector('[data-nav]');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('is-open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  // Market filter chips
  var filter = document.querySelector('[data-filter]');
  var rows = document.querySelectorAll('[data-markets] li');
  var empty = document.querySelector('[data-empty]');
  if (filter) {
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var cat = btn.getAttribute('data-cat');
      filter.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var shown = 0;
      rows.forEach(function (row) {
        var match = cat === 'all' || row.getAttribute('data-cat') === cat;
        row.hidden = !match;
        if (match) shown++;
      });
      empty.hidden = shown > 0;
    });
  }

  // Chart tabs
  var tabs = document.querySelector('[data-tabs]');
  var tabLabel = document.querySelector('[data-tab-label]');
  if (tabs) {
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      tabs.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      });
      tabLabel.textContent = btn.textContent + ' · NVDA-PERP';
    });
  }

  // Waitlist form (no backend yet): validate and confirm
  var form = document.querySelector('[data-signup]');
  if (form) {
    var msg = document.querySelector('[data-signup-msg]');
    var input = form.querySelector('input');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = input.value.trim() !== '' && input.checkValidity();
      form.classList.toggle('is-invalid', !ok);
      msg.classList.toggle('is-error', !ok);
      msg.classList.toggle('is-success', ok);
      msg.textContent = ok
        ? 'You’re on the list. We’ll email you when access opens.'
        : 'Enter a valid email address.';
      if (ok) form.reset();
    });
  }
})();
