<template>
  <div class="student-intro">
  <div class="sub-padding">

  <mu-paper :class="{'active' : toggleIntro,'confirm-panel' : toggleComfirmation}">
    <span>GPA:4.0</span>
    <span style="float: right;">1030513430</span>
    <mu-divider/>
    <div class="intro-content">
      当使用需要特定前缀的会自动侦测并添加相应的前缀好了。侦测并添加相应的前缀好了。
    </div>
    <transition name="confirm-slide">
      <div class="confirm" v-if="toggleComfirmation">
      <mu-divider/>
      <div class="no-regret">确定要选择TA吗？<br/>选定后就不能更改了。</div>
      <mu-raised-button>确定</mu-raised-button>
      </div>
    </transition>
    
  </mu-paper>
     <md-button class="name-button md-fab" @click.native="toggle">
      派大星
    </md-button>
    <md-button class="check-button md-warn" :class="{'active' : toggleIntro}" @click.native="studentConfirmed">
   <md-icon>{{!toggleComfirmation ? 'check' : 'clear'}}</md-icon>
    </md-button>
</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      toggleIntro:false,
      toggleComfirmation:false
    }
    },
    methods:{
      toggle(){
        this.toggleIntro=!this.toggleIntro
        this.toggleComfirmation=false
      },
      studentConfirmed(){
        this.toggleComfirmation=!this.toggleComfirmation
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.student-intro
{
    position: relative;

    display: inline-block;

    margin-top: 300px;
    .mu-paper
    {
        position: absolute;
        bottom: 5px;
        left: 36px;

        transition: max-height .4s $material-enter-timing-function;

        overflow: hidden;

        max-height: 0;

        -webkit-user-select: none;

        opacity: 0;
        &.active
        {

            overflow: hidden;
            width: 256px;
            max-height: 200%;
            padding: 12px 12px 28px 12px;

            transition: $material-leave;

            opacity: 1;
        }
        &.confirm-panel{
            max-height: 300%;
            bottom: 5px;
            
            padding-bottom: 48px;

        }
        .intro-content
        {
            overflow: hidden;
        }
        .no-regret{
          text-align: center;
          padding: 8px 0;
        }
        .mu-raised-button{
          background-color: #1e88e5 !important;
          color: #fff;
          position: absolute;
          left: 30%;
        }

    }
    .name-button
    {
        z-index: 3;

        background-color: #f44336;
    }
    .check-button
    {
        line-height: 56px;

        position: absolute;
        z-index: 2;
        left: 0;

        overflow: hidden;

        width: 56px;
        min-width: 0;
        height: 56px;
        padding: 0;

        transition: $material-enter;

        opacity: 0;
        color: #757575 !important;
        border-radius: 56px;
        background-color: #fff;
        background-clip: padding-box;
        -webkit-box-shadow: $material-shadow-1dp;
           -moz-box-shadow: $material-shadow-1dp;
                box-shadow: $material-shadow-1dp;
        &.active
        {
            transform: translateX(256px) rotateZ(360deg);
            //变换函数顺序 重要！

            opacity: 1;
        }
        &:hover
        {
            background-color: #fff !important;
            -webkit-box-shadow: $material-shadow-4dp;
               -moz-box-shadow: $material-shadow-4dp;
                    box-shadow: $material-shadow-4dp;
        }
    }
}


.confirm-slide-enter-active,
.confirm-slide-leave-active {
  transition: $material-enter;
  transition-duration: .6s;
}

.confirm-slide-enter,
.confirm-slide-leave-active {
  opacity: 0;
  transform: translateY(40px);
}
</style>