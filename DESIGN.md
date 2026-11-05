---
name: Massimo Montagna
description: Calm, light, content-first personal site for a mechanical engineer who writes software.
colors:
  ink-blue: "#1d4ed8"
  ink-blue-deep: "#1e3a8a"
  on-accent: "#ffffff"
  paper: "#ffffff"
  paper-subtle: "#f6f7f9"
  hairline: "#e3e6ea"
  ink: "#14171c"
  graphite: "#555d68"
  selection-tint: "#dbe4fb"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0"
  lead:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.65
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  meta:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  focus: "2px"
  control: "6px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink-blue-deep}"
    textColor: "{colors.on-accent}"
  link:
    textColor: "{colors.ink-blue}"
  link-hover:
    textColor: "{colors.ink-blue-deep}"
  nav-link:
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
---

# Design System: Massimo Montagna

## Overview

**Creative North Star: "The Engineer's Page"**

A white page with black ink and one blue pen. The site reads like a well-set technical document: generous margins, a single readable measure, hairline rules between sections, and the work itself (real code producing a real chart) as the only illustration. It is the category standard played straight, in the line of engineer personal sites and Stripe Press / Stripe docs.

Density is low and calm. Hierarchy comes from size, weight and grey, never from containers, colour fills or decoration. The system explicitly rejects the dark-navy neon dev-portfolio: glow cards, gradient text, eyebrows and section numbers.

**Key Characteristics:**
- White ground, near-black ink, grey secondary text, one blue accent.
- Hairline rules instead of cards; no icons. The one exception is the hero code window, which carries the page's only shadow.
- System sans for prose, monospace only for code and chart labels.
- A two-column label/text grid carries every list on the page.

## Colors

One ink, one grey, one blue, on white.

### Primary
- **Ink Blue** (`ink-blue`): links, the single primary button, highlighted tokens in the code figure, and every curve in the chart. Nothing else.
- **Ink Blue Deep** (`ink-blue-deep`): hover state for links and the primary button.
- **On Accent** (`on-accent`): text on the blue button.

### Neutral
- **Paper** (`paper`): the page ground (also `theme-color`).
- **Paper Subtle** (`paper-subtle`): quiet tint for the code window's title bar.
- **Hairline** (`hairline`): 1px section rules, the figure's top rule, chart gridlines, the footer rule.
- **Ink** (`ink`): headings, body text, code text, nav name.
- **Graphite** (`graphite`): bio, dates, meta lines, captions, code comments, chart axis labels, nav links, footer.
- **Selection Tint** (`selection-tint`): text selection background only.

### Named Rules
**The One Pen Rule.** Blue means "this is actionable or this is the data." Links, the primary action and the chart. Never a background, border, heading or decoration.

**The Grey Is Secondary Rule.** Anything that supports rather than states (dates, meta, captions, comments) is Graphite; primary statements stay Ink.

## Typography

**Body Font:** system-ui stack
**Label/Mono Font:** JetBrains Mono (self-hosted variable, latin), with ui-monospace fallback

**Character:** The platform's own sans, set tight at large sizes and loose in running text, so the page feels native and fast; the mono appears only where the content is literally code or data.

### Hierarchy
- **Display** (650, clamp 2.5-4.25rem, 1.04, -0.03em): the name in the hero; the 404 heading.
- **Headline** (650, 1.5rem, 1.2): section headings, each sitting under a hairline rule.
- **Title** (650, 1.0625rem): entry labels and entry headings; same size as body, weight does the work.
- **Lead** (500, clamp 1.125-1.375rem): the role line under the name.
- **Body** (400, 1.0625rem, 1.65): all prose, held to a 62ch measure.
- **Meta** (400, 0.9375rem, Graphite): tool lists, employer/location lines, footer. Dates use tabular numerals.
- **Code** (400, 0.8125rem, 1.7, mono): the code figure (0.6875rem under 560px); keywords bold, functions and numbers blue, comments grey. Chart labels are mono at 11px.

### Named Rules
**The Mono Means Code Rule.** Monospace is for code, file names and chart labels only. Never for labels, nav, kickers or decoration.

**The Weight Not Size Rule.** Below the hero, hierarchy is weight (650 vs 400) and colour (Ink vs Graphite) at nearly one size; no intermediate heading sizes.

## Layout

A centred 1120px container with a fluid gutter (clamp 20-48px). The hero is two columns (text 1fr, figure 1.05fr, 64px gap, vertically centred), stacking below 900px. Every content list (skills, project, experience) uses one entry grid: a 220px label column and a text column capped at the 62ch measure, 48px column gap, 40px between entries; it collapses to one column below 900px. Trailing paragraphs that belong to the text column indent by 220px + 48px to align with it. Sections are 48px top and bottom (96px after the last). Nav is a single text row, name left, links right, wrapping freely.

## Elevation & Depth

Flat. Depth is conveyed by 1px Hairline rules and whitespace. The single exception is the hero code window: `0 8px 24px -12px rgba(20, 23, 28, 0.14)`, owner-requested so it reads as a macOS window.

### Named Rules
**The Hairline Rule.** Separation is a 1px Hairline rule or space. No cards, no boxes, no fills, no shadows (the hero code window is the one owner-approved box).

## Shapes

Square and open. Content sits on the page without containers. The only rounded corners are the primary button (6px) and the focus outline (2px).

## Components

### Buttons
- **Shape:** gently rounded (6px).
- **Primary:** Ink Blue fill, On Accent text, 600 weight, 12px 20px padding, no underline.
- **Hover / Focus:** fill shifts to Ink Blue Deep over 0.15s ease-out; focus is the global 2px Ink Blue outline at 3px offset.
- **Secondary:** there is no secondary button; the companion action is a plain underlined link beside the button (28px gap). One button per action group.

### Links
- Ink Blue, 1px underline at 0.2em offset; hover deepens to Ink Blue Deep and thickens the underline to 2px. Nav and footer links drop the underline and use Ink / Graphite, turning blue on hover.

### Navigation
- Text-only row: name in Ink at 650, four section links in Graphite, no active state, no mark, no mobile menu (links wrap). Not sticky.

### Code Figure (signature)
- A minimal macOS-style window (owner request): 1px Hairline border, 10px radius, soft shadow, a 36px Paper Subtle title bar with three traffic-light dots and the centred mono file name. Inside: the code block, then the chart canvas (220-300px tall). The one-line Graphite caption sits outside the window.
- The chart draws in the same colours as the page (Ink Blue curves, Hairline gridlines, Graphite mono labels), read from the CSS custom properties. Curves are distinguished by dash pattern and weight, not colour, and are labelled directly at their ends. They draw in once on first view (2.2s, ease-out cubic, staggered 0.3s) and render static under reduced motion.

### Entry
- The label/text pair described in Layout: Title-weight label (or Graphite tabular date) on the left; Title heading, Meta line and Body prose on the right, 8px apart.

## Do's and Don'ts

### Do:
- **Do** keep blue to links, the one primary button and chart data.
- **Do** separate sections with a 1px Hairline rule above a 1.5rem heading.
- **Do** put any new list content into the label/text entry grid (220px + 62ch).
- **Do** drive any new chart or diagram from the CSS custom properties so it matches the page.
- **Do** keep text contrast at WCAG AA or better (Graphite on Paper is the floor for small text).

### Don't:
- **Don't** add cards, panels, shadows, glows or gradient text anywhere other than the hero code window.
- **Don't** add eyebrows, kickers or section numbers above headings.
- **Don't** add icons; links and buttons are words.
- **Don't** use monospace outside code and chart labels.
- **Don't** add a second accent colour or encode chart series by colour alone.
