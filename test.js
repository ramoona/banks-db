const banksDB = require('.');
const type = require('./type');

/* eslint-disable no-undef */

test('returns card type', () => expect(banksDB('5211784563802833').type).toBe('mastercard'));

test('finds bank by first 6 symbols', () => expect(banksDB('5211784563802833').name).toBe('alfabank'));

test('finds bank by first 5 symbols', () => expect(banksDB('4622384563802833').name).toBe('vtb24'));

test('returns false on unknown bank', () => expect(banksDB('4111111111111111').name).toBeUndefined());

test('returns card type on unknown bank', () => expect(banksDB('4111111111111111').type).toBe('visa'));

test('finds bank by converted to string card number', () => expect(banksDB(4377734563802833).name).toBe('tinkoff'));

test('ignores non-digits symbols in card number', () => expect(banksDB('43-77-73-45-63-80-28-33').name).toBe('tinkoff'));

test('ignores whitespaces', () => expect(banksDB('4627 3045 6380 2833').name).toBe('raiffeisen'));

test('accepts undefined', () => expect(banksDB(undefined).name).toBeUndefined());

test('returns card type', () => expect(type(4111111111111111)).toBe('visa'));

test('returns undefined on unknown card type', () => expect(type(123456)).toBeUndefined());

test('returns all banks data', () => expect(Array.isArray(banksDB.data)).toBeTruthy());

test('returns country + bankname', () => expect(banksDB('5211784563802833').code).toBe('ru-alfabank'));

test('returns code from banksDB.data', () => expect(typeof banksDB.data[0].code).toBe('string'));

/* eslint-enable no-undef */
