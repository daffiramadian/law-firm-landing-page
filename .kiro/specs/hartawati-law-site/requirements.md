# Requirements Document

## Introduction

This specification captures the remaining work to complete the Hartawati Law Firm one-page marketing website, an Indonesian-language (lang="id") site for an Indonesian law firm. The Site is built with plain HTML, CSS, and vanilla JavaScript only — no frameworks, no Tailwind, no build step, no npm dependencies, and no icon fonts. All design tokens (colors, fonts, sizes, radii, spacing) live as CSS variables in :root in css/style.css.

Stages 0 through 3 are committed: foundation CSS, the header and hero, and the about and practice-areas sections. Stage 4 (the lawyer profile, contact, and footer) is implemented but uncommitted and contains two structural defects: the #lawyer and #contact Sections sit outside the Main element, and a leftover Stage 1 "Foundation Styles" Demo Block remains inside Main, including an illegal second `<h1>`.

The remaining work is organized into four streams: (1) Stage 4 structural fixes and commit, which treats the existing Stage 4 layout, spacing, and copy as a finished baseline and only corrects document structure; (2) Stage 5 JavaScript for an accessible mobile menu, smooth scrolling with a sticky-header offset, scroll-spy, and fade-in on scroll; (3) a Stage 6 responsive, accessibility, and SEO pass; and (4) a Stage 7 final audit that produces a reusable Checklist Artifact and fixes any AGENTS.md Hard-Rules violations. Every piece of Placeholder content is prefixed with "[Placeholder]" so it can be found and replaced later, and the Site maintains an informational, non-promotional tone consistent with the Indonesian advocate code of ethics.

## Glossary

