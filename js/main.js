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

  // Scroll-spy for nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveNav() {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const scrollPos = window.pageYOffset + headerHeight + 100;

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${current}`) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

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
