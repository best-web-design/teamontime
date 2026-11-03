import Link from 'next/link';
import { Lines } from './Text';

export default function Footer({ settings: s }) {
  const f = s.footer || {};
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          {s.logoFooter ? <img className="footer-logo" src={s.logoFooter} alt={s.siteName || 'Best Web Design'} width="176" height="131" /> : <p className="h3">{s.siteName}</p>}
          <p className="body" style={{ marginTop: 24 }}><Lines text={f.tagline} /></p>
        </div>
        {(f.columns || []).map((col) => (
          <div key={col.title}>
            <h2>{col.title}</h2>
            <ul>
              {(col.links || []).map((l) => (
                <li key={l.label}>{l.href ? <Link href={l.href}>{l.label}</Link> : l.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-legal small">
        <span>{f.legal}</span>
        <span>
          {(f.legalLinks || []).map((l, i) => (
            <span key={l.label}>{i > 0 && '  /  '}<Link href={l.href}>{l.label}</Link></span>
          ))}
        </span>
      </div>
    </footer>
  );
}
