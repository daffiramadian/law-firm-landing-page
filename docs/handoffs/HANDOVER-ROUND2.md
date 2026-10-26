# Daffi Law Firm: Agent Handover (Round 2)

> **Status:** WP1 is **COMPLETED & COMMITTED** (`feat(wp1): fix header overlap, arrow button icons, and visual polish`).  
> **Next Task:** Start immediately with **WP2: Practice Areas Hover Bug**.

---

## 1. Ground Rules & Workspace Architecture
- **Tech stack:** Plain HTML, CSS, vanilla JS only. Zero npm dependencies, no build steps, no frameworks.
- **Entry point:** `html/index.html` (served at `localhost:3000/html/`). **Do NOT move or rename folders.**
- **Styles & Scripts:** `css/style.css`, `js/main.js`.
- **DUMMY MODE:** Active in `AGENTS.md`. Dummy content is allowed provided elements have `data-dummy`, phone/email use `0000`/`example.com`, and no promotional outcome claims ("menang", "100%", star ratings).

---

## 2. Immediate Task: WP2 (Practice Areas Hover Bug)

### 2.1 Problem Summary
Hovering a row expands it (description appears, row height grows), pushing rows below it down. Near borders, layout shift moves the row out from under the cursor, causing a flicker loop. Exit/enter transition overlaps cause two rows to look highlighted at once, and the preview card jumps around.

### 2.2 Required Behavior
1. **Zero layout shift on hover/focus:** Row height must remain constant. Permanently reserve space for the description line on desktop (e.g. fixed `min-height` or CSS grid row sizing). Only animate `opacity`, `transform`, `background-color`, `color`. Never animate `height`, `margin`, or `padding`.
2. **No dead zones between rows:** Rows must touch directly. Separators must be `border` or `box-shadow inset`, not margin or gap.
3. **Single active row controller (in `js/main.js`):**
   - `pointerenter` on a row sets `.is-active` and clears all siblings.
   - `pointerleave` on `.practice-list` (the container) clears all `.is-active`.
   - `focus-visible` activates row; `blur` clears it.
   - Exit transition ~100ms, enter transition ~200ms.
4. **Preview image card:** `position: absolute; pointer-events: none;`, transform and opacity only. Stays inside container.
5. **Mobile/Touch:** Wrap hover effects in `@media (hover: hover) and (pointer: fine)`. On touch/mobile: descriptions are always visible, row is a normal tappable link.
6. **Accessibility:** Rows are `<a>` tags; keyboard Tab follows active state; Enter follows link. Respect `prefers-reduced-motion`.

### 2.3 Six-Step Test Protocol (Report Results)
1. Slowly drag cursor vertically across every boundary between rows (2-3px above/below). Highlight must switch cleanly once per crossing with zero flicker.
2. Hold cursor at bottom edge of a row for 3 seconds. State must remain stable.
3. Sweep quickly up and down. No frame where two rows are highlighted.
4. Measure `document.documentElement.scrollHeight` before, during, and after hover. Must be identical.
5. Move cursor onto preview card area: row beneath still receives hover, preview never intercepts pointer.
6. Tab through rows with keyboard.

---

## 3. Subsequent Work Packages Roadmap

- **WP3: Replace FAQ with Testimonials Marquee:**
  - Remove FAQ section completely (markup, CSS, JS).
  - Add `#testimoni` in its place (espresso panel, 32px radius, container width).
  - 2-row marquee (row 1 left at ~40px/s, row 2 right at ~30px/s; single row on <640px).
  - Vanilla JS cloning (`aria-hidden="true"`, `inert`), pause button (`aria-pressed`), pause on hover/focus, edge fade masks.
  - Reduced-motion: native scroll-snap row without cloning.
  - 8 client cards (see Appendix A.4 below).
- **WP4: Navigation Expansion:**
  - Add `#alur` and `#testimoni` links in header in exact DOM order: Beranda (`#hero`), Tentang (`#tentang-kami`), Praktik (`#bidang-praktik`), Alur (`#alur-penanganan`), Testimoni (`#testimoni`), Advokat (`#lawyer`), Kontak (`#contact`).
  - Breakpoints: $\ge 1440$px full; 1100-1439px compact single line (CTA "Konsultasi"); $< 1100$px hamburger menu.
  - Scroll-spy & animated underline updated for all 7 sections.
