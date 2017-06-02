/*
 *创建mentorsMode即导师表格
 */
const mongoose = require('./mongodb')
const Schema = mongoose.Schema

let students = require('./students').students
let topics = require('./topics').topics
let groups = require('./groups').groups

let mentorsSchema = new Schema({
  _id: { type: String, index: 1, required: true, unique: true }, //工号
  name: { type: String, required: true }, //姓名
  gender: String,
  password: { type: String, required: true }, //密码 required表示一开始存数据的时候就要有
  tel: String, //电话
  email: String, //邮箱
  students: [{ type: String, ref: 'students' }], //指导的学生
  studentsscore: [{ type: Number, ref: 'students' }], //给每个学生打的分数
  group: { type: Number, ref: 'groups' }, //答辨所在的分组
  topics: [{ type: Number, ref: 'topics' }], //导师所出的题
  fields: [{ id: Number, name: String }], //研究方向
  office: String, //办公室地址
  notification: String,
  protitle: { id: Number, name: String }, //导师职称 0助教 1讲师 2副教授 3教授
  qq: String,
  wechat: String,
  salt: String,
  eventstack: [{ type: Number, ref: 'topics' }], //导师需要人工选择学生的题，如果stack里有题的话，就要取stack里题处理
  classratio: { type: Number, default: 50 }, //技术与艺术类别比例：0为偏向艺术,1为偏向技术,默认是不偏不椅
  isfirstlogin: { type: Boolean, default: true }
}, { colletion: 'mentors' })

const mentors = mongoose.model('mentors', mentorsSchema)
exports.mentors = mentors
