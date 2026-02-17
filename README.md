# Global Bridge Consultancy — Website

A single-page, bilingual website for Global Bridge Consultancy, an evidence-structuring consultancy. Built with Astro as a static site.

## About

Global Bridge designs systems that transform fragmented information — documents, data, interviews, and archives — into organized, comparable, and traceable knowledge for responsible decision-making.

The site presents the consultancy's services, principles, and project portfolio in both English and Spanish.

## Features

- **Bilingual (EN/ES):** Directory-based routing (`/en/`, `/es/`) with a language switcher in the navbar. All content is stored in JSON files for easy editing.
- **Single-page layout:** Smooth-scroll navigation between sections — Who We Are, What We Do, Projects, and Contact.
- **Responsive:** Mobile-first design with a hamburger menu on small screens.
- **SEO-ready:** Title, meta description, canonical URLs, hreflang tags, Open Graph, and Twitter Card meta tags.
- **Fast:** Static HTML output, minimal JavaScript (~10 lines for the mobile menu), no heavy frameworks.

## Sections

| Section | Description |
|---------|-------------|
| Hero | Headline, subheadline, and two CTAs |
| Who We Are | Mission, capabilities, and neutrality principles |
| What We Do | Four capability cards (evidence organization, comparison, access tools, integrity) |
| Projects | Three project cards with status badges (Pilot, Completed, Prototype) |
| Contact | Contact info and a form with project-type dropdown |
| Footer | Copyright and email |

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

Open [http://localhost:4321](http://localhost:4321) — it redirects to `/en/`.

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
├── components/       # Astro components (Navbar, Hero, Contact, etc.)
├── i18n/
│   ├── en.json       # English content
│   ├── es.json       # Spanish content
│   └── utils.ts      # i18n helper functions
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro   # Redirects to /en/
│   ├── en/index.astro
│   └── es/index.astro
└── styles/
    ├── global.css    # Reset, design tokens, base typography
    └── layout.css    # Section and container utilities
```

## Editing Content

All website copy lives in two files:

- `src/i18n/en.json` — English
- `src/i18n/es.json` — Spanish

Both files share the same structure, organized by section (hero, whoWeAre, whatWeDo, projects, contact, footer). Edit the values and the site updates automatically.

## Contact

contacto@globalbridge.co
