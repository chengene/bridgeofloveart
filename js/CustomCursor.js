const customCursor = document.getElementById("customCursor");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const THEME_STORAGE_KEY = "art-portfolio-theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function syncThemeToggle() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  document.querySelectorAll("[data-theme-icon]").forEach((iconEl) => {
    iconEl.textContent = isDark ? "☀" : "🌙";
  });

  document.querySelectorAll("[data-theme-label]").forEach((labelEl) => {
    const isMobile = labelEl.closest(".mobile-theme-toggle");
    labelEl.textContent = isDark
      ? isMobile
        ? "Switch to Light"
        : "Light"
      : isMobile
        ? "Switch to Dark"
        : "Dark";
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  });
}

function applyTheme(theme, shouldPersist = false) {
  document.documentElement.setAttribute("data-theme", theme);
  if (shouldPersist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
  syncThemeToggle();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
}

window.syncThemeToggle = syncThemeToggle;
applyTheme(getPreferredTheme());

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.15;

  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  customCursor.style.left = cursorX + "px";
  customCursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

window.addEventListener("scroll", () => {
  document
    .getElementById("nav-pill")
    .classList.toggle("scrolled", window.scrollY > 10);
});

const hamburger = document.getElementById("hamburger");
const mobileDrop = document.getElementById("mobile-drop");

if (hamburger && mobileDrop) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileDrop.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-center a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-center a")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

document.addEventListener("click", (event) => {
  const toggleBtn = event.target.closest("[data-theme-toggle]");
  if (toggleBtn) {
    toggleTheme();
  }
});
