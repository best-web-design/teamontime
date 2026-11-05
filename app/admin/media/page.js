'use client';
import { useEffect, useState } from 'react';
import { api, uploadImage } from '@/lib/admin';
import { useToast } from '../AdminShell';

const kb = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

export default function Media() {
  const toast = useToast();
  const [files, setFiles] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = () => api('/api/admin/media').then(setFiles).catch((e) => toast(e.message, true));
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function upload(e) {
    const list = [...(e.target.files || [])];
    setBusy(true);
    for (const f of list) {
      try { await uploadImage(f); } catch (err) { toast(`${f.name}: ${err.message}`, true); }
    }
    setBusy(false);
    e.target.value = '';
    load();
  }
  async function remove(f) {
    if (!confirm(`Delete ${f.name}? Pages that use it will show a broken image.`)) return;
    await api(`/api/admin/media/${encodeURIComponent(f.name)}`, { method: 'DELETE' });
    load();
  }
  function copy(f) {
    navigator.clipboard?.writeText(f.url).then(() => toast('Image URL copied'), () => toast(f.url));
  }

  return (
    <>
      <div className="adm-bar">
        <h1 style={{ margin: 0 }}>Media library</h1>
        <label className="abtn pri" style={{ cursor: 'pointer' }}>
          {busy ? 'Uploading…' : 'Upload images'}
          <input type="file" accept="image/*" multiple onChange={upload} disabled={busy} hidden />
        </label>
      </div>
      <p className="adm-count">PNG, JPG, WebP, GIF, SVG or AVIF up to 8 MB. Copy a URL to paste into any image field, or use “Choose from library” inside the editor.</p>
      {!files ? <p>Loading…</p> : !files.length ? <p className="adm-count">No images uploaded yet.</p> : (
        <div className="adm-media">
          {files.map((f) => (
            <figure key={f.name}>
              <a href={f.url} target="_blank" rel="noopener"><img src={f.url} alt={f.name} loading="lazy" /></a>
              <figcaption>
                <span className="adm-count" title={f.name}>{f.name} · {kb(f.size)}</span>
                <span className="adm-row">
                  <button className="abtn" onClick={() => copy(f)}>Copy URL</button>
                  <button className="abtn dang" onClick={() => remove(f)}>Delete</button>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
