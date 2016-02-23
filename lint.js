const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const JSV = require('JSV').JSV;
const linter = JSV.createEnvironment();

function readJSON(file, callback) {
  fs.readFile(path.join(__dirname, file), (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data.toString());
    callback(json);
  });
}

fs.readdir(path.join(__dirname, 'banks'), (err, files) => {
  if (err) throw err;

  const countries = files.filter(file => {
    return fs.lstatSync(path.join(__dirname, 'banks/' + file)).isDirectory();
  });

  countries.forEach(country => {
    const banks = fs.readdirSync(path.join(__dirname, 'banks/' + country)).filter(file => {
      return /\.json$/.test(file);
    });

    readJSON('schema.json', schema => {
      banks.forEach(name => {
        readJSON('banks/' + country + '/' + name, bank => {
          name = name.replace(/\.json$/, '');
          const report = linter.validate(bank, schema);
          if (report.errors.length === 0 && bank.country === country && bank.name === name) {
            console.log(chalk.green('OK ') + chalk.white('banks/' + country + '/' + name));
          } else if (bank.country !== country) {
            console.error(chalk.red(
              'FAIL ' + 'banks/' + country + '/' + name + ':\n' +
              'country folder doesn\'t match with bank country'
            ));
            process.exit(1);
          } else if (bank.name !== name) {
            console.error(chalk.red(
              'FAIL ' + 'banks/' + country + '/' + name + ':\n' +
              'JSON filename doesn\'t match with bank name'
            ));
            process.exit(1);
          } else {
            console.error(chalk.red('FAIL: ' + 'banks/' + country + '/' + name));
            report.errors.forEach(i => console.error(i));
            process.exit(1);
          }
        });
      });
    });
  });
});

fs.readdir(path.join(__dirname, 'banks'), (err1, items) => {
  if (err1) throw err1;

  if (/\.json/.test(items.join())) {
    console.error(chalk.red('FAIL: JSON must not be placed straght in banks folder'));
    process.exit(1);
  }
});
