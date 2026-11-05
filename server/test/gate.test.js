const test = require('node:test');
const assert = require('node:assert');
const express = require('express');
const { gate } = require('../gate');

test('coming-soon gate', async () => {
  const app = express();
  app.use(gate('0000', 'x'.repeat(40)));
  app.use((req, res) => res.send('SITE'));
  const srv = app.listen(0);
  const base = `http://localhost:${srv.address().port}`;
  const form = (pw, next = '/about') => fetch(`${base}/__preview`, { method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ password: pw, next }) });
  try {
    assert.match(await (await fetch(base + '/about')).text(), /Coming soon/);
    assert.equal(await (await fetch(base + '/admin/login')).text(), 'SITE'); // admin stays open
    assert.equal(await (await fetch(base + '/api/health')).text(), 'SITE');
    assert.equal((await form('1234')).status, 401);
    const ok = await form('0000');
    assert.equal(ok.status, 303);
    assert.equal(ok.headers.get('location'), '/about');
    const cookie = ok.headers.get('set-cookie').split(';')[0];
    assert.equal(await (await fetch(base + '/about', { headers: { cookie } })).text(), 'SITE');
    assert.match(await (await fetch(base + '/', { headers: { cookie: 'bwd_preview=forged' } })).text(), /Coming soon/);
    assert.equal((await form('0000', '//evil.com')).headers.get('location'), '/'); // no open redirect
  } finally { srv.close(); }
});
