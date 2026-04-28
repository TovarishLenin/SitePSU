if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const navigationEntry = performance.getEntriesByType("navigation")[0];
const isReload = navigationEntry?.type === "reload";

const resetScrollToTop = () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

if (isReload) {
  resetScrollToTop();
}

window.addEventListener("pageshow", () => {
  if (isReload) {
    resetScrollToTop();
    requestAnimationFrame(resetScrollToTop);
  }
});

window.addEventListener("load", () => {
  if (isReload) {
    resetScrollToTop();
    setTimeout(resetScrollToTop, 0);
  }
});

window.addEventListener("beforeunload", () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  window.scrollTo(0, 0);
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const animatedItems = document.querySelectorAll(
  ".section, .highlight-card, .advantage-card, .review-card, .faq-item, .footer-brand, .footer-nav"
);

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

animatedItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
  observer.observe(item);
});
