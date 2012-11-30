/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-11-15
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */
var DataProvider = require('./DataProvider.js').DataProvider,
    util = require('util');

var userProvider = function() {
    console.log("new  userProvider");
    this.collectionName = "user";
};

util.inherits(userProvider, DataProvider);

exports.userProvider = userProvider;