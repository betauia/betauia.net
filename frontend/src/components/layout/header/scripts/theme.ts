export function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const stored = localStorage.getItem("color-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored ? stored === "dark" : prefersDark;

  document.documentElement.classList.toggle("dark", isDark);
  if ("checked" in themeToggle) {
    (themeToggle as HTMLInputElement).checked = isDark;
  }

  themeToggle.addEventListener("change", () => {
    const checked = (themeToggle as HTMLInputElement).checked ?? false;
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("color-theme", checked ? "dark" : "light");
  });
}
