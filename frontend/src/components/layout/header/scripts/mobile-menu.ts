export function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuButton || !mobileMenu) return;

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", () => {
    const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";

    mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));

    if (isExpanded) {
      // Close menu
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      mobileMenu.offsetHeight; // Force reflow
      mobileMenu.style.maxHeight = "0";
      mobileMenu.style.opacity = "0";
    } else {
      // Open menu
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      mobileMenu.style.opacity = "1";

      // Set max-height to none after transition for dynamic content
      const handleTransitionEnd = () => {
        if (mobileMenuButton.getAttribute("aria-expanded") === "true") {
          mobileMenu.style.maxHeight = "none";
        }
        mobileMenu.removeEventListener("transitionend", handleTransitionEnd);
      };
      mobileMenu.addEventListener("transitionend", handleTransitionEnd);
    }
  });

  // Handle mobile dropdown toggles
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
        // Close dropdown
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        dropdown.offsetHeight; // Force reflow
        dropdown.style.maxHeight = "0";
        chevron?.classList.remove("rotate-180");
      } else {
        // Close other dropdowns first
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

        // Open dropdown
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        chevron?.classList.add("rotate-180");
      }

      // Adjust mobile menu height to accommodate dropdown
      if (mobileMenu.style.maxHeight !== "none") {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      }
    });
  });

  // Close mobile menu when clicking outside
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

  // Close mobile menu on escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenuButton.getAttribute("aria-expanded") === "true") {
      mobileMenuButton.click();
    }
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenuButton.getAttribute("aria-expanded") === "true") {
        mobileMenuButton.click();
      }
    });
  });
}
