// Atlas of Nations — every page the site shows, built from data.js.
// Charts are plain canvas drawn by drawLineChart / drawBarChart below; no library.

import { COUNTRIES, INDICATORS, REGIONS, WORLD, YEARS, countryByCode, formatPlain, formatValue, indicatorByKey, rankOf } from './data.js';

export const CHART_COLORS = ['#0e7c7b', '#c77d0a', '#16324f', '#b3372f', '#5b7fa6', '#7a9e3f'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function countryLink(c) {
  return `<a href="#/country/${c.code}">${esc(c.name)}</a>`;
}

function sourceLine() {
  return `<p class="source-line">Sources: World Bank, World Development Indicators; United Nations, World Population Prospects. ` +
    `Latest available year per indicator (2022–2024); figures rounded. Literacy for Russia is reported as 99.7% and shown as 100. ` +
    `Estimates are the publishing agencies' own. <a href="#/about">How these figures are made →</a></p>`;
}

function statCard(ind, value, rankText) {
  return `<div class="stat"><div class="label">${esc(ind.name)}</div>` +
    `<div class="value">${esc(formatValue(ind.key, value))} <small>${esc(ind.unit)}</small></div>` +
    `<div class="sub">${esc(ind.blurb)}</div>${rankText ? `<span class="rank">${rankText}</span>` : ''}</div>`;
}

/* ---------- canvas charts ---------- */

function setupCanvas(canvas, heightCss) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(heightCss * dpr);
  canvas.style.height = `${heightCss}px`;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width, height: heightCss };
}

export function drawLineChart(canvas, series, opts) {
  const { ctx, width, height } = setupCanvas(canvas, opts.height || 260);
  const padL = 52, padR = 14, padT = 14, padB = 28;
  const all = series.flatMap((s) => s.values);
  let min = Math.min(...all), max = Math.max(...all);
  if (max === min) { max += 1; min -= 1; }
  const span = max - min;
  min -= span * 0.08; max += span * 0.08;
  const x = (i) => padL + (i / (YEARS.length - 1)) * (width - padL - padR);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * (height - padT - padB);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#68788c';
  ctx.strokeStyle = '#e3e8ee';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const v = min + ((max - min) * g) / 4;
    ctx.beginPath(); ctx.moveTo(padL, y(v)); ctx.lineTo(width - padR, y(v)); ctx.stroke();
    ctx.fillText(formatAxis(v), 4, y(v) + 4);
  }
  ctx.fillStyle = '#68788c';
  YEARS.forEach((yr, i) => { if (i % 2 === 0) ctx.fillText(String(yr), x(i) - 12, height - 8); });
  series.forEach((s) => {
    ctx.strokeStyle = s.color; ctx.lineWidth = 2.5; ctx.beginPath();
    s.values.forEach((v, i) => { if (i === 0) ctx.moveTo(x(i), y(v)); else ctx.lineTo(x(i), y(v)); });
    ctx.stroke();
    ctx.fillStyle = s.color;
    s.values.forEach((v, i) => { ctx.beginPath(); ctx.arc(x(i), y(v), 3, 0, Math.PI * 2); ctx.fill(); });
  });
  function formatAxis(v) {
    if (opts.axis === 'money') return `$${Math.round(v / 1000)}k`;
    if (v >= 1000) return `${Math.round(v / 100) / 10}k`;
    return String(Math.round(v * 10) / 10);
  }
}

export function drawBarChart(canvas, items, opts) {
  const rowH = 34, height = items.length * rowH + 30;
  const { ctx, width } = setupCanvas(canvas, height);
  const padL = 132, padR = 64, padT = 6;
  const max = Math.max(...items.map((i) => i.value));
  ctx.font = '13px sans-serif';
  items.forEach((item, i) => {
    const top = padT + i * rowH;
    ctx.fillStyle = '#14202e';
    ctx.textAlign = 'right';
    ctx.fillText(item.label, padL - 8, top + 17);
    ctx.textAlign = 'left';
    const barW = Math.max(4, ((width - padL - padR) * item.value) / max);
    ctx.fillStyle = item.color || '#0e7c7b';
    ctx.beginPath();
    ctx.roundRect(padL, top + 5, barW, 16, 4);
    ctx.fill();
    ctx.fillStyle = '#3d4c5e';
    ctx.fillText(item.display, padL + barW + 8, top + 17);
  });
}

