export const popup = (
  message: string,
  type: "error" | "success" | "info" = "info",
  buttonText: string = "OK"
) => {
  document.getElementById("simple-popup")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "simple-popup";
  overlay.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/40";

  const box = document.createElement("div");
  box.className =
    "rounded-xl border border-fg-muted/40 bg-bg-raised dark:border-dark-fg-muted/40 dark:bg-dark-bg-raised p-6 shadow-lg max-w-sm w-full text-sm space-y-6 text-fg-base dark:text-dark-fg-base";

  const text = document.createElement("p");
  text.textContent = message;

  const button = document.createElement("button");
  button.textContent = buttonText;

  const styles = {
    error: "bg-red-500 hover:bg-red-500/80 text-white",
    success: "bg-accent-secondary hover:bg-accent-secondary/80 text-white",
    info: "bg-accent hover:bg-accent/80 text-dark-fg-base",
  };

  button.className = `w-full rounded-md px-4 py-2 font-medium transition ${styles[type]}`;

  button.onclick = () => overlay.remove();
  overlay.onclick = e => e.target === overlay && overlay.remove();

  box.append(text, button);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  button.focus();
};
