var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Classify = require('../models/Classify');
var Content = require('../models/Content');

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
        // console.log(Responsedata.message);
        // console.log(users);
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
            console.log(fs);
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
// Classify.find().then(function(classify){
//     router.post('/classify/handle',function(req,res){
//         // console.log(req.body);
//         Responsedata.message = classify;
//         console.log(classify);
//         res.json(Responsedata);
//     })
// })

router.post('/classify/handle',function(req,res){
    Classify.find().then(function(classify){
    // console.log(req.body);
    Responsedata.message = classify;
    console.log(Responsedata.message);
    res.json(Responsedata);
    })
})
router.post('/classify/modify',function(req,res){
    console.log(req.body);
    var name = req.body.name;
    var oldname = req.body.oldname;
    Classify.findOne({name:oldname}).then(function(fs){
        console.log(fs);
        fs.name = name;
        fs.save();
        Responsedata.message = '修改成功';

        res.json(Responsedata);
    })
   
})
router.post('/classify/delete',function(req,res){
    console.log(req.body);
    var name = req.body.name;
    Classify.deleteOne({name:name}).then(function(){
        Responsedata.message = '删除成功';
     
        res.json(Responsedata);
    });
    
})

router.post('/content',function(req,res){
    Classify.find().then(function(classify){
    console.log(req.body);
    Responsedata.message = classify;
    res.json(Responsedata);
    })
})
router.post('/content/add',function(req,res){
    if(req.body.title == '' || req.body.content == ''){
        Responsedata.code = 1;
        Responsedata.message = '必填项不能为空';
    }
    else{
        new Content({
            classify:req.body.id,
            title:req.body.title,
            content:req.body.content
        }).save().then(function(rs){
            Responsedata.message = '保存成功';
        })
    }
    console.log(req.body);
    res.json(Responsedata);
})

router.post('/content/handle',function(req,res){
    Content.find().populate('classify').then(function(contents){
        // console.log(contents);
        Responsedata.message = contents;
        res.json(Responsedata);
    })
})
router.post('/content/delete',function(req,res){
    console.log(req.body);
    var id = req.body.id;
    Content.deleteOne({_id:id}).then(function(){
        Responsedata.message = '删除成功';
         res.json(Responsedata);
    });
    
})
module.exports = router;
