# Create the Cascadia Cinema Co. GitHub repo

The Cursor cloud agent can only write to **Joeflowcode/co-web-design** (that’s the only repo the GitHub App install can access). It **cannot** create a brand-new repository under your account.

## Do this once (≈30 seconds)

1. Open this link while logged into GitHub as **Joeflowcode**:  
   **https://github.com/new?name=cascadia-cinema-co&description=Cascadia%20Cinema%20Co.%20—%20outdoor%20movie%20night%20rentals&visibility=public**
2. Leave it **empty** (no README, no .gitignore, no license).
3. Click **Create repository**.
4. Reply in the agent chat: **repo created** — the agent will push the site and can enable GitHub Pages.

## Or upload the zip yourself

Download [`cascadia-cinema-co.zip`](/opt/cursor/artifacts/cascadia-cinema-co.zip) from this agent’s artifacts, create the empty repo above, then drag the zip contents into GitHub’s “uploading an existing file” flow.

## After the repo exists — local push

```bash
cd /tmp/cascadia-cinema-co   # or unzip the artifact
git remote set-url origin https://github.com/Joeflowcode/cascadia-cinema-co.git
git push -u origin main
```

Then: **Settings → Pages → Deploy from branch → main / root**.
