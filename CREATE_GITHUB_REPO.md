# Push Cascadia Cinema Co. to its GitHub repo

Repo created: https://github.com/Joeflowcode/cascadia-cinema-co

The Cursor GitHub App is **only** installed on `co-web-design`, so push to the new repo is blocked (`Permission denied to cursor[bot]`).

## Fastest fix — grant the App access (then ask the agent to push)

1. Open **https://github.com/settings/installations**
2. Click **Cursor** (or “Cursor Agent”) → **Configure**
3. Under repository access, choose **All repositories**  
   **or** **Only select repositories** and add **`cascadia-cinema-co`**
4. Save
5. Reply in chat: **access granted**

The agent will push `index.html` + `assets/photos/` to `main`.

## Alternative — upload the zip yourself (no App change)

1. Download the artifact zip: `/opt/cursor/artifacts/cascadia-cinema-co.zip`
2. Unzip it
3. On https://github.com/Joeflowcode/cascadia-cinema-co → **uploading an existing file**
4. Drop `index.html`, `README.md`, `.gitignore`, and the `assets/` folder
5. Commit to `main`
6. **Settings → Pages → Deploy from branch → main / root**

## After files are on GitHub Pages

Site URL will be:  
`https://joeflowcode.github.io/cascadia-cinema-co/`
