var fs=require("fs");

fs.readdir("/Users/mrj/Downloads/sql/", function (err, files) {//读取文件夹下文件
    var count = files.length,
        tmpResult="";
    files.forEach(function (filename) {
        fs.readFile(filename, function (data) {
            tmpResult+="use  "+filename.split(".")[0]+";\n"+"source /home/mrj/sql/"+filename+";\n";
            count--;
            if (count <= 0) {
                console.log(tmpResult);
            }
        });
    });
});