# Implementation Plan: Hartawati Law Firm Site Completion

## Overview

Four-stream completion of the Hartawati Law Firm one-page marketing site (plain HTML + CSS + vanilla JS, `lang="id"`, no frameworks/build/npm). The site is partially built; this plan completes the remaining work across four stages:

- **Stage 4 — Structural fixes + cleanup.** The existing Stage 4 layout is a finished baseline; only document structure is corrected (move `#lawyer`/`#contact` inside `<main>`, delete the Demo Block and its second `<h1>`, remove orphaned demo CSS), all `box-shadow` is replaced with thin `1px solid var(--outline-variant)` borders, and the third hero stat is neutralized to "Fokus Penuh" with inline stat colors moved to CSS classes. No redesign.
- **Stage 5 — JavaScript.** `js/main.js` as a single IIFE (< ~100 lines, no dependencies): accessible mobile menu, smooth scroll with sticky-header offset, scroll-spy via `IntersectionObserver`, reveal fade-in — all reduced-motion-aware.
- **Stage 6 — Responsive / accessibility / SEO pass.** Targeted fixes (no redesign) at 375/768/1280px, heading order, WCAG AA contrast, `:focus-visible`, skip link, alt text, and `<head>` metadata.
- **Stage 7 — Final audit + reusable Checklist Artifact.** Verify every AGENTS.md hard rule, fix violations without adding features, and produce a durable `CHECKLIST.md` with a tickable hard-rules checklist and a complete `[Placeholder]` inventory.

## Tasks

