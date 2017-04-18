import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
  //login panel
import Login from '../components/login/Login.vue'
import EntryInformation from '../components/utils/EntryInformation.vue'

import AdminRouter from './admin'
import StudentRouter from './student'
import TeacherRouter from './teacher'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Login },
    { path: '/entryinformation', component: EntryInformation },
    StudentRouter,
    TeacherRouter,
    AdminRouter
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
