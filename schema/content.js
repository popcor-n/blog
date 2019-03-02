var mongoose = require('mongoose');
//定义 内容结构
module.exports =  new  mongoose.Schema({

    //关联字段：
    classify:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Content'
    },
    //分类名
    title:String,
    //内容
    content:{
        type:String,
        default:''
    },
    oldcontent:{
        type:String,
        default:''
    }
})
