const fs = require('fs');
const path = require('path');
const helper = require('./helper');
const JSV = require('JSV').JSV;
const jsonfile = require('jsonfile');

const linter = JSV.createEnvironment();

fs.readdir(path.join(__dirname, 'banks'), (err, files) => {
  if (err) throw err;

  const countries = files.filter(file =>
    fs.lstatSync(path.join(__dirname, `banks/${file}`)).isDirectory());

  countries.forEach((country) => {
    const banks = fs.readdirSync(
      path.join(__dirname, `banks/${country}`)).filter(file => /\.json$/.test(file)
    );

    jsonfile.readFile(path.join(__dirname, 'schema.json'), (err1, schema) => {
      if (err1) throw err1;

      banks.forEach((name) => {
        const bankPath = `banks/${country}/${name}`;

        jsonfile.readFile(path.join(__dirname, bankPath), (err2, bank) => {
          if (err2) throw err2;

          const report = linter.validate(bank, schema);
          name = name.replace(/\.json$/, '');

          if (report.errors.length > 0) {
            helper.error(bankPath);
            report.errors.forEach(i => console.error(i));
            process.exit(1);
          } else if (bank.country !== country) {
            helper.error(`${bankPath} :\ncountry folder doesn't match with bank country`);
            process.exit(1);
          } else if (bank.name !== name) {
            helper.error(`${bankPath}:\nJSON filename doesn't match with bank name`);
            process.exit(1);
          } else if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bank.color)) {
            helper.error(`${bankPath}: \ninvalid color format (use HEX)`);
            process.exit(1);
          } else {
            bank.prefixes.sort();
            if (/[A-F]\w*/.test(bank.color)) {
              bank.color = bank.color.toLowerCase();
            }

            jsonfile.writeFile(path.join(__dirname, bankPath), bank, { spaces: 2 }, (err3) => {
              if (err3) {
                throw err3;
              } else {
                helper.success(`banks/${country}/${name}`);
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
    helper.error('JSON must not be placed straight in banks folder');
    process.exit(1);
  }
});
