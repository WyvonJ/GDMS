<template>
	<div class="teacher-upload sub-padding">
		<md-tabs md-fixed
  					 md-centerd
  					 class="md-transparent">
  		<md-tab id="teacher-account-upload" 
  						md-label="帐号上传"
  						md-icon="file_upload">
   			<mu-card>
 					<mu-card-title title="上传教师帐号表"
 										 		 subTitle="格式为 工号 姓名"/>
 					<mu-card-text>
 			 			<span>教师初始帐号和密码将都被设置为教师工号</span>
 					</mu-card-text>
 					<mu-card-actions>
  					 <mu-raised-button class="admin-raised-button" 
															 label="选择文件"
															 secondary>
   					 <input type="file" class="file-button"
    									        	accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
  					</mu-raised-button>
  				</mu-card-actions>
				</mu-card>
  		</md-tab>
 		 	<md-tab id="teacher-account-admin" 
 		 					md-label="帐号管理"
 		 					md-icon="perm_contact_calendar">
    		<mu-card>
 					<mu-card-title title="管理教师帐号"
 										 		 subTitle="忘记密码后咨询管理员修改"/>
 					
				</mu-card>
  		</md-tab>
  		<md-tab id="teacher-topic-admin" 
 		 					md-label="选题管理"
 		 					md-icon="subject">
    		<mu-card>
 					<mu-card-title title="教师选题管理"
 										 		 subTitle="..."/>
 					<mu-card-actions>
  					 <mu-raised-button class="admin-raised-button" 
															 label="查看教师题目"
															 secondary>
  					</mu-raised-button>
  				</mu-card-actions>
				</mu-card>
  		</md-tab>
		</md-tabs>
	</div>
</template>

<script type="text/javascript">
//导入full build 以后更改需求
import {mapState,mapActions} from 'vuex'
	export default {
		data(){
			return{
				}
		},
		methods:{

		},
		mounted(){
		},
		created(){
			//this.getTopics()
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.admin-raised-button-container{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.admin-raised-button {
  margin: 12px;
}
</style>