# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Global Bridge Consultancy — a single-page, bilingual (English primary, Spanish secondary) website for an evidence-structuring consultancy. The site must feel **institutional, calm, and neutral** — not a startup landing page or AI marketing site.

All specifications live in `website-spec/`:
- `README.md` — build instructions, design guidelines, technical requirements
- `content_spanish.md` — primary Spanish content for all sections
- `content_ensligh.md` — English translation of all content
- `sample.png` — visual design reference
- `assets/` — placeholder directory for logo, hero background, illustrations

## Site Structure

Single page with smooth-scroll anchor navigation. Sections in order:
1. Navbar (white, minimal, persistent "Contact" button)
2. Hero (full-width, headline left, abstract illustration right)
3. Who We Are — merged about + mission + neutrality principles
4. What We Do — 4 capability cards
5. Projects — 3 project cards with status badges
6. Contact — form with name, organization, email, project type dropdown, message
7. Footer

## Design System

### Colors
| Token | Value |
|-------|-------|
| Background | `#FFFFFF` |
| Primary text | `#111111` |
| Secondary text | `#444444` |
| Accent (teal) | `#4FB7C5` |
| Light section bg | `#F6F6F6` |
| Borders | `#EAEAEA` |

### Typography
- Sans-serif: Inter, Sora, or similar
- Large hero headlines, clear section headers, comfortable body line-height

### Design Constraints
- Generous whitespace, no flashy gradients, no stock photos of people
- Subtle transitions only (optional fade/slide), no heavy animations
- No blog, testimonials, pricing tables, animated counters, AI-themed visuals, or excessive icons

## Technical Requirements

- **Responsive**: mobile-first approach
- **Semantic HTML**, lightweight CSS, minimal JavaScript
- **Performance**: fast loading, accessible contrast
- **SEO**: title tags and meta descriptions
- **i18n**: English primary, Spanish secondary; directory-based routing (`/en/`, `/es/`)
- **Content editability**: all content should be easy to update from a single file or clearly structured components

## Tone Rules

When writing or editing any user-facing copy:
- Formal but accessible
- No marketing hype, buzzwords, or exaggerated claims
- No "disrupting," "revolutionary," or AI-heavy messaging
- Focus on evidence, structure, neutrality, methodology

## Required Components

- Navbar
- Hero section
- Reusable section container
- Card component (capabilities + projects)
- Contact form (with project-type dropdown)
- Footer

## Asset Placeholders

- `/assets/logo.svg`
- `/assets/hero-bg.jpg`
- `/assets/hero-illustration.png`

## Contact

- Email: contact@globalbridge.consulting
