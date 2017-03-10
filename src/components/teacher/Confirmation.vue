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
        <md-layout class="single-card" md-flex-small="100" md-flex-medium="50" v-for="(card,index) in cardData">
          <mu-paper :zDepth="2">
            <div class="card-title">
              {{card._id}}. {{card.title}}
              <mu-avatar slot="right" backgroundColor="red500" :size="24">{{card.available}}</mu-avatar>
            </div>

            <div v-for="(astudent,i) in card.firststudents" class="a-student-button">
              <intro-card :student="astudent" :confirmed="astudent.confirmed" @overlay="toggleOverlay" @confirm="final(astudent)" @current="currentOpen('stu'+card._id+i)" :ref="'stu'+card._id+i"/>
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
        currentRef:'',
        cardData: []
      }
    },
    computed: {
      ...mapState(['user', 'cardData'])
    },
    methods: {
      toggleEmpty() {
        this.open = !this.open
      },
      toggleOverlay(astudent) {
        this.showOverlay = !this.showOverlay
      },
      currentOpen(refs){
        this.currentRef=refs
      },
      toggleOverlayDiv(){
        _.head(this.$refs[this.currentRef]).toggleIntro=false
        this.showOverlay = !this.showOverlay
      },
      final(astudent) {
        this.currentOpenItem=astudent
        var topic
        _.forEach(this.cardData, (topic) => {
          _.forEach(topic.firststudents, (item) => {
            if (item === astudent) {
              //小于可选人数
              var c = topic.confirmedCount
              var a = topic.available

                var tchSelection = {
                  teacherId: this.$root.getCookie('user'), //String
                  studentId: astudent._id, //String
                  topicId: topic._id //Number
                }

                this.tchConfirmStudent(tchSelection)
                  .catch(error => {
                    if (error) {
                      this.SHOW_SNACKBAR("好像出了点问题，请再试试。")
                      this.$root.$refs.snackbar.open()
                      return Promise.reject(error)
                    }
                  })
                  .then(() => {
                    this.$set(astudent, 'confirmed', true)
                    topic.confirmedCount++
                      this.$root.$refs.snackbar.open()
                  })
                if (topic.confirmedCount === a) {
                  _.forEach(topic,(value)=>{

                  })
              }
            }
          })
        })

      },
      closeHelp() {
        this.showHelp = false
      },
      ...mapMutations(['SHOW_SNACKBAR']),
      ...mapActions(['tchConfirmStudent', 'tchGetTopics'])
    },
    created() {
     this.tchGetTopics({ teacherId: this.user.account }).then(() => {
        _.forEach(this.cardData, (value) => {
          value.confirmedCount = 0
          _.forEach(value.firststudents, (student) => {
            student.confirmed = false //每个学生是否被选中
          })
        })
      })

    },
    mounted() {},
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
        .mu-paper{
          width: 100%;
        }
        .card-title
        {
            position: relative;
            padding: 6px 8px;

            color: #fff;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            background-color: #2196f3 !important;
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

                -webkit-box-shadow: $material-shadow-1dp;
                   -moz-box-shadow: $material-shadow-1dp;
                        box-shadow: $material-shadow-1dp;
            }
        }
    }
}

.a-student-button
{
    display: block;
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