var solr = require('solr-client');
var HouseProvider = require("../config/houseProvider").houseProvider;
var houseProvider = new HouseProvider();
var BinaryProvider = require("../config/BinaryProvider.js").BinaryProvider;
var binaryProvider = new BinaryProvider();
var task = require('./task.js');

var house={};
var client = solr.createClient('192.168.1.19','8983','','/solr/soufun');
client.autoCommit = true;

houseProvider.find({},{},function(err,result){
    task.startTasks(result, {},addSolr, 0,result.length, function(){});
});

function addSolr(param, otherData, current, callback){
    client.add(param,function(err,obj){
        console.log(JSON.stringify(param));
        if(err){console.log('add data to solr error: ',err);
        }else{ callback();}
    });
}


//    <field name="_id" type="string" indexed="true" required="true"  stored="true" />
//    <field name="name" type="textSimple" indexed="true" stored="true" />
//    <field name="map" type="string" indexed="true" stored="true" />
//    <field name="houseDetail" type="string" indexed="true" stored="true" />
//    <field name="purpose" type="string" indexed="true" stored="true" />
//    <field name="address" type="string" indexed="true" stored="true" />
//    <field name="developer" type="string" indexed="true" stored="true" />
//    <field name="price" type="string" indexed="true" stored="true" />
//    <field name="telnum" type="string" indexed="true" stored="true" />
//    <field name="imageID" type="string" indexed="true" stored="true" />
//    <field name="imageUrl" type="string" indexed="true" stored="true" />
//    <field name="page" type="string" indexed="true" stored="true" />
//    <field name="index" type="string" indexed="true" stored="true" />
//    <field name="imageType" type="string" indexed="true" stored="true" />