# CLAUDE.md — Stolochi Makeup & Hair

Context for AI assistants working on this repo. Keep it current as the project evolves.

## What this is

Marketing site for a **bridal hair & makeup business in Durham, NC**, built by Pedro Henrique
Fernandes as client work. Next.js 16 app running server-rendered on **Cloudflare Workers** via
the OpenNext adapter. Its content is driven by a Google Sheet the business owner edits directly.

Live: **https://stolochi-site.ph-leao2099.workers.dev** (no custom domain yet — see below).
It is also embedded as a card in the Ouroboros Studios portfolio (`../Ouroboros-Inc`), which
points its `iframeUrl` straight at that live URL, so **this deployment going down blanks a card
on studiosouroboros.com**.

Code lives in `stolochi-site/`; the repo root holds only this file.

## ⚠️ The contact form emails Pedro, not the client

`OWNER_EMAIL` is currently set to **ph.leao2099@gmail.com** — the *developer's personal inbox*,
set that way only to test the form end to end on 2026-08-23. The client's address is believed to
be **stolochi@hotmail.com**. Inquiries submitted today reach Pedro, who has to forward them.

**You cannot simply change the secret.** Mail is sent from the shared `onboarding@resend.dev`
test address, and Resend only delivers that to the Resend account's own email; any other
recipient makes the whole send fail with a 403. Switching to the client requires all three steps:

1. Register a domain (`stolochimakeuphair.com` was available as of 2026-08-23, and is already the
   fallback origin in `layout.tsx`, `sitemap.ts`, and `robots.ts`).
2. Verify it at resend.com/domains, then change the `from:` in `src/lib/resend.ts` off
   `onboarding@resend.dev` — there is a TODO on that exact line.
3. `npx wrangler secret put OWNER_EMAIL`. It accepts a **comma-separated list**, so the client
   and Pedro can both receive inquiries once the domain is verified.

Until step 2 is done, pointing `OWNER_EMAIL` anywhere other than the Resend account's own address
silently costs you every inquiry.

## Content comes from a Google Sheet

Sheet `1PJDWBX4vFmMddb5Typ44Sc1v9UJbALIUutsH85umrcQ`, tabs `Services` / `Testimonials` /
`Gallery` (column layout documented in `stolochi-site/README.md`). `active` must be the literal
`TRUE` for a row to render.

Reading it needs **no API key and no service account.** `src/lib/sheets.ts` fetches Google's CSV
export, which only requires the sheet to be link-shared. `googleapis` was deliberately removed —
it is far too heavy for the 3 MB (free plan) Workers bundle limit, for what is one HTTP GET.

- Pages that read the sheet are `force-dynamic` with `cache: "no-store"`, so an edit shows up on
  the next page load. No rebuild, no redeploy.
- If the sheet is unreachable, `sheets.ts` falls back to built-in sample content rather than
  rendering empty pages. **This masks outages** — a page that looks fine may not be reading the
  sheet at all. To tell them apart: sample gallery images use `w=600`, the real sheet uses `w=800`.
- **The sheet is currently shared as "anyone with the link can *edit*"** (as of 2026-08-23). It
  should be **Viewer**. The site only ever reads; edit access means anyone holding the URL can
  rewrite prices and testimonials straight onto the live site.

## Commands

```bash
cd stolochi-site
npm run dev       # Next dev server, runs on Node
npm run preview   # build + run in the real workerd runtime  ← trust this one
npm run deploy    # build + deploy to Cloudflare Workers
npm test          # CSV parser unit tests (node --test, native TS stripping)
bash test-contact.sh   # /api/contact contract check against a running server
```

`test-contact.sh` defaults to localhost; pass `API=<url>` to run it against production, and
`VALID_EXPECT=200` when real Resend credentials are configured (it expects 500 otherwise).
It burns one rate-limit window per run, so wait ~60s between runs.

## Gotchas, all learned the hard way

- **`next dev` passing proves nothing.** The app runs on `workerd` in production. Two pages
  returned 200 locally and 404 in production because `wrangler.jsonc` was missing
  `global_fetch_strictly_public` and the `WORKER_SELF_REFERENCE` service binding, both of which
  the OpenNext adapter requires — without them a fetch to the Worker's own hostname loops back
  and fails with Cloudflare error 1042. Verify with `npm run preview` or against the deployed URL.
- **The Resend SDK does not throw.** `emails.send()` returns `{ data, error }`. The original code
  ignored the return value, so a rejected send still returned 200 and the visitor saw
  "Message Sent!" while nothing was delivered. `src/lib/resend.ts` now checks `error` and throws.
  Any new Resend call must do the same.
- **`@opennextjs/cloudflare` excludes Next 16.0 – 16.2.10** in its peer range
  (`>=15.5.21 <16 || >=16.2.11`). Next was upgraded 16.1.6 → 16.3.2 for this. Do not "fix" an
  install conflict by downgrading into that gap.
- **Every contact-form field is attacker-controlled** and lands in HTML email. `src/lib/resend.ts`
  escapes each one; the subject line is plain text and deliberately is not escaped.
- **`/api/contact` is rate-limited to 5/min per IP** via a Cloudflare rate-limit binding. The
  limiter is approximate and eventually consistent — do not assert on the exact request number
  that trips it, which is why `test-contact.sh` asserts "429 within a burst" instead.
- **Images are `unoptimized: true`.** Next's optimizer on Workers needs paid Cloudflare Images.
- **`dig` on this dev machine is unreliable** — something local intercepts port 53. Use
  DNS-over-HTTPS (`https://dns.google/resolve?name=...`) instead.

## Deploying

`npm run deploy` from `stolochi-site/`, which runs the OpenNext build then `wrangler deploy`.
Requires `wrangler login` once. Secrets (`RESEND_API_KEY`, `OWNER_EMAIL`) are set with
`npx wrangler secret put` **from that directory** — wrangler reads the Worker name from
`wrangler.jsonc`, so running it from the repo root fails with "Required Worker name missing".
Secrets take effect immediately, with no redeploy.

`GOOGLE_SHEETS_SPREADSHEET_ID` is a plain var in `wrangler.jsonc`, not a secret — it is already
public in the sheet's share URL.

## Security notes

- No secrets in the repo. `.env*` and `.dev.vars` are gitignored.
- The sheet holds only public marketing copy, which is why link-sharing it is acceptable. Do not
  put anything private in it — everything in it is served to the open internet.
- Deploy auth is per-developer OAuth (`wrangler login`), not a shared credential.
