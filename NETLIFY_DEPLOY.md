# Cascadia Cinema Co. — Netlify

**Live site:** https://cascadia-cinema-co.netlify.app  
**Admin:** https://app.netlify.com/projects/cascadia-cinema-co  
**Formspree:** `https://formspree.io/f/xvzeogwp`

## Redeploy from this agent

```bash
export NETLIFY_AUTH_TOKEN='…'   # create a fresh token if needed
npx netlify-cli deploy --prod --dir=. --message "update"
```

## Security note

If a Netlify personal access token was pasted into chat, revoke it at  
https://app.netlify.com/user/applications#personal-access-tokens and create a new one for future deploys.
