<template>
<div class="account-container">
<div>
  <div class="account-input">
    <mu-icon value="lock" :size="18" />
    <mu-text-field type="password" :errorText="originalError" hintText="请输入原密码" v-model.trim="original" />
  </div>
  <div class="account-input">
    <mu-icon value="lock_outline" :size="18" />
    <mu-text-field type="password" hintText="请输入新密码" v-model.trim="password" />
  </div>
  <div class="account-input">
    <mu-icon value="lock_outline" :size="18" />
    <mu-text-field type="password" hintText="请再输入一遍新密码" :errorText="repeatError" v-model.trim="passwordRepeat" />
  </div>
  <button class="red" @click="commitPassword" >
    <img src="../../assets/icon/check.svg" alt="Y" />
    <span>确认更改</span>
  </button>
</div>
</div>
</template>


<script>
import {mapActions} from 'vuex'
import WyvonjCanvas from '../utils/WyvonjCanvas.vue'

	export default{
		data(){
			return{
				original:'',
				password:'',
				passwordRepeat:'',
				originalError:'',
				repeatError:''
			}
		},
		methods:{
			commitPassword(){
				if (this.password!==this.passwordRepeat) {
					return this.repeatError='两次输入的密码不一样'
				}else{
					
				}
			},
      clearError() {
        this.originalError = ''
        this.repeatError = ''
      }
		},
		watch:{
			original:'clearError',
			passwordRepeat:'clearError'
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

    align-items: center;
    justify-content: center;
    .account-input
    {
        width: 332px;
        height: 64px;
        margin-bottom: 12px;
        padding: 8px 12px;

        cursor: text;
        white-space: nowrap;

        border: 1px #3f51b5 solid;
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
    .mu-raised-button
    {
        margin: 16px;

        color: #fff;
        background-color: #03a9f4;
    }
}

</style>