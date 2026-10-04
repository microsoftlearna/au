```javascript
/* =========================================================
   MICROSOFT EXCEL EXPERT LEARNING PATH
   Adeleke University Microsoft Learn Center
   ========================================================= */


/* =========================================================
   LEARNING PROGRESS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const progressBar = document.querySelector(".excel-expert-progress");

    if (progressBar) {
        progressBar.style.width = "0%";
    }

});


/* =========================================================
   HEADER SHADOW ON SCROLL
   ========================================================= */

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 30px rgba(33,115,70,0.10)";

        } else {

            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,0.06)";

        }

    });

}


/* =========================================================
   PROJECT CARD ANIMATION
   ========================================================= */

const projectCards = document.querySelectorAll(".project-card");

if (projectCards.length > 0) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    projectCards.forEach(function (card) {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(card);

    });

}


/* =========================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
   ========================================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});
```

Save it exactly as:

`assets/js/excel-expert.js`

The HTML you already have loads it with:

```html
<script src="assets/js/excel-expert.js"></script>
```

The **Excel Expert page is now complete: HTML + CSS + JS**.
