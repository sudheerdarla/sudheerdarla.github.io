(function () {
  // Nav, as on zaro.ai: the rail is transparent at the top and gains a frosted
  // background and border once the page has scrolled. Its size never changes.
  var nav = document.querySelector('[data-nav]');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 64); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Desktop dropdown: opens on hover, click or keyboard focus; closes on leave, outside click or Escape
    var canHover = window.matchMedia('(hover: hover)').matches;
    var drops = nav.querySelectorAll('[data-dropdown]');
    var closeDrop = function (item) {
      item.classList.remove('is-open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
    };
    var openDrop = function (item) {
      drops.forEach(function (other) { if (other !== item) closeDrop(other); });
      item.classList.add('is-open');
      item.querySelector('button').setAttribute('aria-expanded', 'true');
    };
    drops.forEach(function (item) {
      var btn = item.querySelector('button');
      var timer, byHover = false;
      if (canHover) {
        item.addEventListener('mouseenter', function () { clearTimeout(timer); byHover = true; openDrop(item); });
        item.addEventListener('mouseleave', function () { timer = setTimeout(function () { closeDrop(item); }, 120); });
      }
      btn.addEventListener('click', function () {
        if (item.classList.contains('is-open') && !byHover) closeDrop(item); else openDrop(item);
        byHover = false;
      });
      item.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) closeDrop(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeDrop(item); btn.focus(); }
      });
    });
    document.addEventListener('click', function (e) {
      drops.forEach(function (item) { if (!item.contains(e.target)) closeDrop(item); });
    });

    // Phone menu: a full-screen sheet
    var toggle = nav.querySelector('.nav__toggle');
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('nav-locked', open);
      if (!open) {
        var drop = nav.querySelector('[data-sheet-drop]');
        if (drop) {
          drop.setAttribute('aria-expanded', 'false');
          document.getElementById(drop.getAttribute('aria-controls')).hidden = true;
        }
      }
    };
    nav.querySelectorAll('[data-nav-toggle]').forEach(function (b) {
      b.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    });
    nav.querySelectorAll('.nav__sheet a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    var sheetDrop = nav.querySelector('[data-sheet-drop]');
    if (sheetDrop) {
      sheetDrop.addEventListener('click', function () {
        var open = sheetDrop.getAttribute('aria-expanded') !== 'true';
        sheetDrop.setAttribute('aria-expanded', String(open));
        document.getElementById(sheetDrop.getAttribute('aria-controls')).hidden = !open;
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
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

  // Blog category filter
  var postFilter = document.querySelector('[data-filter-posts]');
  if (postFilter) {
    var posts = document.querySelectorAll('[data-posts] [data-cat]');
    postFilter.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var cat = btn.getAttribute('data-cat');
      postFilter.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      posts.forEach(function (post) {
        post.hidden = cat !== 'all' && post.getAttribute('data-cat') !== cat;
      });
    });
  }

  // Help centre search: filter the common questions as you type
  var search = document.querySelector('[data-search]');
  if (search) {
    var field = search.querySelector('input');
    var questions = document.querySelectorAll('[data-q]');
    var none = document.querySelector('[data-help-empty]');
    search.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('help-faq').scrollIntoView();
    });
    field.addEventListener('input', function () {
      var q = field.value.trim().toLowerCase();
      var shown = 0;
      questions.forEach(function (d) {
        var match = !q || d.textContent.toLowerCase().indexOf(q) !== -1;
        d.hidden = !match;
        d.open = match && q !== '';
        if (match) shown++;
      });
      none.hidden = shown > 0;
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
