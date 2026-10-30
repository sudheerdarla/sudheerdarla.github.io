/* Likes and comments for blog posts, stored in Supabase.
   Paste the project URL and the public "anon" key below. Until both are set,
   the like button and comments stay hidden and the page works as before. */
(function () {
  var SUPABASE_URL = '';
  var SUPABASE_KEY = '';

  var root = document.querySelector('[data-post]');
  if (!root || !SUPABASE_URL || !SUPABASE_KEY) return;
  var slug = root.getAttribute('data-post');

  /* One random id per browser, so a visitor can like once and un-like */
  var cid;
  try { cid = localStorage.getItem('sd-client'); } catch (e) {}
  if (!cid) {
    cid = (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));
    try { localStorage.setItem('sd-client', cid); } catch (e) {}
  }
  var likedKey = 'sd-liked-' + slug;

  function rpc(fn, args) {
    return fetch(SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/rpc/' + fn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY },
      body: JSON.stringify(args)
    }).then(function (r) {
      return r.json().then(function (d) { if (!r.ok) throw new Error((d && d.message) || 'Request failed'); return d; });
    });
  }

  /* ---------- Like ---------- */
  var likeBtn = document.getElementById('like');
  var likeCount = document.getElementById('like-count');
  var liked = false;
  try { liked = localStorage.getItem(likedKey) === '1'; } catch (e) {}
  function paintLike(n) {
    likeBtn.setAttribute('aria-pressed', liked ? 'true' : 'false');
    if (typeof n === 'number') likeCount.textContent = n;
    likeBtn.setAttribute('aria-label', (liked ? 'Liked' : 'Like this post') + (likeCount.textContent ? ', ' + likeCount.textContent + ' likes' : ''));
  }
  likeBtn.hidden = false;
  paintLike();
  rpc('get_likes', { p_slug: slug }).then(paintLike).catch(function () {});
  likeBtn.addEventListener('click', function () {
    liked = !liked;
    var n = parseInt(likeCount.textContent, 10) || 0;
    paintLike(Math.max(0, n + (liked ? 1 : -1)));
    try { localStorage.setItem(likedKey, liked ? '1' : '0'); } catch (e) {}
    rpc('set_like', { p_slug: slug, p_client: cid, p_liked: liked }).then(paintLike).catch(function () {
      liked = !liked; paintLike(n);
      try { localStorage.setItem(likedKey, liked ? '1' : '0'); } catch (e) {}
    });
  });

  /* ---------- Comments ---------- */
  var box = document.getElementById('comments');
  var list = document.getElementById('c-list');
  var countEl = document.getElementById('c-count');
  var form = document.getElementById('c-form');
  var nameIn = document.getElementById('c-name');
  var bodyIn = document.getElementById('c-body');
  var status = document.getElementById('c-status');
  var btn = document.getElementById('c-submit');
  box.hidden = false;
  try { nameIn.value = localStorage.getItem('sd-name') || ''; } catch (e) {}

  function when(iso) {
    var d = new Date(iso), s = (Date.now() - d) / 1000;
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + ' min ago';
    if (s < 86400) return Math.floor(s / 3600) + ' h ago';
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function item(c) {
    var li = document.createElement('li'); li.className = 'c-item';
    var head = document.createElement('p'); head.className = 'c-head';
    var b = document.createElement('b'); b.textContent = c.name;
    var t = document.createElement('time'); t.dateTime = c.created_at; t.textContent = when(c.created_at);
    head.appendChild(b); head.appendChild(t);
    var p = document.createElement('p'); p.className = 'c-body'; p.textContent = c.body;
    li.appendChild(head); li.appendChild(p);
    return li;
  }
  var total = 0;
  function setCount(n) { total = n; countEl.textContent = n ? '(' + n + ')' : ''; }
  function empty() { list.innerHTML = '<li class="c-empty">No comments yet. Start the conversation.</li>'; }

  rpc('get_comments', { p_slug: slug }).then(function (rows) {
    list.innerHTML = '';
    if (!rows.length) empty(); else rows.forEach(function (c) { list.appendChild(item(c)); });
    setCount(rows.length);
  }).catch(function () { list.innerHTML = '<li class="c-empty">Comments couldn’t load. Refresh the page to try again.</li>'; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameIn.value.trim(), body = bodyIn.value.trim();
    if (!name) { status.textContent = 'Add your name so people know who wrote this.'; nameIn.focus(); return; }
    if (!body) { status.textContent = 'Write a comment before posting.'; bodyIn.focus(); return; }
    btn.disabled = true; btn.textContent = 'Posting…'; status.textContent = '';
    rpc('add_comment', { p_slug: slug, p_client: cid, p_name: name, p_body: body }).then(function (rows) {
      if (!total) list.innerHTML = '';
      var li = item(rows[0]); list.appendChild(li); setCount(total + 1);
      bodyIn.value = ''; status.textContent = 'Comment posted.';
      try { localStorage.setItem('sd-name', name); } catch (e) {}
    }).catch(function (err) {
      var m = String(err.message || '');
      status.textContent = /slow down/.test(m) ? 'You just posted. Wait 30 seconds, then try again.' :
        /daily limit/.test(m) ? 'You’ve reached today’s comment limit. Try again tomorrow.' :
        'Your comment didn’t post. Check your connection and try again.';
    }).then(function () { btn.disabled = false; btn.textContent = 'Post comment'; });
  });
})();
