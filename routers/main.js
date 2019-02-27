var express = require('express');
var router = express.Router();
var Classify = require('../models/Classify');
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
module.exports = router;
