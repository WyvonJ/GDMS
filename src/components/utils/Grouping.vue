<template>
  <div class="group-container">
  <div class="sub-padding">
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
      <div class="chip" v-for="(student,index) in students">
          <mu-icon value="face" color="blue500" :size="18" /> 
          <span class="student-name">
            {{student.name}}
          </span>
          <div class="student-topic">
            {{student.final.title}}
          </div>
        </div>
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
      if (!user) {
        //alert('超时未操作，请重新登录')
        // return this.$router.push('/')
      }
      this.tchGrouping({ account: user })
        .then(() => {
          if (this._stu_tch_Group.length !== 0) {
            this.gotGroup = true
            this.groupId = this._stu_tch_Group._id
            this.teachers = this._stu_tch_Group.teachers
            this.students = this._stu_tch_Group.students
          }
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.group-status-card
{
    font-size: 16px;

    position: relative;

    max-width: 480px;

    &:hover
    {
        transform: translateY(-4px);

        -webkit-box-shadow: $material-shadow-6dp;
           -moz-box-shadow: $material-shadow-6dp;
                box-shadow: $material-shadow-6dp;
    }
    .card-title{
      position: absolute;
      left: 12px;
      top: 12px;
      font-family: Century Gothic;
      font-variant: small-caps;
    }
    .chip
    {
        font-size: 14px;

        position: relative;

        display: inline-block;
        cursor: default;
        width: 100px;
        max-width: 128px;
        height: 32px;
        margin: 6px;
        padding: 4px 16px 4px 12px;

        transition: $material-enter;

        border: 1px #efefef solid;
        border-radius: 16px;
        background-color: #fff;
        overflow: hidden;
        &:hover
        {
                    -webkit-box-shadow: $material-shadow-1dp;
               -moz-box-shadow: $material-shadow-1dp;
                    box-shadow: $material-shadow-1dp;
        }
        .mu-icon
        {
            position: relative;
            top: 2px;
        }
    }

    .teacher-wrapper
    {
        padding: 36px 16px 16px 8px;

        background-color: #e4e4e4;
        position: relative;
    .group-id-icon{
      position: absolute;
      right: -20px;
      bottom: - 20px;
      z-index: 20;
    }
        .chip{
          width: auto;
        }
    }
    .student-wrapper
    {
        position: relative;
        background-color: #fff;
        padding: 36px 16px 16px 8px;
        .chip{
          background-color: #e4e4e4;
          &:hover
        {
          height: 80px;
          width: auto;
        }
        .student-topic{
          padding: 4px 0;
        }
        }
      }
        
}

</style>