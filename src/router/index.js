import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
  //login panel
import Login from '../components/login/Login.vue'
import EntryInformation from '../components/utils/EntryInformation.vue'

//404
import NotFound from '../components/utils/NotFound.vue'

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
    AdminRouter,
    { path: '*', component: NotFound },
    
  ],
  scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
})

export default router
