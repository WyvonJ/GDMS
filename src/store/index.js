import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isProgressbar: false,
    isSnackbar: false,
    snackbarText: '',
    user: {
      account: '',
      password: '',
      username: '',
      usertype: '',
      isFirstLogin: true
    },
    notification: '',
    _stu_TopicInCart: [],
    _stu_TopicInTable: [],
    _stu_TopicComfirmed: {},
    _stu_Account: {},
    _tch_TopicCreated: {
      account: '',
      fields: '',
      category: '',
      title: '',
      detail: '',
      availableSum: ''
    },
    _tch_TopicCreatedAll: [],
    _tch_StudentInCard: [],
    _tch_StudentConfirmed: [],
    _tch_Account: {}
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
