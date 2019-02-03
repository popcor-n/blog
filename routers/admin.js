var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next){
    // res.send('后台管理');
    res.redirect('http://localhost:8080/dist/about/about.html')
   
})
module.exports = router;
