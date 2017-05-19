/*
 *创建mentorsMode即导师表格
 */
const mongoose = require('./mongodb')
let Schema = mongoose.Schema

//let students = require('./students').students
//let topics = require('./topics').topics
//let groups = require('./groups').groups

let adminsSchema = new Schema({
  _id: { type: String }, //工号
  account: { type: String, default: 'admin' },
  name: { type: String }, //姓名
  password: { type: String, required: true, default: 'admin' }, //密码 required表示一开始存数据的时候就要有
  tel: { type: String }, //电话
  email: { type: String }, //邮箱
  notification: { type: String },
  eventstack: [{ type: Number }], //导师需要人工选择学生的题，如果stack里有题的话，就要取stack里题处理
  isfirstlogin: { type: Boolean, default: true }
}, { colletion: 'admins' })

const admins = mongoose.model('admins', adminsSchema)

let newAdMin = new admins({
  _id: 'admin',
  account: 'admin',
  password: '10086',
  name: '管理员'
})

admins.find(null, function(err, doc) {
  if (err) {
    console.log(err)
  } else if (!doc.length) {
    newAdMin.save()
  } else {
    console.log('There is admin in database')
  }
})

exports.admins = admins
