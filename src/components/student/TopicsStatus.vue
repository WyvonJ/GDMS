<template>
  <div class="topic-status-container" v-if="isTopicConfirmed">
      <div class="student-status-card card">
        <div class="teacher-info">
          <div class="teacher-name">
            <mu-avatar icon="face" backgroundColor="deepOrange500" :size="44" :iconSize="36" />
            <div class="name">
              {{_stu_TopicComfirmed.name}} 老师
            </div>
            <mu-avatar icon="check" backgroundColor="greenA700" :size="36" :iconSize="24" class="check-icon" />
          </div>
          <div class="tel chip">
            <mu-icon value="call" :size="18" /> {{tele}}
          </div>
          <div class="email chip">
            <mu-icon value="mail" :size="18" />
            <a :href="'mailto:'+_stu_TopicComfirmed.email">{{_stu_TopicComfirmed.email}}</a>
          </div>
          <div class="office chip">
            <mu-icon value="desktop_mac" :size="18" /> {{_stu_TopicComfirmed.office||'无'}}
          </div>
          <div class="qq chip">
            <img src="../../assets/icon/qq.svg" alt="QQ" /> {{_stu_TopicComfirmed.qq||'无'}}
          </div>
          <div class="wechat chip">
            <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> {{_stu_TopicComfirmed.wechat||'无'}}
          </div>
        </div>
        <div class="topic-wrapper">
          <div class="topic-info">
            {{_stu_TopicComfirmed._id||'无'}}
          </div>
          <div class="topic-info">
            {{_stu_TopicComfirmed.title||'无'}}
          </div>
          <div class="topic-info">
            {{_stu_TopicComfirmed.details||'无'}}
          </div>
          <span class="category-tag">{{_stu_TopicComfirmed.category===0?'论文':'设计'}}
        </span>
        </div>
      </div>
  </div>
  <div class="main-content" v-else>
      <ul class="selected-topic-list">
        <li class="card"  v-for="(topic,index) in _stu_TopicInCart">
          <div class="topic-title">
            {{topic._id||'无'}}.{{topic.title}}
            <span class="topic-level">{{index+1}}</span>
          </div>
          <div class="topic-details">
            {{topic.details||'无'}}
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
        isTopicConfirmed: false
      }
    },
    computed:{
      ...mapState(['_stu_TopicComfirmed','_stu_TopicInCart']),
      tele(){
        //手机号码转换
        if (this.isTopicConfirmed) {
          let tel=''
        for (let i = 0; i < this._stu_TopicComfirmed.tel.length; i++) {
          if (i===3 || i===7) {
            tel+='-'
          }
          tel+=this._stu_TopicComfirmed.tel[i]
        }
        return tel
        }
      }
    },
    methods:{
      ...mapActions(['stuSelectionResult'])
    },
    mounted(){
      let id=_c.getCookie('user')
      this.stuSelectionResult({studentId: id})
        .then(()=>{
        if (this._stu_TopicComfirmed.name.length !== 0) {
          this.isTopicConfirmed=true
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

    width: 320px;
    &:hover
    {
        transform: translateY(-4px);
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
    .email a
    {
        margin-left: 4px;

        text-decoration: none !important;

        color: rgba(0, 0, 0, .5) !important;
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

.selected-topic-list
{
    display: flex;

    padding: 8px;

    align-items: center;
    justify-items: center;
    li.card
    {
        flex: 0 1 50%;

        margin-right: 20px;

        border-radius: 3px;
        &:hover
        {
            transform: translateY(-4px);

            -webkit-box-shadow: $material-shadow-6dp;
               -moz-box-shadow: $material-shadow-6dp;
                    box-shadow: $material-shadow-6dp;
        }
        div
        {
            padding: 8px;
        }
        .topic-title
        {
            font-size: 16px;

            position: relative;

            color: white;
            background-color: #3f51b5;
        }
        .topic-level
        {
            font-size: 20px;

            position: absolute;
            right: -16px;
            bottom: -16px;

            display: inline-block;

            width: 32px;
            height: 32px;
            padding-left: 10px;

            border-radius: 16px;
            background-color: #f44336;
        }
    }
}
.chip{
  height: 32px;
}
</style>