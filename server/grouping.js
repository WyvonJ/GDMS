/*
*答辨分组
*/
var db  = require('./models/db')

var numGroups = 6 //分成4组的话
var numTopics = 0
var numStu = 0
var groupMentors = function(cb){//根据导师的类别比例进行分组
	db.students.count({}).exec().then((count)=> numStu = count)
	db.topics.count({}).exec().then((count)=> numTopics = count)
	db.mentors.count({}).exec()//numMentors是所有导师的数量
			  .then((numMentors)=>{
			  	    var numGroupMembers = Math.floor(numMentors/numGroups)//向下取整,每组中有多少人
			  	    var leftMentors = numMentors-numGroupMembers*numGroups//会剩下这么多人没得分组
			  	    var query = db.mentors.find()
			  	    query.select({name: 1, fields:1, classrate:1, group:1})
			  	    query.sort({classrate: -1})
			  	    query.exec()
			             .then((mentors)=>{
			             	//console.log(mentors)
			             	 var groupId = 0
			             	 var newNumGroupMembers = numGroupMembers
			            	 for(var i = 0; groupId+1<=numGroups && i <= numMentors-numGroupMembers ; i += numGroupMembers )
			             	 {			             	 	  
			             	 	   var group ={
                                			    _id:    ++groupId,
                                		    mentors:    [],
                                		     fields:    []
                                		      }	
                                if(numGroups - groupId + 1  ==  leftMentors)//到了最后面几组，一组给一个分不完的人
                                	newNumGroupMembers++              
                                for(var j = 0; j < newNumGroupMembers; j++)
                                	{
                              
                                		    group.mentors.push(mentors[i+j]._id)
                                		    db.mentors.findOneAndUpdate({_id: mentors[i+j]._id},
                                		    	                        {$set: {group: group._id}},
                                		    	                        {new: true}).exec()
                                           // mentors[i+j].group = group.groupId
                                           // mentors[i+j].save()
                                		for (var k=0; k<mentors[i+j].fields.length; k++)
                                		{
                                			//console.log(mentors[i+j].fields[k])
                                		  if(group.fields.indexOf(mentors[i+j].fields[k]) === -1)//有返回下标,没有返回-1
                                            group.fields.push(mentors[i+j].fields[k])//如果没有的话才导入所在组的方向
                                        }
                                	}
                                	if(newNumGroupMembers > numGroupMembers)i++
                                		
                                    var myGroup = new db.groups(group)
                                        myGroup.save()
			             	 }
			             	 //console.log(group)
			             	 
			             }).then(()=>{
			             	console.log('begin to group Topics')
			             	//groupTopics()
			             })
			        })
			  
}

var groupTopics = function(){
	db.topics.find({},['_id','mentor','fields','finalstudents']).exec()
	  .then((topics)=>{
	  	var numTopicGroups = Math.floor(numTopics/numGroups)//每组差不多要答遍这么多题目
      //  db.groups.find({},['_id','mentors','fields']).exec()
          db.groups.find({}).exec()
          .then((groups)=>{
            console.log(groups)
          	var randIndex = 0
          	for(var n in groups)  groups[n].numTopics = 0
          	for(var i in topics)
	  		{   
	  			//randIndex %= numGroups
	  			topics.isgrouped = false//还没有被分组
	  			for(var j =0; j < groups.length ; j++ )
	  			{
	  				//groups[j].numTopics = 0
	  				if( groups[j].mentors.indexOf(topics[i].mentor) != -1 || groups[j].numTopics > numTopicGroups)//如果题目的老师在这组里,就将题目放下一组
	  					continue
	  				for(var k = 0; k < topics[i].fields.length; k++)
	  					if(groups[j].fields.indexOf(topics[i].fields[k]) != -1){//如果这组有题目的研究方向
                         db.groups.findOneAndUpdate({_id:groups[j]._id},{$push: {topics: topics[i]._id}}).exec()
                            for(var s = 0; s<topics[i].finalstudents.length; s++ ){
                            	db.students.findOneAndUpdate({_id:topics[i].finalstudents[s]},{$set: {group: groups[j]._id}}).exec()
                            	db.groups.findOneAndUpdate({_id:groups[j]._id},{$push: {students:topics[i].finalstudents[s]}}).exec()
                            }
                         topics[i].isgrouped = true
                         groups[j].numTopics++
                         if(topics[i].isgrouped)break
                     }
                if(topics[i].isgrouped)break
	  			}
	  			if(!topics[i].isgrouped)//如果题目还没被分组就随便给一个好了
                   while(!topics[i].isgrouped)
                   {
                    if(groups[randIndex].mentors.indexOf(topics[i].mentor) === -1)
                     {
                   	   db.groups.findOneAndUpdate({_id:groups[randIndex]._id},{$push: {topics: topics[i]._id}}).exec()
                   	   for(var s = 0; s<topics[i].finalstudents.length; s++ ){
                            	db.students.findOneAndUpdate({_id:topics[i].finalstudents[s]},{$set: {group: groups[randIndex]._id}}).exec()
                            	db.groups.findOneAndUpdate({_id:groups[randIndex]._id},{$push: {students:topics[i].finalstudents[s]}}).exec()
                            	}   
                   	   topics[i].isgrouped = true
                   	   break
                   	 }
                   	 randIndex = (randIndex+1)%groups.length
                   }

	  		}
          })
	  	
	  
	  })
}

//groupMentors()
groupTopics()