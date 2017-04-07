export default {
  SET_LOGIN_STATE: (state, loginState) => {
    state.loginState = loginState
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_NOTIFICATION: (state, notification) => {
    state.notification = notification
  },
  SHOW_SNACKBAR: (state, showSnackbar) => {
    state.showSnackbar = showSnackbar
  },
  SET_SNACKBAR_CONTENT: (state, snackbarText) => {
    state.snackbarText = snackbarText
  },
  SET_STU_TOPICS: (state, stuTopics) => {
    state.topicsData = stuTopics
  },
  SET_GROUPING: (state, grouping) => {
    state.grouping = grouping
  },
  SET_STU_FINAL_TOPIC: (state, affirmativeTopic) => {
    state.affirmativeTopic = affirmativeTopic
  },
  SET_TOPICS_IN_CART: (state, selectedInCart) => {
    state.selectedInCart = selectedInCart
  },
  TCH_GET_CREATED_TOPICS: (state, createdTopics) => {
    state.createdTopics = createdTopics
  },
  TCH_CREATE_TOPIC: (state, createdTopic) => {
    state.createdTopic = createdTopic
  },
  SET_TCH_TOPIC_CARD: (state, tchTopics) => {
    state.cardData = tchTopics
  },
  SET_TCH_SELECTION_RESULT: (state, resultData) => {
    state.resultData = resultData
  },
  LOADING_TOGGLE: (state, loading) => {
    state.loading = loading
  },
  RESET_STATE: (state) => {
    state.selectedInCart = []
  },
  SET_SEARCH_STR: (state, str) => {
    state.searchStr = str
    console.log(str)
  }
}
