//注册逻辑 

/*
用户名 密码不能为空
重复密码要和密码一致
用户名未注册过（数据库查询操作）

*/

var express = require('express');
var router = express.Router();
var User = require('../models/User');//引入数据库操作模型

//定义返回数据格式  这个文件可能会有多个返回数据的请求  则不用每次定义
var responseData;
router.use(function(req,res,next){
    responseData = {
        code:0,//默认为0  代表没有错误
        message:''//当code 不为0 的时候 代表错误信息 
    }
    next();
})
router.post('/user/register',function(req,res,next){
   console.log(req.body);
   var username = req.body.username;
   var password = req.body.password;
   var rePassword = req.body.rePassword;
   if(username == ''){
       responseData.code = 1;
       responseData.message = '用户名不能为空';
       res.json(responseData);
       return;
   }
   if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(rePassword != password){
        responseData.code = 3;
        responseData.message = '两次输入密码不一致';
        res.json(responseData);
        return;
    }

    User.findOne({
        username:username,
    }).then(function(userInfo){
        if(userInfo){
            //数据库存在该信息 不存在的话 值为null
            responseData.code = 4;
            responseData.message = '该用户名已存在';
            res.json(responseData);
            return;
        }
        //数据库 保存
        var user = new User({
          username : username,
          password : password  
        });
        return user.save();
    }).then(function (newUserInfo){
        // console.log(newUserInfo);
        responseData.message = '注册成功！';
        res.json(responseData);
    })
   
})

//登录  后台逻辑

router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = '用户名或密码为空';
        res.json(responseData);
        return;
    }
    //查询数据库 
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.message = '登录成功';
        res.json(responseData);
                
    })
})
module.exports = router;
