var db = require('../models/db')

var topicData ={
	    "category":1,
		"title":"云计算研究",
		"details":"云计算，新的未来",
		"available":2,
		"selected":0,
		"fields":"云计算"
}

//var newTopic = new db.topics(topicData)


//db.initialTopics()
//setTimeout(function(){}, 10000) 

db.initialStudentsAndMentors('../initialdata/测试数据.xlsx')
//newTopic.createTopic(function(err,results){
	//console.log(err)
	//console.log(results)
//})
//db.topics.removeTopic(7)

