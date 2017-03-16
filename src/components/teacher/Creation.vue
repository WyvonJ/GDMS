<template>
  <div class="main-content">
    <div class="layout">
      <md-tabs md-fixed md-centerd class="md-transparent">
        <md-tab id="teacher-account-upload" md-label="课题创建" md-icon="library_add">
          <mu-card class="creation-card">
            <mu-card-text>
              <span>可选人数：{{available}}</span>
              <mu-slider v-model="available" :min="1" :max="10" :step="1" @change="availableChange" class="available-slider" />
              <br/>
              <mu-select-field v-model="category" label="课题类别" @change="categoryChange">
                <mu-menu-item value="0" title="论文" />
                <mu-menu-item value="1" title="设计" />
              </mu-select-field>
              <mu-select-field v-model="fields" multiple :labelFocusClass="['label-foucs']" :errorText="fieldsError" label="课题研究方向" @change="fieldsChange" labelFloat>
                <mu-sub-header>可多选</mu-sub-header>
                <mu-menu-item v-for="text,index in fieldsData" :value="text" :title="text" />
              </mu-select-field>
              <mu-text-field label="课题名称" v-model.trim="titleText" :errorText="titleError" labelFloat/>
              <br/>
              <mu-text-field label="课题简介" v-model.trim="detailText" :errorText="detailError" multiLine labelFloat :rows="6" :rowsMax="20" />
            </mu-card-text>
            <mu-card-actions>
              <mu-raised-button icon="add" label="创建" @click="createTopic" secondary/>
            </mu-card-actions>
          </mu-card>
        </md-tab>
        <md-tab id="teacher-topic-admin" md-label="课题管理" md-icon="subject">
          <mu-card class="created-topics">
            <div class="table-container">
              <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox">
                <mu-thead slot="header">
                  <mu-tr>
                    <mu-th width="4%">序号</mu-th>
                    <mu-th width="8%">类别</mu-th>
                    <mu-th width="20%">课题名称</mu-th>
                    <mu-th width="42%">课题简介</mu-th>
                    <mu-th width="12%">可选人数</mu-th>
                    <mu-th width="9%">删除</mu-th>
                  </mu-tr>
                </mu-thead>
                <mu-tbody>
                  <mu-tr v-for="(topic,index) in topicsData">
                    <mu-td width="4%">{{topic._id}}</mu-td>
                    <mu-td width="7%">{{topic.category===0?"论文":"设计"}}</mu-td>
                    <mu-td width="20%">{{topic.title}}
                    </mu-td>
                    <mu-td width="44%">{{ topic.details }}</mu-td>
                    <mu-td width="10%">{{ topic.available }}</mu-td>
                    <mu-td width="10%">
                      <mu-icon-button @click="deleteTopic(topic , index)" icon="cancel"></mu-icon-button>
                    </mu-td>
                  </mu-tr>
                </mu-tbody>
              </mu-table>
            </div>
          </mu-card>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>


<script type="text/javascript">
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
      return {
        snackbarText: '', //snackbar提示条文字
        available: 1, //初始可选人数
        category: '0', //初始类别 论文 
        titleText: '', //课题名称
        detailText: '', //课题简介 
        fieldsError: '', //错误提示文字
        titleError: '',
        detailError: '',
        fields: [],
        fieldsData: ["计算机视觉", "iOS开发", "Android开发", "前端开发", "计算机图形学", "信息可视化", "云计算", "计算机网络", "人工智能"],
        topicsData: [{
            _id:16,
            category:0,
            title:'基于java的后端管理系统设计',
            details:'每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子',
            available:3
        }],
        fixedHeader:true,
        selectable:false,
        showCheckbox:false,
      }
    },
    computed: {
      ...mapState(['user', 'createdTopics'])
    },
    methods: {
      ...mapActions(['tchCreateTopic', 'tchDeleteTopic', 'tchGetCreatedTopics', 'showSnackbar']),
      ...mapMutations(['SHOW_SNACKBAR']),
      createTopic() {
        if (this.fields.length == 0) {
          return this.fieldsError = "还没选择课题研究方向！"
        }
        if (this.titleText.length == 0) {
          return this.titleError = "好像还没写名字？"
        }
        if (this.detailText.length == 0) {
          return this.detailError = "随便写点介绍吧！"
        }
        let currentTopic = {
          mentor: this.$root.getCookie('user'),
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
              teacherId: this.$root.getCookie('user'),
            })
            this.topicsData=this.createdTopics
            this.fields = []
            this.titleText = ''
            this.detailText = ''
            this.available = '1'
          })
      },
      deleteTopic(topic, index) {
        //删除已创建的课题
        this.tchDeleteTopic({
            teacherId: this.$root.getCookie('user'),
            topicId: topic._id
          })
          .then(() => {
            this.tchGetCreatedTopics({
                teacherId: this.$root.getCookie('user'),
              })
              .then(() => {
                this.topicsData = this.createdTopics
              })
              .then(() => {
                this.showSnackbar("课题已删除")
                this.topicsData = this.createdTopics
              })
          })
      },
      availableChange(value) {
        //选中后的值
        this.available = value;
      },
      categoryChange(value) {
        this.category = value
      },
      fieldsChange(value) {
        //得到value对应的index
        this.fields = value
      },
      clearError() {
        this.fieldsError = ''
        this.titleError = ''
        this.detailError = ''
      }
    },
    mounted() {
      //如果cookie过期则跳转到登录界面------------------
      if(this.$root.getCookie('user')){
      this.tchGetCreatedTopics({
          teacherId: this.$root.getCookie('user'),
        })
        .then(() => {
          this.topicsData = this.createdTopics
        })
        }else{
          //this.$router.push('/')
        }
    },
    watch: {
      fields: 'clearError',
      titleText: 'clearError',
      detailText: 'clearError'

    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.layout
{
    z-index: 0;

    width: 100%;
    .md-tabs-navigation{
        min-height: 60px;
    }
    .creation-card
    {
        text-align: left;
        .mu-card-text
        {
            padding: 8px 24px;
            .available-slider{
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
        }
        .mu-card-actions
        {
            height: 48px;
            padding: 0 8px;
            .mu-raised-button
            {
                margin-bottom: 8px;
            }
        }
        .md-input-container
        {
            max-width: 200px;
            margin-bottom: 6px;
            padding-top: 14px;
            .md-select-value
            {
                font-size: 14px;
            }
            + .md-input-container
            {
                margin-left: 4px;
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
    }
    .created-topics
    {
        .mu-table{
            .mu-td{
                white-space: normal;
            }
            tbody{
                .mu-tr:nth-child(2){
                    padding-left: 0;
                    padding-right: 0;
                }
            }
            .mu-icon-button{
                color: #f44336;
            }
        }
    }
}

</style>