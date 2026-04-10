const currentYear = document.getElementById("year");
const revealTargets = document.querySelectorAll(".reveal");
const interactiveCard = document.getElementById("interactive-card");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

if (interactiveCard && !prefersReducedMotion.matches) {
  const resetCard = () => {
    interactiveCard.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    interactiveCard.style.setProperty("--glow-x", "50%");
    interactiveCard.style.setProperty("--glow-y", "50%");
  };

  interactiveCard.addEventListener("pointermove", (event) => {
    const bounds = interactiveCard.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (relativeX - 0.5) * 8;
    const rotateX = (0.5 - relativeY) * 8;

    interactiveCard.style.transform =
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    interactiveCard.style.setProperty("--glow-x", `${(relativeX * 100).toFixed(2)}%`);
    interactiveCard.style.setProperty("--glow-y", `${(relativeY * 100).toFixed(2)}%`);
  });

  interactiveCard.addEventListener("pointerleave", resetCard);
  resetCard();
}
