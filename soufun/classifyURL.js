var http = require('http');
var iconv = require('iconv-lite');
var url=require('url');
var ObjectID = require('mongodb').ObjectID;
var DomainProvider = require("../config/domainProvider.js").domainProvider;
var domainProvider = new DomainProvider();


var html = "";
var getURL = url.parse('http://bj.soufun.com/');
var classify=['商圈','价格','地铁沿线','环线','物业类型'];//分类搜索
var link={};
var req =http.get(getURL, function (res) {
    res.setEncoding('binary');//or hex
    res.on('data',function (data) {//加载数据,一般会执行多次
        html += data;
    }).on('end', function () {
            var str=iconv.decode(new Buffer(html,'binary'), 'GBK');//把gbk编码转换成
            var searchStart=str.indexOf('<!-- 楼盘快搜 begin-->');
            var searchEnd=str.indexOf('<!-- 楼盘快搜 end-->');
            var searchArea=str.substring(searchStart,searchEnd);
            parseStr(searchArea,classify,link,function(){});
//            console.log(searchArea);
        })
}).on('error', function(err) {
        console.log("http get error:",err);
    });

function parseStr(str,classify,link,callback){
    var tmp1=str.substring(str.indexOf('hei24">')+7);
    var business=tmp1.substring(0,tmp1.indexOf('li class=')-6);
    var tmp2=tmp1.substring(tmp1.indexOf('hei24">')+7);
    var price=tmp2.substring(0,tmp2.indexOf('li class=')-6);
    var tmp3=tmp2.substring(tmp2.indexOf('hei24">')+7);
    var subway=tmp3.substring(0,tmp3.indexOf('li class=')-6);
    var tmp4=tmp3.substring(tmp3.indexOf('hei24">')+7);
    var surround=tmp4.substring(0,tmp4.indexOf('li class=')-6);
    var tmp5=tmp4.substring(tmp4.indexOf('hei24">')+7);
    var property=tmp5.substring(0,tmp5.indexOf('/ul')-6);

    var list=[business,price,subway,surround,property];
    var nameList=['business','price','subway','surround','property'];
    var tmplist=[];
    for(var i=0;i<list.length;i++){
        var tmpObj={};
        tmpObj.name=classify[i];
        tmpObj.link=list[i].substring(9,list[i].indexOf(' target=')-1);
        var tp=list[i].substring(list[i].indexOf('/a>')+3);
        var houseLink=[];
        while(tp.indexOf('a href=')!=-1){
            var detailedSearch=tp.substring(tp.indexOf('_blank')+8,tp.indexOf('/a>')-1);
            var detailedLink=tp.substring(tp.indexOf('href=')+6,tp.indexOf('target')-2);
            var detailedObj={_id:new ObjectID(),detailedSearch:detailedSearch,detailedLink:detailedLink};
            houseLink.push(detailedObj);
            tp=tp.substring(tp.indexOf('/a>')+3);
        }
        tmpObj.houseLink=houseLink;
        tmpObj._id=new ObjectID();
        tmplist.push(tmpObj);
    }
    console.log('tmplist: ',tmplist);
    for(var j= 0;j<tmplist.length;j++){
        console.log('houseLink: ',tmplist[j].houseLink);
        domainProvider.insert(tmplist[j],{},function(err, result){
            if(err){console.log('error:',err)}
        });
    }

//    console.log(business,price,subway,surround,property);
}
