//theme toggle

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");

    if (htmlElement.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = " 🌙";
    }
  });
});
//hambugger display

const initApp = () => {
  const hamburgerBtn = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
    hamburgerBtn.classList.toggle("toggle-btn");
  };

  hamburgerBtn.addEventListener("click", toggleMenu);
  mobileMenu.addEventListener("click", toggleMenu);
};
document.addEventListener("DOMContentLoaded", initApp);
document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.getElementById("slides-container");
  const restaurantName = document.getElementById("restaurant-name");

  // Restaurant slides data
  const slides = [
    {
      image: "./base/images/meeting-1.jpg",
      alt: "Ethiopian chef preparing traditional food",
    },
    {
      image: "./base/images/get-togethers.jpg",
      alt: "Traditional Ethiopian injera with stews",
    },
    {
      image: "./base/images/cheese-kitfo.jpg",
      alt: "Ethiopian coffee ceremony",
    },
  ];

  // Typewriter effect for restaurant name
  function typeWriter(text, element, speed = 150) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
      if (i < text.length) {
        element.innerHTML =
          text.substring(0, i + 1) + '<span class="typewriter-cursor"></span>';
        i++;
        setTimeout(typing, speed);
      } else {
        element.innerHTML = text;
      }
    }

    typing();
  }

  function createSlides() {
    // Create two identical sets of slides
    [...slides, ...slides].forEach((slide, index) => {
      const slideElement = document.createElement("div");
      slideElement.className = `slide absolute inset-0 w-full h-full bg-cover bg-center ${
        index === 0 ? "opacity-100" : "opacity-0"
      }`;
      slideElement.style.backgroundImage = `url(${slide.image})`;
      slideElement.setAttribute("aria-label", slide.alt);
      slideElement.dataset.index = index % slides.length; // Track original index
      slidesContainer.appendChild(slideElement);
    });
  }

  // Infinite slide animation
  function animateSlidesInfinite() {
    const allSlides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    const totalSlides = slides.length;

    function slideToNext() {
      const nextIndex = (currentIndex + 1) % totalSlides;
      const realNextIndex =
        nextIndex + (currentIndex >= totalSlides ? totalSlides : 0);

      // Current slide slides out to left
      allSlides[currentIndex].classList.add("slide-out");
      allSlides[currentIndex].classList.remove("opacity-100");

      // Next slide slides in from right
      allSlides[realNextIndex].classList.add("slide-in", "opacity-100");
      allSlides[realNextIndex].classList.remove("opacity-0");

      // Reset animations after they complete
      setTimeout(() => {
        allSlides[currentIndex].classList.remove("slide-out");
        allSlides[realNextIndex].classList.remove("slide-in");

        // If we've reached the end of the first set, reset positions
        if (nextIndex === 0) {
          allSlides.forEach((slide, i) => {
            slide.classList.remove("opacity-100", "slide-in", "slide-out");
            slide.classList.add(i < totalSlides ? "opacity-0" : "opacity-0");
          });
          allSlides[0].classList.add("opacity-100");
          currentIndex = 0;
        } else {
          currentIndex = realNextIndex;
        }
      }, 1000);
    }

    // Start the infinite loop
    setInterval(slideToNext, 5000);
  }

  // Initialize effects
  createSlides();
  animateSlidesInfinite();
  typeWriter("Totot Ethiopian Traditional Restaurant", restaurantName);
});
