// The wiki reads `data-theme` instead, so set both
function setTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
}

export function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const stored = localStorage.getItem("color-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored ? stored === "dark" : prefersDark;

  setTheme(isDark);
  if ("checked" in themeToggle) {
    (themeToggle as HTMLInputElement).checked = isDark;
  }

  themeToggle.addEventListener("change", () => {
    const checked = (themeToggle as HTMLInputElement).checked ?? false;
    setTheme(checked);
    localStorage.setItem("color-theme", checked ? "dark" : "light");
  });
}
