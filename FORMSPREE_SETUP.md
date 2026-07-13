# Connect quote requests (Formspree)

**Recommendation:** use [Formspree](https://formspree.io) — free tier is enough to start, no backend needed, submissions land in your email + a dashboard inbox.

## 3-minute setup

1. Sign up: https://formspree.io/register  
2. Click **New Form**  
3. Name it `Cascadia quote requests`  
4. Set the notification email to the inbox you check for leads  
5. Copy the form ID from the endpoint  
   - Endpoint looks like: `https://formspree.io/f/xpwkgqyz`  
   - Form ID is the last part: `xpwkgqyz`  
6. In [`index.html`](index.html), find this line near the bottom:

```js
var FORMSPREE_ID = "YOUR_FORM_ID";
```

7. Replace with your ID:

```js
var FORMSPREE_ID = "xpwkgqyz";
```

8. Refresh the site, submit a test quote, confirm the email arrives  
9. In Formspree, confirm the first submission / activate the form if prompted

## What you get

- Instant email for every quote request  
- Dashboard archive of all leads  
- Reply-to the customer’s email from the submission  
- Honeypot spam field already on the form  
- Generator checkbox included in the payload  

Until the ID is set, the form still works via **mailto** fallback so leads aren’t lost.

## Other good options

| Service | Best when |
|---|---|
| **Formspree** | Simple static site (recommended) |
| **Netlify Forms** | You deploy on Netlify (`netlify` attribute on `<form>`) |
| **Web3Forms** | You want a free access key emailed to you |
| **Google Forms** | Fastest DIY, but looks less professional embedded |

Stick with Formspree unless you’re already on Netlify.
