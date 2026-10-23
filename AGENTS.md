# Hartawati Law Firm website

One-page marketing site for an Indonesian law firm. Indonesian language (lang="id").

## Hard rules
- Plain HTML, CSS, vanilla JS only. No frameworks, no Tailwind, no build step,
  no npm dependencies, no icon fonts.
- Never edit anything in /reference. It is read-only design reference.
- Do not hotlink images. All images are local files in /assets.
- Never invent facts: no names, addresses, phone numbers, emails, bar numbers,
  awards, case numbers, statistics, testimonials. Use obvious placeholders
  prefixed with "[Placeholder]" (e.g. "[Placeholder] Alamat Kantor",
  "+62 000 0000 0000", "00+ Tahun").
- No promotional claims ("terbaik", "pasti menang", "100%"). Informational tone
  only (Indonesian advocate code of ethics).

## Design
- Source of truth: /reference/stitch-home.html (layout, spacing, copy structure),
  /reference/design-prompt.md (rules), /reference/style-reference.png (mood).
- All colors, fonts, sizes, radii, spacing are CSS variables in :root in
  css/style.css. No hard-coded colors elsewhere.
- Fonts: Plus Jakarta Sans (headings, 300-500) and Newsreader (body).
- Images: 24-28px radius. Buttons: pill-shaped. Thin borders, no heavy
  shadows, no gradients, no blur blobs.
- Key words in big headings use the accent color.

## Quality
- Mobile-first. Must work at 375px, 768px, 1280px. No horizontal scroll.
- Semantic HTML (header, nav, main, section, footer), one h1, logical heading order.
- WCAG AA contrast, visible :focus-visible states, skip link, alt text.
- Respect prefers-reduced-motion.
- Keep JS small: mobile menu, smooth scroll, scroll-spy, fade-in on scroll.

## Workflow
- Work one stage at a time. Stop after each stage, summarize what changed,
  and wait for approval.
- Do not touch files outside the current stage's scope.
- Before finishing a stage, open a browser-equivalent check if you can; otherwise
  list what I should check manually.