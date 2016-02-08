const type = require('./type');

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
  require('./banks/absolutbank'),
  require('./banks/rocketbank'),
  require('./banks/alfabank-by'),
  require('./banks/belapb'),
  require('./banks/belarusbank'),
  require('./banks/belaruskynarodny'),
  require('./banks/belgazprom'),
  require('./banks/belinvestbank'),
  require('./banks/belswissbank'),
  require('./banks/belveb'),
  require('./banks/bpssberbank'),
  require('./banks/deltabank'),
  require('./banks/homecredit'),
  require('./banks/moskvaminsk'),
  require('./banks/mtb'),
  require('./banks/paritetbank'),
  require('./banks/priorbank'),
  require('./banks/trustbank'),
  require('./banks/vtb'),
  require('./banks/amexbelgiumcorporate'),
  require('./banks/ingbelgium')
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
  const bank = prefixes[first6] || prefixes[first5];
  const result = {
    type: type(card)
  };

  var el;
  if (bank) {
    for (el in bank) {
      result[el] = bank[el];
    }
  }

  return result;
};

module.exports.data = banks;
