import Student from '../components/student/Student.vue'
import Topics from '../components/student/Topics.vue'
import TopicsStatus from '../components/student/TopicsStatus.vue'
import TeacherEvaluation from '../components/student/TeacherEvaluation.vue'
import Contact from "../components/utils/Contact.vue"

import Grouping from '../components/utils/Grouping.vue'
import Welcome from '../components/utils/Welcome.vue'
import AccountSetting from '../components/utils/AccountSetting.vue'
let StudentRouter = {
  path: '/student',
  component: Student,
  children: [
    { path: '', component: Welcome },
    { path: 'topics', name: 'topics', component: Topics },
    { path: 'status', name: 'status', component: TopicsStatus },
    { path: 'grouping', name: 'grouping', component: Grouping },
    { path: 'evaluation', name: 'studentevaluation', component: TeacherEvaluation }, 
    { path: 'contact', name: 'studentcontact', component: Contact },
    { path: 'account', name: 'account', component: AccountSetting }
  ]
}

export default StudentRouter
