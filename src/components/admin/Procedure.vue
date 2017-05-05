<template>
  <div class="procedure">
    <section class="paper workflow">
      <div class="workflow-title">
        <span>导师未处理事件</span>
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
        <span>学生未处理事件</span>
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
				teacherUnfinished:['陈伟','陈丽芳','迪兰'],
				notLoginStu:[{
					_id:'1030513410',
					name:'辽宁'
				}]
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
	flex-wrap: wrap;
	section{
		display: inline-block;
		margin: 8px;
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