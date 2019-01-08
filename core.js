var type = require('./type');

function BanksDB(data) {
  var banksData = [];
  var prefixes = {};

  if (Array.isArray(data)) {
    banksData = data;
  } else if (data) {
    banksData.push(data);
  } else {
    console.warn('Empty or invalid arguments of Banks DB Core call. Check Banks DB docs for details.');
  }

  this.data = banksData.reduce(function (acc, current) {
    return acc.concat(current);
  }, []);

  this.data.forEach(function (bank) {
    bank.code = bank.country + '-' + bank.name;
    bank.prefixes.forEach(function (prefix) {
      prefixes[prefix] = bank;
    });
  });

  this.findBank = function (cardNumber) {
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
}

module.exports = function banksDBCore(data) {
  return new BanksDB(data);
};
