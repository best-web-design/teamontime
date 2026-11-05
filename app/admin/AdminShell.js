'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { token } from '@/lib/admin';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

const NAV = [
  ['/admin', 'Dashboard'], ['/admin/pages', 'Pages'], ['/admin/news', 'Blog / News'], ['/admin/media', 'Media library'],
  ['/admin/submissions', 'Form submissions'], ['/admin/settings', 'Site & SEO settings'],
];

export default function AdminShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, err) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3000); }, []);

  useEffect(() => {
    if (path !== '/admin/login' && !token.get()) router.replace('/admin/login');
    else setReady(true);
  }, [path, router]);

  if (path === '/admin/login') return <div className="adm"><ToastCtx.Provider value={show}>{children}</ToastCtx.Provider></div>;
  if (!ready) return null;
  return (
    <ToastCtx.Provider value={show}>
      <div className="adm">
        <nav className="adm-side" aria-label="Admin">
          <strong style={{ padding: '0 12px 16px', fontFamily: 'var(--display)' }}>BWD Admin</strong>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={(href === '/admin' ? path === href : path.startsWith(href)) ? 'on' : ''}>{label}</Link>
          ))}
          <a href="/" target="_blank" rel="noopener">View site ↗</a>
          <button onClick={() => { token.clear(); router.replace('/admin/login'); }}>Log out</button>
        </nav>
        <div className="adm-main">{children}</div>
      </div>
      {toast && <div className={`adm-toast${toast.err ? ' err' : ''}`} role="status">{toast.msg}</div>}
    </ToastCtx.Provider>
  );
}
