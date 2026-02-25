const STORAGE_KEY = "color-theme";
const DARK = "dark";
const LIGHT = "light";

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
let boundToggleButton = null;

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(STORAGE_KEY);
  if (storedTheme === DARK || storedTheme === LIGHT) return storedTheme;
  return mediaQuery.matches ? DARK : LIGHT;
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);
  // Force style flush before removing blocker.
  void document.body.offsetHeight;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      style.remove();
    });
  });
}

function applyTheme(theme, { persist = false, suppressTransitions = false } = {}) {
  if (suppressTransitions) disableTransitionsTemporarily();
  const isDark = theme === DARK;
  document.documentElement.classList.toggle(DARK, isDark);
  document.documentElement.style.colorScheme = isDark ? DARK : LIGHT;
  if (persist) localStorage.setItem(STORAGE_KEY, theme);
}

function updateThemeToggleIcons(theme) {
  const darkIcon = document.getElementById("theme-toggle-dark-icon");
  const lightIcon = document.getElementById("theme-toggle-light-icon");
  if (!darkIcon || !lightIcon) return;

  const isDark = theme === DARK;
  darkIcon.classList.toggle("hidden", isDark);
  lightIcon.classList.toggle("hidden", !isDark);
}

function toggleTheme() {
  const currentTheme = document.documentElement.classList.contains(DARK) ? DARK : LIGHT;
  const nextTheme = currentTheme === DARK ? LIGHT : DARK;
  applyTheme(nextTheme, { persist: true, suppressTransitions: true });
  updateThemeToggleIcons(nextTheme);
}

function bindThemeToggle() {
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton || toggleButton === boundToggleButton) return;

  if (boundToggleButton) {
    boundToggleButton.removeEventListener("click", toggleTheme);
  }

  toggleButton.addEventListener("click", toggleTheme);
  boundToggleButton = toggleButton;
}

function initializeTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  updateThemeToggleIcons(theme);
  bindThemeToggle();
}

initializeTheme();
document.addEventListener("astro:after-swap", initializeTheme);

mediaQuery.addEventListener("change", (event) => {
  if (localStorage.getItem(STORAGE_KEY)) return;
  const nextTheme = event.matches ? DARK : LIGHT;
  applyTheme(nextTheme, { suppressTransitions: true });
  updateThemeToggleIcons(nextTheme);
});
