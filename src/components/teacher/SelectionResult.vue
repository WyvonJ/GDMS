<template>
  <div class="result-container" v-if="gotResult">
  <div class="sub-padding">

    <div class="teacher-topics-status">
      <md-layout md-gutter="16">
        <md-layout class="single-card" md-flex-small="100" md-flex-medium="50" v-for="(result,index) in resultData">
          <mu-paper>
            <div class="result-title">
              {{result._id}}. {{result.title}}
            </div>
            <div class="a-student" v-for="(student,sid) in  result.finalstudents">
              <div class="student-details">
                <mu-avatar :size="32" :icon="student.gender==='女'?'face':'mood'" :color="student.gender==='女'?'pink500':'blue500'" backgroundColor="#dedede"></mu-avatar><div class="student-name">{{student.name}} - {{student._id}}</div>
                <mu-divider/>
                <div class="student-contact">
                  <div class="chip">
                    <mu-icon value="call" :size="18" /> {{student.tel}}
                  </div>
                  <div class="chip">
                    <mu-icon value="mail" :size="18" />
                    <a :href="'mailto:'+student.email">{{student.email}}</a>
                  </div>
                  <div class="chip">
                    <img src="../../assets/icon/qq.svg" alt="QQ" /> {{student.qq}}
                  </div>
                  <div class="chip">
                    <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> {{student.wechat}}
                  </div>
                </div>
              </div>
            </div>
          </mu-paper>
        </md-layout>
      </md-layout>
    </div>
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
                    },{
                        _id:'1030515120',
                        name:'铁警女',
                        gender:'女',
                        tel:'18861853209',
                        email:'donaldjtrump@gmail.com',
                        qq:'852663214',
                        wechat:'donaldjtrump'
                    }]
                },{
                    _id:46,
                    title:'江南大学图书馆阅读信学图书馆阅读信息的价值发掘与可视化表达',
                    finalstudents:[{
                        _id:'1030515120',
                        name:'杨延昭',
                        gender:'男',
                        tel:'18861853209',
                        email:'donaldjtrump@gmail.com',
                        qq:'852663214',
                        wechat:'donaldjtrump'
                    }]
                },{
                    _id:46,
                    title:'江南大学图书馆阅读信息的价值发掘与可视化表达',
                    finalstudents:[{
                        _id:'1030515120',
                        name:'铁警女',
                        gender:'女',
                        tel:'18861853209',
                        email:'donaldjtrump@gmail.com',
                        qq:'852663214',
                        wechat:'donaldjtrump'
                    }]
                },{
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
                    },{
                        _id:'1030515120',
                        name:'杨延昭',
                        gender:'男',
                        tel:'18861853209',
                        email:'donaldjtrump@gmail.com',
                        qq:'852663214',
                        wechat:'donaldjtrump'
                    },{
                        _id:'1030515120',
                        name:'铁警女',
                        gender:'女',
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
    .mu-paper
    {
        transition: $material-enter;

        background-color: #f6f6f6;
    }
    .single-card
    {
        margin: 8px 0;

        flex: 0 1 10%;
        .mu-paper
        {
            width: 100%;
        }
        .result-title
        {
            padding: 8px;

            color: #fff;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            background-color: #2196f3 ;
        }
        .a-student
        {
            width: 256px;
            margin: 12px;

            border-radius: 24px;
            background-color: #fff;
            -webkit-box-shadow: $material-shadow-1dp;
               -moz-box-shadow: $material-shadow-1dp;
                    box-shadow: $material-shadow-1dp;
            .student-details
            {
                font-size: 16px;

                overflow: hidden;

                height: 200px;
                padding: 8px;

                cursor: default;
                transition: $material-enter;
                .student-name
                {
                    display: inline-block;

                    height: 32px;
                    margin-left: 18px;

                    vertical-align: middle;
                }
                .chip
                {
                    margin: 2px;
                }
                a
                {
                    color: #000;
                    &:hover
                    {
                        text-decoration: none;

                        color: #888;
                    }
                }
            }
        }
    }
}

</style>