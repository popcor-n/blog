var express = require('express');
var router = express.Router();
var User = require('../models/User');
router.get('/',function(req,res,next){
   
    res.redirect('http://localhost:8080/dist/about/about.html')
   
})
router.use(function(req,res,next){
    Responsedata = {
        code:0,//无错
        message:''
    }
    next();
})
User.find().then(function(users){
    router.post('/user',function(req,res){
        console.log(req.body);
        Responsedata.message = users;
        res.json(Responsedata);
    })
})

module.exports = router;
