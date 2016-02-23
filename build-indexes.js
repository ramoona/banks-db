const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

fs.readdir(path.join(__dirname, 'banks'), (err, files) => {
  if (err) throw err;

  var countries = files.filter(file => {
    return fs.lstatSync(path.join(__dirname, 'banks/' + file)).isDirectory();
  });

  countries.forEach(country => {
    fs.readdir(path.join(__dirname, 'banks/' + country), (err1, items) => {
      if (err1) throw err1;

      var banks = items.filter(file => {
        return /\.json$/.test(file);
      });

      var banksRequires = [];

      banks.forEach(bank => {
        banksRequires.push("\nrequire('./" + bank.replace(/\.json$/, '') + "')");
      });

      var requires = 'module.exports = [' + banksRequires + '\n];';

      fs.writeFile(path.join(__dirname, 'banks/' + country + '/index.js'), requires, err2 => {
        if (err2) throw err2;
        console.log(chalk.green('OK ') + chalk.white('banks/' + country + '/' + 'index.js'));
      });
    });
  });
});
