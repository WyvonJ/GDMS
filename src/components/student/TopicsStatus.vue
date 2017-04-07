<template>
  <div class="topic-status-container" v-if="gotTopic">
    <div class="sub-padding">
      <div class="student-status-card card">
        <div class="teacher-info">
          <div class="teacher-name">
            <mu-avatar icon="face" backgroundColor="deepOrange500" :size="44" :iconSize="36" />
            <div class="name">
              {{affirmativeTopic.name}} 老师
            </div>
            <mu-avatar icon="check" backgroundColor="greenA700" :size="36" :iconSize="24" class="check-icon" />
          </div>
          <div class="tel chip">
            <mu-icon value="call" :size="18" /> {{tele}}
          </div>
          <div class="email chip">
            <mu-icon value="mail" :size="18" />
            <a :href="'mailto:'+affirmativeTopic.email">{{affirmativeTopic.email}}</a>
          </div>
          <div class="office chip">
            <mu-icon value="desktop_mac" :size="18" /> {{affirmativeTopic.office}}
          </div>
          <div class="qq chip">
            <img src="../../assets/icon/qq.svg" alt="QQ" /> {{affirmativeTopic.qq}}
          </div>
          <div class="wechat chip">
            <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> {{affirmativeTopic.wechat}}
          </div>
        </div>
        <div class="topic-wrapper">
          <div class="topic-info">
            {{affirmativeTopic._id}}
          </div>
          <div class="topic-info">
            {{affirmativeTopic.title}}
          </div>
          <div class="topic-info">
            {{affirmativeTopic.details}}
          </div>
          <span class="category-tag">{{affirmativeTopic.category===0?'论文':'设计'}}
        </span>
        </div>
      </div>
    </div>
  </div>
  <div class="main-content" v-else>
      <ul class="selected-topic-list" v-for="(topic,index) in cardData">
        <li class="card">
          <div class="topic-title">
            {{topic._id}}.{{topic.title}}
            <span class="topic-level">{{index+1}}</span>
          </div>
          <div class="topic-details">
            {{topic.details}}
          </div>
        </li>
      </ul>
  </div>
</template>


<script>
import {mapActions,mapState} from 'vuex'
  export default{
    data(){
      return {
        open:false,
        gotTopic:false,
        cardData:[{
          _id:16,
          title:' 元素用于在网页中包含对象',
          details:'form 返回对对象的父表单的引用。height  设置或返回对象的高度。hspace  设置或返回对象的水平外边距。name  设置或返回对象的名称。standby 设置或返回在加载对象时返回的消息。type  设置或返回通过 data 属性下载的数据的内容类型。'
        },{
          _id:16,
          title:' 元素用于在网页中包含对象',
          details:'form 返回对对象的父表单的引用。height  设置或返回对象的高度。hspace  设置或返回对象的水平外边距。name  设置或返回对象的名称。standby 设置或返回在加载对象时返回的消息。type  设置或返回通过 data 属性下载的数据的内容类型。'
        },{
          _id:16,
          title:' 元素用于在网页中包含对象',
          details:'form 返回对对象的父表单的引用。height  设置或返回对象的高度。hspace  设置或返回对象的水平外边距。name  设置或返回对象的名称。standby 设置或返回在加载对象时返回的消息。type  设置或返回通过 data 属性下载的数据的内容类型。'
        }]
      }
    },
    computed:{
      ...mapState(['affirmativeTopic']),
      tele(){
        //手机号码转换
        let tel=''
        for (let i = 0; i < this.affirmativeTopic.tel.length; i++) {
          if (i===3 || i===7) {
            tel+='-'
          }
          tel+=this.affirmativeTopic.tel[i]
        }
        return tel
      }//*********************添加三个课题显示
    },
    methods:{
      toggleEmpty(){
        this.open=!this.open
      },
      ...mapActions(['stuSelectionResult'])
    },
    mounted(){
      var user=this.$root.getCookie('user')
      /*if (!user){
                alert('超时未操作，请重新登录')
                return this.$router.push('/')
              }*/
      this.stuSelectionResult({studentId:user})
        .then(()=>{
        if (this.affirmativeTopic.length!=0) {
          this.gotTopic=true
        }
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.student-status-card
{
    font-size: 16px;

    position: relative;

    max-width: 480px;

    &:hover
    {
        transform: translateY(-4px);

        -webkit-box-shadow: $material-shadow-6dp;
           -moz-box-shadow: $material-shadow-6dp;
                box-shadow: $material-shadow-6dp;
    }
    .teacher-info
    {
        padding: 16px;

        background-color: #e4e4e4;
    }
    .teacher-name
    {
        line-height: 24px;

        margin-bottom: 18px;
        .name
        {
            font-size: 24px;

            position: relative;
            bottom: 6px;
            left: 18px;

            display: inline-block;
        }
        .check-icon
        {
            position: absolute;
            top: 21px;
            right: 16px;

            cursor: default;
            transition: $material-enter;
            &:hover
            {
                transform: rotateZ(360deg);
            }
        }
    }
    .email
    {
        a
        {
            margin-left: 4px;

            text-decoration: none !important;

            color: rgba(0, 0, 0, .5) !important;
        }
    }
    .topic-wrapper
    {
        position: relative;

        padding: 16px 32px;

        background-color: #fff;
        .topic-info
        {
            margin-top: 16px;
            padding: 6px 12px;

            border-left: 1px #dcdcdc solid;
            &:before
            {
                position: absolute;
                top: 18px;
                left: 26px;

                width: 12px;
                height: 12px;

                content: '';

                border: 3px #f44336 solid;
                border-radius: 50%;
            }
            &:nth-child(2)
            {
                min-height: 52px;
            }
            &:nth-child(2):before
            {
                top: 66px;
            }
            &:nth-child(3):before
            {
                top: 134px;
            }
        }
        .category-tag
        {
            font-size: 14px;

            position: absolute;
            top: 6px;
            right: 9px;

            color: rgba(0, 0, 0, .4);
        }
    }
}

.selected-topic-list{
  display: flex;
  padding: 8px;
  align-items: center;
  justify-items:center;
  li{
    width: 320px;
    height: 240px;
    margin: 0 8px 0 0;
    border-radius: 3px;
    display: inline-block;
    &:hover
    {
        transform: translateY(-4px);

        -webkit-box-shadow: $material-shadow-6dp;
           -moz-box-shadow: $material-shadow-6dp;
                box-shadow: $material-shadow-6dp;
    }
    div{
      padding: 8px;
    }
    .topic-title{
        background-color: #3F51B5;
        color: white;
        position: relative;
        font-size: 16px;
      }
      .topic-level{
        position: absolute;
        display: inline-block;
        width: 32px;
        height: 32px;
        right: -16px;
        bottom: -16px;
        border-radius: 16px;
        background-color: #f44336;
        padding-top: 7px;
        padding-left: 10px;
        font-size: 20px;
      }
  }
}

</style>