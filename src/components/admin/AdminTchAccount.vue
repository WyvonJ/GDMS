<template>
  <div class="teacher-account-container">
    <div class="paper">
      <div class="table-admin">
        <button class="upload" @click="dialog=true">
     <img src="../../assets/icon/upload_g.svg" alt="phone" />
      <span>帐号上传</span>
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
          <tr v-for="(teacher,index) in teacherAccounts">
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
          <input id="file" @change="fileInput" type="file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
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
import { mapState, mapActions } from 'vuex'
import { post } from 'axios'
export default {
  data() {
      return {
        dialog: false,
        chosenFile: '选择文件',
        progressBar: 0,
        message: '',
        teacherAccounts:[]
      }
    },
    methods: {
      deleteAccounts() {
        console.log(this)
      },
      fileInput() {
        let routes = '/admin/admTchAccUpload'
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
              if (res.data.state===1) {
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
    mounted() {
      this.GET('/admin/admGetTchAccount')
        .then(res => {
          this.teacherAccounts = res.data
        })
        .catch(err=>{
          console.log(err)
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.teacher-account-container
{
    table
    {
        font-size: 16px;

        border-spacing: 0;
        border-collapse: collapse;
    }
    caption
    {
        font-size: 20px;

        padding: 16px 0;
    }
    th
    {
        font-weight: lighter;

        padding: 8px 0;
    }
    th:first-child
    {
        padding-left: 24px;

        border-left: 4px #42b983 solid;
    }
    tr:nth-child(even)
    {
        background-color: #fafafa;
    }
    tr
    {
        transition: all .3s cubic-bezier(.2, .1, .6, 1);
        &:hover
        {
            background-color: #ececec;
        }
    }
    td
    {
        padding: 6px 0;

        white-space: nowrap;
        text-overflow: ellipsis;
    }
    td:first-child
    {
        padding-left: 16px;
    }
}

</style>