/* ============================================================
   HARSHIT PORTFOLIO — script.js
   Matches: style.css + index.html
   Features:
   - Mobile nav toggle
   - Typing animation
   - Scroll fade-in reveal
   - Active nav highlight
   - Navbar background on scroll
   - Contact form validation
   - Smooth close mobile menu
   - Subtle parallax blobs
   ============================================================ */

/* ─────────────────────────────────────────────
   1. MOBILE NAVIGATION
───────────────────────────────────────────── */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  // Animate hamburger
  menuToggle.classList.toggle("active");

  const spans = menuToggle.querySelectorAll("span");

  if (menuToggle.classList.contains("active")) {
    spans[0].style.transform = "translateY(7px) rotate(45deg)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close menu when clicking nav links
navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");

    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});


/* ─────────────────────────────────────────────
   2. TYPING EFFECT
───────────────────────────────────────────── */
const typedText = document.getElementById("typedText");

const roles = [
  "Speaker",
  "Designer",
  "Creative Thinker",
  "Fast Learner",
  "Visual Storyteller"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 55 : 95);
}

typeEffect();


/* ─────────────────────────────────────────────
   3. SCROLL FADE-IN REVEAL
───────────────────────────────────────────── */
const fadeElements = document.querySelectorAll(".fade-in");

const revealOnScroll = () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ─────────────────────────────────────────────
   4. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────────── */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


/* ─────────────────────────────────────────────
   5. NAVBAR SCROLL EFFECT
───────────────────────────────────────────── */
const navHeader = document.querySelector(".nav-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navHeader.style.background = "rgba(12, 10, 24, 0.92)";
    navHeader.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
  } else {
    navHeader.style.background = "rgba(12, 10, 24, 0.75)";
    navHeader.style.boxShadow = "none";
  }
});


/* ─────────────────────────────────────────────
   6. CONTACT FORM
───────────────────────────────────────────── */
const submitBtn = document.getElementById("submitBtn");
const formNote = document.getElementById("formNote");

submitBtn.addEventListener("click", () => {
  const name = document.getElementById("formName").value.trim();
  const email = document.getElementById("formEmail").value.trim();
  const subject = document.getElementById("formSubject").value.trim();
  const message = document.getElementById("formMessage").value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    formNote.style.color = "#ff6b6b";
    formNote.textContent = "Please fill in all fields.";
    return;
  }

  // Email validation
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formNote.style.color = "#ff6b6b";
    formNote.textContent = "Please enter a valid email.";
    return;
  }

  // Success message
  formNote.style.color = "#5dffc2";
  formNote.textContent =
    "Message sent successfully! I'll get back to you soon.";

  // Reset form
  document.getElementById("formName").value = "";
  document.getElementById("formEmail").value = "";
  document.getElementById("formSubject").value = "";
  document.getElementById("formMessage").value = "";

  // Optional: console log
  console.log({
    name,
    email,
    subject,
    message
  });
});


/* ─────────────────────────────────────────────
   7. HERO PARALLAX EFFECT
───────────────────────────────────────────── */
const blobs = document.querySelectorAll(".hero-bg-blob");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 12;

    blob.style.transform = `
      translate(
        ${x * speed}px,
        ${y * speed}px
      )
    `;
  });
});


/* ─────────────────────────────────────────────
   8. BUTTON RIPPLE EFFECT
───────────────────────────────────────────── */
const buttons = document.querySelectorAll(".clay-btn");

buttons.forEach(button => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;

    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.25)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 600ms linear";
    ripple.style.pointerEvents = "none";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Inject ripple animation
const rippleStyle = document.createElement("style");

rippleStyle.textContent = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

document.head.appendChild(rippleStyle);


/* ─────────────────────────────────────────────
   9. SCROLL TO TOP SMOOTH BOOST
───────────────────────────────────────────── */
const backTop = document.querySelector(".back-top");

backTop.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* ─────────────────────────────────────────────
   10. SMALL ENTRANCE DELAY
───────────────────────────────────────────── */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
