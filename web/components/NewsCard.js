import Link from 'next/link';

export default function NewsCard({ p }) {
  return (
    <Link className="news-card" href={`/news/${p.slug}`}>
      {p.cover ? <img className="news-thumb" src={p.cover} alt="" loading="lazy" /> : <div className="news-thumb" />}
      <p className="label">{p.category || (p.kind === 'case-study' ? 'Case study' : 'Article')}</p>
      <h3 className="h3">{p.title}</h3>
      {p.excerpt && <p className="body">{p.excerpt}</p>}
      {p.status && <p className="small">{p.status}</p>}
    </Link>
  );
}
