const fs = require('fs-promise');
const path = require('path');
const helper = require('./helper');
const JSV = require('JSV').JSV;
const jsonfile = require('jsonfile-promised');

const linter = JSV.createEnvironment();
let schema;

jsonfile.readFile(path.join(__dirname, 'schema.json')).then((schemaFile) => {
  schema = schemaFile;
}).catch(helper.error);

const lintBank = (bank, bankPath, bankName, country) =>
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

const lint = files =>
   new Promise((resolve, reject) => {
     const countries = files.filter(file =>
      fs.lstatSync(path.join(__dirname, `banks/${file}`)).isDirectory());

     countries.forEach((country) => {
       const banks = fs.readdirSync(
        path.join(__dirname, `banks/${country}`)).filter(file => /\.json$/.test(file)
      );

       banks.forEach((bankName) => {
         const bankPath = `banks/${country}/${bankName}`;
         const fullPath = path.join(__dirname, bankPath);

         jsonfile.readFile(path.join(__dirname, bankPath))
          .then(bank => lintBank(bank, bankPath, bankName, country))
          .then(bank => jsonfile.writeFile(fullPath, bank, { spaces: 2 }))
          .then(() => { helper.success(`banks/${country}/${bankName}`); })
          .catch(reject);
       });
     });

     if (/\.json/.test(files.join())) {
       reject('JSON must not be placed straight in banks folder');
     }
   })
;

fs.readdir(path.join(__dirname, 'banks')).then(lint).catch((err) => {
  helper.error(err);
  process.exit(1);
});
