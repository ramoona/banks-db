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

readJSON('schema.json', schema => {
  fs.readdir(path.join(__dirname, 'banks'), (err, files) => {
    if (err) throw err;
    files.forEach(name => {
      readJSON('banks/' + name, bank => {
        const report = linter.validate(bank, schema);
        if (report.errors.length === 0) {
          console.log(chalk.green('OK ') + chalk.white(name));
        } else {
          console.error(chalk.red('FAIL ' + name));
          report.errors.forEach(i => console.error(i));
          process.exit(1);
        }
      });
    });
  });
});
