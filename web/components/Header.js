'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header({ settings: s }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const nav = s.nav || {};
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
                <button aria-expanded={mega} aria-controls="mega-menu" onClick={() => setMega(!mega)}>{l.label}</button>
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
        <div className="mega" id="mega-menu" onKeyDown={(e) => e.key === 'Escape' && setMega(false)}>
          {(s.mega || []).map((m) => (
            <Link key={m.href} href={m.href} onClick={() => setMega(false)}>
              {m.kicker && <p className="label">{m.kicker}</p>}
              <p className="h3">{m.title}</p>
              {m.body && <p className="small">{m.body}</p>}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
