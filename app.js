const ASSET = 'https://puppy-micro-41275756.figma.site/assets/';
const galleries = {
  pstake: [
    'img/pstake-stake.jpg',
    'img/pstake-unstake.jpg',
    ASSET + 'pstake-flow-c-CPmBU3xu.png',
    ASSET + 'pstake-shipped-Cp9C59_z.png',
    ASSET + 'pstake-last-Bcvq6mRY.png'
  ],
};
function fsBtn(gallery, index, src, alt, extraClass) {
  return '<img class="' + extraClass + '" alt="' + alt + '" loading="lazy" decoding="async" src="' + src + '">';
}
const studies = {
  pstake: {
    title: 'pSTAKE Finance',
    sub: 'Web3 staking platform',
    html: `
      <p class="meta-line">2022, Dubai, United Arab Emirates · On-site</p>
      <p>Crypto holders were stitching together staking, swaps, explorers, and spreadsheets. pSTAKE was designed so they could see an asset, act on it, and know what state it was in — without becoming a protocol expert.</p>
      ${fsBtn('pstake', 0, galleries.pstake[0], 'pSTAKE Stake screen: stake OSMO, receive stkOSMO', 'shot')}
      <div><h3>About the project</h3><p>One surface to hold, stake, unstake, use DeFi, and read history — with chain context built in. I owned dashboard, network switch, stake / unstake (including 14-day vs instant), DeFi tab (create / add to pools), and how rewards and activity showed up. I did not own contracts, APY math, or which chains launched.</p></div>
      <div><h3>Problem statements</h3><ol>
        <li>Idle tokens in a wallet, and no trusted next step inside the same app.</li>
        <li>“I signed. Now what?” — pending tx with no translation.</li>
        <li>Unstaked yesterday, balance unchanged (still in the 14-day window).</li>
        <li>Same token name on two chains; user acts on the wrong network.</li>
        <li>Rewards exist but it is unclear whether to claim, leave, or restake.</li>
        <li>Pool return vs staking yield mixed into one story, so people cannot compare actions.</li>
      </ol></div>
      <div><h3>IA — User flows</h3>
        <p>Mental model we designed for:</p>
        <p><strong>Network → Asset → State → Action</strong></p>
        <p>States: Available · Staked · Unstaking · Pool · Rewards</p>
        <p>Actions: Stake · Unstake (14d or instant) · Add to pool · Claim · Restake</p>
      </div>
      ${fsBtn('pstake', 1, galleries.pstake[1], 'pSTAKE Unstake screen: flash or regular unstake', 'shot')}
      <div><h3>Flow A — First useful action</h3><p>Pick network → see assets on that network → choose Stake or DeFi → confirm → dashboard state updates.</p></div>
      <div><h3>Flow B — Exit</h3><p>Staked → Unstake → choose 14-day (shows unlock date, status = Unstaking) or instant + fee (shows fee, status = Available) → activity records the tx.</p></div>
      <div><h3>Flow C — Read the system</h3><p>Dashboard lists each state separately. Transactions answer “what did I just do?” Empty state if the asset lives on another chain: switch network, don't invent a balance.</p></div>
      ${fsBtn('pstake', 2, galleries.pstake[2], 'Flow C', 'shot')}
      <div><h3>What we shipped</h3><ul>
        <li>One dashboard for funds, staked, unstaking, pools, rewards, and transactions</li>
        <li>Network switcher that filters assets and actions to the selected chain</li>
        <li>Stake plus two honest exits: 14-day wait, or instant with the fee on the confirm sheet</li>
        <li>DeFi tab to create or add to pools without pretending a pool is a stake</li>
        <li>Claim / restake so rewards do not become a fourth forgotten balance</li>
      </ul></div>
      ${fsBtn('pstake', 3, galleries.pstake[3], 'What we shipped', 'shot')}
      ${fsBtn('pstake', 4, galleries.pstake[4], 'pSTAKE additional screen', 'shot')}
      <div><h3>Outcomes</h3><ul>
        <li>One product for stake, unstake, pools, and history.</li>
        <li>Named money states.</li>
        <li>14-day vs instant fee shown before confirm.</li>
        <li>Chain switch stops wrong-network actions.</li>
        <li>Product reached ~$30M AUM.</li>
        <li>No saved funnel metrics — success was “I can tell what state this asset is in.”</li>
      </ul></div>
      <div><h3>Learnings</h3><ul>
        <li>State beats APY copy.</li>
        <li>Waits and fees must be visible before the click.</li>
        <li>Network first.</li>
        <li>Don't merge pool and stake into one Earn button.</li>
        <li>Pending needs a screen.</li>
      </ul></div>`
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
