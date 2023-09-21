function openSub(event, sub)
{
    var x, i, tablinks;
    x = document.getElementsByClassName("Tab");
    for (i = 0; i < x.length; i++)
    {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");

    for (i = 0; i < x.length; i++)
    {
        tablinks[i].className = tablinks[i].className.replace(" w3-grey", "");
    }
    document.getElementById(sub).style.display = "block";
    event.currentTarget.className += " w3-grey"
}