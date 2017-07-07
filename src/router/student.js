const Student = resolve=> require(['../components/student/Student.vue'],resolve)
const Topics = resolve=> require(['../components/student/Topics.vue'],resolve)
const TopicsStatus = resolve=> require(['../components/student/TopicsStatus.vue'],resolve)
const TeacherEvaluation = resolve=> require(['../components/student/TeacherEvaluation.vue'],resolve)
const Contact = resolve=> require(['../components/utils/Contact.vue'],resolve)

const Grouping = resolve=> require(['../components/utils/Grouping.vue'],resolve)
const AccountSetting = resolve=> require(['../components/utils/AccountSetting.vue'],resolve)

const Welcome = resolve=> require(['../components/utils/Welcome.vue'],resolve)

let StudentRouter = {
  path: '/student',
  component: Student,
  meta:{
    requireAuth:true
  },
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
