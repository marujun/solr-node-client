/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-11-9
 * Time: 下午11:44
 * To change this template use File | Settings | File Templates.
 */
var $=require('jquery');
fs=require('fs');
var BinaryProvider = require("../config/BinaryProvider.js").BinaryProvider;
var binaryProvider = new BinaryProvider();
var HouseProvider = require("../config/houseProvider").houseProvider;
var houseProvider = new HouseProvider();
var ObjectID = require('mongodb').ObjectID;
var http = require('http');
var iconv = require('iconv-lite');
var task = require('./task.js');

task.startTasks([], {},savePage, 724,1259, function(){});

function getHtml(index,callback){
    url = '/house/%B1%B1%BE%A9_________________'+index+'_.htm';
    var options = {
        host: 'soufun.com',
        port: 80,
        path: url
    };

    var html= "";//http获取html字符串
    var pageInfo=[];
    http.get(options, function(res) {
        res.setEncoding('binary');
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            var str = iconv.decode(new Buffer(html,'binary'), 'GBK');
            var dom = $(str);//生成文档树

            var name,purpose,address,developer,price,telnum,imageUrl,houseDetail,map;
            var count=dom.find('div .searchListNoraml').length;
            for(var i=0;i<count;i++){
                imageUrl = dom.find('.photo:eq('+i+') img').first()[0].src;
                houseDetail=dom.find('#houselist:eq('+i+') a' ).first()[0].href;
                name=dom.find('#houselist:eq('+i+') a' ).first()[0].innerHTML;
                purpose=dom.find('#houselist:eq('+i+') span' ).first()[0].innerHTML;
                address=dom.find('#houselist:eq('+i+') dt' ).text().substring(dom.find('#houselist:eq('+i+') dt' ).text().indexOf('] ')+2);
                developer=dom.find('.info:eq('+i+') .s2:eq('+(0)+')').text().replace(/\s+/g,'');
                price=dom.find('.anther .price:eq('+i+')').text().replace(/\s+/g,'');
                telnum=dom.find('.sf_tuan_box:eq('+i+')').text().replace(/\s+/g,'');
                map=dom.find('#houselist:eq('+i+')  .iconmap' ).first()[0].href;
                var house={_id:new ObjectID(),name:name,map:map,houseDetail:houseDetail,purpose:purpose,address:address,developer:developer,price:price,telnum:telnum,imageID:new ObjectID(),imageUrl:imageUrl,page:index,index:i+1};
                pageInfo.push(house);
            }
            callback(pageInfo,'');
        });
    }).on('error', function(e) {
            callback(pageInfo,e.message);
        });
}

function savePage(param, otherData, current, callback){
    getHtml(current+1,function(result,err){
        if(result.length>0){
            console.log('http get the house info successful!');
//            console.log('the house information of page '+(current+1),result);
        }
        if(err){console.log('when get the page '+(current+1)+' information has error :',err)}
        task.startTasks(result, {},saveHouse, 0,result.length, function(){
            callback();
//            setTimeout(function(){callback();},10000);//搜房网对访问有限制
        });
    });
}

function saveHouse(house,otherData, current, callback){
    houseProvider.insert(house, {}, function (err, result) {
        console.log("houseProvider.insert successful! ");
        if(err){console.log('houseProvider.insert error: ',err)}
        saveImage(house.imageUrl,house.imageID,function(){
            console.log('save image successful!');
            callback();
        });
    });
}

function saveImage(url,imageID,callback) {
    var hostName = url.split('/')[2];
    var path = url.substring(url.indexOf(hostName) + hostName.length);
    var options = {
        host:hostName,
        port:80,
        path:path
    };

    http.get(options, function (res) {
        res.setEncoding('binary');
        var imageData = "";
        res.on('data', function (data) {//图片加载到内存变量
            imageData += data;
        }).on('end', function () {//加载完毕保存图片
                var fileType = res.headers["content-type"];
                binaryProvider.write(imageData, fileType, imageID, function (err, result) {
                    if (err) {
                        console.log("binaryProvider.write err: ", err);
                        callback();
                    } else {
                        console.log("binaryProvider.write successful! ");
                        writeImage(imageID);
                        callback();
                    }
                });
            });
    });
}

function writeImage(imageID){
    binaryProvider.read(imageID, function (err, binaryData, fileType) {
        var blockImageFileName = __dirname+'/../public/images/' + imageID + "." + fileType.replace(/image\//, "");
        fs.writeFile(blockImageFileName, binaryData, "binary", function (err, result) {
            if(err){console.log("writeImage err: ", err);
            }else{console.log('writeImage successful!');}
        });
    });
}