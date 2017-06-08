<template>
  <div class="student-grade">
    <section class="paper workflow">
      <div class="workflow-title">
        <span>成绩管理</span>
      </div>
      <div class="workflow-panel">
        <mu-flat-button @click="dialog=true;gradeType=0" label="中期成绩上传" />
        <mu-flat-button @click="dialog=true;gradeType=1" label="终期成绩上传" />
        <mu-flat-button href="/admin/download?filename=FinalGrade" icon="file_download" secondary label="导出学生成绩表" />
        <mu-flat-button href="/admin/download?filename=TeacherGrade" icon="file_download" secondary label="导出导师成绩表" />
      </div>
      <mu-dialog class="form-dialog" :open="dialog" title="文件上传" @close="dialog = false">
        <form enctype="multipart/form-data" role="form" class="form" onsubmit="return false">
          <div class="form-group">
           <div class="upload-icons">
              <mu-icon value="cloud_upload" :size="48" color="green" />
              <p>{{chosenFile}}</p>
            </div>
            <input id="file" @change="fileInput" type="file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </div>
        </form>
        <div id="output">
        </div>
        <mu-flat-button slot="actions" @click="dialog=false" secondary label="取消" />
      </mu-dialog>
    </section>
    <article>
      <h3>上传格式说明</h3>
      <p>
      </p>
    </article>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
      return {
        progressBar: 0,
        dialog: false,
        chosenFile: '选择文件',
        gradeType: 0
      }
    },
    methods: {
      fileInput() {
        let routes = '/admin/admGradeUpload'
        let type = this.gradeType ? 'final' : 'middle'
        let file = document.getElementById('file').files[0]
        if (file) {
          this.chosenFile = file.name
          let output = document.getElementById('output')
          let data = new FormData()
          data.append(type, document.getElementById('file').files[0])
          let config = {
            onUploadProgress: (progressEvent) => {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
          }
          axios.post(routes, data, config)
            .then((res) => {
              output.className = 'container'
              output.innerHTML = '成功上传文件'
              this.progressBar = 100
            })
            .catch((err) => {
              output.className = 'container text-danger'
              output.innerHTML = '上传文件失败，请重新试试'
              console.log(err)
            })
        } else {
          chosenFile = '选择文件'
        }
      }
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.student-grade
{
    display: flex;
    section
    {
        display: inline-block;

        height: 128px;
        margin: 8px;
        div[class$='title']
        {
            display: flex;

            height: 40px;
            padding: 8px;

            background-color: #f7f7f7;
            span
            {
                font-size: 20px;
                font-weight: 400;
            }
        }
        div[class$='panel']
        {
            display: flex;

            padding: 16px;

            align-items: center;
            justify-content: center;
            button
            {
                margin: 8px;
            }
            .export-grade
            {
                display: flex;

                width: 144px;
                height: 40px;
                padding: 8px;

                color: white;
                border-radius: 4px;
                background-color: #4caf50;
            }
        }
    }
}

</style>