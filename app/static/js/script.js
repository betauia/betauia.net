const modal1 = document.getElementById("myModal1");
const btn1 = document.getElementById("myBtn1");
const closeBtn1 = document.getElementById("myModal1").getElementsByClassName("close")[0];

const modal2 = document.getElementById("myModal2");
const btn2 = document.getElementById("myBtn2");
const closeBtn2 = document.getElementById("myModal2").getElementsByClassName("close")[0];

const modal3 = document.getElementById("myModal3");
const btn3 = document.getElementById("myBtn3");
const closeBtn3 = document.getElementById("myModal3").getElementsByClassName("close")[0];

const openHamDOM = document.querySelector('#openHam');
const closeHamDOM = document.querySelector('#closeHam');
const navigationItemsDOM = document.querySelector('#navigation-items');

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
  if (event.target == modal1 || event.target == modal2 || event.target == modal3) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
  }
};

// Tab function
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("content-tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("is-active"); // Remove "is-active" from all tabs
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("is-active"); // Add "is-active" to the clicked tab

  // Store the active tab in localStorage
  localStorage.setItem("activeTab", tabName);
}

function setActiveTabOnLoad() {
  var activeTab = localStorage.getItem("activeTab");
  var contentTabs = document.getElementsByClassName("content-tab");

  // Hide all content tabs initially
  for (var i = 0; i < contentTabs.length; i++) {
    contentTabs[i].style.display = "none";
  }

  if (activeTab) {
    // Remove "is-active" from all tabs
    var tablinks = document.getElementsByClassName("tab");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("is-active");
    }

    // Set the active tab from localStorage as "is-active"
    document.getElementById(activeTab).style.display = "block";
    document.querySelector(`[onclick*="${activeTab}"]`).classList.add("is-active");

    // Render the markdown content for the active tab
    fetchAndDisplayMarkdown(activeTab);
  } else {
    // If no tab is set in localStorage, set a default tab as active and render its content
    openTab("Beta");
    fetchAndDisplayMarkdown("Beta");
  }
}


async function fetchAndDisplayMarkdown(tabName) {
  const converter = new showdown.Converter();
  const markdownFileMapping = {
    "Beta": "Beta regular boring snooze zzzz",
    "BetaDev": "BetaDev stuff yes happy",
    "BetaSec": "BetaSec mr hacky bois",
    "BetaLan": "BetaLan we play game",
    "BedKom": "BetaKom we need more pizza plz"
  };

  const markdownFilename = markdownFileMapping[tabName];
  if (!markdownFilename) {
    console.error(`No markdown filename found for tab: ${tabName}`);
    return;
  }

  // Update the fetch URL to point to your Flask server's route
  // TODO: remove this shit boi
  const htmlContent = converter.makeHtml(markdownFilename);
  document.getElementById(tabName).querySelector(".custom-markdown").innerHTML = htmlContent;
}

/* Light/Dark mode */

document.addEventListener('DOMContentLoaded', () => {

  setActiveTabOnLoad();

  const tabButtons = document.querySelectorAll("[data-tab]");
  tabButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      const tabName = e.target.getAttribute("data-tab");
      openTab(e, tabName);
      fetchAndDisplayMarkdown(tabName);
    });
  });
});

const modeToggle = document.getElementById('modeToggle');
const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
let theme = localStorage.getItem('theme');

// Set initial theme based on user preference or saved theme
if (theme === 'light' || (theme === null && userPrefersLight)) {
  document.body.classList.add('light-mode');
  modeToggle.innerHTML = '<span class="icon"><i class="fas fa-moon"></i></span>';
} else {
  modeToggle.innerHTML = '<span class="icon"><i class="fas fa-sun"></i></span>';
}

modeToggle.addEventListener('click', function () {
  document.body.classList.toggle('light-mode');
  let newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  this.innerHTML = newTheme === 'light' ?
    '<span class="icon"><i class="fas fa-moon"></i></span>' :
    '<span class="icon"><i class="fas fa-sun"></i></span>';
});

let isMenuOpen = false;

const hamburgerEvent = (nav, close, open) => {
  navigationItemsDOM.style.display = nav;
  closeHamDOM.style.display = close;
  openHamDOM.style.display = open;
  isMenuOpen = nav === 'flex';
}

openHamDOM.addEventListener('click', () => hamburgerEvent('flex', 'block', 'none'));
closeHamDOM.addEventListener('click', () => hamburgerEvent('none', 'none', 'block'));

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburgerEvent("flex", "none", "block");
  }
  else if (window.innerWidth < 768) {
    hamburgerEvent("none", "none", "block");
  }
})


window.addEventListener('DOMContentLoaded', () => {
  if (screen.width < 768) {
    hamburgerEvent('none', 'none', 'block');
  }
});