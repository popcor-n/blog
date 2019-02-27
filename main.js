var express = require('express');
var static = require('express-static');
var mongoose = require('mongoose');
var server = express();
var bodyPaser = require('body-parser');
var cookies = require('cookies');
var User = require('./models/User');


// server.use('/a',express.static(__dirname + './public'));
// server.use(static(__dirname+'/dist'));
server.get('/',function(req,res,next){
    res.send('dasds');
})
// mongoose.set('bufferCommands', false);
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true},function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        server.listen(8081);

    }
})


//设置body-parser 可以解析 json 表单两种类型的数据
server.use(bodyPaser.urlencoded({extended:true}));
server.use(bodyPaser.json());

//设置 cookie
// server.use( function(req,res,next){
//     req.cookies = new cookies(req,res);
//     // console.log(req.cookies);
//     next();
// } )
server.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header(" Access-Control-Allow-Credentials", true )
    next();
});
server.use('/api',require('./routers/api'));
server.use('/admin',require('./routers/admin'));
server.use('/main',require('./routers/main'));

  
