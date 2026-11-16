(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The ring leans toward the pointer. It eases toward its target on every frame and stops
  // the loop once it has settled, so an idle page costs nothing.
  var hero = document.querySelector('[data-hero]');
  var ring = document.querySelector('[data-ring]');
  var glow = document.querySelector('[data-glow]');
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hero && ring && canHover && !reduceMotion) {
    var target = { x: 0, y: 0, r: 0 };
    var now = { x: 0, y: 0, r: 0 };
    var raf = 0;
    var apply = function () {
      ring.style.setProperty('--tx', now.x.toFixed(2));
      ring.style.setProperty('--ty', now.y.toFixed(2));
      ring.style.setProperty('--tr', now.r.toFixed(3));
      if (glow) {
        glow.style.setProperty('--gx', (-now.x * 0.45).toFixed(2));
        glow.style.setProperty('--gy', (-now.y * 0.45).toFixed(2));
      }
    };
    var tick = function () {
      now.x += (target.x - now.x) * 0.06;
      now.y += (target.y - now.y) * 0.06;
      now.r += (target.r - now.r) * 0.06;
      apply();
      var settled = Math.abs(target.x - now.x) < 0.05 && Math.abs(target.y - now.y) < 0.05 && Math.abs(target.r - now.r) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    var go = function () { if (!raf) raf = requestAnimationFrame(tick); };
    hero.addEventListener('pointermove', function (e) {
      var b = hero.getBoundingClientRect();
      var nx = (e.clientX - b.left) / b.width - 0.5;
      var ny = (e.clientY - b.top) / b.height - 0.5;
      target.x = nx * 90;
      target.y = ny * 64;
      target.r = nx * 7;
      go();
    });
    hero.addEventListener('pointerleave', function () {
      target.x = target.y = target.r = 0;
      go();
    });
  }

  // Waitlist dialog (no backend yet): validate and confirm
  var dialog = document.getElementById('join');
  if (dialog) {
    var form = dialog.querySelector('[data-signup]');
    var input = form.querySelector('input');
    var msg = form.querySelector('[data-msg]');
    var open = function () {
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
      msg.textContent = '';
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
      msg.textContent = ok ? 'You’re on the list. We’ll email you when access opens.' : 'Enter a valid email address.';
      if (ok) form.reset();
    });
  }
})();
