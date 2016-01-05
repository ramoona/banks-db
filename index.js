const banks = [
  require('./banks/alfabank'),
  require('./banks/raiffeisen'),
  require('./banks/sberbank'),
  require('./banks/tinkoff'),
  require('./banks/vtb24'),
];

module.exports = function findBank(cardNumber) {
  const first5 = parseInt(cardNumber.substr(0, 5), 10);
  const first6 = parseInt(cardNumber.substr(0, 6), 10);

  var i;
  var j;
  var bank;
  var prefix;

  for (i = 0; i < banks.length; i++) {
    bank = banks[i];

    for (j = 0; j < bank.prefixes.length; j++) {
      prefix = bank.prefixes[j];

      if (prefix === first5 || prefix === first6) {
        return bank;
      }
    }
  }

  return false;
};
