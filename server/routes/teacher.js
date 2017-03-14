var express = require('express');
var router = express.Router();
var db = require('../models/db')
var fs = require("fs")

router.post('/tchCreateTopic',(req,res) => {
	//console.log(req.body)
	var newTopic = new db.topics(req.body)//获得创建新题目的数据
	var newTopicId = newTopic.createTopic((err,newTopicId)=>{
		if(err)res.send({state: 0})//如果数据库存储失败
		else res.send({state: 1,   //存储成功就发送新建题目的序号
					   _id: newTopicId})
	})
	
})


//http就是这样无状态的 一次请求一次发送的
router.post('/tchConfirmStudent',(req,res) => {
	var tchId = req.body.teacherId
	var stuId = req.body.studentId
	var topicId = req.body.topicId
	console.log(tchId)
	console.log(stuId)
	console.log(topicId)
	db.mentors.find({_id: tchId},['notification']).exec()
	  .then((notification)=> console.log(`${tchId}: ${notification}`))
	  .catch((err)=> console.log(err))
	
	db.topics.findOne({_id:topicId}).exec()
	  .then((topic)=>{
	  	if(topic.isselected)
	  		{res.send('题目已经选好学生了');/*console.log('题目已经选好学生了')*/}
	  	else{
	  		db.students.findOneAndUpdate({_id: stuId},{$set: {isselected: true, mentor: tchId, final: topicId}},{new: true}).exec()
	  	 	db.topics.findOneAndUpdate({_id: topicId},{$inc: {available: -1},$push: {finalstudents: stuId}},{new: true}).exec()
	 		.then((topic)=>{
	  		if(topic.available == 0)
	            db.topics.findOneAndUpdate({_id: topicId},{$set: {isselected: true}},{new: true}).exec()
	            .then((topic)=>{
	            	db.mentors.findOneAndUpdate({_id: tchId},{$pull: {eventstack:topic._id}, $set:{notification: null}},{new: true}).exec() 
	            	})
	       		})
	  		.catch((err)=>console.log(err))
	  	 }
	})
})

/*老师要拿到待选学生的数据*/
var time = 0
router.post('/tchGetTopics',(req,res)=>{
  var tchId = req.body.teacherId
  var cardData = []
  console.log(tchId)
  time++
  db.mentors.findOne({_id: tchId})
            .populate('eventstack')
            .exec()
            .then((mentor)=>{
            	//console.log(mentor)
            	Promise.all(mentor.eventstack.map(topic=> fillCardData(topic,cardData)))
            	   .then(()=>{
            	   	res.send(cardData)
            	//   	console.log(cardData)
            	   })
            	})

    function fillCardData(topic,cardData){
     return new Promise((resolve, reject)=>{
            db.topics.findOne({_id: topic._id},['_id','category','title','available','firststudents'])
                         .populate('firststudents','name gender gpa intro ')
                         .exec((err,topic)=>{
                          	if(topic)
                          	{
                          		cardData.push(topic)
                          		resolve(topic)
                          	}
                          	else
                          		reject(err)
                         })
                })
        }
})

router.post('/tchDeleteTopic',(req, res)=>{
	var tchId   = req.body.teacherId
	var topicId = req.body.topicId

	db.topics.removeTopic(topicId)
	db.mentors.findOneAndUpdate({_id: tchId},
		                        {$pull: {topics: topicId}},
		                        {new: true}
		                        ).exec((err, mentor)=>{
		                        	if(err)res.send(404)
		                        	if(mentor)res.send('delete topic success')
		                        })
})


router.post('/tchSelectionResult',(req, res)=>{
  var tchId = req.body.teacherId
  var cardData = []
  console.log(tchId)
  db.mentors.findOne({_id: tchId})
            .populate('topics')
            .exec()
            .then((mentor)=>{
            	Promise.all(mentor.topics.map(topic=> fillCardData(topic,cardData)))
            	   .then(()=>{
            	   	res.send(cardData)
            	   //	console.log(cardData)
            	   })
            	})

    function fillCardData(topic,cardData){
     return new Promise((resolve, reject)=>{
            db.topics.findOne({_id: topic._id},['_id','finalstudents',' category','title','restriction'])
                         .populate('finalstudents','_id tel qq wechat name gender email')
                         .exec((err,topic)=>{
                          	if(topic)
                          	{
                          		//console.log(topic)
                          		cardData.push(topic)
                          		resolve(topic)
                          	}
                          	else
                          		reject(err)
                         })
                })
        }

})

router.post('/tchGetCreatedTopics',(req,res)=>{
	//console.log(tchId)
	var tchId = req.body.teacherId
	console.log(tchId)
	db.mentors.findOne({_id:tchId},'topics')
	          .populate('topics','_id category title details restriction')
	          .exec( (err,mentor)=>{
	          	    console.log(mentor.topics)
	          	    if(mentor)
	          		res.send(mentor.topics)
	          	    else res.send(404)

	          })
	          	
})

/*填写导师的联系信息*/
router.post('/tchSetContactData',(req,res) => {
	var tchId = req.body.account
	db.mentors.findOneAndUpdate({_id: tchId},
		                         {$set: 
		                              {'tel':req.body.tel, 'email':req.body.email, 'qq':req.body.qq, 
		                               'wechat': req.body.wechat, 'office':req.body.office,
		                               'classratio': req.body.classratio, 'fields':req.body.fields}},{new: true})
	                                   .exec(function(err,mentor){
	                             		      if(err)res.send(err)
	                             		      else res.send('success')
                                        })
})
module.exports = router