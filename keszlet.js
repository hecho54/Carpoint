'use strict';

// ── State ──────────────────────────────────────
const state = {
  q:       '',
  cat:     '',   // szem | suv | haszno | motor | ''
  fuel:    '',
  trans:   '',
  tipusok: [],   // checked types
  arMin:   0,
  arMax:   0,
  kmMax:   0,
  evMin:   0,
  evMax:   0,
  sort:    'ar_asc',
};

// ── Category → tipus mapping ───────────────────
const CAT_MAP = {
  szem:   c => ['Személyautó','Cabrio','Kombi','MPV'].includes(c.tipus),
  suv:    c => c.tipus === 'SUV',
  haszno: c => c.tipus === 'Haszongépjármű' || c.tipus === 'Egyéb',
  motor:  c => c.tipus === 'Motor',
};

// ── Category counts ────────────────────────────
function updateCatCounts() {
  const ids = { catNumAll: CARS.length };
  ids.catNumSzem  = CARS.filter(CAT_MAP.szem).length;
  ids.catNumSuv   = CARS.filter(CAT_MAP.suv).length;
  ids.catNumHaszno= CARS.filter(CAT_MAP.haszno).length;
  ids.catNumMotor = CARS.filter(CAT_MAP.motor).length;
  Object.entries(ids).forEach(([id, n]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = n;
  });
}

// ── Filter ─────────────────────────────────────
function applyFilters() {
  let res = CARS.filter(c => {
    const txt = `${c.marka} ${c.modell} ${c.valtozat}`.toLowerCase();
    if (state.q && !txt.includes(state.q)) return false;

    if (state.cat && CAT_MAP[state.cat] && !CAT_MAP[state.cat](c)) return false;

    if (state.fuel === 'Hibrid' && !c.hibrid) return false;
    if (state.fuel && state.fuel !== 'Hibrid' && c.uzemanyag !== state.fuel) return false;

    if (state.trans && c.valto !== state.trans) return false;

    if (state.tipusok.length && !state.tipusok.includes(c.tipus)) return false;

    if (state.arMin && c.ar < state.arMin) return false;
    if (state.arMax && c.ar > state.arMax) return false;

    if (state.kmMax && c.km > 0 && c.km > state.kmMax) return false;

    if (state.evMin && c.ev < state.evMin) return false;
    if (state.evMax && c.ev > state.evMax) return false;

    return true;
  });

  res = sortCars(res, state.sort);
  renderResults(res);
  updateActiveFilters();
}

// ── Render results ─────────────────────────────
function renderResults(cars) {
  const grid  = document.getElementById('kGrid');
  const empty = document.getElementById('kEmpty');
  const count = document.getElementById('kCount');

  count.textContent = cars.length + ' jármű';

  if (cars.length === 0) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  grid.innerHTML = cars.map(c => keszletCardHTML(c)).join('');
}

// ── Keszlet card (larger, with more detail) ────
function keszletCardHTML(c) {
  const color   = BRAND_COLOR[c.marka] || '#2A7A8C';
  const fuelLbl = c.hibrid ? 'Hibrid' : c.uzemanyag;
  const fuelCls = c.hibrid ? 'badge-hibrid' : (c.uzemanyag === 'Dízel' ? 'badge-dizel' : 'badge-benzin');
  const url     = hahuUrl(c);
  const img     = `img/${c.id}..jpg`;

  return `
<article class="kc">
  <div class="kc-head">
    <img src="${img}" alt="${c.marka} ${c.modell}" loading="lazy" />
    <div class="kc-head-overlay"></div>
    <div class="kc-head-top">
      <span class="kc-brand-tag" style="background:${color}">${c.marka}</span>
      ${c.hibrid ? `<span class="kc-hibrid-tag">♻ Hibrid</span>` : ''}
    </div>
    <div class="kc-year-tag">${c.ev}</div>
  </div>
  <div class="kc-body">
    <div class="kc-top">
      <div>
        <h3 class="kc-model">${c.modell}</h3>
        <p class="kc-var">${c.valtozat}</p>
      </div>
      <div class="kc-price">${fAr(c.ar)}</div>
    </div>

    <div class="kc-specs">
      <div class="kc-spec">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>${fKm(c.km)}</span>
      </div>
      <div class="kc-spec">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22V8l9-6 9 6v14M9 22v-7h6v7"/></svg>
        <span>${c.cm3 > 0 ? c.cm3.toLocaleString('hu-HU') + ' cm³' : '—'}</span>
      </div>
      ${c.le > 0 ? `<div class="kc-spec"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>${c.le} LE</span></div>` : ''}
    </div>

    <div class="kc-badges">
      <span class="cc-badge ${fuelCls}">${fuelLbl}</span>
      <span class="cc-badge badge-valto">${c.valto}</span>
      ${c.tipus !== 'Személyautó' ? `<span class="cc-badge badge-tipus">${c.tipus}</span>` : ''}
    </div>

    <div class="kc-actions">
      <a href="${url}" target="_blank" rel="noopener" class="kc-btn-primary">
        Érdekel
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="tel:+36306684406" class="kc-btn-secondary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        Hívás
      </a>
    </div>
  </div>
</article>`;
}

