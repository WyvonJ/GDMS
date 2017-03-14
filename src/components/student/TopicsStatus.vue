<template>
  <div class="main-content" v-if="gotTopic">
    <div class="student-status-card">
      <div class="teacher-info">
      <div class="teacher-name">
         <mu-avatar icon="face" backgroundColor="deepOrange500" :size="44" :iconSize="36" />
        <div class="name">
            {{card.name}}
        </div>
        <mu-avatar icon="check" backgroundColor="greenA700" :size="36" :iconSize="24" class="check-icon"/>
      </div>
       
        <div class="tel chip">
          <mu-icon value="call" :size="18" /> {{tele}}
        </div>
        <div class="email chip">
          <mu-icon value="mail" :size="18" />
          <a :href="'mailto:'+card.email">{{card.email}}</a>
        </div>
        <div class="office chip">
          <mu-icon value="desktop_mac" :size="18" /> {{card.office}}
        </div>
        <div class="qq chip">
          <img src="../../assets/icon/qq.svg" alt="QQ" /> {{card.qq}}
        </div>
        <div class="wechat chip">
          <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> {{card.wechat}}
        </div>
        
      </div>
      <div class="topic-wrapper">
        <div class="topic-info">
          {{card._id}}
        </div>
        <div class="topic-info">
          {{card.title}}
        </div>
        <div class="topic-info">
          {{card.details}}
        </div>
        <span class="category-tag">{{card.category===0?'论文':'设计'}}
        </span>
    </div>
      </div>
      
  </div>
  <div class="main-content" v-else>
    <div class="empty-card-title" :class="{'hide':open}" @click="toggleEmpty">
      这里空空如也！
      <p class="intrgging">不是说了啥都没有么 (゜-゜)つロ。</p>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
  export default{
    data(){
      return {
        open:false,
        gotTopic:true,
        card: {
          _id:4,
          title:'江南大学图书馆阅读信息的价值发掘与可视化表达',
          name:'陳麗芳',
          tel:'18645910268',
          qq:'552084209',
          wechat:'welovevue',
          email:'fangg@gmail.com',
          office:'数媒楼503',
          category:0,
          details:'基于机器学习时兴的迁移学习技术，学习已有知识应用到现有数据集上的分析处理。该技术将在医学成像MR/CT优化处理上进行应用实践。'
        }
      }
    },
    computed:{
      ...mapState(['affirmativeTopic']),
      tele(){
        //手机号码转换
        let tel=''
        for (var i = 0; i < this.card.tel.length; i++) {
          if (i===3 || i===7) {
            tel+='-'
          }
          tel+=this.card.tel[i]
        }
        return tel
      }
    },
    methods:{
      toggleEmpty(){
        this.open=!this.open
      },
      ...mapActions(['stuSelectionResult'])
    },
    mounted(){
      var user=this.$root.getCookie('user')
      if (!user){
                alert('超时未操作，请重新登录')
                return this.$router.push('/')
              }
      this.stuSelectionResult({studentId:user})
        .then(()=>{
        if (this.affirmativeTopic.length!=0) {
          this.gotTopic=true
          this.card=this.affirmativeTopic
          console.log(this.affirmativeTopic)
        }
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.student-status-card {
  font-size: 16px;
  position: relative;
  max-width: 480px;
  transition: $material-enter;
  border-radius: 3px;
  -webkit-box-shadow: $material-shadow-1dp;
  -moz-box-shadow: $material-shadow-1dp;
  box-shadow: $material-shadow-1dp;
  &:hover {
    transform: translateY(-4px);
    -webkit-box-shadow: $material-shadow-6dp;
    -moz-box-shadow: $material-shadow-6dp;
    box-shadow: $material-shadow-6dp;
  }
  .teacher-info {
    padding: 16px;
    background-color: #e4e4e4;
  }
  .chip {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: auto;
    height: 32px;
    margin: 6px;
    padding: 2px 12px;
    transition: $material-enter;
    border: 1px #efefef solid;
    border-radius: 16px;
    background-color: #fff;
    &:hover {
      -webkit-box-shadow: $material-shadow-1dp;
      -moz-box-shadow: $material-shadow-1dp;
      box-shadow: $material-shadow-1dp;
    }
    .mu-icon {
      position: relative;
      top: 5px;
    }
    img {
      position: relative;
      bottom: 2px;
      height: 30px;
    }
  }
  .teacher-name {
    line-height: 24px;
    margin-bottom: 18px;
    .name {
      font-size: 24px;
      position: relative;
      bottom: 6px;
      left: 18px;
      display: inline-block;
    }
    .check-icon {
      position: absolute;
      top: 21px;
      right: 16px;
      cursor: default;
      transition: $material-enter;
      &:hover {
        transform: rotateZ(360deg);
      }
    }
  }
  .email {
    a {
      margin-left: 4px;
      text-decoration: none !important;
      color: rgba(0, 0, 0, .5) !important;
    }
  }
  .topic-wrapper {
    position: relative;
    padding: 16px 32px;
    background-color: #fff;
    .topic-info {
      margin-top: 16px;
      padding: 6px 12px;
      border-left: 1px #dcdcdc solid;
      &:before {
        position: absolute;
        top: 18px;
        left: 26px;
        width: 12px;
        height: 12px;
        content: '';
        border: 3px #f44336 solid;
        border-radius: 50%;
      }
      &:nth-child(2) {
        min-height: 52px;
      }
      &:nth-child(2):before {
        top: 66px;
      }
      &:nth-child(3):before {
        top: 134px;
      }
    }
    .category-tag {
      font-size: 14px;
      position: absolute;
      top: 6px;
      right: 9px;
      color: rgba(0, 0, 0, .4);
    }
  }
}

</style>