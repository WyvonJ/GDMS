//
//服务器入口
//

//加载FileSystem模块，实现文件I/O
const fs=require('fs')
//path处理和转换文件路径
const path=require('path')
const express=require('express')
const favicon=require('serve-favicon')
//中间件 完成请求体消息的三种转换功能
const bodyParser=require('body-parser')
const db=require('./models/db')
const resolve=file=>path.resolve(__dirname,file)
var routes = require('./routes');

//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
//中间件 对Cookie头进行处理 然后通过req.cookies访问所有cookie对象
//const cookieParser=require('cookie-parser')
//var cookieParser = require('cookie-parser');

//app表示Express应用
const app=express()

//中间件：对用户请求进行过滤和预处理，一般不会直接对客户端进行响应，而是将处理传递下去
//中间件是一个函数，可以访问请求对象req 响应对象res 以及web应用中处于请求-响应循环流程中的中间件，一般命名为next的变量

//应用级中间件绑定到app对象 使用app.use()和app.METHOD()


//设置port为预设或3000
app.set('port',(process.env.port||80))
//设置图标
app.use(favicon(resolve('../dist/favicon.ico')))
//将文本作为json解析 然后以req.body为结果对象
app.use(bodyParser.json())
//将文本作为URL编码数据解析 
app.use(bodyParser.urlencoded({extended:false}))

//express.static负责托管Express应用内的静态资源
app.use('/dist',express.static(resolve('../dist')))
//app.use(cookieParser())
/*app.use(session({
  resave: false,  
  saveUninitialized: true,  
  name: 'GDMS',// 设置 cookie 中保存 session id 的字段名称
  secret: 'GDMS',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: 2592000000// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: 'mongodb://127.0.0.1/GDMS'// mongodb 地址
  })
}));*/

//app.use(routes)//加载
routes(app)

app.get('*',function(req,res){
	const fileName='index.html'
	//以utf-8格式读取页面 readFile的同步版本
	const html=fs.readFileSync(resolve('../'+fileName),'utf-8')
	//返回页面
	res.send(html)
})
//监听从3000端口进入的连接请求 使用get方法得到set的port
app.listen(app.get('port'),function(){
	console.log('Visit http://localhost:'+app.get('port'))
})


//db.initialStudentsAndMentors('./initialdata/测试数据.xlsx')