- [ ] 1. Stage 4 — Structural fixes and cleanup (finished baseline; no redesign)
  - [ ] 1.1 Move `#lawyer` and `#contact` sections inside `<main>`
    - In `html/index.html`, cut the `#lawyer` `<section>` and `#contact` `<section>` (currently between `</main>` and `<footer>`) and paste them inside `<main>`, after the `#bidang-praktik` section. Final order inside `<main>`: `#hero`, `#tentang-kami`, `#bidang-praktik`, `#lawyer`, `#contact`.
    - Files: `html/index.html`
    - _Requirements: 1.2 — Design §2.1, §3.1.1 (steps 1–2) — Property 2_

  - [ ]* 1.2 Property test — lawyer and contact are main content
    - **Property 2: Lawyer and contact are main content** — for any parsed DOM, `#lawyer` and `#contact` SHALL each be descendants of `#main`.
    - **Validates: Requirements 1.2**

  - [ ] 1.3 Delete the Demo Block and its illegal second `<h1>`
    - Remove the entire `<div class="demo container" …> … </div>` block inside `<main>` (the Stage 1 "Foundation Styles" block containing the second `<h1>`, color swatches, typography, buttons, spacing, radius, reveal, and focus demo sections).
    - Files: `html/index.html`
    - _Requirements: 1.1, 1.3 — Design §2.1, §3.1.1 (step 3) — Properties 1, 3_

  - [ ]* 1.4 Property test — exactly one primary heading
    - **Property 1: Exactly one primary heading** — for any state of the document, the count of `<h1>` elements SHALL equal 1.
    - **Validates: Requirements 1.1, 9.1**

  - [ ]* 1.5 Property test — demo block is absent
    - **Property 3: Demo block is absent** — for any state of `index.html`, the Demo Block (containing the second `<h1>`) SHALL NOT be present.
    - **Validates: Requirements 1.3**

  - [ ] 1.6 Remove the orphaned demo CSS block
    - Delete the "11. DEMO PAGE STYLES" section in `css/style.css`: `.demo`, `.demo-section`, `.demo-grid`, `.demo-card`, `.demo-swatch`, `.demo-text`, `.button-group` and their descendant rules. No real markup references these once the Demo Block is gone.
    - Files: `css/style.css`
    - _Requirements: 1.4 — Design §2.2, §3.1.2 — Property 4_

  - [ ]* 1.7 Property test — orphaned demo CSS is absent
    - **Property 4: Orphaned demo CSS is absent** — no orphaned demo-specific selectors (`.demo`, `.demo-section`, `.demo-card`, `.demo-swatch`, `.demo-text`, `.button-group`) SHALL remain.
    - **Validates: Requirements 1.4**

  - [ ] 1.8 Replace every `box-shadow` with a `1px var(--outline-variant)` border
    - Remove `box-shadow` and add `border: 1px solid var(--outline-variant)` on `.hero-image`, `.stat-card`, `.about-image-main`, `.room-image`, `.lawyer-image`. On `.practice-card:hover` remove the shadow and change to `border-color: var(--primary-container)` (keep `transform: translateY(-4px)` if present). Verify zero `box-shadow` declarations remain in the file.
    - Files: `css/style.css`
    - _Requirements: 2.1, 2.2, 2.3 — Design §2.2, §3.1.2 (selector table) — Properties 5, 6_

  - [ ]* 1.9 Property test — no box-shadow anywhere
    - **Property 5: No box-shadow anywhere** — for any rule in `css/style.css`, the declaration SHALL NOT set `box-shadow`.
    - **Validates: Requirements 2.2**

  - [ ]* 1.10 Property test — specified surfaces use thin borders
    - **Property 6: Specified surfaces use thin borders** — hero image, stat cards, practice-card hover, about image, room images, and lawyer image SHALL apply a `1px solid var(--outline-variant)` border and SHALL NOT apply `box-shadow`.
    - **Validates: Requirements 2.1, 2.3**

  - [ ] 1.11 Neutralize the third hero stat and move inline stat colors to CSS classes
    - In `html/index.html`: change the third `.stat-value` text from `100%` to `Fokus Penuh` and remove its `style="color: var(--primary);"`; remove `style="color: var(--on-surface);"` from the second `.stat-value`; set the third `.stat-label` to `Fokus Penuh`. Add classes: second stat → `stat-value--on-surface`, third stat → `stat-value--accent`. In `css/style.css` add `.stat-value--on-surface { color: var(--on-surface); }` and `.stat-value--accent { color: var(--primary); }` near the `.stat-value` rule; the first stat keeps the default `--primary-container` color (no class, no inline style).
    - Files: `html/index.html`, `css/style.css`
    - _Requirements: 3.1, 3.2, 3.3, 3.4 — Design §3.1.1 (steps 4–5), §3.1.2 — Properties 7, 8_

  - [ ]* 1.12 Property test — third hero stat is neutral
    - **Property 7: Third hero stat is neutral** — the third stat card's value text SHALL equal "Fokus Penuh", SHALL NOT contain a numeric/percentage value, and SHALL NOT contain a promotional token.
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [ ]* 1.13 Property test — stat colors come from classes, not inline styles
    - **Property 8: Stat colors come from classes, not inline styles** — no hero stat-value element SHALL carry an inline `style` attribute setting color; any color SHALL be applied via a CSS class.
    - **Validates: Requirements 3.4**

  - [ ] 1.14 Checkpoint — verify Stage 4 structure and commit baseline
    - Ensure all tests pass, ask the user if questions arise. Verify exactly one `<h1>`, `#lawyer`/`#contact` inside `<main>`, no `.demo` markup, zero `box-shadow`, third stat is "Fokus Penuh" with no inline color. (Commit handled by the orchestrator.)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.2, 3.1, 3.4 — Properties 1–8_

