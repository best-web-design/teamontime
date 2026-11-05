// Store round-trips against a real MySQL/MariaDB. Skipped unless TEST_DB_NAME is set.
const test = require('node:test');
const assert = require('node:assert');

test('MySQL store', { skip: !process.env.TEST_DB_NAME && 'set TEST_DB_NAME/DB_USER/DB_PASSWORD to run' }, async () => {
  process.env.DB_NAME = process.env.TEST_DB_NAME;
  const { store } = require('../db');
  try {
    await store.migrate();
    const { seed } = require('../seed');
    await seed({ force: true, log: () => {} });

    const home = await store.pages.bySlug('home');
    assert.equal(home.title, 'Home');
    assert.ok(home.sections.length > 5 && home._id && home.updatedAt);

    const list = await store.pages.list({ publishedOnly: true });
    assert.equal(list[0].slug, 'home');
    assert.equal(list[0].sections, undefined, 'list is light');
    assert.ok(!list.some((p) => p.slug === 'case-study-template'));

    await assert.rejects(store.pages.create({ slug: 'home', title: 'Dup' }), { code: 'ER_DUP_ENTRY' });
    await assert.rejects(store.pages.create({ slug: 'bad slug!', title: 'x' }), { name: 'ValidationError' });
    await assert.rejects(store.posts.create({ slug: 'x' }), /Title is required/);

    const updated = await store.pages.update(home._id, { ...home, title: 'Home 2', published: false });
    assert.equal(updated.title, 'Home 2');
    assert.equal(await store.pages.bySlug('home'), null, 'unpublished hidden from site');
    await store.pages.update(home._id, { ...home });

    const posts = await store.posts.list({ publishedOnly: true });
    assert.ok(posts.length >= 8 && !posts.some((p) => p.published === false));
    const post = await store.posts.bySlug('how-to-structure-content-for-seo-and-aeo');
    assert.deepEqual(post.tags, ['SEO', 'AEO', 'Content strategy', 'B2B marketing']);
    assert.ok(post.content.includes('<h2'));

    await store.settings.set({ siteName: 'X', nested: { a: 1 } });
    assert.deepEqual(await store.settings.get(), { siteName: 'X', nested: { a: 1 } });

    await store.submissions.create('contact', { name: 'A', email: 'a@b.co' });
    const [sub] = await store.submissions.list('contact');
    assert.equal(sub.data.email, 'a@b.co');
    await store.submissions.setRead(sub._id, true);
    assert.equal((await store.submissions.list())[0].read, true);
  } finally {
    await store.end();
  }
});
