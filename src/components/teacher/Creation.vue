<template>
    <div class="creation-container">
      <div class="tab-button">
        <button type="button" title="课题发布" @click="isTab=true" :class="{'focused':isTab}" class="add-topic-button">
          <mu-icon value="library_add"/>
          <span>课题发布</span>
        </button>
         
        <button type="button" @click="isTab=false" :class="{'focused':!isTab}" class="manage-topic-button">
          <mu-icon value="subject"/>
          <span>课题管理</span>
        </button>
      </div>
      <transition-group class="tab-box" name="tab-tran">
        <div id="tab-box1" key="tab1" v-show="isTab">
          <div class="creation-card">
              <span>可选人数：{{available}}</span>
              <mu-slider v-model="available" :min="1" :max="10" :step="1"  class="available-slider" />
              <br/>
              <div class="category-box">
                  <mu-radio label="设计" name="group" nativeValue="1" v-model="category"  uncheckIcon="build" checkedIcon="build" class="category-radio"/> 
                  <mu-radio label="论文" name="group" nativeValue="0" v-model="category"   uncheckIcon="assignment" checkedIcon="assignment"  class="category-radio"/>
              </div>
              <br/>
              <mu-flat-button secondary @click="dialog=true">
                选择研究方向
              </mu-flat-button>
              <div class="fields-chip">
                <span class="chip" v-for="field of fields">{{field}}</span>
              </div>
              <br/>
              <mu-text-field label="课题名称" v-model.trim="titleText" :errorText="titleError" labelFloat/>
              <br/>
              <mu-text-field label="课题简介" v-model.trim="detailText" :errorText="detailError" multiLine labelFloat :rows="6" :rowsMax="20" />
              <br/>
              <mu-raised-button label="发布课题" class="release-button" @click="createTopic" secondary>
                <img src="../../assets/icon/release.svg" alt="add" />
              </mu-raised-button>
          </div>
        </div>
        <div id="tab-box2" key="tab2" v-show="!isTab">
          <div class="table-container paper">
              <table>
                <thead slot="header">
                  <tr>
                    <th>序号</th>
                    <th>类别</th>
                    <th>课题名称</th>
                    <th>课题简介</th>
                    <th>可选人数</th>
                    <th>删除</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-if="!_tch_TopicCreatedAll.length" style="text-align: center;font-size: 32px;">
                      <td colspan="6">无</td>
                    </tr>
                  <tr v-for="(topic,index) in _tch_TopicCreatedAll">
                    <td width="6%">{{topic._id}}</td>
                    <td width="6%">{{topic.category===0?"论文":"设计"}}</td>
                    <td width="25%">{{topic.title}}
                    </td>
                    <td width="50%" class="topic-details">{{ topic.details }}</td>
                    <td width="8%" class="topic-restriction">{{ topic.restriction }}</td>
                    <td width="10%">
                      <mu-icon-button @click="deleteTopic(topic , index)" icon="cancel"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </transition-group>
      <mu-dialog :open="dialog" title="选择课题研究方向">
      <div class="fields">
          <mu-checkbox v-for="field of fieldsData"  :nativeValue="field" v-model="fields" :label="field" class="fields-checkbox"/>
      </div>
      <mu-flat-button label="确定" slot="actions" primary @click="dialog=false"/>
      </mu-dialog>
    </div>
</template>

<script type="text/javascript">
import { mapState, mapActions } from 'vuex'
import Fields from '../utils/Fields.vue'
export default {
  data() {
      return {
        available: 1, //初始可选人数
        category: '1', //初始类别 
        titleText: '', //课题名称
        detailText: '', //课题简介 
        fieldsError: '', //错误提示文字
        titleError: '',
        detailError: '',
        isTab: true,
        fields: [],
        dialog:false,
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
      getfields(finalFields){
        lg(finalFields)
      },
      createTopic() {
        this.dialog=true
        let id = cookie.get('user')
          //if (!id) return alert('登录超时，请重新操作')
        if (this.fields.length === 0) {
          return this.fieldsError = "还没选择课题研究方向！"
        }
        if (this.titleText.length === 0) {
          return this.titleError = "好像还没写课题名称？"
        }
        if (this.detailText.length === 0) {
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
                  title: this.titleText,
                  details: this.detailText,
                  available: this.available
                }
                //重新取得所有topics
              this.tchCreateTopic(currentTopic)
                .then(() => {
                  this.tchGetCreatedTopics({
                    teacherId: id,
                  })
                  this.fields = []
                  this.titleText = ''
                  this.detailText = ''
                  this.available = '1'
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
      clearError() {
        this.fieldsError = ''
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
      titleText: 'clearError',
      detailText: 'clearError'
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
        .available-slider
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

            width: 50vw;
            margin-bottom: 0;
            .mu-text-field-content
            {
                padding-top: 24px;
            }
        }
        .available,
        .category
        {
            max-width: 120px;

            text-align: center;
        }
        .fields
        {
            max-width: 50vw;
        }
        .select-field
        {
            width: 256px !important;
        }
        .dispatch{
          margin-bottom: 10px;
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
.mu-dialog-wrapper
{
    max-width: 648px !important;
}
.tab-button
{
    padding: 16px;

    text-align: center;
    button
    {
        border-radius: 0;
        color: $teal;
        border: 1px solid $teal;
        background-color: transparent;
        &.focused
        {
            background-color: $teal;
            color: white;
        }
    }
    .add-topic-button
    {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    .manage-topic-button
    {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }
}

#tab-box1,
#tab-box2
{
    width: 100%;
    display: flex;
    justify-content:center;
}
.release-button img{
  position: relative;
  left: 8px;
}
</style>