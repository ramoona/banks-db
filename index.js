'use strict';

const type = require('./type');
const data = require('./banks/index');
let banks = [];
data.forEach(item => {
  banks = banks.concat(item);
});

const prefixes = {};

for (let i = 0; i < banks.length; i++) {
  for (let j = 0; j < banks[i].prefixes.length; j++) {
    prefixes[banks[i].prefixes[j]] = banks[i];
  }
}

module.exports = function findBank(cardNumber) {
  cardNumber = cardNumber || '';
  const card = cardNumber.toString().replace(/[^\d]/g, '');
  const first5 = card.substr(0, 5);
  const first6 = card.substr(0, 6);
  const bank = prefixes[first6] || prefixes[first5];
  const result = {
    type: type(card)
  };

  if (bank) {
    for (const el in bank) {
      result[el] = bank[el];
      result.code = bank.country + '-' + bank.name;
    }
  }

  return result;
};

module.exports.data = banks;
