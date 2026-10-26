# Daffi Law Firm: Work Package 3 (WP3) Continuity Guide

> **Project State:**
> - **WP1 (Header & Visual Polish):** COMPLETED (`a16a7f8`)
> - **WP2 (Practice Areas Hover Bug):** COMPLETED (`b3c9fd4`)
> - **Active Task:** **WP3: Replace FAQ with a Testimonials Marquee**
> - **Branch:** `master` (working tree clean)
> - **Tech Constraints:** Plain HTML, CSS, vanilla JS only. No npm dependencies, no frameworks. Do **not** move or restructure folders (`html/index.html` is served at `localhost:3000/html/`).

---

## 1. Copy-Paste Kickoff Prompt for the Next Agent

If starting a new session or switching agents, copy and paste this exact prompt:

```markdown
We are continuing the Round 2 upgrade for the Daffi Law Firm website.

STATUS:
- WP1 and WP2 are COMPLETED and committed to git.
- The working tree is clean.
- Read AGENTS.md and WP3-CONTINUITY.md.
- Entry point is html/index.html (served at localhost:3000/html/). Do NOT move or rename folders. Plain HTML, CSS, vanilla JS only.

YOUR TASK (WP3: Replace FAQ with Testimonials Marquee):
1. Completely remove the FAQ section (#faq) from html/index.html, css/style.css, and js/main.js.
2. Insert the Testimonials section (#testimoni) in its place (dark --espresso panel, 32px radius, container width).
3. Build the 2-row infinite marquee in vanilla JS + CSS:
   - Row 1 scrolls left (~40px/s); Row 2 scrolls right (~30px/s); single row below 640px.
   - JS clones cards once per row with aria-hidden="true" and inert for a seamless loop.
   - Constant speed in px/s dynamically calculated from track width.
   - Pause on :hover, :focus-within, IntersectionObserver (off-screen), and a visible Play/Pause toggle button (aria-pressed, WCAG 2.2.2).
   - prefers-reduced-motion: NO animation and NO clones; render a static horizontally scrollable row with scroll-snap.
   - Edge fade masks (mask-image: linear-gradient).
4. Populate with the 8 fictional clients from WP3-CONTINUITY.md section 4 (no star ratings, no outcome claims).
5. Stop after WP3, summarize what changed (files and why), test loop & controls, and wait for my approval before WP4.
```

---

## 2. WP3 Detailed Specification

### 2.1 Complete Removal of FAQ
1. **`html/index.html`:**
   - Remove `<section class="faq" id="faq">...</section>` (lines ~475–530).
2. **`css/style.css`:**
   - Search for `faq` and delete `.faq`, `.faq-panel`, `.faq-accordion`, and FAQ-specific button overrides.
3. **`js/main.js`:**
   - Verify there are no leftover accordion event listeners.

