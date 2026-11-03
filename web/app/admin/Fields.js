'use client';
import { useState } from 'react';
import { uploadImage } from '@/lib/admin';
import { useToast } from './AdminShell';

const nice = (n) => n.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase());

export function Field({ f, value, onChange }) {
  const label = f.label || nice(f.name);
  switch (f.type) {
    case 'textarea':
      return <Wrap label={label} help={f.help}><textarea rows={f.rows || 3} value={value || ''} onChange={(e) => onChange(e.target.value)} /></Wrap>;
    case 'bool':
      return <label className="adm-row"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> <span>{label}</span></label>;
    case 'select':
      return (
        <Wrap label={label} help={f.help}>
          <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
            <option value="">—</option>{f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Wrap>
      );
    case 'image':
      return <Wrap label={label} help={f.help}><ImageInput value={value} onChange={onChange} /></Wrap>;
    case 'link':
      return (
        <Wrap label={label}>
          <div className="adm-row" style={{ flexWrap: 'nowrap' }}>
            <input placeholder="Button label" value={value?.label || ''} onChange={(e) => onChange({ ...value, label: e.target.value })} />
            <input placeholder="/contact or https://…" value={value?.href || ''} onChange={(e) => onChange({ ...value, href: e.target.value })} />
          </div>
        </Wrap>
      );
    case 'list':
      return <ListField f={f} label={label} value={value || []} onChange={onChange} />;
    default:
      return <Wrap label={label} help={f.help}><input value={value || ''} onChange={(e) => onChange(e.target.value)} /></Wrap>;
  }
}

export function Fields({ fields, value = {}, onChange }) {
  return fields.map((f) => <Field key={f.name} f={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />);
}

function Wrap({ label, help, children }) {
  return <label className="adm-f"><span>{label}</span>{children}{help && <small>{help}</small>}</label>;
}

function ListField({ f, label, value, onChange }) {
  const set = (i, v) => onChange(value.map((x, j) => (j === i ? v : x)));
  const move = (i, d) => { const a = [...value]; [a[i], a[i + d]] = [a[i + d], a[i]]; onChange(a); };
  return (
    <div className="adm-f">
      <span>{label} <span className="adm-count">({value.length})</span></span>
      {value.map((item, i) => (
        <div key={i} className="adm-box sub">
          <div className="adm-row" style={{ justifyContent: 'space-between' }}>
            <strong>#{i + 1}</strong>
            <div className="adm-row">
              <button type="button" className="abtn" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
              <button type="button" className="abtn" disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
              <button type="button" className="abtn dang" onClick={() => onChange(value.filter((_, j) => j !== i))}>Remove</button>
            </div>
          </div>
          <Fields fields={f.fields} value={item} onChange={(v) => set(i, v)} />
        </div>
      ))}
      <div><button type="button" className="abtn" onClick={() => onChange([...value, {}])}>+ Add {label.toLowerCase().replace(/s$/, '')}</button></div>
    </div>
  );
}

export function ImageInput({ value, onChange }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  async function pick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try { onChange(await uploadImage(file)); } catch (err) { toast(err.message, true); }
    setBusy(false);
    e.target.value = '';
  }
  return (
    <div className="adm-img">
      {value ? <img src={value} alt="" /> : <span className="adm-count">No image</span>}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <input value={value || ''} placeholder="Image URL or upload" onChange={(e) => onChange(e.target.value)} />
        <div className="adm-row">
          <input type="file" accept="image/*" onChange={pick} disabled={busy} style={{ width: 'auto' }} />
          {busy && <span className="adm-count">Uploading…</span>}
          {value && <button type="button" className="abtn dang" onClick={() => onChange('')}>Clear</button>}
        </div>
      </div>
    </div>
  );
}
