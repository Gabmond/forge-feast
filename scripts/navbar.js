const navbar = document.querySelector('.navigation-bar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-content__link');

const navbarTop = navbar.offsetTop;

function updateStickyNavbar() {
  if (window.scrollY > navbarTop) {
    navbar.classList.add('navbar--sticky');
  } else {
    navbar.classList.remove('navbar--sticky');
  }
}

window.addEventListener('scroll', updateStickyNavbar);

updateStickyNavbar();

// Open or close the mobile navigation when the hamburger button is clicked.
menuToggle.addEventListener('click', () => {
  const menuIsOpen = navbar.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', menuIsOpen);
  menuToggle.setAttribute('aria-label', menuIsOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close the menu after a visitor chooses a navigation link.
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Close the mobile menu if the screen returns to the desktop layout.
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navbar.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }
});
