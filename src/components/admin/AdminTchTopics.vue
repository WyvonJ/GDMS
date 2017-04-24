<template>
  <div class="teacher-topics">
  	<header class="teacher-topics-admin">
  	
    <button class="export-table green-vue">
          <img src="../../assets/icon/export.svg">
          <span>导出导师题目表</span>
    </button>
     <button class="red">
          <span>导师一轮选题</span>
    	</button>
    	 <button class="blue">
          <span>导师二轮选题</span>
    	</button>
  </header>
  <div class="columns">
  	<figure v-for="teacher of _adm_TchTopics" class="teacher-wrapper paper">
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
     				<div v-for="student of topic.finalstudents" class="single-student">
     				{{student._id}} - {{student.name}}
     			</div>
     			</div>
     		</div>
    	</figure>
  </div>
    	
  
  </div>
</template>

<script type="text/javascript">
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
    }
    },
    methods:{

    },
    computed: mapState(['_adm_TchTopics'])
  }
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables';
button{
	margin: 0 8px;
}
.teacher-topics-admin{
	padding: 8px 0 8px 16px;
}
.teacher-wrapper{
		margin: 8px;
		padding-bottom: 10px;
		transition: $material-enter;
	  display: inline-block;
	  column-break-inside: avoid;
	  &:hover{
	  	  -webkit-box-shadow: 0 0 5px 5px #dadada;
               -moz-box-shadow: 0 0 5px 5px #dadada;
                    box-shadow: 0 0 5px 5px #dadada;
	  }
	.teacher-name{
		font-size: 20px;
		padding: 8px 10px;
		position: relative;
		font-weight: normal;
    border-bottom: 1px dashed #4CAF50;
	}
	.topic-id-title{
		padding: 2px;
		font-size: 1.08em;
    border-left: 2px solid #d8f9df;
    border-radius: 5px;
	}
	.topic-students{
		padding: 8px 6px;
		.single-student{
			display: inline-block;
			padding: 2px 5px;
			margin: 4px;
		}
	}

}
.show-avatar::before{
	content: '';
	width: 16px;
	height: 16px;
	border: 2px #f44336 solid;
	border-radius: 8px;
	position: absolute;
	right: 10px;
}
</style>