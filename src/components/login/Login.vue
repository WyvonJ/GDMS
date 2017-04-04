<template>
  <div class="login-panel" @keyup.enter="doLogin">
  
    <div class="openup" :class="{'opened':showLoginPanel}">
    <canvas id="canvas"></canvas>
      <header class="header">
        <mu-icon id="school-icon" color="#fff" :size="90" value="school" />
        <h1 class="headline">毕业设计选题管理系统</h1>
      </header>

      <div class="open-button" :class="{'opened':showLoginPanel}">
        <mu-circular-progress :size="70" color="red" v-if="loading"/>
        <div class="login-outer" @click="openLogin" v-if="!openLoginToggle">
          Login
        </div>
        <section class="container" v-if="showLoginPanel">
          <div class="login-inner">
            Login
          </div>
          <div>
            <mu-text-field label="帐号" hintText="请输入帐号" :errorText="accountError" v-model.trim="account" :underlineFocusClass="underlineClass" labelFloat/>
            <br/>
            <mu-text-field label="密码" hintText="请输入密码" type="password" :underlineFocusClass="underlineClass" :errorText="passwordError" v-model.trim="password" labelFloat/>
            <mu-raised-button label="登 录" class="login-button" v-on:click="doLogin" />
          </div>
          <span class="pw-forget" @click="passwordForget">忘记密码？</span>
          <p class="pw-forget-content" v-show="showPasswordForget">学生初始密码都为学号，<br/>如果修改密码后忘记密码，<br/>请咨询管理员修改密码。</p>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
      return {

        showLoginPanel:false,
        openLoginToggle:false,
        showPasswordForget:false,
        account: '',
        password: '',
        accountError: '',
        passwordError: '',
        underlineClass:{'background-color':'#03a9f4'}
      }
    },
    computed: {
      ...mapState(['userInfo','loading'])
    },
    methods: {
      openLogin(){
        this.openLoginToggle=true
        this.showLoginPanel=true
              },
      //登录方法
      doLogin() {
        
        
        if (!this.account.length) return this.accountError = '请输入帐号！'
        if (!this.password.length) return this.passwordError = '请输入密码！'

        this.showLoginPanel=false
        this.beginLoading()
          //路由跳转
        setTimeout(()=>{
          this.login({ account: this.account, password: this.password })
        .then(()=>{
           //设置cookie有效时间为半小时
          this.stopLoading()
          const date = new Date(Date.now() + 60000 * 30)
            //设置cookie
          this.$root.setCookie('user', this.account, date, '/', location.hostname)
          if (this.userInfo.userType===0) {
            this.$router.push({ path: '/student' })
          }else if(this.userInfo.userType===1){
              this.$router.push({ path: '/teacher' })
          }else if(this.userInfo.userType===2){
              this.$router.push({ path: '/admin' })
          }
        })
        .catch((error)=>{
          this.showLoginPanel=true
           this.stopLoading()
           switch(error){
            case 0: {
              this.accountError='找不到该账户'
            break
          }
            case 2:{
             this.passwordError='密码错误'
            break
          }
            case 3: 
            default: this.accountError='未知错误，请重试'
           }
        })
      },700)
      },
      //清除错误信息
      clearError() {
        this.accountError = ''
        this.passwordError = ''
      },
      passwordForget(){
        this.showPasswordForget=!this.showPasswordForget
      },
      ...mapActions(['login','beginLoading','stopLoading'])
    },
    watch: {
      //如果输入了帐号密码就清除错误信息
      account: 'clearError',
      password: 'clearError'
    },
    mounted(){
      //定义画布宽高和生成点的个数
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 35

    var canvas = document.getElementById('canvas')
    canvas.width = WIDTH
    canvas.height = HEIGHT/2
    var context = canvas.getContext('2d')
    context.strokeStyle = 'rgba(1,1,1,0.01)'
    context.strokeWidth = 1
    context.fillStyle = 'rgba(1,1,1,0.01)'
    var circleArr = []

    //线条：开始xy坐标，结束xy坐标，线条透明度
    function Line (x, y, _x, _y, o) {
      this.beginX = x
      this.beginY = y
      this.closeX = _x
      this.closeY = _y
      this.o = o
    }
    //点：圆心xy坐标，半径，每帧移动xy的距离
    function Circle (x, y, r, moveX, moveY) {
      this.x = x
      this.y = y
      this.r = r
      this.moveX = moveX
      this.moveY = moveY
    }
    //生成max和min之间的随机数
    function num (max, _min) {
      var min = arguments[1] || 0
      return Math.floor(Math.random()*(max-min+1)+min)
    }
    // 绘制原点
    function drawCricle (cxt, x, y, r, moveX, moveY) {
      var circle = new Circle(x, y, r, moveX, moveY)
      cxt.beginPath()
      cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
      cxt.closePath()
      cxt.fill()
      return circle
    }
    //绘制线条
    function drawLine (cxt, x, y, _x, _y, o) {
      var line = new Line(x, y, _x, _y, o)
      cxt.beginPath()
      cxt.strokeStyle = 'rgba(1,1,1,'+ o +')'
      cxt.moveTo(line.beginX, line.beginY)
      cxt.lineTo(line.closeX, line.closeY)
      cxt.closePath()
      cxt.stroke()

    }
    //初始化生成原点
    function init () {
      circleArr = []
      for (var i = 0; i < POINT; i++) {
        circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40))
      }
      draw()
    }

    //每帧绘制
    function draw () {
      context.clearRect(0,0,canvas.width, canvas.height);
      for (var i = 0; i < POINT; i++) {
        drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
      }
      for (var i = 0; i < POINT; i++) {
        for (var j = 0; j < POINT; j++) {
          if (i + j < POINT) {
            var A = Math.abs(circleArr[i+j].x - circleArr[i].x)
            var B = Math.abs(circleArr[i+j].y - circleArr[i].y)
            var lineLength = Math.sqrt(A*A + B*B)
            var C = 1/lineLength*7-0.009
            var lineOpacity = C > 0.03 ? 0.03 : C
            if (lineOpacity > 0) {
              drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity)
            }
          }
        }
      }
    }

    //调用执行
    window.onload = function () {
      init()
      setInterval(function () {
        for (var i = 0; i < POINT; i++) {
          var cir = circleArr[i]
          cir.x += cir.moveX
          cir.y += cir.moveY
          if (cir.x > WIDTH) cir.x = 0
          else if (cir.x < 0) cir.x = WIDTH
          if (cir.y > HEIGHT) cir.y = 0
          else if (cir.y < 0) cir.y = HEIGHT

        }
        draw()
      }, 16)
    }

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
        background-color: #3f51b5;
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
       /* animation: typing 2s steps(10,end),
        blink-caret.5s step-end 10 alternate;
        border-right: .1em solid;*/
        white-space: nowrap;

        color: #fff;
        
    }
        .login-outer{
          cursor: pointer;

          color: #a7a7a7;
        font-size: 30px;
        margin-top:34px;
      }
       .login-inner{
          color: #b7b7b7;
        font-size: 24px;
        margin-top:34px;
      }
      .mu-circular-progress
      {
        margin-top: 10px;
      }
    section.container
    {

        position: relative;
        .mu-text-field
        {
            font-size: 14px;

            width: 200px;
            margin-bottom: 0;
            .mu-text-field-label{
              color: #717171 !important;
            }
            
        }
        .login-button
        {
            font-size: 16px;
            position: absolute;
            bottom: 16px;
            left: 48px;
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
        .pw-forget-content{
          position: absolute;
            right: -142px;
            bottom: 32px;
            font-size: 11px;
        }
    }
}
</style>