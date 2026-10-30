(() => {
  const $ = sel => document.querySelector(sel);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const ICONS = {
    sun: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="12" fill="#FDB813"/><g stroke="#FDB813" stroke-width="4" stroke-linecap="round"><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7"/></g></svg>',
    partly: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><circle cx="24" cy="24" r="10" fill="#FDB813"/><g stroke="#FDB813" stroke-width="3.5" stroke-linecap="round"><path d="M24 4v6M4 24h6M9.9 9.9l4.2 4.2M38.1 9.9l-4.2 4.2"/></g><path d="M20 50a10 10 0 0 1 1-20 13 13 0 0 1 25 3 8.5 8.5 0 0 1-1 17Z" fill="#E6EEF5" stroke="#B9C7D4" stroke-width="1.5"/></svg>',
    cloud: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 48a11 11 0 0 1 1.5-22 15 15 0 0 1 29 4 9 9 0 0 1-1 18Z" fill="#D7E0E8" stroke="#A9B8C6" stroke-width="1.5"/></svg>',
    rain: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 40a11 11 0 0 1 1.5-22 15 15 0 0 1 29 4 9 9 0 0 1-1 18Z" fill="#C9D4DE" stroke="#A0AFBD" stroke-width="1.5"/><g stroke="#4A90E2" stroke-width="3.5" stroke-linecap="round"><path d="M22 46l-3 8M34 46l-3 8M46 46l-3 8"/></g></svg>',
    wind: '<svg class="wi" viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="#7FA7C9" stroke-width="4" stroke-linecap="round"><path d="M8 24h30a7 7 0 1 0-7-7"/><path d="M8 34h42a7 7 0 1 1-7 7"/><path d="M8 44h20"/></g></svg>'
  };

  /* ---------- theme + plain version ---------- */
  const root = document.documentElement;
  try { const saved = localStorage.getItem('mrigoogle-theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
  $('#themeBtn').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('mrigoogle-theme', root.dataset.theme); } catch (e) {}
  });

  const plain = $('#plain');
  plain.innerHTML =
    `<h1>${esc(PROFILE.name)}</h1><p>${esc(PROFILE.summary)}</p>` +
    `<h2>At a glance</h2><ul>${PROFILE.facts.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join('')}</ul>` +
    `<h2>Route</h2><ul>${STOPS.map(s => `<li><b>${esc(s.when)} · ${esc(s.title)}, ${esc(s.name)}</b>: ${esc(s.text)} <b>${esc(s.result[0])}</b> ${esc(s.result[1])}.</li>`).join('')}</ul>` +
    `<h2>Recognition</h2><ul>${NEWS.map(n => `<li>${esc(n.when)}: ${esc(n.title)}</li>`).join('')}</ul>` +
    `<h2>Contact</h2><p><a href="mailto:${PROFILE.links.email}">${PROFILE.links.email}</a> · <a href="${PROFILE.links.linkedin}">LinkedIn</a> · <a href="${PROFILE.links.github}">GitHub</a></p>`;
  $('#plainBtn').addEventListener('click', e => {
    const on = document.body.classList.toggle('plain');
    plain.hidden = !on;
    e.currentTarget.setAttribute('aria-pressed', on);
    e.currentTarget.textContent = on ? 'Search version' : 'Plain version';
  });

  /* ---------- tabs ---------- */
  const tabs = ['all', 'maps', 'weather', 'images', 'scholar', 'news'];
  function showTab() {
    const name = tabs.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'all';
    tabs.forEach(t => { $('#tab-' + t).hidden = t !== name; });
    document.querySelectorAll('.tabs a').forEach(a => {
      if (a.dataset.tab === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (name === 'maps') Earth.init();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', showTab);

  /* ---------- ALL: search + AI overview ---------- */
  const q = $('#q');
  q.value = PROFILE.query;
  $('#dymBtn').addEventListener('click', () => { $('#dymNote').hidden = !$('#dymNote').hidden; });

  const thread = $('#thread');
  function stream(target, text, done) {
    if (reduceMotion) { target.textContent = text; done && done(); return; }
    const words = text.split(' ');
    let i = 0;
    const cursor = document.createElement('span'); cursor.className = 'cursor';
    target.textContent = ''; target.appendChild(cursor);
    (function step() {
      cursor.before(document.createTextNode((i ? ' ' : '') + words[i]));
      i++;
      thread.scrollTop = thread.scrollHeight;
      if (i < words.length) setTimeout(step, 28); else { cursor.remove(); done && done(); }
    })();
  }
  function sourcesHtml(list) {
    return list.length ? `<div class="sources">${list.map(s => `<span class="src">${esc(s)}</span>`).join('')}</div>` : '';
  }
  function findAnswer(question) {
    const text = question.toLowerCase();
    let best = null, bestScore = 0;
    KB.forEach(item => {
      const score = item.k.reduce((n, k) => n + (text.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { best = item; bestScore = score; }
    });
    return best || { a: "That isn't in Mrigendra's résumé or project notes, so I won't guess. Try asking about his research, ventures, leadership or tools.", s: [] };
  }
  function ask(question, answer) {
    const bubble = document.createElement('div');
    bubble.className = 'q-bubble'; bubble.textContent = question;
    thread.appendChild(bubble);
    const hit = answer || findAnswer(question);
    const block = document.createElement('div'); block.className = 'a-block';
    const body = document.createElement('div'); block.appendChild(body);
    thread.appendChild(block);
    stream(body, hit.a, () => block.insertAdjacentHTML('beforeend', sourcesHtml(hit.s)));
  }

  // Opening overview
  const intro = document.createElement('div'); intro.className = 'a-block';
  const introBody = document.createElement('div'); intro.appendChild(introBody);
  thread.appendChild(intro);
  stream(introBody, PROFILE.summary, () => intro.insertAdjacentHTML('beforeend', sourcesHtml(['Résumé › Summary', 'LinkedIn', 'Springer'])));

  KB.slice(0, 4).forEach(item => {
    const b = document.createElement('button');
    b.className = 'chip'; b.type = 'button'; b.textContent = item.q;
    b.addEventListener('click', () => ask(item.q, item));
    $('#ovChips').appendChild(b);
  });
  $('#followForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#followInput').value.trim();
    if (v) { ask(v); $('#followInput').value = ''; }
  });
  $('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = q.value.trim();
    if (location.hash && location.hash !== '#all') location.hash = '#all';
    if (v && v.toLowerCase() !== PROFILE.query) { ask(v); $('.overview').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
  });

  // People also ask
  $('#paa').innerHTML = KB.slice(3).map(item =>
    `<details><summary>${esc(item.q)}</summary><div class="ans">${esc(item.a)}${sourcesHtml(item.s)}</div></details>`).join('');

  // Results
  $('#results').innerHTML = RESULTS.map(r => `
    <div class="result">
      <div class="r-site"><span class="fav">${esc(r.site.slice(0, 2))}</span><div><b>${esc(r.site)}</b><span>${esc(r.url)}</span></div></div>
      <h3><a href="${r.href}" ${r.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(r.title)}</a></h3>
      <p>${esc(r.snippet)}</p>
    </div>`).join('');

  // Knowledge panel
  $('#kpName').textContent = PROFILE.name;
  $('#kpSummary').textContent = PROFILE.tagline + ' ' + PROFILE.summary;
  $('#kpFacts').innerHTML = PROFILE.facts.map(([k, v]) => `<div><dt>${esc(k)}: </dt><dd>${esc(v)}</dd></div>`).join('');
  $('#kpStats').innerHTML = PROFILE.stats.map(([n, l]) => `<div><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('');
  $('#kpLinks').innerHTML = [['LinkedIn', 'linkedin'], ['GitHub', 'github'], ['Medium', 'medium'], ['Paper', 'paper']]
    .map(([label, key]) => `<a class="pill" href="${PROFILE.links[key]}" target="_blank" rel="noopener">${label} ↗</a>`).join('');

  /* ---------- WEATHER ---------- */
  const params = new URLSearchParams(location.search);
  let companyKey = COMPANIES[params.get('for')] ? params.get('for') : 'default';

  const conditionIcon = temp => temp >= 85 ? 'sun' : temp >= 72 ? 'partly' : temp >= 60 ? 'cloud' : 'rain';

  function chartSvg(points) {
    const w = 640, h = 120, pad = 22;
    const vals = points.map(p => p.v), min = Math.min(...vals) - 6, max = Math.max(...vals) + 4;
    const x = i => pad + i * (w - pad * 2) / (points.length - 1);
    const y = v => h - 24 - (v - min) / (max - min) * (h - 44);
    const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join('');
    const area = `${line}L${x(points.length - 1)},${h - 20}L${x(0)},${h - 20}Z`;
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Career momentum from 2017 to now">
      <path class="area" d="${area}"/><path class="line" d="${line}"/>
      ${points.map((p, i) => `<text class="v" x="${x(i)}" y="${y(p.v) - 8}" text-anchor="middle">${p.v}</text><text x="${x(i)}" y="${h - 4}" text-anchor="middle">${esc(p.t)}</text>`).join('')}
    </svg>`;
  }

  function renderWeather(f) {
    const icon = conditionIcon(f.temp);
    $('#wx').innerHTML = `
      <div class="wx-hero">
        <div class="wx-loc"><b>Forecast for Mrigendra</b>${esc(f.role)} · ${esc(f.company)} · ${esc(f.city)}</div>
        <div class="wx-main">
          ${ICONS[icon]}
          <div class="wx-temp">${f.temp}<sup>° fit</sup></div>
          <div class="wx-cond"><b>${esc(f.condition)}</b>High ${f.hi}° · Low ${f.lo}°</div>
        </div>
        <p class="wx-headline">${esc(f.headline)}</p>
      </div>
      <div class="wx-sec"><h3>Career momentum · 2017 → now</h3>${chartSvg(HOURLY)}
        <div class="hourly">${HOURLY.map(h => `<div>${ICONS[h.icon]}${esc(h.label)}</div>`).join('')}</div>
      </div>
      <div class="wx-sec"><h3>First 90 days at ${esc(f.company)}</h3>
        <div class="days">${f.days.map(d => `<div class="day"><b>${esc(d.d)}</b>${ICONS[d.icon]}<span>${esc(d.t)}</span><span class="range">${d.lo}°<i></i>${d.hi}°</span></div>`).join('')}</div>
      </div>
      <div class="wx-sec"><h3>Conditions</h3>
        <div class="tiles">${f.details.map(([k, v, p]) => `<div class="tile ${/rain/i.test(k) ? 'rain' : ''}"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div><p>${esc(p)}</p></div>`).join('')}</div>
      </div>
      ${f.extra || ''}`;
    $('#miniWeather').innerHTML = `${ICONS[icon]}
      <div><div class="t">${f.temp}<sup>° fit</sup></div></div>
      <div class="w-meta"><b>Forecast for Mrigendra</b>${esc(f.role)} at ${esc(f.company)} · ${esc(f.condition)}<div class="go">See full forecast →</div></div>`;
  }

  const sel = $('#companySel');
  sel.innerHTML = Object.entries(COMPANIES).map(([k, c]) => `<option value="${k}">${esc(c.company)} · ${esc(c.role)}</option>`).join('');
  sel.value = companyKey;
  sel.addEventListener('change', () => {
    companyKey = sel.value;
    const url = new URL(location.href);
    if (companyKey === 'default') url.searchParams.delete('for'); else url.searchParams.set('for', companyKey);
    history.replaceState(null, '', url);
    renderWeather(COMPANIES[companyKey]);
  });
  renderWeather(COMPANIES[companyKey]);

  const JD_EXAMPLES = {
    strong: "Founder's Office Associate at a climate startup. Own market sizing and scenario analysis for new bets, run cross-functional launches and go-to-market, build Excel/SQL models, manage stakeholders. ESG or sustainability exposure and comfort with AI tools a plus.",
    weak: "Senior Backend Engineer. 5+ years of experience building Java services and React front ends. People management of a team of 4. CFA or investment banking background preferred."
  };
  document.querySelectorAll('[data-ex]').forEach(b => b.addEventListener('click', () => { $('#jd').value = JD_EXAMPLES[b.dataset.ex]; runJd(); }));
  $('#jdBtn').addEventListener('click', runJd);

  function runJd() {
    const text = $('#jd').value.toLowerCase();
    if (!text.trim()) { $('#jd').focus(); return; }
    const pick = map => [...new Set(Object.keys(map).filter(k => text.includes(k)).map(k => map[k]))];
    const hits = pick(JD_SIGNALS.match), gaps = pick(JD_SIGNALS.gap);
    const ratio = hits.length / Math.max(hits.length + gaps.length * 1.5, 1);
    const temp = Math.round(48 + ratio * 46);
    const condition = temp >= 85 ? 'Sunny: strong fit' : temp >= 72 ? 'Partly cloudy: good fit' : temp >= 60 ? 'Overcast: partial fit' : 'Rain: probably not me';
    const base = COMPANIES[companyKey];
    renderWeather({
      company: 'this role', role: 'Pasted JD', city: 'your team', temp, condition, hi: Math.min(temp + 6, 99), lo: Math.max(temp - 14, 30),
      headline: temp >= 60
        ? `${hits.length} requirement${hits.length === 1 ? '' : 's'} with sunshine, ${gaps.length} with rain. Here's the honest breakdown.`
        : "Honestly, this role needs things I don't have yet. I'd point you to someone else.",
      days: temp >= 60 ? base.days : [{ d: 'Day 1', icon: 'rain', t: "Not forecast: this role is outside my range today. Ask me about adjacent roles instead.", hi: temp, lo: Math.max(temp - 14, 30) }],
      details: [
        ...hits.slice(0, 6).map(h => ['Sunshine', 'Match', h]),
        ...gaps.slice(0, 6).map(g => ['Chance of rain', 'Gap', g])
      ].concat(hits.length + gaps.length ? [] : [['Visibility', 'Low', 'No recognisable requirements found. Try a fuller JD.']])
    });
  }

  /* ---------- IMAGES, SCHOLAR, NEWS ---------- */
  $('#imgGrid').innerHTML = IMAGES.map(label => `<figure><div class="ph">Photo coming</div><figcaption>${esc(label)}</figcaption></figure>`).join('');
  $('#scholar').innerHTML = SCHOLAR.map(s => `<div class="sch"><h3>${s.href ? `<a href="${s.href}" target="_blank" rel="noopener">${esc(s.title)}</a>` : esc(s.title)}</h3><p>${esc(s.meta)}</p><div class="tools">${s.href ? 'Cite · Full text' : 'Thesis / proceedings'}</div></div>`).join('');
  $('#news').innerHTML = NEWS.map(n => `<div class="news-item"><div class="ph">Photo</div><div><small>${esc(n.src)} · ${esc(n.when)}</small><h3>${esc(n.title)}</h3></div></div>`).join('');

  /* ---------- EARTH ---------- */
  const Earth = {
    ready: false, idx: 0, layer: 'all', tour: null,
    init() {
      if (this.ready) { this.resize(); return; }
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
        document.querySelectorAll('.layer').forEach(x => x.setAttribute('aria-pressed', x === b));
        this.draw();
      });
      $('#vList').innerHTML = STOPS.map((s, i) => `<li><button data-i="${i}"><span class="n">${i + 1}</span><span>${esc(s.name)} · ${esc(s.title)}<small>${esc(s.when)}</small></span></button></li>`).join('');
      $('#vList').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { this.stopTour(); this.go(+b.dataset.i); } });
      $('#prevBtn').addEventListener('click', () => { this.stopTour(); this.go((this.idx + STOPS.length - 1) % STOPS.length); });
      $('#nextBtn').addEventListener('click', () => { this.stopTour(); this.go((this.idx + 1) % STOPS.length); });
      $('#tourBtn').addEventListener('click', () => this.tour ? this.stopTour() : this.startTour());
      window.addEventListener('resize', () => this.resize());

      this.resize();
      const s = STOPS[0].coords;
      this.projection.rotate([-s[0] + 40, -s[1] + 10]);
      this.go(0);
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
      document.querySelectorAll('#vList button').forEach((b, j) => b.setAttribute('aria-current', j === i));
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
