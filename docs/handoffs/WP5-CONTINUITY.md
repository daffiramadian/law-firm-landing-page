# Daffi Law Firm: Work Package 5 (WP5) Continuity Guide

> **Project State:**
> - **WP1–WP4:** COMPLETED & committed
> - **WP5 (Dummy Data):** PARTIALLY COMPLETE — committed in `4707e6d`
> - **Branch:** `master` (working tree clean)
> - **Stack:** Plain HTML, CSS, vanilla JS only. No frameworks.

---

## 1. Copy-Paste Kickoff Prompt

```markdown
We are continuing Work Package 5 (WP5: Dummy Data) for the Daffi Law Firm website.

STATUS:
- WP1 through WP4 are fully completed and committed.
- WP5 is PARTIALLY complete (commit 4707e6d). Read AGENTS.md and WP5-CONTINUITY.md.
- Entry point is html/index.html (served at localhost:3000/html/). Do NOT move or rename folders. Plain HTML, CSS, vanilla JS only.

YOUR TASK: Complete the remaining 18 [Placeholder] items in html/index.html as listed in WP5-CONTINUITY.md section 2. Follow the dummy content rules in AGENTS.md strictly. When finished, run: Select-String -Path html\index.html -Pattern "\[Placeholder\]" and confirm 0 results. Then update DUMMY_CONTENT.md (creating it if absent), commit with message "feat(wp5): complete dummy data and DUMMY_CONTENT.md", and stop for approval before WP6.
```

---

## 2. Remaining [Placeholder] Items (18 total)

All in `html/index.html`. Replace exactly as shown; add `data-dummy` on the nearest element.

### Lawyer Section (lines ~416–429)

**Line 416** — Lawyer portrait image:
```html
<!-- BEFORE -->
<img src="../assets/images/placeholders/lawyer.svg" alt="[Placeholder] Foto advokat">

<!-- AFTER -->
<img src="../assets/images/dummy/lawyer-portrait.webp"
     alt="Daffi, S.H., M.H., Advokat Pendiri Daffi Law Firm"
     width="900" height="1200" loading="lazy" data-dummy>
```

**Line 423** — Lawyer name:
```html
<!-- BEFORE -->
<h2 class="lawyer-name">[Placeholder] Nama Advokat, S.H.</h2>

<!-- AFTER -->
<h2 class="lawyer-name" data-dummy>Daffi, S.H., M.H.</h2>
```

**Lines 425–426** — Credential chips:
```html
<!-- BEFORE -->
<span class="credential-chip">[Placeholder] Pengacara Terdaftar</span>
<span class="credential-chip">[Placeholder] Spesialis Hukum Komersial</span>

<!-- AFTER -->
<span class="credential-chip" data-dummy>Advokat Terdaftar</span>
<span class="credential-chip" data-dummy>Magister Hukum</span>
```

**Line 429** — Lawyer bio:
```html
<!-- BEFORE -->
[Placeholder] Profil singkat advokat dengan fokus pada litigasi komersial dan konsultasi hukum perusahaan.

<!-- AFTER (data-dummy on the <p> tag) -->
Daffi, S.H., M.H. memiliki pengalaman lebih dari 15 tahun dalam pendampingan hukum korporat dan litigasi komersial di Indonesia. Berpendidikan dari Fakultas Hukum Universitas Negeri dan Pendidikan Profesi Advokat, beliau mendirikan kantor ini dengan komitmen pada integritas dan komunikasi yang jelas kepada setiap klien.
```

---

### Process Section (lines ~451–476)

Strip `[Placeholder]` prefix from all 4 titles, add `data-dummy` on the `<div class="process-step-card">`:

**Step 01:**
- Title: `Konsultasi Awal`
- Description: `Pertemuan untuk memahami kebutuhan, situasi, dan dokumen yang Anda miliki.`

**Step 02:**
- Title: `Analisis Perkara`
- Description: `Evaluasi dokumen dan peraturan yang berlaku untuk memetakan posisi hukum Anda.`

**Step 03:**
- Title: `Strategi`
- Description: `Penyusunan rencana langkah yang realistis, termasuk tahapan, perkiraan waktu, dan biaya.`

**Step 04:**
- Title: `Pendampingan`
- Description: `Pelaksanaan strategi dengan pembaruan berkala hingga persoalan terselesaikan.`

---

### Contact Section (lines ~689–722)

**Line 689** — Contact heading:
```html
<!-- BEFORE -->
<h2 class="reveal">[Placeholder] Diskusi Awal <span class="accent-italic-light">Hukum Anda</span></h2>

<!-- AFTER -->
<h2 class="reveal">Mulai Diskusi <em class="accent-italic-light">Hukum Anda</em></h2>
```

**Line 700** — Email:
```html
<!-- BEFORE -->
<div class="contact-value"><a href="mailto:email@example.invalid">[Placeholder] email@example.invalid</a></div>

<!-- AFTER -->
<div class="contact-value" data-dummy><a href="mailto:halo@example.com">halo@example.com</a></div>
```

**Line 704** — Phone (already clean: `+62 000 0000 0000` — keep as-is, no placeholder prefix):
> Check if `+62 000 0000 0000` is already present. If still a `[Placeholder]`, update to: `<a href="tel:+622100000000">+62 21 0000 0000</a>` with `data-dummy`.

