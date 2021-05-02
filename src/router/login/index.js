const routes =  {
    path:'/login',
    name: 'login',
    component: resolve => require(['@/views/login'], resolve),
    meta: {
      title: '登录'
    }
}

export default routes; 