### 2.2 Section Placement & Panel Architecture
- **Location:** In `html/index.html`, insert `#testimoni` directly where `#faq` was (between `#alur-penanganan` and `#contact`).
- **Styling:**
  - Panel container: matches `.container` width (`max-width: var(--container-max)`).
  - Panel background: `var(--espresso)` (#231710), border-radius: `var(--radius-panel)` (32px), padding: `var(--space-2xl) var(--space-lg)` (desktop `var(--space-3xl) var(--space-2xl)`).
  - Header block inside panel:
    - Pill tag: `<span class="pill-tag pill-tag--on-dark reveal">Testimoni</span>`
    - Title: `<h2 class="reveal">Kepercayaan <em class="accent-italic">Klien</em> Kami</h2>`
    - Subtext: `<p class="reveal" style="color: var(--text-on-dark-soft); max-width: 36rem;">Pengalaman klien dalam berkomunikasi dan berkonsultasi mengenai persoalan hukum mereka.</p>`
    - Play/Pause Button: `<button type="button" class="marquee-toggle" aria-label="Jeda animasi testimoni" aria-pressed="false"><svg ...></svg><span>Jeda</span></button>` (WCAG 2.2.2).

### 2.3 Marquee Mechanics (Vanilla JS + CSS)
- **Markup:**
  ```html
  <div class="testimoni-marquee-wrapper">
    <!-- Row 1: scrolls left -->
    <div class="marquee marquee--left" aria-label="Testimoni baris pertama">
      <div class="marquee-track" data-track="1">
        <!-- 4 cards (Budi S., Rina A., Agus P., Dewi L.) -->
      </div>
    </div>
    <!-- Row 2: scrolls right -->
    <div class="marquee marquee--right" aria-label="Testimoni baris kedua">
      <div class="marquee-track" data-track="2">
        <!-- 4 cards (Hendra W., Maya K., Andi R., Sari N.) -->
      </div>
    </div>
  </div>
  ```
- **Cloning & Loop (in `js/main.js`):**
  - Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If true, do **NOT** clone and do **NOT** animate.
  - If motion allowed: clone all child cards of each `.marquee-track` once.
  - Set `aria-hidden="true"` and `inert` on all cloned cards so screen readers and keyboard Tab ignore them.
  - Calculate `animation-duration` in JS: `duration = trackWidth / speed` (Row 1: ~40px/s, Row 2: ~30px/s).
- **CSS Animation:**
  - Row 1: `@keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }`
  - Row 2: `@keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }`
  - `animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform;`
- **Pause Controls:**
  - `.testimoni-marquee-wrapper:hover .marquee-track { animation-play-state: paused; }`
  - `.testimoni-marquee-wrapper:focus-within .marquee-track { animation-play-state: paused; }`
  - `.marquee-track.is-paused { animation-play-state: paused !important; }`
  - Play/Pause toggle button toggles `.is-paused` and updates `aria-pressed="true|false"` + icon/label.
  - `IntersectionObserver`: Pauses animations when `#testimoni` is not in viewport.
- **Edge Fade Mask:**
  - Apply to `.marquee`: `mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);`
  - `-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);`
- **Reduced Motion Fallback (`prefers-reduced-motion: reduce`):**
  - No cloning, no CSS animation.
  - `.marquee-track` displays as a native horizontally scrollable container: `overflow-x: auto; scroll-snap-type: x mandatory; gap: var(--space-md);`
  - Cards have `scroll-snap-align: start;` and standard visible focus rings.

---

## 3. Card Design Spec
- **Dimensions:** Width `360px` desktop, `300px` on mobile (<640px); `border-radius: var(--radius-card)` (20px); flex-shrink 0.
- **Surface:** `background-color: var(--espresso-2)` (#2E1F16); border: `1px solid rgba(255, 255, 255, 0.1)`.
- **Card Padding:** `var(--space-lg)` (24px).
- **Inside Card:**
  1. **Quote Icon:** Inline SVG (`<svg ...><path d="M... quote mark" fill="var(--caramel)" .../></svg>`), size 24px.
  2. **Quote Text:** 3-4 lines, Newsreader serif or Plus Jakarta Sans, `color: var(--text-on-dark); font-size: 0.95rem; line-height: 1.5;`.
  3. **Divider:** `1px solid rgba(255, 255, 255, 0.08); margin: var(--space-md) 0;`.
  4. **Author Row:** Flex container:
     - Avatar: `48px` round (`border-radius: 50%`, `object-fit: cover`, border `1px solid var(--caramel)` or placeholder neutral avatar).
     - Author Info:
       - Name: `font-family: var(--font-heading); font-size: 0.9rem; font-weight: 600; color: var(--text-on-dark);`
       - Descriptor: `font-size: 0.8rem; color: var(--text-on-dark-soft);`

---

## 4. The 8 Testimonial Clients (Fictional Copy)

### Row 1 (Track 1)
1. **Budi S.** · *Pemilik Usaha Kecil*
   > "Penjelasannya runtut dan mudah dipahami. Saya selalu tahu sampai di mana prosesnya."
2. **Rina A.** · *Karyawan Swasta*
   > "Respons cepat dan komunikatif. Dokumen yang rumit dijelaskan dengan sabar."
3. **Agus P.** · *Wiraswasta*
   > "Pendampingan yang tenang dan profesional di saat saya sedang kebingungan."
4. **Dewi L.** · *Ibu Rumah Tangga*
   > "Kerahasiaan dijaga dengan baik dan saya merasa didengar sejak konsultasi pertama."

### Row 2 (Track 2)
5. **Hendra W.** · *Direktur Perusahaan Distribusi*
   > "Kontrak kerja sama kami dibaca dengan sangat teliti sebelum kami menandatanganinya."
6. **Maya K.** · *Pemilik Properti*
   > "Sarannya jujur, termasuk risiko yang perlu saya pertimbangkan sebelum mengambil keputusan."
7. **Andi R.** · *Pengusaha Kuliner*
   > "Biaya dan tahapan dijelaskan di awal, jadi tidak ada kejutan di tengah jalan."
8. **Sari N.** · *Pegawai Swasta*
   > "Mudah dihubungi dan selalu memberi kabar perkembangan perkara."

---

## 5. Acceptance Checklist for WP3
- [ ] No trace of `faq` in markup, styles, or scripts (search codebase for `faq`).
- [ ] `#testimoni` rendered in espresso panel matching container width.
- [ ] Row 1 loops smoothly to the left, Row 2 loops smoothly to the right.
- [ ] No seam, gap, or jump at the 50% loop restart point.
- [ ] Hovering over the marquee pauses both rows.
- [ ] Focusing inside with keyboard Tab pauses the marquee.
- [ ] Clicking the Play/Pause button toggles `is-paused` and updates `aria-pressed`.
- [ ] Off-screen scrolling pauses animation (IntersectionObserver).
- [ ] Screen reader / Tab does not hit clones (`aria-hidden="true"`, `inert`).
- [ ] With `prefers-reduced-motion: reduce`, cards render statically in a horizontally scrollable snap-row.
- [ ] Zero layout shift and zero horizontal page overflow.
