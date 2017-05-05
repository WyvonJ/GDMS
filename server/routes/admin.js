let express = require('express');
let router = express.Router();
let db = require('../models/db')
var xlsx = require('node-xlsx');
var fs = require('fs');
var midgroup = require('./midgroup')
let multiparty = require('multiparty')
var grouping = require('../grouping')
var processapplication = require('../processapplication')
var path = require('path');
/*管理员获得教师账号*/
router.get('/admGetTchAccount', (req, res) => {
    db.mentors.find({}, ['_id', 'name', 'password', 'tel', 'email', 'office','qq','wechat'], (err, mentors) => {
        if (err) res.send(400)
        else
            res.send(mentors)
    })
})
/*管理员获得学生账号*/
router.get('/admGetStuAccount', (req, res) => {
    db.students.find({}, ['_id', 'name', 'password', 'tel', 'email','qq','wechat' ], (err, mentors) => {
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
            db.step.findOneAndUpdate({key:'system'},{$set:{curstep: 'midgroup'}},{new:true}).exec()
                //console.log(Groups[0].mentors);
        })
        // midgroup.midgroup(midMentorGroups);
})

router.post('/admTchAccUpload',(req,res)=>{
    let dstDir = './server/files/upload/'
    let form = new multiparty.Form({ uploadDir: dstDir })
    form.parse(req, function(err, fields, files){
        fs.renameSync(files.file[0].path, './server/files/upload/' + files.file[0].originalFilename)
        var FilePath = './server/files/upload/' + files.file[0].originalFilename
        console.log(FilePath)
        db.ImportMentorsData(FilePath)
        res.send({state:1})
    })
})
router.post('/admStuAccUpload',(req,res)=>{
    let dstDir = './server/files/upload/'
    let form = new multiparty.Form({ uploadDir: dstDir })
    form.parse(req, function(err, fields, files){
        fs.renameSync(files.file[0].path, './server/files/upload/' + files.file[0].originalFilename)
        var FilePath = './server/files/upload/' + files.file[0].originalFilename
        console.log(FilePath)
        db.ImportStudentsData(FilePath)
        db.step.findOneAndUpdate({key:'system'},{$set:{curstep: 'selecttopics'}},{new:true}).exec()
         .then(()=>{
             res.send({state:1})
         })
       
    })
})
router.post
router.post('/admGradeUpload', (req, res) => {
    let dstDir = './server/files/upload/'
    let form = new multiparty.Form({ uploadDir: dstDir })
    form.parse(req, function(err, fields, files) {
        if (files.hasOwnProperty('middle')) {
            fs.renameSync(files.middle[0].path, './server/files/upload/' + files.middle[0].originalFilename)
            var FilePath = './server/files/upload/' + files.middle[0].originalFilename
            var excelData = xlsx.parse(FilePath)
                // console.log(excelData)
            var sheetNum = excelData.length //读取excel中sheet个数
            Promise.all(excelData.map(sheet => {
                    if (sheet.name == '中期答辨成绩' || sheet.name == 'Sheet1') {
                        var studentsMidGrade = sheet.data
                        studentsMidGrade.shift() //删除excel数组的第一行元素，就是'姓名 学号'
                        console.log('开始导入中期答辨成绩')
                        Promise.all(studentsMidGrade.map(student => {
                            db.students.findOneAndUpdate({ _id: student[0] }, { $set: { midgrade: student[2] } }, { new: true }).exec()
                        })).then(console.log('导入学生中期答辨成绩成功'))
                    } else {}
                }))
                .then(() => {})
        } else if (files.hasOwnProperty('final')) {
            fs.renameSync(files.middle[0].path, './server/files/upload/' + files.middle[0].originalFilename)
            var FilePath = './server/files/upload/' + files.middle[0].originalFilename
            var excelData = xlsx.parse(FilePath)
            var sheetNum = excelData.length //读取excel中sheet个数
            Promise.all(excelData.map(sheet => {
                    if (sheet.name == '最终答辨成绩' || sheet.name == 'Sheet1') {
                        var studentsMidGrade = sheet.data
                        studentsMidGrade.shift() //删除excel数组的第一行元素，就是'姓名 学号'
                        console.log('开始导入最终答辨答辨成绩')
                        Promise.all(studentsMidGrade.map(student => {
                            db.students.findOneAndUpdate({ _id: student[0] }, { $set: { finalgrade: student[2] } }, { new: true }).exec()
                        })).then(console.log('导入学生最终答辨成绩成功'))
                    } else {}
                }))
                .then(() => {})
        } else {
            res.send('not found')
            res.end()
            return
        }
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
                db.step.findOneAndUpdate({key:'system'},{$set:{curstep: 'finalgroup'}},{new:true}).exec()
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
            if (state.isFile())
                res.download('./server/files/download/SelectedResult.xlsx', 'SelectedResult.xlsx', (err) => {
                    if (err)
                        console.log('文件下载出错')
                    else console.log("选题结果文件下载成功")
                })
        } catch (err) {
            console.log('选题结果文件不存在')
        }

    } else if (filename == 'MidGroup') {
        try {
            var state = fs.statSync(path.join('./server/files/download/', 'SelectedResult.xlsx'));
            if (state.isFile())
                res.download('./server/files/download/MidGroup.xlsx', 'MidGroup.xlsx', (err) => {
                    if (err)
                        console.log('文件下载出错')
                    else console.log("中期答辨分组结果文件下载成功")
                })
        } catch (err) {
            console.log('中期答辨分组结果文件不存在')
        }
    } else if (filename == 'FinalGroup') {
        var excelData = []
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
                            var state = fs.statSync(path.join('./server/files/download/', 'FinalResult.xlsx'));
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

    }else if(filename == 'StudentFinalGreade'){
       var excelData=[{
    name:'学生最终分数排名表',
    data:[['学号','姓名','课题','导师','中期答辨成绩','最终答辨成绩','最终分数']]
 }]
 db.students.find({},['midgrade','finalgrade','finalscore'],(err,students)=>{
            if(err)return
                Promise.all(students.map(student=>{
                    return new Promise((resolve,reject)=>{
                        student.finalscore = student.midgrade * 0.2 + student.finalgrade *0.8;
                        student.save()
                        resolve()
                    })
                })).then(()=>{
                    db.students.find({},['_id','name','mentor','final','finalscore','midgrade','finalgrade'])
                      .populate('mentor','name')
                      .populate('final','title')
                      .sort({finalscore:-1})
                      .exec()
                      .then((items)=>{
                      //  console.log(items);
                            Promise.all(items.map(item=>{
                                return new Promise((resolve1,reject)=>{
                                    var row = []
                                  //  if(!item.final)item.final.title=''
                                    //if(!item.mentor)item.mentor.name=''
                                    row.push(
                                        item._id,
                                        item.name,
                                        item.final?item.final.title:' ',
                                        item.mentor?item.mentor.name:' ',
                                        item.midgrade,
                                        item.finalgrade,
                                        item.finalscore)
                                    excelData[0].data.push(row)
                                    resolve1()
                                })
                                
                            })).then(()=>{
                                var buffer = xlsx.build(excelData)
                                fs.writeFileSync('./server/files/download/FinalGrage.xlsx',buffer,{'flag':'w'});
                                res.download('./server/files/download/FinalGrage.xlsx', 'FinalGrage.xlsx', (err) => {
                                    if (err)
                                        console.log('文件下载出错')
                                        //throw new Error(err)
                                    else console.log("学生最终分数文件下载成功")
                                })
                            })
                      })
                })
            })
    }
})

