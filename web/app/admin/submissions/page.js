'use client';
import { Fragment, useEffect, useState } from 'react';
import { api } from '@/lib/admin';

export default function Submissions() {
  const [rows, setRows] = useState(null);
  const [form, setForm] = useState('');
  const [open, setOpen] = useState(null);
  const load = () => api(`/api/admin/submissions${form ? `?form=${form}` : ''}`).then(setRows);
  useEffect(() => { load(); }, [form]); // eslint-disable-line react-hooks/exhaustive-deps

  async function toggle(r) {
    setOpen(open === r._id ? null : r._id);
    if (!r.read) { await api(`/api/admin/submissions/${r._id}`, { method: 'PATCH', body: { read: true } }); load(); }
  }
  async function remove(r) {
    if (!confirm('Delete this submission?')) return;
    await api(`/api/admin/submissions/${r._id}`, { method: 'DELETE' }); load();
  }
  function exportCsv() {
    const keys = [...new Set(rows.flatMap((r) => Object.keys(r.data || {})))];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [['date', 'form', ...keys].map(esc).join(','), ...rows.map((r) => [r.createdAt, r.form, ...keys.map((k) => r.data?.[k])].map(esc).join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `submissions-${form || 'all'}.csv`;
    a.click();
  }

  return (
    <>
      <div className="adm-bar">
        <h1 style={{ margin: 0 }}>Form submissions</h1>
        <div className="adm-row">
          <select value={form} onChange={(e) => setForm(e.target.value)} style={{ width: 'auto' }}>
            <option value="">All forms</option><option value="contact">Contact</option><option value="audit">Free audit</option><option value="newsletter">Newsletter</option>
          </select>
          <button className="abtn" onClick={exportCsv} disabled={!rows?.length}>Export CSV</button>
        </div>
      </div>
      {!rows ? <p>Loading…</p> : !rows.length ? <p className="adm-count">No submissions yet.</p> : (
        <table className="adm-table">
          <thead><tr><th>Date</th><th>Form</th><th>Name / email</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => (
              <Fragment key={r._id}>
                <tr style={{ fontWeight: r.read ? 400 : 700 }}>
                  <td className="adm-count">{new Date(r.createdAt).toLocaleString()}</td>
                  <td>{r.form}</td>
                  <td><button className="abtn" onClick={() => toggle(r)} aria-expanded={open === r._id}>{r.data?.name || ''} {r.data?.email}</button></td>
                  <td><button className="abtn dang" onClick={() => remove(r)}>Delete</button></td>
                </tr>
                {open === r._id && (
                  <tr><td colSpan={4}>
                    <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '6px 16px', margin: 0 }}>
                      {Object.entries(r.data || {}).map(([k, v]) => <Fragment key={k}><dt className="adm-count">{k}</dt><dd style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{String(v)}</dd></Fragment>)}
                    </dl>
                  </td></tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
