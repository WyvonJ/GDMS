const express = require('express')
const router = express.Router()
const db = require('../models/db')
const fs = require("fs")
const confirmToken = require('../middlewares/confirmToken')

router.post('/tchCreateTopic', (req, res) => {
  //console.log(req.body)
  let newTopic = new db.topics(req.body) //获得创建新题目的数据
  let newTopicId = newTopic.createTopic((err, newTopicId) => {
    if (err) res.send({ state: 0 }) //如果数据库存储失败
    else res.send({
      state: 1, //存储成功就发送新建题目的序号
      _id: newTopicId
    })
  })
})


//http就是这样无状态的 一次请求一次发送的
router.post('/tchConfirmStudent', (req, res) => {
  let tchId = req.body.teacherId
  let stuId = req.body.studentId
  let topicId = req.body.topicId
    //console.log(tchId)
    // console.log(stuId)
    // console.log(topicId)
  db.mentors.find({ _id: tchId }, ['notification']).exec()
    .then((notification) => console.log(`${tchId}: ${notification}`))
    .catch((err) => console.log(err))

  db.topics.findOne({ _id: topicId }).exec()
    .then((topic) => {
      if (topic.isselected) {
        res.send('题目已经选好学生了')
      } else {
        db.students.findOneAndUpdate({ _id: stuId }, { $set: { isselected: true, mentor: tchId, final: topicId } }, { new: true }).exec()
        db.topics.findOneAndUpdate({ _id: topicId }, { $inc: { available: -1 }, $push: { finalstudents: stuId } }, { new: true }).exec()
          .then((topic) => {
            if (topic.available == 0)
              db.topics.findOneAndUpdate({ _id: topicId }, { $set: { isselected: true } }, { new: true }).exec()
              .then((topic) => {
                db.mentors.findOneAndUpdate({ _id: tchId }, { $pull: { eventstack: topic._id }, $set: { notification: null } }, { new: true }).exec()
              })
          })
          .catch((err) => console.log(err))
      }
    })
})

/*老师要拿到待选学生的数据*/
//let time = 0
router.post('/tchGetTopics', (req, res) => {
  let tchId = req.body.teacherId
    // let tchId = '2030513403'
  let cardData = []

  // console.log(tchId)
  //  time++
  db.mentors.findOne({ _id: tchId })
    // .populate('eventstack')
    .exec()
    .then((mentor) => {
      //console.log(mentor)
      Promise.all(mentor.eventstack.map(topicId => fillCardData(topicId, cardData)))
        .then(() => {
          res.send(cardData)
            // console.log(cardData)
        })
    })

  function fillCardData(topicId, cardData) {
    return new Promise((resolve, reject) => {
      db.topics.findOne({ _id: topicId }, ['_id', 'category', 'title', 'available', 'firststudents'])
        .populate('firststudents', 'name gender gpa intro isselected ')
        .exec((err, topic) => {
          if (topic) {
            let mytopic = {}
              //console.log(topic)
              //这里还要增加判断是第几次选题如果是第一次选题就发送第一志愿的学生
              //第二次选题就发送第二志愿，第三次选题就发送第三志愿
              //console.log('here')
              // let key = 'students'
              // topic[key] = topic['firststudents'] //复制之前的值
              //delete topic.firststudents
              //console.log(topic)
            mytopic._id = topic._id
            mytopic.category = topic.category
            mytopic.title = topic.title
            mytopic.available = topic.available
            mytopic.students = topic.firststudents

            cardData.push(mytopic)

            //let arr= 
            // delete arr.firststudents
            // console.log(arr)
            resolve(topic)
          } else
            reject(err)
        })
    })
  }
})

router.post('/tchDeleteTopic', (req, res) => {
  let tchId = req.body.teacherId
  let topicId = req.body.topicId

  db.topics.removeTopic(topicId)
  db.mentors.findOneAndUpdate({ _id: tchId }, {
    $pull: {
      topics: topicId
    }
  }, { new: true }).exec((err, mentor) => {
    if (err) res.send(404)
    if (mentor) res.send('delete topic success')
  })
})


