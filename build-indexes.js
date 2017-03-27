const fs = require('fs-promise');
const path = require('path');
const helper = require('./helper');

const generateRequiresFile = (filePath, requires) => {
  const content = `module.exports = [${requires}\n];\n`;

  fs.writeFile(path.join(__dirname, `banks/${filePath}`), content).then(() => {
    const dirPath = new RegExp(`${__dirname}/`);
    helper.success(filePath.replace(dirPath, ''));
  }).catch((err) => { helper.error(`Can't write ${filePath} \n${err}`); });
};

const createRequires = (files) => {
  const countries = files.filter(file => fs.lstatSync(path.join(__dirname, `banks/${file}`)).isDirectory());
  const indexFilesRequires = countries.map(country => `\n  require('./${country}/index')`);

  countries.forEach((country) => {
    fs.readdir(path.join(__dirname, `banks/${country}`))
      .then((items) => {
        const banksRequires = items
          .filter(file => /\.json$/.test(file))
          .map(bank => `\n  require('./${bank.replace(/\.json$/, '')}')`);
        generateRequiresFile(`${country}/index.js`, banksRequires);
      }).catch((err) => { helper.error(`Can't read ${country} directory \n${err}`); });
  });

  generateRequiresFile('index.js', indexFilesRequires);
};

fs.readdir(path.join(__dirname, 'banks')).then(createRequires).catch(helper.error);
