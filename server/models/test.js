const kMeans = require('kmeans-js')
const _ = require('lodash')
let lg = console.log
let data = []
const db = require('./db')
  //const grouping = require('../grouping')
db.mentors.find({}, (err, mentors) => {
    let fina = []
    for (let i = 0, ilen = mentors.length; i < ilen; i++) {
      mentors[i].gender='男'
      mentors[i].save()

    }
    // lg(fina)

  })
/*let rank = []
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

//lg(rank)

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

sort(rank, 6)*/
