<template>
  <div class="teacher-topics">
  	<header class="teacher-topics-admin">
    <mu-raised-button href="/admin/download?filename=SelectedResult" icon="file_download" secondary label="导出导师题目表"/>
    <!--<div class="order-admin">
       <button @click="beginSelection(1)" class="order-button">
          <span>导师一轮选题</span>
      </button>
       <button @click="beginSelection(2)" class="order-button">
          <span>导师二轮选题</span>
      </button>
      <button @click="beginSelection(3)" class="order-button">
          <span>导师三轮选题</span>
      </button>
      <button @click="beginSelection(4)" class="order-button">
          <span>导师最终选题</span>
      </button>
    </div>-->
    <div>
      <mu-raised-button @click="beginSelection(1)" primary label="导师一轮选题"/>
      <mu-raised-button @click="beginSelection(2)" primary label="导师二轮选题"/>
      <mu-raised-button @click="beginSelection(3)" primary label="导师三轮选题"/>
      <mu-raised-button @click="beginSelection(4)" primary label="导师最终选题"/>
    </div>
      
  </header>
  <div class="columns">
  	<figure v-for="teacher of teacherTopics" class="teacher-wrapper paper">
     		<figcaption class="teacher-name">
     			<span class="show-avatar">
     				{{teacher.name}}
     			</span> 
     		</figcaption>
     		<div v-for="topic of teacher.topics" class="topic-students">
     			<div class="topic-id-title">
     			<span class="topic-id">
     				{{topic._id}}
     			</span>
     				.{{topic.title}}
     			</div>
     			<div class="student-id-name">
     				<span v-for="student of topic.finalstudents" class="single-student chip">
     				{{student._id}} - {{student.name}}
     			</span>
     			</div>
     		</div>
    	</figure>
  </div>
    	<mu-dialog :open="dialog" title="注意！" @close="dialog=false">
    {{message}}
    <mu-flat-button slot="actions" @click="dialog=false;$router.push('/admin/procedure')" secondary label="取消"/>
    <mu-flat-button slot="actions" @click="dialog=false" label="确定"/>
  </mu-dialog>
  
  </div>
</template>

<script type="text/javascript">
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
      message:'',
      dialog:false,
      teacherTopics:[]
    }
    },
    methods:{
    	firstSelection(){
    		//判断是否有未完成教师
    		if (true) {
    			alert('xxx havent finish')
    			//是否继续操作？？？
    		}
    		//导师必须完成。
    	},
      exportTable(){
        this.GET('/admin/download?filename=tchtopics')
      },
      beginSelection(odr){
        this.GET('/admin/unhandledTch')
          .then(res=>{
            if (res.data.length>0) {
              this.message = '还有学生未登录选题，是否继续？'
              this.dialog = true
            }
          })
          .then(()=>{
            this.GET('/admin/unhandledStu')
            .then(res=>{
              if (res.data.length>0) {
                this.message = '还有学生未登录选题，是否继续？'
                this.dialog = true
              }
            })
          })
          .then(()=>{
            this.POST('/admin/procSelection',{
              order:odr
            })
            .then(res=>{
              if (res.data.state===1) {

                this.message = odr + '轮自动选题完成，可通知导师对其余学生进行选择。'
                this.dialog = true
              }
            })
          })
      }
    },
		mounted(){
      this.GET('/admin/admGetTchTopics')
        .then(res => {
          this.teacherTopics = res.data
        })
        .catch(err=>{
          console.log(err)
        })
		}
  }
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables';
.export-table
{
    display: inline-flex;

    width: 144px;
    height: 36px;
    padding: 8px;

    color: white!important;
    border-radius: 4px;
    background-color: #4caf50;
    &:hover
    {
        background-color: #61b164;
    }
}
.order-admin
{
    display: flex;

    max-width: 568px;
    margin-top: 16px;
    button
    {
        color: #455739;
        border: 1px #999 solid;
        border-radius: 0;
        background-color: transparent;

        flex: 1;
        &:hover
        {
            background-color: #dedede;
        }
    }
    .order-button:first-child
    {
        border-right-color: transparent;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .order-button:last-child
    {
        border-left-color: transparent;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .order-button:nth-child(2)
    {
        border-right-color: transparent;
    }
}

.teacher-topics-admin
{
    padding: 8px 0 8px 16px;
}
.teacher-wrapper
{
    display: inline-block;

    min-width: 128px;
    margin: 8px;
    padding-bottom: 10px;

    transition: $material-enter;

    column-break-inside: avoid;
    .teacher-name
    {
        font-size: 20px;
        font-weight: normal;

        position: relative;

        padding: 8px 10px;

        border-bottom: 1px dashed #4caf50;
    }
    .topic-id-title
    {
        font-size: 1.08em;

        padding: 2px;

        font-weight: normal;
    }
    .topic-students
    {
        padding: 8px 6px;
    }
}
.show-avatar::before
{
    position: absolute;
    right: 10px;

    width: 16px;
    height: 16px;

    content: '';

    border: 2px #f44336 solid;
    border-radius: 8px;
}


</style>