var topics = require('./models/topics').topics;
var students = require('./models/students').students
var mentors = require('./models/mentors').mentors
var groups = require('./models/groups').groups
const topicsinitialdata=require('./initialdata/topicsinitialdata.json')

const initialize=function(){
	topics.find(null,function(err,doc){
		if(err){
			console.log(err)
		}else if (!doc.length) {
			console.log('Datebase opens for the first time...')
			/*var topic = new topics({
									category:1,
									title:"新网络漏洞的发现与研究",
									details:"网络，操作系统的新漏洞。",
									available:2,
									selected:0,
									field:"信息安全"})
			topic.save(function(error, doc){
				if(error)
					console.log(error)
				else
					console.log(doc)
			})*/
			Promise.all(topicsinitialdata.map(item=>new topics(item).save()))
			.then(()=>console.log('Initialize successfully.'))
			.catch(()=>console.log('Something went wrong during initializing.'))
		} else {
			Models.initialized=true
		}
	})
}

initialize();



//module.exports=Models