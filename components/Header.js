'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header({ settings: s }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const nav = s.nav || {};
  useEffect(() => {
    if (!mega) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { setMega(false); document.getElementById('mega-trigger')?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mega]);
  return (
    <header className="header-wrap">
      <nav className={`nav${open ? ' open' : ''}`} aria-label="Main">
        <Link href="/" aria-label={`${s.siteName || 'Home'} home`}>
          {s.logo ? <img className="nav-logo" src={s.logo} alt="" width="51" height="55" /> : <span className="h3" style={{ fontSize: 18 }}>BWD</span>}
        </Link>
        <button className="pill nav-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
        <ul className="nav-links">
          {(nav.links || []).map((l) => (
            <li key={l.label}>
              {l.mega ? (
                <button id="mega-trigger" aria-expanded={mega} aria-controls="mega-menu" onClick={() => setMega(!mega)}>{l.label}</button>
              ) : (
                <Link href={l.href || '#'}>{l.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-ctas">
          {(nav.ctas || []).map((c) => (
            <Link key={c.label} className={`btn btn-${c.style || 'primary'}`} href={c.href || '#'}>{c.label}</Link>
          ))}
        </div>
      </nav>
      {mega && (
        <div className="mega" id="mega-menu">
          <button type="button" className="mega-close" aria-label="Close services menu" onClick={() => { setMega(false); document.getElementById('mega-trigger')?.focus(); }}>×</button>
          <div className="mega-grid">
            {(s.mega || []).map((m) => (
              <Link key={m.href} href={m.href} onClick={() => setMega(false)}>
                {m.kicker && <p className="label">{m.kicker}</p>}
                <p className="h3">{m.title}</p>
                {m.body && <p className="small">{m.body}</p>}
              </Link>
            ))}
          </div>
          {(s.megaIndustries || []).length > 0 && (
            <div className="mega-industries">
              <p className="label">BY INDUSTRY</p>
              <ul>
                {s.megaIndustries.map((i) => (
                  <li key={i.href}><Link href={i.href} onClick={() => setMega(false)}>{i.label}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
