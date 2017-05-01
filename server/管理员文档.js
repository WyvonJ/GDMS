// Router
'/admin/',
//教师
//获取教师帐号
'admTchAccount',
'GET', [{
  _id: '',
  name: '',
  password:'',
  tel:'',
  email:'',
  office:''
}]
//帐号上传
'admTchUpload',
'GET',
//帐号删除 删除所有帐号
'admTchDelete',
//获取题目
'admTopics',

'GET' [{
	//教师
  name: '',
  topics: [{
    _id: 1,
    title: '',
    finalstudents: [{//最后的学生
      _id: '',
      name: ''
    }]
  }]
}],
//导出教师题目表
'admTopicsExport',
'GET'
'xxx.xlsx',

'admMidGroup'
'GET'
[{
	_id:1,
	teachers:[{
		name:''
	}],
	students:[{
		_id:'',
		name:'',
		title:''
	}]
}]

'admFnlGroup'
'GET'
[{
	_id:1,
	teachers:[{
		name:''
	}],
	students:[{
		_id:'',
		name:'',
		title:''
	}]
}]

//上传中期成绩 excel
'admUpMidGrade'
'POST'

'admUpFnlGrade'
'POST'

//查看成绩
'admMidGrade'
'GET'
[{
	_id:'',
	name:'',
	grade:60
}]
'admFnlGrade'
'GET'
[{
	_id:'',
	name:'',
	grade:60
}]

//给教师评价
//成绩 同一张表格
//分组显示合并
//管理员设置分组教室位置
//分组性别展示

//mongorestore -h 127.0.0.1:27017 -d GDMS G:\GDMS
