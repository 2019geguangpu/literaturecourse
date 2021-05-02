const routes =  {
    path:'/talkanswer',
    name: 'talkanswer',
    component: resolve => require(['@/views/talkanswer'], resolve),
    meta: {
      title: '讨论答疑'
    }
}

export default routes;