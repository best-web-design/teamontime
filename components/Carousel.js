'use client';
import { useRef, useState } from 'react';
import NewsCard from './NewsCard';

export default function Carousel({ posts }) {
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(posts.length / 3));
  const go = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = track.current;
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="carousel-track" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Case studies">
        {posts.map((p) => <NewsCard key={p.slug} p={p} />)}
      </div>
      {posts.length > 3 && (
        <div className="carousel-controls">
          <button className="pill" onClick={() => go(-1)} disabled={page === 0}>‹ Previous</button>
          <div className="dots" aria-hidden>{Array.from({ length: pages }, (_, i) => <span key={i} className={i === page ? 'on' : ''} />)}</div>
          <button className="pill" onClick={() => go(1)} disabled={page >= pages - 1}>Next ›</button>
        </div>
      )}
    </div>
  );
}
