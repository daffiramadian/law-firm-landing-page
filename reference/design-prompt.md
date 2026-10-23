Design and build a one-page website for "Hartawati Law Firm", an Indonesian
law firm. Plain HTML, CSS and vanilla JavaScript only, no frameworks, no build step.

STRUCTURE (inspired by naralaw.co.id): header, hero, about, practice areas,
feature banner, lawyer profile, call to action, footer. Single page with
anchored sections.

VISUAL STYLE (inspired by the attached reference image):
- Warm, calm, premium. Sand and terracotta-brown on white and warm off-white.
- Colors as CSS variables: --bg #FFFFFF, --bg-warm #FAF6F0, --sand #E6D5BE,
  --accent #8A5A33, --text #1F1A16, --muted #6F655C
- Geometric sans-serif (Outfit or Urbanist) for headings, light weight (300-400).
  Body in Inter.
- Hero: very large light-weight headline that partly overlaps a rounded
  photo frame. Headline in uppercase.
- Images have 24-32px rounded corners. Buttons are pill-shaped: one solid
  white/dark, one outlined.
- In big headings, wrap 2-3 key words in the accent color.
- Small label above sections (e.g. "About Us"), small stat pairs
  (number + label), a three-card image row with a short caption under each.
- Lots of white space, thin borders, no heavy shadows, no gradients.

CONTENT RULES (design phase, no real content yet):
- Use realistic but generic placeholder copy in Indonesian, in the tone of a
  calm, professional law firm. Short, clear sentences.
- Every placeholder text must be easy to find and replace: prefix it with
  "[Placeholder]" or keep all copy inside one file (js/content.js) that the
  HTML reads from.
- Do NOT invent any specific facts: no real-sounding lawyer names, awards,
  bar numbers, case results, client names, testimonials, or statistics.
  Use "Nama Advokat", "00+ Tahun Pengalaman", "Alamat Kantor", 
  "+62 000 0000 0000", "email@hartawatilaw.com".
- Practice areas: use 6 generic, common categories (e.g. Corporate Law,
  Civil Litigation, Property & Land, Family Law, Employment, Contracts)
  with one placeholder sentence each. I will confirm the real list later.
- Images: use gray rounded boxes labeled with what goes there
  (e.g. "Hero photo 1600x900", "Lawyer portrait 4:5", "Office photo"),
  with correct aspect ratios and object-fit: cover so real photos drop in
  without breaking layout.
- No promotional claims ("best", "guaranteed"). Keep it informational.

TECHNICAL:
- Mobile-first, responsive at 375px, 768px, 1280px
- Semantic HTML, alt text on images, visible focus states, WCAG AA contrast
- Mobile hamburger menu, smooth scroll, subtle fade-in on scroll
  (respect prefers-reduced-motion)
- WhatsApp click-to-chat button (https://wa.me/62XXXXXXXXXX) and tel: link
- Title, meta description and Open Graph tags
- File structure: index.html, css/style.css, js/main.js, assets/images/

Work in stages and stop after each so I can review:
1. CSS variables, typography, base styles
2. Header and hero
3. About and practice areas
4. Lawyer profile, call to action, footer
5. Responsive and accessibility pass