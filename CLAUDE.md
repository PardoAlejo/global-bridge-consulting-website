# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Global Bridge Consultancy website — a static, bilingual (Spanish primary, English secondary) institutional site built with Astro. The site must feel **calm, neutral, and institutional** — not a startup landing page or AI marketing site.

**Live domain:** globalbridge.consulting
**Contact:** contacto@globalbridge.co

## Commands

```bash
npm install              # Install dependencies
npm run dev             # Start dev server at http://localhost:4321 (redirects to /es/)
npm run build           # Build static site to dist/
npm run preview         # Preview production build locally
```

## Architecture

### Tech Stack
- **Astro 5.17+** — static site generator, outputs pure HTML/CSS with minimal JS
- **Node.js 18+** required
- **No CSS framework** — custom properties + plain CSS in `src/styles/`
- **Minimal JavaScript** — ~10 lines for mobile menu toggle only

### i18n Architecture

**Critical:** Spanish (`es`) is the **default locale**, configured in `astro.config.mjs`:
```js
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en'],
  routing: { prefixDefaultLocale: true }
}
```

All content lives in **JSON files**:
- `src/i18n/es.json` — primary Spanish content
- `src/i18n/en.json` — English translation (same structure)

**Helper functions** in `src/i18n/utils.ts`:
- `getLangFromUrl(url)` — extracts `'es'` or `'en'` from URL path
- `useTranslations(lang)` — returns the full translation object for a language
- `getAlternateLang(lang)` — toggles between languages
- `getLocalizedPath(lang, hash?)` — builds `/{lang}/` or `/{lang}/#section` URLs
- `getProjectPath(lang, slug)` — builds `/{lang}/projects/{slug}/` URLs

**Routing:**
- `/` → redirects to `/es/`
- `/es/` → Spanish homepage
- `/en/` → English homepage
- `/es/projects/{slug}/` → Spanish project detail page
- `/en/projects/{slug}/` → English project detail page

### Page Structure

**Single-page layout** with smooth-scroll anchor navigation. Sections rendered in this order:

1. `<Navbar>` — language switcher + nav links + hamburger menu (mobile)
2. `<Hero>` — headline + subheadline + 2 CTAs
3. `<WhatWeDo>` — 4 capability cards
4. `<Philosophy>` — neutrality principles + "Who We Are" content
5. `<Projects>` — 3 project cards (each links to detail page)
6. `<Contact>` — contact info + form with project-type dropdown
7. `<Footer>` — copyright + email

**Project detail pages** (`/[lang]/projects/[slug]/`):
- `<ProjectHeader>` — title, status badge, metadata
- `<ProjectSection>` — repeatable section with title + content + optional screenshot
- `<ProjectHighlights>` — key outcome cards

### Component Conventions

- **All components accept `lang` prop** to load translations via `useTranslations(lang)`
- **Scoped styles** — each `.astro` component has its own `<style>` block
- **No client-side JS** except mobile menu toggle in `Navbar.astro`
- **Reusable containers:** `SectionContainer.astro` wraps sections with consistent spacing

### Styling System

**Global styles** in `src/styles/global.css`:
- CSS custom properties for colors, spacing, typography
- Base reset + typography defaults

**Layout utilities** in `src/styles/layout.css`:
- `.section-container`, `.content-wrapper`, `.grid-*` classes

**Design tokens:**
```css
--color-bg: #FFFFFF;
--color-text: #111111;
--color-text-secondary: #444444;
--color-accent: #4FB7C5;
--color-section-bg: #F6F6F6;
--color-border: #EAEAEA;
```

**Typography:**
- Inter font (Google Fonts)
- Large hero headlines, clear section headers, comfortable line-height

### Assets

All static assets live in `public/assets/`:
- `logo.svg` — site logo
- `hero-illustration.svg` — abstract hero visual
- `screenshots/` — project screenshots (PNG/JPEG)
- `{name}.png` / `.jpeg` — team photos, brand images

Reference in templates: `/assets/logo.svg` (Astro serves `public/` at root)

### Deployment

**Netlify redirects** configured in `public/_redirects`:
```
/  /es/  301
```

**SEO & Meta Tags:**
- `BaseLayout.astro` handles `<title>`, `<meta>` tags, Open Graph, Twitter Cards
- Canonical URLs + hreflang tags for bilingual SEO
- `astro.config.mjs` sets `site: 'https://globalbridge.consulting'`

## Content Editing

To update website copy:
1. Edit `src/i18n/es.json` (Spanish) or `src/i18n/en.json` (English)
2. Both files share identical structure — organized by section: `hero`, `whoWeAre`, `whatWeDo`, `projects`, `contact`, `footer`, `meta`
3. Site auto-updates on rebuild

**Projects** are defined in the `projects` array within each JSON file. Each project has:
- `slug` — used in URL (`/projects/{slug}/`)
- `title`, `status`, `statusColor`
- `description` (for card) and `fullDescription` (for detail page)
- `sections[]` array with title, content, and optional `screenshot`
- `highlights[]` array with title + description

### Current Projects

1. **Youth Electoral Monitor** (`youth-electoral-monitor`)
   - Interactive platform presenting survey data collected by **Cifras & Conceptos**
   - National survey of 3,221 young Colombians (18-32 years)
   - Data on political participation, electoral decisions, and democratic culture
   - **Important:** Always credit Cifras & Conceptos when referencing this project's data

2. **Presidential Evidence Assistant** (`presidential-assistant`)
   - Q&A system over 24+ Colombian presidential candidates
   - Traceable citations to original sources

3. **Electoral Results Dashboard** (`electoral-results`)
   - Interactive visualization of Colombia 2026 presidential election results
   - National, departmental, and municipal level analysis
   - 23M+ votes, 33 departments, 1,122 municipalities, 118K+ polling stations
   - Identifies electoral strongholds and competitive territories
   - Data sourced from Registraduría Nacional

4. **ROLI Dashboard** (`roli-dashboard`)
   - Analytical tool for Rule of Law Index data
   - 140+ countries, 10+ years of data
   - Hidden from public project listing

5. **Statement Consistency Engine** (`statement-engine`)
   - Prototype for tracking temporal consistency in public statements

## Design Constraints

- Generous whitespace, no flashy gradients
- No stock photos of people, no excessive icons
- Subtle transitions only (fade/slide), no heavy animations
- No blog, testimonials, pricing tables, animated counters, AI-themed visuals

## Tone Rules

When writing or editing copy:
- Formal but accessible
- No marketing hype, buzzwords, or exaggerated claims
- No "disrupting," "revolutionary," or AI-heavy messaging
- Focus on evidence, structure, neutrality, methodology