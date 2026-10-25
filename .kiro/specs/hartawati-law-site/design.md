# Design Document — Hartawati Law Firm Site Completion

## Overview

This design covers the remaining work to complete the Hartawati Law Firm one-page marketing website (`lang="id"`). The Site is plain HTML + CSS + vanilla JavaScript — no frameworks, no Tailwind, no build step, no npm, no icon fonts. All design tokens live as CSS variables in `:root` in `css/style.css`.

Stages 0–3 are committed (foundation CSS, header + hero, about + practice areas). Stage 4 (lawyer profile, contact, footer) is implemented but uncommitted and contains two structural defects: the `#lawyer` and `#contact` sections sit outside `<main>`, and a leftover Stage 1 "Foundation Styles" Demo Block remains inside `<main>` (including an illegal second `<h1>`). `js/main.js` is a placeholder and needs the full Stage 5 implementation.

The remaining work is four streams:

- **Stage 4 — Structural fixes + commit.** The existing Stage 4 layout, spacing, and copy are a finished baseline. Only document structure is corrected (move sections into `<main>`, delete the Demo Block and its second `<h1>`), all `box-shadow` rules are replaced with thin `1px solid var(--outline-variant)` borders, the third hero stat is neutralized to "Fokus Penuh" with no percentage, and inline stat colors move to CSS classes. No redesign.
- **Stage 5 — JavaScript.** Accessible mobile menu, smooth scroll with sticky-header offset, scroll-spy via `IntersectionObserver`, fade-in on scroll, all reduced-motion-aware. Kept under ~100 lines.
- **Stage 6 — Responsive / accessibility / SEO pass.** Fix breakpoints, tap targets, heading order, contrast, focus, alt text; add `<title>`, meta description, Open Graph, favicon, canonical.
- **Stage 7 — Final audit + reusable Checklist Artifact.** Verify every AGENTS.md Hard Rule, fix violations, and produce a durable, re-runnable checklist file plus a complete `[Placeholder]` inventory.

### Design Constraints (from AGENTS.md Hard Rules)

- No frameworks, Tailwind, build step, npm, or icon fonts.
- `/reference` is read-only.
- No hotlinked images; all images are local files under `/assets`.
- No invented facts; placeholders are prefixed with `[Placeholder]`.
- No promotional claims (`terbaik`, `pasti menang`, `100%`, percentage guarantees). Informational tone only.
- All colors/fonts/sizes/radii/spacing are `:root` CSS variables; no hard-coded values or inline styles.

### Locked Design Decisions (Clarify phase)

- Stage 4 is a **finished baseline** — structural fixes only, no redesign.
- **All** `box-shadow` is removed and replaced with `1px solid var(--outline-variant)`.
- "100% Fokus" → "Fokus Penuh" (no percentage); inline `style="color: ..."` on stat values → CSS classes.
- Stage 7 produces a **reusable Checklist Artifact** (durable file), not a one-off summary.

---

## Architecture

### 2.1 Section-by-Section Map of Final `index.html`

Current (defective) structure: `<main>` closes immediately after the Demo Block; `#lawyer` and `#contact` are orphaned between `</main>` and `<footer>`.

Final structure after Stage 4 fixes:

```
<body>
  <a class="skip-link" href="#main">Skip to main content</a>   ← first focusable element
  <header> ... sticky header ... </header>
  <main id="main">
    <section id="hero"> ... </section>
    <section id="tentang-kami"> ... </section>
    <section id="bidang-praktik"> ... </section>
    <!-- Demo Block: REMOVED (incl. second <h1>) -->
    <section id="lawyer"> ... </section>      ← moved INSIDE main
    <section id="contact"> ... </section>    ← moved INSIDE main
  </main>
  <footer> ... </footer>
  <script src="js/main.js"></script>
</body>
```

Net effect: exactly one `<h1>` (the hero headline), `#lawyer` and `#contact` become descendants of `#main`, and the Demo Block is gone.

### 2.2 Work-Stream Data Flow

**Stage 4 (HTML + CSS edits, no new behavior):**
- `html/index.html`: move two `<section>`s inside `<main>`; delete the Demo Block `<div class="demo container">…</div>` (which contains the illegal second `<h1>`); change the third `.stat-value` text from `100%` to `Fokus Penuh` and remove its `style` attribute; remove inline `style="color: var(--on-surface)"` from the second stat value and `style="color: var(--primary)"` from the third; add neutral CSS classes for stat colors.
- `css/style.css`: delete every `box-shadow` declaration; replace each removed shadow with `border: 1px solid var(--outline-variant)` on the relevant selectors; delete the orphaned demo CSS block (`.demo`, `.demo-section`, `.demo-card`, `.demo-swatch`, `.demo-text`, `.button-group`); add `.stat-value--on-surface` and `.stat-value--accent` classes; remove inline color styles (markup-side).

