/*
 *最终答辨分组
 */
const db = require('./models/db')
const _ = require('lodash')
let lg = console.log

var numGroups = 6 //分成6组的话
var numTopics = 128
var numStu = 128
var groupMentors = function(numGroups) { //根据导师的类别比例进行分组
  db.mentors.count({}).exec() //numMentors是所有导师的数量
    .then((numMentors) => {
      var numGroupMembers = 20
      numGroupMembers = Math.floor(numMentors / numGroups) //向下取整,每组中有多少人
      var surplusMentors = numMentors - numGroupMembers * numGroups //会剩下这么多人没得分组
      var query = db.mentors.find()
      query.select({ name: 1, fields: 1, classrate: 1, group: 1 })
      query.sort({ classrate: -1 })
      query.exec()
        .then((mentors) => {
          var groupId = 0
          var newNumGroupMembers = numGroupMembers
          for (var i = 0; groupId + 1 <= numGroups && i <= numMentors - numGroupMembers; i += numGroupMembers) {
            var group = {
              _id: ++groupId,
              mentors: [],
              fields: []
            }
            if (numGroups - groupId + 1 == surplusMentors) //到了最后面几组，一组给一个分不完的人
              newNumGroupMembers++
              for (var j = 0; j < newNumGroupMembers; j++) {

                group.mentors.push(mentors[i + j]._id)
                db.mentors.findOneAndUpdate({ _id: mentors[i + j]._id }, { $set: { group: group._id } }, { new: true }).exec()
                for (var k = 0; k < mentors[i + j].fields.length; k++) {
                  if (group.fields.indexOf(mentors[i + j].fields[k]) === -1) //有返回下标,没有返回-1
                    group.fields.push(mentors[i + j].fields[k]) //如果没有的话才导入所在组的方向
                }
              }
            if (newNumGroupMembers > numGroupMembers) i++
              lg(group)
              var myGroup = new db.groups(group)
              myGroup.save()
          }

        }).then((group) => {
          console.log('begin to group Topics')
        })
    })

}

//const grouping = require('../grouping')


let firstGroup = function(data, n) {
  let mentors = []
  let groups = []
  let numMentors = data.length
  let aveNum = Math.floor(numMentors / n)
  let surplus = numMentors % n
  let k = 0
  for (var i = 0; i < numMentors; i++) {
    var mentor = {}
    mentor.dist = data[i][0]
    mentor.name = data[i][1]
    mentor.iscenter = data[i][2]
    mentor.isgrouped = false
    mentors.push(mentor)
  }
  for (var i = 0; i < n; i++) { //定义n个组
    var group = {}
    group.mentors = []
    group.restriction = aveNum
    if (i >= n - surplus)
      group.restriction++
      group.available = group.restriction
    groups.push(group)
  }
  for (var i = 0; i < numMentors; i++) {
    if (mentors[i].iscenter) {
      groups[k].mentors.push(mentors[i].name)
      mentors[i].isgrouped = true
      groups[k].available--
        k++
    }
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < numMentors; j++) {
      if (mentors[j].isgrouped) continue
      var groupId = mentors[j].dist[i] - 1 //选择第一位数作为group id
      if (groups[groupId].available > 0) {
        groups[groupId].mentors.push(mentors[j].name)
        mentors[j].isgrouped = true
        groups[groupId].available--
      }
    }
  }
  lg(groups)
  _.forEach(groups,(group,i)=>{

  })
}

let groupByCentroids = function(centroids, fn) { //fn用于将返回结果传递出去

  let centrFields = [] //中心点领域
  let allFields = [] //全部导师领域

  let _centroids = []
  let _tchFields = []
  let tchGroups = []

  let query = db.mentors.find({}, ['name', 'fields'], (err, mentors) => {

      for (let i = 0, ilen = mentors.length; i < ilen; i++) {
        allFields.push([mentors[i]._id, mentors[i].name, mentors[i].fields])
        _.forEach(centroids, c => {
          if (mentors[i]._id == c) {
            centrFields.push(mentors[i].fields)
          }
        })
      }
      //lg(allFields)
      return Promise.resolve('centroids')
    })
    .then((str) => {
      _.forEach(centrFields, (centr, ci) => {
        let cf = []
        _.forEach(centr, field => {
          cf.push(field.id)
        })
        _centroids.push(cf)
      })
      _.forEach(allFields, (centr, ci) => {
        let af = []
        af[0] = centr[0]
        af[1] = centr[1]
        af[2] = []
        _.forEach(centr[2], field => {
          af[2].push(field)
        })
        _tchFields.push(af)
      })
      return Promise.resolve(_tchFields)
    })
    .then((pro) => {
      for (let i = 0; i < _tchFields.length; i++) {
        let min = Infinity
        let rec = 0
        let arr = []
        arr[i] = []
        let grouped = false
        for (let j = 0; j < _centroids.length; j++) {
          let _m = 1 - _.intersection(_tchFields[i], _centroids[j]).length / _.union(_tchFields[i], _centroids[j]).length
            //_m ? null : grouped = true
          _tchFields[i] == centroids[j] ? grouped = true : null //判断是否是centroids
          if (min > _m) {
            min = _m
            rec = j + 1
          }
          arr[i].push({
            rank: j + 1,
            value: _m.toFixed(2)
          })
        }
        arr[i].sort((a, b) => {
          return a.value - b.value
        })
        for (let k = 0; k < arr[i].length; k++) {
          arr[i][k] = arr[i][k].rank
        }
        tchGroups[i] = [arr[i], _tchFields[i][1], grouped]
      }

      _.forEach(tchGroups, (e, i) => {
        let min = 0
        let len = e[0].length
        let k
        _.forEach(e[0], (_e, _i) => {
          k = len - _i
          min += (_e - _i) * (_e - _i) * Math.pow(2, 2 * k)
        })
        e.push(min)
      })
      tchGroups.sort((a, b) => {
        return _.last(a) - _.last(b)
      })
      fn(firstGroup(tchGroups, centroids.length)) //记住这个用法
    })
}


