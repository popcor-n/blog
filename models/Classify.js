/* 
博文分类的模型 在操作数据库的时候不是直接操作用户结构 而是操作模型 模型又是以用户结构为基础的  
*/
var mongoose = require('mongoose');
//引入用户表结构
var classifySchema = require('../schemas/classify.js');
//输出模块         创建模型
module.exports = mongoose.model('Classify',classifySchema);