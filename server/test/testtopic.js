var db = require('../models/db')
var xlsx = require('node-xlsx');
var fs = require('fs');
//db.students.findAndUpdate({})
 var excelData=[{
    name:'学生最终分数排名表',
    data:[['学号','姓名','课题','导师','最终分数']]
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
                    db.students.find({},['_id','name','mentor','final','finalscore'])
                      .populate('mentor','name')
                      .populate('final','title')
                      .sort({finalscore:-1})
                      .exec()
                      .then((items)=>{
                        console.log(items);
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
                                        item.finalscore)
                                    excelData[0].data.push(row)
                                    resolve1()
                                })
                                
                            })).then(()=>{
                                var buffer = xlsx.build(excelData)
                                fs.writeFileSync('最终分数分组.xlsx',buffer,{'flag':'w'});
                            })
                      })
                })
            })
/*var topicData ={
	    1:1,
		2:"云计算研究",
		"details":"云计算，新的未来",
		"available":2,
		"selected":0,
		"fields":"云计算"
}*/
//console.log(topicData[2])
//var newTopic = new db.topics(topicData)


//db.initialTopics()
//setTimeout(function(){}, 10000) 

//db.initialStudentsAndMentors('../initialdata/测试数据.xlsx')
//newTopic.createTopic(function(err,results){
	//console.log(err)
	//console.log(results)
//})
/*db.topics.find({_id:5}).exec(function(err,doc){
	console.log(doc)
})*/
//db.topics.removeTopic(1)

/*var students = ['1030', '1031', '1032', '1033']
for(var i in students){
	if (students[i] === '1030')
		students.splice(i,1)
}
console.log(students)*/
/*db.mentors.findOneAndUpdate({_id: '2030513402'},
	                        {$set: {students: students}})
	                        .exec()*/
/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '163.com',
    auth: {
        user: '18861822074@163.com',
        pass: 'lsy123321'
    }
});

var mailOptions = {
    from: 'bsspirit ', // sender address
    to: '552084208@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});*/
//var App = require('alidayu-node');
//var app = new App('23681988', '0f14adb89325c37e59ab2f211fe53711');
 
/*app.smsSend({
    sms_free_sign_name: '毕业设计管理系统',
    sms_param: {"name": "吴吉"},
    rec_num: '18861823231',
    sms_template_code: 'SMS_53770189'
});*/
/*db.students.find({}).exec()
  .then((students)=>{
    var record = []
    for(var i=0;i<students.length;i++)
    {
        for(var j=0;j<2;j++)
        record[i]={a:j}
       // record[i].a =
    }
    console.log(record)
  })*/
