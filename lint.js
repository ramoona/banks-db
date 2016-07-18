'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const JSV = require('JSV').JSV;
const linter = JSV.createEnvironment();
const jsonfile = require('jsonfile');

function showError(filePath, error) {
  error = error || '';
  console.error(chalk.red('FAIL ' + filePath + error));
}

fs.readdir(path.join(__dirname, 'banks'), (err, files) => {
  if (err) throw err;

  const countries = files.filter(file =>
    fs.lstatSync(path.join(__dirname, 'banks/' + file)).isDirectory());

  countries.forEach(country => {
    const banks = fs.readdirSync(
      path.join(__dirname, 'banks/' + country)).filter(file => /\.json$/.test(file)
    );

    jsonfile.readFile(path.join(__dirname, 'schema.json'), (err1, schema) => {
      if (err1) throw err1;

      banks.forEach(name => {
        const bankPath = 'banks/' + country + '/' + name;

        jsonfile.readFile(path.join(__dirname, bankPath), (err2, bank) => {
          if (err2) throw err2;

          const report = linter.validate(bank, schema);
          name = name.replace(/\.json$/, '');

          if (report.errors.length > 0) {
            showError(bankPath);
            report.errors.forEach(i => console.error(i));
            process.exit(1);
          } else if (bank.country !== country) {
            showError(bankPath, ':\ncountry folder doesn\'t match with bank country');
            process.exit(1);
          } else if (bank.name !== name) {
            showError(bankPath, ':\nJSON filename doesn\'t match with bank name');
            process.exit(1);
          } else if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bank.color)) {
            showError(bankPath, ': \ninvalid color format (use HEX)');
            process.exit(1);
          } else {
            bank.prefixes.sort();
            if (/[A-F]\w*/.test(bank.color)) {
              bank.color = bank.color.toLowerCase();
            }

            jsonfile.writeFile(path.join(__dirname, bankPath), bank, { spaces: 2 }, err3 => {
              if (err3) {
                throw err3;
              } else {
                console.log(chalk.green('OK ') + chalk.white('banks/' + country + '/' + name));
              }
            });
          }
        });
      });
    });
  });
});

fs.readdir(path.join(__dirname, 'banks'), (err4, items) => {
  if (err4) throw err4;

  if (/\.json/.test(items.join())) {
    showError('banks/', ': JSON must not be placed straght in banks folder');
    process.exit(1);
  }
});
