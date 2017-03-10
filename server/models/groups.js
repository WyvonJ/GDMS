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
    students:   [{type:String, ref: 'students'}]
},{collection: 'groups'})

const groups = mongoose.model('groups',groupsSchema)
exports.groups = groups