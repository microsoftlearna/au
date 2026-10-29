
/* ========================================
   MICROSOFT STUDENT AMBASSADORS
   BIODATA REGISTRATION
======================================== */

const POWER_AUTOMATE_URL = "https://default3c8b0c3b170b4259903232d86a352b.2b.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/10/workflows/597fc267652649dba6972fd5e478beef/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WjCwWQByh3Q7h54MNsbya7FlMDrsp2iWRmuo6Osh390";

const registrationForm = document.getElementById("registrationForm");
const submitButton = document.getElementById("submitButton");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");

// Display the current year in the footer.
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Let the browser validate required fields first.
    if (!registrationForm.checkValidity()) {
        registrationForm.reportValidity();
        return;
    }

    if (
        !POWER_AUTOMATE_URL ||
        POWER_AUTOMATE_URL === "https://default3c8b0c3b170b4259903232d86a352b.2b.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/10/workflows/597fc267652649dba6972fd5e478beef/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WjCwWQByh3Q7h54MNsbya7FlMDrsp2iWRmuo6Osh390"
    ) {
        showMessage(
            "Registration is not connected yet. Please try again later.",
            "error"
        );
        return;
    }

    const studentEmail = document
        .getElementById("studentEmail")
        .value.trim();

    const emailDomain = studentEmail.split("@")[1]?.toLowerCase();

    if (emailDomain !== "student.adelekeuniversity.edu.ng") {
        showMessage(
            "Please use your official Adeleke University student email.",
            "error"
        );
        return;
    }

    // Match these property names to the Power Automate trigger schema.
    const registrationData = {
        FirstName: document.getElementById("firstName").value.trim(),
        LastName: document.getElementById("lastName").value.trim(),
        MiddleName: document.getElementById("middleName").value.trim(),
        StudentEmail: studentEmail,
        PhoneNumber: document.getElementById("phoneNumber").value.trim(),
        MatricNumber: document.getElementById("matricNumber").value.trim(),
        Faculty: document.getElementById("faculty").value.trim(),
        Department: document.getElementById("department").value.trim(),
        CurrentLevel: document.getElementById("currentLevel").value,
        AmbassadorReason: document.getElementById("motivation").value.trim()
    };

    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = "Submitting registration...";
    formMessage.className = "form-message";
    formMessage.textContent = "";

    try {
        
        const response = await fetch(POWER_AUTOMATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            },
            body: JSON.stringify(registrationData)
        });

        if (!response.ok) {
            throw new Error("The registration request was unsuccessful.");
        }

        const result = await response.json();

        if (result.success !== true) {
            throw new Error("The registration was not confirmed.");
        }

        showMessage(
            "Your biodata has been submitted successfully. Redirecting...",
            "success"
        );

        registrationForm.reset();

        setTimeout(function () {
            window.location.href = "congratulations.html";
        }, 1500);

    } catch (error) {
        console.error("Registration error:", error);

        showMessage(
            "We could not confirm your registration. Please try again. " +
            "If this continues, the connection may need to be configured.",
            "error"
        );
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});
