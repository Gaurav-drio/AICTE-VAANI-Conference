// Language toggle
function switchLang(lang) {
  document.querySelectorAll(".en").forEach(el => el.style.display = (lang==="en") ? "inline" : "none");
  document.querySelectorAll(".hi").forEach(el => el.style.display = (lang==="hi") ? "inline" : "none");
  document.getElementById("lang-en").classList.toggle("active", lang==="en");
  document.getElementById("lang-hi").classList.toggle("active", lang==="hi");
  
  // Update modal content immediately if it's open
  const modal = document.getElementById("popup-modal");
  if (modal.style.display === "block") {
     // The contentId is saved on the modal body when opened
     updateModalContent(modalBody.dataset.contentId);
  }
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

// ⭐ New code to close the menu on link click
const navLinks = document.querySelectorAll('#nav-links-container a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});

// Slideshow
const slides = [
  "https://res.cloudinary.com/odysseytraveller/image/fetch/f_auto,q_auto,dpr_auto,r_4,w_765,h_612,c_limit/https://cdn.odysseytraveller.com/app/uploads/2020/02/Amber-Fort.jpg",
  "https://images.shiksha.com/mediadata/images/1718622618phpGf6StU.jpeg",
  "https://qs-igauge.blr1.cdn.digitaloceanspaces.com/Campus_Poornima%20College%20of%20Engneering.png"
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

// -------------------------------------------------------------
// ⭐ UPDATED ACCORDION/POPUP LOGIC
// -------------------------------------------------------------

const modal = document.getElementById("popup-modal");
const closeBtn = document.querySelector(".close-btn");
const modalBody = document.querySelector(".modal-body");
const modalEnTitle = document.querySelector(".modal-en-title");
const modalHiTitle = document.querySelector(".modal-hi-title");


// Function to populate modal content and set titles
function updateModalContent(contentId) {
    const contentDiv = document.getElementById(contentId);
    if (!contentDiv) return;

    // Store ID in body for next language switch
    modalBody.dataset.contentId = contentId;
    
    // Get the hidden H4 title element inside the content div
    const hiddenTitle = contentDiv.querySelector('.hidden-tab-title');
    
    // Set both language titles for the modal header
    modalEnTitle.textContent = hiddenTitle.querySelector('.en').textContent.trim();
    modalHiTitle.textContent = hiddenTitle.querySelector('.hi').textContent.trim();
    
    // Get current language
    const currentLang = document.getElementById('lang-en').classList.contains('active') ? "en" : "hi";
    
    // Clear and reload body content (excluding the hidden title H4)
    modalBody.innerHTML = '';
    
    // Clone the content to insert into the modal
    const contentClone = contentDiv.cloneNode(true);

    // Remove the hidden title from the cloned content before inserting
    const titleToRemove = contentClone.querySelector('.hidden-tab-title');
    if (titleToRemove) {
        titleToRemove.remove();
    }
    
    // Append remaining children elements to modal body
    while (contentClone.firstChild) {
        modalBody.appendChild(contentClone.firstChild);
    }
    
    // Re-apply language switch to the modal body and the main title
    modalBody.querySelectorAll(".en").forEach(el => el.style.display = (currentLang==="en") ? "inline" : "none");
    modalBody.querySelectorAll(".hi").forEach(el => el.style.display = (currentLang==="hi") ? "inline" : "none");
    
    // Set display for the modal's primary title
    modalEnTitle.style.display = (currentLang === "en") ? "block" : "none";
    modalHiTitle.style.display = (currentLang === "hi") ? "block" : "none";
}

// Function to open modal
function openModal(contentId) {
    updateModalContent(contentId); // Load and format content
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

// Function to close modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = ''; // Restore scrolling
}

// Attach event listeners for tabs
document.querySelectorAll(".accordion-header").forEach(header=>{
  header.addEventListener("click", ()=>{
    const contentId = header.dataset.tab;
    const body = header.nextElementSibling;
    
    if (contentId && contentId !== 'none') {
        // This tab should open a modal
        openModal(contentId);
    } else {
        // This tab is one of the old ones (Accommodation/Venue) - use old accordion logic
        
        // Close all other open accordion bodies
        document.querySelectorAll(".accordion-body").forEach(item => {
            if (item !== body) {
                item.style.display = "none";
            }
        });
        
        // Toggle this specific accordion body
        body.style.display = (body.style.display==="block") ? "none":"block";
    }
  });
});

// Close modal when X is clicked
closeBtn.addEventListener("click", closeModal);

// Close modal when user clicks anywhere outside of the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal when ESC key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});