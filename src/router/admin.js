import Welcome from '../components/utils/Welcome.vue'
import Admin from '../components/admin/Admin.vue'
import AdminStuAccount from '../components/admin/AdminStuAccount.vue'
import AdminTchAccount from '../components/admin/AdminTchAccount.vue'
import AdminTchTopics from '../components/admin/AdminTchTopics.vue'
import Procedure from '../components/admin/Procedure.vue'

import StudentGrade from '../components/admin/StudentGrade.vue'
import MiddleGroup from '../components/admin/MiddleGroup.vue'
import FinalGroup from '../components/admin/FinalGroup.vue'

import ResetSystem from '../components/admin/ResetSystem.vue'
export default {
  path: '/admin',
  component: Admin,
  children: [
    { path: '', name: 'adminwelcome', component: Welcome },
    { path: 'procedure',  component: Procedure , meta:{title:'毕业流程'}},
    { path: 'stuaccount',  component: AdminStuAccount },
    { path: 'tchaccount',  component: AdminTchAccount },
    { path: 'tchtopics', name: 'tchtopics', component: AdminTchTopics },
    { path: 'studentgrade', component: StudentGrade },
    { path: 'middlegroup',  component: MiddleGroup },
    { path: 'finalgroup',  component: FinalGroup },
    { path: 'resetsystem',  component: ResetSystem },
  ]
}
