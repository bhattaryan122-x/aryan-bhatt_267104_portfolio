// ==========================================================================
// script.js — Portfolio JavaScript for Aryan Bhatt
// B.Tech CSE, Semester 3, JG University
// ==========================================================================

// --------------------------------------------------------------------------
// 1. Dark Mode Toggle
// --------------------------------------------------------------------------
// Grab the toggle button and label elements from the DOM
const themeToggleBtn = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

// Check if user has a previously saved theme preference in localStorage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeLabel) {
    themeLabel.textContent = 'Light';
  }
}

// Listen for clicks on the dark mode toggle button using addEventListener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    // Toggle the dark-mode class on the body element
    document.body.classList.toggle('dark-mode');

    // Check if body now has dark-mode enabled
    const isDark = document.body.classList.contains('dark-mode');

    // Update the button text label
    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Light' : 'Dark';
    }

    // Save preference to localStorage so it persists across reloads
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  });
}

// --------------------------------------------------------------------------
// 2. Mobile Navigation Menu Toggle
// --------------------------------------------------------------------------
const menuToggleBtn = document.getElementById('menu-toggle');
const navLinksList = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

if (menuToggleBtn && navLinksList) {
  // Listen for clicks on the hamburger button
  menuToggleBtn.addEventListener('click', function () {
    const isMenuOpen = navLinksList.classList.toggle('nav-open');
    menuToggleBtn.classList.toggle('menu-active');

    // Keep aria-expanded attribute up to date for accessibility
    menuToggleBtn.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');
  });

  // Close the mobile menu when user clicks any of the section links
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinksList.classList.remove('nav-open');
      menuToggleBtn.classList.remove('menu-active');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// --------------------------------------------------------------------------
// 3. Scroll Reveal Animations (IntersectionObserver) & Hero Load Animation
// --------------------------------------------------------------------------
// Trigger entrance animation for hero section on page load
window.addEventListener('DOMContentLoaded', function () {
  const heroNameHeading = document.getElementById('hero-name');
  if (heroNameHeading) {
    heroNameHeading.classList.add('hero-animate');
  }
});

// Check if user has requested reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Select all major sections to reveal when scrolled into view
const allSections = document.querySelectorAll('.section');

// Use IntersectionObserver to fade-in sections as the user scrolls
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observerConfig = {
    root: null,
    threshold: 0.12
  };

  const scrollObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve once shown so it stays visible
        observer.unobserve(entry.target);
      }
    });
  }, observerConfig);

  allSections.forEach(function (section) {
    section.classList.add('fade-in-section');
    scrollObserver.observe(section);
  });
} else {
  // Fallback: make all sections visible if observer is unavailable or motion reduced
  allSections.forEach(function (section) {
    section.classList.add('is-visible');
  });
}
