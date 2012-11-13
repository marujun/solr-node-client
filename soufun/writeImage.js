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
    binaryProvider.read(house.imageID, function (err, binaryData, fileType) {
        var blockImageFileName = __dirname+'/../public/images/' + house.imageID + "." + fileType.replace(/image\//, "");
        fs.writeFile(blockImageFileName, binaryData, "binary", function (err, result) {
            if(err){console.log("writeImage err: ", err);
            }else{console.log('writeImage successful!');}
            callback();
        });
        houseProvider.update({_id:house._id}, {$set:{"imageType":fileType.replace(/image\//, "")}}, {}, function (err, result) {
            if (err) {console.log("pagesProvider.update err: ", err);
            } else {console.log("pagesProvider.update result: ", result); }
        });
    });
}