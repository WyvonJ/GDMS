<template>
  <div class="teacher-account-container">
    <div class="paper">
      <div class="table-admin">
        <mu-raised-button class="upload" secondary icon="file_upload" label="帐号上传" @click="dialog=true;manual=0;dialogTitle=''" />
        <mu-raised-button label="创建新帐号" primary icon="add" @click="createAccount();dialogTitle='创建新帐号'" />
      </div>
      <table>
        <caption>导师信息表</caption>
        <thead>
          <tr>
            <th>帐号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>手机号码</th>
            <th>邮箱</th>
            <th>办公室</th>
            <th>职称</th>
            <th>微信</th>
            <th>QQ</th>
            <th>帐号编辑</th>
            <th>密码修改</th>
            <th>删除帐号</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row-border" v-for="(teacher,index) in teacherAccounts">
            <td>{{teacher._id}}</td>
            <td>{{teacher.name}}</td>
            <td>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path v-if="teacher.gender==='男'" d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z" fill="#00bcd4" />
                <path v-else d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" fill="#f44336" />
              </svg>
            </td>
            <td>{{teacher.tel||'无'}}</td>
            <td>{{teacher.email||'无'}}</td>
            <td>{{teacher.office||'无'}}</td>
            <td>{{proTitle(teacher.protitle)||'无'}}</td>
            <td>{{teacher.wechat||'无'}}</td>
            <td>{{teacher.qq||'无'}}</td>
            <td>
              <mu-icon-button icon="edit" style="color: #009688;" @click="openDialog(1,teacher)" />
            </td>
            <td>
              <mu-icon-button icon="lock" style="color: #00bcd4;" @click="openDialog(2,teacher)" />
            </td>
            <td>
              <mu-icon-button icon="delete_forever" style="color: #f44336;" @click="openDialog(3,teacher)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <mu-dialog :style="dialogClass" :open="dialog" :title="dialogTitle" @close="dialog=false" titleClass="title-class">
      <div v-if="manual===0">
        <form enctype="multipart/form-data" role="form" class="form" onsubmit="return false">
          <div class="form-group">
            <div class="upload-icons">
              <mu-icon value="cloud_upload" :size="48" color="green" />
              <p>{{chosenFile}}</p>
            </div>
            <input id="file" @change="fileInput" type="file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </div>
        </form>
        <progress :value="progressBar" max="100"></progress>
        <div id="output">
        </div>
        <mu-flat-button slot="actions" label="取消" primary @click="dialog=false" />
      </div>
      <div v-if="manual===1">
        <mu-text-field hintText="帐号" :errorText="idError" :maxLength="10" v-model="teacher._id" type="number" icon="account_circle" />
        <mu-text-field hintText="姓名" :errorText="nameError" v-model="teacher.name" type="text" icon="person" />
        <br/>
        <mu-text-field v-if="!addoredit" hintText="密码" :errorText="passwordError" v-model="teacher.password" type="text" icon="lock" />
        <br/>
        <div class="gender-radio">
            <mu-radio label="男" name="group" uncheckIcon="mood" checkedIcon="mood" nativeValue="男" v-model="teacher.gender" class="demo-radio" />
            <mu-radio label="女" name="group" uncheckIcon="face" checkedIcon="face" nativeValue="女" v-model="teacher.gender" class="demo-radio" />
          </div>
        <div v-if="addoredit">
          
          <mu-text-field hintText="手机号" v-model="teacher.tel" type="number" icon="phone" />
          <mu-text-field hintText="邮箱" v-model="teacher.email" type="text" icon="mail" />
          <div class="pro-title">
            <mu-radio label="助教" name="proTitle" nativeValue="0" v-model="teacher.protitle" class="pro-title-radio" />
            <mu-radio label="讲师" name="proTitle" nativeValue="1" v-model="teacher.protitle" class="pro-title-radio" />
            <br>
            <mu-radio label="副教授" name="proTitle" nativeValue="2" v-model="teacher.protitle" class="pro-title-radio" />
            <mu-radio label="教授" name="proTitle" nativeValue="3" v-model="teacher.protitle" class="pro-title-radio" />
          </div>
          <mu-text-field hintText="办公室" v-model="teacher.office" type="text" icon="desktop_mac" />
          <div class="addtional-contact">
            <img src="../../assets/icon/qq.svg" />
            <mu-text-field hintText="QQ" v-model="teacher.qq" />
            <br/>
            <img src="../../assets/icon/wechat.svg" />
            <mu-text-field hintText="Wechat" v-model="teacher.wechat" />
          </div>
        </div>
        <div class="actions">
          <mu-raised-button slot="actions" color="white" backgroundColor="blue" :label="addoredit?'更新账户信息':'确认创建'" @click="confAccount" />
          <mu-flat-button slot="actions" secondary label="取消" @click="dialog=false" />
        </div>
      </div>
      <div v-if="manual===2">
        <mu-text-field hintText="新密码" v-model="password" type="text" icon="lock" />
        <div class="actions">
          <mu-raised-button slot="actions" color="white" backgroundColor="blue" label="确认修改密码" @click="updatePassword" />
          <mu-flat-button slot="actions" secondary label="取消" @click="dialog=false" />
        </div>
      </div>
      <div v-if="manual===3">
        <div class="actions">
          <mu-raised-button slot="actions" color="white" backgroundColor="blue" label="确认删除该帐号？" @click="deleteAccount" />
          <mu-flat-button slot="actions" secondary label="取消" @click="dialog=false" />
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
        dialogTitle:'帐号管理',
        progressBar: 0,
        manual: 0,
        addoredit: 0,
        teacherId: '',
        idError:'',
        nameError:'',
        passwordError:'',
        dialogClass:{
          width: '640px!important'
        },
        teacher: {
          _id:'',
          tel: '',
          name: '',
          gender: '',
          email: '',
          office: '',
          protitle: '',
          qq: '',
          wechat: '',
          password:''
        },
        password: '',
        teacherAccounts: [{
          _id: '2030513430',
          name: '吴吉',
          gender: '男',
          tel: '18861823231',
          office: 'asfd',
          email: 'wyvonj@gmail.com',
          protitle: '3',
          wechat: 'dale71717',
          qq: '552084208'
        }, {
          _id: '2030513131',
          name: '吉吴',
          gender: '女',
          tel: '18844512231',
          office: 'asfd',
          email: 'jiwuwu@gmail.com',
          protitle: '0',
          wechat: 'nshishabi',
          qq: '74747474'
        }]
      }
    },
    computed: {

    },
    methods: {
      proTitle(title) {
        let pt
        title = _.parseInt(title)
        switch (title) {
          case 0:
            pt = '助教'
            break
          case 1:
            pt = '讲师'
            break
          case 2:
            pt = '副教授'
            break
          case 3:
            pt = '教授'
            break
        }
        return pt
      },
      openDialog(manual, teacher) {
        this.manual = manual
        switch (manual) {
          case 1:
            {
              this.dialogTitle='帐号编辑'
              this.addoredit = 1
              Object.keys(teacher).map((key) => {
                this.teacher[key] = teacher[key]
              })
              break
            }
          case 2:
            {
              this.dialogTitle='密码修改'
              this.teacher._id = teacher._id
              break
            }
          case 3:
            {
              this.dialogTitle='帐号删除'
              this.teacherId = teacher._id
              break
            }

        }
        this.dialog = true
      },
      confAccount() {
        let account = this.teacher._id,
          password = this.teacher.password,
          name = this.teacher.name,
          gender = this.teacher.gender
        let tchAccount={
          account:account,
          password:password,
          name:name,
          gender:gender
        }
        if (account.length==0) 
          return this.idError='请填写用户账户！'
        
        if (name.length==0) 
          return this.nameError='请填写用户姓名！'

        if (this.addoredit==1) {
          //更新账户信息
          this.POST('/admin/updateTchAccount',{teacher:this.teacher})
            .then(res=>{
              if (res.data.state===1) {
                alert('更新账户信息成功')
                this.loadTable()
                this.dialog=false
              }else{
                alert('更新失败')
              }
            })
        } else {
          //创建新账户
          if (password.length==0) 
            return this.passwordError='请填写用户密码！'
          this.POST('/admin/createTchAccount',{
              account:account,
              password:password,
              name:name,
              gender:gender
          })
            .then(res=>{
              if (res.data.state===1) {
                
                this.loadTable()
                this.dialog=false
                alert('成功创建新用户')
              }
            })
        }
      },
      updatePassword() {
        this.POST('/admin/updateTchPassword',{
          account:this.teacher._id,
          password:this.password
        })
        .then(res=>{
          if (res.data.state===1) {
            
                this.dialog=false
                this.loadTable()
                alert('修改密码成功')
          }else{
            alert('暂时无法修改该用户')
          }
        })
      },
      deleteAccount(teacher) {
        this.POST('/admin/deleteTchAccount',{account:this.teacherId})
          .then(res=>{
            if (res.data.state===1) {
              this.loadTable()
              this.dialog=false
              alert('帐号已删除')
            }else{
              alert('删除出错，请重试')
            }
          })
      },
      createAccount() {
        Object.keys(this.teacher).map((key) => {
          this.teacher[key] = ''
        })
        this.teacher.gender='男'
        this.addoredit = 0
        this.manual = 1
        this.dialog = true
      },
      fileInput() {
        let routes = '/admin/admStuAccUpload'
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
                  .catch(err => {
                    console.log(err)
                  })
              } else {
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
      },
      loadTable(){
        this.GET('/admin/admGetTchAccount')
        .then(res => {
          if (res.data.state===1) {
            this.teacherAccounts=res.data.teachers
          }else{
            alert('获取导师帐号失败')
          }
        })
      }
    },
    mounted() {
      this.loadTable()
    },
    watch:{
      teacher:{
        handler:function(oldVal,newVal){
          this.idError=''
          this.passwordError='',
          this.nameError=''
        },
        deep:true
      }
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>

.teacher-account-container
{
    th
    {
        padding: 8px;
        text-align: center;
    }
    td{
      text-align: center;
      padding: 0;
    }
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
    .upload:hover
    {
        background-color: #dadada;
    }
    caption
    {
        padding: 8px 0;
    }
}


.gender-radio,
.actions
{
    text-align: center;
    .mu-radio
    {
        margin-right: 20px;
    }
}
.addtional-contact
{
    vertical-align: middle;
    .mu-text-field
    {
        width: 200px;
    }
    img
    {
        padding: 0 16px;
    }
}
.title-class
{
    margin-bottom: 16px;
    padding: 20px 21px 20px;

    color: #fff;
    background-color: #4db6ac;
}
.pro-title{
  text-align: center;
  .mu-radio{
  width: 110px;

  }

}
</style>