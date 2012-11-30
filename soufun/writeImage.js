var HouseProvider = require("../config/houseProvider").houseProvider;
var houseProvider = new HouseProvider();
var BinaryProvider = require("../config/BinaryProvider.js").BinaryProvider;
var binaryProvider = new BinaryProvider();
var task = require('./task.js');
var fs=require('fs');


houseProvider.find({},{},function(err,result){
    task.startTasks(result, {},saveImage, 0,result.length, function(){});
});


function saveImage(house, otherData, current, callback){
//    console.log("house: "+ JSON.stringify(house));
    binaryProvider.read(house.imageID, function (err, binaryData, fileType) {
        if(err){
            houseProvider.remove({_id:house._id}, {safe:true}, function (err, numberOfRemovedDocs) {
                if (err) {console.log("pagesProvider.remove err: ", err);
                } else {console.log("pagesProvider.remove number: "+ numberOfRemovedDocs); }
            });
            binaryProvider.unlink(house.imageID, function (err, result) {
                if (err) {console.log("binaryProvider.unlink err: ", err);
                }else{console.log("binaryProvider.unlink result: "+ result);}
            });
            callback();
        }else{
            if(fileType.replace(/image\//, "")=="text/html"||fileType.replace(/image\//, "")=='application/octet-stream'){
                houseProvider.remove({_id:house._id}, {safe:true}, function (err, numberOfRemovedDocs) {
                    if (err) {console.log("pagesProvider.remove err: ", err);
                    } else {console.log("pagesProvider.remove number: "+ numberOfRemovedDocs); }
                });
                callback();
            }else{
                var blockImageFileName = __dirname+'/../public/images/' + house.imageID + "." + fileType.replace(/image\//, "");
                fs.writeFile(blockImageFileName, binaryData, "binary", function (err, result) {
                    if(err){console.log("writeImage err: ", err);
                    }else{console.log('writeImage successful!');}
                    houseProvider.update({_id:house._id}, {$set:{"imageType":fileType.replace(/image\//, "")}}, {safe:true, multi:true}, function (err, result) {
                        if (err) {console.log("pagesProvider.update err: ", err);
                        } else {console.log("pagesProvider.update number: "+ result); }
                    });
                    callback();
                });
            }
        }
    });
}