# Massimo Montagna – Portfolio

Personal portfolio site for Massimo Montagna, a vehicle dynamics engineer and software developer. Live at **[massmontagna.com](https://massmontagna.com)**.

A dark, blue-accented single-page site with an animated telemetry-style hero, a skills grid, featured projects with case-study pages, an experience timeline and contact links. It has a light/dark theme toggle and is fully responsive.

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
projects/               Case-study page for each project
css/styles.css          All styles; colours and fonts are CSS variables in :root
js/main.js              Theme toggle, nav, scroll effects, hero canvas animation
fonts/                  Self-hosted Space Grotesk and JetBrains Mono (woff2)
images/                 Photos, favicons (images/favicon/) and the social preview image
404.html                Not-found page
sitemap.xml, robots.txt Search engine files
CNAME                   Custom domain for GitHub Pages
```

## Editing content

- **Experience:** replace the placeholder entries in the `#experience` section of `index.html`. Copy a `timeline__item` block to add more.
- **Add a project:** duplicate a file in `projects/`, update the text, add a card in the `#projects` section of `index.html`, and add the page to `sitemap.xml`.
- **Accent colour:** change `--accent`, `--accent-2` and `--accent-glow` in `css/styles.css`.
- **Social preview:** `images/og-image.png` is a 1200×630 image used by link previews. Regenerate it if the name, title or photo changes.

## Deployment

Merging into `main` publishes the site. Development happens on feature branches such as `portfolio-v2`.

## Credits

Typefaces: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), both under the SIL Open Font License.

&copy; Massimo Montagna. All rights reserved.