/* ---------- overview ---------- */

export function overview() {
  const popTop = [...COUNTRIES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  const lifeTop = [...COUNTRIES].sort((a, b) => b.life - a.life).slice(0, 5);
  const gdpTop = [...COUNTRIES].sort((a, b) => b.gdp - a.gdp).slice(0, 5);
  const regionRows = REGIONS.map((r) => {
    const cs = COUNTRIES.filter((c) => c.region === r);
    if (!cs.length) return '';
    const pop = cs.reduce((s, c) => s + c.pop, 0);
    const life = (cs.reduce((s, c) => s + c.life, 0) / cs.length).toFixed(1);
    const gdp = Math.round(cs.reduce((s, c) => s + c.gdp, 0) / cs.length).toLocaleString('en-US');
    return `<tr><td>${esc(r)}</td><td class="num">${cs.length}</td><td class="num">${pop.toLocaleString('en-US')}m</td><td class="num">${life} yrs</td><td class="num">$${gdp}</td></tr>`;
  }).join('');
  return `<p class="kicker">World statistics · 32 countries · 8 indicators · 2015–2024</p>
<h1>Every country, measured.<br>Every number, sourced.</h1>
<p class="lede">Population, prosperity, health, work, learning, emissions, connectivity and family size —
for 32 countries covering 6.7 billion people. Pick a country, rank them all, or put four side by side.</p>
<div class="grid grid-4">
  <div class="stat"><div class="label">World population</div><div class="value">${WORLD.pop.toLocaleString('en-US')}<small> million</small></div><div class="sub">United Nations, 2024 — 8.2 billion people</div></div>
  <div class="stat"><div class="label">Countries covered</div><div class="value">32</div><div class="sub">Across 6 world regions, 82% of humanity</div></div>
  <div class="stat"><div class="label">World life expectancy</div><div class="value">${WORLD.life}<small> years</small></div><div class="sub">UN, 2023 — back to its pre-pandemic level</div></div>
  <div class="stat"><div class="label">Median GDP per capita</div><div class="value">$${WORLD.gdpMedian.toLocaleString('en-US')}</div><div class="sub">PPP, across the 32 countries, 2023</div></div>
</div>
<div class="card chart-card" style="margin-top:16px">
  <h3 id="chart-title">Largest populations, 2024</h3>
  <p class="note">Choose an indicator — the chart re-ranks instantly. Values are the latest available year.</p>
  <div class="controls">
    <label>Indicator
      <select id="overview-indicator">${INDICATORS.map((i) => `<option value="${i.key}"${i.key === 'pop' ? ' selected' : ''}>${esc(i.name)} (${i.year})</option>`).join('')}</select>
    </label>
    <label>Show
      <select id="overview-count"><option value="10" selected>Top 10</option><option value="5">Top 5</option><option value="15">Top 15</option></select>
    </label>
  </div>
  <canvas id="overview-chart" class="chart" role="img" aria-label="Bar chart of the selected indicator"></canvas>
</div>
<div class="grid grid-3" style="margin-top:16px">
  <div class="card"><h3>Largest populations</h3>
    <table><thead><tr><th>#</th><th>Country</th><th>People</th></tr></thead><tbody>
    ${popTop.map((c, i) => `<tr><td class="num">${i + 1}</td><td>${countryLink(c)}</td><td class="num">${c.pop.toLocaleString('en-US')}m</td></tr>`).join('')}
    </tbody></table><p class="note"><a href="#/rankings?ind=pop">Full population ranking →</a></p></div>
  <div class="card"><h3>Longest lives</h3>
    <table><thead><tr><th>#</th><th>Country</th><th>Years</th></tr></thead><tbody>
    ${lifeTop.map((c, i) => `<tr><td class="num">${i + 1}</td><td>${countryLink(c)}</td><td class="num">${c.life.toFixed(1)}</td></tr>`).join('')}
    </tbody></table><p class="note"><a href="#/rankings?ind=life">Full life-expectancy ranking →</a></p></div>
  <div class="card"><h3>Richest per person</h3>
    <table><thead><tr><th>#</th><th>Country</th><th>GDP / person</th></tr></thead><tbody>
    ${gdpTop.map((c, i) => `<tr><td class="num">${i + 1}</td><td>${countryLink(c)}</td><td class="num">$${c.gdp.toLocaleString('en-US')}</td></tr>`).join('')}
    </tbody></table><p class="note"><a href="#/rankings?ind=gdp">Full GDP ranking →</a></p></div>
</div>
<h2>Regions at a glance</h2>
<div class="table-scroll"><table>
<thead><tr><th>Region</th><th>Countries here</th><th>People</th><th>Avg. life expectancy</th><th>Avg. GDP / person (PPP)</th></tr></thead>
<tbody>${regionRows}</tbody></table></div>
<p class="note">Averages are simple means across the countries listed for each region, not population-weighted.</p>
<div class="pill-row">
  <a class="pill" href="#/country/IDN">Indonesia →</a>
  <a class="pill" href="#/country/IND">India →</a>
  <a class="pill" href="#/country/USA">United States →</a>
  <a class="pill" href="#/country/JPN">Japan →</a>
  <a class="pill" href="#/compare">Compare four countries →</a>
</div>
${sourceLine()}`;
}

/* ---------- country detail ---------- */

export function countryDetail(code) {
  const c = countryByCode(code);
  if (!c) return missing(`There is no country with code “${code}” in this atlas.`);
  const peers = COUNTRIES.filter((o) => o.region === c.region && o.code !== c.code).slice(0, 5);
  const cards = INDICATORS.map((ind) => {
    const rank = rankOf(c.code, ind.key);
    const betterHigh = ind.higherIsBetter;
    const rankText = betterHigh === null ? `#${rank} of 32` : (betterHigh ? `#${rank} of 32 · higher is better` : `#${rank} of 32 · lower is better`);
    return statCard(ind, c[ind.key], rankText);
  }).join('');
  const vsRows = INDICATORS.map((ind) => {
    const avg = COUNTRIES.reduce((s, o) => s + o[ind.key], 0) / COUNTRIES.length;
    const diff = ((c[ind.key] - avg) / avg) * 100;
    const sign = diff >= 0 ? '+' : '';
    return `<tr><td>${esc(ind.name)}</td><td class="num">${esc(formatValue(ind.key, c[ind.key]))}</td><td class="num">${esc(formatValue(ind.key, Math.round(avg * 10) / 10))}</td><td class="num">${sign}${diff.toFixed(0)}%</td></tr>`;
  }).join('');
  const change = (series) => {
    const first = series[0], last = series[series.length - 1];
    const pct = ((last - first) / first) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}% since 2015`;
  };
  return `<p class="breadcrumb"><a href="#/">Overview</a> › ${esc(c.region)}</p>
<p class="kicker">${esc(c.region)} · ${esc(c.code)}</p>
<h1>${esc(c.name)} in numbers</h1>
<p class="lede">All eight headline indicators for ${esc(c.name)}, ranked against the other 31 countries in this atlas, with ten-year trends.</p>
<div class="grid grid-4">${cards}</div>
<div class="grid grid-2" style="margin-top:16px">
  <div class="card chart-card"><h3>Population, 2015–2024</h3><p class="note">${change(c.trends.pop)} · millions of people</p><canvas id="chart-pop" class="chart" role="img" aria-label="Population trend chart"></canvas></div>
  <div class="card chart-card"><h3>GDP per capita (PPP), 2015–2024</h3><p class="note">${change(c.trends.gdp)} · international dollars; the 2020 dip is the pandemic recession</p><canvas id="chart-gdp" class="chart" role="img" aria-label="GDP per capita trend chart"></canvas></div>
</div>
<div class="card chart-card" style="margin-top:16px"><h3>Life expectancy, 2015–2024</h3><p class="note">${change(c.trends.life)} · years; the 2020–21 dip in many countries is excess pandemic mortality</p><canvas id="chart-life" class="chart" role="img" aria-label="Life expectancy trend chart"></canvas></div>
<h2>${esc(c.name)} against the 32-country average</h2>
<div class="table-scroll"><table>
<thead><tr><th>Indicator</th><th>${esc(c.name)}</th><th>Average of 32</th><th>Difference</th></tr></thead>
<tbody>${vsRows}</tbody></table></div>
<h2>More from ${esc(c.region)}</h2>
<p>${peers.map((p) => `<a class="pill" href="#/country/${p.code}">${esc(p.name)} →</a>`).join(' ')}</p>
<p><a class="btn ghost" href="#/compare?c=${c.code}">Compare ${esc(c.name)} with others →</a></p>
${sourceLine()}`;
}

/* ---------- rankings ---------- */

export function rankings(query) {
  const params = new URLSearchParams(query || '');
  const indKey = INDICATORS.some((i) => i.key === params.get('ind')) ? params.get('ind') : 'gdp';
  const region = params.get('region') || 'all';
  return `<p class="kicker">Rankings · all 32 countries</p>
<h1>Rankings</h1>
<p class="lede">Every country on every indicator. Sort by any column, filter by region, or search by name. Ranks are out of the 32 countries in this atlas.</p>
<div class="controls">
  <label>Indicator
    <select id="rank-indicator">${INDICATORS.map((i) => `<option value="${i.key}"${i.key === indKey ? ' selected' : ''}>${esc(i.name)} (${i.year})</option>`).join('')}</select>
  </label>
  <label>Region
    <select id="rank-region"><option value="all">All regions</option>${REGIONS.map((r) => `<option value="${esc(r)}"${r === region ? ' selected' : ''}>${esc(r)}</option>`).join('')}</select>
  </label>
  <label>Search
    <input type="search" id="rank-search" placeholder="Type a country name…" value="${esc(params.get('q') || '')}">
  </label>
</div>
<div class="table-scroll"><table id="rank-table">
<thead><tr>
  <th><button data-sort="rank">#</button></th>
  <th><button data-sort="name">Country</button></th>
  <th><button data-sort="region">Region</button></th>
  ${INDICATORS.map((i) => `<th><button data-sort="${i.key}">${esc(i.name)}</button></th>`).join('')}
</tr></thead>
<tbody id="rank-body"></tbody></table></div>
<p class="note" id="rank-count"></p>
${sourceLine()}`;
}

export function rankingRows(indKey, region, queryText, sortKey, sortDir) {
  let list = COUNTRIES.filter((c) => (region === 'all' || c.region === region) &&
    (!queryText || c.name.toLowerCase().includes(queryText.toLowerCase())));
  const dir = sortDir === 'asc' ? 1 : -1;
  const keyFn = (c) => (sortKey === 'name' ? c.name : sortKey === 'region' ? c.region : c[sortKey] ?? c[indKey]);
  if (sortKey === 'rank') {
    // "Rank" sorts by the chosen indicator, best first when descending.
    list = [...list].sort((a, b) => (b[indKey] - a[indKey]) * -dir);
  } else {
    list = [...list].sort((a, b) => {
      const va = keyFn(a), vb = keyFn(b);
      if (typeof va === 'string') return va.localeCompare(vb) * dir;
      return (va - vb) * dir;
    });
  }
  const max = Math.max(...COUNTRIES.map((c) => c[indKey]));
  return {
    count: list.length,
    html: list.map((c) => {
      const rank = rankOf(c.code, indKey);
      const cells = INDICATORS.map((i) => `<td class="num">${i.key === indKey ? `<span class="bar" style="width:${Math.max(3, (c[i.key] / max) * 46)}px"></span>` : ''}${esc(formatPlain(i.key, c[i.key]))}</td>`).join('');
      return `<tr><td class="num">${rank}</td><td>${countryLink(c)}</td><td>${esc(c.region)}</td>${cells}</tr>`;
    }).join('') || `<tr><td colspan="11" class="empty">No countries match that filter.</td></tr>`,
  };
}

/* ---------- compare ---------- */

export function compare(query) {
  const params = new URLSearchParams(query || '');
  const picked = (params.get('c') || 'IDN,IND,USA,JPN').split(',').filter((code) => countryByCode(code)).slice(0, 4);
  const indKey = INDICATORS.some((i) => i.key === params.get('ind')) ? params.get('ind') : 'gdp';
  return `<p class="kicker">Compare · up to four countries</p>
<h1>Compare countries</h1>
<p class="lede">Tick up to four countries and see every indicator side by side, with the best value in each row highlighted, plus a ten-year trend chart for the indicator you choose.</p>
<div class="card">
  <div class="pick-count" id="pick-count">${picked.length} of 4 selected</div>
  <div class="pick-list" id="pick-list">
    ${COUNTRIES.map((c) => `<label><input type="checkbox" value="${c.code}"${picked.includes(c.code) ? ' checked' : ''}> ${esc(c.name)}</label>`).join('')}
  </div>
</div>
<div class="controls">
  <label>Trend indicator
    <select id="compare-indicator">${INDICATORS.filter((i) => ['pop', 'gdp', 'life'].includes(i.key)).map((i) => `<option value="${i.key}"${i.key === indKey ? ' selected' : ''}>${esc(i.name)}</option>`).join('')}</select>
  </label>
  <a class="btn ghost" href="#/compare">Reset</a>
</div>
<div id="compare-output"></div>
${sourceLine()}`;
}

export function compareOutput(codes, indKey) {
  const picked = codes.map(countryByCode).filter(Boolean);
  if (!picked.length) return `<p class="empty">Tick at least one country above to compare.</p>`;
  const rows = INDICATORS.map((ind) => {
    const vals = picked.map((c) => c[ind.key]);
    const best = ind.higherIsBetter === false ? Math.min(...vals) : (ind.higherIsBetter === true ? Math.max(...vals) : null);
    const cells = picked.map((c) => {
      const isBest = best !== null && c[ind.key] === best;
      return `<td class="num${isBest ? ' winner' : ''}">${esc(formatValue(ind.key, c[ind.key]))}${isBest ? ' ★' : ''}</td>`;
    }).join('');
    return `<tr><td>${esc(ind.name)} <span class="note">(${ind.year})</span></td>${cells}</tr>`;
  }).join('');
  const series = picked.map((c, i) => ({ label: c.name, color: CHART_COLORS[i % CHART_COLORS.length], values: c.trends[indKey] }));
  const legend = series.map((s) => `<span><span class="swatch" style="background:${s.color}"></span>${esc(s.label)}</span>`).join('');
  return `<div class="table-scroll"><table>
<thead><tr><th>Indicator</th>${picked.map((c) => `<th>${countryLink(c)}</th>`).join('')}</tr></thead>
<tbody>${rows}</tbody></table></div>
<p class="note">★ marks the best value in the row (highest where higher is better, lowest for unemployment and CO2; population and fertility have no “best”).</p>
<div class="card chart-card" style="margin-top:16px"><h3>${esc(indicatorByKey(indKey).name)}, 2015–2024</h3>
<p class="note">Ten-year trend for each selected country.</p>
<canvas id="compare-chart" class="chart" role="img" aria-label="Comparison trend chart"></canvas>
<div class="legend">${legend}</div></div>`;
}

/* ---------- about ---------- */

export function about() {
  return `<p class="kicker">Sources &amp; methods</p>
<h1>Where the numbers come from</h1>
<p class="lede">Every figure on this site is a published statistic, not an estimate of ours. Here is exactly what each one is, and what its limits are.</p>
<div class="card">
<h3>Sources</h3>
<ul>
<li><strong>World Bank, World Development Indicators</strong> — GDP per capita (PPP), unemployment, adult literacy, CO2 per capita, internet users, fertility. The Bank compiles these from national statistical offices.</li>
<li><strong>United Nations, World Population Prospects 2024</strong> — population and life expectancy.</li>
<li><strong>Latest available year</strong> — population 2024; GDP, life expectancy, literacy, internet use and fertility 2023; unemployment 2024; CO2 2022. Each indicator card and table shows its year.</li>
</ul>
<h3>What “rounded” means</h3>
<p>Populations are rounded to the nearest million, GDP per capita to the nearest $100, life expectancy to one decimal place. Rounding is why two countries can show the same value while their ranks differ.</p>
<h3>Limits to keep in mind</h3>
<ul>
<li>Unemployment is the ILO modelled estimate; countries count informal work differently, so small gaps between countries may not be real.</li>
<li>Literacy is self-reported in many countries and measured years apart; treat it as approximate.</li>
<li>CO2 counts fossil-fuel and cement emissions only, not land-use change.</li>
<li>Ranks are out of the 32 countries in this atlas, not out of all 190+ countries in the world.</li>
</ul>
<h3>How to use this site</h3>
<p>Start on the <a href="#/">Overview</a> for the world picture, open <a href="#/rankings">Rankings</a> to sort every country on any indicator, pick a country for its full profile and ten-year trends, or use <a href="#/compare">Compare</a> to put up to four countries side by side. Everything works offline — the data ships with the site and no request ever leaves your browser.</p>
</div>
${sourceLine()}`;
}

export function missing(message) {
  return `<h1>Not found</h1><p>${esc(message || 'There is nothing at this address.')}</p><p><a href="#/">Back to the overview →</a></p>`;
}
