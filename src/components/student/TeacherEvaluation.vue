<template>
  <div class="evaluation-card">
  <div class="teacher-wrapper paper">
       <div class="teacher-info">
      <div class="name">
        {{name}}
      </div>
      <div class="grade">
          {{grade}}
      </div>
    </div>
    <div class="grade-content">
      <mu-slider v-model="grade" :step="1" @change="faceChange" class="grade-slider" />
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
				emoji:'sentiment_neutral',
				name:'导师',
                isOpenForEva:false
			}
		},
		methods:{
			faceChange(value){
				if (value<=40) {
					this.emoji='sentiment_very_dissatisfied'
				}else if(value>40 && value<60){
					this.emoji='sentiment_dissatisfied'
				}else if(value===60){
					this.emoji='sentiment_neutral'
				}else if(value>60 && value <=80){
					this.emoji='sentiment_satisfied'
				}else if(value>80){
					this.emoji='sentiment_very_satisfied'
				}
			},
			commitGrade(){
				this.stuEvaluationToTch({
					studentId:_c.getCookie('user'),
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
        padding: 16px;
        border-radius: 3px;
        width: 480px;
    }
    .teacher-info
    {
        position: relative;

        padding: 8px 16px;
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