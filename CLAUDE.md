# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Massimo Montagna, served as a static site via GitHub Pages at `massmontagna.com` (see `CNAME`). It is hand-written HTML/CSS/vanilla JS with no build system, package manager, linter, or test suite. To preview, run `python3 -m http.server` in the repo root and open `http://localhost:8000`.

Work happens on the `portfolio-v2` branch; `main` is what is published. The site was rebuilt from the HTML5 UP "Editorial" template into a custom dark/blue design (the old template, jQuery, Sass and Font Awesome are gone).

## Structure

- `index.html` is a single-page site: hero, skills, projects, experience, contact. Section ids (`#skills`, `#projects`, `#experience`, `#contact`) are used by the nav and by the scroll-spy in `js/main.js`.
- `css/styles.css` holds everything. Colours, fonts and radii are CSS variables in `:root`; the light theme overrides them under `:root[data-theme="light"]`. Change the accent colour via `--accent`, `--accent-2` and `--accent-glow`.
- `js/main.js` is one IIFE: theme toggle (saved in `localStorage`, applied early by an inline script in `<head>`), mobile nav, hide-on-scroll header, scroll reveal, cursor-glow on `.card--glow`, and the animated telemetry canvas in the hero. It reads `--trace-rgb` from CSS so the canvas follows the theme.
- The `.reveal` class fades elements in via IntersectionObserver. It only hides elements when the `js` class is on `<html>` (set by the inline head script), so the page still works without JS.
- `projects/*.html` are the case-study pages (one per project). They are hand-edited copies of the same layout: duplicate one to add a project, using `../` paths for CSS/JS/images, and link it from the cards in `#projects` on `index.html` plus the "next project" link at the bottom. Each has an HTML comment marking where to add screenshots/results.
- Experience entries in `index.html` are placeholder content (marked with an HTML comment) for the owner to replace manually.

## Testing visually

Headless Chrome is available at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (`--headless=new --screenshot=...`). Caveats: its minimum window width is about 500px, so test mobile by loading the page in a narrow `<iframe>`; and below-the-fold content stays hidden until scrolled, so use a temporary copy that forces `.reveal` visible. Delete any such temp files afterwards.

## Assets and SEO

- Images live in `images/` (optimised JPEGs, favicons in `images/favicon/`). Keep file extensions matching the real format.
- Fonts are self-hosted in `fonts/` (variable Space Grotesk and JetBrains Mono, latin subset) and declared at the top of `css/styles.css`. There are no third-party requests.
- Every page carries canonical, Open Graph and Twitter tags pointing at `https://massmontagna.com`; `index.html` also has Person JSON-LD. A new page needs its own tags and an entry in `sitemap.xml`.
- `images/og-image.png` (1200x630) is the social preview. It was rendered from a throwaway HTML page with headless Chrome; regenerate it the same way if the name, title or photo changes.
- `404.html` uses root-relative paths because GitHub Pages serves it from any URL depth.
- Text on gradient surfaces uses `--on-accent` (dark in the dark theme, white in the light theme) to keep contrast above WCAG AA.

## Remaining

A Lighthouse run against the deployed site, and optionally project screenshots/results and real experience entries.
