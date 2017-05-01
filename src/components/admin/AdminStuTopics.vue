<template>
  <div class="student-topics">
  <div class="paper">
    	<table>
  			<caption>学生选题表</caption>
  			<thead>
  				<tr>
  					<th>学号</th>
  					<th>姓名</th>
  					<th>导师</th>
  					<th>题号</th>
  					<th>题目</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr v-for="(student,index) in _adm_StuTopics">
  					<td width="20%">{{student._id}}</td>
  					<td width="15%">{{student.name}}</td>
  					<td width="15%">{{student.teacher||'无'}}</td>
  					<td width="20%">{{student.final._id||'无'}}</td>
  					<td width="30%">{{student.final.title||'无'}}</td>
  				</tr>
  			</tbody>
  		</table>
  </div>
  
  </div>
</template>

<script type="text/javascript">
import {mapState} from 'vuex'
	export default{
		data(){
			return {
			}
		},
    methods:{
      exportTopics(){
        this.GET('/admin/admExpStuTopics')
      }
    },
    mounted(){
      this.GET('/admin/admGetStuTopics')
    },
		computed:mapState(['_adm_StuTopics'])
	}
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
.student-topics-admin{
	padding: 8px 0 8px 16px;
	border-bottom: 1px solid #dedede; 
}
caption{
	padding: 8px 0;
}
</style>