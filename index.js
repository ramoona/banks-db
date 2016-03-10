var type = require('./type');
var data = require('./banks/index');
var banks = [];

data.forEach(function (item) {
  banks = banks.concat(item);
});

banks.forEach(function (bank) {
  bank.code = bank.country + '-' + bank.name;
});

var prefixes = {};

for (var i = 0; i < banks.length; i++) {
  for (var j = 0; j < banks[i].prefixes.length; j++) {
    prefixes[banks[i].prefixes[j]] = banks[i];
  }
}

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