- [ ] 2. Stage 5 — JavaScript (`js/main.js`, single IIFE, < ~100 lines, reduced-motion-aware)
  - [ ] 2.1 Implement the accessible mobile menu
    - In `js/main.js`, select `.mobile-menu-btn` and `#mobile-nav`. Implement `setMenu(open)`/`isOpen()`/`closeMenu()` that toggle the `hidden` attribute and set `aria-expanded` to `String(open)`. Wire: click toggles open state; close on nav-link click, Escape keydown (when open), `focusout` (when focus leaves the menu and is not going to the button), and `pointerdown` outside the menu and the button. All close handlers guard on `isOpen()`.
    - Files: `js/main.js`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7 — Design §3.2.2 (Mobile Menu) — Properties 9, 10_

  - [ ]* 2.2 Property test — mobile-menu state and aria-expanded agree
    - **Property 9: Mobile-menu state and aria-expanded agree** — for any activation of the hamburger button, the menu's open state SHALL toggle and the button's `aria-expanded` SHALL equal the string form of the open state.
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [ ]* 2.3 Property test — open menu closes on any close trigger
    - **Property 10: Open menu closes on any close trigger** — for any open menu, it SHALL close on nav-link activation, Escape keydown, focus leaving the menu (to a target outside menu+button), or pointerdown outside menu+button.
    - **Validates: Requirements 4.4, 4.5, 4.6, 4.7**

  - [ ] 2.4 Implement smooth scroll with sticky-header offset
    - Read `reducedMotion` once via `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. For every `a[href^="#"]`, `preventDefault`, find the target element, compute the header height via `getBoundingClientRect().height`, and call `window.scrollTo({ top: target.top + scrollY - headerHeight, behavior: reducedMotion ? 'auto' : 'smooth' })`. Early-return on `href="#"` or a missing target; also close the mobile menu on nav use.
    - Files: `js/main.js`
    - _Requirements: 5.1, 5.2 — Design §3.2.2 (Smooth Scroll) — Properties 11, 12_

  - [ ]* 2.5 Property test — smooth scroll lands below the sticky header
    - **Property 11: Smooth scroll lands below the sticky header** — for any in-page nav-link activation, the target section's top edge SHALL be positioned at or below the bottom of the sticky header (heading not hidden beneath the header).
    - **Validates: Requirements 5.1**

  - [ ]* 2.6 Property test — reduced motion disables animated scroll
    - **Property 12: Reduced motion disables animated scroll** — for any nav-link activation while reduced motion is active, the Site SHALL navigate without an animated smooth-scroll transition (instant).
    - **Validates: Requirements 5.2**

  - [ ] 2.7 Implement scroll-spy with IntersectionObserver
    - Observe `#hero`, `#tentang-kami`, `#bidang-praktik`, `#lawyer`, `#contact` with an `IntersectionObserver` (`rootMargin: '-40% 0px -50% 0px'`, `threshold: [0, 0.25, 0.5, 1]`). On each callback pick the highest-`intersectionRatio` entry; set `aria-current="page"` on the matching desktop nav link and remove it from all others. Guard `currentHash` to prevent flapping; ignore zero-ratio callbacks so no link is ever cleared.
    - Files: `js/main.js`
    - _Requirements: 6.1, 6.2, 6.3 — Design §3.2.2 (Scroll-Spy) — Property 13_

  - [ ]* 2.8 Property test — scroll-spy sets exactly one current link
    - **Property 13: Scroll-spy sets exactly one current link** — for any section that is the most visible in the viewport, exactly one nav link — the one targeting that section — SHALL carry `aria-current="page"`, and every other nav link SHALL NOT carry it.
    - **Validates: Requirements 6.1, 6.2**

  - [ ] 2.9 Implement reveal fade-in on scroll
    - Select `.reveal` elements. Under reduced motion, add `.active` to all immediately. Otherwise observe each with an `IntersectionObserver` (`threshold: 0.15`); add `.active` when intersecting, then `unobserve` so each fires once.
    - Files: `js/main.js`
    - _Requirements: 7.1, 7.2 — Design §3.2.2 (Reveal) — Properties 14, 15_

  - [ ]* 2.10 Property test — reveal elements activate on entry
    - **Property 14: Reveal elements activate on entry** — for any reveal element that enters the viewport, the Site SHALL add the `active` class to that element.
    - **Validates: Requirements 7.1**

  - [ ]* 2.11 Property test — reduced motion shows all reveal elements
    - **Property 15: Reduced motion shows all reveal elements** — for any reveal element while reduced motion is active, the element SHALL render fully visible (opacity 1) without applying a fade-in animation.
    - **Validates: Requirements 7.2**

  - [ ] 2.12 Checkpoint — verify Stage 5 JavaScript behaviors
    - Ensure all tests pass, ask the user if questions arise. Verify mobile-menu toggle/close on all triggers, smooth scroll offset, single `aria-current` on scroll-spy, reveal fade-in, and that all are instant/skipped under `prefers-reduced-motion: reduce`.
    - _Requirements: 4, 5, 6, 7 — Properties 9–15_

