const test = require('node:test');
const assert = require('node:assert');
const { fill } = require('../seed');

test('fill adds only missing images', () => {
  const cur = { logo: '', title: 'Edited', nested: { image: 'keep.png' }, list: [{ label: 'A', image: '' }], items: [{ label: 'Old', image: '' }] };
  const src = { logo: 'l.png', title: 'Seed', nested: { image: 'new.png' }, list: [{ label: 'X', image: 'a.png', body: 'b' }], items: [{ label: 'New', image: 'n.png' }, { label: 'Two', image: 't.png' }] };
  assert.equal(fill(cur, src), true);
  assert.equal(cur.logo, 'l.png');
  assert.equal(cur.title, 'Edited');
  assert.equal(cur.nested.image, 'keep.png');
  assert.deepEqual(cur.list, [{ label: 'A', image: 'a.png' }]); // text kept, only image filled
  assert.equal(cur.items.length, 2); // empty logo strip replaced by the Figma list
  assert.equal(fill(cur, src), false); // idempotent
});
