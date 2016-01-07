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

  fs.readFile(path.join(__dirname, 'index.js'), (err2, indexData) => {
    if (err2) throw err2;
    const index = indexData.toString();
    files.forEach(name => {
      var line = "require('./banks/" + name.replace(/\.json$/, '') + "')";
      if (index.indexOf(line) === -1) {
        console.error(chalk.red('FAIL index.js'));
        console.error('Missed ' + line);
        process.exit(1);
      }
    });
    console.log(chalk.green('OK ') + chalk.white('index.js'));
  });

  readJSON('schema.json', schema => {
    files.forEach(name => {
      readJSON('banks/' + name, bank => {
        const report = linter.validate(bank, schema);
        if (report.errors.length === 0) {
          console.log(chalk.green('OK ') + chalk.white('banks/' + name));
        } else {
          console.error(chalk.red('FAIL ' + 'banks/' + name));
          report.errors.forEach(i => console.error(i));
          process.exit(1);
        }
      });
    });
  });
});
