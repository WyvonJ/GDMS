var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.post('/stuCommitSelection',(req,res) => {
	//var selections = req.body//获得创建新题目的数据
	var studentId = req.body.studentId
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

//发送所有选题
router.get('/stuGetTopics',(req, res) =>{
	var query = db.topics.find()
		//query.where('isselected',false)第二次选题的时候才给没有选完的题目
		//第二次选题的时候要把每个题的第几志源选的学生删除了
		query.select({_id: 1, categary: 1, title: 1, details: 1, available: 1, selected: 1})
		query.sort({'_id': 1})
		query.exec((err,topics)=>{
			if(err) {res.send(404),console.log(err)}
			else res.send(topics)
	})
})

/*填写学生的联系信息*/
router.post('/stuSetContactData',(req,res) => {
	var studentId = req.body.account
	//console.log(req.body)
	db.students.findOneAndUpdate({_id: studentId},
		                         {$set: {'tel':req.body.tel, 'email':req.body.email, 'qq':req.body.qq, 'wechat': req.body.wechat, 'intro':req.body.intro}},
		                         {new: true}).exec(function(err,student){
	                             if(err)res.send(err)
	                             	res.send('success')
                                 })
})

/*得到学生选题结果*/
router.post('/stuSelectionResult',(req,res) => {
	var studentId = req.body.studentId
	console.log(studentId)
	var finalData = {}
	db.students.findOne({_id: studentId},['final','mentor', 'isselected'])
	  .populate('final','_id title category details')
	  .populate('mentor','name tel email qq wechat office')
	  .exec()
	  .then((student)=>{
	  	if(student.isselected)
	  	{
	  		finalData =
	  		{ 
	  		    _id:      student.final._id,
	  			category: student.final.category,
	  			title:    student.final.title,
	  			details:  student.final.details,
	  		    name 	: student.mentor.name,
	  		    tel  	: student.mentor.tel,
	  		    email	: student.mentor.email,
	  		    qq   	: student.mentor.qq,
	  		    wechat 	: student.mentor.wechat,
	  		    office	: student.mentor.office
	  		    
	  		}
	  		res.send(finalData)
	  		console.log(finalData)
	  	}
	  	else
	  		res.send('您还没有被一个老师选择')
	  })
})

module.exports = router