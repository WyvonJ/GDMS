var xlsx = require('node-xlsx')
var fs = require('fs')
//读取文件内容
var obj = xlsx.parse('./测试数据.xlsx')
var excelObj = obj[0].data
console.log(obj)
//从控制台输出的数据可以知道
//1.obj是一个数组 分别是是三个sheet的数据
//格式差不多是｛name:sheet名， data:每行的数据集
//2.data就是excel中每行的数据数组
//3.data中的每个元素就是一个数组[学号，姓名，密码，性别]一行一行的样子

global.StateEnum = 
{
  InitializeData: 0,
  CreateTopics: 1,
  SelectTopics: 2,
  ReSelectTopics: 3,
  DetermineGroups: 4,
  Scoring: 5
}
global.CurrentState = global.StateEnum.InitializeData