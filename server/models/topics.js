/*
 *创建topics model即话题表格
 */
var mongoose = require('./mongodb')
var Schema = mongoose.Schema
var autoIncModel = require('./autoIncModel').autoIncModel
var students = require('./students').students
var mentors = require('./mentors').mentors

var topicsSchema = new Schema({ /*这里重写了_id属性，这样可以用来关联查询*/
  _id: { type: Number }, //序号,为什么一定要加default啊？？？才有因为要required唉
  //topicid:        {type:  Number}
  category: { type: Number, required: true }, //分类 0论文 1设计
  title: { type: String, required: true }, //名称
  details: { type: String }, //描述
  isselected: { type: Boolean, required: true, default: false }, //这个学生是不是已经选择了题目
  available: { type: Number, required: true }, //可选人数
  selected: { type: Number, dafault: 0 }, //已选人数
  fields: { type: [String], required: true }, //课题方向
  mentor: { type: String, ref: 'mentors' }, //出题老师
  restriction: { type: Number }, //限制人数
  finalstudents: [{ type: String, ref: 'students' }], //最终选题的学生
  firststudents: [{ type: String, ref: 'students' }], //第一志愿选这个题的学生
  secondstudents: [{ type: String, ref: 'students' }], //第二志愿选这个题的学生
  thirdstudents: [{ type: String, ref: 'students' }], //第三志愿选这个题的学生
}, { colletion: 'topics' })

//在save前要用pre啊啊啊
//topicsSchema.pre('save',function(next)//每个题目保存前先得到该题目的序号，然后保存
//{		/*这样可以保证第一个存的序号就是1，然后递增*/
//		var ret  = this
//		//这个this是指doc 即topics的实例，但里面回调函数的this不是
//		autoIncModel.getTopicsId('topics',function(ID){
//		ret._id = ID//这样可以得外到的this ret即外面的this
//		next()
//	})
//	//next之后就是save
//}

/*plugin却是每个Schema都要用的时候，才弄个插件这样就，哪个模式要用加上这个插件就好了*/
/*就是在创建每个topic后就要给一个递增的序号，但觉得完全没有用中间件的必要*/
topicsSchema.methods.initializeTopicsId = function(cb) {
    autoIncModel.getTopicsId('topics', (ID) => {
        this._id = ID
        cb()
      }) //传入一个回调函数，在得到_id后是要调下回调的，这样每个
  } //topic在保存后就会得到一个_id

/*创建一个题目，并给一个按顺序的序号*/
topicsSchema.methods.createTopic = function(cb) {
    // this.initializeTopicsId(()=> this.save())//注意这里是一个回调函数，为了让回调函数的this是指向topic的
    autoIncModel.getTopicsId('topics', (ID) => {
      this._id = ID
      this.restriction = this.available
      this.save((err, topic) => {
        getNewId(err, this._id)
        mentors.findOneAndUpdate({ _id: topic.mentor }, { $addToSet: { topics: topic._id } }, { new: true }).exec((err, mentor) => {

        })
      })
    })
    var getNewId = function(err, newId) {
      cb(err, newId)
    }

  } //所以要用箭头函数


/*删除一个题目，并让最后面的题目移动到删除的题目这*/
/*删除一个题目觉得还是静态方法好*/
/*静态方法用的是statics 多加个s*/
/*mongodb的主键不能该，所以只能删除了，再插入*/
topicsSchema.statics.removeTopic = function(topicId, cb) {
  /*this.findOneAndRemove({_id: topicId}).exec( (err, deleteTopic) =>{
  											//console.log(deleteTopic)
  											var query = this.find({})
  											query.where('_id').gt(deleteTopic._id)
  											query.exec((err, docs) =>{
  												for( var i in docs){
  													
  													var newID = docs[i]._id - 1
  													this.update({_id: docs[i]._id},{$set: {_id: newID}}).exec()

  													}
  													})
  												})*/

  this.findOneAndRemove({ _id: topicId }).exec()
    .then((deletedTopic) => {
      console.log(deletedTopic)
      this.model('autoIncModel').findOneAndUpdate({ collectionName: 'topics' }, { $inc: { topicsSeq: -1 } }, { new: true }).exec()
        .then((doc) => {
          if (doc.topicsSeq + 1 == deletedTopic._id) return //如果要删除的是最后一个题目 就直接删除了
          this.findOneAndRemove({ _id: doc.topicsSeq + 1 }).exec((err, lastdoc) => {

            var deletedId = deletedTopic._id
            console.log(`deletedTopicId + ${deletedId}`)
            console.log(`lastTopicId + ${lastdoc._id}`)
              //   if (lastdoc.mentors != deletedTopic.mentors)
            mentors.findOneAndUpdate({ _id: lastdoc.mentor }, {
                $pull: { topics: lastdoc._id }
              }, { new: true })
              .exec(() => {
                mentors.findOneAndUpdate({ _id: lastdoc.mentor }, {
                    //  $pull: { topics: lastdoc._id },
                    $addToSet: { topics: deletedId }
                  }, { new: true })
                  .exec()
              })
              //  console.log(lastdoc)


            lastdoc._id = deletedId //删除的题目

            this.collection.insert(lastdoc) //插入最后一个题

          })
        })
    }).catch((err) => console.log(err))



}

const topics = mongoose.model('topics', topicsSchema)
exports.topics = topics
