/*
*创建studentsmodel即学生表格
*/
var mongoose = require('./mongodb')
var Schema = mongoose.Schema

var topics = require('./topics').topics
var mentors = require('./mentors').mentors
var groups = require('./groups').groups

var studentsSchema = new Schema
({
	_id: 		{type: String, index: 1, required: true, unique: true},//学号
	name: 		{type: String, required: true},//姓名
	password: 	{type: String, required: true},//密码
	gpa: 		{type: Number},//绩点
	tel: 		{type: String}, //电话
	email: 		{type: String},//已选人数
	gender:     {type: String},
	qq:         {type: String},
	wechat:     {type: String},
	first: 		{type: Number, ref: 'topics'},//第一志愿,题目序号做外键,这里外键什么的一定要Schema.Types.ObjectId类型
	second: 	{type: Number, ref: 'topics'},//第一志愿
	third: 		{type: Number, ref: 'topics'},//第一志愿
	final: 		{type: Number, ref: 'topics'},//第一志愿
	mentor: 	{type: String, ref: 'mentors'},
	mentorscore:{type: Number},
	intro:      {type: String},//自我介绍
	group: 		{type: Number, ref: 'groups'},
	finalscore: {type: Number},
	isselected: {type: Boolean, default:false},//这个学生是不是已经选择了题目
	notification: {type: String},//这个学生是不是已经选择了题目
	isfirstlogin: {type:Boolean, default:true}
},{colletion: 'students' })

/*学生选题方法*/
/*topicid 即学生的选题序号,whichApplication第几志愿*/
/*学生选一个并存入志愿中*/
studentsSchema.methods.selectTopic = function(whichApplication,topicid){//这样第一志愿的学生在topic里也有
	this.model('topics').findOne({_id: topicid}).exec(//findOne返回的才是一个对像 find返回的是一个数组
		                  (err,topic)=> {   switch(whichApplication)
		                  					{
		                  						case 'first':
		                  						this.first = topic._id
		         								this.model('topics').findOneAndUpdate({_id: topicid}, 
		         								/*这说明这个题目的第一志愿人是这个人*/{$addToSet: {firststudents: this._id}, $inc:{selected: 1}},
		         																	  {new: true}).exec();
		         								break
		                  					
		                  					    case 'second':
		                  						this.second = topic._id
		                  					    this.model('topics').findOneAndUpdate({_id: topicid}, 
		         								/*这说明这个题目的第二志愿人是这个人*/{$addToSet: {secondstudents: this._id}, $inc:{selected: 1}},
		         																	  {new: true}).exec()
		                  					    break

		                  					    case 'third': 
		                  						this.third = topic._id
		                  					    this.model('topics').findOneAndUpdate({_id: topicid}, 
		         								/*这说明这个题目的第三志愿人是这个人*/{$addToSet: {thirdstudents: this._id}, $inc:{selected: 1}},
		         																	  {new: true}).exec()
		                  					    break
		                  					}
		                  					
		                  			    	this.save()})
}

/*studentsSchema.methods.showApplication = function(whichApplication){
	this.populate(whichApplication)
		.exec(function(err, whichApplication){
			console.log(whichApplication)conso
		})
}*/

const students = mongoose.model('students',studentsSchema)
exports.students = students
