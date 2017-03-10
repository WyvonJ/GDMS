var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.post('/tchCreateTopic',(req,res) => {
	var newTopic = new db.topics(req.body)
	var newTopicId = newTopic.createTopic()
	res.send(newTopicId)
})

module.exports = router