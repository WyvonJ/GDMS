import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
		//进度条显示
		loading:false,
		//展示snackbar
		snackbarText:'',
		showSnackbar:false,
		/***********Student************/
		//设置现在的用户是谁
		user: {
			account:'',
			password:''
		},
		//用户名
		userInfo:{
			userName:'',
			userType:Number
		},
		//notification信息
		notification:'',
		//一次取过来所有选题数据
		topicsData:[],
		//存在cart中的课题 等待提交
		selectedInCart:[],
		//已确定的课题
		//放在老师选择的卡片中的数据
		cardData:[],
		affirmativeTopic:{},
		//获取答辩分组
		grouping:{},
		/************Teacher***************/
		//创建的课题
		createdTopic:{
			account:'',
			fields:'',
			category:'',
			title:'',
			detail:'',
			availableSum:''
		},
		//创建的所有课题 从服务器拿取
		createdTopics:[],
		resultData:[],
		/************Admin***************/
		//学生帐号管理
		studentAccounts:[],
		//导师帐号管理
		teacherAccounts:[]

	},
	getters,
	mutations,
	actions
})

export default store