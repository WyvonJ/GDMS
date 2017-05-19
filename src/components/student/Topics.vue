<template>
  <div class="topics-table-container">
    <div class="search-bar-wrapper">
      <mu-icon class="search-icon" value="search"/>
      <input type="text" @keyup.enter="search" autocomplete="off" v-model.trim="searchStr" placeholder="Search for topics" class="search-input" name="search">
    </div>
    <div class="table-container paper">
      <table>
        <caption>
          <span class="table-title">选题表</span>
          <mu-icon-button icon="refresh" @click="refreshTopics" />
        </caption>
        <thead>
          <tr>
            <th width="8%">添加</th>
            <th width="10%">
              <mu-flat-button class="category-sort" :class="{'sort-category-icon':isCategorySorted}" disabled @click="sortCategory" labelPosition="before">序号</mu-flat-button>
            </th>
            <th width="12%">
              <mu-flat-button class="category-sort" disabled labelPosition="before">类别</mu-flat-button>
            </th>
            <th width="50%">课题名称</th>
            <th width="16%">已选/可选</th>
          </tr>
        </thead>
      </table>
      <div class="topic-table-wrapper scrollbar" ref="tableBody">
        <table class="topic-table">
            <transition-group name="list" tag="tbody">
            <tr v-for="(topic,index) in search(_stu_TopicInTable)" :key="topic._id">
              <td width="10%">
                <span class="add-topic-button" @click="addTopic(index,topic)">
                <i class="material-icons">add_circle_outline</i>
              </span>
              </td>
              <td width="10%">{{topic._id}}</td>
              <td width="10%">{{topic.category===0?"论文":"设计"}}</td>
              <td width="52%">{{topic.title}}
                <wyvonj-tooltip direction="top" class="details-tooltip">
                  <div class="details-appbar">Description</div>
                  <div class="details-content">
                    {{topic.details}}
                  </div>
                </wyvonj-tooltip>
              </td>
              <td width="14%"><span :class="{'selected-all' : getTotal(topic) >= topic.restriction}" class="selected-restriction">{{ getTotal(topic) }}/{{ topic.restriction ||0}}</span>
                <wyvonj-tooltip direction="top" class="selected-tooltip">
                  <ul>
                    <li>第一志愿：{{topic.firststudents===undefined?0:topic.firststudents.length}}</li>
                    <li>第二志愿：{{topic.secondstudents===undefined?0:topic.secondstudents.length}}</li>
                    <li>第三志愿：{{topic.thirdstudents===undefined?0:topic.thirdstudents.length}}</li>
                  </ul>
                </wyvonj-tooltip>
              </td>
            </tr>
            </transition-group>
        </table>
      </div>
      <div class="table-footer">
        <mu-pagination :total="totalPage" :current="currentPage" @pageChange="handlePageChange">
        </mu-pagination>
      </div>
    </div>
    <div class="cart-toggle no-selection" @click="isCartDisplay=!isCartDisplay">
      <img src="../../assets/icon/assignment_w.svg" alt="cart" />
    </div>
    <div class="topics-cart" :class="{'show-cart':isCartDisplay}">
    <mu-icon-button class="close-cart-button" icon="clear" @click="isCartDisplay=false" />
      <div class="chosen-topics-title">
        已选课题
      </div>
      <div class="choice-cart scrollbar">
        <div class="topic-level">
          <transition-group tag="ul" name="slide-fade">
            <li class="selected-item" v-for="(topic,index) in topicsInCart" v-dragging="{ item: topic, list: topicsInCart, group: 'topic'}" :key="topic._id" :class="{'show-details':isDetails[index]}">
              <mu-avatar :size="20" :backgroundColor="selectedBgc[index]">
                {{index+1}}
              </mu-avatar>
              <mu-icon class="arrow-button" :class="{'show-details':isDetails[index]}" value="keyboard_arrow_right" @click="toggleDetails(index)" />
              <div class="selected-item-content">
                <span class="title">{{topic._id}}.{{topic.title}}</span>
                <p class="details" v-if="isDetails[index]">
                {{topic.details}}
                </p>
              </div>
              <mu-icon-button class="delete-button" icon="delete_forever" @click="deleteTopic(index)" />
            </li>
          </transition-group>
        </div>
        <button class="e-blue submit-button" :disabled="!topicsInCart[0]" @click="commitSelectedTopics">
          <i class="material-icons">check_circle</i>
          <span>提交</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import {KMP} from '../../utils/StringSearch'
