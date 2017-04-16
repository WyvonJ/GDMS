var db = require('../models/db')
var xlsx = require('node-xlsx');
var fs = require('fs');

/*var mentorsGroup = [

]*/
var writeToExcel = function(originData){
    var buffer = xlsx.build(originData)
    fs.writeFileSync('中期答辨分组.xlsx',buffer,{'flag':'w'});
}
var groups = [
   {
    name:'第一组',
    mentors:['2030513401','2030513402'],
   // mentors:['2030513401','2030513402'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
  {
    name:'第二组',
    mentors:['2030513403','2030513404'],
    data:[['序号','学号','学生姓名','课题名','指导教师']]
   },
]

var midGroup = function(){
    for(var i = 0; i < groups.length; i++){
        fillGroupData(i)
        
    }
    setTimeout(()=>{
       for(var i=0;i<groups.length;i++){
        delete groups[i].mentors
       }
      console.log(groups)
     // xlsx.build(groups)
      writeToExcel(groups)
       }, 1000);/// console.log(group)
}

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
                          // console.log(group)
                        }
                      })
                    }
                })
                 // console.log(group)
        }
       // delete group.mentors
       /*setTimeout(()=>{
       // groups[group.name].data.push(group.data)
        //console.log(group)
       }, 1000);/// console.log(group)*/
        }
midGroup()

/*Promise.all(groups.map(group=>{
    return new Promise((resolve1, reject)=>{
        Promise.all(group.mentors.map(mentorId=>{
            return new Promise((resolve2, reject)=>{
                db.mentors.findOne({_id:mentorId},['name','topics'])
                  .populate('topics','title finalstudents')
                  .exec()
                  .then((mentor)=>{
                    Promise.all(mentor.topics.map(topic=>{
                    return new Promise((resolve3, reject)=>{
                    db.topics.findOne({_id:topic._id},['title', 'finalstudents'])
                      .populate('finalstudents', 'name')
                      .exec()
                      .then(topic=>{
                        var row = []
                        students = topic.finalstudents
                        for(var i = 0 ;i < students.length; i++){
                            row.push(
                                students[i]._id,
                                students[i].name,
                                topic.title,
                                mentor.name)
                            group.data.push(row)
                        }
                       // console.log(group)
                       // console.log('学生')
                        resolve3(group)                        
                    })
                    })
            })).then(
            console.log('1'))
            console.log(group)
            console.log('这个导师的所有学生都查询出来了')
            resolve2(mentor)
          })
      })
    })).then(()=>{
        console.log('2')
        console.log('这个组的所有老师都查询出来了')
        resolve1(group)
    })
})
})).then(console.log('3'))
//console.log(groups))*/
//读取文件内容
/*var obj = xlsx.parse(__dirname+'/test.xlsx');
var excelObj=obj[0].data;
console.log(excelObj);

var data = [];
for(var i in excelObj){
    var arr=[];
    var value=excelObj[i];
    for(var j in value){
        arr.push(value[j]);
    }
    data.push(arr);
}*/
/*var mydata = */

/*var buffer = xlsx.build([
    {
        name:'第一组',
        data:[
            ['晏涛','1030513430','吴吉','毕业选题系统'],
            ['钱鹏江','1030513425','我','毕业设计选题系统']]
    },
    {
        name:'第二组',
        data:[
        ['林意','1030513412','李诗芸','屏幕特效']]
    }        
]);*/
//将文件内容插入新的文件中

    
    //fs.writeFileSync('中期答辨分组.xlsx',mydata,{'flag':'w'});
   
    


