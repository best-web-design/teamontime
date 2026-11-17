const test = require('node:test');
const assert = require('node:assert');
const { merge3, mergeSections } = require('../seed');

test('merge3 applies seed changes but keeps admin edits', () => {
  const prev = { title: 'Old', style: 'card', items: [{ t: 'a' }, { t: 'b' }] };
  const next = { title: 'New', style: 'plain', intro: 'Added', items: [{ t: 'a2' }, { t: 'b' }] };
  const cur = { title: 'Edited in admin', style: 'card', items: [{ t: 'a' }, { t: 'mine' }] };
  merge3(cur, prev, next);
  assert.strictEqual(cur.title, 'Edited in admin');
  assert.strictEqual(cur.style, 'plain');
  assert.strictEqual(cur.intro, 'Added');
  assert.deepStrictEqual(cur.items, [{ t: 'a2' }, { t: 'mine' }]);
});

test('merge3 drops keys the seed removed only when unedited', () => {
  const cur = { kicker: '01', note: 'kept' };
  merge3(cur, { kicker: '01', note: 'old' }, {});
  assert.deepStrictEqual(cur, { note: 'kept' });
});

test('mergeSections replaces untouched pages and leaves restructured edited pages alone', () => {
  const prev = [{ type: 'text', data: { title: 'A' } }];
  const next = [{ type: 'panels', data: { title: 'A' } }, { type: 'faq', data: {} }];
  const untouched = { sections: JSON.parse(JSON.stringify(prev)) };
  assert.ok(mergeSections(untouched, prev, next));
  assert.deepStrictEqual(untouched.sections, next);
  const edited = { sections: [{ type: 'text', data: { title: 'Mine' } }] };
  assert.strictEqual(mergeSections(edited, prev, next), false);
  assert.strictEqual(edited.sections[0].data.title, 'Mine');
});