export default {
  data() {
      return {
        isCartDisplay: false,
        isCategorySorted: false,
        lastSelection: 0,//上次选择 
        isDetails: [false, false, false],//是否展示购物车中课题详情
        selectedBgc: ["red500", "lightBlueA700", "teal500"],//选择课题的背景表示颜色
        searchStr: '', //搜索的字符串
        totalPage:100,//页码总数 作为分页参考
        currentPage:1,//当前页
        topicsInCart: [],//在购物车中的课题
        step: 'selecttopics'  //系统进度
      }
    },
    computed: {
      ...mapState(['_stu_TopicInTable', '_stu_TopicInCart'])
    },
    methods: {
      handlePageChange(newPage){
        this.currentPage = newPage
        let body = this.$refs.tableBody
        let ch = body.clientHeight
        let anchor = (body.scrollHeight - body.clientHeight)/10
        body.scrollTop = newPage * anchor
      },
      sortCategory() {
        this.isCategorySorted = !this.isCategorySorted
      },
      search(topics) {
        let reg = new RegExp(this.searchStr, 'i')
          //let isNum = this.searchStr.search(/^[0-9]*[1-9][0-9]*$/)
        return topics.filter((topics) => {


          if ((topics.title.match(reg) || topics._id.toString().match(reg))) {
            return true
          } else {

          }
        })
      },
      refreshTopics() {
        this.stuGetTopics()
      },
      getTotal(topic) {
        let t1 = topic.firststudents ?  topic.firststudents.length:0
        let t2 = topic.secondstudents ? topic.secondstudents.length:0
        let t3 = topic.thirdstudents ? topic.thirdstudents.length:0
        return t1 + t2 + t3
      },
      addTopic(index, topic) {
        //根据进度选择能选几个题目
        if(this.step === 'selecttopics'){
        let cart = this.topicsInCart
        if (topic._id !== this.lastSelection) {
          this.toggleTableBar = false
          switch (cart.length) {
            case 0:
              this.isCartDisplay = true
              this.topicsInCart.push(topic)
              this.showSnackbar("请在已选课题中编辑或提交选择。")
              break
            case 1:
              if (topic._id !== cart[0]._id) {
                this.topicsInCart.push(topic)
                this.isCartDisplay = true
              } else
                this.showSnackbar("不能选择相同志愿，请在已选课题中编辑！")
              break
            case 2:
              if (topic._id !== cart[0]._id && topic._id !== cart[1]._id) {
                this.isCartDisplay = true

                this.topicsInCart.push(topic)
                this.showSnackbar("已经选满三个志愿，请在已选课题面板中编辑或提交。")
              } else
                this.showSnackbar("不能选择相同志愿！不能选择相同志愿！不能选择相同志愿！")
              break
            case 3:
              this.isCartDisplay = true
              this.showSnackbar("只能选取三个志愿，请在已选课题中编辑。")
          }
        } else
          this.lastSelection = topic._id
        }else if(this.step === 'reselecttopics'){
          this.isCartDisplay = true
          if (this.topicsInCart.length===0)
            this.topicsInCart.push(topic)
          else
            this.showSnackbar("只能选择最终志愿，请与导师确认后提交")
        }else{
          this.showSnackbar("现在是非选题时间。")
        }
        
      },
      //提交选题按钮
      commitSelectedTopics() {
        let user=cookie.get('user')
        if (!user) {
          alert('登录超时，请重新登录')
          this.$router.push('/')
        }
        if (this.step==='selecttopics') {

          let wrapper = {
            _id: user,
            first: this.topicsInCart[0]._id,
            second: this.topicsInCart[1] ? this.topicsInCart[1]._id:-1,
            third: this.topicsInCart[2] ? this.topicsInCart[2]._id:-1
        }
        //提交选题是否成功
        this.stuCommitSelection(wrapper)
        }else if (this.step==='reselecttopics'){
          this.POST('/student/stuFinalTopic',{
            _id: user,
            final: this.topicsInCart[0]._id,
          })
        }
      },
      toggleDetails(index) {
        //设置对应的详情是否展示
        this.$set(this.isDetails, index, !this.isDetails[index])
      },
      deleteTopic(index) {
        //删除本条选题
        this.topicsInCart.splice(index, 1)
        //课题显示为零的话收回购物车显示
        if (this.topicsInCart.length === 0) {
          this.isCartDisplay = false
        }
      },
      ...mapActions(['stuGetTopics', 'showSnackbar', 'stuCommitSelection', 'stuSelectionResult'])
    },
    beforeDestroy() {
      //切换路由时如果还没保存 就弹出提示
      if (this.topicsInCart == this._stu_TopicInCart) {
        //console.log(0)
      }
    },
    mounted() {
      let id = cookie.get('user')
       this.GET('/getstep')
        .then(res=>{
          this.step = res.data.curstep
        })
      this.stuGetTopics() //获取学生课题

      this.stuSelectionResult({ studentId: id })//获取学生选题结果
        .then(()=>{
          //将选题结果放入Cart中
          this.topicsInCart = Object.assign([], this._stu_TopicInCart)
            if (this.topicsInCart.length > 0) {
              this.isCartDisplay = true //有已选课题则展示
            }
        })
    }
}

