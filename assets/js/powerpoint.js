```javascript
/* =========================================================
MICROSOFT POWERPOINT LEARNING PATH
ADELEKE UNIVERSITY MICROSOFT LEARN CENTER
========================================================= */


/* =========================================================
HEADER SHADOW
========================================================= */

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 30px rgba(0,0,0,.10)";

        } else {

            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,.06)";

        }

    });

}



/* =========================================================
SMOOTH SCROLLING
========================================================= */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);

internalLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length <= 1
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            15;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});



/* =========================================================
LEARNING PROGRESS ANIMATION
========================================================= */

const progressBar =
    document.querySelector(".powerpoint-progress");

if (progressBar) {

    const progressSection =
        document.querySelector(".progress-section");

    const progressObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        /*
                        Change this percentage when
                        the student's learning progress
                        changes.
                        */

                        progressBar.style.width = "0%";

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold:0.25
            }
        );

    if (progressSection) {

        progressObserver.observe(progressSection);

    }

}



/* =========================================================
PROJECT CARD ANIMATION
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition =
            "transform .35s ease, box-shadow .35s ease";

    });

});



/* =========================================================
VIDEO SECTION
========================================================= */

const videoIframe =
    document.querySelector(".video-player iframe");

if (videoIframe) {

    /*
    The YouTube video is loaded directly through
    the iframe in the HTML.

    JavaScript intentionally does not reload or
    control the iframe so that YouTube playback
    remains stable.
    */

    videoIframe.addEventListener("load", () => {

        videoIframe.style.opacity = "1";

    });

}



/* =========================================================
EXTERNAL LINKS
========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );

externalLinks.forEach(link => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});



/* =========================================================
CURRENT YEAR
========================================================= */

const footerYear =
    document.querySelector(".footer-bottom p");

if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    /*
    Keeps the footer year current while preserving
    the existing copyright text.
    */

    footerYear.innerHTML =
        footerYear.innerHTML.replace(
            /©\s*\d{4}/,
            `© ${currentYear}`
        );

}
```
