# Best Web Design — website + CMS

Next.js (server-rendered, SEO) + Express API + MySQL, running as **one Node.js app**
(`server.js` serves `/api` and `/uploads`, Next.js renders everything else).
Built from the Figma file "BWD Website Services — Agency9" (21 desktop pages).

```
app/ components/ lib/   Next.js site + /admin panel
server/                 API (api.js), MySQL store (db.js), seed script + Figma content (seed-data/)
server.js               startup file: creates tables, seeds content + admin on first run, starts the site
```

## What is editable in /admin

- **Pages** — every page is a list of sections (hero, cards, journey, steps, panels, engagement, FAQ,
  CTA, logos, gallery, integrations catalogue, table, forms, rich text…). Edit text and images,
  reorder, add or remove sections, create new pages.
- **SEO per page** — meta title, description, canonical, social image, noindex, custom JSON-LD.
  Generated automatically when empty: Organization + WebSite (home), Service (service pages),
  FAQPage (from FAQ sections), BreadcrumbList, Article/BlogPosting (news).
- **Blog / News** — title, slug (auto from title), short description, featured image + alt text,
  rich-text content (headings, lists, links, quotes, inline images, HTML mode), category, tags, author,
  publish date, optional extra sections, and per-post SEO (meta title/description, canonical, social image,
  noindex, custom schema). Front end: `/news`, `/news/<slug>` (BlogPosting schema, article:* Open Graph,
  reading time, related posts by tag) and `/news/tag/<tag>` archive pages (in the sitemap).
- **Site & SEO settings** — site name/URL, logos, favicon, contact details, WhatsApp button,
  title template, default description/OG image, Google/Bing verification, GA4/GTM,
  Organization schema, **robots.txt**, **llms.txt**, header menu, mega menu, footer.
- **Form submissions** — Contact, Free Audit (3-step) and Newsletter; view, mark read, export CSV.
  Optional email notification via SMTP.

`/sitemap.xml`, `/robots.txt` and `/llms.txt` are served live from the database; admin changes show
on the site immediately.

## Run locally

1. Create a MySQL/MariaDB database and user.
2. `cp .env.example .env` and fill `DB_*`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. `npm install`, then `npm run dev` → http://localhost:3000 (admin at `/admin`).

Tables are created and the Figma content is loaded automatically on first start.
`npm run seed -- --force` restores the original seeded pages (never deletes anything).
Tests: `npm test` (DB test runs when `TEST_DB_NAME` is set).

## Deploy on HostAfrica (DirectAdmin → Setup Node.js App)

1. `npm run build` locally (shared hosting has too little memory to build).
2. Upload everything except `node_modules` (including `.next/` and a production `.env`) to an
   app folder outside `public_html`, e.g. `/home/<user>/nodebwd_app`.
3. Setup Node.js App → Create: Node 20+, mode Production, application root `nodebwd_app`,
   URL = the (sub)domain, startup file `server.js`. Then **Run NPM Install** and **Restart**.
4. Remove the default `index.html` from the domain's `public_html` so it doesn't shadow the app.
5. Issue SSL for the domain (DirectAdmin → SSL Certificates).

## Before launch

- Export the logo, icons and images from Figma and upload them in Admin (settings logos, home client
  logos, technology logos, portfolio gallery, case-study thumbnails, the pyramid illustration).
- Replace the Privacy Notice and Terms pages, then untick noindex.
- The news previews from Figma are "illustrative" and published with noindex. Replace them with
  real stories (or unpublish) — `case-study-template` is an unpublished draft following the P15 layout.
- The P16 article needs an author.
- Set the WhatsApp number in Settings to show the floating button.
