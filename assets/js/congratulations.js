
/*
 * ADELEKE UNIVERSITY
 * MICROSOFT LEARN CENTER
 * Microsoft Learn ID Submission
 *
 * Website -> Cloudflare Worker -> Power Automate -> Excel
 */

"use strict";

(() => {

    const REGISTRATION_API_URL =
        "https://au-student-registration.aumia.workers.dev/";

    const form = document.getElementById("learnIdForm");
    const submitButton = document.getElementById("learnIdSubmitButton");
    const messageBox = document.getElementById("learnIdMessage");
    const yearElement = document.getElementById("currentYear");

    // Update footer year.
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (!form) {
        console.error("Microsoft Learn ID form was not found.");
        return;
    }

    let isSubmitting = false;

    // Display messages.
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

    // Get input values.
    function getValue(id) {

        const field = document.getElementById(id);

        return field && typeof field.value === "string"
            ? field.value.trim()
            : "";
    }

    // Control submit button.
    function setLoading(loading) {

        if (!submitButton) return;

        submitButton.disabled = loading;
        submitButton.setAttribute("aria-busy", String(loading));

        const label = submitButton.querySelector(".button-label");

        if (label) {
            label.textContent = loading
                ? "Saving Microsoft Learn ID..."
                : "Save Microsoft Learn ID";
        }
    }

    // Submit Microsoft Learn ID.
    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (isSubmitting) return;

        const matricNumber = getValue("matricNumber");
        const microsoftLearnID = getValue("microsoftLearnID");

        // Validate required fields.
        if (!matricNumber || !microsoftLearnID) {

            showMessage(
                "Please enter both your Matriculation Number and Microsoft Learn ID.",
                "error"
            );

            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const payload = {
            action: "saveMicrosoftLearnId",
            MatricNumber: matricNumber,
            MicrosoftLearnID: microsoftLearnID
        };

        isSubmitting = true;
        setLoading(true);

        showMessage(
            "Saving your Microsoft Learn ID. Please wait...",
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

                body: JSON.stringify(payload),

                mode: "cors",
                cache: "no-store",
                signal: controller.signal

            });

            const responseText = await response.text();

            let result = null;

            try {
                result = JSON.parse(responseText);
            } catch {
                result = null;
            }

            if (!response.ok) {

                throw new Error(
                    result && result.message
                        ? result.message
                        : "The server could not process your Microsoft Learn ID."
                );

            }

            // Only proceed when the Worker explicitly confirms success.
            if (!result || result.success !== true) {

                throw new Error(
                    result && result.message
                        ? result.message
                        : "We could not confirm that your Microsoft Learn ID was saved."
                );

            }

            // Remember successful completion for this browser session.
            try {

                sessionStorage.setItem(
                    "studentMicrosoftLearnId",
                    microsoftLearnID
                );

                sessionStorage.setItem(
                    "studentLearnIdSubmitted",
                    "true"
                );

            } catch (storageError) {

                console.warn(
                    "Session storage unavailable.",
                    storageError
                );

            }

            showMessage(
                "Your Microsoft Learn ID has been saved successfully! Redirecting...",
                "success"
            );

            form.reset();

            // Continue to the next registration stage.
            setTimeout(() => {

                window.location.href = "extended-registration.html";

            }, 1500);

        } catch (error) {

            console.error(
                "Microsoft Learn ID submission error:",
                error
            );

            let errorMessage =
                "We could not confirm that your Microsoft Learn ID was saved. Please try again.";

            if (error.name === "AbortError") {

                errorMessage =
                    "The request timed out. Please check your Excel registration record before trying again.";

            } else if (error instanceof TypeError) {

                errorMessage =
                    "Unable to connect to the registration service. Check your internet connection and try again.";

            } else if (error.message) {

                errorMessage = error.message;

            }

            showMessage(errorMessage, "error");

        } finally {

            clearTimeout(timeoutId);

            isSubmitting = false;
            setLoading(false);

        }

    });

})();
