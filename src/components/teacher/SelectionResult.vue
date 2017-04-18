<template>
  <div class="result-container" v-if="gotResult">

    <div class="teacher-topics-status">
      <md-layout md-gutter="16">
        <md-layout class="single-card" md-flex-small="100" md-flex-medium="50" v-for="(result,index) in _tch_StudentConfirmed">
          <mu-paper>
            <div class="result-title">
              {{result._id}}. {{result.title}}
            </div>
            <div class="a-student" v-for="(student,sid) in  result.finalstudents">
              <div class="student-details">
                <mu-avatar :size="32" :icon="student.gender==='女'?'face':'mood'" :color="student.gender==='女'?'pink500':'blue500'" backgroundColor="#dedede"></mu-avatar><div class="student-name">{{student.name}} - {{student._id}}</div>
                <mu-divider/>
                <div class="student-contact">
                  <div class="chip">
                    <mu-icon value="call" :size="18" /> {{student.tel}}
                  </div>
                  <div class="chip">
                    <mu-icon value="mail" :size="18" />
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
          </mu-paper>
        </md-layout>
      </md-layout>
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
    .single-card
    {
        margin: 8px 0;
        .paper{
          padding: 0;
        }
        .result-title
        {
            padding: 8px;

            color: #fff;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            background-color: $indigo400 ;
        }

            .student-list{

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
                .mail-link{
                  color: rgba(0,0,0,.7) !important;
                  &:hover{
                    text-decoration: none !important;
                  }
                }
              }
    }
}

</style>