var express = require('express');
var static = require('express-static');
var mongoose = require('mongoose');
var server = express();
var bodyPaser = require('body-parser');
// server.use('/a',express.static(__dirname + './public'));
// server.use(static(__dirname+'/dist'));
server.get('/',function(req,res,next){
    res.send('dasds');
})
mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
       
    }
})
server.listen(8081);
server.use(bodyPaser.urlencoded({extended:true}));
server.use(bodyPaser.json());


server.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  server.use('/api',require('./routers/api'));
  server.use('/admin',require('./routers/admin'));

  
