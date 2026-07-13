# Publish Cascadia Cinema Co. to Netlify

This cloud agent is **not logged into Netlify**, so it can’t finish the deploy alone. Pick one path below.

## Fastest — Netlify Drop (≈1 minute)

1. Download the deploy zip: `/opt/cursor/artifacts/cascadia-netlify.zip`
2. Go to **https://app.netlify.com/drop** (signed in as your Netlify account)
3. Drag the zip onto the page
4. Netlify gives you a live URL like `https://random-name-123.netlify.app`
5. Optional: Site settings → Domain management → change site name to `cascadia-cinema-co`

## Better long-term — connect GitHub (auto-deploys)

1. Grant Cursor access to `Joeflowcode/cascadia-cinema-co`  
   https://github.com/settings/installations → Cursor → add that repo  
2. Reply **access granted** so the agent can push the site  
3. In Netlify: **Add new site → Import from Git → GitHub → cascadia-cinema-co**  
4. Publish directory: `/` (root) · Build command: (leave empty)  
5. Deploy

## Or give the agent a Netlify token

1. https://app.netlify.com/user/applications#personal-access-tokens  
2. New access token → copy it  
3. Reply with: `NETLIFY_AUTH_TOKEN=...`  
4. The agent will run `netlify deploy --prod` for you

## After it’s live

- Test the quote form on the Netlify URL (Formspree `xvzeogwp` already connected)
- Replace placeholder phone/email in `index.html` when ready
