(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Header: blur/border once page scrolls
     ------------------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const setScrolled = () => header.setAttribute('data-scrolled', window.scrollY > 8 ? 'true' : 'false');
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Mobile nav drawer
     ------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    const open = () => { mobileNav.setAttribute('data-open', 'true'); navToggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const close = () => { mobileNav.setAttribute('data-open', 'false'); navToggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    navToggle.addEventListener('click', open);
    navClose?.addEventListener('click', close);
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal — IntersectionObserver, fires once, respects reduced motion
     ------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------------------
     Hero stat counters — count up once when in view
     ------------------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------------------------------------------------------------------
     Property explorer: filters + sort
     ------------------------------------------------------------------- */
  const grid = document.getElementById('propertyGrid');
  const cards = grid ? Array.from(grid.querySelectorAll('.property-card')) : [];
  const totalCards = cards.length;

  const state = { op: 'all', type: 'all', loc: 'all', priceMin: null, priceMax: null, sort: 'recent' };

  // Deep-link support: restore filter state from the URL hash (#op=renta&type=nave...)
  const restoreStateFromURL = () => {
    const params = new URLSearchParams(location.hash.replace(/^#/, ''));
    if (params.has('op')) state.op = params.get('op');
    if (params.has('type')) state.type = params.get('type');
    if (params.has('loc')) state.loc = params.get('loc');
    if (params.has('min')) state.priceMin = Number(params.get('min'));
    if (params.has('max')) state.priceMax = Number(params.get('max'));
    if (params.has('sort')) state.sort = params.get('sort');
  };
  restoreStateFromURL();

  const syncStateToURL = () => {
    const params = new URLSearchParams();
    if (state.op !== 'all') params.set('op', state.op);
    if (state.type !== 'all') params.set('type', state.type);
    if (state.loc !== 'all') params.set('loc', state.loc);
    if (state.priceMin !== null) params.set('min', String(state.priceMin));
    if (state.priceMax !== null) params.set('max', String(state.priceMax));
    if (state.sort !== 'recent') params.set('sort', state.sort);
    const query = params.toString();
    history.replaceState(null, '', query ? `#${query}` : location.pathname + location.search);
  };

  const chipGroups = document.querySelectorAll('[data-filter-group]');
  chipGroups.forEach((group) => {
    const key = group.getAttribute('data-filter-group');
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      group.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      state[key] = btn.getAttribute('data-value');
      applyFilters();
    });
  });

  const locSelect = document.getElementById('filterLoc');
  locSelect?.addEventListener('change', () => { state.loc = locSelect.value; applyFilters(); });

  const priceMinInput = document.getElementById('priceMin');
  const priceMaxInput = document.getElementById('priceMax');
  const sortSelect = document.getElementById('sortSelect');
  sortSelect?.addEventListener('change', () => { state.sort = sortSelect.value; applyFilters(); });

  const applyBtn = document.getElementById('applyFilters');
  applyBtn?.addEventListener('click', () => {
    state.priceMin = priceMinInput?.value ? Number(priceMinInput.value) : null;
    state.priceMax = priceMaxInput?.value ? Number(priceMaxInput.value) : null;
    applyFilters();
  });

  const clearBtn = document.getElementById('clearFilters');
  clearBtn?.addEventListener('click', () => {
    state.op = 'all'; state.type = 'all'; state.loc = 'all'; state.priceMin = null; state.priceMax = null; state.sort = 'recent';
    chipGroups.forEach((group) => {
      group.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', c.getAttribute('data-value') === 'all' ? 'true' : 'false'));
    });
    if (locSelect) locSelect.value = 'all';
    if (priceMinInput) priceMinInput.value = '';
    if (priceMaxInput) priceMaxInput.value = '';
    if (sortSelect) sortSelect.value = 'recent';
    applyFilters();
  });

  const resultsCountEl = document.getElementById('resultsCount');
  const filtersCountLabel = document.getElementById('filtersCountLabel');
  const emptyState = document.getElementById('emptyState');

  // Reflect any restored (deep-linked) state into the filter controls, then render once.
  if (grid) {
    chipGroups.forEach((group) => {
      const key = group.getAttribute('data-filter-group');
      group.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', c.getAttribute('data-value') === state[key] ? 'true' : 'false'));
    });
    if (locSelect) locSelect.value = state.loc;
    if (priceMinInput && state.priceMin !== null) priceMinInput.value = String(state.priceMin);
    if (priceMaxInput && state.priceMax !== null) priceMaxInput.value = String(state.priceMax);
    if (sortSelect) sortSelect.value = state.sort;
    applyFilters();
  }

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesOp = state.op === 'all' || card.dataset.op === state.op;
      const matchesType = state.type === 'all' || card.dataset.type === state.type;
      const matchesLoc = state.loc === 'all' || card.dataset.loc === state.loc;
      const price = Number(card.dataset.price);
      const matchesMin = state.priceMin === null || price >= state.priceMin;
      const matchesMax = state.priceMax === null || price <= state.priceMax;
      const visible = matchesOp && matchesType && matchesLoc && matchesMin && matchesMax;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;
    });

    const sorted = cards
      .filter((c) => !c.classList.contains('is-hidden'))
      .sort((a, b) => {
        if (state.sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
        if (state.sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        if (state.sort === 'size-desc') return Number(b.dataset.size) - Number(a.dataset.size);
        return 0;
      });
    sorted.forEach((card) => grid.appendChild(card));

    if (resultsCountEl) resultsCountEl.textContent = String(visibleCount);
    if (filtersCountLabel) filtersCountLabel.textContent = `Mostrando ${visibleCount} de ${totalCards} propiedades`;
    if (emptyState) emptyState.hidden = visibleCount !== 0;
    if (grid) grid.hidden = visibleCount === 0;
    syncStateToURL();
  }

  /* ---------------------------------------------------------------------
     Favorite toggle
     ------------------------------------------------------------------- */
  document.querySelectorAll('.card-fav').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
    });
  });

  /* ---------------------------------------------------------------------
     Newsletter — inline confirmation, no network call in this static build
     ------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    const btn = newsletterForm.querySelector('button');
    const status = document.getElementById('newsletterStatus');
    if (!input || !btn) return;
    const original = input.placeholder;
    input.value = '';
    input.placeholder = '¡Gracias por suscribirte!';
    if (status) status.textContent = 'Gracias por suscribirte. Te escribiremos pronto.';
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => { btn.style.transform = ''; }, 160);
    setTimeout(() => { input.placeholder = original; }, 3200);
  });
})();
