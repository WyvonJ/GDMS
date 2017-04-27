const express = require('express')
const router = express.Router()
const db = require('../models/db')
const fs = require('fs')
var url = require('url');
var path = require('path');
const multiparty = require('multiparty')
router.post('/admUpTchAccounts', (req, res) => {
  console.log(req.files)
    //const file=req.file('file')
    //yield file.move(Helpers.storagePath('/admUpTchAccounts'))
    //console.log(file)
})
router.post('/admMidGradeUpload', (req, res) => {
  let dstDir = './server/database/'
  let form = new multiparty.Form({ uploadDir: dstDir })
    //上传完成后处理

  form.parse(req, function(err, fields, files) {
    fs.renameSync(files.file[0].path, dstDir + files.file[0].originalFilename)
    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' })
    res.write('received upload:\n\n')
    res.end()
  })
})

router.get('/download', (req, res) => {
  let q=req.query
  console.log(q)
  if (q.filename==='middlegroup') {
    
     res.download('./test.xlsx', 'test.xlsx', (err) => {
    if (err)
      throw new Error(err)
  })
  }
 
})

router.get('/admGetTchAccount', (req, res) => {
  db.mentors.find({}, ['_id', 'name', 'password', 'qq', 'wechat', 'tel', 'email', 'office'], (err, mentors) => {
    if (err) res.send(400)
    else
      res.send(mentors)
  })
})

/*获取题目*/
router.get('/admGetTchTopics', (req, res) => {
  var cardData = []
  db.mentors.find({}, ['name', 'topics'])
    .populate('topics', '_id')
    .exec()
    .then((mentors) => {
      Promise.all(mentors.map(mentor => fillCardData(mentor)))
        .then(() => {
          res.send(cardData)
          console.log(cardData)
        })
    })

  function fillCardData(mentor) {
    return new Promise((resolve1, reject) => {
      var teacher = {}
      teacher.name = mentor.name
      teacher.topics = []
      topicsId = mentor.topics

      Promise.all(topicsId.map((topicId) => {
        return new Promise((resolve2, reject) => {
          db.topics.findOne({ _id: topicId })
            .select('finalstudents title')
            .populate('finalstudents', '_id name')
            .exec((err, topic) => {
              console.log(topic)
            })
            .then((topic) => {
              console.log(topic)
                //delete topic._id

              teacher.topics.push(topic)
              resolve2(topic)
            })
        })
      })).then(() => {
        cardData.push(teacher)
        resolve1()
      })
    })
  }
})

module.exports = router
