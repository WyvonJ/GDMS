<template>
  <div class="main-content" v-if="gotTopic">
    <div class="student-status-card">
          <mu-paper :zDepth="1">
            <div class="card-title">
            {{card._id}}. {{card.title}}
            <mu-avatar slot="right" backgroundColor="lightBlue500" :size="32" icon="check"/>
            </div>
            
            <div class="teacher-info">
            <div class="keys">
              MENTOR<br>
              TEL<br>
              EMAIL<br>
              QQ <br>
              WECHAT<br>
              OFFICE
            </div>
            <div class="values">
              {{card.name}}<br>
              {{card.tel}}<br>
              <a :href="'mailto:'+card.email">{{card.email}}</a><br>
              {{card.qq}}<br>
              {{card.wechat}}<br>
              {{card.office}}
            </div>
              
            </div>
            <div class="card-description">
            <h3>DESCRIPTION</h3>
              {{card.details}}
            </div>
            <span class="category-tag">{{card.category===0?'论文':'设计'}}</span>
          </mu-paper>
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
        }
      }
    },
    computed:{
      ...mapState(['affirmativeTopic'])
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
              console.log(user)

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

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';
//改成绝对定位------------------------------------
.student-status-card
{
  max-width: 480px; 
  font-size: 16px;
    .mu-paper
    {
        position: relative;
      transition: $material-enter;
      .category-tag
            {
                font-size: 13px;

                position: absolute;
                right: 2px;
                bottom: 0;

                color: rgba(0, 0, 0, .4);
            }
        &:hover
        {
            transform: translateY(-6px);
            -webkit-box-shadow: $material-shadow-9dp;
               -moz-box-shadow: $material-shadow-9dp;
                    box-shadow: $material-shadow-9dp;
        }
    }
        .card-title
        {
            position: relative;

            padding: 8px;
            background-color: #f44336;

            color: #fff;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            .mu-avatar
            {
                position: absolute;
                right: -16px;
                bottom: -16px;
                //关闭文本选择

                -webkit-user-select:      none;
                   -moz-user-select: -moz-none;
                    -ms-user-select:      none;
                        user-select:      none;

                -khtml-user-select: none;
            }
        }
        .teacher-info{
          padding: 8px 16px;
          
          .keys{
            display: inline-block;
          }
          .values{
            margin-left: 24px;
            display: inline-block;
            a{
              color: #000;
              &:hover{
                text-decoration: none;
                color: #f44336;
              }
            }
          }
        }
        .card-description
        {
          
          padding: 8px 16px 16px 16px;
          h3{
            margin-bottom: 12px;
            font-weight: 100;
          }

            
        }
    }

</style>