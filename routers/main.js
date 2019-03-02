var express = require('express');
var router = express.Router();
var Classify = require('../models/Classify');
var Content = require('../models/Content');

router.use(function(req,res,next){
    Responsedata = {
        code:0,//无错
        message:''
    }
    next();
})

router.post('/nav',function(req,res){
    Classify.find().then(function(classify){
    // console.log(req.body);
        Responsedata.message = classify;
        res.json(Responsedata);
    })
})
router.post('/content',function(req,res){
    Content.find().sort({_id:-1}).then(function(con){
    // console.log(req.body);
        Responsedata.message = con;
        res.json(Responsedata);
    })
})
router.post('/content/class',function(req,res){
    console.log(req.body.req);
    Content.find({classify:req.body.req}).sort({_id:-1}).then(function(con){
    // console.log(req.body);
        Responsedata.message = con;
        res.json(Responsedata);
    })
})
module.exports = router;
