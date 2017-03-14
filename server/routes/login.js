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
	var type = 0
	var account = req.body.account
	var password = req.body.password
    if(account[0] == 1) type = 0
    else if(account[0] == 2) type = 1
    else if(account == 'admin') type = 2
    else console.log('err in lonin')
  //  console.log(type)

	models[type].findOne({_id: account},['password', 'name', 'notification'],(err,doc)=>{
		switch(true){
			case !!err:
				console.log(err)
				break
			case !doc:
				res.send({state:0})
				break
			case doc.password===password:
				{
					res.send({state:1, userType: type, userName: doc.name, notification: doc.notification})
				//	console.log(doc.name)
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