/* Comdex case study content (rendered as HTML inside the side panel). */
window.COMDEX_CS = (function () {
  var arr = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  var big = '<svg class="arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function eb(n, t) { return '<p class="eyebrow"><b>' + n + '</b><i></i>' + t + '</p>'; }
  function img(f, w, h, alt, eager) { return '<img class="ui" src="img/' + f + '" width="' + w + '" height="' + h + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" alt="' + alt + '">'; }
  function row(a, b) { return '<div class="rw"><em>' + a + '</em><b>' + b + '</b></div>'; }
  function phase(n, t, items) { return '<li class="phase"><small>Phase ' + n + '</small><h4>' + t + '</h4><ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></li>'; }
  function step(n, name, items, cls) { return '<li class="step' + (cls ? ' ' + cls : '') + '"><span class="chip"><i>' + n + '</i>' + name + '</span><ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></li>'; }
  function key(n, b, t) { return '<li><span class="n" aria-hidden="true">' + n + '</span><p><b>' + b + '</b> ' + t + '</p></li>'; }
  function lcard(n, h, p) { return '<li class="lcard"><em>' + n + '</em><h4>' + h + '</h4><p>' + p + '</p></li>'; }

  return '<article class="cs cx">' +
  '<section class="sec hero"><div class="wrap">' +
    '<p class="pills"><span>Case study</span><span>Fintech · Blockchain</span><span>B2B SaaS</span></p>' +
    '<h1><span class="dim">The blockchain platform for</span> global commodity trade.</h1>' +
    '<p class="lede">Commodity deals in a $17T market still run on emails, calls and PDFs. I designed Comdex end-to-end — one desktop product that feels like a trading terminal and takes a deal from discovery to settlement.</p>' +
    '<dl class="meta"><div><dt>Role</dt><dd>Sole product designer</dd></div><div><dt>Team</dt><dd>1 PM · 3 engineers</dd></div><div><dt>Scope</dt><dd>Website · 3 modules · Block explorer</dd></div><div><dt>Platform</dt><dd>Desktop web app</dd></div><div><dt>Year</dt><dd>2019</dd></div></dl>' +
    '<figure>' + img('comdex-ui-dash.jpg', 1937, 1437, 'The Comdex trader dashboard: wallet balance, receivables and payables, a buy versus sell volume chart, trade statistics, team activity, market news and a table of traders', true) + '</figure>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + '<p class="eyebrow"><b>Impact</b><i></i>At a glance</p>' +
    '<ul class="cards"><li class="card"><strong>$10M+</strong><span>Pilot trade volume processed on the platform</span></li><li class="card"><strong>Days → 1</strong><span>Multi-day email/PDF loop cut to a single Deal Room session</span></li><li class="card"><strong>5</strong><span>Core flows shipped as handoff-ready hi-fi</span></li><li class="card"><strong>3 + 1</strong><span>Product modules, plus a public block explorer</span></li></ul>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eb('01', 'Problem') +
    '<h2>Global trade ran on inboxes, not infrastructure.</h2>' +
    '<p class="lede">Deals were stitched together from emails, calls, PDFs and manual checks — so terms and settlement were slow, and trust between counterparties was hard to establish.</p>' +
    '<div class="table"><div class="hd"><span>Pain point</span><span>Design response</span></div>' +
      row('Paper title in transit', 'On-chain title + document pack, kept in the Deal Room') +
      row('Correspondent-bank lag', 'Escrow + dUSD, so capital isn’t stuck overnight') +
      row('Opaque counterparties', 'One Comdex ID with reusable KYC and reputation') +
    '</div>' +
    '<div class="solution"><small>The solution</small><p>Comdex unifies discovery, negotiation and settlement into <b>one closed-loop system of record</b> — find a counterparty, agree terms, and settle with confidence.</p></div>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eb('02', 'Process') +
    '<h2>Research to handoff in four phases.</h2>' +
    '<ol class="phases">' +
      phase(1, 'Discover', ['Market &amp; gap research', 'Competitors', 'User personas']) +
      phase(2, 'Define', ['Constraints', 'Problem statement', 'User flows']) +
      phase(3, 'Develop', ['Mocks', 'Lo-fi prototype', 'Test with traders']) +
      phase(4, 'Deliver', ['Hi-fi prototype', 'Engineering handoff']) +
    '</ol>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eb('03', 'IA &amp; user flow') +
    '<h2>One closed loop, from sign-up to settlement.</h2>' +
    '<p class="lede">Seven steps cover the whole deal, so a trader never leaves Comdex to finish one.</p>' +
    '<ol class="flow">' +
      step(0, 'Auth', ['Log in / Sign up', 'Comdex ID', 'KYC'], 'lt') +
      step(1, 'Hub', ['Discovery', 'Settlement', 'Finance']) +
      step(2, 'Discovery', ['Dashboard', 'Markets', 'Orders', 'New sell order']) +
      step(3, 'Create order', ['Commodity', 'Docs', 'Confirm']) +
      step(4, 'Deal Room', ['Negotiate', 'Counter', 'Accept', 'Documents'], 'hot') +
      step(5, 'Settlement', ['Escrow', 'dUSD pay', 'Title transfer'], 'hot') +
      step(6, 'Finance', ['Sell offer', 'Order book', 'Finance request'], 'lt') +
    '</ol>' +
    '<p class="legend">Where the old process lost days — the core of the redesign</p>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eb('04', 'Key decisions') +
    '<h2>Three screens that made the loop work.</h2>' +
    '<div class="dec"><p class="lab">A — Comdex ID &amp; KYC</p><h3>One verified record for every counterparty <span>— powering KYC, settlement and compliance from a single source of truth.</span></h3>' +
      '<div class="shot">' + img('comdex-ui-kyc.jpg', 1939, 1378, 'Trader onboarding: a setup progress stepper on the left and the organization profile form on the right, with registration zone, legal details and beneficial owners') + '</div>' +
      '<ol class="keys two">' + key(1, 'Guided stepper.', 'Traders always see what’s verified and what’s left.') + key(2, 'Verify once, reuse everywhere.', 'The Comdex ID follows the trader into every deal and counterparty check.') + '</ol></div>' +
    '<div class="dec"><p class="lab">B — New sell order</p><h3>Lead with the irreversible choice <span>— pick the listing type first, and let the form follow.</span></h3>' +
      '<div class="shot">' + img('comdex-ui-order.jpg', 1937, 1372, 'The new sell order form: listing type cards, commodity and shipment details, and a live order summary with the total shipment value') + '</div>' +
      '<ol class="keys three">' + key(1, 'Listing type up top.', 'It’s the one choice that can’t be undone, so everything below adapts to it.') + key(2, 'Fields mirror trade documents.', 'Traders fill in what they already know from paper — no new mental model.') + key(3, 'Running value, always visible.', 'The order total updates live, so there are no surprises at confirm.') + '</ol></div>' +
    '<div class="dec"><p class="lab">C — Fiat deposit</p><h3>Fiat in, trade unlocked <span>— no 24-hour correspondent-bank wait.</span></h3>' +
      '<div class="shot">' + img('comdex-ui-fiat.jpg', 1941, 1378, 'The add funds to your wallet dialog: bank transfer details with copy buttons, a reference to add to the transfer memo, a transaction ID field and a receipt upload') + '</div>' +
      '<ol class="keys three">' + key(1, 'Bank details, copy-ready.', 'Laid out like the wire slip traders already send.') + key(2, 'Reference ties the wire to you.', 'No back-and-forth to match a payment to an account.') + key(3, 'Upload proof, start trading.', 'Funds unlock as dUSD instead of waiting on a correspondent bank.') + '</ol></div>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eb('05', 'Outcome') +
    '<h2>Days of email became one session.</h2>' +
    '<div class="ba"><div><small>Before</small><p>A multi-day loop of emails, PDFs and correspondent banks.</p></div>' + big + '<div class="after"><small>After</small><p>A single Deal Room session — negotiate, document and settle in one place.</p></div></div>' +
    '<div class="shot" style="margin-top:28px">' + img('comdex-ui-trade.jpg', 1931, 1372, 'A completed trade from Malaysia to Hong Kong: order progress, trade summary with both parties’ feedback, an activity timeline, the final sale price and the contract documents') + '</div>' +
    '<ul class="figs"><li><strong>$10M+</strong><span>pilot trade volume</span></li><li><strong>5 flows</strong><span>handoff-ready hi-fi</span></li><li><strong>3 modules</strong><span>plus block explorer</span></li></ul>' +
    '<div class="next"><h3>What I’d do next</h3><ul><li>Mobile companion app</li><li>Counterparty reputation graph</li><li>Live bank-rail status</li></ul></div>' +
  '</div></section>' +

  '<section class="sec"><div class="wrap">' + eb('06', 'Learnings') +
    '<h2>What I’d carry into any complex B2B product.</h2>' +
    '<ul class="lcards">' +
      lcard('01', 'Lead with the irreversible choice.', 'Ask for the listing type first, then let the form follow from it.') +
      lcard('02', 'Borrow the industry’s documents.', 'Reuse them as the UI pattern instead of inventing a new one.') +
      lcard('03', 'Identity is the happy path.', 'Treat reusable identity and running values as part of the core flow, not edge cases.') +
      lcard('04', 'Design settlement with discovery.', 'Do both in the same pass — or the product splits into two apps.') +
    '</ul>' +
  '</div></section>' +

  '<section class="sec end"><div class="wrap">' +
    '<p class="endtag">That’s the end — thanks</p><h2>Thanks for reading.</h2>' +
    '<p class="lede">Comdex · Case study · Sudheer Darla</p>' +
    '<div class="btns"><a class="btn pri" href="mailto:sudheer.darla11@gmail.com">Say hi ' + arr + '<span class="sr"> (opens your email app)</span></a>' +
      '<a class="btn" href="https://www.linkedin.com/in/sudheer-darla-a9496956/" target="_blank" rel="noopener">LinkedIn ' + arr + '<span class="sr"> (opens in a new tab)</span></a>' +
      '<a class="btn" href="https://x.com/sudheerdarla_" target="_blank" rel="noopener">X ' + arr + '<span class="sr"> (opens in a new tab)</span></a></div>' +
  '</div></section>' +
  '</article>';
})();
