var DataProvider = require('./DataProvider.js').DataProvider,
    util = require('util');

var houseProvider = function() {
    console.log("new houseProvider");
    this.collectionName = "house";
};

util.inherits(houseProvider, DataProvider);

exports.houseProvider = houseProvider;