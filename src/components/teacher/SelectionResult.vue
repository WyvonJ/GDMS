<template>
	<div class="main-content" v-if="gotResult">
    <div class="teacher-topics-status">
      <md-layout md-gutter="16">
        <md-layout class="single-card" md-flex-small="100" md-flex-medium="50" v-for="(result,index) in resultDataInView">
          <mu-paper :zDepth="2">
            <div class="result-title">
              {{result._id}}. {{result.title}}
            </div>
            <div class="a-student" v-for="(student,sid) in  result.finalstudents">
            <div class="student-details">
            	<mu-avatar :size="48" :backgroundColor="student.gender=='女'?'#ff4081':'#26c6da'">{{student.name}}</mu-avatar> - {{student._id}}</span>
            <div class="student-contact">
            	 	TEL:{{student.tel}}<br/>
            		EMAIL:{{student.email}}<br/>
            		QQ:{{student.qq}}<br/>
            		WECHAT:{{student.wechat}}
            </div>
            </div>
            </div>
          </mu-paper>
        </md-layout>
      </md-layout>
    </div>
  </div>
  <div class="main-content" v-else>
    <div class="empty-card-title" :class="{'hide':open}">
      这里空空如也！
      <p class="intrgging">不是说了啥都没有么 (゜-゜)つロ。</p>
    </div>
  </div>
</template>

<script>

import { mapState ,mapActions,mapMutations} from 'vuex'
	export default{
		data(){
			return {
				gotResult:true,
				resultDataInView:[]
			}
		},
		computed:{
			...mapState(['user','resultData'])
		},
		methods:{
			...mapActions(['tchSelectionResult'])
			//一键导出excel表格功能实现
		},
		mounted(){

	   if(this.$root.getCookie('user')){
       var user=this.$root.getCookie('user')
        this.tchSelectionResult({teacherId:user})
				.then(()=>{
					this.resultDataInView=this.resultData
				})
				.catch(error=>{
					console.log(error)
				})
     }else{
       this.$router.push('/')
     }
			
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';

.teacher-topics-status
{
    margin: 8px 0;

    transition: all .4s cubic-bezier(.2,.2,.4,1);
    .mu-paper
    {
        transition: $material-enter;
        &:hover
        {
            -webkit-box-shadow: $material-shadow-9dp;
               -moz-box-shadow: $material-shadow-9dp;
                    box-shadow: $material-shadow-9dp;
        }
    }
    .single-card
    {
        margin: 8px 0;
        .mu-paper
        {
            width: 100%;
        }
        .result-title
        {
            position: relative;

            padding: 8px;

            color: #fff;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            background-color: #2196f3 !important;
        }
        .a-student
        {
            position: relative;

            width: 184px;
            height: 64px;
            margin: 12px;

            transition: $material-enter;
            border-radius: 56px;
            -webkit-box-shadow: $material-shadow-1dp;
               -moz-box-shadow: $material-shadow-1dp;
                    box-shadow: $material-shadow-1dp;
            &:hover
            {
                .student-contact
                {
                    display: block !important;
                }
            }
            .student-details
            {
                font-size: 16px;

                overflow: hidden;

                padding: 8px;
                .mu-avatar
                {
                    font-size: 14px !important;
                }
                .student-contact
                {
                    display: none;
                }
            }
        }
    }
}

</style>