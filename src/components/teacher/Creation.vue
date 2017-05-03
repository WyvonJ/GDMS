<template>
    <div class="creation-container sub-padding">
      <div class="tab-button">
        <button type="button" @click="isTab=true" :class="{'focused':isTab}" class="add-topic-button">
          <img src="../../assets/icon/library_add.svg" alt="add" />
          <span>课题发布</span>
        </button>
        <button type="button" @click="isTab=false" :class="{'focused':!isTab}" class="manage-topic-button">
          <img src="../../assets/icon/subject.svg" alt="man" />
          <span>课题管理</span>
        </button>
      </div>
      <transition-group class="tab-box" name="tab-tran">
        <div id="tab-box1" key="tab1" v-show="isTab">
          <div class="creation-card paper">
              <span>可选人数：{{available}}</span>
              <mu-slider v-model="available" :min="1" :max="10" :step="1"  class="available-slider" />
              <br/>
              <mu-select-field v-model="category" label="课题类别" class="select-field">
                <mu-menu-item value="0" title="论文" />
                <mu-menu-item value="1" title="设计" />
              </mu-select-field>
              <br/>
              <mu-select-field v-model="fields" multiple :labelFocusClass="['label-foucs']" :errorText="fieldsError" label="课题研究方向"  class="select-field" labelFloat>
                <mu-sub-header>可多选</mu-sub-header>
                <mu-menu-item v-for="text,index in fieldsData" :value="text" :title="text" />
              </mu-select-field>
              <br/>
              <mu-text-field label="课题名称" v-model.trim="titleText" :errorText="titleError" labelFloat/>
              <br/>
              <mu-text-field label="课题简介" v-model.trim="detailText" :errorText="detailError" multiLine labelFloat :rows="6" :rowsMax="20" />
              <br/>
              <button @click="createTopic" class="red">
               <img src="../../assets/icon/release.svg" alt="add" /> 
                <span>发布课题</span>
              </button>
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
                  <tr v-for="(topic,index) in _tch_TopicCreatedAll">
                    <td width="6%">{{topic._id}}</td>
                    <td width="6%">{{topic.category===0?"论文":"设计"}}</td>
                    <td width="25%">{{topic.title}}
                    </td>
                    <td width="50%" class="topic-details">{{ topic.details }}</td>
                    <td width="8%" class="topic-restriction">{{ topic.restriction }}</td>
                    <td width="10%">
                      <mu-icon-button @click="deleteTopic(topic , index)" icon="cancel"></mu-icon-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </transition-group>
    </div>
</template>


<script type="text/javascript">
import { mapState, mapActions } from 'vuex'
export default {
  data() {
      return {
        available: 1, //初始可选人数
        category: '0', //初始类别 论文 
        titleText: '', //课题名称
        detailText: '', //课题简介 
        fieldsError: '', //错误提示文字
        titleError: '',
        detailError: '',
        isTab:true,
        fields: [],
        fieldsData: [
        "图形图像处理", "游戏开发设计", "信息可视化", 
        "数字视音频处理", "移动互联网", "软件工程", 
        "Web开发", "人机交互", "虚拟现实&增强现实", 
        "文化传媒","信息安全","信号处理", 
        "云计算","大数据","机器学习&深度学习",
        "算法研究","其他"],
        fixedHeader: true,
        selectable: false,
        showCheckbox: false,
      }
    },
    computed: {
      ...mapState(['_tch_TopicCreatedAll'])
    },
    methods: {
      createTopic() {
        let id = _c.getCookie('user')

        if (this.fields.length === 0) {
          return this.fieldsError = "还没选择课题研究方向！"
        }
        if (this.titleText.length === 0) {
          return this.titleError = "好像还没写课题名称？"
        }
        if (this.detailText.length === 0) {
          return this.detailError = "随便写点介绍吧！"
        }
        let currentTopic = {
            mentor: id,
            category: this.category,
            fields: this.fields,
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
      },
      deleteTopic(topic, index) {
        let id = _c.getCookie('user')
        this.tchDeleteTopic({
            teacherId: id,
            topicId: topic._id
          })
          .then(() => {
            this.tchGetCreatedTopics({teacherId: id,})
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
      let id = _c.getCookie('user')
        //if (!id) 
        //return this.$router.push('/')
      this.tchGetCreatedTopics({teacherId: id})
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
    }
    table
    {
        width: 100%;
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

.tab-button
{
    padding: 16px;

    text-align: center;
    button
    {
        border-radius: 0;
        &.focused
        {
            -webkit-box-shadow: 0 0 3px 1px #898989;
               -moz-box-shadow: 0 0 3px 1px #898989;
                    box-shadow: 0 0 3px 1px #898989;
        }
    }
    .add-topic-button
    {
        background-color: $greenVue;
        &:hover
        {
            background-color: #4cd798;
        }
    }
    .manage-topic-button
    {
        background-color: $blue;
        &:hover
        {
            background-color: #64b5f6;
        }
    }
}

#tab-box1,
#tab-box2
{
    width: 100%;
}

</style>