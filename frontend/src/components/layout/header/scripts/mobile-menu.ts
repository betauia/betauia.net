export function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener("click", () => {
    const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";

    mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));

    if (isExpanded) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      mobileMenu.offsetHeight;
      mobileMenu.style.maxHeight = "0";
      mobileMenu.style.opacity = "0";
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      mobileMenu.style.opacity = "1";

      const handleTransitionEnd = () => {
        if (mobileMenuButton.getAttribute("aria-expanded") === "true") {
          mobileMenu.style.maxHeight = "none";
        }
        mobileMenu.removeEventListener("transitionend", handleTransitionEnd);
      };
      mobileMenu.addEventListener("transitionend", handleTransitionEnd);
    }
  });

  const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

  mobileDropdownToggles.forEach(toggle => {
    const targetId = (toggle as HTMLElement).dataset.target;
    const dropdown = document.getElementById(`mobile-dropdown-${targetId}`);

    if (!dropdown) return;

    toggle.addEventListener("click", e => {
      e.stopPropagation();
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      const chevron = toggle.querySelector('[data-icon="fa-solid:chevron-down"]');

      toggle.setAttribute("aria-expanded", String(!isExpanded));

      if (isExpanded) {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        dropdown.offsetHeight;
        dropdown.style.maxHeight = "0";
        chevron?.classList.remove("rotate-180");
      } else {
        mobileDropdownToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            const otherId = (otherToggle as HTMLElement).dataset.target;
            const otherDropdown = document.getElementById(`mobile-dropdown-${otherId}`);
            const otherChevron = otherToggle.querySelector('[data-icon="fa-solid:chevron-down"]');

            if (otherDropdown) {
              otherDropdown.style.maxHeight = "0";
              otherToggle.setAttribute("aria-expanded", "false");
              otherChevron?.classList.remove("rotate-180");
            }
          }
        });

        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        chevron?.classList.add("rotate-180");
      }

      if (mobileMenu.style.maxHeight !== "none") {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      }
    });
  });

  document.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    if (
      !target.closest("#mobile-menu") &&
      !target.closest("#mobile-menu-button") &&
      mobileMenuButton.getAttribute("aria-expanded") === "true"
    ) {
      mobileMenuButton.click();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenuButton.getAttribute("aria-expanded") === "true") {
      mobileMenuButton.click();
    }
  });
}
