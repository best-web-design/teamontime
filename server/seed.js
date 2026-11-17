// Loads the Figma content (seed-data/*) into the database.
// server.js runs this automatically on first start (empty pages table). Manual use:
//   node server/seed.js            create missing pages/posts, keep existing ones
//   node server/seed.js --force    overwrite seeded pages/posts with the original content (never deletes)
const path = require('path');
const { store } = require('./db');

const dir = path.join(__dirname, 'seed-data');

async function seed({ force = false, log = console.log } = {}) {
  if (force || !Object.keys(await store.settings.get()).length) await store.settings.set(require(path.join(dir, 'settings.js')));
  for (const [name, coll, docs] of [['page', store.pages, require(path.join(dir, 'pages.js'))], ['post', store.posts, require(path.join(dir, 'posts.js'))]]) {
    for (const doc of docs) {
      const exists = await coll.bySlug(doc.slug, { publishedOnly: false });
      if (exists && !force) continue;
      await coll.upsertBySlug(doc);
      log(`${name} ${doc.slug}: ${exists ? 'updated' : 'created'}`);
    }
  }
}

// Fills image fields that are still empty with the Figma assets, without touching anything else.
// Runs once per ASSETS_VERSION (tracked in settings), so an image cleared in admin later stays cleared.
const ASSETS_VERSION = 2;
const IMG_KEY = /image|logo|cover/i;
const empty = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length);
const hasImage = (o) => o && typeof o === 'object' && Object.entries(o).some(([k, v]) => IMG_KEY.test(k) && !empty(v));

function fill(cur, src) {
  let changed = false;
  for (const [k, v] of Object.entries(src || {})) {
    if (IMG_KEY.test(k) && empty(cur[k]) && !empty(v)) { cur[k] = v; changed = true; continue; }
    if (Array.isArray(v) && Array.isArray(cur[k])) {
      // a logo strip that never had any images: take the Figma list (labels and order come with it)
      if (k === 'items' && cur[k].every((it) => !hasImage(it)) && v.some(hasImage) && v.every((it) => Object.keys(it).every((x) => IMG_KEY.test(x) || x === 'label'))) {
        cur[k] = v; changed = true; continue;
      }
      v.forEach((it, i) => { if (it && typeof it === 'object' && cur[k][i] && typeof cur[k][i] === 'object' && fill(cur[k][i], it)) changed = true; });
    } else if (v && typeof v === 'object' && cur[k] && typeof cur[k] === 'object' && !Array.isArray(cur[k])) {
      if (fill(cur[k], v)) changed = true;
    }
  }
  return changed;
}

async function fillImages({ log = console.log } = {}) {
  const settings = await store.settings.get();
  if ((settings._assetsVersion || 0) >= ASSETS_VERSION) return;
  fill(settings, require(path.join(dir, 'settings.js')));
  settings._assetsVersion = ASSETS_VERSION;
  await store.settings.set(settings);
  for (const [coll, docs] of [[store.pages, require(path.join(dir, 'pages.js'))], [store.posts, require(path.join(dir, 'posts.js'))]]) {
    for (const src of docs) {
      const cur = await coll.bySlug(src.slug, { publishedOnly: false });
      if (!cur) continue;
      let changed = fill(cur, { cover: src.cover, coverAlt: src.coverAlt });
      (src.sections || []).forEach((sec, i) => {
        const c = cur.sections?.[i];
        if (c && c.type === sec.type && fill(c.data || (c.data = {}), sec.data)) changed = true;
      });
      if (changed) { await coll.update(cur._id, cur); log(`images added: ${src.slug}`); }
    }
  }
}

// Design updates: brings seeded pages and settings up to the latest seed-data without losing admin edits.
// previous.json is the seed-data as it was before this update. A value still equal to that old seed value
// was never edited in admin, so it takes the new value; anything changed in admin is kept as it is.
const LAYOUT_VERSION = 1;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);

function merge3(cur, prev, next) {
  let changed = false;
  for (const [k, v] of Object.entries(next || {})) {
    const p = prev ? prev[k] : undefined;
    if (cur[k] === undefined) { if (v !== undefined) { cur[k] = v; changed = true; } continue; }
    if (same(cur[k], v)) continue;
    if (p !== undefined && same(cur[k], p)) { cur[k] = v; changed = true; continue; }
    if (isObj(cur[k]) && isObj(v)) { if (merge3(cur[k], isObj(p) ? p : {}, v)) changed = true; continue; }
    if (Array.isArray(cur[k]) && Array.isArray(v) && Array.isArray(p) && cur[k].length === p.length && p.length === v.length) {
      v.forEach((it, i) => {
        if (isObj(it) && isObj(cur[k][i])) { if (merge3(cur[k][i], isObj(p[i]) ? p[i] : {}, it)) changed = true; }
        else if (same(cur[k][i], p[i]) && !same(cur[k][i], it)) { cur[k][i] = it; changed = true; }
      });
    }
  }
  // keys the new seed dropped, if never edited
  for (const k of Object.keys(prev || {})) {
    if (!(k in (next || {})) && k in cur && same(cur[k], prev[k])) { delete cur[k]; changed = true; }
  }
  return changed;
}

function mergeSections(cur, prev, next) {
  const c = cur.sections || [];
  if (same(c, prev)) { cur.sections = next; return !same(prev, next); }
  if (prev.length !== next.length) return false; // edited in admin and restructured in seed: leave it
  let changed = false;
  next.forEach((sec, i) => {
    const cs = c[i], ps = prev[i];
    if (!cs || !ps || cs.type !== ps.type) return;
    if (cs.type !== sec.type) { cs.type = sec.type; changed = true; }
    cs.data ||= {};
    if (merge3(cs.data, ps.data || {}, sec.data || {})) changed = true;
  });
  return changed;
}

async function updateLayout({ log = console.log } = {}) {
  const settings = await store.settings.get();
  if ((settings._layoutVersion || 0) >= LAYOUT_VERSION) return;
  const prev = require(path.join(dir, 'previous.json'));
  merge3(settings, prev.settings, require(path.join(dir, 'settings.js')));
  settings._layoutVersion = LAYOUT_VERSION;
  await store.settings.set(settings);
  for (const src of require(path.join(dir, 'pages.js'))) {
    const cur = await store.pages.bySlug(src.slug, { publishedOnly: false });
    const old = prev.pages[src.slug];
    if (!cur || !old) continue;
    if (mergeSections(cur, old.sections || [], src.sections || [])) { await store.pages.update(cur._id, cur); log(`design updated: ${src.slug}`); }
  }
}

module.exports = { seed, fillImages, fill, merge3, mergeSections, updateLayout };

if (require.main === module) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });
  store.migrate()
    .then(() => seed({ force: process.argv.includes('--force') }))
    .then(() => store.end())
    .catch((e) => { console.error(e); process.exit(1); });
}