</script>
<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

.search-bar-wrapper
{
    position: relative;
    top: 8px;

    width: 40%;
    height: 48px;
    margin-bottom: 16px;
    padding-left: 48px;

    cursor: text;
    white-space: nowrap;

    border-radius: 3px;
    background-color: transparent;
    .search-icon
    {
        position: absolute;
        top: 0;
        left: 0;

        margin: 12px;
    }
    .search-input
    {
        font-size: 20px;

        position: relative;
        top: 8px;

        width: 100%;
        height: 32px;

        transition: $material-enter;

        border: 0;
        border-bottom: 2px #9f9f9f solid;
        outline: none;
        background-color: transparent;
        &:focus
        {
            border-bottom-color: $red;
        }
        @media (max-width:993px)
        {
            display: none;
        }
    }
}
input::-webkit-input-placeholder
{
    font-variant: small-caps;
}
input::-moz-input-placeholder
{
    font-variant: small-caps;
}
input::-ms-input-placeholder
{
    font-variant: small-caps;
}
input::-o-input-placeholder
{
    font-variant: small-caps;
}
.table-container
{

    width: 100%;

    transition: $material-enter;
    caption
    {
        position: relative;

        height: 36px;

        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        span.table-title
        {
            font-weight: lighter;

            float: left;

            margin: 8px;
        }
        .mu-icon-button
        {
            position: absolute;
            right: 0;

            width: 36px;
            height: 36px;
            padding: 0;
        }
    }
    .selected-restriction
    {
        padding: 4px;

        cursor: default;
        transition: $material-enter;

        color: $greenVue;
        border: 1px $greenVue solid;
        border-radius: 2px;
    }
    .selected-all
    {
        color: $red;
        border-color: $red;
    }
    .topic-table-wrapper{
      position: relative;
      overflow-x: hidden;
      overflow-y: scroll;
      height: calc(100vh - 296px);
      max-height: calc(100vh - 296px);
      width: 100%;
      -webkit-box-direction: normal;
      -webkit-tap-highlight-color: transparent;
    }
    table.topic-table
    {

        td:first-child
        {
            padding-right: 32px;
            padding-left: 16px;
        }
        td:nth-child(3)
        {
            font-weight: 400;
        }
        td:nth-child(4)
        {
            cursor: help;
            white-space: normal;
            font-weight: 400;
        }
        td
        {
            font-size: 14px;

            height: 40px;
            padding: 2px 0;
            .add-topic-button
            {
                width: 32px;
                height: 32px;
                margin-left: 12px;
                display: inline-block;

                cursor: pointer;
                transition: $material-enter;
                &:hover
                {
                    color: $red;
                }
            }
        }
        .category-sort
        {
            min-width: 36px;
        }
        tr:hover
        {
            background-color: #dedede;
            .selected-restriction
            {
                color: #fff;
                background-color: $greenVue;
            }
            .selected-all
            {
                color: #fff;
                background-color: $red;
            }
        }
    }
    .table-footer{
      width: 100%;
      height: 44px;
          display: flex;
    align-items: center;
    justify-content: center;
    }
}
.cart-toggle
{
    position: fixed;
    right: 32px;
    bottom: 32px;

    width: 64px;
    height: 64px;

    cursor: pointer;
    transition: $material-enter;

    border-radius: 32px;
    background-color: $red;
    box-shadow: 0 2px 8px 2px rgba(76, 76, 76, .32);
    &:hover
    {
        background-color: $red400;
        box-shadow: 0 3px 9px 2px rgba(76, 76, 76, .36);
    }
    img
    {
        position: relative;
        top: 16px;
        left: 16px;

        width: 32px;
        height: 32px;
    }
}
.topics-cart
{
    position: absolute;
    right: -270px;
    bottom: 112px;    
    overflow: hidden;

    width: 256px;
    padding-bottom: 16px;
    transition: $material-enter;

    background-color: white;
    -webkit-box-shadow: $material-shadow-3dp;
       -moz-box-shadow: $material-shadow-3dp;
            box-shadow: $material-shadow-3dp;
    &.show-cart
    {
        right: 0;
    }
    .close-cart-button{
      position: absolute;
      right: 0;
      top: -6px;
      color: white;
      &:hover{
        color: $red;
      }
    }
    .chosen-topics-title
    {
        font-size: 20px;
        width: 100%;
        padding: 8px;
        color: #f1f1f1;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        background: $indigo;
        text-align: center;
        font-weight: 400;
    }
    .dragging
    {
        -webkit-box-shadow: $material-shadow-3dp;
           -moz-box-shadow: $material-shadow-3dp;
                box-shadow: $material-shadow-3dp;
    }
}
.choice-cart
{
    margin-top: 12px;

    transition: $material-enter;
    max-height: 480px;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    .selected-item
    {
        position: relative;

        width: 240px;
        min-height: 80px;
        margin: 8px auto;

        cursor: move;
        transition: $material-enter;

        border: 1px #dedede solid;
        border-radius: 3px;
        &.show-details
        {
            min-height: 256px;
        }
        &:hover
        {
            background-color: #efefef;
        }
        .mu-avatar
        {
            font-family: $fontSansSerif;

            position: absolute;
            z-index: 100;
            top: 6px;
            left: 6px;

            cursor: default;
        }
        .arrow-button
        {
            position: absolute;
            top: 48px;
            left: 5px;

            cursor: pointer;
            transition: $material-enter;
            &.show-details
            {
                transform: rotateZ(90deg);
            }
        }
        .delete-button
        {
            position: absolute;
            right: 0;
            bottom: 0;

            width: 36px;
            height: 36px;
            padding: 0;

            color: $red;
        }
        .selected-item-content
        {
            position: absolute;
            top: 10px;
            left: 32px;

            width: 200px;
            .title
            {
                font-size: 14px;

                display: inline-block;
            }
            p.details
            {
                font-size: 13px;

                margin-top: 12px;
            }
        }
    }
    .submit-button
    {
        width: 128px;
        span{
              letter-spacing: 10px;
               font-size: 16px;
        }
    }
}



