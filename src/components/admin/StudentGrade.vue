<template>
  <div class="student-grade">
    <section class="paper workflow">
      <div class="workflow-title">
        <span>成绩管理</span>
      </div>
      <div class="workflow-panel">
        <button class="red" @click="dialog=true;gradeType=0">
          <span>中期成绩上传</span>
        </button>
        <button class="blue" @click="dialog=true;gradeType=1">
          <span>终期成绩上传</span>
        </button>
        <a href="" class="export-grade">
          <img src="../../assets/icon/export.svg" alt="export" />

          <span>导出最终分数表</span>
        </a>
      </div>
      <mu-dialog class="form-dialog" :open="dialog" title="文件上传" @close="dialog = false">
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
        
    </section>
    <article>
        	<h3>上传格式说明</h3>
        	<p>
        		
        	</p>
        </article>
  </div>
</template>


<script type="text/javascript">
import axios from 'axios'
export default {
	data(){
		return {
			progressBar: 0,
			dialog: false,
			chosenFile: '选择文件',
			gradeType: 0
		}
	},
  methods: {
  	fileInput(){
  		let routes='/admin/admGradeUpload'
      let type = this.gradeType?'final':'middle'
  		let file=document.getElementById('file').files[0]
  		if (file) {
  			this.chosenFile=file.name
      let output = document.getElementById('output')
      let data = new FormData()
      data.append(type, document.getElementById('file').files[0])
      let config = {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }
      axios.post(routes, data, config)
        .then((res)=> {
          output.className = 'container'
          output.innerHTML = '成功上传文件'
          this.progressBar = 100
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
  }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.student-grade{
	display: flex;
	section{
		display: inline-block;
		height: 128px;
		margin: 8px;
		div[class$="title"]{

		height: 40px;
		background-color: #f7f7f7;
		display: flex;
		padding: 8px;
		span{
			font-weight: 400;
			font-size: 20px;
		}
		}
		div[class$="panel"]{
		padding: 16px;
		display: flex;
		align-items:center;
		justify-content:center;
		button{
			margin: 8px;
		}
    .export-grade{
    width: 144px;
    height: 40px;
    padding: 8px;
    border-radius: 4px;
    display: inline-block;
    background-color: #4caf50;
    color: white!important;
    }
		}
	}
}

</style>