/* Case study content + one shared renderer.
   Every study uses the same sections in the same order; only the content inside each section differs. */
(function () {
  var IMG = '../img/';

  var CASES = {
    pstake: {
      name: 'pSTAKE Finance',
      kicker: ['Case study', 'Web3', 'Liquid staking'],
      title: 'Staking people can actually read.',
      lede: 'pSTAKE Finance is a liquid staking wallet that held $20–30M in assets under management. I shaped how holders see an asset, act on it and know what state it is in, without needing to become protocol experts.',
      facts: [['Role', 'Product designer'], ['Year', '2022, Dubai'], ['Platform', 'Desktop web app'], ['Scope', 'Dashboard, network, stake, unstake, DeFi']],
      hero: { src: 'pstake-cs-hero.jpg', w: 1440, h: 1024, alt: 'The pSTAKE stake screen: OSMO staked for stkOSMO with the exchange rate and network fee, a Liquid Stake button, APY and total value unlocked cards, a network selector, the chosen unstaking method and a stake confirmation.' },
      stats: [['$20–30M', 'Assets under management held in the wallet'], ['5', 'Product surfaces owned end to end'], ['2', 'Exit paths made explicit, with time and fee']],
      sections: [
        { label: 'Overview', title: 'One place to hold, stake, unstake, use DeFi and read history.',
          lede: 'Holders were stitching together staking sites, swaps, explorers and spreadsheets. pSTAKE brought it into one product with the chain context built in, so every balance has a clear state and every action a clear outcome.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I owned', items: ['Dashboard and portfolio view', 'Network switch', 'Stake and unstake, 14-day or instant exit', 'DeFi tab: create and add to pools', 'How rewards and activity show up'] },
            { title: 'Outside my scope', muted: true, items: ['Smart contracts', 'APY calculation', 'Which chains launched'] }] }] },
        { label: 'Problem', title: 'Holders wanted a token working, not five apps.',
          blocks: [
            { type: 'quote', text: '“I want this token working” meant five apps and a manual checklist. Too many tools for one intention.', cite: 'The job every holder came with' },
            { type: 'cards', cols: 2, items: [
              { title: 'Blockchain state is invisible.', text: 'Available, staked, unstaking, pooled and rewards all feel like “my money”, but each behaves differently.' },
              { title: 'Unstaking is a process, not a button.', text: 'The standard exit takes 14 days and the instant exit costs a fee. Without that context, people assume their funds are lost.' },
              { title: 'A chain switch changes everything.', text: 'Assets and actions belong to a network. A single global wallet balance hides that.' },
              { title: 'DeFi adds vocabulary and risk.', text: 'Pools behave differently from staking, so they cannot share one “Earn” button with no explanation.' }] }] },
        { label: 'Pain points', title: 'Six moments where people got stuck.',
          lede: 'Each one traced back to a missing piece of state or context, so each one got a direct design response.',
          blocks: [{ type: 'cards', cols: 3, items: [
            { tag: 'Next step', title: 'Idle tokens in a wallet, and no trusted next step inside the same app.', foot: 'A stake card with MAX, and a DeFi next step after staking.' },
            { tag: 'Pending transaction', title: '“I signed. Now what?” A pending transaction with no translation.', foot: 'A confirmation that names the balance you now hold.' },
            { tag: 'Unbonding', title: 'Unstaked yesterday, balance unchanged, still inside the 14-day window.', foot: 'Exit methods that state time and fee before you commit.' },
            { tag: 'Wrong chain', title: 'The same token name on two chains, and the user acts on the wrong one.', foot: 'The active chain is always visible and one click to switch.' },
            { tag: 'Rewards', title: 'Rewards exist, but it is unclear whether to claim, leave or restake.', foot: 'A position card that separates balances by state.' },
            { tag: 'Yield', title: 'Pool returns and staking yield mixed into one story.', foot: 'DeFi kept as its own tab, with its own language.' }] }] },
        { label: 'Structure', title: 'One mental model: network, asset, state, action.',
          lede: 'Every screen answers the same four questions in the same order: where am I, what do I hold, what is it doing, and what can I do next.',
          blocks: [{ type: 'columns', items: [
            { title: 'Network', sub: 'Where am I?', items: ['Persistence', 'BNB Smart Chain'] },
            { title: 'Asset', sub: 'What do I hold?', items: ['OSMO', 'stkOSMO', 'ATOM', 'stkATOM'] },
            { title: 'State', sub: 'What is it doing?', items: ['Available', 'Staked', 'Unstaking', 'Pooled', 'Rewards'] },
            { title: 'Action', sub: 'What can I do next?', items: ['Stake', 'Unstake, 14 days or instant', 'Add to pool', 'Claim', 'Restake'], strong: true }] }] },
        { label: 'Key decisions', title: 'Three decisions that made state readable.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'Make state visible before asking for action.',
              text: 'The stake flow reads top to bottom like a receipt: what you give, what you get, what it costs, and where it leaves your position.',
              images: [{ src: 'pstake-ui-stake.jpg', w: 1919, h: 1248, alt: 'The stake screen with four numbered callouts: the you-stake and you-receive panels, the exchange rate and network fee, the Liquid Stake button, and the APY and total value unlocked cards.' }],
              points: [['One direction, two panels', 'You stake, then you receive, with balances and a MAX shortcut on the input.'], ['Outcome before signing', 'Rate, estimated rewards and network fee sit above the button.'], ['One clear primary action', 'Liquid Stake is the only filled button on the screen, and it activates only when the input is valid.'], ['Context without another tab', 'APY and total value unlocked sit right under the card, so yield is never a separate trip.']] },
            { type: 'decision', label: 'Decision B', title: 'Unstaking is a process, not a button.',
              text: 'Waiting days for funds feels like losing them. The exit flow states the time and fee of every path before anyone commits.',
              images: [{ src: 'pstake-ui-unstake.jpg', w: 1919, h: 1252, alt: 'The unstake screen with three numbered callouts: the Flash and Regular unstake method cards, the exchange rate above the methods, and a disabled Enter an amount button.' }],
              points: [['Methods as choices', 'Flash and Regular unstake are selectable cards, each showing its time and fee.'], ['Rate before amount', 'The live exchange rate sits above the methods, so the amount you receive is never a surprise.'], ['No accidental exits', 'The action stays disabled until an amount is entered, so nothing fires by accident.']] },
            { type: 'decision', label: 'Decision C', title: 'A chain switch changes everything.',
              text: 'Assets and actions belong to a network, so the active chain and the connected wallet stay visible, and every change is one deliberate step away.',
              images: [{ src: 'pstake-ui-menus.jpg', w: 939, h: 687, alt: 'Header menus: the network list with Persistence checked, and the wallet menu with the connected address, balance, copy address, view on explorer and disconnect.' }, { src: 'pstake-ui-wallet.jpg', w: 939, h: 687, alt: 'The connect wallet dialog, with popular wallets grouped above more wallets and the installed one tagged Detected.' }],
              points: [['Active network, always visible', 'The header chip names the chain, and the menu marks the one in use with a check.'], ['Wallet actions in one place', 'Balance, copy and explorer sit together. Disconnect stays apart.'], ['Connect without guessing', 'Wallets are grouped, and the one already installed is tagged Detected.']] }] },
        { label: 'Outcome', title: 'A wallet people trusted with $20–30M.',
          lede: 'pSTAKE held $20–30M in assets under management. Each of the six stuck moments now has a direct answer on screen.',
          blocks: [{ type: 'cards', cols: 3, items: [
            { title: 'Balances by state', text: 'Available, staked, unstaking, pooled and rewards are shown separately, so “my money” always has a status.' },
            { title: 'Exits with time and fee', text: 'Both unstaking paths state how long they take and what they cost before the user signs.' },
            { title: 'Network always in view', text: 'The active chain and wallet sit in the header, so no action happens on the wrong network.' }] }] },
        { label: 'Learnings', title: 'What I would carry into any trust-heavy product.',
          blocks: [{ type: 'numbered', items: [
            ['State before action.', 'Show what an asset is doing (available, staked, unstaking, pooled) before asking what to do with it.'],
            ['Make the exit legible.', 'Spell out the time and fee of every way out, so waiting never reads as lost funds.'],
            ['Chain context everywhere.', 'Assets and actions belong to a network. Keep the active chain visible and easy to switch.'],
            ['Keep staking and pools apart.', 'Different risks and returns deserve different language, not one shared “Earn” button.']] }] }
      ]
    },

    comdex: {
      name: 'Comdex',
      kicker: ['Case study', 'Fintech', 'B2B commodity trading'],
      title: 'One platform for global commodity trade, from discovery to settlement.',
      lede: 'Commodity deals in a $17T market still run on emails, calls and PDFs. I designed Comdex end to end: one desktop product that works like a trading terminal and takes a deal from discovery to settlement.',
      facts: [['Role', 'Product designer'], ['Team', '1 PM, 3 engineers'], ['Year', '2019'], ['Platform', 'Desktop web app']],
      hero: { src: 'comdex-ui-dash.jpg', w: 1937, h: 1437, alt: 'The Comdex trader dashboard: wallet balance, receivables and payables, a buy versus sell volume chart, trade statistics, team activity, market news and a table of traders.' },
      stats: [['$10M+', 'Pilot trade volume processed on the platform'], ['Days to 1', 'A multi-day email and PDF loop became one Deal Room session'], ['3 + 1', 'Product modules, plus a public block explorer']],
      sections: [
        { label: 'Overview', title: 'One closed-loop system of record for a trade.',
          lede: 'Comdex brings discovery, negotiation and settlement into one product, so a trader can find a counterparty, agree terms and settle with confidence without leaving it.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I designed', items: ['Marketing website', 'Discovery: markets, orders and new listings', 'Settlement: Deal Room, escrow and title transfer', 'Finance: sell offers and finance requests', 'Public block explorer'] },
            { title: 'How I worked', muted: true, items: ['With 1 PM and 3 engineers', 'Tested flows with traders', 'Five core flows handed off as hi-fi'] }] }] },
        { label: 'Problem', title: 'Global trade ran on inboxes, not infrastructure.',
          lede: 'Deals were stitched together from emails, calls, PDFs and manual checks, so terms and settlement were slow and trust between counterparties was hard to establish.',
          blocks: [{ type: 'table', head: ['Pain point', 'Design response'], rows: [
            ['Paper title in transit', 'On-chain title and a document pack, kept in the Deal Room'],
            ['Correspondent-bank delays', 'Escrow and dUSD, so capital is not stuck overnight'],
            ['Unknown counterparties', 'One Comdex ID with reusable KYC and reputation']] }] },
        { label: 'Process', title: 'From research to handoff in four phases.',
          blocks: [{ type: 'cards', cols: 4, items: [
            { tag: 'Phase 1', title: 'Discover', list: ['Market and gap research', 'Competitor review', 'User personas'] },
            { tag: 'Phase 2', title: 'Define', list: ['Constraints', 'Problem statement', 'User flows'] },
            { tag: 'Phase 3', title: 'Develop', list: ['Mock-ups', 'Lo-fi prototype', 'Tests with traders'] },
            { tag: 'Phase 4', title: 'Deliver', list: ['Hi-fi prototype', 'Engineering handoff'] }] }] },
        { label: 'Structure', title: 'One closed loop, from sign-up to settlement.',
          lede: 'Seven steps cover the whole deal, so a trader never leaves Comdex to finish one.',
          blocks: [{ type: 'flow', legend: 'Marked steps are where the old process lost days, and the core of the redesign.', rows: [
            ['Sign in', ['Log in or sign up', 'Comdex ID', 'KYC']],
            ['Hub', ['Discovery', 'Settlement', 'Finance']],
            ['Discovery', ['Dashboard', 'Markets', 'Orders', 'New sell order']],
            ['Create order', ['Commodity', 'Documents', 'Confirm']],
            ['Deal Room', ['Negotiate', 'Counter', 'Accept', 'Documents'], true],
            ['Settlement', ['Escrow', 'dUSD payment', 'Title transfer'], true],
            ['Finance', ['Sell offer', 'Order book', 'Finance request']]] }] },
        { label: 'Key decisions', title: 'Three screens that made the loop work.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'One verified record for every counterparty.',
              text: 'A single Comdex ID powers KYC, settlement and compliance from one source of truth.',
              images: [{ src: 'comdex-ui-kyc.jpg', w: 1939, h: 1378, alt: 'Trader onboarding: a setup progress stepper on the left and the organization profile form on the right, with registration zone, legal details and beneficial owners.' }],
              points: [['Guided stepper', 'Traders always see what is verified and what is left.'], ['Verify once, reuse everywhere', 'The Comdex ID follows the trader into every deal and counterparty check.']] },
            { type: 'decision', label: 'Decision B', title: 'Lead with the choice that cannot be undone.',
              text: 'The new sell order asks for the listing type first, and the rest of the form follows from it.',
              images: [{ src: 'comdex-ui-order.jpg', w: 1937, h: 1372, alt: 'The new sell order form: listing type cards, commodity and shipment details, and a live order summary with the total shipment value.' }],
              points: [['Listing type first', 'It is the one choice that cannot be undone, so everything below adapts to it.'], ['Fields mirror trade documents', 'Traders fill in what they already know from paper, with no new mental model.'], ['Running total, always visible', 'The order value updates live, so there are no surprises at confirmation.']] },
            { type: 'decision', label: 'Decision C', title: 'Fiat in, trading unlocked.',
              text: 'Deposits no longer wait 24 hours on a correspondent bank.',
              images: [{ src: 'comdex-ui-fiat.jpg', w: 1941, h: 1378, alt: 'The add funds dialog: bank transfer details with copy buttons, a reference for the transfer memo, a transaction ID field and a receipt upload.' }],
              points: [['Bank details, ready to copy', 'Laid out like the wire slip traders already send.'], ['A reference ties the wire to you', 'No back and forth to match a payment to an account.'], ['Upload proof, start trading', 'Funds unlock as dUSD instead of waiting on a correspondent bank.']] }] },
        { label: 'Outcome', title: 'Days of email became one session.',
          blocks: [
            { type: 'compare', before: 'A multi-day loop of emails, PDFs and correspondent banks.', after: 'A single Deal Room session to negotiate, document and settle in one place.' },
            { type: 'figure', img: { src: 'comdex-ui-trade.jpg', w: 1931, h: 1372, alt: 'A completed trade from Malaysia to Hong Kong: order progress, trade summary with feedback from both parties, an activity timeline, the final sale price and the contract documents.' }, caption: 'A completed trade: progress, summary, timeline and contract documents in one view.' },
            { type: 'chips', title: 'What I would do next', items: ['Mobile companion app', 'Counterparty reputation graph', 'Live bank-rail status'] }] },
        { label: 'Learnings', title: 'What I would carry into any complex B2B product.',
          blocks: [{ type: 'numbered', items: [
            ['Lead with the irreversible choice.', 'Ask for the listing type first, then let the form follow from it.'],
            ['Borrow the industry’s documents.', 'Reuse them as the interface pattern instead of inventing a new one.'],
            ['Identity is the happy path.', 'Treat reusable identity and running totals as part of the core flow, not edge cases.'],
            ['Design settlement with discovery.', 'Do both in the same pass, or the product splits into two apps.']] }] }
      ]
    },

    captl: {
      name: 'CAPTL',
      kicker: ['Case study', 'Fintech', 'Private equity'],
      title: 'An investor workspace for funds, people and paperwork.',
      lede: 'Private equity still runs on inboxes and shared drives. CAPTL gives a general partner one place to stand up a fund, attach LPs and portfolio companies, collect the documents and hand work to the people who owe it.',
      facts: [['Role', 'Product designer: brand, site, IA, key flows'], ['Team', '3 engineers'], ['Year', '2020'], ['Platform', 'Web, desktop first']],
      hero: { src: 'captl-ui-hero.jpg', w: 1999, h: 1214, alt: 'The CAPTL fund overview: fund corpus, capital commitment, distribution, drawdown and undrawn commitment cards, a fund comparison donut chart and metrics such as NAV, DPI, IRR, RVPI, MOIC and TVPI.' },
      stats: [['12', 'Product surfaces shipped, from brand to delegations'], ['6', 'Primary user flows designed as frames'], ['4', 'Roles served: GP, fund team, LP and ops']],
      sections: [
        { label: 'Overview', title: 'A fund as a first-class object.',
          lede: 'CAPTL is an investor workspace for private equity fund partners. It connects GPs, LPs and portfolio companies around each fund, so partners can create vehicles, attach their network, manage documents and tasks, and delegate reviews instead of chasing them across email.',
          blocks: [{ type: 'steps', items: [['Register', 'Organization and personal details'], ['Secure', 'Two-factor before any fund data'], ['Command', 'A dashboard of every fund'], ['Build', 'Create a fund and invite the team'], ['Network', 'Attach LPs and portfolio companies'], ['Operate', 'Documents, tasks and delegations']] }] },
        { label: 'Problem', title: 'Funds were lists. Networks were spreadsheets. Tasks were email.',
          blocks: [{ type: 'cards', cols: 2, items: [
            { title: 'No home for a fund', text: 'A partner could not open one screen and see every vehicle, its assets under management and who sits around it.' },
            { title: 'LPs and portfolio companies were detached', text: 'Investors and companies lived in a CRM or a folder, not as first-class objects on the fund.' },
            { title: 'Creating a fund was a lawyer’s workflow', text: 'Name, vehicle type, team and first documents were assembled offline, then retyped into admin tools.' },
            { title: 'Work had no owner inside the product', text: 'Document collection and reviews bounced around email. Nothing said who owed what by when.' }] }] },
        { label: 'Users', title: 'Four roles, four frictions.',
          blocks: [{ type: 'cards', cols: 2, items: [
            { tag: 'GP or admin', text: 'Starts the day without a view of their funds. Creating a vehicle means leaving the product, and inviting the team happens on the side.' },
            { tag: 'Fund team', text: 'Cannot see which LPs or portfolio companies are attached, which documents are missing, or which tasks are open on a fund.' },
            { tag: 'LP contact', text: 'Gets added as a row, not as a profile with documents, reports and a relationship back to the vehicle.' },
            { tag: 'Ops and security', text: 'Delegation is tribal knowledge. Two-factor authentication exists in policy decks, not in the login path.' }] }] },
        { label: 'Structure', title: 'Every primary path, designed as a frame.',
          lede: 'The product grew in four stages, from the sign-in path to capital and operations. Six flows cover everything a partner does.',
          blocks: [{ type: 'flow', rows: [
            ['First session', ['Registration', 'Two-factor setup', 'Success', 'Login', 'Empty dashboard']],
            ['Stand up a fund', ['Dashboard', 'Create new fund', 'Name, type and team', 'Fund on the dashboard']],
            ['Build the network', ['Fund', 'Add LPs and portfolio', 'Review LPs and portfolio', 'Fund network']],
            ['Define the economics', ['Analytics', 'Cap table', 'Create units', 'Issue units', 'Overview metrics']],
            ['Run the fund', ['Fund management', 'Documents and tasks', 'Fund details', 'Delegations']],
            ['Return visit', ['Login', 'Two-factor check', 'Dashboard of existing funds']]] }] },
        { label: 'Key decisions', title: 'What each key screen is for.',
          blocks: [
            { type: 'decision', label: 'Screen 1', title: 'Overview: the pulse of one fund.',
              text: 'The first read after opening a vehicle: allocation, commitments, performance multiples, life cycle and unit classes. A summary sheet, not a wall of charts.',
              images: [{ src: 'captl-ui-overview.jpg', w: 1268, h: 928, alt: 'The fund overview screen with fund corpus and commitment cards, a comparison donut chart and performance metrics.' }],
              points: [['Zeros are states, not gaps', 'Values such as DPI and IRR read as early-fund states, not missing data.'], ['Depth sits underneath', 'Cap table, capital calls and the distribution waterfall live under this summary.'], ['A timeline with meaning', 'The timeline records the vehicle’s life, not just a sparkline.']] },
            { type: 'decision', label: 'Screen 2', title: 'Cap table: set up ownership step by step.',
              text: 'A wizard, not a report. Create the cap table, define unit classes, then issue units. Each step can be finished here or handed off.',
              images: [{ src: 'captl-ui-cap.jpg', w: 1268, h: 932, alt: 'The analytics screen, cap table tab: a two-step wizard to create fund units and then issue them, with a before-you-start checklist and a cap table summary.' }],
              points: [['Order is enforced', 'Issuing stays locked until units exist, so nothing is issued before it is defined.'], ['Assign task', 'Legal and ops work stays inside the product.'], ['Foundation first', 'Capital calls and the waterfall depend on this step.']] },
            { type: 'decision', label: 'Screen 3', title: 'Add fund: documents, LPs and portfolio.',
              text: 'The second step of standing up a vehicle: attach the trust deed and IMA, invite limited partners, add portfolio companies, then submit.',
              images: [{ src: 'captl-ui-addfund.jpg', w: 1268, h: 928, alt: 'The add new fund screen, step 2 of 2: fund creation documents with upload or delegate, limited partners and a submission checklist.' }],
              points: [['Upload or delegate', 'Missing documents never stall the create flow.'], ['Complete LP cards', 'Invited LPs carry tax ID and representations on the same card.'], ['A safe last step', 'Submit is the final gate, and Back keeps the draft.']] },
            { type: 'decision', label: 'Screen 4', title: 'Fund network: see the relationships.',
              text: 'Who sits around a fund: team, service providers, LPs and portfolio companies, with documents and tasks attached. A fund is a set of relationships, not a folder.',
              images: [{ src: 'captl-ui-network.jpg', w: 1268, h: 928, alt: 'The fund network screen: partners, principals, associates and analysts in role groups with selectable cards.' }],
              points: [['Role groups', 'Both sides of private markets are explicit.'], ['Work lives on the network', 'Documents and tasks attach to people, not a generic inbox.'], ['Built to scale', 'A real fund has many more people than a dashboard row, and the groups grow with it.']] },
            { type: 'decision', label: 'Screen 5', title: 'Fund management: run the work.',
              text: 'The operations home for every vehicle: listed funds, vintage, created date and a way to add another. This is where a partner or ops lead spends the week.',
              images: [{ src: 'captl-ui-mgmt.jpg', w: 1268, h: 930, alt: 'The fund management screen: a table of listed funds with vintage and created date, and a prompt to stand up another vehicle.' }],
              points: [['A focused list', 'Vehicles only, unlike the metrics-heavy overview.'], ['A familiar prompt', 'Add fund repeats the promise of the first empty dashboard.'], ['Connected pages', 'Pairs with fund details for the profile and delegations for handoff.']] }] },
        { label: 'Outcome', title: 'One workspace instead of a pile of tools.',
          blocks: [
            { type: 'cards', cols: 3, items: [
              { title: 'One product after login', text: 'Brand, site, sign-in, fund creation, network, documents and delegations sit in one product a GP can open.' },
              { title: 'Funds stood up in the product', text: 'Name the vehicle, attach documents, invite LPs, add portfolio companies and define units without leaving for email.' },
              { title: 'Operations have an owner', text: 'Documents, cap table steps and reviews can be assigned inside the fund, so work stays on the vehicle.' }] },
            { type: 'chips', title: 'What shipped', items: ['Brand system', 'Marketing site', 'Sign-in and two-factor', 'Dashboard', 'Create new fund', 'Add LPs and portfolio', 'Cap table and units', 'Fund overview', 'Fund network', 'Fund management', 'Delegations', 'Trust and compliance features'] }] },
        { label: 'Learnings', title: 'What this product taught the design.',
          blocks: [{ type: 'numbered', items: [
            ['The empty dashboard is the onboarding.', 'An empty fund table is the prompt to create the first vehicle, not a dead end.'],
            ['A fund is a network, not a folder.', 'LPs, portfolio companies, documents and tasks only work when they hang off one vehicle.'],
            ['Every setup step must be assignable.', 'If a step cannot be delegated, the flow leaves the product and dies in email.']] }] }
      ]
    }
  };

  /* ---------- Renderer ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function img(i, lazy) {
    return '<img src="' + IMG + i.src + '" width="' + i.w + '" height="' + i.h + '" alt="' + esc(i.alt) + '" decoding="async"' + (lazy ? ' loading="lazy"' : ' fetchpriority="high"') + '>';
  }
  var CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var DASH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 12h12"/></svg>';
  var ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var OUT = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17L17 7M8 7h9v9"/></svg>';

  var B = {
    lists: function (b) {
      return '<div class="cs-lists">' + b.groups.map(function (g) {
        return '<div class="cs-list' + (g.muted ? ' is-muted' : '') + '"><h3 class="cs-label">' + g.title + '</h3><ul>' + g.items.map(function (t) {
          return '<li><span>' + t + '</span>' + (g.muted ? DASH : CHECK) + '</li>';
        }).join('') + '</ul></div>';
      }).join('') + '</div>';
    },
    quote: function (b) { return '<blockquote class="cs-quote"><p>' + b.text + '</p><footer>' + b.cite + '</footer></blockquote>'; },
    cards: function (b) {
      return '<ul class="cs-cards c' + b.cols + '">' + b.items.map(function (c) {
        return '<li class="cs-card">' + (c.tag ? '<p class="cs-label">' + c.tag + '</p>' : '') +
          (c.title ? '<h3>' + c.title + '</h3>' : '') + (c.text ? '<p>' + c.text + '</p>' : '') +
          (c.list ? '<ul class="cs-dots">' + c.list.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' : '') +
          (c.foot ? '<div class="cs-card-foot"><p class="cs-label">Design response</p><p>' + c.foot + '</p></div>' : '') + '</li>';
      }).join('') + '</ul>';
    },
    table: function (b) {
      return '<table class="cs-table"><thead><tr><th scope="col">' + b.head[0] + '</th><th scope="col">' + b.head[1] + '</th></tr></thead><tbody>' +
        b.rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>';
    },
    columns: function (b) {
      return '<ol class="cs-columns">' + b.items.map(function (c) {
        return '<li class="cs-col' + (c.strong ? ' is-strong' : '') + '"><div class="cs-col-head"><h3>' + c.title + '</h3><p>' + c.sub + '</p></div><ul>' +
          c.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></li>';
      }).join('') + '</ol>';
    },
    flow: function (b) {
      return '<ol class="cs-flow">' + b.rows.map(function (r) {
        return '<li class="cs-flow-row' + (r[2] ? ' is-key' : '') + '"><h3>' + r[0] + (r[2] ? '<span class="sr"> (key step)</span>' : '') + '</h3><ol>' +
          r[1].map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ol></li>';
      }).join('') + '</ol>' + (b.legend ? '<p class="cs-legend"><span aria-hidden="true"></span>' + b.legend + '</p>' : '');
    },
    steps: function (b) {
      return '<ol class="cs-steps">' + b.items.map(function (s) { return '<li><h3>' + s[0] + '</h3><p>' + s[1] + '</p></li>'; }).join('') + '</ol>';
    },
    decision: function (b) {
      return '<div class="cs-decision"><p class="cs-label">' + b.label + '</p><h3>' + b.title + '</h3><p class="cs-text">' + b.text + '</p>' +
        '<div class="cs-shots' + (b.images.length > 1 ? ' two' : '') + '">' + b.images.map(function (i) { return '<figure class="cs-figure">' + img(i, true) + '</figure>'; }).join('') + '</div>' +
        '<ol class="cs-points' + (b.points.length === 4 ? ' four' : '') + '">' + b.points.map(function (p) {
          return '<li><h4>' + p[0] + '</h4><p>' + p[1] + '</p></li>';
        }).join('') + '</ol></div>';
    },
    compare: function (b) {
      return '<div class="cs-compare"><div><p class="cs-label">Before</p><p>' + b.before + '</p></div>' +
        '<span class="cs-compare-arrow">' + ARROW + '</span><div class="is-after"><p class="cs-label">After</p><p>' + b.after + '</p></div></div>';
    },
    figure: function (b) { return '<figure class="cs-figure">' + img(b.img, true) + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>'; },
    chips: function (b) {
      return '<div class="cs-chips"><h3 class="cs-label">' + b.title + '</h3><ul>' + b.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
    },
    numbered: function (b) {
      return '<ol class="cs-numbered">' + b.items.map(function (r) { return '<li><h3>' + r[0] + '</h3><p>' + r[1] + '</p></li>'; }).join('') + '</ol>';
    }
  };

  function render(key) {
    var c = CASES[key];
    var h = '<article class="cs" aria-labelledby="cs-title">';
    h += '<header class="cs-hero"><p class="cs-kicker">' + c.kicker.map(function (k) { return '<span>' + k + '</span>'; }).join('') + '</p>' +
      '<h1 id="cs-title" tabindex="-1">' + c.title + '</h1><p class="cs-intro">' + c.lede + '</p>' +
      '<dl class="cs-facts">' + c.facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl></header>';
    h += '<figure class="cs-figure cs-hero-figure">' + img(c.hero, false) + '</figure>';
    h += '<ul class="cs-stats" aria-label="Key figures">' + c.stats.map(function (s) { return '<li><strong>' + s[0] + '</strong><span>' + s[1] + '</span></li>'; }).join('') + '</ul>';
    c.sections.forEach(function (s, i) {
      var id = key + '-s' + (i + 1);
      h += '<section class="cs-sec" aria-labelledby="' + id + '"><header class="cs-sec-head"><p class="cs-num"><span>' + (i < 9 ? '0' : '') + (i + 1) + '</span>' + s.label + '</p>' +
        '<h2 id="' + id + '">' + s.title + '</h2>' + (s.lede ? '<p class="cs-text">' + s.lede + '</p>' : '') + '</header>' +
        s.blocks.map(function (b) { return B[b.type](b); }).join('') + '</section>';
    });
    h += '<footer class="cs-end"><h2>Thanks for reading.</h2><p class="cs-text">I design trust-heavy, multi-step products that people depend on: staking, trading and fund operations.</p>' +
      '<div class="cs-btns"><a class="cs-btn is-primary" href="mailto:sudheer.darla11@gmail.com">Email me<span class="sr"> (opens your email app)</span></a>' +
      '<a class="cs-btn" href="https://www.linkedin.com/in/sudheerdarla/" target="_blank" rel="noopener">LinkedIn ' + OUT + '<span class="sr"> (opens in a new tab)</span></a>' +
      '<a class="cs-btn" href="https://x.com/sudheerdarla_" target="_blank" rel="noopener">X ' + OUT + '<span class="sr"> (opens in a new tab)</span></a></div></footer>';
    return h + '</article>';
  }

  window.CASES = CASES;
  window.renderCase = render;
})();
