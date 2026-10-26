# Hartawati Law Firm: UI Upgrade — Execution Prompts

> **This file supersedes the stage prompts in `/reference/UPGRADE.md` (section 6).**
> The original `/reference/UPGRADE.md` remains the design spec and is read-only.
> Use the prompts below instead of the ones in that file — they include conflict fixes
> identified during a pre-execution audit (token naming migration, dark-section contrast
> scoping, component rebuilds, etc.). Everything else in `/reference/UPGRADE.md`
> (palette tokens §3, section specs §4, motion rules, placeholder rules) still applies
> and these prompts reference it directly.

---

## U1 — Tokens, rhythm, header and nav

```
Read AGENTS.md and UPGRADE.md sections 3 and 4 ("Header") before writing any code. Stage U1 only.

IMPORTANT — token migration:
The current css/style.css uses old Material Design-style variable names (--primary, --surface, --surface-container-low, --on-surface-variant, etc.). You must REPLACE them entirely with the new palette from UPGRADE.md §3. Do not keep both systems. After rewriting :root, do a full find-and-replace across css/style.css so every existing rule that referenced the old names now uses the correct new name. No old variable name should remain anywhere in the file.

New variables to add that don't exist yet — add these to :root:
  --radius-panel: 2rem;       /* 32px — big dark panels */
  --radius-card: 1.25rem;     /* 20px — cards */
  (keep --radius-pill: 9999px)

Do not hardcode any color, radius, or spacing value outside :root.

Tasks:
1. Replace all :root variables with the UPGRADE.md §3 palette. Map old names to new ones logically (e.g. --on-surface → --text, --on-surface-variant → --text-soft, --surface → --bg, --surface-container-low → --bg-warm, --outline-variant → --line). Add --espresso, --espresso-2, --sand, --sand-deep, --caramel, --text-on-dark, --text-on-dark-soft.
2. Add the two new radius variables above.
3. Rebuild .section-label entirely as an outlined pill tag: 1px solid border using --line, 12px uppercase text, letter-spacing 0.1em, border-radius --radius-pill, padding 0.25rem 0.875rem. Remove the old ::before line decoration. This is now the .pill-tag component.
4. Add .accent-italic: font-family Newsreader, italic, color var(--caramel) — used for accent words inside dark-section headings. Add .accent-italic-light: same but color var(--accent) — used on light-section headings.
5. Add .btn-arrow: pill button with a small circular arrow icon on the right (inline SVG, 20×20). Fill is --caramel on dark sections, --accent on light. On hover: arrow circle rotates 45deg (transform, 200ms), pill fill shifts one step darker. Provide both a dark-context and light-context variant (.btn-arrow--light).
6. Rebuild the header per UPGRADE.md §4 "Header":
   - Fixed, height 80px desktop (72px after scroll, add .is-scrolled class via JS), background rgba(250,246,240,0.92), backdrop-filter blur(10px), border-bottom 1px solid var(--line).
   - Links: 13px, uppercase, weight 600, letter-spacing 0.08em, color var(--text).
   - Active link: color var(--accent) + a 2px underline bar that animates in with transform scaleX(0→1), origin left, 250ms. Style from aria-current="true" on the <a> element.
   - Hover state: underline at 60% width.
   - Focus-visible: 2px outline.
   - Right side CTA: .btn-arrow in --accent fill ("Konsultasi").
   - Mobile: keep existing hamburger structure, large tap targets, update colors to match new palette.
7. Update scroll-spy in js/main.js so the active section's nav link gets aria-current="true" (not aria-current="page"). Remove any previous aria-current logic and rewrite it cleanly with IntersectionObserver. It must work for all nav sections.

Do NOT touch any section below the header yet.

When done, list: (a) every old variable name you replaced and what it maps to, (b) any place you were unsure of the mapping and what you chose.
```

---

## U2 — Hero

