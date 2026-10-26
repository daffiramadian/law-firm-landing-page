# Hartawati Law Firm: Work Package 4 (WP4) Continuity Guide

> **Project State:**
> - **WP1 (Header & Visual Polish):** COMPLETED (`a16a7f8`)
> - **WP2 (Practice Areas Hover Bug):** COMPLETED (`b3c9fd4`)
> - **WP3 (Testimonials Marquee):** COMPLETED (`e661723`)
> - **Active Task:** **WP4: Navigation Expansion ("Alur" and "Testimoni")**
> - **Branch:** `master` (working tree clean)
> - **Stack Constraints:** Plain HTML, CSS, vanilla JS only. No npm dependencies, no frameworks. Do **not** move or restructure folders (`html/index.html` is served at `localhost:3000/html/`).

---

## 1. Copy-Paste Kickoff Prompt for the Next Agent

If starting a new session or switching agents, copy and paste this exact prompt:

```markdown
We are continuing the Round 2 upgrade for the Hartawati Law Firm website.

STATUS:
- WP1, WP2, and WP3 are COMPLETED and committed to git.
- The working tree is clean.
- Read AGENTS.md and WP4-CONTINUITY.md.
- Entry point is html/index.html (served at localhost:3000/html/). Do NOT move or rename folders. Plain HTML, CSS, vanilla JS only.

YOUR TASK (WP4: Navigation: add "Alur" and "Testimoni" without breaking it):
1. Rename section id="alur-penanganan" to id="alur" in html/index.html.
2. Update header navigation in html/index.html (.nav-desktop and .nav-mobile) to list all 7 sections matching DOM order with shortened clear Indonesian labels:
   1. Beranda (#hero)
   2. Tentang (#tentang-kami)
   3. Praktik (#bidang-praktik)
   4. Advokat (#lawyer)
   5. Alur (#alur)
   6. Testimoni (#testimoni)
   7. Kontak (#contact)
3. In header CTA, wrap text for responsive shortening:
   <span class="cta-full">Mulai Konsultasi</span><span class="cta-short">Konsultasi</span>
4. Implement responsive breakpoints in css/style.css:
   - 1440px+: standard desktop sizing, full CTA text.
   - 1100px - 1439px: compact single line (white-space: nowrap, font-size 12.5px, letter-spacing 0.06em, gap 1rem), CTA shows "Konsultasi". No wrapping or overlap!
   - Below 1100px: switch to hamburger menu. Mobile menu displays all 7 links + CTA with min-height 44px tap targets.
5. In js/main.js:
   - Ensure mobile menu closes on link click, Esc key, and outside click, with proper aria-expanded.
   - Enhance scroll-spy: ensure exactly one link has aria-current="true" at all times (including top of page -> #hero and bottom of page -> #contact).
   - Animated underline must follow all 7 sections seamlessly.
6. Stop after WP4, summarize what changed (files and why), test at 1100, 1200, 1280, 1366, 1440, 1920 px, and wait for my approval before WP5.
```

---

## 2. WP4 Detailed Specification

### 2.1 Real DOM Section Order
Inspect `html/index.html`. The actual DOM order of sections is:
1. `id="hero"` $\rightarrow$ **Beranda**
2. `id="tentang-kami"` $\rightarrow$ **Tentang** (shortened from "Tentang Kami")
3. `id="bidang-praktik"` $\rightarrow$ **Praktik** (shortened from "Bidang Praktik")
4. `id="lawyer"` $\rightarrow$ **Advokat** (shortened from "Profil Advokat")
5. `id="alur"` $\rightarrow$ **Alur** *(Note: change section ID from `alur-penanganan` to `alur` so `#alur` jumps correctly)*
6. `id="testimoni"` $\rightarrow$ **Testimoni**
7. `id="contact"` $\rightarrow$ **Kontak**

> **Important:** The prompt requires: *"Order the links to match the real DOM order of the sections. Inspect the page and determine the order; do not assume."* Both `.nav-desktop ul` and `.nav-mobile ul` must follow this exact 7-link sequence.

