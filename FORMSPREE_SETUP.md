# Quote form — Formspree connected

**Endpoint:** `https://formspree.io/f/xvzeogwp`  
**Integration:** Vanilla JS AJAX (`fetch`) on the static `index.html` site — not React, not a bundler.

## What’s wired

- Form `action` → `https://formspree.io/f/xvzeogwp`
- AJAX `POST` with `Accept: application/json` (stays on page)
- Fields sent: name, email, phone, date, location, package, movie, generator checkbox, message
- Success / error UI on the booking section
- Honeypot `_gotcha` for basic spam filtering

## Test it

1. Open http://127.0.0.1:3000/#book (or your live URL)
2. Submit a quote with your real email
3. Confirm it appears in Formspree and your inbox
4. Activate / confirm the form in Formspree if it asks on first submit

## Change the inbox later

Update the notification email in the Formspree dashboard for form `xvzeogwp` — no code change needed.
