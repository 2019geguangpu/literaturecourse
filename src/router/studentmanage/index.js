const routes =  {
    path:'/studentmanage',
    name: 'studentmanage',
    component: resolve => require(['@/views/studentmanage'], resolve),
    meta: {
      title: '学生管理'
    }
}

export default routes;