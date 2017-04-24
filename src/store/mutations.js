import Vue from 'vue'

export default {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_NOTIFICATION: (state, string) => {
    state.notification = string
  },
  SHOW_SNACKBAR: (state, isShow) => {
    state.isSnackbar = isShow
  },
  SET_SNACKBAR_TEXT: (state, string) => {
    state.snackbarText = string
  },
  STU_TOPIC_IN_TABLE: (state, topics) => {
    state._stu_TopicInTable = topics
  },
  STU_TCH_GROUPING: (state, grouping) => {
    state._stu_tch_Group = grouping
  },
  STU_FINAL_TOPIC: (state, topic) => {
    state._stu_TopicComfirmed = topic
  },
  STU_TOPIC_IN_CART: (state, topic) => {
    state._stu_TopicInCart = topic
  },
  TCH_TOPIC_CREATED_ALL: (state, topic) => {
    state._tch_TopicCreatedAll = topic
  },
  TCH_TOPIC_CREATED: (state, topic) => {
    state._tch_TopicCreated = topic
  },
  TCH_STUDENT_IN_CARD: (state, student) => {
    state._tch_StudentInCard = student
  },
  TCH_STUDENT_CONFIRMED: (state, student) => {
    state._tch_StudentConfirmed = student
  },
  TCH_SET_STU_SELECTED: (state, student) => {
    student.isselected = true
  },
  TCH_DELETE_STUDENT: (state, topic) => {
    let sorted = _.groupBy(topic.students, 'isselected')
    topic.students = sorted[true]
  },
  SET_PROGRESSBAR: (state, isShow) => {
    state.isProgressbar = isShow
  },
  RESET_STATE: (state) => {
    state = null
  },
  ADM_SET_TCH_ACCOUNT: (state, accounts) => {
    state._adm_TchAccounts = accounts
  },
  ADM_SET_STU_ACCOUNT: (state, accounts) => {
    state._adm_StuAccounts = accounts
  },
  ADM_SET_STU_TOPICS: (state, topics) => {
    state._adm_StuTopics = topics
  },
  ADM_SET_TCH_TOPICS: (state, topics) => {
    state._adm_TchTopics = topics
  },
  ADM_SET_MID_GROUP: (state, groups) => {
    state._adm_MidGroup = groups
  },
  ADM_SET_FNL_GROUP: (state, groups) => {
    state._adm_FnlGroup = groups
  },
  ADM_SET_MID_GRADE: (state, grades) => {
    state._adm_MidGrade = grades
  },
  ADM_SET_FNL_GRADE: (state, grades) => {
    state._adm_FnlGrade = grades
  }
}
