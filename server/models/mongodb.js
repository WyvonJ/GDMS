/*
*功能：负责处理数据库连接
*/
const DB_URL="mongodb://127.0.0.1/GDMS"
const mongoose=require('mongoose')
var bluebird = require('bluebird')
mongoose.Promise = bluebird//mongoose的promise使用bluebird
//const Schema=mongoose.Schema
//var topicsModel = require('./topics').topicsModel;
//建立到app数据库的连接
//mongoose.Promise = global.Promise

options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};

mongoose.connect(DB_URL, options)
const dbConnection=mongoose.connection

//连接异常所调用的回调函数
dbConnection.on('error',function(){
	console.log('Datebase connection Error.')
})



//打开数据库连接一旦打开就打出这句话
dbConnection.once('open',function(){
	console.log('The datebase has connected.')
	/*Promise.all(topics.map(item=>new topicsModel(item).save()))
			.then(()=>console.log('Initialize successfully.'))
			.catch(()=>console.log('Something went wrong during initializing.'))*/
})



//导出三个对像
//exports.Schema = Schema
//exports.connection = dbConnection
module.exports  = mongoose
//exports.dbConnection = dbConnection
//exports.autoIncModel = autoIncModel