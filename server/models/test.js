const kMeans = require('kmeans-js')
const _ = require('lodash')
let lg = console.log
let data = []
  //const db = require('./db')
  /*for (let i = 0; i < 10; i++) {
    let n1 = parseInt(Math.random() * 10)
    let n2 = parseInt(Math.random() * 10)
    let n3 = parseInt(Math.random() * 10)
    data.push([n1, n2, n3])
  }
  */

let multiply = function(arr1, arr2) {
  let abs = 0
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      //abs += (arr1[i] - arr2[j]) * (arr1[i] - arr2[j])
      if ((arr1[i] - arr2[j]) === 0) {
        abs++
      }
    }
  }
  return abs
}

let tch = [
  '张得天',
  '赵燕',
  '晏涛',
  '夏鸿斌',
  '王士同',
  '张军',
  '陈飞',
  '刘渊',
  '狄岚',
  '陈伟',
  '邓赵红',
  '黄秋儒',
  '律睿敏',
  '钱鹏江',
  '林意',
  '孟磊',
  '陈丽芳',
  '陈秀宏',
  '丁彦蕊',
  '吴锋',
  '谢振平',
  '蒋亦樟'
]

data = [
    [7, 14, 13, 16, 17],
    [8, 10, 9, 17],
    [1, 4, 6],
    [4, 7, 8, 9],
    [1, 16],
    [1, 3, 6, 16, 17],
    [2, 7, 6, 5],
    [13, 7, 11, 4],
    [1, 9, 5, 2],
    [12, 8, 1],
    [5, 14, 1, 6],
    [3, 8, 9, 10],
    [1, 2, 3, 5, 8, 9, 10],
    [6, 1, 7, 15],
    [1, 4, 8, 9],
    [3, 8, 9, 10],
    [1, 4, 8, 10, 17],
    [4, 1, 9, 8, 10],
    [5, 9, 2, 14, 12],
    [10, 8, 17],
    [2, 3, 10, 9, 6],
    [12, 1, 10, 16]
  ]
  /**/
  /*
  [4, 7, 8, 9],
  [1, 16],
  [ 13, 7, 11, 4 ],
  [ 4, 1, 9, 8, 10 ],
  [ 5, 9, 2, 14, 12 ],
  [ 6, 1, 7, 15 ]*/
let ref = [
  [4, 7, 8, 9],
  [1, 16],
  [13, 7, 11, 4],
  [4, 1, 9, 8, 10],
  [5, 9, 2, 14, 12],
  [6, 1, 7, 15]
]
let rank = []
for (var i = 0; i < data.length; i++) {
  let min = Infinity
  let rec = 0
  let arr = []
  arr[i] = []
  let grouped = false
  for (var j = 0; j < ref.length; j++) {
    let _m = 1 - _.intersection(data[i], ref[j]).length / _.union(data[i], ref[j]).length
    _m ? null : grouped = true
    if (min > _m) {
      min = _m
      rec = j + 1
    }
    arr[i].push({
      rank: j + 1,
      value: _m.toFixed(2)
    })
  }
  arr[i].sort((a, b) => {
    return a.value - b.value
  })
  for (var k = 0; k < arr[i].length; k++) {
    arr[i][k] = arr[i][k].value
  }
  rank[i] = [arr[i], tch[i], grouped]
}

_.forEach(rank, (e, i) => {
  let min = 0
  let len = e[0].length
  let k
  _.forEach(e[0], (_e, _i) => {
    k = len - _i
    min += (_e - _i) * (_e - _i) * Math.pow(4, 2 * k)
  })
  e.push(min)
})
rank.sort((a, b) => {
  return _.last(a) - _.last(b)
})

let capacity = Math.floor(data.length / ref.length) //每组的基本容量
let mod = data.length % ref.length //基本容量多出来的人

lg(rank)
  //以第一个为标准

/*db.topics.find({}, (err, topics) => {
    for (let i = 0, ilen = topics.length; i < ilen; i++) {
      let fina = []
      console.log(topics[i]._id)
      _.forEach(topics[i].fields,(f,i)=>{
        console.log(f)
      })
      
    }
  })
  .then(()=>{
    //console.log(tch)
  })*/

/*let newdata = []
_.forEach(data, (row) => {
  if (row.length < 8) {
    let numof0 = 7 - row.length
    let arr = _.fill(Array(numof0), 0)
    newdata.push(_.concat(row, arr))
  }
})*/

/*let km = new kMeans({
  K: 6,
  enableConvergenceTest: true
})
km.cluster(data)
while (km.step()) {
  km.findClosestCentroids()
  km.moveCentroids()
    // console.log(km.centroids);
  if (km.hasConverged()) break
}
//console.log(km.clusters)
/*
_.forEach(km.clusters, (cluster) => {
  _.forEach(cluster,(clt,i)=>{
    cluster[i]=tch[clt]
  })
})*/
//console.log(km.clusters)
//console.log('Finished in:', km.currentIteration, ' iterations')
//})
var sort = function(data, n) {
  let mentors = []
  let groups = []
  var numMentors = data.length
  var aveNum = Math.floor(numMentors / n)
  var left = numMentors % n
  var k = 0
  for (var i = 0; i < numMentors; i++) {
    var mentor = {}
    mentor.dist = data[i][0]
    mentor.name = data[i][1]
    mentor.iscenter = data[i][2]
    mentor.isgrouped = false
    mentors.push(mentor)
  }
  for (var i = 0; i < n; i++) {
    var group = {}
    group.mentors = []
    group.restriction = aveNum
    if (i >= n - left) group.restriction++
      group.available = group.restriction
    groups.push(group)
  }
  for (var i = 0; i < numMentors; i++) {
    if (mentors[i].iscenter) {
      groups[k].mentors.push(mentors[i].name)
      mentors[i].isgrouped = true
      groups[k].available--
        k++
    }
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < numMentors; j++) {
      if (mentors[j].isgrouped) continue
      var groupId = mentors[j].dist[i] - 1
      if (groups[groupId].available > 0) {
        groups[groupId].mentors.push(mentors[j].name)
        mentors[j].isgrouped = true
        groups[groupId].available--
      }
    }
  }
  return groups
}

sort(rank, 6)
