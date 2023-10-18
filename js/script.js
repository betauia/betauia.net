var modal1 = document.getElementById("myModal1");
var btn1 = document.getElementById("myBtn1");
var closeBtn1 = document.getElementById("myModal1").getElementsByClassName("close")[0];

var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var closeBtn2 = document.getElementById("myModal2").getElementsByClassName("close")[0];

var modal3 = document.getElementById("myModal3");
var btn3 = document.getElementById("myBtn3");
var closeBtn3 = document.getElementById("myModal3").getElementsByClassName("close")[0];

// Open Modal 1
btn1.onclick = function() {
  modal1.style.display = "block";
};

// Close Modal 1
closeBtn1.onclick = function() {
  modal1.style.display = "none";
};

// Open Modal 2
btn2.onclick = function() {
  modal2.style.display = "block";
};

// Close Modal 2
closeBtn2.onclick = function() {
  modal2.style.display = "none";
};

// Open Modal 3
btn3.onclick = function() {
  modal3.style.display = "block";
};

// Close Modal 3
closeBtn3.onclick = function() {
  modal3.style.display = "none";
};

// Close modals when clicked outside of the modals
window.onclick = function(event) {
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
  }
}

// Call the function to set the active tab when the page loads
window.addEventListener("load", setActiveTabOnLoad);


function handleLogin() {
  // Checking if the user entered anything as username and password
  // TODO: this check need server-side validation
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username && password) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("editor").style.display = "block";
  } else {
    alert("Please enter a username and password.");
  }
}