/*
 * Adeleke University Microsoft Learn Center
 * Student Ambassador Registration
 *
 * Website -> Cloudflare Worker -> Power Automate -> Excel
 */

"use strict";

(() => {
    const REGISTRATION_API_URL =
        "https://au-student-registration.aumia.workers.dev/";

    const form = document.getElementById("registrationForm");
    const submitButton = document.getElementById("submitButton");
    const messageBox = document.getElementById("formMessage");
    const yearElement = document.getElementById("currentYear");

    // Automatically update the footer year.
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Confirm that the registration form exists.
    if (!form) {
        console.error(
            "Registration form not found. Check that its ID is registrationForm."
        );
        return;
    }

    let isSubmitting = false;

    // Display messages to the student.
    function showMessage(message, type = "info") {
        if (!messageBox) {
            console.log(message);
            return;
        }

        messageBox.textContent = message;
        messageBox.className = `form-message ${type}`;

        messageBox.setAttribute(
            "role",
            type === "error" ? "alert" : "status"
        );
    }

    // Read a form field safely.
    function getValue(id) {
        const field = document.getElementById(id);

        return field && typeof field.value === "string"
            ? field.value.trim()
            : "";
    }

    // Validate an email address.
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Prevent duplicate clicks while submitting.
    function setLoading(loading) {
        if (submitButton) {
            submitButton.disabled = loading;
            submitButton.setAttribute("aria-busy", String(loading));

            const label = submitButton.querySelector(".button-label");

            if (label) {
                label.textContent = loading
                    ? "Submitting..."
                    : "Submit Biodata";
            } else if (submitButton.tagName === "INPUT") {
                submitButton.value = loading
                    ? "Submitting..."
                    : "Submit Biodata";
            } else {
                submitButton.textContent = loading
                    ? "Submitting..."
                    : "Submit Biodata";
            }
        }
    }

    // Submit the registration.
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        // Use the browser's built-in validation.
        if (!form.checkValidity()) {
            form.reportValidity();

            showMessage(
                "Please complete all required fields correctly.",
                "error"
            );

            return;
        }

        /*
         * These IDs must match the IDs in get-started.html.
         * The payload names must match the Power Automate trigger schema.
         */
        const registration = {
            FirstName: getValue("firstName"),
            LastName: getValue("lastName"),
            MiddleName: getValue("middleName"),
            StudentEmail: getValue("studentEmail"),
            PhoneNumber: getValue("phoneNumber"),
            MatricNumber: getValue("matricNumber"),
            Faculty: getValue("faculty"),
            Department: getValue("department"),
            CurrentLevel: getValue("currentLevel"),
            AmbassadorReason: getValue("motivation")
        };

        const requiredFields = [
            ["FirstName", "First Name"],
            ["LastName", "Last Name"],
            ["StudentEmail", "Student Email"],
            ["PhoneNumber", "Phone Number"],
            ["MatricNumber", "Matric Number"],
            ["Faculty", "Faculty"],
            ["Department", "Department"],
            ["CurrentLevel", "Current Level"],
            ["AmbassadorReason", "Motivation"]
        ];

        const missingFields = requiredFields
            .filter(([key]) => !registration[key])
            .map(([, label]) => label);

        if (missingFields.length > 0) {
            showMessage(
                "Please complete the following fields: " +
                missingFields.join(", ") + ".",
                "error"
            );

            return;
        }

        if (!isValidEmail(registration.StudentEmail)) {
            showMessage(
                "Please enter a valid student email address.",
                "error"
            );

            document.getElementById("studentEmail")?.focus();

            return;
        }

        isSubmitting = true;
        setLoading(true);

        showMessage(
            "Submitting your registration. Please wait...",
            "info"
        );

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 30000);

        try {
            const response = await fetch(REGISTRATION_API_URL, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(registration),

                mode: "cors",
                cache: "no-store",
                signal: controller.signal
            });

            const responseText = await response.text();

            let result = null;

            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                } catch {
                    result = null;
                }
            }

            if (!response.ok) {
                const errorMessage =
                    result && result.message
                        ? result.message
                        : "The registration service returned an error. Please try again later.";

                throw new Error(errorMessage);
            }

            /*
             * Do not display success unless the Worker explicitly
             * confirms that Power Automate accepted the registration.
             */
            if (!result || result.success !== true) {
                throw new Error(
                    result && result.message
                        ? result.message
                        : "We could not confirm that your registration was saved."
                );
            }

            // Store non-sensitive confirmation details for this session.
            try {
                sessionStorage.setItem(
                    "studentRegistrationSubmitted",
                    "true"
                );

                sessionStorage.setItem(
                    "studentRegistrationEmail",
                    registration.StudentEmail
                );
            } catch (storageError) {
                console.warn(
                    "Session storage is unavailable.",
                    storageError
                );
            }

            showMessage(
                "Registration submitted successfully! Redirecting you to the next step...",
                "success"
            );

            form.reset();

            setTimeout(() => {
                window.location.href = "congratulations.html";
            }, 1200);

        } catch (error) {
            console.error(
                "Registration submission failed:",
                error
            );

            let message =
                "We could not confirm your registration. Please check your registration spreadsheet or contact the site administrator before trying again.";

            if (error.name === "AbortError") {
                message =
                    "The request timed out. Your registration may still have been received. Please check the spreadsheet before submitting again to avoid duplicate entries.";
            } else if (error instanceof TypeError) {
                message =
                    "We could not connect to the registration service. Please check your internet connection and try again.";
            } else if (error.message) {
                message = error.message;
            }

            showMessage(message, "error");

        } finally {
            clearTimeout(timeoutId);

            isSubmitting = false;
            setLoading(false);
        }
    });
})();