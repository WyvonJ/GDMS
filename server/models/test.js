const kMeans = require('kmeans-js')
let data = []
 // const db = require('./db')
const _ = require('lodash')
  /*for (let i = 0; i < 10; i++) {
    let n1 = parseInt(Math.random() * 10)
    let n2 = parseInt(Math.random() * 10)
    let n3 = parseInt(Math.random() * 10)
    data.push([n1, n2, n3])
  }
  */
data = [
  ["7", "14", "13", "16", "17"],
  ["8", "10", "9", "17"],
  ["1", "4", "6"],
  ["4", "7", "8", "9"],
  ["1", "16"],
  ["1", "3", "6", "16", "17"],
  ["2", "7", "6", "5"],
  ["13", "7", "11", "4"],
  ["1", "9", "5", "2"],
  ["12", "8", "1"],
  ["5", "14", "1", "6"],
  ["3", "8", "9", "10"],
  ["1", "2", "3", "5", "8", "9", "10"],
  ["6", "1", "7", "15"],
  ["1", "4", "8", "9"],
  ["3", "8", "9", "10"],
  ["1", "4", "8", "10", "17"],
  ["4", "1", "9", "8", "10"],
  ["5", "9", "2", "14", "12"],
  ["10", "8", "17"],
  ["2", "3", "10", "9", "6"],
  ["12", "1", "10", "16"]
]
/*let tod=[]
db.topics.find({}, (err, topics) => {
    for (let i = 0, ilen = topics.length; i < ilen; i++) {
      let fina = []
      tod.push(topics[i].fields)
    }
  })
	.then(()=>{
		//console.log(tod)
	})
*/
let km = new kMeans({
  K: 6,
  enableConvergenceTest:true
})

km.cluster(data)
while (km.step()) {
  km.findClosestCentroids()
  km.moveCentroids()
    // console.log(km.centroids);
  if (km.hasConverged()) break
}

console.log(km.currentIteration)
//console.log('Finished in:', km.currentIteration, ' iterations')
  //})
  //
