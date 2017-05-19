const express = require('express')
const router = express.Router()
const db = require('../models/db')

router.post('/stuCommitSelection', (req, res) => {
  let studentId = req.body._id
  let first = req.body.first
  let second = req.body.second
  let third = req.body.third
  let t = new Date()
  console.log(`${studentId} chosen T${first} at ${t.getHours()}:${t.getMinutes()}`)
  db.students.findOne({ _id: studentId }).exec(function(err, student) {
    if (err) res.send({ state: 0 })
    else {
      if(student.isselected)return //如果学生已经被选择了 则不能再进行选题

      if (second != -1) {
        db.topics.findOneAndUpdate({ _id: student.second }, { $pull: { secondstudents: studentId } }, { new: true }).exec()
          .then(student.selectTopic('second', second))
        console.log(studentId)


      }

      if (first != -1) //如果有选题
      {
        db.topics.findOneAndUpdate({ _id: student.first }, { $pull: { firststudents: studentId } }, { new: true }).exec()
          .then(student.selectTopic('first', first))

      }

      if (third != -1) //如果有选题
      {
        db.topics.findOneAndUpdate({ _id: student.third }, { $pull: { thirdstudents: studentId } }, { new: true }).exec()
          .then(student.selectTopic('third', third))
      }
      res.send({ state: 1 })
    }
  })
})

//发送所有选题
router.get('/stuGetTopics', (req, res) => {
  //let topic = {}
  let query = db.topics.find()
    //query.where('isselected',false)第二次选题的时候才给没有选完的题目
    //第二次选题的时候要把每个题的第几志源选的学生删除了
  query.select({
    _id: 1,
    categary: 1,
    title: 1,
    details: 1,
    restriction: 1,
    selected: 1,
    firststudents: 1,
    secondstudents: 1,
    thirdstudents: 1,
    isselected:1
  })

  //query.where({'isselected':false})//只发送还未被选的题目
  query.sort({ '_id': 1 })
  query.exec((err, topics) => {
    for(let i=0;i<topics.length;i++)
      topics[i].selected = topics[i].firststudents.length + topics[i].secondstudents.length + topics[i].thirdstudents.length;
    if (err) { res.send(404), console.log(err) } else res.send(topics)
  })
})
router.post('/stuFinalTopic',(req,res)=>{
  let _id = req.body._id
  let final = req.body.final

  db.topics.findOneAndUpdate({_id:final},{$set:{finalstudents:_id}},{new:true})
    .exec((err,topic)=>{
    if(err)return
    let mentor = topic.mentor
     db.students.findOneAndUpdate({_id:_id},{$set:{final:final, mentor: mentor,isselected:true}},{new:true}).exec((err,student)=>{
          if(err)return
          else {
            db.mentors.findOneAndUpdate({_id:mentor},{$set:{students:_id}},{new:true})
            .exec(()=>{
              console.log(`${student.name}最终选题选了${final}题`)
              res.send({state:1})
            })
          }
        })
    })
  })
/*初次填写学生的联系信息*/
router.post('/stuSetContactData', (req, res) => {
  let studentId = req.body.account
    //console.log(req.body)
  db.students.findOneAndUpdate({ _id: studentId }, { $set: { 'tel': req.body.tel, 'email': req.body.email, 'qq': req.body.qq, 'wechat': req.body.wechat, 'intro': req.body.intro } }, { new: true }).exec(function(err, student) {
    if (err) res.send(err)
    res.send('success')
  })
})

/*得到学生选题结果*/
router.post('/stuSelectionResult', (req, res) => {
  let studentId = req.body.studentId
    //let studentId = '1030513402'
    //console.log(studentId)
  let finalData = {}
  db.students.findOne({ _id: studentId }, ['final', 'mentor', 'isselected', 'first', 'second', 'third'])
    .populate('final', '_id title category details')
    .populate('first', '_id title category details')
    .populate('second', '_id title category details')
    .populate('third', '_id title category details')
    .populate('mentor', 'name tel email qq wechat office')
    .exec()
    .then((student) => {
      if (student.isselected) {
        finalData = {
          _id: student.final._id,
          category: student.final.category,
          title: student.final.title,
          details: student.final.details,
          name: student.mentor.name,
          tel: student.mentor.tel,
          email: student.mentor.email,
          qq: student.mentor.qq,
          wechat: student.mentor.wechat,
          office: student.mentor.office,
          state: 1
        }
        res.send(finalData)
          //	console.log(finalData)
      } else {
        /******************************************************/

        finalData.topics = [student.first,student.second,student.third]
        finalData.state = 0
        res.send(finalData)
          //	console.log(finalData)
      }
    })
})

router.post('/stuContacInfo', (req, res) => {
  let account = req.body.studentId
  let tel = req.body.tel
  let email = req.body.email
  let wechat = req.body.wechat
  db.students.findOneAndUpdate({_id:account},
                              {$set: {'tel':tel, 'email':email, 'qq':qq, 'wechat': wechat}},
                              {new: true}).exec()
                              .then(res.send(1))
})
router.post('/stuAccountInfo', (req, res) => {
  let account = req.body.studentId
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  db.studens.findOne({_id:account},(err,student)=>{
    if(student.password != oldPassword)
              res.send(0);//密码错识
              else{
                studen.password = newPassword
                student.save()
                res.send(1)
              }
        })
})

router.post('/stuSetContact',(req, res)=>{
  let account = req.body.studentId
  let tel = req.body.tel
  let email = req.body.email
  let wechat = req.body.wechat
  let qq = req.body.qq
  db.students.findOneAndUpdate({_id:account},
                              {$set: {'tel':tel, 'email':email, 'qq':qq, 'wechat': wechat}},
                              {new: true}).exec()
                              .then(res.send(1))
})

router.get('/stuGetContact',(req, res)=>{
  let q = req.query
  let account = q.account
  console.log(account)
  //let account = req.body.studentId
  //let account = '1030513425'
  db.students.findOne({_id:account},['tel','email','qq','wechat'],(err,student)=>{
  // delete student._id
    if(err)return
    let studentContact = {}
    studentContact.tel = student.tel
    studentContact.email = student.email
    studentContact.qq = student.qq
    studentContact.wechat = student.wechat
    res.send(studentContact)
  })
})
module.exports = router
