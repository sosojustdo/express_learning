var express = require('express');
var bodyParser = require('body-parser')
var multer = require('multer');
const path=require("path");

var app = express();

app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/index_file.html', function (req, res) {
    res.sendFile(__dirname + "/assets/html/" + "index_file.html");
})

let uploadFile = function (req, res, next) {
    //获取绝对路径
    let fullPath = __dirname + "/assets/files/"
    //设置文件的名称
    let filename="";
    let storage=multer.diskStorage({
        //设置存储路径
        destination:(req,file,cb)=>{
            console.log("destination:",file);//打印结果如下图
            cb(null,fullPath);
        },
        //设置存储的文件名
        filename:(req,file,cb)=>{
            console.log("filename:",file);//打印结果如下图
            //获取文件的扩展名
            let extname=path.extname(file.originalname);
            filename=file.originalname+"-"+Date.now()+extname;
            cb(null,filename);
        }
    })
    let upload = multer({ storage }).array('image');
    upload(req,res,(err)=>{
        if (err instanceof multer.MulterError) {
            res.send("multererr:"+err);
        }else if(err){
            res.send("err:"+err);
        }else{
            //上传成功后，将图片写在req.body.photo中，继续住下执行
            req.body.photo=filename;
            next();
        }
    })
}

app.post('/file_upload', uploadFile, (req,res)=>{
    console.log(req.body);
    //将req.body里的数据存储到数据库
    res.send("文件上传成功");
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("服务器地址为 http://%s:%s", host, port)
})