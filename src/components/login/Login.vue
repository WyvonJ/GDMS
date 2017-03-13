<template>
  <div class="login-panel" @keyup.enter="doLogin">
    <div class="openup" :class="{'opened':openLoginToggle}">
      <header class="header">
        <!--<img src="../../assets/img/logo.png" class="smlogo" alt="SCHOOL OF DIGITAL MEDIA">-->
        <mu-icon id="school-icon" color="#fff" :size="90" value="school" />
        <h1 class="headline">毕业设计选题管理系统</h1>
      </header>
      <div class="open-button" @click.once="openLogin" :class="{'opened':openLoginToggle}">
        <div class="login-title" v-if="!openLoginToggle">
          Login
        </div>
        <section class="container" v-else>
          <div class="login-title">
            Login
          </div>
          <div>
            <mu-text-field label="帐号" hintText="请输入帐号" :errorText="accountError" v-model.trim="account" :underlineFocusClass="underlineClass" labelFloat/>
            <br/>
            <mu-text-field label="密码" hintText="请输入密码" type="password" :underlineFocusClass="underlineClass" :errorText="passwordError" v-model.trim="password" labelFloat/>
            <mu-raised-button label="登 录" class="login-button" v-on:click="doLogin" />
          </div>
          <span class="pw-forget" @click="open">忘记密码？</span>
        </section>
      </div>
    </div>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
      <mu-appbar title="密码提示">
        <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')" />
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
        openLoginToggle:false,
        account: '',
        password: '',
        accountError: '',
        passwordError: '',
        underlineClass:{'background-color':'#03a9f4'}
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
      openLogin(){
        this.openLoginToggle=!this.openLoginToggle
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
          if (this.userInfo.userType!=2) {
            this.$router.push({ path: '/entryinformation' })
 }
            this.$router.push({ path: '/admin' })
         
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

@keyframes typing
{
    from
    {
        width: 0;
    }
}
@keyframes blink-caret
{
    50%
    {
        border-color: transparent;
    }
}

.login-panel
{
    position: relative;

    width: 100%;
    height: 100%;
    background-color: #efefef;
    .openup
    {
        position: absolute;
        z-index: 100;
        top: 0;
        left: -20%;

        width: 140%;
        height: 50%;

        border-bottom-right-radius: 50%;
        border-bottom-left-radius: 50%;
        background-color: #3e4eb8;
        transition: $material-enter;
        -webkit-box-shadow: $material-shadow-4dp;
           -moz-box-shadow: $material-shadow-4dp;
                box-shadow: $material-shadow-4dp;
        &.opened{
          border-radius: 0;
        }
        .open-button
        {
            position: fixed;
            top: calc(50% - 45px);
            left: calc(50% - 128px);

            width: 256px;
            height: 90px;

            transition: $material-enter;

            border-radius: 45px;
            background-color: #fff;
            -webkit-box-shadow: $material-shadow-4dp;
               -moz-box-shadow: $material-shadow-4dp;
                    box-shadow: $material-shadow-4dp;
            &.opened
            {
                height: 256px;
                top: calc(50% - 128px);

                border-radius: 4px;
            }
            &:hover
            {
                -webkit-box-shadow: $material-shadow-7dp;
                   -moz-box-shadow: $material-shadow-7dp;
                        box-shadow: $material-shadow-7dp;
            }
        }
    }
    header{
        position: absolute;
        width: 610px;
        top: calc(17% - 30px);
        left: calc(50% - 305px);
    }
    .headline
    {
        font-size: 60px;
        font-weight: lighter;
        line-height: 60px;

        overflow: hidden;

        width: 100%;
        margin: 0 auto;
        padding-right: 6px;

        transition: $swift-ease-out;
        animation: typing 5s steps(10,end),
        blink-caret.5s step-end infinite alternate;
        white-space: nowrap;

        color: #fff;
        border-right: .1em solid;
    }
        .login-title{
          color: #b7b7b7;
        font-size: 24px;
        margin-top:34px;
      }
    section.container
    {

        position: relative;
        .mu-text-field
        {
            font-size: 14px;

            width: 200px;
            margin-bottom: 0;
            .mu-text-field-content
            {
              padding: 24px 0 6px 0 !important;
              .mu-text-field-focus-line{
                background-color: #000 !important;
              }
                
                .mu-text-field-label
                {
                    color: #5c5d5f !important;
                }
                .mu-text-field-hint
                {
                    color: #000;
                }
            }
        }
        .login-button
        {
            font-size: 14px;
            position: absolute;
            bottom: 16px;
            left: 46px;
            width: 160px;
            height: 36px;
            background-color: #f44336;
            color: #fff;
            word-spacing: 16px;
            border-radius: 36px;
            transition: $material-enter;

            &:hover
            {
                -webkit-box-shadow: $material-shadow-7dp;
                   -moz-box-shadow: $material-shadow-7dp;
                        box-shadow: $material-shadow-7dp;
            }
        }
        .pw-forget
        {
            position: absolute;
            right: 96px;
            bottom: -20px;
            font-size: 11px;
            cursor: pointer;
            &:hover
            {
                color: #e53935;
            }
        }
    }
}
.mu-appbar{
  height: 48px;
}
.mu-content-block{
  font-size: 24px;
}
</style>