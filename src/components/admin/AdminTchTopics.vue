<template>
  <div class="teacher-topics">
  	<header class="teacher-topics-admin">
  	
    <a class="export-table" href="/admin/download?filename=SelectedResult">
          <img src="../../assets/icon/export.svg">
          <span>导出导师题目表</span>
    </a>
    <div class="order-admin">
       <button @click="teacherFirst" class="order-button">
          <span>导师一轮选题</span>
      </button>
       <button @click="teacherSecond" class="order-button">
          <span>导师二轮选题</span>
      </button>
      <button @click="teacherThird" class="order-button">
          <span>导师三轮选题</span>
      </button>
      <button @click="teacherFinal" class="order-button">
          <span>导师最终选题</span>
      </button>
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
      teacherFirst(){
        this.GET('/admin/unhandledTch')
        this.GET('/admin/unhandledStu')

        if (true) {
          this.message = '还有学生未登录选题，是否继续？'
          this.dialog = true
        }
        this.POST('/admin/procSelection',{
          order:1
        })
      },
      teacherSecond(){
        this.POST('/admin/procSelection',{
          order:2
        })
      },
      teacherThird(){
        this.POST('/admin/procSelection',{
          order:3
        })
      },
      teacherFinal(){
        this.POST('/admin/procSelection',{
          order:4   //只能选择一个题目 设置为 直接存入数据库
        })
      },
    },
		mounted(){
      this.GET('/admin/admGetTchTopics')
        .then(res => {
          this.teacherTopics = res.data
        })
		}
  }
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables';
.export-table{
    width: 144px;
    height: 40px;
    padding: 8px;
    border-radius: 4px;
    display: inline-block;
    background-color: #4caf50;
    color: white!important;
}
.order-admin{
display: flex;
margin-top: 16px;
button
{
  flex: 1;
  background-color: transparent;
  border-radius: 0;
  border: 1px #999 solid;
  color: #455739;
  &:hover{
    background-color: #dedede;
  }
}
.order-button:first-child{
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-color: transparent;
}
.order-button:last-child{
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-color: transparent;
}
.order-button:nth-child(2){
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
    &:hover
    {
        -webkit-box-shadow: 0 0 9px 4px #dadada;
           -moz-box-shadow: 0 0 9px 4px #dadada;
                box-shadow: 0 0 9px 4px #dadada;
    }
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

        border-left: 2px solid #d8f9df;
        border-radius: 5px;
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