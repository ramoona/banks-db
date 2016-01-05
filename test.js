const test = require('ava');
const banksDB = require('.');

test('finds bank by first 6 symbols', t => {
  t.same(banksDB('5211784563802833'), {
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

test('finds bank by first 5 symbols', t => {
  t.same(banksDB('4622384563802833'), {
    name: 'vtb24',
    prefixes: [
      427229,
      46223,
      527883,
      447520,
    ],
    country: 'ru',
    localTitle: 'ВТБ 24',
    engTitle: 'VTB 24',
    url: 'http://www.vtb24.ru',
    color: '#00498F',
  });
});

test('returns false on unknown bank', t => {
  t.same(banksDB('4111111111111111'), false);
});

test('finds bank by converted to string card number', t => {
  t.same(banksDB(4377734563802833), {
    name: 'tinkoff',
    prefixes: [
      521324,
      437773,
    ],
    country: 'ru',
    localTitle: 'Тинькофф Банк',
    engTitle: 'Tinkoff Bank',
    url: 'https://www.tinkoff.ru/',
    color: '#FFDD2D',
  });
});

test('ignores non-digits symbols in card number', t => {
  t.same(banksDB('43-77-73-45-63-80-28-33'), {
    name: 'tinkoff',
    prefixes: [
      521324,
      437773,
    ],
    country: 'ru',
    localTitle: 'Тинькофф Банк',
    engTitle: 'Tinkoff Bank',
    url: 'https://www.tinkoff.ru/',
    color: '#FFDD2D',
  });
});
