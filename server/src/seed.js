// Seeds settings, pages and posts from seed-data/*. Safe to re-run: upserts by slug, never deletes.
// Usage: npm run seed            (create missing, keep existing)
//        npm run seed -- --force (overwrite seeded docs with seed content)
//        ADMIN_EMAIL=.. ADMIN_PASSWORD=.. npm run seed   (create/reset the admin user)
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Page, Post, Setting, User } = require('./models');

const force = process.argv.includes('--force');
const dir = path.join(__dirname, '..', 'seed-data');

async function upsert(Model, doc) {
  const exists = await Model.exists({ slug: doc.slug });
  if (exists && !force) return 'kept';
  await Model.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, runValidators: true });
  return exists ? 'updated' : 'created';
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const settings = require(path.join(dir, 'settings.js'));
  if (force || !(await Setting.exists({ key: 'site' }))) await Setting.findOneAndUpdate({ key: 'site' }, { data: settings }, { upsert: true });

  for (const doc of require(path.join(dir, 'pages.js'))) console.log(`page ${doc.slug}: ${await upsert(Page, doc)}`);
  for (const doc of require(path.join(dir, 'posts.js'))) console.log(`post ${doc.slug}: ${await upsert(Post, doc)}`);

  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: pw } = process.env;
  if (email && pw) {
    if (pw.length < 10) throw new Error('ADMIN_PASSWORD must be 10+ characters');
    await User.findOneAndUpdate({ email: email.toLowerCase() }, { email, passwordHash: await bcrypt.hash(pw, 12) }, { upsert: true });
    console.log(`admin user ${email} ready`);
  }
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
