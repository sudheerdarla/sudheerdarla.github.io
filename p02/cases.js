/* Case study content + one shared renderer.
   Every study uses the same sections in the same order; only the content inside each section differs. */
(function () {
  var IMG = '../img/';

  var CASES = {
    saifuro: {
      name: 'Saifuro Console', tag: '(concept design)',
      kicker: ['Case study', 'AI agent payments'],
      title: 'Let agents pay. Keep the final say.',
      lede: 'AI agents are starting to buy things on their own: data, compute, flights. Saifuro Console is a concept for the control panel behind that. Teams give each agent a budget, a vendor list and approval rules, so small payments settle on their own and big ones wait for a person. I designed it and built it as a working prototype.',
      facts: [['Role', 'Product designer and builder'], ['Year', '2026'], ['Platform', 'Web console, desktop first'], ['Type', 'Self-initiated concept, not affiliated with Saifuro']],
      hero: { src: 'p02/saifuro-login.jpg', dark: 'p02/saifuro-login-dark.jpg', w: 2880, h: 1800, alt: 'The Saifuro log-in page: the headline Let your agents pay. Keep the final say, a one-line summary and the log-in card over a still field of payment symbols, with a dark preview of the dashboard below.' },
      stats: [['5', 'Core surfaces: overview, approvals, agents, activity, settings'], ['4', 'Steps to create an agent with its own key and limits'], ['6', 'Policy checks shown on every approval request']],
      sections: [
        { label: 'Overview', title: 'A spend control panel for teams running AI agents.',
          lede: 'The console answers one question at a glance: what needs me right now, and how are my agents spending? Everything else, from creating an agent to exporting a log for finance, is one step away.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I designed and built', items: ['Sign-up with Google or work email, log in, single sign-on and a guided tour on first login', 'Overview with approvals, spend and budget by agent', 'Approval review with policy checks and keyboard shortcuts', 'Four-step agent setup with a one-time key', 'Activity log with search, filters and CSV export', 'Approvers, alerts and light and dark themes'] },
            { title: 'Out of scope', muted: true, items: ['Real payments and wallets', 'Saifuro’s actual product or data', 'Back-end and payment-rail integrations'] }] }] },
        { label: 'Problem', title: 'Agents can spend money. Teams can’t see or stop it.',
          blocks: [
            { type: 'quote', text: '“I want our agents to buy what they need, but I need to know nothing big happens without me.”', cite: 'The job a team lead comes with' },
            { type: 'cards', cols: 2, title: 'Why it is hard', items: [
              { title: 'Spending happens without a person.', text: 'An agent can pay a vendor in seconds. Without limits, one bad loop can drain a budget.' },
              { title: 'Approvals arrive without context.', text: 'A request that just says “$312 to LexCorpus” is hard to judge. People need the reason and the effect on budget.' },
              { title: 'Requests can’t wait forever.', text: 'An agent is blocked while it waits. Unanswered requests need a clear deadline and outcome.' },
              { title: 'Finance needs a record.', text: 'Every payment, approved or blocked, has to be traceable to the rule that decided it.' }] }] },
        { label: 'Users', title: 'Three roles, one console.',
          blocks: [{ type: 'cards', cols: 3, items: [
            { tag: 'Owner', title: 'Sets up agents and rules.', text: 'Creates agents, sets budgets and vendor lists, and decides who can approve what.' },
            { tag: 'Approver', title: 'Decides requests up to a limit.', text: 'Reviews payments above an agent’s auto-approve limit, here or in Slack.' },
            { tag: 'Viewer', title: 'Watches spend, changes nothing.', text: 'Finance and leads who need visibility without the power to approve.' }] }] },
        { label: 'Structure', title: 'Every payment follows the same path.',
          lede: 'A payment attempt is checked against the agent’s rules. Small ones settle, big ones wait for a person, and anything outside the rules is blocked. Every outcome lands in the activity log.',
          blocks: [{ type: 'flow', legend: 'Marked steps are where a person stays in control.', rows: [
            ['Agent requests', ['Vendor', 'Amount', 'Reason']],
            ['Policy checks', ['Agent active', 'Vendor allowed', 'Rail allowed', 'Per-payment cap', 'Daily budget']],
            ['Auto-approve', ['Under the limit', 'Settles on its own']],
            ['Needs a person', ['Over the limit', 'Waits in Approvals', 'Slack or email alert'], true],
            ['Decision', ['Approve', 'Decline with reason', 'Expires after timeout'], true],
            ['Record', ['Activity log', 'Rule that decided it', 'CSV export']]] }] },
        { label: 'Key decisions', title: 'Four decisions that keep people in charge.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'Put approvals first, sorted by urgency.',
              text: 'The overview opens on what needs a person. The request closest to expiring is always on top, with its time left and any risk flags beside it.',
              images: [{ src: 'p02/saifuro-overview.jpg', dark: 'p02/saifuro-overview-dark.jpg', w: 2880, h: 1800, alt: 'The Saifuro overview: a needs-your-approval list with time left and risk flags, spend and approval stats, and spend over the last 24 hours.' }],
              points: [['Urgency is visible', 'A countdown turns red when a request is about to expire.'], ['Risk is flagged', 'Tags like “Agent paused” or “Leaves 10% of budget” appear before you open anything.'], ['Numbers that matter', 'Spent today, waiting on you, and payments your rules blocked.']] },
            { type: 'decision', label: 'Decision B', title: 'Show the evidence, not just the amount.',
              text: 'Opening a request shows every policy check, the agent’s own reason and the effect on its daily budget, so a decision takes seconds instead of a Slack thread.',
              video: { src: 'saifuro-approve.mp4', poster: 'saifuro-approve-poster.jpg', w: 1440, h: 900, label: 'Screen recording: the cursor opens a pending $312.40 request, checks pass, the payment is approved, the next request for travel-desk is approved, and the overview drops to one pending approval.' },
              points: [['Checks in plain words', 'Each rule reads as a sentence, and the one that triggered review is marked.'], ['Fast for repeat users', 'A to approve, D to decline, J and K to move between requests.'], ['Safe declines', 'Declining asks for a reason the agent receives, with an undo.']] },
            { type: 'decision', label: 'Decision C', title: 'Make limits a sentence, not a form.',
              text: 'Creating an agent takes four steps: details, limits, vendors and review. Presets give a sensible start, and every number is summarised in one plain sentence before it goes live.',
              images: [{ src: 'p02/saifuro-limits.jpg', dark: 'p02/saifuro-limits-dark.jpg', w: 2880, h: 1800, alt: 'The limits step of the new agent wizard: Light, Standard, Heavy and Custom presets, daily budget, max per payment and ask-me-above fields.' }, { src: 'p02/saifuro-vendors.jpg', dark: 'p02/saifuro-vendors-dark.jpg', w: 2880, h: 1800, alt: 'The vendors step: a grid of selectable vendors with their API domains and a count of selected vendors.' }],
              points: [['Presets first', 'Light, Standard and Heavy cover most agents. Custom is there when needed.'], ['Every field explains itself', 'Helper text says what happens when a payment goes over each limit.'], ['Allowlist by default', 'Payments to any vendor not on the list are blocked.']] },
            { type: 'decision', label: 'Decision D', title: 'Treat the agent key like a password.',
              text: 'The key is shown once, at the end of setup, with a clear warning, a copy button and the code needed to use it. Leaving the page without saving it asks for confirmation.',
              images: [{ src: 'p02/saifuro-key.jpg', dark: 'p02/saifuro-key-dark.jpg', w: 2880, h: 1800, alt: 'The agent created screen: a summary sentence of its limits, a warning to copy the key now, the key with a copy button, a stored-safely checkbox and a code snippet.' }],
              points: [['Shown once', 'The warning explains why, and how to rotate the key if it is lost.'], ['Ready to use', 'A short code snippet shows exactly where the key goes.'], ['No silent loss', 'Navigating away before confirming triggers a warning.']] }] },
        { label: 'Outcome', title: 'A working prototype, end to end.',
          lede: 'Everything in this case study works in the browser with sample data: sign up (one click fills in sample details), take the tour, approve and decline requests, create an agent, export the log and switch themes.',
          blocks: [
            { type: 'figure', img: { src: 'p02/saifuro-outcome.jpg', w: 2880, h: 1800, alt: 'The Saifuro dashboard in dark mode: spend and approval stats, spend over the last 24 hours, budget by agent and recent activity.' }, caption: 'Overview: what needs you, and how every agent is spending.' },
            { type: 'cards', cols: 3, items: [
              { title: 'Agent pages', text: 'Each agent has its own spend, rules, vendors and pending requests, with pause and edit controls.' },
              { title: 'Approvers with limits', text: 'Owners, approvers with a spending limit, and viewers who can only look.' },
              { title: 'Keyboard first', text: 'A command menu jumps to any page, agent or action, and shortcuts cover every review.' }] },
            { type: 'cta', label: 'Open the live prototype', href: '../s02/#login' }] },
        { label: 'Learnings', title: 'What designing for agents taught me.',
          blocks: [{ type: 'numbered', items: [
            ['Automation needs a clear off switch.', 'People trust agents more when limits, pauses and deadlines are always visible.'],
            ['Context beats speed.', 'The fastest approval is the one where all the evidence is already on screen.'],
            ['Write rules as sentences.', 'A limit summarised in plain words is checked more carefully than a row of numbers.']] }] }
      ]
    },

    pstake: {
      name: 'PSTAKE Finance',
      kicker: ['Case study', 'Web3', 'Liquid staking'],
      title: 'Unlocking liquidity for staked assets.',
      lede: 'PSTAKE Finance lets people stake their crypto and still use it. More than $30M in assets went through the platform. My job was to make it obvious which network you are on, which asset you picked and what that asset is doing right now, so nobody needs to be a crypto expert to use it.',
      facts: [['Role', 'Product designer: Brand, Site, IA, Key flows'], ['Year', '2022, Dubai'], ['Platform', 'Desktop Web App'], ['Scope', 'Dashboard, Network, Stake, Unstake, DeFi']],
      hero: { src: 'p02/pstake-hero.jpg', w: 2880, h: 1800, alt: 'The PSTAKE stake screen: OSMO staked for stkOSMO with the exchange rate and network fee, a Liquid Stake button, APY and total value unlocked cards, a network selector showing Persistence and BNB Smart Chain, Flash and Regular unstaking methods, and a stake confirmation.' },
      stats: [['$30M+', 'Staked assets value unlocked'], ['5', 'Product areas I designed end to end'], ['2', 'Ways to exit, each with its time and fee shown upfront']],
      sections: [
        { label: 'Overview', title: 'One app to Stake, Unstake, Earn and track your crypto.',
          lede: 'Before PSTAKE, people jumped between staking sites, swap apps, block explorers and spreadsheets. PSTAKE put all of it in one place. Every balance shows what it is doing, and every button tells you what will happen.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I designed', items: ['Switching between networks', 'Staking and Unstaking (wait 14 days, or exit instantly for a fee)', 'The DeFi tab: creating and joining pools', 'How rewards and past activity are shown'] },
            { title: 'Not my part', muted: true, items: ['Smart contracts', 'How APY is calculated', 'Which networks launched'] }] }] },
        { label: 'Problem', title: 'People wanted their staked assets to earn. Instead they needed five apps to do it.',
          blocks: [
            { type: 'quote', text: '“I just want this token to earn something.” That one simple goal meant five apps and a manual checklist.' },
            { type: 'cards', cols: 2, title: 'Why it was hard', items: [
              { title: 'You can’t see what your assets are doing.', text: 'Available, staked, unstaking, in a pool, or earned as rewards: it all looks like “my assets”, but each one behaves differently.' },
              { title: 'Unstaking takes time.', text: 'The normal exit takes 14 days. The instant exit costs a fee. If nobody tells you that, it looks like your assets have disappeared.' },
              { title: 'Each network has its own balance.', text: 'Your assets live on a specific network. Showing one total for the whole wallet hides where things actually are.' },
              { title: 'DeFi brings new words and new risks.', text: 'Pools work differently from staking, so they can’t hide behind the same “Earn” button.' }] }] },
        { label: 'Pain points', title: 'Six moments where people got stuck.',
          lede: 'Each one came from missing information on the screen. Each one got a direct fix.',
          blocks: [{ type: 'cards', cols: 3, items: [
            { tag: 'What next?', title: 'Tokens sitting idle, with no clear next step in the app.', foot: 'A stake card with a MAX button, and a DeFi suggestion after staking.' },
            { tag: 'After signing', title: '“I signed. Now what?” The transaction was pending, with no explanation.', foot: 'A confirmation that tells you the exact balance you now have.' },
            { tag: 'Waiting period', title: 'Unstaked yesterday, but the balance hasn’t changed. It’s still in the 14-day wait.', foot: 'Each exit option shows its wait time and fee before you choose.' },
            { tag: 'Wrong network', title: 'The same token exists on two networks, and people used the wrong one.', foot: 'The current network is always on screen, and switching takes one click.' },
            { tag: 'Rewards', title: 'Rewards were there, but people didn’t know whether to claim, leave or restake them.', foot: 'A position card that splits your balance by what it is doing.' },
            { tag: 'Earnings', title: 'Pool earnings and staking rewards were mixed together.', foot: 'DeFi got its own tab, with its own simple wording.' }] }] },
        { label: 'Structure', title: 'Four questions, always in the same order.',
          lede: 'Every screen answers: Where am I? What do I have? What is it doing? What can I do next?',
          blocks: [{ type: 'columns', items: [
            { title: 'Network', sub: 'Where am I?', items: ['Persistence', 'BNB Smart Chain'] },
            { title: 'Asset', sub: 'What do I have?', items: ['OSMO', 'stkOSMO', 'ATOM', 'stkATOM'] },
            { title: 'State', sub: 'What is it doing?', items: ['Available', 'Staked', 'Unstaking', 'In a pool', 'Rewards'] },
            { title: 'Action', sub: 'What can I do next?', items: ['Stake', 'Unstake (14 days or instant)', 'Add to a pool', 'Claim', 'Restake'], strong: true }] }] },
        { label: 'Key decisions', title: 'Three decisions that made it easy to read.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'Show the result before asking for action.',
              text: 'The stake screen reads like a receipt, top to bottom: what you put in, what you get back, what it costs, and where that leaves you.',
              images: [{ src: 'p02/pstake-stake.jpg', w: 1600, h: 1120, alt: 'The stake screen: OSMO in, stkOSMO out with balances and a MAX button, the exchange rate and network fee, and the Liquid Stake button.' }],
              points: [['In, then out', 'What you stake sits above what you receive, with your balance and a MAX button.'], ['Costs before you sign', 'The rate, expected rewards and network fee all sit above the button.'], ['One main button', 'Liquid Stake is the only bold button, and it only turns on once the amount is valid.'], ['Earnings in view', 'APY and total value unlocked sit right below, so you never open another tab to check.']] },
            { type: 'decision', label: 'Decision B', title: 'Make unstaking clear, not scary.',
              text: 'Waiting days for your assets feels like losing them. So the exit screen shows the time and fee of each option before you commit.',
              images: [{ src: 'p02/pstake-unstake.jpg', w: 2880, h: 1800, alt: 'The unstake screen: the exchange rate above the Flash and Regular unstake method cards, each with its time, fee and what you receive.' }],
              points: [['Two clear options', 'Flash and Regular Unstake are shown side by side, each with its time and fee.'], ['Rate first', 'The current exchange rate is shown first, so the amount you get back is never a surprise.'], ['No accidents', 'The button stays off until you enter an amount.']] },
            { type: 'decision', label: 'Decision C', title: 'Always show which network you are on.',
              text: 'Your assets and actions depend on the network. So the current network and your connected wallet stay visible, and changing either one is a deliberate step.',
              images: [{ src: 'p02/pstake-menus.jpg', w: 2880, h: 1800, alt: 'The wallet menu open from the header: the connected address and network, balance, copy address, view on explorer and disconnect.' }, { src: 'p02/pstake-wallet.jpg?v=2', w: 2880, h: 1800, alt: 'The connect wallet dialog, with popular wallets grouped above more wallets and the one already linked tagged Connected.' }],
              points: [['Network in the header', 'The header shows the current network, and the menu marks it with a check.'], ['Wallet tools together', 'Balance, copy address and explorer link sit together. Disconnect is kept apart.'], ['Easy to connect', 'Wallets are grouped, and the one you already use is marked Connected.']] }] },
        { label: 'Brand and design system', title: 'I built the brand and the system behind every screen.',
          lede: 'I owned the PSTAKE brand and its design system: the colours, type and shared components that every screen is built from. One system kept staking, unstaking and DeFi feeling like one product.',
          blocks: [{ type: 'system',
            colors: [['Night', '#0E0D12', 'bg/base', 'App background'], ['Surface', '#18171D', 'bg/surface', 'Panels and cards'], ['Raised', '#201E26', 'bg/raised', 'Inputs, menus, chips'], ['Coral', '#E15365', 'accent/primary', 'The one primary action'], ['Mint', '#3CC47C', 'status/positive', 'Yield and success'], ['Fog', '#8E8C96', 'text/secondary', 'Labels and helper text']],
            typo: [['Display', '32', '40', 'Bold', '33.99 OSMO'], ['Title', '20', '28', 'Semibold', 'Select network'], ['Body', '14', '20', 'Regular', 'Estimated annual yield'], ['Label', '11', '16', 'Mono, caps', 'Unstaking method']],
            principles: [['Dark and calm', 'A quiet dark base, so balances and states stand out.'], ['One coral action', 'Coral marks the single next step on each screen.'], ['Numbers first', 'Amounts are the largest text, labels stay small.']] }] },
        { label: 'Outcome', title: 'People trusted it with more than $30M.',
          lede: 'More than $30M in staked assets went through PSTAKE. Each of the six moments where people got stuck now has a clear answer on screen.',
          blocks: [{ type: 'cards', cols: 2, items: [
            { title: 'Every balance has a status', text: 'Available, staked, unstaking, in a pool and rewards are shown separately, so you always know what your money is doing.' },
            { title: 'Exits are upfront', text: 'Both ways to unstake show how long they take and what they cost before you sign.' },
            { title: 'The network is always visible', text: 'The current network and wallet sit in the header, so nothing happens on the wrong one.' },
            { title: 'DeFi without the fear', text: 'People can stake, join pools and earn rewards with confidence.' }] },
            { type: 'cta', label: 'Open the live prototype', href: '../pstake01/' }] },
        { label: 'Learnings', title: 'What I would bring to any product that handles money.',
          blocks: [{ type: 'numbered', items: [
            ['Show the state, then ask for action.', 'Tell people what their money is doing before you ask what they want to do with it.'],
            ['Make the way out clear.', 'Show the time and fee of every exit, so waiting never feels like losing assets.'],
            ['Keep the context visible.', 'If actions depend on the network, keep the network on screen and easy to switch.'],
            ['Don’t mix different things.', 'Staking and pools have different risks, so they need different words, not one shared “Earn” button.']] }] }
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
          lede: 'COMDEX brings discovery, negotiation and settlement into one product, so a trader can find a counterparty, agree terms and settle with confidence without leaving it.',
          blocks: [{ type: 'lists', groups: [
            { title: 'What I designed', items: ['Marketing website', 'Discovery: markets, orders and new listings', 'Settlement: Deal Room, escrow and title transfer', 'Finance: sell offers and finance requests', 'Public block explorer'] },
            { title: 'How I worked', muted: true, items: ['With 1 PM and 3 engineers', 'Tested flows with traders', 'Five core flows handed off as hi-fi'] }] }] },
        { label: 'Problem', title: 'Global trade ran on inboxes, not infrastructure.',
          lede: 'Deals were stitched together from emails, calls, PDFs and manual checks, so terms and settlement were slow and trust between counterparties was hard to establish.',
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
          lede: 'Seven steps cover the whole deal, so a trader never leaves COMDEX to finish one.',
          blocks: [{ type: 'flow', legend: 'Marked steps are where the old process lost days, and the core of the redesign.', rows: [
            ['Sign in', ['Log in or sign up', 'COMDEX ID', 'KYC']],
            ['Hub', ['Discovery', 'Settlement', 'Finance']],
            ['Discovery', ['Dashboard', 'Markets', 'Orders', 'New sell order']],
            ['Create order', ['Commodity', 'Documents', 'Confirm']],
            ['Deal Room', ['Negotiate', 'Counter', 'Accept', 'Documents'], true],
            ['Settlement', ['Escrow', 'dUSD payment', 'Title transfer'], true],
            ['Finance', ['Sell offer', 'Order book', 'Finance request']]] }] },
        { label: 'Key decisions', title: 'Three screens that made the loop work.',
          blocks: [
            { type: 'decision', label: 'Decision A', title: 'One verified record for every counterparty.',
              text: 'A single COMDEX ID powers KYC, settlement and compliance from one source of truth.',
              images: [{ src: 'p02/comdex-kyc.jpg', w: 2880, h: 1800, alt: 'Trader onboarding: a setup progress stepper on the left and the organization profile form on the right, with registration zone, legal details and beneficial owners.' }],
              points: [['Guided stepper', 'Traders always see what is verified and what is left.'], ['Verify once, reuse everywhere', 'The COMDEX ID follows the trader into every deal and counterparty check.']] },
            { type: 'decision', label: 'Decision B', title: 'Lead with the choice that cannot be undone.',
              text: 'The new sell order asks for the listing type first, and the rest of the form follows from it.',
              images: [{ src: 'p02/comdex-order.jpg', w: 2880, h: 1800, alt: 'The new sell order form: listing type cards, commodity and shipment details, and a live order summary with the total shipment value.' }],
              points: [['Listing type first', 'It is the one choice that cannot be undone, so everything below adapts to it.'], ['Fields mirror trade documents', 'Traders fill in what they already know from paper, with no new mental model.'], ['Running total, always visible', 'The order value updates live, so there are no surprises at confirmation.']] },
            { type: 'decision', label: 'Decision C', title: 'Fiat in, trading unlocked.',
              text: 'Deposits no longer wait 24 hours on a correspondent bank.',
              images: [{ src: 'p02/comdex-fiat.jpg', w: 2880, h: 1800, alt: 'The add funds dialog: bank transfer details with copy buttons, a reference for the transfer memo, a transaction ID field and a receipt upload.' }],
              points: [['Bank details, ready to copy', 'Laid out like the wire slip traders already send.'], ['A reference ties the wire to you', 'No back and forth to match a payment to an account.'], ['Upload proof, start trading', 'Funds unlock as dUSD instead of waiting on a correspondent bank.']] }] },
        { label: 'Outcome', title: 'Days of email became one session.',
          blocks: [
            { type: 'compare', before: 'A multi-day loop of emails, PDFs and correspondent banks.', after: 'A single Deal Room session to negotiate, document and settle in one place.' },
            { type: 'figure', img: { src: 'p02/comdex-trade.jpg', w: 2880, h: 1800, alt: 'A completed trade from Malaysia to Hong Kong: order progress, trade summary with feedback from both parties, an activity timeline, the final sale price and the contract documents.' }, caption: 'A completed trade: progress, summary, timeline and contract documents in one view.' },
            { type: 'chips', title: 'What I would do next', items: ['Mobile companion app', 'Counterparty reputation graph', 'Live bank-rail status'] },
            { type: 'cta', label: 'Open the live prototype', href: '../comdex01/' }] },
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
      hero: { src: 'p02/captl-hero.jpg', w: 2880, h: 1800, alt: 'The CAPTL fund overview: fund corpus, capital commitment, distribution, drawdown and undrawn commitment cards, a fund comparison donut chart and metrics such as NAV, DPI, IRR, RVPI, MOIC and TVPI.' },
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
              images: [{ src: 'p02/captl-overview.jpg', w: 2400, h: 1720, alt: 'The fund overview screen with fund corpus and commitment cards, a comparison donut chart and performance metrics.' }],
              points: [['Zeros are states, not gaps', 'Values such as DPI and IRR read as early-fund states, not missing data.'], ['Depth sits underneath', 'Cap table, capital calls and the distribution waterfall live under this summary.'], ['A timeline with meaning', 'The timeline records the vehicle’s life, not just a sparkline.']] },
            { type: 'decision', label: 'Screen 2', title: 'Cap table: set up ownership step by step.',
              text: 'A wizard, not a report. Create the cap table, define unit classes, then issue units. Each step can be finished here or handed off.',
              images: [{ src: 'p02/captl-cap.jpg', w: 2880, h: 1800, alt: 'The analytics screen, cap table tab: a two-step wizard to create fund units and then issue them, with a before-you-start checklist and a cap table summary.' }],
              points: [['Order is enforced', 'Issuing stays locked until units exist, so nothing is issued before it is defined.'], ['Assign task', 'Legal and ops work stays inside the product.'], ['Foundation first', 'Capital calls and the waterfall depend on this step.']] },
            { type: 'decision', label: 'Screen 3', title: 'Add fund: documents, LPs and portfolio.',
              text: 'The second step of standing up a vehicle: attach the trust deed and IMA, invite limited partners, add portfolio companies, then submit.',
              images: [{ src: 'p02/captl-addfund.jpg', w: 2880, h: 1800, alt: 'The add new fund screen, step 2 of 2: fund creation documents with upload or delegate, limited partners and a submission checklist.' }],
              points: [['Upload or delegate', 'Missing documents never stall the create flow.'], ['Complete LP cards', 'Invited LPs carry tax ID and representations on the same card.'], ['A safe last step', 'Submit is the final gate, and Back keeps the draft.']] },
            { type: 'decision', label: 'Screen 4', title: 'Fund network: see the relationships.',
              text: 'Who sits around a fund: team, service providers, LPs and portfolio companies, with documents and tasks attached. A fund is a set of relationships, not a folder.',
              images: [{ src: 'p02/captl-network.jpg', w: 2880, h: 1800, alt: 'The fund network screen: partners, principals, associates and analysts in role groups with selectable cards.' }],
              points: [['Role groups', 'Both sides of private markets are explicit.'], ['Work lives on the network', 'Documents and tasks attach to people, not a generic inbox.'], ['Built to scale', 'A real fund has many more people than a dashboard row, and the groups grow with it.']] },
            { type: 'decision', label: 'Screen 5', title: 'Fund management: run the work.',
              text: 'The operations home for every vehicle: listed funds, vintage, created date and a way to add another. This is where a partner or ops lead spends the week.',
              images: [{ src: 'p02/captl-mgmt.jpg', w: 2880, h: 1800, alt: 'The fund management screen: a table of listed funds with vintage and created date, and a prompt to stand up another vehicle.' }],
              points: [['A focused list', 'Vehicles only, unlike the metrics-heavy overview.'], ['A familiar prompt', 'Add fund repeats the promise of the first empty dashboard.'], ['Connected pages', 'Pairs with fund details for the profile and delegations for handoff.']] }] },
        { label: 'Outcome', title: 'One workspace instead of a pile of tools.',
          blocks: [
            { type: 'cards', cols: 3, items: [
              { title: 'One product after login', text: 'Brand, site, sign-in, fund creation, network, documents and delegations sit in one product a GP can open.' },
              { title: 'Funds stood up in the product', text: 'Name the vehicle, attach documents, invite LPs, add portfolio companies and define units without leaving for email.' },
              { title: 'Operations have an owner', text: 'Documents, cap table steps and reviews can be assigned inside the fund, so work stays on the vehicle.' }] },
            { type: 'chips', title: 'What shipped', items: ['Brand system', 'Marketing site', 'Sign-in and two-factor', 'Dashboard', 'Create new fund', 'Add LPs and portfolio', 'Cap table and units', 'Fund overview', 'Fund network', 'Fund management', 'Delegations', 'Trust and compliance features'] },
            { type: 'cta', label: 'Open the live prototype', href: '../captl01/' }] },
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
