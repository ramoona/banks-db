const { writeFile, readdir, lstatSync } = require('fs-promise');
const { join } = require('path');
const { logError, logSuccess } = require('./helper');

const path = name => join(__dirname, name ? `banks/${name}` : 'banks');

const generateRequiresFile = (filePath, requires) => {
  const content = `module.exports = [${requires}\n];\n`;

  writeFile(path(filePath), content).then(() => {
    const dirPath = new RegExp(`${__dirname}/`);
    logSuccess(filePath.replace(dirPath, ''));
  }).catch((err) => { logError(`Can't write ${filePath} \n${err}`); });
};

const createRequires = (files) => {
  const countries = files.filter(file => lstatSync(path(file)).isDirectory());
  const indexFilesRequires = countries.map(country => `\n  require('./${country}/index')`);

  countries.forEach((country) => {
    readdir(path(country))
      .then((items) => {
        const banksRequires = items
          .filter(file => /\.json$/.test(file))
          .map(bank => `\n  require('./${bank.replace(/\.json$/, '')}')`);
        generateRequiresFile(`${country}/index.js`, banksRequires);
      }).catch((err) => { logError(`Can't read ${country} directory \n${err}`); });
  });

  generateRequiresFile('index.js', indexFilesRequires);
};

readdir(path()).then(createRequires).catch(logError);
