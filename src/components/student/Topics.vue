<template>
  <div class="main-content">
    <div class="table-container" :class="{'show-cart':selectedInCart[0]}">
      <md-toolbar :class="[toggleTableBar?'md-warn':'md-primary']">
        <h2 class="md-title" style="flex: 1">{{tableTitle}}</h2>
        <mu-icon-button icon="refresh" @click="refreshTopics" />
      </md-toolbar>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox" @click.stop.self="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th width="8%">添加</mu-th>
            <mu-th width="8%"><mu-flat-button class="category-sort" :iconClass="flatIcon" icon="arrow_upward" labelPosition="before">序号</mu-flat-button></mu-th>
            <mu-th width="10%"><mu-flat-button class="category-sort" :iconClass="flatIcon" icon="arrow_upward" labelPosition="before">类别</mu-flat-button> </mu-th>
            <mu-th width="60%">课题名称</mu-th>
            <mu-th width="16%">已选/可选</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(topic,index) in topicsInDisplay">
            <mu-td width="8%">
              <mu-icon-button icon="add_circle_outline" @click="click(index,topic)" /></mu-td>
            <mu-td width="8%">{{topic._id}}</mu-td>
            <mu-td width="10%">{{topic.category===0?"论文":"设计"}}</mu-td>
            <mu-td width="60%">{{topic.title}}
              <md-tooltip md-direction="top">
                <div class="details-appbar">DESCRIPTION</div>
                <div class="details-content">
                  {{topic.details}}
                </div>
              </md-tooltip>
            </mu-td>
            <mu-td width="14%" ><span :class="{'all-selected-warn' : topic.selected >= topic.available}" class="selected-available">{{ topic.selected||0 }}/{{ topic.available }}</span></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-content-block>
        <mu-pagination :total="total" :current="currentPage" :pageSize="pageSize" @pageChange="handlePage">
        </mu-pagination>
      </mu-content-block>
    </div>
    <div class="topics-cart" :class="{'show-cart':selectedInCart[0]}">
          <div class="chosen-topics-title">
          已选课题
          </div>
        <div class="choice-cart">
        
        <div class="topic-level">
          <transition-group tag="ul" name="slide-fade">
            <li class="selected-item" v-for="(topic,index) in selectedInCart"  v-dragging="{ item: topic, list: selectedInCart, group: 'topic' }" :key="topic._id" :class="{'show-details':showDetails[index]}">
              <mu-avatar :size="20" :backgroundColor="selectedBgc[index]">
                {{index+1}}
              </mu-avatar>
               <mu-icon class="arrow-button" :class="{'show-details':showDetails[index]}" value="keyboard_arrow_right" @click="toggleDetails(index)"/>

              <div class="selected-item-content">
                <span class="title">{{topic._id}}.{{topic.title}}</span>
                <p class="details" v-if="showDetails[index]">{{topic.details}}</p>
              </div> 
              <mu-icon-button class="delete-button" icon="clear" @click="deleteTopic(index)" />
            </li>
          </transition-group>
              
        </div>
        <mu-raised-button label="提交" icon="check_circle" @click="commitSelectedTopics" color="#fff
