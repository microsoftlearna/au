
document.addEventListener("DOMContentLoaded", function () {
    // Automatically update the copyright year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Retrieve the Microsoft Learn ID from the previous page
    const learnIdDisplay = document.getElementById("learnIdDisplay");

    const savedLearnId = sessionStorage.getItem(
        "studentMicrosoftLearnId"
    );

    // Display the ID if it exists
    if (learnIdDisplay && savedLearnId) {
        learnIdDisplay.textContent =
            "Microsoft Learn ID entered: " + savedLearnId;
    }
});
