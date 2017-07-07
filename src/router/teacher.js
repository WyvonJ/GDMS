//teacher panel
const Teacher = resolve=> require(['../components/teacher/Teacher.vue'],resolve)
const Confirmation = resolve=> require(['../components/teacher/Confirmation.vue'],resolve)
const Creation = resolve=> require(['../components/teacher/Creation.vue'],resolve)
const StudentEvaluation = resolve=> require(['../components/teacher/StudentEvaluation.vue'],resolve)

const SelectionResult = resolve=> require(['../components/teacher/SelectionResult.vue'],resolve)
const Contact = resolve=> require(['../components/utils/Contact.vue'],resolve)
const Grouping = resolve=> require(['../components/utils/Grouping.vue'],resolve)
const Welcome = resolve=> require(['../components/utils/Welcome.vue'],resolve)
const AccountSetting = resolve=> require(['../components/utils/AccountSetting.vue'],resolve)
export default {
  path: '/teacher',
  component: Teacher,
  meta:{
    requireAuth:true
  },
  children: [
    { path: '', name: 'teacherwelcome', component: Welcome },
    { path: 'creation', name: 'creation', component: Creation },
    { path: 'confirmation', name: 'confirmation', component: Confirmation },
    { path: 'selectionresult', name: 'selectionresult', component: SelectionResult },
    { path: 'grouping', component: Grouping },
    { path: 'evaluation', name: 'teacherevaluation', component: StudentEvaluation },
    { path: 'contact', name: 'teachercontact', component: Contact },
    { path: 'account', component: AccountSetting }
  ]
}
