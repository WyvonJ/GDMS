const mongoose = require('./mongodb')
const xlsx = require('node-xlsx') //读取excel文件
const fs = require('fs') //读取文件内容
const sha1 = require('sha1')
const rand = require('csprng')

let topics = require('./topics').topics
let students = require('./students').students
let mentors = require('./mentors').mentors
let groups = require('./groups').groups
let admins = require('./admins').admins
let step = require('./step').step
let autoIncModel = require('./autoIncModel').autoIncModel
let topicsinitialdata = require('../initialdata/topicsinitialdata.json') //初始的课题信息

exports.topics = topics
exports.students = students
exports.mentors = mentors
exports.groups = groups
exports.admins = admins
exports.step = step
exports.autoIncModel = autoIncModel
  //exports.connection = mongoose.connection
  /*初始化students数据*/
let ImportStudentsData = function(FilePath) {
  let excelData = xlsx.parse(FilePath)
  let sheetNum = excelData.length //读取excel中sheet个数
  Promise.all(excelData.map(sheet => {
    if (sheet.name == '学生' || sheet.name == 'sheet1') {
      let studentsData = sheet.data
      studentsData.shift() //删除excel数组的第一行元素，就是'姓名 学号'
      Promise.all(studentsData.map(student => {
          let salt = rand(160, 36)
          new students({
            _id: student[0],
            //一个数组 0 1 2 3就分别是学号 姓名 密码 性别
            name: student[1],
            password: sha1(student[2] + salt),
            gender: student[3],
            gpa: student[4],
            salt: salt
              //  intro:   student[5]
          }).save()
        }))
        .then(console.log('导入学生初始数据完毕'))
    } else {
      console.log('excel中多余sheet的数据不导入')
    }
  }))
}

/*初始化mentors数据*/
let ImportMentorsData = function(FilePath) {

  let excelData = xlsx.parse(FilePath)
  let sheetNum = excelData.length //读取excel中sheet个数
  Promise.all(excelData.map(sheet => {
      if (sheet.name == '导师' || sheet.name == 'Sheet1') {
        let mentorsData = sheet.data
        mentorsData.shift()
        Promise.all(mentorsData.map(mentor => {
          let salt = rand(160, 36)
          new mentors({
            _id: mentor[0], //账号
            name: mentor[1], //姓名
            password: sha1(mentor[2] + salt), //密码
            gender: mentor[3], //性别
            salt:salt
          })
          .save()
        }))
        .then(console.log("导师初始数据导入完毕"))
      } else {
        console.log('excel中多余sheet的数据不导入')
      }
    }))
}
let makePromise = function(item) { //为了让程序一步接一步运行要用promise运行
  return new Promise(function(resolve, reject) {
    let topic = new topics(item)
    topic.restriction = topic.available
    topic.initializeTopicsId(function() {
      topic.save(function(err, doc) {
        //console.log(doc)
        if (doc) resolve(doc)
        else reject(err)
      })
    })
  })
}

let initialtopics = function() {
  topics.find(null, function(err, doc) {
    if (err) {
      console.log(err)
    } else if (!doc.length) {
      console.log('Datebase opens for the first time...')
      Promise.all(topicsinitialdata.map(item => makePromise(item)))
        .then(() => console.log('Initializetopics successfully.'))
        .catch((err) => console.log(err))
    } else {
      console.log('topics have been initialize')
    }
  })
}

let initialTopics = function() {
  setTimeout(initialtopics, 100); //初始化数据要100ms后存，要不存不了，只能用这个办法了
}

let testSelectTopic = function() {
  students.findOne({ name: '刘备' }).exec(function(err, student) {
    student.selectTopic('first', 2) //刘备的第一志愿选了第二个题目

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
//ImportMentorsData('../server/initialdata/导师初始账号数据.xlsx')
//initialTopics()
//testSelectTopic()
exports.ImportStudentsData = ImportStudentsData
exports.ImportMentorsData = ImportMentorsData
  //mongoose.disconnect()
