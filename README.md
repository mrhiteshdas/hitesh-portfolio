# Hitesh Chandra Das — Portfolio Website

A modern, dark-themed, multi-page portfolio built with plain HTML, CSS, and JavaScript
(no frameworks, no build step).

## Structure

```
portfolio/
├── index.html        Landing page — hero/intro, education timeline, skills
├── projects.html      Project showcase grid
├── contact.html        Contact info + validated contact form
├── css/
│   └── style.css       All styling (shared across pages)
├── js/
│   └── script.js        All behaviour (shared across pages)
└── assets/
    └── (put your photo here, e.g. profile.jpg)
```

## How to run it

Just open `index.html` in any web browser — no server or build tools required.

## How to customize

**Your photo**
1. Add your photo file to the `assets/` folder (e.g. `assets/profile.jpg`).
2. Open `index.html`, find the `.photo-frame` block in the hero section.
3. Uncomment the `<img>` line and remove the `<span class="photo-fallback">HCD</span>` line.

**Education** — edit the `.timeline` section in `index.html` with your real
college/university names, years, and descriptions.

**Skills** — edit the `.skills-grid` section in `index.html`. Add or remove
`<span class="chip">...</span>` items in any category.

**Projects** — edit `projects.html`. Each project is one `.project-card` block;
duplicate the block to add more, and update the title, description, tags, and links
(replace the `#` hrefs with your live demo / GitHub links).

**Contact details** — edit `contact.html`:
- Update the email, phone, location, and GitHub link in `.contact-info-list`.
- Update `data-destination-email="..."` on the `<form id="contact-form">` tag —
  this is the address the contact form will send messages to.
- Note: since this is a static site with no backend, the form opens the visitor's
  email app with the message pre-filled (via a `mailto:` link) rather than sending
  the email directly. If you later want true "send without opening email app"
  behavior, you'd need to connect the form to a backend or a service like Formspree.

**Colors / fonts** — all design tokens (colors, fonts, spacing) are defined as
CSS variables at the top of `css/style.css` inside `:root { ... }`. Change values
there to re-theme the whole site at once.

**Navigation / footer links** — update the GitHub and LinkedIn URLs in the
`<footer>` and header nav on all three pages.

## Notes

- Fonts (Fraunces, Inter, JetBrains Mono) are loaded from Google Fonts via a CDN link
  in each page's `<head>` — an internet connection is needed for the fonts to load
  (the site still works fine without it, using fallback fonts).
- The site is fully responsive (mobile, tablet, desktop) and includes a mobile
  hamburger menu.
- Respects `prefers-reduced-motion` for users who disable animations.
