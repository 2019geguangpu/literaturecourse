const routes =  {
    path:'/messagemanage',
    name: 'messagemanage',
    component: resolve => require(['@/views/messagemanage'], resolve),
    meta: {
      title: '留言板管理'
    }
}

export default routes; 