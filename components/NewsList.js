'use client';
import { useState } from 'react';
import NewsCard from './NewsCard';

// News / Interactive category collection (Figma 50:927): category tabs; "All" shows one titled group per category.
const plural = (c) => ({ 'Case study': 'Case studies', Trend: 'Trends' }[c] || c);
export default function NewsList({ posts, allLabel = 'All articles' }) {
  const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))]
    .sort((a, b) => (a === 'Case study' ? -1 : b === 'Case study' ? 1 : 0));
  const [cat, setCat] = useState('');
  const groups = (cat ? [cat] : cats).map((c) => ({ c, items: posts.filter((p) => p.category === c) })).filter((g) => g.items.length);
  return (
    <div className="news-list">
      <div className="news-tabs" role="group" aria-label="Filter by category">
        {['', ...cats].map((c) => (
          <button key={c || 'all'} className={`news-tab${c === cat ? ' on' : ''}`} aria-pressed={c === cat} onClick={() => setCat(c)}>{c ? plural(c) : allLabel}</button>
        ))}
      </div>
      {groups.map((g) => (
        <div className="news-group" key={g.c}>
          <h2 className="h3">{plural(g.c)}</h2>
          <div className="grid-3">{g.items.map((p) => <NewsCard key={p.slug} p={p} />)}</div>
        </div>
      ))}
      {!groups.length && <p className="body">Nothing published here yet.</p>}
    </div>
  );
}
