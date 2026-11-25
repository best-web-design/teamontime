import { Lines, Btn } from './Text';
import Carousel from './Carousel';
import CmsForm from './CmsForm';
import NewsList from './NewsList';
import Integrations from './Integrations';
import Parallax from './Parallax';
import { getPosts, getSettings } from '@/lib/api';

const Head = ({ d }) => (
  <>
    {d.eyebrow && <p className="label">{d.eyebrow}</p>}
    {d.title && <h2 className="h2"><Lines text={d.title} /></h2>}
    {d.intro && <p className="lead"><Lines text={d.intro} /></p>}
  </>
);
const Card = ({ it, cls = 'card' }) => (
  <div className={cls}>
    {it.image && <img className="card-img" src={it.image} alt="" loading="lazy" />}
    {it.kicker && <p className="label">{it.kicker}</p>}
    {it.title && <h3 className="h3"><Lines text={it.title} /></h3>}
    {it.body && <p className="body"><Lines text={it.body} /></p>}
    {it.note && <p className={cls === 'plain-step' ? 'action card-note' : 'label card-note'}>{it.note}</p>}
    {it.link?.label && <a className="card-link action" href={it.link.href || '#'}>{it.link.label} →</a>}
  </div>
);
// Two-column heading block (Figma: proposition left, context right)
const SplitHead = ({ d }) => (
  <div className="split-head">
    <div className="split-head-l">
      {d.eyebrow && <p className="label">{d.eyebrow}</p>}
      {d.title && <h2 className="h2"><Lines text={d.title} /></h2>}
    </div>
    <div className="split-head-r">
      {d.highlight && <p className={d.style === 'outcomes' ? 'hl-text' : 'lead lead-text'}><Lines text={d.highlight} /></p>}
      {d.subhead && <p className="h3"><Lines text={d.subhead} /></p>}
      {d.intro && <p className="body"><Lines text={d.intro} /></p>}
    </div>
  </div>
);
const HEX = <svg viewBox="0 0 226 251" aria-hidden><polygon points="113,8 217,52 206,186 113,243 21,182 9,51" fill="none" stroke="currentColor" strokeWidth="16" strokeLinejoin="miter" /></svg>;
const Outcome = ({ it }) => (
  <div className="outcome">
    <div className="outcome-art" aria-hidden>
      <span className="outcome-glow" />
      {it.shape && it.shape !== 'none' && <span className={`outcome-shape shape-${it.shape}`}>{it.shape === 'hex' ? HEX : null}</span>}
      {it.image && <img className="outcome-cube" src={it.image} alt="" loading="lazy" />}
    </div>
    {it.title && <h3 className="h3"><Lines text={it.title} /></h3>}
    {it.body && <p className="body"><Lines text={it.body} /></p>}
  </div>
);
// "First sentence.\nRest" → heading line + supporting line, centred under a card grid
const CardsNote = ({ text }) => {
  const [a, ...b] = String(text).includes('\n') ? String(text).split('\n') : String(text).split(/(?<=\.)\s+/);
  return <p className="cards-note"><span className="h3">{a}</span>{b.length > 0 && <span className="lead">{b.join(' ')}</span>}</p>;
};
// AI hub diagram (Figma P05 "Technologies Carousel"): sources left, hub in the middle, destinations right.
function Hub({ d }) {
  const items = d.items || [];
  const nl = Math.max(0, Math.min(items.length, Number(d.leftCount) || 4));
  const left = items.slice(0, nl), right = items.slice(nl);
  const STEP = 129, CH = 105, W = 1110;
  const H = Math.max(left.length, right.length, 3) * STEP - 24 + 20;
  const mid = H / 2;
  const ly = (i) => mid - ((left.length - 1) / 2) * STEP + i * STEP;
  const ry = (i) => mid - ((right.length - 1) / 2) * STEP + i * STEP;
  const r = 12;
  const lx1 = 378, lx2 = 417, rx = 674, rx2 = 713;
  let lp = '', rp = '';
  if (left.length) {
    const a = ly(0), b = ly(left.length - 1);
    left.forEach((_, i) => { const y = ly(i); lp += `M${lx1} ${y}H${lx2 - (i === 0 || i === left.length - 1 ? r : 0)}`; if (i === 0 && left.length > 1) lp += `Q${lx2} ${y} ${lx2} ${y + r}`; if (i === left.length - 1 && left.length > 1) lp += `Q${lx2} ${y} ${lx2} ${y - r}`; });
    lp += `M${lx2} ${a + r}V${b - r}M${lx2} ${mid}H${431 + 6}`;
  }
  if (right.length) {
    const a = ry(0), b = ry(right.length - 1);
    right.forEach((_, i) => { const y = ry(i); if (i === 0) rp += `M${rx2} ${y}H${rx + r}Q${rx} ${y} ${rx} ${y + r}`; else if (i === right.length - 1) rp += `M${rx2} ${y}H${rx + r}Q${rx} ${y} ${rx} ${y - r}`; else rp += `M${rx} ${y}H${rx2}`; });
    rp += `M${rx} ${a + r}V${b - r}M${431 + 235} ${mid}H${rx}`;
  }
  const pos = (x, y, w, h) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%` });
  return (
    <section className="section"><Head d={d} />
      <div className="hub" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg className="hub-lines" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
          <path d={lp} stroke="#5856ff" strokeWidth="2" fill="none" />
          <path d={rp} stroke="#4ee8a8" strokeWidth="2" fill="none" />
        </svg>
        {left.map((it, i) => <div key={`l${i}`} className="hub-card hub-src" style={pos(0, ly(i) - CH / 2, 365, CH)}>{it.image && <img src={it.image} alt="" />}<span>{it.label}</span></div>)}
        {right.map((it, i) => <div key={`r${i}`} className="hub-card hub-dst" style={pos(735, ry(i) - CH / 2, 365, CH)}>{it.image && <img src={it.image} alt="" />}<span>{it.label}</span></div>)}
        {d.centerLabel && <p className="hub-label" style={pos(431, mid - 120 - 34 - 6, 241, 34)}>{d.centerLabel}</p>}
        {d.centerImage && <img className="hub-cube" src={d.centerImage} alt="" style={pos(431, mid - 120, 241, 241)} />}
      </div>
    </section>
  );
}
const grid = (n) => (n >= 4 && n % 4 === 0 ? 'grid-4' : n % 3 === 0 ? 'grid-3' : n === 1 ? '' : 'grid-2');
const cols = (c, n) => ({ 2: 'grid-2', 3: 'grid-3', 4: 'grid-4' }[c] || grid(n));

const R = {
  hero: (d, { first }) => {
    const H = first ? 'h1' : 'h2';
    return (
      <section className={`hero ${d.align === 'left' ? 'left' : ''}`}>
        <div className="hero-glow" aria-hidden />
        <div className={`section ${d.align === 'left' ? '' : 'center'}`}>
          {d.breadcrumb && <p className="label">{d.breadcrumb}</p>}
          <H className="display"><Lines text={d.title} /></H>
          {d.lead && <p className="lead"><Lines text={d.lead} /></p>}
          {d.audience && <p className="audience"><Lines text={d.audience} /></p>}
          {(d.primary?.label || d.secondary?.label) && (
            <div className="btn-row"><Btn link={d.primary} /><Btn link={d.secondary} variant="outline" /></div>
          )}
          {d.note && <p className="small">{d.note}</p>}
        </div>
      </section>
    );
  },
  split: (d) => (
    <div className={d.image ? 'split-wrap' : 'split-plain'}>
      <section className="section">
        <div className="split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {d.eyebrow && <p className="label">{d.eyebrow}</p>}
            <h2 className="h2"><Lines text={d.title} /></h2>
          </div>
          <p className="lead"><Lines text={d.body} /></p>
        </div>
        {d.image && <img className="split-img" src={d.image} alt={d.imageAlt || ''} loading="lazy" />}
      </section>
    </div>
  ),
  cards: (d) => {
    if (d.style === 'outcomes') {
      return (
        <div className="band-ink">
          <section className="section outcomes-section"><SplitHead d={d} />
            <div className="grid-3 outcomes">{(d.items || []).map((it, i) => <Outcome key={i} it={it} />)}</div>
          </section>
        </div>
      );
    }
    if (d.style === 'fit') {
      return (
        <section className="section"><SplitHead d={d} />
          <div className={d.columns ? cols(d.columns) : 'grid-3'}>{(d.items || []).map((it, i) => <Card key={i} it={it} cls="mini-card" />)}</div>
        </section>
      );
    }
    const filled = d.style === 'filled', compact = d.style === 'compact';
    return (
      <section className="section"><Head d={d} />
        <div className={`${d.columns ? cols(d.columns) : 'grid-2'}${filled ? ' cards-filled' : ''}${compact ? ' cards-compact' : ''}`}>{(d.items || []).map((it, i) => <Card key={i} it={it} cls={filled ? 'card filled' : 'card'} />)}</div>
        {d.note && (filled ? <CardsNote text={d.note} /> : <p className="small">{d.note}</p>)}
        {d.cta?.label && <div><Btn link={d.cta} variant="outline" /></div>}
      </section>
    );
  },
  text: (d) => (
    <section className="section"><Head d={d} />
      {d.body && <p className="lead" style={{ maxWidth: 1184 }}><Lines text={d.body} /></p>}
      {d.cta?.label && <div><Btn link={d.cta} /></div>}
    </section>
  ),
  logos: (d) => {
    const items = d.items || [];
    if (!items.length && !d.title) return null;
    if (d.style === 'hub') return <Hub d={d} />;
    if (d.style === 'tiles') {
      const row = items.filter((it) => it.image).map((it, i) => <figure className="tile" key={i}><img src={it.image} alt={it.label || ''} loading="lazy" /></figure>);
      return (
        <div className="tiles-section">
          <section className="section"><Head d={d} /></section>
          {row.length > 0 && <div className="marquee tiles" aria-label={d.title || 'Technologies'}><div className="marquee-track">{row}{row.map((r, i) => <div key={`d${i}`} aria-hidden>{r}</div>)}</div></div>}
        </div>
      );
    }
    const row = items.map((it, i) => (
      <figure className="logo-item" key={i}>{it.image ? <img src={it.image} alt={it.label || ''} loading="lazy" /> : null}{it.label && d.style !== 'marquee' && <figcaption className="action">{it.label}</figcaption>}</figure>
    ));
    return (
      <section className="section tight"><Head d={d} />
        {d.style === 'marquee'
          ? <div className="marquee" aria-label={d.title || 'Clients'}><div className="marquee-track">{row}{row.map((r, i) => <div key={`d${i}`} aria-hidden>{r}</div>)}</div></div>
          : <div className="logo-grid">{row}</div>}
      </section>
    );
  },
  gallery: (d) => d.style === 'portfolio' ? (() => {
    const row = (d.items || []).filter((it) => it.image).map((it, i) => (
      <figure className="folio" key={i}><img src={it.image} alt={it.alt || ''} loading="lazy" />{it.caption && <figcaption className="sr-only">{it.caption}</figcaption>}</figure>
    ));
    return (
      <div className="tiles-section">
        <section className="section"><Head d={d} /></section>
        {row.length > 0 && <div className="marquee folio-strip" aria-label={d.title || 'Portfolio'}><div className="marquee-track">{row}{row.map((r, i) => <div key={`d${i}`} aria-hidden>{r}</div>)}</div></div>}
      </div>
    );
  })() : (
    <section className="section tight"><Head d={d} />
      <div className="carousel-track gallery" tabIndex={0} aria-label={d.title || 'Gallery'}>
        {(d.items || []).filter((it) => it.image).map((it, i) => (
          <figure key={i} style={{ margin: 0 }}><img src={it.image} alt={it.alt || ''} loading="lazy" />{it.caption && <figcaption className="small">{it.caption}</figcaption>}</figure>
        ))}
      </div>
    </section>
  ),
  integrations: (d) => (
    <section className="section"><Head d={d} />
      <Integrations items={d.items || []} help={d.filterHelp} />
      {d.note && <p className="small">{d.note}</p>}
    </section>
  ),
  journey: (d) => {
    const glass = d.style === 'glass';
    const inner = (
      <>
        {d.art && <><span className="journey-bar" aria-hidden /><img className="journey-art" src={d.art} alt="" loading="lazy" /></>}
        <Head d={d} />
        <div className={grid((d.steps || []).length)}>{(d.steps || []).map((it, i) => <Card key={i} it={it} cls={glass ? 'step step-auto' : 'step'} />)}</div>
        {d.boundary && <p className="label" style={{ textTransform: 'none' }}>{d.boundary}</p>}
        {d.note && <p className="body journey-note"><Lines text={d.note} /></p>}
        {d.cta?.label && <div><Btn link={d.cta} /></div>}
      </>
    );
    const panel = d.panel === false && !glass ? inner : <div className={`journey${glass ? ' glass' : ''}${d.style === 'soft' ? ' soft' : ''}`}>{inner}</div>;
    if (glass) {
      return (
        <div className="band-photo" style={d.image ? { backgroundImage: `linear-gradient(rgba(19,23,45,.7), rgba(19,23,45,.7)), url(${d.image})` } : undefined}>
          <section className="section">{panel}</section>
        </div>
      );
    }
    return (
      <section className="section" style={d.image ? { backgroundImage: `linear-gradient(rgba(12,13,26,.75), rgba(12,13,26,.85)), url(${d.image})`, backgroundSize: 'cover', backgroundPosition: 'center', maxWidth: 'none' } : undefined}>
        {panel}
      </section>
    );
  },
  steps: (d) => {
    const band = d.style === 'band' || d.style === 'band-cards';
    const cls = d.style === 'card' ? 'step' : d.style === 'band-cards' ? 'step glass-card' : 'plain-step';
    const body = (
      <section className="section"><Head d={d} />
        <div className={grid((d.items || []).length)}>{(d.items || []).map((it, i) => <Card key={i} it={it} cls={cls} />)}</div>
        {band && (d.noteLabel || d.noteTitle || d.note) ? (
          <div className="glass-note">
            {d.noteLabel && <p className="label">{d.noteLabel}</p>}
            {d.noteTitle && <p className="h3 h3-sm">{d.noteTitle}</p>}
            {d.note && <p className="body body-text"><Lines text={d.note} /></p>}
          </div>
        ) : d.note && <p className="small"><Lines text={d.note} /></p>}
        {d.footnote && <p className="small"><Lines text={d.footnote} /></p>}
      </section>
    );
    if (!band) return body;
    return <div className="band-photo band-dark" style={d.image ? { backgroundImage: `linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.62)), url(${d.image})` } : undefined}>{body}</div>;
  },
  panels: (d) => d.style === 'attached' ? (
    <section className="section attached">
      {(d.items || []).map((p, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div className="panel panel-measure">
            {p.eyebrow && <p className="label">{p.eyebrow}</p>}
            {p.title && <h2 className="h3"><Lines text={p.title} /></h2>}
            {p.body && <p className="body body-text"><Lines text={p.body} /></p>}
            {p.bullets && <ul className="bullets">{p.bullets.split('\n').filter(Boolean).map((b) => <li key={b}>{b}</li>)}</ul>}
            {p.detail && <p className="small"><Lines text={p.detail} /></p>}
          </div>
          {p.note && <p className="action accent-line"><Lines text={p.note} /></p>}
        </div>
      ))}
    </section>
  ) : d.style === 'nested' ? (
    <section className="section">
      <div className="panel nested">
        <Head d={d} />
        <div className="grid-2 nested-grid">
          {(d.items || []).map((p, i) => (
            <div className="nested-card" key={i}>
              {p.eyebrow && <p className="label">{p.eyebrow}</p>}
              {p.title && <h3 className="h3"><Lines text={p.title} /></h3>}
              {p.body && <p className="body"><Lines text={p.body} /></p>}
              {p.bullets && <ul className="bullets muted">{p.bullets.split('\n').filter(Boolean).map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          ))}
        </div>
        {(d.footLabel || d.footBody) && <div className="nested-foot">{d.footLabel && <p className="label">{d.footLabel}</p>}{d.footBody && <p className="body body-text"><Lines text={d.footBody} /></p>}</div>}
        {d.footNote && <p className="small"><Lines text={d.footNote} /></p>}
      </div>
    </section>
  ) : (
    <section className="section">{(d.eyebrow || d.title) && <Head d={d} />}
      <div className="grid-2">
        {(d.items || []).map((p, i) => (
          <div className={`panel${d.list === 'muted' ? ' list-muted' : ''}`} key={i}>
            {p.eyebrow && <p className="label">{p.eyebrow}</p>}
            {p.title && <h2 className={p.size === 'h3' ? 'h3' : 'h2'}><Lines text={p.title} /></h2>}
            {p.body && <p className="body"><Lines text={p.body} /></p>}
            {p.bullets && <ul className="bullets">{p.bullets.split('\n').filter(Boolean).map((b) => <li key={b}>{b}</li>)}</ul>}
            {p.detail && <p className="body detail"><Lines text={p.detail} /></p>}
            {p.note && <p className="small">{p.note}</p>}
          </div>
        ))}
      </div>
    </section>
  ),
  engagement: (d) => (
    <section className="section"><Head d={d} />
      <div className={`grid-2${d.style === 'flat' ? ' engage-flat' : d.style === 'solid' ? ' engage-solid' : ''}`}>
        {(d.items || []).map((it, i) => (
          <div key={i} className={`engage${it.highlight ? ' highlight' : ''}${it.title ? ' engage-lg' : ''}`}>
            {it.kicker && <p className="label">{it.kicker}</p>}
            {it.title && <h3 className="h3"><Lines text={it.title} /></h3>}
            {it.value && <p className={it.title ? 'h2' : 'h2 engage-value'}>{it.value}</p>}
            {it.body && <p className="body"><Lines text={it.body} /></p>}
            {it.bullets && <ul className="bullets">{it.bullets.split('\n').filter(Boolean).map((b) => <li key={b}>{b}</li>)}</ul>}
            <Btn link={it.cta} />
            {it.note && <p className="small">{it.note}</p>}
          </div>
        ))}
      </div>
    </section>
  ),
  faq: (d) => (
    <section className="section tight"><Head d={d} />
      <div className="faq-list">
        {(d.items || []).map((it, i) => (
          <details className="faq" key={i}>
            <summary>{it.q}</summary>
            <div className="faq-a body"><Lines text={it.a} /></div>
          </details>
        ))}
      </div>
    </section>
  ),
  cta: (d) => (
    <section className="section">
      <div className={`cta-panel${d.style === 'editorial' ? ' cta-editorial' : ''}${d.tone === 'light' ? ' cta-light' : ''}`}>
        {d.eyebrow && <p className="label">{d.eyebrow}</p>}
        <h2 className={d.size === 'display' ? 'display' : 'h2'}><Lines text={d.title} /></h2>
        {d.lead && <p className="lead"><Lines text={d.lead} /></p>}
        <div className="btn-row"><Btn link={d.primary} /><Btn link={d.secondary} variant="outline" /></div>
        {d.note && <p className="small">{d.note}</p>}
      </div>
    </section>
  ),
  caseStudies: async (d) => {
    const posts = (await getPosts(d.kind === 'all' ? '' : d.kind || 'case-study')).slice(0, 9);
    if (!posts.length) return null;
    return (
      <section className="section"><Head d={d} />
        <div className="case-block">
          {d.subtitle && <h3 className="h3">{d.subtitle}</h3>}
          <Carousel posts={posts} />
        </div>
      </section>
    );
  },
  table: (d) => {
    const cols = d.columns ? d.columns.split('\n') : [];
    const rows = (d.rows || '').split('\n').filter(Boolean).map((r) => r.split('|').map((c) => c.trim()));
    if (d.style === 'charter') {
      const n = Math.max(cols.length, ...rows.map((r) => r.length), 2);
      const gtc = { gridTemplateColumns: n === 2 ? '248px 1fr' : `192px repeat(${n - 1}, 1fr)` };
      return (
        <section className="section">
          <div className="panel charter"><Head d={d} />
            <div className="charter-rows">
              {cols.length > 0 && <div className="charter-row charter-head" style={gtc}>{cols.map((c) => <p key={c} className="label">{c}</p>)}</div>}
              {rows.map((r, i) => <div className="charter-row" style={gtc} key={i}>{r.map((c, j) => <p key={j} className={j === 0 ? 'label' : 'body'}>{c}</p>)}</div>)}
            </div>
            {d.note && <p className="small">{d.note}</p>}
          </div>
        </section>
      );
    }
    return (
      <section className="section"><Head d={d} />
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            {cols.length > 0 && <thead><tr>{cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>}
            <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        {d.note && <p className="small">{d.note}</p>}
      </section>
    );
  },
  // html is written by authenticated admins only.
  richText: (d) => <section className="section"><div className="prose" dangerouslySetInnerHTML={{ __html: d.html || '' }} /></section>,
  image: (d) => d.src ? (
    <section className="section"><figure style={{ margin: 0 }}>
      <img src={d.src} alt={d.alt || ''} loading="lazy" style={{ borderRadius: 'var(--r32)', width: '100%' }} />
      {d.caption && <figcaption className="small" style={{ marginTop: 16 }}>{d.caption}</figcaption>}
    </figure></section>
  ) : null,
  form: async (d) => {
    const s = d.showContact ? await getSettings() : {};
    const c = s.contact || {};
    if (d.form === 'newsletter') {
      return (
        <section className="section">
          <div className="form-card center form-dark" style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
            <h2 className="h2">{d.title}</h2>{d.intro && <p className="lead" style={{ maxWidth: 760 }}><Lines text={d.intro} /></p>}
            <div style={{ width: '100%', maxWidth: 760, textAlign: 'left' }}><CmsForm form="newsletter" submitLabel={d.submitLabel} privacy={d.privacy} success={d.success} /></div>
          </div>
        </section>
      );
    }
    return (
      <section className="section">
        <div className="form-split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Head d={d} />
            {(d.items || []).map((it, i) => <div className="side-card" key={i}><h3 className="side-card-t">{it.title}</h3><p className="body">{it.body}</p></div>)}
            {d.showContact && (
              <address className="contact-block">
                <p className="label">Prefer to speak directly?</p>
                {c.phone && <a className="contact-phone" href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>}
                {c.email && <a className="contact-email" href={`mailto:${c.email}`}>{c.email}</a>}
                {c.address && <p className="small contact-addr"><Lines text={c.address} /></p>}
              </address>
            )}
            {d.support && <p className="small">{d.support}</p>}
          </div>
          <div className="form-card">
            {d.formTitle && <h2 className="h3" style={{ marginBottom: 8 }}>{d.formTitle}</h2>}
            {d.formNote && <p className="small" style={{ marginBottom: 24 }}>{d.formNote}</p>}
            <CmsForm form={d.form || 'contact'} submitLabel={d.submitLabel} privacy={d.privacy} success={d.success} />
          </div>
        </div>
      </section>
    );
  },
  newsList: async (d) => (
    <section className="section"><Head d={d} /><NewsList posts={await getPosts()} allLabel={d.allLabel || 'All articles'} /></section>
  ),
};

export default function Sections({ sections = [] }) {
  return (
    <>
      <Parallax />
      {sections.map((s, i) => {
        const render = R[s.type];
        return render ? <div key={i} id={s.data?.anchor || undefined} className={s.data?.attach ? 'attach' : undefined}>{render(s.data || {}, { first: i === 0 })}</div> : null;
      })}
    </>
  );
}
