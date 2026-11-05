'use client';
import { useState } from 'react';
import NewsCard from './NewsCard';

// News / Interactive category collection: filter chips by category.
export default function NewsList({ posts }) {
  const cats = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))];
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? posts : posts.filter((p) => p.category === cat);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div className="btn-row" style={{ justifyContent: 'flex-start' }} role="group" aria-label="Filter by category">
        {cats.map((c) => (
          <button key={c} className="pill" aria-pressed={c === cat} style={c === cat ? { background: 'var(--primary)' } : undefined} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="grid-3">{shown.map((p) => <NewsCard key={p.slug} p={p} />)}</div>
      {!shown.length && <p className="body">Nothing published here yet.</p>}
    </div>
  );
}