```
Read AGENTS.md and UPGRADE.md §4 "Hero" before writing any code. Stage U2 only.

WARNING — the current hero HTML and CSS must be fully rewritten, not restyled. The existing hero is a stacked text-above / image-below layout. The new hero is a dark rounded card with a two-column interior. There is no CSS path from one to the other. Replace the entire .hero block in index.html and all .hero* rules in css/style.css.

Build the hero exactly per UPGRADE.md §4:

HTML structure (inside .container, outside the card is just the page background --bg-warm):
  <section id="hero">
    <div class="hero-card"> ← --espresso bg, --radius-panel, min-height 680px desktop
      <div class="hero-card-inner"> ← two columns: left content, right portrait
        LEFT COLUMN:
          - .pill-tag (outlined, text-on-dark-soft color on dark bg): "[Placeholder] Advokat"
          - <h1> with two words wrapped in <em class="accent-italic"> (Newsreader italic, --caramel)
          - 1–2 line subtext in --text-on-dark-soft
          - .btn-arrow in --caramel fill + a plain text link ("Pelajari Lebih Lanjut") in --text-on-dark-soft
        RIGHT COLUMN:
          - Portrait slot: 4:5 aspect ratio, bottom-aligned, slightly overflows the card bottom (use negative margin-bottom or absolute positioning). Placeholder: assets/images/placeholders/portrait-hero.svg (line-art figure, sand-tinted background shape). Do NOT use the old gray box.
      FLOATING GLASS CARD (positioned absolute inside hero-card):
          - border: 1px solid rgba(255,255,255,0.18)
          - background: rgba(255,255,255,0.06)
          - backdrop-filter: blur(8px)
          - Content: "[Placeholder] Konsultasi Awal · Senin–Jumat, 09.00–17.00" — NO ratings, NO review counts, NO star icons.
      STATS STRIP (inside hero-card, bottom, full width, thin top border in rgba(255,255,255,0.12)):
          - 4 stat items separated by 1px vertical lines (rgba(255,255,255,0.12))
          - Each: small inline SVG icon (24×24, --text-on-dark-soft stroke), number in 44px weight-300 --text-on-dark, label in --text-on-dark-soft
          - ALL values: "[Placeholder] 00+" — no real numbers, no percentages, no "100%"

PALETTE on dark sections:
  - Headings: --text-on-dark
  - Body/sub text: --text-on-dark-soft
  - Accent words: --caramel (via .accent-italic)
  - CTA button fill: --caramel
  - Do NOT use --accent (brown) on dark — it fails contrast

Mobile layout (≤768px):
  - Stack: pill tag → h1 → subtext → buttons → portrait (full width, 4:5) → stats in 2×2 grid
  - Portrait does NOT overflow on mobile
  - Stats strip becomes a 2×2 grid, no vertical separators

Create assets/images/placeholders/portrait-hero.svg: a simple line-art silhouette of a person in formal attire on a sand-tinted rectangle (#EFE3D0), correct 4:5 ratio. A tiny label "Foto Advokat 4:5" is acceptable inside the SVG.

Do not touch any other section.

When done, list what you changed in HTML, CSS, and assets.
```

---

## U3 — Practice areas list

```
Read AGENTS.md and UPGRADE.md §4 "Practice areas" before writing any code. Stage U3 only.

Replace the existing #bidang-praktik section (6 grid cards) with the editorial list layout from UPGRADE.md §4. The section background is --bg (white).

HTML:
  - Section header row: .pill-tag (outlined, --accent color on light bg) + 2-line h2 (left), short text + .btn-arrow--light outlined (right)
  - Column header row: two labels — "Bidang" and "Kategori" — in .type-label style, 1px bottom border --line
  - 6 list rows, each an <a href="#contact"> element (fully keyboard-focusable):
      · Number: "01"–"06" in --text-soft, small
      · Title: clamp(1.4rem, 2.5vw, 2.25rem), weight 300, --text
      · Category: .pill-tag outlined, --text-soft
      · Circular arrow button (SVG, 40×40, border 1px --line, radius 999px)
      · 1px bottom divider --line
      · Description paragraph (hidden by default on desktop, visible on mobile)

Desktop hover/focus behavior (CSS only where possible, JS only if unavoidable):
  - Row background fills --sand-deep, border-radius --radius-card
  - Arrow circle fills --text (dark), arrow stroke flips to --bg (white)
  - Description fades in (opacity 0→1, height auto — use CSS grid row trick for smooth height)
  - A small rotated image card appears on the right (placeholder SVG, ~180×240px, rotate(-6deg), position absolute). Use assets/images/placeholders/practice-preview.svg (a generic scales/column line-art, create it).
  - These effects trigger on :hover AND :focus-within so keyboard users get the same experience

Mobile (≤768px):
  - Description is always visible below the title (no hover needed)
  - No floating image card
  - Arrow button links to #contact
  - Tap target for the full row ≥ 44px

ETHICS RULE: Do not add success rates, case counts, win percentages, or any numerical claims to the practice descriptions. Keep all descriptions as "[Placeholder] Deskripsi singkat bidang hukum ini."

Do not touch any other section.
```

