/*==========================================================

MICROSOFT LEARN CENTER
WORD LEARNING PATH

==========================================================*/


/*==========================================================

SMOOTH SCROLL

==========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});


/*==========================================================

VIDEO PLAYER

==========================================================*/

const lessonButtons = document.querySelectorAll(".lesson-btn");
const wordVideo = document.getElementById("wordVideo");

lessonButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Get the YouTube video ID from the selected button
        const videoId = this.getAttribute("data-video");

        // Change the video on the right
        wordVideo.src = "https://www.youtube.com/embed/" + videoId;

        // Remove active state from all buttons
        lessonButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Make the selected lesson active
        this.classList.add("active");

    });

});


/*==========================================================

SHOW MORE LESSONS

==========================================================*/

const more=document.getElementById("moreLessons");

const showBtn=document.getElementById("showMoreBtn");


if(showBtn){

showBtn.addEventListener("click",()=>{

if(more.style.display==="none"){

more.style.display="block";

showBtn.innerHTML="Show Less Lessons";

}

else{

more.style.display="none";

showBtn.innerHTML="Show More Lessons";

}

});

}

/*==========================================================

HEADER SHADOW

==========================================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>30){

header.style.boxShadow="0 10px 35px rgba(0,0,0,.10)";

}

else{

header.style.boxShadow="0 2px 15px rgba(0,0,0,.08)";

}

});



/*==========================================================

SECTION FADE ANIMATION

==========================================================*/

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:0.15
});


sections.forEach(section=>{

section.style.opacity="0";

section.style.transform="translateY(50px)";

section.style.transition="all .8s ease";

observer.observe(section);

});



/*==========================================================

DOWNLOAD BUTTON EFFECT

==========================================================*/

const downloadButtons=document.querySelectorAll(".download-btn");

downloadButtons.forEach(button=>{

button.addEventListener("click",()=>{

button.style.transform="scale(.95)";

setTimeout(()=>{

button.style.transform="scale(1)";

},180);

});

});



/*==========================================================

START LEARNING BUTTON

==========================================================*/

const start=document.querySelector(".start-btn");

if(start){

start.addEventListener("mouseenter",()=>{

start.style.transform="translateY(-4px)";

});

start.addEventListener("mouseleave",()=>{

start.style.transform="translateY(0)";

});

}

/*==========================================================

ACTIVE NAVIGATION

==========================================================*/

const navLinks=document.querySelectorAll("nav a");

const pageSections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

let current="";

pageSections.forEach(section=>{

const top=section.offsetTop-120;

if(window.scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*==========================================================

PROJECT CARD ANIMATION

==========================================================*/

const projectCards=document.querySelectorAll(".project-card");

projectCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});


/*==========================================================

QUIZ CARD EFFECT

==========================================================*/

const quizCards=document.querySelectorAll(".quiz-card");

quizCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});


/*==========================================================

NEXT LEARNING PATH

==========================================================*/

const nextButton=document.querySelector(".next-btn");

if(nextButton){

nextButton.addEventListener("mouseenter",()=>{

nextButton.style.transform="translateY(-4px)";

});

nextButton.addEventListener("mouseleave",()=>{

nextButton.style.transform="translateY(0)";

});

}


/*==========================================================

PAGE LOADED

==========================================================*/

window.addEventListener("load",()=>{

document.body.style.opacity="1";

console.log(

"%cMicrosoft Learn Center - Word Learning Path",

"font-size:20px;color:#185ABD;font-weight:bold;"

);

});
