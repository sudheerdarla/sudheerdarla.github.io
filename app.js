const studies = {
  pstake: {
    title: 'pSTAKE Finance',
    sub: 'Web3 staking platform',
    html: '<img class="long-study seam" width="2304" height="8000" alt="pSTAKE case study, part 1: staking people can actually read. Overview, scope, the problem holders faced and six moments where people got stuck" decoding="async" src="img/pstake-cs-1.jpg"><img class="long-study seam" width="2304" height="7095" alt="pSTAKE case study, part 2: the Network, Asset, State, Action mental model and the stake and unstake key decisions" decoding="async" loading="lazy" src="img/pstake-cs-2.jpg"><img class="long-study seam" width="2304" height="4910" alt="pSTAKE case study, part 3: how a chain switch changes everything, learnings and closing" decoding="async" loading="lazy" src="img/pstake-cs-3.jpg">'
  },
  comdex: {
    title: 'Comdex',
    sub: 'Commodity Trading platform',
    html: '<img class="long-study" width="1312" height="8000" alt="Comdex case study: a global commodity trading platform, from research to handoff, covering the problem, process, key screens and outcomes" decoding="async" src="img/comdex-case-study.jpg?v=2">'
  },
  captl: {
    title: 'CAPTL',
    sub: 'Investor portfolio platform',
    html: '<img class="long-study" width="943" height="8000" alt="CAPTL case study: an investor operating system for fund managers, covering the problem, user roles, product flows, key screens and learnings" decoding="async" src="img/captl-case-study.jpg?v=2">'
  }
};
const drawer = document.getElementById('drawer');
const scrim = document.getElementById('scrim');
const closeBtn = document.getElementById('close');

let lastFocus = null;
const mainEl = document.getElementById('main');
function focusables() {
  return drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
}
function openStudy(key, fromUser) {
  const s = studies[key];
  if (!s) return;
  document.getElementById('d-title').textContent = s.title;
  document.getElementById('d-sub').textContent = s.sub;
  document.getElementById('d-body').innerHTML = s.html;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  scrim.classList.add('on');
  document.body.classList.add('panel-open');
  drawer.scrollTop = 0;
  if (history.replaceState) history.replaceState(null, '', '#' + key);
  if (mainEl) mainEl.setAttribute('inert', '');
  if (fromUser !== false) { lastFocus = document.activeElement; closeBtn.focus({ preventScroll: true }); }
}
function closeStudy() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  scrim.classList.remove('on');
  document.body.classList.remove('panel-open');
  if (history.replaceState) history.replaceState(null, '', location.pathname);
  if (mainEl) mainEl.removeAttribute('inert');
  if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const key = btn.getAttribute('data-open');
    openStudy(key);
  });
});
closeBtn.addEventListener('click', closeStudy);
scrim.addEventListener('click', closeStudy);
document.addEventListener('keydown', (e) => {
  if (!drawer.classList.contains('open')) return;
  if (e.key === 'Escape') { closeStudy(); return; }
  if (e.key === 'Tab') {
    const f = focusables();
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
document.querySelectorAll('[data-acc]').forEach(acc => {
  const head = acc.querySelector('.acc-head');
  head.addEventListener('click', () => {
    const open = acc.classList.toggle('open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
const hash = (location.hash || '').replace('#','');
if (studies[hash]) openStudy(hash, false);

(function starfield() {
  var cv = document.getElementById('starfield');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W, H, cx, cy, dpr, stars = [], N = 140, DEPTH = 1000, SPEED = 0.21;
  function reset(s, fresh) {
    s.x = (Math.random() - 0.5) * 2 * W;
    s.y = (Math.random() - 0.5) * 2 * H;
    s.z = fresh ? Math.random() * DEPTH : DEPTH;
    s.pz = s.z;
  }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight; cx = W / 2; cy = H / 2;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  }
  resize();
  for (var i = 0; i < N; i++) { var s = {}; reset(s, true); stars.push(s); }
  window.addEventListener('resize', resize);
  function frame() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, W, H);
    ctx.lineCap = 'round';
    for (var i = 0; i < N; i++) {
      var s = stars[i];
      s.pz = s.z;
      s.z -= SPEED;
      if (s.z < 1) { reset(s, false); continue; }
      var k = 300 / s.z, pk = 300 / s.pz;
      var x = cx + s.x * k, y = cy + s.y * k;
      var px = cx + s.x * pk, py = cy + s.y * pk;
      if (x < -50 || x > W + 50 || y < -50 || y > H + 50) { reset(s, false); continue; }
      var depth = 1 - s.z / DEPTH;
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.15 + depth * 0.85) + ')';
      ctx.lineWidth = 0.3 + depth * 0.9;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  if (reduce) { SPEED = 0; for (var j = 0; j < 40; j++) frame(); } else frame();
})();
