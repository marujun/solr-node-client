/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-11-15
 * Time: 下午1:29
 * To change this template use File | Settings | File Templates.
 */

var UserProvider=require('../config/userProvider.js').userProvider;
var userProvider=new UserProvider;
//var keywords={$in: [2,4,6]};
var keywords={$regex:".*?"+"王2"+".*"};
userProvider.find({ tags:{$regex:keywords}},{},function(err,result){
    if(err){console.log('search err:',err); }
    console.log("the search result is :");
    if(result.length>0){
        for(var i=0;i<10;i++){
            console.log((i+1)+" : ",result[i]);
        }
    }
    console.log('共查询到'+result.length+'条记录');
});





