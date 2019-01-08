var data = require('./banks/index');
var banksDBCore = require('./core');

var BanksDB = banksDBCore(data);

module.exports = BanksDB.findBank.bind(BanksDB);

module.exports.data = BanksDB.data;
