<template>
	<div class="main-content">
		<div class="evaluation-card">
		<div class="teacher-info">
			<mu-avatar :icon="emoji" :backgroundColor="emojibg" :size="44" :iconSize="36"/>
			<div class="name">
            {{name}}
        </div>
        <mu-avatar class="grade" backgroundColor="green500" :size="44" :iconSize="36">{{grade}}</mu-avatar>
		</div>
		<div class="grade-content">
				<mu-slider v-model="grade" :step="1" @change="faceChange" class="grade-slider"/>
				<mu-flat-button label="提交分数" icon="star" @click="commitGrade" primary/>
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
				emojibg:'deepOrange500',
				name:'张宇'
			}
		},
		methods:{
			faceChange(value){
				if (value<=40) {
					this.emoji='sentiment_very_dissatisfied'
					this.emojibg='green900'
				}else if(value>40 && value<60){
					this.emoji='sentiment_dissatisfied'
					this.emojibg='lime800'
				}else if(value===60){
					this.emoji='sentiment_neutral'
					this.emojibg='deepOrange500'
				}else if(value>60 && value <=80){
					this.emoji='sentiment_satisfied'
					this.emojibg='pinkA400'
				}else if(value>80){
					this.emoji='sentiment_very_satisfied'
					this.emojibg='red500'
				}
			},
			commitGrade(){
				this.stuEvaluationToTch({
					studentId:this.$root.getCookie('user'),
					grade:this.grade
				})
			},
			...mapActions(['stuEvaluationToTch'])
		}
	}
</script>

<style lang="sass" stylesheet="scss" scoped>
@import '../../style/variables.scss';
.evaluation-card{
	width: 480px;
	 transition: $material-enter;
  border-radius: 3px;
  -webkit-box-shadow: $material-shadow-1dp;
  -moz-box-shadow: $material-shadow-1dp;
  box-shadow: $material-shadow-1dp;
  &:hover {
    -webkit-box-shadow: $material-shadow-6dp;
    -moz-box-shadow: $material-shadow-6dp;
    box-shadow: $material-shadow-6dp;
  }
  .teacher-info{
  	padding: 8px 16px;
  	background-color: #dedede;
      position: relative;

  	.name {
      font-size: 24px;
      position: relative;
      bottom: 8px;
      left: 18px;
      display: inline-block;
    }
    .grade{
      position: absolute;
      bottom: 8px;
      right:18px;
      font-size: 24px;
    }
  }
  .grade-content{
  	padding: 8px 16px; 
  	.grade-slider{
		margin-top: 16px;
	}
	.mu-flat-button
        {
            border-radius: 18px;
            margin-top: 16px;
        }
  }
	
}
	
</style>