// ── Active filter tags ─────────────────────────
function updateActiveFilters() {
  const wrap = document.getElementById('activeFilters');
  if (!wrap) return;
  const tags = [];
  if (state.q)     tags.push({ label: `"${state.q}"`,           clear: () => { state.q = ''; document.getElementById('kSearch').value = ''; } });
  if (state.fuel)  tags.push({ label: state.fuel,               clear: () => { state.fuel = ''; setPills('fuelPills', ''); } });
  if (state.trans) tags.push({ label: state.trans,              clear: () => { state.trans = ''; setPills('transPills', ''); } });
  if (state.arMin) tags.push({ label: `Min: ${fAr(state.arMin)}`, clear: () => { state.arMin = 0; document.getElementById('kArMin').value = ''; } });
  if (state.arMax) tags.push({ label: `Max: ${fAr(state.arMax)}`, clear: () => { state.arMax = 0; document.getElementById('kArMax').value = ''; } });
  if (state.kmMax) tags.push({ label: `Max ${fKm(state.kmMax)}`, clear: () => { state.kmMax = 0; document.getElementById('kKmMax').value = ''; } });
  state.tipusok.forEach(t => tags.push({ label: t, clear: () => {
    state.tipusok = state.tipusok.filter(x => x !== t);
    document.querySelector(`.sb-check input[value="${t}"]`).checked = false;
  }}));

  wrap.innerHTML = tags.map((t,i) => `
    <span class="af-tag" data-idx="${i}">
      ${t.label}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </span>`).join('');

  wrap.querySelectorAll('.af-tag').forEach(el => {
    el.addEventListener('click', () => {
      tags[+el.dataset.idx].clear();
      applyFilters();
    });
  });
}

// ── Pill helper ────────────────────────────────
function setPills(groupId, val) {
  document.querySelectorAll(`#${groupId} .sb-pill`).forEach(p => {
    p.classList.toggle('active', p.dataset.val === val);
  });
}

// ── Full reset ─────────────────────────────────
function fullReset() {
  Object.assign(state, { q:'', cat:'', fuel:'', trans:'', tipusok:[], arMin:0, arMax:0, kmMax:0, evMin:0, evMax:0, sort:'ar_asc' });
  document.getElementById('kSearch').value = '';
  document.getElementById('kArMin').value  = '';
  document.getElementById('kArMax').value  = '';
  document.getElementById('kKmMax').value  = '';
  document.getElementById('kEvMin').value  = '';
  document.getElementById('kEvMax').value  = '';
  document.getElementById('kSort').value   = 'ar_asc';
  document.querySelectorAll('.sb-check input').forEach(cb => cb.checked = false);
  setPills('fuelPills', '');
  setPills('transPills', '');
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === ''));
  document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
  applyFilters();
}

// ── Brand grid ─────────────────────────────────
function initBrandGrid(input) {
  const brands = [...new Set(CARS.map(c => c.marka))].sort();
  const grid = document.getElementById('brandGrid');
  if (!grid) return;

  let activeBrand = '';

  function renderGrid(filter) {
    const list = filter
      ? brands.filter(b => b.toLowerCase().includes(filter.toLowerCase()))
      : brands;
    grid.innerHTML = list.map(b => {
      const color = BRAND_COLOR[b] || '#2A7A8C';
      const active = b === activeBrand ? 'active' : '';
      return `<button class="brand-chip ${active}" data-brand="${b}" style="--bc:${color}">${b}</button>`;
    }).join('');
    grid.querySelectorAll('.brand-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        if (activeBrand === btn.dataset.brand) {
          activeBrand = '';
          input.value = '';
          state.q = '';
        } else {
          activeBrand = btn.dataset.brand;
          input.value = btn.dataset.brand;
          state.q = btn.dataset.brand.toLowerCase();
        }
        renderGrid(input.value === activeBrand ? '' : input.value);
        applyFilters();
      });
    });
  }

  renderGrid('');

  input.addEventListener('input', e => {
    activeBrand = '';
    state.q = e.target.value.toLowerCase().trim();
    renderGrid(e.target.value.trim());
    applyFilters();
  });
}

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCatCounts();
  applyFilters();

  initBrandGrid(document.getElementById('kSearch'));

  // Category tabs
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.cat = btn.dataset.cat;
      state.tipusok = [];
      document.querySelectorAll('.sb-check input').forEach(cb => cb.checked = false);
      applyFilters();
    });
  });

  // Fuel pills
  document.querySelectorAll('#fuelPills .sb-pill').forEach(p => {
    p.addEventListener('click', () => {
      state.fuel = p.dataset.val;
      setPills('fuelPills', state.fuel);
      applyFilters();
    });
  });

  // Trans pills
  document.querySelectorAll('#transPills .sb-pill').forEach(p => {
    p.addEventListener('click', () => {
      state.trans = p.dataset.val;
      setPills('transPills', state.trans);
      applyFilters();
    });
  });

  // Karosszéria checkboxes
  document.querySelectorAll('.sb-check input').forEach(cb => {
    cb.addEventListener('change', () => {
      state.tipusok = [...document.querySelectorAll('.sb-check input:checked')].map(x => x.value);
      applyFilters();
    });
  });

  // Range inputs — apply on button click or Enter
  const applyRange = () => {
    state.arMin = parseInt(document.getElementById('kArMin').value) || 0;
    state.arMax = parseInt(document.getElementById('kArMax').value) || 0;
    state.kmMax = parseInt(document.getElementById('kKmMax').value) || 0;
    state.evMin = parseInt(document.getElementById('kEvMin').value) || 0;
    state.evMax = parseInt(document.getElementById('kEvMax').value) || 0;
    applyFilters();
  };
  document.getElementById('sbApply').addEventListener('click', applyRange);
  ['kArMin','kArMax','kKmMax','kEvMin','kEvMax'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') applyRange(); });
  });

  // Sort
  document.getElementById('kSort').addEventListener('change', e => {
    state.sort = e.target.value;
    applyFilters();
  });

  // Reset buttons
  document.getElementById('sbReset').addEventListener('click', fullReset);
  document.getElementById('kEmptyReset').addEventListener('click', fullReset);
});
