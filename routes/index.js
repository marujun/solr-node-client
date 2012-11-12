var HouseProvider = require("../config/houseProvider").houseProvider;
var houseProvider = new HouseProvider();
var BinaryProvider = require("../config/BinaryProvider.js").BinaryProvider;
var binaryProvider = new BinaryProvider();
var solr = require('solr-client');

var client = solr.createClient('124.207.0.21','8983','','/solr/soufun');
client.autoCommit = true;

exports.index = function(req, res){
    client.search("q=imageType:*&rows=1000",function(err,response){
        if(err){console.log(err);
            res.send( { status:'failed',err:err.message});
        }else{ console.log('Solr response:', JSON.stringify(response));
            res.render('demo', { status:'success',house:response.response.docs,numFound:response.response.numFound,path:'images/'});
        }
    });
//   houseProvider.find({},{},function(err,result){
//       res.render('demo', { house:result,path:'images/'});
//    });
};
exports.search = function(req, res){
    var words=req.body.words;
    client.search("q="+words,function(err,response){
        if(err){console.log(err);
            res.send( { status:'failed',err:err.message});
        }else{ console.log('Solr response:', JSON.stringify(response));
            res.send( { status:'success',house:response.response.docs,numFound:response.response.numFound,path:'images/'});
        }
    });
};