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
      <button @click="commitGrade" class="grade-button">
          <i class="material-icons star-icon">star</i>
          提交分数
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
				name:'NULL'
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
        .grade-button{
            outline: none;
            background: transparent;
            border: 1px #f44336 solid;
            color: #f44336;
            border-radius: 2px;
            transition: $material-enter;
            cursor: pointer;
            padding: 0px 8px 8px 8px;
            font-size: 16px;
            vertical-align: text-top;
            &:hover{
                background-color: #f44336;
                color: white;
            }
            .star-icon{
                position: relative;
                top: 4px;
            }
        }
    }
}

	
</style>