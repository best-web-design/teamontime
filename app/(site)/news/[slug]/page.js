import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sections from '@/components/Sections';
import NewsCard from '@/components/NewsCard';
import { getPost, getPosts, getSettings, tagSlug } from '@/lib/api';
import { buildMetadata, buildJsonLd, JsonLd } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, s] = await Promise.all([getPost(slug), getSettings()]);
  return post ? buildMetadata(post, s, `/news/${slug}`) : {};
}

const fmt = (d) => d && new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
const strip = (h = '') => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const readMins = (html = '') => Math.max(1, Math.round(strip(html).split(' ').filter(Boolean).length / 220));
const slugify = (t) => strip(t).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// Splits the editor HTML for the Figma editorial layout (P15/P16):
// - every <h2> gets an id (for the "On this page" contents);
// - an <h2 id="sources"> section is moved out and shown after the FAQs as source cards.
function prepare(html = '') {
  let sources = '';
  const m = html.match(/<h2[^>]*id="sources"[^>]*>[\s\S]*?<\/h2>([\s\S]*?)(?=<h2|$)/i);
  if (m) { sources = m[1]; html = html.replace(m[0], ''); }
  const toc = [];
  html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (all, attrs, inner) => {
    let id = (attrs.match(/id="([^"]+)"/) || [])[1];
    const label = (attrs.match(/data-toc="([^"]+)"/) || [])[1] || strip(inner);
    if (!id) { id = slugify(inner); attrs += ` id="${id}"`; }
    toc.push({ id, label });
    return `<h2${attrs}>${inner}</h2>`;
  });
  const items = sources.split(/<br\s*\/?>|<\/p>/i).map(strip).filter(Boolean).map((line) => {
    const i = line.search(/\.\s/);
    return i > 0 ? { title: line.slice(0, i), note: line.slice(i + 1).trim() } : { title: line, note: '' };
  });
  return { html, toc, sources: items };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, s, all] = await Promise.all([getPost(slug), getSettings(), getPosts()]);
  if (!post) notFound();
  const tags = post.tags || [];
  const related = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: (p.tags || []).filter((t) => tags.includes(t)).length * 2 + (p.category === post.category ? 1 : 0) + (p.kind !== post.kind ? 0.5 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);
  const { html, toc: autoToc, sources } = prepare(post.content);
  const sections = post.sections || [];
  const hasFaq = sections.some((x) => x.type === 'faq');
  const hasAuthor = post.author || post.authorBio;
  const ctaIndex = sections.findIndex((x) => x.type === 'cta');
  const before = ctaIndex < 0 ? sections : sections.slice(0, ctaIndex);
  const after = ctaIndex < 0 ? [] : sections.slice(ctaIndex).map((x) => (x.type === 'cta' ? { ...x, data: { style: 'editorial', ...x.data } } : x));

  const toc = post.toc
    ? post.toc.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => { const [label, href] = l.split('|').map((x) => x.trim()); return { label, href: href || '#' }; })
    : [
      ...(post.summary ? [{ label: post.summaryLabel ? cap(post.summaryLabel) : 'Summary', href: '#summary' }] : []),
      ...autoToc.map((t) => ({ label: t.label, href: `#${t.id}` })),
      ...(hasFaq ? [{ label: 'FAQs', href: '#faqs' }] : []),
      ...(sources.length || hasAuthor ? [{ label: 'Sources & author', href: '#sources' }] : []),
    ];

  const byline = [post.author ? `By ${post.author}` : null, post.authorRole || null].filter(Boolean).join('  ·  ');
  const dates = [fmt(post.publishedAt) && `Published ${fmt(post.publishedAt)}`,
    post.updatedAt && fmt(post.updatedAt) !== fmt(post.publishedAt) && `Updated ${fmt(post.updatedAt)}`,
    html && `${readMins(html)} min read`].filter(Boolean).join('  ·  ');
  const meta = [byline, dates].filter(Boolean).join('  |  ');
  const crumbCat = post.kind === 'case-study' ? 'Case Studies' : post.category;
  const showCover = !post.figure?.length && (post.cover || post.coverPlaceholder);

  return (
    <article>
      <JsonLd data={buildJsonLd(post, s, `/news/${slug}`, { isPost: true })} />
      <section className={`hero left article-hero${post.kind === 'case-study' ? ' glow-green' : ''}`}>
        <div className="hero-glow" aria-hidden />
        <div className="section">
          <nav aria-label="Breadcrumb" className="small crumbs"><Link href="/news">News</Link>{crumbCat && <>  /  <Link href="/news">{crumbCat}</Link></>}</nav>
          {(post.eyebrow || post.status) && <p className="label">{post.eyebrow || post.status}</p>}
          <h1 className="display article-title">{post.title}</h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          {meta && <p className="small">{meta}</p>}
        </div>
      </section>

      <div className="theme-light reading">
        {post.figure?.length > 0 && (
          <section className="section ed-figure-wrap">
            <figure className="ed-figure">
              {post.figureLabel && <p className="label">{post.figureLabel}</p>}
              <div className="ed-figure-grid">
                {post.figure.map((f, i) => (
                  <div className="ed-figure-card" key={i}>
                    <p className="ed-figure-num">{f.kicker || String(i + 1).padStart(2, '0')}</p>
                    {f.title && <p className="h3">{f.title}</p>}
                    {f.body && <p className="small">{f.body}</p>}
                  </div>
                ))}
              </div>
            </figure>
            {post.figureCaption && <p className="small">{post.figureCaption}</p>}
          </section>
        )}
        {showCover && (
          <section className="section ed-figure-wrap">
            <div className="ed-media">
              {post.cover && !post.coverPlaceholder
                ? <img src={post.cover} alt={post.coverAlt || ''} width="1280" height="420" fetchPriority="high" />
                : <div className="ed-media-ph"><div className="ed-media-tag"><p className="h3">{post.coverPlaceholder || '[Client project image]'}</p>{post.coverPlaceholderNote && <p className="small">{post.coverPlaceholderNote}</p>}</div></div>}
            </div>
            {post.coverCaption && <p className="small">{post.coverCaption}</p>}
          </section>
        )}

        {(post.summary || post.facts?.length > 0) && (
          <section className="section ed-summary-row">
            {post.summary && (
              <div className="ed-card ed-summary" id="summary">
                {post.summaryLabel && <p className="label">{post.summaryLabel}</p>}
                <p className="lead">{post.summary}</p>
              </div>
            )}
            {post.facts?.length > 0 && (
              <dl className="ed-card ed-facts">
                {post.facts.map((f, i) => <div key={i}><dt className="label">{f.label}</dt><dd className="small">{f.value}</dd></div>)}
              </dl>
            )}
          </section>
        )}

        {html && (
          <section className="section ed-read">
            {toc.length > 1 && (
              <nav className="ed-card ed-toc" aria-label="On this page">
                <p className="label">On this page</p>
                <ol>{toc.map((t, i) => <li key={i}><a href={t.href}><span>{String(i + 1).padStart(2, '0')}</span>{t.label}</a></li>)}</ol>
              </nav>
            )}
            {/* content is written by authenticated admins in the editor */}
            <div className="prose ed-prose" dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        )}

        <div id="faqs"><Sections sections={before} /></div>

        {(sources.length > 0 || hasAuthor) && (
          <section className="section ed-sources" id="sources">
            {sources.length > 0 && (
              <>
                <h2 className="h3">Sources &amp; further reading</h2>
                {sources.map((x, i) => <div key={i} className="ed-source"><p className="action">{x.title}</p>{x.note && <p className="small">{x.note}</p>}</div>)}
              </>
            )}
            {hasAuthor && (
              <div className="ed-card ed-author">
                <p className="label">About the author</p>
                <p className="h3">{post.author || '[Author name]'}</p>
                {post.authorRole && <p className="action">{post.authorRole}</p>}
                {post.authorBio && <p className="body">{post.authorBio}</p>}
              </div>
            )}
          </section>
        )}

        <div id="next-step"><Sections sections={after} /></div>

        {related.length > 0 && (
          <section className="section">
            <h2 className="h2">{post.relatedTitle || 'Keep exploring'}</h2>
            <div className="grid-3">{related.map((p) => <NewsCard key={p.slug} p={p} />)}</div>
          </section>
        )}
        {tags.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <ul className="tags" aria-label="Tags">
              {tags.map((t) => <li key={t}><Link href={`/news/tag/${tagSlug(t)}`}>#{t}</Link></li>)}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

function cap(s) { return s.charAt(0) + s.slice(1).toLowerCase(); }
