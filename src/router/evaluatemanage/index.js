const routes =  {
    path:'/evaluatemanage',
    name: 'evaluatemanage',
    component: resolve => require(['@/views/evaluatemanage'], resolve),
    meta: {
      title: '课程评价管理'
    }
}

export default routes; 