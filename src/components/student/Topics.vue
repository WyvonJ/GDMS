<template>
  <div class="topics-table-container">
    <div class="table-container" :class="{'show-cart':_stu_TopicInCart[0]}">
      <table>
        <caption>
          <span class="table-title">选题表</span>
          <mu-icon-button icon="refresh" @click="refreshTopics" />
        </caption>
        <thead>
          <tr>
            <th width="8%">添加</th>
            <th width="8%">
              <mu-flat-button class="category-sort" :class="{'sort-category-icon':isCategorySorted}" disabled @click="sortCategory" labelPosition="before">序号</mu-flat-button>
            </th>
            <th width="10%">
              <mu-flat-button class="category-sort" disabled labelPosition="before">类别</mu-flat-button>
            </th>
            <th width="60%">课题名称</th>
            <th width="16%">已选/可选</th>
          </tr>
        </thead>
        <transition-group name="list" tag="tbody" class="list-box">
            <tr v-for="(topic,index) in search(_stu_TopicInTable)" :key="topic._id">
              <td width="10%">
                <span class="add-topic-button" @click="addTopic(index,topic)">
                <i class="material-icons">add_circle_outline</i>
              </span>
              </td>
              <td width="10%">{{topic._id}}</td>
              <td width="10%">{{topic.category===0?"论文":"设计"}}</td>
              <td width="52%">{{topic.title}}
                <md-tooltip md-direction="top" class="details-tooltip">
                  <div class="details-appbar">Description</div>
                  <div class="details-content">
                    {{topic.details}}
                  </div>
                </md-tooltip>
              </td>
              <td width="14%"><span :class="{'selected-all' : getTotal(topic) >= topic.restriction}" class="selected-restriction">{{ getTotal(topic) }}/{{ topic.restriction ||0}}</span>
                <md-tooltip md-direction="top" class="selected-tooltip">
                  <ul>
                    <li>第一志愿：{{topic.firststudents===undefined?0:topic.firststudents.length}}</li>
                    <li>第二志愿：{{topic.secondstudents===undefined?0:topic.secondstudents.length}}</li>
                    <li>第三志愿：{{topic.thirdstudents===undefined?0:topic.thirdstudents.length}}</li>
                  </ul>
                </md-tooltip>
              </td>
            </tr>
        </transition-group>
      </table>
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
        <button class="blue submit-button" @click="commitSelectedTopics">
          <img src="../../assets/icon/check_circle.svg" alt="check" />
          <span>提交</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions ,mapMutations } from 'vuex'
export default {
  data() {
      return {
        fixedHeader: true,
        selectable: false,
        showCheckbox: false,
        isCategorySorted: false,
        lastSelection: 0,
        isDetails: [false, false, false],
        selectedBgc: ["red500", "lightBlueA700", "teal500"],
        searchStr: ''
      }
    },
    computed: {
      ...mapState(['_stu_TopicInTable','_stu_TopicInCart'])
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
      addTopic(index, topic) {
        let cart = this._stu_TopicInCart
        if (topic._id !== this.lastSelection) {
          this.toggleTableBar = false
          switch (cart.length) {
            case 0:
              {
                this.STU_SELECT_TOPIC(topic)
                this.showSnackbar("请在已选课题中编辑或提交选择。")
                break
              }
            case 1:
              {
                if (topic._id !== cart[0]._id) {
                  this.STU_SELECT_TOPIC(topic)
                } else {
                  this.showSnackbar("不能选择相同志愿，请在已选课题中编辑！")
                }
                break
              }
            case 2:
              {
                if (topic._id !== cart[0]._id && topic._id !== cart[1]._id) {
                  this.STU_SELECT_TOPIC(topic)
                  this.showSnackbar("已经选满三个志愿，请在已选课题面板中编辑或提交。")
                } else {
                  this.showSnackbar("不能选择相同志愿！不能选择相同志愿！不能选择相同志愿！")
                }
                break
              }
            case 3:
                this.showSnackbar("只能选取三个志愿，请在已选课题中编辑。")
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
        this.STU_DELTED_TOPIC(index)
      },
      ...mapActions(['stuGetTopics', 'showSnackbar', 'stuCommitSelection','stuSelectionResult']),
      ...mapMutations(['STU_SELECT_TOPIC','STU_DELTED_TOPIC'])
    },
    beforeDestroy() {
      //切换路由时如果还没保存 就弹出提示
      //this._stu_TopicInCart = []
    },
    mounted() {
      let id = _c.getCookie('user')
      this.stuGetTopics()
      this.stuSelectionResult({studentId:id})

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
    caption
    {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        position: relative;
        height: 36px;
        span.table-title
        {
          position: absolute;
          left: 16px;
          top:8px;
            font-weight: lighter;
        }
        .mu-icon-button
        {
          position: absolute;
          right: 64px;
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
        color: $greenVue;
        border: 1px $greenVue solid;
        border-radius: 2px;
    }
    .selected-all
    {
        color: $red;
        border-color: $red;
    }
    table
    {
        td:first-child
        {
            padding-right: 32px;
            padding-left: 16px;
        }
        td:nth-child(4)
        {
            cursor: help;
            white-space: normal;
        }
        td
        {
          height: 40px;
            font-size: 14px;
            padding: 2px 0;
        .add-topic-button
        {
          width: 32px;
            height: 32px;
            cursor: pointer;
            margin-left: 12px;
    transition: $material-enter;

          &:hover{
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

            .selected-restriction{
              background-color: $greenVue;
              color: #fff;
            }
            .selected-all{
              background-color: $red;
              color: #fff;
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

    background-color: white;
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

        color: $indigo;
        border: 1px solid $indigo;
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
        margin: 0 auto;
        width: 84px;
        position: relative;
       left: 84px;
    }
}

.list-box{
  width: 100%;
  overflow-x: hidden!important;
  overflow-y: scroll!important;
  height: 100%;
}

.sort-category-icon{
  
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

.list-enter-active, .list-leave-active {
  transition: $material-enter;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateZ(30px);
}

</style>