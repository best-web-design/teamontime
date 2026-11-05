'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/admin';
import { useToast } from './AdminShell';

function ChangePassword() {
  const toast = useToast();
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get('password') !== f.get('confirm')) return toast('Passwords do not match', true);
    try { await api('/api/admin/password', { method: 'PUT', body: { password: f.get('password') } }); toast('Password changed'); e.target.reset(); }
    catch (err) { toast(err.message, true); }
  }
  return (
    <form className="adm-box" onSubmit={submit} style={{ maxWidth: 420, marginTop: 24 }}>
      <h2>Change password</h2>
      <label className="adm-f"><span>New password (10+ characters)</span><input name="password" type="password" minLength={10} required autoComplete="new-password" /></label>
      <label className="adm-f"><span>Confirm new password</span><input name="confirm" type="password" minLength={10} required autoComplete="new-password" /></label>
      <div><button className="abtn pri">Update password</button></div>
    </form>
  );
}

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
      <ChangePassword />
    </>
  );
}
