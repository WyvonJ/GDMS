<template>
  <div class="confirmation-container">
     <div class="help paper" v-if="isHelp">
      <div class="help-title">帮助</div>
      <mu-icon-button icon="clear" @click="closeHelp" />
      <p class="help-content">
        每张卡片是您创建的选题
        <br/> 右边的圆点表示您设定能够选择的人数
        <br/> 红色代表女生 蓝色代表男生
        <br/> 一旦确认选择后无法更改</p>
      <mu-icon value="help" :size="36" />
    </div>
    <div class="teacher-status-card">
      <md-layout md-gutter="16">
        <md-layout class="single-card" md-flex-small="50" md-flex-medium="33" v-for="(topic,index) in _tch_StudentInCard">
          <div class="paper">
            <div class="card-title">
              {{topic._id}}. {{topic.title}}
              <mu-avatar slot="right" backgroundColor="red500" :size="24">{{topic.available}}</mu-avatar>
            </div>
            <ul>
              <li v-for="(student,i) in topic.students" class="student-list">
                <student-card :student="student" @select="selectStudent(student,topic)" :isSelected="student.isselected"></student-card>
              </li>
            </ul>
          </div>
        </md-layout>
      </md-layout>
    </div>
    <mu-dialog :open="openDialog" title="确认选择" @close="closeDialog">
      你确定要选择{{currentStudent.name}}吗？
    <mu-flat-button slot="actions" @click="closeDialog" accent label="取消"/>
    <mu-flat-button slot="actions" secondary @click.native="finalConfirm" label="确定"/>
    </mu-dialog>

  </div>
</template>


<script>
import StudentCard from '../utils/StudentCard.vue'
import { mapActions, mapState ,mapMutations } from 'vuex'
export default {
  data() {
      return {
        isHelp: true,
        openDialog:false,
        currentStudent:{},
        currentTopic:{},
      }
    },
    computed: {
      ...mapState(['_tch_StudentInCard'])
    },
    methods: {
      selectStudent(student,topic){
        this.openDialog=true
        this.currentStudent=student
        this.currentTopic=topic
      },
      finalConfirm(){
        let tchId=_c.getCookie('user') 
        //this.$set(this.currentStudent, 'isselected', true)
        
        if (!tchId) {
          let tchSelection = {
            teacherId:tchId,
            studentId: this.currentStudent._id, 
            topicId: this.currentTopic._id 
          }
          this.tchConfirmStudent(tchSelection)
          .then(()=>{
            this.showSnackbar('成功选择了'+this.currentStudent.name)
            this.TCH_SET_STU_SELECTED(this.currentStudent)
            this.openDialog=false
            this.currentTopic.count++
            if(this.currentTopic.count===this.currentTopic.available){
              this.TCH_DELETE_STUDENT(this.currentTopic)
            }
          })
          .catch(err=>{
            console.log('选择学生出错了'+err)
          })
        }
      },
      closeDialog(){
        this.openDialog=false
      },
      closeHelp() {
        this.isHelp = false
      },
      ...mapActions(['tchConfirmStudent', 'tchGetTopics', 'showSnackbar']),
      ...mapMutations(['TCH_SET_STU_SELECTED','TCH_DELETE_STUDENT'])
    },
    created() {
        this.tchGetTopics({ teacherId: _c.getCookie('user') })
          .catch(err=>{
            console.log('获取题目和选题学生错误'+err)
          })
        _.forEach(this._tch_StudentInCard,(topic)=>{
          topic.count=0
        })
    },
    components: {
      StudentCard
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
        background-color: $indigo400;
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
    transition: $material-enter;
    .div
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
    .student-list{
      margin: 0;
    }
    .single-card
    {
        margin: 8px 0;
        flex: initial;
        -ms-flex: initial;
        .div{
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
            background-color: $indigo400;
            .mu-avatar
            {
                font-family: $fontCenturyGothic;

                position: absolute;
                right: -12px;
                top: -12px;
                 -khtml-user-select:      none;
                -webkit-user-select:      none;
                   -moz-user-select: -moz-none;
                    -ms-user-select:      none;
                        user-select:      none;
            }
        }
    }
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