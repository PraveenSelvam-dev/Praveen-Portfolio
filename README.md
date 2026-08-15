# Praveen S — Portfolio

A single-page, ATS-friendly portfolio built with plain HTML, CSS, and JavaScript (no build step, no framework). Design concept: a "system status console" — hero, section labels, and skills panel are styled like an API response / server monitor, which ties directly to the résumé's REST API, real-time (Pusher), and production-uptime work.

## File structure

```
portfolio/
├── index.html          # all page content
├── style.css            # design system + layout + responsive rules
├── script.js             # theme toggle, nav, animations, form
├── assets/
│   └── Praveen_S_Resume.pdf   # powers the "Download Résumé" buttons
└── README.md
```

## Run locally

No build tools required. Any static server works:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Or just double-click `index.html` (the Google Fonts link needs internet access; everything else works offline).

## Customize

- **Colors / type / spacing** — all design tokens are CSS custom properties at the top of `style.css` under `:root` and `html[data-theme="dark"]`. Change `--accent`, `--accent-2`, fonts, or radii there and it cascades everywhere.
- **Copy** — all text lives directly in `index.html`; there's no CMS or data file.
- **Project links** — each `.project-card` currently points `Source` and `Live demo` at your GitHub/portfolio root as placeholders. Replace `href="https://github.com/PraveenSelvam-dev"` with each project's actual repo/demo URL.
- **Résumé file** — swap `assets/Praveen_S_Resume.pdf` with an updated export; filenames must match what's referenced in `index.html`.
- **Theme persistence** — the toggle currently resets to your OS preference on reload (by design, so it works safely as a live preview). To persist the choice across visits once you're hosting it yourself, store the value in `localStorage` inside the `themeToggle` click handler in `script.js`.
- **Contact form** — it currently opens the visitor's email client via a `mailto:` link (zero backend required). For a proper inbox-delivered form, sign up for a free plan on [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) and point the `<form>`'s `action` at their endpoint, or replace the submit handler in `script.js` with a `fetch()` POST.

## Deploy

**Vercel**
1. Push this folder to a GitHub repo.
2. [vercel.com/new](https://vercel.com/new) → import the repo → framework preset "Other" → deploy. No config needed for static HTML.

**Netlify**
1. [app.netlify.com/drop](https://app.netlify.com/drop) → drag the `portfolio` folder in for an instant deploy, **or**
2. Connect the GitHub repo → build command: *(none)* → publish directory: `/` (or `portfolio` if it's a subfolder of a bigger repo).

**GitHub Pages**
1. Push to a repo named `<username>.github.io` for a root domain, or any repo + enable Pages on the `main` branch.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your existing GitHub Pages portfolio link (`praveenselvam-dev.github.io/praveen.dev`) already matches this setup — you can replace its contents with these three files.

## SEO & accessibility already in place

- Descriptive `<title>`, meta description, keywords, canonical URL, Open Graph + Twitter Card tags.
- `Person` JSON-LD structured data (name, role, contact, skills) for richer search/recruiter tooling results.
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, one `<h1>`, ordered `<h2>`s per section).
- Skip-to-content link, visible focus states, `aria-label`/`aria-live`/`aria-expanded` on interactive controls.
- `prefers-reduced-motion` respected — all animation is disabled for users who request it.
- Fully responsive down to small phones; mobile nav collapses to a menu button.

## Suggested enhancements

1. **Real project links** — add live demo URLs and public repo links per project once available; recruiters click these first.
2. **Case studies** — turn 1–2 strongest projects (Memorial.website, 1.page) into dedicated subpages with screenshots and architecture diagrams.
3. **Analytics** — add a privacy-friendly tracker (Plausible or GA4) to see which sections recruiters spend time on.
4. **Form backend** — connect the contact form to Formspree/Web3Forms so messages land directly in your inbox instead of relying on the visitor's mail client.
5. **Open Graph image** — generate a real `assets/og-image.png` (1200×630) so shared links preview nicely on LinkedIn/Twitter.
6. **Testimonials** — a short quote from a Netaxis teammate or manager would strengthen social proof once available.
7. **Blog/notes** — a lightweight `/notes` section on Laravel or performance tuning topics builds authority and gives recruiters more to read.
