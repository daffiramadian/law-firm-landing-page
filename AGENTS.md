# Daffi Law Firm website

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

  ## Design update (UI upgrade)
- Source of inspiration: /reference/ui-inspiration/ (screenshots). Borrow
  ideas only; do NOT copy layouts, colors, or any numbers/ratings from them.
- Palette tokens are defined in UPGRADE.md section 3. Replace the old pinkish
  surface colors. On dark sections use only --caramel and --text-on-dark*.
- Dark sections are now allowed (hero, FAQ, footer). Keep: no gradients, no
  heavy shadows, no blur blobs. Glass cards are allowed in the hero only.
- Accent words in big headings: Newsreader italic in accent/caramel color.
- Never add fake ratings, review counts, success rates, case counts, or awards.
  Stats stay "[Placeholder] 00+".
- Do not change copy or section order unless the stage asks for it.

## DUMMY MODE (design review phase), overrides the "no invented facts" rule

The site currently uses realistic DUMMY content so the design can be judged.
Dummy content is allowed ONLY under these conditions:
- Every element containing dummy text or a dummy image carries the attribute
  data-dummy (on the nearest sensible element, e.g. the card, row or <img>).
- <meta name="robots" content="noindex, nofollow"> stays in <head> and an HTML
  comment "DUMMY DATA, DO NOT PUBLISH" sits at the top of index.html until
  real content replaces it.
- Every dummy item is listed in DUMMY_CONTENT.md (file, section, what to replace).
- Dummy phone/WhatsApp numbers use zeros (e.g. +62 812 0000 0000) and emails use
  example.com, so they can never reach a real person.
- Still forbidden even as dummy: star ratings, review counts, success rates,
  "won/menang/berhasil" outcome claims, awards, bar numbers, named real
  companies, real people's names, or any promotional superlative.
- Visible "[Placeholder]" prefixes are removed; the data-dummy attribute replaces
  them as the way to find dummy content.
- Opening the page with ?dummy in the URL outlines all [data-dummy] elements
  (dashed red) so I can see what is still fake.