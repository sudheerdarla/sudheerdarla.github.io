/* "Chat with virtual me" — answers questions about Sudheer using only the
   portfolio + resume content below. Runs fully in the browser (no API key). */
(function () {
  var KB = [
    { id: 'intro', q: 'Who are you?',
      k: 'who you yourself introduce introduction about hello intro tell me sudheer darla designer',
      a: "I'm Sudheer Darla, a product designer based in Hyderabad with 7+ years of experience. I focus on 0–1 consumer fintech and SaaS products and on complex, high-stakes flows — most of my work is in fintech, Web3 and operational SaaS. I've taken complex money products from idea to shipped UI as the only designer: commodity trading, and then a staking wallet that held $20–30M AUM." },
    { id: 'how', q: 'How do you work?',
      k: 'how work process approach method workflow style philosophy ai vibe research prototype handoff',
      a: "I operate like an early-stage builder. I pair design craft with AI-augmented research and vibe-design workflows, then evaluate hard so the work holds up in use, not just in a mockup. My flow is discovery → live prototype → test, then website + app end-to-end, IA for multi-step flows, design systems and handoff, plus process docs and decks. I don't just hand off mockups — I steer AI toward production-ready UI and put the remaining craft into the 10% that makes a product feel considered." },
    { id: 'location', q: 'Where are you based?',
      k: 'where based location live city hyderabad india remote relocate bengaluru delhi open',
      a: "I'm based in Hyderabad, India. I'm open to remote roles and to working in Bengaluru or Delhi." },
    { id: 'contact', q: 'How can I contact you?',
      k: 'contact reach email mail hire hiring connect linkedin github twitter x social message get touch available availability',
      a: "The best way is email: sudheer.darla11@gmail.com. You can also find me on LinkedIn (linkedin.com/in/sudheer-darla-a9496956), GitHub (github.com/sudheerdarla) and X (@sudheerdarla_)." },
    { id: 'resume', q: 'Where is your resume?',
      k: 'resume cv download pdf print',
      a: "You can open my resume from the \"Resume ->\" link in the About section of this page, or go straight to /resume.html — it has a Download / Print PDF button." },
    { id: 'exp', q: 'Walk me through your experience',
      k: 'experience career history background jobs companies worked employer timeline years roles',
      a: "Newest to oldest:\n• Independent ventures, Hyderabad — Founder (2023–2026)\n• Hive Consultancy Services, Bengaluru — Product Designer (Apr–Aug 2023)\n• Wise Log Solutions, Dubai — UI/UX Designer (Jul 2022–Mar 2023)\n• CMMT Technologies, Bengaluru — UI/UX Designer (Feb 2020–Jun 2022)\n• Cosmic Tech Labs, Hyderabad — User Experience Designer (Jul 2018–Oct 2019)\nAsk me about any of them." },
    { id: 'ventures', q: 'What did you do as a founder?',
      k: 'independent ventures founder founded startup own entrepreneur 2023 2026',
      a: "From 2023 to 2026 I ran independent ventures out of Hyderabad as a founder. The portfolio doesn't go deeper than that, but it's where the \"early-stage builder\" mindset comes from — and I'm now coming back to product design, focused on trust-heavy, multi-step flows." },
    { id: 'hive', q: 'What did you do at Hive Consultancy?',
      k: 'hive consultancy services bengaluru bangalore 2023 discovery stakeholders client',
      a: "At Hive Consultancy Services (Bengaluru, Apr–Aug 2023) I was a Product Designer. I ran short discovery with stakeholders and users of client tools, turned requirements into detailed Figma flows aligned to the roadmap, prototyped core website/app journeys, and tested hypotheses in reviews to cut steps and clarify states before build. I also documented components, states and production notes so PMs and engineers could ship without a designer in every huddle." },
    { id: 'wise', q: 'What did you do at Wise Log Solutions?',
      k: 'wise log solutions dubai uae 2022 liquid staking defi onboarding wallet cross-chain tvl',
      a: "At Wise Log Solutions (Dubai, Jul 2022–Mar 2023) I designed core product flows for a Web3 liquid staking platform — DeFi onboarding, wallet UX and cross-chain staking interfaces that managed $30M TVL. I also set up a repeatable production workflow (frames, specs, responsive breakpoints) so later pages reused the same system instead of starting from scratch." },
    { id: 'cmmt', q: 'What did you do at CMMT Technologies?',
      k: 'cmmt technologies bengaluru persistence assetmantle website wallet 2020 2022 multi-chain',
      a: "At CMMT Technologies (Bengaluru, Feb 2020–Jun 2022) I designed website, app and wallet surfaces for Persistence, pSTAKE and AssetMantle — multi-chain, multi-step, high-stakes flows like connect, verify, stake/buy, confirm and recover. I kept the marketing site and in-product UI on one system so the onboarding story and the real product didn't diverge at launch." },
    { id: 'cosmic', q: 'What did you do at Cosmic Tech Labs?',
      k: 'cosmic tech labs hyderabad 2018 2019 studio comdex sentinel vpn first job trade finance',
      a: "At Cosmic Tech Labs (Hyderabad, Jul 2018–Oct 2019) I designed Comdex trade-finance/trading platforms and Sentinel VPN + wallet — long operational workflows that had to stay trustworthy under incomplete information. I simplified document- and status-heavy screens (what's needed next, what's blocked, how to finish without guessing), mapped messy real-world steps (apply, review, fund, track) into scannable UI with clear next actions and error recovery, and worked daily with PMs and engineers in a fast startup studio." },
    { id: 'projects', q: 'What projects have you worked on?',
      k: 'projects portfolio work selected case studies built shipped designed products',
      a: "Selected work: pSTAKE (staking app / manage flows + site), Persistence (wallet, ecosystem site), Comdex (trade-finance and trading platforms), AssetMantle (marketplace app + site), Sentinel (VPN / wallet), plus CAPTL, Exidio and shipped client web products. This site has full case studies for pSTAKE, Comdex and CAPTL — ask me about any of them." },
    { id: 'pstake', q: 'Tell me about pSTAKE',
      k: 'pstake finance staking web3 liquid dashboard stake unstake defi pools rewards dubai',
      a: "pSTAKE Finance is a Web3 liquid staking platform (2022, Dubai). Crypto holders were stitching together staking, swaps, explorers and spreadsheets, so I designed one surface to hold, stake, unstake, use DeFi and read history — with chain context built in. I owned the dashboard, network switch, stake/unstake (including 14-day vs instant), the DeFi tab (create/add to pools) and how rewards and activity showed up. The mental model: Network → Asset → State → Action. The product reached ~$30M AUM." },
    { id: 'pstake-own', q: "What didn't you own on pSTAKE?",
      k: 'pstake own owned responsibility scope contracts apy math chains launched',
      a: "On pSTAKE I owned the dashboard, network switch, stake/unstake flows, the DeFi tab and how rewards and activity showed up. I did not own the smart contracts, the APY math, or which chains launched." },
    { id: 'pstake-problems', q: 'What problems did pSTAKE solve?',
      k: 'pstake problem problems statements pain points issues challenge',
      a: "The problems I designed against:\n1. Idle tokens in a wallet with no trusted next step in the same app.\n2. \"I signed. Now what?\" — pending transactions with no translation.\n3. Unstaked yesterday, balance unchanged (still in the 14-day window).\n4. Same token name on two chains, so users act on the wrong network.\n5. Rewards exist but it's unclear whether to claim, leave or restake.\n6. Pool return and staking yield mixed into one story, so people couldn't compare actions." },
    { id: 'pstake-flows', q: 'What were the pSTAKE user flows?',
      k: 'pstake flow flows ia information architecture mental model states actions unstake instant fee 14-day network switch',
      a: "Mental model: \"Network → Asset → State → Action\". States: Available · Staked · Unstaking · Pool · Rewards. Actions: Stake · Unstake (14-day or instant) · Add to pool · Claim · Restake.\n• Flow A (first useful action): pick network → see assets → Stake or DeFi → confirm → dashboard updates.\n• Flow B (exit): Staked → Unstake → 14-day (shows unlock date, status Unstaking) or instant + fee (shows fee, status Available) → activity records the tx.\n• Flow C (read the system): the dashboard lists each state separately; transactions answer \"what did I just do?\"; if the asset lives on another chain you switch network rather than seeing an invented balance." },
    { id: 'pstake-shipped', q: 'What did you ship for pSTAKE?',
      k: 'pstake shipped ship delivered outcomes results impact aum learnings lessons metrics',
      a: "What we shipped: one dashboard for funds, staked, unstaking, pools, rewards and transactions; a network switcher that filters assets and actions to the selected chain; stake plus two honest exits (14-day wait, or instant with the fee on the confirm sheet); a DeFi tab to create/add to pools without pretending a pool is a stake; and claim/restake so rewards don't become a fourth forgotten balance.\nOutcomes: one product for stake, unstake, pools and history; named money states; fee shown before confirm; chain switch stops wrong-network actions; ~$30M AUM. There were no saved funnel metrics — success was \"I can tell what state this asset is in.\"\nLearnings: state beats APY copy; waits and fees must be visible before the click; network first; don't merge pool and stake into one Earn button; pending needs a screen." },
    { id: 'comdex', q: 'Tell me about Comdex',
      k: 'comdex commodity trading trade finance platform global 2019 hyderabad',
      a: "Comdex is a commodity trading / trade-finance platform I designed for global commodity trade (Hyderabad, March 2019). It involved long, document- and status-heavy operational flows (apply, review, fund, track). You can open the full case study from the Comdex card on this page." },
    { id: 'captl', q: 'Tell me about CAPTL',
      k: 'captl investor portfolio tracking platform research wireframing prototyping handoff',
      a: "CAPTL is an investor portfolio tracking platform. I did UX design end to end — research, wireframing, prototyping and design handoff. You can open the full case study from the CAPTL card on this page." },
    { id: 'others', q: 'What about Persistence, AssetMantle, Sentinel?',
      k: 'persistence assetmantle sentinel exidio marketplace vpn wallet ecosystem',
      a: "Persistence — wallet and ecosystem site. AssetMantle — marketplace app + site. Sentinel — VPN and wallet. Exidio and other client web products were shipped too. The first three were multi-chain, high-stakes flows (connect, verify, stake/buy, confirm, recover). I don't have public case studies for these on the site." },
    { id: 'skills', q: 'What are your skills?',
      k: 'skills skill good at strengths expertise abilities capabilities specialties',
      a: "Design: Product Design, Figma (advanced), Rapid/Live Prototyping, Design Systems, User Experience Design, visual production in Figma, Adobe Illustrator and Photoshop. Engineering: HTML/CSS/JS, React JS, Python and Git. I'm also strong at IA for multi-step flows, design handoff, and process docs and decks." },
    { id: 'tools', q: 'What tools do you use?',
      k: 'tools software tool stack figma illustrator photoshop react python git code coding developer engineer',
      a: "Figma (advanced) for design and live prototyping, Adobe Illustrator and Photoshop for visuals, and HTML/CSS/JS, React, Python and Git when I need to build — I'm comfortable prototyping in code and steering AI tools toward production-ready UI." },
    { id: 'edu', q: 'What is your education?',
      k: 'education study studied degree college university school btech diploma mgit polytechnic qualification graduate',
      a: "B.Tech in Computer Science from Mahatma Gandhi Institute of Technology (MGIT), Hyderabad (2013–2016), and a Diploma in Electrical and Electronics Engineering from Polytechnic College, Kothagudem (2010–2013)." },
    { id: 'domain', q: 'What industries do you work in?',
      k: 'industry industries domain fintech web3 crypto saas consumer finance defi sector focus specialize',
      a: "Mostly fintech, Web3 and operational SaaS — 0–1 consumer products and complex, high-stakes, trust-heavy multi-step flows that people actually depend on (money movement, staking, trading, trade finance)." },
    { id: 'years', q: 'How much experience do you have?',
      k: 'years experience long senior level seniority since started 7',
      a: "7+ years as a product designer, starting at Cosmic Tech Labs in July 2018." },
    { id: 'open', q: 'Are you open to new roles?',
      k: 'open looking job opportunity opportunities roles role hire hiring available availability freelance contract full-time work with remote join',
      a: "Yes — I'm coming back to product design and open to roles that are remote (India), or based in Hyderabad, Bengaluru or Delhi, ideally on trust-heavy, multi-step flows. Email me at sudheer.darla11@gmail.com." },
    { id: 'site', q: 'How was this site made?',
      k: 'site website built made portfolio design figma make github pages',
      a: "This portfolio started in Figma Make and is published as a static site on GitHub Pages — plain HTML, CSS and JS. The starfield background, case-study drawer and this chat are all built by hand in the browser." }
  ];

  var STOP = 'a an and are as at be by can did do does for from has have how i in is it me my of on or so tell that the their there this to was were what when where which who why will with would you your about please can could'.split(' ');
  function tok(s) {
    return (s.toLowerCase().match(/[a-z0-9$+\-]+/g) || []).filter(function (w) { return w.length > 1 && STOP.indexOf(w) < 0; }).map(stem);
  }
  function stem(w) { return w.replace(/(ing|ed|es|s)$/, function (m, x, off) { return off > 2 ? '' : m; }); }
  KB.forEach(function (e) {
    e.kt = tok(e.k);
    e.at = tok(e.a);
  });

  var NAMED = { pstake: /\bpstake\b/i, comdex: /\bcomdex\b/i, captl: /\bcaptl\b/i, hive: /\bhive\b/i, wise: /\bwise\b/i, cmmt: /\bcmmt\b/i, cosmic: /\bcosmic\b/i };
  var greet = /^(hi|hello|hey|yo|hola|good (morning|afternoon|evening)|sup)\b/i;
  var thanks = /\b(thanks|thank you|thx|cheers)\b/i;
  var bye = /\b(bye|goodbye|see you|cya)\b/i;

  function answer(text) {
    if (greet.test(text.trim()) && text.trim().split(/\s+/).length <= 4)
      return { a: "Hi! I'm the virtual Sudheer. Ask me about my experience, projects like pSTAKE, my skills, or how to reach me.", id: 'greet' };
    if (thanks.test(text)) return { a: "You're welcome! Anything else you'd like to know?", id: 'thanks' };
    if (bye.test(text)) return { a: "Thanks for stopping by — feel free to email me anytime at sudheer.darla11@gmail.com.", id: 'bye' };
    var qt = tok(text), best = null, bestScore = 0, second = 0;
    KB.forEach(function (e) {
      var s = 0;
      qt.forEach(function (t) {
        if (e.kt.indexOf(t) >= 0) s += 3;
        else if (e.at.indexOf(t) >= 0) s += 1;
      });
      if (NAMED[e.id] && NAMED[e.id].test(text)) s += 4;
      if (s > bestScore) { second = bestScore; bestScore = s; best = e; }
      else if (s > second) second = s;
    });
    if (!best || bestScore < 3)
      return { a: "I'm not sure I have that in my portfolio or resume. I can talk about my experience, projects (pSTAKE, Comdex, CAPTL), skills, education, or how to contact me — or email me at sudheer.darla11@gmail.com.", id: 'none' };
    return { a: best.a, id: best.id };
  }

  var SUGGEST = ['intro', 'exp', 'pstake', 'skills', 'contact', 'open'];
  function suggestions(excl) {
    return KB.filter(function (e) { return SUGGEST.indexOf(e.id) >= 0 && e.id !== excl; }).slice(0, 4);
  }

  /* ---------- UI ---------- */
  var css = '' +
    '.vc-btn{position:fixed;right:24px;bottom:24px;z-index:45;background:#f7f7f7;color:#000;font:600 14px Inter,system-ui,sans-serif;padding:11px 18px;border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.5);cursor:pointer;border:0;display:flex;align-items:center;gap:8px}' +
    '.vc-btn:hover{background:#fff}.vc-btn i{width:8px;height:8px;border-radius:50%;background:#2fd06b;display:inline-block}' +
    '.vc-panel{position:fixed;right:24px;bottom:24px;z-index:70;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 48px);background:#141414;border:1px solid rgba(255,255,255,.12);border-radius:14px;display:none;flex-direction:column;box-shadow:0 12px 48px rgba(0,0,0,.65);font-family:Inter,system-ui,sans-serif;color:#f7f7f7;overflow:hidden}' +
    '.vc-panel.on{display:flex}' +
    '.vc-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.1)}' +
    '.vc-head img{width:34px;height:34px;border-radius:50%;object-fit:cover}.vc-head b{font-size:15px;display:block}.vc-head small{color:#9a9a9a;font-size:12px}' +
    '.vc-x{margin-left:auto;color:#808080;background:none;border:0;cursor:pointer;padding:6px;line-height:0}.vc-x:hover{color:#fff}' +
    '.vc-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.vc-m{max-width:86%;padding:9px 12px;border-radius:12px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}' +
    '.vc-m.bot{background:#222;align-self:flex-start;border-bottom-left-radius:4px}.vc-m.me{background:#f7f7f7;color:#000;align-self:flex-end;border-bottom-right-radius:4px}' +
    '.vc-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px}.vc-chip{border:1px solid #333;color:#d0d0d0;background:none;font:13px Inter,system-ui,sans-serif;padding:5px 10px;border-radius:999px;cursor:pointer}.vc-chip:hover{border-color:#777;color:#fff}' +
    '.vc-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.1)}' +
    '.vc-form input{flex:1;background:#0c0c0c;border:1px solid #2a2a2a;border-radius:8px;color:#f7f7f7;font:14px Inter,system-ui,sans-serif;padding:9px 11px;outline:none}.vc-form input:focus{border-color:#666}' +
    '.vc-form button{background:#f7f7f7;color:#000;border:0;border-radius:8px;font:600 14px Inter,system-ui,sans-serif;padding:0 14px;cursor:pointer}' +
    '.vc-typing span{display:inline-block;width:5px;height:5px;margin:0 2px;border-radius:50%;background:#888;animation:vcb 1s infinite}.vc-typing span:nth-child(2){animation-delay:.15s}.vc-typing span:nth-child(3){animation-delay:.3s}@keyframes vcb{0%,60%,100%{opacity:.3}30%{opacity:1}}' +
    '@media(max-width:520px){.vc-panel{right:0;bottom:0;width:100vw;max-width:100vw;height:100vh;max-height:100vh;border-radius:0}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var avatar = (document.querySelector('.avatar') || {}).src || '';
  var btn = document.createElement('button');
  btn.className = 'vc-btn'; btn.type = 'button';
  btn.innerHTML = '<i></i>Chat with virtual me!';
  var panel = document.createElement('div');
  panel.className = 'vc-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Chat with virtual Sudheer');
  panel.innerHTML = '<div class="vc-head">' + (avatar ? '<img alt="" src="' + avatar + '">' : '') +
    '<div><b>Virtual Sudheer</b><small>Answers from my portfolio &amp; resume</small></div>' +
    '<button class="vc-x" type="button" aria-label="Close chat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>' +
    '<div class="vc-log" aria-live="polite"></div><div class="vc-chips"></div>' +
    '<form class="vc-form"><input type="text" placeholder="Ask me anything about my work…" aria-label="Your question" autocomplete="off" maxlength="300"><button type="submit">Send</button></form>';
  document.body.appendChild(btn); document.body.appendChild(panel);

  var log = panel.querySelector('.vc-log'), chips = panel.querySelector('.vc-chips'),
      form = panel.querySelector('form'), input = panel.querySelector('input');
  var started = false;

  function add(cls, text) {
    var d = document.createElement('div'); d.className = 'vc-m ' + cls; d.textContent = text;
    log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  function showChips(excl) {
    chips.innerHTML = '';
    suggestions(excl).forEach(function (e) {
      var c = document.createElement('button'); c.type = 'button'; c.className = 'vc-chip'; c.textContent = e.q;
      c.addEventListener('click', function () { ask(e.q); });
      chips.appendChild(c);
    });
  }
  function ask(text) {
    text = text.trim(); if (!text) return;
    add('me', text); input.value = ''; chips.innerHTML = '';
    var t = add('bot vc-typing', ''); t.innerHTML = '<span></span><span></span><span></span>';
    var r = answer(text);
    setTimeout(function () {
      t.className = 'vc-m bot'; t.textContent = r.a; log.scrollTop = log.scrollHeight;
      showChips(r.id);
    }, 450);
  }
  function open() {
    panel.classList.add('on'); btn.style.display = 'none';
    if (!started) {
      started = true;
      add('bot', "Hi, I'm the virtual version of Sudheer! Ask me about my experience, projects, skills or how to reach me.");
      showChips();
    }
    setTimeout(function () { input.focus(); }, 50);
  }
  function close() { panel.classList.remove('on'); btn.style.display = 'flex'; }
  btn.addEventListener('click', open);
  panel.querySelector('.vc-x').addEventListener('click', close);
  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('on') && !document.body.classList.contains('lb-open')) close();
  });
})();
