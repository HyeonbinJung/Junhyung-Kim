# Junhyung Kim — resume site

Static site, no build step. Open `index.html` directly or serve the folder:

    python -m http.server 8080

Implemented from the Claude Design file `Junhyung Kim Resume.dc.html`. That file
is a `dc-runtime` canvas document (`<x-dc>`, `{{ }}` bindings, `sc-for`/`sc-if`,
a `DCLogic` class); this is the plain-web equivalent — same content, colors,
type scale and spacing, no runtime dependency.

Files
- `index.html` — shell (fonts, `#app` mount)
- `styles.css` — design tokens + component styles, responsive + print rules
- `app.js`     — EN/KO content (`data(lang)`, mirrors the design's `data()`), rendering, interactions
- `assets/`    — headshot and resume PDF (see below)

Assets to drop in
- `assets/profile.jpg` — headshot, 168×208 or any 4:5 crop. Without it the hero
  shows the dashed "Drop headshot" placeholder from the design.
- `assets/Junhyung_Kim_Resume.pdf` — target of the "Resume PDF" button. Until
  it exists that button 404s; you can generate it with the browser's
  Print → Save as PDF (the print stylesheet is built for this).

Interactions
- EN/KO toggle — re-renders in place, keeps scroll position and active tab, and
  remembers the choice in `localStorage` (`jk-resume-lang`). English is default.
- Four tabs (Experience / Projects / Education & Skills / Contact) with proper
  `tablist` semantics and left/right arrow-key navigation. All four panels are
  in the DOM and toggled by class, so switching is instant and the contact form
  keeps what you typed.
- Contact form opens the visitor's mail client via `mailto:` — client-side only,
  exactly as in the design. Wire `#contactForm` to a backend if you want real
  form delivery.

Notes on what the design left open
- The design canvas is desktop-width only, so the responsive breakpoint
  (`@media(max-width:760px)`, stacking the 200px meta column) is added here.
- Print rules are added too: they hide the tab bar and reveal *all four*
  sections with their headings, so Print → Save as PDF yields a complete resume
  rather than only the open tab.
- The design's `pdfUrl` prop becomes the `PDF_URL` constant in `app.js`.
- The `<image-slot>` placeholder becomes a real `<img>` that falls back to the
  dashed placeholder when the file is missing.
- Language-toggle hover (`#F2F4F8`) applies to the inactive button only; in the
  design it was declared on both, which would have washed out the active one.
