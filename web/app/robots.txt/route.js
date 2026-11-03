import { getSettings, siteUrl } from '@/lib/api';

export const revalidate = 300;

// Edited in Admin → SEO settings → robots.txt. Empty = sensible default.
export async function GET() {
  const s = await getSettings();
  const body = s.robotsTxt?.trim() || `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl(s)}/sitemap.xml\n`;
  return new Response(body.replace(/\{\{siteUrl\}\}/g, siteUrl(s)), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
