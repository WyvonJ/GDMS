var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.post('/stuCommitSelection',(req,res) => {
	//var selections = req.body//获得创建新题目的数据
	var studentId = req.body._id
	var first = req.body.first
	var second = req.body.second
	var third = req.body.third
	console.log(req.body)
	db.students.findOne({_id: studentId}).exec(function(err,student){
		if(err)res.send({state: 0})
		else{
			student.selectTopic('second', second)
			student.selectTopic('first', first)		    
		    student.selectTopic('third', third)
			res.send({state: 1})
		}	
	})
})

module.exports = router