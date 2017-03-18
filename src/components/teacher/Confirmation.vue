<template>
  <div class="main-content" v-if="gotTopic">
    <mu-paper :zDepth="1" class="help" v-if="showHelp">
      <div class="help-title">帮助</div>
      <mu-icon-button icon="clear" @click="closeHelp" />
      <p class="help-content">
        每张卡片是您创建的选题
        <br/> 右边的圆点表示您设定能够选择的人数
        <br/> 红色代表女生 蓝色代表男生
        <br/> 一旦确认选择后无法更改</p>
      <mu-icon value="help" :size="36" />
    </mu-paper>
    <div class="teacher-status-card">
      <md-layout md-gutter="16">
        <md-layout class="single-card" md-flex-small="50" md-flex-medium="33" v-for="(topic,index) in cardData">
          <mu-paper :zDepth="2">
            <div class="card-title">
              {{topic._id}}. {{topic.title}}
              <mu-avatar slot="right" backgroundColor="red500" :size="24">{{topic.available}}</mu-avatar>
            </div>

            <div v-for="(astudent,i) in topic.students" class="a-student-button">
              <intro-card :student="astudent" :isselected="astudent.isselected" @overlay="toggleOverlay" @confirm="final(astudent,topic)" @current="currentOpen('stu'+topic._id+i)" :ref="'stu'+topic._id+i"/>
            </div>

          </mu-paper>
        </md-layout>
      </md-layout>
    </div>
    <transition name="overlay-fade">
      <div class="overlay" v-if="showOverlay" @click="toggleOverlayDiv"></div>
    </transition>
  </div>
  <div class="main-content" v-else>
    <div class="empty-card-title" :class="{'hide':open}">
      这里空空如也！
      <p class="intrgging">不是说了啥都没有么 (゜-゜)つロ。</p>
    </div>
  </div>
</template>


<script>
import IntroCard from '../utils/IntroCard.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
      return {
        open: false,
        gotTopic: true,
        showOverlay: false,
        showHelp: true,
        snackbarText: '',
        currentRef: '',
        cardData: [{
          _id: 46,
          title: '江南大学图书馆阅读信息的价值发掘与可视化表达',
          available: 2,
          students: [{
            _id: '1030516410',
            name: '陈奕迅',
            gender: '男',
            gpa: 3.6,
            intro: 'wwwwwwwww'
          }, {
            _id: '1030516410',
            name: '谭正岩',
            gender: '男',
            gpa: 3.5,
            intro: 'wwwwwwwww'
          }, {
            _id: '1030516410',
            name: '迟小秋',
            gender: '女',
            gpa: 2.9,
            intro: 'wwwwwwwww'
          }, {
            _id: '1030516410',
            name: '马晓曼',
            gender: '女',
            gpa: 3.1,
            intro: 'wwwwwwwww'
          }]
        },{
          _id: 46,
          title: '江南大学图书馆阅读信息的价值发掘与可视化表达',
          available: 2,
          students: [{
            _id: '1030516410',
            name: '陈奕迅',
            gender: '男',
            gpa: 3.6,
            intro: 'wwwwwwwww'
          }, {
            _id: '1030516410',
            name: '谭正岩',
            gender: '男',
            gpa: 3.5,
            intro: 'wwwwwwwww'
          }, {
            _id: '1030516410',
            name: '迟小秋',
            gender: '女',
            gpa: 2.9,
            intro: 'wwwwwwwww'
          }, {
            _id: '1030516410',
            name: '马晓曼',
            gender: '女',
            gpa: 3.1,
            intro: 'wwwwwwwww'
          }]
        }]
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      toggleEmpty() {
        this.open = !this.open
      },
      toggleOverlay(astudent) {
        this.showOverlay = !this.showOverlay
      },
      currentOpen(refs) {
        this.currentRef = refs
      },
      toggleOverlayDiv() {
        _.head(this.$refs[this.currentRef]).toggleIntro = false
        this.showOverlay = !this.showOverlay
      },
      final(astudent, topic) {
        this.currentOpenItem = astudent
        //小于可选人数
        var tchSelection = {
            teacherId: this.$root.getCookie('user'), //String
            studentId: astudent._id, //String
            topicId: topic._id //Number
          }
          //this.tchConfirmStudent(tchSelection).then(() => {})
        this.$set(astudent, 'isselected', true)
        topic.count++
          if (topic.count === topic.available) {
            var sub=topic.students.length - topic.available
            var sorted=_.groupBy(topic.students,'isselected')
            this.$delete(sorted , false)
            topic.students=sorted[true]
          }

      },
      closeHelp() {
        this.showHelp = false
      },
      ...mapActions(['tchConfirmStudent', 'tchGetTopics', 'showSnackbar'])
    },
    mounted() {
      _.forEach(this.cardData, (value) => {
          value.count = 0
          //这个服务器发过来 。。。。。。现测试用
          _.forEach(value.students,student=>{
            student.isselected=false
          })
        })
        //this.tchGetTopics({ teacherId: this.$root.getCookie('user') }).then(() => {})
    },
    components: {
      IntroCard
    }
}


</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';

.help
{
    position: relative;

    display: inline-block;
    .help-title
    {
        font-size: 20px;

        padding: 8px;

        color: #4d4d4d;
        background-color: #cdcdcd;
    }
    .help-content
    {
        padding: 8px;
        em
        {
            color: #f44336;
        }
    }
    .mu-icon-button
    {
        position: absolute;
        top: -8px;
        right: -8px;

        color: #fff;
    }
    > .mu-icon
    {
        position: absolute;
        right: 0;
        bottom: 0;

        color: rgba(0,0,0,.12);
    }
}
.teacher-status-card
{
    margin: 8px 0;
    padding-right: 180px;
    transition: all .4s cubic-bezier(.2,.2,.4,1);
    .mu-paper
    {
        transition: $material-enter;
        border-radius: 4px;
        &:hover
        {
            -webkit-box-shadow: $material-shadow-9dp;
               -moz-box-shadow: $material-shadow-9dp;
                    box-shadow: $material-shadow-9dp;
        }
    }
    .single-card
    {
        margin: 8px 0;
        flex: initial;
        -ms-flex: initial;
        .mu-paper{
          width: 100%;
        }
        .card-title
        {
            position: relative;
            padding: 8px 10px;

            color: #4d4d4d;
            font-size: 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: #cdcdcd;
            .mu-avatar
            {
                font-family: $fontCenturyGothic;

                position: absolute;
                right: -12px;
                bottom: -12px;
                //关闭文本选择
                 -khtml-user-select:      none;
                -webkit-user-select:      none;
                   -moz-user-select: -moz-none;
                    -ms-user-select:      none;
                        user-select:      none;
            }
        }
    }
}

.a-student-button
{
    display: inline-block;
}
.overlay
{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: .5;
    background-color: #000;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active
{
    transition: opacity .45s cubic-bezier(.23, 1, .32, 1);
}

.overlay-fade-enter,
.overlay-fade-leave-active
{
    opacity: 0 !important;
}

</style>