# Stolochi Makeup & Hair

Marketing site for a bridal hair & makeup business in Durham, NC.
Next.js on Cloudflare Workers, with page content driven by a Google Sheet the
owner edits directly.

## How content works

Services, testimonials, and gallery images are read from a Google Sheet on every
page load — edit the sheet, reload the page, the site is updated. No rebuild, no
deploy. The sheet needs three tabs, each with a header row that is skipped:

| Tab            | Columns (A → F)                                        |
| -------------- | ------------------------------------------------------ |
| `Services`     | id, name, description, price, category, active         |
| `Testimonials` | id, name, location, quote, rating, active              |
| `Gallery`      | id, imageUrl, caption, category, active                |

`active` must be the literal `TRUE` for a row to appear on the site.

If the sheet is unreachable or unconfigured, the site falls back to the built-in
sample content in `src/lib/sheets.ts` rather than rendering empty pages.

## Environment

| Variable                        | Kind    | Used for                                     |
| ------------------------------- | ------- | -------------------------------------------- |
| `GOOGLE_SHEETS_SPREADSHEET_ID`  | var     | Which sheet to read (set in `wrangler.jsonc`) |
| `RESEND_API_KEY`                | secret  | Sending contact-form email via Resend        |
| `OWNER_EMAIL`                   | secret  | Inbox that receives contact-form submissions |
| `NEXT_PUBLIC_SITE_URL`          | build   | Canonical origin, used by sitemap / robots   |

Reading the sheet needs **no API key and no service account** — it uses Google's
CSV export, which only requires the sheet to be shared as *anyone with the link*.
Share it as **Viewer**, not Editor: the site only reads, and anyone holding the
link can change whatever the sheet grants them.

Local: `.env.local` for `npm run dev`, `.dev.vars` for `npm run preview`
(both git-ignored).
Production: `npx wrangler secret put <NAME>` for each — takes effect immediately,
no redeploy needed.

## Commands

```bash
npm run dev      # Next dev server (fast refresh)
npm run preview  # build + run in the real Workers runtime — use before deploying
npm run deploy   # build + deploy to Cloudflare Workers
npm test         # CSV parser unit tests
npm run cf-typegen  # regenerate cloudflare-env.d.ts after editing wrangler.jsonc
```

`npm run dev` runs on Node, `npm run preview` runs on `workerd` exactly as
production does. Verify anything non-trivial with `preview`.

## Notes

- The contact form posts to `/api/contact`, which validates input, rejects bots
  via a honeypot field, and is rate-limited to 5 submissions per minute per IP.
- Emails currently send from `onboarding@resend.dev`. Once a domain is verified
  in Resend, switch the `from:` address in `src/lib/resend.ts`.
- Images are served unoptimized; Next's image optimizer on Workers requires paid
  Cloudflare Images.
