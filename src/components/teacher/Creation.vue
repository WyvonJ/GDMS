<template>
    <div class="creation-container">
        <div class="tab-button">
            <mu-raised-button label="发布课题" class="release-button" @click="dialogAdd" secondary>
                <img src="../../assets/icon/release.svg" alt="add" />
            </mu-raised-button>
        </div>
        <div class="table-container paper">
            <table>
                <thead slot="header">
                    <tr>
                        <th>序号</th>
                        <th>类别</th>
                        <th>课题名称</th>
                        <th class="row-details">课题简介</th>
                        <th>可选人数</th>
                        <th>编辑</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!_tch_TopicCreatedAll.length" style="text-align: center;font-size: 32px;">
                        <td colspan="6">无</td>
                    </tr>
                    <tr v-for="(topic,index) in _tch_TopicCreatedAll">
                        <td width="6%">{{topic._id}}</td>
                        <td width="6%">{{topic.category==0?"论文":"设计"}}</td>
                        <td width="25%">{{topic.title}}
                        </td>
                        <td width="50%" class="row-details">{{ topic.details }}</td>
                        <td width="8%" class="topic-restriction">{{ topic.restriction }}</td>
                        <td>
                            <mu-icon-button icon="edit" style="color: #009688;" @click="openDialog(topic)" />
                        </td>
                        <td width="10%">
                            <mu-icon-button @click="deleteTopic(topic , index)" icon="delete_forever" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <mu-dialog dialogClass="creation-dialog-class" :open="dialog" title="课题管理" @close="dialog=false">
            <div v-if="manual===0">
                <div class="fields">
                    <mu-checkbox v-for="field of fieldsData" :nativeValue="field" v-model="fields" :label="field" class="fields-checkbox" />
                </div>
                <mu-flat-button label="确定" slot="actions" primary @click="dialog=false" />
            </div>
            <div v-if="manual===1">
                <span v-if="!addoredit">课题编号{{topicId}}</span>
                <br>
                <span>可选人数：{{restriction}}</span>
                <mu-slider v-model="restriction" :min="1" :max="10" :step="1" class="restriction-slider" />
                <br/>
                <div class="category-box">
                    <mu-radio label="设计" name="group" nativeValue="1" v-model="category" uncheckIcon="build" checkedIcon="build" class="category-radio" />
                    <mu-radio label="论文" name="group" nativeValue="0" v-model="category" uncheckIcon="assignment" checkedIcon="assignment" class="category-radio" />
                </div>
                <div class="fields">
                <span style="color: #f44336;">{{fieldsError}} </span>
                <br/>

                    <mu-checkbox v-for="field of fieldsData" :nativeValue="field" v-model="fields" :label="field" class="fields-checkbox" />
                    
                </div>
                <mu-text-field  class="wide-text-field" label="课题名称" v-model.trim="title" :errorText="titleError" labelFloat/>
                <br/>
                <mu-text-field class="wide-text-field" label="课题简介" v-model.trim="details" :errorText="detailError" multiLine labelFloat :rows="6" :rowsMax="20" />
                <br/>
                <mu-raised-button v-if="addoredit" slot="actions" label="确认" class="release-button" @click="confirmAdd" icon="check" backgroundColor="blue" />
                <mu-raised-button  v-if="!addoredit" slot="actions" label="确认" class="release-button" @click="confirmEdit" icon="check" backgroundColor="blue" />
                <mu-flat-button slot="actions" label="取消" class="release-button" @click="dialog=false" icon="cancel" secondary/>
            </div>
        </mu-dialog>
    </div>
</template>


