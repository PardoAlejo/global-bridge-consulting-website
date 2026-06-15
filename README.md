# Global Bridge Consultancy — Website

A bilingual website for Global Bridge Consultancy, an evidence-structuring consultancy. Built with Astro as a static site.

## About

Global Bridge designs systems that transform fragmented information — documents, data, interviews, and archives — into organized, comparable, and traceable knowledge for responsible decision-making.

The site presents the consultancy's services, principles, and project portfolio in both Spanish (primary) and English.

## Features

- **Bilingual (ES/EN):** Directory-based routing (`/es/`, `/en/`) with a language switcher in the navbar. Spanish is the default locale. All content is stored in JSON files for easy editing.
- **Homepage layout:** Smooth-scroll navigation between sections — Who We Are, What We Do, Projects, and Contact.
- **Project detail pages:** Individual pages for each project with methodology, key findings, screenshots, and data sources.
- **Responsive:** Mobile-first design with a hamburger menu on small screens.
- **SEO-ready:** Title, meta description, canonical URLs, hreflang tags, Open Graph, and Twitter Card meta tags.
- **Fast:** Static HTML output, minimal JavaScript (~10 lines for the mobile menu), no heavy frameworks.

## Site Structure

### Homepage Sections

| Section | Description |
|---------|-------------|
| Hero | Animated headline with rotating words, subheadline, and two CTAs |
| What We Do | Four capability cards (data collection, analysis methods, visualization tools, data governance) |
| Philosophy | Mission statement and neutrality principles |
| Projects | Project cards with status badges (Elections, Rule of Law, Prototype) linking to detail pages |
| Contact | Contact info and a form with project-type dropdown |
| Footer | Copyright and email |

### Project Portfolio

Current projects include:
- **Presidential Evidence Assistant** — Q&A system over 24+ Colombian presidential candidates with traceable citations
- **Youth Electoral Monitor** — Interactive platform presenting survey data collected by Cifras & Conceptos from 3,221 young Colombians on political participation and democratic culture
- **ROLI Dashboard** — Analytical tool for exploring Rule of Law Index data across 140+ countries (hidden from public listing)
- **Statement Consistency Engine** — Prototype for tracking temporal consistency in public statements

Each project has a dedicated detail page at `/{lang}/projects/{slug}/` with:
- Overview and methodology
- Key statistics and highlights
- Screenshots with captions
- Data sources and limitations
- Link to live tool (when available)

## Tech Stack

- [Astro](https://astro.build/) — static site generator
- Plain CSS with custom properties (no framework)
- [Inter](https://fonts.google.com/specimen/Inter) font via Google Fonts
- Node.js v18+

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) — it redirects to `/es/` (Spanish is the default).

### Build for production

```bash
npm run build
```

Static files are output to the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Astro components (Navbar, Hero, Contact, ProjectCard, etc.)
├── i18n/
│   ├── en.json       # English content (all sections + project details)
│   ├── es.json       # Spanish content (all sections + project details)
│   └── utils.ts      # i18n helper functions (getLangFromUrl, useTranslations, etc.)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro              # Redirects to /es/
│   ├── en/
│   │   ├── index.astro          # English homepage
│   │   └── projects/[slug].astro # English project detail pages
│   └── es/
│       ├── index.astro          # Spanish homepage
│       └── projects/[slug].astro # Spanish project detail pages
├── styles/
│   ├── global.css    # Reset, design tokens, base typography
│   └── layout.css    # Section and container utilities
└── public/
    └── assets/
        ├── logo.svg
        ├── hero-illustration.svg
        └── screenshots/  # Project screenshots
```

## Editing Content

All website copy lives in two JSON files:

- `src/i18n/es.json` — Spanish (primary)
- `src/i18n/en.json` — English

Both files share the same structure, organized by section:
- `meta` — Page title and description
- `nav` — Navigation labels
- `hero` — Hero section content with rotating words
- `philosophy` — Mission statement
- `whatWeDo` — Capability cards
- `projects` — Project list with cards
- `projectDetails` — Full content for each project detail page
- `contact` — Contact section and form
- `footer` — Footer content

### Adding a New Project

1. Add the project card to `projects.items[]` in both JSON files
2. Add the full project details to `projectDetails.{slug}` in both JSON files
3. Add the slug to `getStaticPaths()` in both `src/pages/es/projects/[slug].astro` and `src/pages/en/projects/[slug].astro`
4. Add screenshots to `public/assets/screenshots/`

Edit the values and the site updates automatically on rebuild.

## Contact

contacto@globalbridge.co
