/*
 *负责处理序号递增
 */
const mongoose = require('./mongodb')
const Schema = mongoose.Schema

const autoIncSchema = new Schema({
  collectionName: { type: String },
  topicsSeq: { type: Number, required: true, unique: true, defautl: 0 } //序号
}, { collection: 'autoInc' })

//自动递增表就是为了实现像ID的按顺序递增，这个方法可得到这个文档应该有的序号，并将Seq增加上做为下个使用
//对于Schema的静态方法而言，Model可以调用，并只要加 statics.方法名
//对于Schema的方法而言，要Document可以调用，要schema.methods.方法名
autoIncSchema.statics.getTopicsId = function(name, cb) {
  /*var ret = this.findOneAndUpdate(//｛query},{update},{options},{callback},按这个顺序加{}不要多加｛｝
            { collectionName: name },
            { $inc: { topicsSeq: 1  }},
            {new: true}
          ).exec(function(err, doc) {//findoneandupdate要加exec才有用
           console.log(' ret.topicSeq %d',ret.topicsSeq)
           return ret.topicsSeq
          })
    console.log(' ret.topicSeq %d',ret.topicsSeq)
   return ret.topicsSeq*/

  this.findOneAndUpdate({ collectionName: name }, { $inc: { topicsSeq: 1 } }, { new: true }).exec().then(function(doc) {
    //   console.log(doc)
    return cb(doc.topicsSeq)
  }).catch(function(err) {
    console.log(err);
  })
}

const autoIncModel = mongoose.model('autoIncModel', autoIncSchema)

//要让topics实现递增，从1开始
let newAutoIncID = new autoIncModel({
  collectionName: 'topics',
  topicsSeq: 0
})

autoIncModel.find(null, function(err, doc) {
    if (err) {
      console.log(err)
    } else if (!doc.length) {
      newAutoIncID.save()
    } else {
      console.log('autoInc has initial topicsSeq')
    }
  })
  //console.log(newAutoIncID._id);
  //save是一个异步函数，这样save之后才查找就可以找到

exports.autoIncModel = autoIncModel
