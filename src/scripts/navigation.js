function initializeMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClosedIcon = document.getElementById('menu-closed-icon');
  const menuOpenIcon = document.getElementById('menu-open-icon');

  if (menuToggle && mobileMenu && menuClosedIcon && menuOpenIcon) {
    // Reset menu state on initialization
    mobileMenu.classList.add('hidden');
    menuClosedIcon.classList.remove('hidden');
    menuOpenIcon.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle menu visibility
      mobileMenu.classList.toggle('hidden');
      
      // Toggle icon visibility
      menuClosedIcon.classList.toggle('hidden');
      menuOpenIcon.classList.toggle('hidden');
      
      // Update aria-expanded
      menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
    });
  }
}

// Initialize menu on page load
initializeMenu();

// Re-initialize menu after view transitions
document.addEventListener('astro:after-swap', initializeMenu);

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu && !menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
    mobileMenu.classList.add('hidden');
    document.getElementById('menu-closed-icon')?.classList.remove('hidden');
    document.getElementById('menu-open-icon')?.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});