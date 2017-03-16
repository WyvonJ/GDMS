<template>
  <div class="main-content" v-if="gotResult">
    <div class="teacher-topics-status">
      <md-layout md-gutter="16">
        <md-layout class="single-card" md-flex-small="100" md-flex-medium="50" v-for="(result,index) in resultData">
          <mu-paper :zDepth="2">
            <div class="result-title">
              {{result._id}}. {{result.title}}
            </div>
            <div class="a-student" v-for="(student,sid) in  result.finalstudents">
              <div class="student-details">
                <mu-avatar :size="32" icon="face"></mu-avatar>{{student.name}}{{student._id}}</span>
                <div class="student-contact">
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
              </div>
            </div>
          </mu-paper>
        </md-layout>
      </md-layout>
    </div>
  </div>
  <div class="main-content" v-else>
    <div class="empty-card-title" :class="{'hide':open}">
      这里空空如也！
      <p class="intrgging">不是说了啥都没有么 (゜-゜)つロ。</p>
    </div>
  </div>
</template>


<script>

import { mapState ,mapActions,mapMutations} from 'vuex'
	export default{
		data(){
			return {
				gotResult:true,
				resultData:[{
                    _id:46,
                    title:'江南大学图书馆阅读信息的价值发掘与可视化表达',
                    finalstudents:[{
                        _id:'1030515120',
                        name:'杨延昭',
                        gender:'男',
                        tel:'18861853209',
                        email:'donaldjtrump@gmail.com',
                        qq:'852663214',
                        wechat:'donaldjtrump'
                    }]
                }]
			}
		},
		computed:{
			...mapState(['user','resultData'])
		},
		methods:{
			...mapActions(['tchSelectionResult'])
			//一键导出excel表格功能实现
		},
		mounted(){

	   if(this.$root.getCookie('user')){
       var user=this.$root.getCookie('user')
        this.tchSelectionResult({teacherId:user})
     }else{
       //this.$router.push('/')
     }
			
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';

.teacher-topics-status
{
    margin: 8px 0;

    transition: all .4s cubic-bezier(.2,.2,.4,1);
    .mu-paper
    {
        transition: $material-enter;
        &:hover
        {
            -webkit-box-shadow: $material-shadow-9dp;
               -moz-box-shadow: $material-shadow-9dp;
                    box-shadow: $material-shadow-9dp;
        }
    }
    .single-card
    {
        margin: 8px 0;
        .mu-paper
        {
            width: 100%;
        }
        .result-title
        {
            position: relative;

            padding: 8px;

            color: #fff;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            background-color: #2196f3 !important;
        }
        .a-student
        {
            position: relative;

            width: 256px;
            margin: 12px;

            transition: $material-enter;
            border-radius: 4px;
            -webkit-box-shadow: $material-shadow-1dp;
               -moz-box-shadow: $material-shadow-1dp;
                    box-shadow: $material-shadow-1dp;
            .student-details
            {
                font-size: 16px;

                overflow: hidden;

                padding: 8px;
            }
        }
    }
}

</style>