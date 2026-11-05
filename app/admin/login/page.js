'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, token } from '@/lib/admin';

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const { token: t } = await api('/api/auth/login', { method: 'POST', body: Object.fromEntries(new FormData(e.currentTarget)) });
      token.set(t);
      router.replace('/admin');
    } catch (e2) { setErr(e2.message); setBusy(false); }
  }
  return (
    <div className="adm-login" style={{ gridColumn: '1 / -1' }}>
      <form className="adm-box" onSubmit={submit}>
        <h1 style={{ margin: 0 }}>Admin login</h1>
        <label className="adm-f"><span>Email</span><input name="email" type="email" required autoComplete="username" /></label>
        <label className="adm-f"><span>Password</span><input name="password" type="password" required autoComplete="current-password" /></label>
        {err && <p role="alert" style={{ color: '#ff8a9b', margin: 0 }}>{err}</p>}
        <button className="abtn pri" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
