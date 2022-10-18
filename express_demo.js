var express = require('express');
var app = express();

app.use('/assets', express.static('assets'));

//GET请求
app.get('/', function (req, res) {
   res.send('Hello World Get');
})

//POST请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello World POST');
})

//del_user页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

//list_user页面GET请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})

//对页面abcd,abxcd,ab123cd,等响应GET请求
app.get('/ab*cd', function (req, res) {
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("服务器地址为 http://%s:%s", host, port)
})