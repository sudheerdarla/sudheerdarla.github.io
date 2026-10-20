/* pSTAKE case study content, rendered as real HTML inside the side panel. */
window.PSTAKE_CS = (function () {
  var chk = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var dash = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 12h12"/></svg>';
  var arr = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  function li(items, icon, cls) {
    return items.map(function (t, i) { return '<li><em>0' + (i + 1) + '</em><span>' + t + '</span>' + icon + '</li>'; }).join('');
  }
  function eyebrow(n, t) { return '<p class="eyebrow"><b>' + n + '</b><i></i>' + t + '</p>'; }
  function moment(n, tag, text, resp) {
    return '<li class="moment"><header>Moment 0' + n + '<span>' + tag + '</span></header><h3>' + text + '</h3><footer><b>Design response</b><p>' + resp + '</p></footer></li>';
  }
  function col(n, name, q, items, act) {
    return '<li class="ia-col' + (act ? ' act' : '') + '"><div class="ia-head"><em>0' + n + '</em><strong>' + name + '</strong><span>' + q + '</span></div><ul>' +
      items.map(function (x) { return '<li' + (x[1] ? ' data-c="' + x[1] + '"' : '') + '>' + x[0] + '</li>'; }).join('') + '</ul></li>';
  }
  function img(f, w, h, alt) { return '<img class="ui" src="img/' + f + '" width="' + w + '" height="' + h + '" loading="lazy" decoding="async" alt="' + alt + '">'; }

  return '<article class="cs">' +
  '<section class="sec hero"><div class="wrap">' +
    '<p class="pill">Case study · Web3 · Liquid staking</p>' +
    '<h1>Staking people can actually <span class="acc">read.</span></h1>' +
    '<div class="hero-grid"><p>pSTAKE Finance is a liquid staking wallet that held $20–30M AUM. As its only designer, I shaped how holders see an asset, act on it, and know what state it is in, without becoming protocol experts.</p>' +
    '<dl class="facts"><div><dt>Role</dt><dd>Product Designer</dd></div><div><dt>Year · Location</dt><dd>2022 · Dubai, on-site</dd></div><div><dt>Platform</dt><dd>Desktop web app</dd></div><div><dt>Scope</dt><dd>Dashboard · Network · Stake · Unstake · DeFi</dd></div></dl></div>' +
    '<figure>' + '<img class="ui" src="img/pstake-ui-hero.jpg" width="2162" height="858" fetchpriority="high" decoding="async" alt="The pSTAKE stake screen: choose OSMO, see the stkOSMO you receive, the exchange rate and network fee, with the network menu, unstaking method card and a stake-confirmed message">' + '</figure>' +
  '</div></section>' +
  '<ul class="stats" aria-label="Key figures"><li><strong><span class="acc">$</span>20–30M</strong><span>AUM held in the wallet</span></li><li><strong>01</strong><span>Sole product designer</span></li><li><strong>05</strong><span>Surfaces owned end to end</span></li><li><strong>02</strong><span>Exit paths made explicit</span></li></ul>' +

  '<section class="sec"><div class="wrap">' + eyebrow('01', 'Overview') +
    '<h2>One surface to hold, stake, unstake, use DeFi and read history.</h2>' +
    '<p class="lede">Crypto holders were stitching together staking, swaps, explorers and spreadsheets. pSTAKE brought it into one place, with chain context built in, so every balance had a clear state and every action a clear outcome.</p>' +
    '<div class="scope"><div><h3>What I owned</h3><ul>' + li(['Dashboard and portfolio view', 'Network switch', 'Stake and unstake — 14-day vs instant exit', 'DeFi tab, create and add to pools', 'How rewards and activity showed up'], chk) + '</ul></div>' +
    '<div class="out"><h3>Outside my scope</h3><ul>' + li(['Smart contracts', 'APY math', 'Which chains launched'], dash) + '</ul></div></div>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('02', 'Problem') +
    '<h2>Holders wanted a token working, not five apps.</h2>' +
    '<blockquote class="quote"><p>“I want this token working” meant five apps and a manual checklist, too many tools for one intention.</p><cite>— The job every holder came with</cite></blockquote>' +
    '<ol class="four">' +
      '<li><em>01</em><h4>Blockchain state is invisible.</h4><p>Available, staked, unstaking, pooled and rewards all feel like “my money” but behave differently.</p></li>' +
      '<li><em>02</em><h4>Unstaking is a process, not a button.</h4><p>Standard exit takes 14 days; instant exit costs a fee. Without clarity, users assume lost funds.</p></li>' +
      '<li><em>03</em><h4>A chain switch changes everything.</h4><p>Assets and actions are per network. A single global wallet number is a lie.</p></li>' +
      '<li><em>04</em><h4>DeFi adds vocabulary and risk.</h4><p>Pools differ from staking, they can’t share one “Earn” button with no explanation.</p></li>' +
    '</ol>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('03', 'Pain points') +
    '<h2>Six moments where people got stuck.</h2>' +
    '<p class="lede">Each one traced back to a missing piece of state or context, so each one got a direct design response.</p>' +
    '<ul class="moments">' +
      moment(1, 'Next step', 'Idle tokens in a wallet, and no trusted next step inside the same app.', 'A stake card with MAX, plus a DeFi next step after staking.') +
      moment(2, 'Pending tx', '“I signed. Now what?”, a pending transaction with no translation.', 'A confirmation that names the balance you now hold.') +
      moment(3, 'Unbonding', 'Unstaked yesterday, balance unchanged, still in the 14-day window.', 'Exit methods that state time and fee before you commit.') +
      moment(4, 'Wrong chain', 'Same token name on two chains; the user acts on the wrong network.', 'The active chain is always visible and one click to switch.') +
      moment(5, 'Rewards', 'Rewards exist, but it’s unclear whether to claim, leave or restake.', 'A position card that separates balances by state.') +
      moment(6, 'Yield', 'Pool return and staking yield mixed into one story.', 'DeFi kept as its own tab, with its own language.') +
    '</ul>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('04', 'Information architecture') +
    '<h2>One mental model: Network → Asset → State → Action.</h2>' +
    '<p class="lede">Every screen answers the same four questions in the same order, where am I, what do I hold, what is it doing, and what can I do next.</p>' +
    '<ol class="ia" aria-label="Network, then Asset, then State, then Action">' +
      col(1, 'Network', 'Where am I?', [['Persistence'], ['BNB Smart Chain', 'y']]) +
      col(2, 'Asset', 'What do I hold?', [['OSMO', 'b'], ['stkOSMO'], ['ATOM', 'b'], ['stkATOM', 'v']]) +
      col(3, 'State', 'What is it doing?', [['Available', 'w'], ['Staked'], ['Unstaking', 'y'], ['Pool', 'v'], ['Rewards', 'g']]) +
      col(4, 'Action', 'What can I do next?', [['Stake'], ['Unstake · 14d or instant'], ['Add to pool'], ['Claim'], ['Restake']], true) +
    '</ol>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('05', 'Key decision A') +
    '<h2>Make state visible before asking for action.</h2>' +
    '<p class="lede">The stake flow reads top to bottom like a receipt: what you give, what you get, what it costs, and where it leaves your position.</p>' +
    '<div class="shot">' + img('pstake-ui-stake.jpg', 1919, 1248, 'The stake screen with four numbered callouts: the you-stake and you-receive panels, the exchange rate and network fee, the Liquid Stake button, and the APY and total value unlocked cards') + '</div>' +
    '<ol class="pts four-up">' +
      '<li><span class="n" aria-hidden="true">1</span><h4>One direction, two panels</h4><p>You stake → you receive, with balances and a MAX shortcut on the input.</p></li>' +
      '<li><span class="n" aria-hidden="true">2</span><h4>Outcome before signing</h4><p>Rate, estimated rewards and network fee sit above the button.</p></li>' +
      '<li><span class="n" aria-hidden="true">3</span><h4>One clear primary action</h4><p>Liquid Stake is the only coral button on the screen, and it glows only when it’s ready.</p></li>' +
      '<li><span class="n" aria-hidden="true">4</span><h4>Context without another tab</h4><p>APY and total value unlocked sit right under the card, so yield is never a separate trip.</p></li>' +
    '</ol>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('06', 'Key decision B') +
    '<h2>Unstaking is a process, not a button.</h2>' +
    '<p class="lede">Waiting days for funds feels like losing them. The exit flow states the time and the fee of every path before anyone commits.</p>' +
    '<div class="shot">' + img('pstake-ui-unstake.jpg', 1919, 1252, 'The unstake screen with three numbered callouts: the Flash and Regular unstake method cards, the exchange rate above the methods, and a disabled Enter an amount button') + '</div>' +
    '<ol class="notes three">' +
      '<li><span class="n" aria-hidden="true">1</span><h4>Methods as choices</h4><p>Flash and Regular unstake are selectable cards, each showing its time and fee.</p></li>' +
      '<li><span class="n" aria-hidden="true">2</span><h4>Rate before amount</h4><p>The live exchange rate sits above the methods, so the amount you receive is never a surprise.</p></li>' +
      '<li><span class="n" aria-hidden="true">3</span><h4>No surprises on exit</h4><p>The action stays disabled until an amount is entered, so nothing fires by accident.</p></li>' +
    '</ol>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('07', 'Key decision C') +
    '<h2>A chain switch changes everything.</h2>' +
    '<p class="lede">Assets and actions are per network, so the active chain and the connected wallet stay visible, and every change is one deliberate step away.</p>' +
    '<div class="duo"><figure>' + img('pstake-ui-menus.jpg', 939, 687, 'Header menus: the select-network list with Persistence checked, and the wallet menu showing the connected address, balance, copy address, view on explorer and disconnect') + '</figure>' +
    '<figure>' + img('pstake-ui-wallet.jpg', 939, 687, 'The connect wallet dialog, with popular wallets grouped above more wallets and the installed one tagged Detected') + '</figure></div>' +
    '<ol class="notes three">' +
      '<li><span class="n" aria-hidden="true">1</span><h4>Active network, always visible</h4><p>The header chip names the chain; the menu marks the one in use with a check.</p></li>' +
      '<li><span class="n" aria-hidden="true">2</span><h4>Wallet actions in one place</h4><p>Balance, copy and explorer sit together. Disconnect stays apart, in coral.</p></li>' +
      '<li><span class="n" aria-hidden="true">3</span><h4>Connect without guessing</h4><p>Wallets are grouped, and the one already installed is tagged as Detected.</p></li>' +
    '</ol>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eyebrow('08', 'Learnings') +
    '<h2>What I’d carry into any trust-heavy product.</h2>' +
    '<ol class="learn">' +
      '<li><span class="big">01</span><div><h4>State before action.</h4><p>Show what an asset is, available, staked, unstaking, pooled, before asking what to do with it.</p></div></li>' +
      '<li><span class="big">02</span><div><h4>Make the exit legible.</h4><p>Spell out the time and fee of every way out, so waiting never reads as lost funds.</p></div></li>' +
      '<li><span class="big">03</span><div><h4>Chain context everywhere.</h4><p>Assets and actions are per network. Keep the active chain visible and easy to switch.</p></div></li>' +
      '<li><span class="big">04</span><div><h4>Keep staking and pools apart.</h4><p>Different risks and returns deserve different language, not one shared “Earn” button.</p></div></li>' +
    '</ol>' +
  '</div></section>' +

  '<section class="sec end"><div class="wrap">' +
    '<p class="endtag">That’s the end — thanks</p><h2>Thanks for reading.</h2>' +
    '<p class="lede">I design trust-heavy, multi-step money flows, staking, trading and onboarding that people actually depend on.</p>' +
    '<div class="btns"><a class="btn pri" href="mailto:sudheer.darla11@gmail.com">Say hi ' + arr + '<span class="sr"> (opens your email app)</span></a>' +
      '<a class="btn" href="https://www.linkedin.com/in/sudheer-darla-a9496956/" target="_blank" rel="noopener">LinkedIn ' + arr + '<span class="sr"> (opens in a new tab)</span></a>' +
      '<a class="btn" href="https://x.com/sudheerdarla_" target="_blank" rel="noopener">X ' + arr + '<span class="sr"> (opens in a new tab)</span></a></div>' +
  '</div></section>' +
  '</article>';
})();
