const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function generateIndex(filePath, requires) {
  const content = `module.exports = [${requires}\n];\n`;

  fs.writeFile(path.join(__dirname, `banks/${filePath}`), content, (err) => {
    if (err) throw err;
    const dirPath = new RegExp(`${__dirname}/`);
    console.log(chalk.green('OK ') + chalk.white(filePath.replace(dirPath, '')));
  });
}

fs.readdir(path.join(__dirname, 'banks'), (err, files) => {
  if (err) throw err;
  const countries = files.filter(file =>
     fs.lstatSync(path.join(__dirname, `banks/${file}`)).isDirectory()
  );

  const requireIndexes = [];

  countries.forEach((country) => {
    fs.readdir(path.join(__dirname, `banks/${country}`), (err1, items) => {
      if (err1) throw err1;

      const banks = items.filter(file => /\.json$/.test(file));
      const banksRequires = [];

      banks.forEach((bank) => {
        banksRequires.push(`\n  require('./${bank.replace(/\.json$/, '')}')`);
      });

      generateIndex(`${country}/index.js`, banksRequires);
    });

    requireIndexes.push(`\n  require('./${country}/index')`);
  });

  generateIndex('index.js', requireIndexes);
});
