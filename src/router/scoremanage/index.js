const routes =  {
    path:'/scoremanage',
    name: 'scoremanage',
    component: resolve => require(['@/views/scoremanage'], resolve),
    meta: {
      title: '成绩管理'
    }
}

export default routes; 