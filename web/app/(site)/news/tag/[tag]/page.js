import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { getPosts, getSettings, siteUrl, tagSlug } from '@/lib/api';

// shortcut: filters the full post list in memory, fine for hundreds of posts; add an API tag filter beyond that.
async function load(params) {
  const { tag } = await params;
  const posts = (await getPosts()).filter((p) => (p.tags || []).some((t) => tagSlug(t) === tag));
  const name = posts[0]?.tags.find((t) => tagSlug(t) === tag);
  return { tag, posts, name };
}

export async function generateMetadata({ params }) {
  const [{ tag, posts, name }, s] = await Promise.all([load(params), getSettings()]);
  if (!posts.length) return {};
  return {
    title: `${name} articles`,
    description: `Articles and case studies about ${name} from ${s.siteName || 'Best Web Design'}.`,
    alternates: { canonical: `${siteUrl(s)}/news/tag/${tag}` },
  };
}

export default async function TagPage({ params }) {
  const { posts, name } = await load(params);
  if (!posts.length) notFound();
  return (
    <>
      <section className="hero left">
        <div className="hero-glow" aria-hidden />
        <div className="section">
          <nav aria-label="Breadcrumb" className="label"><Link href="/">Home</Link>  /  <Link href="/news">News</Link>  /  Tag</nav>
          <h1 className="display">#{name}</h1>
          <p className="lead">{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
        </div>
      </section>
      <section className="section"><div className="grid-3">{posts.map((p) => <NewsCard key={p.slug} p={p} />)}</div></section>
    </>
  );
}
