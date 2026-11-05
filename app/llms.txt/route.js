import { getPages, getPosts, getSettings, siteUrl } from '@/lib/api';

export const dynamic = 'force-dynamic';

// Edited in Admin → SEO settings → llms.txt. Empty = generated from published pages and news.
export async function GET() {
  const [s, pages, posts] = await Promise.all([getSettings(), getPages(), getPosts()]);
  const base = siteUrl(s);
  let body = s.llmsTxt?.trim();
  if (!body) {
    const line = (title, url, desc) => `- [${title}](${url})${desc ? `: ${desc}` : ''}`;
    body = [
      `# ${s.siteName || 'Best Web Design'}`, '',
      `> ${s.seo?.defaultDescription || ''}`, '',
      '## Pages',
      ...pages.filter((p) => !p.seo?.noindex).map((p) => line(p.title, p.slug === 'home' ? `${base}/` : `${base}/${p.slug}`)),
      '', '## News',
      ...posts.filter((p) => !p.seo?.noindex).map((p) => line(p.title, `${base}/news/${p.slug}`, p.excerpt)),
    ].join('\n');
  }
  return new Response(body.replace(/\{\{siteUrl\}\}/g, base) + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
