# Cascadia Cinema Co.

Professional **outdoor movie night rentals** across **Portland metro** (Hillsboro, Lake Oswego, West Linn, Beaverton, and neighbors) plus **Lyons, Detroit Lake, Salem, Sisters, and Bend**, Oregon.

**Live:** https://cascadia-cinema-co.netlify.app

Admin: https://app.netlify.com/projects/cascadia-cinema-co

## Packages

| Package | What’s included | Starting at |
|---|---|---|
| **Basic Cinema** | Screen, speakers, projector setup, delivery & pack-up, any movie you choose | $275 |
| **Cinema + Popcorn** | Basic + popcorn machine & serving supplies | $375 |
| **Full Night Out** | Cinema + popcorn + bouncy house | $525 |

À la carte add-ons: popcorn machine (from $95), bouncy house (from $175), and quiet generator when there’s no outlet (from $75).

## What’s on the site

- **Hero** — Brand-first PNW outdoor cinema landing
- **Town ticker** — Portland-metro suburbs + Valley & Cascades towns
- **Packages** — Three clear tiers with quote CTAs that preselect the booking form
- **How it works** — Book → We deliver & set up → You press play
- **The night** — Full-bleed atmospheric outdoor cinema visual
- **Occasions** — Birthday, campground, HOA, wedding welcome, and more
- **Included / site needs** — Power, space, weather, movie notes
- **FAQ** — Rain, setup time, licensing, travel, deposit
- **Booking form** — Quote request with Formspree-ready action + mailto fallback
- **Sticky mobile CTA** — Always-visible “Book a night” on phones

## Service area

| Region | Towns |
|---|---|
| **Portland metro** | Hillsboro, Beaverton, Lake Oswego, West Linn, Tualatin, Sherwood, Wilsonville, Happy Valley, Portland |
| **Willamette Valley** | Salem, Lyons |
| **Santiam / lake** | Detroit Lake |
| **Cascades** | Sisters, Bend |

Outside this list? Ask — travel quotes welcome.

## Features

- Single `index.html` — no build step or dependencies
- Local Pexels photos of outdoor cinemas (see `assets/photos/`)
- Editorial layout: menu-style packages, town ticker, photo breakouts
- LocalBusiness structured data + Open Graph meta
- Conversion UX: package preselect, form validation, sticky mobile CTA
- Motion: hero drift, town ticker, scroll reveals

## File structure

```
index.html              — Marketing + booking site
assets/photos/          — Outdoor cinema photos from Pexels
assets/photos/ATTRIBUTION.txt
README.md
GITHUB_SETUP_GUIDE.md
```

## Before you go live

1. Replace placeholder phone `(503) 555-0192` and email `hello@cascadiacinema.example` with your real contact info.
2. **Quote form:** Formspree is connected (`xvzeogwp`) — see [FORMSPREE_SETUP.md](FORMSPREE_SETUP.md).
3. Optionally swap Pexels photos for your own event photography.
4. Adjust “starting at” prices to match your real rates.
5. Rename **Cascadia Cinema Co.** if you have a final business name.

## Deployment

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from branch (`main` or this feature branch)
3. Site live at `https://yourusername.github.io/cascadia-cinema-co`

### Netlify
1. Connect the GitHub repo
2. Publish directory: `/` (root)
3. Add a custom domain when ready
