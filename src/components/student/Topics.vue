<template>
  <div class="topics-table-container">
    <div class="sub-padding">
      <div class="table-container" :class="{'show-cart':_stu_TopicInCart[0]}">
        <md-toolbar :class="{'md-warn':!_stu_TopicInCart[0]}">
          <h2 class="md-title" style="flex: 1">{{tableTitle}}</h2>
          <mu-icon-button icon="refresh" @click="refreshTopics" />
        </md-toolbar>
        <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox">
          <mu-thead slot="header">
            <mu-tr>
              <mu-th width="8%">添加</mu-th>
              <mu-th width="8%">
                <mu-flat-button class="category-sort" :class="{'sort-category-icon':isCategorySorted}" disabled @click="sortCategory" labelPosition="before">序号</mu-flat-button>
              </mu-th>
              <mu-th width="10%">
                <mu-flat-button class="category-sort" disabled labelPosition="before">类别</mu-flat-button>
              </mu-th>
              <mu-th width="60%">课题名称</mu-th>
              <mu-th width="16%">已选/可选</mu-th>
            </mu-tr>
          </mu-thead>
          <transition-group name="list" tag="tbody" class="list-box">
            <mu-tr v-for="(topic,index) in search(_stu_TopicInTable)" :key="topic._id">
              <mu-td width="8%">
                <mu-icon-button icon="add_circle_outline" @click="click(index,topic)" /></mu-td>
              <mu-td width="8%">{{topic._id}}</mu-td>
              <mu-td width="10%">{{topic.category===0?"论文":"设计"}}</mu-td>
              <mu-td width="60%">{{topic.title}}
                <md-tooltip md-direction="top" class="details-tooltip">
                  <div class="details-appbar">Description</div>
                  <div class="details-content">
                    {{topic.details}}
                  </div>
                </md-tooltip>
              </mu-td>
              <mu-td width="14%"><span :class="{'all-selected-warn' : getTotal(topic) >= topic.restriction}" class="selected-restriction">{{ getTotal(topic) }}/{{ topic.restriction ||0}}</span>
                <md-tooltip md-direction="top" class="selected-tooltip">
                  <ul>
                    <li>第一志愿：{{topic.firststudents===undefined?0:topic.firststudents.length}}</li>
                    <li>第二志愿：{{topic.secondstudents===undefined?0:topic.secondstudents.length}}</li>
                    <li>第三志愿：{{topic.thirdstudents===undefined?0:topic.thirdstudents.length}}</li>
                  </ul>
                </md-tooltip>
              </mu-td>
            </mu-tr>
          </transition-group>
        </mu-table>
      </div>
      <div class="topics-cart" :class="{'show-cart':_stu_TopicInCart[0]}">
        <div class="chosen-topics-title">
          已选课题
        </div>
        <div class="choice-cart">
          <div class="topic-level">
            <transition-group tag="ul" name="slide-fade">
              <li class="selected-item" v-for="(topic,index) in _stu_TopicInCart" v-dragging="{ item: topic, list: _stu_TopicInCart, group: 'topic' }" :key="topic._id" :class="{'show-details':isDetails[index]}">
                <mu-avatar :size="20" :backgroundColor="selectedBgc[index]">
                  {{index+1}}
                </mu-avatar>
                <mu-icon class="arrow-button" :class="{'show-details':isDetails[index]}" value="keyboard_arrow_right" @click="toggleDetails(index)" />
                <div class="selected-item-content">
                  <span class="title">{{topic._id}}.{{topic.title}}</span>
                  <p class="details" v-if="isDetails[index]">{{topic.details}}</p>
                </div>
                <mu-icon-button class="delete-button" icon="clear" @click="deleteTopic(index)" />
              </li>
            </transition-group>
          </div>
          <mu-raised-button label="提交" icon="check_circle" @click="commitSelectedTopics" color="#fff
