(function () {
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
