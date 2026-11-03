import { getPages, getPosts, getSettings, siteUrl, tagSlug } from '@/lib/api';

export const revalidate = 300;

export default async function sitemap() {
  const [s, pages, posts] = await Promise.all([getSettings(), getPages(), getPosts()]);
  const base = siteUrl(s);
  return [
    ...pages.filter((p) => !p.seo?.noindex).map((p) => ({
      url: p.slug === 'home' ? `${base}/` : `${base}/${p.slug}`, lastModified: p.updatedAt,
      priority: p.slug === 'home' ? 1 : 0.8,
    })),
    ...posts.filter((p) => !p.seo?.noindex).map((p) => ({ url: `${base}/news/${p.slug}`, lastModified: p.updatedAt, priority: 0.6 })),
    ...[...new Set(posts.filter((p) => !p.seo?.noindex).flatMap((p) => (p.tags || []).map(tagSlug)))].map((t) => ({ url: `${base}/news/tag/${t}`, priority: 0.4 })),
  ];
}
