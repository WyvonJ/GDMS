<template>
  <div class="result-container" v-if="gotResult">

    <div class="teacher-topics-status">
        <figure class="single-card paper" v-for="(result,index) in _tch_StudentConfirmed">
            <div class="result-title">
              {{result._id}}. {{result.title}}
            </div>
            <div class="single-student" v-for="(student,sid) in  result.finalstudents">
              <div class="student-details">
                <i class="material-icons" :style="{color:student.gender==='女'?'#f44336':'#009688'}">
                  {{student.gender==='女'?'face':'mood'}}
                </i>
                <div class="student-name">{{student.name}} - {{student._id}}</div>
                <div class="student-contact">
                  <div class="chip">
                    <img src="../../assets/icon/call.svg" alt="phone" /> {{student.tel}}
                  </div>
                  <div class="chip">
                    <img src="../../assets/icon/email.svg" alt="email" />
                    <a :href="'mailto:'+student.email">{{student.email}}</a>
                  </div>
                  <div class="chip">
                    <img src="../../assets/icon/qq.svg" alt="QQ" /> {{student.qq}}
                  </div>
                  <div class="chip">
                    <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> {{student.wechat}}
                  </div>
                </div>
              </div>
            </div>
        </figure>
    </div>
  </div>
  <div class="main-content" v-else>
    <div class="empty-card-title" :class="{'hide':open}">
      这里空空如也！
      <p class="intrgging">不是说了啥都没有么 (゜-゜)つロ。</p>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
      return {
        gotResult: true,
      }
    },
    computed: mapState(['_tch_StudentConfirmed']),
    methods: {
      ...mapActions(['tchSelectionResult'])
      //一键导出excel表格功能实现
    },
    mounted() {
      let tchId = _c.getCookie('user')
      if (tchId) {
        this.tchSelectionResult({ teacherId: tchId })
      } else {
        //this.$router.push('/')
      }
    }
}

</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';


.teacher-topics-status
{
    display: flex;

    margin: 8px 0;

    flex-wrap: wrap;
    align-content: space-between;
    align-items: flex-start;
    justify-content: flex-start;
    .single-card
    {
        margin: 8px;

        flex: 0 1 12%;
        min-width: 320px;
        .single-student
        {
            min-width: 320px;

            border-bottom: 1px solid #ccc;
        }
        .paper
        {
            padding: 0;
        }
        .result-title
        {
            padding: 8px;

            color: white;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            background-color: $teal ;
        }
        .student-details
        {
            font-size: 16px;

            overflow: hidden;

            padding: 8px;

            cursor: default;
            transition: $material-enter;
            .student-name
            {
                display: inline-block;

                height: 32px;
                margin-left: 18px;

                vertical-align: middle;
            }
            .mail-link
            {
                color: rgba(0,0,0,.7) !important;
                &:hover
                {
                    text-decoration: none !important;
                }
            }
        }
    }
}
img[alt="phone"],
img[alt="email"]{
  width: 18px;
  height: 18px;
}
</style>