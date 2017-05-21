const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const sha1 = require('sha1')
const rand = require('csprng')
const secret = require('../../config').jwt
const confirmToken = require('../middlewares/confirmToken')
let db = require('../models/db')

let models = [db.students, db.mentors, db.admins]

const creatToken = (id, name) => {
  return jwt.sign({
    id: id,
    name: name
  }, secret.cert, { expiresIn: '7d' })
}

router.post('/login', (req, res) => {
  let type = 0
  let account = req.body.account
  let password = req.body.password
  if (account[0] === '2') type = 1
  else if (account === 'admin') type = 2
  models[type].findOne({ _id: account }, ['password', 'name', 'notification', 'isfirstlogin', 'salt'], (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({ state: 0 })
        break
      case doc.password === sha1(password + doc.salt):
        {
          const token = creatToken(doc._id, doc.name)
          let t = new Date()
          res.status(200).send({ state: 1, userType: type, userName: doc.name, notification: doc.notification, isfirstlogin: doc.isfirstlogin, token: token })
          models[type].findOneAndUpdate({ _id: account }, { $set: { isfirstlogin: false } }, { new: true }).exec()

          console.log(doc.name + 'signed in at ' + t.getHours() + ':' + t.getMinutes() + '\n')
          break
        }
      case doc.password !== sha1(password + doc.salt):
        res.send({ state: 2 })
        break
      default:
        res.send({ state: 3 })
    }
  })
})

/*账号密码修改*/
router.post('/account', (req, res) => {
  const salt = rand(160, 36)
  let type = 0
  let account = req.body.account
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword

  if (account[0] === '2') type = 1
  else if (account === 'admin') type = 2
  models[type].findOne({ _id: account }, (err, item) => {
    let valid = sha1(oldPassword + item.salt)
    if (item.password !== valid)
      res.send({ state: 0 }) //密码错误
    else {
      item.password = sha1(newPassword + item.salt)
      item.save()
      res.send({ state: 1 })
    }
  })

})
router.get('/getstep', (req, res) => {
  if (db.step) {
    db.step.findOne({ key: 'system' }, 'curstep', (err, item) => {
      if (err) return
      res.send({ curstep: item.curstep })
    })
  } else {
    res.sendStatus(404)
  }
})
module.exports = router
