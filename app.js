const ASSET = 'https://puppy-micro-41275756.figma.site/assets/';
const studies = {
  pstake: {
    title: 'pSTAKE Finance',
    sub: 'Web3 staking platform',
    html: `
      <p class="meta-line">2022, Dubai, United Arab Emirates · On-site</p>
      <p>Crypto holders were stitching together staking, swaps, explorers, and spreadsheets. pSTAKE was designed so they could see an asset, act on it, and know what state it was in — without becoming a protocol expert.</p>
      <div class="shot-row"><img class="shot" alt="pSTAKE staking interface" src="${ASSET}496a1.png"></div>
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
      <div class="shot-row"><img class="shot" alt="pSTAKE unstake interface" src="${ASSET}2cc46.png"></div>
      <div><h3>Flow A — First useful action</h3><p>Pick network → see assets on that network → choose Stake or DeFi → confirm → dashboard state updates.</p></div>
      <div><h3>Flow B — Exit</h3><p>Staked → Unstake → choose 14-day (shows unlock date, status = Unstaking) or instant + fee (shows fee, status = Available) → activity records the tx.</p></div>
      <div><h3>Flow C — Read the system</h3><p>Dashboard lists each state separately. Transactions answer “what did I just do?” Empty state if the asset lives on another chain: switch network, don't invent a balance.</p></div>
      <img class="shot" alt="Flow C" src="${ASSET}pstake-flow-c-CPmBU3xu.png">
      <div><h3>What we shipped</h3><ul>
        <li>One dashboard for funds, staked, unstaking, pools, rewards, and transactions</li>
        <li>Network switcher that filters assets and actions to the selected chain</li>
        <li>Stake plus two honest exits: 14-day wait, or instant with the fee on the confirm sheet</li>
        <li>DeFi tab to create or add to pools without pretending a pool is a stake</li>
        <li>Claim / restake so rewards do not become a fourth forgotten balance</li>
      </ul></div>
      <img class="shot" alt="What we shipped" src="${ASSET}pstake-shipped-Cp9C59_z.png">
      <img class="shot" alt="pSTAKE additional screen" src="${ASSET}pstake-last-Bcvq6mRY.png">
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
    html: `<img class="long-study" alt="Comdex case study" src="${ASSET}CMDX_CS-1-CHCgaiju.png">`
  },
  captl: {
    title: 'CAPTL',
    sub: 'Investor portfolio platform',
    html: `<img class="long-study" alt="CAPTL case study" src="${ASSET}CAPTL_CS-Be1OK8O2.png">`
  }
};

const drawer = document.getElementById('drawer');
const scrim = document.getElementById('scrim');
const closeBtn = document.getElementById('close');

function openStudy(key) {
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
}
function closeStudy() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  scrim.classList.remove('on');
  document.body.classList.remove('panel-open');
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openStudy(btn.dataset.open));
});
closeBtn.addEventListener('click', closeStudy);
scrim.addEventListener('click', closeStudy);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeStudy(); });
document.querySelectorAll('[data-acc]').forEach(acc => {
  acc.querySelector('.acc-head').addEventListener('click', () => acc.classList.toggle('open'));
});
