/*const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});*/
var Promise = require('bluebird');
var t = [{id:1, l:['a','b']},{id:2, l:['c','d']},{id:3, l:['e','f']},{id:4, l:['g','h']}]; 
q = {
  n:1,
  b:2
}
q.c 
var db = require('../models/db')
/*for(var i in t )
{  var le = t[i].l
    setTimeout(function(){
    	for(var j in le)
		console.log(le[j])
    	}, 1000);
	
}*/
var my = ['a','e','i','我是']
//var array = require('lodash/array');
var r = my.indexOf('我是人')
//console.log(q)
/*var db  = require('../models/db')
 db.groups.find({},['_id','mentors','fields']).exec()
          .then((groups)=>{
            
          var k = groups[0].mentors.indexOf('1030113006')
		console.log(k)
   })*/
 /*var oneSecond = 1000 * 1; 
 setInterval(function() {
        console.log("here")
           }, oneSecond);*/

/*rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
})
  console.log(`Received1`);


  console.log(`Received2`);*/

/*exports.test = myf

myf()*/
/*var state = require('../state')

if(state.CurrentState == state.StateEnum.InitializeData)
console.log("InitializeData")
if(state.CurrentState == state.StateEnum.CreateTopics)
console.log("CreateTopics")
if(state.CurrentState == state.StateEnum.SelectTopics)
console.log("SelectTopics")
if(state.CurrentState == state.StateEnum.ReSelectTopics)
console.log("ReSelectTopics")


state.CurrentState = state.StateEnum.CreateTopics

if(state.CurrentState == state.StateEnum.DetermineGroups)
console.log("DetermineGroups")
if(state.CurrentState == state.StateEnum.Scoring)
console.log("Scoring")*/

var myfunction = function(){
//  var tchId = req.tchId
  var cardData = []
  db.mentors.findOne({_id: 1030113001},['eventstack'])
            .populate('eventstack')
            .exec()
            .then((mentor)=>{
            var topics = mentor.eventstack
            var cardData = []
           // var topic = {}
            for(var i = 0; i < topics.length; i++){

                db.topics.findOne({_id: topics[i]._id},['_id','category','title','available','firststudents'])
                         .populate('firststudents','gender name gender gpa intro')
                         .exec()
                         .then((topic)=>{
                          cardData.push(topic)
                        //  console.log(topic)
                         })
              }
             // console.log(cardData)
          })
}
//myfunction()
var cardData = []
var tchId = '1030113001'
db.mentors.findOne({_id: tchId},['eventstack'])
            .populate('eventstack')
            .exec()
            .then((mentor)=>{
             var topics = mentor.eventstack
             //console.log(topics)
             Promise.all(topics.map(topic=>fillCardData(topic,cardData)))
              .then(()=>console.log(cardData))
            })




function fillCardData(topic,cardData){
     return new Promise((resolve, reject)=>{

      db.topics.findOne({_id: topic._id},['_id','category','title','available','firststudents'])
                         .populate('firststudents','gender name gender gpa intro')
                         .exec((err,topic)=>{
                          cardData.push(topic)
                          resolve(topic)
                         // console.log(topic)
                         })
     // console.log(topic)
     // resolve(topic)
     })
   }
                  
          /* Promise.all(
            for(var i = 0; i < topics.length; i++){
                       db.topics.findOne({_id: topics[i]._id},['_id','category','title','available','firststudents'])
                         .populate('firststudents','gender name gender gpa intro')
                         .exec()
                         .then((topic)=>{
                        //  cardData.push(topic)
                          fillCardData(topic)
                         // console.log(topic)
                         })
             }}()).then((cardData)=>{
              console.log(cardData)
             )
             // res.send(cardData)
          }).then((cardData)=>{
             //console.log(cardData)
            // res.send(cardData)
          })

    var fillCardData = (topic)=>{
  return new Promise((resolve, reject)=>{
    return resolve(cardData.push(topic))
  })*/


//f()
/*var myarr = [1 , 2 , 4 , 5, 6, 7, 8, 9]
Promise.all(myarr.map(num=>printNum(num)))
       .then(console.log('here'))

function printNum(num){
  return new Promise((resolve, reject)=>{
     console.log(num)
  })
}*/