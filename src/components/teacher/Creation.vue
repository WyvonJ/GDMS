<template>
	<div class="main-content">
    <div class="layout">
        <md-tabs md-fixed md-centerd class="md-transparent">
            <md-tab id="teacher-account-upload" md-label="课题创建" md-icon="library_add">
                <mu-card class="creation-card">
                    <mu-card-text>
                        <span>可选人数：{{available}}</span>
                        <mu-slider v-model="available" :min="1" :max="10" :step="1" @change="availableChange" class="available-slider"/>
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
                    <md-table-card>
                        <md-toolbar>
                            <h1 class="md-title">课题表</h1>
                        </md-toolbar>
                        <md-table>
                            <md-table-header>
                                <md-table-row>
                                    <md-table-head>序号</md-table-head>
                                    <md-table-head>类别</md-table-head>
                                    <md-table-head>名称</md-table-head>
                                    <md-table-head>
                                        <md-icon>more</md-icon>
                                        <span>简介</span>
                                    </md-table-head>
                                    <md-table-head>
                                        <span>可选人数</span>
                                    </md-table-head>
                                    <md-table-head>删除</md-table-head>
                                </md-table-row>
                            </md-table-header>
                            <md-table-body>
                                <md-table-row v-for="(topic, index) in topicsData" :key="rowIndex">
                                    <md-table-cell>{{ topic._id }}</md-table-cell>
                                    <md-table-cell>
                                        {{ topic.category===0?"论文":"设计" }}
                                    </md-table-cell>
                                    <md-table-cell>
                                        {{ topic.title }}
                                    </md-table-cell>
                                    <md-table-cell>
                                        {{ topic.details }}
                                    </md-table-cell>
                                    <md-table-cell>
                                        {{ topic.restriction }}
                                    </md-table-cell>
                                    <md-table-cell>
                                        <mu-icon-button icon="delete_forever" @click="deleteTopic(topic,index)" />
                                    </md-table-cell>
                                </md-table-row>
                            </md-table-body>
                        </md-table>
                    </md-table-card>
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
        topicsData: []
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
          this.$router.push('/')
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
        .md-table
        {
            width: 100%;
        }
        .md-table .md-table-cell:first-child .md-table-cell-container
        {
            padding-left: 20px;
        }
        .md-table .md-table-cell:nth-child(5) .md-table-cell-container
        {
            padding-left: 36px;
        }
    }
}

</style>