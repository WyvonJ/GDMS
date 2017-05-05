<template>
	<div class="reset-system">
	<div>
		<img src="../../assets/icon/warn.svg" /><br/>
		<p v-if="!reseted">
			重置系统将会将所有数据库清空，并将管理员帐号重置为初始帐号。<br/>

			请谨慎操作
		</p>
		<p v-if="reseted">
			系统已重置，请重新上传导师和学生帐号。
		</p>
		<button class="red" @click="dialog=!dialog">重置系统</button>
	</div>
     <mu-dialog :open="dialog" title="Attention!" @close="dialog=false">
    操作不可逆，请再次确认操作
    <button slot="actions" @click="dialog=false" class="blue">取消</button>
    <button slot="actions" @click="resetSystem" class="red">确定</button>
  </mu-dialog>
		
	</div>
</template>

<script>
import {get} from 'axios'
export default{
	data(){
		return {
			dialog:false,
			reseted:false
		}
	},
	methods:{
		resetSystem(){
			this.GET('/admin/admResetSystem')
				.then(res=>{
					if (res.data.state===1) {
						this.reseted = true
						this.dialog = false
					}
						
				})
		}
	}
}
</script>

<style type="text/css" media="screen" scoped>
	.reset-system{
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	p{
		font-size: 26px;
		font-weight: 400;
		line-height: 36px;
		margin: 32px;
	}
	button{
		margin: 0 8px;
	}
</style>