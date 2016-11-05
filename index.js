var type = require('./type');
var data = require('./banks/index');

var banks = [];
var prefixes = {};

data.forEach(function (item) {
  banks = banks.concat(item);
});

banks.forEach(function (bank) {
  bank.code = bank.country + '-' + bank.name;
  bank.prefixes.forEach(function (prefix) {
    prefixes[prefix] = bank;
  });
});

module.exports = function findBank(cardNumber) {
  cardNumber = cardNumber || '';
  var card = cardNumber.toString().replace(/[^\d]/g, '');
  var first5 = card.substr(0, 5);
  var first6 = card.substr(0, 6);
  var bank = prefixes[first6] || prefixes[first5];
  var result = {
    type: type(card)
  };

  if (bank) {
    for (var el in bank) {
      result[el] = bank[el];
    }
  }

  return result;
};

module.exports.data = banks;
