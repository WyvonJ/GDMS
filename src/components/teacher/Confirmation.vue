<template>
  <div class="confirmation-container" v-if="gotTopic">
  <div class="sub-padding">
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

            <div v-for="(student,i) in topic.students" class="a-student-button">
              <intro-card :student="student" :isselected="student.isselected" @overlay="toggleOverlay" @confirm="final(student,topic)" @current="currentOpen('stu'+topic._id+i)" :ref="'stu'+topic._id+i"/>
            </div>

          </mu-paper>
        </md-layout>
      </md-layout>
    </div>
    <transition name="overlay-fade">
      <div class="overlay" v-if="showOverlay" @click="toggleOverlayDiv"></div>
    </transition>
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
        currentRef: ''
      }
    },
    computed: {
      ...mapState(['user','cardData'])
    },
    methods: {
      toggleEmpty() {
        this.open = !this.open
      },
      toggleOverlay(student) {
        this.showOverlay = !this.showOverlay
      },
      currentOpen(refs) {
        this.currentRef = refs
      },
      toggleOverlayDiv() {
        _.head(this.$refs[this.currentRef]).toggleIntro = false
        this.showOverlay = !this.showOverlay
      },
      final(student, topic) {
        this.currentOpenItem = student
        //小于可选人数
        let tchSelection = {
            teacherId: this.$root.getCookie('user'), //String
            studentId: student._id, //String
            topicId: topic._id //Number
          }
        this.tchConfirmStudent(tchSelection)
        this.$set(student, 'isselected', true)
        topic.count++
          if (topic.count === topic.available) {
            let sub=topic.students.length - topic.available
            let sorted=_.groupBy(topic.students,'isselected')
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
      /*_.forEach(this.cardData, (value) => {
          value.count = 0
          //这个服务器发过来 。。。。。。现测试用
          _.forEach(value.students,student=>{
            student.isselected=false
          })
        })*/
      //       正式接入服务器的时候 在mapState里面加cardData
        this.tchGetTopics({ teacherId: this.$root.getCookie('user') })
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

        color: #fff;
        background-color: #2196f3;
    }
    .help-content
    {
        padding: 8px;
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

            color: #fff;
            font-size: 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: #2196f3;
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
    width: 68px;
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