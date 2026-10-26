// Daffi Law Firm - Main JavaScript

(function() {
  'use strict';

  // DUMMY MODE visual outline trigger (?dummy)
  if (new URLSearchParams(window.location.search).has('dummy')) {
    document.documentElement.classList.add('show-dummy-outlines');
  }

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

  // Scroll-spy for nav (exactly one aria-current="true" at all times)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    const header = document.querySelector('header');
    const sectionMap = new Map();
    navLinks.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) sectionMap.set(id, el);
    });

    function setActive(id) {
      let oneActive = false;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        if (isActive) {
          link.setAttribute('aria-current', 'true');
          oneActive = true;
        } else {
          link.removeAttribute('aria-current');
        }
      });
      // Fallback: always keep exactly one active
      if (!oneActive && navLinks.length) {
        navLinks[0].setAttribute('aria-current', 'true');
      }
    }

    function onScroll() {
      if (!header) return;
      const headerHeight = header.offsetHeight;
      const scrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Bottom boundary -> last section (#contact)
      if (scrollY + winHeight >= docHeight - 1) {
        setActive('#contact'.slice(1));
        return;
      }

      // Find section whose top has passed the header line
      let activeId = null;
      let maxPassedTop = -Infinity;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        if (sectionTop <= scrollY + headerHeight + 50 && sectionTop > maxPassedTop) {
          maxPassedTop = sectionTop;
          activeId = section.id;
        }
      });

      // Top boundary -> #hero (first section)
      if (!activeId && sections.length) {
        activeId = sections[0].id;
      }

      setActive(activeId);
    }

    // Use IntersectionObserver as primary, scroll listener as boundary fallback
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => scrollObserver.observe(section));

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize active state on load
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

  // Testimonials Marquee
  const testimoniSection = document.getElementById('testimoni');
  const marqueeWrapper = document.querySelector('.testimoni-marquee-wrapper');
  const marqueeToggle = document.querySelector('.marquee-toggle');
  const marqueeTrack1 = document.querySelector('[data-track="1"]');
  const marqueeTrack2 = document.querySelector('[data-track="2"]');

  if (marqueeWrapper && marqueeTrack1 && marqueeTrack2) {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isReducedMotion) {
      // Clone cards for seamless loop
      function cloneTrack(track) {
        const cards = Array.from(track.children);
        cards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          clone.setAttribute('inert', '');
          track.appendChild(clone);
        });
      }

      cloneTrack(marqueeTrack1);
      cloneTrack(marqueeTrack2);

      // Calculate animation durations based on track width
      function setAnimationDurations() {
        const width1 = marqueeTrack1.offsetWidth / 2; // Half width (50% animation)
        const width2 = marqueeTrack2.offsetWidth / 2;
        const speed1 = 40; // px/s
        const speed2 = 30; // px/s
        const duration1 = (width1 / speed1).toFixed(2);
        const duration2 = (width2 / speed2).toFixed(2);
        marqueeWrapper.style.setProperty('--marquee-duration-1', `${duration1}s`);
        marqueeWrapper.style.setProperty('--marquee-duration-2', `${duration2}s`);
      }

      setAnimationDurations();
      window.addEventListener('resize', setAnimationDurations);

      // Pause on scroll out of view
      if ('IntersectionObserver' in window) {
        const observerOpts = { threshold: 0 };
        const pauseObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!marqueeWrapper.classList.contains('is-paused')) {
                marqueeTrack1.style.animationPlayState = 'running';
                marqueeTrack2.style.animationPlayState = 'running';
              }
            } else {
              marqueeTrack1.style.animationPlayState = 'paused';
              marqueeTrack2.style.animationPlayState = 'paused';
            }
          });
        }, observerOpts);
        pauseObserver.observe(testimoniSection);
      }

      // Play / Pause toggle
      if (marqueeToggle) {
        marqueeToggle.addEventListener('click', () => {
          const isPaused = marqueeToggle.getAttribute('aria-pressed') === 'true';
          marqueeWrapper.classList.toggle('is-paused');
          marqueeToggle.setAttribute('aria-pressed', String(!isPaused));

          // Toggle icon visibility
          const pauseIcon = marqueeToggle.querySelector('.marquee-toggle-icon--pause');
          const playIcon = marqueeToggle.querySelector('.marquee-toggle-icon--play');
          if (pauseIcon && playIcon) {
            pauseIcon.style.display = isPaused ? 'inline' : 'none';
            playIcon.style.display = isPaused ? 'none' : 'inline';
          }

          // Toggle label
          const label = marqueeToggle.querySelector('.marquee-toggle-text');
          if (label) label.textContent = isPaused ? 'Jeda' : 'Putar';
        });
      }
    } else {
      // Reduced motion: no cloning, no toggle button
      if (marqueeToggle) marqueeToggle.style.display = 'none';
    }
  }

})();
