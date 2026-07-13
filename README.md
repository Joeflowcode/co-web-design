# Cascadia Cinema Co.

Professional **outdoor movie night rentals** across **Lyons, Detroit Lake, Salem, Sisters, and Bend**, Oregon.

**Live:** [Your site URL will go here]

## Packages

| Package | What’s included | Starting at |
|---|---|---|
| **Basic Cinema** | Screen, speakers, projector setup, delivery & pack-up, any movie you choose | $275 |
| **Cinema + Popcorn** | Basic + popcorn machine & serving supplies | $375 |
| **Full Night Out** | Cinema + popcorn + bouncy house | $525 |

À la carte add-ons: popcorn machine (from $95) and bouncy house (from $175).

## What’s on the site

- **Hero** — Brand-first PNW outdoor cinema landing
- **Trust strip** — Service towns, delivery & setup, you pick the movie
- **Packages** — Three clear tiers with quote CTAs that preselect the booking form
- **How it works** — Book → We deliver & set up → You press play
- **The night** — Full-bleed atmospheric PNW visual
- **Occasions** — Birthday, campground, HOA, wedding welcome, and more
- **Included / site needs** — Power, space, weather, movie notes
- **FAQ** — Rain, setup time, licensing, travel, deposit
- **Booking form** — Quote request with Formspree-ready action + mailto fallback
- **Sticky mobile CTA** — Always-visible “Book your night” on phones

## Service area

| Hub | Corridor |
|---|---|
| **Lyons / Detroit Lake** | Santiam Canyon & reservoir weekends |
| **Salem** | Willamette Valley backyards & community nights |
| **Sisters / Bend** | Cascades high-desert evenings |

Outside this corridor? The site invites travel quotes.

## Features

- Single `index.html` — no build step or dependencies
- Responsive layout for phone and desktop
- LocalBusiness structured data + Open Graph meta
- Conversion UX: package preselect, form validation, sticky CTA
- Subtle motion: hero drift, scroll reveals, button/package hover

## File structure

```
index.html           — Full marketing + booking site
README.md            — This file
GITHUB_SETUP_GUIDE.md — Deploy to GitHub Pages or Netlify
```

## Before you go live

1. Replace placeholder phone `(503) 555-0192` and email `hello@cascadiacinema.example` with your real contact info.
2. Connect the quote form: replace `YOUR_FORM_ID` in the form `action` with your [Formspree](https://formspree.io) form ID (or keep the mailto fallback).
3. Swap Unsplash hero/night images for your own PNW outdoor cinema photos (marked with comments in `index.html`).
4. Adjust “starting at” prices to match your real rates.
5. Rename **Cascadia Cinema Co.** if you have a final business name.

## Deployment

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from branch (`main` or this feature branch)
3. Site live at `https://yourusername.github.io/co-web-design`

### Netlify
1. Connect the GitHub repo
2. Publish directory: `/` (root)
3. Add a custom domain when ready
