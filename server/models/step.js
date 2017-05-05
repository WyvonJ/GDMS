var mongoose = require('./mongodb')
var Schema = mongoose.Schema

/*存储目前程序运行到哪一步了*/
var stepSchema = new Schema
({
  key:{type:String},              	
	curstep: {type:String}
},{colletion: 'step' })

const step = mongoose.model('step',stepSchema)

var initialStep = new step({
  key:'system',
  curstep:'importmentorsdata'
})

step.find(null,function(err,doc){
    if(err){
      console.log(err)
    }else if (!doc.length){//如果数据库中没有初始状态
      initialStep.save()
      console.log('System step is importmentorsdata')
    }
    else{
      console.log('There are initialsetp in database')
      }
  })


exports.step = step

//总的步骤
//'importmentorsdata' //导入老师数据
//'createtopics'//创建题目
//'importstudentsdata'//导入学生数据
//'selecttopics'//第一次选题
//'reselecttopcs'//第二次选题，只能选一个
//'midgroup'//中期分组
//'finalgroup'//最后分组