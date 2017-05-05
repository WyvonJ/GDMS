<template>
  <div class="group-container">
    <div class="group-current-status paper">
      {{step==='midgroup'?'中':'终'}}期分组
    </div>
    <div class="group-status-card card">
      <div class="teacher-wrapper">
      <mu-avatar backgroundColor="red500" class="group-id-icon">{{groupId}}</mu-avatar>
      <span class="card-title">Teacher</span>
        <div class="chip" v-for="(teacher,index) in teachers">
          <mu-icon value="account_circle" color="greenA700" :size="18" /> {{teacher.name}}
        </div>
      </div>
      <div class="student-wrapper">
      <span class="card-title">Student</span>
      <div class="student-chips">
        <span class="chip" v-for="(student,index) in students">
          <mu-icon :value="student.gender==='女'?'face':'mood'" color="blue500" :size="18" /> 
          <span class="student-name">
            {{student.name}}
          </span>
          <span class="student-topic">
            {{student.final.title}}
          </span>
        </span>
      </div>
    </div>
      </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
      return {
        step: 'midgroup',
        groupId: '',
        students: [],
        teachers: []
      }
    },
    computed: {
      ...mapState(['_stu_tch_Group'])
    },
    methods: {
      ...mapActions(['tchGrouping'])
    },
    mounted() {
      let user = _c.getCookie('user')
      
      this.GET('/getstep')
        .then(res=>{
          this.step = res.data.curstep
          if(this.step==='midgroup'){
            this.POST('/teacher/tchMGrouping',{account:user})
              .then(res=>{
                if (res.data) {
                this.gotGroup = true
                this.groupId = res.data._id
                this.teachers = res.data.teachers
                this.students = res.data.students
          }
              })
          }else{
            this.tchGrouping({ account: user })
        .then(() => {
          console.log(this._stu_tch_Group)
          if (this._stu_tch_Group.length !== 0) {
            this.gotGroup = true
            this.groupId = this._stu_tch_Group._id
            this.teachers = this._stu_tch_Group.teachers
            this.students = this._stu_tch_Group.students
          }
        })
          }
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.group-current-status
{
    font-size: 24px;

    display: inline-block;

    width: 132px;
    margin: 16px 0;
    padding: 12px;

    border-left: 6px solid $red;
}
.group-status-card
{
    font-size: 16px;

    position: relative;

    min-width: 480px;
    max-width: calc(100% - 64px);
    &:hover
    {
        transform: translateY(-4px);

        -webkit-box-shadow: $material-shadow-6dp;
           -moz-box-shadow: $material-shadow-6dp;
                box-shadow: $material-shadow-6dp;
    }
    .card-title
    {
        font-family: Century Gothic;
        font-variant: small-caps;

        position: absolute;
        top: 12px;
        left: 12px;
    }
    .teacher-wrapper
    {
        position: relative;

        padding: 36px 16px 16px 8px;

        background-color: #e4e4e4;
        .group-id-icon
        {
            position: absolute;
            z-index: 20;
            right: -20px;
            bottom: - 20px;
        }
    }
    .student-wrapper
    {
        position: relative;

        padding: 36px 16px 16px 8px;

        background-color: white;
        .student-chips
        {
            display: inline-flex;

            flex-wrap: wrap;
        }
        .student-name
        {
            margin: 0 6px;
        }
        .mu-icon
        {
            position: relative;
            top: 2px;
            left: -2px;
        }
    }
}


</style>