let boundToggle = null;
let outsideClickBound = false;

function closeMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClosedIcon = document.getElementById('menu-closed-icon');
  const menuOpenIcon = document.getElementById('menu-open-icon');

  if (!menuToggle || !mobileMenu) return;

  mobileMenu.classList.add('hidden');
  menuClosedIcon?.classList.remove('hidden');
  menuOpenIcon?.classList.add('hidden');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function onToggleClick() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClosedIcon = document.getElementById('menu-closed-icon');
  const menuOpenIcon = document.getElementById('menu-open-icon');
  if (!menuToggle || !mobileMenu || !menuClosedIcon || !menuOpenIcon) return;

  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileMenu.classList.toggle('hidden');
  menuClosedIcon.classList.toggle('hidden');
  menuOpenIcon.classList.toggle('hidden');
  menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
}

function onDocumentClick(event) {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuToggle || !mobileMenu) return;

  const target = event.target;
  if (!(target instanceof Node)) return;
  if (menuToggle.contains(target) || mobileMenu.contains(target)) return;
  closeMenu();
}

function initializeMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClosedIcon = document.getElementById('menu-closed-icon');
  const menuOpenIcon = document.getElementById('menu-open-icon');

  if (!menuToggle || !mobileMenu || !menuClosedIcon || !menuOpenIcon) return;

  closeMenu();

  if (boundToggle && boundToggle !== menuToggle) {
    boundToggle.removeEventListener('click', onToggleClick);
  }

  if (boundToggle !== menuToggle) {
    menuToggle.addEventListener('click', onToggleClick);
    boundToggle = menuToggle;
  }

  if (!outsideClickBound) {
    document.addEventListener('click', onDocumentClick);
    outsideClickBound = true;
  }
}

initializeMenu();
document.addEventListener('astro:page-load', initializeMenu);
document.addEventListener('astro:after-swap', initializeMenu);
