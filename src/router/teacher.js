//teacher panel
import Teacher from '../components/teacher/Teacher.vue'
import Confirmation from '../components/teacher/Confirmation.vue'
import Creation from '../components/teacher/Creation.vue'
import StudentEvaluation from '../components/teacher/StudentEvaluation.vue'

import SelectionResult from '../components/teacher/SelectionResult.vue'
import Contact from '../components/utils/Contact.vue'
import Grouping from '../components/utils/Grouping.vue'
import Welcome from '../components/utils/Welcome.vue'
import AccountSetting from '../components/utils/AccountSetting.vue'
export default {
  path: '/teacher',
  component: Teacher,
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
