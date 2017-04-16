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
  STU_SELECT_TOPIC:(state,topic)=>{
    if(topic)
      state._stu_TopicInCart.push(topic)
  },
  STU_DELTED_TOPIC:(state,index)=>{ 
      state._stu_TopicInCart.splice(index,1)
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
    let sorted=_.groupBy(topic.students,'isselected')
    topic.students=sorted[true]
  },
  SET_PROGRESSBAR: (state, isShow) => {
    state.isProgressbar = isShow
  },
  RESET_STATE: (state) => {
    state = null
  }
}
