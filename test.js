const test = require('ava');
const banksDB = require('.');

test('returns 1', t => {
  t.same(banksDB(), 1);
});
