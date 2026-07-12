# Santiam Nearby

A curated local vacation guide to **Lyons, Oregon** and **Detroit Lake** — things to do, canyon restaurants, hidden spots, weekend plans, and local services.

## Pages (SEO)

| Page | Targets |
|---|---|
| `index.html` | Hub: things to do near Lyons & Detroit Lake |
| `things-to-do-detroit-lake-oregon.html` | “things to do at Detroit Lake Oregon” |
| `things-to-do-lyons-oregon.html` | “things to do in Lyons Oregon” |
| `restaurants-near-detroit-lake.html` | “restaurants near Detroit Lake” / Lyons food stops |
| `robots.txt` + `sitemap.xml` | Crawl / discovery |

## Local businesses featured

| Business | What it is | Link |
|---|---|---|
| **Bounce House Rentals** | Inflatable party rentals around Lyons / Santiam Canyon | Listed on site |
| **Boat Concierge** | Detroit Lake boat delivery & launch help | Listed on site |
| **Oregon Mobile Tire** | 24/7 mobile tire & roadside assistance | [oregonmobiletire.com](https://oregonmobiletire.com) |

## SEO approach (how this ranks for vacationers)

1. **One page per money search** — Detroit Lake activities, Lyons activities, and restaurants each have their own URL and title tag.
2. **Unique local copy** — restaurant and “hidden tip” writeups answer *when/why to go*, not just name + address (what Maps already has).
3. **Crawlable HTML** — place listings are real HTML (not JS-only), so Google can index them.
4. **Structured data** — `WebSite`, `TouristDestination`, `ItemList`, `Article`, `Restaurant`, `FAQPage`, `BreadcrumbList`.
5. **Internal links** — hub ↔ guides ↔ directory ↔ businesses.
6. **FAQ matching real queries** — “where to eat near Detroit Lake”, “things to do in Lyons”, etc.
7. **Technical basics** — canonicals, geo meta, Open Graph, `robots.txt`, `sitemap.xml`.

### Keep winning SEO after launch

- Add **original photos** and short seasonal updates (lake levels, summer hours).
- Publish more long-tail guides (“rainy day near Detroit Lake”, “camping with kids”, “boat launch tips”).
- Get **citations** from local partners and Google Business Profiles that link here.
- Add phone/booking schema for bounce houses + boat concierge when ready.
- Point a custom domain at the site and update canonicals/sitemap URLs.
- Submit the sitemap in Google Search Console.

## Features

- Shared `styles.css` across pages
- Filterable directory (services, food, hidden tips, outdoors, swim, free)
- Weekend plans that route people through local food + services
- Mobile-friendly layout

## File structure

```
index.html
things-to-do-detroit-lake-oregon.html
things-to-do-lyons-oregon.html
restaurants-near-detroit-lake.html
styles.css
robots.txt
sitemap.xml
README.md
```

## Deployment

### GitHub Pages
1. Settings → Pages → Deploy from branch
2. Update `canonical` / `sitemap.xml` URLs if your Pages URL differs
3. Submit sitemap in Search Console

### Netlify
1. Connect repo, publish `/`
2. Add custom domain
3. Replace `joeflowcode.github.io/co-web-design` URLs in canonicals + sitemap
