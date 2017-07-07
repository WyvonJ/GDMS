<template>
  <div class="procedure">
  <section>
    <mu-raised-button label="切换创建题目" class="procedure-button" @click="toCreateTopic" secondary/>
    <mu-raised-button label="切换选择题目" class="procedure-button" @click="toSelectStudent" secondary/>
  	
  </section>
    <section class="paper workflow">
      <div class="workflow-title">
        <span>流程未完成导师</span>
      </div>
      <div class="workflow-panel">
      <div class="unfinished-wrapper">
      	<div class="first-unfinished chip" v-for="teacher of teacherUnfinished">
      		{{teacher}}
      	</div>
      </div>
      </div>
    </section>
    <section class="paper workflow">
      <div class="workflow-title">
        <span>流程未完成学生</span>
      </div>
      <div class="workflow-panel">
      <div class="unfinished-wrapper">
      	<p class="student-first-unfinished">
      		未登录选题学生：
      	</p>
      	<div class="first-unfinished chip" v-for="student of notLoginStu">
      		{{student._id}} - {{student.name}}
      	</div>
      </div>
      </div>
    </section>
  </div>
</template>


<script type="text/javascript">
	export default{
		data(){
			return {
				teacherUnfinished:[],
				notLoginStu:[]
			}
		},
		methods:{
			toCreateTopic(){
				this.GET('/admin/toCreateTopic')
					.then(res=>{
						if (res.data.state===1) {
							alert('现在可以创建题目了')
						}
					})
			},
			toSelectStudent(){
				this.GET('/admin/toSelectStudent')
					.then(res=>{
						if (res.data.state===1) {
							alert('现在导师可以选择学生了了')
						}
					})
			}
		},
		mounted(){
			this.GET('/admin/unhandledTch')
				.then(res => {
					this.teacherUnfinished = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			this.GET('/admin/unhandledStu')
				.then(res => {
					this.notLoginStu = res.data
				})
				.catch(err=>{
					console.log(err)
				})
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss'; 

.procedure{
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-wrap: nowrap;
	section{
		display: inline-block;
		margin: 8px;
		flex: 1;
		div[class$="title"]{

		height: 40px;
		background-color: #f7f7f7;
		display: flex;
		padding: 8px;
		span{
			font-weight: 400;
			font-size: 20px;
		}
		}
		div[class$="panel"]{
		padding: 16px;
		button{
			margin: 8px;
		}
		}
	}
}
.chip{
	height: 28px;
}
.unfinished-wrapper{
	margin: 2px 8px;
}
</style>