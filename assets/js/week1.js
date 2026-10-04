```javascript
/* =========================================================
   WEEK 1 ATTENDANCE
   Microsoft Learn Center - Adeleke University
   ========================================================= */


/* =========================
   HEADER MENU
   ========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 30px rgba(0,120,212,.10)";

    } else {

        header.style.boxShadow =
            "0 2px 15px rgba(0,0,0,.06)";

    }

});


const menuToggle =
    document.querySelector("#menuToggle");

const menuPanel =
    document.querySelector("#menuPanel");


menuToggle.addEventListener("click", () => {

    menuPanel.classList.toggle("active");

    const isOpen =
        menuPanel.classList.contains("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    const menuIcon =
        menuToggle.querySelector("i");


    if (isOpen) {

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

    } else {

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});


/* Close menu after clicking a link */

const menuLinks =
    document.querySelectorAll(".menu-panel a");


menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuPanel.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        const menuIcon =
            menuToggle.querySelector("i");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});


/* =========================
   LOCATION ELEMENTS
   ========================= */

const locationBtn =
    document.querySelector("#locationBtn");

const locationStatus =
    document.querySelector("#locationStatus");

const attendanceAction =
    document.querySelector("#attendanceAction");

const locationError =
    document.querySelector("#locationError");

const errorMessage =
    document.querySelector("#errorMessage");


/* =========================
   LOCATION REQUEST
   ========================= */

locationBtn.addEventListener("click", () => {

    /* Hide any previous error */

    locationError.style.display = "none";


    /* Check browser support */

    if (!navigator.geolocation) {

        showError(
            "Location services are not supported by this browser."
        );

        return;

    }


    /* Change button state */

    locationBtn.disabled = true;

    locationBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Checking Location...';


    /*
     * Request the student's current location.
     *
     * IMPORTANT:
     * The coordinates are NOT saved.
     * They are NOT sent anywhere.
     * They exist only temporarily inside this
     * JavaScript function.
     */

    navigator.geolocation.getCurrentPosition(

        function(position) {

            /* =========================
               LOCATION RECEIVED
               ========================= */

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const accuracy =
                position.coords.accuracy;


            /*
             * The coordinates are received here.
             *
             * Nothing is stored in:
             * - localStorage
             * - sessionStorage
             * - cookies
             * - Excel
             * - Microsoft Forms
             * - Power Automate
             * - any server
             */

            console.log(
                "Location received:",
                latitude,
                longitude
            );

            console.log(
                "Location accuracy:",
                accuracy + " metres"
            );


            /* =========================
               SUCCESS
               ========================= */

            locationBtn.style.display = "none";


            locationStatus.style.display = "flex";


            attendanceAction.style.display = "flex";

        },


        /* =========================
           LOCATION ERROR
           ========================= */

        function(error) {

            locationBtn.disabled = false;

            locationBtn.innerHTML =
                '<i class="fa-solid fa-location-dot"></i> Allow Location Access';


            switch (error.code) {

                case error.PERMISSION_DENIED:

                    showError(
                        "Location permission was denied. Please allow location access in your browser settings and try again."
                    );

                    break;


                case error.POSITION_UNAVAILABLE:

                    showError(
                        "Your location could not be determined. Please check that your device location service is enabled."
                    );

                    break;


                case error.TIMEOUT:

                    showError(
                        "The location request timed out. Please try again."
                    );

                    break;


                default:

                    showError(
                        "Unable to access your location. Please try again."
                    );

            }

        },


        /* =========================
           LOCATION OPTIONS
           ========================= */

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

});


/* =========================
   ERROR DISPLAY
   ========================= */

function showError(message) {

    locationError.style.display = "flex";

    errorMessage.textContent = message;

}
```
