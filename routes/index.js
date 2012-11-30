var HouseProvider = require("../config/houseProvider").houseProvider;
var houseProvider = new HouseProvider();
var BinaryProvider = require("../config/BinaryProvider.js").BinaryProvider;
var binaryProvider = new BinaryProvider();
var UserProvider=require('../config/userProvider.js').userProvider;
var userProvider=new UserProvider;
var iconv = require('iconv-lite');
var solr = require('solr-client');

var client = solr.createClient('124.207.0.21','8983','','/solr/soufun');
client.autoCommit = true;

exports.index = function(req, res){
    console.log('------------list--------------');
    var skip = 0, limit = 10, count = 10;
    houseProvider.count({}, function (err, result) {
        if (err) {
            console.log('find error!', err);
        }
        if (result) {
            count = result;
            console.log('the collection has ' + count + ' data');
        }
        houseProvider.find({}, {skip:skip, limit:limit}, function (err, result) {
            if (err) {console.log('find error!', err);}
            var pages = Math.ceil(count / limit);
            res.render('demo', { status:'success', house:result, pages:pages,path:'images/'})
        });
    });
};
exports.search = function(req, res){
    var data=req.body;
    var words=data.words.replace('[','').replace(']','').replace(/\s/g,'');
    if(words==''){words='*:*';}
    console.log('words: '+words);
    client.search("q="+words+'&rows='+data.limit,function(err,response){
        if(err){console.log(err);
            res.send( { status:'failed',err:err.message});
        }else{ console.log('Solr response:', JSON.stringify(response));
            var count=response.response.numFound;
            res.send( { status:'success',house:response.response.docs,pages:Math.ceil(count / data.limit),path:'images/'});
        }
    });
};
exports.userPage = function (req, res) {
    var data = req.body;
    var skip = (parseInt(data.page) - 1) * parseInt(data.limit);
    console.log('skip: ' + skip + '  data:  ', data);
    if (data.title == 'search') {
        var words=data.words.replace('[','').replace(']','').replace(/\s/g,'');
        if(words==''){words='*:*';}
        console.log('words: '+words);
        client.search("q="+words+'&start='+skip+'&rows='+data.limit,function(err,response){
            if(err){console.log(err);
                res.send( { status:'failed',err:err.message});
            }else{ console.log('Solr response:', JSON.stringify(response));
                res.send( { status:'success',house:response.response.docs,numFound:response.response.numFound,path:'images/'});
            }
        });
    }else{
        houseProvider.find({}, {skip:skip, limit:data.limit}, function (err, result) {
            if (err) {console.log('find error!', err.message);}
            console.log('find success' + JSON.stringify(result));
            res.send({ status:'success', house:result, path:'images/',err:err})
        });
    }

};
exports.testSearch = function(req, res){
    searchTxt(req.body.words,function(result){
        res.send('test', {result:result});
    });
};
exports.test = function(req, res){
        res.render('test');
};

function searchTxt(str,callback){
    userProvider.find({},{},function(err,result){
        console.log('number:'+result.length);
    });
    console.log({ tags:str});
    userProvider.find({ tags:str},{},function(err,result){
        if(err){console.log('search err:',err); callback(err.message);}
        console.log("the search result is :");
        if(result){
            result.forEach(function (data,index){//依次输出查询结果
                console.log((index+1)+" : ",data);
            });
            callback(result);
        }
    });
}