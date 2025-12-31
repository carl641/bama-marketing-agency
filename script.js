/**
 * BMA Website Header JavaScript
 * Handles scroll behavior, mobile menu, and accordion functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================
  // Scroll Behavior
  // ===================================

  const mainNav = document.querySelector('.main-nav');
  const scrollThreshold = 100;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  };

  // Initial check on page load
  handleScroll();

  // Listen for scroll events with passive listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===================================
  // Mobile Menu Toggle
  // ===================================

  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const toggleMobileMenu = () => {
    const isActive = mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', isActive);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-contact-btn, .mobile-accordion-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ===================================
  // Mobile Accordion
  // ===================================

  const accordionHeaders = document.querySelectorAll('.mobile-accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.closest('.mobile-accordion');
      const isActive = accordion.classList.contains('active');

      // Close all accordions first (optional: for single-open behavior)
      // document.querySelectorAll('.mobile-accordion').forEach(acc => {
      //   acc.classList.remove('active');
      // });

      // Toggle current accordion
      if (!isActive) {
        accordion.classList.add('active');
      } else {
        accordion.classList.remove('active');
      }
    });
  });

  // ===================================
  // Close mobile menu on window resize (to desktop)
  // ===================================

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  window.addEventListener('resize', handleResize, { passive: true });

  // ===================================
  // Hero Scroll Indicator
  // ===================================

  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const hero = document.querySelector('.hero');
      const heroHeight = hero.offsetHeight;
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      });
    });
  }

  // ===================================
  // Keyboard navigation for dropdowns
  // ===================================

  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const panel = dropdown.querySelector('.dropdown-panel');
    const links = panel.querySelectorAll('.dropdown-link');

    // Open dropdown on Enter/Space
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdown.classList.toggle('keyboard-open');
      }
    });

    // Close on Escape
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('keyboard-open');
        trigger.focus();
      }
    });

    // Close when focus leaves dropdown
    dropdown.addEventListener('focusout', (e) => {
      if (!dropdown.contains(e.relatedTarget)) {
        dropdown.classList.remove('keyboard-open');
      }
    });
  });
});
