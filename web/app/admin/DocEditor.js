'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/admin';
import { SECTION_TYPES } from '@/lib/sections';
import { Fields } from './Fields';
import { useToast } from './AdminShell';

const SEO_FIELDS = [
  { name: 'metaTitle', type: 'text', help: 'Shown in Google. Aim for 50–60 characters. Empty = page title + site name.' },
  { name: 'metaDescription', type: 'textarea', help: 'Aim for 140–160 characters. Empty = hero lead text.' },
  { name: 'canonical', type: 'text', help: 'Leave empty unless this page duplicates another URL.' },
  { name: 'ogImage', type: 'image', label: 'Social share image (1200×630)' },
  { name: 'noindex', type: 'bool', label: 'Hide from search engines (noindex)' },
  { name: 'schema', type: 'textarea', rows: 8, label: 'Custom JSON-LD schema (optional)', help: 'Replaces the auto-generated schema (Organization, Service, FAQPage, Breadcrumb, Article). Must be valid JSON.' },
];

// Shared editor for Pages and Posts. `kind` = 'pages' | 'posts'.
export default function DocEditor({ kind, id, metaFields }) {
  const router = useRouter();
  const toast = useToast();
  const [doc, setDoc] = useState(null);
  const [tab, setTab] = useState('content');
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(false);
  const isNew = id === 'new';

  useEffect(() => {
    if (isNew) setDoc({ title: '', slug: '', sections: [], seo: {}, published: true });
    else api(`/api/admin/${kind}/${id}`).then(setDoc).catch((e) => toast(e.message, true));
  }, [kind, id, isNew, toast]);

  if (!doc) return <p>Loading…</p>;
  const set = (patch) => setDoc({ ...doc, ...patch });
  const sections = doc.sections || [];
  const setSection = (i, s) => set({ sections: sections.map((x, j) => (j === i ? s : x)) });
  const move = (i, d) => { const a = [...sections]; [a[i], a[i + d]] = [a[i + d], a[i]]; set({ sections: a }); setOpen(i + d); };

  async function save() {
    if (doc.seo?.schema) { try { JSON.parse(doc.seo.schema); } catch { return toast('Custom schema is not valid JSON', true); } }
    setBusy(true);
    try {
      const saved = await api(`/api/admin/${kind}${isNew ? '' : `/${id}`}`, { method: isNew ? 'POST' : 'PUT', body: doc });
      toast('Saved');
      if (isNew) router.replace(`/admin/${kind === 'pages' ? 'pages' : 'news'}/${saved._id}`);
    } catch (e) { toast(e.message, true); }
    setBusy(false);
  }
  async function remove() {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;
    await api(`/api/admin/${kind}/${id}`, { method: 'DELETE' });
    router.replace(`/admin/${kind === 'pages' ? 'pages' : 'news'}`);
  }
  const url = kind === 'pages' ? (doc.slug === 'home' ? '/' : `/${doc.slug}`) : `/news/${doc.slug}`;

  return (
    <>
      <div className="adm-bar">
        <h1 style={{ margin: 0 }}>{doc.title || 'Untitled'}</h1>
        <div className="adm-row">
          {!isNew && <a className="abtn" href={url} target="_blank" rel="noopener">View ↗</a>}
          {!isNew && <button className="abtn dang" onClick={remove}>Delete</button>}
          <button className="abtn pri" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      <div className="adm-tabs">
        {['content', 'seo', 'settings'].map((t) => <button key={t} className={`abtn${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>{t === 'seo' ? 'SEO' : t[0].toUpperCase() + t.slice(1)}</button>)}
      </div>

      {tab === 'settings' && (
        <div className="adm-box">
          <Fields fields={[
            { name: 'title', type: 'text', help: 'Internal name and default <title>' },
            { name: 'slug', type: 'text', help: kind === 'pages' ? 'URL path without leading slash, e.g. services/websites. Home = home' : 'URL: /news/<slug>' },
            ...metaFields,
            { name: 'published', type: 'bool', label: 'Published' },
          ]} value={doc} onChange={setDoc} />
        </div>
      )}

      {tab === 'seo' && (
        <div className="adm-box">
          <Fields fields={SEO_FIELDS} value={doc.seo || {}} onChange={(seo) => set({ seo })} />
          <p className="adm-count">Title: {(doc.seo?.metaTitle || doc.title || '').length} chars · Description: {(doc.seo?.metaDescription || '').length} chars</p>
        </div>
      )}

      {tab === 'content' && (
        <>
          {sections.map((s, i) => {
            const def = SECTION_TYPES[s.type];
            const preview = s.data?.title || s.data?.eyebrow || '';
            return (
              <div key={i} className="adm-box">
                <div className="adm-row" style={{ justifyContent: 'space-between' }}>
                  <button className="abtn" style={{ textAlign: 'left', flex: 1, borderRadius: 10 }} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                    {i + 1}. {def?.label || s.type} {preview && <span className="adm-count">— {String(preview).split('\n')[0].slice(0, 60)}</span>}
                  </button>
                  <button className="abtn" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
                  <button className="abtn" disabled={i === sections.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
                  <button className="abtn dang" onClick={() => confirm('Remove this section?') && set({ sections: sections.filter((_, j) => j !== i) })}>Remove</button>
                </div>
                {open === i && def && <Fields fields={[...def.fields, { name: 'anchor', type: 'text', help: 'Optional id so buttons can link to #anchor' }]} value={s.data || {}} onChange={(data) => setSection(i, { ...s, data })} />}
              </div>
            );
          })}
          <div className="adm-row">
            <select id="add-sec" defaultValue="" style={{ width: 'auto' }} onChange={(e) => {
              if (!e.target.value) return;
              set({ sections: [...sections, { type: e.target.value, data: {} }] }); setOpen(sections.length); e.target.value = '';
            }}>
              <option value="">+ Add section…</option>
              {Object.entries(SECTION_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </>
      )}
    </>
  );
}
