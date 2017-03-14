<template>
  <div class="main-content" v-if="gotGroup">
    <div class="group-status-card">
      <div class="teacher-wrapper">
      <span class="card-title">TEACHER</span>
        <div class="chip" v-for="(teacher,index) in card.teachers">
          <mu-icon value="account_circle" color="greenA700" :size="18" /> {{teacher}}
        </div>
      </div>
      <div class="student-wrapper">
      <span class="card-title">STUDENT</span>
      <div class="chip" v-for="(student,index) in card.students">
          <mu-icon value="face" color="blue500" :size="18" /> {{student}}
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
        card: {
         teachers:['程砚秋','尚小云','荀慧生','马连良','杨宝森'],
         students:['谭富英','裘盛戎','周信芳','余叔岩','张君秋','奚啸伯','杜月笙']
        }
      }
    },
    computed:{
      ...mapState(['affirmativeTopic'])
    },
    methods:{
      toggleEmpty(){
        this.open=!this.open
      },
      ...mapActions(['stuSelectionResult'])
    },
    mounted(){
      var user=this.$root.getCookie('user')
      /*if (!user){
                alert('超时未操作，请重新登录')
                return this.$router.push('/')
              }*/
      /*this.stuSelectionResult({studentId:user})
        .then(()=>{
        if (this.affirmativeTopic.length!=0) {
          this.gotGroup=true
          this.card=this.affirmativeTopic
          console.log(this.affirmativeTopic)
        }
      })*/
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

    color: rgba(0,0,0,.6);
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
    .teacher-wrapper
    {
        padding: 36px 16px 16px 8px;

        background-color: #e4e4e4;
    }
    .chip
    {
        font-size: 14px;

        position: relative;

        display: inline-block;
        cursor: default;
        width: auto;
        height: 32px;
        margin: 6px;
        padding: 2px 16px 2px 12px;

        transition: $material-enter;

        border: 1px #efefef solid;
        border-radius: 16px;
        background-color: #fff;
        &:hover
        {
            -webkit-box-shadow: $material-shadow-1dp;
               -moz-box-shadow: $material-shadow-1dp;
                    box-shadow: $material-shadow-1dp;
        }
        .mu-icon
        {
            position: relative;
            top: 5px;
        }
    }
    .student-wrapper
    {
        position: relative;

        padding: 36px 16px 16px 8px;
        .chip{
          background-color: #e4e4e4;
        }
        }
        
}

</style>