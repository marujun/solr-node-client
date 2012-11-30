var pageIndex=1;

function search() {
    $.ajax({
        url:'/search',
        type:'post',
        data:{page:1,limit:10,type:'name',words:$('#searchWord')[0].value},
        success:function (result) {
            console.log(result);
            removeDisable();
            if (result.status == 'success' && result.house.length != 0) {
                $('.houseInfo').remove();
                pageIndex=1;
                $('#app').attr({'title':'search'});
                $('#pagelast').attr({'value':result.pages});
                $('#indexP').remove();
                $('<p id="indexP">第1页     共'+result.pages+'页</p>').appendTo('.index');
                for (var i = 0; i < result.house.length; i++) {
                    if (result.house[i].imageID) {
                        $('<div class="houseInfo">' +
                            '<div style="float:left;">' +
                            '<a href="' + result.house[i].houseDetail + '" target="_blank">' +
                            '<img src="' + result.path + result.house[i].imageID + '.' + result.house[i].imageType + '" style="width: 150px;height: 100px"></a>' +
                            '</div>' +
                            '<div style="float:left;margin-left: 60px;margin-top: 10px">' +
                            result.house[i].name + result.house[i].purpose + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + result.house[i].price + '<br/><br/>' +
                            result.house[i].address + '<br/><br/>' +
                            '电话：' + result.house[i].telnum + '<a href="' + result.house[i].map + '" style="margin-left:  20px" target="_blank">地图</a>' +
                            '</div></div>').appendTo('#app');
                    }
                }
            } else {
                if (result.status == 'success') {
                    alert('未搜索到关于"' + $('#searchWord')[0].value + '"的内容')
                }else {
                    alert(result.err);
                }
            }
        }
    });
}
/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-11-16
 * Time: 下午8:46
 * To change this template use File | Settings | File Templates.
 */

function back(){
    if(pageIndex>1){
        removeDisable();
        pageIndex=pageIndex-1;
        postPage(pageIndex,10,'back',$('#app')[0].title);
    }
    if(pageIndex==1){$('#backPage').attr( {'disabled':'disabled'});}
    console.log('pageIndex :  '+pageIndex);
}

function next(){

    var lastPageNumber=$('#pagelast').val();
    if(pageIndex<lastPageNumber){
        removeDisable();
        pageIndex=pageIndex+1;
        postPage(pageIndex,10,'next',$('#app')[0].title);
    }
    if(pageIndex==lastPageNumber){$('#nextPage').attr( {'disabled':'disabled'});}
    console.log('pageIndex :  '+pageIndex);
}

function pageDetail(index,classIndex){
    pageIndex=index;
    removeDisable();
    if(classIndex=='last'){
        $('#nextPage').attr( {'disabled':'disabled'});
        pageIndex=$('#pagelast').val();
    }
    postPage(pageIndex,10,'detail',$('#app')[0].title);
    $("#page"+classIndex).attr( {'disabled':'disabled','style': 'background-color: #f5f5f5;'});
    if(pageIndex==1){$('#backPage').attr( {'disabled':'disabled'}); }
    console.log('pageIndex :  '+pageIndex);
}
function postPage(page,limit,type,title){
    $.ajax({
        url:'/getUserByPage',
        type:'post',
        data:{page:page,limit:limit,type:type,title:title,words:$('#searchWord')[0].value},
        success:function (result) {
            console.log(result);
            if (result.status == 'success' && result.house.length != 0) {
                $('.houseInfo').remove();
                $('#indexP').remove();
                $('<p id="indexP">第'+pageIndex+'页     共'+$('#pagelast').val()+'页</p>').appendTo('.index');
                for (var i = 0; i < result.house.length; i++) {
                    if (result.house[i].imageID) {
                        $('<div class="houseInfo">' +
                            '<div style="float:left;">' +
                            '<a href="' + result.house[i].houseDetail + '" target="_blank">' +
                            '<img src="' + result.path + result.house[i].imageID + '.' + result.house[i].imageType + '" style="width: 150px;height: 100px"></a>' +
                            '</div>' +
                            '<div style="float:left;margin-left: 60px;margin-top: 10px">' +
                            result.house[i].name + result.house[i].purpose + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + result.house[i].price + '<br/><br/>' +
                            result.house[i].address + '<br/><br/>' +
                            '电话：' + result.house[i].telnum + '<a href="' + result.house[i].map + '" style="margin-left:  20px" target="_blank">地图</a>' +
                            '</div></div>').appendTo('#app');
                    }
                }
            } else {
                if (result.status == 'success') {
                    alert('未搜索到关于"' + $('#searchWord')[0].value + '"的内容')
                }else {
                    alert(result.err);
                }
            }
        }
    });
}
function removeDisable(){
    $("#pageone").attr("disabled",false);  $("#pageone").attr("style",false);
    $("#pagetwo").attr("disabled",false);  $("#pagetwo").attr("style",false);
    $("#pagethree").attr("disabled",false);$("#pagethree").attr("style",false);
    $("#pagefour").attr("disabled",false); $("#pagefour").attr("style",false);
    $("#pagefive").attr("disabled",false); $("#pagefive").attr("style",false);
    $("#pagelast").attr("disabled",false); $("#pagelast").attr("style",false);
    $("#backPage").attr("disabled",false);
    $("#nextPage").attr("disabled",false);
}
