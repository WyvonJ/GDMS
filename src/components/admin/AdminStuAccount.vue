<template>
  <div class="student-account-container">
 
  	<div class="paper">
  	<div class="table-admin">
  		 <button class="blue" label="选择文件">
      <input type="file" class="file-button" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
      <i class="material-icons">file_upload</i>
      <span>帐号上传</span>
    </button>
     <button class="red" label="选择文件">
      <i class="material-icons">delete_forever</i>
      <span>帐号删除</span>
    </button>
  	</div>
  	
  		<table>
  			<caption>学生信息表</caption>
  			<thead>
  				<tr>
  					<th>学号</th>
  					<th>姓名</th>
  					<th>密码</th>
  					<th>手机号</th>
  					<th>邮箱</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr class="table-row-border" v-for="(student,index) in studentData">
  					<td :style="genderBorder(student.gender)" width="12%">{{student._id}}</td>
  					<td width="12%">{{student.name}}</td>
  					<td width="12%">{{student.password}}</td>
  					<td width="12%">{{student.tel}}</td>
  					<td width="12%">{{student.email}}</td>
  				</tr>
  			</tbody>
  		</table>
  	</div>
  </div>
</template>

<script type="text/javascript">
//导入full build 以后更改需求
import {mapState,mapActions} from 'vuex'
	export default {
		data(){
			return{
				studentData:[{
					_id:'1030513441',
					name:'李达康',
					gender:'男',
					password:'123456',
					tel:'18016996320',
					email:'google@hotmail.com'
				},{
					_id:'1030513441',
					name:'李达康',
					gender:'男',
					password:'123456',
					tel:'18016996320',
					email:'google@hotmail.com'
				},{
					_id:'1030513441',
					name:'李达康',
					gender:'男',
					password:'123456',
					tel:'18016996320',
					email:'google@hotmail.com'
				},]
			}
		},
		computed:{
			
		},
		methods:{
			genderBorder(g){
				let c=g==='男'?'#3f51b5':'#f44336'
				return{
					borderLeft:'4px solid '+c
				}
			}
		},
		mounted(){
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>

.student-account-container{
	.file-button{
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}
.table-admin{
	padding: 8px 0 8px 16px;
	border-bottom: 1px solid #d8d8d8; 
}
.red,.blue{
	margin-left: 8px;
	span{
		position:relative;
		top: -4px;
	}
}
caption{
	padding: 8px 0;
}
th:first-child
{
    border-left: 4px #42b983 solid;
}
}
</style>