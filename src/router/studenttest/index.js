const routes =  {
    path:'/studenttest',
    name: 'studenttest',
    component: resolve => require(['@/views/studenttest'], resolve),
    meta: {
      title: '学生测试'
    }
}

export default routes;