# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Massimo Montagna, served as a static site via GitHub Pages at `massmontagna.com` (see `CNAME`). It is hand-written HTML/CSS/vanilla JS with no build system, package manager, linter, or test suite. To preview, run `python3 -m http.server` in the repo root and open `http://localhost:8000`.

Work happens on feature branches (e.g. `portfolio-v2.1`); `main` is what is published. The site was rebuilt from the HTML5 UP "Editorial" template into a custom design, then (Nov 2026, branch `v2.1.3`) redesigned again into a light, minimal, content-first page because the owner found the dark/neon version "vibe-codey". Design rationale lives in `PRODUCT.md`, `DESIGN.md` and `.impeccable/surfaces/index-html.md`.

## Structure

- `index.html` is a single-page site: hero, skills, project, experience, contact. Section ids (`#skills`, `#project`, `#experience`, `#contact`) are used by the plain text nav.
- `css/styles.css` holds everything. Colours and fonts are CSS variables in `:root`. Light and dark themes follow the OS via `prefers-color-scheme` (dark values in the `@media` block under `:root`; no toggle). Change the accent via `--accent` and `--accent-hover` in both blocks. Skills, project and experience share the `.entries` / `.entry` two-column layout (label column + text column, stacking below 900px).
- `js/main.js` is one small IIFE: the footer year and `initYawChart`, which draws the hero chart's three curves in once when it first scrolls into view (static under reduced motion). The page works fully without JS apart from the chart.
- The hero's right-hand `.figure` is a minimal macOS-style `.window` (owner request) holding a Python snippet plus a canvas chart, with the caption outside it. The chart computes the same formula as the snippet (yaw rate gain `v / (L + k_us * v**2)` for three `k_us` values), so if you change the code text, change `gain`, `curves` and `L` in `initYawChart` to match.
- `#project` holds a single text entry for the current project (Engineer's Notebook, linking to `https://engineersnotebook.net`). There are no case-study pages or project images; projects link straight to their own sites.

## Content decisions (owner's preferences, keep these)

- Experience in `index.html` is a high-level overview drawn from the owner's CV. Do not re-add detailed bullets.
- Do not name the current employer. It is deliberately "a large automotive OEM" everywhere (page text, meta descriptions, JSON-LD, README).
- Do not publish a phone number or email. Contact is LinkedIn and GitHub only. No CV download.
- No profile photo. The hero is text plus the code/chart card; the "M" symbol (`images/favicon/favicon.svg`, blue M on a white tile with a hairline border) is the favicon only; the nav shows the name as text. `images/profile.jpg`, if still present, is unused.
- The job-title wording is currently "Mechanical Engineer / Data Analyst" ("aspiring" was removed). It appears in the hero, the `<title>`, `og:title`, `twitter:title`, the README and the social preview image, so change all of them together.
- No eyebrows/badges, section numbers, cards, glows, gradients or icon tiles: the owner wants it clean and minimal. The "Currently building new projects" badge was removed in the redesign.

## Testing visually

Headless Chrome is available at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (`--headless=new --screenshot=...`). Caveats: its minimum window width is about 500px, so test mobile by loading the page in a narrow `<iframe>`. `--force-prefers-reduced-motion` renders the chart in its final state. Delete any such temp files afterwards.

## Assets and SEO

- Images live in `images/` (optimised JPEGs, favicons in `images/favicon/`). Keep file extensions matching the real format.
- Fonts are self-hosted in `fonts/` (variable JetBrains Mono, latin subset, used for code and chart labels only; prose uses the system sans stack) and declared at the top of `css/styles.css`. There are no third-party requests.
- Every page carries canonical, Open Graph and Twitter tags pointing at `https://massmontagna.com`; `index.html` also has Person JSON-LD. A new page needs its own tags and an entry in `sitemap.xml`.
- `images/og-image.png` (1200x630) is the social preview. It was rendered from a throwaway HTML page with headless Chrome; regenerate it the same way if the name or job title changes (the name and role line are baked into the image). The favicon PNGs/ICO were rendered from `favicon.svg` the same way (the Apple touch icon is a square, no-corner variant).
- `404.html` uses root-relative paths because GitHub Pages serves it from any URL depth.
- Button text uses `--on-accent` (white on the blue accent) to keep contrast above WCAG AA.

## Remaining

A Lighthouse run against the deployed site (run it from Chrome DevTools; `npx lighthouse` was blocked by the permission classifier), and nothing else outstanding.
