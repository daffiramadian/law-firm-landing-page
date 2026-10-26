# Daffi Law Firm: UI Upgrade Plan (from "bland" to "memorable")

Base site works. This plan fixes the nav and adds personality, using the Behance lawyer site as *inspiration*. We borrow the ideas, not the design: your palette, content and fonts stay.

---

## 1. Why it feels bland (from your recording)

| Problem | What you see | Fix |
|---|---|---|
| Nav is faint | Tiny low-contrast links, no active indicator, header blends into the page | Stronger header, bigger links, animated underline, scroll-spy |
| Hero is text on empty cream | Headline is modest, a gray box sits below it | Dark rounded hero card, huge headline, portrait slot, stats inside |
| Every section looks the same | Same cream and pale-pink background, same rounded white cards | Alternate light, sand and dark sections |
| Pinkish tint | `#fdf1ea` reads pink next to white cards | Switch to warm sand and espresso |
| Practice areas are 6 identical cards | Nothing to interact with | Editorial list rows with hover reveal |
| No "moments" | No big type, no contrast, no interaction | One signature element per section (below) |
| Empty gray image boxes | Page looks unfinished | Temporary line-art placeholders until real photos arrive |

---

## 2. What the reference does well (ideas to borrow)

1. **Dark hero panel** with a strong portrait, huge headline, and a stats strip along the bottom
2. **Floating glass card** over the hero image (small trust or info card)
3. **Practice list as table rows**: title / category tag / arrow. On hover the row fills with the accent color and an image preview pops out.
4. **Outlined pill tags** above section titles
5. **Pill button with a circular arrow** as the signature CTA
6. **FAQ accordion on a dark panel**
7. **Process path**: steps connected by a curved line
8. **Giant typographic moment** (oversized name as a graphic)

**Do NOT copy:** its teal and gold colors, its layout 1:1, its fake rating badge ("4.9, 2k+ reviews"), or "success rate 95%" style stats. Those are promotional claims that advocate ethics rules restrict, and they would be invented numbers on your site.

---

## 3. Design system changes

### Palette (replaces the pinkish surfaces)

```css
:root {
  /* light */
  --bg:         #FFFFFF;
  --bg-warm:    #FAF6F0;   /* main page background */
  --sand:       #EFE3D0;   /* alternate sections */
  --sand-deep:  #E6D5BE;   /* chips, hover fills */
  --line:       #E4D8C8;   /* 1px borders */

  /* dark */
  --espresso:   #231710;   /* hero, FAQ, footer */
  --espresso-2: #2E1F16;   /* cards on dark */

  /* accents */
  --accent:     #7A4E2B;   /* on light backgrounds (keep from Stitch) */
  --caramel:    #D2A06B;   /* on dark backgrounds, CTA fill */

  /* text */
  --text:       #201B17;
  --text-soft:  #51443C;
  --text-on-dark:      #F6EDE1;
  --text-on-dark-soft: #CDBBA6;
}
```
Dark sections must use `--caramel` and `--text-on-dark*` only (the contrast is fine on `--espresso`). Brown `--accent` on espresso is too dark to read.

### Typography moves
- Hero headline: `clamp(2.6rem, 7vw, 5rem)`, weight 300, uppercase, tight leading (~1.05)
- **Signature touch:** accent words switch to *Newsreader italic* in caramel/accent, inside the sans headline. An editorial look that makes the headline feel designed.
- Section titles: `clamp(2rem, 4.5vw, 3.25rem)`, same italic accent trick
- Eyebrows become **outlined pill tags** (1px border, 12px uppercase, letter-spacing 0.1em)

### Shape and rhythm
- Section padding 96 to 128px desktop, 64px mobile
- Order of backgrounds: hero (dark) → about (sand) → practice (warm) → process (sand) → FAQ (dark panel inside warm) → contact (warm) → footer (dark)
- Radius: 32px on big panels, 20px on cards, 999px on pills
- Keep: thin borders, no heavy shadows, no blur blobs

### Signature button
Pill with a **circular arrow icon** at the right:
`[ Mulai Konsultasi (↗) ]`. The arrow circle rotates 45° and the pill's fill shifts on hover.

---

## 4. Section-by-section spec

