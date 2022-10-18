var express      = require('express')
var cookieParser = require('cookie-parser')
var util = require('util');
 
var app = express()
app.use(cookieParser())
 
app.get('/cookie', function(req, res) {
    console.log("Cookies: " + util.inspect(req.cookies));
    res.send('解析cookie成功');
})
 
app.listen(8080)