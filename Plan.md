# Hartawati Law Firm: Build Plan (Stitch → plain HTML/CSS/JS)

Status: Stitch design done. Next: turn it into the real project with OpenCode or Codex.

---

## 1. What we have

| File | What it is | How to use it |
|---|---|---|
| Stitch HTML (`_DOCTYPE_html.txt`) | Full one-page design, Indonesian, placeholders | **Visual and layout reference only. Do not ship it.** |
| Design prompt (`Design and build a one-page website.txt`) | The rules the design was made from | Source of truth for style and content rules |
| Reference image (kozyuk.design) | Palette, big hero type, rounded images, pill buttons | Style reference |

---

## 2. Audit of the Stitch output

### Keep
- Section order: header → hero → stats → about → 3-image row → practice areas (6 numbered cards) → lawyer profile → contact → footer
- Palette (from its Tailwind config): `primary #5f3716`, `primary-container #7a4e2b`, `surface #fff8f5`, `surface-container-low #fdf1ea`, `surface-container-high #f1e6df`, `on-surface #201b17`, `on-surface-variant #51443c`, `outline #83746b`, `outline-variant #d5c3b8`
- Fonts: Plus Jakarta Sans (headings, weight 300 to 500) + Newsreader (body serif). This is a good fit for a law firm. It replaces the Outfit/Inter choice in the original prompt.
- Type scale (hero 56/36px, headline 40/28px, stat 48px), 28px and 24px image radius, pill buttons, accent-colored key words in headings
- `lang="id"`, Indonesian copy, anchor IDs: `#hero #tentang-kami #bidang-praktik #lawyer #contact`

### Fix
- **Tailwind CDN + Material Symbols font** → rewrite as plain CSS with variables; use inline SVG icons. The brief said no frameworks.
- **Images hotlinked from `lh3.googleusercontent.com`** → temporary links, will break. Replace with local placeholder images.
- **AI-generated portrait of a "senior female lawyer"** → must not ship. Replace with a labeled placeholder until a real photo exists.
- **Fake form** (divs styled as inputs) → replace with WhatsApp-only contact, or a real `<form>` (decide in §3).
- **Invented details that look real**: "Equity Tower Lantai 22, SCBD", `+62 21 5150 8899`, `counsel@hartawatilaw.co.id`, "Hartawati, S.H., LL.M.", "Perhimpunan Advokat Indonesia", "Fax", "© 2025", "Publikasi Hukum" link → replace with obvious placeholders (`[Placeholder] Alamat Kantor`, `+62 000 0000 0000`, etc.)
- **Labels left over from Stitch**: `[Stage 4 Preview]`, `Konsultasi Formal` → remove
- **Claims to review with your mother**: "Kerahasiaan Terjaga", "100% Fokus", "000+ Kasus". Keep as placeholders only; advocate ethics rules restrict promotional claims.
- **Mobile menu**: toggles `hidden` only. Add `aria-expanded`, close on link click, close on Esc.
- **Decorative blur blobs and drop shadows** → remove, since the brief said no gradients or heavy shadows. Use thin borders.
- **Header user-icon circle** → does nothing, remove.
- **Hero image caption pill** ("[Placeholder] ... 1600x900") → keep only as a dev label, not as real UI text.

### Add
- Scroll-spy for the active nav item (Stitch hardcodes "Beranda" as active)
- Fade-in on scroll with `prefers-reduced-motion` respected
- `<title>`, meta description, Open Graph, favicon, `tel:` and WhatsApp links
- Visible focus states, skip link, alt text

---

## 3. Decisions (defaults in bold, change if you disagree)

1. **Language:** **Indonesian only for now**; structure so an English version can be added later
2. **Where text lives:** **directly in `index.html`** (better for SEO and no-JS). All placeholders start with `[Placeholder]` so they can be found with one search.
3. **Contact:** **WhatsApp button + phone + email only** (no form, no backend to maintain). Add a form later if needed.
4. **Icons:** **inline SVG** (no icon font)
5. **Fonts:** Google Fonts `<link>` for now; self-host later if you want
6. **Logo:** text wordmark ("HARTAWATI / LAW FIRM") until a real logo exists

---

## 4. Target structure

```
hartawati-law/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/placeholders/    # labeled SVGs, correct aspect ratios
│   └── logo/
├── reference/                  # READ-ONLY for the agent
│   ├── stitch-home.html        # the Stitch HTML (rename the .txt)
│   ├── design-prompt.md        # the original design prompt
│   └── style-reference.png     # kozyuk.design image
├── AGENTS.md
└── PLAN.md                     # this file
```

Setup (do this yourself, before starting the agent):
1. Create the `reference/` folder and move the three files in, renaming as above
2. Save §5 below as `AGENTS.md` in the project root
3. `git init` and commit. You'll commit after each stage so any bad step can be undone.

---

## 5. AGENTS.md (copy this into the project root)

```markdown
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
```

---

## 6. Stages and prompts

Give the agent one stage at a time. After each: open `index.html` in the browser, check at phone and desktop widths, then `git commit`.

### Stage 0: Orientation (no code)
**Goal:** the agent reads everything and confirms the plan.

> Read AGENTS.md, PLAN.md, and everything in /reference. Do not write code yet. Give me: (1) a list of the sections in the Stitch design, (2) the CSS variables you'll create from its Tailwind config, (3) anything in AGENTS.md or PLAN.md that conflicts with the Stitch file, and (4) your proposed file structure. Wait for my approval.

