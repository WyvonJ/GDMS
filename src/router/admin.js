import Welcome from '../components/utils/Welcome.vue'
import Admin from '../components/admin/Admin.vue'
import AdminStuAccount from '../components/admin/AdminStuAccount.vue'
import AdminTchAccount from '../components/admin/AdminTchAccount.vue'
import AdminTchTopics from '../components/admin/AdminTchTopics.vue'
import Procedure from '../components/admin/Procedure.vue'

import StudentGrade from '../components/admin/StudentGrade.vue'

import GroupManage from '../components/admin/GroupManage.vue'
import Groups from '../components/admin/Groups.vue'

import ResetSystem from '../components/admin/ResetSystem.vue'


export default {
  path: '/admin',
  component: Admin,
  meta: {
    requireAuth: true
  },
  children: [
    { path: '', name: 'adminwelcome', component: Welcome },
    { path: 'procedure', component: Procedure, meta: { title: '毕业流程', requireAuth: true } },
    { path: 'stuaccount', component: AdminStuAccount, meta: { title: '学生管理', requireAuth: true } },
    { path: 'tchaccount', component: AdminTchAccount, meta: { title: '导师管理', requireAuth: true } },
    { path: 'tchtopics', name: 'tchtopics', component: AdminTchTopics, meta: { title: '课题管理', requireAuth: true } },
    { path: 'studentgrade', component: StudentGrade, meta: { title: '成绩管理', requireAuth: true } },
    { path: 'groupmanage', component: GroupManage, meta: { title: '分组管理', requireAuth: true } },
    { path: 'groups', component: Groups, meta: { title: '分组结果', requireAuth: true } },
    { path: 'resetsystem', component: ResetSystem, meta: { title: '系统重置', requireAuth: true } },
  ]
}
