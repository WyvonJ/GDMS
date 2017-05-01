//
//路由级中间件 绑定对象为express.Router()
//Restful接口
//
/*const express=require('express')

const router=express.Router()
const db=require('./db')
//null function
const fn=()=>{}

//处理指向路径的POST请求
router.post('/api/login',(req,res)=>{
	//
	const {name,pwd}=req.body
	//
	db.User.findOne({name},'pwd',(err,doc)=>{
		switch(true){
			case !!err:
				console.log(err)
				break
			case !doc:
				res.send({state:0,msg:'帐号不存在！'})
				break
			case doc.pwd===pwd:
				res.send({state:1,msg:'登录成功'})
				break
			case doc.pwd!==pwd:
			 	res.send({state:2,msg:'密码错误'})
			 	break
			default:
			 	res.send({state:3,msg:'未知错误'})
		}
	})
})

module.exports=router*/