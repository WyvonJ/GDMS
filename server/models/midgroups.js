/*
*负责处理中期分组的表
*/
var mongoose = require('./mongodb')
var Schema = mongoose.Schema

var students = require('./students').students
var mentors = require('./mentors').mentors

const midGroupsSchema = new Schema({
		_id: 		{type: Number, required:true, unique: true},
    mentors:    [{type:String, ref: 'mentors'}],
    students:   [{type:String, ref: 'students'}],
    //numTopics:  {type:Number}//这组负责答辨的题目数
},{collection: 'midgroups'})

const midgroups = mongoose.model('midgroups',midGroupsSchema)

var newMidGroup = new midgroups({
  _id: 0,
  students:[],
  mentors:[]
})

midgroups.find(null,function(err,doc){
    if(err){
      console.log(err)
    }else if (!doc.length){
      newMidGroup.save()}
   
})



exports.midgroups = midgroups
