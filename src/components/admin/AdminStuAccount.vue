<template>
  <div class="student-account-container">
 
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
  				<tr class="table-row-border" v-for="(student,index) in _adm_StuAccounts">
  					<td :style="genderBorder(student.gender)" width="12%">{{student._id}}</td>
  					<td width="12%">{{student.name}}</td>
  					<td width="12%">{{student.password}}</td>
  					<td width="12%">{{student.tel||'无'}}</td>
  					<td width="12%">{{student.email||'无'}}</td>
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
				_adm_StuAccounts:[{
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
			...mapState(['_adm_StuAccounts'])
		},
		methods:{
			genderBorder(g){
				let c=g==='男'?'#3f51b5':'#f44336'
				return{
					borderLeft:'4px solid ' + c
				}
			},

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
          output.innerHTML = '成功上传文件'
          this.progressBar=100
        })
        .catch((err)=> {
          output.className = 'container text-danger'
          output.innerHTML = '上传文件失败，请重新试试'
          console.log(err)
        })
  		}else{
  			chosenFile='选择文件'
  		}
  	}

		},
		mounted(){
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">

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
  z-index: 12;
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

.form{
	position: relative;
}
.form-control{
	 position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 12;
}

.form-group{
	padding: 18px 0;
	border: 2px dashed #dedede;
	margin: 4px;
}
.container{
	padding: 12px 4px;
}
.text-danger{
	color: #f44336;
	font-size: 18px;
	border: 1px solid #f44336;
}

progress {
    width: 274px;
    height: 12px;
    border: 1px solid #4caf50;  
    color: #4caf50; /*IE10*/
    border-radius: 2px;
    margin: 8px 0;
}

progress::-moz-progress-bar { background: #4caf50; }
progress::-webkit-progress-bar { background: white }
progress::-webkit-progress-value  { background: #4caf50; }
.red,.blue{
	margin:  0 12px;
}
</style>