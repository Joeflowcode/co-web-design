# Sales Materials

Templates and print assets for getting clients. Update phone/email before using.

## Files

| File | Use for |
|------|---------|
| `one-pager.html` | Leave at businesses, email as PDF, hand out at events |
| `one-pager.pdf` | Pre-exported PDF (regenerate after editing HTML) |
| `website-audit-template.md` | Fill out per prospect before sending audit |
| `audit-email-template.md` | Copy-paste emails for outreach and follow-up |

## One-pager → PDF

**Option A — Browser (easiest)**

1. Open `one-pager.html` in Chrome
2. Update phone/email in the header
3. Print → Save as PDF (letter size, no margins if offered)

**Option B — Command line**

```bash
# From repo root, if Playwright is installed:
python3 sales/export-one-pager.py
```

## Audit workflow

1. Find a business on Google Maps (weak site or no site)
2. Duplicate `website-audit-template.md` → rename `audit-smith-plumbing.md`
3. Spend 15–20 minutes filling it in
4. Copy highlights into `audit-email-template.md` → Email 1
5. Log in your CRM/sheet, follow up day 3 and day 7

## Before printing or sending

Replace everywhere:

- `(541) 555-1234`
- `hello@cascadelocal.com`
- `cascadelocal.com`
