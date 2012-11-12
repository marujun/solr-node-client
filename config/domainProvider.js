
var DataProvider = require('./DataProvider.js').DataProvider,
    util = require('util');

var domainProvider = function() {
    console.log("new domainProvider");
    this.collectionName = "domain";
};

util.inherits(domainProvider, DataProvider);

exports.domainProvider = domainProvider;
