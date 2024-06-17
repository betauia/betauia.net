function updateOutput() {
    // Updates markdown output
    const inputText = document.getElementById('inputBox').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = marked(inputText);
}

function handleLogin() {
    // Checking if the user entered anything as username and password (not secure)
    // TODO: check need server-side validation
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
    let saveTimeoutId = null;
    let currentSection = null; // Selected section

    // Maps dropdown to markdown files
    const markdownFileMapping = {
        "Beta": "/static/md/beta-2023h.md",
        "BetaDev": "/static/md/betadev-2023h.md",
        // TODO: add more mappings for other sections
    };

    function clearSection() {
        // Clears Section selection and input 
        document.getElementById('inputBox').value = '';
        document.getElementById('sectionTitle').innerText = 'Select Section';
        currentSection = null;
        updateOutput();
    }
    document.getElementById("clearSection").addEventListener("click", clearSection);

    function showSnackbar(message) {
        const snackbar = document.getElementById("snackbar");
        snackbar.innerHTML = `<p>${message}</p>`;
        snackbar.className = "snackbar show";

        // Automatically hide the snackbar after 3 seconds
        clearTimeout(saveTimeoutId);
        saveTimeoutId = setTimeout(() => {
            snackbar.className = snackbar.className.replace("show", "");
        }, 3000);
    }

    function showSavingSnackbar() {
        const snackbar = document.getElementById("snackbar");
        clearTimeout(saveTimeoutId); // Clear any existing timeout
        if (!currentSection) {
            // No section selected, show snackbar and do nothing else
            showSnackbar("Choose a section before saving!");
        } else {
            // Section selected, proceed with showing "Saving..." and setting up the save process if confirmed
            if (confirm("Are you sure you want to save?")) {

                snackbar.innerHTML = `<p>Saving...</p>`;
                snackbar.className = "snackbar show";
                saveTimeoutId = setTimeout(() => {
                    saveMarkdownContent();
                }, 3000);
            }
        }
    }


    async function saveMarkdownContent() {
        const markdownContent = document.getElementById('inputBox').value;


        const saveUrl = `post/save`; // TODO: spør backend om riktig path
        const currentDateAndTime = new Date();

        // Adjust for CEST time
        const offset = currentDateAndTime.getTimezoneOffset() / 60;
        const CESTOffset = 2; // CEST is UTC+2
        currentDateAndTime.setHours(currentDateAndTime.getHours() + offset + CESTOffset);

        const currentDate = currentDateAndTime.toISOString().split('T')[0];
        const currentTime = currentDateAndTime.toISOString().split('T')[1].split('.')[0]; // Removes milliseconds

        console.log('Date: ', currentDate, '\nTime: ', currentTime);


        try {
            const rawResponse = await fetch(saveUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: markdownContent,
                    section: currentSection,
                    date: currentDate,
                    time: currentTime
                })
            });

            const data = await rawResponse.json();
            if (data.success) {
                showSnackbar('Save successful.');
            } else {
                showSnackbar('Save failed. Please try again.');
            }
        } catch (error) {
            console.error('Error saving changes.', error);
            showSnackbar('Error occurred during saving.');
        }
    }


    // Click event for showSavingSnackbar
    document.getElementById('saveButton').addEventListener('click', showSavingSnackbar);

    // click listeners to each dropdown item
    dropdownItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const sectionName = event.target.innerText;

            // Fetch the Markdown content for the selected section
            fetchMarkdownContent(sectionName);

            // Update the current section
            currentSection = event.target.getAttribute("data-section");

            // Update the dropdown button text
            document.querySelector(".dropdown-trigger .button span").textContent = event.target.innerText;
        });
    });




    async function fetchMarkdownContent(sectionName) {
        const filePath = markdownFileMapping[sectionName];
        if (!filePath) {
            console.error(`No markdown file path found for section: ${sectionName}`);
            return;
        }

        try {
            const response = await fetch(filePath);
            const markdownContent = await response.json(); // or .text()
            inputBox.value = markdownContent;
            updateOutput(); // Update md output
        } catch (error) {
            console.error("Error fetching Markdown content:", error);
        }
    }
});