- **WP5: Dummy Data & Images:**
  - Remove visible `[Placeholder]` prefixes.
  - Inject natural copy from Appendix A.
  - Generate/save dummy images in `assets/images/dummy/` with exact filenames from Appendix B.
  - Add `data-dummy` to all dummy elements, `<meta name="robots" content="noindex, nofollow">`, `<!-- DUMMY DATA, DO NOT PUBLISH -->`, and create `DUMMY_CONTENT.md`.
  - Implement `?dummy` URL flag in `js/main.js` (outlines `[data-dummy]` in dashed red).
- **WP6: Final QA & Report:**
  - Viewports: 375, 414, 768, 1024, 1280, 1440, 1920 px.
  - Zero console errors/warnings, accessibility audit, performance check, update `Plan.md`.

---

## Appendix A: Content Reference

### A.1 Stats
- 15+ Tahun Pengalaman | 300+ Perkara Ditangani | 250+ Klien Didampingi | 6 Bidang Praktik

### A.2 Practice Areas
1. **Hukum Korporat** · Korporasi · Pendirian badan usaha, penyusunan dan peninjauan kontrak, serta kepatuhan hukum perusahaan.
2. **Litigasi Komersial** · Litigasi · Pendampingan penyelesaian sengketa bisnis di pengadilan, dari analisis perkara hingga persidangan.
3. **Arbitrase & Mediasi** · Penyelesaian Sengketa · Penyelesaian sengketa di luar pengadilan yang efisien dan menjaga hubungan para pihak.
4. **Hukum Perburuhan** · Ketenagakerjaan · Perjanjian kerja, peraturan perusahaan, dan penyelesaian perselisihan hubungan industrial.
5. **Hukum Properti** · Properti · Pemeriksaan legalitas tanah, jual beli, sewa-menyewa, dan sengketa kepemilikan properti.
6. **Konsultasi Umum** · Konsultasi · Diskusi awal untuk memahami persoalan hukum Anda dan menentukan langkah yang tepat.

### A.3 Process Steps
1. **Konsultasi Awal**: Pertemuan untuk memahami kebutuhan, situasi, dan dokumen yang Anda miliki.
2. **Analisis Perkara**: Evaluasi dokumen dan peraturan yang berlaku untuk memetakan posisi hukum Anda.
3. **Strategi**: Penyusunan rencana langkah yang realistis, termasuk tahapan, perkiraan waktu, dan biaya.
4. **Pendampingan**: Pelaksanaan strategi dengan pembaruan berkala hingga persoalan terselesaikan.

### A.4 Testimonials (8 Fictional Clients)
- **Budi S. · Pemilik Usaha Kecil:** Penjelasannya runtut dan mudah dipahami. Saya selalu tahu sampai di mana prosesnya.
- **Rina A. · Karyawan Swasta:** Respons cepat dan komunikatif. Dokumen yang rumit dijelaskan dengan sabar.
- **Agus P. · Wiraswasta:** Pendampingan yang tenang dan profesional di saat saya sedang kebingungan.
- **Dewi L. · Ibu Rumah Tangga:** Kerahasiaan dijaga dengan baik dan saya merasa didengar sejak konsultasi pertama.
- **Hendra W. · Direktur Perusahaan Distribusi:** Kontrak kerja sama kami dibaca dengan sangat teliti sebelum kami menandatanganinya.
- **Maya K. · Pemilik Properti:** Sarannya jujur, termasuk risiko yang perlu saya pertimbangkan sebelum mengambil keputusan.
- **Andi R. · Pengusaha Kuliner:** Biaya dan tahapan dijelaskan di awal, jadi tidak ada kejutan di tengah jalan.
- **Sari N. · Pegawai Swasta:** Mudah dihubungi dan selalu memberi kabar perkembangan perkara.

### A.5 Lawyer Profile
- Name: Daffi, S.H., M.H. | Role: Advokat & Pendiri | Chips: Advokat Terdaftar · Magister Hukum
- Education: Fakultas Hukum, Universitas Negeri · Pendidikan Profesi Advokat

### A.6 Contact
- Alamat: Jl. Merdeka Raya No. 12, Jakarta Selatan 12000 | Telp: +62 21 0000 0000 | WA: +62 812 0000 0000 | Email: halo@example.com

---

## Appendix B: Dummy Images Reference (`assets/images/dummy/`)
- `hero-portrait.webp` (4:5, 1200×1500)
- `about-office.webp` (4:5, 1000×1250)
- `about-detail.webp` (3:2, 1200×800)
- `practice-korporat.webp` ... `practice-konsultasi.webp` (4:3, 800×600)
- `lawyer-portrait.webp` (3:4, 900×1200)
- `testimonial-1.webp` ... `testimonial-8.webp` (1:1, 200×200)
- `og-image.jpg` (1200×630)
