var mongoose = require('./mongodb')
var topics = require('./topics').topics;
var students = require('./students').students
var mentors = require('./mentors').mentors
var groups = require('./groups').groups
var xlsx = require('node-xlsx')//读取excel文件
var fs = require('fs')//读取文件内容
var  topicsinitialdata = require('../initialdata/topicsinitialdata.json')//初始的课题信息

exports.topics = topics
exports.students = students
exports.mentors = mentors
exports.groups = groups

/*初始化students mentors数据*/
exports.initialStudentsAndMentors=function(initialDataFilePath){

	var excelData = xlsx.parse(initialDataFilePath)
	var sheetNum = excelData.length //读取excel中sheet个数
	for(var sheet in excelData)
	{
		if(excelData[sheet]['name'] == '学生'){
			var studentsData = excelData[sheet].data
			studentsData.shift() //删除excel数组的第一行元素，就是'姓名 学号'
			for(var i in studentsData){
				new students({
					_id: 	 studentsData[i][0],//一个数组 0 1 2 3就分别是学号 姓名 密码 性别
					name: 	 studentsData[i][1],
					password:studentsData[i][2],
					gender:  studentsData[i][3]
				}).save()//保存学生的初始数据
			}//每次save就是往数据库中插入新数据
		}else if(excelData[sheet]['name'] == '导师'){
			var mentorsData = excelData[sheet].data
			mentorsData.shift() //删除excel数组的第一行元素，就是'姓名 学号'
			for(var i in mentorsData){
				new mentors({
					_id: 	 mentorsData[i][0],
					name: 	 mentorsData[i][1],
					password:mentorsData[i][2],
					gender:  mentorsData[i][3]
				}).save()
			}
		}else{
			console.log('excel中多的数据暂时不用')
		}	
	}

}

var makePromise = function(item){//为了让程序一步接一步运行要用promise运行
	return new Promise(function(resolve, reject){
								var topic = new topics(item)
								topic.initializeTopicsId(function(){
								topic.save(function(err,doc){
															//console.log(doc)
															if(doc) resolve(doc)
															else     reject(err)
															})		
														})
													})
								}

initialtopics = function(){
	topics.find(null,function(err,doc){
		if(err){
			console.log(err)
		}else if (!doc.length) {
			console.log('Datebase opens for the first time...')
			/*Promise.all(topicsinitialdata.map(item=>{ var topic = new topics(item)
													      topic.initializeTopicsId(function(){
													      topic.save()
													      })}))*/
			Promise.all(topicsinitialdata.map(item=> makePromise(item)))
			.then(()=>console.log('Initializetopics successfully.'))
			.catch(()=>console.log('Something went wrong during initializ topics.'))
		} else {
			console.log('topics have been initialize')
		}
	})
}

exports.initialTopics = function(){
	setTimeout(initialtopics, 100);//初始化数据要100ms后存，要不存不了，只能用这个办法了
}

var testSelectTopic = function(){
	students.findOne({name:'刘备'}).exec(function(err,student){
		student.selectTopic('first', 2)//刘备的第一志愿选了第二个题目
		
		setTimeout(function(){
			topics.findOne({_id: 2})
					   .populate('firststudents')
					   .exec(function(err, students){
					    console.log(students.firststudents[0].name)//要这样访问
					   })
		}, 3000);
	})
}


//initialTopics()
//setTimeout(testSelectTopic, 3000)


//db.initialStudentsAndMentors('../initialdata/测试数据.xlsx')
//mongoose.disconnect()