**Line 722** — Address:
```html
<!-- BEFORE -->
<div class="contact-value">[Placeholder] Alamat Kantor, Jakarta</div>

<!-- AFTER -->
<div class="contact-value" data-dummy>Jl. Merdeka Raya No. 12, Jakarta Selatan 12000</div>
```

**Line 720** — WhatsApp link: Update `href="https://wa.me/62XXXXXXXXXX"` → `href="https://wa.me/6281200000000"` with `data-dummy`.

---

### Footer (lines ~747–762)

**Line 747** — Footer tagline:
```html
<!-- BEFORE -->
[Placeholder] Pendampingan hukum untuk individu dan korporasi di Indonesia.

<!-- AFTER (data-dummy on the <p> tag) -->
Pendampingan hukum untuk individu dan korporasi di Indonesia.
```

**Line 762** — Footer email:
```html
<!-- BEFORE -->
<p><a href="mailto:email@example.invalid">[Placeholder] email@example.invalid</a></p>

<!-- AFTER -->
<p data-dummy><a href="mailto:halo@example.com">halo@example.com</a></p>
```

Also update any footer WhatsApp `href` from `62XXXXXXXXXX` → `6281200000000` with `data-dummy`.

---

## 3. After All Replacements: Create DUMMY_CONTENT.md

Create `d:\daffi-law-firm\DUMMY_CONTENT.md` with this content:

```markdown
# DUMMY_CONTENT.md

All items below are dummy data marked with data-dummy in html/index.html.
Replace with real content before publishing. Remove meta name="robots" noindex,nofollow after replacement.

| Section | Element | Dummy Value | Replace With |
|---|---|---|---|
| Head | meta description | Layanan konsultasi... | Real description |
| Head | og:description | Layanan konsultasi... | Real description |
| Head | og:image | /assets/images/dummy/og-image.jpg | Real OG image |
| Hero | pill tag | Advokat & Konsultan Hukum | Real credential tag |
| Hero | hero-subtext | Layanan hukum profesional... | Real tagline |
| Hero | CTA href | wa.me/6281200000000 | Real WhatsApp number |
| Hero | portrait img | /assets/images/dummy/hero-portrait.webp | Real portrait photo |
| Hero | glass card text | Senin–Jumat, 09.00–17.00 | Real office hours |
| Stats | Tahun Pengalaman | 15+ | Real number |
| Stats | Perkara Ditangani | 300+ | Real number |
| Stats | Klien Didampingi | 250+ | Real number |
| Stats | Bidang Praktik | 6 | Real number |
| About | about-statement | Komitmen pada... | Real statement |
| About | value 01 title | Integritas | Real value name |
| About | value 01 text | Standar etika... | Real description |
| About | value 02 title | Keahlian | Real value name |
| About | value 02 text | Pengalaman luas... | Real description |
| About | about-subtext | Kami memahami... | Real quote |
| About | about-photo | /assets/images/dummy/about-office.webp | Real office photo |
| Practice | practice-header-text | Keahlian kami... | Real description |
| Practice Row 1 | title | Hukum Korporat | Keep or update |
| Practice Row 1 | category | Korporasi | Keep or update |
| Practice Row 1 | description | Pendirian badan usaha... | Real description |
| Practice Row 1 | preview img | practice-korporat.webp | Real photo |
| Practice Row 2–6 | (same pattern) | … | Real photos & descriptions |
| Lawyer | portrait img | lawyer-portrait.webp | Real portrait photo |
| Lawyer | name | Daffi, S.H., M.H. | Real name |
| Lawyer | credential 1 | Advokat Terdaftar | Real credential |
| Lawyer | credential 2 | Magister Hukum | Real credential |
| Lawyer | bio | Daffi, S.H., M.H. memiliki... | Real biography |
| Process 01 | title | Konsultasi Awal | Keep or update |
| Process 01 | description | Pertemuan untuk... | Real description |
| Process 02–04 | (same pattern) | … | Real descriptions |
| Contact | h2 heading | Mulai Diskusi Hukum Anda | Real heading |
| Contact | email | halo@example.com | Real email |
| Contact | phone | +62 21 0000 0000 | Real phone |
| Contact | address | Jl. Merdeka Raya No. 12... | Real address |
| Contact | WhatsApp href | wa.me/6281200000000 | Real WhatsApp |
| Testimonials | all 8 cards | Fictional clients | Verify or replace |
| Footer | tagline | Pendampingan hukum... | Real tagline |
| Footer | email | halo@example.com | Real email |
| Footer | WhatsApp href | wa.me/6281200000000 | Real WhatsApp |
```

---

## 4. WP5 Completion Checklist

- [ ] `Select-String -Path html\index.html -Pattern "\[Placeholder\]"` returns 0 results
- [ ] `<meta name="robots" content="noindex, nofollow">` present in `<head>`
- [ ] `<!-- DUMMY DATA, DO NOT PUBLISH -->` comment at top of `index.html`
- [ ] All dummy elements have `data-dummy` attribute
- [ ] Opening `http://localhost:3000/html/?dummy` outlines all `[data-dummy]` elements in dashed red
- [ ] No `62XXXXXXXXXX` remaining in the file
- [ ] `DUMMY_CONTENT.md` created and lists all dummy items
- [ ] Committed with message `feat(wp5): complete dummy data and DUMMY_CONTENT.md`
