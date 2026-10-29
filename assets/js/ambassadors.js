
/* =====================================================
   MICROSOFT STUDENT AMBASSADORS SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("ambassadorSlider");

    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".slider-dot");
    const previousButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");
    const currentSlideText = document.getElementById("currentSlide");

    let currentIndex = 0;
    let autoplayTimer;

    const autoplayDelay = 6000;


    /* ================= SHOW SELECTED SLIDE ================= */

    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        if (currentSlideText) {
            currentSlideText.textContent =
                String(currentIndex + 1).padStart(2, "0");
        }

    }


    /* ================= NEXT AND PREVIOUS ================= */

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function previousSlide() {
        showSlide(currentIndex - 1);
    }


    /* ================= AUTOPLAY ================= */

    function startAutoplay() {

        stopAutoplay();

        autoplayTimer = setInterval(nextSlide, autoplayDelay);

    }

    function stopAutoplay() {

        if (autoplayTimer) {
            clearInterval(autoplayTimer);
        }

    }


    /* ================= BUTTON EVENTS ================= */

    nextButton.addEventListener("click", function () {
        nextSlide();
        startAutoplay();
    });

    previousButton.addEventListener("click", function () {
        previousSlide();
        startAutoplay();
    });


    /* ================= DOT EVENTS ================= */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showSlide(index);
            startAutoplay();
        });

    });


    /* ================= PAUSE ON HOVER ================= */

    slider.addEventListener("mouseenter", stopAutoplay);

    slider.addEventListener("mouseleave", startAutoplay);


    /* ================= KEYBOARD NAVIGATION ================= */

    slider.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {
            nextSlide();
            startAutoplay();
        }

        if (event.key === "ArrowLeft") {
            previousSlide();
            startAutoplay();
        }

    });


    /* ================= START SLIDER ================= */

    showSlide(0);
    startAutoplay();

});


/* =====================================================
   AMBASSADOR INFORMATION MODAL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("ambassadorInfoModal");
    const openButtons = document.querySelectorAll(".open-info-modal");
    const closeButton = document.getElementById("closeInfoModal");
    const backdrop = document.getElementById("modalBackdrop");

    if (!modal || !closeButton || !backdrop) return;

    let previousFocus = null;

    function openModal() {
        previousFocus = document.activeElement;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    openButtons.forEach(function (button) {
        button.addEventListener("click", openModal);
    });

    closeButton.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }
    });

});