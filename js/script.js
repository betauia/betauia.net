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
function openSub(event, sub)
{
    var class_enum, i, tablinks;
    class_enum = document.getElementsByClassName("Tab");
    for (i = 0; i < class_enum.length; i++)
    {
        class_enum[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");

    for (i = 0; i < class_enum.length; i++)
    {
        tablinks[i].className = tablinks[i].className.replace(" w3-grey", "");
    }
    document.getElementById(sub).style.display = "block";
    event.currentTarget.className += " w3-grey"
}