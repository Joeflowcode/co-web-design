# Deploy Executive OS to Vercel

Access your AI team from any device at a public URL (e.g. `https://your-app.vercel.app`).

## Prerequisites

- GitHub repo: [Joeflowcode/co-web-design](https://github.com/Joeflowcode/co-web-design)
- Branch: `cursor/ai-executive-team-c0c3` (or `main` after merge)
- OpenAI API key

## Steps

### 1. Sign up / log in to Vercel

Go to [vercel.com](https://vercel.com) → **Sign Up** → **Continue with GitHub**

### 2. Import your project

1. Click **Add New…** → **Project**
2. Find **co-web-design** → **Import**
3. If you don’t see it, click **Adjust GitHub App Permissions** and grant access to the repo

### 3. Configure the project

| Setting | Value |
|---------|--------|
| Framework Preset | Next.js (auto) |
| Root Directory | `./` |
| Build Command | `npm run build` (default) |
| Install Command | `npm install --legacy-peer-deps` (set in vercel.json) |

**Branch:** `cursor/ai-executive-team-c0c3`

### 4. Environment variables

Before clicking Deploy, expand **Environment Variables** and add:

| Name | Value |
|------|--------|
| `OPENAI_API_KEY` | `sk-...` your key |
| `DEFAULT_LLM_PROVIDER` | `openai` |
| `DEFAULT_LLM_MODEL` | `gpt-4o-mini` |

Apply to: **Production**, **Preview**, and **Development**

### 5. Deploy

Click **Deploy**. Wait 2–4 minutes.

### 6. Open your live app

Vercel shows a URL like:

```
https://co-web-design.vercel.app
```

Bookmark it on your phone and laptop.

---

## After deploy

- **Redeploy after env changes:** Settings → Environment Variables → edit → Redeploy
- **Custom domain:** Project → Settings → Domains → add e.g. `team.yourbusiness.com`
- **Updates:** Push to GitHub → Vercel auto-redeploys

---

## Security (important)

The live URL has **no login**. Anyone with the link can use your app and API credits.

- Don’t share the URL publicly
- Use a hard-to-guess URL or custom domain only you know
- Add auth later before inviting a team

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on install | Ensure `vercel.json` has `npm install --legacy-peer-deps` |
| AI returns demo text | Add `OPENAI_API_KEY` in Vercel env vars, then Redeploy |
| Wrong branch deployed | Settings → Git → Production Branch → set correctly |
| 404 on routes | Confirm Next.js App Router; redeploy from latest branch |

---

## Optional: Supabase on Vercel

Add when ready for persistent memory:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Run `supabase/migrations/001_initial.sql` in Supabase SQL editor first.
