<template>
  <div class="evaluation-card">
  <div class="sub-padding">

    <div class="teacher-info">
      <mu-avatar :icon="emoji" :size="44" :iconSize="36" />
      <div class="name">
        {{name}}
      </div>
      <mu-avatar class="grade" backgroundColor="greenA700" :size="44" :iconSize="36">{{grade}}</mu-avatar>
    </div>
    <div class="grade-content">
      <mu-slider v-model="grade" :step="1" @change="faceChange" class="grade-slider" />
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
				name:'为人民服务'
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
.evaluation-card
{
    transition: $material-enter;

    border-radius: 3px;
    -webkit-box-shadow: $material-shadow-1dp;
       -moz-box-shadow: $material-shadow-1dp;
            box-shadow: $material-shadow-1dp;
    &:hover
    {
        -webkit-box-shadow: $material-shadow-6dp;
           -moz-box-shadow: $material-shadow-6dp;
                box-shadow: $material-shadow-6dp;
    }
    .teacher-info
    {
        position: relative;

        padding: 8px 16px;
        width: 480px;
        background-color: #dedede;
        .name
        {
            font-size: 24px;

            position: relative;
            bottom: 8px;
            left: 18px;

            display: inline-block;
        }
        .grade
        {
            font-size: 24px;

            position: absolute;
            right: 18px;
            bottom: 8px;
        }
    }
    .grade-content
    {width: 480px;
        padding: 8px 16px;
        .grade-slider
        {
            margin-top: 16px;
        }
        .mu-flat-button
        {
            margin-top: 16px;

            color: #fff;
            background-color: #03a9f4;
        }
    }
}

	
</style>