/* Shared "Prototype" menu for the live prototypes (pstake01, comdex01, captl01).
   Same pattern as the Saifuro console: a pill in the bottom left that jumps to
   any screen or flow. Each app calls protoMenu(build), where build() returns
   [{ title, items: [{ label, hint, run }] }] and is re-run every time the menu opens. */
(function () {
  var css =
    '.pm{position:fixed;left:16px;bottom:16px;z-index:9000;font:500 14px/20px Inter,system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.pm-btn{display:flex;align-items:center;gap:8px;height:36px;padding:0 14px 0 12px;border-radius:999px;border:0;background:#111113;color:#fff;font:inherit;cursor:pointer;box-shadow:0 0 0 1px rgba(255,255,255,.14),0 8px 24px -6px rgba(0,0,0,.45)}' +
    '.pm-btn:hover{background:#26262a}.pm-btn svg{width:14px;height:14px;fill:currentColor}' +
    '.pm-btn:focus-visible,.pm-i:focus-visible{outline:2px solid #3b82f6;outline-offset:2px}' +
    '.pm-menu{position:absolute;left:0;bottom:calc(100% + 8px);width:290px;max-height:calc(100vh - 90px);overflow:auto;padding:6px;border-radius:12px;background:#fff;color:#111113;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 16px 40px -8px rgba(0,0,0,.3)}' +
    '.pm-h{padding:8px 10px 4px;font-size:12px;line-height:16px;color:#7a7a82;font-weight:500}' +
    '.pm-sep{height:1px;margin:6px 4px;background:rgba(0,0,0,.08)}' +
    '.pm-i{display:flex;align-items:center;gap:10px;width:100%;min-height:36px;padding:6px 10px;border:0;border-radius:8px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}' +
    '.pm-i:hover,.pm-i.on{background:#f1f1f3}.pm-i small{margin-left:auto;font-size:12px;color:#8a8a92;white-space:nowrap}' +
    /* keep the sidebar footers in these apps clear of the pill */
    '@media (min-width:721px){.side{padding-bottom:68px!important}}' +
    '@media (max-width:720px){.pm{left:0;bottom:auto;top:55%}.pm-btn{width:40px;height:40px;padding:0;justify-content:center;border-radius:0 10px 10px 0;font-size:0;gap:0}' +
    '.pm-btn svg{width:16px;height:16px}.pm-menu{bottom:auto;top:calc(100% + 8px);left:8px;width:min(290px,calc(100vw - 24px));max-height:calc(45vh - 20px)}}';

  window.protoMenu = function (build) {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var root = document.createElement('div'); root.className = 'pm';
    root.innerHTML = '<button class="pm-btn" type="button" aria-haspopup="menu" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>Prototype</button><div class="pm-menu" role="menu" hidden></div>';
    document.body.appendChild(root);
    var btn = root.firstChild, menu = root.lastChild, runs = [];

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function open() {
      runs = [];
      menu.innerHTML = build().map(function (g, gi) {
        return (gi ? '<div class="pm-sep"></div>' : '') + '<div class="pm-h">' + esc(g.title) + '</div>' + g.items.map(function (it) {
          runs.push(it.run);
          return '<button class="pm-i" type="button" role="menuitem" data-i="' + (runs.length - 1) + '">' + esc(it.label) + (it.hint ? '<small>' + esc(it.hint) + '</small>' : '') + '</button>';
        }).join('');
      }).join('');
      menu.hidden = false; btn.setAttribute('aria-expanded', 'true');
      var first = menu.querySelector('.pm-i'); if (first) first.focus();
    }
    function close(focus) { if (menu.hidden) return; menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (focus) btn.focus(); }

    btn.addEventListener('click', function (e) { e.stopPropagation(); menu.hidden ? open() : close(); });
    menu.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest('.pm-i'); if (!b) return;
      close(); window.scrollTo(0, 0); runs[+b.dataset.i]();
    });
    document.addEventListener('click', function () { close(); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { e.stopPropagation(); close(true); return; }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      var list = [].slice.call(menu.querySelectorAll('.pm-i')), i = list.indexOf(document.activeElement);
      e.preventDefault(); list[(i + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length].focus();
    }, true);
  };
})();
