const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0.01
  }
);

sections.forEach((section) => observer.observe(section));

const words = [
  "IT-Sicherheit",
  "Consulting",
  "Digital Solutions",
  "Web & Innovation",
  "Future-Oriented Tech"
];

const typingEl = document.getElementById("typingText");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingEl) return;

  const currentWord = words[wordIndex];

  if (!deleting) {
    charIndex += 1;
    typingEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    typingEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = deleting ? 45 : 85;
  setTimeout(typeEffect, speed);
}

typeEffect();

const modal = document.getElementById("contactModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalButton = document.getElementById("closeModal");
const openButtons = [
  document.getElementById("openContactHero"),
  document.getElementById("openContactSection")
].filter(Boolean);

function openModal() {
  if (!modal) return;
  modal.classList.remove("closing");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.add("closing");
  modal.classList.remove("open");

  window.setTimeout(() => {
    modal.classList.remove("closing");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }, 320);
}

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeModal);
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

if (contactForm && feedback) {
  contactForm.addEventListener("submit", (event) => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    feedback.className = "form-feedback";

    if (!name || !email || !message) {
      event.preventDefault();
      feedback.textContent = "Bitte fülle alle Pflichtfelder aus.";
      feedback.classList.add("error");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      event.preventDefault();
      feedback.textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
      feedback.classList.add("error");
      return;
    }

    feedback.textContent = "Nachricht wird gesendet...";
    feedback.classList.add("success");
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const profileImage = document.querySelector(".profile-image");
if (profileImage) {
  profileImage.addEventListener("error", () => {
    const fallbackSvg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#dceaff"/>
            <stop offset="100%" stop-color="#b8d5ff"/>
          </linearGradient>
        </defs>
        <rect width="640" height="800" fill="url(#g)"/>
        <circle cx="320" cy="270" r="115" fill="#6aa7ff"/>
        <rect x="150" y="415" width="340" height="240" rx="70" fill="#2d69b6"/>
        <text x="320" y="730" fill="#0f2a4a" text-anchor="middle" font-family="Arial, sans-serif" font-size="36">Christian Hervé Nan-Nan</text>
      </svg>`
    );
    profileImage.src = `data:image/svg+xml;charset=utf-8,${fallbackSvg}`;
  });
}

function updateScrollEffects() {
  const progress = document.getElementById("scrollProgress");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progress) {
    progress.style.width = `${Math.min(100, percent)}%`;
  }

  const parallaxElements = document.querySelectorAll("[data-parallax]");
  parallaxElements.forEach((el) => {
    const speed = Number(el.getAttribute("data-parallax")) || 0;
    const offset = Math.max(-40, scrollTop * speed * -0.15);
    el.style.transform = `translateY(${offset}px)`;
  });

  const showcaseStage = document.getElementById("showcaseStage");
  const deviceFrame = document.getElementById("deviceFrame");
  if (showcaseStage && deviceFrame) {
    const rect = showcaseStage.getBoundingClientRect();
    const viewport = window.innerHeight;
    const visibleProgress = 1 - Math.min(1, Math.max(0, rect.top / viewport));
    const scale = 0.92 + visibleProgress * 0.08;
    const rotate = (0.5 - visibleProgress) * 7;
    const lift = (0.5 - visibleProgress) * 28;

    deviceFrame.style.transform = `translateY(${lift}px) rotateX(${rotate}deg) scale(${scale})`;
  }
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();

AOS.init({
  duration: 850,
  once: true,
  easing: "ease-out-cubic"
});
