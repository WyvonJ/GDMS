import Welcome from '../components/utils/Welcome.vue'
import Admin from '../components/admin/Admin.vue'
import AdminStuAccount from '../components/admin/AdminStuAccount.vue'
import AdminStuTopics from '../components/admin/AdminStuTopics.vue'
import AdminTchAccount from '../components/admin/AdminTchAccount.vue'
import AdminTchTopics from '../components/admin/AdminTchTopics.vue'
import Procedure from '../components/admin/Procedure.vue'

import StudentGrade from '../components/admin/StudentGrade.vue'
import FinalGroup from '../components/admin/FinalGroup.vue'
import MidGroup from '../components/admin/MidGroup.vue'

import ResetSystem from '../components/admin/ResetSystem.vue'
export default {
  path: '/admin',
  component: Admin,
  children: [
    { path: '', name: 'adminwelcome', component: Welcome },
    { path: 'procedure', name: 'procedure', component: Procedure },
    { path: 'stuaccount', name: 'stuaccount', component: AdminStuAccount },
    { path: 'stutopics', name: 'stutopics', component: AdminStuTopics },
    { path: 'tchaccount', name: 'tchaccount', component: AdminTchAccount },
    { path: 'tchtopics', name: 'tchtopics', component: AdminTchTopics },
    { path: 'studentgrade', name: 'studentgrade', component: StudentGrade },
    { path: 'midgroup', name: 'midgroup', component: MidGroup },
    { path: 'finalgroup', name: 'finalgroup', component: FinalGroup },
    { path: 'resetsystem', name: 'resetsystem', component: ResetSystem },

  ]
}