<script type="text/javascript">
import { mapState, mapActions } from 'vuex'
import Fields from '../utils/Fields.vue'
export default {
  data() {
      return {
        restriction: 1, //初始可选人数
        category: '1', //初始类别 
        title: '', //课题名称
        details: '', //课题简介 
        fieldsError: '选择课题研究方向', //错误提示文字
        titleError: '',
        detailError: '',
        addoredit:0,
        manual:0,
        isTab: true,
        dialog:false,
        topicId:0,
        fields:[],
        fieldsData: [
          "1.图形图像处理", "2.游戏开发设计", "3.信息可视化",
          "4.数字视音频处理", "5.移动互联网", "6.软件工程",
          "7.Web开发", "8.人机交互", "9.虚拟现实&增强现实",
          "10.文化传媒", "11.信息安全", "12.信号处理",
          "13.云计算", "14.大数据", "15.机器学习&深度学习",
          "16.算法研究", "17.其他"
        ]
      }
    },
    computed: {
      ...mapState(['_tch_TopicCreatedAll'])
    },
    methods: {
      dialogAdd(){
        this.clearForms()
        this.dialog=true
        this.manual=1
        this.addoredit=1
      },
      confirmAdd() {
        if (this.fields.length === 0) {
          return this.fieldsError = "还没选择课题研究方向！"
        }
        if (this.title.length === 0) {
          return this.titleError = "好像还没写课题名称？"
        }
        if (this.details.length === 0) {
          return this.detailError = "随便写点介绍吧！"
        }
        let fd=[]
        for(let i=0,len=this.fields.length;i<len;i++){
          fd.push(this.fields[i].split('.')[0])
        }
        this.GET('/getstep')
          .then(res => {
            if (res.data.curstep === 'createtopics') {
              let currentTopic = {
                  mentor: id,
                  category: this.category,
                  fields: fd,
                  title: this.title,
                  details: this.details,
                  restriction: this.restriction
                }
                //重新取得所有topics
              this.tchCreateTopic(currentTopic)
                .then(() => {
                  this.tchGetCreatedTopics({
                    teacherId: id,
                  })
                  this.fields = []
                  this.title = ''
                  this.details = ''
                  this.restriction = '1'
                  this.showSnackbar("课题创建成功")
                })
            } else {
              this.showSnackbar('现在无法对课题进行操作')
            }
          })
          .catch(err => {
            this.showSnackbar('出了点小问题，重新试试。')
            console.log(err)
          })
      },
      openDialog(topic){
        this.manual=1
        this.addoredit=0
        this.topicId=topic._id
        this.title=topic.title
        this.details=topic.details
        this.fields=topic.fields
        this.category=topic.category.toString()
        this.restriction=topic.restriction
        this.dialog=true
      },
      confirmEdit(){
        this.POST('/teacher/tchEditTopic',{
          teacherId:tchId,
          _id:this.topicId,
          title:this.title,
          details:this.details,
          fields:this.fields,
          category:this.category,
          restriction:this.restriction
        })
        .then(res=>{

        })
      },
      deleteTopic(topic, index) {
        let id = cookie.get('user')
        this.GET('/getstep')
          .then((res) => {
            let step = res.data.curstep
            if (step === 'createtopics') {
              this.tchDeleteTopic({
                  teacherId: id,
                  topicId: topic._id
                })
                .then(() => {
                  this.tchGetCreatedTopics({ teacherId: id, })
                })
            } else {
              this.showSnackbar('现在无法对课题进行操作')
            }
          })
          .catch(err => {
            this.showSnackbar('出了点小问题，重新试试。')
            console.log(err)
          })
      },
      clearForms(){
        this.title=''
        this.details=''
        this.fields=[]
        this.category='1'
        this.restriction=1
      },
      clearError() {
        this.fieldsError = '选择课题研究方向'
        this.titleError = ''
        this.detailError = ''
      },
      ...mapActions([
        'tchCreateTopic',
        'tchDeleteTopic',
        'tchGetCreatedTopics',
        'showSnackbar'
      ])
    },
    mounted() {
      //如果cookie过期则跳转到登录界面------------------
      let id = cookie.get('user')
        //if (!id) 
        //return this.$router.push('/')
      this.tchGetCreatedTopics({ teacherId: id })
    },
    components:{
      Fields
    },
    watch: {
      fields: 'clearError',
      title: 'clearError',
      details: 'clearError'
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.creation-container
{
    z-index: 0;
    .creation-card
    {
        padding: 8px 24px;

        text-align: left;
        .restriction-slider
        {
            width: 256px;
            margin-top: 12px;
            margin-bottom: 0;
        }
        .category-box{
          display: inline-block;
        }
        .category-radio{
          margin-right: 16px;
        }
        .mu-text-field
        {
            font-size: 14px;
            margin-bottom: 0;
            width: 80%;
            .mu-text-field-content
            {
                padding-top: 24px;
            }
        }
        .restriction,
        .category
        {
            max-width: 120px;

            text-align: center;
        }
        
    }
    table
    {
        width: 100%;
        th{
          padding-top: 8px;
          padding-bottom: 8px;
        }
        td
        {
            white-space: pre-line;
        }
        .row-details{
          @media screen and (max-width: 768px){
            display: none;
          }
        }
        .mu-icon-button
        {
            color: #f44336;
        }
        .topic-restriction
        {
            text-align: center;
        }
    }
}

.release-button img{
  position: relative;
  left: 8px;
}
</style>