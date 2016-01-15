const test = require('ava');
const banksDB = require('.');

test('finds bank by first 6 symbols', t => {
  t.same(banksDB('5211784563802833').name, 'alfabank');
});

test('finds bank by first 5 symbols', t => {
  t.same(banksDB('4622384563802833').name, 'vtb24');
});

test('returns false on unknown bank', t => {
  t.same(banksDB('4111111111111111'), false);
});

test('finds bank by converted to string card number', t => {
  t.same(banksDB(4377734563802833).name, 'tinkoff');
});

test('ignores non-digits symbols in card number', t => {
  t.same(banksDB('43-77-73-45-63-80-28-33').name, 'tinkoff');
});

test('ignores whitespaces', t => {
  t.same(banksDB('4627 3045 6380 2833').name,'raiffeisen');
});
