// Theme management functions
function getThemePreference() {
  if (localStorage.getItem('color-theme') === 'dark' || 
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    return 'dark';
  }
  return 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  }
}

function toggleTheme() {
  const currentTheme = getThemePreference();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  updateThemeToggleIcons(newTheme);
}

function updateThemeToggleIcons(theme) {
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  
  if (darkIcon && lightIcon) {
    if (theme === 'dark') {
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
    } else {
      darkIcon.classList.remove('hidden');
      lightIcon.classList.add('hidden');
    }
  }
}

// Initialize theme
function initializeTheme() {
  const theme = getThemePreference();
  setTheme(theme);
  updateThemeToggleIcons(theme);
  
  // Set up theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
}

// Initialize theme immediately
document.addEventListener('DOMContentLoaded', initializeTheme);
initializeTheme(); // Keep this as a fallback

// Re-initialize theme after view transitions
document.addEventListener('astro:after-swap', initializeTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('color-theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
    updateThemeToggleIcons(newTheme);
  }
});