// Server-side data access for pages, layouts and SEO routes.
// server.js puts the MySQL store on globalThis before Next.js starts, so no HTTP round trip is needed.
import { cache } from 'react';

const BUILD = process.env.NEXT_PHASE === 'phase-production-build';
const store = () => {
  if (globalThis.__bwdStore) return globalThis.__bwdStore;
  if (BUILD) return null; // nothing is prerendered from data (routes are force-dynamic)
  throw new Error('Data store not ready: start the site with `node server.js`, not `next start`.');
};

export const getSettings = cache(async () => (await store()?.settings.get()) || {});
export const getPage = cache(async (slug) => (await store()?.pages.bySlug(slug)) || null);
export const getPages = cache(async () => (await store()?.pages.list({ publishedOnly: true })) || []);
export const getPosts = cache(async (kind) => (await store()?.posts.list({ publishedOnly: true, kind: kind || undefined })) || []);
export const getPost = cache(async (slug) => (await store()?.posts.bySlug(slug)) || null);

export const tagSlug = (t) => encodeURIComponent(String(t).trim().toLowerCase().replace(/\s+/g, '-'));
export const siteUrl = (s) => (s.siteUrl || process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
