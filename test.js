const test = require('ava');
const banksDB = require('.');

test('returns 1', t => {
  t.same(banksDB('5211780000000000'), {
    name: 'alfabank',
    prefixes: [
      521178,
      548673,
      548601,
      45841,
      415428,
      676371,
      477964,
    ],
    country: 'ru',
    localTitle: 'Альфа-Банк',
    engTitle: 'Alfa-Bank',
    url: 'https://alfabank.ru/',
    color: '#F22F17',
  });
});