---

## U4 — About and process

```
Read AGENTS.md and UPGRADE.md §4 "About" and "Process" before writing any code. Stage U4 only.

ABOUT (#tentang-kami) — background --sand:
Replace the existing about section layout with:
  LEFT COLUMN (desktop):
    - Large statement paragraph: clamp(1.75rem, 3.5vw, 2.25rem), weight 300, line-height 1.3. One key phrase wrapped in <em class="accent-italic-light"> (Newsreader italic, --accent color).
    - Below it: two numbered value points (01, 02), each separated by a 1px --line divider. Label in .type-label, short text in body size. No icons.
  RIGHT COLUMN (desktop):
    - Large decorative quotation mark (CSS or inline SVG, ~80px, --sand-deep color)
    - Short paragraph body text
    - Photo slot (4:5 aspect ratio) with a rotated sand shape behind it (a CSS ::before pseudo-element, background --sand-deep, rotate(−4deg), border-radius --radius-card, z-index -1). Placeholder: assets/images/placeholders/about-photo.svg (same line-art style, create it).

Section background: --sand (#EFE3D0). Padding: 96px desktop, 64px mobile.

PROCESS (#alur-penanganan) — background --sand, insert AFTER #bidang-praktik:
Keep this section SIMPLE. Do not attempt a curved SVG path (it is too fragile responsively). Use this instead:
  - 4 step cards in a horizontal row (desktop) / vertical stack (mobile)
  - Each card: background --espresso-2, --radius-card, padding 2rem
    · Step number "01"–"04" in clamp(3rem,6vw,4.5rem), weight 300, --caramel
    · Step title in --text-on-dark (e.g. "[Placeholder] Konsultasi Awal")
    · One-line description in --text-on-dark-soft
  - Between cards (desktop only): a simple dashed horizontal line (border-top: 2px dashed rgba(210,160,107,0.3)) drawn with a CSS ::after on each card except the last, or a separate <div class="step-connector">
  - On mobile: a short vertical dashed line between cards (same color)

PALETTE on dark cards inside a sand section:
  - Card bg: --espresso-2
  - Number, title: --text-on-dark and --caramel as specified above
  - Do NOT use --accent on these dark cards

Section label: .pill-tag with --accent border and text (light section context).

Do not touch any other section.
```

---

## U5 — FAQ, contact, footer

```
Read AGENTS.md and UPGRADE.md §4 ("FAQ", "Contact", "Footer") before writing any code. Stage U5 only.

FAQ (new section, insert between #alur-penanganan and #contact):
  - Section background: --bg-warm. Inside it, a rounded dark panel: background --espresso, border-radius --radius-panel, padding 3rem desktop / 2rem mobile.
  - Inside the panel: .pill-tag (--caramel border and text, dark context) + h2 in --text-on-dark + a .btn-arrow in --caramel fill, then the accordion below.
  - Accordion: 5 <details><summary> pairs. First one open by default (add the "open" attribute).
  - Summary styling: text in --text-on-dark, 1px bottom border rgba(255,255,255,0.1), padding 1.25rem 0, cursor pointer. A + icon on the right (inline SVG) that rotates to × when [open]. Animate with CSS transition on transform.
  - Answer panel: --text-on-dark-soft, smooth height open using CSS grid row trick (grid-rows: 0fr → 1fr, transition 300ms).
  - 5 placeholder questions (all in Indonesian, [Placeholder] prefix):
      1. [Placeholder] Apa yang terjadi pada konsultasi pertama? (open by default)
      2. [Placeholder] Berapa biaya layanan hukum?
      3. [Placeholder] Apakah informasi saya terjaga kerahasiaannya?
      4. [Placeholder] Berapa lama penanganan perkara?
      5. [Placeholder] Dokumen apa yang perlu disiapkan?

PALETTE on dark panel — STRICTLY:
  - All text: --text-on-dark or --text-on-dark-soft only
  - Accents/icons: --caramel only
  - Do NOT use --accent (brown) here — it is unreadable on --espresso

CONTACT (#contact) — background --bg-warm:
Restyle the existing contact section (keep the WhatsApp-first approach):
  - Large h2, weight 300, one phrase in .accent-italic-light
  - 3 info rows: phone (tel: link), email (mailto: link), address. Each row: a circular icon badge (48×48, background --sand, border-radius 999px, inline SVG icon inside) + label + value. No form.
  - Big signature .btn-arrow for WhatsApp: full-width on mobile, auto-width on desktop, --accent fill.
  - All values remain [Placeholder].

FOOTER — background --espresso:
  - Border-top: 1px solid rgba(255,255,255,0.08)
  - Top portion: 3 columns — brand (logo + tagline), nav links, contact info. All text in --text-on-dark-soft, links hover to --text-on-dark. Do NOT use --accent here.
  - GIANT WORDMARK at the bottom: the text "HARTAWATI" in:
      font-size: clamp(4rem, 18vw, 16rem)
      font-family: var(--font-heading)
      font-weight: 300
      color: rgba(246,237,225,0.08)
      text-align: center
      letter-spacing: -0.02em
      overflow: hidden (crop at bottom edge — use the section's overflow:hidden)
      margin-bottom: -0.2em (to push it slightly below the visible area)
  - Below the wordmark (above it visually in DOM order if needed): copyright line in --text-on-dark-soft, 12px.

PALETTE on footer (dark) — STRICTLY:
  - Text: --text-on-dark-soft (resting), --text-on-dark (hover/emphasis)
  - Wordmark: rgba(246,237,225,0.08)
  - No --accent in the footer. No --primary. No --text (dark brown) — invisible on espresso.

Add "FAQ" to the nav only if it fits without crowding. If the nav already has 5 items and adding FAQ makes it feel cramped, leave the nav as is.

Do not touch any other section.
```

