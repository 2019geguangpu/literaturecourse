const routes =  {
    path:'/scorequery',
    name: 'scorequery',
    component: resolve => require(['@/views/scorequery'], resolve),
    meta: {
      title: '成绩查询'
    }
}

export default routes;