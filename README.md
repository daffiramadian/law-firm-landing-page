# Daffi Law Firm — Spec-Driven AI Engineering Showcase

A modern, accessible, zero-dependency one-page marketing website for a fictional Indonesian law firm. It is built with semantic HTML, vanilla CSS, and vanilla JavaScript.

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](#) [![CSS3](https://img.shields.io/badge/CSS3-Vanilla%20Variables-1572B6?logo=css3&logoColor=white)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?logo=javascript&logoColor=black)](#) [![Dependencies](https://img.shields.io/badge/Dependencies-0%20(zero)-success)](#) [![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-blue)](#)

## Project overview

This project explores how far a focused AI-assisted workflow can take a small website when the rules, design direction, and technical constraints are written down first.

## Why I built this

AI agents are becoming very good at planning, coding, and creating things. The problem is that much of that capability is limited by token quotas or paid plans. As a free-tier user, I wanted to find a way to spend fewer tokens on setup, repeated explanations, and context gathering.

The approach I found was to give the agent clear project context before assigning work. Files such as `AGENTS.md`, `DESIGN.md`, and other project notes explain the rules, design direction, technical limits, and current state of the work. With that context available, the agent can spend less time figuring out the project and more time completing the assignment.

This project is my practical experiment with that idea. It also helped me understand the basics of spec-driven development: define the constraints first, break the work into smaller packages, and keep the project history easy to follow.

The website is still a work in progress and has plenty of room for improvement. The main value of this repository is what I learned about giving AI agents better instructions and using context files to make their work more focused. I plan to improve the site and apply these ideas in future projects.

## What the project demonstrates

- Semantic HTML5 and a single-page layout
- Vanilla CSS with shared design tokens
- Vanilla JavaScript with no runtime dependencies
- Responsive navigation and scroll tracking
- Keyboard-friendly practice-area interactions
- A testimonial marquee with pause controls
- Reduced-motion support
- Dummy-content mode for reviewing fictional content
- A documented, spec-driven workflow for AI-assisted development

## Engineering highlights

The site is intentionally small, but it includes a few details that made the build interesting:

- **Zero-shift practice areas:** interactive rows use a grid-based layout so previews do not push the rest of the page around.
- **Dual-row testimonial marquee:** two rows move in opposite directions, pause on hover or focus, stop when outside the viewport, and fall back to a static list when reduced motion is enabled.
- **Responsive navigation:** the header changes between a mobile drawer, compact desktop layout, and full desktop layout. The scroll-spy keeps the active section in sync.
- **Dummy audit mode:** adding `?dummy` highlights fictional content so it can be reviewed before real content is added.

## Main constraints

- No React, Tailwind, jQuery, icon fonts, or npm runtime packages
- Informational Indonesian-language content without unsupported legal promises or invented client results
- Fictional content marked with `data-dummy` and listed in [`DUMMY_CONTENT.md`](./DUMMY_CONTENT.md)
- WebP image assets kept under 150 KB where possible
- Visible focus states, sufficient color contrast, keyboard support, and `prefers-reduced-motion` handling

## Project structure

```text
daffi-law-firm/
├── assets/                    # Images, placeholders, and image credits
├── css/style.css              # Design tokens and page styles
├── docs/                      # Handoffs, project history, and prompts
├── js/main.js                 # Vanilla JavaScript controllers
├── DUMMY_CONTENT.md           # Fictional-content registry
├── index.html                 # Website entry point
├── package.json               # Project manifest; no runtime dependencies
└── README.md                  # Project documentation
```

## Run it locally

The site has no build step. Start any local static server from the project directory:

```bash
# Node.js
npx serve .

# Python 3
python -m http.server 3000
```

Then open `http://localhost:3000/`.

To review the fictional content, open:

```text
http://localhost:3000/?dummy
```

## Workflow

The work was split into six small packages covering the header, practice areas, testimonials, navigation, dummy-content mode, and responsive QA. Project rules and design decisions were written down before implementation so the AI agent had the context it needed.

The repository also keeps handoff notes and project history in `docs/`. These files make it easier to continue work without asking the agent to rediscover the whole project each time.

## Current status

This is a learning project and the website is not finished. The implementation shows the basic workflow I wanted to explore, but the design, content, and engineering can still be improved.

## License and credits

- Code: [ISC License](./package.json)
- Dummy photography: [Unsplash License](https://unsplash.com/license)
- Image IDs, dimensions, and photographer credits: [`assets/images/dummy/CREDITS.md`](./assets/images/dummy/CREDITS.md)