### Header (fixes "can't see the nav")
- Fixed, height 80px (72px after scrolling), background `rgba(250,246,240,.92)` + `backdrop-filter: blur(10px)`, `border-bottom: 1px solid var(--line)`
- Links: 13px, uppercase, weight 600, letter-spacing 0.08em, color `--text`
- **Active link:** color `--accent` plus a 2px underline bar that animates in with `transform: scaleX(0 → 1)`, origin left, 250ms
- Hover: underline at 60% width. Focus-visible: 2px outline.
- Active state is set by scroll-spy (`aria-current="true"` on the link of the visible section); the underline is styled from that attribute
- Right side: signature pill "Konsultasi" in `--accent` fill
- Mobile: full-width dropdown or full-screen menu, large tap targets

### Hero (dark card)
- Inside the page margins (16px mobile, 24px desktop), `--espresso`, radius 32px, min-height ~680px desktop
- Left: outlined pill tag, giant headline (2 words in italic caramel), 1 to 2 line subtext, signature CTA in caramel + a text link
- Right: portrait slot (4:5, bottom-aligned, slightly overflowing the card bottom edge). Placeholder = line-art figure on a sand-tinted shape. The real portrait later should be a clean, well-lit photo of your mother.
- Floating glass card (border `1px rgba(255,255,255,.18)`, background `rgba(255,255,255,.06)`, blur): **"Konsultasi Awal · [Placeholder] Senin–Jumat, 09.00–17.00"**. No ratings or review counts.
- Bottom strip: 4 stats separated by thin vertical lines, each with a small icon, a 44px light number and a label. All values stay `[Placeholder] 00+` until real.
- Remove the gray "Hero Image" box entirely.

### About ("Tentang Kami"), sand background
- Large statement paragraph (28 to 36px, weight 300, key phrase in italic accent) in the left column
- Right column: a large decorative quote mark, a short paragraph, and two numbered value points (01, 02) separated by thin lines
- Small portrait or office photo slot with a rotated sand shape behind it

### Practice areas, **the signature section**
- Header row: pill tag + 2-line title (left), short text + outlined pill button (right)
- Below, a list. Column heads: *Bidang* / *Kategori* / (arrow)
- 6 rows, each: number `01`, title (clamp 1.4 to 2.25rem), outlined category pill, circular arrow button, 1px divider
- **Hover/focus (desktop):** row background fills `--sand-deep` (radius 20px), arrow circle fills dark, description fades in, and a small rotated image card (placeholder) appears on the right side of the row
- **Mobile:** no hover. Each row shows its description under the title, and the arrow links to `#contact`.
- Rows are real `<a>` elements (keyboard focusable)

### Process ("Alur Penanganan"), sand background
- 4 steps: Konsultasi Awal → Analisis Perkara → Strategi → Pendampingan (all placeholder descriptions)
- Desktop: staggered cards (dark `--espresso-2`) joined by a dashed curved SVG path, big step numbers `01` to `04`
- Mobile: vertical stack with a straight line
- Optional. Cut this if it feels too busy.

### FAQ, dark panel
- Rounded dark panel (radius 32px) with the pill tag + "Pertanyaan yang Sering Diajukan", a CTA
- Accordion using `<details><summary>`: 5 questions as placeholders (first consultation, fees, confidentiality, duration, documents). Plus icon rotates to ×, smooth open animation. Answers are `[Placeholder]`.

### Contact
- Keep WhatsApp-first. Large heading, 3 info rows (phone, email, address) with circular icon badges, a big signature WhatsApp pill. No form.

### Footer
- Dark, links in 3 columns, thin top border
- **Giant "DAFFI" wordmark** across the bottom: `font-size: clamp(4rem, 18vw, 16rem)`, weight 300, color `rgba(246,237,225,.08)`, cropped by the bottom edge. This is the typographic moment.

### Motion (small and restrained)
- Reveal on scroll with stagger (60ms steps), 24px rise + fade
- Hero headline lines slide up once on load
- Hover micro-interactions on buttons, rows, cards
- Everything disabled under `prefers-reduced-motion`

### Placeholder art (until real photos exist)
Replace gray boxes with simple **line-art SVGs** in sand/caramel strokes: building columns, scales of justice, an arch window. Each keeps the same aspect ratio and a tiny label ("Foto Advokat 4:5"), so real photos drop in later without layout changes.

---

## 5. Update AGENTS.md first

Add this to the Design section of `AGENTS.md`:

```markdown
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
```

