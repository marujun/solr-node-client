/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-11-15
 * Time: 上午10:03
 * To change this template use File | Settings | File Templates.
 */
var UserProvider=require('../config/userProvider.js').userProvider;
var userProvider=new UserProvider;
var task=require('../soufun/task.js');

//task.startTasks([],{}, insertTxt, 0, 200000, function(){});
//function insertTxt(param, otherData, index, callback){
//    userProvider.insert({name:'王'+index,number:15210011001+index,tags:['王'+index,(15210011001+index).toString()]},{},function(err,result){
//        if(err){console.log('insert err:',err);}
//        if(result){console.log(result,'insert success'+index);}
//        callback();
//    });
//}
var  str='';
var tags = str.split(/\s+|\.+|,+/);//用逗号，空格，句号分隔开
for(var i=0;i<=2000000;i++){
    insertTxt(i)
}

function insertTxt(index){
    userProvider.insert({name:'王'+index,number:15210011001+index,tags:['王'+index,(15210011001+index).toString()]},{},function(err,result){
        if(err){console.log('insert err:',err);}
        if(result){console.log(result,'insert success'+index);}
    });
}