" backgroundColor="blue500" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
      return {
        fixedHeader: true,
        selectable: false,
        showCheckbox: false,
        isCategorySorted: false,
        lastSelection: 0,
        tableTitle: '选题表',
        isDetails: [false, false, false],
        selectedBgc: ["red500", "lightBlueA700", "teal500"],
        searchStr: ''
      }
    },
    computed: {
      ...mapState(['_stu_TopicInTable', '_stu_TopicInCart'])
    },
    methods: {
      /*handlePage(newIndex) {
        this.topicsInDisplay = []
        this.topicsInDisplay = this.topicsChunk[newIndex - 1]
        this.currentPage = newIndex
      },*/
      sortCategory() {
        this.isCategorySorted = !this.isCategorySorted
      },
      search(topics) {
        let reg = new RegExp(this.searchStr, 'i')
          //let isNum = this.searchStr.search(/^[0-9]*[1-9][0-9]*$/)
        return topics.filter((topics) => {
          return (topics.title.match(reg) || topics._id.toString().match(reg))
        })
      },
      refreshTopics() {
        this.stuGetTopics()
      },
      getTotal(topic) {
        let t1 = topic.firststudents === undefined ? 0 : topic.firststudents.length
        let t2 = topic.secondstudents === undefined ? 0 : topic.secondstudents.length
        let t3 = topic.thirdstudents === undefined ? 0 : topic.thirdstudents.length
        return t1 + t2 + t3
      },
      click(index, topic) {
        let cart = this._stu_TopicInCart
        if (topic._id !== this.lastSelection) {
          this.toggleTableBar = false
          switch (cart.length) {
            case 0:
              {
                cart.push(topic)
                this.showSnackbar("请在已选课题中编辑或提交选择。")
                break
              }
            case 1:
              {
                if (topic._id !== cart[0]._id) {
                  //cart.push(topic)
                  this.showSnackbar("本次只可选择已确认课题，请在已选课题中编辑！")
                } else {
                  this.showSnackbar("不能选择相同志愿，请在已选课题中编辑！")
                }
                break
              }
            case 2:
              {
                /*if (topic._id !== cart[0]._id && topic._id !== cart[1]._id) {
                  cart.push(topic)
                  this.showSnackbar("已经选满三个志愿，请在已选课题面板中编辑或提交。")
                } else {
                  this.showSnackbar("不能选择相同志愿！不能选择相同志愿！不能选择相同志愿！")
                }*/
                break
              }
            case 3:
              {
                this.showSnackbar("只能选取三个志愿，请在已选课题中编辑。")
              }
          }
        } else {
          this.lastSelection = topic._id
        }

      },
      //提交选题按钮
      commitSelectedTopics() {
        //if (this._stu_TopicInCart.length === 0) return
        /* if (!this.$root.getCookie('user')){
           alert('超时未操作，请重新登录')
           this.$router.push('/')
         }*/
        let _stu_TopicInCartWrapper = {
          _id: _c.getCookie('user'),
          first: this._stu_TopicInCart[0]._id,
          second: this._stu_TopicInCart[1] === undefined ? -1 : this._stu_TopicInCart[1]._id,
          third: this._stu_TopicInCart[2] === undefined ? -1 : this._stu_TopicInCart[2]._id
        }
        this.stuCommitSelection(_stu_TopicInCartWrapper)
      },
      toggleDetails(index) {
        this.$set(this.isDetails, index, !this.isDetails[index])
      },
      deleteTopic(index) {
        //删除本条选题
        this._stu_TopicInCart.splice(index, 1)
      },
      ...mapActions(['stuGetTopics', 'showSnackbar', 'stuCommitSelection'])
    },
    beforeDestroy() {
      //切换路由时如果还没保存 就弹出提示
      //this._stu_TopicInCart = []
    },
    mounted() {
      let id = _c.getCookie('user')
      this.stuGetTopics()
        //this.stuGetTopics().then(()=>{
        /*  this.total=this._stu_TopicInTable.length
          this.topicsChunk = _.chunk(this._stu_TopicInTable, this.pageSize)
          this.topicsInDisplay = this.topicsChunk[0]
        //)
        if (this.topicsInDisplay.length>0) {
          this.topicsInDisplay = _.sortBy(this.topicsInDisplay,(o)=>{
          return o._id
        })
        }*/
    }
}

