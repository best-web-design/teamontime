import { notFound } from 'next/navigation';
import Sections from '@/components/Sections';
import NewsCard from '@/components/NewsCard';
import { getPost, getPosts, getSettings } from '@/lib/api';
import { buildMetadata, buildJsonLd, JsonLd } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, s] = await Promise.all([getPost(slug), getSettings()]);
  return post ? buildMetadata(post, s, `/news/${slug}`) : {};
}

const fmt = (d) => d && new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, s, all] = await Promise.all([getPost(slug), getSettings(), getPosts()]);
  if (!post) notFound();
  const related = all.filter((p) => p.slug !== slug && (p.category === post.category || p.kind === post.kind)).slice(0, 3);
  const hasHero = post.sections?.[0]?.type === 'hero';
  return (
    <article>
      <JsonLd data={buildJsonLd(post, s, `/news/${slug}`, { isPost: true })} />
      {!hasHero && (
        <section className="hero left">
          <div className="hero-glow" aria-hidden />
          <div className="section">
            <p className="label">HOME / NEWS / {post.category || post.kind}</p>
            <h1 className="display">{post.title}</h1>
            {post.excerpt && <p className="lead">{post.excerpt}</p>}
            <p className="small">{[post.author, fmt(post.publishedAt), post.updatedAt && `Updated ${fmt(post.updatedAt)}`].filter(Boolean).join('  ·  ')}</p>
          </div>
        </section>
      )}
      {post.cover && !hasHero && (
        <section className="section"><img src={post.cover} alt="" style={{ borderRadius: 'var(--r32)', width: '100%' }} /></section>
      )}
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
