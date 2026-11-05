'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/admin';
import { Fields } from '../Fields';
import { useToast } from '../AdminShell';

const link = [{ name: 'label', type: 'text' }, { name: 'href', type: 'text' }];
const GROUPS = {
  General: [
    { name: 'siteName', type: 'text' },
    { name: 'siteUrl', type: 'text', help: 'Live domain, e.g. https://bestwebdesign.co.za (used for canonical, sitemap, schema)' },
    { name: 'logo', type: 'image', label: 'Header logo mark' },
    { name: 'logoFooter', type: 'image', label: 'Footer logo' },
    { name: 'favicon', type: 'image' },
    { name: 'notifyEmail', type: 'text', label: 'Send form submissions to', help: 'Needs SMTP settings in the server .env' },
    { name: 'contact', type: 'group', fields: [{ name: 'phone', type: 'text' }, { name: 'email', type: 'text' }, { name: 'address', type: 'textarea' }] },
    { name: 'whatsapp', type: 'group', label: 'WhatsApp button', fields: [{ name: 'number', type: 'text', help: 'International format, e.g. +27 82 000 0000. Empty hides the button.' }, { name: 'label', type: 'text' }] },
    { name: 'socials', type: 'list', label: 'Social profiles (used in schema sameAs)', fields: link },
  ],
  SEO: [
    { name: 'seo', type: 'group', fields: [
      { name: 'titleTemplate', type: 'text', help: 'Use %s for the page title, e.g. "%s | Best Web Design"' },
      { name: 'defaultTitle', type: 'text', help: 'Used when a page has no title' },
      { name: 'defaultDescription', type: 'textarea' },
      { name: 'ogImage', type: 'image', label: 'Default social share image' },
      { name: 'lang', type: 'text', help: 'HTML language, e.g. en-ZA' },
      { name: 'locale', type: 'text', help: 'Open Graph locale, e.g. en_ZA' },
      { name: 'twitter', type: 'text', label: 'X / Twitter handle' },
      { name: 'googleVerification', type: 'text', label: 'Google Search Console verification code' },
      { name: 'bingVerification', type: 'text', label: 'Bing Webmaster verification code' },
      { name: 'gaId', type: 'text', label: 'Google Analytics 4 ID (G-XXXX)' },
      { name: 'gtmId', type: 'text', label: 'Google Tag Manager ID (GTM-XXXX)' },
    ] },
    { name: 'areaServed', type: 'text', help: 'For Service schema, e.g. ZA' },
    { name: 'organizationSchema', type: 'textarea', rows: 10, label: 'Organization / LocalBusiness JSON-LD (home page)', help: 'Optional. Empty = generated from the fields above. Must be valid JSON.' },
  ],
  'robots.txt & llms.txt': [
    { name: 'robotsTxt', type: 'textarea', rows: 10, label: 'robots.txt', help: 'Empty = allow all, block /admin, link sitemap. {{siteUrl}} is replaced with the Site URL.' },
    { name: 'llmsTxt', type: 'textarea', rows: 14, label: 'llms.txt', help: 'Empty = generated from published pages and news. {{siteUrl}} is replaced.' },
  ],
  Navigation: [
    { name: 'nav', type: 'group', label: 'Header', fields: [
      { name: 'links', type: 'list', fields: [...link, { name: 'mega', type: 'bool', label: 'Opens services mega menu' }] },
      { name: 'ctas', type: 'list', label: 'Header buttons', fields: [...link, { name: 'style', type: 'select', options: ['primary', 'accent', 'outline'] }] },
    ] },
    { name: 'mega', type: 'list', label: 'Services mega menu', fields: [{ name: 'kicker', type: 'text' }, { name: 'title', type: 'text' }, { name: 'body', type: 'textarea' }, { name: 'href', type: 'text' }] },
  ],
  Footer: [
    { name: 'footer', type: 'group', fields: [
      { name: 'tagline', type: 'textarea' },
      { name: 'columns', type: 'list', fields: [{ name: 'title', type: 'text' }, { name: 'links', type: 'list', fields: link }] },
      { name: 'legal', type: 'text' },
      { name: 'legalLinks', type: 'list', fields: link },
    ] },
  ],
};

export default function Settings() {
  const toast = useToast();
  const [s, setS] = useState(null);
  const [tab, setTab] = useState('General');
  const [busy, setBusy] = useState(false);
  useEffect(() => { api('/api/admin/settings').then(setS); }, []);
  if (!s) return <p>Loading…</p>;

  async function save() {
    try { if (s.organizationSchema) JSON.parse(s.organizationSchema); } catch { return toast('Organization schema is not valid JSON', true); }
    setBusy(true);
    try { await api('/api/admin/settings', { method: 'PUT', body: s }); toast('Saved'); } catch (e) { toast(e.message, true); }
    setBusy(false);
  }

  return (
    <>
      <div className="adm-bar">
        <h1 style={{ margin: 0 }}>Site & SEO settings</h1>
        <button className="abtn pri" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
      </div>
      <div className="adm-tabs" style={{ flexWrap: 'wrap' }}>
        {Object.keys(GROUPS).map((g) => <button key={g} className={`abtn${tab === g ? ' on' : ''}`} onClick={() => setTab(g)}>{g}</button>)}
      </div>
      <div className="adm-box">
        {GROUPS[tab].map((f) => f.type === 'group' ? (
          <fieldset key={f.name} className="adm-box sub" style={{ margin: 0 }}>
            <legend style={{ fontWeight: 600, padding: '0 6px' }}>{f.label || f.name}</legend>
            <Fields fields={f.fields} value={s[f.name] || {}} onChange={(v) => setS({ ...s, [f.name]: v })} />
          </fieldset>
        ) : <Fields key={f.name} fields={[f]} value={s} onChange={setS} />)}
      </div>
      {tab === 'robots.txt & llms.txt' && (
        <p className="adm-count">Live files: <a href="/robots.txt" target="_blank">/robots.txt</a> · <a href="/llms.txt" target="_blank">/llms.txt</a> · <a href="/sitemap.xml" target="_blank">/sitemap.xml</a> (sitemap is generated automatically)</p>
      )}
    </>
  );
}
