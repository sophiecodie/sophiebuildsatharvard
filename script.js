const currentYear = document.getElementById("year");
const revealTargets = document.querySelectorAll(".reveal");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear().toString();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealTargets.forEach((target, index) => {
  target.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  observer.observe(target);
});
