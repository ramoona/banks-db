const banks = [
  require('./banks/alfabank'),
  require('./banks/citibank'),
  require('./banks/mdm'),
  require('./banks/raiffeisen'),
  require('./banks/sberbank'),
  require('./banks/tinkoff'),
  require('./banks/yandex'),
  require('./banks/vtb24'),
  require('./banks/kazkom'),
];

const prefixes = {};

var i;
var j;
for (i = 0; i < banks.length; i++) {
  for (j = 0; j < banks[i].prefixes.length; j++) {
    prefixes[banks[i].prefixes[j]] = banks[i];
  }
}

module.exports = function findBank(cardNumber) {
  const card = cardNumber.toString().replace(/[^\d]/g, '');
  const first5 = card.substr(0, 5);
  const first6 = card.substr(0, 6);
  return prefixes[first6] || prefixes[first5] || false;
};