**Done when:** you agree with its summary.

### Stage 1: Foundation
**Goal:** `css/style.css` with tokens, reset, typography, layout utilities, buttons.

> Stage 1 only. Create css/style.css and a minimal index.html shell (head with fonts, meta, title, skip link, empty header/main/footer). In style.css: CSS variables from the Stitch palette, spacing and radius, type scale (hero, headline, body, label, stat, mobile variants via clamp() or media queries), reset, container (max-width 1320px, responsive padding), buttons (.btn-solid, .btn-outline, pill), section label with the small line, and a .reveal class for later. Create a small page showing each style so I can check it. Do not build real sections yet.

**Done when:** colors, fonts and buttons match the Stitch design.

### Stage 2: Header and hero
> Stage 2 only. Build the header and hero in index.html and css/style.css, matching the Stitch design. Header: text wordmark, nav (Beranda, Tentang Kami, Bidang Praktik, Profil Advokat, Kontak), WhatsApp "Konsultasi" pill, mobile hamburger (button with aria-expanded and aria-controls, markup only, JS comes in Stage 5). Remove the user icon circle. Hero: eyebrow, uppercase headline overlapping the rounded image, subtext, two buttons, then the 3 stat cards. Use a local labeled placeholder image (create assets/images/placeholders/hero.svg, 16:9). Use inline SVG icons. All text must be [Placeholder]-prefixed per AGENTS.md. No blur blobs.

### Stage 3: About and practice areas
> Stage 3 only. Build #tentang-kami (text + 4:5 image + two value cards, then the 3-card image row with captions) and #bidang-praktik (6 numbered cards with icon, title, one-sentence description, and a "Konsultasi Layanan" link to WhatsApp). Local placeholder SVGs with correct aspect ratios (4:5, 4:3). Use generic categories only and mark every description [Placeholder]. Match spacing and radius from the Stitch design.

### Stage 4: Lawyer, contact, footer
> Stage 4 only. Build #lawyer, #contact and the footer. Lawyer: 3:4 placeholder image labeled "Foto Advokat", name "[Placeholder] Nama Advokat, S.H.", two credential chips as placeholders. Contact: heading, short text, phone/email/address rows with `tel:` and `mailto:` links using placeholder values, big WhatsApp button (https://wa.me/62XXXXXXXXXX). No form. Footer: wordmark, address, contact, social links as placeholders with href="#", disclaimer line, copyright with the current year. Remove all "[Stage 4 Preview]" labels and the fake form.

### Stage 5: JavaScript
> Stage 5 only. Write js/main.js (no libraries): accessible mobile menu (toggle aria-expanded, close on link click, Esc, and outside click), smooth scroll with offset for the fixed header, scroll-spy that sets aria-current on the nav link of the visible section (IntersectionObserver), fade-in on scroll for elements with .reveal, all skipped when prefers-reduced-motion is set. Keep under ~100 lines.

### Stage 6: Responsive, accessibility, SEO
> Stage 6 only. Review and fix: layout at 375, 768, 1280 px (no horizontal scroll, readable type, tap targets ≥ 44px), heading order, contrast, focus states, alt text, `<title>`, meta description, Open Graph tags, favicon, canonical placeholder. Report each issue you found and what you changed. Do not redesign.

### Stage 7: Final audit
> Stage 7 only. Search the project for hotlinked images, Tailwind classes, hard-coded colors outside :root, console errors, unused CSS, and any invented facts. List every "[Placeholder]" with its file and line so I can replace them. Fix anything that breaks AGENTS.md rules. Do not add features.

---

## 7. How to start (OpenCode or Codex)

1. Open a terminal in the project folder and start the agent (`opencode` or `codex`).
2. Check it picked up `AGENTS.md` (both tools read it from the project root). In OpenCode you can also run `/init` and then merge anything useful into your file.
3. **Use plan mode for Stage 0** (in OpenCode, Tab switches between Plan and Build). Switch to build mode from Stage 1.
4. Paste the **Stage 0** prompt. After you approve, paste Stage 1, and so on.
5. After each stage: view the page, then `git add -A && git commit -m "stage N"`.
6. If the result is off, don't say "make it better". Point at one thing: "The hero headline should overlap the image by about 60px on desktop like the reference. Only change that."

Tips:
- Reference files by path in your prompt (both tools let you type `@` to pick a file).
- If the agent drifts (adds Tailwind, invents content, builds extra sections), reply: "Revert that. Re-read AGENTS.md and redo only Stage N."
- Optional: the design-skill plugins (Impeccable, UI/UX Pro Max, etc.) fit best at Stage 6 as a review pass. Read each README first, and apply only one at a time.

---

## 8. Replacing placeholders later (when real content arrives)

1. Search the project for `[Placeholder]` and `00+`, and replace each with real text
2. Replace files in `assets/images/placeholders/` with real photos (WebP, under ~200 KB, same aspect ratios) and update `src` and `alt`
3. Update the WhatsApp number (`wa.me/62...`), phone, email, address, map link
4. Have your mother review every sentence for ethics compliance
5. Re-run the Stage 7 audit, then deploy (Cloudflare Pages, Netlify, or GitHub Pages)