import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
  //login panel
import Login from '../components/login/Login.vue'
//Grouping
import Grouping from '../components/utils/Grouping.vue'

//student panel
import Student from '../components/student/Student.vue'
import Topics from '../components/student/Topics.vue'
import TopicsStatus from '../components/student/TopicsStatus.vue'
import TeacherEvaluation from '../components/student/TeacherEvaluation.vue'
import StudentAccount from '../components/student/StudentAccount.vue'
import StudentContact from "../components/student/StudentContact.vue"
import EntryInformation from '../components/utils/EntryInformation.vue'
//admin panel
import Admin from '../components/admin/Admin.vue'
import TeacherUpload from '../components/admin/TeacherUpload.vue'
import StudentUpload from '../components/admin/StudentUpload.vue'
import ReplyGroup from '../components/admin/ReplyGroup.vue'
//teacher panel
import Teacher from '../components/teacher/Teacher.vue'
import Confirmation from '../components/teacher/Confirmation.vue'
import Creation from '../components/teacher/Creation.vue'
import StudentEvaluation from '../components/teacher/StudentEvaluation.vue'
import TeacherContact from '../components/teacher/TeacherContact.vue'
import TeacherAccount from '../components/teacher/TeacherAccount.vue'
import SelectionResult from '../components/teacher/SelectionResult.vue'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Login },
    { path: '/entryinformation', component: EntryInformation }, {
      path: '/student',
      component: Student,
      children: [
        { path: '', component: Topics },

        { path: 'topics', name: 'topics', component: Topics },
        { path: 'status', name: 'status', component: TopicsStatus },
        { path: 'grouping', name: 'grouping', component: Grouping },
        { path: 'evaluation', name: 'studentevaluation', component: TeacherEvaluation },
        { path: 'account', name: 'studentaccount', component: StudentAccount },
        { path: 'contact', name: 'studentcontact', component: StudentContact }
      ]
    }, {
      path: '/teacher',
      component: Teacher,
      children: [
        { path: '', component: Creation },
        { path: 'creation', name: 'creation', component: Creation },
        { path: 'confirmation', name: 'confirmation', component: Confirmation },
        { path: 'selectionresult', name: 'selectionresult', component: SelectionResult },
        { path: 'grouping', component: Grouping },
        { path: 'evaluation', name: 'teacherevaluation', component: StudentEvaluation },
        { path: 'contact', name: 'teachercontact', component: TeacherContact },
        { path: 'account', name: 'teacheraccount', component: TeacherAccount }
      ]
    }, {
      path: '/admin',
      component: Admin,
      children: [
        { path: '', component: TeacherUpload },
        { path: 'teacherupload', name: 'teacherupload', component: TeacherUpload },
        { path: 'studentupload', name: 'studentupload', component: StudentUpload },
        { path: 'replygroup', name: 'replygroup', component: ReplyGroup }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  window.scrollTo(0,0)
  next()
})



export default router