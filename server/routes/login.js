var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.post('/login', (req, res) => {
  //const {account,password}=req.body
  var account = req.body.account;
  var password = req.body.password
  db.students.findOne({ _id: account }, 'password', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({ state: 0, msg: '帐号不存在！' })
        break
      case doc.password === password:
        {
          res.send({
            state: 1,
            userName: '陈伟',
            userType: 0,
            notification: '可以开始选题了！'
          })
          break
        }
      case doc.password !== password:
        res.send({ state: 2, msg: '密码错误' })
        break
      default:
        res.send({ state: 3, msg: '未知错误' })
    }
  })
})

module.exports = router
