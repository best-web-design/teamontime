// MySQL/MariaDB data layer. Each record keeps its full JSON document in `doc`;
// fields we filter, sort or keep unique on are mirrored into real columns.
const mysql = require('mysql2/promise');

let pool;
const db = () => {
  pool ||= mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
    timezone: 'Z',
    connectionLimit: 5,
  });
  return pool;
};

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(191) NOT NULL UNIQUE,
    published TINYINT(1) NOT NULL DEFAULT 1,
    sort INT NOT NULL DEFAULT 0,
    doc LONGTEXT NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
  ) DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(191) NOT NULL UNIQUE,
    kind VARCHAR(32) NOT NULL DEFAULT 'article',
    published TINYINT(1) NOT NULL DEFAULT 1,
    published_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    doc LONGTEXT NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    KEY kind_pub (kind, published, published_at)
  ) DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS settings (
    k VARCHAR(64) PRIMARY KEY,
    doc LONGTEXT NOT NULL,
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
  ) DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form VARCHAR(32) NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    doc LONGTEXT NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    KEY form (form)
  ) DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
  ) DEFAULT CHARSET=utf8mb4`,
];

const iso = (d) => (d ? new Date(d).toISOString() : undefined);
const HEAVY = ['sections', 'content'];
const light = (doc) => { const d = { ...doc }; for (const k of HEAVY) delete d[k]; return d; };

// Turns a row into the same shape the admin and site already use (_id, createdAt, updatedAt…).
function toDoc(row) {
  if (!row) return null;
  const doc = JSON.parse(row.doc);
  for (const k of ['_id', 'createdAt', 'updatedAt']) delete doc[k];
  return {
    ...doc,
    _id: String(row.id),
    ...(row.published !== undefined && { published: !!row.published }),
    ...(row.published_at && { publishedAt: iso(row.published_at) }),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at || row.created_at),
  };
}

class ValidationError extends Error { constructor(m) { super(m); this.name = 'ValidationError'; } }
const str = (v, name) => {
  if (typeof v !== 'string' || !v.trim()) throw new ValidationError(`${name} is required`);
  return v.trim();
};
const slugOk = (s) => {
  if (!/^[a-z0-9][a-z0-9/_-]*$/i.test(s) || s.includes('//') || s.endsWith('/')) throw new ValidationError('Slug may only contain letters, numbers, -, _ and /');
  return s;
};
const dateOrNow = (v) => { const d = v ? new Date(v) : new Date(); return Number.isNaN(d.getTime()) ? new Date() : d; };

// Validates and splits a document into its column values + the JSON body.
const PAGE = (b) => {
  const doc = { ...b, slug: slugOk(str(b.slug, 'Slug')), title: str(b.title, 'Title'), published: b.published !== false, order: Number(b.order) || 0 };
  return { cols: { slug: doc.slug, published: doc.published ? 1 : 0, sort: doc.order }, doc };
};
const POST = (b) => {
  const publishedAt = dateOrNow(b.publishedAt);
  const doc = {
    ...b, slug: slugOk(str(b.slug, 'Slug')), title: str(b.title, 'Title'), published: b.published !== false,
    kind: b.kind === 'case-study' ? 'case-study' : 'article', publishedAt: publishedAt.toISOString(),
    tags: Array.isArray(b.tags) ? b.tags.filter((t) => typeof t === 'string' && t.trim()).map((t) => t.trim()) : [],
  };
  return { cols: { slug: doc.slug, kind: doc.kind, published: doc.published ? 1 : 0, published_at: publishedAt }, doc };
};

function collection(table, shape, order) {
  const select = `SELECT * FROM ${table}`;
  return {
    async list({ publishedOnly = false, kind, full = false } = {}) {
      const where = []; const args = [];
      if (publishedOnly) where.push('published = 1');
      if (kind) { where.push('kind = ?'); args.push(kind); }
      const [rows] = await db().query(`${select}${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY ${order}`, args);
      return rows.map((r) => (full ? toDoc(r) : light(toDoc(r))));
    },
    async bySlug(slug, { publishedOnly = true } = {}) {
      const [rows] = await db().query(`${select} WHERE slug = ?${publishedOnly ? ' AND published = 1' : ''} LIMIT 1`, [slug]);
      return toDoc(rows[0]);
    },
    async get(id) {
      const [rows] = await db().query(`${select} WHERE id = ?`, [Number(id) || 0]);
      return toDoc(rows[0]);
    },
    async create(body) {
      const { cols, doc } = shape(body);
      const [r] = await db().query(`INSERT INTO ${table} SET ?`, [{ ...cols, doc: JSON.stringify(doc) }]);
      return this.get(r.insertId);
    },
    async update(id, body) {
      const { cols, doc } = shape(body);
      const [r] = await db().query(`UPDATE ${table} SET ? WHERE id = ?`, [{ ...cols, doc: JSON.stringify(doc) }, Number(id) || 0]);
      return r.affectedRows ? this.get(id) : null;
    },
    async upsertBySlug(body) {
      const existing = await this.bySlug(body.slug, { publishedOnly: false });
      return existing ? this.update(existing._id, body) : this.create(body);
    },
    async remove(id) { await db().query(`DELETE FROM ${table} WHERE id = ?`, [Number(id) || 0]); },
    async count() { const [[r]] = await db().query(`SELECT COUNT(*) n FROM ${table}`); return r.n; },
  };
}

const store = {
  pages: collection('pages', PAGE, 'sort, id'),
  posts: collection('posts', POST, 'published_at DESC, id DESC'),
  settings: {
    async get() {
      const [rows] = await db().query("SELECT doc FROM settings WHERE k = 'site'");
      return rows[0] ? JSON.parse(rows[0].doc) : {};
    },
    async set(data) {
      await db().query("INSERT INTO settings (k, doc) VALUES ('site', ?) ON DUPLICATE KEY UPDATE doc = VALUES(doc)", [JSON.stringify(data || {})]);
    },
  },
  submissions: {
    async create(form, data) { await db().query('INSERT INTO submissions SET ?', [{ form, doc: JSON.stringify(data) }]); },
    async list(form) {
      const [rows] = await db().query(`SELECT * FROM submissions${form ? ' WHERE form = ?' : ''} ORDER BY id DESC LIMIT 500`, form ? [form] : []);
      return rows.map((r) => ({ _id: String(r.id), form: r.form, read: !!r.is_read, data: JSON.parse(r.doc), createdAt: iso(r.created_at) }));
    },
    async setRead(id, read) { await db().query('UPDATE submissions SET is_read = ? WHERE id = ?', [read ? 1 : 0, Number(id) || 0]); },
    async remove(id) { await db().query('DELETE FROM submissions WHERE id = ?', [Number(id) || 0]); },
  },
  users: {
    async byEmail(email) { const [rows] = await db().query('SELECT * FROM users WHERE email = ?', [String(email).toLowerCase()]); return rows[0] || null; },
    async upsert(email, passwordHash) {
      await db().query('INSERT INTO users (email, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)', [String(email).toLowerCase(), passwordHash]);
    },
    async setPassword(id, passwordHash) { await db().query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, Number(id) || 0]); },
    async count() { const [[r]] = await db().query('SELECT COUNT(*) n FROM users'); return r.n; },
  },
  async migrate() { for (const sql of SCHEMA) await db().query(sql); },
  end: () => pool?.end(),
};

module.exports = { store, ValidationError };
