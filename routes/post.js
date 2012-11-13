var http=require('http');
var iconv = require('iconv-lite');

//var userString='dataToServer='+JSON.stringify({index:5,count :10});
var userString=JSON.stringify({index:1,count :10});
console.log( 'req: '+userString);
var headers = {
//    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': userString.length
};
var options = {
    host: 'www.self.com.cn',
    port: 80,
    path: '/app/ps_ipnews/readhome',
    method: 'post',
    headers: headers
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    var html='';
    res.setEncoding('binary');
    res.on('data', function (chunk) {
        html+=chunk;
    });
    res.on('end', function () {
        var resData=iconv.decode(new Buffer(html,'binary'), 'GBK');
        console.log('BODY: ' + resData);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(userString);
req.end();