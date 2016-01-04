var fs = require("fs");
var path = require("path");

var JSV = require("JSV").JSV;
var linter = JSV.createEnvironment();

function readJSON(file, callback) {
  fs.readFile(path.join(__dirname, file), function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data.toString());
    callback(json);
  });
}

readJSON("schema.json", function(schema) {
  fs.readdir(path.join(__dirname, "banks"), function (err, files) {
    if (err) throw err;
    files.forEach(function(name) {
      readJSON("banks/" + name, function(bank) {
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
})

