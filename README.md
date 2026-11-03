# Best Web Design — website + CMS

Next.js (server-rendered, SEO) + Express API + MongoDB (Atlas). Built from the Figma file
"BWD Website Services — Agency9" (21 desktop pages).

```
server/   Express API, Mongoose models, admin auth, uploads, forms, seed content
web/      Next.js site (public pages + /admin panel)
```

## What is editable in /admin

- **Pages** — every page is a list of sections (hero, cards, journey, steps, panels, engagement, FAQ,
  CTA, logos, gallery, integrations catalogue, table, forms, rich text…). Edit text and images,
  reorder, add or remove sections, create new pages.
- **SEO per page** — meta title, description, canonical, social image, noindex, custom JSON-LD.
  Generated automatically when empty: Organization + WebSite (home), Service (service pages),
  FAQPage (from FAQ sections), BreadcrumbList, Article/BlogPosting (news).
- **News & case studies** — posts with category, cover, excerpt, author, sections and SEO.
- **Site & SEO settings** — site name/URL, logos, favicon, contact details, WhatsApp button,
  title template, default description/OG image, Google/Bing verification, GA4/GTM,
  Organization schema, **robots.txt**, **llms.txt**, header menu, mega menu, footer.
- **Form submissions** — Contact, Free Audit (3-step) and Newsletter; view, mark read, export CSV.
  Optional email notification via SMTP.

`/sitemap.xml`, `/robots.txt` and `/llms.txt` are served live from the database. Saving in admin
refreshes the public site immediately (on-demand revalidation).

## Run locally

1. Create a free MongoDB Atlas cluster and copy the connection string.
2. API:
   ```
   cd server && cp .env.example .env   # fill MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
   npm install
   npm run seed                          # loads all Figma content + creates the admin user
   npm run dev                           # http://localhost:4000
   ```
3. Website:
   ```
   cd web && cp .env.example .env        # API_URL=NEXT_PUBLIC_API_URL=http://localhost:4000
   npm install && npm run dev            # http://localhost:3000, admin at /admin
   ```
`npm run seed -- --force` overwrites seeded pages with the original content (it never deletes).

## Deploy

The API must be reachable while `next build` runs (pages are pre-rendered from it).

- **VPS**: run both with PM2 behind Nginx (`api.` subdomain → :4000, main domain → :3000), HTTPS via Certbot.
- **cPanel with "Setup Node.js App"**: create two Node apps (server: `src/index.js`, web: `npm run start`).
- **Vercel + Render**: web on Vercel, server on Render. Uploads on Render need a persistent disk
  (set `UPLOAD_DIR`) — or use an image CDN.

## Before launch

- Export the logo, icons and images from Figma and upload them in Admin (settings logos, home client
  logos, technology logos, portfolio gallery, case-study thumbnails, the pyramid illustration).
- Replace the Privacy Notice and Terms pages, then untick noindex.
- The news previews from Figma are "illustrative" and published with noindex. Replace them with
  real stories (or unpublish) — `case-study-template` is an unpublished draft following the P15 layout.
- The P16 article needs an author.
- Set the WhatsApp number in Settings to show the floating button.