router.post('/procSelection', (req, res) => {
    var order = req.body.order
    console.log(`开始第${order}次选题`)
    if (order == 1) processapplication.autoProcessFirstApplication()
    else if (order == 2) processapplication.autoProcessSecondApplication()
    else if (order == 3) processapplication.autoProcessThirdApplication()
    else if (order == 4) {
        db.step.findOneAndUpdate({ key: 'system' }, { $set: { curstep: 'reselecttopics' } }, { new: true }).exec()
        res.send('最后选题，每个学生只能选一个题目')
    } else {}
})
router.get('/unhandledTch', (req, res) => {
    db.mentors.find({}, ['name', 'eventstack'], (err, mentors) => {
        var cardData = []
        Promise.all(mentors.map(mentor => {
            return new Promise((resolve, reject) => {
                if (mentor.eventstack.length > 0)
                    cardData.push(mentor.name)
                resolve()
            })
        })).then(() => {
            res.send(cardData);
        })
    })

})
router.get('/unhandledStu', (req, res) => {
    db.students.find({}, ['name', 'first', 'second', 'third'], (err, students) => {
        var cardData = []
        Promise.all(students.map(student => {
            return new Promise((resolve, reject) => {
                if (!student.first) {
                    var newstudent = {}
                    newstudent._id = student._id
                    newstudent.name = student.name
                    cardData.push(student)
                }
                resolve()
            })
        })).then(() => {
            res.send(cardData);
        })
    })
})
router.get('/admResetSystem', (req, res) => {
    db.groups.remove({}, function(err) {
        if (err) return
        console.log('删除数据库分组信息');
    });
    db.students.remove({}, function(err) {
        if (err) return
        console.log('删除数据库学生信息');
    })
    db.mentors.remove({}, function(err) {
        if (err) return
        console.log('删除数据库导师信息');
    })
    db.topics.remove({}, function(err) {
        if (err) return
        console.log('删除数据库题目信息');
    })
    db.autoIncModel.findOneAndUpdate({collectionName: 'topics'},{$set:{topicsSeq: 0}},{new:true}).exec()
  /*  db.autoIncModel.remove({}, function(err) {
        if (err) return

        console.log('删除数据库序号递增辅助集合信息');
    })*/
    db.step.findOneAndUpdate({key:'system'},{$set:{curstep:'importmentorsdata'}},{new:true}).exec()
   // console.log('保留管理员信息')
   /* db.step.remove({}, function(err) {
        if (err) return
        console.log('删除数据库步骤集合信息')
    })*/
    res.send({state:1})
})
module.exports = router
