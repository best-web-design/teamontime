'use client';
import { useState } from 'react';

const TABS = ['Design', 'Development', 'Integration', 'Growth'];
const tags = (it) => (it.disciplines || it.code?.split('/')[1] || '').split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
const has = (it, tab) => tags(it).some((t) => t.startsWith(tab.toLowerCase()));

export default function Integrations({ items, help }) {
  const [tab, setTab] = useState('All');
  const shown = tab === 'All' ? items : items.filter((it) => has(it, tab));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {help && <p className="small">{help}</p>}
      <div className="btn-row" style={{ justifyContent: 'flex-start' }} role="group" aria-label="Filter by discipline">
        {['All', ...TABS].map((t) => (
          <button key={t} className="pill" aria-pressed={t === tab} style={t === tab ? { background: 'var(--primary)' } : undefined} onClick={() => setTab(t)}>
            {t} ({t === 'All' ? items.length : items.filter((it) => has(it, t)).length})
          </button>
        ))}
      </div>
      <p className="small" aria-live="polite">{shown.length} integration examples</p>
      <div className="grid-3">
        {shown.map((it, i) => (
          <article className="step" key={i} style={{ minHeight: 0 }}>
            <p className="label">{it.code}</p>
            <TechLogos logos={it.logos?.length ? it.logos : it.logo ? [{ image: it.logo, alt: '' }] : []} />
            <h3 className="h3">{it.title}</h3>
            {it.platforms && <p className="action" style={{ margin: 0, color: 'var(--text)' }}>{it.platforms}</p>}
            {it.outcome && <p className="body">{it.outcome}</p>}
            {it.fit && <p className="small">{it.fit}</p>}
            {it.measure && <p className="label" style={{ textTransform: 'none' }}>{it.measure}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

function TechLogos({ logos }) {
  const shown = logos.filter((l) => l.image);
  if (!shown.length) return null;
  return (
    <div className="tech-logos">
      {shown.map((l, i) => (
        <span key={i} className="tech-logos-item">
          {i > 0 && <span aria-hidden="true">+</span>}
          <img src={l.image} alt={l.alt || ''} width="96" height="60" loading="lazy" />
        </span>
      ))}
    </div>
  );
}
