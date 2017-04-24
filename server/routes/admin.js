const express = require('express')
let router = express.Router()
let db = require('../models/db')
let fs = require('fs')
let xlsx = require('node-xlsx')
var util = require('util')
const multiparty = require('multiparty')
router.post('/admUpTchAccounts', (req, res) => {
  console.log(req.files)
    //const file=req.file('file')
    //yield file.move(Helpers.storagePath('/admUpTchAccounts'))
    //console.log(file)
})
router.post('/admMidGradeUpload', (req, res) => {
  var form = new multiparty.Form({ uploadDir: './server/database/' });
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2)
    fs.renameSync(files.file[0].path, files.file[0].originalFilename)
    console.log(files.file[0])

    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
    res.write('received upload:\n\n');
    res.end(util.inspect({ fields: fields, files: filesTmp }))
  });
})


module.exports = router
