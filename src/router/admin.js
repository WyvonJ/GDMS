const Welcome = resolve=> require(['../components/utils/Welcome.vue'],resolve)
const Admin = resolve=> require(['../components/admin/Admin.vue'],resolve)
const AdminStuAccount = resolve=> require(['../components/admin/AdminStuAccount.vue'],resolve)
const AdminTchAccount = resolve=> require(['../components/admin/AdminTchAccount.vue'],resolve)
const AdminTchTopics = resolve=> require(['../components/admin/AdminTchTopics.vue'],resolve)
const Procedure = resolve=> require(['../components/admin/Procedure.vue'],resolve)

const StudentGrade = resolve=> require(['../components/admin/StudentGrade.vue'],resolve)

const FinalGroup = resolve=> require(['../components/admin/FinalGroup.vue'],resolve)
const MiddleGroup = resolve=> require(['../components/admin/MiddleGroup.vue'],resolve)

const Groups = resolve=> require(['../components/admin/Groups.vue'],resolve)

const ResetSystem = resolve=> require(['../components/admin/ResetSystem.vue'],resolve)


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
    { path: 'middle', component: MiddleGroup, meta: { title: '中期分组', requireAuth: true } },
    { path: 'final', component: FinalGroup, meta: { title: '最终分组', requireAuth: true } },
    { path: 'groups', component: Groups, meta: { title: '分组结果', requireAuth: true } },
    { path: 'resetsystem', component: ResetSystem, meta: { title: '系统重置', requireAuth: true } },
  ]
}
