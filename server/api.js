// JSON API mounted by server.js under /api (plus /uploads). The site itself reads the DB in-process via lib/api.js.
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { store } = require('./db');

const env = process.env;
const UPLOAD_DIR = path.resolve(env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads'));
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.set('trust proxy', 1);
// helmet's CSP also stops scripts inside uploaded SVGs, which are served from the site's own origin.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d' }));

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Forms: contact | audit | newsletter. Trust boundary — validate and rate limit.
const FORMS = {
  contact: ['name', 'email'],
  audit: ['name', 'email', 'website'],
  newsletter: ['email'],
};
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
app.post('/api/forms/:form', formLimiter, wrap(async (req, res) => {
  const required = FORMS[req.params.form];
  if (!required) return res.status(404).json({ error: 'Unknown form' });
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (body.company_website) return res.json({ ok: true }); // honeypot: silently drop bots
  const data = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === 'string' || typeof v === 'boolean') data[k.slice(0, 64)] = typeof v === 'string' ? v.slice(0, 5000).trim() : v;
  }
  const missing = required.filter((k) => !data[k]);
  if (missing.length) return res.status(400).json({ error: `Missing: ${missing.join(', ')}` });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return res.status(400).json({ error: 'Invalid email' });
  await store.submissions.create(req.params.form, data);
  notify(req.params.form, data).catch((e) => console.warn('mail failed:', e.message)); // saved already; mail is best-effort
  res.json({ ok: true });
}));

async function notify(form, data) {
  if (!env.SMTP_HOST) return;
  const s = await store.settings.get();
  const to = s.notifyEmail || env.NOTIFY_EMAIL;
  if (!to) return;
  const t = nodemailer.createTransport({
    host: env.SMTP_HOST, port: Number(env.SMTP_PORT || 587), secure: env.SMTP_PORT === '465',
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  await t.sendMail({
    from: env.SMTP_FROM || env.SMTP_USER, to, replyTo: data.email,
    subject: `New ${form} submission — ${data.name || data.email}`,
    text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
}

/* ---------------- auth ---------------- */

const JWT_SECRET = env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be set (32+ chars)');

app.post('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 }), wrap(async (req, res) => {
  const { email, password } = req.body || {};
  const user = typeof email === 'string' && await store.users.byEmail(email);
  if (!user || typeof password !== 'string' || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  res.json({ token: jwt.sign({ sub: String(user.id), email: user.email }, JWT_SECRET, { expiresIn: '7d' }) });
}));

function auth(req, res, next) {
  try {
    req.user = jwt.verify((req.headers.authorization || '').replace(/^Bearer /, ''), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

/* ---------------- admin API ---------------- */

const admin = express.Router();
admin.use(auth);

const pick = (body, keys) => Object.fromEntries(keys.filter((k) => k in body).map((k) => [k, body[k]]));
function crud(name, coll, fields) {
  admin.get(`/${name}`, wrap(async (req, res) => res.json(await coll.list())));
  admin.get(`/${name}/:id`, wrap(async (req, res) => {
    const doc = await coll.get(req.params.id);
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' });
  }));
  admin.post(`/${name}`, wrap(async (req, res) => res.status(201).json(await coll.create(pick(req.body || {}, fields)))));
  admin.put(`/${name}/:id`, wrap(async (req, res) => {
    const d = await coll.update(req.params.id, pick(req.body || {}, fields));
    d ? res.json(d) : res.status(404).json({ error: 'Not found' });
  }));
  admin.delete(`/${name}/:id`, wrap(async (req, res) => { await coll.remove(req.params.id); res.json({ ok: true }); }));
}
crud('pages', store.pages, ['slug', 'title', 'template', 'sections', 'seo', 'published', 'order']);
crud('posts', store.posts, ['slug', 'kind', 'category', 'title', 'excerpt', 'status', 'cover', 'coverAlt', 'author', 'tags', 'content', 'sections', 'seo', 'published', 'publishedAt']);

admin.get('/settings', wrap(async (req, res) => res.json(await store.settings.get())));
admin.put('/settings', wrap(async (req, res) => {
  const data = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
  await store.settings.set(data);
  res.json(data);
}));

admin.get('/submissions', wrap(async (req, res) => res.json(await store.submissions.list(req.query.form ? String(req.query.form) : ''))));
admin.patch('/submissions/:id', wrap(async (req, res) => { await store.submissions.setRead(req.params.id, !!req.body?.read); res.json({ ok: true }); }));
admin.delete('/submissions/:id', wrap(async (req, res) => { await store.submissions.remove(req.params.id); res.json({ ok: true }); }));

admin.put('/password', wrap(async (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== 'string' || password.length < 10) return res.status(400).json({ error: 'Password must be 10+ characters' });
  await store.users.setPassword(req.user.sub, await bcrypt.hash(password, 12));
  res.json({ ok: true });
}));

const IMAGE_TYPES = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif', 'image/svg+xml': '.svg', 'image/avif': '.avif' };
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${IMAGE_TYPES[file.mimetype]}`),
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, !!IMAGE_TYPES[file.mimetype]),
});
admin.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image files only (png, jpg, webp, gif, svg, avif), max 8MB' });
  res.json({ url: `/uploads/${req.file.filename}` });
});
admin.get('/media', wrap(async (req, res) => {
  const files = fs.readdirSync(UPLOAD_DIR).filter((f) => !f.startsWith('.')).sort().reverse();
  res.json(files.map((f) => ({ name: f, url: `/uploads/${f}`, size: fs.statSync(path.join(UPLOAD_DIR, f)).size })));
}));
admin.delete('/media/:name', (req, res) => {
  const name = path.basename(req.params.name); // no path traversal out of uploads
  const file = path.join(UPLOAD_DIR, name);
  if (name.startsWith('.') || !fs.existsSync(file)) return res.status(404).json({ error: 'Not found' });
  fs.unlinkSync(file);
  res.json({ ok: true });
});

app.use('/api/admin', admin);

app.use((err, req, res, next) => {
  if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'That slug is already used' });
  if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;
