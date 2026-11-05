'use client';
const API = ''; // same origin: server.js serves /api

export const token = {
  get: () => (typeof window === 'undefined' ? null : localStorage.getItem('bwd_token')),
  set: (t) => localStorage.setItem('bwd_token', t),
  clear: () => localStorage.removeItem('bwd_token'),
};

export async function api(path, { method = 'GET', body, form } = {}) {
  const headers = { Authorization: `Bearer ${token.get()}` };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API}${path}`, { method, headers, body: form || (body !== undefined ? JSON.stringify(body) : undefined) });
  if (res.status === 401 && !path.startsWith('/api/auth')) {
    token.clear();
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json;
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append('file', file);
  return (await api('/api/admin/upload', { method: 'POST', form })).url;
}
