# Massimo Montagna – Portfolio

Personal portfolio site for Massimo Montagna, a mechanical engineer and software developer. Live at **[massmontagna.com](https://massmontagna.com)**.

A light, minimal single page: a short intro beside a Python yaw-rate snippet and the live chart it produces, then skills, the current project, experience and contact. Fully responsive.

## Tech

Hand-written HTML, CSS and vanilla JavaScript. There is no framework, build step or package manager, and no third-party requests (fonts are self-hosted). It is deployed with GitHub Pages straight from the `main` branch.

## Run locally

```bash
python3 -m http.server
```

Then open <http://localhost:8000>. Any static file server works.

## Project structure

```
index.html              Home page (hero, skills, projects, experience, contact)
css/styles.css          All styles; colours and fonts are CSS variables in :root
js/main.js              Footer year and the hero yaw-rate chart
fonts/                  Self-hosted JetBrains Mono (woff2), used for code only
images/                 Favicons (images/favicon/) and the social preview image
404.html                Not-found page
sitemap.xml, robots.txt Search engine files
CNAME                   Custom domain for GitHub Pages
```

## Editing content

- **Experience:** edit the `#experience` section of `index.html`. Copy an `entry` block to add one.
- **Projects:** edit the `#project` section of `index.html`. Projects link straight to their own sites; there are no case-study pages.
- **Accent colour:** change `--accent` and `--accent-hover` in `css/styles.css`.
- **Social preview:** `images/og-image.png` is a 1200×630 image used by link previews. Regenerate it if the name or title changes.

## Deployment

Merging into `main` publishes the site. Development happens on feature branches such as `portfolio-v2`.

## Credits

Typeface: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for code, under the SIL Open Font License. Prose uses the system sans.

&copy; Massimo Montagna. All rights reserved.