**Stage 5 (`js/main.js`, single IIFE, no dependencies):**
- One module scope. Selects the hamburger button, mobile nav, header, nav links, reveal elements, and sections.
- Four cohesive subsystems sharing the same scope: **Mobile Menu**, **Smooth Scroll**, **Scroll-Spy**, **Reveal**. All read a single `reducedMotion` boolean at load time and branch on it.
- Pure DOM querying + event listeners; no global state leaked; no libraries; < ~100 lines.

**Stage 6 (pass over existing files):**
- Audit + targeted fixes only (no redesign): responsive breakpoints, tap-target sizing, heading-order, contrast, `:focus-visible`, alt text; add the `<head>` metadata tags.

**Stage 7 (audit + artifact):**
- A scripted/inspectable audit verifying each AGENTS.md Hard Rule; fixes any violation without adding features.
- Produces a durable **Checklist Artifact** file (Markdown) with a tickable hard-rules checklist and a complete `[Placeholder]` inventory (file + line + text), re-runnable after content changes.

---

## Components and Interfaces

### 3.1 Stage 4 — Exact Edits

#### 3.1.1 HTML structural edits (`html/index.html`)

1. **Move `#lawyer` inside `<main>`.** The `</main>` tag currently appears after the Demo Block. Cut the `#lawyer` `<section>` and paste it inside `<main>`, after the practice-areas section (and where the Demo Block was).
2. **Move `#contact` inside `<main>`.** Same treatment — paste after `#lawyer`.
3. **Delete the Demo Block.** Remove the entire `<div class="demo container" …> … </div>` block, which includes the illegal second `<h1>`. This is the only second `<h1>`.
4. **Third hero stat → neutral.** Replace:
   ```html
   <span class="stat-value" style="color: var(--primary);">100%</span>
   <span class="stat-label">Fokus</span>
   ```
   with:
   ```html
   <span class="stat-value stat-value--accent">Fokus Penuh</span>
   <span class="stat-label">Fokus Penuh</span>
   ```
   (The label stays "Fokus Penuh" too, or simply "Fokus" — either is acceptable; the value text must be exactly "Fokus Penuh" per Req 3.1. The key: no numeric/percentage value and no inline color.)
5. **Remove inline color from second stat value.** Replace `style="color: var(--on-surface);"` on the second `.stat-value` with class `stat-value--on-surface`:
   ```html
   <span class="stat-value stat-value--on-surface">000+</span>
   ```
   The first stat value keeps the default `--primary-container` color (no class / no inline style needed).

#### 3.1.2 CSS edits (`css/style.css`)

**Remove every `box-shadow` declaration** (currently appears on `.hero-image`, `.stat-card`, `.about-image-main`, `.room-image`, `.practice-card:hover`, `.lawyer-image`), and replace each with a thin border:

