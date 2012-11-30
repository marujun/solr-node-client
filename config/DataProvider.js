var Provider = require('./Provider').Provider,
    util = require('util');

var DataProvider = function () {
};

util.inherits(DataProvider, Provider);

DataProvider.prototype.getCollection = function (callback) {
    this.db.collection(this.collectionName, function (err, collection) {
        if (err) callback(err);
        else callback(err, collection);
    });
};

DataProvider.prototype.update = function (selector, document, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.update(selector, document, options, function(err, result) {
                callback(err, result);
            });
        }
    });
};

DataProvider.prototype.find = function (selector, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.find(selector , options).toArray(function(err, result) {
                callback(err, result);
            });
        }
    });
};
DataProvider.prototype.count = function (fields, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.count(fields,function(err, count) {
                callback(err,count);
            });
        }
    });
};
DataProvider.prototype.mapReduce = function (map, reduce, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            if(options.verbose){
                collection.mapReduce(map, reduce, options, function(err, collection,stats) {
                    callback(err,collection,stats);
                });
            }else{
                collection.mapReduce(map, reduce, options, function(err, collection) {
                    callback(err,collection);
                });
            }


        }
    });
};

DataProvider.prototype.ensureIndex = function (fields, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.ensureIndex(fields , options, function(err, indexName) {
                callback(err, indexName);
            });
        }
    });
};

DataProvider.prototype.findOne = function (selector, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.findOne(selector , options, function(err, result) {
                callback(err, result);
            });
        }
    });
};

DataProvider.prototype.insert = function (docs, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.insert(docs , options, function(err, result) {
                callback(err, result);
            });
        }
    });
};

DataProvider.prototype.remove = function (selector, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.remove(selector , options, function(err, result) {
                callback(err, result);
            });
        }
    });
};

DataProvider.prototype.findAndRemove = function (query, options, callback) {
    this.getCollection(function (err, collection) {
        if (err) callback(err);
        else {
            collection.findAndRemove(query , options, function(err, result) {
                callback(err, result);
            });
        }
    });
};

exports.DataProvider = DataProvider;