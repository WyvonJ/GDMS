import axios from 'axios'

const duration = 3000 //snackbar显示事件

let timer
const errMsg = '出了点小问题，再试试'
const progressbarStart = ({ commit }) => {
  commit('SET_PROGRESSBAR', true) //设置进度条开始
  return Date.now()
}
const progressbarStop = ({ commit }, start, timeAllowed = 400) => {
  const spareTime = timeAllowed - (Date.now() - start)
  setTimeout(commit, spareTime > 0 ? spareTime : 0, 'SET_PROGRESSBAR', false)
}
const showSnackbar = ({ commit }, payload) => {
  clearTimeout(timer)
  commit('SET_SNACKBAR_TEXT', payload)
  commit('SHOW_SNACKBAR', true)
  timer = setTimeout(() => commit('SHOW_SNACKBAR', false), duration)
}

Promise.prototype.finally = function(callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => {
      throw reason
    })
  )
}
export default {
  showSnackbar,
  progressbarStart,
  progressbarStop,
  //登录路由
  login: ({ commit }, payload) => {
    return axios.post('/login', payload)
      .then((res) => {
        if (res.data.state === 1) {
          commit('SET_USER', {
            account: payload.account,
            username: res.data.userName,
            usertype: res.data.userType,
            isFirstLogin: res.data.isfirstlogin,
            token: res.data.token
          })
          commit('SET_NOTIFICATION', res.data.notification)
        } else
          return Promise.reject(res.data.state)
      })
  },
  getCurrentStep: ({ commit }) => {
    return axios.get('/getstep')
      .then(res => {
        commit('SET_STEP', res.curstep)
      })
  },
  stuSetContactData: ({ commit }, payload) => {
    return axios.post('/student/stuSetContactData', payload)
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  //学生获取题目
  stuGetTopics: ({ commit }) => {
    return axios.get('/student/stuGetTopics')
      .then(res => {
        commit('STU_TOPIC_IN_TABLE', res.data)
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  //学生提交已选题目
  stuCommitSelection: ({ commit }, payload) => {
    return axios.post('/student/stuCommitSelection', payload)
      .then((res) => {
        if (res.data.state === 1) {
          showSnackbar({ commit }, errMsg)
          router.push('/student/status')
        }
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        Promise.reject(err)
      })
  },
  //学生查看选题情况
  stuSelectionResult: ({ commit }, payload) => {
    return axios.post('/student/stuSelectionResult', payload)
      .then(res => {
        if (res.data.state === 1) {
          commit('STU_FINAL_TOPIC', res.data)
        } else {
          let wrapper = []
          for (let i = 0; i < res.data.topics.length; i++) {
            if (res.data.topics[i])
              wrapper.push(res.data.topics[i])
          }
          commit('STU_TOPIC_IN_CART', wrapper)
        }
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  stuGetSelectedTopics: ({ commit }, payload) => {
    return axios.post('/student/stuGetSelectedTopics', payload)
      .then(res => {
        commit('STU_TOPIC_IN_CART', res.data)
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  //学生查看答辩分组
  stuGrouping: ({ commit }, payload) => {
    return axios.post('/student/stuGrouping', payload)
      .then(res => {
        commit('STU_TCH_GROUPING', res.data)
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  //学生给老师评价
  stuEvaluationToTch: ({ commit }, payload) => {
    return axios.post('/student/stuEvaluationToTch', payload)
      .then(res => {
        showSnackbar({ commit }, '分数提交成功')
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  tchSetContactData: ({ commit }, payload) => {
    return axios.post('/teacher/tchSetContactData', payload)
      .catch(error => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(error)
      })
  },
  //老师创建课题
  tchCreateTopic: ({ commit }, payload) => {
    return axios.post('/teacher/tchCreateTopic', payload)
      .then(res => {
        if (res.data.state === 1) {
          payload._id = res.data._id
          commit('TCH_TOPIC_CREATED', payload)
        } else {
          showSnackbar({ commit }, errMsg)
          Promise.reject('error')
        }
      })
      .catch(err => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  //载入老师课题
  tchGetTopics: ({ commit }, payload) => {
    return axios.post('/teacher/tchGetTopics', payload)
      .then(res => {
        commit('TCH_STUDENT_IN_CARD', res.data)
      })
      .catch((err) => {
        showSnackbar({ commit }, '载入课题出了点问题，再刷新试试')
        return Promise.reject(err)
      })
  },
  tchGetCreatedTopics: ({ commit }, payload) => {
    return axios.post('/teacher/tchGetCreatedTopics', payload)
      .then(res => {
        commit('TCH_TOPIC_CREATED_ALL', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  //老师删除课题
  tchDeleteTopic: ({ commit }, payload) => {
    return axios.post('/teacher/tchDeleteTopic', payload)
      .then(res => {
        console.log(res)
        showSnackbar({ commit }, "课题已删除")
      })
      .catch(err => {
        console.log('课题删除出错' + err)
      })
  },
  //确认学生选题
  tchConfirmStudent: ({ commit }, payload) => {
    return axios.post('/teacher/tchConfirmStudent', payload)
      .then(res => {
        //提交成功 得到available 
        showSnackbar({ commit }, '已确认学生')
      })
      .catch((err) => {
        showSnackbar({ commit }, errMsg)
        return Promise.reject(err)
      })
  },
  tchSelectionResult: ({ commit }, payload) => {
    return axios.post('/teacher/tchSelectionResult', payload)
      .then(res => {
        commit('TCH_STUDENT_CONFIRMED', res.data)
      })
  },
  tchGrouping: ({ commit }, payload) => {
    return axios.post('/teacher/tchGrouping', payload)
      .then(res => {
        commit('STU_TCH_GROUPING', res.data)
      })
  }
}
