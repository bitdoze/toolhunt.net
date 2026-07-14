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
      'th-card th-card-hover block p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500';

    const row = document.createElement('div');
    row.className = 'flex items-start gap-4';

    const img = document.createElement('img');
    img.src = tool.logo;
    img.alt = `${tool.title} logo`;
    img.width = 48;
    img.height = 48;
    img.className =
      'h-12 w-12 shrink-0 rounded-lg border border-slate-200 bg-slate-50 object-contain p-1.5 dark:border-slate-700 dark:bg-slate-800';
    img.loading = 'lazy';
    img.decoding = 'async';

    const body = document.createElement('div');
    body.className = 'min-w-0 flex-1';

    const title = document.createElement('h3');
    title.className = 'truncate text-base font-semibold text-slate-900 dark:text-white';
    title.textContent = tool.title;

    const desc = document.createElement('p');
    desc.className = 'mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400';
    desc.textContent = tool.description;

    const badges = document.createElement('div');
    badges.className = 'mt-2 flex flex-wrap gap-2';
    badges.appendChild(badge(collectionLabel(tool.collection), 'th-badge th-badge-neutral'));
    if (tool.category) {
      badges.appendChild(badge(tool.category, 'th-badge th-badge-blue'));
    }
    if (tool.alternativeTo) {
      badges.appendChild(badge(`Alt to ${tool.alternativeTo}`, 'th-badge th-badge-purple'));
    }

    body.append(title, desc, badges);
    row.append(img, body);
    a.append(row);
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
}

function boot() {
  document.querySelectorAll('.search-global').forEach(initGlobalSearch);
}

boot();
document.addEventListener('astro:page-load', boot);
