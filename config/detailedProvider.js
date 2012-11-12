var DataProvider = require('./DataProvider.js').DataProvider,
    util = require('util');

var detailedProvider = function() {
    console.log("new detailedProvider");
    this.collectionName = "detailed";
};

util.inherits(detailedProvider, DataProvider);

exports.detailedProvider = detailedProvider;