</script>
<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.table-container
{
    display: inline-block;

    width: 100%;

    transition: $material-enter;

    -webkit-box-shadow: $material-shadow-2dp;
       -moz-box-shadow: $material-shadow-2dp;
            box-shadow: $material-shadow-2dp;
    &.show-cart
    {
        width: calc(100% - 256px);
        @media (max-width: 993px)
        {
          width: 100%;
        }

    }
    .md-toolbar
    {
        min-height: 40px;

        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        h2.md-title
        {
            font-weight: lighter;
        }
        .mu-icon-button
        {
            width: 36px;
            height: 36px;
            padding: 0;
        }
    }
    .selected-restriction
    {
        padding: 4px;
        transition: $material-enter;
        cursor: default;
        color: #42b983;
        border: 1px #42b983 solid;
        border-radius: 2px;
    }
    .all-selected-warn
    {
        color: #f44336;
        border-color: #f44336;
    }
    .mu-table
    {
      .mu-th{
        padding-left: 18px;
        padding-right: 0;
      }
        .mu-td:first-child
        {
            padding-right: 8px;
            padding-left: 16px;
        }
        .mu-td:nth-child(4)
        {
            cursor: help;
            white-space: normal;
        }
        .mu-td
        {
            font-size: 14px;
            .mu-icon-button
            {
                &:hover
                {
                    color: #f44336;
                }
            }
        }
        .mu-tr
        {
            transition: $material-leave;
        } 
        .category-sort
          {
              min-width: 36px;
          }
        .mu-tr:nth-child(even)
        {
            background-color: #f4f4f4;
        }
        .mu-tr.hover
        {
            background-color: #dedede;

            .selected-restriction{
              background-color: #42b983;
              color: #fff;
            }
            .all-selected-warn{
              background-color: #f44336;
              color: #fff;
            }
        }
    }
    .mu-content-block
    {
        max-height: 48px;
        padding-left: calc(50% - 200px);
    }
    @media (max-width: 1366px)
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
}
.topics-cart
{
    position: absolute;
    top: 0;
    right: -270px;

    overflow: hidden;

    width: 256px;
    height: 100%;
    padding-top: 72px;

    transition: $material-enter;

    background-color: #fff;
    -webkit-box-shadow: $material-shadow-3dp;
       -moz-box-shadow: $material-shadow-3dp;
            box-shadow: $material-shadow-3dp;
    &.show-cart
    {
        right: 0;
    }
    .chosen-topics-title
    {
        font-size: 16px;

        width: 84px;
        margin: 16px auto;
        padding: 8px;

        color: #3f51b5;
        border: 1px solid #3f51b5;
        border-radius: 3px;
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
        .selected-item
        {
            position: relative;

            width: 240px;
            min-height: 80px;
            margin: 8px auto;

            cursor: move;
            transition: $material-enter;

            border: 1px #dedede solid;
            border-radius: 6px;
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
                font-family: $fontCenturyGothic;

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

                color: #f44336;
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
    .mu-raised-button
    {
        left: 84px;
    }
}

.list-box{
  width: 100%;
  height: 100%;
}

.sort-category-icon{
  .mu-icon{
    transform: rotateZ(180deg) !important;
  }
  
}
@media (max-width: 993px)
{
    .topics-cart{
      right: -270px;
    }
}

.md-tooltip{
  height: auto;
    z-index: 248;
    white-space: normal;
    font-family: $fontYahei;
    font-size: 14px;
    color: #000;
    border-radius: 2px;
    background-color: #fff;

    -webkit-box-shadow: $material-shadow-3dp;
       -moz-box-shadow: $material-shadow-3dp;
            box-shadow: $material-shadow-3dp;
}

.md-tooltip.selected-tooltip
{
    padding: 8px;
    width: 100px;
}
.md-tooltip.details-tooltip
{
    width: 480px;
    padding: 0;
    .details-appbar
    {
        line-height: 16px;

        width: 100%;
        height: 24px;
        padding: 4px 8px;
        font-variant: small-caps;
        color: #fff;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        background-color: #f44336;
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

.list-enter-active, .list-leave-active {
  transition: $material-enter;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateZ(30px);
}

</style>