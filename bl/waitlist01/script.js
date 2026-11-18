(function () {
  // Languages: English plus the five most spoken in India, each named in its own script.
  // Drafts for native-speaker review. The legal name in the footer stays in English.
  var LANGS = [
    ['en', 'English', ''], ['hi', 'हिन्दी', 'Hindi'], ['bn', 'বাংলা', 'Bengali'],
    ['mr', 'मराठी', 'Marathi'], ['te', 'తెలుగు', 'Telugu'], ['ta', 'தமிழ்', 'Tamil']
  ];
  var FONTS = { hi: 'Noto+Sans+Devanagari', mr: 'Noto+Sans+Devanagari', bn: 'Noto+Sans+Bengali', te: 'Noto+Sans+Telugu', ta: 'Noto+Sans+Tamil' };
  var T = {
    en: {
      joinShort: 'Join Waitlist', built: 'Built On', title: 'Global markets.<br>Settled in INR.',
      lead: 'One INR account for global perpetual markets, 24/7, onshore and compliant.',
      join: 'Join Waitlist', fine: 'Equity-linked markets provide trading exposure, not share ownership.',
      popTitle: 'Join the waitlist', popSub: 'We’ll email you when access opens.', submit: 'Join Waitlist!',
      ok: 'You’re on the list. We’ll email you when access opens.', bad: 'Enter a valid email address.',
      soon: 'Pre-IPO · soon', email: 'Email address', close: 'Close', lang: 'Language'
    },
    hi: {
      joinShort: 'जुड़ें', built: 'पर निर्मित', title: 'वैश्विक बाज़ार।<br>INR में सेटलमेंट।',
      lead: 'वैश्विक परपेचुअल बाज़ारों के लिए एक INR खाता, 24/7, भारत में और नियमों के अनुरूप।',
      join: 'वेटलिस्ट से जुड़ें', fine: 'इक्विटी-लिंक्ड बाज़ार ट्रेडिंग एक्सपोज़र देते हैं, शेयरों का स्वामित्व नहीं।',
      popTitle: 'वेटलिस्ट से जुड़ें', popSub: 'एक्सेस खुलते ही हम आपको ईमेल करेंगे।', submit: 'वेटलिस्ट से जुड़ें!',
      ok: 'आप सूची में शामिल हैं। एक्सेस खुलते ही हम आपको ईमेल करेंगे।', bad: 'मान्य ईमेल पता दर्ज करें।',
      soon: 'प्री-IPO · जल्द', email: 'ईमेल पता', close: 'बंद करें', lang: 'भाषा'
    },
    bn: {
      joinShort: 'যোগ দিন', built: 'দিয়ে তৈরি', title: 'বিশ্ববাজার।<br>INR-এ নিষ্পত্তি।',
      lead: 'বিশ্বের পারপেচুয়াল বাজারের জন্য একটি INR অ্যাকাউন্ট, 24/7, দেশের মধ্যে এবং নিয়ম মেনে।',
      join: 'ওয়েটলিস্টে যোগ দিন', fine: 'ইকুইটি-লিঙ্কড বাজার ট্রেডিং এক্সপোজার দেয়, শেয়ারের মালিকানা নয়।',
      popTitle: 'ওয়েটলিস্টে যোগ দিন', popSub: 'অ্যাক্সেস চালু হলে আমরা আপনাকে ইমেল করব।', submit: 'ওয়েটলিস্টে যোগ দিন!',
      ok: 'আপনি তালিকায় আছেন। অ্যাক্সেস চালু হলে আমরা আপনাকে ইমেল করব।', bad: 'একটি সঠিক ইমেল ঠিকানা লিখুন।',
      soon: 'প্রি-IPO · শীঘ্রই', email: 'ইমেল ঠিকানা', close: 'বন্ধ করুন', lang: 'ভাষা'
    },
    mr: {
      joinShort: 'सामील व्हा', built: 'वर आधारित', title: 'जागतिक बाजार.<br>INR मध्ये सेटलमेंट.',
      lead: 'जागतिक परपेच्युअल बाजारांसाठी एकच INR खाते, 24/7, भारतातच आणि नियमांनुसार.',
      join: 'वेटलिस्टमध्ये सामील व्हा', fine: 'इक्विटी-लिंक्ड बाजार ट्रेडिंग एक्सपोजर देतात, शेअर्सची मालकी नाही.',
      popTitle: 'वेटलिस्टमध्ये सामील व्हा', popSub: 'ॲक्सेस सुरू झाल्यावर आम्ही तुम्हाला ईमेल करू.', submit: 'वेटलिस्टमध्ये सामील व्हा!',
      ok: 'तुम्ही यादीत आहात. ॲक्सेस सुरू झाल्यावर आम्ही तुम्हाला ईमेल करू.', bad: 'वैध ईमेल पत्ता टाका.',
      soon: 'प्री-IPO · लवकरच', email: 'ईमेल पत्ता', close: 'बंद करा', lang: 'भाषा'
    },
    te: {
      joinShort: 'చేరండి', built: 'పై నిర్మితం', title: 'ప్రపంచ మార్కెట్లు.<br>INRలో సెటిల్‌మెంట్.',
      lead: 'ప్రపంచ పర్పెచ్యువల్ మార్కెట్ల కోసం ఒకే INR ఖాతా, 24/7, భారత్‌లోనే, నిబంధనలకు అనుగుణంగా.',
      join: 'వెయిట్‌లిస్ట్‌లో చేరండి', fine: 'ఈక్విటీ-లింక్డ్ మార్కెట్లు ట్రేడింగ్ ఎక్స్‌పోజర్ ఇస్తాయి, షేర్ల యాజమాన్యం కాదు.',
      popTitle: 'వెయిట్‌లిస్ట్‌లో చేరండి', popSub: 'యాక్సెస్ తెరిచినప్పుడు మేము మీకు ఈమెయిల్ చేస్తాము.', submit: 'వెయిట్‌లిస్ట్‌లో చేరండి!',
      ok: 'మీరు జాబితాలో ఉన్నారు. యాక్సెస్ తెరిచినప్పుడు మేము మీకు ఈమెయిల్ చేస్తాము.', bad: 'సరైన ఈమెయిల్ చిరునామా ఇవ్వండి.',
      soon: 'ప్రీ-IPO · త్వరలో', email: 'ఈమెయిల్ చిరునామా', close: 'మూసివేయండి', lang: 'భాష'
    },
    ta: {
      joinShort: 'சேருங்கள்', built: 'இல் உருவாக்கப்பட்டது', title: 'உலகச் சந்தைகள்.<br>INR-இல் தீர்வு.',
      lead: 'உலகளாவிய பெர்பெச்சுவல் சந்தைகளுக்கு ஒரே INR கணக்கு, 24/7, இந்தியாவிலேயே, விதிகளுக்கு உட்பட்டு.',
      join: 'வெயிட்லிஸ்டில் சேருங்கள்', fine: 'ஈக்விட்டி-இணைந்த சந்தைகள் வர்த்தக வெளிப்பாட்டை மட்டுமே தருகின்றன, பங்கு உரிமையை அல்ல.',
      popTitle: 'வெயிட்லிஸ்டில் சேருங்கள்', popSub: 'அணுகல் திறந்ததும் உங்களுக்கு மின்னஞ்சல் அனுப்புவோம்.', submit: 'வெயிட்லிஸ்டில் சேருங்கள்!',
      ok: 'நீங்கள் பட்டியலில் உள்ளீர்கள். அணுகல் திறந்ததும் உங்களுக்கு மின்னஞ்சல் அனுப்புவோம்.', bad: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்.',
      soon: 'ப்ரீ-IPO · விரைவில்', email: 'மின்னஞ்சல் முகவரி', close: 'மூடு', lang: 'மொழி'
    }
  };
  var lang = 'en';
  var t = function (k) { return (T[lang] && T[lang][k]) || T.en[k]; };
  var onLang = [];   // repaint hooks (live marks, pop-up message)
  var loadFont = function (code) {
    var fam = FONTS[code];
    if (!fam || document.querySelector('link[data-font="' + fam + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + fam + ':wght@400;500;600&display=swap';
    l.setAttribute('data-font', fam);
    document.head.appendChild(l);
  };
  // Each language's name in the menu is drawn in its own script, from a few-glyph font subset
  var menuFonts = false;
  var loadMenuFonts = function () {
    if (menuFonts) return;
    menuFonts = true;
    var text = LANGS.map(function (l) { return l[1]; }).join('');
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@500&family=Noto+Sans+Bengali:wght@500&family=Noto+Sans+Telugu:wght@500&family=Noto+Sans+Tamil:wght@500&display=swap&text=' + encodeURIComponent(text);
    document.head.appendChild(l);
  };
  var setLang = function (code, save) {
    if (!T[code]) code = 'en';
    lang = code;
    loadFont(code);
    document.documentElement.lang = code;
    var short = smallScreen.matches;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = short && el.getAttribute('data-i18n-short') || el.getAttribute('data-i18n');
      el.textContent = t(k);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-label'))); });
    document.querySelectorAll('.lang__item').forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-code') === code)); });
    onLang.forEach(function (f) { f(); });
    if (save) { try { localStorage.setItem('bl-lang', code); } catch (e) {} }
  };

  // One switcher: in the top bar on desktop, moved to the footer's right corner on phones
  var smallScreen = window.matchMedia('(max-width: 480px)');
  var phone = window.matchMedia('(max-width: 860px)');
  var switchers = document.querySelectorAll('[data-lang]');
  var dock = function () {
    var w = switchers[0];
    if (!w) return;
    var home = phone.matches ? document.querySelector('.foot') : document.querySelector('.top__right');
    if (w.parentNode !== home) home.appendChild(w);
  };
  dock();
  var onChange = function (mq, f) { if (mq.addEventListener) mq.addEventListener('change', f); else mq.addListener(f); };
  onChange(phone, function () { closeAll(); dock(); });
  onChange(smallScreen, function () { setLang(lang, false); });
  var closeAll = function (except) {
    switchers.forEach(function (w) {
      if (w === except) return;
      w.querySelector('.lang__menu').hidden = true;
      w.querySelector('.lang__btn').setAttribute('aria-expanded', 'false');
    });
  };
  switchers.forEach(function (w) {
    var btn = w.querySelector('.lang__btn'), menu = w.querySelector('.lang__menu');
    menu.innerHTML = LANGS.map(function (l) {
      return '<li role="none"><button class="lang__item" type="button" role="menuitemradio" lang="' + l[0] + '" data-code="' + l[0] + '" aria-checked="false">' +
        l[1] + (l[2] ? '<small lang="en">' + l[2] + '</small>' : '') + '</button></li>';
    }).join('');
    var items = function () { return Array.prototype.slice.call(menu.querySelectorAll('.lang__item')); };
    btn.addEventListener('click', function () {
      var opening = menu.hidden;
      if (opening) loadMenuFonts();
      closeAll(w);
      menu.hidden = !opening;
      btn.setAttribute('aria-expanded', String(opening));
      if (opening) (menu.querySelector('[aria-checked="true"]') || items()[0]).focus();
    });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest('.lang__item');
      if (!b) return;
      setLang(b.getAttribute('data-code'), true);
      closeAll();
      btn.focus();
    });
    menu.addEventListener('keydown', function (e) {
      var list = items(), i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); closeAll(); btn.focus(); }
      else if (e.key === 'Tab') closeAll();
    });
  });
  document.addEventListener('pointerdown', function (e) { if (!e.target.closest('[data-lang]')) closeAll(); });

  var saved = 'en';
  try { saved = localStorage.getItem('bl-lang') || 'en'; } catch (e) {}
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hidden market grid. With a mouse, marks sit in random cells clear of the copy and the ring,
  // never side by side, and the pointer's light finds them. On touch screens one mark at a time
  // appears in a random cell anywhere in the card (dimmed behind the text), with a fresh stock
  // each time, so the light keeps turning up something new.
  var hero = document.querySelector('[data-hero]');
  var grid = document.querySelector('[data-grid]');
  if (hero && grid) {
    var CELL = 80, OX = 64, OY = 41;   // desktop anchors match the Figma cell; phones centre the grid
    var narrow = window.matchMedia('(max-width: 860px)');
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var roving = !finePointer;
    var spots = [];    // touch screens: every usable cell, { col, row, behind }
    // [icon, name, ticker shown, live market (Hyperliquid coin)]. Every logo is cropped to its artwork
    // around its artwork, then sized to the same visual area (a 26px square's worth).
    // Stocks and commodities trade on the "xyz" builder market; crypto on the main one.
    // Pre-IPO names have no live market yet, so they read "Pre-IPO · soon".
    var MARKS = [
      ['nvidia', 'NVIDIA', 'NVDA', 'xyz:NVDA'], ['apple', 'Apple', 'AAPL', 'xyz:AAPL'], ['tesla', 'Tesla', 'TSLA', 'xyz:TSLA'],
      ['google', 'Google', 'GOOGL', 'xyz:GOOGL'], ['meta', 'Meta', 'META', 'xyz:META'], ['amazon', 'Amazon', 'AMZN', 'xyz:AMZN'],
      ['netflix', 'Netflix', 'NFLX', 'xyz:NFLX'], ['amd', 'AMD', 'AMD', 'xyz:AMD'], ['coinbase', 'Coinbase', 'COIN', 'xyz:COIN'],
      ['intel', 'Intel', 'INTC', 'xyz:INTC'], ['palantir', 'Palantir', 'PLTR', 'xyz:PLTR'], ['robinhood', 'Robinhood', 'HOOD', 'xyz:HOOD'],
      ['oracle', 'Oracle', 'ORCL', 'xyz:ORCL'], ['alibabadotcom', 'Alibaba', 'BABA', 'xyz:BABA'], ['microstrategy', 'MicroStrategy', 'MSTR', 'xyz:MSTR'],
      ['gold', 'Gold', 'GOLD', 'xyz:GOLD'], ['silver', 'Silver', 'SILVER', 'xyz:SILVER'], ['oil', 'Crude oil', 'OIL', 'xyz:CL'],
      ['bitcoin', 'Bitcoin', 'BTC', 'BTC'], ['ethereum', 'Ethereum', 'ETH', 'ETH'], ['solana', 'Solana', 'SOL', 'SOL'], ['hyperliquid', 'Hyperliquid', 'HYPE', 'HYPE'],
      ['anthropic', 'Anthropic', 'Anthropic', null], ['openai', 'OpenAI', 'OpenAI', null], ['spacex', 'SpaceX', 'SpaceX', null]
    ];
    var quotes = {};   // coin -> { px, chg }
    var layer = grid.querySelector('[data-marks]');
    var placed = [];   // { col, row, el }

    var shuffle = function (a) {
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    };
    var place = function () {
      layer.innerHTML = '';
      placed = [];
      var hb = hero.getBoundingClientRect();
      if (narrow.matches) { CELL = 64; OX = Math.round((hb.width % CELL) / 2); OY = Math.round((hb.height % CELL) / 2); }
      else { CELL = 80; OX = 64; OY = 41; }
      grid.style.setProperty('--cell', CELL + 'px');
      grid.style.setProperty('--ox', OX + 'px');
      grid.style.setProperty('--oy', OY + 'px');
      var box = function (s) {
        var r = document.querySelector(s).getBoundingClientRect();
        return { l: r.left - hb.left - 8, t: r.top - hb.top - 8, r: r.right - hb.left + 8, b: r.bottom - hb.top + 8 };
      };
      var copy = box('.hero__copy'), ring = box('.ring__img');
      var bar = narrow.matches ? box('.top__inner') : { l: 0, t: -1e4, r: 0, b: -1e4 };
      var foot = box('.foot__inner');   // the footer now sits over the card
      var hits = function (k, x, y) { return !(x + CELL < k.l || x > k.r || y + CELL < k.t || y > k.b); };
      var cells = [];
      spots = [];
      for (var row = 0; OY + (row + 1) * CELL <= hb.height - 30; row++) { // leave room for the price line
        for (var col = 0; OX + (col + 1) * CELL <= hb.width - 8; col++) {
          var x = OX + col * CELL, y = OY + row * CELL;
          if (hits(ring, x, y) || hits(bar, x, y) || hits(foot, x, y)) continue;
          if (roving) spots.push({ col: col, row: row, behind: hits(copy, x, y) });
          else if (!hits(copy, x, y)) cells.push([col, row]);
        }
      }
      if (roving) return; // marks are made one at a time by the tour
      shuffle(cells);
      shuffle(MARKS.slice()).forEach(function (m) {
        var spot = cells.find(function (c) {
          return placed.every(function (p) { return Math.abs(p.col - c[0]) + Math.abs(p.row - c[1]) >= 2; });
        });
        if (spot) placed.push(makeMark(m, spot[0], spot[1], false));
      });
    };
    var makeMark = function (m, col, row, behind) {
      var hw = hero.getBoundingClientRect().width;
      var el = document.createElement('div');
      var mx = OX + col * CELL;
      // Near an edge, the price line hangs inward so it is never cut off
      var edge = mx < 50 ? ' mark--l' : mx + CELL > hw - 50 ? ' mark--r' : '';
      el.className = 'mark' + edge + (behind ? ' mark--behind' : '');
      el.style.left = mx + 'px';
      el.style.top = OY + row * CELL + 'px';
      el.innerHTML = '<img src="assets/logos/' + m[0] + '.svg" alt=""><span class="mark__info"></span>';
      el.title = m[1];
      layer.appendChild(el);
      var p = { col: col, row: row, el: el, mark: m };
      paintMark(p);
      return p;
    };

    // Live mark prices and 24h change from Hyperliquid's public API, refreshed every 15s
    var fmtPx = function (px) {
      var d = px >= 1000 ? 2 : px >= 1 ? 2 : 4;
      return '$' + px.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
    };
    var paintMark = function (p) {
      var info = p.el.querySelector('.mark__info');
      var m = p.mark;
      if (!m[3]) { info.innerHTML = '<b>' + m[2] + '</b><span class="soon">' + t('soon') + '</span>'; return; }
      var q = quotes[m[3]];
      if (!q) { info.innerHTML = '<b>' + m[2] + '</b>'; return; }
      var sign = q.chg > 0 ? '+' : q.chg < 0 ? '−' : '';
      info.innerHTML = '<b>' + m[2] + '</b><span>' + fmtPx(q.px) + '</span><span class="' + (q.chg >= 0 ? 'up' : 'down') + '">' + sign + Math.abs(q.chg).toFixed(2) + '%</span>';
    };
    var load = function (dex) {
      return fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dex ? { type: 'metaAndAssetCtxs', dex: dex } : { type: 'metaAndAssetCtxs' })
      }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
        d[0].universe.forEach(function (a, i) {
          var c = d[1][i], px = parseFloat(c.markPx), prev = parseFloat(c.prevDayPx);
          if (px > 0) quotes[a.name] = { px: px, chg: prev > 0 ? (px / prev - 1) * 100 : 0 };
        });
      });
    };
    var refresh = function () {
      if (document.hidden) return;
      Promise.allSettled([load(''), load('xyz')]).then(function () { placed.forEach(paintMark); });
    };
    onLang.push(function () { placed.forEach(paintMark); });
    refresh();
    setInterval(refresh, 15000);
    document.addEventListener('visibilitychange', refresh);

    // The light glides to the centre of the cell under the pointer
    var target = { x: 0, y: 0 }, now = { x: 0, y: 0 }, active = null, raf = 0;
    var setActive = function (col, row) {
      var hit = placed.find(function (p) { return p.col === col && p.row === row; }) || null;
      if (hit === active) return;
      if (active) active.el.classList.remove('is-on');
      active = hit;
      if (active) active.el.classList.add('is-on');
    };
    var draw = function () {
      grid.style.setProperty('--mx', now.x.toFixed(1) + 'px');
      grid.style.setProperty('--my', now.y.toFixed(1) + 'px');
    };
    var tick = function () {
      now.x += (target.x - now.x) * 0.18;
      now.y += (target.y - now.y) * 0.18;
      draw();
      raf = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) < 0.2 ? 0 : requestAnimationFrame(tick);
    };
    var aim = function (x, y, jump) {
      var col = Math.floor((x - OX) / CELL), row = Math.floor((y - OY) / CELL);
      target.x = OX + col * CELL + CELL / 2;
      target.y = OY + row * CELL + CELL / 2;
      setActive(col, row);
      if (jump || reduceMotion) { now.x = target.x; now.y = target.y; draw(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    place();
    var rt;
    // A new language changes the size of the copy, so marks are placed again once its font is in
    onLang.push(function () {
      clearTimeout(rt);
      rt = setTimeout(function () { (document.fonts ? document.fonts.ready : Promise.resolve()).then(place); }, 60);
    });
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(place, 200); });

    if (finePointer) {
      hero.addEventListener('pointerenter', function (e) {
        var b = hero.getBoundingClientRect();
        aim(e.clientX - b.left, e.clientY - b.top, true);
        grid.classList.add('is-lit');
      });
      hero.addEventListener('pointermove', function (e) {
        var b = hero.getBoundingClientRect();
        aim(e.clientX - b.left, e.clientY - b.top, false);
        grid.classList.add('is-lit');
      });
      hero.addEventListener('pointerleave', function () { grid.classList.remove('is-lit'); setActive(null, null); });
    } else {
      // Touch screens have no hover: every few seconds a fresh stock appears in a random cell and
      // the light lands on it. The last ten stocks and last four cells are not reused, so it keeps
      // changing. A tap shows a new stock in the tapped cell.
      var recentMarks = [], recentCells = [], pausedUntil = 0;
      var pickMark = function () {
        var pool = MARKS.filter(function (m) { return recentMarks.indexOf(m) < 0; });
        var m = pool[Math.floor(Math.random() * pool.length)];
        recentMarks.push(m); if (recentMarks.length > 10) recentMarks.shift();
        return m;
      };
      var show = function (spot) {
        var old = placed;
        placed = [makeMark(pickMark(), spot.col, spot.row, spot.behind)];
        aim(OX + spot.col * CELL + CELL / 2, OY + spot.row * CELL + CELL / 2, false);
        grid.classList.add('is-lit');
        setTimeout(function () { old.forEach(function (p) { p.el.remove(); }); }, 400);
      };
      var tour = function () {
        if (!spots.length || Date.now() < pausedUntil || document.hidden) return;
        var pool = spots.filter(function (s) { return recentCells.indexOf(s) < 0; });
        // Prefer open cells; a cell behind the text comes up about one time in four
        var open = pool.filter(function (s) { return !s.behind; });
        if (open.length && Math.random() > 0.25) pool = open;
        var spot = pool[Math.floor(Math.random() * pool.length)] || spots[0];
        recentCells.push(spot); if (recentCells.length > 4) recentCells.shift();
        show(spot);
      };
      if (!reduceMotion) setTimeout(function () { tour(); setInterval(tour, 2800); }, 900);
      hero.addEventListener('pointerdown', function (e) {
        var b = hero.getBoundingClientRect();
        var col = Math.floor((e.clientX - b.left - OX) / CELL), row = Math.floor((e.clientY - b.top - OY) / CELL);
        var spot = spots.find(function (s) { return s.col === col && s.row === row; });
        if (spot) show(spot); else { aim(e.clientX - b.left, e.clientY - b.top, false); grid.classList.add('is-lit'); }
        pausedUntil = Date.now() + 5000;
      });
    }
  }

  // Waitlist pop-up (no backend yet): validate and confirm
  var dialog = document.getElementById('join');
  if (dialog) {
    var form = dialog.querySelector('[data-signup]');
    var input = form.querySelector('input');
    var msg = form.querySelector('[data-msg]');
    var msgKey = '';
    onLang.push(function () { if (msgKey && !msg.hidden) msg.textContent = t(msgKey); });
    var open = function () {
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
      msg.textContent = '';
      msgKey = '';
      msg.hidden = true;
      form.classList.remove('is-invalid');
      input.focus();
    };
    var close = function () {
      if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    };
    document.querySelectorAll('[data-join]').forEach(function (b) { b.addEventListener('click', open); });
    dialog.querySelector('[data-close]').addEventListener('click', close);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = input.value.trim() !== '' && input.checkValidity();
      form.classList.toggle('is-invalid', !ok);
      msg.hidden = false;
      msgKey = ok ? 'ok' : 'bad';
      msg.textContent = t(msgKey);
      if (ok) form.reset();
    });
  }

  setLang(saved, false);
})();
