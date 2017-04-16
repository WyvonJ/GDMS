import axios from 'axios'

const duration = 3000

let timer

const progressbarStart = ({ commit }) => {
  commit('SET_PROGRESSBAR', true)
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
  login: ({ commit }, payload) => {
    return axios.post('/login', payload)
      .then((response) => {
        if (response.data.state === 1) {
          commit('SET_USER', {
            account: payload.account,
            username: response.data.userName,
            usertype: response.data.userType,
            isFirstLogin: response.data.isfirstlogin
          })
          commit('SET_NOTIFICATION', response.data.notification)
        } else
          return Promise.reject(response.data.state)
      })
  },
  stuSetContactData: ({ commit }, payload) => {
    return axios.post('/student/stuSetContactData', payload)
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //学生获取题目
  stuGetTopics: ({ commit }) => {
    return axios.get('/student/stuGetTopics')
      .then(response => {
        commit('STU_TOPIC_IN_TABLE', response.data)
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //学生提交已选题目
  stuCommitSelection: ({ commit }, payload) => {
    return axios.post('/student/stuCommitSelection', payload)
      .then((response) => {
        if (response.data.state === 1)
          showSnackbar({ commit }, '选题志愿提交成功')
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        Promise.reject(err)
      })
  },
  //学生查看选题情况
  stuSelectionResult: ({ commit }, payload) => {
    return axios.post('/student/stuSelectionResult', payload)
      .then(response => {
        if (response.data.state===1) {
          commit('STU_FINAL_TOPIC', response.data)
        }else{
          let wrapper=[]
          for (let i = 0; i < response.data.topics.length; i++) {
            if(response.data.topics[i])
              wrapper.push(response.data.topics[i])
          }
          console.log(wrapper)
          commit('STU_TOPIC_IN_CART', wrapper)
        }
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  stuGetSelectedTopics: ({ commit }, payload) => {
    return axios.post('/student/stuGetSelectedTopics', payload)
      .then(response => {
        commit('STU_TOPIC_IN_CART', response.data)
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //学生查看答辩分组
  stuGrouping: ({ commit }, payload) => {
    return axios.post('/student/stuGrouping', payload)
      .then(response => {
        commit('STU_TCH_GROUPING', response.data)
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //学生给老师评价
  stuEvaluationToTch: ({ commit }, payload) => {
    return axios.post('/student/stuEvaluationToTch', payload)
      .then(response => {
        showSnackbar({ commit }, '分数提交成功')
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //学生修改联系信息
  stuContactInfo: ({ commit }, payload) => {
    return axios.post('./student/stuContactInfo', payload)
      .then((response) => {

      })
      .catch((err) => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //学生更改密码
  stuAccountInfo: ({ commit }, payload) => {
    return axios.post('/student/stuAccountInfo', payload)
      .then(() => {

      })
      .catch((err) => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  tchSetContactData: ({ commit }, payload) => {
    return axios.post('/teacher/tchSetContactData', payload)
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(error)
      })
  },
  //老师创建课题
  tchCreateTopic: ({ commit }, payload) => {
    return axios.post('/teacher/tchCreateTopic', payload)
      .then(response => {
        if (response.data.state === 1) {
          payload._id = response.data._id
          commit('TCH_TOPIC_CREATED', payload)
        } else {
          showSnackbar({ commit }, '出了点小问题，再试试')
          Promise.reject('error')
        }
      })
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  tchContactInfo: ({ commit }, payload) => {
    return axios.post('/teacher/tchContactInfo', payload)
      .catch(err => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(err)
      })
  },
  //载入老师课题
  tchGetTopics: ({ commit }, payload) => {
    return axios.post('/teacher/tchGetTopics', payload)
      .then(response => {
        commit('TCH_STUDENT_IN_CARD', response.data)
      })
      .catch((err) => {
        showSnackbar({ commit }, '载入课题出了点问题，再刷新试试')
        return Promise.reject(err)
      })
  },
  tchGetCreatedTopics: ({ commit }, payload) => {
    return axios.post('/teacher/tchGetCreatedTopics', payload)
      .then(response => {
        console.log(response)
        commit('TCH_TOPIC_CREATED_ALL', response.data)
      })
  },
  //老师删除课题
  tchDeleteTopic: ({ commit }, payload) => {
    return axios.post('/teacher/tchDeleteTopic', payload)
      .then(response => {
        console.log(response)
      })
      .catch((err) => {
        showSnackbar({ commit }, '出了点问题，再试试')
        return Promise.reject(err)
      })
  },
  //确认学生选题
  tchConfirmStudent: ({ commit }, payload) => {
    return axios.post('/teacher/tchConfirmStudent', payload)
      .then(response => {
        //提交成功 得到available 
        showSnackbar({ commit }, '已确认学生')
      })
      .catch((err) => {
        showSnackbar({ commit }, '出了点问题，再试试')
        return Promise.reject(err)
      })
  },
  tchSelectionResult: ({ commit }, payload) => {
    return axios.post('/teacher/tchSelectionResult', payload)
      .then(response => {
        commit('TCH_STUDENT_CONFIRMED', response.data)
      })
  },
  //提交学生评价
  tchEvaluationToStu: ({ commit }, payload) => {
    return axios.post('/teacher/tchEvaluationToStu', payload)
      .then(() => {

      })
  },
  tchGrouping: ({ commit }, payload) => {
    return axios.post('/teacher/tchGrouping', payload)
      .then(response => {
        commit('STU_TCH_GROUPING', response.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