var groupTopics = function(numGroups) {
    db.topics.find({}, ['_id', 'mentor', 'fields', 'finalstudents']).exec()
      .then((topics) => {
        var numStudentsGroup = 5
        db.groups.find({}).exec()
          .then((groups) => {
            var recordGroup = [] //记录组里面的学生数
            var recordTopic = []

            for (var n = 0, nlen = groups.length; n < nlen; n++)
              recordGroup.push({ numStudents: 0 })
            for (var i = 0, ilen = topics.length; i < ilen; i++) {
              recordTopic.push({ isgrouped: false }) //是否已分组
              for (var j = 0, jlen = groups.length; j < jlen; j++) { //如果这组里有这个题目的导师
                if (groups[j].mentors.indexOf(topics[i].mentor) !== -1 || recordGroup[j].numStudents > numStudentsGroup) //如果题目的老师在这组里,就将题目放下一组
                  continue
                for (var k = 0, klen = topics[i].fields.length; k < klen; k++)
                  if (groups[j].fields.indexOf(topics[i].fields[k]) != -1) { //如果这组有题目的研究方向
                    db.groups.findOneAndUpdate({ _id: groups[j]._id }, { $addToSet: { topics: topics[i]._id } }).exec()
                    for (var s = 0, slen = topics[i].finalstudents.length; s < slen; s++) {
                      db.students.findOneAndUpdate({ _id: topics[i].finalstudents[s] }, { $set: { group: groups[j]._id } }).exec()
                      db.groups.findOneAndUpdate({ _id: groups[j]._id }, { $addToSet: { students: topics[i].finalstudents[s] } }).exec()
                    }
                    recordTopic[i].isgrouped = true
                    recordGroup[j].numStudents += topics[i].finalstudents.length
                    if (recordTopic[i].isgrouped) break
                  }
                if (recordTopic[i].isgrouped) break
              }
              if (!recordTopic[i].isgrouped) //如果题目还没被分组分给人最少的
              {
                var minStudentsGroup = 10086
                var Index = 0
                for (var l = 0; l < groups.length; l++) {
                  if (groups[l].mentors.indexOf(topics[i].mentor) != -1) continue
                  if (recordGroup[l].numStudents < minStudentsGroup) {
                    minStudentsGroup = recordGroup[l].numStudents
                    Index = l
                  }
                }
                db.groups.findOneAndUpdate({ _id: groups[Index]._id }, { $addToSet: { topics: topics[i]._id } }).exec()
                for (var s = 0; s < topics[i].finalstudents.length; s++) {
                  db.students.findOneAndUpdate({ _id: topics[i].finalstudents[s] }, { $set: { group: groups[Index]._id } }).exec()
                  db.groups.findOneAndUpdate({ _id: groups[Index]._id }, { $addToSet: { students: topics[i].finalstudents[s] } }).exec()
                }
                recordTopic[i].isgrouped = true
                recordGroup[Index].numStudents += topics[i].finalstudents.length
              }
            }
          })
      })
  }
  //
let finalgroup = function(centroids) {
    db.students.count({}).exec().then((count) => numStu = count) //获取学生数
    db.topics.count({}).exec().then((count) => numTopics = count) //获取课题数
    groupByCentroids(centroids, (centr) => {
      //lg(centr)
    })
    groupMentors(centroids.length)
    setTimeout(() => {
      groupTopics(centroids)
    }, 500)

    /* new Promise((resolve,reject)=>{
         groupMentors(numGroups)
         //console.log(2)
         resolve()
     }).then(()=>{
        // console.log(1)
         groupTopics(numGroups)
     })*/
  }
  //finalgroup(6)

exports.finalgroup = finalgroup
