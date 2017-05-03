<template>
  <div class="evaluation-card">
    <div class="teacher-wrapper paper">
      <div class="teacher-info">
        <span class="name">{{name}}</span>
        <span class="grade">{{grade}}</span>
      </div>
      <div class="grade-content">
        <mu-slider v-model="grade" :step="1" class="grade-slider" />
        <button @click="commitGrade" class="red" disabled="isOpenForEva">
          <i class="material-icons star-icon">star</i>
          <span>提交分数</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				grade:60,
				name:'导师',
        isOpenForEva:false
			}
		},
		methods:{
			commitGrade(){
        let id = _c.getCookie('user')
        if (!id) 
          return alert('登录超时，请重新登录后操作')
				this.stuEvaluationToTch({
					studentId:id,
					grade:this.grade
				})
			},
			...mapActions(['stuEvaluationToTch'])
		}
	}
</script>

<style lang="sass" stylesheet="scss" scoped>
@import '../../style/variables.scss';
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
            top: -4px;
        }
    }
}

	
</style>