Also take 2 screenshots from the Behance video (the dark hero with stats, and the "Legal Works" list with the highlighted row) and save them in `reference/ui-inspiration/`. If your agent's model supports images, mention them by path.

---

## 6. Stages and prompts

Same workflow as before: one stage, review in the browser (phone and desktop), `git commit`, next stage. Start with a commit of the current state.

### U1: Tokens, rhythm, header and nav
> Read AGENTS.md and UPGRADE.md (sections 3 and 4). Stage U1 only. (1) Update the CSS variables in css/style.css to the palette in UPGRADE.md §3 and remove the old pinkish surface colors; replace usages. (2) Add the outlined pill-tag style, the signature button with circular arrow (.btn-arrow), and the italic-accent heading style (.accent-italic). (3) Rebuild the header per §4 "Header": stronger contrast, 13px uppercase links, animated underline from aria-current, scrolled state (.is-scrolled), mobile menu. (4) Update js/main.js scroll-spy so the active section link gets aria-current="true"; it must work for all five sections. Do not touch other sections' layout yet. List what you changed.

**Check:** you can clearly see the nav, hover shows an underline, scrolling moves the underline to the section you're in.

### U2: Hero
> Stage U2 only. Rebuild the hero per UPGRADE.md §4 "Hero (dark card)". Dark rounded card, outlined tag, giant headline with two italic caramel words, subtext, signature CTA, portrait slot (4:5, line-art SVG placeholder in assets/images/placeholders/), floating glass info card (placeholder opening hours, no ratings), and the bottom stats strip (4 items with inline SVG icons, [Placeholder] 00+ values). Remove the gray hero image box. Mobile: stack text, then portrait, then stats in a 2x2 grid.

### U3: Practice areas list
> Stage U3 only. Replace the 6 practice cards in #bidang-praktik with the editorial list from UPGRADE.md §4 "Practice areas". Keep the same 6 placeholder titles. Rows are <a href="#contact"> elements with number, title, category pill, circular arrow. Desktop hover/focus: sand-deep fill, arrow fills dark, description fades in, small rotated placeholder image card appears. Mobile: description always visible, no hover image. Pure CSS where possible; keyboard focus must behave like hover.

### U4: About and process
> Stage U4 only. Restyle #tentang-kami per UPGRADE.md §4 "About" on the sand background (large statement, quote mark, two numbered value points, photo slot with rotated shape). Then add a new section "Alur Penanganan" after practice areas per "Process": 4 placeholder steps with a dashed SVG curved path on desktop and a vertical line on mobile. Keep all text as [Placeholder].

### U5: FAQ, contact, footer
> Stage U5 only. Add a FAQ section (dark rounded panel, <details>/<summary> accordion, 5 placeholder questions, first one open, plus/× icon animation) between the process and contact sections. Restyle #contact per spec (WhatsApp-first, 3 info rows with circular icons, no form). Rebuild the footer with 3 link columns and the giant DAFFI wordmark across the bottom (clamp(4rem,18vw,16rem), weight 300, 8% opacity, cropped). Add FAQ to the nav only if it fits; otherwise leave nav as is.

### U6: Motion, polish, QA
> Stage U6 only. Add reveal-on-scroll with 60ms stagger, hero headline load animation, and hover micro-interactions as described in UPGRADE.md §4 "Motion". Disable all of it under prefers-reduced-motion. Then audit at 375, 768, 1280 and 1920 px: no horizontal scroll, tap targets ≥ 44px, contrast AA (especially text on dark sections), heading order, focus states. Report each issue and fix it. Do not add new sections or change content.

---

## 7. If something looks off, say it like this

- "The nav underline doesn't move when I scroll. Only fix the scroll-spy."
- "Hero headline should be bigger on desktop (about 80px) and break into 3 lines. Only change that."
- "The practice rows' hover image covers the text. Move it further right. Only change that."
- "Revert the last change; it broke the mobile layout. Redo it with only the CSS for this section."

## 8. Later (when real content exists)

- **Photos matter most.** A clean portrait of your mother (neutral or dark background, soft light, professional attire) and 3 to 4 office or detail shots will do more for this design than any CSS. Shoot or edit the portrait with a dark or warm background so it merges with the hero.
- Real numbers in stats (only if she is comfortable publishing them and they comply with advocate ethics rules)
- Replace line-art placeholders and re-run the Stage 7 placeholder audit from `PLAN.md`
