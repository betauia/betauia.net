const modal1 = document.getElementById("myModal1");
const btn1 = document.getElementById("myBtn1");
const closeBtn1 = document
  .getElementById("myModal1")
  .getElementsByClassName("close")[0];

const modal2 = document.getElementById("myModal2");
const btn2 = document.getElementById("myBtn2");
const closeBtn2 = document
  .getElementById("myModal2")
  .getElementsByClassName("close")[0];

const modal3 = document.getElementById("myModal3");
const btn3 = document.getElementById("myBtn3");
const closeBtn3 = document
  .getElementById("myModal3")
  .getElementsByClassName("close")[0];

const navbarDOM = document.querySelector(".navbar")

const markdownContainerDOM = document.querySelector(".markdown-container");

const openHamDOM = document.querySelector("#openHam");
const closeHamDOM = document.querySelector("#closeHam");
const navigationItemsDOM = document.querySelector("#navigation-items");

// Open Modal 1
btn1.onclick = function () {
  modal1.style.display = "block";
};

// Close Modal 1
closeBtn1.onclick = function () {
  modal1.style.display = "none";
};

// Open Modal 2
btn2.onclick = function () {
  modal2.style.display = "block";
};

// Close Modal 2
closeBtn2.onclick = function () {
  modal2.style.display = "none";
};

// Open Modal 3
btn3.onclick = function () {
  modal3.style.display = "block";
};

// Close Modal 3
closeBtn3.onclick = function () {
  modal3.style.display = "none";
};

// Close modals when clicked outside of the modals
window.onclick = function (event) {
  if (
    event.target == modal1 ||
    event.target == modal2 ||
    event.target == modal3
  ) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
  }
};




/* Hide navbar items on smaller devices */
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
});



// Tab function
async function openTab(evt, tabName) {
  const contentTabs = document.querySelectorAll(".content-tab");
  contentTabs.forEach((tab) => {
    tab.style.display = "none";
  });

  // Deactivate all tabs
  const tablinks = document.querySelectorAll(".tab");
  tablinks.forEach((tab) => {
    tab.classList.remove("is-active");
  });

  const selectedContentTab = document.getElementById(tabName);
  if (selectedContentTab) {
    selectedContentTab.style.display = "block";
    evt.currentTarget.classList.add("is-active");
  }

  // Store active tab in localstorage
  localStorage.setItem("activeTab", tabName);

  fetchAndDisplayMarkdown(tabName);
}

function setActiveTabOnLoad() {
  const activeTab = localStorage.getItem("activeTab") || "tab";
  const tabButton = document.querySelector(`.tab[onclick*="{${activeTab}"]`);

  if (tabButton) {
    // Simulate a tab click event
    openTab({ currentTarget: tabButton }, activeTab);
  } else {
    const defaultTabButton = document.querySelector(".tab");
    if (defaultTabButton) {
      // Extracts tabname from onclick attribute with RegEx
      const defaultTabName = defaultTabButton
        .getAttribute("onclick")
        .match(/'([^']+)'/)[1];
      openTab({ currentTarget: defaultTabButton }, defaultTabName);
    }
  }
}

const fetchAndDisplayMarkdown = async (tabName) => {
  // TODO: Add a loading cycle while this runs
  try {
    // Capitalizes tabname and sets other characters to lowercase
    const cap_tabName = tabName[0] + tabName.slice(1).toLowerCase();
    const converter = new showdown.Converter();
    const {
      data: { posts },
    } = await axios.get(`/post/all?branch=${cap_tabName}`);

    // Edge case - no posts
    if (posts.length < 1) {
      markdownContainerDOM.innerHTML =
        '<h5 class="empty-list">No posts yet</h5>';
      return;
    }

    // Sort posts by date to get the latest post
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const latestPostID = sortedPosts[0].id;

    // GET request to the latest post
    const {
      data: { post },
    } = await axios.get(`/api/post/${latestPostID}`);

    const { title, body, time, date } = post;

    // Get content by branch which is also tabname
    const totalHTML = `

      <div id="${tabName}" class="content-tab" style="display: none;">
              <div id="markdown-content" class="subtitle is-5 is-beta-white subtitle-text italic custom-markdown"
                style="margin: auto; width: 100%; ">
                <!-- Title -->
                <h2>${title}</h2>
                <!-- Body --> 
                ${converter.makeHTML(body)}

                <!-- Time -->
                <h5>Created: ${date} ${time}</h5>
          </div>
      </div>
      `;

    markdownContainerDOM.innerHTML = totalHTML;
  } catch (error) {
    console.error(error);
    document.getElementById(tabName).innerHTML =
      "<h5>There was an error:(</h5>";
  }
};

document.addEventListener("load", setActiveTabOnLoad());

/********************/
/* Light/Dark mode */
/******************/
const modeToggle = document.getElementById("modeToggle");
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;
let theme = localStorage.getItem("theme");

// Set initial theme based on user preference or saved theme
const check_theme = () => {
  if (theme === "light" || (theme === null && userPrefersLight)) {
    document.body.classList.add("light-mode");
    modeToggle.innerHTML =
      '<span class="icon"><i class="fas fa-moon"></i></span>';
    navbarDOM.classList.replace("is-black", 'is-light');
  } else {
    modeToggle.innerHTML = '<span class="icon"><i class="fas fa-sun"></i></span>';
  }
}

document.addEventListener("load", check_theme());

/* Click event for dark/light-mode */
modeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  // Toggle between 'is-black' and 'is-light' based on the presence of 'light-mode' class
  if (document.body.classList.contains("light-mode")) {
    navbarDOM.classList.replace('is-black', 'is-light');
  } else {
    navbarDOM.classList.replace('is-light', 'is-black');
  }

  // Update theme in localStorage and button icon
  let newTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);

  this.innerHTML = newTheme === "light"
    ? '<span class="icon"><i class="fas fa-moon"></i></span>'
    : '<span class="icon"><i class="fas fa-sun"></i></span>';
});

let isMenuOpen = false;

const hamburgerEvent = (nav, close, open) => {
  navigationItemsDOM.style.display = nav;
  closeHamDOM.style.display = close;
  openHamDOM.style.display = open;
  isMenuOpen = nav === "flex";
};

openHamDOM.addEventListener("click", () =>
  hamburgerEvent("flex", "block", "none")
);
closeHamDOM.addEventListener("click", () =>
  hamburgerEvent("none", "none", "block")
);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hamburgerEvent("flex", "none", "block");
  } else if (window.innerWidth < 768) {
    hamburgerEvent("none", "none", "block");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (screen.width < 768) {
    hamburgerEvent("none", "none", "block");
  }
});
