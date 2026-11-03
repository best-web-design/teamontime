import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sections from '@/components/Sections';
import NewsCard from '@/components/NewsCard';
import { getPost, getPosts, getSettings, tagSlug } from '@/lib/api';
import { buildMetadata, buildJsonLd, JsonLd } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, s] = await Promise.all([getPost(slug), getSettings()]);
  return post ? buildMetadata(post, s, `/news/${slug}`) : {};
}

const fmt = (d) => d && new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
const readMins = (html = '') => Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220));

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, s, all] = await Promise.all([getPost(slug), getSettings(), getPosts()]);
  if (!post) notFound();
  const tags = post.tags || [];
  const related = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: (p.tags || []).filter((t) => tags.includes(t)).length * 2 + (p.category === post.category ? 1 : 0) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);
  const meta = [post.author && `By ${post.author}`, fmt(post.publishedAt) && `Published ${fmt(post.publishedAt)}`,
    post.updatedAt && fmt(post.updatedAt) !== fmt(post.publishedAt) && `Updated ${fmt(post.updatedAt)}`,
    post.content && `${readMins(post.content)} min read`].filter(Boolean);

  return (
    <article>
      <JsonLd data={buildJsonLd(post, s, `/news/${slug}`, { isPost: true })} />
      <section className="hero left">
        <div className="hero-glow" aria-hidden />
        <div className="section">
          <nav aria-label="Breadcrumb" className="label"><Link href="/">Home</Link>  /  <Link href="/news">News</Link>{post.category && `  /  ${post.category}`}</nav>
          <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.2 }}>{post.title}</h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          {meta.length > 0 && <p className="small">{meta.join('  ·  ')}</p>}
          {tags.length > 0 && <TagList tags={tags} />}
        </div>
      </section>
      {post.cover && (
        <section className="section" style={{ paddingTop: 0 }}>
          <img src={post.cover} alt={post.coverAlt || ''} width="1280" height="672" fetchPriority="high"
            style={{ borderRadius: 'var(--r32)', width: '100%', height: 'auto', aspectRatio: '1200 / 630', objectFit: 'cover' }} />
        </section>
      )}
      {/* content is written by authenticated admins in the editor */}
      {post.content && <section className="section"><div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} /></section>}
      <Sections sections={post.sections} />
      {related.length > 0 && (
        <section className="section">
          <h2 className="h2">Related reading</h2>
          <div className="grid-3">{related.map((p) => <NewsCard key={p.slug} p={p} />)}</div>
        </section>
      )}
    </article>
  );
}

function TagList({ tags }) {
  return (
    <ul className="tags" aria-label="Tags">
      {tags.map((t) => <li key={t}><Link href={`/news/tag/${tagSlug(t)}`}>#{t}</Link></li>)}
    </ul>
  );
}
