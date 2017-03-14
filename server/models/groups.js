/*
*负责处理组别的表
*/
var mongoose = require('./mongodb')
var Schema = mongoose.Schema

var students = require('./students').students
var mentors = require('./mentors').mentors

const groupsSchema = new Schema({
	_id: 		{type: Number, required:true, unique: true},
    mentors:    [{type:String, ref: 'mentors'}],
    students:   [{type:String, ref: 'students'}],
    topics:     [{type:Number, ref: 'topics'}],
    fields:     [{type:String}],
    //numTopics:  {type:Number}//这组负责答辨的题目数
},{collection: 'groups'})

const groups = mongoose.model('groups',groupsSchema)
exports.groups = groups