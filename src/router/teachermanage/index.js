const routes =  {
    path:'/teachermanage',
    name: 'teachermanage',
    component: resolve => require(['@/views/teachermanage'], resolve),
    meta: {
      title: '教师管理'
    }
}

export default routes;