<template>
  <div class="procedure">
    <section class="paper workflow">
      <div class="workflow-title">
        <span>成绩管理</span>
      </div>
      <div class="workflow-panel">
        <button class="red" @click="midUpload">
          <span>中期成绩上传</span>
        </button>
        <button class="blue">
          <span>终期成绩上传</span>
        </button>
      </div>
       <form enctype="multipart/form-data" role="form" class="form" onsubmit="return false">
      <div class="form-group">
        <label for="file">File</label>
        <input id="file" type="file" class="form-control"/>
      </div>
      <button @click="midUpload" type="button" class="red">Upload</button>
    </form>
    <progress :value="progressBar" max="100"></progress>
      <div id="output">
      	
      </div>
    </section>
  </div>
</template>


<script type="text/javascript">
import axios from 'axios'
export default {
	data(){
		return {
			progressBar:0
		}
	},
  methods: {
    midUpload() {
      let output = document.getElementById('output')
      let data = new FormData()
      console.log( document.getElementById('file').files[0])
      data.append('file', document.getElementById('file').files[0])
      let config = {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.progressBar=progressEvent.loaded
        }
      }
      axios.post('/admin/admMidGradeUpload', data, config)
        .then((res)=> {
          output.className = 'container'
          output.innerHTML = res.data
        })
        .catch((err)=> {
          output.className = 'container text-danger'
          output.innerHTML = err.message
          console.log(err)
        })
    }
  }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.procedure{
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
		}
	}
}
</style>