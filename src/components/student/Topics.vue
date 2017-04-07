<template>
  <div class="topics-table-container">
  <div class="sub-padding">
    <div class="table-container" :class="{'show-cart':selectedInCart[0]}">
      <md-toolbar :class="{'md-warn':!selectedInCart[0]}">
        <h2 class="md-title" style="flex: 1">{{tableTitle}}</h2>
        <mu-icon-button icon="refresh" @click="refreshTopics" />
      </md-toolbar>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th width="8%">添加</mu-th>
            <mu-th width="8%"><mu-flat-button class="category-sort" :class="{'sort-category-icon':sortCategoryFlag}" disabled @click="sortCategory" labelPosition="before">序号</mu-flat-button></mu-th>
            <mu-th width="10%"><mu-flat-button class="category-sort" disabled labelPosition="before">类别</mu-flat-button> </mu-th>
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
              <md-tooltip md-direction="top" class="details-tooltip">
                <div class="details-appbar">Description</div>
                <div class="details-content">
                  {{topic.details}}
                </div>
              </md-tooltip>
            </mu-td>
            <mu-td width="14%" ><span :class="{'all-selected-warn' : topic.selected >= topic.restriction}" class="selected-restriction">{{ topic.selected||0 }}/{{ topic.restriction ||0}}</span>
              <md-tooltip md-direction="top" class="selected-tooltip">
                <ul>
                  <li>第一志愿：{{topic.firststudents===undefined?0:topic.firststudents.length}}</li>
                  <li>第二志愿：{{topic.secondstudents===undefined?0:topic.secondstudents.length}}</li>
                  <li>第三志愿：{{topic.thirdstudents===undefined?0:topic.thirdstudents.length}}</li>
                </ul>
              </md-tooltip>
            </mu-td>
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
        showCheckbox: false,
        sortCategoryFlag:false,
        lastSelection: 0,
        tableTitle: '选题表',
        showDetails:[false,false,false],
        selectedBgc: ["red500", "lightBlueA700", "teal500"],
        topicsCart: [],
        topicsChunk: [],
        topicsSearch:[],
        topicsInDisplay: [{
          _id: 1,
          category: 1,
          title: '基于3ds max的城市小区动画漫游设计与实现',
          details: '3ds max 是三维建模、动画制作的渲染软件，被广泛应用于制作角色动画、室内外效果图、游戏开发、建筑动画、影视动画、虚拟现实等领域。为了更好的让大众了解城市小区的建设和发展情况，我们可以用三维动画的形式来展示其全貌，本课题要求结合专业知识利用3ds max等软件实现虚拟城市小区动画漫游。',
          restriction: 3,
          selected:3,
          secondstudents:[],
          thirdstudents:[3]
        }, {
          _id: 2,
          category: 0,
          title: '基于Unity3D的VR项目设计与实现',
          details: 'VR即虚拟现实，指综合利用计算机图形系统和各种实现及控制等接口设备，在计算机上生成的、可交互的三维环境中提供沉浸感觉的技术。虚拟现实技术实现的载体是虚拟现实仿真平台。VR技术可广泛的应用于规划展示、工业仿真、旅游教学等众多领域。利用Unity3D实现一个VR虚拟现实体验项目，给用户带来身临其境的感受。',
          selected: 0,
          firststudents:[1,3],
          secondstudents:[],
          thirdstudents:[3]
        }, {
          _id: 3,
          category: 0,
          title: '图像的层次剖分算法及应用',
          details: '对一张数字图像进行剖分，用一些基本的几何面片进行逼近。这样的做法其实建起了离散到连续、数字到矢量、图像到几何的桥梁。应用领域也很广泛，如图像去噪、图像缩放、图像编辑、图像信息安全等多方面。',
          restriction: 2,
          selected: 2,
          firststudents:[1,3],
          secondstudents:[],
          thirdstudents:[3]
        }, {
          _id: 4,
          category: 1,
          title: '安卓平台人类特征识别软件开发',
          details: '基于安卓平台开发一个app可以实现人的年龄、情感、性别等特征的识别',
          restriction: 3,
          selected: 2,
          firststudents:[1,3],
          secondstudents:[],
          thirdstudents:[3]
        }, {
          _id: 5,
          category: 1,
          title: '货运配送物流管理系统的设计与实现',
          details: '本本体主要研究如何开发一套货运配送物流管理系统，用来给供求方和需要方之外的货运配送物流管理企业来提供服务的一套管理系统，货运配送物流管理系统应用于物流相关的企业，提供物流和库存的服务。',
          restriction: 1,
          selected: 1,
          firststudents:[1,3],
          secondstudents:[],
          thirdstudents:[3]
        }, {
          _id: 6,
          category: 1,
          title: '面向医学图像的图像融合技术研究',
          details: '为弥补解剖结构图像（CT, MRI, B超等）和功能图像（SPECT, PET等）的各自不足，图像融合技术能够有效地融合解剖结构图像和功能图像得到更全面的新图像，便于医师后期诊疗做参考。本研究主要致力于选择几种流行的图像融合方法，对医学图像进行融合已检验哪种方法更为有效并进行总结得出结论。',
          restriction: 3,
          selected: 2,
          firststudents:[1,3],
          secondstudents:[],
          thirdstudents:[3]
        }, {
          _id: 7,
          category: 1,
          title: '面向甲状腺癌诊断的智能识别技术探索',
          details: '甲状腺癌作为早期发现最易根治的癌症，当前受到广泛的研究和关注。随着人工智能技术的发展，越来越多的学者发现，利用现有的算法对甲状腺癌进行建模分析，可以得到能够媲美专家医师的诊断结论。因此，本研究主要致力于选择几种流行的或传统的智能别方法为后人做进一步研究提供一些结论。',
          restriction: 3,
          selected: 0,
          firststudents:[1,3],
          secondstudents:[],
          thirdstudents:[3]
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
      sortCategory(){
        this.sortCategoryFlag=!this.sortCategoryFlag
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
        let cart = this.selectedInCart
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
        //-------放到全局去
        //if (this.selectedInCart.length === 0) return
          /* if (!this.$root.getCookie('user')){
             alert('超时未操作，请重新登录')
             this.$router.push('/')
           }*/
        let selectedInCartWrapper = {
          _id: this.$root.getCookie('user'),
          first: this.selectedInCart[0]._id,
          second: this.selectedInCart[1]===undefined?-1:this.selectedInCart[1]._id,
          third: this.selectedInCart[2]===undefined?-1:this.selectedInCart[2]._id
        }
        this.stuCommitSelection(selectedInCartWrapper)
      },
      toggleDetails(index){
        this.$set(this.showDetails,index,!this.showDetails[index])
      },
      deleteTopic(index) {
        //删除本条选题
        this.selectedInCart.splice(index, 1)
      },
      ...mapActions(['stuGetTopics', 'showSnackbar','stuCommitSelection'])
    },
    beforeDestroyed(){
      //切换路由时如果还没保存 就弹出提示
      this.selectedInCart=[]
    },
    mounted() {
      let id = this.$root.getCookie('user')
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

</style>