/* CAPTL case study content (rendered as HTML inside the side panel). */
window.CAPTL_CS = (function () {
  var arr = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  var ck = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function tag(t) { return '<p><span class="tagp">' + t + '</span></p>'; }
  function img(f, w, h, alt, eager) { return '<img class="ui" src="../img/' + f + '" width="' + w + '" height="' + h + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" alt="' + alt + '">'; }
  function list(a, fn) { return a.map(fn).join(''); }
  function path(l, name, steps) { return '<li class="path"><div><span class="l" aria-hidden="true">' + l + '</span>' + name + '</div><ol>' + steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol></li>'; }
  function scr(n, h, p, bullets, file, w, h2, alt, rev) {
    return '<div class="scr' + (rev ? ' rev' : '') + '"><div><p class="n">' + n + '</p><h3>' + h + '</h3><p>' + p + '</p><ul>' + list(bullets, function (b) { return '<li>' + ck.replace('width="20" height="20"', 'width="18" height="18"') + '<span>' + b + '</span></li>'; }) + '</ul></div><figure>' + img(file, w, h2, alt) + '</figure></div>';
  }
  return '<article class="cs cp">' +
  '<section class="sec dark hero"><div class="wrap">' +
    '<p class="tags"><span>Case study</span><span>Product design · 2020</span><span>+3 engineers</span></p>' +
    '<h1>Investor OS — <span>trust, transparency, and compliance in one workspace.</span></h1>' +
    '<p class="lede">Private equity still runs on inboxes and shared drives. CAPTL gives a general partner one place to stand up a fund, attach LPs and portfolio companies, collect the papers, and hand work to the people who owe it.</p>' +
    '<ol class="six">' +
      list([['01', 'Register', 'Org + personal details'], ['02', 'Secure', '2FA before any fund data'], ['03', 'Command', 'Dashboard of every fund'], ['04', 'Build', 'Create fund + invite team'], ['05', 'Network', 'LPs and portfolio companies'], ['06', 'Operate', 'Docs, tasks, delegations']], function (x) { return '<li><em>' + x[0] + '</em><strong>' + x[1] + '</strong><span>' + x[2] + '</span></li>'; }) +
    '</ol>' +
    '<figure>' + img('captl-ui-hero.jpg', 1999, 1214, 'The CAPTL fund overview: fund corpus, capital commitment, distribution, drawdown and undrawn commitment cards, a fund comparison donut chart and metrics such as NAV, DPI, IRR, RVPI, MOIC and TVPI', true) + '</figure>' +
  '</div></section>' +

  '<section class="sec cream light"><div class="wrap">' + tag('About the project') +
    '<div class="about"><h2>A workspace for funds, people, and paper.</h2><p>CAPTL is an investor OS for PE fund partners. It turns a fund into a first-class object — connecting GPs, LPs, and portfolio companies in one workspace — so partners can create vehicles, attach the network, manage documents and tasks, and delegate reviews instead of chasing them across email and shared drives.</p></div>' +
    '<ul class="facts4"><li class="fact"><small>Role</small><b>Product design — brand, site, IA, key flows</b></li><li class="fact"><small>Domain</small><b>Private equity · Fund administration</b></li><li class="fact"><small>Platform</small><b>Web, desktop-first application</b></li><li class="fact"><small>Presence</small><b>captl.one · 2020</b></li></ul>' +
  '</div></section>' +

  '<section class="sec white light"><div class="wrap">' + tag('Problem statements') +
    '<h2>Funds were lists. Networks were spreadsheets. Tasks were email.</h2>' +
    '<ul class="bento">' +
      '<li><span class="num">01</span><h3>No fund home</h3><p>A partner could not open one screen and see every vehicle, its AUM, and who sits around it.</p></li>' +
      '<li><span class="num">02</span><h3>LP and portco were detached</h3><p>Investors and companies lived in a CRM or a folder. They were not first-class objects on the fund.</p></li>' +
      '<li><span class="num">03</span><h3>Creating a fund was a lawyer workflow</h3><p>Name, vehicle type, team, and first attachments were assembled offline, then retyped into admin tools.</p></li>' +
      '<li><span class="num">04</span><h3>Work had no owner inside the product</h3><p>Document collection and reviews bounced on email. Nothing said who owed what by when.</p></li>' +
    '</ul>' +
  '</div></section>' +

  '<section class="sec white light" style="padding-top:0"><div class="wrap">' + tag('Pain points') +
    '<h2>Four roles, four frictions.</h2>' +
    '<ul class="roles">' +
      '<li class="role"><header><span class="av" style="--bg:#fde9c8;--fg:#7a5a14" aria-hidden="true">GA</span><b>GP / Admin</b></header><p class="q" aria-hidden="true">“</p><p>Starts the day without a board of funds. Creating a vehicle means leaving the product. Inviting the team is a side channel.</p></li>' +
      '<li class="role"><header><span class="av" style="--bg:#e3ecf7;--fg:#2c4a70" aria-hidden="true">FT</span><b>Fund team</b></header><p class="q" aria-hidden="true">“</p><p>Cannot see which LPs or portcos are attached, which docs are missing, or which tasks are open on this fund.</p></li>' +
      '<li class="role"><header><span class="av" style="--bg:#dcf1e8;--fg:#1d6a4b" aria-hidden="true">LP</span><b>LP contact</b></header><p class="q" aria-hidden="true">“</p><p>Gets added as a row, not as a profile with documents, reports, and a relationship back to the vehicle.</p></li>' +
      '<li class="role"><header><span class="av" style="--bg:#eadff5;--fg:#5a3a82" aria-hidden="true">OS</span><b>Ops / Security</b></header><p class="q" aria-hidden="true">“</p><p>Delegation is tribal knowledge. Two-factor authentication exists in policy decks, not in the login path.</p></li>' +
    '</ul>' +
  '</div></section>' +

  '<section class="sec cream light"><div class="wrap">' + tag('Project timeline') +
    '<h2>How the product in this file grew.</h2>' +
    '<ol class="tl">' +
      list([['Auth path', 'Registration → 2FA setup → success → login. Security is the first product surface, not a settings afterthought.'], ['Fund home', 'Dashboard as a table of vehicles. The empty state tells the partner to create the first fund.'], ['Create + attach', 'Create New Fund, then add LPs and portfolio companies — the two objects that make a fund a network.'], ['Capital + ops', 'Cap table and units, Overview metrics, Fund Network, Fund Management, documents, delegations.']], function (x, i) { return '<li><span class="dot" aria-hidden="true">' + (i + 1) + '</span><em>0' + (i + 1) + '</em><h4>' + x[0] + '</h4><p>' + x[1] + '</p></li>'; }) +
    '</ol>' +
  '</div></section>' +

  '<section class="sec white light"><div class="wrap">' + tag('IA · User flows') +
    '<h2>Every primary path that exists as a frame.</h2>' +
    '<ul class="paths">' +
      path('A', 'First session', ['Registration', '2FA setup', 'Success', 'Login', 'Dashboard (empty)']) +
      path('B', 'Stand up a vehicle', ['Dashboard', 'Create New Fund', 'Name / type / team', 'Fund lands on the dashboard']) +
      path('C', 'Build the network', ['Fund', 'Add LP &amp; Portfolio', 'View LP &amp; Portfolio', 'Fund Network']) +
      path('D', 'Define the economics', ['Analytics', 'Cap table', 'Create units', 'Issue units', 'Overview metrics']) +
      path('E', 'Run the fund', ['Fund Management', 'Documents + tasks', 'Fund Details', 'Delegations']) +
      path('F', 'Return visit', ['Login', '2FA challenge', 'Dashboard of existing funds']) +
    '</ul>' +
  '</div></section>' +

  '<section class="sec dark"><div class="wrap">' + tag('Shipped') +
    '<h2>What left the canvas.</h2>' +
    '<ul class="ship">' +
      list([['Brand system', 'Spaced C A P T L, geometric mark, gold / cream / charcoal, print letterhead.'], ['Marketing site', 'Landing, thesis, features, request demo, mobile views.'], ['Auth front door', 'Registration, welcome, login, 2FA setup and challenge.'], ['Dashboard', 'All funds in one table, with an empty-state create CTA.'], ['Create New Fund', 'Name, type, team — vehicle as a first-class object.'], ['Add LP &amp; Portfolio', 'Attach both sides of the network to the fund.'], ['Cap table + units', 'Create the cap table, define unit classes, issue units.'], ['Fund Overview', 'Commitments, multiples, life-cycle timeline, unit classes.'], ['Fund Network', 'LPs / portfolios columns, documents, and tasks.'], ['Fund Management', 'Operational home: documents in, tasks out.'], ['Delegations', 'Hand a document or review to someone in the network.'], ['Trust features', 'Integrity checks, region compliance, multi-layer verification.']], function (x, i) { return '<li><em>' + (i < 9 ? '0' : '') + (i + 1) + '</em><h4>' + x[0] + '</h4><p>' + x[1] + '</p></li>'; }) +
    '</ul>' +
  '</div></section>' +

  '<section class="sec cream light"><div class="wrap">' + tag('Annotated screens') +
    '<h2>What each key screen is for.</h2>' +
    scr('01', 'Overview — pulse of one fund', 'After a partner opens a vehicle, this is the first read: allocation mix, commitments, performance multiples, life-cycle, and unit classes. Overview is a quote sheet, not a chart dump.', ['Zeros (DPI, IRR) are early-fund states, not missing data.', 'Cap table, Capital calls, and Dist. waterfall sit under this summary.', 'The timeline is a record of the vehicle’s life, not only a sparkline.'], 'captl-ui-overview.jpg', 1268, 928, 'The fund overview screen with fund corpus and commitment cards, a comparison donut chart and performance metrics') +
    scr('02', 'Cap table — set up ownership', 'A wizard, not a report. Create the cap table, define unit classes, then issue units. Each step can be finished here or handed off with Assign task.', ['Issuing units stays locked until units exist — you cannot issue what you have not defined.', 'Assign task keeps legal and ops inside the product.', 'This must exist before capital calls or the waterfall can run.'], 'captl-ui-cap.jpg', 1268, 932, 'The analytics screen, cap table tab: a two-step wizard to create fund units and then issue them, with a before-you-start checklist and a cap table summary', true) +
    scr('03', 'Add Fund — papers, LPs, portfolios', 'Step 2 of standing up a vehicle: attach the trust deed and IMA, invite limited partners, add portfolio companies, then submit. This is the moment a name becomes a live fund.', ['Upload or delegate — documents do not stall the create flow.', 'Invited LPs carry tax ID and reps &amp; warranties on the same card.', 'Submit is the last gate; Back keeps the draft.'], 'captl-ui-addfund.jpg', 1268, 928, 'The add new fund screen, step 2 of 2: fund creation documents with upload or delegate, limited partners and a submission checklist') +
    scr('04', 'Fund Network — see the graph', 'Who sits around this fund. Team, service providers, LPs and portfolios — with documents and tasks hanging off the graph. The fund is a set of relationships, not a folder.', ['Role groups make both sides of private markets explicit.', 'Docs and tasks park on the network, not in a generic inbox.', 'A real fund has more nodes than a dashboard row — the groups scale.'], 'captl-ui-network.jpg', 1268, 928, 'The fund network screen: partners, principals, associates and analysts in role groups with selectable cards', true) +
    scr('05', 'Fund Management — run the work', 'Operations home for every vehicle. Listed funds, vintage, created date, and the door to add another. This is where a partner or ops lead spends the week.', ['Scoped list of vehicles, unlike the all-metrics Overview.', 'Add Fund is the same empty-state promise as the first dashboard.', 'Pairs with Fund Details (profile) and Delegations (handoff).'], 'captl-ui-mgmt.jpg', 1268, 930, 'The fund management screen: a table of listed funds with vintage and created date and a stand up another vehicle prompt') +
  '</div></section>' +

  '<section class="sec white light"><div class="wrap">' + tag('Learnings') +
    '<h2>What this product taught the design.</h2>' +
    '<ul class="lc">' +
      '<li><em>01</em><h4>The empty dashboard is the onboarding.</h4><p>Nothing in the fund table is the prompt to create the first vehicle — not a dead end.</p></li>' +
      '<li><em>02</em><h4>A fund is a network, not a folder.</h4><p>LPs, portcos, documents, and tasks only work when they hang off one vehicle.</p></li>' +
      '<li><em>03</em><h4>Every setup step must be assignable.</h4><p>Cap table, units, papers, invites — if it cannot be delegated, the flow leaves the product and dies in email.</p></li>' +
    '</ul>' +
  '</div></section>' +

  '<section class="sec dark"><div class="wrap">' + tag('Outcomes') +
    '<h2>What the file now holds as a product.</h2>' +
    '<ul class="out">' +
      '<li><span class="ck">' + ck + '</span><h4>One OS instead of a pile of tools.</h4><p>Brand, site, auth, fund create, network, documents, and delegations sit in a single product a GP can open after login.</p></li>' +
      '<li><span class="ck">' + ck + '</span><h4>A fund can be stood up in-product.</h4><p>Name the vehicle, attach papers, invite LPs, add portcos, define units — without leaving CAPTL for email or a shared drive.</p></li>' +
      '<li><span class="ck">' + ck + '</span><h4>Ops has an owner.</h4><p>Documents, cap-table steps, and reviews can be assigned inside the fund, so work stays on the vehicle instead of in someone’s inbox.</p></li>' +
    '</ul>' +
  '</div></section>' +

  '<section class="sec end"><div class="wrap">' +
    '<p class="endtag">That’s the end — thanks</p><h2>Thanks for reading.</h2>' +
    '<p class="lede">I design trust-heavy, multi-step products people actually depend on.</p>' +
    '<div class="btns"><a class="btn pri" href="mailto:sudheer.darla11@gmail.com">Say hi ' + arr + '<span class="sr"> (opens your email app)</span></a>' +
      '<a class="btn" href="https://www.linkedin.com/in/sudheerdarla/" target="_blank" rel="noopener">LinkedIn ' + arr + '<span class="sr"> (opens in a new tab)</span></a>' +
      '<a class="btn" href="https://x.com/sudheerdarla_" target="_blank" rel="noopener">X ' + arr + '<span class="sr"> (opens in a new tab)</span></a></div>' +
  '</div></section>' +
  '</article>';
})();
