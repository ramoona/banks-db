const fs = require('fs');
const path = require('path');

var countries = fs.readdirSync(__dirname).filter(file => {
  return fs.lstatSync(path.join(__dirname, '/' + file)).isDirectory();
});

var banksData = [];

countries.forEach(country => {
  banksData = banksData.concat(require('./' + country + '/index'));
});

module.exports = banksData;