- [ ] 3. Stage 6 — Responsive, accessibility, and SEO pass (audit + targeted fixes, no redesign)
  - [ ] 3.1 Fix responsive layout at 375/768/1280px and tap-target sizing
    - Audit for horizontal scroll (`scrollWidth <= innerWidth`), readable type, and grid collapse at 375/768/1280px; fix overflow sources (fixed widths, large images, negative margins). Bump `.footer-social a` from 40×40 to 44×44. Confirm body text computed font size is ≥ 16px at all three breakpoints.
    - Files: `css/style.css`
    - _Requirements: 8.1, 8.2, 8.3 — Design §3.3 (steps 1–2) — Properties 16, 17, 18_

  - [ ]* 3.2 Property test — tap targets meet minimum size
    - **Property 16: Tap targets meet minimum size** — for any interactive element at 375/768/1280px, rendered width and height SHALL each be at least 44px.
    - **Validates: Requirements 8.2**

  - [ ]* 3.3 Property test — body text meets minimum size
    - **Property 17: Body text meets minimum size** — for any body-text element at 375/768/1280px, the computed font size SHALL be at least 16px.
    - **Validates: Requirements 8.3**

  - [ ]* 3.4 Property test — no horizontal scroll at breakpoints
    - **Property 18: No horizontal scroll at breakpoints** — for any viewport width of 375/768/1280px, the document SHALL NOT produce horizontal scrolling (`scrollWidth <= innerWidth`).
    - **Validates: Requirements 8.1**

  - [ ] 3.5 Verify and fix heading order
    - After Demo Block removal and `#lawyer`/`#contact` relocation, confirm document-order headings start at `h1` and never skip a level (`h1→h2→h3`, never `h1→h3`). Fix any skipped level by adjusting the heading tag, not by adding content.
    - Files: `html/index.html`
    - _Requirements: 9.1, 9.2 — Design §3.3 (step 3) — Properties 1, 19_

  - [ ]* 3.6 Property test — logical heading order
    - **Property 19: Logical heading order** — for any sequence of headings in document order, the Site SHALL contain exactly one `<h1>` and SHALL NOT skip a heading level (an `hN` SHALL NOT be followed by an `hM` where `M > N + 1`).
    - **Validates: Requirements 9.1, 9.2**

  - [ ] 3.7 Accessibility baseline — contrast, focus, skip link, alt text
    - Verify WCAG AA contrast for every text/background pair (≥ 4.5:1 normal, ≥ 3:1 large); bump any failing muted color toward `--on-surface-variant`. Confirm `:focus-visible` on every interactive element (add `.footer-social a`, `.practice-link`, `.contact-value a`, `.footer-section a` if missing). Confirm the skip link is the first focusable element and targets `#main`. Confirm every `<img>` has non-empty `alt`.
    - Files: `css/style.css`, `html/index.html`
    - _Requirements: 10.1, 10.2, 10.3, 10.4 — Design §3.3 (steps 4–6) — Properties 20, 21, 22, 23_

  - [ ]* 3.8 Property test — visible focus on every interactive element
    - **Property 20: Visible focus on every interactive element** — for any interactive element, the element SHALL present a visible `:focus-visible` state (non-transparent outline) when focused.
    - **Validates: Requirements 10.2**

  - [ ]* 3.9 Property test — skip link is first focusable
    - **Property 21: Skip link is first focusable** — for any focus traversal of the document, the first focusable element SHALL be the skip link whose `href` is `#main`.
    - **Validates: Requirements 10.3**

  - [ ]* 3.10 Property test — every image has alt text
    - **Property 22: Every image has alt text** — for any `<img>` element, the element SHALL have an `alt` attribute with non-empty text.
    - **Validates: Requirements 10.4**

  - [ ]* 3.11 Unit test — WCAG AA contrast for all text
    - **Property 23: WCAG AA contrast for all text** — for any visible text element, the contrast ratio of its color against its background SHALL meet WCAG AA (≥ 4.5:1 normal, ≥ 3:1 large). Example-based: compute the ratio per text/background pair.
    - **Validates: Requirements 10.1**

  - [ ] 3.12 Add and complete SEO and social metadata
    - In `<head>`: ensure a non-empty `<title>`, a meta description (placeholder content), `og:title`, `og:description`, `og:type="website"`, a local favicon link (local file under `/assets`; do not hotlink), and a canonical link with a placeholder URL. Fill any gaps; verify existing OG tags.
    - Files: `html/index.html` (and `assets/images/placeholders/favicon.svg` if a local favicon placeholder is needed)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5 — Design §3.3 (step 7) — Property 24_

  - [ ]* 3.13 Property test — required head metadata is present
    - **Property 24: Required head metadata is present** — `<head>` SHALL contain a non-empty `<title>`, meta description, Open Graph tags for title/description/type, a favicon link, and a canonical link whose URL carries a placeholder marker.
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**

  - [ ] 3.14 Checkpoint — verify Stage 6 responsive/a11y/SEO
    - Ensure all tests pass, ask the user if questions arise. Verify no horizontal scroll at 375/768/1280, tap targets ≥ 44px, body text ≥ 16px, logical heading order, AA contrast, visible focus, skip link first, all images have alt, and all head metadata present.
    - _Requirements: 8, 9, 10, 11 — Properties 16–24_

