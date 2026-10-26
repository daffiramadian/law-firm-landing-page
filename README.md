# Daffi Law Firm — Spec-Driven AI Engineering Showcase

> A modern, accessible, zero-dependency one-page marketing website for an Indonesian law firm, built through disciplined **Spec-Driven AI Engineering** and vanilla web technologies.

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla%20Variables-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?logo=javascript&logoColor=black)](#)
[![Dependencies](https://img.shields.io/badge/Dependencies-0%20(Zero)-success)](#)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA%20Compliant-blue)](#)
[![License](https://img.shields.io/badge/License-ISC-lightgrey)](#)

---

## 🎯 Project Overview & Philosophy

**Daffi Law Firm** is a showcase of high-craft web engineering and **disciplined "vibecoding"**. Instead of relying on bloated JavaScript frameworks, heavy CSS preprocessors, or complex node build chains, this site is crafted purely with:
- **Plain HTML5** (semantic structure, single `<h1>`, strict accessibility order)
- **Plain CSS3** (strict design tokens via `:root` CSS variables, mobile-first layouts, zero CSS libraries)
- **Vanilla JavaScript** (lightweight controllers for scroll-spy, responsive navigation, and accessible animations)

This repository serves as a case study demonstrating that AI coding assistants perform best when governed by strict architectural boundaries, explicit constraints (`AGENTS.md`), and modular work packages (WP1–WP6).

---

## 🏛️ Key Engineering Constraints

1. **Zero External Runtime Dependencies:** No npm packages, no Tailwind, no React, no jQuery, no icon fonts (all icons are pure inline SVG).
2. **Indonesian Advocate Ethics Compliance:** Strictly informational tone in Indonesian (`lang="id"`). Completely free of promotional superlatives (*"terbaik"*, *"pasti menang"*, *"garansi 100%"*), fake star ratings, or invented client outcome claims.
3. **Dummy Mode Architecture:** Fictional placeholder content is segregated with the `data-dummy` attribute and cataloged in [`DUMMY_CONTENT.md`](./DUMMY_CONTENT.md). Adding `?dummy` to the URL renders visible red-dashed outlines on all mock data for visual client review.
4. **Performance & Asset Budget:** All images are optimized WebP formats cropped to precise aspect ratios (4:5, 4:3, 3:4, 1:1), each weighing well under 150 KB.
5. **Accessibility (WCAG 2.1 AA):**
   - Visible `:focus-visible` ring across all interactive elements (`2px` outline with `3px` offset).
   - High-contrast color palette adhering to 4.5:1 text contrast ratios.
   - Full `prefers-reduced-motion` support (disables auto-play marquee, smooth scroll overrides, and entry stagger transitions).
   - WCAG 2.2.2 compliant play/pause control on moving content.

---

## ✨ Features & Architecture

### 1. Zero-Shift Practice Areas Controller
The *Bidang Praktik* (Practice Areas) section features interactive hover and keyboard navigation. Using CSS Grid rows and decoupled preview cards (`position: absolute; pointer-events: none;`), row expansion causes **0 layout shift (CLS: 0)**.

### 2. Dual-Row Opposite-Direction Testimonial Marquee
The *Testimoni* section features an infinite marquee animating two opposite-direction rows:
- **Row 1:** Scrolls left at 40px/s.
- **Row 2:** Scrolls right at 30px/s.
- Automatic duration calculation based on track width.
- Pauses smoothly on hover, on keyboard focus (`:focus-within`), when scrolled out of view (`IntersectionObserver`), or via the accessible toggle button (`Jeda` / `Putar`).
- When `prefers-reduced-motion` is enabled, the marquee gracefully degrades into a static, horizontal snap-scroll list.

### 3. Responsive 7-Section Navigation & Scroll-Spy
The fixed header automatically adapts across screen widths:
- **< 1100px:** Accessible hamburger menu drawer with outside-click and `Escape` dismiss.
- **1100px – 1439px:** Compact desktop layout (`12.5px` font, shortened `"Konsultasi"` CTA).
- **1440px+:** Full desktop layout with expanded letter-spacing and `"Mulai Konsultasi"` CTA.
- The scroll-spy tracks section boundaries and guarantees exactly one `aria-current="true"` state at all times.

---

## 📂 Project Directory Structure

```text
daffi-law-firm/
├── assets/
│   └── images/
│       ├── dummy/              # 19 royalty-free WebP/JPG images (<150KB)
│       │   └── CREDITS.md      # Full Unsplash image source licenses & IDs
│       └── placeholders/       # Aspect-ratio fallback SVG templates
├── css/
│   └── style.css               # Single source of style truth (:root tokens, no Tailwind)
├── docs/
│   ├── handoffs/               # Stage-by-stage AI continuity handoff briefs
│   ├── history/Plan.md         # Full project evolution and WP1-WP6 changelog
│   └── prompts/                # Reference upgrade prompts
├── js/
│   └── main.js                 # Vanilla JS controllers (IIFE, zero dependencies)
├── .editorconfig               # Consistent cross-editor formatting
├── .gitattributes              # Git line-ending normalization (LF)
├── .gitignore                  # Clean repository ignores
├── DUMMY_CONTENT.md            # Registry of all mock elements and replacement guidance
├── favicon.ico                 # Site favicon
├── index.html                  # Root entry point (production & GitHub Pages ready)
├── package.json                # Project manifest with quick-start script (0 dependencies)
└── README.md                   # Project documentation & engineering showcase
```

---

## 🚀 Quick Start & Local Preview

Because there is no build step or node dependency installation, you can preview the website instantly using any local HTTP static server:

```bash
# Option 1: Using npx serve (Node.js)
npx serve .

# Option 2: Using Python 3 built-in server
python -m http.server 3000

# Option 3: Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

Once running, visit:
- **Main Website:** `http://localhost:3000/`
- **Dummy Audit Mode:** `http://localhost:3000/?dummy` *(highlights all fictional content in red)*

---

## 🤖 The "Spec-Driven AI Engineering" Workflow

This project was built iteratively using AI agents governed by strict rules (`AGENTS.md`):

1. **Hard Rules Over Vibe Hints:** The agent system prompt enforced non-negotiable boundaries: zero npm packages, zero external icon fonts, no invented client facts, and no promotional claims.
2. **Phase Isolation:** Development was broken down into atomic Work Packages:
   - **WP1:** Header offset token normalization & visual badge polish.
   - **WP2:** Practice areas CSS grid refactor & keyboard controller.
   - **WP3:** Testimonials marquee implementation & WCAG 2.2.2 pause controls.
   - **WP4:** Navigation expansion to 7 sections & responsive 1100px breakpoint.
   - **WP5:** Dummy mode architecture, `DUMMY_CONTENT.md`, and Unsplash asset pipeline.
   - **WP6:** Final responsive QA across 8 viewports & repository cleanup.
3. **Auditability:** Every step left a verifiable paper trail in `docs/` and Git history, proving that AI-assisted code can be rigorous, maintainable, and pristine.

---

## 📄 License & Asset Credits

- **Code:** Licensed under the [ISC License](./package.json).
- **Photography:** All dummy photography in `assets/images/dummy/` is royalty-free under the [Unsplash License](https://unsplash.com/license). Complete photograph IDs, dimensions, and photographer attributions are documented in [`assets/images/dummy/CREDITS.md`](./assets/images/dummy/CREDITS.md).
