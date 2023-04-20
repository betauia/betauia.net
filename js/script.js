document.getElementById("btn1").addEventListener("click", function() {
  document.getElementById("modal").style.display = "block";
});

document.getElementById("btn2").addEventListener("click", function() {
  document.getElementById("modal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});
