const mongoose = require('./mongodb')
const Schema = mongoose.Schema

/*存储目前程序运行到哪一步了*/
let stateSchema = new Schema
({              	
	currentstate: {type:String}
},{colletion: 'state' })

const state = mongoose.model('state',stateSchema)

let initialState = new admins({
  currentstate:'InitializeData'
})

state.find(null,function(err,doc){
    if(err){
      console.log(err)
    }else if (!doc.length){//如果数据库中没有初始状态
      initialState.save()}
    else{
      console.log('There are initial states in database')
      }
  })


exports.admins = admins