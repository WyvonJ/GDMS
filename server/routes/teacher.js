var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.post('/tchCreateTopic',(req,res) => {
	var newTopic = new db.topics(req.body)//获得创建新题目的数据
	var newTopicId = newTopic.createTopic((err,newTopicId)=>{
		if(err)res.send({state: 0})//如果数据库存储失败
		else res.send({state: 1,   //存储成功就发送新建题目的序号
					   id: newTopicId})
	})
	
})

module.exports = router