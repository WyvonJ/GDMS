<template>
  <div class="intro-card" :class="{'active' : toggleIntro}">
    <div v-if="!isselected">
      <mu-paper :class="{'active' : toggleIntro,'confirm-panel' : toggleConfirmation}">
        <div class="student-intro-content">
          <span>GPA: {{student.gpa}}</span>
          <span style="float: right;">{{student._id}}</span>
          <mu-divider/>
          <div class="intro-content">
            {{student.intro}}
          </div>
        </div>
        <transition name="confirm-slide" mode="out-in">
          <div class="confirm" v-if="toggleConfirmation">
            <mu-divider/>
            <div class="no-regret">确定要选择{{student.gender=="女"?"她":"他"}}吗？
            </div>
            <mu-raised-button @click.native="toggleFinal">确定</mu-raised-button>
          </div>
        </transition>
      </mu-paper>
      <md-button class="name-button md-fab" :style="{backgroundColor: student.gender=='女'?'#ff4081':'#26c6da'}" @click.native="toggleIntroContent">
        {{student.name}}
        <md-tooltip v-if="student.name.length>3" md-direction="top">{{student.name}}</md-tooltip>
      </md-button>
      <md-button class="check-button md-warn" :class="{'active' : toggleIntro,'confirm-panel' : toggleConfirmation}" @click.native="studentConfirmed">
        <md-icon>{{!toggleConfirmation ? 'check' : 'clear'}}</md-icon>
      </md-button>
    </div>
    <div v-else="!isselected" class="confirmed-avatar">
      <mu-avatar  backgroundColor="greenA700" color="#fff" :size="56">{{student.name}}
      <md-tooltip md-direction="top">{{student._id}}</md-tooltip>
      </mu-avatar>
    </div>
  </div>
</template>


<script>
export default{
	name:'intro-card',
	props:{
		student: Object,
		isselected: Boolean
	},
	data(){
		return{
        toggleIntro:false,
      	toggleConfirmation:false,
      	studentId:''
	}},
	methods:{
		toggleIntroContent(){
        this.toggleIntro=!this.toggleIntro
        this.toggleConfirmation=false
        this.$emit('current')
        this.$emit('overlay')
      },
      studentConfirmed(){
        this.toggleConfirmation=!this.toggleConfirmation
      },
      toggleFinal(){
      	this.$emit('confirm')
      	this.toggleIntro=!this.toggleIntro
      	this.$emit('overlay')

      }
	}

}
</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss'; 
.intro-card
{
    position: relative;

    display: inline-block;
    margin: 12px 30%;
    &.active{
    	z-index: 3000;//超过遮罩层的z-index
    }
    .mu-paper
    {
        position: absolute !important;
        bottom: 6px;
        left: 36px;
        height: 0;
        width: 0 !important;
        border-radius: 6px;
        overflow: hidden;

        transition:$material-enter;
        opacity: 0;
        &.active
        {
        	  height: 125px;
            padding: 12px 36px;
            opacity: 1;
            width: 256px !important;
        }
        &.confirm-panel{
        	  height: 200px;
            padding-bottom: 12px;
        }
        .confirm{
          position: absolute;
          bottom: 6px;
          width: 184px;
          text-align: center;
        .mu-raised-button{
          background-color: #1e88e5 !important;
          border-radius: 18px;
          color: #fff;
        }
        }
        

    }
    .name-button
    {

        padding: 6px 8px;
        display: inline-block;
        z-index: 3;
       
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
        color: #fff !important;
        border-radius: 56px;
        background-color: #00c853;
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
            background-color: #00e676 !important;
            -webkit-box-shadow: $material-shadow-6dp;
               -moz-box-shadow: $material-shadow-6dp;
                    box-shadow: $material-shadow-6dp;
        }
        &.confirm-panel{
            background-color: #e53935 !important;

        }
    }
}

.confirmed-avatar{
  padding: 6px 8px;
  display: inline-block;
  .mu-avatar{
    font-size: 14px;
     cursor: default;
     -khtml-user-select: none;
                -webkit-user-select:      none;
                   -moz-user-select: -moz-none;
                    -ms-user-select:      none;
                        user-select:      none;
  }
  

}
.confirm-slide-enter-active,
.confirm-slide-leave-active {
  transition: $material-enter;
  transition-duration: .4s;
}

.confirm-slide-enter,
.confirm-slide-leave-active {
  opacity: 0;
  transform: translateY(40px);
}
.confirm-slide-move {
  transition: transform .4s;
}
</style>