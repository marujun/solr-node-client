var http = require('http');
var $=require('jquery');
var iconv = require('iconv-lite');
var url=require('url');
var ObjectID = require('mongodb').ObjectID;
var DetailedProvider = require("../config/detailedProvider.js").detailedProvider;
var detailedProvider = new DetailedProvider();


var html = "";
var getURL = url.parse('http://soufun.com/house/web/Search_Result.php');
var link={};
var count=0;
var req =http.get(getURL, function (res) {
    res.setEncoding('binary');//or hex
    res.on('data',function (data) {//加载数据,一般会执行多次
        html += data;
    }).on('end', function () {
            var str=iconv.decode(new Buffer(html,'binary'), 'GBK');//把gbk编码转换成
            var searchStart=str.indexOf('<!--搜索结果列表 begin-->');
            var searchEnd=str.indexOf('<!--搜索结果列表 end-->');
            var searchArea=str.substring(searchStart,searchEnd);
            parseStr(searchArea,link,function(){});
            countPage(searchArea,function(){});
//            console.log(searchArea);
        })
}).on('error', function(err) {
        console.log("http get error:",err);
    });
function parseStr(str,link,callback){

}
function countPage(str,callback){
    var a=str.substring(str.indexOf('>尾页</')-10,str.indexOf('>尾页</')+5) ;
    console.log(a);
}


