'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/admin';

export default function Dashboard() {
  const [n, setN] = useState({});
  useEffect(() => {
    Promise.all([api('/api/admin/pages'), api('/api/admin/posts'), api('/api/admin/submissions')])
      .then(([p, n2, s]) => setN({ pages: p.length, posts: n2.length, unread: s.filter((x) => !x.read).length }));
  }, []);
  const cards = [
    ['/admin/pages', 'Pages', n.pages], ['/admin/news', 'News & case studies', n.posts],
    ['/admin/submissions', 'Unread submissions', n.unread], ['/admin/settings', 'Site & SEO settings', '→'],
  ];
  return (
    <>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {cards.map(([href, label, v]) => (
          <Link key={href} href={href} className="adm-box" style={{ textDecoration: 'none' }}>
            <span className="adm-count">{label}</span><strong style={{ fontSize: 28, fontFamily: 'var(--display)' }}>{v ?? '…'}</strong>
          </Link>
        ))}
      </div>
    </>
  );
}
