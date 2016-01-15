const banks = [
  require('./banks/alfabank'),
  require('./banks/raiffeisen'),
  require('./banks/sberbank'),
  require('./banks/tinkoff'),
  require('./banks/vtb24'),
  require('./banks/mdm'),
  require('./banks/absolutbank'),
  require('./banks/alfabank-by'),
  require('./banks/bbmb'),
  require('./banks/belapb'),
  require('./banks/belarusbank'),
  require('./banks/belaruskynarodny'),
  require('./banks/belgazprom'),
  require('./banks/belinvestbank'),
  require('./banks/belswissbank'),
  require('./banks/belveb'),
  require('./banks/bpssberbank'),
  require('./banks/bta'),
  require('./banks/deltabank'),
  require('./banks/fransabank'),
  require('./banks/homecredit'),
  require('./banks/idea'),
  require('./banks/moskvaminsk'),
  require('./banks/mtb'),
  require('./banks/paritetbank'),
  require('./banks/priorbank'),
  require('./banks/rrb'),
  require('./banks/tehnobank'),
  require('./banks/tkbank'),
  require('./banks/trustbank'),
  require('./banks/vtb'),
  require('./banks/zepterbank'),
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
