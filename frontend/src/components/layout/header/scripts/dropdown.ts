export function closeAllDropdowns() {
  const dropdownButtons = document.querySelectorAll(".dropdown-toggle");
  const panels = document.querySelectorAll('[id^="dropdown-"]');

  panels.forEach(panel => {
    const htmlPanel = panel as HTMLElement;

    if (htmlPanel.style.maxHeight !== "0" && htmlPanel.style.opacity !== "0") {
      htmlPanel.style.maxHeight = htmlPanel.scrollHeight + "px";
      htmlPanel.offsetHeight;
      htmlPanel.style.maxHeight = "0";
      htmlPanel.style.opacity = "0";
    } else {
      htmlPanel.style.maxHeight = "0";
      htmlPanel.style.opacity = "0";
    }
  });

  dropdownButtons.forEach(btn => {
    btn.setAttribute("aria-expanded", "false");
  });
}

export function toggleDropdown(button: Element, panel: HTMLElement) {
  const dropdownButtons = document.querySelectorAll(".dropdown-toggle");
  const expanded = button.getAttribute("aria-expanded") === "true";

  document.querySelectorAll('[id^="dropdown-"]').forEach(p => {
    if (p !== panel) {
      const htmlP = p as HTMLElement;
      htmlP.style.transition = "none";
      htmlP.style.maxHeight = "0";
      htmlP.style.opacity = "0";
      requestAnimationFrame(() => (htmlP.style.transition = ""));
    }
  });

  dropdownButtons.forEach(b => {
    if (b !== button) b.setAttribute("aria-expanded", "false");
  });

  button.setAttribute("aria-expanded", String(!expanded));

  if (expanded) {
    panel.style.maxHeight = panel.scrollHeight + "px";
    panel.offsetHeight;
    panel.style.maxHeight = "0";
    panel.style.opacity = "0";
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    panel.style.opacity = "1";

    const handleTransitionEnd = () => {
      if (button.getAttribute("aria-expanded") === "true") {
        panel.style.maxHeight = "none";
      }
      panel.removeEventListener("transitionend", handleTransitionEnd);
    };

    panel.addEventListener("transitionend", handleTransitionEnd);
  }
}

export function initDropdowns() {
  const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

  dropdownButtons.forEach(btn => {
    const targetId = (btn as HTMLElement).dataset.target;
    const panel = document.getElementById(`dropdown-${targetId}`);

    if (!panel) return;

    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleDropdown(btn, panel as HTMLElement);
    });
  });

  document.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    if (!target.closest(".dropdown-toggle") && !target.closest('[id^="dropdown-"]')) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAllDropdowns();
    }
  });
}
