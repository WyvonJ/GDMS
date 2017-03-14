import axios from 'axios'
//把所有Ajax处理全部放在这里 
//传入  
//开始展示loading spinner 
const beginLoading = ({ commit }) => {
    //提交loading显示的mutation  
    commit('LOADING_TOGGLE', true)
    return Date.now()
  }
  //结束展示loading spinner
const stopLoading = ({ commit }, start, timeAllowed = 400) => {
  //计算空余时间 start为开始时间
  const spareTime = timeAllowed - (Date.now() - start)
    //调用commit
  setTimeout(commit, spareTime > 0 ? spareTime : 0, 'LOADING_TOGGLE', false)
}


let timeId
const duration = 3000

const showSnackbar = ({ commit }, payload) => {
  clearTimeout(timeId)
  commit('SET_SNACKBAR_CONTENT', payload)
  commit('SHOW_SNACKBAR', true)
  timeId = setTimeout(() => commit('SHOW_SNACKBAR', false), duration)
}

//任何情况下都会执行的函数 写在catch之后
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
  beginLoading,
  stopLoading,
  //帐号登录
  login: ({ commit }, payload) => {
    //开始Loading
    return axios.post('/login', payload)
      .then((response) => {
        //response就是res.send发送过来的Object或status
        console.log(response)
        switch (response.data.state) {
          case 0:
            {
              return Promise.reject(0)
            }
          case 1:
            {
              commit('SET_USER', payload)
              commit('SET_USERINFO', {
                userName: response.data.userName,
                userType: response.data.userType
              })
              commit('SET_NOTIFICATION', response.data.notification)
              break
            }
          case 2:
            {
              return Promise.reject(2)
            }
          case 3:
            {
              return Promise.reject(3)
            }
        }
      })
  },
  stuSetContactData: ({ commit }, payload) => {
    return axios.post('/student/stuSetContactData', payload)
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(error)
      })
  },
  //学生获取题目
  stuGetTopics: ({ commit }) => {
    //设置进度条开始
    const start = beginLoading(commit)
    return axios.get('/student/stuGetTopics')

    .then(response => {
        stopLoading(commit, start)
          //提交
        commit('SET_STU_TOPICS', response.data)
      })
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(error)
      })
  },
  //学生提交已选题目
  stuCommitSelection: ({ commit }, payload) => {
    return axios.post('/student/stuCommitSelection', payload)
      .then((response) => {
        if (response.data.state === 1) {
          showSnackbar({ commit }, '选题志愿提交成功')
        }
      })
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        Promise.reject(error)
      })
  },
  //学生查看选题情况
  stuSelectionResult: ({ commit }, payload) => {
    return axios.post('/student/stuSelectionResult', payload)
      .then(response => {
        commit('SET_STU_FINAL_TOPIC', response.data)
      })
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(error)
      })
  },
  //学生查看答辩分组
  stuGrouping: ({ commit }, payload) => {
    return axios.post('/student/stuGrouping', payload)
      .then(response => {
        commit('SET_GROUPING', response.data)
      })

  },
  //学生给老师评价 POST评分
  stuEvaluationToTch: ({ commit }, payload) => {
    //
  },
  //学生提交联系信息
  stuContactInfo: ({ commit }, payload) => {

  },
  //学生更改密码
  stuAccountInfo: ({ commit }, payload) => {

  },
  //老师创建课题
  tchCreateTopic: ({ commit }, payload) => {
    return axios.post('/teacher/tchCreateTopic', payload)
      .then(response => {
        if (response.data.state === 1) {
          payload._id = response.data._id
          commit('TCH_CREATE_TOPIC', payload)
        }
      })
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(error)
      })
  },
  tchSetContactData: ({ commit }, payload) => {
    return axios.post('/teacher/tchSetContactData', payload)
      .catch(error => {
        showSnackbar({ commit }, '出了点小问题，再试试')
        return Promise.reject(error)
      })
  },
  //载入老师课题
  tchGetTopics: ({ commit }, payload) => {
    return axios.post('/teacher/tchGetTopics', payload)
      .then(response => {
        console.log(response)
        commit('SET_TCH_TOPIC_CARD', response.data)
      })
  },
  tchGetCreatedTopics: ({ commit }, payload) => {
    return axios.post('/teacher/tchGetCreatedTopics', payload)
      .then(response => {
        console.log(response)
        commit('TCH_GET_CREATED_TOPICS', response.data)
      })
  },
  //老师删除课题
  tchDeleteTopic: ({ commit }, payload) => {
    return axios.post('/teacher/tchDeleteTopic', payload)
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        this.showSnackbar('出了点问题，再试试')
        return Promise.reject(error)
      })

  },
  //确认学生选题
  tchConfirmStudent: ({ commit }, payload) => {
    return axios.post('/teacher/tchConfirmStudent', payload)
      .then(response => {
        //提交成功 得到available 
        showSnackbar({ commit }, '确认学生选题成功')
      })
  },
  tchSelectionResult: ({ commit }, payload) => {
    return axios.post('/teacher/tchSelectionResult', payload)
      .then(response => {
        commit('SET_TCH_SELECTION_RESULT', response.data)
      })
  },
  //提交学生评价
  tchEvaluationToStu: ({ commit }, payload) => {

  }
  ,
  tchGrouping:({commit} , payload)=>{
    return axios.post('/teacher/tchGrouping',payload)
      .then(response=>{
        commit('SET_GROUPING', response.data)
      })
  }

}
