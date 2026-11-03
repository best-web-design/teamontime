'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/admin';

export default function DocList({ kind, base, title, cols }) {
  const [rows, setRows] = useState(null);
  const [q, setQ] = useState('');
  useEffect(() => { api(`/api/admin/${kind}`).then(setRows); }, [kind]);
  const shown = (rows || []).filter((r) => `${r.title} ${r.slug}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="adm-bar">
        <h1 style={{ margin: 0 }}>{title}</h1>
        <div className="adm-row">
          <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 220 }} />
          <Link className="abtn pri" href={`${base}/new`}>+ New</Link>
        </div>
      </div>
      {!rows ? <p>Loading…</p> : (
        <table className="adm-table">
          <thead><tr><th>Title</th><th>URL</th>{cols.map(([k, l]) => <th key={k}>{l}</th>)}<th>Status</th><th>Updated</th></tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r._id}>
                <td><Link href={`${base}/${r._id}`}>{r.title}</Link></td>
                <td className="adm-count">{kind === 'pages' ? (r.slug === 'home' ? '/' : `/${r.slug}`) : `/news/${r.slug}`}</td>
                {cols.map(([k]) => <td key={k} className="adm-count">{r[k]}</td>)}
                <td>{r.published ? 'Published' : 'Draft'}{r.seo?.noindex && ' · noindex'}</td>
                <td className="adm-count">{new Date(r.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