router.post('/tchSelectionResult', (req, res) => {
  let tchId = req.body.teacherId
  let cardData = []
    // console.log(tchId)
  db.mentors.findOne({ _id: tchId })
    .populate('topics')
    .exec()
    .then((mentor) => {
      Promise.all(mentor.topics.map(topic => fillCardData(topic, cardData)))
        .then(() => {
          res.send(cardData)
            //  console.log(cardData)
        })
    })

  function fillCardData(topic, cardData) {
    return new Promise((resolve, reject) => {
      db.topics.findOne({ _id: topic._id }, ['_id', 'finalstudents', ' category', 'title', 'restriction', 'isselected'])
        .populate('finalstudents', '_id tel qq wechat name gender email')
        .exec((err, topic) => {
          if (topic) {
            //console.log(topic)
            if (topic.finalstudents.length > 0) //只要题目确定了>0的人数就发过去
              cardData.push(topic)
            resolve(topic)
          } else
            reject(err)
        })
    })
  }

})

router.post('/tchGetCreatedTopics', confirmToken, (req, res) => {
  //console.log(tchId)
  let tchId = req.body.teacherId
  if (!tchId) return res.send({ state: 0 })
  db.mentors.findOne({ _id: tchId }, 'topics')
    .populate('topics', '_id category title details restriction')
    .exec((err, mentor) => {
      if (mentor)
        res.send(mentor.topics)
      else
        res.sendStatus({ state: 0 })
    })

})

/*填写导师的联系信息*/
router.post('/tchSetContactData', (req, res) => {
  let tchId = req.body.account
  if (!tchId) return res.send({ state: 0 })
  db.mentors.findOneAndUpdate({ _id: tchId }, {
      $set: {
        'tel': req.body.tel,
        'email': req.body.email,
        'qq': req.body.qq,
        'wechat': req.body.wechat,
        'office': req.body.office,
        'classratio': req.body.classratio,
        'fields': req.body.fields
      }
    }, { new: true })
    .exec(function(err, mentor) {
      if (err) res.send(err)
      else res.send('success')
    })
})

/*得到分组信息*/
router.post('/tchGrouping', (req, res) => {
  let account = req.body.account
  let mydb = [db.students, db.mentors]
  let type = account[0] == 1 ? 0 : 1
  let cardData = {
    _id: Number,
    teachers: [],
    students: []
  }
  mydb[type].findOne({ _id: account }, 'group', (err, doc) => {
    //if(err)return
    if (doc.group) {
      db.groups.findOne({ _id: doc.group }, ['mentors', 'students'])
        .populate('mentors', 'name gender')
        .populate('students', 'name final gender')
        .exec()
        .then((group, err) => {
          if (err) return res.sendStatus(404)
          cardData._id = group._id
          cardData.teachers = group.mentors
          Promise.all(group.students.map((student) => fillCardData(student, cardData)))
            .then(() => {
              console.log(cardData)
              res.send(cardData)
            })
        })
    } else {
      res.sendStatus(404)
    }
  })


  function fillCardData(student, cardData) {
    return new Promise((resolve, reject) => {
      db.students.findOne({ _id: student._id }, ['name', 'final'])
        .populate('final', 'title')
        .exec((err, student) => {
          if (student) {
            cardData.students.push(student)
            resolve(student)
          } else
            reject(err)
        })
    })
  }
})

router.post('/tchContacInfo', (req, res) => {
  let account = req.body.teacherId
  let tel = req.body.tel
  let email = req.body.email
  let wechat = req.body.wechat
  db.mentors.findOneAndUpdate({ _id: account }, { $set: { tel: tel, email: email, qq: qq, wechat: wechat } }, { new: true }).exec()
    .then(res.send({ state: 1 }))
})

router.post('/tchAccountInfo', (req, res) => {
  let account = req.body.teacherId
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  db.mentors.findOne({ _id: account }, (err, mentor) => {
    if (mentor.password != oldPassword)
      res.send({ state: 0 }) //密码错误
    else {
      mentor.password = newPassword
      mentor.save()
      res.send({ state: 1 })
    }
  })
})

router.post('/tchSetContact', (req, res) => {

  let account = req.body.account
  let contact = req.body.contact
  db.mentors.findOneAndUpdate({ _id: account }, { $set: { 'tel': contact.tel, 'email': contact.email, 'qq': contact.qq, 'wechat': contact.wechat, 'office': contact.office, 'fields': contact.fields } }, { new: true }).exec()
    .then(res.send({ state: 1 }))
})

router.get('/tchGetContact', (req, res) => {
  // let account = req.body.teacherId
  let q = req.query
  let account = q.account
    // let account = '2030513401'
  db.mentors.findOne({ _id: account }, ['tel', 'email', 'qq', 'wechat', 'office'], (err, mentor) => {
    if (err) return res.sendStatus(404)
    if (mentor) {
      res.send({
        tel: mentor.tel,
        email: mentor.email,
        qq: mentor.qq,
        wechat: mentor.wechat,
        office: mentor.office
      })
    }
  })
})
module.exports = router
