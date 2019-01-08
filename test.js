const findBank = require('.');
const banksDBCore = require('./core');
const ruBanksData = require('./banks/ru');
const type = require('./type');

const BanksDB = banksDBCore(ruBanksData);

/* eslint-disable no-undef */

test('returns card type', () => expect(findBank('5211784563802833').type).toBe('mastercard'));

test('finds bank by first 6 symbols', () => expect(findBank('5211784563802833').name).toBe('alfabank'));

test('finds bank by first 5 symbols', () => expect(findBank('4622384563802833').name).toBe('vtb24'));

test('returns false on unknown bank', () => expect(findBank('4111111111111111').name).toBeUndefined());

test('returns card type on unknown bank', () => expect(findBank('4111111111111111').type).toBe('visa'));

test('finds bank by converted to string card number', () => expect(findBank(4377734563802833).name).toBe('tinkoff'));

test('ignores non-digits symbols in card number', () => expect(findBank('43-77-73-45-63-80-28-33').name).toBe('tinkoff'));

test('ignores whitespaces', () => expect(findBank('4627 3045 6380 2833').name).toBe('raiffeisen'));

test('accepts undefined', () => expect(findBank(undefined).name).toBeUndefined());

test('returns card type', () => expect(type(4111111111111111)).toBe('visa'));

test('returns undefined on unknown card type', () => expect(type(123456)).toBeUndefined());

test('returns country + bankname', () => expect(findBank('5211784563802833').code).toBe('ru-alfabank'));

test('returns code from findBank.data', () => expect(typeof findBank.data[0].code).toBe('string'));

test('returns all banks data', () => expect(Array.isArray(findBank.data)).toBeTruthy());

test('returns only specified banks', () => expect(BanksDB.data.length).toEqual(ruBanksData.length));

test('finds bank in specified banks', () => expect(BanksDB.findBank('4622384563802833').name).toBe('vtb24'));

/* eslint-enable no-undef */