- [ ] 4. Stage 7 — Final audit and reusable Checklist Artifact
  - [ ] 4.1 Run the AGENTS.md hard-rules audit and fix violations (no new features)
    - Verify each hard rule: no frameworks/Tailwind/build/npm/icon-fonts; `/reference` untouched (`git diff --exit-code reference/`); no hotlinked images; all images local under `/assets`; no invented facts outside `[Placeholder]`; no promotional claims (`terbaik`, `pasti menang`, `100%`, percentage guarantees); all tokens from `:root` variables (no inline `style` for color/font/size/radius/spacing; no hard-coded hex outside `:root`). Fix any violation in place without adding features; report anything that would require a feature rather than implementing it.
    - Files: `html/index.html`, `css/style.css`, `js/main.js` (as needed)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9 — Design §3.4.1 — Properties 25, 26, 27, 28_

  - [ ]* 4.2 Property test — no banned frameworks or build tooling
    - **Property 25: No banned frameworks or build tooling** — for any project file, the Site SHALL NOT contain framework/Tailwind references, build-step configuration, npm manifests, or icon-font references.
    - **Validates: Requirements 12.1**

  - [ ]* 4.3 Property test — all images are local
    - **Property 26: All images are local** — for any image reference in the Site, the source SHALL resolve to a local file under `/assets` and SHALL NOT be a hotlinked external URL.
    - **Validates: Requirements 12.3, 12.4**

  - [ ]* 4.4 Property test — no promotional claims
    - **Property 27: No promotional claims** — for any visible text (outside `[Placeholder]` spans), the text SHALL NOT contain promotional tokens (`terbaik`, `pasti menang`, `100%`, or percentage guarantees).
    - **Validates: Requirements 12.6**

  - [ ]* 4.5 Property test — tokens sourced from root variables
    - **Property 28: Tokens sourced from root variables** — for any application of a color, font, size, radius, or spacing value, the Site SHALL source it from a `:root` CSS variable rather than a hard-coded value or inline style.
    - **Validates: Requirements 12.7**

  - [ ] 4.6 Produce the reusable Checklist Artifact
    - Create `d:\hartawati-law-firm\CHECKLIST.md` with two sections. Section A — tickable `- [ ]` hard-rules checklist, one item per AGENTS.md hard rule, each with a one-line "how to verify" note (use the checklist in Design §3.4.2 as the template). Section B — Placeholder Inventory table with `File | Line | Text` columns, one row per `[Placeholder]` occurrence, regenerated by grepping the project for `[Placeholder]`. Include re-run instructions (the grep command). This is a required, durable artifact (Req 13.4).
    - Files: `CHECKLIST.md` (new, workspace root)
    - _Requirements: 13.1, 13.2, 13.3, 13.4 — Design §3.4.2, §4.1 — Property 29_

  - [ ]* 4.7 Property test — placeholder inventory is complete
    - **Property 29: Placeholder inventory is complete** — for any `[Placeholder]` occurrence in the project, the Checklist Artifact's inventory SHALL contain exactly one matching row recording its file and line, and the row count SHALL equal the total count of `[Placeholder]` occurrences.
    - **Validates: Requirements 13.2**

  - [ ] 4.8 Checkpoint — Stage 7 audit complete
    - Ensure all tests pass, ask the user if questions arise. Confirm all hard-rules checklist items pass (or are fixed), the `CHECKLIST.md` exists with a complete Placeholder inventory, and the audit added no new features.
    - _Requirements: 12, 13 — Properties 25–29_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP. Core implementation tasks (no `*`) MUST be implemented.
