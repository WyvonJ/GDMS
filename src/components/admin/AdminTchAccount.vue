<template>
  <div class="teacher-account-container">
 
  	<div class="paper">
  	<div class="table-admin">
  	<vue-clip :options="options" class="uploader">
    <template slot="clip-uploader-action">
    	<div class="uploader-action">
    		<div class="dz-message">
    			 <button class="blue">
      <i class="material-icons">file_upload</i>
      <span>帐号上传</span>
    </button>
    		</div>
    	</div>
    </template>
    <template slot="clip-uploader-body" scope="props">
    	<div class="uploader-files">
    		<div class="uploader-file" v-for="file of props.files">
    			<div class="file-details">
    				<div class="file-name">
    					{{file.name}}
    				</div>
    				<div class="file-progress" v-if="file.status !== 'error' && file.status !== 'success'">
    					<span class="progress-indicator" :style="{width: file.progress + '%'}"></span>
    				</div>
    				<div class="file-meta" v-else>
    					<span class="file-status">
    						{{file.status}}
    					</span>
    				</div>
    			</div>
    		</div>
    	</div>
    </template>
    </vue-clip>
  		
    
     <button class="red">
      <i class="material-icons">delete_forever</i>
      <span>帐号删除</span>
    </button>

    
  	</div>
  	
  		<table>
  			<caption>导师信息表</caption>
  			<thead>
  				<tr>
  					<th>帐号</th>
  					<th>姓名</th>
  					<th>密码</th>
  					<th>手机号</th>
  					<th>邮箱</th>
  					<th>QQ/WeChat</th>
  					<th>办公室</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr class="table-row-border" v-for="(teacher,index) in _adm_TchAccounts">
  					<td width="12%">{{teacher._id}}</td>
  					<td width="12%">{{teacher.name}}</td>
  					<td width="12%">{{teacher.password}}</td>
  					<td width="12%">{{teacher.tel}}</td>
  					<td width="12%">{{teacher.email}}</td>
  					<td width="12%">{{teacher.qq}}/{{teacher.wechat}}</td>
  					<td width="12%">{{teacher.office}}</td>
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
				files:[],
				options:{
					url:'/admin/admUpTchAccounts',
					method:'post',
					parallelUploads:1,
					uploadMultiple:false,
					maxFiles:1,
					paramName:'file',
					acceptedFiles:{
						extensions:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
						message:'文件格式不对！'
					}
				}
			}
		},
		computed:{
			...mapState(['_adm_TchAccounts'])
		},
		methods:{
			fileUpload($event){
				let fileReader=new FileReader()
				console.log($event.target.files[0])
				fileReader.onload=(e)=>{
					console.log(e)
				}
			},
			...mapActions(['admUpTchAccounts'])
		},
		mounted(){
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>

.teacher-account-container{
	.file-button{
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  z-index: 12;
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
	table{
		font-size: 16px;
		border-collapse: collapse;
  	border-spacing: 0;
	}
	caption{
		padding: 16px 0;
		font-size: 20px;
	}
	th{
		font-weight: lighter;
		padding: 8px 0;
	}
	th:first-child{
		padding-left: 24px;
		border-left: 4px #42b983 solid;
	}
	tr:nth-child(even){
		background-color: #f4f4f4;
	}
	tr{
		transition: all .3s cubic-bezier(.2,.1,.6,1);
		&:hover{
			background-color: #ececec;
		}
	}
	
	td{
		padding: 6px 0;

  white-space: nowrap;
  text-overflow: ellipsis;
	}
	td:first-child{
		padding-left: 16px;
	}
}
</style>