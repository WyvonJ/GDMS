
const jwt = require('jsonwebtoken')
const rand =require('csprng')
const sha1=require('sha1')
let salt = 'dv2tfpqo705ymot7q0fo9umu5888cam'
let pass = sha1('1030513101'+salt)
console.log(pass) 