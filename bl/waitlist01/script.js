(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hidden market grid. Marks go in random cells clear of the copy and the ring, at least three
  // cells apart, so the light only ever finds one at a time.
  var hero = document.querySelector('[data-hero]');
  var grid = document.querySelector('[data-grid]');
  if (hero && grid) {
    var CELL = 80, OX = 64, OY = 41;
    var MARKS = [
      ['anthropic', 'Anthropic', true], ['openai', 'OpenAI'], ['spacex', 'SpaceX'], ['nvidia', 'NVIDIA'],
      ['apple', 'Apple'], ['tesla', 'Tesla'], ['google', 'Google'], ['meta', 'Meta'],
      ['amazon', 'Amazon'], ['netflix', 'Netflix'], ['amd', 'AMD'], ['coinbase', 'Coinbase']
    ];
    var layer = grid.querySelector('[data-marks]');
    var placed = [];   // { col, row, el }

    var shuffle = function (a) {
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    };
    var place = function () {
      layer.innerHTML = '';
      placed = [];
      var hb = hero.getBoundingClientRect();
      var keepOut = ['.hero__copy', '.ring__img'].map(function (s) {
        var r = document.querySelector(s).getBoundingClientRect();
        return { l: r.left - hb.left - 24, t: r.top - hb.top - 24, r: r.right - hb.left + 24, b: r.bottom - hb.top + 24 };
      });
      var cells = [];
      for (var row = 0; OY + (row + 1) * CELL <= hb.height - 8; row++) {
        for (var col = 0; OX + (col + 1) * CELL <= hb.width - 8; col++) {
          var x = OX + col * CELL, y = OY + row * CELL;
          var clear = keepOut.every(function (k) { return x + CELL < k.l || x > k.r || y + CELL < k.t || y > k.b; });
          if (clear) cells.push([col, row]);
        }
      }
      shuffle(cells);
      shuffle(MARKS.slice()).forEach(function (m) {
        var spot = cells.find(function (c) {
          return placed.every(function (p) { return Math.max(Math.abs(p.col - c[0]), Math.abs(p.row - c[1])) >= 3; });
        });
        if (!spot) return;
        var el = document.createElement('div');
        el.className = 'mark' + (m[2] ? ' mark--wide' : '');
        el.style.left = OX + spot[0] * CELL + 'px';
        el.style.top = OY + spot[1] * CELL + 'px';
        el.innerHTML = '<img src="assets/logos/' + m[0] + '.svg" alt="" width="30" height="30">';
        el.title = m[1];
        layer.appendChild(el);
        placed.push({ col: spot[0], row: spot[1], el: el });
      });
    };

    // The light glides to the centre of the cell under the pointer
    var target = { x: 0, y: 0 }, now = { x: 0, y: 0 }, active = null, raf = 0;
    var setActive = function (col, row) {
      var hit = placed.find(function (p) { return p.col === col && p.row === row; }) || null;
      if (hit === active) return;
      if (active) active.el.classList.remove('is-on');
      active = hit;
      if (active) active.el.classList.add('is-on');
    };
    var draw = function () {
      grid.style.setProperty('--mx', now.x.toFixed(1) + 'px');
      grid.style.setProperty('--my', now.y.toFixed(1) + 'px');
    };
    var tick = function () {
      now.x += (target.x - now.x) * 0.18;
      now.y += (target.y - now.y) * 0.18;
      draw();
      raf = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) < 0.2 ? 0 : requestAnimationFrame(tick);
    };
    var aim = function (x, y, jump) {
      var col = Math.floor((x - OX) / CELL), row = Math.floor((y - OY) / CELL);
      target.x = OX + col * CELL + CELL / 2;
      target.y = OY + row * CELL + CELL / 2;
      setActive(col, row);
      if (jump || reduceMotion) { now.x = target.x; now.y = target.y; draw(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    place();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(place, 200); });

    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (finePointer) {
      hero.addEventListener('pointerenter', function (e) {
        var b = hero.getBoundingClientRect();
        aim(e.clientX - b.left, e.clientY - b.top, true);
        grid.classList.add('is-lit');
      });
      hero.addEventListener('pointermove', function (e) {
        var b = hero.getBoundingClientRect();
        aim(e.clientX - b.left, e.clientY - b.top, false);
        grid.classList.add('is-lit');
      });
      hero.addEventListener('pointerleave', function () { grid.classList.remove('is-lit'); setActive(null, null); });
    } else if (!reduceMotion) {
      // Touch screens have no hover, so the light visits a mark every few seconds
      var i = 0;
      var tour = function () {
        if (!placed.length) return;
        var p = placed[i++ % placed.length];
        aim(OX + p.col * CELL + CELL / 2, OY + p.row * CELL + CELL / 2, false);
        grid.classList.add('is-lit');
      };
      setTimeout(function () { tour(); setInterval(tour, 3200); }, 1200);
    }
  }

  // Waitlist pop-up (no backend yet): validate and confirm
  var dialog = document.getElementById('join');
  if (dialog) {
    var form = dialog.querySelector('[data-signup]');
    var input = form.querySelector('input');
    var msg = form.querySelector('[data-msg]');
    var open = function () {
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
      msg.textContent = '';
      msg.hidden = true;
      form.classList.remove('is-invalid');
      input.focus();
    };
    var close = function () {
      if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    };
    document.querySelectorAll('[data-join]').forEach(function (b) { b.addEventListener('click', open); });
    dialog.querySelector('[data-close]').addEventListener('click', close);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = input.value.trim() !== '' && input.checkValidity();
      form.classList.toggle('is-invalid', !ok);
      msg.hidden = false;
      msg.textContent = ok ? 'You’re on the list. We’ll email you when access opens.' : 'Enter a valid email address.';
      if (ok) form.reset();
    });
  }
})();
