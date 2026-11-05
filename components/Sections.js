import { Lines, Btn } from './Text';
import Carousel from './Carousel';
import CmsForm from './CmsForm';
import NewsList from './NewsList';
import Integrations from './Integrations';
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
    {it.note && <p className="label card-note">{it.note}</p>}
    {it.link?.label && <a className="card-link action" href={it.link.href || '#'}>{it.link.label} →</a>}
  </div>
);
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
    <div className="split-wrap">
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
  cards: (d) => (
    <section className="section"><Head d={d} />
      <div className={d.columns ? cols(d.columns) : 'grid-2'}>{(d.items || []).map((it, i) => <Card key={i} it={it} />)}</div>
      {d.note && <p className="small">{d.note}</p>}
      {d.cta?.label && <div><Btn link={d.cta} variant="outline" /></div>}
    </section>
  ),
  text: (d) => (
    <section className="section"><Head d={d} />
      {d.body && <p className="lead" style={{ maxWidth: 1184 }}><Lines text={d.body} /></p>}
      {d.cta?.label && <div><Btn link={d.cta} /></div>}
    </section>
  ),
  logos: (d) => {
    const items = d.items || [];
    if (!items.length && !d.title) return null;
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
  gallery: (d) => (
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
    const inner = (
      <>
        <Head d={d} />
        <div className={grid((d.steps || []).length)}>{(d.steps || []).map((it, i) => <Card key={i} it={it} cls="step" />)}</div>
        {d.boundary && <p className="label" style={{ textTransform: 'none' }}>{d.boundary}</p>}
        {d.note && <p className="body"><Lines text={d.note} /></p>}
        {d.cta?.label && <div><Btn link={d.cta} /></div>}
      </>
    );
    return (
      <section className="section" style={d.image ? { backgroundImage: `linear-gradient(rgba(12,13,26,.75), rgba(12,13,26,.85)), url(${d.image})`, backgroundSize: 'cover', backgroundPosition: 'center', maxWidth: 'none' } : undefined}>
        {d.panel === false ? inner : <div className="journey">{inner}</div>}
      </section>
    );
  },
  steps: (d) => (
    <section className="section"><Head d={d} />
      <div className={grid((d.items || []).length)}>{(d.items || []).map((it, i) => <Card key={i} it={it} cls={d.style === 'card' ? 'step' : 'plain-step'} />)}</div>
      {d.note && <p className="small"><Lines text={d.note} /></p>}
    </section>
  ),
  panels: (d) => (
    <section className="section">
      <div className="grid-2">
        {(d.items || []).map((p, i) => (
          <div className="panel" key={i}>
            {p.eyebrow && <p className="label">{p.eyebrow}</p>}
            {p.title && <h2 className="h2"><Lines text={p.title} /></h2>}
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
      <div className="grid-2">
        {(d.items || []).map((it, i) => (
          <div key={i} className={`engage${it.highlight ? ' highlight' : ''}`}>
            {it.kicker && <p className="label">{it.kicker}</p>}
            {it.title && <h3 className="h3"><Lines text={it.title} /></h3>}
            {it.value && <p className="h2">{it.value}</p>}
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
      <div className="cta-panel">
        {d.eyebrow && <p className="label">{d.eyebrow}</p>}
        <h2 className="h2"><Lines text={d.title} /></h2>
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
      <section className="section tight"><Head d={d} />
        {d.subtitle && <h3 className="h3">{d.subtitle}</h3>}
        <Carousel posts={posts} />
      </section>
    );
  },
  table: (d) => {
    const cols = d.columns ? d.columns.split('\n') : [];
    const rows = (d.rows || '').split('\n').filter(Boolean).map((r) => r.split('|').map((c) => c.trim()));
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
          <div className="form-card center" style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
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
            {(d.items || []).map((it, i) => <div className="card" key={i} style={{ minHeight: 0, gap: 12 }}><h3 className="action">{it.title}</h3><p className="body">{it.body}</p></div>)}
            {d.showContact && (
              <address className="contact-block">
                <p className="label">Prefer to speak directly?</p>
                {c.phone && <a className="h3" href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>}
                {c.email && <a className="body" href={`mailto:${c.email}`}>{c.email}</a>}
                {c.address && <p className="body"><Lines text={c.address} /></p>}
              </address>
            )}
            {d.support && <p className="small">{d.support}</p>}
          </div>
          <div className="form-card">
            {d.formTitle && <h2 className="h3" style={{ marginBottom: 24 }}>{d.formTitle}</h2>}
            <CmsForm form={d.form || 'contact'} submitLabel={d.submitLabel} privacy={d.privacy} success={d.success} />
          </div>
        </div>
      </section>
    );
  },
  newsList: async (d) => (
    <section className="section"><Head d={d} /><NewsList posts={await getPosts()} /></section>
  ),
};

export default function Sections({ sections = [] }) {
  return sections.map((s, i) => {
    const render = R[s.type];
    return render ? <div key={i} id={s.data?.anchor || undefined}>{render(s.data || {}, { first: i === 0 })}</div> : null;
  });
}