" backgroundColor="blue500"/>
      </div>

    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
      return {
        total: 120,
        currentPage: 1,
        pageSize: 10,
        fixedHeader: true,
        selectable: false,
        toggleTableBar: true,
        showCheckbox: false,
        lastSelection: 0,
        tableTitle: '选题表',
        flatIcon:{'icon-size':true},
        showDetails:[false,false,false],
        selectedBgc: ["red500", "lightBlueA700", "teal500"],
        topicsCart: [],
        topicsChunk: [],
        topicsSearch:[],
        topicsInDisplay: [{
          _id: 4,
          category: 1,
          title: '444基于Unity的三维场景的交互设计与实现',
          details: 'Vu能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 3
        }, {
          _id: 5,
          category: 1,
          title: '555基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做Vue 更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 3,
          selected: 0
        }, {
          _id: 6,
          category: 0,
          title: '666基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 2,
          selected: 2
        }, {
          _id: 7,
          category: 1,
          title: '777基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的4512445hh更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 3,
          selected: 2
        }, {
          _id: 8,
          category: 1,
          title: '888基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例，之间切换',
          available: 1,
          selected: 1
        }, {
          _id: 4,
          category: 1,
          title: '江南大学图书馆阅读信息的价值发掘与可视化表达（与艺术系老师合作课题）',
          details: 'Vu能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 3,
          selected: 2
        }, {
          _id: 5,
          category: 1,
          title: '555基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做Vue 更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 3,
          selected: 0
        }, {
          _id: 6,
          category: 0,
          title: '666基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 2,
          selected: 2
        }, {
          _id: 7,
          category: 1,
          title: '777基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的4512445hh更快之外还可以得到一些好处。如下例，当允许用户在不同的登录方式之间切换',
          available: 3,
          selected: 2
        }, {
          _id: 8,
          category: 1,
          title: '888基于Unity的三维场景的交互设计与实现',
          details: 'Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例，之间切换',
          available: 1,
          selected: 1
        }]
      }
    },
    computed: {
      ...mapState(['topicsData','selectedInCart'])
    },
    methods: {
      handlePage(newIndex) {
        this.topicsInDisplay = []
        this.topicsInDisplay = this.topicsChunk[newIndex - 1]
        this.currentPage = newIndex
      },
      refreshTopics() {
        this.stuGetTopics()
          .then(() => {
            this.total = this.topicsData.length
            this.topicsChunk = _.chunk(this.topicsData, this.pageSize)
            this.topicsInDisplay = this.topicsChunk[0]
          })
      },
      click(index, topic) {
        var cart = this.selectedInCart
        if (topic._id !== this.lastSelection) {
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
                } else {
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
          this.lastSelection = topic._id
        }

      },
      //提交选题按钮
      commitSelectedTopics() {
        //-------放到全局去
        if (this.selectedInCart.length === 0) return
          /* if (!this.$root.getCookie('user')){
             alert('超时未操作，请重新登录')
             this.$router.push('/')
           }*/
        var selectedInCartWrapper = {
          _id: this.$root.getCookie('user'),
          first: this.selectedInCart[0]._id,
          second: this.selectedInCart[1]._id,
          third: this.selectedInCart[2]._id
        }
        this.stuCommitSelection(selectedInCartWrapper)
      },
      toggleDetails(index){
        //console.log(index)
        this.$set(this.showDetails,index,!this.showDetails[index])
      },
      deleteTopic(index) {
        //删除本条选题
        this.selectedInCart.splice(index, 1)
        this.selectedEdit = !this.selectedEdit
        this.$children[2].selectable = !this.$children[2].selectable
      },
      ...mapActions(['stuGetTopics', 'showSnackbar','stuCommitSelection'])
    },
    beforeDestroyed(){
      //切换路由时如果还没保存 就弹出提示
    },
    mounted() {
      /*var id = this.$root.getCookie('user')
      this.stuGetTopics().then(()=>{
        this.total=this.topicsData.length
        this.topicsChunk = _.chunk(this.topicsData, this.pageSize)
        this.topicsInDisplay = this.topicsChunk[0]
      })
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
.main-content
{
    position: relative;
}

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
    .selected-available
    {
        padding: 4px;

        color: #42b983;
        border: 1px #42b983 solid;
        border-radius: 8px;
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

        color: #42b983;
        border: 1px solid #42b983;
        border-radius: 26px;
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
    .topic-level
    {
        .selected-item
        {
            position: relative;

            width: 240px;
            min-height: 80px;
            margin: 8px auto;

            cursor: move;
            transition: $material-enter;

            border: 1px #dedede solid;
            border-radius: 20px;
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
    }
    .mu-raised-button
    {
        left: 84px;

        border-radius: 18px;
    }
}
.md-tooltip
{
    font-family: $fontYahei;
    font-size: 14px;

    width: 480px;
    height: auto;
    padding: 0;

    white-space: normal;

    color: #000;
    border-radius: 5px;
    background-color: #fff;
    -webkit-box-shadow: $material-shadow-3dp;
       -moz-box-shadow: $material-shadow-3dp;
            box-shadow: $material-shadow-3dp;
    .details-appbar
    {
        line-height: 16px;

        width: 100%;
        height: 24px;
        padding: 4px 8px;

        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
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

</style>