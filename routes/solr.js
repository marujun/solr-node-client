//     http://lbdremy.github.com/solr-node-client/
var solr = require('solr-client');

var client = solr.createClient('124.207.0.21', '8983', '', '/solr/soufun');
client.autoCommit = true;


//client.add({id:"12", simple:"fred",name:"witmob 1001",cat:"test"},function(err,obj){
//    if(err){console.log(err);
//    }else{console.log('Solr response:' , obj);}
//});
var query = client.createQuery()
    .q('西园')
//    .qf({title_t : 0.2 , description_t : 3.3})
    .start(0)
    .rows(10);
client.search(query,function(err,obj){
    if(err){
        console.log(err);
    }else{
        console.log(JSON.stringify(obj));
    }
});

//client.search("q=fred", function (err, res) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('Solr response:', JSON.stringify(res));
//    }
//    console.log(res.response.docs, res.response.numFound, res.response.start)
//});

//client.deleteByID ("fred",function(err,res){
//    if(err){console.log(err);
//    }else{console.log('Solr response:', JSON.stringify(res));}
//});


//client.deleteByRange("manu","a","b",function(err,res){
//    if(err){console.log(err);
//    }else{ console.log('Solr response:', JSON.stringify(res));}
//});

//client.deleteByQuery("name:witmob",function(err,res){
//    if(err){console.log(err);
//    }else{ console.log('Solr response:', JSON.stringify(res));}
//});


//client.ping(function(err,obj){
//    if(err){console.log(err);
//    }else{console.log(obj);}
//});


//    <copyField source="purpose" dest="text"/>
//    <copyField source="address" dest="text"/>
//    <copyField source="developer" dest="text"/>
//    <copyField source="telnum" dest="text"/>
//    <copyField source="price" dest="text"/>