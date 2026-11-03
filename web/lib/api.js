// Server-side reads from the Express API. Cached and cleared by /api/revalidate after admin edits.
const API = process.env.API_URL || 'http://localhost:4000';

async function get(path) {
  const res = await fetch(`${API}${path}`, { next: { revalidate: 300, tags: ['cms'] } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} -> ${res.status}`);
  return res.json();
}

export const getSettings = async () => (await get('/api/settings')) || {};
export const getPage = (slug) => get(`/api/page?slug=${encodeURIComponent(slug)}`);
export const getPages = async () => (await get('/api/pages')) || [];
export const getPosts = async (kind) => (await get(`/api/posts${kind ? `?kind=${kind}` : ''}`)) || [];
export const getPost = (slug) => get(`/api/posts/${encodeURIComponent(slug)}`);

export const siteUrl = (s) => (s.siteUrl || process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
