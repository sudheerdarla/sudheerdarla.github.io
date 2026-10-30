/* Case study content + one shared renderer.
   Every study uses the same sections in the same order; only the content inside each section differs. */
(function () {
  var IMG = 'img/';

  var CASES = {
    pstake: {
      name: 'PSTAKE Finance',
      kicker: ['Case study', 'Web3', 'Liquid staking'],
      title: 'Unlocking liquidity for staked assets.',
      lede: 'PSTAKE lets people stake their crypto and still use it. More than $30M in assets went through it. My job was to make it obvious which network you are on, what you hold and what it is doing, without needing to be a crypto expert.',
      facts: [['Role', 'Product designer: brand, site, IA, key flows'], ['Year', '2022, Dubai'], ['Platform', 'Desktop web app'], ['Scope', 'Stake, unstake, DeFi, dashboard']],
      hero: { src: 'p02/pstake-hero.jpg?v=3', w: 2880, h: 1800, alt: 'The PSTAKE stake screen with a wallet connected: 4.2 OSMO in and 4.198589 stkOSMO out, the exchange rate and network fee, the Liquid Stake button, staking APY and total value unlocked.' },
      stats: [['$30M+', 'Staked assets value unlocked'], ['5', 'Product areas I designed end to end'], ['2', 'Ways to exit, each with its time and fee shown upfront']],
      sections: [
        { label: 'Overview', title: 'One app to stake, unstake, earn and track.',
          lede: 'People used to jump between staking sites, swap apps, block explorers and spreadsheets. PSTAKE puts all of it in one place.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I designed', items: ['Network switching', 'Stake and unstake', 'DeFi pools', 'Rewards and activity'] },
            { title: 'Not my part', muted: true, items: ['Smart contracts', 'How APY is calculated', 'Which networks launched'] }] }] },
        { label: 'Problem', title: 'People wanted their staked assets to earn. It took five apps.',
          blocks: [
            { type: 'quote', text: '“I just want this token to earn something.”' },
            { type: 'cards', cols: 3, title: 'Why it was hard', items: [
              { title: 'You can’t see what assets are doing', text: 'Available, staked, unstaking and pooled all looked like “my assets”.' },
              { title: 'Unstaking takes time', text: 'The normal exit takes 14 days. Without a warning, assets seem to vanish.' },
              { title: 'Each network has its own balance', text: 'One wallet total hides where things actually are.' }] }] },
        { label: 'Pain points', title: 'Four moments where people got stuck.',
          lede: 'Each one came from missing information on the screen, and each one got a direct fix.',
          blocks: [{ type: 'cards', cols: 2, items: [
            { tag: 'After signing', title: '“I signed. Now what?”', foot: 'A confirmation that shows your new balance.' },
            { tag: 'Waiting period', title: 'Unstaked yesterday, but the balance hasn’t moved.', foot: 'Each exit shows its wait and fee before you choose.' },
            { tag: 'Wrong network', title: 'The same token on two networks, and people picked the wrong one.', foot: 'The current network is always on screen.' },
            { tag: 'Earnings', title: 'Pool earnings mixed up with staking rewards.', foot: 'DeFi got its own tab and its own words.' }] }] },
        { label: 'Structure', title: 'Four questions, always in the same order.',
          lede: 'Every screen answers: where am I, what do I have, what is it doing, and what can I do next?',
          blocks: [{ type: 'columns', items: [
            { title: 'Network', sub: 'Where am I?', items: ['Persistence', 'BNB Smart Chain'] },
            { title: 'Asset', sub: 'What do I have?', items: ['OSMO', 'stkOSMO', 'ATOM', 'stkATOM'] },
            { title: 'State', sub: 'What is it doing?', items: ['Available', 'Staked', 'Unstaking', 'In a pool', 'Rewards'] },
            { title: 'Action', sub: 'What can I do next?', items: ['Stake', 'Unstake', 'Add to a pool', 'Claim'], strong: true }] }] },
        { label: 'Key decisions', title: 'Three decisions that made it easy to read.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'Show the result before asking for action.',
              text: 'The stake screen reads like a receipt: what you put in, what you get back and what it costs.',
              images: [{ src: 'p02/pstake-stake.jpg?v=3', w: 1280, h: 1100, alt: 'The stake card: 4.2 OSMO in with the available balance and a MAX button, 4.198589 stkOSMO out, the exchange rate and network fee, and the Liquid Stake button.' }],
              points: [['In, then out', 'What you stake sits above what you get back.'], ['Costs before you sign', 'The rate and network fee sit above the button.'], ['One main button', 'Liquid Stake only turns on for a valid amount.']] },
            { type: 'decision', label: 'Decision B', title: 'Make unstaking clear, not scary.',
              text: 'Waiting days feels like losing your assets, so each exit shows its time and fee before you commit.',
              images: [{ src: 'p02/pstake-unstake.jpg?v=3', w: 2880, h: 1800, alt: 'The unstake screen: 6 stkOSMO in, the exchange rate, and the Flash and Regular unstake options with their time, fee and what you receive, with Flash selected.' }],
              points: [['Two clear options', 'Flash and Regular, side by side.'], ['Rate first', 'You know what you get back.'], ['No accidents', 'The button waits for a valid amount.']] },
            { type: 'decision', label: 'Decision C', title: 'Always show which network you are on.',
              text: 'The network and wallet stay in the header, and switching either one is a deliberate step.',
              images: [{ src: 'p02/pstake-network.jpg?v=3', w: 2880, h: 1800, alt: 'The network menu open from the header, with Persistence checked and BNB Smart Chain below.' }, { src: 'p02/pstake-menus.jpg?v=3', w: 2880, h: 1800, alt: 'The wallet menu open from the header: address and network, balance, copy address, view on explorer and disconnect.' }],
              points: [['Network in the header', 'The menu marks the current one with a check.'], ['Wallet tools together', 'Balance, copy address and explorer in one menu.'], ['Disconnect kept apart', 'The risky action sits on its own.']] }] },
        { label: 'Brand and design system', title: 'I built the brand and the system behind every screen.',
          lede: 'I owned the brand and its design system: colours, type and shared components. One system kept staking, unstaking and DeFi feeling like one product.',
          blocks: [{ type: 'system',
            colors: [['Night', '#0E0D12', 'bg/base', 'App background'], ['Surface', '#18171D', 'bg/surface', 'Panels and cards'], ['Raised', '#201E26', 'bg/raised', 'Inputs, menus, chips'], ['Coral', '#E15365', 'accent/primary', 'The one primary action'], ['Mint', '#3CC47C', 'status/positive', 'Yield and success'], ['Fog', '#8E8C96', 'text/secondary', 'Labels and helper text']],
            typo: [['Display', '32', '40', 'Bold', '33.99 OSMO'], ['Title', '20', '28', 'Semibold', 'Select network'], ['Body', '14', '20', 'Regular', 'Estimated annual yield'], ['Label', '11', '16', 'Mono, caps', 'Unstaking method']],
            principles: [['Dark and calm', 'A quiet dark base, so balances and states stand out.'], ['One coral action', 'Coral marks the single next step on each screen.'], ['Numbers first', 'Amounts are the largest text, labels stay small.']] }] },
        { label: 'Outcome', title: 'People trusted it with more than $30M.',
          lede: 'Each moment where people got stuck now has a clear answer on screen.',
          blocks: [
            { type: 'figure', img: { src: 'p02/pstake-dashboard.jpg?v=3', w: 2880, h: 1800, alt: 'The PSTAKE dashboard: available, staked, unstaking, in pools and rewards totals, then balances per asset with a status tag, unstaking and pool positions.' }, caption: 'The dashboard splits every balance by what it is doing.' },
            { type: 'cards', cols: 3, items: [
              { title: 'Every balance has a status', text: 'Available, staked, unstaking, pooled and rewards are shown apart.' },
              { title: 'Exits are upfront', text: 'Both exits show their time and fee before you sign.' },
              { title: 'The network is always visible', text: 'Nothing happens on the wrong network.' }] },
            { type: 'cta', label: 'Open the live prototype', href: 'pstake01/' }] },
        { label: 'Learnings', title: 'What I would bring to any product that handles money.',
          blocks: [{ type: 'numbered', items: [
            ['Show the state, then ask for action.', 'Say what the money is doing before asking what to do with it.'],
            ['Make the way out clear.', 'Show the time and fee of every exit, so waiting never feels like loss.'],
            ['Don’t mix different things.', 'Staking and pools need different words, not one shared “Earn” button.']] }] }
      ]
    },
    comdex: {
      name: 'COMDEX',
      kicker: ['Case study', 'Fintech', 'B2B commodity trading'],
      title: 'One platform for global commodity trade, from discovery to settlement.',
      lede: 'Commodity deals in a $17T market still run on emails, calls and PDFs. I designed COMDEX end to end: one desktop product that works like a trading terminal and takes a deal from discovery to settlement.',
      facts: [['Role', 'Product designer'], ['Team', '1 PM, 3 engineers'], ['Year', '2019'], ['Platform', 'Desktop web app']],
      hero: { src: 'p02/comdex-dash.jpg', w: 2880, h: 1800, alt: 'The COMDEX trader dashboard: wallet balance, receivables and payables, a copper price trend chart, trade statistics, team activity, market news and a table of traders.' },
      stats: [['$10M+', 'Pilot trade volume processed on the platform'], ['Days to 1', 'A multi-day email and PDF loop became one Deal Room session'], ['3 + 1', 'Product modules, plus a public block explorer']],
      sections: [
        { label: 'Overview', title: 'One closed-loop system of record for a trade.',
          lede: 'Discovery, negotiation and settlement in one product, so a trader can find a counterparty, agree terms and settle without leaving it.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I designed', items: ['Marketing website', 'Discovery and orders', 'Deal Room and settlement', 'Finance', 'Public block explorer'] }] }] },
        { label: 'Problem', title: 'Global trade ran on inboxes, not infrastructure.',
          lede: 'Deals were stitched together from emails, calls and PDFs. Settlement was slow, and trust was hard to build.',
          blocks: [{ type: 'table', head: ['Pain point', 'Design response'], rows: [
            ['Paper title in transit', 'On-chain title and a document pack, kept in the Deal Room'],
            ['Correspondent-bank delays', 'Escrow and dUSD, so capital is not stuck overnight'],
            ['Unknown counterparties', 'One COMDEX ID with reusable KYC and reputation']] }] },
        { label: 'Process', title: 'From research to handoff in four phases.',
          blocks: [{ type: 'cards', cols: 4, items: [
            { tag: 'Phase 1', title: 'Discover', list: ['Market and gap research', 'Competitor review', 'User personas'] },
            { tag: 'Phase 2', title: 'Define', list: ['Constraints', 'Problem statement', 'User flows'] },
            { tag: 'Phase 3', title: 'Develop', list: ['Mock-ups', 'Lo-fi prototype', 'Tests with traders'] },
            { tag: 'Phase 4', title: 'Deliver', list: ['Hi-fi prototype', 'Engineering handoff'] }] }] },
        { label: 'Structure', title: 'One closed loop, from sign-up to settlement.',
          lede: 'One sign-in, one verified company, then five areas off the dashboard.',
          blocks: [
            { type: 'figure', img: { src: 'p03/comdex-flow.png', w: 3200, h: 3158, alt: 'COMDEX user flow: onboarding splits into create account or log in, both lead to verifying the company with KYC and a COMDEX ID, then the dashboard. From the dashboard, five areas: Discovery (markets, filters, open orders, order details), New sell order (listing type, commodity and shipment, bill of lading upload, review and publish), Deal Room (offers, counter, accept or decline, contract documents, activity timeline), Settlement (add funds in dUSD, buyer pays into escrow, confirm and release, on-chain title transfer) and Finance (sell offer, order book, finance request). Deal Room and Settlement are highlighted as the core of the redesign.' } }] },
        { label: 'Key decisions', title: 'Three screens that made the loop work.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'One verified record for every counterparty.',
              text: 'One COMDEX ID powers KYC, settlement and compliance.',
              images: [{ src: 'p02/comdex-kyc.jpg', w: 2880, h: 1800, alt: 'Trader onboarding: a setup progress stepper on the left and the organization profile form on the right, with registration zone, legal details and beneficial owners.' }],
              points: [['Guided stepper', 'Traders see what is done and what is left.'], ['Verify once', 'The ID follows the trader into every deal.']] },
            { type: 'decision', label: 'Decision B', title: 'Lead with the choice that cannot be undone.',
              text: 'A new sell order asks for the listing type first, and the form follows from it.',
              images: [{ src: 'p02/comdex-order.jpg', w: 2880, h: 1800, alt: 'The new sell order form: listing type cards, commodity and shipment details, and a live order summary with the total shipment value.' }],
              points: [['Listing type first', 'Everything below adapts to it.'], ['Fields mirror trade documents', 'Traders fill in what they already know.'], ['Running total', 'The order value updates as you type.']] },
            { type: 'decision', label: 'Decision C', title: 'Fiat in, trading unlocked.',
              text: 'Deposits no longer wait 24 hours on a correspondent bank.',
              images: [{ src: 'p02/comdex-fiat.jpg', w: 2880, h: 1800, alt: 'The add funds dialog: bank transfer details with copy buttons, a reference for the transfer memo, a transaction ID field and a receipt upload.' }],
              points: [['Ready to copy', 'Bank details laid out like a wire slip.'], ['A reference on every wire', 'Payments match the account without back and forth.'], ['Upload proof, start trading', 'Funds unlock as dUSD, with no bank wait.']] }] },
        { label: 'Outcome', title: 'Days of email became one session.',
          blocks: [
            { type: 'compare', before: 'A multi-day loop of emails, PDFs and correspondent banks.', after: 'A single Deal Room session to negotiate, document and settle in one place.' },
            { type: 'figure', img: { src: 'p02/comdex-trade.jpg', w: 2880, h: 1800, alt: 'A completed trade from Malaysia to Hong Kong: order progress, trade summary with feedback from both parties, an activity timeline, the final sale price and the contract documents.' }, caption: 'A completed trade: progress, summary, timeline and contract documents in one view.' },
            { type: 'chips', title: 'What I would do next', items: ['Mobile companion app', 'Counterparty reputation graph', 'Live bank-rail status'] },
            { type: 'cta', label: 'Open the live prototype', href: 'comdex01/' }] },
        { label: 'Learnings', title: 'What I would carry into any complex B2B product.',
          blocks: [{ type: 'numbered', items: [
            ['Lead with the irreversible choice.', 'Ask for the listing type first, then let the form follow from it.'],
            ['Borrow the industry’s documents.', 'Use them as the interface instead of inventing a new one.'],
            ['Design settlement with discovery.', 'Do both in the same pass, or the product splits into two apps.']] }] }
      ]
    },

    captl: {
      name: 'CAPTL',
      kicker: ['Case study', 'Fintech', 'Private equity'],
      title: 'A workspace that keeps funds, people and paperwork moving.',
      lede: 'Private equity still runs on inboxes and spreadsheets. CAPTL gives a partner running several funds one place for each fund, the people around it and the work that keeps it moving.',
      facts: [['Role', 'Product designer: brand, site, IA, key flows'], ['Team', '3 engineers'], ['Year', '2020'], ['Platform', 'Web, desktop first']],
      hero: { src: 'p03/captl-dashboard.jpg', w: 2880, h: 1800, alt: 'The CAPTL fund overview: cards for fund size, commitments, distributions, capital called and capital still to call, an allocation donut chart and six performance metrics.' },
      stats: [['12', 'Product surfaces designed, from brand to task handoff'], ['6', 'Core user journeys designed end to end'], ['4', 'Roles served: partner, fund team, investor and operations']],
      sections: [
        { label: 'Overview', title: 'The fund at the centre.',
          lede: 'A general partner (GP) raises money from investors (LPs), invests it in companies and returns the profits years later. CAPTL is where they run that fund day to day.',
          blocks: [{ type: 'steps', items: [['Sign in', 'Two-factor before any fund data'], ['See every fund', 'One list of every fund you run'], ['Create a fund', 'Documents and investors in one flow'], ['Build the network', 'Team, investors, advisers, companies'], ['Track performance', 'Money in, money out, returns'], ['Run the work', 'Documents, tasks and handoffs']] }] },
        { label: 'Problem', title: 'Funds were lists. Investors were spreadsheets. Work was email.',
          blocks: [{ type: 'cards', cols: 2, items: [
            { title: 'No home for a fund', text: 'No single screen showed every fund, its health and who was involved.' },
            { title: 'People lived in separate files', text: 'Investors and companies sat in a CRM, not on the fund.' },
            { title: 'Setup stalled on paperwork', text: 'One late legal document could hold up a whole fund.' },
            { title: 'Work had no owner', text: 'Requests bounced around email with no owner or due date.' }] }] },
        { label: 'Users', title: 'Four roles, four frictions.',
          blocks: [{ type: 'cards', cols: 2, items: [
            { tag: 'Partner (GP)', text: 'No view of their funds, and no way to create one in the product.', foot: 'One list of funds, and a create flow that never waits.' },
            { tag: 'Fund team', text: 'Can’t see missing documents or their own tasks.', foot: 'A management page per fund.' },
            { tag: 'Investor (LP)', text: 'A row in a spreadsheet, not a person.', foot: 'Investors live on the fund, with their money and documents.' },
            { tag: 'Lawyers and operations', text: 'Work arrives by email with no due date.', foot: 'Any step can be handed off as a tracked task.' }] }] },
        { label: 'Principles', title: 'Three ideas behind every screen.',
          blocks: [{ type: 'cards', cols: 3, items: [
            { title: 'A fund is a network, not a folder', text: 'People, money, documents and tasks hang off the fund.' },
            { title: 'Nothing should block the flow', text: 'If someone owes a piece, hand it over and keep going.' },
            { title: 'Teach the domain in the interface', text: 'Each number carries a short explanation, and steps unlock in order.' }] }] },
        { label: 'Structure', title: 'Every screen hangs off the fund.',
          lede: 'Before any screens, I mapped the whole product so every task, document and person has one home.',
          blocks: [
            { type: 'figure', img: { src: 'p03/captl-ia-brand.png', w: 3200, h: 4092, alt: 'CAPTL information architecture: from the website through register and two-factor setup to sign in, then into four areas. Workspace holds activities, updates and calendar. Funds holds fund management and the fund network. Each fund holds overview, management, constituents and analytics. Account holds settings, docs and support.' } }] },
        { label: 'Key decisions', title: 'Five decisions that shaped the product.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'Create a fund without waiting on paperwork.',
              text: 'Each legal document can be uploaded now or delegated to the person who has it. Delegating creates a tracked task, and the fund is submitted anyway.',
              images: [{ src: 'p03/captl-create.jpg', w: 2880, h: 1800, alt: 'Creating a fund, step 2 of 2: each legal document has Delegate and Upload buttons, investors can be invited below, and a checklist sits on the right.' }],
              points: [['Upload or delegate', 'Both options on every document.'], ['A live checklist', 'Done, pending and optional at a glance.'], ['A safe last step', 'Back keeps the draft.']] },
            { type: 'decision', label: 'Decision B', title: 'One screen for the health of a fund.',
              text: 'The overview answers a partner’s first questions: how big, how much called and paid out, and how it’s performing. A new fund shows dashes and a short note, because a row of zeros reads like broken data.',
              images: [{ src: 'p03/captl-dashboard.jpg', w: 2880, h: 1800, alt: 'The overview of an active fund: money cards, an allocation donut and six performance metrics.' }, { src: 'p03/captl-newfund.jpg', w: 2880, h: 1800, alt: 'The overview of a brand-new fund: metrics show dashes marked Early-fund state, with a note that zeros are expected before the first capital call.' }],
              points: [['Money first', 'Five cards for the money that matters.'], ['Explained metrics', 'Each metric has a plain definition.'], ['Early, not empty', 'New funds show an expected state.']] },
            { type: 'decision', label: 'Decision C', title: 'Set up ownership in the right order.',
              text: 'A fund must define who owns what before it can call capital. The cap table is a two-step wizard, and issuing units stays locked until the classes exist.',
              images: [{ src: 'p03/captl-steps.jpg', w: 2880, h: 1800, alt: 'The cap table wizard: step 1 defines unit classes, step 2 is locked until step 1 is done, with a live summary and an Assign task card on the right.' }],
              points: [['Order is enforced', 'No units before their classes.'], ['Live summary', 'Totals update as you go.'], ['Hand it off', 'Either step can go to legal or operations.']] },
            { type: 'decision', label: 'Decision D', title: 'Show the people around a fund.',
              text: 'A fund is a set of relationships. The fund network puts the team, advisers, investors and companies in one place, grouped by role.',
              images: [{ src: 'p03/captl-network.jpg', w: 2880, h: 1800, alt: 'The fund network: tabs for team, service providers, investors and portfolio, with team members grouped into partners, principals, associates and analysts.' }],
              points: [['Grouped by role', 'Each role has its own list.'], ['Both sides of the fund', 'Investors and companies get their own tabs.'], ['Built to grow', 'Ready for many more people.']] },
            { type: 'decision', label: 'Decision E', title: 'Documents in, tasks out.',
              text: 'Each fund has a management page for missing documents, open tasks and handoffs. Any task can go to anyone in the fund’s network, with a due date.',
              images: [{ src: 'p03/captl-tasks.jpg', w: 2880, h: 1800, alt: 'The management page, tasks tab: open tasks with owners and due dates, one flagged overdue, and the fund details on the right.' }, { src: 'p03/captl-assign.jpg', w: 2880, h: 1800, alt: 'The Assign task window: a task name, who it goes to and a due date.' }],
              points: [['Every task has an owner', 'Who has it, and when it’s due.'], ['Overdue is visible', 'Late work turns red.'], ['Outsiders included', 'Lawyers get tasks, not just email.']] }] },
        { label: 'Outcome', title: 'One workspace instead of a pile of tools.',
          blocks: [
            { type: 'cards', cols: 3, items: [
              { title: 'One place after sign-in', text: 'Funds, people, money and tasks in one product.' },
              { title: 'Funds set up inside the product', text: 'From documents to ownership, without email.' },
              { title: 'Work has an owner', text: 'Every step is assigned, so nothing falls through.' }] },
            { type: 'chips', title: 'What I designed', items: ['Brand system', 'Marketing site', 'Sign-in and two-factor', 'Fund list', 'Create a fund', 'Investors and portfolio', 'Cap table and units', 'Fund overview', 'Fund network', 'Management', 'Task handoff', 'Trust and compliance'] },
            { type: 'cta', label: 'Open the live prototype', href: 'captl01/' }] },
        { label: 'Learnings', title: 'What this product taught me.',
          blocks: [{ type: 'numbered', items: [
            ['The empty state is the onboarding.', 'An empty fund list is the prompt to create the first fund, not a dead end.'],
            ['A fund is a network, not a folder.', 'Investors, companies, documents and tasks only make sense when they hang off one fund.'],
            ['Every step must be assignable.', 'If a step can’t be handed to someone, the work leaves the product and gets lost in email.']] }] }
      ]
    }
  };

  /* ---------- Renderer ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function img(i, lazy) {
    var src = IMG + (i.dark && isDark() ? i.dark : i.src);
    var themed = i.dark ? ' data-light="' + IMG + i.src + '" data-dark="' + IMG + i.dark + '"' : '';
    return '<button type="button" class="cs-zoom" data-full="' + src + '" aria-label="View larger image">' +
      '<img src="' + src + '"' + themed + (i.dark ? ' class="is-framed"' : i.bare ? ' class="is-bare"' : '') + ' width="' + i.w + '" height="' + i.h + '" alt="' + esc(i.alt) + '" decoding="async"' + (lazy ? ' loading="lazy"' : ' fetchpriority="high"') + '>' +
      '<span class="cs-zoom-hint" aria-hidden="true">' + ZOOM + '</span></button>';
  }
  var ZOOM = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  var LOGO = '<span class="ds-word" role="img" aria-label="PSTAKE">PSTAKE</span>';
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
    quote: function (b) { return '<blockquote class="cs-quote"><p>' + b.text + '</p>' + (b.cite ? '<footer>' + b.cite + '</footer>' : '') + '</blockquote>'; },
    cards: function (b) {
      return (b.title ? '<p class="cs-label cs-block-title">' + b.title + '</p>' : '') + '<ul class="cs-cards c' + b.cols + '">' + b.items.map(function (c) {
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
      return '<div class="cs-decision"><h3>' + b.title + '</h3><p class="cs-text">' + b.text + '</p>' +
        (b.video ? '<figure class="cs-figure cs-video"><video poster="' + IMG + b.video.poster + '" width="' + b.video.w + '" height="' + b.video.h + '" autoplay muted loop playsinline controls preload="metadata" aria-label="' + b.video.label + '"><source src="' + IMG + b.video.src + '" type="video/mp4"><source src="' + IMG + b.video.src.replace('.mp4', '.webm') + '" type="video/webm"></video></figure>' :
        '<div class="cs-shots' + (b.images.length > 1 ? ' two' : '') + '">' + b.images.map(function (i) { return '<figure class="cs-figure">' + img(i, true) + '</figure>'; }).join('') + '</div>') +
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
    system: function (b) {
      function cell(n, name, variants, body, wide) {
        return '<div class="ds-cell' + (wide ? ' is-wide' : '') + '"><div class="ds-cell-head"><b>' + name + '</b><em>' + variants + '</em></div><div class="ds-canvas">' + body + '</div></div>';
      }
      function cap(t) { return '<span class="ds-cap">' + t + '</span>'; }
      var colors = b.colors.map(function (c) {
        return '<li><span class="ds-sw" style="background:' + c[1] + '"></span><div class="ds-sw-meta"><b>' + c[0] + '</b><code>' + c[2].replace('/', '/<wbr>') + '</code><span>' + c[1] + '</span></div><p>' + c[3] + '</p></li>';
      }).join('');
      var typo = b.typo.map(function (t, i) {
        return '<tr><td><span class="ds-ts ds-ts' + i + '">' + t[4] + '</span></td><th scope="row">' + t[0] + '</th><td>' + t[1] + '/' + t[2] + '</td><td>' + t[3] + '</td></tr>';
      }).join('');
      var caret = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
      var comps =
        cell('01', 'Button', 'Primary, secondary, disabled',
          '<div class="ds-stack is-v"><div class="ds-col"><span class="ds-btn is-pri">Liquid Stake</span>' + cap('Primary') + '</div><div class="ds-col"><span class="ds-btn">Connect wallet</span>' + cap('Secondary') + '</div><div class="ds-col"><span class="ds-btn is-off">Enter an amount</span>' + cap('Disabled') + '</div></div>') +
        cell('02', 'Segmented control', 'Selected, default',
          '<div class="ds-seg"><span class="is-on">Stake</span><span>Unstake</span></div>') +
        cell('03', 'Chips', 'Network, token, tag',
          '<div class="ds-stack"><span class="ds-chip"><i style="background:#E15365">P</i>Persistence' + caret + '</span><span class="ds-chip"><i style="background:#7761F3">O</i>OSMO' + caret + '</span><span class="ds-tag">MAX</span></div>') +
        cell('04', 'Amount field', 'Input with balance',
          '<div class="ds-field"><div class="ds-field-top"><span>You stake</span><span>Available <b>4.7346 OSMO</b> <span class="ds-tag">MAX</span></span></div><div class="ds-field-main"><span class="ds-chip"><i style="background:#7761F3">O</i>OSMO' + caret + '</span><span class="ds-amt">4</span></div><div class="ds-field-sub">≈ $3.06</div></div>') +
        cell('05', 'Option card', 'Selected, default',
          '<div class="ds-opts"><div class="ds-opt is-sel"><span class="ds-radio"></span><div><b>Flash Unstake</b><small>Instantly · 0.5% fee</small></div><div class="ds-opt-r"><b>~99.50 ATOM</b><small>You receive</small></div></div><div class="ds-opt"><span class="ds-radio"></span><div><b>Regular Unstake</b><small>21–25 days · 0% fee</small></div><div class="ds-opt-r"><b>~100.00 ATOM</b><small>You receive</small></div></div></div>', true) +
        cell('06', 'Stat', 'Metric with helper',
          '<div class="ds-stat"><small>APY</small><b>9.92%</b><small>Estimated annual yield</small></div>') +
        cell('07', 'Toast', 'Success',
          '<div class="ds-toast"><span class="ds-ok"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><div><b>Stake confirmed</b><small>3.998656 stkOSMO added to your balance</small></div></div>');
      return '<div class="ds" role="group" aria-label="PSTAKE brand and design system">' +
        '<div class="ds-top"><span class="ds-top-logo">' + LOGO.replace('role="img" aria-label="PSTAKE"', 'aria-hidden="true"') + '</span><span class="ds-top-r">Design system</span></div>' +
        '<div class="ds-part"><p class="ds-h">Brand</p><div class="ds-brand">' +
          '<div class="ds-logo is-dark">' + LOGO + '<em>On dark</em></div>' +
          '<div class="ds-logo is-light">' + LOGO + '<em>On light</em></div></div></div>' +
        '<div class="ds-part"><p class="ds-h">Colour</p><ul class="ds-colors">' + colors + '</ul></div>' +
        '<div class="ds-part"><p class="ds-h">Type</p><table class="ds-type"><thead><tr><th scope="col"><span class="sr">Sample</span></th><th scope="col">Style</th><th scope="col">Size/Line</th><th scope="col">Weight</th></tr></thead><tbody>' + typo + '</tbody></table></div>' +
        '<div class="ds-part"><p class="ds-h">Components</p><div class="ds-cells" aria-hidden="true">' + comps + '</div>' +
        '<p class="sr">Components: primary, secondary and disabled buttons; a stake and unstake segmented control; network and token chips with a MAX tag; an amount field with available balance; selected and default unstaking option cards; an APY stat; a stake confirmed toast.</p></div>' +
        '</div>' +
        '<ul class="ds-principles">' + b.principles.map(function (p, i) { return '<li><h3>' + p[0] + '</h3><p>' + p[1] + '</p></li>'; }).join('') + '</ul>';
    },
    cta: function (b) { return '<div class="cs-btns"><a class="cs-btn is-primary" href="' + b.href + '" target="_blank" rel="noopener">' + b.label + ' ' + OUT + '<span class="sr"> (opens in a new tab)</span></a></div>'; },
    numbered: function (b) {
      return '<ol class="cs-numbered">' + b.items.map(function (r) { return '<li><h3>' + r[0] + '</h3><p>' + r[1] + '</p></li>'; }).join('') + '</ol>';
    }
  };

  function render(key) {
    var c = CASES[key];
    var h = '<article class="cs" aria-labelledby="cs-title">';
    h += '<header class="cs-hero"><p class="cs-kicker">' + c.name + (c.tag ? ' <em class="cs-tag">' + c.tag + '</em>' : '') + '<span>' + c.kicker.slice(1).map(function (k, i) { return i && !/^[A-Z0-9]{2}/.test(k) ? k.charAt(0).toLowerCase() + k.slice(1) : k; }).join(', ') + '</span></p>' +
      '<h1 id="cs-title" tabindex="-1">' + c.title + '</h1><p class="cs-intro">' + c.lede + '</p>' +
      '<dl class="cs-facts">' + c.facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl></header>';
    h += '<figure class="cs-figure cs-hero-figure' + (c.hero.bare ? ' is-bare' : '') + '">' + img(c.hero, false) + '</figure>';
    h += '<ul class="cs-stats" aria-label="Key figures">' + c.stats.map(function (s) { return '<li><strong>' + s[0] + '</strong><span>' + s[1] + '</span></li>'; }).join('') + '</ul>';
    c.sections.forEach(function (s, i) {
      var id = key + '-s' + (i + 1);
      h += '<section class="cs-sec" aria-labelledby="' + id + '"><header class="cs-sec-head"><p class="cs-num">' + s.label + '</p>' +
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
  /* Swap themed screenshots (light and dark) when the theme changes */
  function swapThemed() {
    var d = isDark();
    document.querySelectorAll('img[data-dark]').forEach(function (el) {
      var want = el.getAttribute(d ? 'data-dark' : 'data-light');
      if (el.getAttribute('src') !== want) { el.setAttribute('src', want); var z = el.closest('.cs-zoom'); if (z) z.setAttribute('data-full', want); }
    });
  }
  if ('MutationObserver' in window) new MutationObserver(swapThemed).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