---

## U6 — Motion, polish, QA

```
Read AGENTS.md and UPGRADE.md §4 "Motion" before writing any code. Stage U6 only.

MOTION — add to js/main.js and css/style.css:
1. Reveal on scroll: elements with class .reveal fade in (opacity 0→1) and rise 24px (translateY(24px)→0) when they enter the viewport (IntersectionObserver, threshold 0.15). Stagger sibling .reveal elements with a 60ms CSS custom property delay: --reveal-delay: calc(var(--reveal-index, 0) * 60ms). Set --reveal-index via JS (0,1,2... on siblings in the same container). Add .reveal to: section headings, .pill-tag eyebrows, stat items, practice rows, step cards, FAQ items, contact rows.
2. Hero headline load animation: on DOMContentLoaded, each line of the h1 slides up from 30px (translateY(30px)→0) and fades in, staggered 120ms per line. Split lines by wrapping each in a <span class="hero-line"> in the HTML.
3. Hover micro-interactions (CSS only):
   - .btn-arrow: arrow SVG rotates 45deg and translates right 2px on hover (200ms)
   - Practice rows: already done in U3; confirm it still works
   - Stat items in hero: subtle scale(1.02) on hover (150ms)
   - FAQ summary: + icon rotation already done in U5; confirm it still works
4. ALL motion — the reveal IntersectionObserver, the hero load animation, AND all CSS transitions/transforms — must check prefers-reduced-motion: reduce and skip entirely if set. In CSS: wrap motion rules in @media (prefers-reduced-motion: no-preference) { ... }. In JS: check window.matchMedia('(prefers-reduced-motion: reduce)').matches before adding any animation class.

QA AUDIT — after motion is working, audit the whole page:
Report each issue found, then fix it. Check:
  [ ] 375px: no horizontal scroll, no text overflow, tap targets ≥ 44px on all buttons/rows/links
  [ ] 768px: two-column layouts break correctly, hero stacks correctly
  [ ] 1280px: container max-width respected, hero card not stretched too wide
  [ ] 1920px: no layout breaks, giant wordmark doesn't overflow unexpectedly
  [ ] Contrast: ALL text on --espresso sections uses only --text-on-dark or --text-on-dark-soft (use browser DevTools contrast checker or manual check against WCAG AA). --caramel on --espresso: confirm it passes AA for large text (it should at ~4.5:1).
  [ ] Heading order: one h1 (hero), h2 for each section, h3 inside sections only. No skipped levels.
  [ ] Focus states: tab through the entire page. Every interactive element must have a visible :focus-visible outline.
  [ ] Skip link: confirm it appears on first Tab press and jumps to #main-content.
  [ ] Alt text: every <img> and placeholder SVG has a descriptive alt attribute.
  [ ] No hardcoded colors: grep css/style.css for any hex codes or rgb() values outside :root.
  [ ] No invented facts: grep for anything that looks like a real phone number, address, bar number, or non-placeholder statistic.

Do not add new sections, change copy, or redesign anything. Fix only what the audit finds.
```

---

*End of UPGRADE-PROMPTS.md*
