var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Classify = require('../models/Classify');
router.get('/',function(req,res,next){
   
    res.redirect('http://localhost:8080/dist/about/about.html')
   
})
var Responsedata;
router.use(function(req,res,next){
    Responsedata = {
        code:0,//无错
        message:''
    }
    next();
})


//用户列表
User.find().then(function(users){
    router.post('/user',function(req,res){
        // console.log(req.body);
        Responsedata.message = users;
        res.json(Responsedata);
    })
})
//博文分类
router.post('/classify',function(req,res){
    // console.log(req.body);
    res.json({req:'getten'});
})
router.post('/classify/add',function(req,res){
    console.log(req.body);
    var name = req.body.name;
    Classify.findOne({
        name:name
    }).then(function(fs){
        if(fs){
            Responsedata.code = 1;
            Responsedata.message = '要添加的分类名称已存在';
        }else{
            var classify = new Classify({
                name:name
            });
            classify.save();
            Responsedata.message = '添加成功！';
        }
        res.json(Responsedata);
    })
})
Classify.find().then(function(classify){
    router.post('/classify/handle',function(req,res){
        // console.log(req.body);
        Responsedata.message = classify;
        res.json(Responsedata);
    })
})
module.exports = router;
