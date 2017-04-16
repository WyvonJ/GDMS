<template>
    <div class="creation-container">
    <div class="creation-width">
       <md-tabs md-fixed class="md-transparent">
        <md-tab id="teacher-account-upload" md-label="课题创建" md-icon="library_add">
          <mu-card class="creation-card">
            <mu-card-text>
              <span>可选人数：{{available}}</span>
              <mu-slider v-model="available" :min="1" :max="10" :step="1" @change="availableChange" class="available-slider" />
              <br/>
              <mu-select-field v-model="category" label="课题类别" @change="categoryChange" class="select-field">
                <mu-menu-item value="0" title="论文" />
                <mu-menu-item value="1" title="设计" />
              </mu-select-field>
              <br/>
              <mu-select-field v-model="fields" multiple :labelFocusClass="['label-foucs']" :errorText="fieldsError" label="课题研究方向" @change="fieldsChange" class="select-field" labelFloat>
                <mu-sub-header>可多选</mu-sub-header>
                <mu-menu-item v-for="text,index in fieldsData" :value="text" :title="text" />
              </mu-select-field>
              <br/>
              <mu-text-field label="课题名称" v-model.trim="titleText" :errorText="titleError" labelFloat/>
              <br/>
              <mu-text-field label="课题简介" v-model.trim="detailText" :errorText="detailError" multiLine labelFloat :rows="6" :rowsMax="20" />
            </mu-card-text>
            <mu-card-actions>
              <mu-raised-button label="创建" @click="createTopic" secondary>
                <i class="material-icons">add</i>
              </mu-raised-button>
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
                  <mu-tr v-for="(topic,index) in _tch_TopicCreatedAll">
                    <mu-td width="4%">{{topic._id}}</mu-td>
                    <mu-td width="7%">{{topic.category===0?"论文":"设计"}}</mu-td>
                    <mu-td width="20%">{{topic.title}}
                    </mu-td>
                    <mu-td width="44%">{{ topic.details }}</mu-td>
                    <mu-td width="10%">{{ topic.restriction }}</mu-td>
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
          return this.titleError = "好像还没写名字？"
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
            this.tchGetCreatedTopics({
                teacherId: id,
              })
              .then(() => {
                this.showSnackbar("课题已删除")
              })
              .catch(err=>{
                console.log('课题删除出错'+err)
              })
          })
      },
      availableChange(value) {
        this.available = value;
      },
      categoryChange(value) {
        this.category = value
      },
      fieldsChange(value) {
        this.fields = value
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
      this.tchGetCreatedTopics({
        teacherId: id
      })
    },
    watch: {
      fields: 'clearError',
      titleText: 'clearError',
      detailText: 'clearError'
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.creation-container
{
    z-index: 0;

    width: 100%;
    .md-tab{

    }
    .creation-width{
      width: 100%;
    }
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
        .select-field{
          width: 256px !important;
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