# Mansa — marketing site

Marketing website for **Mansa** by African Languages Lab — the AI platform built
for African languages (chat, translation, transcription, speech recognition, and
an autonomous agent).

The site is a self-contained static site (HTML, CSS, vanilla JS) — no build step
and no dependencies. Everything that gets deployed lives in [`site/`](site/).

## Structure

```
site/
  index.html              Home
  mansa-ai.html           Mansa AI
  mansa-agent.html        Mansa Agent
  mansa-transcribe.html   Mansa Transcribe
  mansa-translate.html    Mansa Translate
  pricing.html            Pricing
  get-started.html        Get started
  404.html                Not-found page
  css/styles.css          All styles
  js/main.js              All behaviour (nav, tabs, accordions, parallax, marquees…)
  images/                 Image assets
  video/                  Impact video
  favicon.* apple-touch-icon.png   Icons
  robots.txt sitemap.xml .nojekyll  Static-host files
```

The design reference screenshots used while building live in the repo root and are
**not** part of the deployed site.

## Run locally

Any static file server works. For example:

```bash
cd site
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

### GitHub Pages (configured)

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
publishes the `site/` folder to GitHub Pages on every push to `main`.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment →
Source** and select **GitHub Actions**. The next push (or a manual run from the
**Actions** tab) will deploy the site.

### Netlify / Vercel / any static host

Point the host at this repo and set the **publish/output directory** to `site`
(there is no build command).

## Notes

- Absolute URLs in `<link rel="canonical">`, Open Graph, `sitemap.xml`, and
  `robots.txt` use the GitHub Pages project URL
  `https://african-languages-lab-ai.github.io/mansa-site`. If a custom domain is
  used, update those references (search the repo for that URL).
- Internal links and asset paths are all relative, so the site works unchanged at
  a domain root or under a subpath.
