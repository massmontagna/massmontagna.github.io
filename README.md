# massmontagna.com

Source for my personal site, live at **[massmontagna.com](https://massmontagna.com)**.

I'm a mechanical engineer and data analyst. The site is a single page covering my skills, projects and experience. The hero shows a short Python snippet next to the chart it produces: yaw-rate gain against speed for understeering, neutral and oversteering cars, drawn in the browser on a canvas.

## How it's built

- Plain HTML, CSS and vanilla JavaScript, with no framework, build step or dependencies
- No third-party requests: the one web font (JetBrains Mono) is self-hosted
- Works without JavaScript, apart from the chart
- Responsive, respects `prefers-reduced-motion`, and meets WCAG AA contrast
- Hosted on GitHub Pages with a custom domain

## Running it locally

```bash
git clone https://github.com/massmontagna/massmontagna.github.io.git
cd massmontagna.github.io
python3 -m http.server
```

Then open <http://localhost:8000>.

## Layout

```
index.html        The whole site
css/styles.css    Styles (colours and fonts are CSS variables in :root)
js/main.js        Hero chart and footer year
fonts/            Self-hosted JetBrains Mono and its license (OFL.txt)
images/           Favicons and the social preview image
404.html          Not-found page
```

## Elsewhere

- [Engineer's Notebook](https://engineersnotebook.net), my current project
- [MOT Data Analysis](https://motanalysis.massmontagna.com)
- [LinkedIn](https://linkedin.com/in/mcmontagna)

## License

&copy; Massimo Montagna. All rights reserved. [JetBrains Mono](https://www.jetbrains.com/lp/mono/) is used under the SIL Open Font License; see [fonts/OFL.txt](fonts/OFL.txt).