### 2.2 Header Markup Changes (`html/index.html`)

#### Desktop Navigation:
```html
<nav class="nav-desktop" aria-label="Main navigation">
  <ul>
    <li><a href="#hero" aria-current="page">Beranda</a></li>
    <li><a href="#tentang-kami">Tentang</a></li>
    <li><a href="#bidang-praktik">Praktik</a></li>
    <li><a href="#lawyer">Advokat</a></li>
    <li><a href="#alur">Alur</a></li>
    <li><a href="#testimoni">Testimoni</a></li>
    <li><a href="#contact">Kontak</a></li>
  </ul>
</nav>
```

#### Header CTA Button:
```html
<a href="#contact" class="btn-arrow btn-arrow--light header-cta" aria-label="Konsultasi awal">
  <span class="cta-full">Mulai Konsultasi</span>
  <span class="cta-short">Konsultasi</span>
  <span class="btn-arrow-icon" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
</a>
```

#### Mobile Navigation:
Update `.nav-mobile ul` with the identical 7 links, plus the mobile CTA.

---

### 2.3 CSS Responsive Rules (`css/style.css`)

#### 1. Breakpoint Shift to 1100px:
Currently, the media query switches at 768px. With 7 links, it must switch at **1100px** so the 7 links never wrap or collide with the wordmark/CTA on laptop screens:
```css
/* Show mobile hamburger below 1100px */
@media (max-width: 1099px) {
  .nav-desktop {
    display: none !important;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .header-cta {
    display: none; /* CTA is inside mobile menu */
  }
}

/* Desktop navigation active at 1100px and up */
@media (min-width: 1100px) {
  .mobile-menu-btn {
    display: none;
  }
  .nav-desktop {
    display: block;
  }
  .header-cta {
    display: inline-flex;
  }
}
```

#### 2. Compact Desktop Sizing (1100px – 1439px):
```css
@media (min-width: 1100px) and (max-width: 1439px) {
  .nav-desktop ul {
    gap: 1rem; /* Compact gap */
  }
  .nav-desktop a {
    font-size: 12.5px;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  /* Shorten CTA text */
  .header-cta .cta-full {
    display: none;
  }
  .header-cta .cta-short {
    display: inline;
  }
}

@media (min-width: 1440px) {
  .nav-desktop ul {
    gap: 1.75rem; /* Generous gap */
  }
  .nav-desktop a {
    font-size: 13px;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
  .header-cta .cta-full {
    display: inline;
  }
  .header-cta .cta-short {
    display: none;
  }
}
```

---

### 2.4 JavaScript Enhancements (`js/main.js`)

1. **Robust Scroll-Spy:**
   - Detect when at the top of the page (`window.pageYOffset < 100`) $\rightarrow$ set `#hero` active.
   - Detect when scrolled to the bottom of the page (`window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50`) $\rightarrow$ set `#contact` active.
   - Ensure strictly **one** link has `aria-current="true"` at any given moment.
2. **Mobile Menu Interactions:**
   - Close on link click (`navMobile.addEventListener('click', ...)`).
   - Close on `Escape` key.
   - Close on outside click (click on document when open).
   - Sync `aria-expanded="true|false"` on `.mobile-menu-btn`.

---

## 3. Acceptance Checklist for WP4
- [ ] No wrapping or text overlap at 1100px, 1200px, 1280px, 1366px, 1440px, and 1920px.
- [ ] Desktop nav links remain on a single line at all desktop widths.
- [ ] Header CTA shortens to "Konsultasi" between 1100px and 1439px, and shows "Mulai Konsultasi" at $\ge 1440$px.
- [ ] Below 1100px, hamburger button is visible; mobile menu contains all 7 links + CTA.
- [ ] Mobile menu closes on link click, Escape key, and backdrop click.
- [ ] Underline and `aria-current="true"` track all 7 sections as the user scrolls.
- [ ] Top boundary activates `Beranda`; bottom boundary activates `Kontak`.
- [ ] Clicking any nav link scrolls smoothly to the section with title visible below the header (using `--header-offset`).
