const routes =  {
    path:'/chatroom',
    name: 'chatroom',
    component: resolve => require(['@/views/chatroom'], resolve),
    meta: {
      title: '聊天室'
    }
}

export default routes; 