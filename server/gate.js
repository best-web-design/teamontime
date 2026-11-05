// Password-protected "coming soon" gate for the public site. On when SITE_PASSWORD is set in .env.
// Admin, API, uploads and build assets stay reachable so the team can keep editing behind it.
const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');

const OPEN = /^\/(admin|api|uploads|_next|assets)(\/|$)|^\/favicon/;
const COOKIE = 'bwd_preview';

function gate(password, secret) {
  const token = crypto.createHmac('sha256', secret).update(`preview:${password}`).digest('hex');
  const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  const hasCookie = (req) => (req.headers.cookie || '').split(/;\s*/).some((c) => same(c, `${COOKIE}=${token}`));

  const router = express.Router();
  router.post('/__preview', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 }), express.urlencoded({ extended: false }), (req, res) => {
    const next = typeof req.body?.next === 'string' && /^\/(?!\/)/.test(req.body.next) ? req.body.next : '/';
    if (typeof req.body?.password !== 'string' || !same(req.body.password, password)) return page(res, next, true);
    res.cookie(COOKIE, token, { httpOnly: true, secure: req.secure, sameSite: 'lax', maxAge: 30 * 864e5 });
    res.redirect(303, next);
  });
  router.use((req, res, next) => (OPEN.test(req.path) || hasCookie(req) ? next() : page(res, req.originalUrl, false)));
  return router;
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
function page(res, next, wrong) {
  res.status(wrong ? 401 : 200).set({ 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' }).type('html').send(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Coming soon | Best Web Design</title>
<style>
  *{box-sizing:border-box} body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#0c0d1a;
  background-image:radial-gradient(60% 50% at 30% 30%,rgba(88,86,255,.35),transparent),radial-gradient(40% 40% at 80% 20%,rgba(78,232,168,.18),transparent);
  color:#e3f4f8;font:400 18px/28px system-ui,-apple-system,"Segoe UI",sans-serif}
  main{width:min(440px,100%);text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px}
  img{width:174px;height:auto} h1{margin:8px 0 0;font-size:40px;line-height:48px;font-weight:800;letter-spacing:-.5px}
  p{margin:0;color:#bac4da} form{width:100%;display:flex;flex-direction:column;gap:12px;margin-top:8px}
  label{font-size:14px;font-weight:600;text-align:left} input{width:100%;padding:14px 16px;border-radius:14px;border:1px solid #42486f;background:#13172d;color:#e3f4f8;font:inherit}
  input:focus-visible,button:focus-visible{outline:2px solid #4ee8a8;outline-offset:3px}
  button{padding:14px;border:0;border-radius:999px;background:#5856ff;color:#fff;font-family:inherit;font-size:16px;font-weight:600;line-height:24px;cursor:pointer} button:hover{background:#7472ff}
  .err{color:#ff8a9b;font-size:15px}
</style></head><body><main>
  <img src="/assets/figma/logo-footer.png" alt="Best Web Design">
  <h1>Coming soon</h1>
  <p>Our new website is almost ready. Enter the preview password to take a look.</p>
  <form method="post" action="/__preview">
    <input type="hidden" name="next" value="${esc(next)}">
    <label for="pw">Preview password</label>
    <input id="pw" name="password" type="password" autocomplete="current-password" required autofocus${wrong ? ' aria-describedby="err" aria-invalid="true"' : ''}>
    ${wrong ? '<p class="err" id="err" role="alert">That password is not right. Please try again.</p>' : ''}
    <button type="submit">View the site</button>
  </form>
</main></body></html>`);
}

module.exports = { gate };
