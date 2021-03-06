let db = require('./models/db')

/*系统选题*/
/*1.总的原则是志愿优先原则*
/*以下都是在相同志愿内*/
/*2.如果可选人数 = 报的人数，则报的人数就都选了*/
/*3.如果可选人数 > 报的人数，则报的人都选了*/
/*4.如果可选人数 < 报的人数，则给老师选则*/
let autoProcessFirstApplication = function() {
  db.topics.find({}).populate('firststudents').exec()
    .then((topics) => {
      for (let i in topics) {
        //console.log(topics[i])
        if (topics[i].isselected) continue
        let firststudents = topics[i].firststudents
        let selected = firststudents.length
        for (let k in firststudents)
          if (firststudents[k].isselected) selected-- //真正第一志愿选这个题的学生
            //如果这个学生之前被选了，那么这个学生就不算	
            if (selected === 0) continue //如果这个题目没有第一志原的学生选就不处理了
            else if (topics[i].available >= selected) { //如果可选人数大于选的人数，就系统自动选择学生
          db.topics.findOneAndUpdate({ _id: topics[i]._id }, { $inc: { 'available': -selected } }, { new: true }).exec()
            .then((topic) => {
              if (topic.available === 0)
                db.topics.findOneAndUpdate({ _id: topic._id }, { $set: { 'isselected': true } }, { new: true }).exec()
            })
          for (let j = 0; j < firststudents.length; j++) {
            // console.log(firststudents[j])
            if (firststudents[j].isselected) continue
            db.students.findOneAndUpdate({ _id: firststudents[j]._id }, { $set: { 'isselected': true, 'mentor': topics[i].mentor, final: topics[i]._id } }, { new: true }).exec()
            db.topics.findOneAndUpdate({ _id: topics[i]._id }, { $addToSet: { finalstudents: firststudents[j]._id } }, { new: true }).exec()
          }
        } else { //如果选的人数大于可选人数就要让导师人工选择，即将要处理的题目压入eventsstack
          //console.log('here')
          db.mentors.findOneAndUpdate({ _id: topics[i].mentor }, { $addToSet: { eventstack: topics[i]._id }, $set: { notification: '有多个学生第一志愿选您的题目，请您根据题目剩余的可选人数进行选择' } }, { new: true }).exec()
        }
      }
    })
}

let autoProcessSecondApplication = function() {
  db.topics.find({}).populate('secondstudents').exec()
    .then((topics) => {
      for (let i in topics) {
        if (topics[i].isselected) continue
        let secondstudents = topics[i].secondstudents
        let selected = secondstudents.length

        for (let k in secondstudents)
          if (secondstudents[k].isselected) selected--

            if (selected === 0) continue
        if (topics[i].available >= selected) {
          db.topics.findOneAndUpdate({ _id: topics[i]._id }, { $inc: { 'available': -selected } }, { new: true }).exec()
            .then((topic) => {
              if (topic.available === 0)
                db.topics.findOneAndUpdate({ _id: topic._id }, { $set: { 'isselected': true } }, { new: true }).exec()
            })
          for (let j = 0; j < secondstudents.length; j++) {
            if (secondstudents[j].isselected) continue
            db.students.findOneAndUpdate({ _id: secondstudents[j]._id }, { $set: { 'isselected': true, 'mentor': topics[i].mentor, final: topics[i]._id } }, { new: true }).exec()
            db.topics.findOneAndUpdate({ _id: topics[i]._id }, { $addToSet: { finalstudents: secondstudents[j]._id } }, { new: true }).exec()
          }
        } else { //如果选的人数大于可选人数就要让导师人工选择，即将要处理的题目压入eventsstack
          //console.log('here')
          db.mentors.findOneAndUpdate({ _id: topics[i].mentor }, { $addToSet: { eventstack: topics[i]._id }, $set: { notification: '有多个学生第二志愿选您的题目，请您根据题目剩余的可选人数进行选择' } }, { new: true }).exec()
        }
      }
    })
}

let autoProcessThirdApplication = function() {
    db.topics.find({}).populate('thirdstudents').exec()
      .then((topics) => {
        for (let i in topics) {
          if (topics[i].isselected) continue
          let thirdstudents = topics[i].thirdstudents
          let selected = thirdstudents.length

          for (let k in thirdstudents)
            if (thirdstudents[k].isselected) selected--

              if (selected === 0) continue
          if (topics[i].available >= selected) {
            db.topics.findOneAndUpdate({ _id: topics[i]._id }, { $inc: { 'available': -selected } }, { new: true }).exec()
              .then((topic) => {
                if (topic.available === 0)
                  db.topics.findOneAndUpdate({ _id: topic._id }, { $set: { 'isselected': true } }, { new: true }).exec()
              })
            for (let j = 0; j < thirdstudents.lentgh; j++) {
              if (thirdstudents[j].isselected) continue
              db.students.findOneAndUpdate({ _id: thirdstudents[j]._id }, { $set: { 'isselected': true, 'mentor': topics[i].mentor, final: topics[i]._id } }, { new: true }).exec()
              db.topics.findOneAndUpdate({ _id: topics[i]._id }, { $addToSet: { finalstudents: thirdstudents[j]._id } }, { new: true }).exec()
            }
          } else { //如果选的人数大于可选人数就要让导师人工选择，即将要处理的题目压入eventsstack
            //console.log('here')
            db.mentors.findOneAndUpdate({ _id: topics[i].mentor }, { $push: { eventstack: topics[i]._id }, $set: { notification: '有多个学生第三志愿选您的题目，请您根据题目剩余的可选人数进行选择' } }, { new: true }).exec()
          }
        }
      })

  }
  //autoProcessFirstApplication()
  //console.log('here')
let manualProcessFirstApplication = function() {
  db.topics.find({}).populate('firststudents').exec()
    .then((topics) => {
      for (let i in topics) {
        if (topics[i].isselected) continue
        let firststudents = topics[i].firststudents
        let selected = firststudents.length
        for (k in firststudents)
          if (firststudents[k].isselected) selected--

            if (selected === 0) continue

            //如果选的人数大于可选的人数
        if (topics[i].available < selected) {
          db.topics.findOneAndUpdate({ _id: topics[i]._id },

            { $set: { 'isselected': true, 'available': 0 } }, { new: true }).exec()
          console.log(`plese select ${topics[i].available}  students  for topic:${topics[i]._id}? `)
          let ans = readSyn()
          console.log(ans)


        }
      }
    })
  let selectStudent = function(ID, topic) {
    db.students.findOneAndUpdate({ _id: ID }, { $set: { 'isselected': true, 'mentor': topic.mentor } }, { new: true }).exec()
  }
}

let manualProcessApplication = function(tchId, stuId, cb) { //老师进行选择学生
  db.mentors.findOne({ _id: tchId }).populate('eventstack').db.topics.findOneAndUpdate({ _id: topicId }, { $inc: { available: -1 }, $push: { finalstudents: stuId } }, { new: true }).exec()
    .then((mentor) => {
      console.log(mentor)
    })
}
exports.autoProcessFirstApplication = autoProcessFirstApplication
exports.autoProcessThirdApplication = autoProcessThirdApplication
exports.autoProcessSecondApplication = autoProcessSecondApplication
  //autoProcessFirstApplication()
  //autoProcessSecondApplication()
  //autoProcessThirdApplication()
  //manualProcessFirstApplication()
