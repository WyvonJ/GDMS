const kMeans = require('../utils/kmeans')
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
[1, 4, 11, 12, 15, 16],
  [2, 5, 6, 7],
  [13, 14, 16],
  [3, 9, 10, 17]
]
let rank = []
for (var i = 0; i < data.length; i++) {
  let max = 0
  let rec = 0
  let arr=[]
  for (var j = 0; j < ref.length; j++) {
    let _m = multiply(data[i], ref[j])
    arr.push(_m)
  }
  rank[i] = [arr, tch[i]]
}
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
