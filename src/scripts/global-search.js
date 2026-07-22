import Fuse from 'fuse.js';

function initGlobalSearch(root) {
  if (!(root instanceof HTMLElement) || root.dataset.bound === 'true') return;
  root.dataset.bound = 'true';

  const dataEl = root.querySelector('[data-search-index]');
  if (!(dataEl instanceof HTMLScriptElement) || !dataEl.textContent) return;

  let tools = [];
  try {
    tools = JSON.parse(dataEl.textContent);
  } catch {
    return;
  }

  const form = root.querySelector('[data-search-form]');
  const input = root.querySelector('[data-search-input]');
  const clearBtn = root.querySelector('[data-search-clear]');
  const results = root.querySelector('[data-global-results]');
  const grid = root.querySelector('[data-global-grid]');
  const countEl = root.querySelector('[data-global-count]');
  const emptyEl = root.querySelector('[data-global-empty]');
  const clearResultsBtn = root.querySelector('[data-global-clear]');
  const emptyResetBtn = root.querySelector('[data-global-reset]');
  const browseSections = document.querySelector('[data-home-browse]');
  const collectionCards = document.querySelector('[data-home-collections]');

  if (
    !(form instanceof HTMLFormElement) ||
    !(input instanceof HTMLInputElement) ||
    !(results instanceof HTMLElement) ||
    !(grid instanceof HTMLElement) ||
    !(countEl instanceof HTMLElement) ||
    !(emptyEl instanceof HTMLElement)
  ) {
    return;
  }

  const fuse = new Fuse(tools, {
    keys: [
      { name: 'title', weight: 0.45 },
      { name: 'description', weight: 0.2 },
      { name: 'category', weight: 0.15 },
      { name: 'alternativeTo', weight: 0.1 },
      { name: 'keyFeatures', weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  let timer = null;
  let activeIndex = -1;
  let currentMatches = [];

  function setBrowsing(activeSearch) {
    results.hidden = !activeSearch;
    input.setAttribute('aria-expanded', activeSearch ? 'true' : 'false');
    if (browseSections instanceof HTMLElement) {
      browseSections.hidden = activeSearch;
    }
    if (collectionCards instanceof HTMLElement) {
      collectionCards.hidden = activeSearch;
    }
  }

  function updateUrl(query) {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }

  function badge(text, className) {
    const el = document.createElement('span');
    el.className = className;
    el.textContent = text;
    return el;
  }

  function setActive(index) {
    const cards = Array.from(grid.querySelectorAll('[data-result-card]'));
    activeIndex = index;
    cards.forEach((card, i) => {
      const isActive = i === activeIndex;
      card.classList.toggle('ring-2', isActive);
      card.classList.toggle('ring-brand-blue-500', isActive);
      card.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        card.scrollIntoView({ block: 'nearest' });
        input.setAttribute('aria-activedescendant', card.id);
      }
    });
    if (activeIndex < 0) input.removeAttribute('aria-activedescendant');
  }

  function collectionLabel(collection) {
    if (collection === 'sh') return 'Self-hosted';
    if (collection === 'mac') return 'Mac';
    if (collection === 'tools') return 'Online';
    return 'Alternative';
  }

  function card(tool, index) {
    const a = document.createElement('a');
    a.href = `/${tool.collection}/${tool.id}/`;
    a.id = `search-result-${index}`;
    a.dataset.resultCard = 'true';
    a.setAttribute('role', 'option');
    a.setAttribute('aria-selected', 'false');
    a.className =
      'th-card th-card-hover group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500';

    if (tool.pricing) {
      const pricingClass =
        tool.pricing === 'Free'
          ? 'th-badge th-badge-green'
          : tool.pricing === 'Paid'
            ? 'th-badge th-badge-blue'
            : 'th-badge th-badge-purple';
      const pricing = badge(tool.pricing, `${pricingClass} absolute right-3 top-3 z-10`);
      a.append(pricing);
    }

    const header = document.createElement('div');
    header.className = 'flex items-center gap-4 pr-16';

    const logoWrap = document.createElement('div');
    logoWrap.className =
      'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800/80';

    const img = document.createElement('img');
    img.src = tool.logo;
    img.alt = `${tool.title} logo`;
    img.width = 40;
    img.height = 40;
    img.className = 'h-10 w-10 object-contain';
    img.loading = 'lazy';
    img.decoding = 'async';
    logoWrap.append(img);

    const meta = document.createElement('div');
    meta.className = 'min-w-0 flex-1';

    const badges = document.createElement('div');
    badges.className = 'mb-1.5 flex flex-wrap items-center gap-1.5';
    badges.appendChild(badge(collectionLabel(tool.collection), 'th-badge th-badge-neutral'));
    if (tool.category) {
      badges.appendChild(badge(tool.category, 'th-badge th-badge-blue'));
    }

    const title = document.createElement('h3');
    title.className =
      'line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand-blue-600 dark:text-white dark:group-hover:text-brand-blue-400';
    title.textContent = tool.title;

    meta.append(badges, title);
    header.append(logoWrap, meta);

    const desc = document.createElement('p');
    desc.className =
      'mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300';
    desc.textContent = tool.description;

    a.append(header, desc);

    if (tool.alternativeTo) {
      const alt = document.createElement('p');
      alt.className =
        'mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400';
      alt.textContent = `Alternative to ${tool.alternativeTo}`;
      a.append(alt);
    }

    return a;
  }

  function clearSearch() {
    input.value = '';
    render('');
    input.focus();
  }

  function render(query) {
    const q = query.trim();
    clearBtn?.classList.toggle('hidden', !q);
    activeIndex = -1;
    input.removeAttribute('aria-activedescendant');

    if (!q) {
      setBrowsing(false);
      currentMatches = [];
      grid.replaceChildren();
      emptyEl.classList.add('hidden');
      countEl.textContent = '';
      updateUrl('');
      return;
    }

    currentMatches = fuse.search(q).map((r) => r.item);
    setBrowsing(true);
    countEl.textContent =
      currentMatches.length === 1 ? '1 tool found' : `${currentMatches.length} tools found`;
    emptyEl.classList.toggle('hidden', currentMatches.length > 0);
    grid.replaceChildren(...currentMatches.map((tool, index) => card(tool, index)));
    updateUrl(q);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (activeIndex >= 0 && currentMatches[activeIndex]) {
      window.location.href = `/${currentMatches[activeIndex].collection}/${currentMatches[activeIndex].id}/`;
      return;
    }
    render(input.value);
  });

  input.addEventListener('input', () => {
    if (timer) clearTimeout(timer);
    const value = input.value;
    clearBtn?.classList.toggle('hidden', !value.trim());
    timer = setTimeout(() => render(value), 200);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      clearSearch();
      return;
    }

    if (!input.value.trim()) return;
    if (!currentMatches.length && input.value.trim()) {
      render(input.value);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!currentMatches.length) return;
      setActive(activeIndex < currentMatches.length - 1 ? activeIndex + 1 : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!currentMatches.length) return;
      setActive(activeIndex > 0 ? activeIndex - 1 : currentMatches.length - 1);
    } else if (event.key === 'Enter' && activeIndex >= 0 && currentMatches[activeIndex]) {
      event.preventDefault();
      window.location.href = `/${currentMatches[activeIndex].collection}/${currentMatches[activeIndex].id}/`;
    } else if (event.key === 'Home' && currentMatches.length) {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End' && currentMatches.length) {
      event.preventDefault();
      setActive(currentMatches.length - 1);
    }
  });

  clearBtn?.addEventListener('click', clearSearch);
  clearResultsBtn?.addEventListener('click', clearSearch);
  emptyResetBtn?.addEventListener('click', clearSearch);

  if (input.value.trim()) {
    render(input.value);
  } else {
    setBrowsing(false);
  }

  // Global hotkey handler: '/' or 'Cmd/Ctrl+K' focuses search
  window.addEventListener('keydown', (event) => {
    const isEditing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
      (event.target instanceof HTMLElement && event.target.tagName) || ''
    );
    if ((event.key === '/' && !isEditing) || ((event.metaKey || event.ctrlKey) && event.key === 'k')) {
      event.preventDefault();
      input.focus();
      input.select();
    }
  });
}

function boot() {
  document.querySelectorAll('.search-global').forEach(initGlobalSearch);
}

boot();
document.addEventListener('astro:page-load', boot);