- **Site**: The Hartawati Law Firm one-page website, comprising index.html, css/style.css, js/main.js, and the assets/ directory.
- **Header**: The sticky site header containing the wordmark, the desktop navigation, and the WhatsApp "Konsultasi" CTA.
- **Sticky Header**: The Header element, which uses position: sticky and occupies vertical space at the top of the viewport.
- **Mobile Menu**: The collapsible navigation panel toggled by the hamburger button on narrow viewports.
- **Nav Links**: The in-page anchor links in the navigation: Beranda (#hero), Tentang Kami (#tentang-kami), Bidang Praktik (#bidang-praktik), Profil Advokat (#lawyer), and Kontak (#contact).
- **Main**: The `<main>` element that contains the page's primary content Sections.
- **Sections**: The anchored content regions #hero, #tentang-kami, #bidang-praktik, #lawyer, and #contact.
- **Demo Block**: The leftover Stage 1 "Foundation Styles" demo section in index.html that displays color swatches, typography samples, spacing and radius samples, and an illegal second `<h1>`.
- **Reveal Elements**: Elements bearing the .reveal class, intended to fade in as they enter the viewport.
- **Reduced Motion**: The state where the user agent reports prefers-reduced-motion: reduce.
- **Sticky-Header Offset**: A scroll offset equal to the height of the Sticky Header, applied so a scrolled-to Section heading is not hidden beneath the Sticky Header.
- **Placeholder**: Text prefixed with "[Placeholder]" that marks content to be replaced with real values later.
- **AGENTS.md Hard Rules**: The mandatory constraints defined in AGENTS.md, including no frameworks, no hotlinked images, no invented facts, no promotional claims, and CSS variables in :root.
- **Checklist Artifact**: The reusable, re-runnable audit document produced in Stage 7.

## Requirements

### Requirement 1: Page Structure and Semantic Main

**User Story:** As a developer maintaining the Site, I want the document to have correct semantic structure and no leftover demo content, so that the page has exactly one `<h1>`, a logical content flow, and a clean baseline to commit.

#### Acceptance Criteria

1. THE Site SHALL contain exactly one `<h1>` element.
2. THE #lawyer Section and the #contact Section SHALL be descendants of the Main element.
3. THE index.html file SHALL NOT contain the Demo Block.
4. WHERE the Demo Block is removed from index.html, THE css/style.css file SHALL remove the orphaned demo-specific CSS rules that supported the Demo Block.

### Requirement 2: Thin Borders Instead of Heavy Shadows

**User Story:** As a designer, I want image and card surfaces to use thin borders rather than heavy shadows, so that the Site adheres to the "no heavy shadows" design rule and maintains a calm, flat appearance.

#### Acceptance Criteria

1. WHERE an image or card surface requires separation from its background, THE Site SHALL apply a 1px border using the --outline-variant color.
2. THE css/style.css file SHALL NOT contain any box-shadow declarations.
3. THE border replacement SHALL cover the hero image, the stat cards, the practice-card hover state, the about image, the room images, and the lawyer image.

### Requirement 3: Neutral, Non-Promotional Hero Stats

**User Story:** As a site owner mindful of advocate ethics, I want the third hero stat to use neutral informational wording with no promotional percentage, so that the Site complies with the Indonesian advocate code of ethics.

#### Acceptance Criteria

1. THE third hero stat card SHALL display the phrase "Fokus Penuh".
2. THE third hero stat card SHALL NOT display a numeric or percentage value.
3. THE third hero stat card SHALL NOT contain a promotional claim.
4. WHERE a color is applied to a hero stat value, THE Site SHALL apply the color through a CSS class rather than an inline style attribute.

### Requirement 4: Accessible Mobile Menu

**User Story:** As a mobile visitor, I want an accessible navigation menu that opens and closes in a predictable way, so that I can navigate the Site on a small screen.

#### Acceptance Criteria

1. WHEN the hamburger button is activated, THE Mobile Menu SHALL toggle its visibility.
2. WHEN the hamburger button is activated, THE hamburger button SHALL update its aria-expanded attribute to reflect the Mobile Menu's state.
3. WHILE the Mobile Menu is open, THE hamburger button SHALL report aria-expanded="true".
4. WHEN a Nav Link inside the Mobile Menu is activated, THE Mobile Menu SHALL close.
5. WHEN the Escape key is pressed, THE Mobile Menu SHALL close.
6. WHEN keyboard focus leaves the Mobile Menu, THE Mobile Menu SHALL close.
7. WHEN a pointer event occurs outside the Mobile Menu and the hamburger button, THE Mobile Menu SHALL close.

### Requirement 5: Smooth Scroll With Sticky-Header Offset

**User Story:** As a visitor, I want in-page links to scroll smoothly to their target sections without the sticky header covering the section heading, so that I land at the correct position.

#### Acceptance Criteria

1. WHEN an in-page Nav Link is activated, THE Site SHALL scroll to the target Section with the Sticky-Header Offset applied.
2. WHILE Reduced Motion is active, THE Site SHALL navigate to the target Section without an animated smooth-scroll transition.

### Requirement 6: Scroll-Spy Navigation State

**User Story:** As a visitor scrolling the page, I want the navigation to highlight the section I am currently viewing, so that I can tell where I am within the page.

#### Acceptance Criteria

1. WHILE a Section is the most visible in the viewport, THE Site SHALL set aria-current="page" on the Nav Link that targets that Section.
2. WHEN a different Section becomes the most visible, THE Site SHALL remove aria-current="page" from every Nav Link except the one targeting the now-most-visible Section.
3. THE scroll-spy behavior SHALL be implemented with an IntersectionObserver.

### Requirement 7: Fade-In on Scroll

**User Story:** As a visitor, I want content to fade in gracefully as I scroll, so that the page feels polished while remaining accessible.

#### Acceptance Criteria

1. WHEN a Reveal Element enters the viewport, THE Site SHALL add the active class to that Reveal Element.
2. WHILE Reduced Motion is active, THE Site SHALL render every Reveal Element fully visible without applying a fade-in animation.

### Requirement 8: Responsive Layout

**User Story:** As a visitor on any device, I want the layout to adapt without horizontal scrolling, so that content stays readable on phones, tablets, and desktops.

#### Acceptance Criteria

1. THE Site SHALL render without horizontal scrolling at viewport widths of 375px, 768px, and 1280px.
2. THE Site SHALL present every interactive tap target at no less than 44px in both height and width.
3. THE Site SHALL keep body text at a minimum computed font size of 16px at viewport widths of 375px, 768px, and 1280px.

### Requirement 9: Heading Order and Semantics

**User Story:** As a visitor using a screen reader, I want a logical heading structure, so that I can navigate the page by headings.

#### Acceptance Criteria

1. THE Site SHALL contain exactly one `<h1>`.
2. THE Site SHALL maintain a logical heading order with no skipped heading levels.

### Requirement 10: Accessibility Baseline

**User Story:** As a visitor relying on assistive technology, I want visible focus states, sufficient contrast, a skip link, and alt text, so that I can perceive and operate the Site.

#### Acceptance Criteria

1. THE Site SHALL meet WCAG AA contrast for text against its backgrounds.
2. THE Site SHALL provide a visible :focus-visible state on every interactive element.
3. THE Site SHALL provide a skip link to #main as the first focusable element.
4. THE Site SHALL provide alt text on every image.

### Requirement 11: SEO and Social Metadata

**User Story:** As a site owner, I want complete SEO and social metadata, so that search engines and social platforms can index and preview the Site correctly.

#### Acceptance Criteria

1. THE Site SHALL include a `<title>` element.
2. THE Site SHALL include a meta description element.
3. THE Site SHALL include Open Graph tags for title, description, and type.
4. THE Site SHALL include a favicon link.
5. THE Site SHALL include a canonical link with a placeholder URL.

### Requirement 12: AGENTS.md Hard-Rules Audit

**User Story:** As a developer, I want the final audit to verify every AGENTS.md Hard Rule, so that the shipped Site complies with all mandatory constraints.

#### Acceptance Criteria

1. THE Stage 7 audit SHALL verify the absence of frameworks, Tailwind, build steps, npm, and icon fonts.
2. THE Stage 7 audit SHALL verify that no file in the /reference directory was modified.
3. THE Stage 7 audit SHALL verify that no image is hotlinked.
4. THE Stage 7 audit SHALL verify that all images are local files under /assets.
5. THE Stage 7 audit SHALL verify that no invented fact appears outside Placeholder text.
6. THE Stage 7 audit SHALL verify the absence of promotional claims such as "terbaik", "pasti menang", and percentage guarantees.
7. WHERE a color, font, size, radius, or spacing value is applied, THE Site SHALL source it from a :root CSS variable rather than a hard-coded value or inline style.
8. WHEN the Stage 7 audit finds an AGENTS.md Hard-Rules violation, THE Site SHALL be fixed to resolve that violation.
9. THE Stage 7 audit SHALL NOT add features beyond resolving AGENTS.md Hard-Rules violations.

### Requirement 13: Reusable Audit Checklist Artifact

**User Story:** As a developer, I want a reusable checklist I can re-run later, so that I can audit the Site again after content changes without redoing manual work.

#### Acceptance Criteria

1. THE Stage 7 audit SHALL produce a Checklist Artifact that lists every AGENTS.md Hard Rule as a tickable item.
2. THE Checklist Artifact SHALL include a complete Placeholder inventory that records the file and line of every "[Placeholder]" occurrence.
3. THE Checklist Artifact SHALL be structured so it can be re-run after future content changes.
4. THE Checklist Artifact SHALL be saved as a durable file in the workspace.
