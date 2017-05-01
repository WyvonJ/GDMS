var express = require('express');
var router = express.Router();
var db = require('../models/db')

var models = {
	 0: db.students,
     1: db.mentors,
     2: db.admins
}
router.post('/login',(req,res) => {
	//const {account,password}=req.body
	console.log(req.body)
	var type = 0
	var account = req.body.account
	//console.log(account)
	var password = req.body.password
    if(account[0] === '1') type = 0
    else if(account[0] === '2') type = 1
    else if(account === 'admin') type = 2
    else console.log('err in lonin')
    console.log(type)
	//if(type === 2)

	models[type].findOne({_id: account},['password', 'name', 'notification','isfirstlogin'],(err,doc)=>{
		switch(true){
			case !!err:
				console.log(err)
				break
			case !doc:
				res.send({state:0})
				break
			case doc.password===password:
				{

					let t=new Date()
					res.send({state:1, userType: type, userName: doc.name, notification: doc.notification, isfirstlogin:doc.isfirstlogin})
					models[type].findOneAndUpdate({_id: account},
						                          {$set: {isfirstlogin: false}},
						                          {new: true}).exec()
					console.log(doc.name+'SignedIn')
					console.log('At '+t.getHours()+':'+t.getMinutes())
					break
				}
			case doc.password!==password:
			 	res.send({state:2})
			 	break
			default:
			 	res.send({state:3})
		}
	})
})

module.exports = router