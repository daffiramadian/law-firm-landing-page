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

  // Hero line animation
  const heroLines = document.querySelectorAll('.hero-line');
  if (!reducedMotion && heroLines.length > 0) {
    heroLines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(30px)';
      line.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
      line.style.transitionDelay = `${index * 120}ms`;
      requestAnimationFrame(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      });
    });
  }

  // Fade-in on scroll with stagger
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const containers = new Set();
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.parentElement) containers.add(el.parentElement);
    });
    
    containers.forEach(container => {
        const reveals = container.querySelectorAll(':scope > .reveal');
        reveals.forEach((el, i) => {
            el.style.setProperty('--reveal-index', i.toString());
        });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // Practice rows: single active row controller, zero layout shift
  const practiceList = document.querySelector('.practice-list');
  const practiceRows = document.querySelectorAll('.practice-row');

  if (practiceList && practiceRows.length) {
    let activeRow = null;
    let leaveTimer = null;

    function activateRow(row) {
      if (activeRow === row) return;
      clearTimeout(leaveTimer);
      practiceRows.forEach(r => r.classList.remove('is-active'));
      row.classList.add('is-active');
      activeRow = row;
    }

    function deactivateAll() {
      practiceRows.forEach(r => r.classList.remove('is-active'));
      activeRow = null;
    }

    // Desktop only: hover-based activation
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      practiceRows.forEach(row => {
        row.addEventListener('pointerenter', () => activateRow(row));
      });

      practiceList.addEventListener('pointerleave', () => {
        leaveTimer = setTimeout(deactivateAll, 100);
      });

      // Keep row active if pointer moves to preview area
      practiceRows.forEach(row => {
        row.addEventListener('pointermove', (e) => {
          if (e.target.classList.contains('practice-row-preview')) {
            clearTimeout(leaveTimer);
          }
        });
      });
    }

    // Keyboard: focus-visible activates row, blur deactivates
    practiceRows.forEach(row => {
      row.addEventListener('focus', () => activateRow(row));
      row.addEventListener('blur', () => {
        if (!row.contains(document.activeElement)) {
          deactivateAll();
        }
      });
    });

    // Touch/mobile: no hover effects, just tap
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      practiceRows.forEach(row => {
        row.classList.add('is-active'); // Show all descriptions
      });
    }
  }

})();