| Selector | Remove | Add |
|---|---|---|
| `.hero-image` | `box-shadow: 0 1px 4px rgba(0,0,0,0.06);` | `border: 1px solid var(--outline-variant);` |
| `.stat-card` | `box-shadow: 0 1px 3px rgba(0,0,0,0.04);` | `border: 1px solid var(--outline-variant);` |
| `.about-image-main` | `box-shadow: 0 1px 4px rgba(0,0,0,0.06);` | `border: 1px solid var(--outline-variant);` |
| `.room-image` | `box-shadow: 0 1px 3px rgba(0,0,0,0.04);` | `border: 1px solid var(--outline-variant);` |
| `.practice-card:hover` | `transform: translateY(-4px); box-shadow: 0 4px 20px rgba(0,0,0,0.04);` | `border-color: var(--primary-container);` (keep `transform: translateY(-4px);` optional, but no shadow; the hover state's separation is the border color change) |
| `.lawyer-image` | `box-shadow: 0 1px 4px rgba(0,0,0,0.06);` | `border: 1px solid var(--outline-variant);` |

`.practice-card` already has `border: 1px solid var(--outline-variant)`; its hover only changes `border-color` (no new shadow). `.value-card` and `.contact-row` already use borders and have no shadow — leave as-is.

**Delete the orphaned demo CSS block** (Section "11. DEMO PAGE STYLES" in `style.css`): `.demo`, `.demo-section`, `.demo-grid`, `.demo-card`, `.demo-swatch`, `.demo-text`, `.button-group` and their descendant rules.

**Add stat-value color classes** (near the `.stat-value` rule):

```css
.stat-value--on-surface { color: var(--on-surface); }
.stat-value--accent     { color: var(--primary); }   /* or --primary-container; keep one accent */
```

Default `.stat-value` color remains `var(--primary-container)` (no inline style anywhere).

#### 3.1.3 Commit

After the above edits, commit Stage 4 as a clean baseline (the parent orchestrator handles git; this design only specifies the edits).

---

### 3.2 Stage 5 — `js/main.js`

Single IIFE, no dependencies, < ~100 lines. Reads reduced-motion once at load.

#### 3.2.1 Module structure

```js
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Mobile Menu ----
  // selectors + setMenu(open) + toggle/close handlers

  // ---- Smooth Scroll with sticky-header offset ----
  // intercept in-page links; compute header height; window.scrollTo with offset

  // ---- Scroll-Spy (IntersectionObserver) ----
  // observe sections; set aria-current on the most-visible section's link

  // ---- Reveal on scroll (IntersectionObserver) ----
  // observe .reveal; add .active when intersecting; unobserve after

})();
```

#### 3.2.2 Function signatures & logic (pseudocode)

**Mobile Menu**

```js
const menuBtn   = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

function setMenu(open) {
  mobileNav.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
}
function isOpen() { return !mobileNav.hidden; }
function closeMenu() { setMenu(false); }

menuBtn.addEventListener('click', () => setMenu(!isOpen()));      // 4.1 toggle, 4.2 sync aria-expanded

// 4.4 close on nav-link activation
mobileNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', closeMenu));

// 4.5 close on Escape (only when open)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isOpen()) closeMenu();
});

// 4.6 close when focus leaves the menu (and is not going to the button)
mobileNav.addEventListener('focusout', e => {
  const next = e.relatedTarget;
  if (next && next !== menuBtn && !mobileNav.contains(next)) closeMenu();
});

// 4.7 close on pointerdown outside the menu and the button
document.addEventListener('pointerdown', e => {
  if (isOpen() && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});
```

Notes: opening uses the `hidden` attribute (already present in markup). `aria-expanded` is always the string form of the open state, satisfying 4.2/4.3. The toggle handler is the only opener; all other handlers only close.

**Smooth Scroll with sticky-header offset**

```js
const header = document.querySelector('header');
const headerOffset = () => header ? header.getBoundingClientRect().height : 0;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;        // skip "#"
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    closeMenu();                                  // also closes mobile menu on nav use
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
});
```

Interaction with existing CSS: `css/style.css` already declares `html { scroll-behavior: smooth }` (and `auto` under `prefers-reduced-motion`). We use **`window.scrollTo` with a computed offset** rather than `scrollIntoView`, because it gives precise control over the sticky-header offset and lets the JS pass an explicit `behavior` that honors reduced motion at the call site. The CSS `scroll-behavior` becomes a harmless fallback for any non-intercepted anchor navigation; no change needed. (Alternative: add `scroll-margin-top: var(--header-height)` to sections and use `scrollIntoView`; not chosen because the header height is dynamic and an explicit JS offset is clearer and testable. The existing CSS rule may be kept or removed; leaving it does not violate requirements.)

**Scroll-Spy (IntersectionObserver)**

```js
const navLinks = Array.from(document.querySelectorAll('.nav-desktop a[href^="#"]'));
const linkByHash = new Map(navLinks.map(a => [a.getAttribute('href'), a]));
const sectionIds = ['hero', 'tentang-kami', 'bidang-praktik', 'lawyer', 'contact'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

let currentHash = null;
const spy = new IntersectionObserver(entries => {
  let best = null;
  for (const en of entries) {
    if (!best || en.intersectionRatio > best.intersectionRatio) best = en;
  }
  if (!best || best.intersectionRatio === 0) return;
  const hash = '#' + best.target.id;
  if (hash === currentHash) return;              // no flapping
  currentHash = hash;
  navLinks.forEach(a => a.removeAttribute('aria-current'));
  const link = linkByHash.get(hash);
  if (link) link.setAttribute('aria-current', 'page');
}, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] });

sections.forEach(s => spy.observe(s));
```

Strategy: `rootMargin` shrinks the observation band to the viewport middle so the "most-visible" section is the one crossing the vertical center; `threshold` array gives ratio updates. On each callback, the entry with the highest `intersectionRatio` wins; exactly one nav link gets `aria-current="page"`, all others lose it. Only desktop nav links are spy targets (mobile menu is transient). Uses `IntersectionObserver` per Req 6.3.

**Reveal on scroll (IntersectionObserver)**

```js
const reveals = document.querySelectorAll('.reveal');
if (reducedMotion) {
  reveals.forEach(r => r.classList.add('active'));   // 7.2 fully visible, no animation
} else {
  const ro = new IntersectionObserver((entries, obs) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        en.target.classList.add('active');           // 7.1 add .active
        obs.unobserve(en.target);                     // fire once
      }
    }
  }, { threshold: 0.15 });
  reveals.forEach(r => ro.observe(r));
}
```

Reduced-motion guard: under `prefers-reduced-motion: reduce`, all `.reveal` elements get `.active` immediately (CSS already forces `opacity:1; transform:none` for `.reveal` under reduced motion, so this is belt-and-suspenders). Under normal motion, each element gains `.active` once when ~15% visible, then is unobserved.

**Total:** the four subsystems above total ~80 lines including comments, staying under the ~100-line target.

---

### 3.3 Stage 6 — Responsive / Accessibility / SEO Pass

Checks performed (audit + targeted fixes, no redesign):

1. **Responsive breakpoints.** Verify at 375px / 768px / 1280px: no horizontal scroll (`document.scrollWidth <= innerWidth`), readable type, grids collapse correctly. Fix overflow sources (fixed widths, large images, negative margins).
2. **Tap targets ≥ 44px.** Every interactive element (`a`, `button`, nav links, social icons, CTA) renders ≥ 44×44px at all three breakpoints. The `.footer-social a` is currently 40×40 — bump to 44×44. The mobile menu button is already 44×44.
3. **Heading-order audit.** Document-order headings start at `h1`, never skip a level (`h1→h2→h3`, never `h1→h3`). Verify after the second `<h1>` is removed and `#lawyer`/`#contact` are inside `<main>`.
4. **Contrast audit (WCAG AA).** Check each text/background pair: ≥ 4.5:1 for normal text, ≥ 3:1 for large text. The palette tokens (`--on-surface` `#201b17` on `--surface` `#fff8f5`, `--on-surface-variant` `#51443c` on light surfaces, `--outline` `#83746b` used for small muted text) need verification; bump any failing muted color toward `--on-surface-variant`.
5. **`:focus-visible` audit.** Confirm every interactive element has a visible focus indicator (the existing `.btn:focus-visible`, `.nav-desktop a:focus-visible`, `.mobile-menu-btn:focus-visible`, `.nav-mobile a:focus-visible` cover most; add `.footer-social a:focus-visible`, `.practice-link:focus-visible`, `.contact-value a:focus-visible`, `.footer-section a:focus-visible` if missing).
6. **Alt-text audit.** Every `<img>` has non-empty `alt`. All current images use `[Placeholder] …` alt text — verify none is empty.
7. **`<head>` metadata — add exactly these tags** (some already present; fill the gaps):
   ```html
   <title>Hartawati Law Firm</title>
   <meta name="description" content="[Placeholder] Deskripsi situs Hartawati Law Firm" />
   <meta property="og:title" content="Hartawati Law Firm" />
   <meta property="og:description" content="[Placeholder] Deskripsi singkat situs" />
   <meta property="og:type" content="website" />
   <link rel="icon" href="assets/images/placeholders/favicon.svg" />
   <!-- or a favicon placeholder under /assets; must be local -->
   <link rel="canonical" href="https://[Placeholder] hartawatilaw.example.id/" />
   ```
   `og:title`, `og:description`, `og:type` already exist; verify/fill them. Add `favicon` link (local file under `/assets`) and `canonical` (placeholder URL). Do not hotlink the favicon.

---

### 3.4 Stage 7 — Final Audit + Checklist Artifact

#### 3.4.1 Audit (verifies + fixes, no new features)

For each AGENTS.md Hard Rule, run a check; fix any violation without adding features:

| Hard Rule | Check |
|---|---|
| No frameworks/Tailwind/build/npm/icon-fonts | `index.html` has no framework CDN `<link>`/`<script>`; no Tailwind class patterns; no `package.json`, build config, webpack/vite config; no icon-font `@font-face`/`<link>` (Google Fonts for Plus Jakarta Sans + Newsreader is allowed — these are web fonts, not icon fonts). |
| `/reference` untouched | `git diff --exit-code reference/` clean. |
| No hotlinked images | No `img[src]` or CSS `url()` points to an external host. |
| All images local under `/assets` | Every `img[src]` resolves under `assets/`. |
| No invented facts outside `[Placeholder]` | Manual review aided by the Placeholder inventory; flag concrete names/addresses/phones/emails/stats not prefixed with `[Placeholder]`. |
| No promotional claims | No `terbaik`, `pasti menang`, `100%`, percentage guarantees in visible text. |
| Tokens from `:root` variables | No inline `style="..."` setting color/font/size/radius/spacing; no hard-coded hex outside `:root` in `css/style.css`. |
| Audit adds no features | The Stage 7 diff only removes/replaces; no new UI sections/components. |

#### 3.4.2 Checklist Artifact format

Durable Markdown file at `d:\hartawati-law-firm\CHECKLIST.md` (workspace root) with two sections:

**Section A — Hard-Rules Checklist** (tickable `- [ ]` items, one per AGENTS.md Hard Rule, each with a one-line "how to verify" note):

```markdown
# Hartawati Law Firm — Audit Checklist

Re-runnable after any content change. Tick each item; fix any failure before deploying.

## A. AGENTS.md Hard Rules

- [ ] **No frameworks/Tailwind/build/npm/icon-fonts.** Verify: no CDN framework links, no Tailwind classes, no package.json/build config, no icon-font @font-face.
- [ ] **`/reference` untouched.** Verify: `git diff --exit-code reference/` exits 0.
- [ ] **No hotlinked images.** Verify: no `img[src]` or CSS `url()` points to an external host.
- [ ] **All images local under `/assets`.** Verify: every `img[src]` starts with `assets/`.
- [ ] **No invented facts outside `[Placeholder]`.** Verify: concrete names/addresses/phones/emails/stats are all `[Placeholder]`-prefixed.
- [ ] **No promotional claims.** Verify: no `terbaik`, `pasti menang`, `100%`, percentage guarantees in visible text.
- [ ] **All tokens from `:root` variables.** Verify: no inline style attributes for color/font/size/radius/spacing; no hard-coded hex outside `:root`.
- [ ] **One `<h1>` only; logical heading order.** Verify: exactly one `<h1>`; no skipped heading levels.
- [ ] **Demo Block removed; `#lawyer`/`#contact` inside `<main>`.** Verify: no `.demo` markup; both sections are descendants of `#main`.
- [ ] **No `box-shadow` in CSS.** Verify: zero `box-shadow` declarations; specified surfaces use `1px solid var(--outline-variant)`.
- [ ] **Third hero stat neutral.** Verify: value text is "Fokus Penuh"; no numeric/percentage; no inline color style.
- [ ] **Accessible mobile menu.** Verify: toggle + aria-expanded sync; closes on link/Esc/focusout/outside-click.
- [ ] **Smooth scroll + sticky-header offset; reduced-motion honored.** Verify: nav links offset by header height; instant under reduced motion.
- [ ] **Scroll-spy via IntersectionObserver.** Verify: exactly one `aria-current="page"` on the most-visible section's link.
- [ ] **Fade-in + reduced-motion.** Verify: `.reveal` gains `.active`; fully visible under reduced motion.
- [ ] **Responsive (375/768/1280).** Verify: no horizontal scroll; tap targets ≥44px; body text ≥16px.
- [ ] **WCAG AA contrast + focus-visible + skip link + alt text.** Verify: AA ratios; visible focus; skip link first; all images have alt.
- [ ] **SEO metadata present.** Verify: `<title>`, meta description, og:title/description/type, favicon, canonical.
- [ ] **Audit added no new features.** Verify: Stage 7 diff only removes/replaces.

## B. Placeholder Inventory

Each `[Placeholder]` occurrence with file, line, and text. Re-run: `grep -rn "\[Placeholder\]" --include=*.html --include=*.css --include=*.js .` and update this table.

| File | Line | Text |
|---|---|---|
| html/index.html | NN | [Placeholder] … |
| ... | ... | ... |
```

**Section B — Placeholder Inventory** is a table with `File | Line | Text` columns, one row per `[Placeholder]` occurrence. It is re-generated by grepping the project for `[Placeholder]` and recording file + line + the text snippet. This satisfies Req 13.2 (complete inventory with file and line) and Req 13.3 (re-runnable).

The artifact is a durable file (Req 13.4). Re-running = ticking Section A fresh and regenerating the Section B table via the documented grep command.

---

## Data Models

### 4.1 Checklist Artifact structure (conceptual)

```
ChecklistArtifact {
  meta: { title, reRunInstructions: string }
  hardRules: [
    { id, rule, verification: string, checked: boolean }
  ]
  placeholders: [
    { file: string, line: number, text: string }
  ]
}
```

Serialized as the Markdown shown in §3.4.2. The `placeholders` array must contain exactly one entry per `[Placeholder]` occurrence in the project (completeness invariant, Property 29).

### 4.2 Scroll-spy in-memory model

```
ScrollSpy {
  navLinks: HTMLAnchorElement[]           // desktop in-page links
  linkByHash: Map<string, HTMLAnchorElement>
  sections: HTMLElement[]                 // [#hero, #tentang-kami, #bidang-praktik, #lawyer, #contact]
  observer: IntersectionObserver
  currentHash: string | null
}
```

Invariant: at any settled state, exactly one element of `navLinks` has `aria-current="page"`, and it equals `linkByHash.get(currentHash)` where `currentHash` corresponds to the most-visible section (Property 13).

### 4.3 Mobile-menu state model

```
MenuState { open: boolean, ariaExpanded: string (= String(open)) }
```

Invariants: `ariaExpanded === String(open)` always (Property 9); `open` becomes false on any of {nav-link click, Escape, focus-out beyond menu+button, outside pointerdown} (Property 10).

---

## Error Handling

All Stage 5 logic degrades safely and never throws on a partially-built page:

- **Missing elements.** Every selector (`menuBtn`, `mobileNav`, `header`, `navLinks`, `sections`, `reveals`) is obtained with a null-tolerant query. If a needed element is absent, the relevant subsystem no-ops (e.g., no `menuBtn` → no menu handlers; no `.reveal` → no reveal observer). The smooth-scroll handler early-returns when `target` is `null`, so a stale `href="#"` never scrolls.
- **Reduced motion.** A single `reducedMotion` boolean read once at load governs every animated path: smooth scroll uses `behavior: 'auto'`, and every `.reveal` is activated immediately. No animation runs under `prefers-reduced-motion: reduce`.
- **Mobile-menu close handlers.** Each close trigger guards on `isOpen()` so it only acts when the menu is actually open; `focusout` checks `e.relatedTarget` (null when focus leaves the document) and only closes when focus lands somewhere outside the menu and the button.
- **Scroll-spy stability.** A `currentHash` guard suppresses redundant `aria-current` writes when the most-visible section is unchanged, preventing flapping/rapid toggling between adjacent sections. A zero-ratio callback is ignored so the observer never clears all links on a brief gap.
- **Reveal fire-once.** Each `.reveal` is `unobserve`d the moment it is intersecting, so it cannot lose/gain `.active` repeatedly and there is no observer leak.
- **Stage 4 CSS edits.** Replacing `box-shadow` with `border` does not alter layout box model in a way that breaks the grid (border adds 1px to the box; the existing boxes already had `border-box` sizing, so content is unaffected). Removing the orphaned demo CSS has no effect on real sections because no real markup references those selectors after the Demo Block is deleted.
- **Stage 7 audit failures.** The audit fixes violations in place; any fix that would require adding a feature is rejected (out of scope). If a violation cannot be fixed without a feature, it is reported rather than implemented.

## Correctness Properties

*For all* / *For any* universal statements derived from the EARS acceptance criteria. Each property references the requirements it validates.

### Property 1: Exactly one primary heading
*For any* state of the document, the count of `<h1>` elements in `index.html` SHALL equal 1.
**Validates: Requirements 1.1, 9.1**

### Property 2: Lawyer and contact are main content
*For any* parsed DOM, `#lawyer` and `#contact` SHALL each be descendants of the `#main` element.
**Validates: Requirements 1.2**

### Property 3: Demo block is absent
*For any* state of `index.html`, the Demo Block (the Stage 1 "Foundation Styles" block containing the second `<h1>`) SHALL NOT be present.
**Validates: Requirements 1.3**

### Property 4: Orphaned demo CSS is absent
*For any* state of `css/style.css`, no orphaned demo-specific selectors (`.demo`, `.demo-section`, `.demo-card`, `.demo-swatch`, `.demo-text`, `.button-group`) SHALL remain.
**Validates: Requirements 1.4**

### Property 5: No box-shadow anywhere
*For any* rule in `css/style.css`, the declaration SHALL NOT set `box-shadow`.
**Validates: Requirements 2.2**

### Property 6: Specified surfaces use thin borders
*For any* of the surfaces — hero image, stat cards, practice-card hover state, about image, room images, and lawyer image — that require separation from their background, the surface SHALL apply a `1px solid var(--outline-variant)` border and SHALL NOT apply `box-shadow`.
**Validates: Requirements 2.1, 2.3**

### Property 7: Third hero stat is neutral
*For any* render, the third hero stat card's value text SHALL equal "Fokus Penuh", SHALL NOT contain a numeric or percentage value, and SHALL NOT contain a promotional token.
**Validates: Requirements 3.1, 3.2, 3.3**

### Property 8: Stat colors come from classes, not inline styles
*For any* hero stat-value element, the element SHALL NOT carry an inline `style` attribute that sets color; any color SHALL be applied via a CSS class.
**Validates: Requirements 3.4**

### Property 9: Mobile-menu state and aria-expanded agree
*For any* activation of the hamburger button, the mobile menu's open state SHALL toggle, and the button's `aria-expanded` attribute SHALL equal the string form of the open state.
**Validates: Requirements 4.1, 4.2, 4.3**

### Property 10: Open menu closes on any close trigger
*For any* open mobile menu, it SHALL close on any of: activation of a Nav Link inside it, an Escape keydown, focus leaving the menu (to a target outside the menu and the hamburger button), or a pointerdown outside the menu and the hamburger button.
**Validates: Requirements 4.4, 4.5, 4.6, 4.7**

### Property 11: Smooth scroll lands below the sticky header
*For any* in-page Nav Link activation, the target Section's top edge SHALL be positioned at or below the bottom of the sticky header (the heading SHALL NOT be hidden beneath the header).
**Validates: Requirements 5.1**

### Property 12: Reduced motion disables animated scroll
*For any* in-page Nav Link activation while Reduced Motion is active, the Site SHALL navigate to the target Section without an animated smooth-scroll transition (instant).
**Validates: Requirements 5.2**

### Property 13: Scroll-spy sets exactly one current link
*For any* Section that is the most visible in the viewport, exactly one Nav Link — the one targeting that Section — SHALL carry `aria-current="page"`, and every other Nav Link SHALL NOT carry it.
**Validates: Requirements 6.1, 6.2**

### Property 14: Reveal elements activate on entry
*For any* Reveal Element that enters the viewport, the Site SHALL add the `active` class to that element.
**Validates: Requirements 7.1**

### Property 15: Reduced motion shows all reveal elements
*For any* Reveal Element while Reduced Motion is active, the element SHALL render fully visible (opacity 1) without applying a fade-in animation.
**Validates: Requirements 7.2**

### Property 16: Tap targets meet minimum size
*For any* interactive element at viewport widths of 375px, 768px, and 1280px, the rendered width and height SHALL each be at least 44px.
**Validates: Requirements 8.2**

### Property 17: Body text meets minimum size
*For any* body-text element at viewport widths of 375px, 768px, and 1280px, the computed font size SHALL be at least 16px.
**Validates: Requirements 8.3**

### Property 18: No horizontal scroll at breakpoints
*For any* viewport width of 375px, 768px, or 1280px, the document SHALL NOT produce horizontal scrolling (`scrollWidth <= innerWidth`).
**Validates: Requirements 8.1**

### Property 19: Logical heading order
*For any* sequence of headings in document order, the Site SHALL contain exactly one `<h1>` and SHALL NOT skip a heading level (an `hN` SHALL NOT be followed by an `hM` where `M > N + 1`).
**Validates: Requirements 9.1, 9.2**

### Property 20: Visible focus on every interactive element
*For any* interactive element, the element SHALL present a visible `:focus-visible` state (non-transparent outline) when focused.
**Validates: Requirements 10.2**

### Property 21: Skip link is first focusable
*For any* focus traversal of the document, the first focusable element SHALL be the skip link whose `href` is `#main`.
**Validates: Requirements 10.3**

### Property 22: Every image has alt text
*For any* `<img>` element, the element SHALL have an `alt` attribute with non-empty text.
**Validates: Requirements 10.4**

### Property 23: WCAG AA contrast for all text
*For any* visible text element, the contrast ratio of its color against its background SHALL meet WCAG AA (≥ 4.5:1 for normal text, ≥ 3:1 for large text).
**Validates: Requirements 10.1**

### Property 24: Required head metadata is present
*For any* state of the document `<head>`, it SHALL contain a non-empty `<title>`, a meta description, Open Graph tags for title, description, and type, a favicon link, and a canonical link whose URL carries a placeholder marker.
**Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**

### Property 25: No banned frameworks or build tooling
*For any* project file, the Site SHALL NOT contain framework/Tailwind references, build-step configuration, npm manifests, or icon-font references.
**Validates: Requirements 12.1**

### Property 26: All images are local
*For any* image reference in the Site, the source SHALL resolve to a local file under `/assets` and SHALL NOT be a hotlinked external URL.
**Validates: Requirements 12.3, 12.4**

### Property 27: No promotional claims
*For any* visible text in the Site (outside `[Placeholder]` spans where allowed), the text SHALL NOT contain promotional tokens (`terbaik`, `pasti menang`, `100%`, or percentage guarantees).
**Validates: Requirements 12.6**

### Property 28: Tokens sourced from root variables
*For any* application of a color, font, size, radius, or spacing value, the Site SHALL source it from a `:root` CSS variable rather than a hard-coded value or inline style.
**Validates: Requirements 12.7**

### Property 29: Placeholder inventory is complete
*For any* `[Placeholder]` occurrence in the project, the Checklist Artifact's Placeholder inventory SHALL contain exactly one matching row recording its file and line, and the inventory row count SHALL equal the total count of `[Placeholder]` occurrences.
**Validates: Requirements 13.2**

---

## Testing Strategy

A dual testing approach complements the correctness properties above:

- **Property-based tests** verify the universal properties (P1–P29) across many generated inputs. These apply to the pure/logic layers and static-structure invariants: HTML/CSS structure counts (P1–P6, P19), the menu-state model (P9–P10), smooth-scroll offset math (P11–P12), scroll-spy uniqueness (P13), reveal activation (P14–P15), tap-target/font-size invariants at breakpoints (P16–P18), metadata presence (P24), and the placeholder-inventory completeness check (P29). Generators produce random nav-link activations, random toggle sequences, random section visibility, and random breakpoint layouts; assertions check the invariants hold. Minimum 100 iterations per property test; each tagged `Feature: hartawati-law-site, Property N: <text>`.
- **Example-based unit / integration tests** cover specific scenarios and external/render concerns: WCAG AA contrast computation per text/background pair (P23), the `/reference` untouched check via `git diff --exit-code reference/` (Req 12.2), the no-horizontal-scroll check at the three exact breakpoints (P18, render-level), invented-fact review (Req 12.5, human-supported), and the Stage 7 "audit adds no features" diff inspection (Req 12.9).
- **Smoke tests** cover one-shot setup: the Checklist Artifact file exists at the workspace path (Req 13.4), the IntersectionObserver is used for scroll-spy (Req 6.3), and the mobile-menu close handlers are wired (Req 4.4–4.7).

Property tests use mocks for `IntersectionObserver`, `matchMedia`, and `window.scroll*` to keep them pure and fast; integration tests run against the real rendered DOM at 375/768/1280px.

## Out of Scope

- **Stage 4 is NOT a redesign.** Existing Stage 4 layout, spacing, copy, and visual treatment are a finished baseline; only document structure (move sections into `<main>`, delete the Demo Block and its second `<h1>`), the shadow→border swap, and the third-stat neutralization are in scope. No layout, spacing, or copy changes beyond these.
- **Stage 7 adds NO new features.** The audit only verifies AGENTS.md Hard Rules and fixes violations; it SHALL NOT introduce new sections, components, behaviors, or capabilities. Any improvement beyond violation-fixing is out of scope.
- **No real content.** All real names, addresses, phone numbers, emails, and statistics remain `[Placeholder]`-prefixed; replacing them is a later, separate task (per `Plan.md` §8), not part of this spec.
- **No self-hosted fonts / build pipeline.** Google Fonts `<link>` is retained; self-hosting, bundlers, and npm are explicitly excluded by AGENTS.md and are not introduced here.
- **No new imagery.** Existing local placeholder SVGs under `assets/images/placeholders/` are kept; real photos and favicon art are out of scope (favicon may be a local placeholder SVG for Stage 6).
- **No translation/English version.** Indonesian only; the English-version structure noted in `Plan.md` is a future concern.
