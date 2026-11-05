// Trust-boundary checks that run without a database (requests are rejected before any DB call).
process.env.JWT_SECRET = 'x'.repeat(40);
const test = require('node:test');
const assert = require('node:assert');
const app = require('../api');

test('form and admin guards', async () => {
  const srv = app.listen(0);
  const base = `http://localhost:${srv.address().port}`;
  const post = (p, body) => fetch(base + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    assert.equal((await post('/api/forms/nope', { email: 'a@b.co' })).status, 404);
    assert.equal((await post('/api/forms/contact', { email: 'a@b.co' })).status, 400); // name missing
    assert.equal((await post('/api/forms/newsletter', { email: 'not-an-email' })).status, 400);
    assert.equal((await post('/api/forms/contact', { company_website: 'bot' })).status, 200); // honeypot swallowed
    assert.equal((await fetch(base + '/api/admin/pages')).status, 401);
    assert.equal((await fetch(base + '/api/admin/pages', { headers: { Authorization: 'Bearer forged' } })).status, 401);
    assert.equal((await fetch(base + '/api/admin/media/x.png', { method: 'DELETE' })).status, 401);
    // a valid admin cannot delete outside the uploads folder
    const auth = { Authorization: `Bearer ${require('jsonwebtoken').sign({ sub: '1' }, process.env.JWT_SECRET)}` };
    assert.equal((await fetch(base + '/api/admin/media/..%2Fpackage.json', { method: 'DELETE', headers: auth })).status, 404);
    assert.ok(require('fs').existsSync(require('path').join(__dirname, '..', '..', 'package.json')));
  } finally { srv.close(); }
});
