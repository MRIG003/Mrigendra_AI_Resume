(() => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ext = href => href && href.startsWith('http') ? 'target="_blank" rel="noopener"' : '';

  const ICONS = {
    sun: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="12" fill="#FDB813"/><g stroke="#FDB813" stroke-width="4" stroke-linecap="round"><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7"/></g></svg>',
    partly: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><circle cx="24" cy="24" r="10" fill="#FDB813"/><g stroke="#FDB813" stroke-width="3.5" stroke-linecap="round"><path d="M24 4v6M4 24h6M9.9 9.9l4.2 4.2M38.1 9.9l-4.2 4.2"/></g><path d="M20 50a10 10 0 0 1 1-20 13 13 0 0 1 25 3 8.5 8.5 0 0 1-1 17Z" fill="#E6EEF5" stroke="#B9C7D4" stroke-width="1.5"/></svg>',
    cloud: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 48a11 11 0 0 1 1.5-22 15 15 0 0 1 29 4 9 9 0 0 1-1 18Z" fill="#D7E0E8" stroke="#A9B8C6" stroke-width="1.5"/></svg>',
    rain: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 40a11 11 0 0 1 1.5-22 15 15 0 0 1 29 4 9 9 0 0 1-1 18Z" fill="#C9D4DE" stroke="#A0AFBD" stroke-width="1.5"/><g stroke="#4A90E2" stroke-width="3.5" stroke-linecap="round"><path d="M22 46l-3 8M34 46l-3 8M46 46l-3 8"/></g></svg>',
    wind: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="#7FA7C9" stroke-width="4" stroke-linecap="round"><path d="M8 24h30a7 7 0 1 0-7-7"/><path d="M8 34h42a7 7 0 1 1-7 7"/><path d="M8 44h20"/></g></svg>'
  };
  const TAB_NAMES = { ai: 'AI Mode', all: 'All', fit: 'JD-Fit-Check', images: 'Images', maps: 'Maps', skills: 'Skills & tools', opensource: 'Open-source', publications: 'Publications', connect: 'Connect' };

  /* ---------- theme ---------- */
  const root = document.documentElement;
  try { const saved = localStorage.getItem('mrigoogle-theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
  $('#themeBtn').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('mrigoogle-theme', root.dataset.theme); } catch (e) {}
  });

  /* ---------- plain version ---------- */
  const plain = $('#plain');
  plain.innerHTML =
    `<h1>${esc(PROFILE.name)}</h1><p>${esc(PROFILE.tagline)} ${PROFILE.bullets.map(([b, t]) => esc(b + ' ' + t)).join(' · ')}</p>` +
    `<h2>At a glance</h2><ul>${PROFILE.facts.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join('')}</ul>` +
    `<h2>Route</h2><ul>${STOPS.map(s => `<li><b>${esc(s.when)} · ${esc(s.title)}, ${esc(s.name)}</b>: ${esc(s.text)}</li>`).join('')}</ul>` +
    `<h2>Skills</h2><ul>${SKILLS.map(g => `<li><b>${esc(g.group)}:</b> ${g.items.map(i => esc(i[0])).join(', ')}</li>`).join('')}</ul>` +
    `<h2>Publications</h2><ul>${PAPERS.map(p => `<li>${esc(p.title)}. ${esc(p.venue)}, ${esc(p.year)}.</li>`).join('')}</ul>` +
    `<h2>Recognition</h2><ul>${AWARDS.map(([w, t]) => `<li>${esc(w)}: ${esc(t)}</li>`).join('')}</ul>` +
    `<h2>Contact</h2><p><a href="mailto:${PROFILE.links.email}">${PROFILE.links.email}</a> · <a href="${PROFILE.links.linkedin}">LinkedIn</a> · <a href="${PROFILE.links.github}">GitHub</a></p>`;
  $('#plainBtn').addEventListener('click', e => {
    const on = document.body.classList.toggle('plain');
    plain.hidden = !on;
    e.currentTarget.setAttribute('aria-pressed', on);
    e.currentTarget.textContent = on ? 'Search version' : 'Plain version';
  });

  /* ---------- tabs ---------- */
  let pendingQuestion = null;
  function go(tab) { if (location.hash === '#' + tab) showTab(); else location.hash = tab; }
  function showTab() {
    const name = TAB_NAMES[location.hash.slice(1)] ? location.hash.slice(1) : 'all';
    Object.keys(TAB_NAMES).forEach(t => { $('#tab-' + t).hidden = t !== name; });
    $$('.tabs a').forEach(a => { if (a.dataset.tab === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.body.classList.toggle('ai-on', name === 'ai');
    if (name === 'maps') Earth.init();
    if (name === 'ai' && pendingQuestion) { const qn = pendingQuestion; pendingQuestion = null; aiAsk(qn); }
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', showTab);

  /* ---------- shared answer helpers ---------- */
  function findAnswer(question) {
    const text = question.toLowerCase();
    let best = null, bestScore = 0;
    KB.forEach(item => {
      const score = item.k.reduce((n, k) => n + (text.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { best = item; bestScore = score; }
    });
    return best;
  }
  const NO_ANSWER = { a: "That isn't in Mrigendra's résumé or project notes, so I won't guess. Try asking about his research, ventures, skills, or fit for Consulting and Founder's Office roles.", s: [] };
  const sourcesHtml = list => list && list.length ? `<div class="sources">${list.map(s => `<span class="src">${esc(s)}</span>`).join('')}</div>` : '';
  function stream(target, text, onTick, done) {
    if (reduceMotion) { target.textContent = text; done && done(); return; }
    const words = text.split(' ');
    let i = 0;
    const cursor = document.createElement('span'); cursor.className = 'cursor';
    target.textContent = ''; target.appendChild(cursor);
    (function step() {
      cursor.before(document.createTextNode((i ? ' ' : '') + words[i]));
      i++; onTick && onTick();
      if (i < words.length) setTimeout(step, 26); else { cursor.remove(); done && done(); }
    })();
  }

  /* ---------- AI MODE (chat) ---------- */
  const aiThread = $('#aiThread'), asked = new Set();
  $('#aiCards').innerHTML = KB.slice(0, 4).map((k, i) => `<button class="ai-card" data-i="${i}"><span>${esc(k.q)}</span><i>${k.icon}</i></button>`).join('');
  $('#aiCards').addEventListener('click', e => { const b = e.target.closest('.ai-card'); if (b) aiAsk(KB[+b.dataset.i].q); });
  function aiAsk(question) {
    $('#aiHello').hidden = true;
    asked.add(question);
    aiThread.insertAdjacentHTML('beforeend', `<div class="turn-q">${esc(question)}</div>`);
    const hit = findAnswer(question) || NO_ANSWER;
    const turn = document.createElement('div');
    turn.className = 'turn-a';
    turn.innerHTML = '<span class="spark" aria-hidden="true"></span><div><div class="txt"></div></div>';
    aiThread.appendChild(turn);
    const scroll = () => turn.scrollIntoView({ block: 'end' });
    stream(turn.querySelector('.txt'), hit.a, scroll, () => {
      const next = KB.filter(k => !asked.has(k.q)).slice(0, 3);
      turn.lastElementChild.insertAdjacentHTML('beforeend', sourcesHtml(hit.s) +
        (next.length ? `<div class="followups">${next.map(k => `<button class="chip">${esc(k.q)}</button>`).join('')}</div>` : ''));
      turn.querySelectorAll('.followups .chip').forEach(c => c.addEventListener('click', () => aiAsk(c.textContent)));
      scroll();
    });
  }
  $('#aiForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#aiInput').value.trim();
    if (v) { aiAsk(v); $('#aiInput').value = ''; }
  });
  $('#aiNew').addEventListener('click', () => { aiThread.innerHTML = ''; asked.clear(); $('#aiHello').hidden = false; $('#aiInput').focus(); });
  function askInAiMode(question) { pendingQuestion = question; go('ai'); }

  /* ---------- search index ---------- */
  const INDEX = [
    ...RESULTS.map(r => ({ tab: 'all', title: r.title, text: r.snippet + ' ' + r.chips.join(' '), href: r.href })),
    ...KB.map(k => ({ tab: 'ai', title: k.q, text: k.a, ask: k.q })),
    ...STOPS.map((s, i) => ({ tab: 'maps', title: `${s.name} · ${s.title}`, text: `${s.when}. ${s.text}`, stop: i })),
    ...SKILLS.flatMap(g => g.items.map(([name, ev]) => ({ tab: 'skills', title: name, text: `${g.group}${ev ? '. Used in: ' + ev : ''}` }))),
    ...DECKS.map(d => ({ tab: 'skills', title: d.title, text: d.text + ' ' + d.tags.join(' ') })),
    ...REPOS.map(r => ({ tab: 'opensource', title: r.name, text: `${r.text} ${r.lang} ${r.kind}`, href: r.href })),
    ...PAPERS.map(p => ({ tab: 'publications', title: p.title, text: `${p.venue}, ${p.year}. ${p.authors}`, href: p.href })),
    ...WRITING.map(w => ({ tab: 'publications', title: w.title, text: `Medium, ${w.when}`, href: w.href })),
    ...AWARDS.map(([w, t]) => ({ tab: 'all', title: t, text: `Recognition · ${w}` })),
    ...OFFERS.map(o => ({ tab: 'connect', title: o.title, text: `Side project. ${o.text}` })),
    ...Object.values(FORECASTS).map(f => ({ tab: 'fit', title: `${f.tabLabel} forecast: ${f.role}`, text: `${f.headline} ${f.why.join('. ')}` })),
    ...IMAGES.map(img => ({ tab: 'images', title: img.caption, text: img.story || 'Photo' }))
  ];
  const STOP_WORDS = new Set(['the', 'a', 'an', 'of', 'and', 'or', 'in', 'on', 'for', 'to', 'is', 'does', 'did', 'he', 'his', 'what', 'with', 'about', 'mrigendra', 'singh', 'chauhan']);
  const tokens = q => q.toLowerCase().split(/[^a-z0-9₹%+.#-]+/i).filter(t => t.length > 1 && !STOP_WORDS.has(t));
  function search(q) {
    const ts = tokens(q);
    if (!ts.length) return [];
    return INDEX.map(item => {
      const title = item.title.toLowerCase(), text = item.text.toLowerCase();
      const score = ts.reduce((n, t) => n + (title.includes(t) ? 3 : 0) + (text.includes(t) ? 1 : 0), 0);
      return { item, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).map(r => r.item);
  }
  function highlight(str, q) {
    const ts = tokens(q).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const safe = esc(str);
    return ts.length ? safe.replace(new RegExp(`(${ts.join('|')})`, 'gi'), '<mark>$1</mark>') : safe;
  }
  function openItem(item) {
    if (item.ask) return askInAiMode(item.ask);
    if (item.stop !== undefined) Earth.pending = item.stop;
    if (item.tab === 'all' && item.href) { window.open(item.href, '_blank', 'noopener'); return; }
    go(item.tab);
  }

  /* ---------- search bar ---------- */
  const q = $('#q'), suggest = $('#suggest'), clearBtn = $('#clearBtn');
  const isName = v => !v.trim() || v.trim().toLowerCase() === PROFILE.query.toLowerCase();
  q.value = PROFILE.query;
  let suggestions = [], active = -1;

  function renderSuggest() {
    const v = q.value.trim();
    clearBtn.hidden = !q.value;
    if (isName(v) || document.activeElement !== q) { closeSuggest(); return; }
    const hits = search(v).slice(0, 6);
    suggestions = [{ ask: v, label: `Ask AI Mode: “${v}”`, tab: 'ai', icon: '✦' }, ...hits.map(h => ({ item: h, label: h.title, tab: h.tab, icon: '⌕' }))];
    active = -1;
    suggest.innerHTML = suggestions.map((s, i) => `<li role="option" id="sg-${i}" aria-selected="false" data-i="${i}"><span class="si">${s.icon}</span><span>${i ? highlight(s.label, v) : esc(s.label)}</span><small>${TAB_NAMES[s.tab]}</small></li>`).join('');
    suggest.hidden = false;
    q.setAttribute('aria-expanded', 'true');
  }
  function closeSuggest() { suggest.hidden = true; q.setAttribute('aria-expanded', 'false'); q.removeAttribute('aria-activedescendant'); }
  function pick(s) {
    closeSuggest();
    if (s.ask !== undefined) askInAiMode(s.ask); else openItem(s.item);
  }
  q.addEventListener('input', renderSuggest);
  q.addEventListener('focus', renderSuggest);
  q.addEventListener('blur', () => setTimeout(closeSuggest, 150));
  q.addEventListener('keydown', e => {
    if (suggest.hidden) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + suggestions.length) % suggestions.length;
      suggest.querySelectorAll('li').forEach((li, i) => li.setAttribute('aria-selected', i === active));
      q.setAttribute('aria-activedescendant', 'sg-' + active);
    } else if (e.key === 'Escape') closeSuggest();
    else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); pick(suggestions[active]); }
  });
  suggest.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); pick(suggestions[+li.dataset.i]); } });
  clearBtn.addEventListener('click', () => { q.value = ''; q.focus(); renderSuggest(); });
  $('#askBtn').addEventListener('click', () => { const v = q.value.trim(); askInAiMode(isName(v) ? KB[0].q : v); });
  $('#searchForm').addEventListener('submit', e => { e.preventDefault(); closeSuggest(); runSearch(q.value); });

  function runSearch(v) {
    const landing = isName(v);
    $('#landing').hidden = !landing;
    $('#searchView').hidden = landing;
    go('all');
    if (landing) return;
    const hits = search(v), answer = findAnswer(v);
    $('#searchMeta').textContent = `About ${hits.length} result${hits.length === 1 ? '' : 's'} for “${v}” across Mrigendra's work`;
    const ov = $('#searchOverview');
    ov.hidden = !answer;
    if (answer) {
      ov.innerHTML = `<header class="ov-head"><span class="spark" aria-hidden="true"></span><h2>AI Overview</h2></header><p>${esc(answer.a)}</p>${sourcesHtml(answer.s)}<div class="row"><button class="pill solid" id="ovMore">Continue in AI Mode →</button></div>`;
      $('#ovMore').addEventListener('click', () => askInAiMode(v));
    }
    $('#searchResults').innerHTML = hits.length ? hits.map((h, i) => `
      <div class="result">
        <div class="r-site"><span class="fav">${esc(TAB_NAMES[h.tab].slice(0, 2))}</span><div><b>MriGoogle</b><span>mrigoogle › ${esc(TAB_NAMES[h.tab].toLowerCase())}</span></div></div>
        <h3><a href="#${h.tab}" data-hit="${i}">${highlight(h.title, v)}</a></h3>
        <p>${highlight(h.text.length > 170 ? h.text.slice(0, 170) + '…' : h.text, v)}</p>
      </div>`).join('')
      : `<div class="empty"><p>No results for <b>“${esc(v)}”</b> in Mrigendra's work.</p><p>Try “market sizing”, “Python”, “ANU”, “ESG” or “side project”, or <button class="link pill" id="emptyAsk">ask AI Mode</button>.</p></div>`;
    $$('#searchResults [data-hit]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openItem(hits[+a.dataset.hit]); }));
    const emptyAsk = $('#emptyAsk'); if (emptyAsk) emptyAsk.addEventListener('click', () => askInAiMode(v));
  }
  $('.logo').addEventListener('click', () => { q.value = PROFILE.query; runSearch(q.value); });

  /* ---------- ALL: landing ---------- */
  const imgHtml = (img, cls = '') => img.src ? `<img src="${esc(img.src)}" alt="${esc(img.caption)}" loading="lazy">` : `<div class="ph ${cls}">${esc(img.caption)}</div>`;
  $('#strip').innerHTML = IMAGES.slice(0, 6).map((img, i) => `<button data-img="${i}" aria-label="${esc(img.caption)}">${imgHtml(img)}</button>`).join('');
  $('#ovBullets').innerHTML = PROFILE.bullets.map(([b, t]) => `<li><span><b>${esc(b)}</b> ${esc(t)}</span></li>`).join('');
  $('#ovChips').innerHTML = KB.slice(0, 3).map(k => `<button class="chip">${esc(k.q)}</button>`).join('');
  $$('#ovChips .chip').forEach(c => c.addEventListener('click', () => askInAiMode(c.textContent)));
  $('#stops').innerHTML = STOPS.map((s, i) => `<a class="stop" href="#maps" data-stop="${i}"><div class="ph">${esc(s.photo)}</div><div class="b"><small>${esc(s.when)}</small><h3>${esc(s.name)} · ${esc(s.title)}</h3><span class="num">${esc(s.result[0])}</span><span class="lab">${esc(s.result[1])}</span></div></a>`).join('');
  $$('#stops .stop').forEach(a => a.addEventListener('click', () => { Earth.pending = +a.dataset.stop; }));
  $('#awards').innerHTML = AWARDS.map(([w, t]) => `<div class="aw"><small>${esc(w)}</small>${esc(t)}</div>`).join('');
  $('#paa').innerHTML = KB.slice(3).map(k => `<details><summary>${esc(k.q)}</summary><div class="ans">${esc(k.a)}${sourcesHtml(k.s)}</div></details>`).join('');
  $('#results').innerHTML = RESULTS.map(r => `
    <div class="result">
      <div class="r-site"><span class="fav">${esc(r.site.slice(0, 2))}</span><div><b>${esc(r.site)}</b><span>${esc(r.url)}</span></div></div>
      <h3><a href="${r.href}" ${ext(r.href)}>${esc(r.title)}</a></h3>
      <p>${esc(r.snippet)}</p>
      <div class="r-chips">${r.chips.map(c => `<span>${esc(c)}</span>`).join('')}</div>
    </div>`).join('');
  $('#kpName').textContent = PROFILE.name;
  $('#kpRole').textContent = PROFILE.role;
  $('#kpTag').textContent = PROFILE.tagline;
  $('#kpStats').innerHTML = PROFILE.stats.map(([n, l]) => `<div><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('');
  $('#kpFacts').innerHTML = PROFILE.facts.map(([k, v]) => `<div><dt>${esc(k)}: </dt><dd>${esc(v)}</dd></div>`).join('');
  $('#kpLinks').innerHTML = [['LinkedIn', 'linkedin'], ['GitHub', 'github'], ['Paper', 'paper']]
    .map(([label, key]) => `<a class="pill" href="${PROFILE.links[key]}" target="_blank" rel="noopener">${label} ↗</a>`).join('') + '<a class="pill solid" href="#connect">Connect</a>';

  /* ---------- IMAGES + lightbox ---------- */
  $('#imgFilter').hidden = true;
  $('#imgGrid').innerHTML = IMAGES.map((img, i) => `<figure data-img="${i}" tabindex="0" role="button" aria-label="Open ${esc(img.caption)}">${imgHtml(img)}<figcaption>${esc(img.caption)}</figcaption></figure>`).join('');
  const lightbox = $('#lightbox');
  let lastFocus = null;
  function openImage(i) {
    const img = IMAGES[i];
    lastFocus = document.activeElement;
    $('#lbBody').innerHTML = `${imgHtml(img)}<div class="lb-text"><h3>${esc(img.caption)}</h3><p>${esc(img.story || 'Story coming soon.')}</p></div>`;
    lightbox.hidden = false;
    $('#lbClose').focus();
  }
  function closeImage() { lightbox.hidden = true; lastFocus && lastFocus.focus(); }
  document.addEventListener('click', e => { const t = e.target.closest('[data-img]'); if (t) openImage(+t.dataset.img); });
  $('#imgGrid').addEventListener('keydown', e => { const t = e.target.closest('[data-img]'); if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openImage(+t.dataset.img); } });
  $('#lbClose').addEventListener('click', closeImage);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeImage(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeImage(); });

  /* ---------- SKILLS & TOOLS ---------- */
  $('#skillGroups').innerHTML = SKILLS.map(g => `<div class="sg"><h3><span>${g.icon}</span>${esc(g.group)}</h3><ul>${g.items.map(([n, ev]) => `<li><span>${esc(n)}</span>${ev ? `<small>${esc(ev)}</small>` : ''}</li>`).join('')}</ul></div>`).join('');
  $('#decks').innerHTML = DECKS.map(d => `<article class="card"><div class="ph thumb">Deck preview</div><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p><div class="tags">${d.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div><div class="foot-row">${d.href ? `<a href="${d.href}" ${ext(d.href)}>Open ↗</a>` : '<span>Deck coming soon</span>'}</div></article>`).join('');

  /* ---------- OPEN-SOURCE ---------- */
  const LANG_COLORS = { JavaScript: '#f1e05a', Python: '#3572A5', Jupyter: '#DA5B0B', TeX: '#3D6117', Kaggle: '#20BEFF', Prompting: '#8a63d2' };
  const kinds = ['All', ...new Set(REPOS.map(r => r.kind))];
  let kind = 'All';
  $('#repoFilter').innerHTML = kinds.map(k => `<button class="chip" data-kind="${k}" aria-pressed="${k === 'All'}">${k}</button>`).join('');
  $('#repoFilter').addEventListener('click', e => {
    const b = e.target.closest('[data-kind]'); if (!b) return;
    kind = b.dataset.kind;
    $$('#repoFilter .chip').forEach(c => c.setAttribute('aria-pressed', c === b));
    renderRepos();
  });
  function renderRepos() {
    $('#repos').innerHTML = REPOS.filter(r => kind === 'All' || r.kind === kind).map(r => `
      <article class="card"><h3><a href="${r.href}" ${ext(r.href)}>${esc(r.name)}</a></h3><p>${esc(r.text)}</p>
      <div class="foot-row"><span class="lang"><i style="background:${LANG_COLORS[r.lang] || 'var(--muted)'}"></i>${esc(r.lang)}</span><span>${esc(r.kind)}</span></div></article>`).join('');
  }
  renderRepos();

  /* ---------- PUBLICATIONS ---------- */
  $('#papers').innerHTML = PAPERS.map((p, i) => `
    <article class="paper ${i === 0 ? 'featured' : ''}">
      <span class="type">${esc(p.type)} · ${esc(p.year)}</span>
      <h3>${p.href ? `<a href="${p.href}" ${ext(p.href)}>${esc(p.title)}</a>` : esc(p.title)}</h3>
      <div class="au">${esc(p.authors)} · ${esc(p.venue)}</div>
      ${p.figures ? `<div class="figs">${p.figures.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('')}</div>` : ''}
      ${p.doi ? `<div class="acts"><a class="pill" href="${p.href}" ${ext(p.href)}>Read on Springer ↗</a><button class="pill" data-cite="${i}">Copy citation</button></div>` : ''}
    </article>`).join('');
  $$('[data-cite]').forEach(b => b.addEventListener('click', async () => {
    const p = PAPERS[+b.dataset.cite];
    const cite = `${p.authors} (${p.year}). ${p.title}. ${p.venue}. https://doi.org/${p.doi}`;
    try { await navigator.clipboard.writeText(cite); b.textContent = 'Copied ✓'; } catch (e) { b.textContent = 'Copy failed'; }
    setTimeout(() => { b.textContent = 'Copy citation'; }, 1800);
  }));
  $('#writing').innerHTML = WRITING.map(w => `<div class="post"><a href="${w.href}" ${ext(w.href)}>${esc(w.title)}</a><small>${esc(w.when)}</small></div>`).join('');

  /* ---------- CONNECT ---------- */
  const L = PROFILE.links;
  $('#ccLinks').innerHTML = [['Email', `mailto:${L.email}`, 'mastersunion.org'], ['LinkedIn', L.linkedin, 'in/mrigendra-singh ↗'], ['GitHub', L.github, 'MRIG003 ↗'], ['Medium', L.medium, '@mrigendraschauhan ↗'], ['Kaggle', L.kaggle, 'mrigendrachauhan ↗']]
    .map(([n, h, s]) => `<a href="${h}" ${ext(h)}>${n}<span>${s}</span></a>`).join('');
  $('#offers').innerHTML = OFFERS.map((o, i) => `<button class="offer" data-offer="${i}" aria-pressed="false"><i>${o.icon}</i><h3>${esc(o.title)}</h3><p>${esc(o.text)}</p></button>`).join('');
  $('#bType').innerHTML = OFFERS.map(o => `<option>${esc(o.title)}</option>`).join('') + '<option>Something else</option>';
  $$('.offer').forEach(b => b.addEventListener('click', () => {
    $$('.offer').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('#bType').selectedIndex = +b.dataset.offer;
    $('#bName').focus();
  }));
  $('#briefForm').addEventListener('submit', e => {
    e.preventDefault();
    const subject = `Side project: ${$('#bType').value}`;
    const body = `Hi Mrigendra,\n\n${$('#bText').value}\n\n— ${$('#bName').value}`;
    location.href = `mailto:${L.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ---------- JD-FIT-CHECK (weather) ---------- */
  const params = new URLSearchParams(location.search);
  const keys = Object.keys(FORECASTS);
  let fKey = FORECASTS[params.get('for')] ? params.get('for') : keys[0];
  const conditionIcon = t => t >= 85 ? 'sun' : t >= 72 ? 'partly' : t >= 60 ? 'cloud' : 'rain';

  function chartSvg(points) {
    const w = 640, h = 110, pad = 22;
    const vals = points.map(p => p.v), min = Math.min(...vals) - 6, max = Math.max(...vals) + 4;
    const x = i => pad + i * (w - pad * 2) / (points.length - 1);
    const y = v => h - 22 - (v - min) / (max - min) * (h - 42);
    const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join('');
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Career momentum from 2017 to now">
      <path class="area" d="${line}L${x(points.length - 1)},${h - 18}L${x(0)},${h - 18}Z"/><path class="line" d="${line}"/>
      ${points.map((p, i) => `<text class="v" x="${x(i)}" y="${y(p.v) - 8}" text-anchor="middle">${p.v}</text><text x="${x(i)}" y="${h - 3}" text-anchor="middle">${esc(p.t)}</text>`).join('')}
    </svg>`;
  }
  const tilesHtml = (list, cls = '') => `<div class="tiles ${cls}">${list.map(([k, v, p]) => `<div class="tile ${/rain/i.test(k) ? 'rain' : ''}"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div><p>${esc(p)}</p></div>`).join('')}</div>`;

  function renderWeather(f) {
    const icon = conditionIcon(f.temp);
    $('#wx').innerHTML = `
      <div class="wx-hero">
        <div class="wx-loc"><b>Forecast for Mrigendra</b>${esc(f.role)} · ${esc(f.city)}</div>
        <div class="wx-main">${ICONS[icon]}<div class="wx-temp">${f.temp}<sup>° fit</sup></div><div class="wx-cond"><b>${esc(f.condition)}</b>High ${f.hi}° · Low ${f.lo}°</div></div>
        <p class="wx-headline">${esc(f.headline)}</p>
        ${f.why ? `<div class="wx-why">${f.why.map(w => `<span>${esc(w)}</span>`).join('')}</div>` : ''}
      </div>
      <div class="wx-sec"><h3>Career momentum · 2017 → now</h3>${chartSvg(HOURLY)}
        <div class="hourly">${HOURLY.map(h => `<div>${ICONS[h.icon]}${esc(h.label)}</div>`).join('')}</div></div>
      <div class="wx-sec"><h3>First 90 days · ${esc(f.company)}</h3>
        <div class="days">${f.days.map(d => `<div class="day"><b>${esc(d.d)}</b>${ICONS[d.icon]}<span>${esc(d.t)}</span><span class="range">${d.lo}°<i></i>${d.hi}°</span></div>`).join('')}</div></div>
      <div class="wx-sec"><h3>Conditions · skills</h3>${tilesHtml(f.details)}</div>
      ${f.culture ? `<div class="wx-sec"><h3>Culture forecast</h3>${tilesHtml(f.culture, 'four')}</div>` : ''}`;
  }
  function renderMini(f) {
    $('#miniWeather').innerHTML = `${ICONS[conditionIcon(f.temp)]}<div class="t">${f.temp}<sup>° fit</sup></div>
      <div class="w-meta"><b>Forecast for Mrigendra · ${esc(f.tabLabel)}</b>${esc(f.condition)} · ${esc(f.role)}<div class="go">JD-Fit-Check →</div></div>`;
  }
  function selectForecast(key) {
    fKey = key;
    $$('#wxSwitch button').forEach(b => b.setAttribute('aria-selected', b.dataset.key === key));
    const url = new URL(location.href);
    if (key === keys[0]) url.searchParams.delete('for'); else url.searchParams.set('for', key);
    history.replaceState(null, '', url);
    renderWeather(FORECASTS[key]); renderMini(FORECASTS[key]);
  }
  $('#wxSwitch').innerHTML = keys.map(k => `<button role="tab" data-key="${k}"><small>${esc(FORECASTS[k].tabLabel)}</small><b>${FORECASTS[k].temp}°</b> ${ICONS[conditionIcon(FORECASTS[k].temp)].replace('class="wi"', 'class="wi" width="22" height="22" style="vertical-align:-5px"')}</button>`).join('');
  $('#wxSwitch').addEventListener('click', e => { const b = e.target.closest('[data-key]'); if (b) selectForecast(b.dataset.key); });
  selectForecast(fKey);

  const JD_EXAMPLES = {
    strong: "Founder's Office Associate at a climate startup. Own market sizing and scenario analysis for new bets, run cross-functional launches and go-to-market, build Excel/SQL models, manage stakeholders in a fast-paced, ambiguous environment. ESG exposure and comfort with AI tools a plus.",
    weak: "Senior Backend Engineer. 5+ years of experience building Java services and React front ends. People management of a team of 4. CFA or investment banking background preferred."
  };
  $$('[data-ex]').forEach(b => b.addEventListener('click', () => { $('#jd').value = JD_EXAMPLES[b.dataset.ex]; runJd(); }));
  $('#jdBtn').addEventListener('click', runJd);
  function runJd() {
    const text = $('#jd').value.toLowerCase();
    if (!text.trim()) { $('#jd').focus(); return; }
    const pickSignals = map => [...new Set(Object.keys(map).filter(k => text.includes(k)).map(k => map[k]))];
    const hits = pickSignals(JD_SIGNALS.match), gaps = pickSignals(JD_SIGNALS.gap);
    const ratio = hits.length / Math.max(hits.length + gaps.length * 1.5, 1);
    const temp = Math.round(48 + ratio * 46);
    const condition = temp >= 85 ? 'Sunny: strong fit' : temp >= 72 ? 'Partly cloudy: good fit' : temp >= 60 ? 'Overcast: partial fit' : 'Rain: probably not me';
    $$('#wxSwitch button').forEach(b => b.setAttribute('aria-selected', 'false'));
    renderWeather({
      company: 'this role', role: 'Your pasted JD', city: 'your team', temp, condition, hi: Math.min(temp + 6, 99), lo: Math.max(temp - 14, 30),
      headline: temp >= 60
        ? `${hits.length} requirement${hits.length === 1 ? '' : 's'} with sunshine, ${gaps.length} with rain. Here's the honest breakdown.`
        : "Honestly, this role needs things I don't have yet. I'd point you to someone else.",
      days: temp >= 60 ? FORECASTS[fKey].days : [{ d: 'Day 1', icon: 'rain', t: 'Not forecast: this role is outside my range today. Ask me about adjacent roles instead.', hi: temp, lo: Math.max(temp - 14, 30) }],
      details: [...hits.slice(0, 6).map(h => ['Sunshine', 'Match', h]), ...gaps.slice(0, 6).map(g => ['Chance of rain', 'Gap', g])]
        .concat(hits.length + gaps.length ? [] : [['Visibility', 'Low', 'No recognisable requirements found. Try a fuller JD.']])
    });
  }

  /* ---------- MAPS (globe) ---------- */
  const Earth = {
    ready: false, idx: 0, layer: 'all', tour: null, pending: null,
    init() {
      if (this.ready) { this.resize(); if (this.pending !== null) { this.go(this.pending); this.pending = null; } return; }
      this.ready = true;
      const svg = d3.select('#globe');
      this.svg = svg;
      this.projection = d3.geoOrthographic().clipAngle(90).precision(0.5);
      this.path = d3.geoPath(this.projection);
      const land = topojson.feature(WORLD_110M, WORLD_110M.objects.land);
      this.g = svg.append('g');
      this.g.append('path').datum({ type: 'Sphere' }).attr('class', 'sphere');
      this.g.append('path').datum(d3.geoGraticule10()).attr('class', 'grat');
      this.g.append('path').datum(land).attr('class', 'land');
      this.g.append('path').datum({ type: 'LineString', coordinates: STOPS.map(s => s.coords) }).attr('class', 'route');
      this.pins = this.g.selectAll('.gpin').data(STOPS).enter().append('g').attr('class', 'gpin')
        .attr('tabindex', 0).attr('role', 'button').attr('aria-label', s => `${s.name}, ${s.when}`)
        .on('click', (e, s) => this.go(STOPS.indexOf(s)))
        .on('keydown', (e, s) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.go(STOPS.indexOf(s)); } });
      this.pins.append('circle').attr('r', 6);
      // Label placement per stop so the three Indian pins don't collide
      const LABEL = { bhopal: [-10, 14, 'end'], gurugram: [-10, -6, 'end'], guwahati: [10, 4, 'start'], fredericton: [10, 4, 'start'], canberra: [-10, 4, 'end'] };
      this.pins.append('text')
        .attr('x', s => (LABEL[s.id] || [10])[0]).attr('y', s => (LABEL[s.id] || [0, 4])[1])
        .attr('text-anchor', s => (LABEL[s.id] || [0, 0, 'start'])[2])
        .text((s, i) => `${i + 1} ${s.name}`);

      svg.call(d3.drag().on('drag', e => {
        this.stopTour();
        const r = this.projection.rotate(), k = 70 / this.projection.scale();
        this.projection.rotate([r[0] + e.dx * k, Math.max(-80, Math.min(80, r[1] - e.dy * k))]);
        this.draw();
      }));

      const layers = [['all', 'All'], ['research', 'Research'], ['ventures', 'Ventures'], ['leadership', 'Leadership'], ['foundations', 'Foundations']];
      $('#layers').innerHTML = layers.map(([k, l]) => `<button class="layer" data-layer="${k}" aria-pressed="${k === 'all'}">${l}</button>`).join('');
      $('#layers').addEventListener('click', e => {
        const b = e.target.closest('.layer'); if (!b) return;
        this.layer = b.dataset.layer;
        $$('.layer').forEach(x => x.setAttribute('aria-pressed', x === b));
        this.draw();
      });
      $('#vList').innerHTML = STOPS.map((s, i) => `<li><button data-i="${i}"><span class="n">${i + 1}</span><span>${esc(s.name)} · ${esc(s.title)}<small>${esc(s.when)}</small></span></button></li>`).join('');
      $('#vList').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { this.stopTour(); this.go(+b.dataset.i); } });
      $('#prevBtn').addEventListener('click', () => { this.stopTour(); this.go((this.idx + STOPS.length - 1) % STOPS.length); });
      $('#nextBtn').addEventListener('click', () => { this.stopTour(); this.go((this.idx + 1) % STOPS.length); });
      $('#tourBtn').addEventListener('click', () => this.tour ? this.stopTour() : this.startTour());
      window.addEventListener('resize', () => { if (!$('#tab-maps').hidden) this.resize(); });

      this.resize();
      const start = STOPS[0].coords;
      this.projection.rotate([-start[0] + 40, -start[1] + 10]);
      this.go(this.pending !== null ? this.pending : 0);
      this.pending = null;
    },
    resize() {
      const box = $('#globeWrap').getBoundingClientRect();
      this.w = box.width; this.h = box.height;
      this.svg.attr('viewBox', `0 0 ${this.w} ${this.h}`);
      this.projection.translate([this.w / 2, this.h / 2]).scale(Math.min(this.w, this.h) * 0.42);
      this.draw();
    },
    draw() {
      this.g.selectAll('path').attr('d', this.path);
      const center = this.projection.invert([this.w / 2, this.h / 2]);
      this.pins
        .attr('transform', s => { const p = this.projection(s.coords); return `translate(${p[0]},${p[1]})`; })
        .style('display', s => d3.geoDistance(s.coords, center) > Math.PI / 2 ? 'none' : null)
        .classed('active', (s, i) => i === this.idx)
        .classed('dim', s => this.layer !== 'all' && s.layer !== this.layer);
    },
    go(i) {
      this.idx = i;
      const s = STOPS[i];
      $('#vCard').innerHTML = `<div class="ph">Photo: ${esc(s.photo)}</div><div class="v-body"><span class="when">${esc(s.when)} · ${esc(s.place)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><div class="v-result"><b>${esc(s.result[0])}</b><span>${esc(s.result[1])}</span></div></div>`;
      $$('#vList button').forEach((b, j) => b.setAttribute('aria-current', j === i));
      const from = this.projection.rotate(), to = [-s.coords[0], -s.coords[1] * 0.8];
      if (reduceMotion) { this.projection.rotate(to); this.draw(); return; }
      const interp = d3.interpolate(from, to);
      if (this.timer) this.timer.stop();
      this.timer = d3.timer(elapsed => {
        const t = Math.min(elapsed / 1300, 1);
        this.projection.rotate(interp(d3.easeCubicInOut(t)));
        this.draw();
        if (t === 1) this.timer.stop();
      });
    },
    startTour() {
      $('#tourBtn').textContent = '❚❚ Pause';
      this.go((this.idx + 1) % STOPS.length);
      this.tour = setInterval(() => this.go((this.idx + 1) % STOPS.length), 3800);
    },
    stopTour() {
      if (!this.tour) return;
      clearInterval(this.tour); this.tour = null;
      $('#tourBtn').textContent = '▶ Play tour';
    }
  };

  showTab();
})();
