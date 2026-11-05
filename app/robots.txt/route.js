import { getSettings, siteUrl } from '@/lib/api';

export const dynamic = 'force-dynamic';

// Edited in Admin → SEO settings → robots.txt. Empty = sensible default.
export async function GET() {
  const s = await getSettings();
  // SITE_NOINDEX=1 on the staging subdomain keeps the test copy out of search engines.
  if (process.env.SITE_NOINDEX === '1') return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  const body = s.robotsTxt?.trim() || `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl(s)}/sitemap.xml\n`;
  return new Response(body.replace(/\{\{siteUrl\}\}/g, siteUrl(s)), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
