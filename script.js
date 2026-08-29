const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav-links");
const navLinks = document.querySelectorAll("#nav-links a");

function closeMenu() {
  nav.classList.remove("show");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(a => a.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  if (nav.classList.contains("show") && !nav.contains(e.target) && e.target !== menuBtn) {
    closeMenu();
  }
});

// Highlight the current section's nav link while scrolling
const sections = document.querySelectorAll("main section[id]");
const navMap = new Map();
navLinks.forEach(a => navMap.set(a.getAttribute("href").slice(1), a));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = navMap.get(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -45% 0px" });

sections.forEach(s => navObserver.observe(s));

// Reveal sections and cards as they scroll into view
const revealTargets = document.querySelectorAll("[data-reveal], [data-reveal-item]");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach(el => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));
}
