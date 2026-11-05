// One Node process for the whole site: the Express API under /api + /uploads, everything else
// rendered by Next.js. This is the "Application startup file" in DirectAdmin → Setup Node.js App.
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });

const express = require('express');
const next = require('next');
const bcrypt = require('bcryptjs');
const { store } = require('./server/db');
const { seed, fillImages } = require('./server/seed');

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT || 3000);

async function main() {
  await store.migrate();
  if ((await store.pages.count()) === 0) {
    console.log('Empty database: loading the site content…');
    await seed();
  }
  await fillImages(); // one-off: adds the Figma images to a database seeded before they existed
  // First admin account comes from .env; change the password in Admin → Dashboard afterwards.
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if ((await store.users.count()) === 0 && ADMIN_EMAIL && ADMIN_PASSWORD) {
    if (ADMIN_PASSWORD.length < 10) throw new Error('ADMIN_PASSWORD must be 10+ characters');
    await store.users.upsert(ADMIN_EMAIL, await bcrypt.hash(ADMIN_PASSWORD, 12));
    console.log(`Admin user ${ADMIN_EMAIL} created`);
  }

  globalThis.__bwdStore = store; // read by lib/api.js inside Next.js server code

  const site = next({ dev, dir: __dirname });
  await site.prepare();
  const handle = site.getRequestHandler();
  const api = require('./server/api');

  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  if (process.env.SITE_PASSWORD) app.use(require('./server/gate').gate(process.env.SITE_PASSWORD, process.env.JWT_SECRET));
  app.use((req, res, nextFn) => (/^\/(api|uploads)(\/|$)/.test(req.path) ? api(req, res, nextFn) : nextFn()));
  app.use((req, res) => handle(req, res));
  app.listen(port, () => console.log(`Site ready on :${port} (${dev ? 'dev' : 'production'})`));
}

main().catch((e) => { console.error(e); process.exit(1); });
