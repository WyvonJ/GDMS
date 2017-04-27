<template>
  <div class="teacher-account-container">
 
  	<div class="paper">
  	<div class="table-admin">
    <button class="blue" @click="dialog=true">
      <i class="material-icons">file_upload</i>
      <span>帐号上传</span>
    	</button>
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
  				<tr v-for="(teacher,index) in _adm_TchAccounts">
  					<td width="12%">{{teacher._id}}</td>
  					<td width="12%">{{teacher.name}}</td>
  					<td width="12%">{{teacher.password}}</td>
  					<td width="12%">{{teacher.tel||'无'}}</td>
  					<td width="12%">{{teacher.email||'无'}}</td>
  					<td width="12%">{{teacher.qq||'无'}}/{{teacher.wechat||'无'}}</td>
  					<td width="12%">{{teacher.office||'无'}}</td>
  				</tr>
  			</tbody>
  		</table>
  	</div>

  	 <mu-dialog class="form-dialog" :open="dialog" title="文件上传" @close="dialog=false">
        <form enctype="multipart/form-data" role="form" class="form" onsubmit="return false">
          <div class="form-group">
            <label for="file">{{chosenFile}}</label>
            <input id="file" @change="fileInput" type="file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
          </div>
        </form>
        <progress :value="progressBar" max="100"></progress>
        <div id="output">
        {{message}}
        </div>
        <button slot="actions" @click="dialog=false" class="red">
          <span>取消</span>
        </button>
      </mu-dialog>
  </div>
</template>

<script type="text/javascript">
//导入full build 以后更改需求
import {mapState,mapActions} from 'vuex'
import {post} from 'axios'
	export default {
		data(){
			return{
				dialog:false,
				chosenFile:'选择文件',
				progressBar:0,
				message:''
			}
		},
		computed:{
			...mapState(['_adm_TchAccounts'])
		},
		methods:{
			
  	fileInput(){
  		let routes
  		if (this.gradeType===0) {
  			routes='/admin/admMidGradeUpload'
  		}else{
  			routes='/admin/admFnlGradeUpload'
  		}
  		let file=document.getElementById('file').files[0]
  		if (file) {
  			this.chosenFile=file.name

      let output = document.getElementById('output')
      let data = new FormData()
      data.append('file', document.getElementById('file').files[0])
      let config = {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }
      post(routes, data, config)
        .then((res)=> {

          output.className = 'container'
          this.message = '成功上传文件'
          this.progressBar=100
        })
        .catch((err)=> {
          output.className = 'container text-danger'
          this.message = '上传文件失败，请重新试试'
          console.log(err)
        })
  		}else{
  			this.message=''
  			output.className = 'container'
  			chosenFile='选择文件'
  		}
  	},
			...mapActions(['admUpTchAccounts','admGetTchAccount'])
		},
		mounted(){
			this.admGetTchAccount()
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
		background-color: #fafafa;
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