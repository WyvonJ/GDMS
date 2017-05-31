/*
 *负责处理组别的表
 */
const mongoose = require('./mongodb')
const Schema = mongoose.Schema

let students = require('./students').students
let mentors = require('./mentors').mentors

const groupsSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true
  },
  mentors: [{ type: String, ref: 'mentors' }],
  students: [{ type: String, ref: 'students' }],
  topics: [{ type: Number, ref: 'topics' }],
  fields: [{ type: String }],
  //numTopics:  {type:Number}//这组负责答辨的题目数
}, { collection: 'groups' })

exports.groups = mongoose.model('groups', groupsSchema)
