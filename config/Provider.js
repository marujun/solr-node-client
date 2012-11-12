require('./Config');
var Db = require('mongodb').Db,
    Server = require('mongodb').Server;

var Provider = function () {
};

Provider.prototype.db = new Db(global.mongodbDB, new Server(global.mongodbHost, global.mongodbPort, {auto_reconnect:true}, {}));

exports.Provider = Provider;