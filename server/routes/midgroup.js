const db = require('../models/db')
const xlsx = require('node-xlsx');
const fs = require('fs');

/*let mentorsGroup = [

]*/
let writeToExcel = function(originData){
    let buffer = xlsx.build(originData)
    fs.writeFileSync('./server/files/download/MidGroup.xlsx',buffer,{'flag':'w'});
}
/*let groups = [
   {
    name:'第一组',
    mentors:['2030513414','2030513411','2030513406','2030513426'],
   // mentors:['2030513401','2030513402'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
  {
    name:'第二组',
    mentors:['2030513401','2030513404','2030513405','2030513422','2030513409'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
   {
    name:'第三组',
    mentors:['2030513421','2030513404','2030513417','2030513423'],
   // mentors:['2030513401','2030513402'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
   {
    name:'第四组',
    mentors:['2030513408','2030513424','2030513414'],
   // mentors:['2030513401','2030513402'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
   {
    name:'第五组',
    mentors:['2030513410','2030513418','2030513415','2030513425'],
   // mentors:['2030513401','2030513402'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
   {
    name:'第六组',
    mentors:['2030513419','2030513402','2030513416'],
   // mentors:['2030513401','2030513402'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
]*/

let midGroup = function(groups){
    for(let i = 0; i < groups.length; i++){
        fillGroupData(i,groups)
        
    }
    setTimeout(()=>{
       for(let i=0;i<groups.length;i++){
        delete groups[i].mentors
       }
    //  console.log(groups)
     // xlsx.build(groups)
      writeToExcel(groups)
    //  cb()
       }, 1000)/// console.log(group)
}

let fillGroupData = function(groupId,groups){
        let id = 1
        let group = groups[groupId]
        let mentorsId = group.mentors
        for(let j=0; j<mentorsId.length; j++){
            let mentorId = mentorsId[j]
            db.mentors.findOne({_id:mentorId},['name','topics','group'])
                  .populate('topics','title finalstudents')
                  .exec()
                  .then((mentor)=>{
                    mentor.group = groupId
                    mentor.save()

                    let topics = mentor.topics
                    for(let k=0;k<topics.length;k++){
                        let topic = topics[k]
                        db.topics.findOne({_id:topic._id},['title', 'finalstudents'])
                        .populate('finalstudents', 'name')
                        .exec()
                        .then(topic=>{
                        
                        let students = topic.finalstudents
                        for(let i = 0 ;i < students.length; i++){
                          db.students.findOneAndUpdate({_id:students[i]._id},{$set:{group:groupId}},{new:true}).exec()
                            let row = []
                            row.push(
                                id,
                                students[i]._id,
                                students[i].name,
                                topic.title,
                                mentor.name)
                            group.data.push(row)
                            id++
                          // console.log(group)
                        }
                      })
                    }
                })
                 // console.log(group)
        }
        }
exports.midgroup = midGroup