function updateOutput() {
    // Updates markdown output
    const inputText = document.getElementById('inputBox').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = marked(inputText);
}

function clearSection() {
    // Clears Section selection and input 
    document.getElementById('inputBox').value = '';
    document.getElementById('sectionTitle').innerText = 'Select Section';
    currentSection = null;
    updateOutput();
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

    // Maps dropdown to markdown files
    // TODO: needs to be replaced by server side mapping
    const markdownFileMapping = {
        "Beta": "./md/beta-2023h.md",
        "BetaDev": "./md/betadev-2023h.md",
        // TODO: add more mappings for other sections
    };

    let currentSection = null; // Selected section

    async function saveMarkdownContent() {
        const markdownContent = document.getElementById('inputBox').value;

        if (!currentSection) {
            alert('Select a section before saving!');
            return;
        }

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
                alert('Changes saved successfully');
            } else {
                alert('Error occurred');
            }
        } catch (error) {
            console.log('Error saving changes.', error);
            alert('Error.');
        }
    }


    // Binding the function to a button click event:
    document.getElementById('saveButton').addEventListener('click', saveMarkdownContent);

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