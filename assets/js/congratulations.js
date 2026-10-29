
/* =========================================
   MICROSOFT STUDENT AMBASSADORS
   CONGRATULATIONS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const celebrationModal = document.getElementById("celebrationModal");
    const continueCelebration = document.getElementById("continueCelebration");
    const confettiContainer = document.getElementById("confettiContainer");
    const typingText = document.getElementById("typingText");
    const learnIdInput = document.getElementById("learnId");
    const learnIdMessage = document.getElementById("learnIdMessage");
    const continueToExtended = document.getElementById("continueToExtended");
    const learnButton = document.getElementById("microsoftLearnButton");

    // Update footer year if present
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Respect the visitor's reduced-motion preference
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =========================================
       1. CONFETTI CELEBRATION
    ========================================= */

    function createConfetti() {
        if (!confettiContainer || reduceMotion) return;

        confettiContainer.replaceChildren();

        const confettiCount = 100;
        const confettiColors = [
            "#0078d4",
            "#50e6ff",
            "#107c10",
            "#ffb900",
            "#d83b01",
            "#8661c5",
            "#e3008c"
        ];

        for (let i = 0; i < confettiCount; i++) {
            const piece = document.createElement("span");

            piece.className = "confetti-piece";
            piece.style.left = Math.random() * 100 + "%";
            piece.style.backgroundColor =
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ];

            piece.style.setProperty(
                "--fall-duration",
                (2.5 + Math.random() * 3) + "s"
            );

            piece.style.setProperty(
                "--fall-delay",
                (Math.random() * 1.5) + "s"
            );

            if (Math.random() > 0.5) {
                piece.style.borderRadius = "50%";
            }

            confettiContainer.appendChild(piece);
        }
    }

    /* =========================================
       2. SHOW CONGRATULATIONS POPUP
    ========================================= */

    function openCelebration() {
        if (!celebrationModal) return;

        celebrationModal.classList.remove("hidden");
        document.body.classList.add("modal-open");
        createConfetti();

        if (continueCelebration) {
            continueCelebration.focus();
        }
    }

    function closeCelebration() {
        if (!celebrationModal) return;

        celebrationModal.classList.add("hidden");
        document.body.classList.remove("modal-open");

        // Start the typing messages after the popup closes
        startTypingSequence();
    }

    if (continueCelebration) {
        continueCelebration.addEventListener("click", closeCelebration);
    }

    // Start the celebration when the page loads
    openCelebration();

    /* =========================================
       3. TYPING ANIMATION
    ========================================= */

    const messages = [
        "Now that you are ready to join the Community",
        "Firstly, let's set up your Microsoft Learn portal",
        "Click the Microsoft Learn button below to get started"
    ];

    let messageIndex = 0;
    let typingStarted = false;
    let typingTimer = null;

    function typeMessage(message, characterIndex = 0) {
        if (!typingText) return;

        if (characterIndex === 0) {
            typingText.textContent = "";
        }

        if (characterIndex < message.length) {
            typingText.textContent += message.charAt(characterIndex);

            typingTimer = setTimeout(function () {
                typeMessage(message, characterIndex + 1);
            }, reduceMotion ? 0 : 42);

            return;
        }

        // Pause before typing the next message
        typingTimer = setTimeout(function () {
            messageIndex++;

            if (messageIndex < messages.length) {
                typeMessage(messages[messageIndex], 0);
            }
        }, reduceMotion ? 300 : 1200);
    }

    function startTypingSequence() {
        if (typingStarted) return;

        typingStarted = true;
        messageIndex = 0;

        if (typingText) {
            typingText.textContent = "";
        }

        typeMessage(messages[messageIndex]);
    }

    /* =========================================
       4. MICROSOFT LEARN LINK
    ========================================= */

    if (learnButton) {
        learnButton.addEventListener("click", function () {
            // The anchor opens Microsoft Learn in a new tab.
            // No account credentials are requested by this website.
        });
    }

    /* =========================================
       5. MICROSOFT LEARN ID VALIDATION
    ========================================= */

    function showLearnIdMessage(message, type) {
        if (!learnIdMessage) return;

        learnIdMessage.textContent = message;
        learnIdMessage.className = "learn-id-message " + type;
    }

    if (learnIdInput) {
        learnIdInput.addEventListener("input", function () {
            if (learnIdMessage) {
                learnIdMessage.textContent = "";
                learnIdMessage.className = "learn-id-message";
            }
        });
    }

    if (continueToExtended) {
        continueToExtended.addEventListener("click", function () {
            if (!learnIdInput) return;

            const learnId = learnIdInput.value.trim();

            if (!learnId) {
                showLearnIdMessage(
                    "Please enter your Microsoft Learn ID before continuing.",
                    "error"
                );

                learnIdInput.focus();
                return;
            }

            if (learnId.length < 3) {
                showLearnIdMessage(
                    "Please check your Microsoft Learn ID and try again.",
                    "error"
                );

                learnIdInput.focus();
                return;
            }

            /*
             * Save the entered ID for the next page in this browser session.
             * This checks that a value was entered, not that Microsoft has
             * verified the ID. The ID can be submitted to Excel later once
             * the backend workflow has been connected.
             */

            try {
                sessionStorage.setItem("studentMicrosoftLearnId", learnId);
            } catch (error) {
                showLearnIdMessage(
                    "Your browser could not save this step. Please enable session storage and try again.",
                    "error"
                );
                return;
            }

            showLearnIdMessage(
                "Thank you! Taking you to the next step...",
                "success"
            );

            continueToExtended.disabled = true;

            setTimeout(function () {
                window.location.href = "extended-registration.html";
            }, reduceMotion ? 0 : 700);
        });
    }
});
