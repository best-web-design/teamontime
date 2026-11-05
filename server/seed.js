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

module.exports = { seed };

if (require.main === module) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });
  store.migrate()
    .then(() => seed({ force: process.argv.includes('--force') }))
    .then(() => store.end())
    .catch((e) => { console.error(e); process.exit(1); });
}
