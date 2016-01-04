var fs = require("fs");
var path = require("path");

var JSV = require("JSV").JSV;
var linter = JSV.createEnvironment();

fs.readFile(path.join(__dirname, "schema.json"), function (err, schemaData) {
  if (err) throw err;
  var schema = JSON.parse(schemaData.toString());

  fs.readdir(path.join(__dirname, "banks"), function (err, files) {
    if (err) throw err;

    files.forEach(function(name) {
      fs.readFile(path.join(__dirname, "banks", name), function (err, bankData) {
        if (err) throw err;
        var bank = JSON.parse(bankData.toString());

        var report = linter.validate(bank, schema);

        if (report.errors.length == 0) {
          console.log("OK " + name);
        }
        else {
          console.error("Fail " + name);
          report.errors.forEach(function(error) {
            console.error(error)
          });
          process.exit(1);
        }
      });
    });
  });
});

