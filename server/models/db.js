var mongoose = require('./mongodb')
var topics = require('./topics').topics;
var students = require('./students').students
var mentors = require('./mentors').mentors
var groups = require('./groups').groups
var admins = require('./admins').admins
var step = require('./step').step
var autoIncModel = require('./autoIncModel').autoIncModel
var xlsx = require('node-xlsx')//读取excel文件
var fs = require('fs')//读取文件内容
var  topicsinitialdata = require('../initialdata/topicsinitialdata.json')//初始的课题信息

exports.topics = topics
exports.students = students
exports.mentors = mentors
exports.groups = groups
exports.admins = admins
exports.step = step
exports.autoIncModel = autoIncModel
//exports.connection = mongoose.connection
/*初始化students数据*/
var ImportStudentsData=function(FilePath){
	var excelData = xlsx.parse(FilePath)
	var sheetNum = excelData.length //读取excel中sheet个数
	Promise.all(excelData.map(sheet=>{
		if(sheet.name == '学生' || sheet.name == 'sheet1'){
			var studentsData = sheet.data
			studentsData.shift() //删除excel数组的第一行元素，就是'姓名 学号'
			console.log('开始导入学生初始数据')
			Promise.all(studentsData.map(student=>{
				new students({
					_id: 	 student[0],
					//一个数组 0 1 2 3就分别是学号 姓名 密码 性别
					name: 	 student[1],
					password:student[2],
					gender:  student[3],
					gpa:     student[4],
				//	intro:   student[5]
				}).save()
			})).then(console.log('导入学生初始数据完毕'))
		}else{
			console.log('excel中多余sheet的数据不导入')
		}
	}))
	.then(()=>{
	//	console.log('学生导师数据初始化完成')
	})
}

/*初始化mentors数据*/
var ImportMentorsData=function(FilePath){

	var excelData = xlsx.parse(FilePath)
	var sheetNum = excelData.length //读取excel中sheet个数
	Promise.all(excelData.map(sheet=>{
			if(sheet.name == '导师'||sheet.name == 'Sheet1'){
			var mentorsData = sheet.data
			mentorsData.shift() //删除excel数组的第一行元素，就是'姓名 学号'
			console.log('开始导入导师初始数据')
			Promise.all(mentorsData.map(mentor => {
				new mentors({
					_id: 	  mentor[0],//账号
					name: 	  mentor[1],//姓名
					password: mentor[2],//密码
				//	fields:   mentor[4],//研究邻域
					gender:   mentor[3],//性别
				//	classrate:mentor[5] //技艺比
				}).save()
			})).then(console.log("导师初始数据导入完毕"))
		}else{
			console.log('excel中多余sheet的数据不导入')
		}
	}))
	.then(()=>{
	//	console.log('学生导师数据初始化完成')
	})
}
var makePromise = function(item){//为了让程序一步接一步运行要用promise运行
	return new Promise(function(resolve, reject){
								var topic = new topics(item)
								topic.restriction = topic.available
								topic.initializeTopicsId(function(){
								topic.save(function(err,doc){
															//console.log(doc)
															if(doc) resolve(doc)
															else     reject(err)
															})		
														})
													})
								}

var initialtopics = function(){
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
			.catch((err)=>console.log(err))
		} else {
			console.log('topics have been initialize')
		}
	})
}

var initialTopics = function(){
	setTimeout(initialtopics, 100);//初始化数据要100ms后存，要不存不了，只能用这个办法了
}

var testSelectTopic = function(){
	students.findOne({name:'刘备'}).exec(function(err,student){
		student.selectTopic('first', 2)//刘备的第一志愿选了第二个题目
		
		/*setTimeout(function(){
			topics.findOne({_id: 2})
					   .populate('firststudents')
					   .exec(function(err, students){
					    console.log(students.firststudents[0].name)//要这样访问
					   })
		}, 3000);*/
	})
}


//initialStudentsAndMentors('../initialdata/测试数据.xlsx')
//ImportStudentsData('../initialdata/学生初始数据.xlsx')
//ImportMentorsData('../initialdata/导师初始数据.xlsx')
//initialTopics()
//testSelectTopic()
exports.ImportStudentsData = ImportStudentsData
exports.ImportMentorsData = ImportMentorsData
//mongoose.disconnect()

