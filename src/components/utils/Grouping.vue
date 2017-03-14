<template>
  <div class="main-content" v-if="gotGroup">
    <div class="group-status-card">
      
      <div class="teacher-wrapper">
      <mu-avatar backgroundColor="red500" class="group-id-icon">{{card._id}}</mu-avatar>
      <span class="card-title">TEACHER</span>
        <div class="chip" v-for="(teacher,index) in card.teachers">
          <mu-icon value="account_circle" color="greenA700" :size="18" /> {{teacher.name}}
        </div>
      </div>
      <div class="student-wrapper">
      <span class="card-title">STUDENT</span>
      <div class="chip" v-for="(student,index) in card.students">
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
  <div class="main-content" v-else>
    <div class="empty-card-title" :class="{'hide':open}" @click="toggleEmpty">
      这里空空如也！
      <p class="intrgging">不是说了啥都没有么 (゜-゜)つロ。</p>
    </div>
  </div>
</template>


<script>
import {mapActions,mapState} from 'vuex'
  export default{
    data(){
      return {
        open:false,
        gotGroup:true,
        card: {}
      }
    },
    computed:{
      ...mapState(['grouping'])
    },
    methods:{
      toggleEmpty(){
        this.open=!this.open
      },
      ...mapActions(['tchGrouping'])
    },
    mounted(){
      var user=this.$root.getCookie('user')
      if(!user){
            alert('超时未操作，请重新登录')
            return this.$router.push('/')
      }
      this.tchGrouping({account:user})
        .then(()=>{
        if (this.grouping.length!=0) {
          this.gotGroup=true
          this.card._id=this.grouping._id
          this.card.teachers=this.grouping.teachers
          this.card.students=this.grouping.students
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

    transition: $material-enter;

    border-radius: 3px;
    -webkit-box-shadow: $material-shadow-1dp;
       -moz-box-shadow: $material-shadow-1dp;
            box-shadow: $material-shadow-1dp;
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
        .student-name{

        }
        .student-topic{
          padding: 4px 0;
        }
        }
      }
        
}

</style>