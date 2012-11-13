var fs=require("fs");

fs.readdir("/Users/mrj/Downloads/backupBlog/sql/", function (err, files) {//读取文件夹下文件
    var count = files.length,
        tmpResult="";
    files.forEach(function (filename) {
        fs.readFile(filename, function (data) {
            tmpResult+="create database "+filename.split(".")[0]+" default charset=utf8;\n"+"use  "+filename.split(".")[0]+";\n"+"source /home/mrj/sql/"+filename+";\n";//导入数据库
//            tmpResult+="use  "+filename.split(".")[0]+";\n"+"source /home/mrj/sql/"+filename+";\n";
//            tmpResult+="mysqldump -uroot -pwitmobpassword "+filename.split(".")[0]+" >conf/"+filename+";\n";//导出数据库
            count--;
            if (count <= 0) {
                console.log(tmpResult);
            }
        });
    });
});
