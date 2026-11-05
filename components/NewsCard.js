import Link from 'next/link';

export default function NewsCard({ p }) {
  return (
    <Link className="news-card" href={`/news/${p.slug}`}>
      {p.cover ? <img className="news-thumb" src={p.cover} alt={p.coverAlt || ''} loading="lazy" /> : <div className="news-thumb" />}
      <p className="label">{p.category || (p.kind === 'case-study' ? 'Case study' : 'Article')}</p>
      <h3 className="h3">{p.title}</h3>
      {p.excerpt && <p className="body">{p.excerpt}</p>}
      {p.tags?.length > 0 && <p className="small">{p.tags.slice(0, 3).map((t) => `#${t}`).join('  ')}</p>}
      {p.status && <p className="small">{p.status}</p>}
    </Link>
  );
}
