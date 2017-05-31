<template>
  <div class="evaluation-card">
    <div class="teacher-wrapper paper">
      <div class="teacher-info">
        <span class="name">{{name}}</span>
        <span class="grade">{{grade}}</span>
      </div>
      <div class="grade-content">
        <mu-slider v-model="grade" :step="1" class="grade-slider" />
        <mu-text-field hintText="评语" v-model="evaMsg" multiLine type="text" icon="thumb_up"/><br/>
         <mu-raised-button @click="commitGrade" :disabled="isOpenForEva" secondary label="评分">
           <wyvonj-tooltip>{{msg}}</wyvonj-tooltip>
         </mu-raised-button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  data() {
      return {
        grade: 80,
        name: '导师',
        isOpenForEva: false,
        evaMsg:'',
        msg:'现在还不能评分'
      }
    },
    methods: {
      commitGrade() {
        let id = _c.getCookie('user')
        if (!id)
          {
            alert('登录超时，请重新登录后操作')
            this.$router.push('/')
          } 
        this.stuEvaluationToTch({
          studentId: id,
          grade: this.grade
        })
      },
      ...mapActions(['stuEvaluationToTch'])
    },
    mounted(){
      let id = cookie.get('user')
      this.POST('/student/stuSelectionResult',{studentId:id})
        .then((res)=>{
          if(res.data.state === 1){
            this.isOpenForEva=true
            this.msg=''
            this.name=res.data.name
          }
        })
    }
}

</script>

<style lang="sass" stylesheet="scss" scoped>
@import '../../style/variables.scss';
.wyvonj-tooltip{
  background-color: rgba(0,0,0,.6);
  color: white;
}
.evaluation-card
{
    .teacher-wrapper{
        border-radius: 3px;
        width: 480px;
    }
    .teacher-info
    {
        position: relative;

        padding: 16px;
        border-top: 16px solid $indigo; 
        height: 32px;
        .name
        {
            float: left;
            font-size: 24px;
        }
        .grade
        {
            font-size: 24px;
            float: right;
        }
    }
    .grade-content
    {
        padding: 8px 16px;
        .grade-slider
        {
            margin-top: 16px;
        }
        .red span{
            position: relative;
            top: 4px;
        }
    }
}

	
</style>