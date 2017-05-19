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
    user: {},
    notification: '',
    _stu_TopicInCart: [],
    _stu_TopicInTable: [],
    _stu_TopicComfirmed: {},
    _tch_TopicCreated: {},
    _tch_TopicCreatedAll: [],
    _tch_StudentInCard: [],
    _tch_StudentConfirmed: [],
    _stu_tch_Group: {}
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
