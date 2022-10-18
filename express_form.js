var express = require('express');
var bodyParser = require('body-parser')
var app = express();

//create application/json parser
var jsonParser = bodyParser.json()

//create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/assets', express.static('assets'));

app.get('/index_get.html', function (req, res) {
    res.sendFile(__dirname + "/assets/html/" + "index_get.html");
})

app.get('/index_post.html', function (req, res) {
    res.sendFile(__dirname + "/assets/html/" + "index_post.html");
})

app.get('/process_get', function (req, res) {
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/process_post_json', jsonParser, function (req, res) {
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("服务器地址为 http://%s:%s", host, port)
})