/*
 *答辨分组
 */
var db = require('./models/db')

//var numGroups = 6 //分成6组的话
var numTopics = 128
var numStu = 128
var groupMentors = function(numGroups) { //根据导师的类别比例进行分组

  db.mentors.count({}).exec() //numMentors是所有导师的数量
    .then((numMentors) => {
      var numGroupMembers = 20
      numGroupMembers = Math.floor(numMentors / numGroups) //向下取整,每组中有多少人
      var leftMentors = numMentors - numGroupMembers * numGroups //会剩下这么多人没得分组
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
            if (numGroups - groupId + 1 == leftMentors) //到了最后面几组，一组给一个分不完的人
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

              var myGroup = new db.groups(group)
            myGroup.save()
          }
          //console.log(group)

        }).then(() => {
          console.log('begin to group Topics')
            //groupTopics()
        })
    })

}

var groupTopics = function(numGroups) {
  db.topics.find({}, ['_id', 'mentor', 'fields', 'finalstudents']).exec()
    .then((topics) => {
      var numStudentsGroup = 5
      db.groups.find({}).exec()
        .then((groups) => {
          var recordGroup = []
          var recordTopic = []

          for (var n = 0, nlen = groups.length; n < nlen; n++) recordGroup.push({ numStudents: 0 })
          for (var i = 0 , ilen = topics.length; i < ilen; i++) {
            recordTopic.push({ isgrouped: false })
            for (var j = 0, jlen = groups.length; j < jlen; j++) { //如果这组里有这个题目的导师
              if (groups[j].mentors.indexOf(topics[i].mentor) !== -1 || recordGroup[j].numStudents > numStudentsGroup) //如果题目的老师在这组里,就将题目放下一组
                continue
              for (var k = 0,klen = topics[i].fields.length; k < klen; k++)
                if (groups[j].fields.indexOf(topics[i].fields[k]) != -1) { //如果这组有题目的研究方向
                  db.groups.findOneAndUpdate({ _id: groups[j]._id }, { $addToSet: { topics: topics[i]._id } }).exec()
                  for (var s = 0 , slen = topics[i].finalstudents.length; s < slen; s++) {
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
var finalgroup = function(numGroups) {
    db.students.count({}).exec().then((count) => numStu = count)
    db.topics.count({}).exec().then((count) => numTopics = count)
    groupMentors(numGroups)

    setTimeout(() => {
      groupTopics(numGroups)
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
  //finalgroup()
  //groupMentors()
  // groupTopics()
