
/* =========================================
   MICROSOFT LEARN CENTER
   CONGRATULATIONS PAGE JAVASCRIPT
========================================= */

// Cloudflare Worker endpoint
const WORKER_URL =
    "https://au-student-registration.aumia.workers.dev/";

// Page elements
const learnIdForm = document.getElementById("learnIdForm");
const matricNumberInput = document.getElementById("matricNumber");
const microsoftLearnIDInput = document.getElementById("microsoftLearnID");
const submitButton = document.getElementById("learnIdSubmitButton");
const messageBox = document.getElementById("learnIdMessage");
const currentYear = document.getElementById("currentYear");

// Update footer year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Display feedback messages
function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = "form-message " + type;
}

// Clear feedback messages
function clearMessage() {
    messageBox.textContent = "";
    messageBox.className = "form-message";
}

// Set button loading state
function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.classList.toggle("loading", isLoading);

    const buttonText = submitButton.querySelector(".button-text");

    if (buttonText) {
        buttonText.textContent = isLoading
            ? "Submitting your Learn ID..."
            : "Submit Microsoft Learn ID";
    }
}

// Submit Microsoft Learn ID
learnIdForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearMessage();

    const matricNumber = matricNumberInput.value.trim();
    const microsoftLearnID = microsoftLearnIDInput.value.trim();

    // Validate fields
    if (!matricNumber || !microsoftLearnID) {
        showMessage(
            "Please enter both your Matric Number and Microsoft Learn ID.",
            "error"
        );
        return;
    }

    // Prevent accidental repeated submission
    setLoading(true);

    try {
        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 30000);

        let response;

        try {
            response = await fetch(WORKER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "saveMicrosoftLearnId",
                    MatricNumber: matricNumber,
                    MicrosoftLearnID: microsoftLearnID
                }),
                signal: controller.signal
            });
        } finally {
            clearTimeout(timeoutId);
        }

        let result;

        try {
            result = await response.json();
        } catch {
            throw new Error(
                "The server returned an unexpected response. Please try again."
            );
        }

        if (!response.ok || result.success !== true) {
            throw new Error(
                result.message ||
                "We could not save your Microsoft Learn ID. Please check your details and try again."
            );
        }

        // Save temporary confirmation details
        sessionStorage.setItem("studentMicrosoftLearnId", microsoftLearnID);
        sessionStorage.setItem("studentLearnIdSubmitted", "true");

        showMessage(
            "Your Microsoft Learn ID has been submitted successfully. Redirecting you...",
            "success"
        );

        // Prevent further changes after successful submission
        matricNumberInput.disabled = true;
        microsoftLearnIDInput.disabled = true;

        // Redirect only after the server confirms success
        setTimeout(() => {
            window.location.href = "extended-registration.html";
        }, 1500);

    } catch (error) {
        console.error("Microsoft Learn ID submission error:", error);

        if (error.name === "AbortError") {
            showMessage(
                "The request timed out. Please check your connection and try again.",
                "error"
            );
        } else {
            showMessage(
                error.message ||
                "Something went wrong. Please try again.",
                "error"
            );
        }

    } finally {
        // Keep the button locked only after a successful submission
        if (sessionStorage.getItem("studentLearnIdSubmitted") !== "true") {
            setLoading(false);
        }
    }
});
