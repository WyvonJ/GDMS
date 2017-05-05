var a = ['A','B','C','D','F']
var b = ['a','b','c','d','f']
var c = ['L','M','N','O','P']
var db = require('../models/db')
//db.ImportMentorsData(FilePath)
//console.log(__dirname)
/*db.students.findOne({_id:'1030513425'},(err,student)=>{
	console.log(student)
           	student.name = 'King'
           	student.save()
})*/
          
           
           
/*Promise.all(a.map(itemA=>{
	return new Promise((resolve1,reject)=>{
		console.log(itemA)
		Promise.all(b.map(itemB=>{
			return new Promise((resolve2,reject)=>{
				console.log(itemB)
				Promise.all(c.map(itemC=>{
					return new Promise((resolve3,reject)=>{
						console.log(itemC)
						resolve3(itemC)
					})
				})).then(resolve2(itemB))
			})
		})).then(resolve1(itemA))
	})
}))*/
//a.push(1,2)
//console.log(a)