@media (max-width: 993px)
{
    .topics-cart
    {
        right: -270px;
    }
}

.wyvonj-tooltip
{
    font-family: $fontYahei;
    font-size: 14px;

    z-index: 248;

    height: auto;

    white-space: normal;

    color: #000;
    border-radius: 2px;
    background-color: #fff;
    -webkit-box-shadow: $material-shadow-3dp;
       -moz-box-shadow: $material-shadow-3dp;
            box-shadow: $material-shadow-3dp;
}

.wyvonj-tooltip.selected-tooltip
{
    width: 100px;
    padding: 8px;
}
.wyvonj-tooltip.details-tooltip
{
    width: 480px;
    padding: 0;
    .details-appbar
    {
        font-variant: small-caps;
        line-height: 16px;

        width: 100%;
        height: 24px;
        padding: 4px 8px;

        color: #fff;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        background-color: $red;
    }
    .details-content
    {
        padding: 8px;
    }
}


.slide-fade-enter-active,
.slide-fade-leave-active
{
    transition: $material-enter;
    transition-duration: .4s;
}

.slide-fade-enter,
.slide-fade-leave-active
{
    transform: translateX(40px);

    opacity: 0;
}
.slide-fade-move
{
    transition: $material-enter;
}

.list-enter-active,
.list-leave-active
{
    transition: all .4s cubic-bezier(0, .68, 0, 1.04);
}
.list-enter,
.list-leave-active
{
    transform: translateX(30px);

    opacity: 0;
}

</style>