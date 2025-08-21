// Language toggle
function switchLang(lang) {
  document.querySelectorAll(".en").forEach(el => el.style.display = (lang==="en") ? "inline" : "none");
  document.querySelectorAll(".hi").forEach(el => el.style.display = (lang==="hi") ? "inline" : "none");
  document.getElementById("lang-en").classList.toggle("active", lang==="en");
  document.getElementById("lang-hi").classList.toggle("active", lang==="hi");
}

document.getElementById("lang-en").addEventListener("click", ()=>switchLang("en"));
document.getElementById("lang-hi").addEventListener("click", ()=>switchLang("hi"));
switchLang("en"); // default English

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger-menu');
const navLinksContainer = document.getElementById('nav-links-container');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Slideshow
const slides = [
  "https://res.cloudinary.com/odysseytraveller/image/fetch/f_auto,q_auto,dpr_auto,r_4,w_765,h_612,c_limit/https://cdn.odysseytraveller.com/app/uploads/2020/02/Amber-Fort.jpg",
  "https://images.shiksha.com/mediadata/images/1718622618phpGf6StU.jpeg",
  "https://thumbs.dreamstime.com/b/group-people-walking-large-building-blue-background-wearing-suits-carrying-briefcases-scene-busy-357965330.jpg"
];
let currentSlide = 0;
let slideshowTimer;
const hero = document.querySelector(".hero");

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  hero.style.backgroundImage = `url(${slides[currentSlide]})`;
  document.querySelectorAll(".dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function startSlideshow() {
    stopSlideshow(); // Clear any existing timer
    slideshowTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

function stopSlideshow() {
    clearInterval(slideshowTimer);
}

document.getElementById("prev").addEventListener("click", () => {
    showSlide(currentSlide - 1);
});
document.getElementById("next").addEventListener("click", () => {
    showSlide(currentSlide + 1);
});
document.getElementById("stop").addEventListener("click", () => {
    const stopButton = document.getElementById("stop");
    if (stopButton.textContent === "◼") {
        stopSlideshow();
        stopButton.textContent = "▶"; // Change to start icon
    } else {
        startSlideshow();
        stopButton.textContent = "◼"; // Change back to stop icon
    }
});
document.querySelectorAll(".dots span").forEach((dot,i)=>dot.addEventListener("click",()=>showSlide(i)));

showSlide(0);
startSlideshow();


// Countdown
const eventDate = new Date("Nov 27, 2025 09:00:00").getTime();
setInterval(()=>{
  const now = new Date().getTime();
  const diff = eventDate - now;
  if (diff > 0) {
    document.getElementById("days").textContent = Math.floor(diff/(1000*60*60*24));
    document.getElementById("hours").textContent = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    document.getElementById("minutes").textContent = Math.floor((diff%(1000*60*60))/(1000*60));
    document.getElementById("seconds").textContent = Math.floor((diff%(1000*60))/1000);
  }
},1000);

// Accordion
document.querySelectorAll(".accordion-header").forEach(header=>{
  header.addEventListener("click", ()=>{
    const body = header.nextElementSibling;
    body.style.display = (body.style.display==="block") ? "none":"block";
  });
});