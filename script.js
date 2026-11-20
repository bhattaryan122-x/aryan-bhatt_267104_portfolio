// ==========================================================================
// script.js — Modern Digital Portfolio for Aryan Bhatt
// B.Tech CSE, Semester 3, JG University
// ==========================================================================

// --------------------------------------------------------------------------
// 1. Dark Mode Toggle with Icon and LocalStorage Persistence
// --------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const themeIcon = document.getElementById('theme-icon');

// Check saved theme from localStorage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeLabel) themeLabel.textContent = 'Light';
  if (themeIcon) themeIcon.innerHTML = '&#9728;'; // Sun icon
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Light' : 'Dark';
    }
    if (themeIcon) {
      themeIcon.innerHTML = isDark ? '&#9728;' : '&#9790;'; // Sun or Moon
    }

    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  });
}

// --------------------------------------------------------------------------
// 2. Mobile Navigation Hamburger Menu Toggle
// --------------------------------------------------------------------------
const menuToggleBtn = document.getElementById('menu-toggle');
const navLinksList = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

if (menuToggleBtn && navLinksList) {
  menuToggleBtn.addEventListener('click', function () {
    const isMenuOpen = navLinksList.classList.toggle('nav-open');
    menuToggleBtn.classList.toggle('menu-active');
    menuToggleBtn.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinksList.classList.remove('nav-open');
      menuToggleBtn.classList.remove('menu-active');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// --------------------------------------------------------------------------
// 3. Scroll Progress Indicator and Back-to-Top Button
// --------------------------------------------------------------------------
const scrollProgressBar = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Update top progress bar
  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrollPercent + '%';
    scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
  }

  // Toggle back to top floating button visibility
  if (backToTopBtn) {
    if (scrollTop > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  // ScrollSpy: highlight active nav link based on scroll position
  const sections = document.querySelectorAll('.section');
  sections.forEach(function (sec) {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollTop >= top && scrollTop < top + height) {
      navLinkItems.forEach(function (item) {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + id) {
          item.classList.add('active');
        }
      });
    }
  });
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// --------------------------------------------------------------------------
// 4. Scroll Reveal Animations (IntersectionObserver)
// --------------------------------------------------------------------------
const allSections = document.querySelectorAll('.section');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observerConfig = {
    root: null,
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerConfig);

  allSections.forEach(function (section) {
    section.classList.add('fade-in-section');
    scrollObserver.observe(section);
  });
} else {
  allSections.forEach(function (section) {
    section.classList.add('is-visible');
  });
}

// --------------------------------------------------------------------------
// 5. One-Click Email Copy to Clipboard Feature
// --------------------------------------------------------------------------
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyFeedback = document.getElementById('copy-feedback');
const copyBtnText = document.getElementById('copy-btn-text');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', function () {
    const emailToCopy = 'Aryanbhatt11@gmail.com';

    // Use modern navigator clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailToCopy).then(showCopiedFeedback);
    } else {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = emailToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      showCopiedFeedback();
    }
  });
}

function showCopiedFeedback() {
  if (copyBtnText) copyBtnText.textContent = 'Copied!';
  if (copyFeedback) copyFeedback.textContent = 'Email copied to clipboard!';
  
  setTimeout(function () {
    if (copyBtnText) copyBtnText.textContent = 'Copy';
    if (copyFeedback) copyFeedback.textContent = '';
  }, 2500);
}

// --------------------------------------------------------------------------
// 6. Interactive Modal Demo for Project 2 (Colour Changer & Live Text)
// --------------------------------------------------------------------------
const btnOpenDemo = document.getElementById('btn-open-demo');
const btnViewProject1 = document.getElementById('btn-view-project-1');
const projectModal = document.getElementById('project-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

const demoInput = document.getElementById('demo-input');
const demoEcho = document.getElementById('demo-echo');
const demoColorBtn = document.getElementById('demo-color-btn');
const demoHeading = document.getElementById('demo-heading');

// Modern vibrant color palette for colour changer demo
const demoColors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#9333ea', '#0d9488'];
let colorIndex = 0;

if (btnOpenDemo && projectModal) {
  btnOpenDemo.addEventListener('click', function () {
    projectModal.hidden = false;
    // Tiny timeout so CSS transition kicks in
    setTimeout(function () {
      projectModal.classList.add('open');
    }, 10);
  });
}

if (btnViewProject1) {
  btnViewProject1.addEventListener('click', function () {
    alert('Project 1 Specification:\n\nA comprehensive Registration Form built with semantic HTML and CSS.\nFeatures required-field validation for text, email, password, radio buttons, checkboxes, and drop-downs.');
  });
}

if (modalCloseBtn && projectModal) {
  modalCloseBtn.addEventListener('click', closeModal);

  // Close when clicking outside the card on the backdrop
  projectModal.addEventListener('click', function (e) {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  // Close when pressing the Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });
}

function closeModal() {
  if (!projectModal) return;
  projectModal.classList.remove('open');
  setTimeout(function () {
    projectModal.hidden = true;
  }, 220);
}

// Live text echo input event
if (demoInput && demoEcho) {
  demoInput.addEventListener('input', function () {
    const text = demoInput.value.trim();
    demoEcho.textContent = text ? text : '(your typing will appear here)';
  });
}

// Heading colour changer click event
if (demoColorBtn && demoHeading) {
  demoColorBtn.addEventListener('click', function () {
    colorIndex = (colorIndex + 1) % demoColors.length;
    demoHeading.style.color = demoColors[colorIndex];
  });
}

// --------------------------------------------------------------------------
// 7. Contact Form Validation with Dynamic Character Counter
// --------------------------------------------------------------------------
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formStatus = document.getElementById('form-status');
const charCounter = document.getElementById('char-counter');

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Real-time message character counter and validation
if (messageInput && charCounter) {
  messageInput.addEventListener('input', function () {
    const len = messageInput.value.length;
    charCounter.textContent = len + ' / 10 chars min';
    
    if (len >= 10) {
      charCounter.classList.add('valid');
      if (messageError) messageError.textContent = '';
    } else {
      charCounter.classList.remove('valid');
    }
  });
}

if (nameInput && nameError) {
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim() !== '') {
      nameError.textContent = '';
    }
  });
}

if (emailInput && emailError) {
  emailInput.addEventListener('input', function () {
    if (isValidEmail(emailInput.value.trim())) {
      emailError.textContent = '';
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let isFormValid = true;

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // 1. Name validation
    const nameVal = nameInput.value.trim();
    if (nameVal === '') {
      nameError.textContent = 'Please enter your name.';
      isFormValid = false;
    }

    // 2. Email validation
    const emailVal = emailInput.value.trim();
    if (emailVal === '') {
      emailError.textContent = 'Please enter your email address.';
      isFormValid = false;
    } else if (!isValidEmail(emailVal)) {
      emailError.textContent = 'Please enter a valid email address (e.g., name@example.com).';
      isFormValid = false;
    }

    // 3. Message validation (at least 10 chars)
    const messageVal = messageInput.value.trim();
    if (messageVal === '') {
      messageError.textContent = 'Please enter your message.';
      isFormValid = false;
    } else if (messageVal.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters long.';
      isFormValid = false;
    }

    // On success
    if (isFormValid) {
      formStatus.textContent = 'Thank you! Your message has been sent successfully.';
      formStatus.classList.add('success');
      contactForm.reset();
      if (charCounter) {
        charCounter.textContent = '0 / 10 chars min';
        charCounter.classList.remove('valid');
      }
    } else {
      formStatus.textContent = 'Please fix the errors above before submitting.';
      formStatus.classList.add('error');
    }
  });
}
