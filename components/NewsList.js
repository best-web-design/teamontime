'use client';
import { useState } from 'react';
import NewsCard from './NewsCard';

// News / Interactive category collection (Figma 50:927): category tabs; "All" shows one titled group per category.
const plural = (c) => ({ 'Case study': 'Case studies', Trend: 'Trends' }[c] || c);
export default function NewsList({ posts, allLabel = 'All articles' }) {
  const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))]
    .sort((a, b) => (a === 'Case study' ? -1 : b === 'Case study' ? 1 : 0));
  const [cat, setCat] = useState('');
  const [shown, setShown] = useState(9);
  const byDate = (a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''));
  const list = (cat ? posts.filter((p) => p.category === cat) : [...posts]).sort(byDate);
  const visible = list.slice(0, shown);
  return (
    <div className="news-list">
      <div className="news-tabs" role="group" aria-label="Filter by category">
        {['', ...cats].map((c) => (
          <button key={c || 'all'} className={`news-tab${c === cat ? ' on' : ''}`} aria-pressed={c === cat} onClick={() => { setCat(c); setShown(9); }}>{c ? plural(c) : allLabel}</button>
        ))}
      </div>
      {visible.length > 0 && (
        <div className="news-group">
          {cat && <h2 className="h3">{plural(cat)}</h2>}
          <div className="grid-3">{visible.map((p) => <NewsCard key={p.slug} p={p} />)}</div>
        </div>
      )}
      {list.length > shown && <div className="btn-row"><button type="button" className="btn btn-outline" onClick={() => setShown((n) => n + 9)}>Load more</button></div>}
      {!list.length && <p className="body">Nothing published here yet.</p>}
    </div>
  );
}
