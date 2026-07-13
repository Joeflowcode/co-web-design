# McKenzie Nearby

Local vacation guide for the **McKenzie River corridor** (Vida · Rainbow · McKenzie Bridge · Clear Lake).

**Path:** `/mckenzie/`  
**Production domain:** `mckenzienearby.com` (canonicals and sitemap use this URL)

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hub + filterable directory + FAQ + blog highlights |
| `things-to-do.html` | Corridor activities overview |
| `restaurants.html` | Corridor food stops (NAP + schema) |
| `where-to-stay.html` | How to choose a base |
| `tamolitch-blue-pool.html` | Blue Pool spot guide (SEO landing) |
| `sahalie-koosah-falls.html` | Waterfall loop guide |
| `clear-lake-oregon.html` | Headwaters lake guide |
| `belknap-hot-springs.html` | Hot springs guide |
| `vida-oregon.html` | Mid-corridor stays + Vida area |
| `blog/index.html` | Blog hub |
| `blog/*.html` | Travel tips (timing, kids, seasons, itineraries) |

## SEO

- Canonical URLs → `https://mckenzienearby.com/...`
- `sitemap.xml` + `robots.txt` at site root
- Open Graph + Twitter cards on all pages (hero image)
- JSON-LD: Organization, TouristDestination, FAQPage, BreadcrumbList, TouristAttraction, LodgingBusiness, Restaurant, BlogPosting
- Submit sitemap to Google Search Console + Bing Webmaster after domain is live

## Soft lodging placement

Lodging is presented as traveler advice by corridor section. Vida View Resort appears as one mid-corridor riverfront option — same card style, useful logistics notes, link to [vidaviewresort.com](https://vidaviewresort.com).

## Deploy

Point `mckenzienearby.com` document root to `/mckenzie` (or deploy this folder as the site root).
