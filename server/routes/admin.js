let express = require('express');
let router = express.Router();
let db = require('../models/db')
var xlsx = require('node-xlsx');
var fs = require('fs');
var midgroup = require('./midgroup')
let multiparty = require('multiparty')
var grouping = require('../grouping')
var path = require('path');
/*管理员获得教师账号*/
router.get('/admTchAccount', (req, res) => {
  db.mentors.find({}, ['_id', 'name', 'password', 'tel', 'email', 'office'], (err, mentors) => {
    if (err) res.send(400)
    else
      res.send(mentors)
  })
})

/*获取题目*/
router.get('/admGetTchTopics', (req, res) => {
  var excelData = [{
    name: '学生最终选题结果表',
    data: [
      ['导师', '题目', '学号', '姓名']
    ]
  }]
  var cardData = []
  db.mentors.find({}, ['name', 'topics'])
    .populate('topics', '_id')
    .exec()
    .then((mentors) => {
      Promise.all(mentors.map(mentor => fillCardData(mentor)))
        .then(() => {
          //console.log(excelData);
          /* excelData.sort(function(a,b){
               return a[0]-b[0];
           })*/
          var buffer = xlsx.build(excelData)
          fs.writeFileSync('./server/files/download/SelectedResult.xlsx', buffer, { 'flag': 'w' });
          res.send(cardData)
            // console.log(cardData)
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
              //console.log(topic)
            })
            .then((topic) => {
              var students = topic.finalstudents;
              if (students.length) {
                for (var i = 0; i < students.length; i++) {
                  var row = []
                  row.push(
                    mentor.name,
                    topic.title,
                    students[i]._id,
                    students[i].name)
                }
                excelData[0].data.push(row)
              }
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
router.get('/admTchMidList', (req, res) => {
  db.mentors.find({}, ['_id', 'name'], (err, mentors) => {
    if (err) return
    else {
      res.send(mentors)
        // console.log(mentors)
    }

  })
})

router.post('/admUpMTchGroups', (req, res) => {
  var i = 1;
  var midMentorGroups = req.body //得到导师分组
  var Groups = []
  Promise.all(midMentorGroups.map(group => {
      return new Promise((resolve, reject) => {
        var newGroup = {}
        newGroup.name = i + '组'
        newGroup.mentors = group
        newGroup.data = [
          ['序号', '学号', '学生姓名', '课题名', '指导教师']
        ]
        i++
        Groups.push(newGroup)
        resolve()
      })
    })).then(() => {
      midgroup.midgroup(Groups)
        //console.log(Groups[0].mentors);
    })
    // midgroup.midgroup(midMentorGroups);
})

router.post('/admMidGradeUpload', (req, res) => {
  let dstDir = './server/files/upload'
  let form = new multiparty.Form({ uploadDir: dstDir })
    //上传完成后处理

  form.parse(req, function(err, fields, files) {
    if (files.file)
      fs.renameSync(files.file[0].path, dstDir + files.file[0].originalFilename)
    else {
      res.send('not found')
      res.end()
    }

    /*res.download('./index.js', 'index.js', (err) => {
      if (err)
        throw new Error(err)
    })*/
    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' })
    res.write('received upload:\n\n')
    res.end()
  })
})

router.post('/admFnlGroupCount', (req, res) => {
  var groupCount = req.body.count
    // console.log(req.body)
  db.groups.remove({}, function(err) {
    if (err) return
    console.log('pre groups dropped');
    grouping.finalgroup(groupCount)
  });

  setTimeout(() => {
    db.groups.find({}, ['mentors', 'students'])
      .populate('mentors', '_id name')
      .populate('students', '_id name mentor')
      .sort({ _id: 1 })
      .exec()
      .then((groups) => {
        res.send(groups)
          // console.log(groups)
      })
  }, 1000)
})
router.post('/admUpFTchGroups', (req, res) => {
  var groups = req.body
    // console.log(groups)


  for (var j = 0; j < groups.length; j++) {
    var group = groups[j]
    db.groups.findOneAndUpdate({ _id: group._id }, { $set: { 'mentors': group.mentors, 'students': group.students } }, { new: true }).exec()
    var students = group.students
    var mentors = group.mentors
    for (var i = 0; i < students.length; i++)
      db.students.findOneAndUpdate({ _id: students[i] }, { $set: { 'group': group._id } }, { new: true }).exec()
    for (var i = 0; i < mentors.length; i++)
      db.mentors.findOneAndUpdate({ _id: mentors[i] }, { $set: { 'group': group._id } }, { new: true }).exec()

  }


})
router.get('/download', (req, res) => {
  var q = req.query
  var filename = q.filename

  if (filename == 'SelectedResult') { //得到最终选题的结果
    try {
      var state = fs.statSync(path.join('./server/files/download/', 'SelectedResult.xlsx'));
      // console.log(state.isFile())
      if (state.isFile())
        res.download('./server/files/download/SelectedResult.xlsx', 'SelectedResult.xlsx', (err) => {
          if (err)
            console.log('文件下载出错')
            //throw new Error(err)
          else console.log("选题结果文件下载成功")
        })
    } catch (err) {
      console.log('选题结果文件不存在')
    }

  } else if (filename == 'MidGroup') {
    try {
      var state = fs.statSync(path.join('./server/files/download/', 'SelectedResult.xlsx'));
      // console.log(state.isFile())
      if (state.isFile())
        res.download('./server/files/download/MidGroup.xlsx', 'MidGroup.xlsx', (err) => {
          if (err)
            console.log('文件下载出错')
            //throw new Error(err)
          else console.log("中期答辨分组结果文件下载成功")
        })
    } catch (err) {
      console.log('中期答辨分组结果文件不存在')
    }
    // console.log(filename)
    //  midgroup.midgroup(midgroup.groups, () => {

    // });

  } else if (filename == 'FinalGroup') {
    var excelData = []
      // excelData.data = []
      // grouping.finalgroup()

    if (db.groups) {
      db.groups.find({}, ['mentors', 'students'])
        .populate('mentors', 'name fields')
        .populate('students', '_id name final')
        .then(groups => {
          Promise.all(groups.map(group => {
              return new Promise((resolve1, reject) => {
                var sheet = {}
                sheet.name = group._id + '组'
                sheet.data = [
                  ['学号', '姓名', '毕设题目', '论文类型', '题目研究方向', '导师']
                ]
                var students = group.students
                Promise.all(students.map(student => {
                  return new Promise((resolve2, reject) => {
                    db.topics.findOne({ _id: student.final }, ['title', 'mentor', 'fields', 'category'])
                      .populate('mentor', 'name')
                      .exec((err, topic) => {
                        var row = []
                        row.push(
                          student._id,
                          student.name,
                          topic.title,
                          topic.category == 0 ? '论文' : '设计', [topic.fields],
                          topic.mentor.name
                        )
                        sheet.data.push(row)
                        resolve2()
                      })

                  })



                })).then(() => {
                  sheet.data.push(['本组导师:'])
                  sheet.data.push(['姓名', '研究方向'])
                    //  delete group.mentors._id
                  var mentors = group.mentors
                  Promise.all(mentors.map(mentor => {
                    return new Promise((resolve3, reject) => {
                      sheet.data.push([mentor.name, [mentor.fields]])
                      resolve3()
                    })
                  })).then(() => {
                    excelData.push(sheet)
                    resolve1()
                  })


                  //   console.log(sheet)
                })
              })
            }



          )).then(() => {
            //console.log(excelData)
            var buffer = xlsx.build(excelData)
            fs.writeFileSync('./server/files/download/FinalResult.xlsx', buffer, { 'flag': 'w' });
            try {
              var state = fs.statSync(path.join('./server/files/download/', 'SelectedResult.xlsx'));
              // console.log(state.isFile())
              if (state.isFile())
                res.download('./server/files/download/FinalResult.xlsx', 'FinalResult.xlsx', (err) => {
                  if (err)
                    console.log('文件下载出错')
                    //throw new Error(err)
                  else console.log("最终答辨分组结果文件下载成功")
                })
            } catch (err) {
              console.log('最终答辨分组结果文件不存在')
            }


            // res.send(cardData)
          })
        })
    }

  }
})

/*router.get('/adminFnlGroup',(req,res)=>{
    var fillGroupData = function(groupId){
        var id = 1;
        var group = groups[groupId]
        var mentorsId = group.mentors
        for(var j=0; j<mentorsId.length; j++){
            var mentorId = mentorsId[j]
            db.mentors.findOne({_id:mentorId},['name','topics'])
                  .populate('topics','title finalstudents')
                  .exec()
                  .then((mentor)=>{
                    var topics = mentor.topics
                    for(var k=0;k<topics.length;k++){
                        var topic = topics[k]
                        db.topics.findOne({_id:topic._id},['title', 'finalstudents'])
                        .populate('finalstudents', 'name')
                        .exec()
                        .then(topic=>{
                        
                        students = topic.finalstudents
                        for(var i = 0 ;i < students.length; i++){
                            var row = []
                            row.push(
                                id,
                                students[i]._id,
                                students[i].name,
                                topic.title,
                                mentor.name)
                            group.data.push(row)
                            id++
                        }
                      })
                    }
                })
                }
        }

})*/
/*获取题目*/
/*router.get('/admFnlGroup', (req, res) => {
        var cardData[]
    db.groups.find({}, ['mentors', 'students'])
        .populate('mentors', 'name')
        .populate('students', 'name final')
        .exec()
        .then((groups) => {
            Promise.all(groups.map((group) => fillCardData(group)))
                .then(() => {
                    res.send(cardData)
                })
        })
} else {
    res.sendStatus(403)
}
})

function fillCardData(group) {
    return new Promise((resolve1, reject) => {
          var students = group.students
          var newgroup = {}
          newgroup._id = group._id
          newgroup.teachers = group.mentors
          newgroup.students = []
          Promise.all(students.map(student=>{
            return new Promise((resolve2,reject)=>{
                db.students.findOne({ _id: student._id }, ['name', 'final'])
            .populate('final', 'title')
            .exec((err, student) => {
                if (student) {
                   newgroup.students.push(student)
                    resolve2(student)
                } else
                    reject(err)
            })
            })
          })).then(()=>{
            cardData.push(newgroup)
            resolve1(newgroup)
          })
        
    })
}*/


module.exports = router
