// Hartawati Law Firm - Main JavaScript

(function() {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav?.querySelectorAll('a');

  function closeMobileMenu() {
    if (!mobileNav) return;
    mobileNav.hidden = true;
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  menuBtn?.addEventListener('click', () => {
    if (!mobileNav) return;
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isOpen);
    mobileNav.hidden = isOpen;
  });

  mobileLinks?.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', (e) => {
    if (mobileNav?.hidden === false && !mobileNav.contains(e.target) && !menuBtn?.contains(e.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.hidden === false) {
      closeMobileMenu();
    }
  });

  // Smooth scroll with header offset
  if (!reducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        const target = document.getElementById(href.slice(1));
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      });
    });
  }

  // Scroll-spy for nav (IntersectionObserver approach)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    let currentSection = '';

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
          updateActiveLinks();
        }
      });
    }, observerOptions);

    sections.forEach(section => scrollObserver.observe(section));

    function updateActiveLinks() {
      navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.setAttribute('aria-current', 'true');
        }
      });
    }
  }

  // Header scroll state
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 20) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
    lastScroll = currentScroll;
  });

  // Fade-in on scroll
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  }

})();
