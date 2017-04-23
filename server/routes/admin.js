let express = require('express');
let router = express.Router();
let db = require('../models/db')
let fs = require("fs")

router.post('/admUpTchAccounts', (req, res) => {
	console.log(req.files)
	//const file=req.file('file')
	//yield file.move(Helpers.storagePath('/admUpTchAccounts'))
	//console.log(file)
})

module.exports = router
