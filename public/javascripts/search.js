function search() {
    $.ajax({
        url:'search',
        type:'post',
        data:{words:$('#searchWord')[0].value},
        success:function (result) {
            console.log(result);
            if (result.status == 'success' && result.house.length != 0) {
                $('.houseInfo').remove();
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
