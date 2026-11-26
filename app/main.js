// Atlas of Nations — routing and wiring. Hash routes, one page per view:
//
//   #/                     overview dashboard
//   #/country/<CODE>       one country's profile and trends
//   #/rankings[?ind=&region=&q=]  sortable table of all countries
//   #/compare[?c=A,B&ind=] side-by-side comparison of up to four countries
//   #/about                sources and methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { COUNTRIES, INDICATORS, countryByCode, formatValue } from './data.js';
import { about, compare, compareOutput, countryDetail, drawBarChart, drawLineChart, missing, overview, rankingRows, rankings } from './views.js';
import { CHART_COLORS } from './views.js';

const app = document.getElementById('app');
const jump = document.getElementById('country-jump');

jump.innerHTML = `<option value="">Choose a country…</option>` +
  [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `<option value="${c.code}">${c.name}</option>`).join('');
jump.addEventListener('change', () => {
  if (jump.value) { location.hash = `#/country/${jump.value}`; jump.value = ''; }
});

function setActiveNav(route) {
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === route);
  });
}

function overviewChart() {
  const indSel = document.getElementById('overview-indicator');
  const countSel = document.getElementById('overview-count');
  const title = document.getElementById('chart-title');
  const canvas = document.getElementById('overview-chart');
  if (!indSel || !canvas) return;
  const redraw = () => {
    const ind = INDICATORS.find((i) => i.key === indSel.value);
    const n = Number(countSel.value);
    const top = [...COUNTRIES].sort((a, b) => b[ind.key] - a[ind.key]).slice(0, n);
    title.textContent = `${ind.name === 'Population' ? 'Largest populations' : ind.higherIsBetter === false ? 'Highest ' + ind.name.toLowerCase() : 'Highest ' + ind.name.toLowerCase()}, ${ind.year}`;
    drawBarChart(canvas, top.map((c, i) => ({
      label: c.name, value: c[ind.key], color: i === 0 ? '#c77d0a' : '#0e7c7b',
      display: formatValue(ind.key, c[ind.key]),
    })), {});
  };
  indSel.addEventListener('change', redraw);
  countSel.addEventListener('change', redraw);
  redraw();
}

function countryCharts(code) {
  const c = countryByCode(code);
  if (!c) return;
  const pop = document.getElementById('chart-pop');
  const gdp = document.getElementById('chart-gdp');
  const life = document.getElementById('chart-life');
  if (pop) drawLineChart(pop, [{ label: c.name, color: '#0e7c7b', values: c.trends.pop }], {});
  if (gdp) drawLineChart(gdp, [{ label: c.name, color: '#c77d0a', values: c.trends.gdp }], { axis: 'money' });
  if (life) drawLineChart(life, [{ label: c.name, color: '#16324f', values: c.trends.life }], {});
}

function rankingsPage() {
  const indSel = document.getElementById('rank-indicator');
  const regionSel = document.getElementById('rank-region');
  const search = document.getElementById('rank-search');
  const body = document.getElementById('rank-body');
  const count = document.getElementById('rank-count');
  if (!indSel || !body) return;
  let sortKey = 'rank';
  let sortDir = 'desc';
  const redraw = () => {
    const res = rankingRows(indSel.value, regionSel.value, search.value, sortKey, sortDir);
    body.innerHTML = res.html;
    count.textContent = `${res.count} of 32 countries shown · sorted by ${sortKey === 'rank' ? 'rank' : sortKey} ${sortDir === 'desc' ? '↓' : '↑'} · indicator year ${INDICATORS.find((i) => i.key === indSel.value).year}`;
  };
  document.querySelectorAll('#rank-table th button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (key === sortKey) sortDir = sortDir === 'desc' ? 'asc' : 'desc';
      else { sortKey = key; sortDir = key === 'name' || key === 'region' ? 'asc' : 'desc'; }
      redraw();
    });
  });
  indSel.addEventListener('change', () => { sortKey = 'rank'; sortDir = 'desc'; redraw(); });
  regionSel.addEventListener('change', redraw);
  search.addEventListener('input', redraw);
  redraw();
}

function comparePage() {
  const list = document.getElementById('pick-list');
  const countEl = document.getElementById('pick-count');
  const indSel = document.getElementById('compare-indicator');
  const out = document.getElementById('compare-output');
  if (!list || !out) return;
  const selected = () => [...list.querySelectorAll('input:checked')].map((i) => i.value);
  const redraw = () => {
    const codes = selected();
    countEl.textContent = `${codes.length} of 4 selected`;
    out.innerHTML = compareOutput(codes, indSel.value);
    const canvas = document.getElementById('compare-chart');
    if (canvas && codes.length) {
      const series = codes.map((code, i) => {
        const c = countryByCode(code);
        return { label: c.name, color: CHART_COLORS[i % CHART_COLORS.length], values: c.trends[indSel.value] };
      });
      drawLineChart(canvas, series, { axis: indSel.value === 'gdp' ? 'money' : undefined, height: 280 });
    }
  };
  list.querySelectorAll('input').forEach((box) => {
    box.addEventListener('change', () => {
      if (selected().length > 4) { box.checked = false; return; }
      redraw();
    });
  });
  indSel.addEventListener('change', redraw);
  redraw();
}

function render() {
  window.__shotReady = false;
  const raw = location.hash.replace(/^#/, '');
  const [path, query] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  let route = 'overview';
  if (parts[0] === 'country' && parts[1]) {
    route = 'country';
    document.title = `${(countryByCode(parts[1]) || {}).name || 'Not found'} | Atlas of Nations`;
    app.innerHTML = countryDetail(parts[1]);
    countryCharts(parts[1]);
  } else if (parts[0] === 'rankings') {
    route = 'rankings';
    document.title = 'Rankings | Atlas of Nations';
    app.innerHTML = rankings(query || '');
    rankingsPage();
  } else if (parts[0] === 'compare') {
    route = 'compare';
    document.title = 'Compare countries | Atlas of Nations';
    app.innerHTML = compare(query || '');
    comparePage();
  } else if (parts[0] === 'about') {
    route = 'about';
    document.title = 'Sources & methods | Atlas of Nations';
    app.innerHTML = about();
  } else if (parts.length) {
    document.title = 'Not found | Atlas of Nations';
    app.innerHTML = missing();
  } else {
    document.title = 'Atlas of Nations — National Statistics Explorer';
    app.innerHTML = overview();
    overviewChart();
  }
  setActiveNav(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
window.addEventListener('resize', () => {
  // Redraw the charts at the new width so they never smear after a resize.
  if (location.hash.startsWith('#/country/')) countryCharts(location.hash.split('/')[2]);
  else if (!location.hash || location.hash === '#/') overviewChart();
  else if (location.hash.startsWith('#/compare')) comparePage();
});
render();
