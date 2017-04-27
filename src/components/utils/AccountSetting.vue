<template>
<div class="account-container">
<div>
  <div class="account-input">
    <mu-icon value="lock" :size="18" />
    <mu-text-field type="password" :errorText="originalError" hintText="请输入原密码" v-model.trim="original" />
  </div>
  <div class="account-input">
    <mu-icon value="lock_outline" :size="18" />
    <mu-text-field type="password" :errorText="passwordError" hintText="请输入新密码" v-model.trim="password" />
  </div>
  <div class="account-input">
    <mu-icon value="lock_outline" :size="18" />
    <mu-text-field type="password" hintText="请再输入一遍新密码" :errorText="repeatError" v-model.trim="passwordRepeat" />
  </div>
  <button class="blue" @click="commitPassword" >
    <img src="../../assets/icon/check.svg" alt="Y" />
    <span>确认更改</span>
  </button>
</div>
</div>
</template>


<script>
import {mapActions} from 'vuex'
import WyvonjCanvas from '../utils/WyvonjCanvas.vue'
import {post} from 'axios'
	export default{
		data(){
			return{
				original:'',
				password:'',
				passwordRepeat:'',
				originalError:'',
        passwordError:'',
				repeatError:''
			}
		},
		methods:{
			commitPassword(){
        if (this.original.length<1) 
          return this.originalError='请输入原密码'
        if(this.password.length<8)
          return this.passwordError='密码长度不够'
				if (this.password!==this.passwordRepeat) {
					return this.repeatError='两次输入的密码不一样'
				}else if(this.password.exec(/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/)){
					post('/login/account',{
            oldPassword:this.original,
            newPassword:this.password
          })
          .then(res=>{
            console.log(res.data)
          })
				}else{
          return this.passwordError='密码包含非法字符'
        }
			},
      clearError() {
        this.originalError = ''
        this.repeatError = ''
        this.passwordError = ''
      }
		},
		watch:{
			original:'clearError',
			passwordRepeat:'clearError',
      password: 'clearError'
		},
    components:{
      WyvonjCanvas
    }
	}
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.account-container
{
    display: flex;

    align-items: flex-start;
    justify-content: center;
    >div{
      margin-top: 128px;
    }
    .account-input
    {
        width: 332px;
        height: 64px;
        margin-bottom: 12px;
        padding: 8px 12px;

        cursor: text;
        white-space: nowrap;

        border: 1px #acacac solid;
        border-radius: 2px;
        .mu-icon
        {
            position: relative;
            top: 6px;
            left: 2px;
        }
        .mu-text-field
        {
            margin-left: 12px;
        }
    }

    button.blue{
        margin-left: 90px;

    }
}

</style>