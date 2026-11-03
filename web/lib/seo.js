import { siteUrl } from './api';

const strip = (s = '') => String(s).replace(/\*\*/g, '').replace(/\s*\n\s*/g, ' ').trim();
const firstHero = (sections = []) => sections.find((s) => s.type === 'hero')?.data || {};

export function buildMetadata(doc, settings, path) {
  const seo = doc.seo || {};
  const hero = firstHero(doc.sections);
  const title = seo.metaTitle || doc.title;
  const description = seo.metaDescription || doc.excerpt || strip(hero.lead).slice(0, 160) || settings.seo?.defaultDescription;
  const image = seo.ogImage || doc.cover || settings.seo?.ogImage;
  const canonical = seo.canonical || `${siteUrl(settings)}${path}`;
  return {
    // metaTitle is used as-is (absolute); otherwise the site title template is applied.
    title: seo.metaTitle ? { absolute: seo.metaTitle } : doc.title,
    description,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: canonical, images: image ? [image] : undefined, type: doc.kind ? 'article' : 'website' },
    twitter: { title, description, images: image ? [image] : undefined },
  };
}

export function buildJsonLd(doc, settings, path, { isPost } = {}) {
  if (doc.seo?.schema) {
    try { return [JSON.parse(doc.seo.schema)]; } catch { /* invalid override: fall back to generated schema */ }
  }
  const base = siteUrl(settings);
  const url = `${base}${path}`;
  const org = { '@id': `${base}/#organization` };
  const out = [];

  if (path === '/') {
    let custom = null;
    try { custom = settings.organizationSchema ? JSON.parse(settings.organizationSchema) : null; } catch { /* ignore */ }
    out.push(custom || {
      '@context': 'https://schema.org', '@type': 'Organization', '@id': org['@id'], name: settings.siteName, url: base,
      logo: settings.logoFooter || settings.logo ? new URL(settings.logoFooter || settings.logo, base).href : undefined,
      email: settings.contact?.email, telephone: settings.contact?.phone,
      sameAs: (settings.socials || []).map((s) => s.href).filter(Boolean),
    });
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: settings.siteName, url: base, publisher: org });
  }

  const hero = firstHero(doc.sections);
  if (isPost) {
    out.push({
      '@context': 'https://schema.org', '@type': doc.kind === 'case-study' ? 'Article' : 'BlogPosting',
      headline: doc.title, description: doc.excerpt, image: doc.cover, url,
      datePublished: doc.publishedAt, dateModified: doc.updatedAt,
      author: doc.author ? { '@type': 'Person', name: doc.author } : org, publisher: org,
    });
  } else if (doc.template === 'service') {
    out.push({ '@context': 'https://schema.org', '@type': 'Service', name: doc.title, description: strip(hero.lead), url, provider: org, areaServed: settings.areaServed || 'ZA' });
  } else if (path !== '/') {
    out.push({ '@context': 'https://schema.org', '@type': 'WebPage', name: doc.title, url, description: doc.seo?.metaDescription || strip(hero.lead) });
  }

  const faqs = (doc.sections || []).filter((s) => s.type === 'faq').flatMap((s) => s.data?.items || []).filter((f) => f.q && f.a);
  if (faqs.length) {
    out.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })),
    });
  }

  if (path !== '/') {
    const parts = path.split('/').filter(Boolean);
    out.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '' }, ...parts.map((p, i) => ({
        name: i === parts.length - 1 ? doc.title : p.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
        path: `/${parts.slice(0, i + 1).join('/')}`,
      }))].map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `${base}${b.path || '/'}` })),
    });
  }
  return out;
}

// JSON-LD must not break out of its <script> tag.
export function JsonLd({ data }) {
  return data.map((d, i) => (
    <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }} />
  ));
}
