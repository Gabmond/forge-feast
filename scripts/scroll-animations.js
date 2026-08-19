const animatedSelectors = [
  '.split-layout__content',
  '.split-layout__media',
  '.section-heading',
  '.dish-card',
  '.benefit-card',
  '.split-layout-2__content',
  '.split-layout-2__media',
  '.gallery__item',
  '.testimonial-card',
  '.reservation-cta__content',
];

const animatedElements = document.querySelectorAll(animatedSelectors.join(', '));

// 2. Respect users who've asked their OS/browser for reduced motion.
//    If set, just show everything immediately instead of animating.
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  animatedElements.forEach((el) => el.classList.add('is-visible'));
} else {
  // 3. Add the "hidden/offset" starting state to each element.
  animatedElements.forEach((el) => el.classList.add('will-animate'));

  // 4. Watch each element; when it scrolls into view, reveal it.
  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop watching once it's animated in — no need to
          // re-trigger every time the user scrolls past it.
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // fire when ~15% of the element is visible
      rootMargin: '0px 0px -50px 0px', // trigger slightly before it's fully on-screen
    }
  );

  animatedElements.forEach((el) => revealOnScroll.observe(el));
}