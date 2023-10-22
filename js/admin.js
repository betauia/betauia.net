function updateOutput() {
    const inputText = document.getElementById('inputBox').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = marked(inputText);
}

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


document.addEventListener("DOMContentLoaded", function () {
    // Reference to the dropdown items and the markdown input textarea
    const dropdownItems = document.querySelectorAll(".dropdown-content a");
    const inputBox = document.getElementById("inputBox");

    // Maps dropdown to markdown files
    const markdownFileMapping = {
        "Beta": "./md/beta-2023h.md",
        "BetaDev": "./md/betadev-2023h.md",
        // TODO: add more mappings for other sections
    };

    // click listeners to each dropdown item
    dropdownItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const sectionName = event.target.innerText;
            fetchMarkdownContent(sectionName);
        });
    });

    function fetchMarkdownContent(sectionName) {
        const filePath = markdownFileMapping[sectionName];
        if (!filePath) {
            console.error(`No markdown file path found for section: ${sectionName}`);
            return;
        }

        // Fetch the markdown content from the file
        fetch(filePath)
            .then((response) => response.text())
            .then((markdownContent) => {
                inputBox.value = markdownContent;
                updateOutput(); // Update md output
            })
            .catch((error) => {
                console.error("Error fetching Markdown content:", error);
            });
    }
});