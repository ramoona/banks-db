const fs = require('fs-promise');
const path = require('path');
const helper = require('./helper');
const JSV = require('JSV').JSV;
const jsonfile = require('jsonfile-promised');

const linter = JSV.createEnvironment();

const lintBank = (bank, bankPath, bankName, country, schema) =>
   new Promise((resolve, reject) => {
     const report = linter.validate(bank, schema);
     bankName = bankName.replace(/\.json$/, '');

     if (report.errors.length > 0) {
       report.errors.forEach(i => console.error(i));
       reject(bankPath);
     } else if (bank.country !== country) {
       reject(`${bankPath} :\ncountry folder doesn't match with bank country`);
     } else if (bank.name !== bankName) {
       reject(`${bankPath}:\nJSON filename doesn't match with bank name`);
     } else if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bank.color)) {
       reject(`${bankPath}: \ninvalid color format (use HEX)`);
     } else {
       bank.prefixes.sort();
       if (/[A-F]\w*/.test(bank.color)) {
         bank.color = bank.color.toLowerCase();
         helper.warn(`${bankPath}: bank color was changed to lowercase`);
       }
       resolve(bank);
     }
   })
;

const lint = (files, schema) =>
   new Promise((resolve, reject) => {
     const countries = files.filter(file =>
      fs.lstatSync(path.join(__dirname, `banks/${file}`)).isDirectory());

     countries.reduce((countryPromise, country) => {
       const banks = fs.readdirSync(
        path.join(__dirname, `banks/${country}`)).filter(file => /\.json$/.test(file)
      );
       return countryPromise.then(() =>
        banks.reduce((bankPromise, bankName) => {
          const bankPath = `banks/${country}/${bankName}`;
          const fullPath = path.join(__dirname, bankPath);
          return bankPromise.then(() =>
            jsonfile.readFile(path.join(__dirname, bankPath))
              .then(bank => lintBank(bank, bankPath, bankName, country, schema))
              .then(bank => jsonfile.writeFile(fullPath, bank, { spaces: 2 }))
              .then(() => {
                helper.success(`banks/${country}/${bankName}`);
              })
              .catch(reject)
          );
        }, Promise.resolve()));
     }, Promise.resolve());

     if (/\.json/.test(files.join())) {
       reject('JSON must not be placed straight in banks folder');
     }
   })
;

jsonfile.readFile(path.join(__dirname, 'schema.json')).then((schema) => {
  fs.readdir(path.join(__dirname, 'banks')).then(files => lint(files, schema)).catch((err) => {
    helper.error(err);
    process.exit(1);
  });
}).catch(helper.error);

