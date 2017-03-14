<template>
  <div class="main-content">
    <mu-paper :zDepth="1">
      <md-toolbar :class="[toggleTableBar?'md-warn':'md-primary']">
        <h2 class="md-title" style="flex: 1">{{tableTitle}}</h2>
        <mu-icon-button icon="refresh" @click="refreshTopics" />
      </md-toolbar>
      <mu-table :fixedHeader="fixedHeader" height="640" :selectable="selectable" :showCheckbox="showCheckbox" @click.stop.self="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th width="9%">添加</mu-th>
            <mu-th width="9%">序号</mu-th>
            <mu-th width="12%">类别</mu-th>
            <mu-th width="45%">课题名称</mu-th>
            <mu-th width="28%">已选/可选</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody @click.stop="rowClick">
          <mu-tr v-for="(topic,index) in topicsInDisplay">
            <mu-td width="9%">
              <mu-icon-button icon="add_circle_outline" @click="click(index,topic)" /></mu-td>
            <mu-td width="9%">{{topic._id}}</mu-td>
            <mu-td width="12%">{{topic.category===0?"论文":"设计"}}</mu-td>
            <mu-td width="45%">{{topic.title}}
              <md-tooltip md-direction="top">
                <div class="details-appbar">DESCRIPTION</div>
                <div class="details-content">
                  {{topic.details}}
                </div>
              </md-tooltip>
            </mu-td>
            <mu-td width="25%" :class="{'all-selected-warn' : topic.selected >= topic.available}">{{ topic.selected }}/{{ topic.available }}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-content-block>
        <mu-pagination :total="total" :current="currentPage" :pageSize="pageSize" @pageChange="handlePage" :pageSizeOption="pageSizeOption" showSizeChanger @pageSizeChange="handlePageSizeChange">
        </mu-pagination>
      </mu-content-block>
    </mu-paper>
    <div class="topic-cart">
      <!-- 新的cart -->
    </div>
  </div>
</template>


<script>
//导入full build 以后更改需求
import { mapState, mapActions } from 'vuex'

export default {
  data() {
  	return {
  total: 120,
  currentPage: 1,
  pageSizeOption: [10, 20, 30, 40],
  pageSize: 10,
  fixedHeader: true,
  selectable: false,
  toggleTableBar: true,
  showCheckbox:false,
  lastSelection:0,
  tableTitle: '选题表',
  topicsChunk: [],
  topicsInDisplay: []
}

  },
  computed:{
    ...mapState(['topicsData'])
  },
    methods: {
      handlePage(newIndex) {
      	this.topicsInDisplay=[]
      	this.topicsInDisplay=this.topicsChunk[newIndex-1]
      	this.currentPage=newIndex
      },
      handlePageSizeChange(newPageSize) {
        this.pageSize = newPageSize
         this.topicsChunk = _.chunk(this.topicsData, this.pageSize)
      this.topicsInDisplay = this.topicsChunk[this.currentPage-1]
      },
      refreshTopics(){
        this.stuGetTopics()
          .then(()=>{
          this.total=this.topicsData.length
          this.topicsChunk = _.chunk(this.topicsData, this.pageSize)
          this.topicsInDisplay = this.topicsChunk[0]
      })
      },
      click(index,topic){
        var cart = this.$parent.selectedInCart
        if (topic._id!==this.lastSelection) {
          this.toggleTableBar = false
          switch (cart.length) {
            case 0:
              {
                cart.push(topic)
                break
              }
            case 1:
              {
                if (topic._id !== cart[0]._id) {
                  cart.push(topic)
                }else {
                  this.showSnackbar("不能选择相同志愿！")
                }
                break
              }
            case 2:
              {
                if (topic._id !== cart[0]._id && topic._id !== cart[1]._id) {
                  cart.push(topic)
                  this.showSnackbar("已经选满三个志愿，请在已选课题面板中编辑或提交。")
                } else {
                  this.showSnackbar("不能选择相同志愿！不能选择相同志愿！不能选择相同志愿！")
                }
                break
              }

            case 3:
              {
               this.showSnackbar("只能选取三个志愿，请在已选课题中编辑。")
              }
          }
        } else {
          this.toggleTableBar = true
        	this.lastSelection=topic._id
        }

      },
      ...mapActions(['stuGetTopics','showSnackbar'])

    },
    mounted() {
      var id = this.$root.getCookie('user')
      this.stuGetTopics().then(()=>{
        this.total=this.topicsData.length
        this.topicsChunk = _.chunk(this.topicsData, this.pageSize)
        this.topicsInDisplay = this.topicsChunk[0]
      })
      if (this.topicsInDisplay.length>0) {
        this.topicsInDisplay = _.sortBy(this.topicsInDisplay,(o)=>{
        return o._id
      })
      }
      
    }
}


</script>
<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.md-toolbar
{
    min-height: 40px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    h2.md-title
    {
        font-weight: lighter;
    }
    .mu-icon-button{
      padding: 0;
      width: 36px;
      height: 36px;
    }
}

.md-tooltip{
  width: 480px ;
  height: auto;
  font-size: 14px ;
  white-space: normal ;
  background-color: #fff;
  border-radius: 5px;
  color: #000;
  padding: 0;

    font-family: $fontYahei;
        -webkit-box-shadow: $material-shadow-3dp;
           -moz-box-shadow: $material-shadow-3dp;
                box-shadow: $material-shadow-3dp;
  .details-appbar{
    width: 100%;
    height: 24px;
    line-height: 16px;
    padding:4px 8px;
    background-color: #f44336;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

  }
  .details-content{
    padding: 8px;
  }
}
.all-selected-warn
{
    color: #f44336;
}
.mu-table
{
    .mu-td:nth-child(4)
    {
        cursor: help;
    }
    .mu-td
    {
        font-size: 14px;
        .mu-icon-button{
          &:hover{
            color: #f44336;
          }
          

        }
    }
    .mu-tr
    {
        transition: $material-leave;
    }
    .mu-tr.hover
{
    background-color: #efefef;
}
}

.mu-content-block
{
    padding-left: calc(50% - 200px);
    .mu-select-field
    {
        margin-bottom: 0 !important;
    }
}
@media (max-width: 1280px)
{
    .mu-table
    {
        .mu-td
        {
            font-size: 13px;

            height: 40px;
        }
        .mu-tr
        {
            height: 40px;
        }
        .mu-icon-button
        {
            width: 36px;
            height: 36px;
            padding: 0;
        }
    }
}

</style>