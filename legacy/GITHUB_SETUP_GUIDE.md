# Central Oregon Web Design — GitHub & Deployment Setup

This guide gets your website from your laptop to live on the internet.

---

## Option 1: Deploy to GitHub Pages (Fastest, Free)

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click **New Repository** (green button, top right)
3. Name it: `co-web-design` (or whatever you want)
4. Choose **Public** (required for free GitHub Pages)
5. Click **Create Repository**

### Step 2: Upload Your File via GitHub Web
1. You'll see an empty repo page
2. Click **uploading an existing file** (or drag-and-drop)
3. Upload your `index.html` file
4. Click **Commit changes**

### Step 3: Enable GitHub Pages
1. Go to **Settings** (gear icon, top right of repo)
2. Scroll to **Pages** (left sidebar)
3. Under "Source," select **Deploy from a branch**
4. Choose branch: **main**
5. Choose folder: **/ (root)**
6. Click **Save**
7. GitHub will give you a URL like: `https://yourusername.github.io/co-web-design`

✅ **Your site is live!** It updates automatically whenever you push changes.

---

## Option 2: Deploy to Netlify (Recommended, More Control)

Since you already used Netlify for Northwest Junk Pros, this will feel familiar.

### Step 1: Push to GitHub First
Before Netlify, you need the files on GitHub. Follow Option 1 Steps 1–2 above.

### Step 2: Connect Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign in with your GitHub account
3. Click **Add new site** → **Import an existing project**
4. Select **GitHub**
5. Find your `co-web-design` repo
6. Click **Deploy site**

### Step 3: Custom Domain (Optional)
1. In Netlify, go to **Domain settings**
2. Add a custom domain (e.g., `coweb design.com`)
3. Update your DNS records (same process as Northwest Junk Pros)

✅ **Your site is live on Netlify!** Automatic deploys whenever you push to GitHub.

---

## Getting Files to Your Laptop

### Via Command Line (Recommended for Future Edits)

1. **Install Git** (if you don't have it): [git-scm.com](https://git-scm.com/download)

2. **Open Terminal/Command Prompt** and run:
   ```bash
   git clone https://github.com/yourusername/co-web-design.git
   cd co-web-design
   ```

3. **Edit locally**, then push changes:
   ```bash
   git add index.html
   git commit -m "Update website"
   git push
   ```

4. Your site updates automatically on GitHub Pages or Netlify.

### Via Zip File (Simpler, But Manual Updates)

1. Go to your GitHub repo
2. Click **< > Code** (green button)
3. Click **Download ZIP**
4. Extract on your laptop

(To update later, you'll need to re-upload via the GitHub web interface or learn git.)

---

## File Structure for Future Growth

Once your site is live, you can add more files:

```
co-web-design/
├── index.html          (your main website)
├── README.md           (project description for GitHub)
├── assets/
│   ├── images/         (logo, testimonial photos, etc.)
│   ├── css/            (if you split styles into separate files)
│   └── js/             (if you split JavaScript)
└── .gitignore          (optional: tells Git what not to track)
```

For now, a single `index.html` file works perfectly fine.

---

## Quick Checklist

- [ ] Website file (`index.html`) saved on laptop
- [ ] GitHub account created
- [ ] Repository created
- [ ] `index.html` uploaded to GitHub
- [ ] GitHub Pages enabled (or Netlify connected)
- [ ] Website live at your GitHub/Netlify URL
- [ ] Contact info updated in the HTML (phone, email, address)
- [ ] Domain pointing to GitHub Pages or Netlify DNS

---

## Next Steps

### Before Going Live:
1. **Update contact info** in the HTML:
   - Replace `(541) 555-1234` with your real phone
   - Replace `hello@yourwebsite.com` with your real email
   - Update Bend, Oregon coordinates if needed

2. **Customize messaging** (optional):
   - Change service descriptions to match your actual offerings
   - Update results/testimonials with real client stories
   - Adjust pricing tiers if different

3. **Add a real domain** (optional but recommended):
   - Buy a domain on [Namecheap](https://namecheap.com), [Google Domains](https://domains.google), or wherever
   - Point it to GitHub Pages or Netlify (they provide DNS instructions)

### After Launch:
1. Monitor site performance (GitHub Pages = automatic, Netlify has built-in analytics)
2. Test on mobile devices
3. Get feedback from real users
4. Make incremental updates and push changes

---

## Troubleshooting

**Site not showing up after 5 minutes?**
- GitHub Pages can take up to 10 minutes to publish
- Check the "Pages" settings again — make sure it says "Your site is live"

**Netlify showing a 404?**
- Make sure `index.html` is in the **root** of your repo, not in a folder
- Redeploy from Netlify dashboard

**Need to edit the file?**
- Edit locally, `git push`, and it updates automatically (if using git)
- Or re-upload via GitHub web interface

---

**Questions? Let me know and I'll walk you through it.**
