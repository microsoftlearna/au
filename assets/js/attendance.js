```javascript id="j7q4kx"
/* =========================================================
   MICROSOFT LEARN CENTER
   ATTENDANCE PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MENU
========================================================= */

const menuToggle = document.querySelector("#menuToggle");
const menuPanel = document.querySelector("#menuPanel");

if (menuToggle && menuPanel) {

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


    /* Close menu when a link is clicked */

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

}


/* =========================================================
   HEADER SHADOW ON SCROLL
========================================================= */

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 30px rgba(0,120,212,.10)";

        } else {

            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,.06)";

        }

    });

}


/* =========================================================
   ATTENDANCE SELECTION
========================================================= */

const levelSelect =
    document.querySelector("#level");

const facultySelect =
    document.querySelector("#faculty");

const weekSelect =
    document.querySelector("#week");

const continueButton =
    document.querySelector("#continueAttendance");

const attendanceMessage =
    document.querySelector("#attendanceMessage");


/* =========================================================
   CURRENT ACTIVE WEEK
========================================================= */

/*
   IMPORTANT:

   Only change this number when you want to activate
   another attendance week.

   Week 1 = 1
   Week 2 = 2
   Week 3 = 3
   ...
   Week 20 = 20
*/

const ACTIVE_WEEK = 1;


/* =========================================================
   DISPLAY MESSAGE
========================================================= */

function showMessage(message, type) {

    if (!attendanceMessage) {
        return;
    }

    attendanceMessage.textContent = message;

    if (type === "error") {

        attendanceMessage.style.color = "#d13438";

    } else if (type === "success") {

        attendanceMessage.style.color = "#107c10";

    } else {

        attendanceMessage.style.color = "#666";

    }

}


/* =========================================================
   CLEAR MESSAGE WHEN SELECTION CHANGES
========================================================= */

if (levelSelect) {

    levelSelect.addEventListener("change", () => {

        showMessage("", "normal");

    });

}

if (facultySelect) {

    facultySelect.addEventListener("change", () => {

        showMessage("", "normal");

    });

}

if (weekSelect) {

    weekSelect.addEventListener("change", () => {

        showMessage("", "normal");

    });

}


/* =========================================================
   CONTINUE TO ATTENDANCE
========================================================= */

if (continueButton) {

    continueButton.addEventListener("click", () => {


        /* -----------------------------------------
           CHECK LEVEL
        ----------------------------------------- */

        if (!levelSelect.value) {

            showMessage(
                "Please select your level.",
                "error"
            );

            levelSelect.focus();

            return;
        }


        /* -----------------------------------------
           CHECK FACULTY
        ----------------------------------------- */

        if (!facultySelect.value) {

            showMessage(
                "Please select your faculty.",
                "error"
            );

            facultySelect.focus();

            return;
        }


        /* -----------------------------------------
           CHECK WEEK
        ----------------------------------------- */

        if (!weekSelect.value) {

            showMessage(
                "Please select an attendance week.",
                "error"
            );

            weekSelect.focus();

            return;
        }


        /* -----------------------------------------
           GET SELECTED WEEK
        ----------------------------------------- */

        const selectedWeek =
            parseInt(
                weekSelect.value.replace("week", ""),
                10
            );


        /* -----------------------------------------
           CHECK WHETHER WEEK IS ACTIVE
        ----------------------------------------- */

        if (selectedWeek !== ACTIVE_WEEK) {

            showMessage(
                "This attendance week is not currently active. Please select the active week.",
                "error"
            );

            return;
        }


        /* -----------------------------------------
           SAVE STUDENT SELECTION
        ----------------------------------------- */

        const selectedLevel =
            levelSelect.value;

        const selectedFaculty =
            facultySelect.value;


        /*
           Save the student's selections temporarily.

           These values can be used by week1.html
           later if needed.
        */

        sessionStorage.setItem(
            "attendanceLevel",
            selectedLevel
        );

        sessionStorage.setItem(
            "attendanceFaculty",
            selectedFaculty
        );

        sessionStorage.setItem(
            "attendanceWeek",
            selectedWeek
        );


        /* -----------------------------------------
           SUCCESS MESSAGE
        ----------------------------------------- */

        showMessage(
            "Week 1 attendance is active. Redirecting...",
            "success"
        );


        /* -----------------------------------------
           GO TO WEEK 1 PAGE
        ----------------------------------------- */

        setTimeout(() => {

            window.location.href =
                "week1.html";

        }, 700);

    });

}
```