- The project forbids npm dependencies and a build step (AGENTS.md hard rules). Property/unit tests should be implemented as standalone vanilla-JS test scripts (no test framework dependency), using hand-rolled generators and mocks for `IntersectionObserver`, `matchMedia`, and `window.scroll*` to keep them pure and fast (per Design §Testing Strategy).
- Each implementation task references specific requirements and correctness properties for traceability.
- Checkpoints ensure incremental validation after each stage; the orchestrator handles git commits.
- Stage 4 is explicitly NOT a redesign — only the structural fixes, shadow→border swap, and third-stat neutralization are in scope. Stage 7 adds NO new features — it only verifies and fixes hard-rule violations.
- All 29 correctness properties from the design are covered: properties 1–8 (Stage 4), 9–15 (Stage 5), 16–24 (Stage 6), 25–29 (Stage 7).
- All 13 requirements are covered: Req 1 (1.1–1.6), Req 2 (1.8–1.10), Req 3 (1.11–1.13), Req 4 (2.1–2.3), Req 5 (2.4–2.6), Req 6 (2.7–2.8), Req 7 (2.9–2.11), Req 8 (3.1–3.4), Req 9 (3.5–3.6), Req 10 (3.7–3.11), Req 11 (3.12–3.13), Req 12 (4.1–4.5), Req 13 (4.6–4.7).

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.3", "1.6"] },
    { "id": 2, "tasks": ["1.8"] },
    { "id": 3, "tasks": ["1.11"] },
    { "id": 4, "tasks": ["1.2", "1.4", "1.5", "1.7", "1.9", "1.10", "1.12", "1.13"] },
    { "id": 5, "tasks": ["2.1"] },
    { "id": 6, "tasks": ["2.4"] },
    { "id": 7, "tasks": ["2.7"] },
    { "id": 8, "tasks": ["2.9"] },
    { "id": 9, "tasks": ["2.2", "2.3", "2.5", "2.6", "2.8", "2.10", "2.11"] },
    { "id": 10, "tasks": ["3.1", "3.5"] },
    { "id": 11, "tasks": ["3.7"] },
    { "id": 12, "tasks": ["3.12"] },
    { "id": 13, "tasks": ["3.2", "3.3", "3.4", "3.6", "3.8", "3.9", "3.10", "3.11", "3.13"] },
    { "id": 14, "tasks": ["4.1"] },
    { "id": 15, "tasks": ["4.6"] },
    { "id": 16, "tasks": ["4.2", "4.3", "4.4", "4.5", "4.7"] }
  ]
}
```
