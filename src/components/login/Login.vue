<template>
	<div class="login-panel">
		<header class="header">
			<img src="../../assets/img/logo.png" class="smlogo" alt="SCHOOL OF DIGITAL MEDIA">
			<h1 class="headline">毕业设计选题管理系统</h1>
		</header>
		<section class="container">
			<mu-avatar id="school-icon" icon="school" color="#f8f8f8" background-color="#7e848c" :size="60" :iconSize="44"></mu-avatar>
			<div @keyup.enter="doLogin">
				<mu-text-field label="帐号" 
											 hintText="请输入帐号" 
											 :errorText="accountError"
											 v-model.trim="account" 
											 labelFloat/><br/>
				<mu-text-field label="密码" 
											 hintText="请输入密码"
											 type="password"
											 :errorText="passwordError"
											 v-model.trim="password"
											 labelFloat/><br/>
				<mu-raised-button label="登 录" 
													class="login-button"
													v-on:click="doLogin" 
													primary/>
			</div>
			<span class="pw-forget" 
											@click="open">忘记密码？</span>
		</section>
		<mu-popup position="bottom"
							popupClass="demo-popup-bottom" 
							:open="bottomPopup" 
							@close="close('bottom')">
    <mu-appbar title="密码提示">
      <mu-flat-button slot="right" 
      								label="关闭" 
      								color="white" 
      								@click="close('bottom')"/>
    	</mu-appbar>
    <mu-content-block>
      <p>
        学生初始密码都为学号，如果修改密码后忘记密码请咨询管理员修改密码。
      </p>
    </mu-content-block>
  </mu-popup>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
      return {
        bottomPopup: false,
        account: '',
        password: '',
        accountError: '',
        passwordError: ''
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      open() {
        this.bottomPopup = true
      },
      close() {
        this.bottomPopup = false
      },
      //登录方法
      doLogin() {
        //this指export出的本对象？data函数return的对象
        if (!this.account.length) return this.accountError = '请输入帐号！'
        if (!this.password.length) return this.passwordError = '请输入密码！'
          //路由跳转
        this.login({ account: this.account, password: this.password })
        .then((state) => {
          if (state) {
            switch (state) {
              case 0:
                {
                  return this.accountError = '找不到帐号'
                  break
                }
              case 2:
                {
                  return this.passwordError = '密码错误'
                  break
                }
              case 3:
                {
                  return this.accountError = '未知错误'
                  break
                }
            }
          }
         
        }).catch(error => {
          return Promise.reject(error)
        })
        .then(()=>{
           //设置cookie有效时间为半小时
          const date = new Date(Date.now() + 60000 * 30)
            //设置cookie
          this.$root.setCookie('user', this.account, date, '/', location.hostname)

            this.$router.push({ path: '/entryinformation' })
        })
      },
      //清除错误信息
      clearError() {
        this.accountError = ''
        this.passwordError = ''
      },
      ...mapActions(['login'])
    },
    watch: {
      //如果输入了帐号密码就清除错误信息
      account: 'clearError',
      password: 'clearError'
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import "../../style/variables";
.login-panel
{
    width: 100%;
    margin-top: 7%;
    .headline
    {
        font-size: 40px;
        font-weight: lighter;
        line-height: 40px;

        margin: 14px 0;

        color: rgba(0,0,0,.7);
    }
    section.container
    {
      position: relative;
        width: 260px;
        height: 320px;
        margin: 0 auto;
        padding: 20px 0 20px 0;

        -webkit-border-radius: 3px;
           -moz-border-radius: 3px;
                border-radius: 3px;
        background-color: #fdfdfd;
        -webkit-box-shadow: $material-shadow-1dp;
           -moz-box-shadow: $material-shadow-1dp;
                box-shadow: $material-shadow-1dp;
        &:hover{
          -webkit-box-shadow: $material-shadow-6dp;
           -moz-box-shadow: $material-shadow-6dp;
                box-shadow: $material-shadow-6dp;
        }
        .mu-text-field
        {
            font-size: 14px;

            width: 200px;
            margin-bottom: 0;
            .mu-text-field-content
            {
                padding: 28px 0 6px 0;
                .mu-text-field-label{
                  color: #5c5d5f !important;
            }
            .mu-text-field-hint{
              color: #000;
            }
            }

        }

        .login-button
        {
            font-size: 12px;

            width: 160px;
            height: 28px;
            margin: 20px 0 8px 0;

            word-spacing: 10px;
        }
        .pw-forget{
          position: absolute;
          right: 10px;
          bottom: 10px;
          cursor: pointer;
          &:hover{
            color: #e53935;
          }
        }
    }
}
.mu-appbar{
  height: 48px;
}
.mu-content-block
{
    font-size: 16px;
}

@media all and (max-width: 800px)
{
    .headline
    {
        font-size: 36px;
    }
}
@media all and (max-width: 720px)
{
    .headline
    {
        font-size: 28px;
    }
}
@media handheld and (max-width: 640px)
{
    .headline
    {
        font-size: 24px;
    }
}
</style>