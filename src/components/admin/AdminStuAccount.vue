<template>
  <div class="student-account-container">
 
  	<div class="paper">
  	<div class="table-admin">
      <mu-raised-button class="upload" secondary icon="file_upload" label="帐号上传" @click="dialog=true;manual=0"/>
        <mu-raised-button label="创建新帐号" primary icon="add" @click="addAccount()"/>
  	</div>
  		<table>
  			<caption>学生信息表</caption>
  			<thead>
  				<tr>
  					<th>学号</th>
  					<th>姓名</th>
            <th>性别</th>
  					<th>手机号码</th>
  					<th>邮箱</th>
            <th>微信</th>
            <th>QQ</th>
            <th>是否答辩</th>
            <th>帐号编辑</th>
            <th>密码修改</th>
            <th>删除帐号</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr class="table-row-border" v-for="(student,index) in studentAccounts">
  					<td>{{student._id}}</td>
  					<td>{{student.name}}</td>
            <td><mu-icon :value="student.gender==='男'?'mood':'face'" :color="student.gender==='男'?'blue':'red'"/></td>
  					<td>{{student.tel||'无'}}</td>
  					<td>{{student.email||'无'}}</td>
            <td>{{student.wechat||'无'}}</td>
            <td>{{student.qq||'无'}}</td>
            <td><mu-switch :label="student.finalreplied?'是':'否'" v-model="student.finalreplied" @change="updateReply(student)" class="reply-switch"/></td>
            <td><mu-icon-button icon="edit" style="color: #009688;" @click="openProfileEdit(student)"/></td>
            <td><mu-icon-button icon="lock" style="color: #00bcd4;" @click="openPassEdit(student)"/></td>
            <td><mu-icon-button icon="delete_forever" style="color: #f44336;" @click="deleteStudent(student)"/></td>

  				</tr>
  			</tbody>
  		</table>
  	</div>
  	 <mu-dialog class="form-dialog" :open="dialog" title="帐号管理" @close="dialog=false" titleClass="title-class">
     <div v-if="manual===0">
        <form enctype="multipart/form-data" role="form" class="form" onsubmit="return false">
          <div class="form-group">
            <label for="file">{{chosenFile}}</label>
            <input id="file" @change="fileInput" type="file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
          </div>
        </form>
        <progress :value="progressBar" max="100"></progress>
        <div id="output">
        </div>
      <mu-flat-button slot="actions" label="取消" @click="dialog=false"/>
     </div>
       <div v-if="manual===1">
         <mu-text-field hintText="学号" v-model="student._id" type="number" icon="account_circle"/><br/>
         <mu-text-field hintText="姓名" v-model="student.name" type="text" icon="face"/><br/>
         <div class="gender-radio">
           <mu-radio label="男" name="group" nativeValue="男" v-model="student.gender" class="demo-radio"/>
          <mu-radio label="女" name="group" nativeValue="女" v-model="student.gender"  class="demo-radio"/> 
         </div>
         <mu-text-field hintText="手机号" v-model="student.tel" type="number" icon="phone"/>
         <div class="addtional-contact">
           <img src="../../assets/icon/qq.svg" />
            <mu-text-field hintText="QQ" v-model="student.qq" />
            <br/>
           <img src="../../assets/icon/wechat.svg" />
            <mu-text-field hintText="Wechat" v-model="student.wechat" />
          </div>
         <div class="actions">
           <mu-raised-button slot="actions" color="white" backgroundColor="blue" :label="addoredit?'更新账户信息':'确认创建'" @click="updateProfile"/>
           <mu-flat-button slot="actions" secondary label="取消" @click="dialog=false"/>
         </div>
       </div>
       <div v-if="manual===2">
          <mu-text-field hintText="新密码" v-model="password" type="text" icon="lock"/>
          <div class="actions">
           <mu-raised-button slot="actions" color="white" backgroundColor="blue" label="确认修改密码" @click="updatePassword"/>
           <mu-flat-button slot="actions" secondary label="取消" @click="dialog=false"/>
         </div>
       </div>
      </mu-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
      return {
        dialog: false,
        chosenFile: '选择文件',
        progressBar: 0,
        manual:0,
        addoredit:0,
        studentId:'',
        student:{
          tel:'',
          name:'',
          gender:'',
          email:'',
          qq:'',
          wechat:'',
          finalreplied:false
        },
        password:'',
        studentAccounts: [{
          _id:'1030513430',
          name:'吴吉',
          gender:'男',
          tel:'18861823231',
          email:'wyvonj@gmail.com',
          wechat:'dale71717',
          qq:'552084208',
          finalreplied:true
        },{
          _id:'1030513131',
          name:'吉吴',
          gender:'女',
          tel:'18844512231',
          email:'jiwuwu@gmail.com',
          wechat:'nshishabi',
          qq:'74747474',
          finalreplied:false
        }]
      }
    },
    methods: {
      openProfileEdit(student){
        this.addoredit=1
        Object.keys(student).map((key)=>{
          this.student[key]=student[key]
        })
        this.manual=1
        this.dialog=true
        
      },
      openPassEdit(student){
        this.manual = 2
        this.dialog = true
        this._id = student._id
      },
      updateProfile(student){
        if (this.addoredit) {
          //更新账户信息
          lg('adfas')
        }else{
          //创建新账户
          
          lg(this.student)
        }
      },
      updatePassword(student){

      },
      deleteStudent(student){

      },
      updateReply(student){
        
      },
      addAccount(){
        Object.keys(this.student).map((key)=>{
          this.student[key]=''
        })
        this.addoredit=0
        this.manual = 1
        this.dialog = true
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

<style lang="sass" rel="stylesheet/scss" scoped>
th{
  padding: 8px;
}
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
    .upload:hover{
    		background-color: #dadada;
    	}
    caption
    {
        padding: 8px 0;
    }
}

.gender-radio,.actions{
  text-align: center;
  .mu-radio{
    margin-right: 20px;
  }
}
.addtional-contact{
  vertical-align: middle;
  .mu-text-field{
    width: 200px;
  }

  img{
    padding: 0 16px;
  }
}
.title-class {
    color: #ffffff;
    background-color: #4DB6AC;
    padding: 20px 21px 20px;
    margin-bottom: 16px;
}
</style>