<template>
  <div class="student-account-container">
 
  	<div class="paper">
  	<div class="table-admin">
  		<button class="upload" @click="dialog=true">
     <img src="../../assets/icon/upload_g.svg" alt="phone" />
      <span>帐号上传</span>
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
            <th>微信</th>
            <th>QQ</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr class="table-row-border" v-for="(student,index) in studentAccounts">
  					<td :style="genderBorder(student.gender)" width="12%">{{student._id}}</td>
  					<td width="12%">{{student.name}}</td>
  					<td width="12%">{{student.password}}</td>
  					<td width="12%">{{student.tel||'无'}}</td>
  					<td width="12%">{{student.email||'无'}}</td>
            <td width="12%">{{student.wechat||'无'}}</td>
            <td width="12%">{{student.qq||'无'}}</td>
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
import { mapState, mapActions } from 'vuex'
import { post } from 'axios'
export default {
  data() {
      return {
        dialog: false,
        chosenFile: '选择文件',
        progressBar: 0,
        studentAccounts: [{
          _id: '1030513441',
          name: '李达康',
          gender: '男',
          password: '123456',
          tel: '18016996320',
          email: 'google@hotmail.com',
          wechat:'asdf'
        }, {
          _id: '1030513441',
          name: '李达康',
          gender: '男',
          password: '123456',
          tel: '18016996320',
          email: 'google@hotmail.com'
        }, {
          _id: '1030513441',
          name: '李达康',
          gender: '男',
          password: '123456',
          tel: '18016996320',
          email: 'google@hotmail.com'
        }, ]
      }
    },
    methods: {
      genderBorder(gender) {
        let color = gender === '男' ? '#3f51b5' : '#f44336'
        return {
          borderLeft: '4px solid ' + color
        }
      },
      deleteAccounts() {
      	this.GET('/admin/admDelStuAcc')
      		.then(res => {})
      },
      fileInput() {
        let routes  = '/admin/admStuAccUpload'
        let file = document.querySelector('#file').files[0]
        if (file) {
          this.chosenFile = file.name
          let output = document.querySelector('#output')
          let data = new FormData()
          data.append('file', file)
          let config = {
            onUploadProgress: (progressEvent) => {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
          }
          this.POST(routes, data, config)
            .then((res) => {
              if (res.data.state === 1) {
                output.className = 'container'
              this.message = '成功上传文件'
              this.progressBar = 100
              this.dialog = false
              this.GET('/admin/admGetTchAccount')
                .then(res => {
                  this.teacherAccounts = res.data
                })
                .catch(err=>{
                  console.log(err)
                })
            }else{
              output.className = 'container text-danger'
              this.message = '上传文件失败，请重新试试'
            }
            })
            .catch((err) => {
              output.className = 'container text-danger'
              this.message = '上传文件失败，请重新试试'
              console.log(err)
            })
        } else {
          this.message = ''
          output.className = 'container'
          chosenFile = '选择文件'
        }
      }
    },
    mounted(){
      this.GET('/admin/admGetStuAccount')
        .then(res=>{
          this.studentAccounts = res.data
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss">

.student-account-container,.teacher-account-container
{
    .file-button
    {
        position: absolute;
        z-index: 12;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        width: 100%;

        cursor: pointer;

        opacity: 0;
    }
    .table-admin
    {
        padding: 8px 0 8px 16px;

        border-bottom: 1px solid #d8d8d8;
    }
    button{
        border: 1px solid #bababa;
        background-color: transparent;
        color: black;
    }
    .upload:hover{
    		background-color: #dadada;
    	}
    caption
    {
        padding: 8px 0;
    }
    th:first-child
    {
        border-left: 4px #42b983 solid;
    }
}

.form
{
    position: relative;
}
.form-control
{
    position: absolute;
    z-index: 12;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;

    cursor: pointer;

    opacity: 0;
}

.form-group
{
    margin: 4px;
    padding: 18px 0;

    border: 2px dashed #dedede;
}
.container
{
    padding: 12px 4px;
}
.text-danger
{
    font-size: 18px;

    color: #f44336;
    border: 1px solid #f44336;
}

progress
{
    width: 274px;
    height: 12px;
    margin: 8px 0;

    color: #4caf50; /*IE10*/
    border: 1px solid #4caf50;
    border-radius: 2px;
}

progress::-moz-progress-bar
{
    background: #4caf50;
}
progress::-webkit-progress-bar
{
    background: white;
}
progress::-webkit-progress-value
{
    background: #4caf50;
}

</style>